'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function PortalRootError({
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
    <div
      className='flex min-h-svh flex-col items-center justify-center gap-4 bg-white p-8 text-center text-[#111827]'
      data-theme='brand'
    >
      <h1 className='text-2xl font-semibold tracking-tight'>Portal failed to load</h1>
      <p className='text-muted-foreground max-w-md text-sm'>
        Retry this screen, or refresh the page if the sidebar does not come back.
      </p>
      <Button onClick={reset} type='button'>
        Try again
      </Button>
    </div>
  );
}
