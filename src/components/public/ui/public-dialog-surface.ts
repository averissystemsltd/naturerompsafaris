import { publicSiteFontClassName } from '@/components/themes/font.config';
import { cn } from '@/lib/utils';

/**
 * Light-theme scope for public-site Radix dialogs (portaled to document.body).
 * Without this, dialogs inherit the dashboard/root dark tokens and render black.
 */
export const PUBLIC_LIGHT_DIALOG = cn(
  'public-site',
  publicSiteFontClassName,
  'border-[var(--brand-line)] bg-white text-[var(--brand-ink)]',
  '[--brand-primary:#5d2411] [--brand-primary-dark:#4a1c0d] [--brand-primary-light:#7a3a22]',
  '[--brand-accent:#5d2411] [--brand-accent-hover:#36e95a] [--brand-lime:#36e95a]',
  '[--brand-ivory:#eae5e3] [--brand-ink:#101610] [--brand-muted:#5c665f] [--brand-line:#e8eadf]',
  '[--background:#ffffff] [--foreground:#101610] [--card:#ffffff]',
  '[--popover:#ffffff] [--popover-foreground:#101610]',
  '[--muted:#eae5e3] [--muted-foreground:#5c665f]',
  '[--accent:#eae5e3] [--accent-foreground:#101610]',
  '[--border:#e8eadf] [--input:#e8eadf] [--ring:#5d2411]',
  '[&>button]:text-[var(--brand-ink)] [&>button]:opacity-70 [&>button]:hover:opacity-100'
);
