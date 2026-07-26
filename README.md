# Aarohiq

Website for Aarohiq — websites, ecommerce, business automation and AI systems.

> We build digital systems that move businesses forward.

## Stack

- Next.js 15 (App Router), React 19, JavaScript
- GSAP + ScrollTrigger + InertiaPlugin for motion, Lenis for smooth scrolling
- Modular CSS in `app/styles/`, imported by `app/globals.css`
- Self-hosted variable fonts (Epilogue for display, DM Sans for body) via `@font-face`
- `@/` path alias resolves from the repo root

No CSS framework, no UI library, no icon package.

## Getting started

```bash
npm install
cp .env.example .env.local   # everything in it is optional
npm run dev
```

```bash
npm run build && npm run start
```

## Homepage structure

`Navbar` → `HeroSystem` → `HorizontalWords` → `MotionCards` → `Showreel` (delivered
work) → `ServiceCards` → brand story → `DoubleMarquee` → `Footer`, with
`CursorBubble` and `TransitionScribble` layered over the whole page.

## Where to change things

| What | File |
| --- | --- |
| Service cards, marquee words, projects, nav pop-out items, social links | `lib/data.js` |
| Email, WhatsApp, booking link, city, analytics IDs, project URLs | `config/site.js` |
| Design tokens (palette, fonts, reset) | `app/styles/base.css` |
| Hero layout, headline, system visual | `components/HeroSystem.jsx`, `components/HeroSystemVisual.jsx`, `app/styles/hero-system.css` |
| Delivered work section | `components/Showreel.jsx`, `app/styles/showreel.css` |
| Sub-page layout and the project form styling | `components/PageShell.jsx`, `app/styles/legal.css` |
| Form fields and validation (shared client + server) | `lib/audit-schema.js` |

## Project links

`ECOMMERCE_PROJECT_URL` lives in `config/site.js` and is read by `lib/data.js`.
It points at the live store; override it with `NEXT_PUBLIC_ECOMMERCE_PROJECT_URL`
if that ever changes.

The public-data automation is a **confidential client system**. It has no URL and
no env override by design — its card renders a locked "confidential client
system" state and offers a walkthrough on a call. If that ever becomes
publishable, add an `href` to the project in `lib/data.js`.

## Lead capture

`POST /api/audit` validates server-side, rate limits per IP, and drops silent
spam (honeypot + minimum fill time). Delivery is provider-neutral and tried in
order:

1. `AUDIT_WEBHOOK_URL` — any webhook: CRM, Make, n8n, Zapier, Google Sheets
2. `RESEND_API_KEY` + `AUDIT_NOTIFY_EMAIL` — email via Resend's REST API
3. development only — logged to the server console

With nothing configured in production the endpoint returns 503 and the form tells
the visitor to email instead, rather than silently swallowing leads. Secrets are
read only inside the route handler and never reach the browser.

## Motion

Animation lives in GSAP contexts that revert on unmount. The convention across
the site is that **CSS holds the "before" state and GSAP animates to the
"after"** — so nothing flashes on first paint, and if JavaScript never runs the
reduced-motion blocks resolve every element to its finished state.

`HeroSystem`, `Showreel` and `Footer` all check `prefers-reduced-motion` and skip
their timelines entirely when it is set.

## Content rules

The public-data project is described as working with publicly available or
client-authorised sources only. That wording is deliberate and should not be
softened. No metric, client logo or testimonial appears on this site that has not
actually been earned.
