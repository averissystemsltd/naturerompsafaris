'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { BrandButton } from '@/components/public/ui/brand-button';
import { BrandButtonGroup } from '@/components/public/ui/brand-button-group';
import { ScrollReveal } from '@/components/public/ui/scroll-reveal';
import { SectionHeader } from '@/components/public/ui/section-header';
import type { PublicExperience } from '@/features/experiences/public/types';
import {
  HOME_EXPERIENCE_CATEGORIES,
  sortExperienceCategoriesBySearchPopularity,
  sortExperiencesBySearchPopularity
} from '@/lib/public/home-content';
import { localePath } from '@/lib/public/locale-path';
import { homeExperiencePhotoSlot } from '@/lib/public/site-photos';
import { useSitePhotos } from '@/components/public/site-photos-provider';

const HOME_EXPERIENCE_GRID_LIMIT = 6;

type HomeExperienceGridItem = {
  blurb: string;
  href: string;
  id: string;
  imageAlt: string;
  imageUrl: string | null;
  title: string;
};

function firstSentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '';

  const periodIndex = trimmed.indexOf('.');
  if (periodIndex === -1) return trimmed;

  return trimmed.slice(0, periodIndex + 1);
}

function mapPublishedExperience(experience: PublicExperience): HomeExperienceGridItem {
  return {
    blurb: firstSentence(experience.summary ?? ''),
    href: experience.href,
    id: experience.id,
    imageAlt: experience.imageAlt ?? experience.title,
    imageUrl: experience.imageUrl,
    title: experience.title
  };
}

type HomeExperiencesGridProps = {
  experiences: PublicExperience[];
  locale: string;
};

export function HomeExperiencesGrid({ experiences, locale }: HomeExperiencesGridProps) {
  const photos = useSitePhotos();
  const fallbackPool = [
    photos['home-experience-family'],
    photos['home-experience-honeymoon'],
    photos['home-experience-luxury'],
    photos['home-experience-migration'],
    photos['home-experience-big-five'],
    photos['home-experience-photography']
  ];
  const items = (
    experiences.length
      ? sortExperiencesBySearchPopularity(experiences).map((experience, index) => {
          const mapped = mapPublishedExperience(experience);
          return {
            ...mapped,
            imageUrl: mapped.imageUrl ?? fallbackPool[index % fallbackPool.length] ?? null
          };
        })
      : sortExperienceCategoriesBySearchPopularity(HOME_EXPERIENCE_CATEGORIES).map((category) => {
          const slot = homeExperiencePhotoSlot(category.id);
          return {
            blurb: firstSentence(category.blurb),
            href: localePath(locale, category.href),
            id: category.id,
            imageAlt: category.imageAlt,
            imageUrl: slot ? photos[slot] : category.imageUrl,
            title: category.title
          };
        })
  ).slice(0, HOME_EXPERIENCE_GRID_LIMIT);

  return (
    <section className='brand-section bg-white'>
      <div className='brand-container'>
        <SectionHeader
          description='Migration weeks in the Mara and Serengeti, Big Five game drives, a beach after the bush, Kilimanjaro or Mount Kenya, family pacing, or a trip written from scratch. Nature Romp still builds each one around your dates and how you like to travel.'
          eyebrow='Top experiences'
          title='The safari styles guests ask us to plan'
        />

        <ScrollReveal className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3' stagger>
          {items.map((item) => (
            <Link
              className='group relative block overflow-hidden rounded-[var(--brand-radius)] bg-[var(--brand-primary)]'
              data-reveal-item
              href={item.href}
              key={item.id}
            >
              <span className='relative block aspect-[4/3] min-h-[16rem]'>
                {item.imageUrl ? (
                  <Image
                    alt={item.imageAlt}
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    fill
                    sizes='(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw'
                    src={item.imageUrl}
                  />
                ) : (
                  <span aria-hidden className='absolute inset-0 bg-[var(--brand-primary-light)]' />
                )}
                <span
                  aria-hidden
                  className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5'
                />
                <span className='absolute inset-x-0 bottom-0 p-5 lg:p-6'>
                  <span className='block font-display text-[1.35rem] leading-tight text-white lg:text-[1.5rem]'>
                    {item.title}
                  </span>
                  {item.blurb ? (
                    <span className='mt-2 block text-sm leading-6 text-white/88'>{item.blurb}</span>
                  ) : null}
                  <span className='mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-gold)]'>
                    View details
                    <Icons.arrowRight className='h-3 w-3 transition-transform group-hover:translate-x-1' />
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </ScrollReveal>

        <div className='mx-auto mt-16 max-w-2xl text-center'>
          <p className='brand-heading font-display text-2xl leading-tight md:text-[1.75rem]'>
            Most Kenya and Tanzania safari adventures start as a conversation
          </p>
          <p className='brand-body mx-auto mt-3 max-w-xl text-base leading-7'>
            Tell us who is travelling, your dates, and whether you want Kenya, Tanzania, or both. We
            send a private itinerary with the price and what is included, usually within 24 hours.
          </p>
          <BrandButtonGroup align='center' className='mt-6'>
            <BrandButton href={localePath(locale, '/contact')} variant='primary'>
              Plan My Safari
              <Icons.arrowRight className='h-4 w-4' />
            </BrandButton>
            <BrandButton href={localePath(locale, '/tours')} variant='accent-outline'>
              Browse all tours
            </BrandButton>
          </BrandButtonGroup>
        </div>
      </div>
    </section>
  );
}
