import { BRAND_CONTACT_DEFAULTS, BRAND_PHONE } from '@/config/brand';

export function phoneHref(phone: string) {
  return phone.replace(/[^\d+]/g, '');
}

export function uniquePublicPhones(...numbers: Array<string | null | undefined>) {
  const seen = new Set<string>();
  const phones: string[] = [];

  for (const raw of numbers) {
    const value = raw?.trim();
    if (!value) continue;
    const key = phoneHref(value);
    if (seen.has(key)) continue;
    seen.add(key);
    phones.push(value);
  }

  return phones;
}

export function publicCallPhones(settings?: {
  phonePrimary?: string | null;
  phoneSecondary?: string | null;
}) {
  return uniquePublicPhones(
    settings?.phonePrimary || BRAND_PHONE,
    settings?.phoneSecondary || BRAND_CONTACT_DEFAULTS.phoneSecondary
  );
}
