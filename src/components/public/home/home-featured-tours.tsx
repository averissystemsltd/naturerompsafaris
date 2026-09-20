import { TourCard } from '@/components/public/cards/content-cards';
import { EmptyState } from '@/components/public/page-shell';
import { SectionHeader } from '@/components/public/ui/section-header';
import { localePath } from '@/lib/public/locale-path';
import type { PublicTour } from '@/lib/public/types';

export function HomeFeaturedTours({ locale, tours }: { locale: string; tours: PublicTour[] }) {
  return (
    <section className='brand-section bg-[var(--brand-warm-gray)]'>
      <div className='brand-container'>
        <SectionHeader title='Highlighted safari trips' />
        {tours.length ? (
          <div className='mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
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
                  title: tour.title
                }}
                key={tour.id}
              />
            ))}
          </div>
        ) : (
          <div className='mt-12'>
            <EmptyState
              actionHref={localePath(locale, '/contact')}
              actionLabel='Plan a Custom Safari'
              message='Published tours will appear here once they are added through the Nature Romp CMS.'
              title='No tours published yet'
            />
          </div>
        )}
      </div>
    </section>
  );
}
