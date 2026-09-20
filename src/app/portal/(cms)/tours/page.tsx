import Link from 'next/link';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ToursList } from '@/features/portal/cms/tours/list/tours-list';

export default function PortalToursPage() {
  return (
    <PageContainer
      pageTitle='Safari Tours'
      pageDescription='Manage safari tour pages — filter, quick edit, and trash.'
      pageHeaderAction={
        <Button asChild size='sm'>
          <Link href='/portal/tours/new' prefetch>
            <Icons.add className='mr-2 size-4' />
            Add new
          </Link>
        </Button>
      }
    >
      <ToursList />
    </PageContainer>
  );
}
