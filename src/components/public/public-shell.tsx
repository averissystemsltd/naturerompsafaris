import { publicSiteFontClassName } from '@/components/themes/font.config';
import { CookieConsent } from '@/components/public/cookie-consent';
import { FloatingWhatsApp } from '@/components/public/floating-whatsapp';
import { cn } from '@/lib/utils';
import { SiteFooter } from '@/components/public/site-footer';
import { SiteHeader } from '@/components/public/site-header';
import { SitePhotosProvider } from '@/components/public/site-photos-provider';
import { listPublishedAccommodations } from '@/features/accommodations/public/service';
import { listExperienceMenuItems } from '@/features/experiences/public/service';
import { getAssignedSitePhotos } from '@/lib/public/list-site-photos';
import { buildFooterNavigation, buildPublicNavigation } from '@/lib/public/navigation';
import { getPublicDestinations, getPublicSiteSettings } from '@/lib/public/site-data';

type PublicShellProps = {
  children: React.ReactNode;
  locale: string;
};

export async function PublicShell({ children, locale }: PublicShellProps) {
  const photos = getAssignedSitePhotos();
  const [siteSettings, destinations, accommodations, experienceMenuItems] = await Promise.all([
    getPublicSiteSettings(),
    getPublicDestinations(locale),
    listPublishedAccommodations({ locale }),
    listExperienceMenuItems(locale)
  ]);

  const navItems = buildPublicNavigation(locale, destinations, accommodations, experienceMenuItems);
  const footerColumns = buildFooterNavigation(locale);

  return (
    <div className={cn('public-site min-h-screen', publicSiteFontClassName)}>
      <SitePhotosProvider photos={photos}>
        <SiteHeader locale={locale} navItems={navItems} siteSettings={siteSettings} />
        <main>{children}</main>
        <SiteFooter footerColumns={footerColumns} locale={locale} siteSettings={siteSettings} />
        <FloatingWhatsApp />
        <CookieConsent locale={locale} />
      </SitePhotosProvider>
    </div>
  );
}
