import Image from 'next/image';

import { ABOUT_STORY, ABOUT_STORY_IMAGE } from '@/lib/public/about-content';

export function AboutStoryIntro() {
  return (
    <section className='brand-section'>
      <div className='brand-container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14'>
        <div>
          <h2 className='brand-heading font-display text-[clamp(2rem,4vw,3rem)] leading-tight'>
            {ABOUT_STORY.title}
          </h2>
          <span aria-hidden className='brand-gold-line brand-gold-line--left mt-6' />
          <div className='brand-body mt-8 space-y-5 text-base leading-8'>
            {ABOUT_STORY.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className='relative aspect-[4/3] overflow-hidden rounded-[var(--brand-radius)] bg-[var(--brand-primary)]'>
          <Image
            alt={ABOUT_STORY_IMAGE.imageAlt}
            className='object-cover'
            fill
            priority
            sizes='(max-width:1024px) 100vw, 50vw'
            src={ABOUT_STORY_IMAGE.imageUrl}
          />
        </div>
      </div>
    </section>
  );
}
