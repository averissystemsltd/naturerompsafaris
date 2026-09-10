// Central brand configuration. These are fallbacks only — at runtime, contact
// details, social links, logo, favicon, and theme color are read from the
// Supabase `site_settings` table and remain editable in the portal.
//
// TODO(client): confirm real Nature Romp Safaris contact details, phone
// numbers, physical/postal address, KATO/TripAdvisor profiles, social handles,
// and Tawk chat IDs, then update these fallbacks and the `site_settings` seed.

export const BRAND_CONTACT_DEFAULTS = {
  companyName: 'Nature Romp Safaris Ltd',
  email: 'info@naturerompsafaris.com',
  phonePrimary: '+254 700 000000',
  phoneSecondary: '+254 700 000000',
  phoneOffice: '+254 20 0000000',
  addressShort: 'Nairobi, Kenya',
  postalAddress: 'P.O. Box 00000-00100 Nairobi',
  katoAddress: 'Nairobi, Kenya'
} as const;

/** Google Maps embed query for the contact page map. */
export const BRAND_MAP_QUERY = `${BRAND_CONTACT_DEFAULTS.companyName}, ${BRAND_CONTACT_DEFAULTS.addressShort}`;

// TODO(phase2): replace with the reference-site palette (see Phase 2 rebrand).
export const BRAND_COLORS = {
  primary: '#3C5142',
  primaryDark: '#2F4034',
  warmGold: '#D99A2B',
  espressoBrown: '#5D2411',
  charcoal: '#2A2A2A',
  ivory: '#F8F5EF',
  white: '#FFFFFF'
} as const;

// TODO(phase2): swap for the real Nature Romp logo/favicon assets.
export const BRAND_LOGO_PATH = '/assets/brand-logo.jpg';
export const BRAND_LOGO_WIDTH = 514;
export const BRAND_LOGO_HEIGHT = 150;

export const BRAND_FAVICON_PATH = '/assets/brand-favicon.png';

export const BRAND_PORTAL_AUTH_IMAGE = {
  src: '/assets/Elephant-in-Amboseli-National-Park-2.jpeg',
  alt: 'Elephants walking across Amboseli National Park with Mount Kilimanjaro in the background'
} as const;

// TODO(client): update with the Nature Romp TripAdvisor listing when available.
export const BRAND_TRIPADVISOR = {
  url: 'https://www.tripadvisor.com/',
  wordmarkPath: '/assets/tripadvisor-wordmark-dark.svg',
  rating: '5.0',
  reviewLabel: 'Reviews'
} as const;

// TODO(client): update with the Nature Romp KATO membership profile when available.
export const BRAND_KATO = {
  url: 'https://katokenya.org/',
  logoPath: '/assets/kato-logo.jpg',
  logoWidth: 217,
  logoHeight: 217,
  alt: 'KATO Bonded Member'
} as const;

export const BRAND_CONTACT_RESPONSE = {
  imagePath: '/assets/TravellerQuestion@2x.png',
  imageWidth: 140,
  imageHeight: 180,
  alt: 'Safari quote response within 24 hours'
} as const;

export const BRAND_SAFARI_BOOKINGS = {
  url: 'https://www.safaribookings.com/',
  logoPath: '/assets/safari_bookings.png',
  logoWidth: 200,
  logoHeight: 80,
  alt: 'SafariBookings.com'
} as const;

// TODO(client): confirm the Nature Romp WhatsApp business number.
export const BRAND_WHATSAPP = {
  phone: '+254 700 000000',
  message: 'Hello Nature Romp Safaris, I would like help planning my safari.'
} as const;

/**
 * Tawk.to live-chat widget. Property and widget ids are public by design (they
 * ship in the browser). Override per-environment with NEXT_PUBLIC_TAWK_PROPERTY_ID
 * / NEXT_PUBLIC_TAWK_WIDGET_ID; leave the property id blank to disable the widget.
 * Disabled by default until the client provides their own Tawk property.
 */
export const BRAND_TAWK = {
  propertyId: process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || '',
  widgetId: process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || ''
} as const;

/** Hero background for the public contact page. */
export const BRAND_CONTACT_HERO = {
  imageUrl: '/assets/Elephant-in-Amboseli-National-Park-2.jpeg',
  imageAlt:
    'Elephants in Amboseli National Park — plan your East Africa safari with Nature Romp Safaris'
} as const;

/** Default About page hero — swap for /assets/about-hero.jpg when a dedicated brand photo is ready. */
export const BRAND_ABOUT_HERO = {
  imageUrl: '/assets/brand-safaris-kenya.webp',
  imageAlt: 'Nature Romp Safaris vehicle on the plains of Kenya'
} as const;

export const BRAND_PUBLIC_HERO_IMAGES = {
  experiences: {
    imageUrl: '/assets/Saruni-Basecamp-The-Great-Migration-river-crossing.jpg',
    imageAlt: 'Wildebeest crossing the Mara River during the Great Migration in Kenya'
  },
  destinations: {
    imageUrl: '/assets/brand-safaris-kenya.webp',
    imageAlt: 'Safari vehicle on the plains of Kenya with acacia trees on the horizon'
  },
  tours: {
    imageUrl: '/assets/Elephant-in-Amboseli-National-Park-2.jpeg',
    imageAlt: 'Elephants walking across Amboseli National Park with Mount Kilimanjaro behind'
  },
  fleet: {
    imageUrl: '/assets/brand-safaris-kenya.webp',
    imageAlt: 'Nature Romp safari vehicle prepared for an East Africa game drive'
  },
  accommodations: {
    imageUrl: '/assets/Saruni-Basecamp-The-Great-Migration-river-crossing.jpg',
    imageAlt: 'Luxury safari camp overlooking the Mara River during the Great Migration'
  }
} as const;

// TODO(client): update with the real Nature Romp Safaris social profiles.
export const BRAND_SOCIAL_DEFAULTS = {
  facebook: '',
  instagram: '',
  linkedin: '',
  twitter: '',
  youtube: ''
} as const;
