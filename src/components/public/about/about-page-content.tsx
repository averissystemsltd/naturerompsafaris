import { AboutGallery } from '@/components/public/about/about-gallery';
import { AboutHero } from '@/components/public/about/about-hero';
import { AboutStoryIntro } from '@/components/public/about/about-story-intro';
import { BookingAdvantagesCta } from '@/components/public/booking-advantages-cta';
import { HomeDestinationsMap } from '@/components/public/home/home-destinations-map';
import { HomeGoogleReviews } from '@/components/public/home/home-google-reviews';
import { ABOUT_HERO_DEFAULTS, ABOUT_OPERATIONS } from '@/lib/public/about-content';
import type { HomeReviewItem } from '@/lib/public/home-reviews';
import { localePath } from '@/lib/public/locale-path';
import type { PageHero } from '@/lib/public/types';

type AboutPageContentProps = {
  hero: PageHero | null;
  locale: string;
  reviews: HomeReviewItem[];
};

export function AboutPageContent({ hero, locale, reviews }: AboutPageContentProps) {
  return (
    <>
      <AboutHero
        breadcrumbs={[{ href: localePath(locale), label: 'Home' }, { label: 'About Us' }]}
        description={ABOUT_HERO_DEFAULTS.description}
        eyebrow=''
        hero={hero}
        title={ABOUT_HERO_DEFAULTS.title}
      />
      <AboutStoryIntro locale={locale} />
      <HomeDestinationsMap
        description={ABOUT_OPERATIONS.description}
        eyebrow=''
        kenyaCopy={ABOUT_OPERATIONS.kenyaCopy}
        locale={locale}
        showEastAfricaMap
        tanzaniaCopy={ABOUT_OPERATIONS.tanzaniaCopy}
        title={ABOUT_OPERATIONS.title}
      />
      <AboutGallery />
      <HomeGoogleReviews reviews={reviews} />
      <BookingAdvantagesCta locale={locale} />
    </>
  );
}
