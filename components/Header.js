// components/Header.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Menu,
  ChevronDown,
  X,
  ShieldCheck,
  Home as HomeIcon,
  Activity
} from "lucide-react";
import StockTicker from "./StockTicker";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smart Hide Navbar
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (isMobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b border-white/5 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        lastScrollY > 20
          ? "bg-black/90 backdrop-blur-md"
          : "bg-black"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between relative">
        {/* LOGO */}
        <div className="cursor-pointer z-50">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="block transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/images/logo-wonly.png"
              alt="WONLY"
              width={160}
              height={40}
              className="h-8 md:h-10 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex h-full items-center space-x-10">
          <div className="group h-full flex items-center relative cursor-pointer">
            <span className="text-sm font-semibold uppercase tracking-widest flex items-center gap-1.5 text-gray-200 hover:text-[#00C2FF] transition-colors duration-300">
              Productos
              <ChevronDown
                size={14}
                className="group-hover:rotate-180 transition-transform duration-300"
              />
            </span>

            {/* MEGA MENU */}
            <div className="absolute top-[80px] -left-32 w-[600px] bg-[#0a0a0a]/95 backdrop-blur-xl text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-2xl border border-white/10 rounded-b-2xl overflow-hidden flex">
              {/* Seguridad */}
              <div className="flex-1 p-8 bg-[#111]/50 border-r border-white/5">
                <div className="flex items-center gap-2 mb-6 text-[#00C2FF]">
                  <ShieldCheck size={18} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">
                    Seguridad & Exterior
                  </h3>
                </div>

                <ul className="space-y-4">
                  <MenuItem href="/puertas" text="Puertas de Seguridad" />
                  <MenuItem href="/ventanas" text="Ventanas Panorámicas" />
                  <MenuItem
                    href="/cerraduras"
                    text="Cerraduras Inteligentes"
                  />
                </ul>
              </div>

              {/* Interior */}
              <div className="flex-1 p-8">
                <div className="flex items-center gap-2 mb-6 text-gray-400">
                  <HomeIcon size={18} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">
                    Interior & Mobiliario
                  </h3>
                </div>

                <ul className="space-y-4">
                  <MenuItem href="/sofas" text="Colección Sofás" />
                  <MenuItem href="/mesas" text="Mesas de Diseño" />
                  <MenuItem href="/sillas" text="Sillas y Sillones" />
                  <MenuItem href="/dormitorios" text="Dormitorios" />
                  <MenuItem href="/gabinetes" text="Sistemas de Gabinetes" />
                </ul>
              </div>
            </div>
          </div>

          <Link
            href="/empresa"
            className="relative text-sm font-semibold text-gray-200 uppercase tracking-widest hover:text-[#00C2FF] transition-colors duration-300 group"
          >
            Empresa
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00C2FF] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            href="/proyectos"
            className="relative text-sm font-semibold text-gray-200 uppercase tracking-widest hover:text-[#00C2FF] transition-colors duration-300 group"
          >
            Proyectos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00C2FF] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* ICONS & DESKTOP TICKER */}
        <div className="flex items-center gap-4 md:gap-6 z-50">
          
          {/* Ticker Desktop (Oculto en móvil) */}
          <div className="hidden lg:block">
            <StockTicker />
          </div>

          <button className="group p-2" aria-label="Buscar">
            <Search className="w-5 h-5 text-gray-300 group-hover:text-[#00C2FF] group-hover:scale-110 transition-all duration-300" aria-hidden="true" />
          </button>

          <Link
            href="/contacto"
            className="hidden md:flex items-center justify-center bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#00C2FF] hover:text-white transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,194,255,0.3)]"
          >
            Contacto
          </Link>

          <button
            className="md:hidden text-gray-300 hover:text-[#00C2FF] transition-colors focus:outline-none p-2"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl border-t border-white/10 flex flex-col pt-24 overflow-y-auto transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-8"
        }`}
      >
        <div className="flex flex-col px-8 pb-20 gap-10">
          
          {/* TICKER EN MÓVIL (Nuevo bloque destacado) */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <Activity size={12} className="text-[#00C2FF]" /> Mercado Shanghai
              </span>
              <span className="text-[10px] text-[#00C2FF] font-mono font-bold animate-pulse">LIVE</span>
            </div>
            {/* Ocultamos el 'hidden md:flex' interno del StockTicker forzando display flex aquí */}
            <div className="flex items-center">
               <StockTicker />
            </div>
          </div>

          {/* Links Principales */}
          <div className="flex flex-col gap-6">
            <Link
              href="/puertas"
              onClick={closeMobileMenu}
              className="text-3xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF]"
            >
              Puertas
            </Link>

            <Link
              href="/ventanas"
              onClick={closeMobileMenu}
              className="text-3xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF]"
            >
              Ventanas
            </Link>

            <Link
              href="/cerraduras"
              onClick={closeMobileMenu}
              className="text-3xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF]"
            >
              Cerraduras
            </Link>

            <Link
              href="/empresa"
              onClick={closeMobileMenu}
              className="text-3xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF]"
            >
              Empresa
            </Link>

            <Link
              href="/proyectos"
              onClick={closeMobileMenu}
              className="text-3xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF]"
            >
              Proyectos
            </Link>
          </div>

          <hr className="border-white/10" />

          {/* Submenú Interior */}
          <div>
            <h3 className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-6 flex items-center gap-2">
              <HomeIcon size={14} /> Interior & Mobiliario
            </h3>

            <ul className="flex flex-col gap-4 pl-4 border-l border-white/10">
              <MobileMenuItem
                href="/sofas"
                text="Sofás"
                close={closeMobileMenu}
              />
              <MobileMenuItem
                href="/mesas"
                text="Mesas"
                close={closeMobileMenu}
              />
              <MobileMenuItem
                href="/sillas"
                text="Sillas y Sillones"
                close={closeMobileMenu}
              />
              <MobileMenuItem
                href="/dormitorios"
                text="Dormitorios"
                close={closeMobileMenu}
              />
              <MobileMenuItem
                href="/gabinetes"
                text="Gabinetes"
                close={closeMobileMenu}
              />
            </ul>
          </div>

          {/* Botón de Contacto */}
          <div className="mt-4 pb-10">
            <Link
              href="/contacto"
              onClick={closeMobileMenu}
              className="flex items-center justify-center w-full bg-[#00C2FF] text-black py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-full shadow-[0_0_20px_rgba(0,194,255,0.2)]"
            >
              Contactar Ahora
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// SUBCOMPONENTES
function MenuItem({ text, href }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
      >
        <span className="w-0 h-px bg-[#00C2FF] mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
        {text}
      </Link>
    </li>
  );
}

function MobileMenuItem({ text, href, close }) {
  return (
    <li>
      <Link
        href={href}
        onClick={close}
        className="block text-xl font-medium text-gray-400 hover:text-white transition-colors"
      >
        {text}
      </Link>
    </li>
  );
}