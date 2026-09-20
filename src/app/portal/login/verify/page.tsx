import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { PortalAuthRecovery } from '@/features/portal/components/portal-auth-recovery';
import { PortalVerifyEmailForm } from '@/features/portal/components/portal-verify-email-form';
import { getPortalSession } from '@/lib/auth/portal';

export const metadata: Metadata = {
  title: 'Verify email'
};

export default async function PortalVerifyEmailPage() {
  const session = await getPortalSession();
  if (session) redirect('/portal');

  return (
    <PortalAuthRecovery>
      <Suspense
        fallback={
          <div className='bg-white flex min-h-svh items-center justify-center text-sm text-[#6B7280]'>
            Loading…
          </div>
        }
      >
        <PortalVerifyEmailForm />
      </Suspense>
    </PortalAuthRecovery>
  );
}
