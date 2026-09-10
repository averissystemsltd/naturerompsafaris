import { formatTourPrice } from '@/lib/public/tour-format';
import type { PublicMountainRoutePricingRow } from '@/features/experiences/public/types';

type MountainRoutePricingTableProps = {
  currency: string;
  notes?: string | null;
  rows: PublicMountainRoutePricingRow[];
};

export function MountainRoutePricingTable({
  currency,
  notes,
  rows
}: MountainRoutePricingTableProps) {
  if (!rows.length) return null;

  return (
    <div>
      <div className='overflow-hidden rounded-[var(--brand-radius)] border border-[var(--brand-line)]'>
        <table className='w-full border-collapse text-left text-sm'>
          <thead className='bg-[var(--brand-primary)] text-white'>
            <tr>
              <th className='px-4 py-3 font-display text-sm uppercase tracking-wide'>
                Accommodation type
              </th>
              <th className='px-4 py-3 font-display text-sm uppercase tracking-wide'>
                Price per person
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className='border-t border-[var(--brand-line)]' key={row.label}>
                <td className='px-4 py-3 font-medium text-[var(--brand-ink)]'>{row.label}</td>
                <td className='px-4 py-3 text-[var(--brand-primary)]'>
                  {row.price != null ? formatTourPrice(row.price, currency) : 'On request'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {notes ? <p className='mt-3 text-sm text-[var(--brand-muted)]'>{notes}</p> : null}
    </div>
  );
}
