import { Suspense } from 'react';

import PageContainer from '@/components/layout/page-container';
import { PortalPageSkeleton } from '@/components/layout/portal-page-skeleton';
import { listTeamMembers } from '@/features/portal/cms/team-members/api/service';
import { TeamMembersManager } from '@/features/portal/cms/team-members/components/team-members-manager';

export default function PortalTeamMembersPage() {
  return (
    <PageContainer
      pageDescription='Manage staff, safari guides, and driver-guides shown on the public About page (Our Story).'
      pageTitle='Team Members'
    >
      <Suspense fallback={<PortalPageSkeleton padded={false} showHeader={false} />}>
        <TeamMembersContent />
      </Suspense>
    </PageContainer>
  );
}

async function TeamMembersContent() {
  const members = await listTeamMembers();
  return <TeamMembersManager initialMembers={members} />;
}
