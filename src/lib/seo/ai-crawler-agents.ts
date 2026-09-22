/**
 * Training / scraping user-agents. Search engines (Googlebot, Bingbot, Yandex,
 * DuckDuckBot, Applebot) stay allowed via the default `*` robots rule.
 *
 * AI agents may fetch `/llms.txt` and `/llm.txt` only. Bandwidth scrapers are
 * disallowed entirely. A smaller subset is also blocked at the edge because
 * those crawlers often ignore robots.txt.
 */

export const AI_SCRAPER_USER_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'CCBot',
  'Google-Extended',
  'anthropic-ai',
  'ClaudeBot',
  'Claude-Web',
  'Bytespider',
  'Amazonbot',
  'Applebot-Extended',
  'meta-externalagent',
  'Meta-ExternalAgent',
  'PerplexityBot',
  'YouBot',
  'cohere-ai',
  'Diffbot',
  'ImagesiftBot',
  'Omgilibot',
  'Omgili',
  'Timpibot',
  'AI2Bot',
  'webzio-extended',
  'FacebookBot',
  'iaskspider',
  'KauaiBot',
  'Scrapy'
] as const;

/** SEO / archive / copy bots that crawl image-heavy pages and inflate bandwidth. */
export const BANDWIDTH_SCRAPER_USER_AGENTS = [
  'AhrefsBot',
  'AhrefsSiteAudit',
  'SemrushBot',
  'SiteAuditBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'PetalBot',
  'MegaIndex',
  'ZoominfoBot',
  'DataForSeoBot',
  'magpie-crawler',
  'Seekport',
  'SeekportBot',
  'HTTrack',
  'WebCopier',
  'SiteSucker',
  'sistrix',
  'SEOkicks',
  'rogerbot',
  'MauiBot',
  'Barkrowler',
  'Cincraw'
] as const;

export const LLM_ALLOWED_PATHS = ['/llms.txt', '/llm.txt'] as const;

/**
 * User-agents blocked in `src/proxy.ts` even if they ignore robots.txt.
 * Keep this list tight so Googlebot / Bingbot / social preview bots are never matched.
 */
export const EDGE_BLOCKED_SCRAPER_UA =
  /bytespider|petalbot|mj12bot|dotbot|blexbot|megaindex|httrack|webcopier|sitesucker|scrapy|magpie-crawler|imagesiftbot|omgili|timpibot|ai2bot|webzio-extended|iaskspider|kauaibot/i;

export function isEdgeBlockedScraper(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return EDGE_BLOCKED_SCRAPER_UA.test(userAgent);
}
