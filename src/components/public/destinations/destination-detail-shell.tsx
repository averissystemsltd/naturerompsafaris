import { Icons } from '@/components/icons';
import { AccommodationGallery } from '@/components/public/accommodations/accommodation-gallery';
import { DestinationInquiryPanel } from '@/components/public/destinations/destination-inquiry-panel';
import { FaqSection } from '@/components/public/faq-section';
import { TrustedChecklist } from '@/components/public/home/home-trusted-checklist';
import { localePath } from '@/lib/public/locale-path';
import type { PublicDestinationDetail } from '@/lib/public/types';

const SECTION_HEADING =
  'brand-heading font-display text-2xl leading-tight tracking-tight text-[var(--brand-heading)]';

type DestinationQuickFactsProps = {
  facts: Array<{ label: string; value: string | null }>;
};

function DestinationQuickFacts({ facts }: DestinationQuickFactsProps) {
  if (!facts.length) return null;

  return (
    <div className='brand-contact-advantages-block'>
      <h2 className='brand-contact-sidebar-heading brand-contact-sidebar-heading--sm'>
        Quick facts
      </h2>
      <div className='brand-contact-credentials-box'>
        <dl className='space-y-3'>
          {facts.map((fact) => (
            <div
              className='flex items-start justify-between gap-3 border-b border-[rgb(60_81_66/8%)] pb-3 last:border-b-0 last:pb-0'
              key={fact.label}
            >
              <dt className='text-sm text-[var(--brand-muted)]'>{fact.label}</dt>
              <dd className='text-right text-sm font-semibold text-[var(--brand-ink)]'>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

type DestinationDetailShellProps = {
  destination: PublicDestinationDetail;
  locale: string;
};

export function DestinationDetailShell({ destination, locale }: DestinationDetailShellProps) {
  const galleryImages = destination.gallery.length
    ? destination.gallery
    : destination.imageUrl
      ? [{ id: 'og', url: destination.imageUrl, alt: destination.imageAlt }]
      : [];

  const locationLabel = [destination.region, destination.country].filter(Boolean).join(', ');

  const facts = [
    { label: 'Country', value: destination.country },
    { label: 'Region / circuit', value: destination.region },
    { label: 'Best time to visit', value: destination.bestTime }
  ].filter((fact) => fact.value);
  return (
    <main className='bg-[var(--brand-ivory)]'>
      <section className='border-b border-[var(--brand-line)] bg-white'>
        <div className='brand-container py-6 md:py-8'>
          <nav
            aria-label='Breadcrumb'
            className='mb-6 flex flex-wrap gap-2 text-sm text-[var(--brand-muted)]'
          >
            <a className='hover:text-[var(--brand-primary)]' href={localePath(locale)}>
              Home
            </a>
            <span>/</span>
            <a
              className='hover:text-[var(--brand-primary)]'
              href={localePath(locale, '/destinations')}
            >
              Destinations
            </a>
            <span>/</span>
            <span className='text-[var(--brand-ink)]'>{destination.name}</span>
          </nav>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10'>
            <div className='min-w-0'>
              <AccommodationGallery images={galleryImages} title={destination.name} />

              <div className='mt-6 flex flex-wrap gap-2'>
                {destination.country ? (
                  <span className='rounded-[var(--brand-radius)] bg-[var(--brand-primary)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white'>
                    {destination.country}
                  </span>
                ) : null}
                {destination.region ? (
                  <span className='rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-ink)]'>
                    {destination.region}
                  </span>
                ) : null}
              </div>

              <p className='brand-eyebrow mt-5'>Destination Guide</p>
              <h1 className='brand-heading mt-2 font-display text-[clamp(2rem,4vw,3rem)] leading-tight'>
                {destination.name}
              </h1>
              {locationLabel ? (
                <p className='mt-2 flex items-center gap-2 text-base text-[var(--brand-muted)]'>
                  <Icons.mapPin className='size-4 shrink-0 text-[var(--brand-primary)]' />
                  {locationLabel}
                </p>
              ) : null}

              {destination.summary ? (
                <p className='mt-5 text-base leading-8 text-[var(--brand-muted)] sm:text-lg'>
                  {destination.summary}
                </p>
              ) : null}

              {destination.descriptionHtml ? (
                <section className='mt-10 scroll-mt-36' id='why-go'>
                  <h2 className={SECTION_HEADING}>About {destination.name}</h2>
                  <div
                    className='brand-legal-prose mt-4 max-w-full break-words [&_img]:max-w-full [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto'
                    dangerouslySetInnerHTML={{ __html: destination.descriptionHtml }}
                  />
                </section>
              ) : null}

              {destination.bestTime ? (
                <section className='mt-10 scroll-mt-36' id='when-to-go'>
                  <h2 className={SECTION_HEADING}>Best time to visit</h2>
                  <p className='brand-body mt-4 inline-flex items-center gap-2 text-[15px] leading-7'>
                    <Icons.calendar className='size-5 shrink-0 text-[var(--brand-primary)]' />
                    {destination.bestTime}
                  </p>
                </section>
              ) : null}

              {destination.wildlife.length ? (
                <section className='mt-10 scroll-mt-36' id='where-to-go'>
                  <h2 className={SECTION_HEADING}>Key {destination.name} Highlights</h2>
                  {/* Light whiteboard-style panel; highlights flow in two columns. */}
                  <div
                    className='brand-contact-credentials-box mt-4 !p-6 md:!p-8'
                    style={{
                      backgroundImage:
                        'radial-gradient(rgba(60,81,66,0.06) 1.5px, transparent 1.6px)',
                      backgroundSize: '24px 24px'
                    }}
                  >
                    <TrustedChecklist
                      items={destination.wildlife}
                      className='grid gap-x-10 gap-y-3.5 sm:grid-cols-2'
                    />
                  </div>
                </section>
              ) : null}

              {destination.faqs.length ? (
                <div
                  className='mt-10 border-t border-[var(--brand-line)] pt-10'
                  id='destination-faqs'
                >
                  <FaqSection
                    embedded
                    faqs={destination.faqs}
                    headingClassName={SECTION_HEADING}
                    headingId='destination-faq-heading'
                    title={`FAQs About ${destination.name}`}
                  />
                </div>
              ) : null}
            </div>

            <aside className='min-w-0'>
              <div className='space-y-8 lg:sticky lg:top-[calc(var(--brand-topbar-h)+var(--brand-header-h)+1rem)]'>
                <DestinationInquiryPanel
                  country={destination.country}
                  destinationName={destination.name}
                  destinationSlug={destination.slug}
                  locale={locale}
                />
                <DestinationQuickFacts facts={facts} />
              </div>
            </aside>
          </div>

          <div className='mt-10'>
            <a
              className='inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:text-[var(--brand-lime)]'
              href={localePath(locale, '/destinations')}
            >
              <Icons.chevronLeft className='size-4' />
              Back to all destinations
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
