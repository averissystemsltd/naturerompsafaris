import { Icons } from '@/components/icons';
import {
  AccommodationBackLink,
  AccommodationCard
} from '@/components/public/accommodations/accommodation-card';
import { AccommodationGallery } from '@/components/public/accommodations/accommodation-gallery';
import { AccommodationInquiryPanel } from '@/components/public/accommodations/accommodation-inquiry-panel';
import {
  buildMapQuery,
  formatAvailabilityLabel,
  formatComfortLevelLabel
} from '@/features/accommodations/public/constants';
import type {
  PublicAccommodation,
  PublicAccommodationDetail
} from '@/features/accommodations/public/types';
import { localePath } from '@/lib/public/locale-path';
import { cn } from '@/lib/utils';

type AccommodationDetailShellProps = {
  accommodation: PublicAccommodationDetail;
  locale: string;
  relatedAccommodations?: PublicAccommodation[];
};

function formatNightPrice(price?: number | null) {
  if (!price) return null;
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency'
  }).format(price);
}

function availabilityBadgeClass(availability: PublicAccommodationDetail['availability']) {
  if (availability === 'available') return 'bg-[var(--brand-primary)] text-white';
  if (availability === 'limited') return 'bg-[var(--brand-gold)] text-[var(--brand-primary-dark)]';
  return 'border border-[var(--brand-line)] bg-white text-[var(--brand-ink)]';
}

export function AccommodationDetailShell({
  accommodation,
  locale,
  relatedAccommodations = []
}: AccommodationDetailShellProps) {
  const price = formatNightPrice(accommodation.pricePerNight);
  const availabilityLabel = formatAvailabilityLabel(accommodation.availability);
  const comfortLabel = formatComfortLevelLabel(accommodation.comfortLevel);
  const mapQuery = buildMapQuery(
    accommodation.region,
    accommodation.country,
    accommodation.mapQuery
  );
  const relatedAreaLabel =
    accommodation.region || accommodation.country || accommodation.locationLabel;

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
              href={localePath(locale, '/accommodations')}
            >
              Accommodations
            </a>
            <span>/</span>
            <span className='text-[var(--brand-ink)]'>{accommodation.name}</span>
          </nav>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10'>
            <div className='min-w-0'>
              <AccommodationGallery images={accommodation.gallery} title={accommodation.name} />

              <div className='mt-6 flex flex-wrap gap-2'>
                {accommodation.propertyType ? (
                  <span className='rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-ink)]'>
                    {accommodation.propertyType}
                  </span>
                ) : null}
                <span
                  className={cn(
                    'rounded-[var(--brand-radius)] px-3 py-1 text-xs font-bold uppercase tracking-wide',
                    availabilityBadgeClass(accommodation.availability)
                  )}
                >
                  {availabilityLabel}
                </span>
                {comfortLabel ? (
                  <span className='rounded-[var(--brand-radius)] border border-[var(--brand-line)] bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-ink)]'>
                    {comfortLabel}
                  </span>
                ) : null}
              </div>

              <h1 className='brand-heading mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-tight'>
                {accommodation.name}
              </h1>
              <p className='mt-2 flex items-center gap-2 text-base text-[var(--brand-muted)]'>
                <Icons.mapPin className='size-4 shrink-0 text-[var(--brand-primary)]' />
                {accommodation.locationLabel}
              </p>

              <div className='mt-10 lg:hidden'>
                <AccommodationInquiryPanel
                  accommodationName={accommodation.name}
                  accommodationSlug={accommodation.slug}
                  availabilityLabel={availabilityLabel}
                  locale={locale}
                  price={price}
                />
              </div>

              <section className='mt-10'>
                <h2 className='brand-heading font-display text-2xl'>About this property</h2>
                {accommodation.descriptionHtml ? (
                  <div
                    className='brand-legal-prose mt-4'
                    dangerouslySetInnerHTML={{ __html: accommodation.descriptionHtml }}
                  />
                ) : accommodation.excerpt ? (
                  <p className='brand-body mt-4 text-[15px] leading-7'>{accommodation.excerpt}</p>
                ) : null}
              </section>

              {accommodation.amenities.length ? (
                <section className='mt-10'>
                  <h2 className='brand-heading font-display text-2xl'>Amenities</h2>
                  <ul className='mt-4 grid gap-3 sm:grid-cols-2'>
                    {accommodation.amenities.map((amenity) => (
                      <li
                        className='flex items-start gap-2 text-[15px] leading-7 text-[var(--brand-ink)]'
                        key={amenity}
                      >
                        <Icons.check className='mt-1 size-4 shrink-0 text-[var(--brand-primary)]' />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <div className='mt-10'>
                <AccommodationBackLink href={localePath(locale, '/accommodations')} />
              </div>
            </div>

            <aside className='hidden lg:block'>
              <div className='sticky top-[calc(var(--brand-topbar-h)+var(--brand-header-h)+1rem)] space-y-4'>
                <AccommodationInquiryPanel
                  accommodationName={accommodation.name}
                  accommodationSlug={accommodation.slug}
                  availabilityLabel={availabilityLabel}
                  locale={locale}
                  price={price}
                />
                {mapQuery ? <LocationMapPanel mapQuery={mapQuery} /> : null}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {relatedAccommodations.length ? (
        <section className='border-t border-[var(--brand-line)]'>
          <div className='brand-container py-10 md:py-12'>
            <p className='brand-eyebrow'>More Places To Stay</p>
            <h2 className='brand-heading mt-3 font-display text-[clamp(1.75rem,3.5vw,2.25rem)] leading-tight'>
              More accommodations in {relatedAreaLabel}
            </h2>
            <p className='brand-body mt-3 max-w-2xl text-base leading-7'>
              Other lodges and camps in the same area, so you can compare comfort, location, and
              availability before you enquire.
            </p>
            <div className='mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
              {relatedAccommodations.map((item) => (
                <AccommodationCard item={item} key={item.id} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

export { AccommodationCard };

function LocationMapPanel({ mapQuery }: { mapQuery: string }) {
  const encodedQuery = encodeURIComponent(mapQuery);
  const mapSrc = `https://maps.google.com/maps?q=${encodedQuery}&output=embed`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  return (
    <div className='brand-contact-advantages-block'>
      <h2 className='brand-contact-sidebar-heading brand-contact-sidebar-heading--sm'>Location</h2>
      <div className='brand-contact-credentials-box overflow-hidden !p-0'>
        <div className='border-b border-[rgb(60_81_66/8%)] px-4 py-3'>
          <p className='text-sm text-[var(--brand-muted)]'>{mapQuery}</p>
        </div>
        <iframe
          allowFullScreen
          className='h-44 w-full border-0'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          sandbox='allow-scripts allow-same-origin allow-popups'
          src={mapSrc}
          title='Property location map'
        />
        <div className='border-t border-[rgb(60_81_66/8%)] px-4 py-3'>
          <a
            className='inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-primary)] hover:underline'
            href={mapsUrl}
            rel='noopener noreferrer'
            target='_blank'
          >
            Open in Google Maps
            <Icons.externalLink className='size-3.5' />
          </a>
        </div>
      </div>
    </div>
  );
}
