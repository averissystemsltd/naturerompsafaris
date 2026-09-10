'use client';

import * as React from 'react';

import { TravelDateCalendar } from '@/components/ui/travel-date-calendar';
import { Icons } from '@/components/icons';
import {
  addDays,
  getDateContextLabel,
  parseIsoDate,
  startOfDay,
  toIsoDate
} from '@/lib/travel-date-utils';
import { cn } from '@/lib/utils';

/** Date cards visible in one slider page */
const CAROUSEL_PAGE_SIZE = 7;
/** Total days reachable via slider before calendar takes over */
const MAX_SLIDER_DAYS = 14;

type TravelDatePickerVariant = 'default' | 'compact';

type TravelDateCarouselProps = {
  label: string;
  maxDate?: Date;
  minDate: Date;
  onChange: (isoDate: string) => void;
  value: string;
  variant?: TravelDatePickerVariant;
};

function isBeforeMin(date: Date, minDate: Date) {
  return startOfDay(date).getTime() < startOfDay(minDate).getTime();
}

function isAfterMax(date: Date, maxDate?: Date) {
  if (!maxDate) return false;
  return startOfDay(date).getTime() > startOfDay(maxDate).getTime();
}

export function TravelDateCarousel({
  label,
  maxDate,
  minDate,
  onChange,
  value,
  variant = 'default'
}: TravelDateCarouselProps) {
  const isCompact = variant === 'compact';
  const [showCalendar, setShowCalendar] = React.useState(isCompact);
  const [windowStart, setWindowStart] = React.useState(0);

  const selectedDate = value ? parseIsoDate(value) : undefined;
  const maxWindowStart = Math.max(0, MAX_SLIDER_DAYS - CAROUSEL_PAGE_SIZE);
  const atSliderEnd = windowStart >= maxWindowStart;

  React.useEffect(() => {
    if (!value || showCalendar) return;

    const selected = parseIsoDate(value);
    const diffDays = Math.round(
      (startOfDay(selected).getTime() - startOfDay(minDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays >= MAX_SLIDER_DAYS) {
      setShowCalendar(true);
      return;
    }

    setWindowStart((current) => {
      if (diffDays < current || diffDays >= current + CAROUSEL_PAGE_SIZE) {
        return Math.max(0, Math.min(maxWindowStart, diffDays - 2));
      }
      return current;
    });
  }, [maxWindowStart, minDate, showCalendar, value]);

  const dates = React.useMemo(
    () =>
      Array.from({ length: CAROUSEL_PAGE_SIZE }, (_, index) =>
        addDays(minDate, windowStart + index)
      ),
    [minDate, windowStart]
  );

  const visibleDates = dates.filter(
    (date) => !isBeforeMin(date, minDate) && !isAfterMax(date, maxDate)
  );

  const canGoPrev = windowStart > 0 && !showCalendar;

  function openCalendar() {
    setShowCalendar(true);
  }

  function closeCalendar() {
    setShowCalendar(false);
  }

  function selectDate(date: Date) {
    onChange(toIsoDate(date));
    if (!isCompact) {
      closeCalendar();
    }
  }

  function handlePrevious() {
    setWindowStart((start) => Math.max(0, start - CAROUSEL_PAGE_SIZE));
  }

  function handleNext() {
    if (atSliderEnd) {
      openCalendar();
      return;
    }

    setWindowStart((start) => Math.min(maxWindowStart, start + CAROUSEL_PAGE_SIZE));
  }

  return (
    <div className={cn('brand-travel-date-field', isCompact && 'brand-travel-date-field--compact')}>
      <div className='brand-travel-date-field-header'>
        <p className='brand-travel-date-label'>{label}</p>
        {!isCompact ? (
          <button
            className='brand-travel-date-show-more'
            onClick={() => (showCalendar ? closeCalendar() : openCalendar())}
            type='button'
          >
            {showCalendar ? 'Hide calendar' : 'Show more dates'}
          </button>
        ) : null}
      </div>

      {!isCompact && !showCalendar ? (
        <div className='brand-travel-date-carousel-wrap'>
          <button
            aria-label='Show earlier dates'
            className='brand-travel-date-nav'
            disabled={!canGoPrev}
            onClick={handlePrevious}
            type='button'
          >
            <Icons.chevronLeft className='h-4 w-4' />
          </button>

          <div className='brand-travel-date-carousel'>
            {visibleDates.map((date) => {
              const iso = toIsoDate(date);
              const isSelected = value === iso;
              const contextLabel = getDateContextLabel(date);

              return (
                <button
                  className={cn(
                    'brand-travel-date-card',
                    isSelected && 'brand-travel-date-card--selected'
                  )}
                  key={iso}
                  onClick={() => selectDate(date)}
                  type='button'
                >
                  <span className='brand-travel-date-card-weekday'>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className='brand-travel-date-card-day'>{date.getDate()}</span>
                  <span className='brand-travel-date-card-month'>
                    {date.toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  {contextLabel ? (
                    <span className='brand-travel-date-card-badge'>{contextLabel}</span>
                  ) : null}
                </button>
              );
            })}

            <button
              className='brand-travel-date-card brand-travel-date-card--more'
              onClick={openCalendar}
              type='button'
            >
              <Icons.calendar className='brand-travel-date-card-more-icon' />
              <span>Show more dates</span>
            </button>
          </div>

          <button
            aria-label={atSliderEnd ? 'Open calendar for more dates' : 'Show later dates'}
            className={cn(
              'brand-travel-date-nav',
              atSliderEnd && 'brand-travel-date-nav--calendar'
            )}
            onClick={handleNext}
            type='button'
          >
            <Icons.chevronRight className='h-4 w-4' />
          </button>
        </div>
      ) : null}

      {showCalendar ? (
        <div className='brand-travel-date-calendar'>
          <TravelDateCalendar
            defaultMonth={selectedDate ?? minDate}
            maxDate={maxDate}
            minDate={minDate}
            onSelect={selectDate}
            selected={selectedDate}
          />
        </div>
      ) : null}
    </div>
  );
}

export type TravelDatePickerProps = {
  className?: string;
  endDate: string;
  endLabel?: string;
  onEndDateChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  startDate: string;
  startLabel?: string;
  variant?: TravelDatePickerVariant;
};

export function TravelDatePicker({
  className,
  endDate,
  endLabel = 'End of the journey:',
  onEndDateChange,
  onStartDateChange,
  startDate,
  startLabel = 'Start of the journey:',
  variant = 'default'
}: TravelDatePickerProps) {
  const earliestDate = React.useMemo(() => addDays(startOfDay(new Date()), 1), []);
  const latestDate = React.useMemo(() => addDays(startOfDay(new Date()), 730), []);
  const endMinDate = startDate ? parseIsoDate(startDate) : earliestDate;

  React.useEffect(() => {
    if (startDate && endDate && endDate < startDate) {
      onEndDateChange('');
    }
  }, [startDate, endDate, onEndDateChange]);

  const isCompact = variant === 'compact';

  return (
    <div
      className={cn(
        'brand-travel-date-picker',
        isCompact && 'brand-travel-date-picker--compact',
        className
      )}
    >
      <TravelDateCarousel
        label={startLabel}
        maxDate={latestDate}
        minDate={earliestDate}
        onChange={onStartDateChange}
        value={startDate}
        variant={variant}
      />

      {startDate ? (
        <TravelDateCarousel
          label={endLabel}
          maxDate={latestDate}
          minDate={endMinDate}
          onChange={onEndDateChange}
          value={endDate}
          variant={variant}
        />
      ) : (
        <p className='brand-travel-date-helper'>
          Select a start date to choose when your journey ends.
        </p>
      )}

      <p className='brand-travel-date-flex-note'>+/- 3 days flexibility is okay.</p>
    </div>
  );
}
