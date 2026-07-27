'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // No rastreamos el panel de administración
    if (pathname.startsWith('/wonly-panel')) return;

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        page: pathname,
        referrer: document.referrer || '',
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
