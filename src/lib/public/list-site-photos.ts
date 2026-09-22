import { cache } from 'react';
import fs from 'node:fs';
import path from 'node:path';

import {
  assignSitePhotos,
  DROPPED_SITE_PHOTO_FILES,
  type SitePhotoMap
} from '@/lib/public/site-photos';

const SITE_PHOTOS_DIR = path.join(process.cwd(), 'public', 'assets', 'site-photos');
const IMAGE_FILE = /\.(avif|gif|jpe?g|png|webp)$/i;

export function listSitePhotoFiles(): string[] {
  const fromDisk = (() => {
    try {
      return fs
        .readdirSync(SITE_PHOTOS_DIR)
        .filter((name) => IMAGE_FILE.test(name) && !name.startsWith('.'))
        .map((name) => `/assets/site-photos/${encodeURIComponent(name)}`);
    } catch {
      return [];
    }
  })();

  return [...new Set([...DROPPED_SITE_PHOTO_FILES, ...fromDisk])].toSorted((left, right) =>
    left.localeCompare(right)
  );
}

export const getAssignedSitePhotos = cache((): SitePhotoMap => {
  return assignSitePhotos(listSitePhotoFiles());
});
