import { BRAND_MAP_QUERY } from '@/config/brand';

type ContactMapSectionProps = {
  mapQuery?: string;
};

export function ContactMapSection({ mapQuery = BRAND_MAP_QUERY }: ContactMapSectionProps) {
  const encodedQuery = encodeURIComponent(mapQuery);
  const mapSrc = `https://maps.google.com/maps?q=${encodedQuery}&output=embed`;

  return (
    <section className='border-t border-[var(--brand-line)] bg-white'>
      <div className='brand-container py-10 md:py-12'>
        <div className='overflow-hidden rounded-[var(--brand-radius)] border border-[var(--brand-line)]'>
          <iframe
            allowFullScreen
            className='aspect-[16/9] w-full border-0'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            sandbox='allow-scripts allow-same-origin allow-popups'
            src={mapSrc}
            title='Nature Romp Safaris office location map'
          />
        </div>
      </div>
    </section>
  );
}
