'use client';

import { useEffect, useRef } from 'react';

import {
  ListingFilterGroup,
  ListingFilterOption,
  ListingFilters,
  toggleFilterValue
} from '@/components/public/listing-filters';
import { BRAND_PUBLIC_COUNTRIES } from '@/features/experiences/public/country-map-copy';
import type {
  ExperienceListingFiltersState,
  ExperienceMenuGroup
} from '@/features/experiences/public/filters';
import type { BrandCountryId } from '@/features/experiences/public/country-map-copy';

type ExperienceListingFiltersProps = {
  active: ExperienceListingFiltersState;
  onChange: (next: ExperienceListingFiltersState) => void;
};

const MENU_GROUP_FILTERS = [
  {
    label: 'Top Experiences',
    value: 'top_experiences' as const
  },
  {
    label: 'Wildlife Safari',
    value: 'wildlife_safari' as const
  }
];

export function ExperienceListingFilters({ active, onChange }: ExperienceListingFiltersProps) {
  const draftRef = useRef(active);

  useEffect(() => {
    draftRef.current = active;
  }, [active]);

  const activeCount = active.countries.length + active.groups.length;

  function update(partial: Partial<ExperienceListingFiltersState>) {
    const next = { ...draftRef.current, ...partial };
    draftRef.current = next;
    onChange(next);
  }

  function clear() {
    const next = { countries: [], groups: [] } satisfies ExperienceListingFiltersState;
    draftRef.current = next;
    onChange(next);
  }

  return (
    <ListingFilters
      activeCount={activeCount}
      clearLabel='Clear all'
      onClear={clear}
      title='Experiences'
    >
      <ListingFilterGroup title='Show'>
        <ListingFilterOption
          checked={activeCount === 0}
          id='filter-all-experiences'
          label='All experiences'
          name='experience-scope'
          type='radio'
          onChange={clear}
        />
      </ListingFilterGroup>

      <ListingFilterGroup title='Country'>
        {BRAND_PUBLIC_COUNTRIES.map((country) => (
          <ListingFilterOption
            checked={active.countries.includes(country.id)}
            id={`filter-country-${country.id}`}
            key={country.id}
            label={country.name}
            onChange={() =>
              update({
                countries: toggleFilterValue(
                  draftRef.current.countries,
                  country.id
                ) as BrandCountryId[]
              })
            }
          />
        ))}
      </ListingFilterGroup>

      <ListingFilterGroup title='Collection'>
        {MENU_GROUP_FILTERS.map((entry) => (
          <ListingFilterOption
            checked={active.groups.includes(entry.value)}
            id={`filter-group-${entry.value}`}
            key={entry.value}
            label={entry.label}
            onChange={() =>
              update({
                groups: toggleFilterValue(
                  draftRef.current.groups,
                  entry.value
                ) as ExperienceMenuGroup[]
              })
            }
          />
        ))}
      </ListingFilterGroup>
    </ListingFilters>
  );
}
