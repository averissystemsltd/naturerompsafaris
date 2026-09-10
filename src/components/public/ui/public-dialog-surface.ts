import { cn } from '@/lib/utils';

/**
 * Light-theme scope for public-site Radix dialogs (portaled to document.body).
 * Without this, dialogs inherit the dashboard/root dark tokens and render black.
 */
export const PUBLIC_LIGHT_DIALOG = cn(
  'public-site',
  'border-[var(--brand-line)] bg-white text-[var(--brand-ink)]',
  '[--brand-primary:#3c5142] [--brand-primary-dark:#2f4034] [--brand-primary-light:#4a6354]',
  '[--brand-accent:#3c5142] [--brand-accent-hover:#2f4034] [--brand-lime:#a9c038]',
  '[--brand-ivory:#f8f5ef] [--brand-ink:#1a1a1a] [--brand-muted:#5c665f] [--brand-line:#e4dfd4]',
  '[--background:#ffffff] [--foreground:#1a1a1a] [--card:#ffffff]',
  '[--popover:#ffffff] [--popover-foreground:#1a1a1a]',
  '[--muted:#f8f5ef] [--muted-foreground:#5c665f]',
  '[--accent:#f8f5ef] [--accent-foreground:#1a1a1a]',
  '[--border:#e4dfd4] [--input:#e4dfd4] [--ring:#3c5142]',
  '[&>button]:text-[var(--brand-ink)] [&>button]:opacity-70 [&>button]:hover:opacity-100'
);
