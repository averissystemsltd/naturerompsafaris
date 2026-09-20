import { Suspense } from 'react';

import PageContainer from '@/components/layout/page-container';
import { PortalPageSkeleton } from '@/components/layout/portal-page-skeleton';
import { PortalOverview } from '@/features/portal/components/portal-overview';
import { getPortalOverviewStats } from '@/features/portal/api/service';
import { requirePortalSession } from '@/lib/auth/portal';

export default function PortalDashboardPage() {
  return (
    <Suspense fallback={<PortalPageSkeleton />}>
      <PortalDashboardContent />
    </Suspense>
  );
}

async function PortalDashboardContent() {
  const [session, stats] = await Promise.all([requirePortalSession(), getPortalOverviewStats()]);

  return (
    <PageContainer pageDescription='Catalogue, enquiries, and shortcuts.' pageTitle='Overview'>
      <PortalOverview
        role={session.role}
        stats={stats}
        userName={session.fullName ?? session.email.split('@')[0]}
      />
    </PageContainer>
  );
}
