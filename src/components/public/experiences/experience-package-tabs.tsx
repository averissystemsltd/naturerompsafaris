'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { BrandButton } from '@/components/public/ui/brand-button';
import { formatTourPrice } from '@/lib/public/tour-format';
import { localePath } from '@/lib/public/locale-path';
import { cn } from '@/lib/utils';
import type { PublicExperiencePackageLevel } from '@/features/experiences/public/types';

type ExperiencePackageTabsProps = {
  levels: PublicExperiencePackageLevel[];
  locale: string;
};

function collectBands(level: PublicExperiencePackageLevel) {
  const bands: string[] = [];
  for (const season of level.seasons) {
    for (const cell of season.cells) {
      if (!bands.includes(cell.groupBand)) bands.push(cell.groupBand);
    }
  }
  return bands;
}

function formatBandLabel(band: string) {
  const normalized = band.trim().toLowerCase();
  if (normalized.includes('pax') || normalized.includes('person')) return band;
  return `${band} pax`;
}

const PACKAGE_LEVELS: Array<{
  fallbackBlurb: string;
  key: PublicExperiencePackageLevel['key'];
  label: string;
}> = [
  {
    fallbackBlurb:
      'Simple stays and practical routing for travellers who want the experience first.',
    key: 'economy',
    label: 'Economy'
  },
  {
    fallbackBlurb: 'Good-value camps and lodges with the core safari route kept intact.',
    key: 'budget',
    label: 'Budget'
  },
  {
    fallbackBlurb: 'Balanced comfort, strong locations, and a polished safari rhythm.',
    key: 'mid_range',
    label: 'Mid-Range'
  },
  {
    fallbackBlurb: 'Premium lodges and camps with elevated comfort throughout the route.',
    key: 'luxury',
    label: 'Luxury'
  },
  {
    fallbackBlurb:
      'Top-tier camps, private touches, and the most refined version of this experience.',
    key: 'high_end',
    label: 'High-End'
  }
];

function tierTheme(key: PublicExperiencePackageLevel['key']) {
  if (key === 'economy') {
    return {
      Icon: Icons.package,
      active: 'border-emerald-600 bg-emerald-600 text-white',
      headBg: '#047857',
      inactive: 'border-emerald-600/25 text-emerald-700 hover:border-emerald-600'
    };
  }
  if (key === 'budget') {
    return {
      Icon: Icons.badgeCheck,
      active: 'border-[#5f8a3d] bg-[#5f8a3d] text-white',
      headBg: '#5f8a3d',
      inactive: 'border-[#5f8a3d]/25 text-[#5f8a3d] hover:border-[#5f8a3d]'
    };
  }
  if (key === 'luxury') {
    return {
      Icon: Icons.pro,
      active: 'border-[var(--brand-gold)] bg-[var(--brand-gold)] text-[var(--brand-primary-dark)]',
      headBg: 'var(--brand-gold)',
      headFg: 'var(--brand-primary-dark)',
      inactive:
        'border-[var(--brand-gold)]/40 text-[var(--brand-brown)] hover:border-[var(--brand-gold)]'
    };
  }
  if (key === 'high_end') {
    return {
      Icon: Icons.sparkles,
      active: 'border-[var(--brand-primary-dark)] bg-[var(--brand-primary-dark)] text-white',
      headBg: 'var(--brand-primary-dark)',
      inactive:
        'border-[var(--brand-primary-dark)]/25 text-[var(--brand-primary-dark)] hover:border-[var(--brand-primary-dark)]'
    };
  }
  return {
    Icon: Icons.exclusive,
    active: 'border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white',
    headBg: 'var(--brand-primary)',
    inactive:
      'border-[var(--brand-primary)]/25 text-[var(--brand-primary)] hover:border-[var(--brand-primary)]'
  };
}

function PriceCell({ currency, price }: { currency: string; price: number | null | undefined }) {
  if (!price) {
    return <span className='text-xs text-[var(--brand-muted)]'>On request</span>;
  }

  return (
    <span className='inline-flex flex-col items-center leading-tight'>
      <strong className='font-price text-base text-[var(--brand-heading)] sm:text-[1.05rem]'>
        {formatTourPrice(price, currency)}
      </strong>
      <span className='mt-1 text-[10px] font-normal text-[var(--brand-muted)] sm:text-[11px]'>
        per person
      </span>
    </span>
  );
}

function EmptyPackageGuide({ locale }: { locale: string }) {
  return (
    <div className='brand-contact-credentials-box'>
      <h3 className='brand-heading font-display text-2xl'>Package Prices On Request</h3>
      <p className='brand-body mt-3 max-w-2xl text-sm leading-7'>
        This experience can be shaped around economy, mid-range, luxury, or high-end comfort levels.
        Pricing depends on the selected trip, season, lodge availability, and group size.
      </p>
      <div className='mt-5'>
        <BrandButton href={localePath(locale, '/contact')} size='sm'>
          Request Package Prices
        </BrandButton>
      </div>
    </div>
  );
}

export function ExperiencePackageTabs({ levels, locale }: ExperiencePackageTabsProps) {
  const levelsByKey = React.useMemo(
    () => new Map(levels.map((level) => [level.key, level])),
    [levels]
  );
  const firstAvailable =
    PACKAGE_LEVELS.find((level) => levelsByKey.has(level.key))?.key ?? levels[0]?.key ?? 'luxury';
  const [activeKey, setActiveKey] =
    React.useState<PublicExperiencePackageLevel['key']>(firstAvailable);
  const activeLevel = levelsByKey.get(activeKey) ?? levelsByKey.get(firstAvailable) ?? levels[0];

  React.useEffect(() => {
    if (!levelsByKey.has(activeKey)) setActiveKey(firstAvailable);
  }, [activeKey, firstAvailable, levelsByKey]);

  if (!levels.length || !activeLevel) return <EmptyPackageGuide locale={locale} />;

  const bands = collectBands(activeLevel);
  const activeTheme = tierTheme(activeLevel.key);
  const seasonWidth = bands.length > 4 ? 24 : 26;
  const paxWidth = bands.length ? (100 - seasonWidth) / bands.length : 0;
  const headStyle = {
    '--pricing-head-bg': activeTheme.headBg,
    '--pricing-head-fg': activeTheme.headFg ?? '#fff'
  } as React.CSSProperties;

  return (
    <div>
      <div
        className='flex flex-wrap justify-center gap-3'
        role='tablist'
        aria-label='Package levels'
      >
        {PACKAGE_LEVELS.map((packageLevel) => {
          const level = levelsByKey.get(packageLevel.key);
          const theme = tierTheme(packageLevel.key);
          const Icon = theme.Icon;
          const active = activeLevel.key === packageLevel.key && Boolean(level);
          return (
            <button
              aria-disabled={!level}
              disabled={!level}
              key={packageLevel.key}
              type='button'
              role='tab'
              aria-selected={active}
              className={cn(
                'inline-flex items-center gap-2 rounded-[var(--brand-radius)] border bg-white px-5 py-3 text-xs font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]',
                active ? theme.active : theme.inactive,
                !level &&
                  'cursor-not-allowed border-[var(--brand-line)] text-[var(--brand-muted)] opacity-45 hover:border-[var(--brand-line)]'
              )}
              onClick={() => {
                if (level) setActiveKey(level.key);
              }}
            >
              <Icon className='h-4 w-4' />
              {packageLevel.label}
            </button>
          );
        })}
      </div>

      <div className='mx-auto mt-8 max-w-5xl'>
        <div className='mb-6 text-center'>
          <h3 className='brand-heading font-display text-2xl'>{activeLevel.label}</h3>
          <p className='brand-body mx-auto mt-2 max-w-2xl text-sm leading-7'>
            {activeLevel.blurb ||
              PACKAGE_LEVELS.find((level) => level.key === activeLevel.key)?.fallbackBlurb}
          </p>
        </div>

        <div className='brand-pricing-tier brand-pricing-tier--table-only'>
          {bands.length && activeLevel.seasons.length ? (
            <div className='brand-thin-scrollbar overflow-x-auto lg:overflow-x-visible'>
              <div className='brand-pricing-tier__table-shell'>
                <table className='brand-pricing-tier__table text-left text-sm'>
                  <colgroup>
                    <col style={{ width: `${seasonWidth}%` }} />
                    {bands.map((band) => (
                      <col key={band} style={{ width: `${paxWidth}%` }} />
                    ))}
                  </colgroup>
                  <thead className='brand-pricing-tier__head' style={headStyle}>
                    <tr>
                      <th scope='col'>Travel period</th>
                      {bands.map((band) => (
                        <th key={band} scope='col'>
                          {formatBandLabel(band)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeLevel.seasons.map((season) => (
                      <tr className='brand-pricing-tier__row' key={season.label}>
                        <th className='brand-pricing-tier__season' scope='row'>
                          {season.label}
                        </th>
                        {bands.map((band) => {
                          const cell = season.cells.find((item) => item.groupBand === band);
                          return (
                            <td className='brand-pricing-tier__price tabular-nums' key={band}>
                              <PriceCell currency={activeLevel.currency} price={cell?.price} />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {bands.length > 2 ? (
                <p className='brand-pricing-tier__scroll-hint'>
                  Swipe the table to see all prices →
                </p>
              ) : null}
            </div>
          ) : (
            <div className='flex min-h-48 flex-col items-center justify-center gap-3 p-6 text-center'>
              <Icons.info className='h-8 w-8 text-[var(--brand-gold)]' />
              <p className='brand-body max-w-sm text-sm leading-7'>
                Detailed group-size prices for this level are still being prepared.
              </p>
            </div>
          )}
        </div>

        <div className='mt-5 flex flex-col gap-3 border-t border-[rgb(60_81_66/8%)] pt-5 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm leading-6 text-[var(--brand-muted)]'>
            Prices are per person and vary by travel period, rooming, park fees, and lodge
            availability.
          </p>
          <BrandButton
            className='group'
            href={localePath(locale, '/contact')}
            size='sm'
            variant='accent-outline'
          >
            <span className='relative flex h-4 w-4 items-center justify-center'>
              <Icons.mail className='h-4 w-4 animate-pulse' />
              <Icons.whatsapp className='absolute h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
            </span>
            Enquire
          </BrandButton>
        </div>
      </div>
    </div>
  );
}
