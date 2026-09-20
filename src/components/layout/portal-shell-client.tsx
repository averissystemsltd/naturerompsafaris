'use client';

import * as React from 'react';

import { PortalHeader } from '@/components/layout/portal-header';
import { PortalMain } from '@/components/layout/portal-main';
import { PortalNavigationProvider } from '@/components/layout/portal-navigation';
import { PortalSidebar } from '@/components/layout/portal-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PortalKBar } from '@/components/kbar/portal-kbar';
import { EnquiryNotificationProvider } from '@/features/enquiries/notifications/enquiry-notification-provider';
import { PortalRoleProvider } from '@/hooks/use-nav';
import { writePortalShellCookie } from '@/lib/auth/portal-shell';
import type { PortalRole } from '@/lib/auth/roles';

type PortalShellClientProps = {
  children: React.ReactNode;
  defaultOpen: boolean;
  email: string;
  fullName: string | null;
  role: PortalRole;
  userId: string;
};

export function PortalShellClient({
  children,
  defaultOpen,
  email,
  fullName,
  role,
  userId
}: PortalShellClientProps) {
  React.useEffect(() => {
    writePortalShellCookie({ email, fullName, role, userId });
  }, [email, fullName, role, userId]);

  return (
    <PortalRoleProvider role={role}>
      <EnquiryNotificationProvider>
        <PortalKBar>
          <SidebarProvider defaultOpen={defaultOpen}>
            <PortalNavigationProvider>
              <PortalSidebar email={email} fullName={fullName} role={role} />
              <SidebarInset className='bg-white'>
                <PortalHeader role={role} />
                <PortalMain>{children}</PortalMain>
              </SidebarInset>
            </PortalNavigationProvider>
          </SidebarProvider>
        </PortalKBar>
      </EnquiryNotificationProvider>
    </PortalRoleProvider>
  );
}
