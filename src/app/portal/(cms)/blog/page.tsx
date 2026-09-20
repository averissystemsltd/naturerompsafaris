import Link from 'next/link';

import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { BlogArticlesList } from '@/features/portal/cms/blog/list/blog-articles-list';

export default function PortalBlogPage() {
  return (
    <PageContainer
      pageTitle='Posts'
      pageDescription='Manage blog articles — filter, quick edit, and trash.'
      pageHeaderAction={
        <Button asChild size='sm'>
          <Link href='/portal/blog/new' prefetch>
            <Icons.add className='mr-2 size-4' />
            Add new
          </Link>
        </Button>
      }
    >
      <BlogArticlesList />
    </PageContainer>
  );
}
