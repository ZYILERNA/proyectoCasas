// components/LanguageSwitcher.js
"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";

// Idioma original de la web (el que se escribe en el código)
const PAGE_LANG = "es";

// Idiomas disponibles (Google Translate soporta muchos más; estos son los más comunes)
const LANGS = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "zh-CN", label: "中文 (简体)" },
  { code: "zh-TW", label: "中文 (繁體)" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "ca", label: "Català" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
  { code: "uk", label: "Українська" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "nl", label: "Nederlands" },
  { code: "pl", label: "Polski" },
  { code: "tr", label: "Türkçe" },
  { code: "sv", label: "Svenska" },
  { code: "ro", label: "Română" },
  { code: "el", label: "Ελληνικά" },
  { code: "hi", label: "हिन्दी" },
  { code: "th", label: "ไทย" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "id", label: "Indonesia" },
  { code: "he", label: "עברית" },
];

function readCookieLang() {
  if (typeof document === "undefined") return PAGE_LANG;
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : PAGE_LANG;
}

function setGoogTransCookie(lang) {
  const host = window.location.hostname;
  const value = `/${PAGE_LANG}/${lang}`;
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${host}`;
  document.cookie = `googtrans=${value};path=/;domain=.${host}`;
}

function clearGoogTransCookie() {
  const host = window.location.hostname;
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  document.cookie = `googtrans=;${expired}`;
  document.cookie = `googtrans=;${expired};domain=${host}`;
  document.cookie = `googtrans=;${expired};domain=.${host}`;
}

export default function LanguageSwitcher({ variant = "desktop" }) {
  const isMobile = variant === "mobile";
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(PAGE_LANG);
  const ref = useRef(null);

  useEffect(() => {
    setCurrent(readCookieLang());
  }, []);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const applyLanguage = (lang) => {
    setCurrent(lang);
    setOpen(false);

    // Volver al idioma original: limpiar cookie y recargar
    if (lang === PAGE_LANG) {
      clearGoogTransCookie();
      window.location.reload();
      return;
    }

    setGoogTransCookie(lang);

    // Disparar el traductor de Google si su <select> ya existe; si no, reintentar
    const trigger = (attempt = 0) => {
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event("change"));
      } else if (attempt < 20) {
        setTimeout(() => trigger(attempt + 1), 250);
      } else {
        // El widget aún no cargó: la cookie ya está puesta, recargamos
        window.location.reload();
      }
    };
    trigger();
  };

  const currentLang = LANGS.find((l) => l.code === current);
  const currentShort = (current.split("-")[0] || PAGE_LANG).toUpperCase();

  return (
    <div
      ref={ref}
      translate="no"
      className={`notranslate relative ${isMobile ? "w-full" : ""}`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Cambiar idioma"
        aria-expanded={open}
        className={
          isMobile
            ? "flex items-center justify-between w-full bg-white/5 border border-white/10 rounded-full px-5 py-3.5 text-sm font-bold uppercase tracking-widest text-gray-200 hover:text-[#00C2FF] hover:border-[#00C2FF]/40 transition-colors"
            : "flex items-center gap-1.5 text-gray-300 hover:text-[#00C2FF] transition-colors duration-300 text-xs font-bold uppercase tracking-widest"
        }
      >
        <span className="flex items-center gap-2">
          <Globe size={isMobile ? 18 : 16} aria-hidden="true" />
          <span>{isMobile ? currentLang?.label || "Idioma" : currentShort}</span>
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          className={
            isMobile
              ? "mt-3 w-full bg-black/40 border border-white/10 rounded-2xl py-2 max-h-64 overflow-y-auto"
              : "absolute right-0 top-full mt-3 w-52 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 max-h-80 overflow-y-auto z-[60]"
          }
        >
          {LANGS.map((l) => {
            const active = l.code === current;
            return (
              <button
                key={l.code}
                onClick={() => applyLanguage(l.code)}
                className={`flex items-center justify-between w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  active
                    ? "text-[#00C2FF] bg-white/5"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{l.label}</span>
                {active && <Check size={14} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
