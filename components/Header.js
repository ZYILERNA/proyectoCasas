"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Activity,
  ChevronDown,
  Globe,
  Home as HomeIcon,
  Menu,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const SearchOverlay = dynamic(() => import("./SearchOverlay"), {
  ssr: false,
});

const primaryLinks = [
  { href: "/empresa", label: "Empresa" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
];

const securityLinks = [
  { href: "/puertas", label: "Puertas de seguridad" },
  {
    href: "/puertas?category=PUERTA%20AC%C3%9ASTICA%20DE%20MADERA",
    label: "Puertas de interior",
  },
  { href: "/ventanas", label: "Ventanas panorámicas" },
  { href: "/cerraduras", label: "Cerraduras inteligentes" },
  { href: "/manillas", label: "Manillas de diseño" },
];

const interiorLinks = [
  { href: "/sofas", label: "Sofás" },
  { href: "/mesas", label: "Mesas" },
  { href: "/sillas", label: "Sillas y sillones" },
  { href: "/dormitorios", label: "Dormitorios" },
  { href: "/gabinetes", label: "Gabinetes" },
];

// Conservamos las rutas para poder reactivar esta línea de producto más adelante.
const SHOW_INTERIOR_PRODUCTS = false;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const productsRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const previousFocusRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1280px)");
    const closeMobileMenuAtDesktop = (event) => {
      if (event.matches) setIsMobileMenuOpen(false);
    };

    closeMobileMenuAtDesktop(desktopMedia);
    desktopMedia.addEventListener("change", closeMobileMenuAtDesktop);
    return () =>
      desktopMedia.removeEventListener("change", closeMobileMenuAtDesktop);
  }, []);

  useEffect(() => {
    const overlayVisible = isMobileMenuOpen || isSearchOpen;

    document.body.toggleAttribute(
      "data-wonly-overlay-open",
      overlayVisible,
    );
    window.dispatchEvent(
      new CustomEvent("wonly:overlay-visibility", {
        detail: { visible: overlayVisible },
      }),
    );

    return () => {
      document.body.removeAttribute("data-wonly-overlay-open");
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isProductsOpen) return;

    const closeOnOutsideClick = (event) => {
      if (!productsRef.current?.contains(event.target)) {
        setIsProductsOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsProductsOpen(false);
        productsRef.current?.querySelector("button")?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isProductsOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const main = document.querySelector("[data-site-content]");
    const footer = document.querySelector("footer");

    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      [...(mobileMenuRef.current?.querySelectorAll(focusableSelector) || [])]
        .filter(Boolean)
        .filter((element) => !element.hasAttribute("hidden"))
        .filter((element) => element.getClientRects().length > 0);

    window.requestAnimationFrame(() => getFocusable()[0]?.focus());

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const headerControlClass =
    "text-white hover:bg-white/10 hover:text-[#D4A868]";

  return (
    <>
      <header
        className={`${
          isHome ? "relative" : "absolute inset-x-0 top-0"
        } z-50 border-b border-transparent bg-gradient-to-b from-black/80 via-black/70 to-black/45 text-white`}
      >
        {isHome && (
          <div className="flex min-h-10 items-center justify-center bg-[#D4A868] px-4 py-1.5 text-center text-[10px] font-bold uppercase leading-tight tracking-[0.1em] text-[#221f20] sm:min-h-9 sm:px-6 sm:text-xs sm:tracking-[0.14em]">
            Soluciones integrales para sistemas de puertas inteligentes
          </div>
        )}

        <div className="relative z-50 mx-auto flex h-[72px] w-full max-w-[1600px] items-center justify-between px-5 sm:px-6 lg:px-8 xl:px-10">
          <Link
            href="/"
            onClick={closeMobileMenu}
            aria-label="WONLY España, ir a inicio"
            className="shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A868]"
          >
            <Image
              src="/images/logo-wonly-global-light.webp"
              alt="WONLY"
              width={689}
              height={110}
              priority
              className="h-5 w-auto object-contain sm:h-[22px] md:h-6"
            />
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden h-full items-center gap-1 xl:flex 2xl:gap-2"
          >
            <div
              ref={productsRef}
              className="relative flex h-full items-center"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsProductsOpen(false);
                }
              }}
            >
              <button
                type="button"
                aria-expanded={isProductsOpen}
                aria-controls="products-menu"
                onClick={() => setIsProductsOpen((open) => !open)}
                className="flex h-full items-center gap-1.5 px-3 text-sm font-medium tracking-[0.01em] text-white transition hover:text-[#D4A868] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#D4A868]"
              >
                Productos
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform motion-reduce:transition-none ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id="products-menu"
                className={`absolute left-1/2 top-full ${
                  SHOW_INTERIOR_PRODUCTS ? "w-[680px]" : "w-[360px]"
                } -translate-x-1/2 overflow-hidden rounded-b-3xl border border-white/[0.14] bg-[rgba(13,12,10,.80)] text-white shadow-[0_28px_80px_rgba(0,0,0,.44)] backdrop-blur-2xl backdrop-saturate-[1.15] transition duration-200 motion-reduce:transition-none ${
                  isProductsOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div
                  className={`grid ${
                    SHOW_INTERIOR_PRODUCTS ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  <ProductMenuColumn
                    icon={ShieldCheck}
                    title="Seguridad y exterior"
                    links={securityLinks}
                    bordered={SHOW_INTERIOR_PRODUCTS}
                    onNavigate={() => setIsProductsOpen(false)}
                  />
                  {SHOW_INTERIOR_PRODUCTS && (
                    <ProductMenuColumn
                      icon={HomeIcon}
                      title="Interior y mobiliario"
                      links={interiorLinks}
                      onNavigate={() => setIsProductsOpen(false)}
                    />
                  )}
                </div>
                <Link
                  href="/contacto"
                  onClick={() => setIsProductsOpen(false)}
                  className="flex items-center justify-between border-t border-white/10 bg-black/20 px-7 py-4 text-sm text-zinc-300 transition hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#D4A868]"
                >
                  ¿Necesitas ayuda para elegir?
                  <span className="font-semibold text-[#D4A868]">
                    Solicitar asesoramiento
                  </span>
                </Link>
              </div>
            </div>

            {primaryLinks.map((link) => (
              <HeaderLink
                key={link.href}
                {...link}
                active={pathname.startsWith(link.href)}
              />
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <MarketTicker />

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              aria-label="Buscar en WONLY"
              className={`grid h-10 w-10 place-items-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A868] ${headerControlClass}`}
            >
              <Search size={19} aria-hidden="true" />
            </button>

            <div className="hidden xl:block">
              <LanguageSwitcher variant="desktop" />
            </div>

            <Link
              href="/contacto"
              className="hidden min-h-10 items-center justify-center rounded-full bg-[#D4A868] px-5 text-xs font-semibold tracking-[0.04em] text-[#221f20] transition hover:bg-[#D4A868] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:flex"
            >
              <span className="xl:hidden">Contacto</span>
              <span className="hidden xl:inline">Solicitar asesoramiento</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className={`grid h-10 w-10 place-items-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A868] xl:hidden ${headerControlClass}`}
            >
              {isMobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div id="google_translate_element" className="hidden" aria-hidden="true" />

        {isMounted &&
          createPortal(
            <div
              ref={mobileMenuRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              className={`fixed inset-0 z-[60] overflow-y-auto bg-[rgba(9,9,8,.84)] px-5 pb-10 backdrop-blur-2xl backdrop-saturate-[1.15] transition duration-300 motion-reduce:transition-none xl:hidden ${
                isMobileMenuOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-3 opacity-0"
              }`}
            >
              <div className="mx-auto flex h-[72px] max-w-xl items-center justify-between border-b border-white/10">
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Cerrar menú"
                  className="order-2 grid h-10 w-10 place-items-center rounded-full border border-white/[0.14] bg-white/[0.06] text-white transition hover:bg-white/[0.12] hover:text-[#D4A868] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A868] motion-reduce:transition-none"
                >
                  <X size={22} aria-hidden="true" />
                </button>
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  aria-label="WONLY España, ir a inicio"
                  className="order-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A868]"
                >
                  <Image
                    src="/images/logo-wonly-global-light.webp"
                    alt="WONLY"
                    width={689}
                    height={110}
                    className="h-5 w-auto object-contain"
                  />
                </Link>
              </div>

              <div className="mx-auto flex max-w-xl flex-col pt-6">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A868]">
              Seguridad y exterior
            </p>
            <div className="flex flex-col border-y border-white/10">
              <Suspense
                fallback={securityLinks.map((link) => (
                  <MobileLink
                    key={link.href}
                    {...link}
                    close={closeMobileMenu}
                    active={false}
                  />
                ))}
              >
                <MobileSecurityLinks
                  pathname={pathname}
                  close={closeMobileMenu}
                />
              </Suspense>
            </div>

            {SHOW_INTERIOR_PRODUCTS && (
              <>
                <p className="mb-5 mt-9 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A868]">
                  Interior
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {interiorLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-sm font-medium text-zinc-300 transition hover:border-[#D4A868]/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A868]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </>
            )}

            <div className="mt-9 flex flex-col border-y border-white/10">
              {primaryLinks.map((link) => (
                <MobileLink
                  key={link.href}
                  {...link}
                  close={closeMobileMenu}
                  active={pathname.startsWith(link.href)}
                />
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <MarketTicker mobile />
              <div className="flex items-center gap-2 border-t border-white/10 pt-4">
                <Globe size={16} className="text-[#D4A868]" aria-hidden="true" />
                <LanguageSwitcher variant="mobile" />
              </div>
            </div>

            <Link
              href="/contacto"
              onClick={closeMobileMenu}
              className="mt-6 flex min-h-14 items-center justify-center rounded-full bg-[#D4A868] px-7 text-sm font-semibold tracking-[0.06em] text-[#221f20] transition hover:bg-[#D4A868] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Solicitar asesoramiento
            </Link>
              </div>
            </div>,
            document.body,
          )}
      </header>

      {isSearchOpen && (
        <SearchOverlay open onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}

function MarketTicker({ mobile = false }) {
  const accessibilityLabel =
    "Cotización de Wangli en la Bolsa de Shanghái: código 605268, 9,74 yuanes, subida del 2,10 por ciento";

  if (mobile) {
    return (
      <div
        role="group"
        aria-label={accessibilityLabel}
        className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 pb-4 text-xs"
      >
        <span className="flex items-center gap-2 font-bold uppercase tracking-[0.14em] text-zinc-300">
          <Activity size={13} className="text-[#D4A868]" aria-hidden="true" />
          SSE: 605268
        </span>
        <span className="font-mono font-semibold tabular-nums text-white">
          ¥9,74
        </span>
        <span className="font-mono font-semibold tabular-nums text-emerald-400">
          <span aria-hidden="true">↗ </span>+2,10%
        </span>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={accessibilityLabel}
      className="hidden h-10 shrink-0 items-center gap-2.5 rounded-full border border-white/[0.14] bg-black/25 px-3 text-[10px] font-semibold tracking-[0.03em] text-zinc-200 backdrop-blur-md xl:flex 2xl:gap-3 2xl:px-4 2xl:text-[11px]"
    >
      <Activity size={14} className="text-[#D4A868]" aria-hidden="true" />
      <span className="whitespace-nowrap">SSE: 605268</span>
      <span className="h-4 w-px bg-white/15" aria-hidden="true" />
      <span className="font-mono tabular-nums text-white">¥9,74</span>
      <span className="whitespace-nowrap font-mono tabular-nums text-emerald-400">
        <span aria-hidden="true">↗ </span>+2,10%
      </span>
    </div>
  );
}

function HeaderLink({ href, label, active }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative px-3 py-2 text-sm font-medium tracking-[0.01em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A868] ${
        active
          ? "text-[#D4A868] after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:bg-[#D4A868]"
          : "text-white hover:text-[#D4A868]"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileSecurityLinks({ pathname, close }) {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.toString();

  return securityLinks.map((link) => {
    const [linkPath, linkQuery = ""] = link.href.split("?");
    const normalizedLinkQuery = new URLSearchParams(linkQuery).toString();

    return (
      <MobileLink
        key={link.href}
        {...link}
        close={close}
        active={
          pathname === linkPath && currentSearch === normalizedLinkQuery
        }
      />
    );
  });
}

function ProductMenuColumn({
  icon: Icon,
  title,
  links,
  bordered = false,
  onNavigate,
}) {
  return (
    <div
      className={`p-7 ${
        bordered ? "border-r border-white/10 bg-white/[0.035]" : ""
      }`}
    >
      <div className="mb-6 flex items-center gap-2 text-[#D4A868]">
        <Icon size={18} aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-[0.18em]">{title}</p>
      </div>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A868]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileLink({ href, label, close, active }) {
  return (
    <Link
      href={href}
      onClick={close}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-14 items-center justify-between border-b border-white/10 py-3 text-xl font-semibold last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A868] ${
        active ? "text-[#D4A868]" : "text-white"
      }`}
    >
      {label}
      <span aria-hidden="true" className="text-zinc-600">
        ↗
      </span>
    </Link>
  );
}
