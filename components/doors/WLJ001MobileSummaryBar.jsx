"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Ruler } from "lucide-react";

const isPositiveMeasurement = (value) => /^\d{1,5}$/.test(value)
  && Number(value) > 0;

const isConfiguratorControl = (target) => (
  target instanceof Element
  && Boolean(target.closest("#wlj001-configurator"))
  && target.matches("input, textarea, select, button, a, summary")
);

export default function WLJ001MobileSummaryBar({
  selectedFinish,
  configuration,
  contactHref,
  isLightboxOpen,
  configurationIsValid,
}) {
  const barRef = useRef(null);
  const focusFrameRef = useRef(null);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [formControlFocused, setFormControlFocused] = useState(false);
  const [siteFooterVisible, setSiteFooterVisible] = useState(false);
  const hasRequiredMeasurements = isPositiveMeasurement(configuration.width)
    && isPositiveMeasurement(configuration.height);
  const canRequestValidation = hasRequiredMeasurements && configurationIsValid;

  useEffect(() => {
    const handleCookieVisibility = (event) => {
      setCookieBannerVisible(event.detail?.visible === true);
    };
    const handleOverlayVisibility = (event) => {
      setOverlayVisible(event.detail?.visible === true);
    };
    const handleFocusIn = (event) => {
      if (isConfiguratorControl(event.target)) setFormControlFocused(true);
    };
    const handleFocusOut = () => {
      focusFrameRef.current = window.requestAnimationFrame(() => {
        setFormControlFocused(isConfiguratorControl(document.activeElement));
      });
    };

    setCookieBannerVisible(
      document.body.hasAttribute("data-wonly-cookie-banner-visible")
      || Boolean(document.querySelector("[data-wonly-cookie-banner]")),
    );
    setOverlayVisible(document.body.hasAttribute("data-wonly-overlay-open"));
    window.addEventListener(
      "wonly:cookie-banner-visibility",
      handleCookieVisibility,
    );
    window.addEventListener("wonly:overlay-visibility", handleOverlayVisibility);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    const siteFooter = document.querySelector("[data-site-footer]");
    const footerObserver = siteFooter && "IntersectionObserver" in window
      ? new IntersectionObserver(
        ([entry]) => setSiteFooterVisible(entry.isIntersecting),
        { threshold: 0.02 },
      )
      : null;
    if (siteFooter && footerObserver) footerObserver.observe(siteFooter);

    return () => {
      window.removeEventListener(
        "wonly:cookie-banner-visibility",
        handleCookieVisibility,
      );
      window.removeEventListener(
        "wonly:overlay-visibility",
        handleOverlayVisibility,
      );
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      if (focusFrameRef.current) {
        window.cancelAnimationFrame(focusFrameRef.current);
      }
      footerObserver?.disconnect();
    };
  }, []);

  const isSuppressed = cookieBannerVisible
    || overlayVisible
    || formControlFocused
    || siteFooterVisible
    || isLightboxOpen;
  const measurementsLabel = hasRequiredMeasurements
    ? `${configuration.width} × ${configuration.height} mm`
    : "Medidas por definir";
  const ctaLabel = canRequestValidation
    ? "Solicitar validación"
    : configurationIsValid
      ? "Completar medidas"
      : "Revisar datos";
  const focusTargetId = !isPositiveMeasurement(configuration.width)
    ? "wlj001-width"
    : !isPositiveMeasurement(configuration.height)
      ? "wlj001-height"
      : configuration.wallThickness && !isPositiveMeasurement(configuration.wallThickness)
        ? "wlj001-wallThickness"
        : "wlj001-quantity";
  const ctaHref = canRequestValidation
    ? contactHref
    : `#${focusTargetId}`;
  const quantityLabel = Number(configuration.quantity) > 1
    ? ` · ${configuration.quantity} uds.`
    : "";

  useEffect(() => {
    if (
      isSuppressed
      && barRef.current?.contains(document.activeElement)
      && document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }
  }, [isSuppressed]);

  return (
    <aside
      ref={barRef}
      aria-label="Resumen de configuración de WL-J001"
      aria-hidden={isSuppressed}
      inert={isSuppressed ? "" : undefined}
      className={`fixed inset-x-0 bottom-0 z-[44] border-t border-white/10 bg-[#17130F]/[.97] pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 text-white shadow-[0_-12px_35px_rgba(0,0,0,.22)] backdrop-blur-xl transition duration-200 motion-reduce:transition-none lg:hidden ${
        isSuppressed
          ? "pointer-events-none translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="mx-auto grid max-w-lg grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9A781]">
            WL-J001 · {selectedFinish}{quantityLabel}
          </p>
          <p className="mt-1 flex items-center gap-1.5 truncate text-sm font-semibold text-white">
            <Ruler size={14} className="shrink-0 text-zinc-400" aria-hidden="true" />
            {measurementsLabel}
          </p>
        </div>

        <Link
          href={ctaHref}
          onClick={() => {
            if (canRequestValidation) return;
            window.setTimeout(() => {
              document.getElementById(focusTargetId)?.focus({ preventScroll: true });
            }, 0);
          }}
          tabIndex={isSuppressed ? -1 : undefined}
          aria-label={canRequestValidation
            ? `Solicitar validación de WL-J001 en acabado ${selectedFinish}, ${configuration.width} por ${configuration.height} milímetros`
            : "Revisar los datos preliminares de WL-J001"}
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#C9A781] px-4 text-[9px] font-bold uppercase tracking-[0.12em] text-[#17130F] transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#17130F] motion-reduce:transition-none"
        >
          {ctaLabel}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
