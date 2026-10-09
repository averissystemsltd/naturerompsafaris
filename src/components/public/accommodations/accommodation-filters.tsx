'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import {
  ListingFilterDropdown,
  ListingFilterEmpty,
  ListingFilterGroup,
  ListingFilterOption,
  ListingFilterRange,
  ListingFilters,
  toggleFilterValue,
  useDraftFilters
} from '@/components/public/listing-filters';
import {
  ACCOMMODATION_COMFORT_LEVELS,
  ACCOMMODATION_COUNTRIES,
  ACCOMMODATION_PROPERTY_TYPES,
  countriesMatch,
  formatComfortLevelLabel,
  formatCountryLabel,
  normalizeCountryValue
} from '@/features/accommodations/public/constants';
import { localePath } from '@/lib/public/locale-path';

type AccommodationActive = {
  comfortLevels: string[];
  countries: string[];
  destinations: string[];
  maxPrice?: string;
  minPrice?: string;
  propertyTypes: string[];
  regions: string[];
};

type AccommodationFiltersProps = {
  active: AccommodationActive;
  facets: {
    comfortLevels: string[];
    countries: string[];
    destinations: Array<{ country: string | null; label: string; slug: string }>;
    propertyTypes: string[];
    regions: string[];
  };
  locale: string;
  priceBounds: {
    max: number;
    min: number;
  };
};

function buildQuery(active: AccommodationActive) {
  const params = new URLSearchParams();
  if (active.countries.length) params.set('country', active.countries.join(','));
  if (active.destinations.length) params.set('destination', active.destinations.join(','));
  if (active.propertyTypes.length) params.set('property_type', active.propertyTypes.join(','));
  if (active.comfortLevels.length) params.set('comfort_level', active.comfortLevels.join(','));
  if (active.regions.length) params.set('region', active.regions.join(','));
  if (active.minPrice) params.set('min_price', active.minPrice);
  if (active.maxPrice) params.set('max_price', active.maxPrice);
  return params.toString();
}

function countActiveFilters(active: AccommodationActive) {
  return (
    active.countries.length +
    active.destinations.length +
    active.propertyTypes.length +
    active.comfortLevels.length +
    active.regions.length +
    (active.minPrice || active.maxPrice ? 1 : 0)
  );
}

const EMPTY_FILTERS: AccommodationActive = {
  comfortLevels: [],
  countries: [],
  destinations: [],
  maxPrice: undefined,
  minPrice: undefined,
  propertyTypes: [],
  regions: []
};

export function AccommodationFilters({
  active,
  facets,
  locale,
  priceBounds
}: AccommodationFiltersProps) {
  const router = useRouter();
  const basePath = localePath(locale, '/accommodations');
  const { commit, draft, draftRef } = useDraftFilters(active, buildQuery, (query) => {
    router.push(query ? `${basePath}?${query}` : basePath, { scroll: false });
  });

  // Prefer countries that actually have published stays; fall back to the full preset list.
  const countries = (
    facets.countries.length
      ? facets.countries.map((country) => normalizeCountryValue(country) ?? country).filter(Boolean)
      : ACCOMMODATION_COUNTRIES.map((country) => country.value)
  ).filter((country, index, list) => list.indexOf(country) === index);

  const propertyTypes = (
    facets.propertyTypes.length
      ? [
          ...ACCOMMODATION_PROPERTY_TYPES.filter((type) => facets.propertyTypes.includes(type)),
          ...facets.propertyTypes.filter(
            (type) =>
              !ACCOMMODATION_PROPERTY_TYPES.includes(
                type as (typeof ACCOMMODATION_PROPERTY_TYPES)[number]
              )
          )
        ]
      : [...ACCOMMODATION_PROPERTY_TYPES]
  ).filter((type, index, list) => list.indexOf(type) === index);

  const comfortLevels = ACCOMMODATION_COMFORT_LEVELS.map((level) => level.value).filter(
    (value) => facets.comfortLevels.length === 0 || facets.comfortLevels.includes(value)
  );

  const selectedCountries = draft.countries
    .map((country) => normalizeCountryValue(country) ?? country)
    .filter(Boolean);

  const destinations = selectedCountries.length
    ? facets.destinations.filter((destination) =>
        selectedCountries.some((country) => countriesMatch(destination.country, country))
      )
    : facets.destinations;

  const sliderMin = priceBounds.min;
  const sliderMax = Math.max(priceBounds.max, sliderMin + 100);
  const activeMin = draft.minPrice ? Number(draft.minPrice) : sliderMin;
  const activeMax = draft.maxPrice ? Number(draft.maxPrice) : sliderMax;
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    Number.isFinite(activeMin) ? activeMin : sliderMin,
    Number.isFinite(activeMax) ? activeMax : sliderMax
  ]);

  React.useEffect(() => {
    setPriceRange([
      draft.minPrice ? Number(draft.minPrice) : sliderMin,
      draft.maxPrice ? Number(draft.maxPrice) : sliderMax
    ]);
  }, [draft.minPrice, draft.maxPrice, sliderMin, sliderMax]);

  function update(partial: Partial<AccommodationActive>) {
    const next = { ...draftRef.current, ...partial };

    if (partial.countries) {
      const nextCountries = partial.countries
        .map((country) => normalizeCountryValue(country) ?? country)
        .filter(Boolean);
      next.destinations = next.destinations.filter((slug) => {
        const destination = facets.destinations.find((item) => item.slug === slug);
        if (!destination) return false;
        if (!nextCountries.length) return true;
        return nextCountries.some((country) => countriesMatch(destination.country, country));
      });
    }

    commit(next);
  }

  const activeCount = countActiveFilters(draft);

  return (
    <ListingFilters
      activeCount={activeCount}
      clearLabel='Clear all'
      onClear={() => {
        setPriceRange([sliderMin, sliderMax]);
        commit(EMPTY_FILTERS);
      }}
      title='Accommodations'
    >
      <ListingFilterGroup title='Country'>
        {countries.map((country) => {
          const checked = draft.countries.some((value) => normalizeCountryValue(value) === country);
          return (
            <ListingFilterOption
              key={country}
              checked={checked}
              id={`filter-country-${country.replace(/\W+/g, '-').toLowerCase()}`}
              label={formatCountryLabel(country) ?? country}
              onChange={() =>
                update({ countries: toggleFilterValue(draftRef.current.countries, country) })
              }
            />
          );
        })}
      </ListingFilterGroup>

      <ListingFilterDropdown
        hint={
          selectedCountries.length
            ? undefined
            : 'Showing all destinations. Select a country to narrow the list.'
        }
        selectedCount={draft.destinations.length}
        title='Destination'
        triggerLabel='Select destinations'
      >
        {destinations.length ? (
          destinations.map((destination) => (
            <ListingFilterOption
              key={destination.slug}
              checked={draft.destinations.includes(destination.slug)}
              id={`filter-destination-${destination.slug}`}
              label={destination.label}
              onChange={() =>
                update({
                  destinations: toggleFilterValue(draftRef.current.destinations, destination.slug)
                })
              }
            />
          ))
        ) : (
          <ListingFilterEmpty>
            {selectedCountries.length
              ? 'No destinations for the selected country yet.'
              : 'No destinations published yet.'}
          </ListingFilterEmpty>
        )}
      </ListingFilterDropdown>

      <ListingFilterGroup title='Property type'>
        {propertyTypes.map((type) => (
          <ListingFilterOption
            key={type}
            checked={draft.propertyTypes.includes(type)}
            id={`filter-type-${type.replace(/\s+/g, '-').toLowerCase()}`}
            label={type}
            onChange={() =>
              update({
                propertyTypes: toggleFilterValue(draftRef.current.propertyTypes, type)
              })
            }
          />
        ))}
      </ListingFilterGroup>

      <ListingFilterGroup title='Comfort level'>
        {comfortLevels.map((level) => (
          <ListingFilterOption
            key={level}
            checked={draft.comfortLevels.includes(level)}
            id={`filter-comfort-${level}`}
            label={formatComfortLevelLabel(level) ?? level}
            onChange={() =>
              update({
                comfortLevels: toggleFilterValue(draftRef.current.comfortLevels, level)
              })
            }
          />
        ))}
      </ListingFilterGroup>

      {facets.regions.length ? (
        <ListingFilterDropdown
          selectedCount={draft.regions.length}
          title='Location'
          triggerLabel='Select locations'
        >
          {facets.regions.map((region) => (
            <ListingFilterOption
              key={region}
              checked={draft.regions.includes(region)}
              id={`filter-region-${region.replace(/\s+/g, '-').toLowerCase()}`}
              label={region}
              onChange={() =>
                update({ regions: toggleFilterValue(draftRef.current.regions, region) })
              }
            />
          ))}
        </ListingFilterDropdown>
      ) : null}

      <ListingFilterRange
        max={sliderMax}
        min={sliderMin}
        step={25}
        suffix='USD'
        title='Price per night'
        value={priceRange}
        onValueChange={setPriceRange}
        onCommit={(value) =>
          update({
            minPrice: value[0] <= sliderMin ? undefined : String(value[0]),
            maxPrice: value[1] >= sliderMax ? undefined : String(value[1])
          })
        }
      />
    </ListingFilters>
  );
}
