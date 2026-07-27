"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
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
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import StockTicker from "./StockTicker";

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
    href: "/puertas-interior",
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

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const headerRef = useRef(null);
  const productsRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const previousFocusRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const updateHeader = () => {
      tickingRef.current = false;
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - lastScrollYRef.current;
      const headerHasFocus = headerRef.current?.contains(
        document.activeElement,
      );
      const shouldStayVisible =
        reduceMotion ||
        isMobileMenuOpen ||
        isProductsOpen ||
        isSearchOpen ||
        headerHasFocus;

      setIsScrolled(currentY > 16);

      if (shouldStayVisible || currentY < 120 || delta < -8) {
        setIsVisible(true);
      } else if (delta > 10 && currentY > 180) {
        setIsVisible(false);
      }

      lastScrollYRef.current = currentY;
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(updateHeader);
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen, isProductsOpen, isSearchOpen]);

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
      [
        headerRef.current?.querySelector(
          'button[aria-controls="mobile-navigation"]',
        ),
        ...(mobileMenuRef.current?.querySelectorAll(focusableSelector) || []),
      ]
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

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled || isMobileMenuOpen
            ? "border-white/10 bg-black/90 shadow-[0_10px_35px_rgba(0,0,0,.25)] backdrop-blur-xl"
            : "border-white/5 bg-black"
        }`}
      >
        {isHome && !isMobileMenuOpen && (
          <div className="flex h-8 items-center justify-center overflow-hidden bg-cyan-300 px-4 text-black">
            <p className="truncate text-center text-[10px] font-bold uppercase tracking-[0.15em] sm:text-xs">
              Soluciones integrales para sistemas de puertas inteligentes
            </p>
          </div>
        )}

        <div className="container relative z-50 mx-auto flex h-20 items-center justify-between px-6">
          <Link
            href="/"
            onClick={closeMobileMenu}
            aria-label="WONLY España, ir a inicio"
            className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            <Image
              src="/images/logo-wonly.webp"
              alt="WONLY"
              width={160}
              height={40}
              priority
              className="h-8 w-auto object-contain md:h-9"
            />
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden h-full items-center gap-7 lg:flex xl:gap-9"
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
                className="flex h-full items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-200 transition hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                Productos
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id="products-menu"
                className={`absolute left-1/2 top-full w-[680px] -translate-x-1/2 overflow-hidden rounded-b-3xl border border-white/10 bg-[#080808]/95 text-white shadow-2xl backdrop-blur-xl transition duration-200 ${
                  isProductsOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="grid grid-cols-2">
                  <ProductMenuColumn
                    icon={ShieldCheck}
                    title="Seguridad y exterior"
                    links={securityLinks}
                    bordered
                    onNavigate={() => setIsProductsOpen(false)}
                  />
                  <ProductMenuColumn
                    icon={HomeIcon}
                    title="Interior y mobiliario"
                    links={interiorLinks}
                    onNavigate={() => setIsProductsOpen(false)}
                  />
                </div>
                <Link
                  href="/contacto"
                  onClick={() => setIsProductsOpen(false)}
                  className="flex items-center justify-between border-t border-white/10 bg-white/[0.035] px-7 py-4 text-sm text-zinc-300 transition hover:bg-white/[0.07] hover:text-white"
                >
                  ¿Necesitas ayuda para elegir?
                  <span className="font-semibold text-cyan-300">
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
            <div className="hidden 2xl:block">
              <StockTicker />
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              aria-label="Buscar en WONLY"
              className="grid h-11 w-11 place-items-center rounded-full text-zinc-300 transition hover:bg-white/5 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
            >
              <Search size={19} aria-hidden="true" />
            </button>

            <div className="hidden lg:block">
              <LanguageSwitcher variant="desktop" />
            </div>

            <Link
              href="/contacto"
              className="hidden min-h-11 items-center justify-center rounded-full bg-white px-5 text-xs font-bold uppercase tracking-[0.12em] text-black transition hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 xl:flex"
            >
              Contacto
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="grid h-11 w-11 place-items-center rounded-full text-zinc-200 transition hover:bg-white/5 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 lg:hidden"
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
              className={`fixed inset-x-0 bottom-0 top-20 z-[45] overflow-y-auto bg-black/95 px-6 pb-10 pt-6 backdrop-blur-xl transition duration-300 lg:hidden ${
                isMobileMenuOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-3 opacity-0"
              }`}
            >
              <div className="mx-auto flex max-w-xl flex-col">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              Seguridad y exterior
            </p>
            <div className="flex flex-col border-y border-white/10">
              {securityLinks.map((link) => (
                <MobileLink
                  key={link.href}
                  {...link}
                  close={closeMobileMenu}
                  active={pathname === link.href.split("?")[0]}
                />
              ))}
            </div>

            <p className="mb-5 mt-9 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              Interior
            </p>
            <div className="grid grid-cols-2 gap-2">
              {interiorLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-sm font-medium text-zinc-300 transition hover:border-cyan-300/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

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
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                  <Activity size={13} className="text-cyan-300" aria-hidden="true" />
                  Grupo Wangli · SSE
                </span>
                <span className="font-mono text-xs font-semibold text-white">
                  605268
                </span>
              </div>
              <div className="flex items-center gap-2 border-t border-white/10 pt-4">
                <Globe size={16} className="text-cyan-300" aria-hidden="true" />
                <LanguageSwitcher variant="mobile" />
              </div>
            </div>

            <Link
              href="/contacto"
              onClick={closeMobileMenu}
              className="mt-6 flex min-h-14 items-center justify-center rounded-full bg-cyan-300 px-7 text-sm font-bold uppercase tracking-[0.14em] text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
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

function HeaderLink({ href, label, active }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative py-2 text-sm font-semibold uppercase tracking-[0.12em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${
        active ? "text-cyan-300" : "text-zinc-200 hover:text-cyan-300"
      }`}
    >
      {label}
    </Link>
  );
}

function ProductMenuColumn({
  icon: Icon,
  title,
  links,
  bordered = false,
  onNavigate,
}) {
  return (
    <div className={`p-7 ${bordered ? "border-r border-white/10 bg-white/[0.02]" : ""}`}>
      <div className="mb-6 flex items-center gap-2 text-cyan-300">
        <Icon size={18} aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-[0.18em]">{title}</p>
      </div>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
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
      className={`flex min-h-14 items-center justify-between border-b border-white/10 py-3 text-xl font-semibold last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${
        active ? "text-cyan-300" : "text-white"
      }`}
    >
      {label}
      <span aria-hidden="true" className="text-zinc-600">
        ↗
      </span>
    </Link>
  );
}
