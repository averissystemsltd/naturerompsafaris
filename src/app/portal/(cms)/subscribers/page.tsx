import { Suspense } from 'react';

import PageContainer from '@/components/layout/page-container';
import { PortalPageSkeleton } from '@/components/layout/portal-page-skeleton';
import { SubscribersManager } from '@/features/portal/cms/subscribers/components/subscribers-manager';
import {
  getSubscriberStats,
  listCampaigns,
  listSubscribers
} from '@/features/portal/cms/subscribers/service';

export default function PortalSubscribersPage() {
  return (
    <PageContainer
      pageTitle='Subscribers'
      pageDescription='Footer newsletter sign-ups land here. Manage the list and send campaigns for new destinations, articles, and offers.'
    >
      <Suspense fallback={<PortalPageSkeleton padded={false} showHeader={false} />}>
        <SubscribersContent />
      </Suspense>
    </PageContainer>
  );
}

async function SubscribersContent() {
  const [subscribers, stats, campaigns] = await Promise.all([
    listSubscribers(),
    getSubscriberStats(),
    listCampaigns()
  ]);

  return <SubscribersManager subscribers={subscribers} stats={stats} campaigns={campaigns} />;
}
