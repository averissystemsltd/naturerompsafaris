import { TourCard } from '@/components/public/cards/content-cards';
import { BrandButton } from '@/components/public/ui/brand-button';
import { localePath } from '@/lib/public/locale-path';
import type { PublicTour } from '@/lib/public/types';
import { cn } from '@/lib/utils';

type DestinationTripsSectionProps = {
  destinationName: string;
  description?: string;
  eyebrow?: string;
  id?: string;
  locale: string;
  title?: string;
  tours: PublicTour[];
  variant?: 'featured' | 'plain';
};

export function DestinationTripsSection({
  destinationName,
  description,
  eyebrow = 'Safari Tours',
  id = 'tours-safaris',
  locale,
  title,
  tours,
  variant = 'featured'
}: DestinationTripsSectionProps) {
  const heading = title ?? `Safaris to ${destinationName}`;
  const body =
    description ??
    `Hand-crafted itineraries that include ${destinationName}. Each one can be tailored to your dates, pace, and budget.`;

  return (
    <section
      className={cn(
        'scroll-mt-36',
        variant === 'plain'
          ? 'border-t border-[var(--brand-line)] bg-white'
          : 'brand-section bg-[var(--brand-ivory)]'
      )}
      id={id}
    >
      <div
        className={cn(variant === 'plain' ? 'brand-container py-10 md:py-12' : 'brand-container')}
      >
        <p className='brand-eyebrow'>{eyebrow}</p>
        <h2 className='brand-heading mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight'>
          {heading}
        </h2>
        <p className='brand-body mt-3 max-w-2xl text-base leading-8'>{body}</p>

        {tours.length ? (
          <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {tours.map((tour) => (
              <TourCard
                item={{
                  days: tour.days,
                  excerpt: tour.excerpt,
                  href: tour.href,
                  imageAlt: tour.imageAlt,
                  imageUrl: tour.imageUrl,
                  nights: tour.nights,
                  priceFrom: tour.priceFrom,
                  regionLabel: 'Safari',
                  title: tour.title
                }}
                key={tour.id}
              />
            ))}
          </div>
        ) : (
          <div className='mt-8 rounded-[var(--brand-radius)] border border-dashed border-[var(--brand-line)] bg-white px-8 py-14 text-center'>
            <h3 className='brand-heading font-display text-2xl'>
              Safaris to {destinationName} coming soon
            </h3>
            <p className='brand-body mx-auto mt-3 max-w-xl'>
              We are putting together itineraries that visit {destinationName}. In the meantime, our
              team can build a custom safari around this destination for you.
            </p>
            <div className='mt-6'>
              <BrandButton href={localePath(locale, '/contact')}>Plan a Custom Safari</BrandButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
