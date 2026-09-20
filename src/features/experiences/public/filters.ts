import { getCountryById, isPublicBrandCountry, type BrandCountryId } from './country-map-copy';
import type { PublicExperience } from './types';

export type ExperienceMenuGroup = 'top_experiences' | 'wildlife_safari';

export type ExperienceListingFiltersState = {
  countries: BrandCountryId[];
  groups: ExperienceMenuGroup[];
};

export function parseFilterList(value?: string) {
  if (!value?.trim()) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseExperienceListingFilters(searchParams: {
  country?: string;
  group?: string;
}): ExperienceListingFiltersState {
  const countries = parseFilterList(searchParams.country).filter((item): item is BrandCountryId =>
    isPublicBrandCountry(item)
  );

  const groups = parseFilterList(searchParams.group).filter(
    (item): item is ExperienceMenuGroup => item === 'top_experiences' || item === 'wildlife_safari'
  );

  return { countries, groups };
}

export function filterPublishedExperiences(
  experiences: PublicExperience[],
  filters: ExperienceListingFiltersState
): PublicExperience[] {
  let result = experiences.filter(
    (experience) =>
      experience.countries.length === 0 ||
      experience.countries.some((country) => isPublicBrandCountry(country))
  );

  if (filters.countries.length) {
    result = result.filter((experience) =>
      filters.countries.some((country) => experience.countries.includes(country))
    );
  }

  if (filters.groups.length) {
    result = result.filter((experience) => filters.groups.includes(experience.menuGroup));
  }

  return result;
}

export function buildExperienceListingQuery(filters: ExperienceListingFiltersState) {
  const params = new URLSearchParams();
  if (filters.countries.length) params.set('country', filters.countries.join(','));
  if (filters.groups.length) params.set('group', filters.groups.join(','));
  return params.toString();
}

const MENU_GROUP_LABELS = {
  top_experiences: 'Top Experiences',
  wildlife_safari: 'Wildlife Safari'
} as const;

export function buildExperienceEmptyState(filters: ExperienceListingFiltersState) {
  const parts: string[] = [];

  if (filters.countries.length) {
    parts.push(filters.countries.map((country) => getCountryById(country).name).join(', '));
  }

  if (filters.groups.length) {
    parts.push(...filters.groups.map((group) => MENU_GROUP_LABELS[group]));
  }

  if (!parts.length) {
    return {
      message:
        'Published experiences will appear here once they are added through the Nature Romp CMS.',
      title: 'No experiences published yet'
    };
  }

  return {
    message: `No published experiences match ${parts.join(' · ')} yet. Try another filter or contact us for a tailor-made safari.`,
    title: 'No experiences match these filters'
  };
}
