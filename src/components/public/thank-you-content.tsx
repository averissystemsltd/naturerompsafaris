'use client';

import { Icons } from '@/components/icons';
import { BrandButton } from '@/components/public/ui/brand-button';
import {
  parseEnquiryThankYouSource,
  thankYouCopy,
  type EnquiryThankYouSource
} from '@/lib/public/enquiry-thank-you';
import { localePath } from '@/lib/public/locale-path';

type ThankYouContentProps = {
  locale: string;
  sourceParam?: string | string[];
};

export function ThankYouContent({ locale, sourceParam }: ThankYouContentProps) {
  const source: EnquiryThankYouSource = parseEnquiryThankYouSource(sourceParam);
  const copy = thankYouCopy(source);

  return (
    <main className='bg-[var(--brand-contact-body-bg)]'>
      <section className='brand-container brand-section'>
        <div className='brand-thank-you mx-auto max-w-2xl'>
          <div aria-hidden className='brand-thank-you__icon-wrap'>
            <span className='brand-thank-you__ring brand-thank-you__ring--outer' />
            <span className='brand-thank-you__ring brand-thank-you__ring--inner' />
            <span className='brand-thank-you__icon'>
              <Icons.check className='size-9' strokeWidth={2.5} />
            </span>
            <span className='brand-thank-you__spark brand-thank-you__spark--1' />
            <span className='brand-thank-you__spark brand-thank-you__spark--2' />
            <span className='brand-thank-you__spark brand-thank-you__spark--3' />
          </div>

          <p className='brand-thank-you__eyebrow'>Enquiry received</p>
          <h1 className='brand-thank-you__heading font-display'>{copy.heading}</h1>
          <p className='brand-thank-you__body'>{copy.body}</p>
          <p className='brand-thank-you__note'>
            No payment is collected on this website. We listen first and tailor suggestions to your
            interests.
          </p>

          <div className='brand-thank-you__actions'>
            <BrandButton href={localePath(locale)} variant='gold'>
              Back to homepage
            </BrandButton>
            <BrandButton href={localePath(locale, copy.secondaryHref)} variant='accent-outline'>
              {copy.secondaryLabel}
            </BrandButton>
          </div>
        </div>
      </section>
    </main>
  );
}
