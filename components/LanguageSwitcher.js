"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PAGE_LANG = "es";
const LANGS = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "zh-CN", label: "中文（简体）" },
  { code: "zh-TW", label: "中文（繁體）" },
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

let translatorPromise;

function ensureGoogleTranslate() {
  if (window.google?.translate?.TranslateElement) {
    return Promise.resolve();
  }
  if (translatorPromise) return translatorPromise;

  translatorPromise = new Promise((resolve, reject) => {
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          { pageLanguage: PAGE_LANG, autoDisplay: false },
          "google_translate_element",
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    };

    const existingScript = document.querySelector(
      'script[data-wonly-google-translate="true"]',
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.dataset.wonlyGoogleTranslate = "true";
    script.onerror = () => {
      translatorPromise = undefined;
      reject(new Error("No se pudo cargar Google Translate"));
    };
    document.body.appendChild(script);
  });

  return translatorPromise;
}

function readCookieLang() {
  if (typeof document === "undefined") return PAGE_LANG;
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return match ? decodeURIComponent(match[1]) : PAGE_LANG;
}

function setGoogTransCookie(lang) {
  const host = window.location.hostname;
  const value = `/${PAGE_LANG}/${lang}`;
  document.cookie = `googtrans=${value};path=/;SameSite=Lax`;
  document.cookie = `googtrans=${value};path=/;domain=${host};SameSite=Lax`;
  document.cookie = `googtrans=${value};path=/;domain=.${host};SameSite=Lax`;
}

function clearGoogTransCookie() {
  const host = window.location.hostname;
  const expired =
    "expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax";
  document.cookie = `googtrans=;${expired}`;

  const parts = host.split(".");
  for (let index = 0; index < parts.length; index += 1) {
    const domain = parts.slice(index).join(".");
    if (!domain) continue;
    document.cookie = `googtrans=;${expired};domain=${domain}`;
    document.cookie = `googtrans=;${expired};domain=.${domain}`;
  }
}

export default function LanguageSwitcher({ variant = "desktop" }) {
  const isMobile = variant === "mobile";
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(PAGE_LANG);

  useEffect(() => {
    const cookieLang = readCookieLang();
    setCurrent(cookieLang);
    document.documentElement.lang = cookieLang;

    if (sessionStorage.getItem("wonly_force_es") !== "1") return;

    const stillTranslated = cookieLang !== PAGE_LANG;
    const tries = Number(
      sessionStorage.getItem("wonly_force_es_tries") || "0",
    );
    if (stillTranslated && tries < 1) {
      sessionStorage.setItem("wonly_force_es_tries", String(tries + 1));
      clearGoogTransCookie();
      window.location.reload();
      return;
    }

    sessionStorage.removeItem("wonly_force_es");
    sessionStorage.removeItem("wonly_force_es_tries");
    if (!stillTranslated) setCurrent(PAGE_LANG);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        return;
      }

      const items = [...(menuRef.current?.querySelectorAll('[role="menuitemradio"]') || [])];
      if (!items.length) return;
      event.preventDefault();

      const focusedIndex = items.indexOf(document.activeElement);
      if (event.key === "Home") items[0].focus();
      else if (event.key === "End") items[items.length - 1].focus();
      else if (event.key === "ArrowDown") {
        items[(focusedIndex + 1 + items.length) % items.length].focus();
      } else {
        items[(focusedIndex - 1 + items.length) % items.length].focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const toggleMenu = () => {
    setOpen((value) => !value);
  };

  const applyLanguage = async (lang) => {
    setCurrent(lang);
    setOpen(false);
    document.documentElement.lang = lang;

    if (lang === PAGE_LANG) {
      sessionStorage.setItem("wonly_force_es", "1");
      sessionStorage.removeItem("wonly_force_es_tries");
      clearGoogTransCookie();
      window.location.reload();
      return;
    }

    setGoogTransCookie(lang);

    try {
      await ensureGoogleTranslate();
    } catch {
      window.location.reload();
      return;
    }

    const trigger = (attempt = 0) => {
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event("change"));
      } else if (attempt < 20) {
        window.setTimeout(() => trigger(attempt + 1), 250);
      } else {
        window.location.reload();
      }
    };
    trigger();
  };

  const currentLang = LANGS.find((lang) => lang.code === current);
  const currentShort = (current.split("-")[0] || PAGE_LANG).toUpperCase();

  return (
    <div
      ref={rootRef}
      translate="no"
      className={`notranslate relative ${isMobile ? "w-full" : ""}`}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        aria-label="Cambiar idioma"
        aria-haspopup="menu"
        aria-expanded={open}
        className={
          isMobile
            ? "flex min-h-11 w-full items-center justify-between rounded-full px-3 text-sm font-bold uppercase tracking-widest text-zinc-200 transition hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
            : "flex min-h-11 items-center gap-1.5 rounded-full px-2 text-xs font-bold uppercase tracking-widest text-zinc-300 transition hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
        }
      >
        <span className="flex items-center gap-2">
          {!isMobile && <Globe size={16} aria-hidden="true" />}
          <span>{isMobile ? currentLang?.label || "Idioma" : currentShort}</span>
        </span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Idiomas disponibles"
          className={
            isMobile
              ? "mt-3 max-h-64 w-full overflow-y-auto rounded-2xl border border-white/10 bg-black/60 py-2"
              : "absolute right-0 top-full z-[70] mt-2 max-h-80 w-56 overflow-y-auto rounded-2xl border border-white/10 bg-[#0a0a0a]/95 py-2 shadow-2xl backdrop-blur-xl"
          }
        >
          {LANGS.map((lang) => {
            const active = lang.code === current;
            return (
              <button
                key={lang.code}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => applyLanguage(lang.code)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cyan-300 ${
                  active
                    ? "bg-white/5 text-cyan-300"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{lang.label}</span>
                {active && <Check size={14} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
