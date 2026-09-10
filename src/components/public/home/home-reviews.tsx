'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Icons } from '@/components/icons';
import { HOME_REVIEWS, HOME_REVIEWS_SUMMARY, type HomeReview } from '@/lib/public/home-reviews';

const AUTOPLAY_MS = 6000;

function Stars({ rating }: { rating: number }) {
  return (
    <div className='flex justify-center gap-1' aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icons.exclusive
          className={`h-4 w-4 ${
            i < rating
              ? 'fill-[var(--brand-gold)] text-[var(--brand-gold)]'
              : 'text-[var(--brand-line)]'
          }`}
          key={i}
        />
      ))}
    </div>
  );
}

function ReviewSlide({ review }: { review: HomeReview }) {
  return (
    <figure className='mx-auto flex max-w-3xl flex-col items-center px-2 text-center md:px-8'>
      <Stars rating={review.rating} />
      <blockquote className='brand-heading mt-6 font-display text-xl leading-[1.5] md:text-[1.7rem] md:leading-[1.45]'>
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className='mt-7'>
        <p className='brand-heading font-display text-lg'>{review.guestName}</p>
        <p className='mt-1 text-xs uppercase tracking-[0.12em] text-[var(--brand-muted)]'>
          {review.location ? `${review.location} · ` : ''}via {review.source}
        </p>
      </figcaption>
    </figure>
  );
}

export function HomeReviews() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HOME_REVIEWS.length;

  const go = useCallback((next: number) => setActive(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, go]);

  // Pause autoplay while the tab is hidden.
  const wasPaused = useRef(false);
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        wasPaused.current = paused;
        setPaused(true);
      } else {
        setPaused(wasPaused.current);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [paused]);

  return (
    <section
      aria-roledescription='carousel'
      aria-label='Guest reviews'
      className='border-t border-[var(--brand-line)] bg-white'
    >
      <div className='brand-container brand-section'>
        {/* Header — descriptive, not boxed */}
        <div className='mx-auto max-w-2xl text-center'>
          <p className='brand-eyebrow'>Do Not Take Our Word For It</p>
          <h2 className='brand-heading mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.15]'>
            What Our Clients Say
          </h2>
          <div className='mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-3'>
            <span className='inline-flex items-center gap-1'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Icons.exclusive
                  className='h-5 w-5 fill-[var(--brand-gold)] text-[var(--brand-gold)]'
                  key={i}
                />
              ))}
            </span>
            <span className='text-sm font-semibold text-[var(--brand-heading)]'>
              <span className='text-[var(--brand-gold)]'>{HOME_REVIEWS_SUMMARY.count}</span>{' '}
              {HOME_REVIEWS_SUMMARY.label}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt='Tripadvisor'
              className='h-6 w-auto'
              height={24}
              src='/assets/tripadvisor-logo-primary.svg'
              width={158}
            />
          </div>
        </div>

        {/* Slider */}
        <div
          className='relative mt-12 overflow-hidden'
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            aria-live='polite'
            className='flex transition-transform duration-700 ease-out'
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {HOME_REVIEWS.map((review, i) => (
              <div
                aria-hidden={i !== active}
                aria-label={`${i + 1} of ${count}`}
                aria-roledescription='slide'
                className='w-full shrink-0 py-2'
                key={review.id}
              >
                <ReviewSlide review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className='mt-10 flex items-center justify-center gap-6'>
          <button
            aria-label='Previous review'
            className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-line)] text-[var(--brand-heading)] transition-colors hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)]'
            onClick={() => go(active - 1)}
            type='button'
          >
            <Icons.chevronLeft className='h-5 w-5' />
          </button>

          <div className='flex items-center gap-2'>
            {HOME_REVIEWS.map((review, i) => (
              <button
                aria-current={i === active}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === active
                    ? 'w-6 bg-[var(--brand-gold)]'
                    : 'w-2 bg-[var(--brand-line)] hover:bg-[var(--brand-muted)]'
                }`}
                key={review.id}
                onClick={() => go(i)}
                type='button'
              />
            ))}
          </div>

          <button
            aria-label='Next review'
            className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-line)] text-[var(--brand-heading)] transition-colors hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)]'
            onClick={() => go(active + 1)}
            type='button'
          >
            <Icons.chevronRight className='h-5 w-5' />
          </button>
        </div>
      </div>
    </section>
  );
}
