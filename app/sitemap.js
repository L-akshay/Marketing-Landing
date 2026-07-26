import { site } from '@/config/site';

export default function sitemap() {
    const now = new Date();

    return [
        { path: '/', priority: 1, changeFrequency: 'monthly' },
        { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
        { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
        { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
        { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' },
        { path: '/terms-of-service', priority: 0.2, changeFrequency: 'yearly' },
    ].map(({ path, priority, changeFrequency }) => ({
        url: `${site.url}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
    }));
}
