import Image from 'next/image';
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { FooterNewsletter } from '@/components/public/footer-newsletter';
import { PublicSocialLinks } from '@/components/public/public-social-links';
import {
  BRAND_FOOTER_DESCRIPTION,
  BRAND_LOGO_PATH,
  BRAND_PHONE,
  BRAND_WHATSAPP
} from '@/config/brand';
import { localePath } from '@/lib/public/locale-path';
import type { PublicFooterColumn, PublicSiteSettings } from '@/lib/public/types';
import { whatsAppHref } from '@/lib/public/whatsapp';

type SiteFooterProps = {
  footerColumns: PublicFooterColumn[];
  locale: string;
  siteSettings: PublicSiteSettings;
};

function FooterLinkColumn({ column }: { column: PublicFooterColumn }) {
  return (
    <nav aria-label={column.title}>
      <h3>{column.title}</h3>
      {column.links.map((link) => (
        <Link href={link.href} key={`${column.title}-${link.href}`}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

function phoneHref(phone: string) {
  return phone.replace(/[^\d+]/g, '');
}

export function SiteFooter({ footerColumns, locale, siteSettings }: SiteFooterProps) {
  const homeHref = localePath(locale);
  const logoSrc = siteSettings.logoUrl || BRAND_LOGO_PATH;
  const quickLinks = footerColumns.find((column) => column.title === 'Quick Links');
  const safariLinks = footerColumns.find((column) => column.title === 'Our Safaris');
  const policyColumn = footerColumns.find((column) => column.title === 'Help & Policies');
  const phone = siteSettings.phonePrimary || BRAND_PHONE;
  const whatsappLink = whatsAppHref(
    BRAND_WHATSAPP.phone || phone,
    siteSettings.whatsappMessage || BRAND_WHATSAPP.message
  );
  const description = siteSettings.description || BRAND_FOOTER_DESCRIPTION;

  return (
    <footer className='nr-footer'>
      <div className='nr-footer__grid'>
        <div className='nr-footer__brand'>
          <Link className='nr-footer__logo' href={homeHref}>
            <Image
              alt={siteSettings.companyName}
              height={45}
              src={logoSrc}
              style={{ height: 45, width: 'auto' }}
              width={132}
            />
          </Link>
          <p className='nr-footer__about'>{description}</p>
          <Link className='nr-footer__quote' href={localePath(locale, '/contact')}>
            Request a custom quote
            <Icons.arrowRight />
          </Link>
          <PublicSocialLinks className='nr-footer__social' socialLinks={siteSettings.socialLinks} />
        </div>
        {quickLinks ? <FooterLinkColumn column={quickLinks} /> : null}
        {safariLinks ? <FooterLinkColumn column={safariLinks} /> : null}
        <div className='nr-footer__contact-col'>
          <h3>Contact Us</h3>
          <dl className='nr-footer__details'>
            <div className='nr-footer__detail'>
              <dt>Mobile &amp; Whatsapp:</dt>
              <dd>
                <div className='nr-footer__actions'>
                  <a
                    className='nr-footer__action nr-footer__action--call'
                    href={`tel:${phoneHref(phone)}`}
                  >
                    <Icons.phone aria-hidden />
                    Call {phone}
                  </a>
                  <span aria-hidden className='nr-footer__action-sep' />
                  <a
                    className='nr-footer__action nr-footer__action--whatsapp'
                    href={whatsappLink}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <Icons.whatsapp aria-hidden />
                    WhatsApp chat
                  </a>
                </div>
              </dd>
            </div>
            <div className='nr-footer__detail'>
              <dt>Email:</dt>
              <dd>
                <a
                  className='nr-footer__action nr-footer__action--email'
                  href={`mailto:${siteSettings.email}`}
                >
                  {siteSettings.email}
                </a>
              </dd>
            </div>
          </dl>
          <FooterNewsletter compact locale={locale} />
        </div>
      </div>
      <div className='nr-footer__bottom'>
        <div className='nr-footer__bottom-inner'>
          <div className='nr-footer__copyright'>
            Copyright &copy; {new Date().getFullYear()} {siteSettings.companyName}.{' '}
            {siteSettings.siteName}.
          </div>
          {policyColumn ? (
            <nav aria-label='Legal policies' className='nr-footer__legal'>
              {policyColumn.links.map((link) => (
                <Link href={link.href} key={link.href} prefetch>
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
