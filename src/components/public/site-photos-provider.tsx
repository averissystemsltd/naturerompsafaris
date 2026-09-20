'use client';

import { createContext, use } from 'react';

import {
  SITE_PHOTO_FALLBACKS,
  type SitePhotoMap,
  type SitePhotoSlot
} from '@/lib/public/site-photos';

const SitePhotosContext = createContext<SitePhotoMap>(SITE_PHOTO_FALLBACKS);

type SitePhotosProviderProps = {
  children: React.ReactNode;
  photos: SitePhotoMap;
};

export function SitePhotosProvider({ children, photos }: SitePhotosProviderProps) {
  return <SitePhotosContext value={photos}>{children}</SitePhotosContext>;
}

export function useSitePhotos(): SitePhotoMap {
  return use(SitePhotosContext);
}

export function useSitePhoto(slot: SitePhotoSlot): string {
  return useSitePhotos()[slot];
}
