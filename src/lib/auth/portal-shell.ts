import { isPortalRole, type PortalRole } from '@/lib/auth/roles';
import type { PortalSession } from '@/lib/auth/portal';

export const PORTAL_SHELL_COOKIE = 'nrs_portal_shell';

function isSessionShape(value: unknown): value is PortalSession {
  if (!value || typeof value !== 'object') return false;
  const session = value as Partial<PortalSession>;
  return (
    typeof session.userId === 'string' &&
    typeof session.email === 'string' &&
    (session.fullName === null || typeof session.fullName === 'string') &&
    isPortalRole(session.role as PortalRole)
  );
}

function extractJsonObject(raw: string): string {
  const start = raw.indexOf('{');
  if (start < 0) return raw;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let index = start; index < raw.length; index += 1) {
    const char = raw[index];
    if (inString) {
      if (escape) {
        escape = false;
        continue;
      }
      if (char === '\\') {
        escape = true;
        continue;
      }
      if (char === '"') inString = false;
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return raw.slice(start, index + 1);
    }
  }

  return raw;
}

export function parsePortalShellCookie(raw: string | undefined): PortalSession | null {
  if (!raw) return null;
  try {
    let text = raw;
    try {
      if (text.includes('%')) text = decodeURIComponent(text);
    } catch {
      // Keep the raw cookie when it is not URI-encoded.
    }
    const parsed: unknown = JSON.parse(extractJsonObject(text));
    return isSessionShape(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writePortalShellCookie(session: PortalSession): void {
  const value = encodeURIComponent(
    JSON.stringify({
      userId: session.userId,
      email: session.email,
      fullName: session.fullName,
      role: session.role
    })
  );
  document.cookie = `${PORTAL_SHELL_COOKIE}=${value}; Path=/; Max-Age=2592000; SameSite=Lax`;
}

export function clearPortalShellCookie(): void {
  document.cookie = `${PORTAL_SHELL_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
