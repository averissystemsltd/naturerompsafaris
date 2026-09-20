import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function PortalPageSkeleton({
  padded = true,
  showHeader = true
}: {
  padded?: boolean;
  showHeader?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex min-w-0 max-w-full flex-1 flex-col',
        padded && 'px-4 pt-2 pb-4 md:px-6 md:pt-4'
      )}
    >
      {showHeader ? (
        <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
          <div className='min-w-0 space-y-2'>
            <Skeleton className='h-8 w-40 bg-[#E5E7EB] md:w-56' />
            <Skeleton className='h-4 w-56 max-w-full bg-[#E5E7EB] md:w-96' />
          </div>
          <Skeleton className='h-9 w-24 shrink-0 bg-[#E5E7EB]' />
        </div>
      ) : null}

      <div className='mb-4 flex flex-wrap gap-2'>
        <Skeleton className='h-8 w-14 bg-[#E5E7EB]' />
        <Skeleton className='h-8 w-20 bg-[#E5E7EB]' />
        <Skeleton className='h-8 w-16 bg-[#E5E7EB]' />
        <Skeleton className='h-8 w-16 bg-[#E5E7EB]' />
      </div>

      <div className='overflow-hidden rounded-md border border-[#E5E7EB]'>
        <div className='h-10 bg-[#5D2411]' />
        {Array.from({ length: 8 }).map((_, row) => (
          <div
            className='flex items-center gap-4 border-b border-[#E5E7EB] px-4 py-3 last:border-b-0'
            key={row}
          >
            <Skeleton className='size-4 shrink-0 bg-[#E5E7EB]' />
            <Skeleton className='h-4 min-w-0 flex-1 bg-[#E5E7EB]' />
            <Skeleton className='hidden h-4 w-20 bg-[#E5E7EB] sm:block' />
            <Skeleton className='hidden h-4 w-24 bg-[#E5E7EB] md:block' />
          </div>
        ))}
      </div>
    </div>
  );
}
