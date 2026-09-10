import Image from 'next/image';

import { BRAND_LOGO_HEIGHT, BRAND_LOGO_PATH, BRAND_LOGO_WIDTH } from '@/config/brand';
import { cn } from '@/lib/utils';

interface PortalAuthLogoProps {
  className?: string;
}

export function PortalAuthLogo({ className }: PortalAuthLogoProps) {
  return (
    <div className={cn('mb-8 flex justify-center', className)}>
      <Image
        alt='Nature Romp Safaris'
        className='h-[52px] w-auto max-w-[220px] object-contain'
        height={BRAND_LOGO_HEIGHT}
        priority
        src={BRAND_LOGO_PATH}
        width={BRAND_LOGO_WIDTH}
      />
    </div>
  );
}
