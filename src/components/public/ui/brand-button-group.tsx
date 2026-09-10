import { cn } from '@/lib/utils';

type BrandButtonGroupProps = {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center';
};

export function BrandButtonGroup({ children, className, align = 'start' }: BrandButtonGroupProps) {
  return (
    <div
      className={cn(
        'brand-dual-actions',
        align === 'center' && 'brand-dual-actions--center',
        className
      )}
    >
      {children}
    </div>
  );
}
