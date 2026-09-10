import Link from 'next/link';

import { cn } from '@/lib/utils';

const variants = {
  primary:
    'border border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white hover:text-white',
  'accent-outline':
    'border border-[var(--brand-primary)] bg-transparent text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white',
  'gold-outline':
    'border border-[var(--brand-lime)] bg-transparent text-white hover:text-[var(--brand-primary-dark)]',
  gold: 'border border-[var(--brand-lime)] bg-[var(--brand-lime)] text-[var(--brand-primary-dark)] hover:border-[var(--brand-lime-hover)] hover:bg-[var(--brand-lime-hover)]',
  accent:
    'border border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white hover:text-white',
  ghost: 'border border-transparent text-white hover:text-[var(--brand-lime)]',
  white:
    'border border-white bg-white text-[var(--brand-primary)] hover:bg-[var(--brand-ivory)] hover:border-[var(--brand-ivory)]'
} as const;

/**
 * These variants get the animated highlight fill (`.brand-fill-hover`): a lime
 * layer wipes in from the left on hover. The fill colour is lime by default and
 * can be overridden per-button via the `--brand-fill` custom property (e.g.
 * the hero "Plan My Safari" button fills with the primary green instead).
 */
const FILL_HOVER_VARIANTS = new Set<keyof typeof variants>(['primary', 'accent', 'gold-outline']);

type BrandButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  size?: 'default' | 'sm';
  variant?: keyof typeof variants;
};

export function BrandButton({
  children,
  className,
  href,
  size = 'default',
  variant = 'accent'
}: BrandButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-[var(--brand-button-radius)] font-semibold uppercase tracking-[0.08em] transition-colors duration-200',
    size === 'default' ? 'min-h-11 px-6 text-sm' : 'min-h-9 px-4 text-xs',
    variants[variant],
    FILL_HOVER_VARIANTS.has(variant) && 'brand-fill-hover',
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
