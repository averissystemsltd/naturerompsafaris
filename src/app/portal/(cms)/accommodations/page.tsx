import Link from 'next/link';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { AccommodationsList } from '@/features/portal/cms/accommodations/list/accommodations-list';

export default function PortalAccommodationsPage() {
  return (
    <PageContainer
      className='bg-white'
      pageTitle='Accommodations'
      pageDescription='Manage lodges, camps, and stays — filter, preview, and trash.'
      pageHeaderAction={
        <Button asChild size='sm'>
          <Link href='/portal/accommodations/new' prefetch>
            <Icons.add className='mr-2 size-4' />
            Add new
          </Link>
        </Button>
      }
    >
      <AccommodationsList />
    </PageContainer>
  );
}
