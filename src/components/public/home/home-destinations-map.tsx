'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { BrandCountryId } from '@/features/experiences/public/country-map-copy';
import { ExperienceAfricaMap } from '@/components/public/experiences/experience-africa-map';
import { HomeEastAfricaMap } from '@/components/public/home/home-east-africa-map';
import { Icons } from '@/components/icons';
import { SectionHeader } from '@/components/public/ui/section-header';
import { useSitePhotos } from '@/components/public/site-photos-provider';
import { localePath } from '@/lib/public/locale-path';
import { cn } from '@/lib/utils';

const HOME_COUNTRY_TILES = [
  {
    href: '/tours?country=kenya',
    imageAlt: 'Maasai Mara plains on a Kenya safari with Nature Romp Safaris',
    imageSlot: 'home-dest-kenya' as const,
    label: 'Kenya safaris',
    body: 'Maasai Mara big cats, Amboseli elephants under Kilimanjaro, Tsavo, and the migration on the Kenyan side of the river.'
  },
  {
    href: '/tours?country=tanzania',
    imageAlt: 'Serengeti wildlife on a Tanzania safari with Nature Romp Safaris',
    imageSlot: 'home-dest-tanzania' as const,
    label: 'Tanzania safaris',
    body: 'Serengeti plains, Ngorongoro Crater, Kilimanjaro, and a northern circuit paced so you are not rushing between parks.'
  },
  {
    href: '/tours',
    imageAlt: 'Combined Kenya and Tanzania safari with Nature Romp Safaris',
    imageSlot: 'home-dest-combined' as const,
    label: 'Kenya and Tanzania safaris',
    body: 'One itinerary across both countries: Maasai Mara into Serengeti, Amboseli under Kilimanjaro, then the coast if you want it.'
  }
] as const;

type HomeDestinationsMapProps = {
  description?: string;
  excludedCountryIds?: readonly BrandCountryId[];
  eyebrow?: string;
  fitWestBufferIsos?: readonly string[];
  kenyaCopy?: string;
  locale: string;
  showCountryTiles?: boolean;
  showEastAfricaMap?: boolean;
  tanzaniaCopy?: string;
  title?: string;
};

export function HomeDestinationsMap({
  description = 'Nature Romp Safaris plans Kenya on its own, Tanzania on its own, and the combination most guests actually want: Maasai Mara into Serengeti, Amboseli under Kilimanjaro, then Diani or Zanzibar if you want the coast. Tap a country on the map.',
  excludedCountryIds,
  eyebrow = 'Where we take you',
  fitWestBufferIsos,
  kenyaCopy,
  locale,
  showCountryTiles = false,
  showEastAfricaMap,
  tanzaniaCopy,
  title = 'Kenya, Tanzania, or both in one itinerary'
}: HomeDestinationsMapProps) {
  const photos = useSitePhotos();
  const kenyaTanzaniaMap = showEastAfricaMap ?? showCountryTiles;

  return (
    <section className='bg-[var(--brand-warm-gray)]'>
      <div
        className={cn(
          'brand-container pt-[clamp(4.25rem,7.5vw,6.75rem)]',
          (showCountryTiles || kenyaTanzaniaMap) && 'pb-[clamp(4.25rem,7.5vw,6.75rem)]'
        )}
      >
        <SectionHeader description={description} eyebrow={eyebrow || undefined} title={title} />

        {showCountryTiles ? (
          <div className='mt-12 grid gap-6 md:grid-cols-3'>
            {HOME_COUNTRY_TILES.map((tile) => (
              <Link
                className='group relative block overflow-hidden rounded-[var(--brand-radius)] bg-[var(--brand-primary)]'
                href={localePath(locale, tile.href)}
                key={tile.href}
              >
                <span className='relative block aspect-[4/3] min-h-[17.5rem]'>
                  <Image
                    alt={tile.imageAlt}
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    fill
                    sizes='(max-width:768px) 100vw, 33vw'
                    src={photos[tile.imageSlot]}
                  />
                  <span
                    aria-hidden
                    className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5'
                  />
                  <span className='absolute inset-x-0 bottom-0 p-5 lg:p-6'>
                    <span className='block font-display text-[1.35rem] leading-tight text-white lg:text-[1.5rem]'>
                      {tile.label}
                    </span>
                    <span className='mt-2 block text-sm leading-6 text-white/88'>{tile.body}</span>
                    <span className='mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-gold)]'>
                      View safaris
                      <Icons.arrowRight className='h-3 w-3 transition-transform group-hover:translate-x-1' />
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        ) : null}

        {kenyaTanzaniaMap ? (
          <HomeEastAfricaMap kenyaCopy={kenyaCopy} locale={locale} tanzaniaCopy={tanzaniaCopy} />
        ) : null}
      </div>

      {kenyaTanzaniaMap ? null : (
        <ExperienceAfricaMap
          excludedCountryIds={excludedCountryIds}
          fitWestBufferIsos={fitWestBufferIsos}
        />
      )}
    </section>
  );
}
