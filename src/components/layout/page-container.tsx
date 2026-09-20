import React from 'react';
import { Heading } from '../ui/heading';
import type { InfobarContent } from '@/components/ui/infobar';
import { PortalDocumentTitle } from '@/components/layout/portal-document-title';
import { PortalPageSkeleton } from '@/components/layout/portal-page-skeleton';
import { cn } from '@/lib/utils';

export default function PageContainer({
  children,
  className,
  isLoading = false,
  access = true,
  accessFallback,
  pageTitle,
  pageDescription,
  infoContent,
  pageHeaderAction
}: {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  access?: boolean;
  accessFallback?: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  infoContent?: InfobarContent;
  pageHeaderAction?: React.ReactNode;
}) {
  if (!access) {
    return (
      <div className='flex flex-1 items-center justify-center p-4 md:px-6'>
        {accessFallback ?? (
          <div className='text-muted-foreground text-center text-lg'>
            You do not have access to this page.
          </div>
        )}
      </div>
    );
  }

  const content = isLoading ? <PortalPageSkeleton padded={false} showHeader={false} /> : children;
  const hasHeader = pageTitle || pageHeaderAction;

  return (
    <div
      className={cn(
        'flex min-w-0 max-w-full flex-1 flex-col px-4 pt-2 pb-4 md:px-6 md:pt-4',
        className
      )}
    >
      {pageTitle ? <PortalDocumentTitle title={pageTitle} /> : null}
      {hasHeader && (
        <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
          <Heading
            title={pageTitle ?? ''}
            description={pageDescription}
            infoContent={infoContent}
          />
          {pageHeaderAction ? <div className='shrink-0'>{pageHeaderAction}</div> : null}
        </div>
      )}
      {content}
    </div>
  );
}
