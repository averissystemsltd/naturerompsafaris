const EXISTING = {
  plains: '/assets/brand-safaris-kenya.webp',
  maraGate: '/assets/brand-fleet-mara-gate.png',
  lion: '/assets/brand-fleet-lion.png',
  fleet: '/assets/brand-4x4-safaris-fleet.png',
  birds: '/assets/brand-bird-watching-safaris-2.png',
  branded: '/assets/brand-fleet-branded.png',
  guests: '/assets/brand-fleet-guests.png'
} as const;

function droppedPhoto(fileName: string): string {
  return `/assets/site-photos/${encodeURIComponent(fileName)}`;
}

export const SITE_PHOTO_SLOTS = [
  'home-hero-1',
  'home-hero-2',
  'home-hero-3',
  'home-hero-4',
  'home-who-field',
  'home-who-inset',
  'home-dest-kenya',
  'home-dest-tanzania',
  'home-dest-combined',
  'home-experience-family',
  'home-experience-honeymoon',
  'home-experience-luxury',
  'home-experience-migration',
  'home-experience-big-five',
  'home-experience-photography',
  'about-hero',
  'about-story',
  'about-story-inset',
  'about-vision',
  'about-gallery-1',
  'about-gallery-2',
  'about-gallery-3',
  'about-gallery-4',
  'about-gallery-5',
  'about-gallery-6',
  'about-gallery-7',
  'about-gallery-8',
  'about-gallery-9',
  'about-gallery-10',
  'about-gallery-11',
  'about-gallery-12',
  'about-mission'
] as const;

export type SitePhotoSlot = (typeof SITE_PHOTO_SLOTS)[number];
export type SitePhotoMap = Record<SitePhotoSlot, string>;

const HERO_PHOTO_SLOTS = new Set<SitePhotoSlot>([
  'home-hero-1',
  'home-hero-2',
  'home-hero-3',
  'home-hero-4',
  'about-hero'
]);

export const BODY_PHOTO_SLOTS = SITE_PHOTO_SLOTS.filter((slot) => !HERO_PHOTO_SLOTS.has(slot));

export const SITE_PHOTO_FALLBACKS: SitePhotoMap = {
  'home-hero-1': EXISTING.plains,
  'home-hero-2': EXISTING.lion,
  'home-hero-3': EXISTING.maraGate,
  'home-hero-4': EXISTING.fleet,
  'home-who-field': EXISTING.plains,
  'home-who-inset': EXISTING.guests,
  'home-dest-kenya': EXISTING.plains,
  'home-dest-tanzania': EXISTING.maraGate,
  'home-dest-combined': EXISTING.lion,
  'home-experience-family': EXISTING.guests,
  'home-experience-honeymoon': EXISTING.plains,
  'home-experience-luxury': EXISTING.branded,
  'home-experience-migration': EXISTING.lion,
  'home-experience-big-five': EXISTING.fleet,
  'home-experience-photography': EXISTING.birds,
  'about-hero': EXISTING.plains,
  'about-story': EXISTING.plains,
  'about-story-inset': EXISTING.guests,
  'about-vision': EXISTING.plains,
  'about-gallery-1': EXISTING.plains,
  'about-gallery-2': EXISTING.maraGate,
  'about-gallery-3': EXISTING.lion,
  'about-gallery-4': EXISTING.fleet,
  'about-gallery-5': EXISTING.birds,
  'about-gallery-6': EXISTING.branded,
  'about-gallery-7': EXISTING.guests,
  'about-gallery-8': EXISTING.plains,
  'about-gallery-9': EXISTING.lion,
  'about-gallery-10': EXISTING.maraGate,
  'about-gallery-11': EXISTING.fleet,
  'about-gallery-12': EXISTING.branded,
  'about-mission': EXISTING.guests
};

export const DROPPED_SITE_PHOTO_FILES = [
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '1740052257854.jpeg',
  '1740056052647.jpeg',
  '1740056058538.jpeg',
  '1760102841171.jpeg',
  '1760102841172.jpeg',
  '20191209_124456-850x550.jpg.webp',
  '46f98398-3530-41ec-9d60-c5a887791471.jpeg',
  '8.jpg',
  'Colubus-monkey-in-Rwanda.webp',
  'gedi ruins malindi.jpg',
  'Guided-Nature-walks.jpg',
  'Hiking-MT-kilimanjaro-5.jpeg',
  'image-3-1-e1754493940909.png',
  'KASA-MALINDI.jpg',
  'a.gavino_1750926719038.jpeg',
  'kikinetworktraveladventures_1750926875293.jpeg',
  'lauradyerphotography_1760104293652-e1762016435937.jpeg',
  'leopard in maasai mara.webp',
  'LOC_000537_shutterstock_373577245WebOriginalCompressed.avif',
  'Luxury-Kenya-Fly-In-Safari-Packages-to-Masai-Mara-and-Amboseli.jpg',
  'maasai-showing-1300by700-600x332.jpg',
  'Nature-Romp-Masai-Village-Visit.jpg',
  'Nature-Romp-Safari-Vehicle.jpg',
  'naturerompsafaris amboseli trips.jpg',
  'Romantic-All-Inclusive-Kenya-Safari-Honeymoon-Packages.jpg',
  'The-Ultimate-Guided-Rhino-Tracking-on-Foot-in-Kenya-Conservation-Safari-A-Journey-to-Save-the-Giants.jpg',
  'WhatsApp Image 2026-06-06 at 8.39.31 PM.jpg.jpeg',
  'WhatsApp Image 2026-06-08 at 9.09.54 PM.jpeg',
  'Wildebeest-In-Amboseli.jpeg'
].map(droppedPhoto);

export const ABOUT_GALLERY_SLOTS = [
  'about-gallery-1',
  'about-gallery-2',
  'about-gallery-3',
  'about-gallery-4',
  'about-gallery-5',
  'about-gallery-6',
  'about-gallery-7',
  'about-gallery-8',
  'about-gallery-9',
  'about-gallery-10',
  'about-gallery-11',
  'about-gallery-12'
] as const satisfies readonly SitePhotoSlot[];

const GALLERY_PREFERRED = [
  'Wildebeest-In-Amboseli.jpeg',
  '8.jpg',
  'Hiking-MT-kilimanjaro-5.jpeg',
  'leopard in maasai mara.webp',
  'gedi ruins malindi.jpg',
  '12.jpg',
  'Luxury-Kenya-Fly-In-Safari-Packages-to-Masai-Mara-and-Amboseli.jpg',
  'maasai-showing-1300by700-600x332.jpg',
  'Guided-Nature-walks.jpg',
  'naturerompsafaris amboseli trips.jpg',
  'The-Ultimate-Guided-Rhino-Tracking-on-Foot-in-Kenya-Conservation-Safari-A-Journey-to-Save-the-Giants.jpg',
  'KASA-MALINDI.jpg'
].map(droppedPhoto);

const BODY_PREFERRED: Partial<SitePhotoMap> = {
  'home-who-field': droppedPhoto('1740052257854.jpeg'),
  'home-who-inset': droppedPhoto('Nature-Romp-Masai-Village-Visit.jpg'),
  'home-dest-kenya': droppedPhoto('kikinetworktraveladventures_1750926875293.jpeg'),
  'home-dest-tanzania': droppedPhoto('1760102841171.jpeg'),
  'home-dest-combined': droppedPhoto('1740052257854.jpeg'),
  'home-experience-family': droppedPhoto('Nature-Romp-Safari-Vehicle.jpg'),
  'home-experience-honeymoon': droppedPhoto('a.gavino_1750926719038.jpeg'),
  'home-experience-luxury': droppedPhoto('1740056058538.jpeg'),
  'home-experience-migration': droppedPhoto('1740056052647.jpeg'),
  'home-experience-big-five': droppedPhoto('1740056058538.jpeg'),
  'home-experience-photography': droppedPhoto('Colubus-monkey-in-Rwanda.webp'),
  'about-story': droppedPhoto('1740052257854.jpeg'),
  'about-story-inset': droppedPhoto('image-3-1-e1754493940909.png'),
  'about-vision': droppedPhoto('1760102841171.jpeg'),
  'about-mission': droppedPhoto('46f98398-3530-41ec-9d60-c5a887791471.jpeg')
};

const HOME_EXPERIENCE_SLOT_BY_ID: Record<string, SitePhotoSlot> = {
  family: 'home-experience-family',
  honeymoon: 'home-experience-honeymoon',
  luxury: 'home-experience-luxury',
  migration: 'home-experience-migration',
  'big-five': 'home-experience-big-five',
  photography: 'home-experience-photography'
};

export function homeExperiencePhotoSlot(id: string): SitePhotoSlot | null {
  return HOME_EXPERIENCE_SLOT_BY_ID[id] ?? null;
}

function seedFromFiles(files: string[]): number {
  let hash = 2166136261;
  for (const file of files) {
    for (let index = 0; index < file.length; index += 1) {
      hash ^= file.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let value = seed || 1;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    const current = next[index];
    next[index] = next[swapIndex] as T;
    next[swapIndex] = current as T;
  }
  return next;
}

/** Heroes keep their own media. Dropped files are assigned to body slots only. */
export function assignSitePhotos(files: string[]): SitePhotoMap {
  const assigned = { ...SITE_PHOTO_FALLBACKS };
  const available = new Set([...DROPPED_SITE_PHOTO_FILES, ...files]);
  const used = new Set<string>();
  const gallerySlotSet = new Set<string>(ABOUT_GALLERY_SLOTS);

  for (const slot of BODY_PHOTO_SLOTS) {
    if (gallerySlotSet.has(slot)) continue;
    const preferred = BODY_PREFERRED[slot];
    if (!preferred || !available.has(preferred)) continue;
    assigned[slot] = preferred;
    used.add(preferred);
  }

  const gallerySkip = new Set(['10.jpg', '11.jpg'].map(droppedPhoto));
  const galleryPool = shuffle(
    GALLERY_PREFERRED.filter((file) => available.has(file) && !used.has(file)),
    mulberry32(seedFromFiles([...available]))
  );
  const galleryFill = shuffle(
    [...available].filter(
      (file) => !used.has(file) && !GALLERY_PREFERRED.includes(file) && !gallerySkip.has(file)
    ),
    mulberry32(seedFromFiles([...available, 'gallery-fill']))
  );

  ABOUT_GALLERY_SLOTS.forEach((slot, index) => {
    const next = galleryPool[index] ?? galleryFill[index - galleryPool.length];
    if (next) {
      assigned[slot] = next;
      used.add(next);
    }
  });

  const leftovers = shuffle(
    [...available].filter((file) => !used.has(file)),
    mulberry32(seedFromFiles(files))
  );

  if (leftovers.length === 0) return assigned;

  let leftoverIndex = 0;
  for (const slot of BODY_PHOTO_SLOTS) {
    if (assigned[slot] !== SITE_PHOTO_FALLBACKS[slot]) continue;
    assigned[slot] = leftovers[leftoverIndex % leftovers.length] as string;
    leftoverIndex += 1;
  }

  return assigned;
}
