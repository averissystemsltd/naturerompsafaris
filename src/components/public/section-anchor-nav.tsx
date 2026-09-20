'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type SectionAnchorItem = {
  href: string;
  label: string;
};

type SectionAnchorNavProps = {
  items: SectionAnchorItem[];
  className?: string;
};

export function SectionAnchorNav({ className, items }: SectionAnchorNavProps) {
  const [activeHref, setActiveHref] = React.useState(items[0]?.href ?? '');

  React.useEffect(() => {
    if (!items.length) return;

    const sections = items
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .toSorted((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
      },
      {
        rootMargin: '-210px 0px -55% 0px',
        threshold: [0.08, 0.2, 0.45]
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label='Page sections'
      className={cn(
        'sticky top-[var(--brand-sticky-offset)] z-40 border-b border-[var(--brand-line)] bg-white',
        className
      )}
    >
      <div className='brand-container flex snap-x snap-mandatory overflow-x-auto'>
        {items.map((item) => {
          const active = activeHref === item.href;
          return (
            <a
              className={cn(
                'shrink-0 snap-start px-5 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[var(--brand-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-lime)] md:px-6',
                active
                  ? 'bg-[var(--brand-lime)] text-[var(--brand-primary-dark)]'
                  : 'hover:bg-[var(--brand-ivory)] hover:text-[var(--brand-primary)]'
              )}
              href={item.href}
              key={item.href}
              onClick={() => setActiveHref(item.href)}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
