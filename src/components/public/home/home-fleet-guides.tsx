'use client';

import Image from 'next/image';

import { Icons } from '@/components/icons';
import { BrandButton } from '@/components/public/ui/brand-button';
import { BrandButtonGroup } from '@/components/public/ui/brand-button-group';
import { ScrollReveal } from '@/components/public/ui/scroll-reveal';
import { TrustedChecklist } from '@/components/public/home/home-trusted-checklist';
import { Slider } from '@/components/public/ui/slider';
import { localePath } from '@/lib/public/locale-path';

const FLEET_SLIDER_IMAGES = [
  {
    imageUrl: '/assets/brand-fleet-lion.png',
    imageAlt: 'Nature Romp Safaris four by four with pop up roof near a lion on the plains'
  },
  {
    imageUrl: '/assets/brand-4x4-safaris-fleet.png',
    imageAlt: 'Nature Romp Safaris 4x4 fleet at a scenic East African viewpoint'
  },
  {
    imageUrl: '/assets/brand-fleet-mara-gate.png',
    imageAlt: 'Nature Romp Safaris vehicle at Lake Naivasha Sopa Resort'
  },
  {
    imageUrl: '/assets/brand-fleet-branded.png',
    imageAlt: 'Nature Romp Safaris Land Cruiser ready for off road game drives'
  },
  {
    imageUrl: '/assets/brand-fleet-guests.png',
    imageAlt: 'Safari guests with Nature Romp Safaris private safari vehicles'
  }
];

const FLEET_HIGHLIGHTS = [
  'An off-road 4x4 Land Cruiser with a pop-up roof, so you can stand for a clear 360-degree view.',
  'Higher seating than a minivan, which means everyone can photograph, not only the people in front.',
  'All-wheel drive for Mara tracks, crater rims, and the kilometres that get rough after rain.',
  'The same vehicle and the same driver-guide from airport pickup to your last morning in camp.'
];

export function HomeFleetGuides({ locale }: { locale: string }) {
  return (
    <section className='border-t border-[var(--brand-line)] bg-[var(--brand-warm-gray)]'>
      <div className='brand-container brand-section'>
        <div className='grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16'>
          <ScrollReveal from='left'>
            <p className='brand-eyebrow'>How you travel with us</p>
            <h2 className='brand-heading mt-3 font-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.1]'>
              Your Land Cruiser and guide stay with you the whole way
            </h2>
            <span className='brand-gold-line brand-gold-line--left' />
            <p className='brand-body mt-6 max-w-xl text-base leading-8'>
              Nature Romp safaris run in a private 4x4 Land Cruiser, not a packed minivan unless you
              ask for one. The pop-up roof, the extra height for photos, and a guide who already
              knows how you like the day paced: that is the difference guests remember.
            </p>
            <TrustedChecklist items={FLEET_HIGHLIGHTS} />
            <BrandButtonGroup className='mt-8'>
              <BrandButton
                className='group'
                href={localePath(locale, '/our-fleet')}
                variant='primary'
              >
                <Icons.fleet className='h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-110' />
                View Our Fleet
              </BrandButton>
              <BrandButton
                className='group'
                href={localePath(locale, '/about')}
                variant='accent-outline'
              >
                <Icons.teams className='h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:scale-110' />
                Meet Our Guides
                <Icons.arrowRight className='h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1' />
              </BrandButton>
            </BrandButtonGroup>
          </ScrollReveal>

          <ScrollReveal className='relative' from='right'>
            <Slider autoPlayMs={5500} showArrows={false}>
              {FLEET_SLIDER_IMAGES.map((image) => (
                <div
                  className='relative aspect-[4/3] overflow-hidden rounded-[var(--brand-radius)] bg-[var(--brand-primary)]'
                  key={image.imageUrl}
                >
                  <Image
                    alt={image.imageAlt}
                    className='object-cover'
                    fill
                    loading='lazy'
                    sizes='(max-width:1024px) 100vw, 50vw'
                    src={image.imageUrl}
                  />
                </div>
              ))}
            </Slider>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
