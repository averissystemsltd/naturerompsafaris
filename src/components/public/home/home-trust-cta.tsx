'use client';

import { Icons } from '@/components/icons';
import { BrandButton } from '@/components/public/ui/brand-button';
import { ScrollReveal } from '@/components/public/ui/scroll-reveal';
import { localePath } from '@/lib/public/locale-path';
import type { PublicSiteSettings } from '@/lib/public/types';

export function HomeTrustCta({
  locale,
  siteSettings
}: {
  locale: string;
  siteSettings: PublicSiteSettings;
}) {
  return (
    <section
      className='relative isolate bg-cover bg-center bg-fixed'
      style={{
        backgroundImage: "url('/assets/Saruni-Basecamp-The-Great-Migration-river-crossing.jpg')"
      }}
    >
      <div aria-hidden className='absolute inset-0 bg-black/60' />

      <div className='brand-container brand-section relative flex justify-center'>
        <ScrollReveal className='w-full max-w-lg rounded-[var(--brand-radius)] bg-white p-8 text-center shadow-2xl md:p-10'>
          <h3 className='brand-heading font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-tight'>
            Ready to Start Planning?
          </h3>
          <p className='brand-body mx-auto mt-3 max-w-md'>
            Tell us your dates, group size, and the parks you want to see. Our planners will respond
            with a tailored proposal, usually within one business day.
          </p>
          <div className='brand-body mt-6 space-y-1.5 text-sm'>
            <p>
              <a
                className='transition-colors hover:text-[var(--brand-primary)]'
                href={`mailto:${siteSettings.email}`}
              >
                {siteSettings.email}
              </a>
            </p>
            <p>
              {siteSettings.phoneSecondary} / {siteSettings.phonePrimary}
            </p>
          </div>
          <div className='mt-7 flex justify-center'>
            <BrandButton
              className='border-[var(--brand-lime)] bg-[var(--brand-lime)] text-white [--brand-fill:var(--brand-primary)]'
              href={localePath(locale, '/contact')}
              variant='accent'
            >
              Enquire Now
              <Icons.arrowRight className='h-4 w-4' />
            </BrandButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
