/* ─────────────────────────────────────────────────────────────────────────────
   lib/audit-schema.js — One schema, used by the browser for instant feedback
   and by the API route as the actual gate. Client validation is a courtesy;
   the server never trusts it.
───────────────────────────────────────────────────────────────────────────── */

export const INTEREST_OPTIONS = [
    'Website',
    'E-commerce',
    'Automation',
    'Internal business system',
    'Data research workflow',
    'Website and automation',
    'Not sure yet',
];

export const TIMELINE_OPTIONS = [
    'As soon as possible',
    'Within one month',
    'Within three months',
    'Exploring options',
];

export const CONTACT_METHOD_OPTIONS = ['Email', 'Phone call', 'WhatsApp'];

/** Field name of the honeypot. Hidden from humans, tempting to bots. */
export const HONEYPOT_FIELD = 'fax';

/** A real person needs at least this long to fill the form. */
export const MIN_FILL_MS = 3000;

export const FIELDS = {
    name: { label: 'Full name', required: true, max: 120 },
    email: { label: 'Work email', required: true, max: 200 },
    phone: { label: 'Phone or WhatsApp number', required: false, max: 40 },
    company: { label: 'Company name', required: false, max: 160 },
    website: { label: 'Website URL', required: false, max: 300 },
    businessType: { label: 'Business type', required: false, max: 160 },
    interest: { label: 'What are you looking to build?', required: true, max: 80 },
    timeline: { label: 'Approximate timeline', required: true, max: 80 },
    goal: { label: 'What do you want to improve?', required: true, max: 2000, min: 15 },
    timeDrain: { label: 'Where does your team lose the most time?', required: false, max: 2000 },
    contactMethod: { label: 'Preferred contact method', required: false, max: 40 },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/* Free mailbox providers are accepted — plenty of founders run on them — but
   the label says "work email" so we only reject what is clearly not an email. */
const isEmail = (v) => EMAIL_RE.test(v);

const looksLikeUrl = (v) => {
    const value = v.trim();
    if (!value) return true;
    // Accept with or without protocol; reject spaces and obvious nonsense.
    return /^((https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?)$/i.test(value);
};

/** Normalise a raw payload into trimmed strings. */
export function normalise(raw = {}) {
    const out = {};
    for (const key of Object.keys(FIELDS)) {
        out[key] = typeof raw[key] === 'string' ? raw[key].trim() : '';
    }
    return out;
}

/**
 * @returns {Record<string,string>} field name → error message. Empty = valid.
 */
export function validate(raw = {}) {
    const values = normalise(raw);
    const errors = {};

    for (const [key, rules] of Object.entries(FIELDS)) {
        const value = values[key];

        if (rules.required && !value) {
            errors[key] = `${rules.label} is required.`;
            continue;
        }
        if (!value) continue;
        if (value.length > rules.max) {
            errors[key] = `${rules.label} must be under ${rules.max} characters.`;
            continue;
        }
        if (rules.min && value.length < rules.min) {
            errors[key] = `Please add a little more detail so the audit is useful.`;
        }
    }

    if (values.email && !errors.email && !isEmail(values.email)) {
        errors.email = 'Enter a valid email address so we can send the audit.';
    }
    if (values.website && !errors.website && !looksLikeUrl(values.website)) {
        errors.website = 'Enter a valid website address, for example aarohiq.com.';
    }
    if (values.interest && !INTEREST_OPTIONS.includes(values.interest)) {
        errors.interest = 'Choose one of the listed options.';
    }
    if (values.timeline && !TIMELINE_OPTIONS.includes(values.timeline)) {
        errors.timeline = 'Choose one of the listed options.';
    }
    if (values.contactMethod && !CONTACT_METHOD_OPTIONS.includes(values.contactMethod)) {
        errors.contactMethod = 'Choose one of the listed options.';
    }

    return errors;
}

/** Validate a single field on blur without surfacing errors for empty optionals. */
export function validateField(name, value, all = {}) {
    const errors = validate({ ...all, [name]: value });
    return errors[name] || '';
}
