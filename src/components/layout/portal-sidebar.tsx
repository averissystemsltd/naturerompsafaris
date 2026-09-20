'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { usePortalNavigation } from '@/components/layout/portal-navigation';
import { portalNavGroups } from '@/config/portal-nav-config';
import { BRAND_LOGO_HEIGHT, BRAND_LOGO_PATH, BRAND_LOGO_WIDTH } from '@/config/brand';
import { useFilteredNavGroups } from '@/hooks/use-nav';
import { clearPortalShellCookie } from '@/lib/auth/portal-shell';
import { roleLabel, type PortalRole } from '@/lib/auth/roles';
import { createClient } from '@/lib/supabase/browser';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

interface PortalSidebarProps {
  fullName: string | null;
  email: string;
  role: PortalRole;
}

function isItemActive(pathname: string, url: string): boolean {
  if (url === '/portal') return pathname === '/portal';
  return pathname === url || pathname.startsWith(`${url}/`);
}

function PortalNavLink({
  item,
  isActive,
  onNavigate,
  onPrefetch
}: {
  item: NavItem;
  isActive: boolean;
  onNavigate: (href: string, event?: React.MouseEvent<HTMLAnchorElement>) => void;
  onPrefetch: (href: string) => void;
}) {
  const Icon = item.icon ? Icons[item.icon] : Icons.dashboard;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
        {item.external ? (
          <a href={item.url} rel='noopener noreferrer' target='_blank'>
            <Icon />
            <span>{item.title}</span>
            <Icons.externalLink className='ml-auto size-3.5 opacity-60' />
          </a>
        ) : (
          <Link
            href={item.url}
            onClick={(event) => onNavigate(item.url, event)}
            onFocus={() => onPrefetch(item.url)}
            onMouseEnter={() => onPrefetch(item.url)}
            prefetch={false}
          >
            <Icon />
            <span>{item.title}</span>
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function PortalCollapsibleNav({
  item,
  isActive,
  pathname,
  pendingHref,
  onNavigate,
  onPrefetch
}: {
  item: NavItem;
  isActive: boolean;
  pathname: string;
  pendingHref: string | null;
  onNavigate: (href: string, event?: React.MouseEvent<HTMLAnchorElement>) => void;
  onPrefetch: (href: string) => void;
}) {
  const Icon = item.icon ? Icons[item.icon] : Icons.dashboard;
  const [open, setOpen] = React.useState(isActive);

  React.useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  return (
    <Collapsible asChild className='group/collapsible' onOpenChange={setOpen} open={open}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={isActive} tooltip={item.title}>
            <Icon />
            <span>{item.title}</span>
            <Icons.chevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => {
              const subActive =
                pathname === subItem.url ||
                pendingHref === subItem.url ||
                (subItem.url !== '/portal/settings' &&
                  (pathname.startsWith(`${subItem.url}/`) ||
                    Boolean(pendingHref?.startsWith(`${subItem.url}/`))));

              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild isActive={subActive}>
                    <Link
                      href={subItem.url}
                      onClick={(event) => onNavigate(subItem.url, event)}
                      onFocus={() => onPrefetch(subItem.url)}
                      onMouseEnter={() => onPrefetch(subItem.url)}
                      prefetch={false}
                    >
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function PortalSidebar({ fullName, email, role }: PortalSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const filteredGroups = useFilteredNavGroups(portalNavGroups);
  const { pendingHref, navigate: handleNavigate, prefetch: prefetchHref } = usePortalNavigation();

  async function handleSignOut() {
    clearPortalShellCookie();
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/portal/login');
    router.refresh();
  }

  return (
    <Sidebar className='border-sidebar-border' collapsible='icon'>
      <SidebarHeader className='border-sidebar-border border-b px-3 py-4'>
        <Link className='flex items-center gap-3 overflow-hidden' href='/portal' prefetch>
          <Image
            alt='Nature Romp Safaris'
            className='h-8 w-auto max-w-[148px] object-contain object-left group-data-[collapsible=icon]:max-w-8'
            height={BRAND_LOGO_HEIGHT}
            priority
            src={BRAND_LOGO_PATH}
            width={BRAND_LOGO_WIDTH}
          />
        </Link>
        <p className='text-sidebar-foreground/70 mt-2 truncate text-xs uppercase tracking-[0.12em] group-data-[collapsible=icon]:hidden'>
          Team Portal
        </p>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        {filteredGroups.map((group) => (
          <SidebarGroup className='py-0' key={group.label || 'ungrouped'}>
            {group.label ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive =
                  isItemActive(pathname, item.url) ||
                  Boolean(pendingHref && isItemActive(pendingHref, item.url));

                if (item.items?.length) {
                  return (
                    <PortalCollapsibleNav
                      isActive={isActive}
                      item={item}
                      key={item.title}
                      onNavigate={handleNavigate}
                      onPrefetch={prefetchHref}
                      pathname={pathname}
                      pendingHref={pendingHref}
                    />
                  );
                }

                return (
                  <PortalNavLink
                    isActive={isActive}
                    item={item}
                    key={item.title}
                    onNavigate={handleNavigate}
                    onPrefetch={prefetchHref}
                  />
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className='border-sidebar-border border-t'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                  size='lg'
                >
                  <div className='bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-md text-xs font-semibold'>
                    {(fullName ?? email).charAt(0).toUpperCase()}
                  </div>
                  <div className='grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden'>
                    <span className='truncate font-medium'>{fullName ?? 'Team member'}</span>
                    <span className='text-sidebar-foreground/70 truncate text-xs'>
                      {roleLabel(role)}
                    </span>
                  </div>
                  <Icons.chevronsDown className='ml-auto size-4 group-data-[collapsible=icon]:hidden' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                side='bottom'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='px-2 py-2'>
                    <p className='text-sm font-medium'>{fullName ?? 'Team member'}</p>
                    <p className='text-muted-foreground text-xs'>{email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href='/portal/account'
                    onClick={(event) => handleNavigate('/portal/account', event)}
                  >
                    <Icons.user className='mr-2 h-4 w-4' />
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href='/en' rel='noopener noreferrer' target='_blank'>
                    <Icons.world className='mr-2 h-4 w-4' />
                    View public site
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <Icons.logout className='mr-2 h-4 w-4' />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function PortalBrandMark({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <Image
        alt='Nature Romp Safaris'
        className='h-12 w-auto object-contain'
        height={BRAND_LOGO_HEIGHT}
        priority
        src={BRAND_LOGO_PATH}
        width={BRAND_LOGO_WIDTH}
      />
      <p className='text-muted-foreground mt-3 text-xs uppercase tracking-[0.14em]'>Team Portal</p>
    </div>
  );
}
