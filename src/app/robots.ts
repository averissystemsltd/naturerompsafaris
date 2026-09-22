import type { MetadataRoute } from 'next';

import {
  AI_SCRAPER_USER_AGENTS,
  BANDWIDTH_SCRAPER_USER_AGENTS,
  LLM_ALLOWED_PATHS
} from '@/lib/seo/ai-crawler-agents';
import { crawlAbsoluteUrl } from '@/lib/seo/absolute-url';
import { DISALLOWED_ROBOTS_PATHS } from '@/lib/seo/robots';

const PRIVATE_PATHS = [
  ...DISALLOWED_ROBOTS_PATHS,
  '/sign-in',
  '/sign-up',
  '/v1/',
  '/*/newsletter/unsubscribe',
  '/*/thank-you'
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS
      },
      {
        userAgent: [...AI_SCRAPER_USER_AGENTS],
        allow: [...LLM_ALLOWED_PATHS],
        disallow: '/'
      },
      {
        userAgent: [...BANDWIDTH_SCRAPER_USER_AGENTS],
        disallow: '/'
      }
    ],
    sitemap: crawlAbsoluteUrl('/sitemap.xml'),
    host: crawlAbsoluteUrl('/')
  };
}
