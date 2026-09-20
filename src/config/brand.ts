// Central brand configuration. These are fallbacks only — at runtime, contact
// details, social links, logo, favicon, and theme color are read from the
// Supabase `site_settings` table and remain editable in the portal.
// Public phones/email prefer NEXT_PUBLIC_* env values when set.

function envText(key: string, fallback: string): string {
  return process.env[key]?.trim() || fallback;
}

export const BRAND_SITE_NAME = 'Kenya Tanzania Safari Adventure';

export const BRAND_FOOTER_DESCRIPTION =
  'Nature Romp Safaris crafts bespoke adventures across Kenya and Tanzania around you, your story, your pace, and your budget.';

/** Homepage hero + meta copy. The supporting line is the page description. */
export const HOME_PAGE_COPY = {
  title: 'Kenya and Tanzania safaris designed around your budget, style and dates',
  description:
    'Request a free quote from Nature Romp Safaris. We send a tailor-made itinerary with the price and what is included, usually within 24 hours.'
} as const;

/** Shared contact hero + meta copy so the visible description is the page description. */
export const CONTACT_PAGE_COPY = {
  title: 'Request a Free Safari Quote',
  description:
    'Tell us about the safari you have in mind in Kenya or Tanzania. Our planners will send a free quote and reply within 24 hours. No payment is collected on this website.'
} as const;

export const BRAND_PHONE = envText('NEXT_PUBLIC_PHONE_PRIMARY', '+254 739 206698');

/** Registered legal entity used on policy and booking documents. */
export const BRAND_LEGAL_NAME = 'Nature Romp Safaris Ltd';

export const BRAND_CONTACT_DEFAULTS = {
  companyName: 'Nature Romp Safaris',
  email: envText('NEXT_PUBLIC_BRAND_EMAIL', 'info@naturerompsafaris.com'),
  secondaryEmail: envText('NEXT_PUBLIC_BRAND_EMAIL_SECONDARY', 'naturerompsafaris@gmail.com'),
  phonePrimary: BRAND_PHONE,
  phoneSecondary: '',
  phoneOffice: envText('NEXT_PUBLIC_PHONE_OFFICE', BRAND_PHONE),
  addressShort:
    'Nature Romp Safaris, Embassy House, Mezzanine, Harambee Avenue, P.O Box 10323, 00100-GPO, Nairobi, Kenya',
  postalAddress: 'P.O Box 10323, 00100-GPO, Nairobi, Kenya',
  katoAddress: 'Embassy House, Harambee Avenue, Nairobi, Kenya'
} as const;

/** Google Maps embed query for the contact page map. */
export const BRAND_MAP_QUERY = `${BRAND_CONTACT_DEFAULTS.companyName}, ${BRAND_CONTACT_DEFAULTS.addressShort}`;

// Palette from the live Nature Romp site (kenyatanzaniasafariadventures.com):
// espresso brown primary, electric lime accent, forest green support.
export const BRAND_COLORS = {
  primary: '#5D2411',
  primaryDark: '#4A1C0D',
  warmGold: '#C78A2B',
  espressoBrown: '#5D2411',
  charcoal: '#101610',
  ivory: '#EAE5E3',
  white: '#FFFFFF',
  lime: '#36E95A',
  forest: '#234D20'
} as const;

export const BRAND_LOGO_PATH = '/assets/brand-logo.jpg';
export const BRAND_LOGO_WIDTH = 3388;
export const BRAND_LOGO_HEIGHT = 1153;

export const BRAND_FAVICON_PATH = '/assets/brand-favicon.png';

export const BRAND_PORTAL_AUTH_IMAGE = {
  src: '/assets/Elephant-in-Amboseli-National-Park-2.jpeg',
  alt: 'Elephants walking across Amboseli National Park with Mount Kilimanjaro in the background'
} as const;

export const BRAND_TRIPADVISOR = {
  url: 'https://www.tripadvisor.com/Attraction_Review-g294207-d33405451-Reviews-Nature_Romp_Safaris-Nairobi.html',
  logoPath: '/assets/tripadvisor-logo-primary.svg',
  wordmarkPath: '/assets/tripadvisor-wordmark-dark.svg',
  logoWidth: 200,
  logoHeight: 48,
  alt: 'Tripadvisor',
  rating: '5.0',
  reviewLabel: 'Reviews'
} as const;

export const BRAND_GOOGLE_REVIEWS = {
  url: 'https://share.google/xCQphQMP2wsfor4ye',
  mapsUrl:
    'https://www.google.com/maps/place/Nature+Romp+Safaris/data=!4m2!3m1!1s0x0:0xf3e7dd4a23c8cdd4',
  kgmid: '/g/11vc1yp0xr',
  featureId: '0x182f1145a293f9e7:0xf3e7dd4a23c8cdd4',
  rating: '4.8',
  reviewCount: 12,
  logoPath: '/assets/google-g.svg',
  logoWidth: 72,
  logoHeight: 72,
  alt: 'Google'
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

// WhatsApp business number for the public floating button, header, and contact
// page. Overridable per-environment via NEXT_PUBLIC_WHATSAPP_NUMBER.
export const BRAND_WHATSAPP = {
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || BRAND_PHONE,
  message:
    "Hello Nature Romp Safaris! I'd like help planning my Kenya/Tanzania safari. Could you guide me on destinations, travel dates, group size, and the best options for my trip?"
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
  imageAlt: 'Elephants walking in Amboseli National Park with Mount Kilimanjaro behind'
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
