'use client';

import Image from 'next/image';

import { useSitePhotos } from '@/components/public/site-photos-provider';
import { ABOUT_GALLERY } from '@/lib/public/about-content';
import { ABOUT_GALLERY_SLOTS } from '@/lib/public/site-photos';
import { cn } from '@/lib/utils';

export function AboutGallery() {
  const photos = useSitePhotos();
  const items = ABOUT_GALLERY_SLOTS.map((slot) => photos[slot]).filter(Boolean);

  return (
    <section className='brand-section bg-white'>
      <div className='brand-container'>
        <h2 className='brand-heading font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.15]'>
          {ABOUT_GALLERY.title}
        </h2>
        <span aria-hidden className='brand-gold-line brand-gold-line--left' />

        <div className='nr-about-gallery mt-12'>
          {items.map((src, index) => (
            <figure
              className={cn(
                'relative overflow-hidden bg-[var(--brand-primary)]',
                index === 0
                  ? 'aspect-[16/10] md:aspect-[16/9]'
                  : index === 1
                    ? 'aspect-[4/3] md:h-full md:aspect-auto'
                    : 'aspect-[4/3]'
              )}
              key={`${src}-${index}`}
            >
              <Image
                alt={ABOUT_GALLERY.itemAlt}
                className='object-cover'
                fill
                sizes={
                  index === 0 ? '(max-width:768px) 100vw, 66vw' : '(max-width:768px) 50vw, 33vw'
                }
                src={src}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
