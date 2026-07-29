import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const PRIVATE_PATHS = [
  '/admin',
  '/api',
  '/auth',
  '/mine',
  '/settings',
  '/messages',
  '/stats',
  '/daily',
  '/buddy',
  '/achievement',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      // Googlebot 明确允许——防止某些泛匹配规则误伤
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
