'use client';

import Image from 'next/image';

import { Icons } from '@/components/icons';
import { BrandButton } from '@/components/public/ui/brand-button';
import { ScrollReveal } from '@/components/public/ui/scroll-reveal';
import { useSitePhoto } from '@/components/public/site-photos-provider';
import { localePath } from '@/lib/public/locale-path';

const FIELD_IMAGE_ALT = 'Wildlife and open plains on a Nature Romp safari';
const TEAM_IMAGE_ALT = 'Nature Romp Safaris team with a branded safari vehicle';

export function HomeWhyChooseUs({ locale }: { locale: string }) {
  const fieldImageUrl = useSitePhoto('home-who-field');
  const teamImageUrl = useSitePhoto('home-who-inset');
  return (
    <section
      className='border-b border-[var(--brand-line)] bg-[var(--brand-warm-gray)]'
      id='who-we-are'
    >
      <div className='brand-container brand-section'>
        <div className='grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-16 lg:gap-y-0'>
          <ScrollReveal className='lg:pt-2' from='left'>
            <h2 className='brand-heading font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08]'>
              Who We Are
            </h2>
            <span className='brand-gold-line brand-gold-line--left' />
            <div className='mt-7 max-w-xl space-y-5'>
              <p className='brand-body text-base leading-8 md:text-[1.05rem]'>
                Nature Romp Safaris is a trusted East African travel company crafting personalized
                Kenya Tanzania safari adventures, wildlife holidays, beach extensions, mountain
                climbing trips and private safari itineraries.
              </p>
              <p className='brand-body text-base leading-8 md:text-[1.05rem]'>
                Our team focuses on clear communication, reliable transport, local expertise and
                smooth travel planning from Nairobi to the region&apos;s most iconic parks.
              </p>
            </div>
            <div className='mt-8'>
              <BrandButton href={`${localePath(locale, '/about')}#who-we-are`} variant='primary'>
                Learn more
                <Icons.arrowRight className='h-4 w-4' />
              </BrandButton>
            </div>
          </ScrollReveal>

          <ScrollReveal className='relative' from='right'>
            <div className='relative'>
              <div className='relative aspect-[5/4] overflow-hidden bg-[var(--brand-primary)] sm:aspect-[4/3] lg:aspect-[5/4]'>
                <Image
                  alt={FIELD_IMAGE_ALT}
                  className='object-cover object-[center_35%]'
                  fill
                  loading='lazy'
                  sizes='(max-width:1024px) 100vw, 55vw'
                  src={fieldImageUrl}
                />
              </div>
              <div className='absolute -bottom-5 right-4 w-[58%] overflow-hidden border-[6px] border-white bg-white shadow-[0_20px_44px_rgba(16,22,16,0.18)] sm:right-6 sm:w-[48%] lg:-bottom-8 lg:-left-10 lg:right-auto lg:w-[46%]'>
                <div className='relative aspect-[16/11]'>
                  <Image
                    alt={TEAM_IMAGE_ALT}
                    className='object-cover object-center'
                    fill
                    loading='lazy'
                    sizes='(max-width:1024px) 55vw, 28vw'
                    src={teamImageUrl}
                  />
                </div>
              </div>
            </div>
            <div className='h-5 lg:h-8' />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
