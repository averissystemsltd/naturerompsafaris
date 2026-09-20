'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Icons } from '@/components/icons';
import { SectionHeader } from '@/components/public/ui/section-header';
import { BRAND_GOOGLE_REVIEWS } from '@/config/brand';
import { FALLBACK_GOOGLE_HOME_REVIEWS, type HomeReviewItem } from '@/lib/public/home-reviews';
import { cn } from '@/lib/utils';

const AVATAR_COLORS = ['#EA4335', '#FB8C00', '#34A853', '#4285F4', '#AB47BC', '#00ACC1'];
const REVIEW_PREVIEW_LENGTH = 180;
const AUTO_ADVANCE_MS = 4500;
const SLIDE_GAP_REM = 1.25;

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M23.52 12.27c0-.82-.07-1.6-.21-2.36H12v4.47h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.73Z'
        fill='#4285F4'
      />
      <path
        d='M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.09A12 12 0 0 0 12 24Z'
        fill='#34A853'
      />
      <path
        d='M5.29 14.29A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.29V6.62H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.38l4.01-3.09Z'
        fill='#FBBC05'
      />
      <path
        d='M12 4.76c1.76 0 3.34.61 4.59 1.8l3.43-3.43C17.95 1.18 15.24 0 12 0A12 12 0 0 0 1.28 6.62l4.01 3.09C6.23 6.87 8.88 4.76 12 4.76Z'
        fill='#EA4335'
      />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function avatarColor(name: string) {
  const total = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[total % AVATAR_COLORS.length];
}

function formatReviewDate(value: string | null) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}.${month}.${day}.`;
}

function selectGoogleReviews(reviews?: HomeReviewItem[]) {
  const published = (reviews ?? []).filter(
    (review) => review.source === 'google' && review.body.trim()
  );
  return published.length ? published : FALLBACK_GOOGLE_HOME_REVIEWS;
}

function visibleCardCount() {
  if (window.matchMedia('(min-width: 1280px)').matches) return 3;
  if (window.matchMedia('(min-width: 768px)').matches) return 2;
  return 1;
}

function StarRating({ rating }: { rating: number }) {
  const filled = Math.round(rating);

  return (
    <div aria-label={`${rating} out of 5 stars on Google`} className='flex items-center gap-1'>
      <span className='flex gap-px'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Icons.exclusive
            className={cn(
              'h-4 w-4',
              index < filled ? 'fill-[#FBBC04] text-[#FBBC04]' : 'text-[var(--brand-line)]'
            )}
            key={index}
          />
        ))}
      </span>
      <Icons.circleCheck className='h-4 w-4 fill-[#1A73E8] text-white' />
    </div>
  );
}

function GoogleReviewCard({
  expanded,
  onToggle,
  review
}: {
  expanded: boolean;
  onToggle: () => void;
  review: HomeReviewItem;
}) {
  const canExpand = review.body.length > REVIEW_PREVIEW_LENGTH;
  const preview = canExpand
    ? `${review.body.slice(0, REVIEW_PREVIEW_LENGTH).trim()}...`
    : review.body;
  const dateLabel = formatReviewDate(review.reviewDate);

  return (
    <article className='brand-google-review-card flex h-full flex-col border border-[var(--brand-line)] bg-white p-6'>
      <div className='flex items-start gap-3'>
        {review.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={review.authorName}
            className='h-11 w-11 shrink-0 rounded-full object-cover'
            height={44}
            src={review.avatarUrl}
            width={44}
          />
        ) : (
          <span
            className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white'
            style={{ backgroundColor: avatarColor(review.authorName) }}
          >
            {initials(review.authorName)}
          </span>
        )}
        <div className='min-w-0 flex-1'>
          <p className='truncate text-[15px] font-semibold text-[var(--brand-heading)]'>
            {review.authorName}
          </p>
          {dateLabel ? (
            <p className='mt-0.5 text-xs text-[var(--brand-muted)]'>{dateLabel}</p>
          ) : null}
        </div>
        <GoogleGlyph className='h-5 w-5 shrink-0' />
      </div>

      <div className='mt-3'>
        <StarRating rating={review.rating} />
      </div>

      <p className='mt-3 flex-1 text-sm leading-7 text-[var(--brand-ink)]'>
        {expanded || !canExpand ? review.body : preview}
      </p>

      {canExpand ? (
        <button
          className='mt-2 self-start text-sm text-[var(--brand-muted)] transition-colors hover:text-[var(--brand-heading)]'
          onClick={onToggle}
          type='button'
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      ) : null}
    </article>
  );
}

function GoogleReviewsSlider({ items }: { items: HomeReviewItem[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [visible, setVisible] = useState(1);
  const pausedRef = useRef(false);
  const indexRef = useRef(0);
  const slides = [...items, ...items.slice(0, 3)];

  const setPaused = useCallback((next: boolean) => {
    pausedRef.current = next;
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduceMotion(media.matches);
    const syncVisible = () => setVisible(visibleCardCount());
    syncMotion();
    syncVisible();
    media.addEventListener('change', syncMotion);
    window.addEventListener('resize', syncVisible);
    return () => {
      media.removeEventListener('change', syncMotion);
      window.removeEventListener('resize', syncVisible);
    };
  }, []);

  useEffect(() => {
    pausedRef.current = Boolean(expandedId);
  }, [expandedId]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0) {
        setAnimate(false);
        setIndex(items.length + (next % items.length));
        window.requestAnimationFrame(() => setAnimate(true));
        return;
      }
      setAnimate(true);
      setIndex(next);
    },
    [items.length]
  );

  useEffect(() => {
    if (index !== items.length) return;
    const timeout = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, 720);
    return () => window.clearTimeout(timeout);
  }, [index, items.length]);

  useEffect(() => {
    if (reduceMotion || items.length <= visible) return;
    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      setAnimate(true);
      setIndex(indexRef.current + 1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [items.length, reduceMotion, visible]);

  function toggleReview(id: string) {
    setExpandedId((current) => (current === id ? null : id));
  }

  if (reduceMotion) {
    return (
      <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {items.map((review) => (
          <GoogleReviewCard
            expanded={expandedId === review.id}
            key={review.id}
            onToggle={() => toggleReview(review.id)}
            review={review}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className='relative px-12'
      onBlurCapture={() => {
        if (!expandedId) setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!expandedId) setPaused(false);
      }}
    >
      <button
        aria-label='Previous reviews'
        className='absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[var(--brand-line)] bg-[var(--brand-warm-gray)] text-[var(--brand-heading)] transition-colors hover:border-[var(--brand-heading)] hover:text-[var(--brand-primary)]'
        onClick={() => goTo(index - 1)}
        type='button'
      >
        <Icons.chevronLeft className='h-5 w-5' />
      </button>
      <button
        aria-label='Next reviews'
        className='absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[var(--brand-line)] bg-[var(--brand-warm-gray)] text-[var(--brand-heading)] transition-colors hover:border-[var(--brand-heading)] hover:text-[var(--brand-primary)]'
        onClick={() => goTo(index + 1)}
        type='button'
      >
        <Icons.chevronRight className='h-5 w-5' />
      </button>

      <div className='brand-google-reviews-viewport'>
        <div
          className={cn(
            'brand-google-reviews-track',
            animate && 'transition-transform duration-700 ease-out'
          )}
          style={{
            transform: `translate3d(calc(${index} * -1 * ((100% + ${SLIDE_GAP_REM}rem) / ${visible})), 0, 0)`
          }}
        >
          {slides.map((review, slideIndex) => (
            <GoogleReviewCard
              expanded={expandedId === review.id}
              key={`${review.id}-${slideIndex}`}
              onToggle={() => toggleReview(review.id)}
              review={review}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeGoogleReviews({ reviews }: { reviews?: HomeReviewItem[] }) {
  const items = selectGoogleReviews(reviews);

  return (
    <section
      aria-labelledby='home-reviews-heading'
      className='border-t border-[var(--brand-line)] bg-[var(--brand-warm-gray)]'
    >
      <div className='brand-container brand-section'>
        <SectionHeader
          eyebrow='Guest reviews'
          title='Our customer reviews'
          titleId='home-reviews-heading'
        />

        <div className='mt-12'>
          <GoogleReviewsSlider items={items} />
        </div>

        <div className='mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--brand-muted)]'>
          <p>Showing our latest reviews</p>
          <a
            className='inline-flex items-center gap-2 font-semibold text-[var(--brand-heading)] transition-opacity hover:opacity-80'
            href={BRAND_GOOGLE_REVIEWS.url}
            rel='noopener noreferrer'
            target='_blank'
          >
            <GoogleGlyph className='h-4 w-4 shrink-0' />
            Google {BRAND_GOOGLE_REVIEWS.rating} average
          </a>
        </div>
      </div>
    </section>
  );
}
