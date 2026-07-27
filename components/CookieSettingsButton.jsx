"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="transition hover:text-white"
      onClick={() => window.dispatchEvent(new Event("openCookieSettings"))}
    >
      Configurar cookies
    </button>
  );
}
