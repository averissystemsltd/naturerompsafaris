import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

interface CmsTableRowsSkeletonProps {
  columns: number;
  rows?: number;
}

export function CmsTableRowsSkeleton({ columns, rows = 8 }: CmsTableRowsSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) => (
        <TableRow key={row}>
          {Array.from({ length: columns }).map((_, column) => (
            <TableCell key={column}>
              <Skeleton
                className={column === 1 ? 'h-4 w-3/4 bg-[#E5E7EB]' : 'h-4 w-16 bg-[#E5E7EB]'}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function CmsCardGridSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      {Array.from({ length: cards }).map((_, index) => (
        <Skeleton className='h-48 rounded-md bg-[#E5E7EB]' key={index} />
      ))}
    </div>
  );
}

export function CmsMediaGridSkeleton({ tiles = 12 }: { tiles?: number }) {
  return (
    <div className='grid grid-cols-3 gap-1.5 p-1.5 sm:grid-cols-4 md:grid-cols-5'>
      {Array.from({ length: tiles }).map((_, index) => (
        <Skeleton className='aspect-square rounded-[3px] bg-[#E5E7EB]' key={index} />
      ))}
    </div>
  );
}

export function CmsEnquiryRowsSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          className='flex items-center gap-3 border-b border-[#E5E7EB] px-4 py-3.5 sm:px-5'
          key={index}
        >
          <Skeleton className='size-4 shrink-0 bg-[#E5E7EB]' />
          <div className='grid min-w-0 flex-1 gap-2 sm:grid-cols-6 sm:items-center'>
            <Skeleton className='h-4 w-40 max-w-full bg-[#E5E7EB]' />
            <Skeleton className='hidden h-4 w-16 bg-[#E5E7EB] sm:block' />
            <Skeleton className='hidden h-4 w-24 bg-[#E5E7EB] sm:block' />
            <Skeleton className='hidden h-4 w-16 bg-[#E5E7EB] md:block' />
            <Skeleton className='hidden h-4 w-20 bg-[#E5E7EB] md:block' />
            <Skeleton className='hidden h-4 w-16 justify-self-end bg-[#E5E7EB] lg:block' />
          </div>
        </div>
      ))}
    </div>
  );
}
