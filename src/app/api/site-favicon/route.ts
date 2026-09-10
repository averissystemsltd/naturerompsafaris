import { NextResponse } from 'next/server';

import { getPublicSiteSettings } from '@/lib/public/site-data';
import { resolveAbsoluteSiteFaviconUrl, resolveFaviconMimeType } from '@/lib/site-favicon';

// Rendered on request, never prerendered: this route proxies the favicon by
// self-fetching an absolute URL. During `next build` there is no running server,
// so a relative/bundled favicon (e.g. /assets/brand-favicon.png) would resolve to
// http://localhost and fail with ECONNREFUSED. At request time the server is up
// and the fetch succeeds. Response caching is still handled via Cache-Control.
export const dynamic = 'force-dynamic';

/**
 * Canonical /favicon.ico handler (via next.config rewrite).
 * Proxies the CMS settings favicon so browsers that only request /favicon.ico
 * still get the portal branding asset — not a Next/Vercel default.
 */
export async function GET() {
  const settings = await getPublicSiteSettings();
  const absoluteUrl = resolveAbsoluteSiteFaviconUrl(settings.faviconUrl);

  const upstream = await fetch(absoluteUrl, {
    next: { revalidate: 300, tags: ['site-settings'] }
  });

  if (!upstream.ok) {
    return new NextResponse('Favicon not found', { status: 404 });
  }

  const bytes = await upstream.arrayBuffer();
  const contentType = upstream.headers.get('content-type') || resolveFaviconMimeType(absoluteUrl);

  return new NextResponse(bytes, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800'
    }
  });
}
