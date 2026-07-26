import PageShell from '@/components/PageShell';
import { site } from '@/config/site';

export const metadata = {
    title: 'Terms of Service — Aarohiq',
    description: 'The terms that apply to this website and to working with Aarohiq.',
    alternates: { canonical: '/terms-of-service' },
};

const UPDATED = '26 July 2026';

export default function TermsPage() {
    return (
        <PageShell
            eyebrow="legal"
            title="terms of service"
            lede="The terms covering use of this website, and the ground rules for project work."
            showCta={false}
        >
            <p className="page-meta">Last updated: {UPDATED}</p>

            <section className="page-section">
                <h2>1. using this website</h2>
                <p>
                    This site is provided for information. By using it you agree not to misuse it, attempt
                    to gain unauthorised access, or use automated tools in ways that degrade it for
                    others.
                </p>
            </section>

            <section className="page-section">
                <h2>2. what this site is not</h2>
                <p>
                    Nothing here is a quote, a contract, or a guarantee of results. Timelines, scope and
                    pricing are agreed in a written proposal, and only that proposal binds either side. We
                    make no promise about revenue, lead volume, ranking positions or conversion rates,
                    because those depend on factors outside any agency&rsquo;s control.
                </p>
            </section>

            <section className="page-section">
                <h2>3. project work</h2>
                <p>
                    Each engagement is defined in its own proposal covering scope, deliverables,
                    milestones, dependencies on your side, payment terms and support. Where a proposal and
                    these terms conflict, the proposal governs.
                </p>
            </section>

            <section className="page-section">
                <h2>4. ownership and handover</h2>
                <p>
                    Ownership of delivered code and design, access to hosting and third-party accounts,
                    and the handover process are set out in the project proposal before work begins. We do
                    not hold client accounts or source code hostage.
                </p>
                <p>
                    Third-party components, libraries and services remain governed by their own licences,
                    and ongoing subscriptions to third-party services are the client&rsquo;s
                    responsibility unless agreed otherwise.
                </p>
            </section>

            <section className="page-section">
                <h2>5. client responsibilities</h2>
                <p>
                    Delivery depends on timely access to content, accounts, decisions and feedback. You
                    confirm that any material and data you provide is lawfully yours to share and does not
                    infringe third-party rights.
                </p>
            </section>

            <section className="page-section">
                <h2>6. data and automation systems</h2>
                <p>
                    Automation and research systems we build operate on publicly available or
                    client-authorised sources only, subject to the source&rsquo;s rules and applicable
                    law. We do not build systems that bypass authentication, breach platform terms, or
                    process restricted or unlawfully obtained data. We do not guarantee the accuracy or
                    completeness of information gathered from public sources, and human verification steps
                    are included for that reason.
                </p>
            </section>

            <section className="page-section">
                <h2>7. confidentiality</h2>
                <p>
                    Business information shared during a project is treated as confidential. We will not
                    publish client work, screenshots or names without approval.
                </p>
            </section>

            <section className="page-section">
                <h2>8. liability</h2>
                <p>
                    To the extent permitted by law, our liability arising from any engagement is limited
                    to the fees paid for that engagement, and we are not liable for indirect or
                    consequential loss.
                </p>
            </section>

            <section className="page-section">
                <h2>9. changes</h2>
                <p>
                    These terms may be updated; the date above reflects the current version. Questions go
                    to <a href={`mailto:${site.email}`}>{site.email}</a>.
                </p>
            </section>
        </PageShell>
    );
}
