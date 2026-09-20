'use client';

import { AboutMissionCommitment } from '@/components/public/about/about-mission-commitment';
import { AboutStoryIntro } from '@/components/public/about/about-story-intro';
import { HomeDestinationsMap } from '@/components/public/home/home-destinations-map';
import { HomePartners } from '@/components/public/home/home-partners';
import { useSitePhoto } from '@/components/public/site-photos-provider';
import { ABOUT_VISION_MISSION } from '@/lib/public/about-content';

function SectionDivider() {
  return (
    <div aria-hidden className='brand-container'>
      <div className='h-px w-full bg-[var(--brand-line)]' />
    </div>
  );
}

export function WhoWeAreTab({ locale }: { locale: string }) {
  const visionImageUrl = useSitePhoto('about-vision');

  return (
    <div className='bg-white'>
      <AboutStoryIntro locale={locale} />

      <HomePartners />

      <section
        className='relative isolate bg-cover bg-center bg-fixed'
        style={{
          backgroundImage: `url('${visionImageUrl}')`
        }}
      >
        <div aria-hidden className='absolute inset-0 bg-black/65' />

        <div className='brand-container brand-section relative mx-auto max-w-4xl text-center'>
          <h2 className='font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-white'>
            Our Vision
          </h2>
          <span aria-hidden className='brand-gold-line mt-5' />
          <blockquote className='mt-8'>
            <p className='font-display text-[clamp(1.35rem,2.5vw,1.85rem)] italic leading-relaxed text-white/95'>
              &ldquo;{ABOUT_VISION_MISSION.vision.body}&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      <HomeDestinationsMap locale={locale} />

      <SectionDivider />

      <AboutMissionCommitment />
    </div>
  );
}
