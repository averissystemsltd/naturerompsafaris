'use client';

import { useEffect } from 'react';

export function PortalDocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `${title} · Nature Romp Safaris`;
  }, [title]);

  return null;
}
