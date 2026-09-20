export const ABOUT_HERO_DEFAULTS = {
  title: 'About Us',
  description:
    'Nature Romp Safaris operates Kenya and Tanzania safaris. We plan private itineraries around your dates, budget and how you like to travel, and stay with the trip from the first quote to the last day on the road.'
} as const;

export const ABOUT_OPERATIONS = {
  title: 'Where We Operate',
  description:
    'Two countries. Kenya on its own, Tanzania on its own, or both in one itinerary. Tap a country on the map.',
  kenyaCopy:
    'Kenya safaris as a trip of their own, planned around your dates, budget, and how you like to travel.',
  tanzaniaCopy: 'Tanzania safaris as a trip of their own, or continue from Kenya in one itinerary.'
} as const;

export const ABOUT_STORY = {
  title: 'Who We Are',
  paragraphs: [
    'Nature Romp Safaris is a trusted East African travel company crafting personalized Kenya Tanzania safari adventures, wildlife holidays, beach extensions, mountain climbing trips and private safari itineraries.',
    'Our team focuses on clear communication, reliable transport, local expertise and smooth travel planning across Kenya and Tanzania.',
    'You send dates, who is travelling, and how you like to travel. We send a private itinerary with the price and what is included, usually within 24 hours. On the road, the same driver-guide stays with you.',
    'Nature Romp Safaris crafts bespoke adventures across Kenya and Tanzania around you, your story, your pace, and your budget.'
  ],
  imageUrl: '/assets/Elephant-in-Amboseli-National-Park-2.jpeg',
  imageAlt: 'Elephants crossing Amboseli with Mount Kilimanjaro behind, on a Nature Romp safari',
  insetImageUrl: '/assets/brand-fleet-guests.png',
  insetImageAlt: 'Nature Romp Safaris team with a branded safari vehicle',
  imageNote:
    'We plan the itinerary. The same vehicle and driver-guide carry it out from the first pickup to the last park gate.',
  ctaLabel: 'View Our Tours'
} as const;

export const ABOUT_GALLERY = {
  title: 'Our Past Safaris at a Glance',
  items: [
    {
      src: '/assets/brand-safaris-kenya.webp',
      alt: 'Wildlife on a Kenya safari planned by Nature Romp Safaris'
    },
    {
      src: '/assets/brand-fleet-mara-gate.png',
      alt: 'Nature Romp safari vehicle at a Maasai Mara park gate'
    },
    {
      src: '/assets/brand-fleet-lion.png',
      alt: 'Guests watching a lion from a Nature Romp game drive'
    },
    {
      src: '/assets/brand-4x4-safaris-fleet.png',
      alt: 'Nature Romp 4x4 safari vehicles ready for a game drive'
    },
    {
      src: '/assets/brand-bird-watching-safaris-2.png',
      alt: 'Bird watching on a Nature Romp safari in Kenya'
    },
    {
      src: '/assets/brand-fleet-branded.png',
      alt: 'Branded Nature Romp Land Cruiser on safari'
    }
  ]
} as const;

export type AboutAdvantageItem = {
  iconSrc: string;
  title: string;
  text: string;
};

export const ABOUT_WHY_TRAVEL = {
  title: 'We Make Your Safari a Story Worth Telling',
  intro:
    'Handpicked routes, expert guides, and planning that stays with you from the first reply to the last game drive. Your safari is tailored to your pace, style, and interests.',
  ctaLabel: 'Help Me Plan',
  secondaryCtaLabel: 'View Safari Tours',
  items: [
    {
      iconSrc: '/assets/cta-icon-1.svg',
      title: 'Stress-Free Planning',
      text: 'Transport, accommodation, and logistics handled carefully for a secure journey.'
    },
    {
      iconSrc: '/assets/cta-icon-2.svg',
      title: 'Authentic Journeys',
      text: 'Real local connections and routes that go beyond the typical tourist trails.'
    },
    {
      iconSrc: '/assets/cta-icon-3.svg',
      title: 'Expert Safari Guides',
      text: 'Guides who know the parks and ground conditions in Kenya and Tanzania.'
    },
    {
      iconSrc: '/assets/cta-icon-4.svg',
      title: 'Personalized Service',
      text: 'We tailor each safari around your interests, pace, comfort level, and budget.'
    }
  ] satisfies AboutAdvantageItem[]
};

export const ABOUT_VISION_MISSION = {
  vision: {
    label: 'Our Vision',
    body: 'Our vision is to be a trusted African safari partner, known globally for authenticity, professionalism, and responsible travel.'
  },
  mission: {
    label: 'Our Mission',
    body: 'To conduct ethical and profitable business by providing services to our customers through committed personnel and upholding the spirit of comradeship among all the players in East Africa travel industry.'
  },
  teamImageUrl: '/assets/brand-safaris-kenya.webp',
  teamImageAlt: 'Nature Romp Safaris team in East Africa',
  missionImageUrl: '/assets/cape-of-good-hope-team.png',
  missionImageAlt:
    'Nature Romp Safaris team at the Cape of Good Hope, the south-western tip of the African continent'
} as const;

export const ABOUT_GUIDES_INTRO = {
  eyebrow: 'Safari Guides',
  title: 'Professional Guides Who Know the Bush',
  description:
    'Guides bring interpretation, walking safaris, primate trekking expertise, and deep park knowledge to every itinerary.',
  imageUrl: '/assets/brand-fleet-lion.png',
  imageAlt: 'Nature Romp Safaris guide on a game drive near wildlife'
} as const;

export const ABOUT_DRIVERS_INTRO = {
  eyebrow: 'Driver Guides',
  title: 'Skilled on the Tracks, Focused on Your Comfort',
  description:
    'Driver guides are the face of your safari, expert at wildlife spotting, bush driving, and guest safety on every mile of your route.',
  imageUrl: '/assets/brand-fleet-branded.png',
  imageAlt: 'Nature Romp Safaris Land Cruiser ready for off road game drives'
} as const;

export const ABOUT_TEAM_SECTION = {
  staff: {
    eyebrow: 'Company Team',
    title: 'The People Behind Your Safari',
    description:
      'Leadership, operations, reservations, and guest care. The Nairobi team that coordinates every safari before your vehicle leaves the city.',
    emptyTitle: 'Team profiles coming soon',
    emptyMessage:
      'Published staff profiles will appear here once they are added in the Nature Romp portal under Team Members.'
  },
  safari_guide: {
    eyebrow: 'Safari Guides',
    title: 'Meet Our Professional Safari Guides',
    description: ABOUT_GUIDES_INTRO.description,
    emptyTitle: 'Safari guides coming soon',
    emptyMessage:
      'Published safari guide profiles will appear here once they are added and published in the Nature Romp portal under Team Members.'
  },
  driver: {
    eyebrow: 'Driver Guides',
    title: 'Meet Our Driver Guides',
    description: ABOUT_DRIVERS_INTRO.description,
    emptyTitle: 'Driver guides coming soon',
    emptyMessage:
      'Published driver-guide profiles will appear here once they are added and published in the Nature Romp portal under Team Members.'
  }
} as const;

export const ABOUT_TAB_CONFIG = [
  { id: 'about', label: 'Who We Are' },
  { id: 'team', label: 'Our Team' },
  { id: 'guides', label: 'Safari Guides' },
  { id: 'drivers', label: 'Driver Guides' }
] as const;
