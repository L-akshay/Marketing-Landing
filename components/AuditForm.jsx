'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    CONTACT_METHOD_OPTIONS,
    FIELDS,
    HONEYPOT_FIELD,
    INTEREST_OPTIONS,
    TIMELINE_OPTIONS,
    validate,
} from '@/lib/audit-schema';
import { site } from '@/config/site';

const EMPTY = {
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    businessType: '',
    interest: '',
    timeline: '',
    goal: '',
    timeDrain: '',
    contactMethod: '',
};

export default function AuditForm() {
    const uid = useId();
    const searchParams = useSearchParams();

    const [values, setValues] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [formError, setFormError] = useState('');

    const startedAt = useRef(Date.now());
    const successRef = useRef(null);
    const firstErrorRef = useRef(null);

    /* Service cards link here with ?interest=…, so the form arrives pre-set to
       the thing the visitor just clicked. */
    useEffect(() => {
        const interest = searchParams.get('interest');
        if (interest && INTEREST_OPTIONS.includes(interest)) {
            setValues((v) => (v.interest ? v : { ...v, interest }));
        }
    }, [searchParams]);

    useEffect(() => {
        if (status === 'success') successRef.current?.focus();
    }, [status]);

    const fieldId = (name) => `${uid}-${name}`;
    const errorId = (name) => `${uid}-${name}-error`;

    const onChange = (event) => {
        const { name, value } = event.target;

        setValues((prev) => ({ ...prev, [name]: value }));

        /* Only clear errors while typing — never introduce new ones mid-word. */
        if (errors[name]) {
            const next = validate({ ...values, [name]: value });
            if (!next[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const onBlur = (event) => {
        const { name, value } = event.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const next = validate({ ...values, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: next[name] || '' }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormError('');

        const found = validate(values);
        if (Object.keys(found).length) {
            setErrors(found);
            setTouched(Object.fromEntries(Object.keys(FIELDS).map((k) => [k, true])));
            setStatus('idle');
            /* Move focus to the first problem so it is not just a colour change. */
            requestAnimationFrame(() => {
                const firstKey = Object.keys(FIELDS).find((k) => found[k]);
                if (firstKey) document.getElementById(fieldId(firstKey))?.focus();
            });
            return;
        }

        setStatus('submitting');

        try {
            const response = await fetch(site.auditEndpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    [HONEYPOT_FIELD]: event.target.elements[HONEYPOT_FIELD]?.value || '',
                    elapsedMs: Date.now() - startedAt.current,
                    source: window.location.pathname,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok || !data.ok) {
                if (data.errors) setErrors(data.errors);
                setFormError(
                    data.message ||
                        'Something went wrong sending your request. Please try again in a moment.'
                );
                setStatus('error');
                requestAnimationFrame(() => firstErrorRef.current?.focus());
                return;
            }

            setStatus('success');
        } catch {
            setFormError(
                'We could not reach the server. Check your connection, or email us directly at ' +
                    site.email +
                    '.'
            );
            setStatus('error');
            requestAnimationFrame(() => firstErrorRef.current?.focus());
        }
    };

    if (status === 'success') {
        return (
            <div
                className="audit-form audit-form--done"
                role="status"
                tabIndex={-1}
                ref={successRef}
            >
                <span className="audit-form__done-mark" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="18" height="18">
                        <path
                            d="M3 8.4 6.4 11.8 13 4.8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
                <h3>got it.</h3>
                <p>
                    Thanks {values.name.split(' ')[0] || 'for reaching out'}. We will review your website
                    and the processes you described, then reply to <strong>{values.email}</strong> with
                    what we would build first and why.
                </p>
                <p className="note">
                    Most replies go out within two working days. If it is urgent, email{' '}
                    <a href={`mailto:${site.email}`}>{site.email}</a> and mention that you already
                    submitted the form.
                </p>
            </div>
        );
    }

    const describedBy = (name) => (touched[name] && errors[name] ? errorId(name) : undefined);
    const invalid = (name) => Boolean(touched[name] && errors[name]);

    const renderError = (name) =>
        invalid(name) ? (
            <p className="field__error" id={errorId(name)}>
                {errors[name]}
            </p>
        ) : null;

    return (
        <form className="audit-form" onSubmit={onSubmit} noValidate>
            {/* Honeypot: off-screen, not hidden, so bots that check for
                display:none still fill it in. */}
            <div className="audit-form__trap" aria-hidden="true">
                <label htmlFor={fieldId(HONEYPOT_FIELD)}>Do not fill this in</label>
                <input
                    id={fieldId(HONEYPOT_FIELD)}
                    type="text"
                    name={HONEYPOT_FIELD}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <div className="audit-form__grid">
                <div className="field">
                    <label htmlFor={fieldId('name')}>
                        Full name <span className="field__req">*</span>
                    </label>
                    <input
                        id={fieldId('name')}
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={values.name}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={invalid('name')}
                        aria-describedby={describedBy('name')}
                    />
                    {renderError('name')}
                </div>

                <div className="field">
                    <label htmlFor={fieldId('email')}>
                        Work email <span className="field__req">*</span>
                    </label>
                    <input
                        id={fieldId('email')}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={invalid('email')}
                        aria-describedby={describedBy('email') || `${uid}-email-hint`}
                    />
                    {renderError('email') || (
                        <p className="field__hint" id={`${uid}-email-hint`}>
                            Where we send the audit.
                        </p>
                    )}
                </div>

                <div className="field">
                    <label htmlFor={fieldId('phone')}>Phone or WhatsApp number</label>
                    <input
                        id={fieldId('phone')}
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={invalid('phone')}
                        aria-describedby={describedBy('phone')}
                    />
                    {renderError('phone')}
                </div>

                <div className="field">
                    <label htmlFor={fieldId('company')}>Company name</label>
                    <input
                        id={fieldId('company')}
                        name="company"
                        type="text"
                        autoComplete="organization"
                        value={values.company}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                </div>

                <div className="field">
                    <label htmlFor={fieldId('website')}>Website URL</label>
                    <input
                        id={fieldId('website')}
                        name="website"
                        type="text"
                        inputMode="url"
                        autoComplete="url"
                        placeholder="yourbusiness.com"
                        value={values.website}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={invalid('website')}
                        aria-describedby={describedBy('website') || `${uid}-website-hint`}
                    />
                    {renderError('website') || (
                        <p className="field__hint" id={`${uid}-website-hint`}>
                            So we can review the real thing, not a guess.
                        </p>
                    )}
                </div>

                <div className="field">
                    <label htmlFor={fieldId('businessType')}>Business type</label>
                    <input
                        id={fieldId('businessType')}
                        name="businessType"
                        type="text"
                        placeholder="Interior studio, D2C brand, clinic…"
                        value={values.businessType}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                </div>

                <div className="field">
                    <label htmlFor={fieldId('interest')}>
                        What are you looking to build? <span className="field__req">*</span>
                    </label>
                    <select
                        id={fieldId('interest')}
                        name="interest"
                        required
                        value={values.interest}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={invalid('interest')}
                        aria-describedby={describedBy('interest')}
                    >
                        <option value="">Select an option</option>
                        {INTEREST_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {renderError('interest')}
                </div>

                <div className="field">
                    <label htmlFor={fieldId('timeline')}>
                        Approximate timeline <span className="field__req">*</span>
                    </label>
                    <select
                        id={fieldId('timeline')}
                        name="timeline"
                        required
                        value={values.timeline}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={invalid('timeline')}
                        aria-describedby={describedBy('timeline')}
                    >
                        <option value="">Select an option</option>
                        {TIMELINE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {renderError('timeline')}
                </div>

                <div className="field field--wide">
                    <label htmlFor={fieldId('goal')}>
                        What do you want to improve? <span className="field__req">*</span>
                    </label>
                    <textarea
                        id={fieldId('goal')}
                        name="goal"
                        rows={3}
                        required
                        placeholder="Enquiries have dropped, the site is hard to update, and quoting takes a full day."
                        value={values.goal}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={invalid('goal')}
                        aria-describedby={describedBy('goal') || `${uid}-goal-hint`}
                    />
                    {renderError('goal') || (
                        <p className="field__hint" id={`${uid}-goal-hint`}>
                            The more specific this is, the more useful the audit will be.
                        </p>
                    )}
                </div>

                <div className="field field--wide">
                    <label htmlFor={fieldId('timeDrain')}>
                        Where does your team lose the most time?
                    </label>
                    <textarea
                        id={fieldId('timeDrain')}
                        name="timeDrain"
                        rows={2}
                        placeholder="Copying enquiry details into the CRM, chasing follow-ups, weekly reporting."
                        value={values.timeDrain}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-describedby={`${uid}-drain-hint`}
                    />
                    <p className="field__hint" id={`${uid}-drain-hint`}>
                        This is where most automation opportunities are found.
                    </p>
                </div>

                <div className="field">
                    <label htmlFor={fieldId('contactMethod')}>Preferred contact method</label>
                    <select
                        id={fieldId('contactMethod')}
                        name="contactMethod"
                        value={values.contactMethod}
                        onChange={onChange}
                        onBlur={onBlur}
                    >
                        <option value="">No preference</option>
                        {CONTACT_METHOD_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Errors are announced, not merely displayed. */}
            <div aria-live="polite">
                {status === 'error' && formError && (
                    <p className="audit-form__alert" tabIndex={-1} ref={firstErrorRef}>
                        {formError}
                    </p>
                )}
            </div>

            <div className="audit-form__foot">
                <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={status === 'submitting'}
                    aria-busy={status === 'submitting'}
                >
                    {status === 'submitting' ? (
                        <>
                            <span className="spinner" aria-hidden="true" />
                            Sending&hellip;
                        </>
                    ) : (
                        <>
                            send project details
                            <span className="btn__arrow" aria-hidden="true">
                                &rarr;
                            </span>
                        </>
                    )}
                </button>

                <p className="audit-form__consent">
                    We will use these details only to understand your project and respond to your
                    request. No list, no resale.
                </p>
            </div>
        </form>
    );
}
