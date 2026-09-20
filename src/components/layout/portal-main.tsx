'use client';

import { usePathname } from 'next/navigation';
import * as React from 'react';

import { useSidebar } from '@/components/ui/sidebar';

export function PortalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  React.useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return <div className='flex min-h-0 min-w-0 flex-1 flex-col'>{children}</div>;
}
