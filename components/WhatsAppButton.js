"use client";

import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    const handleCookieVisibility = (event) => {
      setCookieBannerVisible(event.detail?.visible === true);
    };
    const handleOverlayVisibility = (event) => {
      setOverlayVisible(event.detail?.visible === true);
    };

    setOverlayVisible(document.body.hasAttribute("data-wonly-overlay-open"));
    window.addEventListener(
      "wonly:cookie-banner-visibility",
      handleCookieVisibility,
    );
    window.addEventListener(
      "wonly:overlay-visibility",
      handleOverlayVisibility,
    );

    return () => {
      window.removeEventListener(
        "wonly:cookie-banner-visibility",
        handleCookieVisibility,
      );
      window.removeEventListener(
        "wonly:overlay-visibility",
        handleOverlayVisibility,
      );
    };
  }, []);

  const isSuppressed = cookieBannerVisible || overlayVisible;

  return (
    <a
      href="https://wa.me/34689858129"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar con WONLY por WhatsApp"
      aria-hidden={isSuppressed}
      tabIndex={isSuppressed ? -1 : undefined}
      className={`group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex min-h-14 items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:right-6 ${
        isSuppressed
          ? "pointer-events-none translate-y-3 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <span className="hidden pl-5 pr-1 text-sm font-semibold md:block">
        Hablar por WhatsApp
      </span>
      <span className="grid h-14 w-14 place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-8 w-8"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.363.627 4.663 1.813 6.68L2.667 29.333l6.853-1.787A13.28 13.28 0 0 0 16.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.363-5.967-13.333-13.33-13.333zm0 24.44a11.08 11.08 0 0 1-5.647-1.547l-.403-.24-4.073 1.063 1.087-3.947-.263-.413A11.053 11.053 0 0 1 4.893 16c0-6.12 4.987-11.107 11.11-11.107S27.113 9.88 27.113 16c0 6.123-4.987 11.107-11.11 11.107zm6.093-8.32c-.333-.167-1.973-.973-2.28-1.083-.307-.11-.53-.167-.753.167-.223.333-.863 1.083-1.057 1.307-.193.22-.387.247-.72.08-.333-.167-1.407-.52-2.68-1.653-.99-.883-1.66-1.973-1.853-2.307-.193-.333-.02-.513.147-.68.15-.147.333-.387.5-.58.167-.193.223-.333.333-.557.11-.22.057-.413-.027-.58-.083-.167-.753-1.813-1.033-2.48-.273-.653-.547-.567-.753-.577l-.64-.013c-.223 0-.583.083-.887.413-.307.333-1.163 1.137-1.163 2.773 0 1.637 1.19 3.217 1.357 3.44.167.22 2.34 3.573 5.673 5.013.793.343 1.413.547 1.893.7.797.253 1.52.217 2.093.133.637-.097 1.973-.807 2.25-1.587.28-.78.28-1.447.197-1.587-.083-.14-.307-.22-.64-.387z" />
        </svg>
      </span>
    </a>
  );
}
