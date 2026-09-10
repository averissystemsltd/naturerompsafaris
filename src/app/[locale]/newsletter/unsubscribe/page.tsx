import type { Metadata } from 'next';
import Link from 'next/link';
import type { SupabaseClient } from '@supabase/supabase-js';

import { localePath } from '@/lib/public/locale-path';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Unsubscribe',
  robots: { index: false, follow: false }
};

type UnsubscribePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string | string[] }>;
};

async function unsubscribe(token: string): Promise<boolean> {
  // RPC is not in the generated DB types yet; use the untyped surface.
  const supabase = (await createClient()) as unknown as SupabaseClient;
  const { data, error } = await supabase.rpc('unsubscribe_newsletter', { p_token: token });
  if (error) return false;
  return Boolean(data);
}

export default async function NewsletterUnsubscribePage({
  params,
  searchParams
}: UnsubscribePageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const token = Array.isArray(sp.token) ? sp.token[0] : sp.token;

  const success = token ? await unsubscribe(token) : false;

  return (
    <main className='brand-container brand-section'>
      <div className='mx-auto max-w-xl text-center'>
        <h1 className='text-2xl font-bold text-[var(--brand-primary-dark)]'>
          {success ? 'You have been unsubscribed' : 'Unable to unsubscribe'}
        </h1>
        <p className='mt-4 text-[var(--brand-body)]'>
          {success
            ? 'You will no longer receive newsletter emails from Nature Romp Safaris. We’re sorry to see you go — you can resubscribe any time from our website footer.'
            : 'This unsubscribe link is invalid or has expired. If you keep receiving emails you’d rather not, contact us at info@naturerompsafaris.co.ke and we’ll remove you straight away.'}
        </p>
        <Link
          href={localePath(locale)}
          className='mt-8 inline-flex min-h-11 items-center justify-center rounded-[var(--brand-button-radius)] bg-[var(--brand-lime)] px-6 text-sm font-bold uppercase tracking-[0.06em] text-[var(--brand-primary-dark)] transition-colors hover:bg-[var(--brand-lime-hover)]'
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
