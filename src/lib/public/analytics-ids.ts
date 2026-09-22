/** Pull a GA4 measurement ID out of a raw value or a pasted gtag snippet. */
export function normalizeGaMeasurementId(value: string | null | undefined): string | null {
  const match = value?.match(/\bG-[A-Z0-9]{6,14}\b/i);
  return match ? match[0].toUpperCase() : null;
}

/** Pull a Google Ads conversion ID (AW-…) out of a raw value or snippet. */
export function normalizeGoogleAdsId(value: string | null | undefined): string | null {
  const match = value?.match(/\bAW-\d{6,16}\b/i);
  return match ? match[0].toUpperCase() : null;
}

/** Pull a GTM container ID out of a raw value or snippet. */
export function normalizeGtmId(value: string | null | undefined): string | null {
  const match = value?.match(/\bGTM-[A-Z0-9]{4,12}\b/i);
  return match ? match[0].toUpperCase() : null;
}

/** Pull a Meta Pixel ID out of a raw value or fbq('init', …) snippet. */
export function normalizeMetaPixelId(value: string | null | undefined): string | null {
  if (!value) return null;
  const fromInit = value.match(/fbq\(\s*['"]init['"]\s*,\s*['"](\d{5,20})['"]/i);
  if (fromInit?.[1]) return fromInit[1];
  const trimmed = value.trim();
  return /^\d{5,20}$/.test(trimmed) ? trimmed : null;
}
