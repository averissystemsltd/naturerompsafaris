'use client';

import Image from 'next/image';

import { useSitePhotos } from '@/components/public/site-photos-provider';
import { ABOUT_GALLERY } from '@/lib/public/about-content';
import type { SitePhotoSlot } from '@/lib/public/site-photos';

const GALLERY_SLOTS = [
  'about-gallery-1',
  'about-gallery-2',
  'about-gallery-3',
  'about-gallery-4',
  'about-gallery-5',
  'about-gallery-6'
] as const satisfies readonly SitePhotoSlot[];

export function AboutGallery() {
  const photos = useSitePhotos();

  return (
    <section className='brand-section bg-white'>
      <div className='brand-container'>
        <h2 className='brand-heading font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.15]'>
          {ABOUT_GALLERY.title}
        </h2>
        <span aria-hidden className='brand-gold-line brand-gold-line--left' />

        <div className='mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5'>
          {ABOUT_GALLERY.items.map((item, index) => {
            const slot = GALLERY_SLOTS[index];
            const src = slot ? photos[slot] : item.src;

            return (
              <figure
                className='relative aspect-[4/3] overflow-hidden bg-[var(--brand-primary)]'
                key={`${item.alt}-${index}`}
              >
                <Image
                  alt={item.alt}
                  className='object-cover'
                  fill
                  sizes='(max-width:768px) 50vw, 33vw'
                  src={src}
                />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
