'use client';

import { useRouter } from 'next/navigation';

import {
  ListingFilterDropdown,
  ListingFilterGroup,
  ListingFilterOption,
  ListingFilters,
  toggleFilterValue,
  useDraftFilters
} from '@/components/public/listing-filters';
import type { ParkFilterFacets } from '@/lib/public/national-parks';
import { localePath } from '@/lib/public/locale-path';

type NationalParkFiltersProps = {
  active: {
    activities: string[];
    countries: string[];
    regions: string[];
    wildlife: string[];
  };
  facets: ParkFilterFacets;
  locale: string;
};

function buildQuery(active: NationalParkFiltersProps['active']) {
  const params = new URLSearchParams();
  if (active.countries.length) params.set('country', active.countries.join(','));
  if (active.regions.length) params.set('region', active.regions.join(','));
  if (active.wildlife.length) params.set('wildlife', active.wildlife.join(','));
  if (active.activities.length) params.set('activity', active.activities.join(','));
  return params.toString();
}

function filterId(group: string, value: string) {
  return `park-${group}-${value.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
}

function countActive(active: NationalParkFiltersProps['active']) {
  return (
    active.countries.length +
    active.regions.length +
    active.wildlife.length +
    active.activities.length
  );
}

export function NationalParkFilters({ active, facets, locale }: NationalParkFiltersProps) {
  const router = useRouter();
  const basePath = localePath(locale, '/national-parks');
  const { commit, draft, draftRef } = useDraftFilters(active, buildQuery, (query) => {
    router.push(query ? `${basePath}?${query}` : basePath, { scroll: false });
  });
  const hasFacetValues =
    facets.countries.length ||
    facets.regions.length ||
    facets.wildlife.length ||
    facets.activities.length;

  function update(partial: Partial<NationalParkFiltersProps['active']>) {
    commit({ ...draftRef.current, ...partial });
  }

  return (
    <ListingFilters
      activeCount={countActive(draft)}
      clearLabel='Clear all'
      onClear={() => {
        commit({ activities: [], countries: [], regions: [], wildlife: [] });
      }}
      title='National parks'
    >
      {!hasFacetValues ? (
        <p className='text-sm leading-6 text-[var(--brand-muted)]'>
          Published park filters will appear here as park guides are added.
        </p>
      ) : null}

      {facets.countries.length ? (
        <ListingFilterGroup title='Country'>
          {facets.countries.map((country) => (
            <ListingFilterOption
              checked={draft.countries.includes(country)}
              id={filterId('country', country)}
              key={country}
              label={country}
              onChange={() =>
                update({ countries: toggleFilterValue(draftRef.current.countries, country) })
              }
            />
          ))}
        </ListingFilterGroup>
      ) : null}

      {facets.regions.length ? (
        <ListingFilterDropdown
          selectedCount={draft.regions.length}
          title='Region'
          triggerLabel='Select regions'
        >
          {facets.regions.map((region) => (
            <ListingFilterOption
              checked={draft.regions.includes(region)}
              id={filterId('region', region)}
              key={region}
              label={region}
              onChange={() =>
                update({ regions: toggleFilterValue(draftRef.current.regions, region) })
              }
            />
          ))}
        </ListingFilterDropdown>
      ) : null}

      {facets.wildlife.length ? (
        <ListingFilterDropdown
          selectedCount={draft.wildlife.length}
          title='Wildlife'
          triggerLabel='Select wildlife'
        >
          {facets.wildlife.map((animal) => (
            <ListingFilterOption
              checked={draft.wildlife.includes(animal)}
              id={filterId('wildlife', animal)}
              key={animal}
              label={animal}
              onChange={() =>
                update({ wildlife: toggleFilterValue(draftRef.current.wildlife, animal) })
              }
            />
          ))}
        </ListingFilterDropdown>
      ) : null}

      {facets.activities.length ? (
        <ListingFilterDropdown
          selectedCount={draft.activities.length}
          title='Activities'
          triggerLabel='Select activities'
        >
          {facets.activities.map((activity) => (
            <ListingFilterOption
              checked={draft.activities.includes(activity)}
              id={filterId('activity', activity)}
              key={activity}
              label={activity}
              onChange={() =>
                update({ activities: toggleFilterValue(draftRef.current.activities, activity) })
              }
            />
          ))}
        </ListingFilterDropdown>
      ) : null}
    </ListingFilters>
  );
}
