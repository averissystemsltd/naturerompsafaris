import Link from 'next/link';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ExperiencesList } from '@/features/portal/cms/experiences/list/experiences-list';

export default function PortalExperiencesPage() {
  return (
    <PageContainer
      pageTitle='Experiences'
      pageDescription='Manage experience pages — filter, quick edit, and trash.'
      pageHeaderAction={
        <Button asChild size='sm'>
          <Link href='/portal/experiences/new' prefetch>
            <Icons.add className='mr-2 size-4' />
            Add new
          </Link>
        </Button>
      }
    >
      <ExperiencesList />
    </PageContainer>
  );
}
