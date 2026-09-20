export function absoluteUrl(path = '/') {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kenyatanzaniasafariadventures.com';
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedSiteUrl}${normalizedPath}`;
}
