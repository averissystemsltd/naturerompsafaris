import { cache } from 'react';
import { redirect } from 'next/navigation';

import { ensurePortalProfile } from '@/lib/auth/ensure-portal-profile';
import { isPortalRole, type PortalRole } from '@/lib/auth/roles';
import { createClient } from '@/lib/supabase/server';

export interface PortalSession {
  userId: string;
  email: string;
  fullName: string | null;
  role: PortalRole;
}

const PROFILE_CACHE_TTL_MS = 60_000;
const profileCache = new Map<string, { expires: number; session: PortalSession }>();

function getCachedProfile(userId: string): PortalSession | null {
  const cached = profileCache.get(userId);
  if (!cached) return null;
  if (cached.expires <= Date.now()) {
    profileCache.delete(userId);
    return null;
  }
  return cached.session;
}

function setCachedProfile(session: PortalSession): void {
  profileCache.set(session.userId, {
    expires: Date.now() + PROFILE_CACHE_TTL_MS,
    session
  });
}

async function loadProfile(userId: string, email: string): Promise<PortalSession | null> {
  const cached = getCachedProfile(userId);
  if (cached) return cached;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role, status')
    .eq('id', userId)
    .maybeSingle();

  if (!profile || profile.status !== 'active' || !isPortalRole(profile.role)) {
    return null;
  }

  const session: PortalSession = {
    email,
    fullName: profile.full_name,
    role: profile.role,
    userId
  };
  setCachedProfile(session);
  return session;
}

async function readPortalSession(): Promise<PortalSession | null> {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = typeof claimsData?.claims?.sub === 'string' ? claimsData.claims.sub : null;
  if (!userId) return null;

  const email = typeof claimsData?.claims?.email === 'string' ? claimsData.claims.email : '';
  return loadProfile(userId, email);
}

export const getPortalSession = cache(readPortalSession);

export const requirePortalSession = cache(
  async (redirectTo = '/portal/login'): Promise<PortalSession> => {
    const session = await readPortalSession();
    if (session) return session;

    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      redirect(redirectTo);
    }

    const ensured = await ensurePortalProfile(supabase, user);
    if (ensured.ok) {
      const created = await loadProfile(user.id, user.email ?? '');
      if (created) return created;
    }

    redirect('/portal/login?setup=1');
  }
);

export const requireSuperAdmin = cache(async (): Promise<PortalSession> => {
  const session = await requirePortalSession();
  if (session.role !== 'admin' && session.role !== 'owner') {
    redirect('/portal');
  }
  return session;
});

/** Same gate as requireSuperAdmin, but throws instead of redirecting (API routes). */
export async function assertSuperAdmin(): Promise<PortalSession> {
  const session = await getPortalSession();
  if (!session) {
    throw new Error('Sign in again to save settings.');
  }
  if (session.role !== 'admin' && session.role !== 'owner') {
    throw new Error('Only admins can change site settings.');
  }
  return session;
}
