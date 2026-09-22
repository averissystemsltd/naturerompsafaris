export const SAFARI_DESTINATION_COUNTRIES = ['Kenya', 'Tanzania', 'Kenya & Tanzania'] as const;

export type SafariDestinationCountry = (typeof SAFARI_DESTINATION_COUNTRIES)[number];

export const SAFARI_DESTINATION_OPTIONS: Array<{
  code: string;
  country: SafariDestinationCountry;
}> = [
  { code: 'KE', country: 'Kenya' },
  { code: 'TZ', country: 'Tanzania' },
  { code: 'KE · TZ', country: 'Kenya & Tanzania' }
];
