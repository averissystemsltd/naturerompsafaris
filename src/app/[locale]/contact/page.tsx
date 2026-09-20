import type { Metadata } from 'next';

import { ContactFormSection } from '@/components/public/contact/contact-form-section';
import { ContactHero } from '@/components/public/contact/contact-hero';
import { ContactTrustStrip } from '@/components/public/contact/contact-trust-strip';
import { BRAND_CONTACT_HERO, CONTACT_PAGE_COPY } from '@/config/brand';
import { localePath } from '@/lib/public/locale-path';
import { getPageHero, getPublicSiteSettings } from '@/lib/public/site-data';
import { buildListingPageMetadata } from '@/lib/seo/listing-metadata';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildListingPageMetadata({
    canonicalPath: `/${locale}/contact`,
    defaultDescription: CONTACT_PAGE_COPY.description,
    defaultTitle: CONTACT_PAGE_COPY.title,
    heroKey: 'contact',
    imageAlt: BRAND_CONTACT_HERO.imageAlt,
    imageUrl: BRAND_CONTACT_HERO.imageUrl,
    locale
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const [siteSettings, pageHero] = await Promise.all([
    getPublicSiteSettings(),
    getPageHero('contact')
  ]);

  return (
    <>
      <ContactHero
        breadcrumbs={[{ href: localePath(locale), label: 'Home' }, { label: 'Contact' }]}
        description={CONTACT_PAGE_COPY.description}
        hero={pageHero}
        title={CONTACT_PAGE_COPY.title}
      />

      <section className='bg-[var(--brand-contact-body-bg)]'>
        <div className='brand-container brand-section'>
          <ContactFormSection locale={locale} siteSettings={siteSettings} />
        </div>
      </section>

      <ContactTrustStrip />
    </>
  );
}
