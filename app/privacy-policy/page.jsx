import PageShell from '@/components/PageShell';
import { site } from '@/config/site';

export const metadata = {
    title: 'Privacy Policy — Aarohiq',
    description: 'What Aarohiq collects, why we collect it, and what you can ask us to do with it.',
    alternates: { canonical: '/privacy-policy' },
};

const UPDATED = '26 July 2026';

export default function PrivacyPolicyPage() {
    return (
        <PageShell
            eyebrow="legal"
            title="privacy policy"
            lede="What we collect, why we collect it, and what you can ask us to do with it."
            showCta={false}
        >
            <p className="page-meta">Last updated: {UPDATED}</p>

            <section className="page-section">
                <h2>1. who we are</h2>
                <p>
                    {site.legalName} is a website development and business automation studio based in{' '}
                    {site.location.city}, {site.location.region}. For any question about this policy,
                    contact <a href={`mailto:${site.email}`}>{site.email}</a>.
                </p>
            </section>

            <section className="page-section">
                <h2>2. information you give us</h2>
                <p>
                    When you submit the project form we collect your name and email address, and
                    optionally your phone or WhatsApp number, company name, website URL, business type,
                    and the descriptions you write of what you want to improve and where your team loses
                    time.
                </p>
                <p>
                    We use these details for one purpose: to understand your enquiry and respond to it. We
                    do not sell them, rent them, or add you to a marketing list you did not ask for.
                </p>
            </section>

            <section className="page-section">
                <h2>3. information collected automatically</h2>
                <p>
                    If analytics is enabled on this site, our analytics providers may set cookies and
                    collect standard usage data such as pages viewed, approximate location derived from IP
                    address, referring site, device and browser. Where no analytics identifier is
                    configured, no analytics scripts are loaded and no such cookies are set.
                </p>
                <p>
                    Our server records the IP address of form submissions temporarily, solely to apply
                    rate limits and reduce automated abuse.
                </p>
            </section>

            <section className="page-section">
                <h2>4. business and project data</h2>
                <p>
                    During a project we may process business information you share with us: workflows,
                    documents, tool configurations, customer records and brand material. We use it only to
                    deliver the agreed work, we treat it as confidential, and we do not use it to train
                    third-party models beyond what is necessary to run the system you asked us to build.
                </p>
            </section>

            <section className="page-section">
                <h2>5. publicly available data</h2>
                <p>
                    Some systems we build collect publicly available or client-authorised information.
                    That data is processed subject to the source&rsquo;s rules, applicable law and the
                    agreed project scope. We do not bypass authentication or access controls, and we do
                    not acquire restricted, private or unlawfully obtained data.
                </p>
            </section>

            <section className="page-section">
                <h2>6. third parties we rely on</h2>
                <p>
                    Depending on configuration, submissions may be delivered through an email provider or
                    a webhook into a CRM or workflow tool, and the site may be hosted by a third-party
                    platform. These providers process data on our behalf under their own terms. We share
                    only what is needed to operate the service.
                </p>
            </section>

            <section className="page-section">
                <h2>7. how long we keep it</h2>
                <p>
                    Enquiry data is kept for as long as it is useful to the conversation it started and to
                    meet legal or contractual obligations, then deleted. Project data is retained
                    according to the terms agreed in the project proposal.
                </p>
            </section>

            <section className="page-section">
                <h2>8. your rights</h2>
                <p>
                    Depending on where you live, you may have the right to access, correct, export or
                    delete your personal data, to object to certain processing, and to withdraw consent.
                    Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will act on it.
                </p>
            </section>

            <section className="page-section">
                <h2>9. security</h2>
                <p>
                    We use reasonable technical and organisational measures to protect the data we hold,
                    including keeping credentials out of client-side code and limiting access to what is
                    needed. No system is perfectly secure, and we do not claim otherwise.
                </p>
            </section>

            <section className="page-section">
                <h2>10. changes</h2>
                <p>
                    If this policy changes materially, the date above will be updated and, where
                    appropriate, we will notify affected clients directly.
                </p>
            </section>
        </PageShell>
    );
}
