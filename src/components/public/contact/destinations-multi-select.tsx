'use client';

import { SAFARI_DESTINATION_OPTIONS } from '@/features/contact/constants/safari-countries';
import { cn } from '@/lib/utils';

type DestinationsMultiSelectProps = {
  className?: string;
  onChange: (value: string) => void;
  value: string;
};

function normalizeDestination(value: string) {
  const selected = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (selected.includes('Kenya & Tanzania')) return 'Kenya & Tanzania';
  if (selected.includes('Kenya') && selected.includes('Tanzania')) return 'Kenya & Tanzania';
  if (selected.length === 1) return selected[0];
  return '';
}

export function DestinationsMultiSelect({
  className,
  onChange,
  value
}: DestinationsMultiSelectProps) {
  const selected = normalizeDestination(value);

  return (
    <div className={cn('mt-1.5', className)}>
      <div aria-label='Safari destinations' className='brand-destination-options' role='radiogroup'>
        {SAFARI_DESTINATION_OPTIONS.map(({ code, country }) => {
          const isSelected = selected === country;

          return (
            <label
              className={cn(
                'brand-destination-popover-item',
                isSelected && 'brand-destination-popover-item--selected'
              )}
              key={country}
            >
              <input
                checked={isSelected}
                className='brand-contact-radio-input'
                name='safari-destination'
                onChange={() => onChange(country)}
                type='radio'
                value={country}
              />
              <span className='brand-destination-popover-item-label'>{country}</span>
              <span className='brand-destination-popover-item-code'>{code}</span>
            </label>
          );
        })}
      </div>

      {!selected ? (
        <p className='mt-1.5 text-xs text-[var(--brand-muted)]'>Choose Kenya, Tanzania, or both.</p>
      ) : (
        <p className='mt-1.5 text-xs text-[var(--brand-muted)]'>
          We will tailor your itinerary to {selected}.
        </p>
      )}
    </div>
  );
}
