import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

import { BrandButton } from '@/components/public/ui/brand-button';
import type { PublicPackage } from '@/lib/public/types';
import { formatComfortTierLabel, formatTourPrice } from '@/lib/public/tour-format';

export type TourCardItem = {
  days?: number | null;
  excerpt?: string | null;
  href: string;
  imageAlt?: string | null;
  imageUrl?: string | null;
  nights?: number | null;
  priceFrom?: number | null;
  regionLabel?: string;
  title: string;
};

function formatDuration(days?: number | null, nights?: number | null) {
  if (days && nights) return `${days} Days / ${nights} Nights`;
  if (days) return `${days} Days`;
  return 'Safari';
}

export function TourCard({
  item,
  linkAccent = 'green'
}: {
  item: TourCardItem;
  linkAccent?: 'green' | 'gold';
}) {
  const price = formatTourPrice(item.priceFrom);
  const linkBorderClass =
    linkAccent === 'gold'
      ? 'brand-fill-hover border-[var(--brand-lime)] text-[var(--brand-lime)] hover:text-[var(--brand-primary-dark)]'
      : 'border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white';

  return (
    <article className='flex h-full flex-col overflow-hidden rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white'>
      <Link
        className='group relative block aspect-[4/3] overflow-hidden bg-[var(--brand-primary)]'
        href={item.href}
      >
        {item.imageUrl ? (
          <Image
            alt={item.imageAlt || item.title}
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            fill
            sizes='(max-width:768px) 100vw, 33vw'
            src={item.imageUrl}
          />
        ) : (
          <div className='absolute inset-0 bg-[var(--brand-primary-light)]' />
        )}
        <span className='absolute left-3 top-3 rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-ink)]'>
          {formatDuration(item.days, item.nights)}
        </span>
        {item.regionLabel ? (
          <span className='absolute right-3 top-3 rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-ink)]'>
            {item.regionLabel}
          </span>
        ) : null}
      </Link>
      <div className='flex flex-1 flex-col p-5'>
        <h3 className='brand-heading font-display text-2xl leading-tight'>
          <Link className='transition-colors hover:text-[var(--brand-primary)]' href={item.href}>
            {item.title}
          </Link>
        </h3>
        {item.excerpt ? (
          <p className='brand-body mt-3 line-clamp-3 flex-1 text-[15px] leading-7'>
            {item.excerpt}
          </p>
        ) : null}
        <div className='mt-5 flex items-end justify-between gap-4 border-t border-[var(--brand-line)] pt-4'>
          <div>
            {price ? (
              <>
                <span className='block text-xs font-semibold uppercase tracking-wide text-[var(--brand-muted)]'>
                  From
                </span>
                <strong className='font-price text-xl text-[var(--brand-brown)]'>{price}</strong>
                <span className='block text-xs text-[var(--brand-muted)]'>per person</span>
              </>
            ) : (
              <span className='text-sm font-semibold text-[var(--brand-brown)]'>
                Request a quote
              </span>
            )}
          </div>
          <Link
            className={cn(
              'inline-flex items-center gap-1 border px-4 py-2 text-xs font-bold uppercase tracking-wide',
              'transition-colors rounded-[var(--brand-radius)]',
              linkBorderClass
            )}
            href={item.href}
          >
            View Tour
            <Icons.arrowRight className='h-3.5 w-3.5' />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PackageCard({ item }: { item: PublicPackage }) {
  const price = formatTourPrice(item.priceFrom);
  const tierLabel = formatComfortTierLabel(item.comfortTier);
  const routeLabel = item.tour
    ? formatDuration(item.tour.days, item.tour.nights)
    : item.group || 'Safari Package';

  return (
    <article className='flex h-full flex-col overflow-hidden rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white'>
      <Link
        className='group relative block aspect-[4/3] overflow-hidden bg-[var(--brand-primary)]'
        href={item.href}
      >
        {item.imageUrl ? (
          <Image
            alt={item.imageAlt || item.title}
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            fill
            sizes='(max-width:768px) 100vw, 33vw'
            src={item.imageUrl}
          />
        ) : (
          <div className='absolute inset-0 bg-[var(--brand-primary-light)]' />
        )}
        <span className='absolute left-3 top-3 rounded-[var(--brand-radius)] bg-[var(--brand-lime)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-primary-dark)]'>
          {tierLabel}
        </span>
        <span className='absolute right-3 top-3 rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-ink)]'>
          {routeLabel}
        </span>
      </Link>
      <div className='flex flex-1 flex-col p-5'>
        {item.tour ? (
          <p className='mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-muted)]'>
            Package variant of {item.tour.title}
          </p>
        ) : null}
        <h3 className='brand-heading font-display text-2xl leading-tight'>
          <Link className='transition-colors hover:text-[var(--brand-primary)]' href={item.href}>
            {item.title}
          </Link>
        </h3>
        {item.excerpt ? (
          <p className='brand-body mt-3 line-clamp-3 flex-1 text-[15px] leading-7'>
            {item.excerpt}
          </p>
        ) : null}
        <div className='mt-5 flex items-end justify-between gap-4 border-t border-[var(--brand-line)] pt-4'>
          <div>
            {price ? (
              <>
                <span className='block text-xs font-semibold uppercase tracking-wide text-[var(--brand-muted)]'>
                  From
                </span>
                <strong className='font-price text-xl text-[var(--brand-brown)]'>{price}</strong>
                <span className='block text-xs text-[var(--brand-muted)]'>per person</span>
              </>
            ) : (
              <span className='text-sm font-semibold text-[var(--brand-brown)]'>
                Request a quote
              </span>
            )}
          </div>
          <Link
            className={cn(
              'brand-fill-hover inline-flex items-center gap-1 rounded-[var(--brand-radius)] border border-[var(--brand-lime)] px-4 py-2 text-xs font-bold uppercase tracking-wide',
              'text-[var(--brand-primary)] transition-colors hover:text-[var(--brand-primary-dark)]'
            )}
            href={item.href}
          >
            View Package
            <Icons.arrowRight className='h-3.5 w-3.5' />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ExperienceCard({
  item
}: {
  item: {
    category?: string | null;
    countryCodes?: string[];
    excerpt?: string | null;
    href: string;
    imageAlt?: string | null;
    imageUrl?: string | null;
    title: string;
  };
}) {
  return (
    <article className='group flex h-full flex-col overflow-hidden rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white transition-shadow hover:shadow-md'>
      <Link className='flex h-full flex-col' href={item.href} prefetch>
        <div className='relative aspect-[4/3] overflow-hidden bg-[var(--brand-primary)]'>
          {item.imageUrl ? (
            <Image
              alt={item.imageAlt || item.title}
              className='object-cover transition-transform duration-500 group-hover:scale-105'
              fill
              sizes='(max-width:768px) 100vw, 33vw'
              src={item.imageUrl}
            />
          ) : (
            <div className='absolute inset-0 bg-[var(--brand-primary-light)]' />
          )}
          {item.category ? (
            <span className='absolute left-3 top-3 rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-ink)]'>
              {item.category}
            </span>
          ) : null}
        </div>
        <div className='flex flex-1 flex-col p-5'>
          <h3 className='brand-heading font-display text-2xl leading-tight transition-colors group-hover:text-[var(--brand-primary)]'>
            {item.title}
          </h3>
          {item.excerpt ? (
            <p className='brand-body mt-3 line-clamp-3 flex-1 text-[15px] leading-7'>
              {item.excerpt}
            </p>
          ) : null}
          <div className='mt-5 flex items-center justify-between gap-4 border-t border-[var(--brand-line)] pt-4'>
            <span
              className={cn(
                'inline-flex items-center gap-1 border border-[var(--brand-primary)] px-4 py-2 text-xs font-bold uppercase tracking-wide',
                'text-[var(--brand-primary)] transition-colors group-hover:bg-[var(--brand-primary)] group-hover:text-white',
                'rounded-[var(--brand-radius)]'
              )}
            >
              View Details
              <Icons.arrowRight className='h-3.5 w-3.5' />
            </span>
            {item.countryCodes?.length ? (
              <p className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-muted)]'>
                <Icons.mapPin className='size-3.5 shrink-0 text-[var(--brand-primary)]' />
                {item.countryCodes.join(', ')}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}

export function DestinationCard({
  item
}: {
  item: {
    country?: string | null;
    region?: string | null;
    excerpt?: string | null;
    href: string;
    imageAlt?: string | null;
    imageUrl?: string | null;
    title: string;
  };
}) {
  const badge = item.country?.trim() || 'East Africa';

  return (
    <article className='group flex h-full flex-col overflow-hidden rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white shadow-sm transition-shadow hover:shadow-md'>
      <Link
        className='relative block aspect-[4/3] overflow-hidden bg-[var(--brand-primary)]'
        href={item.href}
      >
        {item.imageUrl ? (
          <Image
            alt={item.imageAlt || item.title}
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            fill
            sizes='(max-width:768px) 100vw, 33vw'
            src={item.imageUrl}
          />
        ) : (
          <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-dark)]'>
            <Icons.mapPin className='size-10 text-white/25' />
            <span className='absolute bottom-3 left-3 right-3 truncate font-display text-lg text-white/90'>
              {item.title}
            </span>
          </div>
        )}
        <span className='absolute right-3 top-3 rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white/95 px-3 py-1 text-xs font-bold uppercase text-[var(--brand-ink)]'>
          {badge}
        </span>
      </Link>
      <div className='flex flex-1 flex-col p-5'>
        <h3 className='brand-heading font-display text-2xl'>
          <Link className='transition-colors hover:text-[var(--brand-primary)]' href={item.href}>
            {item.title}
          </Link>
        </h3>
        {item.region ? (
          <p className='mt-1.5 inline-flex items-center gap-1.5 text-sm text-[var(--brand-muted)]'>
            <Icons.mapPin className='size-3.5 text-[var(--brand-primary)]' />
            {item.region}
          </p>
        ) : null}
        {item.excerpt ? (
          <p className='brand-body mt-3 line-clamp-3 flex-1 text-[15px] leading-7'>
            {item.excerpt}
          </p>
        ) : null}
        <div className='mt-5 border-t border-[var(--brand-line)] pt-4'>
          <BrandButton href={item.href} size='sm' variant='accent-outline'>
            Explore Destination
          </BrandButton>
        </div>
      </div>
    </article>
  );
}
