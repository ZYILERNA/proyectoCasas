"use client";

import { Cookie, Settings, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

const defaultPreferences = {
  necessary: true,
  analytics: false,
};
const CONSENT_VERSION = 2;
const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000;

function readStoredPreferences() {
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

function savePreferences(preferences) {
  const payload = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: preferences.analytics === true,
    updatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + CONSENT_DURATION_MS).toISOString(),
  };
  localStorage.setItem("wonly_cookie_consent", JSON.stringify(payload));
  window.dispatchEvent(
    new CustomEvent("wonly:consent-change", { detail: payload }),
  );
}

export default function CookieBanner() {
  const titleId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    const stored = readStoredPreferences();
    if (stored) setPreferences(stored);

    let timer;
    if (!stored) {
      timer = window.setTimeout(() => setIsVisible(true), 700);
    }

    const handleOpenSettings = () => {
      setPreferences(readStoredPreferences() || defaultPreferences);
      setShowConfig(true);
      setIsVisible(true);
    };
    window.addEventListener("openCookieSettings", handleOpenSettings);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("openCookieSettings", handleOpenSettings);
    };
  }, []);

  useEffect(() => {
    document.body.toggleAttribute(
      "data-wonly-cookie-banner-visible",
      isVisible,
    );
    window.dispatchEvent(
      new CustomEvent("wonly:cookie-banner-visibility", {
        detail: { visible: isVisible },
      }),
    );

    return () => {
      document.body.removeAttribute("data-wonly-cookie-banner-visible");
    };
  }, [isVisible]);

  const acceptAll = () => {
    const next = { necessary: true, analytics: true };
    setPreferences(next);
    savePreferences(next);
    setIsVisible(false);
  };

  const rejectAll = () => {
    setPreferences(defaultPreferences);
    savePreferences(defaultPreferences);
    setIsVisible(false);
  };

  const saveCurrentPreferences = () => {
    savePreferences(preferences);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div data-wonly-cookie-banner className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-center p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] md:p-6">
      <section
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        className="pointer-events-auto relative max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/15 bg-[#111]/95 p-5 text-white shadow-2xl shadow-black/60 backdrop-blur-xl md:p-7"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-cyan-300/5 blur-[60px]"
        />

        {!showConfig ? (
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 md:grid">
              <Cookie size={24} className="text-cyan-300" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2
                id={titleId}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <ShieldCheck
                  size={18}
                  className="text-cyan-300 md:hidden"
                  aria-hidden="true"
                />
                Tu privacidad, bajo tu control
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
                Las cookies necesarias mantienen la web operativa. La medición
                y el seguimiento permanecen desactivados hasta que los
                autorices. Consulta la{" "}
                <Link
                  href="/cookies"
                  className="text-cyan-300 underline-offset-4 hover:underline"
                >
                  política de cookies
                </Link>
                .
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 lg:flex lg:shrink-0">
              <button
                type="button"
                onClick={() => setShowConfig(true)}
                className="min-h-11 rounded-full border border-white/15 px-5 text-sm font-medium transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
              >
                Configurar
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="min-h-11 rounded-full px-5 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
              >
                Solo necesarias
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="min-h-11 rounded-full bg-cyan-300 px-6 text-sm font-bold text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <h2
                id={titleId}
                className="flex items-center gap-2 text-xl font-semibold"
              >
                <Settings size={20} className="text-cyan-300" aria-hidden="true" />
                Configuración de cookies
              </h2>
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                aria-label="Volver al aviso de cookies"
                className="grid h-10 w-10 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
              >
                <X size={21} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              <PreferenceRow
                title="Estrictamente necesarias"
                description="Permiten el funcionamiento básico y no se pueden desactivar."
                checked
                disabled
              />
              <PreferenceRow
                title="Rendimiento y analítica"
                description="Nos permiten medir el uso de la web y detectar oportunidades de mejora."
                checked={preferences.analytics}
                onChange={(checked) =>
                  setPreferences((current) => ({
                    ...current,
                    analytics: checked,
                  }))
                }
              />
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="min-h-11 rounded-full px-5 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
              >
                Rechazar opcionales
              </button>
              <button
                type="button"
                onClick={saveCurrentPreferences}
                className="min-h-11 rounded-full bg-white px-6 text-sm font-bold text-black transition hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-black/35 p-4">
      <div>
        <h3 id={`${id}-title`} className="text-sm font-semibold text-white">
          {title}
        </h3>
        <p id={`${id}-description`} className="mt-1 text-xs leading-5 text-zinc-500">
          {description}
        </p>
      </div>
      {disabled ? (
        <span className="shrink-0 rounded-full bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          Siempre activas
        </span>
      ) : (
        <label className="relative inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-description`}
          />
          <span className="relative h-6 w-11 rounded-full bg-zinc-700 transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan-300 peer-checked:bg-cyan-300 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition after:content-[''] peer-checked:after:translate-x-5" />
        </label>
      )}
    </div>
  );
}
