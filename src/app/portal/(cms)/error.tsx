'use client';

import { useEffect } from 'react';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';

export default function PortalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer
      pageDescription='This page failed to load. You can retry without leaving the portal.'
      pageTitle='Something went wrong'
    >
      <div className='rounded-lg border border-[#E5E7EB] bg-white px-6 py-10 text-center'>
        <p className='text-muted-foreground mx-auto max-w-md text-sm'>
          The sidebar is still available. Retry this page, or pick another section.
        </p>
        <Button className='mt-6' onClick={reset} type='button'>
          Try again
        </Button>
      </div>
    </PageContainer>
  );
}
