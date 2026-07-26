import { Suspense } from 'react';
import PageShell from '@/components/PageShell';
import AuditForm from '@/components/AuditForm';
import { site, whatsappUrl } from '@/config/site';

export const metadata = {
    title: 'Start a Project — Aarohiq',
    description:
        'Tell Aarohiq what is slowing the business down. We will review the site and the workflow and recommend what to build first.',
    alternates: { canonical: '/contact' },
};

export default function ContactPage() {
    return (
        <PageShell
            eyebrow="start a project"
            title={<>tell us what is <span className="italic-text">slowing you down.</span></>}
            lede="A website that does not convert, a process nobody wants to do twice, or a system that does not exist yet. Say which one and we will tell you what we would build first."
            showCta={false}
        >
            <section className="page-section" id="page-contact">
                <h2>send us the details</h2>
                <p>
                    The more specific you are about where time and enquiries are being lost, the more
                    useful our reply will be. Most responses go out within two working days.
                </p>

                {/* The form reads ?interest= from the URL, which needs a boundary
                    during static rendering. */}
                <Suspense fallback={<div className="audit-form audit-form--loading" aria-hidden="true" />}>
                    <AuditForm />
                </Suspense>
            </section>

            <section className="page-section">
                <h2>or reach us directly</h2>
                <ul>
                    <li>
                        Email <a href={`mailto:${site.email}`}>{site.email}</a>
                    </li>
                    {whatsappUrl && (
                        <li>
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                Message us on WhatsApp
                            </a>
                        </li>
                    )}
                    <li>
                        {site.location.city}, {site.location.region} &mdash; working remotely worldwide.
                    </li>
                </ul>
            </section>

            <section className="page-section">
                <h2>what happens next</h2>
                <ul>
                    <li>We read what you sent and look at your website ourselves.</li>
                    <li>We identify the conversion problems and the repetitive work worth automating.</li>
                    <li>You get a written reply with what we would build first, and why.</li>
                    <li>If a build makes sense we scope it. If it does not, we say so.</li>
                </ul>
            </section>
        </PageShell>
    );
}
