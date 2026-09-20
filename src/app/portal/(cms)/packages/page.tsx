import { Suspense } from 'react';

import { PortalPageSkeleton } from '@/components/layout/portal-page-skeleton';
import { renderPortalContentPage } from '@/features/portal/components/portal-content-pages';

export default function PortalPackagesPage() {
  return (
    <Suspense fallback={<PortalPageSkeleton />}>
      <PackagesContent />
    </Suspense>
  );
}

async function PackagesContent() {
  return renderPortalContentPage('packages');
}
