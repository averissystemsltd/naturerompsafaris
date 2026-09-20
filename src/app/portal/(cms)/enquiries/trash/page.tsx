import Link from 'next/link';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { TrashedEnquiriesList } from '@/features/enquiries/components/trashed-enquiries-list';

export default function PortalEnquiriesTrashPage() {
  return (
    <PageContainer
      pageDescription='Review and restore enquiries removed from the active list.'
      pageHeaderAction={
        <Button asChild size='sm' variant='outline'>
          <Link href='/portal/enquiries' prefetch>
            <Icons.chevronLeft className='size-4' />
            Active enquiries
          </Link>
        </Button>
      }
      pageTitle='Trashed enquiries'
    >
      <TrashedEnquiriesList />
    </PageContainer>
  );
}
