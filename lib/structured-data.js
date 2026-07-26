/* ─────────────────────────────────────────────────────────────────────────────
   lib/structured-data.js — JSON-LD builders.

   Only schema we can substantiate is emitted. There is deliberately no Review
   or AggregateRating here: no real reviews have been collected, and inventing
   them is both dishonest and a manual action risk.
───────────────────────────────────────────────────────────────────────────── */

import { site } from '@/config/site';
import { CARDS_DATA } from '@/lib/data';

/* The service cards double as the offer catalogue — one source of truth. */
const services = CARDS_DATA.map((card) => ({
    title: card.title,
    summary: card.services.join(', '),
}));

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

export function organizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': ORG_ID,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        description: site.description,
        email: site.email,
        ...(site.whatsapp.number ? { telephone: `+${site.whatsapp.number}` } : {}),
        address: {
            '@type': 'PostalAddress',
            addressLocality: site.location.city,
            addressRegion: site.location.region,
            addressCountry: site.location.country,
        },
        areaServed: 'Worldwide',
        ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
        knowsAbout: [
            'Website development',
            'Conversion rate optimisation',
            'Business process automation',
            'Workflow automation',
            'AI integration',
            'Custom internal tools',
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Aarohiq services',
            itemListElement: services.map((service) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: service.title,
                    description: service.summary,
                    provider: { '@id': ORG_ID },
                },
            })),
        },
    };
}

export function websiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': SITE_ID,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { '@id': ORG_ID },
    };
}

export function serviceSchema(service) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.summary,
        serviceType: service.title,
        provider: { '@id': ORG_ID },
        areaServed: 'Worldwide',
    };
}

export function faqSchema(faqs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
    };
}

export function breadcrumbSchema(trail) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${site.url}${item.path}`,
        })),
    };
}

export function caseStudySchema(project) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        headline: project.title,
        description: project.summary,
        url: `${site.url}/work/${project.slug}`,
        creator: { '@id': ORG_ID },
        about: project.category,
        keywords: project.technologies.join(', '),
    };
}
