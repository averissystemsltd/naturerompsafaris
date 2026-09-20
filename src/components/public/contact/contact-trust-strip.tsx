import Image from 'next/image';

import { BRAND_CONTACT_RESPONSE, BRAND_GOOGLE_REVIEWS, BRAND_TRIPADVISOR } from '@/config/brand';

const TRUST_COLUMN = 'flex flex-col items-center px-4 text-center md:px-8';

const TRUST_IMAGE_ZONE = 'brand-contact-trust-zone';

const TRUST_TITLE = 'brand-heading mt-5 font-display text-lg';

const TRUST_DESC = 'mt-3 max-w-xs text-sm leading-7 text-[var(--brand-muted)]';

export function ContactTrustStrip() {
  return (
    <section className='border-t border-[var(--brand-line)] bg-white'>
      <div className='brand-container py-14 md:py-16'>
        <div className='grid gap-10 md:grid-cols-3 md:items-start md:gap-0'>
          <div className={TRUST_COLUMN}>
            <div className={TRUST_IMAGE_ZONE}>
              <Image
                alt={BRAND_CONTACT_RESPONSE.alt}
                className='brand-contact-trust-image brand-contact-trust-image--response'
                height={BRAND_CONTACT_RESPONSE.imageHeight}
                src={BRAND_CONTACT_RESPONSE.imagePath}
                width={BRAND_CONTACT_RESPONSE.imageWidth}
              />
            </div>
            <h3 className={TRUST_TITLE}>24-Hour Response</h3>
            <p className={TRUST_DESC}>
              Safari quote requests are reviewed by our planning team and answered within one
              business day.
            </p>
          </div>

          <div
            className={`${TRUST_COLUMN} border-y border-[var(--brand-line)] md:border-x md:border-y-0`}
          >
            <a
              className='group flex w-full flex-col items-center text-center'
              href={BRAND_GOOGLE_REVIEWS.url}
              rel='noopener noreferrer'
              target='_blank'
            >
              <div className={TRUST_IMAGE_ZONE}>
                {/* Native img keeps official SVG logos at their designed size. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={BRAND_GOOGLE_REVIEWS.alt}
                  className='brand-contact-trust-image brand-contact-trust-image--google transition-transform group-hover:scale-[1.02]'
                  height={BRAND_GOOGLE_REVIEWS.logoHeight}
                  src={BRAND_GOOGLE_REVIEWS.logoPath}
                  width={BRAND_GOOGLE_REVIEWS.logoWidth}
                />
              </div>
              <p className={TRUST_TITLE}>Google Reviews</p>
              <p className={TRUST_DESC}>
                {BRAND_GOOGLE_REVIEWS.rating} average star rating on Google.
              </p>
            </a>
          </div>

          <div className={TRUST_COLUMN}>
            <a
              className='group flex w-full flex-col items-center text-center'
              href={BRAND_TRIPADVISOR.url}
              rel='noopener noreferrer'
              target='_blank'
            >
              <div className={TRUST_IMAGE_ZONE}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={BRAND_TRIPADVISOR.alt}
                  className='brand-contact-trust-image brand-contact-trust-image--tripadvisor transition-transform group-hover:scale-[1.02]'
                  height={BRAND_TRIPADVISOR.logoHeight}
                  src={BRAND_TRIPADVISOR.logoPath}
                  width={BRAND_TRIPADVISOR.logoWidth}
                />
              </div>
              <p className={TRUST_TITLE}>Tripadvisor</p>
              <p className={TRUST_DESC}>
                Traveller reviews from guests who planned their safari with our team.
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
