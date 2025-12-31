// components/Header.js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, ChevronDown, X } from 'lucide-react'; // Añadimos 'X' para cerrar

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil

  // 1. Lógica Smart Hide (Ocultar al bajar, mostrar al subir)
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Si el menú móvil está abierto, NO ocultamos el header
      if (isMobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Bajando > Ocultar
        setIsVisible(false);
      } else {
        // Subiendo > Mostrar
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isMobileMenuOpen]);

  // Función para abrir/cerrar menú y evitar scroll en el body
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Bloquear scroll del fondo si está abierto (opcional, mejora UX)
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    // Header fijo con animación de transform
    <header 
      className={`fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-white/10 shadow-lg transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between relative">
        
        {/* 1. LOGOTIPO */}
        <div className="cursor-pointer z-50">
          <Link href="/" onClick={closeMobileMenu}>
            <img 
              src="/images/logo-wonly.png" 
              alt="WONLY" 
              className="h-8 md:h-10 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* 2. MENÚ DE ESCRITORIO (Hidden en Mobile) */}
        <nav className="hidden md:flex h-full items-center space-x-10">
          {/* ... (Mismo código de escritorio anterior) ... */}
          <div className="group h-full flex items-center relative cursor-pointer">
            <span className="text-sm font-bold uppercase tracking-wide flex items-center gap-1 hover:text-[#00C2FF] transition">
              Productos <ChevronDown size={14} />
            </span>
            <div className="absolute top-full -left-6 w-72 bg-[#1a1a1a] text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-2xl border-t border-[#00C2FF] rounded-none">
              <div className="p-8 flex flex-col gap-6 text-left">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                    Catálogo
                  </h3>
                  <ul className="space-y-3">
                    <MenuItem href="/puertas" text="Puertas" />
                    <MenuItem href="/sofas" text="Sofás" />
                    <MenuItem href="/mesas-centro" text="Mesas de Centro" />
                    <MenuItem href="/mesas-comedor" text="Mesas de Comedor" />
                    <MenuItem href="/sillas" text="Sillas y Sillones" />
                    <MenuItem href="/dormitorio" text="Dormitorio" />
                    <MenuItem href="/almacenaje" text="Armarios y Almacenaje" />
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link href="/empresa" className="text-sm font-medium hover:text-[#00C2FF] uppercase tracking-wide transition">
            Empresa
          </Link>
          <Link href="/proyectos" className="text-sm font-medium hover:text-[#00C2FF] uppercase tracking-wide transition">
            Proyectos
          </Link>
        </nav>

        {/* 3. ICONOS Y BOTÓN */}
        <div className="flex items-center gap-6 z-50">
          <Search className="w-5 h-5 text-white cursor-pointer hover:text-[#00C2FF] transition" />
          
          <Link href="/contacto" className="hidden md:block bg-[#00C2FF] text-black px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white transition duration-300 rounded-none">
            Contacto
          </Link>

          {/* BOTÓN HAMBURGUESA / CERRAR (Solo Móvil) */}
          <button 
            className="md:hidden text-white hover:text-[#00C2FF] transition focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* =========================================
          4. MENÚ MÓVIL DESPLEGABLE
         ========================================= */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-black border-t border-white/10 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'h-[calc(100vh-80px)] opacity-100 visible' : 'h-0 opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col p-8 gap-8 pb-20">
          
          {/* SECCIÓN 1: PRINCIPAL */}
          <div className="flex flex-col gap-4">
            <Link 
              href="/puertas" 
              onClick={closeMobileMenu}
              className="text-2xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF]"
            >
              Puertas
            </Link>
            <Link 
              href="/empresa" 
              onClick={closeMobileMenu}
              className="text-2xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF]"
            >
              Empresa
            </Link>
            <Link 
              href="/proyectos" 
              onClick={closeMobileMenu}
              className="text-2xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF]"
            >
              Proyectos
            </Link>
          </div>

          <hr className="border-white/10" />

          {/* SECCIÓN 2: OTROS PRODUCTOS (Lista más pequeña) */}
          <div>
            <h3 className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-4">
              Más Productos
            </h3>
            <ul className="flex flex-col gap-3 pl-2 border-l border-white/10">
              <MobileMenuItem href="/sofas" text="Sofás" close={closeMobileMenu} />
              <MobileMenuItem href="/mesas-centro" text="Mesas de Centro" close={closeMobileMenu} />
              <MobileMenuItem href="/mesas-comedor" text="Mesas de Comedor" close={closeMobileMenu} />
              <MobileMenuItem href="/sillas" text="Sillas y Sillones" close={closeMobileMenu} />
              <MobileMenuItem href="/dormitorio" text="Dormitorio" close={closeMobileMenu} />
              <MobileMenuItem href="/almacenaje" text="Armarios" close={closeMobileMenu} />
            </ul>
          </div>

          {/* SECCIÓN 3: BOTÓN CONTACTO EN MÓVIL */}
          <div className="mt-4">
            <Link 
              href="/contacto" 
              onClick={closeMobileMenu}
              className="block w-full text-center bg-[#00C2FF] text-black py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition rounded-none"
            >
              Contactar Ahora
            </Link>
          </div>

        </div>
      </div>

    </header>
  );
}

// Subcomponente para items de escritorio
function MenuItem({ text, href }) {
  return (
    <li>
      <Link href={href} className="block text-lg font-medium hover:text-[#00C2FF] transition-colors">
        {text}
      </Link>
    </li>
  );
}

// Subcomponente para items móvil
function MobileMenuItem({ text, href, close }) {
  return (
    <li>
      <Link 
        href={href} 
        onClick={close}
        className="block text-lg text-gray-400 hover:text-white transition-colors"
      >
        {text}
      </Link>
    </li>
  );
}