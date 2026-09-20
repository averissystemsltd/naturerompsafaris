import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { HomeHero } from '@/components/public/home/home-hero';
import { FaqSection } from '@/components/public/faq-section';
import { listPublishedExperiences } from '@/features/experiences/public/service';
import { HOME_FAQS } from '@/lib/public/home-content';
import {
  getHeroSlides,
  getHomeReviews,
  getPageHero,
  getPublicBlogPosts,
  getPublicTours
} from '@/lib/public/site-data';
import { BRAND_SITE_NAME, HOME_PAGE_COPY } from '@/config/brand';
import { buildListingPageMetadata } from '@/lib/seo/listing-metadata';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildListingPageMetadata({
    canonicalPath: `/${locale}`,
    defaultDescription: HOME_PAGE_COPY.description,
    defaultTitle: BRAND_SITE_NAME,
    heroKey: 'home',
    locale
  });
}

const HomeWhyChooseUs = dynamic(
  () =>
    import('@/components/public/home/home-why-choose-us').then((module) => ({
      default: module.HomeWhyChooseUs
    })),
  { loading: () => null }
);

const HomeDestinationsMap = dynamic(
  () =>
    import('@/components/public/home/home-destinations-map').then((module) => ({
      default: module.HomeDestinationsMap
    })),
  { loading: () => null }
);

const HomeFeaturedTours = dynamic(
  () =>
    import('@/components/public/home/home-featured-tours').then((module) => ({
      default: module.HomeFeaturedTours
    })),
  { loading: () => null }
);

const HomeExperiencesGrid = dynamic(
  () =>
    import('@/components/public/home/home-experiences-grid').then((module) => ({
      default: module.HomeExperiencesGrid
    })),
  { loading: () => null }
);

const HomeGoogleReviews = dynamic(
  () =>
    import('@/components/public/home/home-google-reviews').then((module) => ({
      default: module.HomeGoogleReviews
    })),
  { loading: () => null }
);

const HomeArticles = dynamic(
  () =>
    import('@/components/public/home/home-articles').then((module) => ({
      default: module.HomeArticles
    })),
  { loading: () => null }
);

const BookingAdvantagesCta = dynamic(
  () =>
    import('@/components/public/booking-advantages-cta').then((module) => ({
      default: module.BookingAdvantagesCta
    })),
  { loading: () => null }
);

export const revalidate = 300;

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const [blogPosts, heroSlides, homeHero, reviews, experiences, tours] = await Promise.all([
    getPublicBlogPosts(locale, 3),
    getHeroSlides(),
    getPageHero('home'),
    getHomeReviews(12),
    listPublishedExperiences({ locale }),
    getPublicTours(locale, 6)
  ]);

  return (
    <>
      <HomeHero hero={homeHero} locale={locale} slides={heroSlides} />
      <Suspense fallback={null}>
        <HomeWhyChooseUs locale={locale} />
        <HomeDestinationsMap locale={locale} showCountryTiles />
        <HomeExperiencesGrid experiences={experiences} locale={locale} />
        <HomeFeaturedTours locale={locale} tours={tours} />
        <HomeGoogleReviews reviews={reviews} />
        <HomeArticles locale={locale} posts={blogPosts} />
      </Suspense>
      <FaqSection
        description='Straight answers from Nature Romp Safaris before you send dates or pay a deposit. If something is missing, write to us and we reply.'
        eyebrow='Before you book'
        faqs={HOME_FAQS}
        headingId='home-faq-heading'
        title='Safari questions, answered'
      />
      <Suspense fallback={null}>
        <BookingAdvantagesCta locale={locale} />
      </Suspense>
    </>
  );
}
