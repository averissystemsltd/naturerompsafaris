import { Suspense } from 'react';

import PageContainer from '@/components/layout/page-container';
import { PortalPageSkeleton } from '@/components/layout/portal-page-skeleton';
import { getPortalTeam } from '@/features/portal/api/service';
import { TeamTable } from '@/features/portal/cms/settings/team-table';
import { requireSuperAdmin } from '@/lib/auth/portal';

export default function PortalTeamPage() {
  return (
    <PageContainer
      pageTitle='Team & Roles'
      pageDescription='Manage who can access the portal and what they can do. Sign-in activity is shown for each member.'
    >
      <Suspense fallback={<PortalPageSkeleton padded={false} showHeader={false} />}>
        <TeamContent />
      </Suspense>
    </PageContainer>
  );
}

async function TeamContent() {
  const session = await requireSuperAdmin();
  const team = await getPortalTeam();
  return <TeamTable currentUserId={session.userId} members={team} />;
}
