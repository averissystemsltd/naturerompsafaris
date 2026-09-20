import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { PortalShellClient } from '@/components/layout/portal-shell-client';
import { requirePortalSession } from '@/lib/auth/portal';
import { PORTAL_SHELL_COOKIE, parsePortalShellCookie } from '@/lib/auth/portal-shell';

export const metadata: Metadata = {
  title: {
    default: 'Portal',
    template: '%s · Nature Romp Safaris'
  },
  description: 'Nature Romp Safaris content management portal',
  robots: {
    index: false,
    follow: false
  }
};

export default async function PortalShellLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session =
    parsePortalShellCookie(cookieStore.get(PORTAL_SHELL_COOKIE)?.value) ??
    (await requirePortalSession());
  const defaultOpen = cookieStore.get('sidebar_state')?.value !== 'false';

  return (
    <div className='bg-white text-[#111827] min-h-svh' data-theme='brand'>
      <PortalShellClient
        defaultOpen={defaultOpen}
        email={session.email}
        fullName={session.fullName}
        role={session.role}
        userId={session.userId}
      >
        {children}
      </PortalShellClient>
    </div>
  );
}
