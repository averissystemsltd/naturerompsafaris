'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

const SEGMENT_LABELS: Record<string, string> = {
  portal: 'Dashboard',
  account: 'My Account',
  accommodations: 'Accommodations',
  blog: 'Blog',
  destinations: 'Destinations',
  enquiries: 'Enquiries',
  experiences: 'Experiences',
  fleet: 'Our Fleet',
  heroes: 'Hero Sections',
  media: 'Media Library',
  'national-parks': 'National Parks',
  new: 'New',
  packages: 'Packages',
  redirects: 'Redirects',
  settings: 'Site Settings',
  subscribers: 'Subscribers',
  team: 'Team & Roles',
  'team-members': 'Team Members',
  tours: 'Safari Tours',
  trash: 'Trash'
};

function titleFromSegment(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  if (/^[0-9a-f-]{8,}$/i.test(segment)) return 'Edit';
  return segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function useBreadcrumbs() {
  const pathname = usePathname();

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    segments.forEach((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      if (segment === 'portal' && segments.length > 1) return;
      items.push({
        title: titleFromSegment(segment),
        link: path
      });
    });

    return items;
  }, [pathname]);
}
