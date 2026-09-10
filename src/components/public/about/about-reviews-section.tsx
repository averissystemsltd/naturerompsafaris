import Image from 'next/image';

import { Icons } from '@/components/icons';

import { BrandButton } from '@/components/public/ui/brand-button';

import { SectionHeader } from '@/components/public/ui/section-header';

import { BRAND_SAFARI_BOOKINGS } from '@/config/brand';

import type { AboutTestimonial } from '@/lib/public/about-placeholders';

type AboutReviewsSectionProps = {
  testimonials: AboutTestimonial[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} className='flex gap-0.5'>
      {Array.from({ length: 5 }).map((_, index) => (
        <Icons.exclusive
          className={`h-4 w-4 ${index < rating ? 'fill-[#FBBC04] text-[#FBBC04]' : 'text-[var(--brand-line)]'}`}
          key={index}
        />
      ))}
    </div>
  );
}

export function AboutReviewsSection({ testimonials }: AboutReviewsSectionProps) {
  return (
    <div className='space-y-0'>
      <section className='brand-section border-b border-[var(--brand-line)] bg-white'>
        <div className='brand-container'>
          <div className='mx-auto max-w-3xl text-center'>
            <div className='mx-auto flex h-16 w-40 items-center justify-center px-4'>
              <Image
                alt={BRAND_SAFARI_BOOKINGS.alt}
                className='h-auto w-full object-contain'
                height={BRAND_SAFARI_BOOKINGS.logoHeight}
                src={BRAND_SAFARI_BOOKINGS.logoPath}
                width={BRAND_SAFARI_BOOKINGS.logoWidth}
              />
            </div>

            <h2 className='brand-heading mt-6 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight'>
              Verified Guest Reviews on SafariBookings
            </h2>

            <span aria-hidden className='brand-gold-line mt-5' />

            <p className='brand-body mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--brand-muted)]'>
              Nature Romp Safaris is listed on SafariBookings.com with independent reviews from
              travelers who have booked safaris across Kenya, Tanzania, Uganda, and Rwanda.
            </p>

            <div className='mt-8 flex flex-wrap justify-center gap-4'>
              <BrandButton href={BRAND_SAFARI_BOOKINGS.url} variant='primary'>
                Read Reviews on SafariBookings
              </BrandButton>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length ? (
        <section className='brand-section bg-white'>
          <div className='brand-container'>
            <SectionHeader
              description='A selection of guest feedback from recent Nature Romp safaris.'
              eyebrow='Guest Stories'
              title='What Travelers Say About Us'
            />

            <div className='mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3'>
              {testimonials.map((item) => (
                <figure
                  className='flex flex-col border-t-2 border-[var(--brand-primary)] pt-6'
                  key={item.id}
                >
                  <StarRating rating={item.rating} />

                  <blockquote className='brand-body mt-4 flex-1 text-sm leading-7 text-[var(--brand-muted)]'>
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <figcaption className='mt-6 border-t border-[var(--brand-line)] pt-4'>
                    <p className='brand-heading font-display text-lg'>{item.guestName}</p>

                    <p className='mt-1 text-xs text-[var(--brand-muted)]'>{item.country}</p>

                    <p className='mt-2 text-xs font-medium text-[var(--brand-primary)]'>
                      {item.tourLabel}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
