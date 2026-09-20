'use client';

import Image from 'next/image';

import { Icons } from '@/components/icons';
import { BrandButton } from '@/components/public/ui/brand-button';
import { ScrollReveal } from '@/components/public/ui/scroll-reveal';
import { ABOUT_STORY } from '@/lib/public/about-content';
import { localePath } from '@/lib/public/locale-path';
import { useSitePhoto } from '@/components/public/site-photos-provider';

export function AboutStoryIntro({ locale }: { locale: string }) {
  const storyImageUrl = useSitePhoto('about-story');
  const insetImageUrl = useSitePhoto('about-story-inset');
  return (
    <section
      className='border-b border-[var(--brand-line)] bg-[var(--brand-warm-gray)]'
      id='who-we-are'
    >
      <div className='brand-container brand-section'>
        <div className='grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-16'>
          <ScrollReveal className='lg:pt-2' from='left'>
            <h2 className='brand-heading font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08]'>
              {ABOUT_STORY.title}
            </h2>
            <span className='brand-gold-line brand-gold-line--left' />
            <div className='mt-7 max-w-xl space-y-5'>
              {ABOUT_STORY.paragraphs.map((paragraph) => (
                <p
                  className='brand-body text-base leading-8 md:text-[1.05rem]'
                  key={paragraph.slice(0, 40)}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className='mt-8'>
              <BrandButton href={localePath(locale, '/tours')} variant='primary'>
                {ABOUT_STORY.ctaLabel}
                <Icons.arrowRight className='h-4 w-4' />
              </BrandButton>
            </div>
          </ScrollReveal>

          <ScrollReveal className='relative' from='right'>
            <div className='relative'>
              <div className='relative aspect-[5/4] overflow-hidden bg-[var(--brand-primary)] sm:aspect-[4/3] lg:aspect-[5/4]'>
                <Image
                  alt={ABOUT_STORY.imageAlt}
                  className='object-cover object-[center_35%]'
                  fill
                  priority
                  sizes='(max-width:1024px) 100vw, 52vw'
                  src={storyImageUrl}
                />
              </div>
              <div className='absolute -bottom-5 right-4 w-[58%] overflow-hidden border-[6px] border-white bg-white shadow-[0_20px_44px_rgba(16,22,16,0.18)] sm:right-6 sm:w-[48%] lg:-bottom-8 lg:-left-10 lg:right-auto lg:w-[46%]'>
                <div className='relative aspect-[16/11]'>
                  <Image
                    alt={ABOUT_STORY.insetImageAlt}
                    className='object-cover object-center'
                    fill
                    sizes='(max-width:1024px) 55vw, 26vw'
                    src={insetImageUrl}
                  />
                </div>
              </div>
            </div>
            <p className='mt-10 max-w-md text-sm leading-7 text-[var(--brand-muted)] lg:mt-12'>
              {ABOUT_STORY.imageNote}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
