import './globals.css';
import { site } from '@/config/site';

export const metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: 'Aarohiq — Websites, Ecommerce and Business Automation',
        template: '%s',
    },
    description:
        'Aarohiq designs engaging websites, ecommerce experiences and intelligent automations that help businesses attract customers and reduce repetitive work.',
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        siteName: site.name,
        title: 'Aarohiq — Websites, Ecommerce and Business Automation',
        description:
            'Engaging websites, ecommerce experiences and intelligent automations for growing businesses.',
        url: site.url,
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Aarohiq — Websites, Ecommerce and Business Automation',
        description:
            'Engaging websites, ecommerce experiences and intelligent automations for growing businesses.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    /* Favicon is picked up automatically from app/icon.svg. */
};

export const viewport = {
    themeColor: '#f0ebe6',
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
