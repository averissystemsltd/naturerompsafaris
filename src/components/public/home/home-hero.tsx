'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Icons } from '@/components/icons';
import { BrandButton } from '@/components/public/ui/brand-button';
import { BrandButtonGroup } from '@/components/public/ui/brand-button-group';
import { BRAND_GOOGLE_REVIEWS, BRAND_TRIPADVISOR, HOME_PAGE_COPY } from '@/config/brand';
import { localePath } from '@/lib/public/locale-path';
import { useSitePhotos } from '@/components/public/site-photos-provider';
import { youtubeVideoId } from '@/lib/public/page-heroes';
import type { HeroSlide, PageHero } from '@/lib/public/types';

const HERO_FALLBACK_ALTS = [
  'Kenya safari plains on a Nature Romp game drive',
  'Wildlife viewing from a Nature Romp safari vehicle',
  'Nature Romp safari vehicle at a park gate',
  'Nature Romp 4x4 fleet ready for a game drive'
] as const;

const HERO_SLIDE_INTERVAL = 6500;

const STALE_HOME_HEADINGS = new Set([
  'Welcome to Nature Romp Safaris',
  'Unforgettable East African Safaris, Crafted Around You',
  'Private Kenya Tanzania safari adventures',
  'Kenya and Tanzania safaris designed around your dates'
]);

const STALE_HOME_SUBHEADING = 'twenty-five years';

function resolveHomeHeading(hero?: PageHero | null): string {
  const heading = hero?.heading?.trim();
  if (!heading || STALE_HOME_HEADINGS.has(heading)) return HOME_PAGE_COPY.title;
  return heading;
}

function resolveHomeSubheading(hero?: PageHero | null): string {
  const subheading = hero?.subheading?.trim();
  if (!subheading || subheading.toLowerCase().includes(STALE_HOME_SUBHEADING)) {
    return HOME_PAGE_COPY.description;
  }
  if (
    subheading ===
      'Nairobi planners, private 4x4s, and itineraries built around your dates in Kenya and Tanzania.' ||
    subheading ===
      'Nature Romp Safaris is a Nairobi team planning private Kenya and Tanzania safari adventures. Request a quote and we send a tailor-made itinerary with the price and what is included, usually within 24 hours.'
  ) {
    return HOME_PAGE_COPY.description;
  }
  return subheading;
}

export function HomeHero({
  locale,
  hero,
  slides
}: {
  locale: string;
  hero?: PageHero | null;
  slides?: HeroSlide[];
}) {
  const contactHref = localePath(locale, '/contact');
  const toursHref = localePath(locale, '/tours');

  const photos = useSitePhotos();
  const fallbackSlides: HeroSlide[] = [
    photos['home-hero-1'],
    photos['home-hero-2'],
    photos['home-hero-3'],
    photos['home-hero-4']
  ].map((mediaUrl, index) => ({
    mediaType: 'image' as const,
    mediaUrl,
    alt: HERO_FALLBACK_ALTS[index] ?? 'Nature Romp Safaris',
    heading: null,
    subheading: null,
    posterUrl: null,
    isActive: true,
    sortOrder: index
  }));
  const configuredSlides = hero?.slides ?? slides;
  const heroSlides =
    configuredSlides && configuredSlides.length > 0 ? configuredSlides : fallbackSlides;
  const videoId = hero?.type === 'youtube' ? youtubeVideoId(hero.youtubeUrl) : null;

  const heading = resolveHomeHeading(hero);
  const subheading = resolveHomeSubheading(hero);
  const primaryCtaLabel = hero?.ctaLabel ?? 'Plan My Safari';
  const primaryCtaHref = hero?.ctaHref ? localePath(locale, hero.ctaHref) : contactHref;

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (videoId) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || heroSlides.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL);

    return () => window.clearInterval(interval);
  }, [heroSlides.length, videoId]);

  return (
    <section className='relative min-h-[min(92vh,960px)] overflow-hidden bg-[var(--brand-primary-dark)] text-white'>
      {videoId ? (
        <>
          {heroSlides[0]?.mediaUrl ? (
            <Image
              alt={heroSlides[0].alt ?? 'Nature Romp Safaris'}
              className='object-cover'
              fill
              fetchPriority='high'
              priority
              sizes='100vw'
              src={heroSlides[0].mediaUrl}
            />
          ) : null}
          <iframe
            allow='autoplay; encrypted-media'
            aria-hidden
            className='pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2'
            loading='lazy'
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1&showinfo=0`}
            title='Background video'
          />
        </>
      ) : (
        heroSlides.map((slide, index) => (
          <div
            aria-hidden={index !== activeSlide}
            className='absolute inset-0 transition-opacity duration-1000'
            key={`${slide.mediaUrl}-${index}`}
            style={{ opacity: index === activeSlide ? 1 : 0 }}
          >
            {slide.mediaType === 'video' ? (
              <video
                autoPlay
                className='h-full w-full object-cover'
                loop
                muted
                playsInline
                poster={slide.posterUrl ?? undefined}
              >
                <source src={slide.mediaUrl} />
              </video>
            ) : (
              <Image
                alt={slide.alt ?? 'Nature Romp Safaris'}
                className='object-cover'
                fetchPriority={index === 0 ? 'high' : undefined}
                fill
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
                sizes='100vw'
                src={slide.mediaUrl}
              />
            )}
          </div>
        ))
      )}
      <div
        aria-hidden
        className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30'
      />
      <div
        aria-hidden
        className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent'
      />

      <div className='relative z-10 flex min-h-[min(92vh,960px)] flex-col justify-between'>
        <div className='flex flex-1 items-center'>
          <div className='brand-container py-20'>
            <h1 className='max-w-3xl text-[clamp(2.35rem,5.4vw,3.85rem)] leading-[1.05] tracking-[-0.03em] text-white'>
              {heading}
            </h1>
            <p className='mt-6 max-w-2xl text-lg leading-8 text-white/90'>{subheading}</p>
            <BrandButtonGroup className='mt-8'>
              <BrandButton
                className='border-[var(--brand-lime)] bg-[var(--brand-lime)] text-white [--brand-fill:var(--brand-primary)]'
                href={primaryCtaHref}
                variant='accent'
              >
                <Icons.compass className='h-4 w-4 shrink-0' />
                {primaryCtaLabel}
              </BrandButton>
              <BrandButton href={toursHref} variant='gold-outline'>
                View Safari Tours
                <Icons.arrowRight className='h-4 w-4 shrink-0' />
              </BrandButton>
            </BrandButtonGroup>
            <div className='mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-white/90'>
              <a
                className='inline-flex items-center gap-2 transition-opacity hover:opacity-100'
                href={BRAND_GOOGLE_REVIEWS.url}
                rel='noopener noreferrer'
                target='_blank'
              >
                <Image
                  alt={BRAND_GOOGLE_REVIEWS.alt}
                  className='h-5 w-5'
                  height={20}
                  src={BRAND_GOOGLE_REVIEWS.logoPath}
                  width={20}
                />
                Google {BRAND_GOOGLE_REVIEWS.rating} average
              </a>
              <span aria-hidden className='hidden h-4 w-px bg-white/35 sm:block' />
              <a
                className='inline-flex items-center gap-2 transition-opacity hover:opacity-100'
                href={BRAND_TRIPADVISOR.url}
                rel='noopener noreferrer'
                target='_blank'
              >
                <Image
                  alt={BRAND_TRIPADVISOR.alt}
                  className='h-5 w-auto'
                  height={20}
                  src={BRAND_TRIPADVISOR.logoPath}
                  width={84}
                />
                Tripadvisor reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
