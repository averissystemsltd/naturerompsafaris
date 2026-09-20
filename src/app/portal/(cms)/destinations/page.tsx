import Link from 'next/link';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { DestinationsList } from '@/features/portal/cms/destinations/list/destinations-list';

export default function PortalDestinationsPage() {
  return (
    <PageContainer
      pageTitle='Destinations'
      pageDescription='Manage destination hub pages — filter, quick edit, and trash.'
      pageHeaderAction={
        <Button asChild size='sm'>
          <Link href='/portal/destinations/new' prefetch>
            <Icons.add className='mr-2 size-4' />
            Add new
          </Link>
        </Button>
      }
    >
      <DestinationsList />
    </PageContainer>
  );
}
