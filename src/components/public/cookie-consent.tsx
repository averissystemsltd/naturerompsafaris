'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { BRAND_FAVICON_PATH } from '@/config/brand';

const CONSENT_KEY = 'nature-romp-cookie-consent';

type CookieConsentProps = {
  locale: string;
};

/**
 * Cookie consent banner pinned to the bottom of every public page. Ported from
 * the legacy site and restyled with the current brand tokens. Stores the user's
 * choice in localStorage so the banner only appears until a decision is made.
 */
export function CookieConsent({ locale }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setVisible(!window.localStorage.getItem(CONSENT_KEY));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function saveConsent(value: 'accepted' | 'declined') {
    window.localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      aria-label='Cookie consent'
      aria-live='polite'
      className='fixed bottom-[clamp(16px,3vw,34px)] right-[clamp(16px,3vw,34px)] left-4 z-[120] grid w-[min(560px,calc(100vw-32px))] grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3.5 rounded-md border border-[var(--brand-primary)]/20 bg-white/95 p-4 shadow-[0_22px_58px_rgba(8,13,11,0.22)] backdrop-blur max-[720px]:left-4 max-[720px]:grid-cols-[40px_minmax(0,1fr)] max-[720px]:items-start'
    >
      <Image
        alt=''
        aria-hidden
        className='size-11 rounded-full border border-[#e7efe3] object-cover max-[720px]:size-10'
        height={44}
        priority
        src={BRAND_FAVICON_PATH}
        width={44}
      />
      <div className='grid gap-1'>
        <strong className='font-display text-[20px] leading-tight text-[#10210f]'>
          We use cookies
        </strong>
        <p className='m-0 text-[13px] leading-[1.45] text-[#3e483b]'>
          Nature Romp Safaris uses essential cookies and optional analytics to improve safari
          planning, enquiries, and website performance.
        </p>
      </div>
      <div className='flex items-center gap-2.5 whitespace-nowrap max-[720px]:col-span-full max-[720px]:flex-wrap max-[720px]:justify-stretch max-[720px]:whitespace-normal'>
        <Link
          className='inline-flex min-h-[38px] items-center justify-center rounded-[3px] text-[13px] font-extrabold text-[var(--brand-primary)] underline underline-offset-[3px] max-[720px]:w-full max-[720px]:justify-start'
          href={`/${locale}/cookie-policy`}
        >
          Cookie Policy
        </Link>
        <button
          className='inline-flex min-h-[38px] items-center justify-center rounded-[3px] border border-[var(--brand-primary)] bg-white px-3.5 text-[13px] font-extrabold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)]/5 max-[720px]:flex-1 max-[720px]:basis-[120px]'
          onClick={() => saveConsent('declined')}
          type='button'
        >
          Decline
        </button>
        <button
          className='inline-flex min-h-[38px] items-center justify-center rounded-[3px] border border-[var(--brand-primary)] bg-[var(--brand-primary)] px-3.5 text-[13px] font-extrabold text-white transition-colors hover:bg-[var(--brand-primary-dark)] max-[720px]:flex-1 max-[720px]:basis-[120px]'
          onClick={() => saveConsent('accepted')}
          type='button'
        >
          Accept
        </button>
      </div>
    </aside>
  );
}
