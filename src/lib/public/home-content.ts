/**
 * Homepage showcase content.
 *
 * These are editorial fallbacks used until the dashboard CMS has published
 * matching experiences. Once `listPublishedExperiences()` returns data, the
 * homepage prefers live content and falls back to these entries.
 */

export type HomeShowcaseItem = {
  id: string;
  category: string;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
};

/** Featured experiences for the GSAP card-stack showcase slider. */
export const HOME_SHOWCASE_ITEMS: HomeShowcaseItem[] = [
  {
    id: 'great-migration',
    category: 'Wildlife Spectacle',
    title: 'The Great Migration',
    location: 'Maasai Mara, Kenya & Serengeti, Tanzania',
    description:
      'Time your safari with the river crossings, when more than a million wildebeest brave the Mara River. Nature Romp positions you at the right camps on the right dates.',
    imageUrl: '/assets/Saruni-Basecamp-The-Great-Migration-river-crossing.jpg',
    imageAlt: 'Wildebeest crossing the Mara River during the Great Migration',
    href: '/experiences?category=Migration%20Safaris'
  },
  {
    id: 'balloon-safari',
    category: 'Signature Experience',
    title: 'Hot Air Balloon Safaris',
    location: 'Maasai Mara, Kenya',
    description:
      'Drift over the plains at sunrise and land to a champagne bush breakfast. We book baskets early in peak Mara season so you are not left on a waitlist.',
    imageUrl: '/assets/Masai-Mara-Hot-Air-Balloon-Safari-with-Champagne-Breakfast.jpg',
    imageAlt: 'Hot air balloon safari over the Maasai Mara at sunrise',
    href: '/experiences?category=Luxury%20Safaris'
  },
  {
    id: 'big-five',
    category: 'Game Viewing',
    title: 'Big Five Game Drives',
    location: 'Amboseli & Tsavo, Kenya',
    description:
      'Track elephant herds beneath Kilimanjaro, then search for lion, leopard, buffalo, and rhino with guides who have read these landscapes for decades.',
    imageUrl: '/assets/Elephant-in-Amboseli-National-Park-2.jpeg',
    imageAlt: 'Elephants in Amboseli National Park with Mount Kilimanjaro behind',
    href: '/experiences?category=Big%205%20Safaris'
  },
  {
    id: 'rhino-conservation',
    category: 'Conservation & Walking',
    title: 'Guided Rhino Tracking on Foot',
    location: 'Ol Pejeta & Laikipia, Kenya',
    description:
      'Step out of the vehicle with an armed ranger and track rhino on foot. A close, low-impact encounter that puts your visit behind serious conservation work.',
    imageUrl:
      '/assets/The-Ultimate-Guided-Rhino-Tracking-on-Foot-in-Kenya-Conservation-Safari-A-Journey-to-Save-the-Giants.jpg',
    imageAlt: 'Guided rhino tracking on foot during a conservation safari in Kenya',
    href: '/experiences?category=Conservation%20Safaris'
  },
  {
    id: 'cultural-maasai',
    category: 'Culture & People',
    title: 'Maasai Cultural Encounters',
    location: 'Mara Conservancies, Kenya',
    description:
      'Spend time with Maasai communities on their terms, not a staged performance. Honest cultural exchange that supports the families who host you.',
    imageUrl: '/assets/maasai-showing-1300by700-600x332.jpg',
    imageAlt: 'Maasai community members sharing their traditions with safari guests',
    href: '/experiences?category=Cultural%20Safaris'
  },
  {
    id: 'classic-game-drive',
    category: 'Classic Safari',
    title: 'Private 4x4 Safari Adventures',
    location: 'Across Kenya, Tanzania, Uganda & Rwanda',
    description:
      'Your own vehicle, your own pace, a driver-guide who knows where the light falls best. Private 4x4 safari, the way Nature Romp runs Kenya and Tanzania.',
    imageUrl: '/assets/brand-safaris-kenya.webp',
    imageAlt: 'Nature Romp Safaris 4x4 vehicle on the plains of Kenya',
    href: '/experiences?category=4X4%20Safari%20Tours'
  }
];

/** Maps homepage showcase slide ids to published experience slugs. */
const SHOWCASE_EXPERIENCE_SLUGS: Record<string, string> = {
  'balloon-safari': 'hot-air-baloon-safaris',
  'big-five': 'big-5-safaris',
  'classic-game-drive': '4x4-safari-tours',
  'cultural-maasai': 'maasai-cultural-encounters',
  'great-migration': 'great-migration-safaris',
  'rhino-conservation': 'conservation-safaris'
};

export function resolveShowcaseItemHrefs(
  items: HomeShowcaseItem[],
  experiences: { slug: string }[]
): HomeShowcaseItem[] {
  const publishedSlugs = new Set(experiences.map((experience) => experience.slug));

  return items.map((item) => {
    const slug = SHOWCASE_EXPERIENCE_SLUGS[item.id];
    if (!slug || !publishedSlugs.has(slug)) return item;

    return {
      ...item,
      href: `/experiences/${slug}`
    };
  });
}

export type HomeFaq = {
  question: string;
  answer: string;
};

/** Homepage FAQs. Plain editorial content, safe to edit freely. */
export const HOME_FAQS: HomeFaq[] = [
  {
    question: 'When is the best time for a Kenya or Tanzania safari?',
    answer:
      'It depends on what you want to see. Great Migration river crossings in the Maasai Mara usually peak from July to October. Calving on the southern Serengeti runs January to March. Wildlife viewing is strong year round, and Nature Romp matches your dates to the parks that work, not a generic high-season pitch.'
  },
  {
    question: 'Are Nature Romp safaris private or group tours?',
    answer:
      'Most guests travel private: your own 4x4 and driver-guide. We also arrange small groups when that fits the budget. Families, couples, and friends who want the vehicle to themselves should say so when they request a quote.'
  },
  {
    question: 'What does a Nature Romp safari include?',
    answer:
      'Typically park fees, lodges or camps, a private 4x4 with a driver-guide, airport transfers, and game drives as written in your itinerary. You see the day-by-day plan and the price before you pay a deposit. Meals, flights, and optional extras such as a balloon are listed so nothing is a surprise.'
  },
  {
    question: 'Can you combine Kenya and Tanzania in one trip?',
    answer:
      'Yes. Mara into Serengeti, Amboseli under Kilimanjaro, then a beach in Diani or Zanzibar if you want the coast. Nature Romp handles the border, the vehicles, and the nights in between so you are not stitching two operators together.'
  },
  {
    question: 'How do I pay for my safari?',
    answer:
      'You secure the trip with a deposit paid to Nature Romp Safaris Ltd, then settle the balance before travel. We do not collect card payments on this website. The Payment Terms page sets out amounts, due dates, currency, and refunds.'
  }
];

export type HomeArticle = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string | null;
  imageAlt: string;
  href: string;
};

export type HomeExperienceCategory = {
  id: string;
  title: string;
  blurb: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
};

/** Homepage grid slugs: Nature Romp core types first, then the rest of the catalogue. */
export const HOME_EXPERIENCE_SEARCH_POPULARITY_SLUGS = [
  'great-migration-safaris',
  'big-5-safaris',
  'safari-beach-holidays',
  'mountain-climbing',
  'family-safaris',
  'tailor-made-safaris',
  'luxury-safaris',
  'hot-air-baloon-safaris',
  'honeymoon-safaris',
  '4x4-safari-tours',
  'photography-safaris',
  'fly-in-safaris',
  'maasai-cultural-encounters',
  'conservation-safaris',
  'gorilla-trekking-safaris',
  'bird-watching-safaris',
  'night-game-drives',
  'excursions'
] as const;

/** Fallback grid ids aligned with the same homepage core order. */
const HOME_EXPERIENCE_FALLBACK_POPULARITY_IDS = [
  'migration',
  'big-five',
  'beach',
  'mountain',
  'family',
  'tailor-made',
  'luxury',
  'honeymoon',
  'photography',
  'walking',
  'gorilla',
  'fly-in'
] as const;

export function sortExperiencesBySearchPopularity<T extends { slug: string }>(
  experiences: T[]
): T[] {
  const rank = new Map<string, number>(
    HOME_EXPERIENCE_SEARCH_POPULARITY_SLUGS.map((slug, index) => [slug, index])
  );

  return [...experiences].sort((a, b) => {
    const aRank = rank.get(a.slug) ?? HOME_EXPERIENCE_SEARCH_POPULARITY_SLUGS.length;
    const bRank = rank.get(b.slug) ?? HOME_EXPERIENCE_SEARCH_POPULARITY_SLUGS.length;

    if (aRank !== bRank) return aRank - bRank;
    return a.slug.localeCompare(b.slug);
  });
}

export function sortExperienceCategoriesBySearchPopularity(
  categories: HomeExperienceCategory[]
): HomeExperienceCategory[] {
  const rank = new Map<string, number>(
    HOME_EXPERIENCE_FALLBACK_POPULARITY_IDS.map((id, index) => [id, index])
  );

  return [...categories].sort((a, b) => {
    const aRank = rank.get(a.id) ?? HOME_EXPERIENCE_FALLBACK_POPULARITY_IDS.length;
    const bRank = rank.get(b.id) ?? HOME_EXPERIENCE_FALLBACK_POPULARITY_IDS.length;

    if (aRank !== bRank) return aRank - bRank;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Experience categories for the grid section, modelled on the kinds of safaris
 * Nature Romp runs across East and Southern Africa.
 */
export const HOME_EXPERIENCE_CATEGORIES: HomeExperienceCategory[] = [
  {
    id: 'family',
    title: 'Family Safaris',
    blurb:
      'Paced days and child-friendly lodges, with a private vehicle so nobody is stuck on a group clock.',
    imageUrl: '/assets/Elephant-in-Amboseli-National-Park-2.jpeg',
    imageAlt: 'Elephant herd viewed on a family safari in Amboseli',
    href: '/experiences?category=Family%20Safaris'
  },
  {
    id: 'honeymoon',
    title: 'Honeymoon Safaris',
    blurb: 'Private vehicles, romantic camps, and seamless safari-to-beach combinations.',
    imageUrl: '/assets/Masai-Mara-Hot-Air-Balloon-Safari-with-Champagne-Breakfast.jpg',
    imageAlt: 'Romantic hot air balloon safari over the Maasai Mara',
    href: '/experiences?category=Honeymoon%20Safaris'
  },
  {
    id: 'luxury',
    title: 'Luxury Safaris',
    blurb: 'The finest tented camps and lodges, with every detail handled for you.',
    imageUrl: '/assets/Saruni-Basecamp-The-Great-Migration-river-crossing.jpg',
    imageAlt: 'Luxury safari camp overlooking a Great Migration river crossing',
    href: '/experiences?category=Luxury%20Safaris'
  },
  {
    id: 'migration',
    title: 'Migration Safaris',
    blurb:
      'River crossings in the Maasai Mara and Serengeti, timed to your dates rather than a brochure month.',
    imageUrl: '/assets/great%20migration%20of%20wildebeasts%20in%20across%20mara%20river.jpg',
    imageAlt: 'Wildebeest migration crossing the Mara River',
    href: '/experiences?category=Migration%20Safaris'
  },
  {
    id: 'big-five',
    title: 'Big 5 Safaris',
    blurb:
      'Lion, leopard, elephant, buffalo, and rhino across Mara, Amboseli, Tsavo, Serengeti, and Ngorongoro.',
    imageUrl: '/assets/brand-safaris-kenya.webp',
    imageAlt: 'Safari vehicle searching for the Big Five on the Kenyan plains',
    href: '/experiences?category=Big%205%20Safaris'
  },
  {
    id: 'gorilla',
    title: 'Gorilla & Chimp Trekking',
    blurb: 'Permits and forest logistics for Uganda and Rwanda primate encounters.',
    imageUrl: '/assets/maasai-showing-1300by700-600x332.jpg',
    imageAlt: 'Forest trekking experience in East Africa',
    href: '/experiences?category=Gorilla%20Trekking'
  },
  {
    id: 'photography',
    title: 'Photography Safaris',
    blurb: 'Guides who chase the light and the angles, in vehicles built for the lens.',
    imageUrl: '/assets/The-Great-Wildebeest-Migration-1024x683.jpg.webp',
    imageAlt: 'Photographing the Great Wildebeest Migration from a safari vehicle',
    href: '/experiences?category=Photography%20Safaris'
  },
  {
    id: 'walking',
    title: 'Walking Safaris',
    blurb: 'Track wildlife on foot with armed rangers in private conservancies.',
    imageUrl:
      '/assets/The-Ultimate-Guided-Rhino-Tracking-on-Foot-in-Kenya-Conservation-Safari-A-Journey-to-Save-the-Giants.jpg',
    imageAlt: 'Walking safari tracking rhino on foot in Kenya',
    href: '/experiences?category=Walking%20Safaris'
  },
  {
    id: 'beach',
    title: 'Safari & Beach Holidays',
    blurb:
      'Game drives, then Diani, Mombasa, or Zanzibar. Nature Romp coordinates the flights and the nights in between.',
    imageUrl: '/assets/brand-safaris-kenya.webp',
    imageAlt: 'Safari and beach combination holiday in East Africa',
    href: '/experiences?category=Safari%20%26%20Beach%20Holidays'
  },
  {
    id: 'mountain',
    title: 'Mount Kenya and Kilimanjaro',
    blurb:
      'Guided climbs on Mount Kenya or Kilimanjaro, with safari days before or after if you want both.',
    imageUrl: '/assets/Elephant-in-Amboseli-National-Park-2.jpeg',
    imageAlt: 'Mount Kilimanjaro rising behind Amboseli National Park',
    href: '/experiences?category=Mountain%20Climbing'
  },
  {
    id: 'fly-in',
    title: 'Fly-In Safaris',
    blurb: 'Skip the long transfers with light-aircraft hops between reserves.',
    imageUrl: '/assets/Masai-Mara-Hot-Air-Balloon-Safari-with-Champagne-Breakfast.jpg',
    imageAlt: 'Aerial view of the Maasai Mara on a fly-in safari',
    href: '/experiences?category=Fly-In%20Safaris'
  },
  {
    id: 'conservation',
    title: 'Conservation Safaris',
    blurb: 'Travel that supports rhino sanctuaries and community conservancies.',
    imageUrl:
      '/assets/The-Ultimate-Guided-Rhino-Tracking-on-Foot-in-Kenya-Conservation-Safari-A-Journey-to-Save-the-Giants.jpg',
    imageAlt: 'Conservation safari supporting rhino protection in Kenya',
    href: '/experiences?category=Conservation%20Safaris'
  },
  {
    id: 'tailor-made',
    title: 'Tailor-Made Safaris',
    blurb:
      'Built from scratch around your dates, budget, and how you like to travel. Most Nature Romp trips start here.',
    imageUrl: '/assets/Saruni-Basecamp-The-Great-Migration-river-crossing.jpg',
    imageAlt: 'Tailor-made safari experience in East Africa',
    href: '/contact'
  }
];
