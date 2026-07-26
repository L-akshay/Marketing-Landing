import PageShell from '@/components/PageShell';
import JsonLd from '@/components/JsonLd';
import { CARDS_DATA } from '@/lib/data';
import { serviceSchema } from '@/lib/structured-data';

export const metadata = {
    title: 'Services — Websites, Ecommerce, Automation and AI Systems',
    description:
        'Website design and development, ecommerce, workflow automation, AI systems, public-data research workflows and custom internal tools.',
    alternates: { canonical: '/services' },
};

const CARD_COLOR_CLASS = {
    green: 'page-card--green',
    darkblue: 'page-card--blue',
    orange: 'page-card--orange',
    maroon: 'page-card--pink',
    pink: 'page-card--lightgreen',
};

export default function ServicesPage() {
    return (
        <PageShell
            eyebrow="what we build"
            title={<>systems designed around business <span className="italic-text">outcomes.</span></>}
            lede="Five capabilities that are usually sold separately. Most projects need two or three of them talking to each other."
        >
            <section className="page-section">
                <div className="page-grid">
                    {CARDS_DATA.map((card) => (
                        <div
                            key={card.title}
                            className={`page-card ${CARD_COLOR_CLASS[card.color] || ''}`}
                        >
                            <h3>{card.title}</h3>
                            <ul>
                                {card.services.map((service) => (
                                    <li key={service}>{service}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="page-section">
                <h2>public-data research, stated plainly</h2>
                <p>
                    Aarohiq works only with publicly available or otherwise lawfully usable information.
                    We do not claim or provide access to private, restricted or confidential data, we do
                    not bypass authentication or access controls, and every research workflow we build
                    includes a human verification step before the output is used.
                </p>
            </section>

            <section className="page-section">
                <h2>how a project runs</h2>
                <p>
                    We start by understanding the business, then agree on the highest-impact thing to
                    build first. Scope, timeline, ownership and support are written down before work
                    begins &mdash; and the code and accounts are yours at the end.
                </p>
            </section>

            <JsonLd
                data={CARDS_DATA.map((card) =>
                    serviceSchema({ title: card.title, summary: card.services.join(', ') })
                )}
            />
        </PageShell>
    );
}
