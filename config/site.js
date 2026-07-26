/* ─────────────────────────────────────────────────────────────────────────────
   config/site.js — Single source of truth for contact details, links and IDs.

   Everything an operator needs to change lives here (or in the matching env
   var). Nothing in this file is a secret; server-only keys live in .env and are
   read inside app/api/audit/route.js.

   NOTE: `process.env.NEXT_PUBLIC_*` must be written out in full below. Next
   inlines these by matching the literal member expression at build time —
   aliasing `process.env` to a variable first would leave them undefined in the
   browser bundle.
───────────────────────────────────────────────────────────────────────────── */

/** Read an env var, falling back to a default, treating "" as unset. */
const read = (value, fallback = '') => (value && value.trim() ? value.trim() : fallback);

/* ── Delivered project URLs ───────────────────────────────────────────────────
   Add the live URLs here (or via env) the moment they exist. While a URL is
   empty the UI renders the project's `pendingLabel` instead of a broken link.  */
export const ECOMMERCE_PROJECT_URL = read(
    process.env.NEXT_PUBLIC_ECOMMERCE_PROJECT_URL,
    'https://amrgkharibaoliwale.com/'
);

/* The public-data automation is a private client system. There is deliberately
   no URL and no env override — the card states that instead of linking out. */

export const site = {
    name: 'Aarohiq',
    /** Used in JSON-LD and the footer. */
    legalName: 'Aarohiq',
    positioning: 'Conversion-focused websites and business automation systems.',
    brandLine: 'Where businesses rise with intelligence.',
    description:
        'Aarohiq builds conversion-focused websites, workflow automations and custom AI systems for growing businesses.',

    /** Canonical origin, no trailing slash. Set NEXT_PUBLIC_SITE_URL in production. */
    url: read(process.env.NEXT_PUBLIC_SITE_URL, 'https://aarohiq.com').replace(/\/$/, ''),

    email: read(process.env.NEXT_PUBLIC_CONTACT_EMAIL, 'lofisongs200619@gmail.com'),

    /* WhatsApp: international format, digits only, no "+" or spaces.
       Leave empty and every WhatsApp CTA is hidden rather than broken. */
    whatsapp: {
        number: read(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
        message:
            'Hi Aarohiq, I would like to discuss improving my website or automating a business process.',
    },

    /* External scheduler (Cal.com, Google Calendar, Calendly…).
       Empty → the "Book a strategy call" secondary actions fall back to email. */
    bookingUrl: read(process.env.NEXT_PUBLIC_BOOKING_URL),

    location: {
        city: read(process.env.NEXT_PUBLIC_BUSINESS_CITY, 'Delhi NCR'),
        region: read(process.env.NEXT_PUBLIC_BUSINESS_REGION, 'India'),
        country: 'IN',
    },

    /* Only real, live profiles belong here. Empty href → link is not rendered. */
    socials: [
        { label: 'LinkedIn', href: read(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
        { label: 'Instagram', href: read(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
        { label: 'X', href: read(process.env.NEXT_PUBLIC_SOCIAL_X) },
        { label: 'GitHub', href: read(process.env.NEXT_PUBLIC_SOCIAL_GITHUB) },
    ].filter((s) => s.href),

    /* Where the project form POSTs. Kept configurable so the form can be pointed
       at an external endpoint (Formspree, CRM) without touching component code. */
    auditEndpoint: read(process.env.NEXT_PUBLIC_AUDIT_ENDPOINT, '/api/audit'),
};

/** Prefilled WhatsApp deep link, or '' when no number is configured. */
export const whatsappUrl = site.whatsapp.number
    ? `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`
    : '';

/** Booking link with an email fallback so the CTA is never dead. */
export const bookingUrl =
    site.bookingUrl ||
    `mailto:${site.email}?subject=${encodeURIComponent('Strategy call — Aarohiq')}`;

export default site;
