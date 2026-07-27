"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const CONSENT_VERSION = 2;

const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((module) => module.Analytics),
  { ssr: false },
);
const SpeedInsights = dynamic(
  () =>
    import("@vercel/speed-insights/next").then(
      (module) => module.SpeedInsights,
    ),
  { ssr: false },
);
const VisitTracker = dynamic(() => import("./VisitTracker"), { ssr: false });

function readConsent() {
  try {
    const stored = localStorage.getItem("wonly_cookie_consent");
    if (!stored) return null;
    if (stored === "all" || stored === "necessary_only") return null;
    const parsed = JSON.parse(stored);
    if (
      parsed.version !== CONSENT_VERSION ||
      !parsed.expiresAt ||
      Date.parse(parsed.expiresAt) <= Date.now()
    ) {
      localStorage.removeItem("wonly_cookie_consent");
      return null;
    }
    return {
      necessary: true,
      analytics: parsed.analytics === true,
    };
  } catch {
    return null;
  }
}

export default function ConsentGate() {
  const pathname = usePathname();
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    setConsent(readConsent());

    const handleConsentChange = (event) => {
      setConsent(event.detail || readConsent());
    };
    window.addEventListener("wonly:consent-change", handleConsentChange);
    return () =>
      window.removeEventListener("wonly:consent-change", handleConsentChange);
  }, []);

  if (pathname.startsWith("/wonly-panel") || !consent?.analytics) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <VisitTracker />
    </>
  );
}
