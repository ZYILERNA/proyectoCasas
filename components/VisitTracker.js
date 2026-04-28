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
      body: JSON.stringify({
        page: pathname,
        userAgent: navigator.userAgent,
        referrer: document.referrer || '',
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
