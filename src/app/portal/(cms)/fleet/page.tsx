import { Suspense } from 'react';

import { FleetGalleryManager } from '@/features/portal/cms/fleet/fleet-gallery-manager';
import { getFleetGalleryMediaIds } from '@/features/portal/cms/fleet/service';
import PageContainer from '@/components/layout/page-container';
import { PortalPageSkeleton } from '@/components/layout/portal-page-skeleton';

export default function PortalFleetPage() {
  return (
    <PageContainer
      pageDescription='Upload and order safari vehicle photos for the public Our Fleet page.'
      pageTitle='Our Fleet'
    >
      <Suspense fallback={<PortalPageSkeleton padded={false} showHeader={false} />}>
        <FleetContent />
      </Suspense>
    </PageContainer>
  );
}

async function FleetContent() {
  const mediaIds = await getFleetGalleryMediaIds();
  return <FleetGalleryManager initialMediaIds={mediaIds} />;
}
