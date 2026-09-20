import React from 'react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icons } from '@/components/icons';
import SearchInput from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { EnquiryNotificationCenter } from '@/features/enquiries/notifications/enquiry-notification-center';
import { roleLabel, type PortalRole } from '@/lib/auth/roles';

interface PortalHeaderProps {
  role: PortalRole;
}

export function PortalHeader({ role }: PortalHeaderProps) {
  return (
    <header className='sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-[#E5E7EB] bg-white md:h-14'>
      <div className='flex min-w-0 flex-1 items-center gap-2 px-3 md:px-4'>
        <SidebarTrigger className='-ml-1 shrink-0' />
        <Separator className='mr-2 hidden h-4 sm:block' orientation='vertical' />
        <div className='min-w-0 overflow-hidden'>
          <Breadcrumbs />
        </div>
      </div>

      <TooltipProvider delayDuration={200}>
        <div className='flex shrink-0 items-center gap-1 px-3 md:px-4'>
          <Badge className='hidden font-normal sm:inline-flex' variant='secondary'>
            {roleLabel(role)}
          </Badge>
          <SearchInput />
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                aria-label='Open public site'
                className='text-muted-foreground hover:text-foreground inline-flex size-8 items-center justify-center rounded-md'
                href='/en'
                rel='noopener noreferrer'
                target='_blank'
              >
                <Icons.world className='size-4' />
              </a>
            </TooltipTrigger>
            <TooltipContent>Public site</TooltipContent>
          </Tooltip>
          <EnquiryNotificationCenter />
        </div>
      </TooltipProvider>
    </header>
  );
}
