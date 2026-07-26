// ─── lib/data.js — All static data for the Aarohiq website ───────────────────
// ES Module exports — imported by React components.

import { ECOMMERCE_PROJECT_URL } from '@/config/site';

// Marquee words — what Aarohiq actually ships. Replaces the old brand-logo
// marquee (those logo assets were removed and were never Aarohiq's to show).
export const brands = [
    { name: "websites" },
    { name: "ecommerce" },
    { name: "automation" },
    { name: "ai systems" },
    { name: "dashboards" },
    { name: "crm flows" },
    { name: "lead routing" },
    { name: "data research" },
    { name: "internal tools" },
    { name: "integrations" }
];

// Marquee background colors
export const colors = [
    "var(--color-green)",
    "var(--color-lightblue)",
    "var(--color-darkblue)",
    "var(--color-lightgreen)",
    "var(--color-orange)",
    "var(--color-maroon)",
    "var(--color-pink)"
];

// ─── Service cards ──────────────────────────────────────────────────────────
// Colors and stickers map to the existing card CSS — do not invent new ones
// without adding the matching .card-* and .sticker-* rules.
export const CARDS_DATA = [
    {
        color: 'green',
        sticker: 'camera',
        title: 'websites',
        services: ['Website design', 'Conversion strategy', 'UX & UI design', 'Responsive build', 'SEO foundations', 'Analytics setup']
    },
    {
        color: 'darkblue',
        sticker: 'phone',
        title: 'ecommerce',
        services: ['Product catalogues', 'Search & filtering', 'Admin dashboards', 'Enquiry journeys', 'Cloud product management']
    },
    {
        color: 'orange',
        sticker: 'smiley',
        title: 'automation',
        services: ['Lead routing', 'CRM automation', 'Follow-up flows', 'WhatsApp & email workflows', 'Reporting']
    },
    {
        color: 'maroon',
        sticker: 'hand',
        title: 'ai systems',
        services: ['AI assistants', 'Document processing', 'Content workflows', 'Smart triage', 'Human review steps']
    },
    {
        color: 'pink',
        sticker: 'heart',
        title: 'data & tools',
        services: ['Public-data research', 'Data cleaning', 'Internal dashboards', 'Custom tools', 'API integrations']
    }
];

// ─── Delivered projects ─────────────────────────────────────────────────────
// `href` empty → the card renders `pending` instead of a broken link.
export const PROJECTS = [
    {
        id: 'ecommerce',
        badge: 'ecommerce',
        badgeColor: 'badge-blue',
        title: 'product catalogue & admin system',
        challenge:
            'Products lived in files and chat threads. Nothing could be updated without a developer, and mobile shoppers had no reliable way to browse the range.',
        built: [
            'Product & category catalogue',
            'Search and filtering',
            'Cloud-backed product management',
            'Featured & visibility controls',
            'WhatsApp-ready enquiry journey'
        ],
        outcome:
            'The business moved from a static digital presence to a manageable online sales and catalogue system.',
        tech: ['Next.js', 'Firebase', 'Firestore', 'Firebase Auth'],
        href: ECOMMERCE_PROJECT_URL,
        pending: 'link coming soon',
        cta: 'view project'
    },
    {
        id: 'automation',
        badge: 'automation',
        badgeColor: 'badge-lime',
        title: 'public data & lead intelligence',
        challenge:
            'The same research was redone by hand every week — same sources opened, same details copied into a spreadsheet, duplicates piling up until nobody trusted the list.',
        built: [
            'Public-source collection',
            'Extraction & structuring',
            'Cleaning and deduplication',
            'Research summaries',
            'Manual verification points'
        ],
        outcome:
            'A workflow that collects and structures lawfully available public information for company and prospect research.',
        tech: ['Node.js', 'Scheduled jobs', 'Data pipelines'],
        /* Private client system — no public URL, by agreement. */
        href: '',
        confidential: true,
        pending: 'confidential client system',
        // Non-negotiable: this system never touches private or restricted data.
        notice:
            'Publicly available or client-authorised sources only. No private contact details, no restricted data, no bypassing access controls.'
    }
];

// ─── Navbar pop-out items ───────────────────────────────────────────────────
export const NAV_WORK_ITEMS = [
    { badge: 'ecommerce', badgeColor: 'badge-blue', title: 'product catalogue & admin system', href: '#showreel-section' },
    { badge: 'automation', badgeColor: 'badge-lime', title: 'public data & lead intelligence', href: '#showreel-section' },
    { badge: 'websites', badgeColor: 'badge-pink', title: 'conversion-focused business sites', href: '#cards-wrapper' }
];

// ─── Wiggle Intensity Config ────────────────────────────────────────────────
export const WIGGLE_CONFIG = {
    logoAarohiq: 4,
    jobHeading: 1,
    googleMap: 1,
    email: 1,
    whatsapp: 1,
};

// ─── Animation Configurations ─────────────────────────────────────────────
export const ANIMATION_CONFIG = {
    transitionScribble: {
        strokeWidthStart: "8%",
        strokeWidthMax: "31%",
        scale: 0.7,
        durationIn: 2.2,
        durationOut: 2.7
    }
};
