/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/audit — receives free-audit requests.

   Delivery is provider-neutral and tried in order:
     1. AUDIT_WEBHOOK_URL   — any webhook: CRM, Make, n8n, Zapier, Google Sheets
     2. RESEND_API_KEY      — transactional email via Resend's REST API
     3. development only    — logged to the server console

   Configure at least one in production. No key is ever read on the client.
───────────────────────────────────────────────────────────────────────────── */

import { validate, normalise, HONEYPOT_FIELD, MIN_FILL_MS } from '@/lib/audit-schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* ── Rate limiting ────────────────────────────────────────────────────────────
   Best-effort, in-memory, per instance. Enough to stop a script hammering a
   single container; put a real limiter (Upstash, WAF) in front for anything
   more serious. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(key) {
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(key, recent);

    /* Keep the map from growing without bound on long-lived instances. */
    if (hits.size > 5000) {
        for (const [k, times] of hits) {
            if (!times.length || now - times[times.length - 1] > WINDOW_MS) hits.delete(k);
        }
    }
    return recent.length > MAX_PER_WINDOW;
}

const clientIp = (request) =>
    (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
    });

/* ── Delivery ─────────────────────────────────────────────────────────────── */

function asPlainText(lead) {
    return [
        `New free-audit request — ${lead.name}`,
        '',
        `Name:             ${lead.name}`,
        `Email:            ${lead.email}`,
        `Phone / WhatsApp: ${lead.phone || '—'}`,
        `Company:          ${lead.company || '—'}`,
        `Website:          ${lead.website || '—'}`,
        `Business type:    ${lead.businessType || '—'}`,
        `Interest:         ${lead.interest}`,
        `Timeline:         ${lead.timeline}`,
        `Preferred reply:  ${lead.contactMethod || '—'}`,
        '',
        'What they want to improve:',
        lead.goal,
        '',
        'Where the team loses time:',
        lead.timeDrain || '—',
        '',
        `Submitted: ${lead.submittedAt}`,
        `Source:    ${lead.source}`,
    ].join('\n');
}

async function deliverToWebhook(lead) {
    const url = process.env.AUDIT_WEBHOOK_URL;
    if (!url) return false;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            ...(process.env.AUDIT_WEBHOOK_SECRET
                ? { authorization: `Bearer ${process.env.AUDIT_WEBHOOK_SECRET}` }
                : {}),
        },
        body: JSON.stringify(lead),
    });

    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return true;
}

async function deliverByEmail(lead) {
    const key = process.env.RESEND_API_KEY;
    const to = process.env.AUDIT_NOTIFY_EMAIL;
    if (!key || !to) return false;

    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
        body: JSON.stringify({
            from: process.env.AUDIT_FROM_EMAIL || 'Aarohiq Website <onboarding@resend.dev>',
            to: to.split(',').map((a) => a.trim()),
            reply_to: lead.email,
            subject: `Free audit request — ${lead.company || lead.name}`,
            text: asPlainText(lead),
        }),
    });

    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return true;
}

/* ── Handler ──────────────────────────────────────────────────────────────── */

export async function POST(request) {
    let payload;
    try {
        payload = await request.json();
    } catch {
        return json({ ok: false, message: 'Could not read the submission.' }, 400);
    }

    if (rateLimited(clientIp(request))) {
        return json(
            { ok: false, message: 'Too many requests from this connection. Please try again shortly.' },
            429
        );
    }

    /* Spam gates, both silent: a filled honeypot or an impossibly fast submit
       gets the same success response a human sees, so bots learn nothing. */
    const trapped = Boolean(payload?.[HONEYPOT_FIELD]);
    const elapsed = Number(payload?.elapsedMs);
    const tooFast = Number.isFinite(elapsed) && elapsed < MIN_FILL_MS;
    if (trapped || tooFast) return json({ ok: true, received: true });

    const errors = validate(payload);
    if (Object.keys(errors).length) {
        return json({ ok: false, errors, message: 'Please check the highlighted fields.' }, 422);
    }

    const lead = {
        ...normalise(payload),
        submittedAt: new Date().toISOString(),
        source: typeof payload?.source === 'string' ? payload.source.slice(0, 120) : 'website',
    };

    try {
        if (await deliverToWebhook(lead)) return json({ ok: true, delivery: 'webhook' });
        if (await deliverByEmail(lead)) return json({ ok: true, delivery: 'email' });
    } catch (error) {
        console.error('[audit] delivery failed:', error);
        return json(
            {
                ok: false,
                message:
                    'We could not deliver your request just now. Please email us directly and we will pick it up.',
            },
            502
        );
    }

    /* Nothing configured. */
    if (process.env.NODE_ENV !== 'production') {
        console.info('[audit] no delivery provider configured — lead logged only:\n', asPlainText(lead));
        return json({ ok: true, delivery: 'logged' });
    }

    console.error('[audit] no delivery provider configured in production. Set AUDIT_WEBHOOK_URL or RESEND_API_KEY.');
    return json(
        {
            ok: false,
            message:
                'Our request form is not accepting submissions right now. Please email us directly and we will respond.',
        },
        503
    );
}

export function GET() {
    return json({ ok: false, message: 'Method not allowed.' }, 405);
}
