'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { listEnquiries } from '@/features/enquiries/api/service';
import { enquiryTypeLabel } from '@/features/enquiries/constants/enquiry-labels';
import { createClient } from '@/lib/supabase/browser';
import { useEnquiryNotificationStore } from './enquiry-notification-store';

export function EnquiryNotificationProvider({ children }: { children: React.ReactNode }) {
  const addNotification = useEnquiryNotificationStore((state) => state.addNotification);
  const hydratePending = useEnquiryNotificationStore((state) => state.hydratePending);
  const router = useRouter();

  React.useEffect(() => {
    let cancelled = false;

    void listEnquiries({ page: 1, status: 'pending' })
      .then((result) => {
        if (cancelled) return;
        hydratePending(
          result.items.map((enquiry) => ({
            body: `${enquiry.name} submitted a ${enquiryTypeLabel(enquiry.enquiryType).toLowerCase()}.`,
            createdAt: enquiry.createdAt,
            enquiryId: enquiry.id,
            enquiryType: enquiry.enquiryType,
            title: 'Pending enquiry'
          }))
        );
      })
      .catch(() => {
        // Bell still works from realtime inserts if the first fetch fails.
      });

    return () => {
      cancelled = true;
    };
  }, [hydratePending]);

  React.useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel('portal-enquiries')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'enquiries' },
        (payload) => {
          const row = payload.new as {
            enquiry_type?: string;
            id?: string;
            name?: string;
          };

          if (!row.id || !row.name) return;

          const typeLabel = enquiryTypeLabel(row.enquiry_type ?? 'general');

          addNotification({
            body: `${row.name} submitted a ${typeLabel.toLowerCase()}.`,
            createdAt: new Date().toISOString(),
            enquiryId: row.id,
            enquiryType: row.enquiry_type ?? 'general',
            title: 'New enquiry received'
          });

          toast('New enquiry received', {
            description: `${row.name} · ${typeLabel}`,
            action: {
              label: 'View',
              onClick: () => router.push('/portal/enquiries')
            }
          });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [addNotification, router]);

  return <>{children}</>;
}
