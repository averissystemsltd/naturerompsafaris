import { SectionHeader } from '@/components/public/ui/section-header';
import { BRAND_KPSGA, BRAND_MAGICAL_KENYA, BRAND_TRA } from '@/config/brand';

const TRUSTED_LOGOS = [BRAND_TRA, BRAND_MAGICAL_KENYA, BRAND_KPSGA] as const;

const MARQUEE_SEQUENCE = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS, ...TRUSTED_LOGOS, ...TRUSTED_LOGOS];

function TrustedLogo({
  partner,
  decorative = false
}: {
  partner: (typeof TRUSTED_LOGOS)[number];
  decorative?: boolean;
}) {
  return (
    <a
      aria-hidden={decorative ? true : undefined}
      className='mx-8 flex h-16 w-52 shrink-0 items-center justify-center md:mx-12 md:h-[4.5rem] md:w-60'
      href={partner.url}
      rel='noopener noreferrer'
      tabIndex={decorative ? -1 : undefined}
      target='_blank'
    >
      {/* Native img keeps official logo artwork at its designed proportions. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={partner.alt}
        className='max-h-12 w-auto max-w-[11.5rem] object-contain md:max-h-14 md:max-w-[13rem]'
        height={partner.logoHeight}
        src={partner.logoPath}
        width={partner.logoWidth}
      />
    </a>
  );
}

export function HomePartners() {
  return (
    <section
      aria-labelledby='trusted-by-heading'
      className='border-y border-[var(--brand-line)] bg-white'
    >
      <div className='brand-container pt-14 md:pt-16'>
        <SectionHeader
          description='Nature Romp Safaris works with the authorities and associations that license and recognise travel in Kenya.'
          title='Trusted & Recognised'
          titleId='trusted-by-heading'
        />
      </div>

      <div className='brand-marquee-track mt-10 overflow-hidden pb-14 md:pb-16'>
        <div className='brand-marquee brand-marquee--trusted'>
          {MARQUEE_SEQUENCE.map((partner, index) => (
            <TrustedLogo key={`${partner.alt}-${index}`} partner={partner} />
          ))}
          {MARQUEE_SEQUENCE.map((partner, index) => (
            <TrustedLogo decorative key={`${partner.alt}-loop-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
