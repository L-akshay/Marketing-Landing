import PageShell from '@/components/PageShell';

export const metadata = {
    title: 'About — Aarohiq | Websites and Business Automation',
    description:
        'Aarohiq designs websites and automation systems around the customer journey and the team workflow, not around whichever tool is fashionable.',
    alternates: { canonical: '/about' },
};

export default function AboutPage() {
    return (
        <PageShell
            eyebrow="about aarohiq"
            title={<>we build the system, not just the <span className="italic-text">screen.</span></>}
            lede="Aarohiq is a small team that designs and builds the customer-facing website and the workflow running behind it. One brief, one set of decisions, one system."
        >
            <section className="page-section">
                <h2>aarohiq means intelligent rise</h2>
                <p>
                    The name comes from &ldquo;Aaroh,&rdquo; meaning rise or ascent, and &ldquo;IQ,&rdquo;
                    for intelligence, logic and systems. We started Aarohiq to help businesses use
                    technology with more clarity &mdash; designing around the customer journey and the
                    team&rsquo;s real workflow instead of adding software for the sake of looking modern.
                </p>
                <p>
                    That may mean rebuilding a website, connecting disconnected tools, automating
                    repetitive work, or developing a custom system that does not yet exist.
                </p>
            </section>

            <section className="page-section">
                <h2>how we actually work</h2>
                <div className="page-grid">
                    <div className="page-card page-card--green">
                        <span className="page-card__step">01</span>
                        <h3>diagnose</h3>
                        <p>We study the business, the customer journey, the current site, the tools and the repetitive work.</p>
                    </div>
                    <div className="page-card page-card--blue">
                        <span className="page-card__step">02</span>
                        <h3>prioritise</h3>
                        <p>We pick the highest-impact opportunity rather than recommending technology nobody needs.</p>
                    </div>
                    <div className="page-card page-card--orange">
                        <span className="page-card__step">03</span>
                        <h3>design &amp; build</h3>
                        <p>We design the experience, build the system, and connect the tools it depends on.</p>
                    </div>
                    <div className="page-card page-card--lightgreen">
                        <span className="page-card__step">04</span>
                        <h3>test &amp; improve</h3>
                        <p>We run the real workflow, remove friction, and hand it over ready for daily use.</p>
                    </div>
                </div>
                <p>
                    Sometimes the right answer is a new website. Sometimes it is an automation. Often it
                    is the connection between both.
                </p>
            </section>

            <section className="page-section">
                <h2>what we will not do</h2>
                <p>
                    We do not add AI to a process that does not need it, promise revenue or lead volume we
                    cannot control, or work with data obtained in ways the source does not permit. Every
                    research system we build stays inside publicly available or client-authorised sources
                    and includes a human review step.
                </p>
            </section>

            <section className="page-section">
                <h2>working with us</h2>
                <p>
                    Projects are scoped in writing before they start: what is being built, what it depends
                    on from your side, who owns the accounts and code at the end, and what support looks
                    like afterwards. Nothing about handover should be a surprise.
                </p>
            </section>
        </PageShell>
    );
}
