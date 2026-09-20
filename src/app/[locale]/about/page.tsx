import type { Metadata } from 'next';

import { AboutPageContent } from '@/components/public/about/about-page-content';
import { ABOUT_HERO_DEFAULTS } from '@/lib/public/about-content';
import { getHomeReviews, getPageHero } from '@/lib/public/site-data';
import { buildListingPageMetadata } from '@/lib/seo/listing-metadata';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageHero = await getPageHero('about');
  const ogImage = pageHero?.slides[0]?.mediaUrl ?? null;

  return buildListingPageMetadata({
    canonicalPath: `/${locale}/about`,
    defaultDescription: ABOUT_HERO_DEFAULTS.description,
    defaultTitle: ABOUT_HERO_DEFAULTS.title,
    imageUrl: ogImage,
    locale
  });
}

export const revalidate = 300;

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const [pageHero, reviews] = await Promise.all([getPageHero('about'), getHomeReviews(12)]);

  return <AboutPageContent hero={pageHero} locale={locale} reviews={reviews} />;
}
