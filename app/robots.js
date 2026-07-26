import { site } from '@/config/site';

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                /* The form endpoint has nothing to index and should not be crawled. */
                disallow: ['/api/'],
            },
        ],
        sitemap: `${site.url}/sitemap.xml`,
        host: site.url,
    };
}
