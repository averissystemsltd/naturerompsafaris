import Image from 'next/image';

import { Icons } from '@/components/icons';
import { BrandButton } from '@/components/public/ui/brand-button';
import { BrandButtonGroup } from '@/components/public/ui/brand-button-group';
import { ABOUT_WHY_TRAVEL } from '@/lib/public/about-content';
import { localePath } from '@/lib/public/locale-path';

type BookingAdvantagesCtaProps = {
  locale: string;
};

export function BookingAdvantagesCta({ locale }: BookingAdvantagesCtaProps) {
  return (
    <section className='brand-section bg-white'>
      <div className='brand-container'>
        <h2 className='brand-heading mx-auto max-w-3xl text-center font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.2]'>
          {ABOUT_WHY_TRAVEL.title}
        </h2>
        <span aria-hidden className='brand-gold-line mt-5' />

        <ul className='mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
          {ABOUT_WHY_TRAVEL.items.map((item) => (
            <li className='text-center' key={item.iconSrc}>
              <Image
                alt=''
                aria-hidden
                className='mx-auto h-12 w-12 object-contain md:h-[52px] md:w-[52px]'
                height={52}
                src={item.iconSrc}
                width={52}
              />
              <p className='mt-4 font-display text-lg leading-snug text-[var(--brand-heading)]'>
                {item.title}
              </p>
              <p className='mx-auto mt-2 max-w-[16.5rem] text-[15px] leading-6 text-[var(--brand-muted)]'>
                {item.text}
              </p>
            </li>
          ))}
        </ul>

        <BrandButtonGroup align='center' className='mt-12 md:mt-14'>
          <BrandButton href={localePath(locale, '/contact')} variant='gold'>
            {ABOUT_WHY_TRAVEL.ctaLabel}
            <Icons.mail className='h-4 w-4' />
          </BrandButton>
          <BrandButton href={localePath(locale, '/tours')} variant='accent-outline'>
            {ABOUT_WHY_TRAVEL.secondaryCtaLabel}
            <Icons.arrowRight className='h-4 w-4' />
          </BrandButton>
        </BrandButtonGroup>
      </div>
    </section>
  );
}
