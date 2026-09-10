'use client';

import { ContactAdvantagesList } from '@/components/public/contact/contact-advantages-list';
import { ContactScrollReveal } from '@/components/public/contact/contact-scroll-reveal';
import { ContactSidebarMap } from '@/components/public/contact/contact-sidebar-map';
import { Icons } from '@/components/icons';
import { BRAND_CONTACT_DEFAULTS, BRAND_WHATSAPP } from '@/config/brand';
import type { PublicSiteSettings } from '@/lib/public/types';
import { whatsAppHref } from '@/lib/public/whatsapp';

type ContactDetailsProps = {
  siteSettings: PublicSiteSettings;
};

export function ContactDetails({ siteSettings }: ContactDetailsProps) {
  const whatsappLink = whatsAppHref(
    BRAND_WHATSAPP.phone,
    siteSettings.whatsappMessage || BRAND_WHATSAPP.message
  );

  const phonePrimaryHref = `tel:${siteSettings.phonePrimary.replace(/[^\d+]/g, '')}`;
  const phoneSecondaryHref = `tel:${siteSettings.phoneSecondary.replace(/[^\d+]/g, '')}`;

  return (
    <aside className='brand-contact-sidebar-inner space-y-8'>
      <ContactScrollReveal>
        <div className='brand-contact-details-block'>
          <h2 className='brand-contact-sidebar-heading'>Contact Details</h2>

          <div className='brand-contact-credentials-box'>
            <dl className='brand-contact-sidebar-list'>
              <div className='brand-contact-sidebar-row'>
                <dt className='brand-contact-sidebar-label'>Mobile &amp; Whatsapp:</dt>
                <dd className='brand-contact-sidebar-value'>
                  <span className='brand-contact-sidebar-phones'>
                    <a className='brand-contact-sidebar-link' href={phonePrimaryHref}>
                      {siteSettings.phonePrimary}
                    </a>
                    <span aria-hidden className='brand-contact-sidebar-separator'>
                      |
                    </span>
                    <a className='brand-contact-sidebar-link' href={phoneSecondaryHref}>
                      {siteSettings.phoneSecondary}
                    </a>
                  </span>
                  <a
                    className='brand-contact-sidebar-link brand-contact-sidebar-link--whatsapp'
                    href={whatsappLink}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    WhatsApp chat
                    <Icons.externalLink aria-hidden />
                  </a>
                </dd>
              </div>

              <div className='brand-contact-sidebar-row'>
                <dt className='brand-contact-sidebar-label'>Email:</dt>
                <dd className='brand-contact-sidebar-value'>
                  <a
                    className='brand-contact-sidebar-link brand-contact-sidebar-link--email'
                    href={`mailto:${siteSettings.email}`}
                  >
                    {siteSettings.email}
                  </a>
                </dd>
              </div>

              <div className='brand-contact-sidebar-row'>
                <dt className='brand-contact-sidebar-label'>Address:</dt>
                <dd className='brand-contact-sidebar-value brand-contact-sidebar-address'>
                  <p>{siteSettings.addressShort}</p>
                  <p>{siteSettings.postalAddress || BRAND_CONTACT_DEFAULTS.postalAddress}</p>
                </dd>
              </div>
            </dl>
          </div>

          <ContactSidebarMap />
        </div>
      </ContactScrollReveal>

      <ContactScrollReveal>
        <div className='brand-contact-advantages-block'>
          <h3 className='brand-contact-sidebar-heading brand-contact-sidebar-heading--sm'>
            Advantages of Booking with Nature Romp Safaris
          </h3>
          <div className='brand-contact-credentials-box'>
            <ContactAdvantagesList />
          </div>
        </div>
      </ContactScrollReveal>
    </aside>
  );
}
