import { Suspense } from 'react';

import PageContainer from '@/components/layout/page-container';
import { PortalPageSkeleton } from '@/components/layout/portal-page-skeleton';
import { PortalModulePage } from '@/features/portal/components/portal-module-page';
import { getPortalContentList } from '@/features/portal/api/service';

export default function PortalNationalParksPage() {
  return (
    <PageContainer
      pageTitle='National Parks'
      pageDescription='Author park pages with wildlife, best-time-to-visit and FAQs. Each park automatically lists the safaris that visit it.'
    >
      <Suspense fallback={<PortalPageSkeleton padded={false} showHeader={false} />}>
        <NationalParksContent />
      </Suspense>
    </PageContainer>
  );
}

async function NationalParksContent() {
  const data = await getPortalContentList('national_parks');

  return (
    <PortalModulePage
      data={data}
      publicPath='/en/national-parks'
      newHref='/portal/national-parks/new'
      editBasePath='/portal/national-parks'
      emptyTitle='No national parks yet'
      emptyMessage='Add your first park (e.g. Masai Mara, Amboseli) with “Add new”. Once published, it appears on the site and collects the tours routed to it.'
    />
  );
}
