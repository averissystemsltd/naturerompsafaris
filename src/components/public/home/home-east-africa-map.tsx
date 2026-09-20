'use client';

import { geoMercator, geoPath } from 'd3-geo';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Feature, FeatureCollection, Geometry, Point } from 'geojson';

import { Icons } from '@/components/icons';
import { localePath } from '@/lib/public/locale-path';
import { cn } from '@/lib/utils';
import eastAfricaGeoJson from '@/data/east-africa-focus.json';

const DESTINATIONS = {
  Kenya: {
    color: '#5d2411',
    copy: 'Maasai Mara big cats, Amboseli elephants under Kilimanjaro, Tsavo, and the migration on the Kenyan side of the river.',
    href: '/tours?country=kenya',
    cta: 'View Kenya safaris'
  },
  Tanzania: {
    color: '#c78a2b',
    copy: 'Serengeti plains, Ngorongoro Crater, Kilimanjaro, and a northern circuit paced so you are not rushing between parks.',
    href: '/tours?country=tanzania',
    cta: 'View Tanzania safaris'
  }
} as const;

const ZANZIBAR_MARKER = '#3d5c48';

type DestinationName = keyof typeof DESTINATIONS;
type DestinationFeature = Feature<
  Geometry,
  { iso3: string; name: DestinationName | 'Zanzibar'; source?: string }
>;

const MUTED_FILL = '#e4dfd6';
const MUTED_STROKE = '#cfc8bc';
const MAP_SIZE = 520;

const collection = eastAfricaGeoJson as FeatureCollection<
  Geometry,
  DestinationFeature['properties']
>;

function destinationName(feature: DestinationFeature): DestinationName {
  return feature.properties.name === 'Zanzibar' ? 'Tanzania' : feature.properties.name;
}

type HomeEastAfricaMapProps = {
  kenyaCopy?: string;
  locale: string;
  tanzaniaCopy?: string;
};

export function HomeEastAfricaMap({ kenyaCopy, locale, tanzaniaCopy }: HomeEastAfricaMapProps) {
  const [active, setActive] = useState<DestinationName>('Kenya');

  const map = useMemo(() => {
    const countryFeatures = collection.features.filter(
      (feature) => feature.geometry.type !== 'Point'
    ) as DestinationFeature[];
    const zanzibar = collection.features.find(
      (feature) => feature.properties.name === 'Zanzibar' && feature.geometry.type === 'Point'
    ) as Feature<Point, DestinationFeature['properties']> | undefined;
    const projection = geoMercator().fitSize([MAP_SIZE, MAP_SIZE], {
      type: 'FeatureCollection',
      features: countryFeatures
    });
    const path = geoPath(projection);
    const zanzibarPoint = zanzibar
      ? projection(zanzibar.geometry.coordinates as [number, number])
      : null;

    return { countryFeatures, path, zanzibarPoint };
  }, []);

  const destinations = Object.keys(DESTINATIONS) as DestinationName[];

  return (
    <div className='mt-16'>
      <div
        aria-label='Destination focus'
        className='mx-auto flex w-fit overflow-hidden rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white'
        role='tablist'
      >
        {destinations.map((name) => (
          <button
            aria-selected={active === name}
            className={cn(
              'min-h-11 cursor-pointer border-[var(--brand-line)] px-6 text-sm font-semibold tracking-wide transition-colors not-last:border-r',
              active === name
                ? 'bg-[var(--brand-primary)] text-white'
                : 'bg-transparent text-[var(--brand-muted)] hover:text-[var(--brand-primary)]'
            )}
            key={name}
            onClick={() => setActive(name)}
            role='tab'
            type='button'
          >
            {name}
          </button>
        ))}
      </div>

      <div className='mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,34rem)_minmax(16rem,22rem)] lg:justify-center lg:gap-16'>
        <div aria-label='Map of Kenya and Tanzania'>
          <svg className='block h-auto w-full' role='img' viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}>
            <title>Kenya and Tanzania safari map</title>
            <g>
              {map.countryFeatures.map((feature) => {
                const name = destinationName(feature);
                const highlighted = active === name;

                return (
                  <path
                    className='cursor-pointer transition-[fill,stroke] duration-200'
                    d={map.path(feature) ?? undefined}
                    fill={highlighted ? DESTINATIONS[name].color : MUTED_FILL}
                    key={feature.properties.iso3}
                    onClick={() => setActive(name)}
                    onMouseEnter={() => setActive(name)}
                    stroke={highlighted ? DESTINATIONS[name].color : MUTED_STROKE}
                    strokeWidth={highlighted ? 1.6 : 0.9}
                  />
                );
              })}
            </g>
            {map.zanzibarPoint ? (
              <g
                className='cursor-pointer'
                onClick={() => setActive('Tanzania')}
                onMouseEnter={() => setActive('Tanzania')}
                transform={`translate(${map.zanzibarPoint[0]} ${map.zanzibarPoint[1]})`}
              >
                <circle
                  fill='none'
                  opacity={active === 'Tanzania' ? 0.45 : 0.25}
                  r='15'
                  stroke={ZANZIBAR_MARKER}
                  strokeWidth='1.5'
                />
                <circle fill={ZANZIBAR_MARKER} r='8' />
              </g>
            ) : null}
            <text
              className='pointer-events-none'
              fill={active === 'Kenya' ? '#f7f4ef' : '#5d2411'}
              fontSize='16'
              fontWeight='700'
              textAnchor='middle'
              x='328'
              y='118'
            >
              Kenya
            </text>
            <text
              className='pointer-events-none'
              fill={active === 'Tanzania' ? '#f7f4ef' : '#5d2411'}
              fontSize='16'
              fontWeight='700'
              textAnchor='middle'
              x='220'
              y='355'
            >
              Tanzania
            </text>
            <line
              className='pointer-events-none'
              stroke='#5d2411'
              strokeWidth='1.2'
              x1='392'
              x2='380'
              y1='348'
              y2='346'
            />
            <text
              className='pointer-events-none'
              fill='#5d2411'
              fontSize='15'
              fontWeight='700'
              x='396'
              y='352'
            >
              Zanzibar
            </text>
          </svg>
        </div>

        <div className='border-l-4 pl-6' style={{ borderColor: DESTINATIONS[active].color }}>
          <h3 className='font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none text-[var(--brand-heading)]'>
            {active}
          </h3>
          <p className='brand-body mt-4 text-[15px] leading-7'>
            {active === 'Kenya'
              ? (kenyaCopy ?? DESTINATIONS.Kenya.copy)
              : (tanzaniaCopy ?? DESTINATIONS.Tanzania.copy)}
          </p>
          <Link
            className='mt-6 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-gold)] transition-colors hover:text-[var(--brand-gold-hover)]'
            href={localePath(locale, DESTINATIONS[active].href)}
          >
            {DESTINATIONS[active].cta}
            <Icons.arrowRight className='h-3 w-3' />
          </Link>
        </div>
      </div>
    </div>
  );
}
