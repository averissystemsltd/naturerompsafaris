const DEFAULT_PORTAL_SIGNUP_DOMAINS = ['naturerompsafaris.com', 'averissystems.com'] as const;

function splitList(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function getAllowedSignupDomains(): string[] {
  return Array.from(
    new Set([
      ...DEFAULT_PORTAL_SIGNUP_DOMAINS,
      ...splitList(process.env.PORTAL_SIGNUP_ALLOWED_DOMAINS)
    ])
  );
}

export function getAllowedSignupEmails(): string[] {
  return splitList(process.env.PORTAL_SIGNUP_ALLOWED_EMAILS);
}

export function isAllowedPortalSignupEmail(email: string | null | undefined): boolean {
  const normalized = email?.trim().toLowerCase() ?? '';
  if (!normalized.includes('@')) return false;

  if (getAllowedSignupEmails().includes(normalized)) {
    return true;
  }

  const domain = normalized.split('@')[1] ?? '';
  return getAllowedSignupDomains().includes(domain);
}

export function portalSignupDeniedMessage(): string {
  return 'Unable to create this account. Please try a different email or contact your administrator.';
}
