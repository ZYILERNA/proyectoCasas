// components/Header.js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, ChevronDown, X, ShieldCheck, Home as HomeIcon } from 'lucide-react'; 

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  // 1. Lógica Smart Hide (Ocultar al bajar, mostrar al subir)
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

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
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b border-white/5 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${lastScrollY > 20 ? 'bg-black/90 backdrop-blur-md shadow-2xl shadow-black/50' : 'bg-black'}`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between relative">
        
        {/* 1. LOGOTIPO */}
        <div className="cursor-pointer z-50">
          <Link href="/" onClick={closeMobileMenu} className="block transition-transform duration-300 hover:scale-105">
            <img 
              src="/images/logo-wonly.png" 
              alt="WONLY" 
              className="h-8 md:h-10 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* 2. MENÚ DE ESCRITORIO (Hidden en Mobile) */}
        <nav className="hidden md:flex h-full items-center space-x-10">
          
          <div className="group h-full flex items-center relative cursor-pointer">
            <span className="text-sm font-semibold uppercase tracking-widest flex items-center gap-1.5 text-gray-200 hover:text-[#00C2FF] transition-colors duration-300">
              Productos <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </span>
            
            {/* MEGA MENÚ DESPLEGABLE */}
            <div className="absolute top-[80px] -left-32 w-[600px] bg-[#0a0a0a]/95 backdrop-blur-xl text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-2xl border border-white/10 rounded-b-2xl overflow-hidden flex">
              
              {/* Columna 1: Seguridad */}
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
                  <MenuItem href="/cerraduras" text="Cerraduras Inteligentes" />
                </ul>
              </div>

              {/* Columna 2: Interiorismo */}
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

          <Link href="/empresa" className="relative text-sm font-semibold text-gray-200 uppercase tracking-widest hover:text-[#00C2FF] transition-colors duration-300 group">
            Empresa
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00C2FF] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/proyectos" className="relative text-sm font-semibold text-gray-200 uppercase tracking-widest hover:text-[#00C2FF] transition-colors duration-300 group">
            Proyectos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00C2FF] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* 3. ICONOS Y BOTÓN */}
        <div className="flex items-center gap-6 z-50">
          <button className="group p-2">
            <Search className="w-5 h-5 text-gray-300 group-hover:text-[#00C2FF] group-hover:scale-110 transition-all duration-300" />
          </button>
          
          <Link href="/contacto" className="hidden md:flex items-center justify-center bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#00C2FF] hover:text-white transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,194,255,0.3)]">
            Contacto
          </Link>

          {/* BOTÓN HAMBURGUESA / CERRAR (Solo Móvil) */}
          <button 
            className="md:hidden text-gray-300 hover:text-[#00C2FF] transition-colors focus:outline-none p-2"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* =========================================
         4. MENÚ MÓVIL DESPLEGABLE (PANTALLA COMPLETA)
         ========================================= */}
      <div 
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-xl border-t border-white/10 flex flex-col pt-24 overflow-y-auto transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-8'
        }`}
      >
        <div className="flex flex-col px-8 pb-20 gap-10">
          
          {/* SECCIÓN 1: PRINCIPAL */}
          <div className="flex flex-col gap-6">
            <Link href="/puertas" onClick={closeMobileMenu} className="text-3xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF] transition-colors">
              Puertas
            </Link>
            <Link href="/ventanas" onClick={closeMobileMenu} className="text-3xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF] transition-colors">
              Ventanas
            </Link>
            <Link href="/cerraduras" onClick={closeMobileMenu} className="text-3xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF] transition-colors">
              Cerraduras
            </Link>
            <Link href="/empresa" onClick={closeMobileMenu} className="text-3xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF] transition-colors mt-4">
              Empresa
            </Link>
            <Link href="/proyectos" onClick={closeMobileMenu} className="text-3xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF] transition-colors">
              Proyectos
            </Link>
          </div>

          <hr className="border-white/10" />

          {/* SECCIÓN 2: INTERIORISMO */}
          <div>
            <h3 className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-6 flex items-center gap-2">
              <HomeIcon size={14}/> Interior & Mobiliario
            </h3>
            <ul className="flex flex-col gap-4 pl-4 border-l border-white/10">
              <MobileMenuItem href="/sofas" text="Sofás" close={closeMobileMenu} />
              <MobileMenuItem href="/mesas" text="Mesas" close={closeMobileMenu} />
              <MobileMenuItem href="/sillas" text="Sillas y Sillones" close={closeMobileMenu} />
              <MobileMenuItem href="/dormitorios" text="Dormitorios" close={closeMobileMenu} />
              {/* CAMBIO APLICADO AQUÍ */}
              <MobileMenuItem href="/gabinetes" text="Gabinetes" close={closeMobileMenu} />
            </ul>
          </div>

          {/* SECCIÓN 3: BOTÓN CONTACTO EN MÓVIL */}
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

// Subcomponente para items de escritorio
function MenuItem({ text, href }) {
  return (
    <li>
      <Link href={href} className="group flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
        <span className="w-0 h-px bg-[#00C2FF] mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
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
        className="block text-xl font-medium text-gray-400 hover:text-white transition-colors"
      >
        {text}
      </Link>
    </li>
  );
}

"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Menu, ChevronDown, X, ShieldCheck, Home as HomeIcon, ArrowRight } from 'lucide-react'; 

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  
  // --- NUEVOS ESTADOS PARA BUSCADOR ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  // 1. Lógica Smart Hide
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (isMobileMenuOpen || isSearchOpen) {
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

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isMobileMenuOpen, isSearchOpen]);

  // Auto-focus al abrir buscador
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Funciones Buscador
  const openSearch = () => {
    setIsSearchOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b border-white/5 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${lastScrollY > 20 ? 'bg-black/90 backdrop-blur-md shadow-2xl shadow-black/50' : 'bg-black'}`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between relative">
          
          {/* 1. LOGOTIPO */}
          <div className="cursor-pointer z-50">
            <Link href="/" onClick={closeMobileMenu} className="block transition-transform duration-300 hover:scale-105">
              <img 
                src="/images/logo-wonly.png" 
                alt="WONLY" 
                className="h-8 md:h-10 w-auto object-contain" 
              />
            </Link>
          </div>

          {/* 2. MENÚ DE ESCRITORIO */}
          <nav className="hidden md:flex h-full items-center space-x-10">
            <div className="group h-full flex items-center relative cursor-pointer">
              <span className="text-sm font-semibold uppercase tracking-widest flex items-center gap-1.5 text-gray-200 hover:text-[#00C2FF] transition-colors duration-300">
                Productos <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </span>
              
              <div className="absolute top-[80px] -left-32 w-[600px] bg-[#0a0a0a]/95 backdrop-blur-xl text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-2xl border border-white/10 rounded-b-2xl overflow-hidden flex">
                <div className="flex-1 p-8 bg-[#111]/50 border-r border-white/5">
                  <div className="flex items-center gap-2 mb-6 text-[#00C2FF]">
                    <ShieldCheck size={18} />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Seguridad & Exterior</h3>
                  </div>
                  <ul className="space-y-4">
                    <MenuItem href="/puertas" text="Puertas de Seguridad" />
                    <MenuItem href="/ventanas" text="Ventanas Panorámicas" />
                    <MenuItem href="/cerraduras" text="Cerraduras Inteligentes" />
                  </ul>
                </div>
                <div className="flex-1 p-8">
                  <div className="flex items-center gap-2 mb-6 text-gray-400">
                    <HomeIcon size={18} />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Interior & Mobiliario</h3>
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

            <Link href="/empresa" className="relative text-sm font-semibold text-gray-200 uppercase tracking-widest hover:text-[#00C2FF] transition-colors duration-300 group">
              Empresa
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00C2FF] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/proyectos" className="relative text-sm font-semibold text-gray-200 uppercase tracking-widest hover:text-[#00C2FF] transition-colors duration-300 group">
              Proyectos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00C2FF] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* 3. ICONOS Y BOTÓN */}
          <div className="flex items-center gap-6 z-50">
            {/* BOTÓN BUSCADOR (Trigger) */}
            <button onClick={openSearch} className="group p-2">
              <Search className="w-5 h-5 text-gray-300 group-hover:text-[#00C2FF] group-hover:scale-110 transition-all duration-300" />
            </button>
            
            <Link href="/contacto" className="hidden md:flex items-center justify-center bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#00C2FF] hover:text-white transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,194,255,0.3)]">
              Contacto
            </Link>

            <button 
              className="md:hidden text-gray-300 hover:text-[#00C2FF] transition-colors focus:outline-none p-2"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* 4. MENÚ MÓVIL */}
        {/* ... (Tu código actual de menú móvil se mantiene igual) */}
      </header>

      {/* =========================================
           5. OVERLAY DE BÚSQUEDA (MODAL)
           ========================================= */}
      <div 
        className={`fixed inset-0 z-[100] transition-all duration-500 flex items-start justify-center pt-32 px-6 ${
          isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Fondo desenfocado */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          onClick={closeSearch}
        />

        {/* Botón Cerrar Buscador */}
        <button 
          onClick={closeSearch}
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
        >
          <X size={40} strokeWidth={1} />
        </button>

        <div className="relative w-full max-w-4xl transform transition-all duration-500 scale-95 origin-top">
          <div className="flex items-center border-b-2 border-white/10 pb-4 mb-12">
            <Search className="text-[#00C2FF] mr-6 w-8 h-8" />
            <input 
              ref={searchInputRef}
              type="text"
              placeholder="¿Qué estás buscando?"
              className="w-full bg-transparent text-white text-3xl md:text-5xl font-light outline-none placeholder:text-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sugerencias Rápidas / Resultados */}
          <div className="grid md:grid-cols-2 gap-12">
            {searchQuery.length < 2 ? (
              // Sugerencias cuando no hay búsqueda
              <div>
                <p className="text-[#00C2FF] uppercase tracking-[0.2em] text-xs font-bold mb-6">Sugerencias</p>
                <div className="flex flex-wrap gap-3">
                  {['Puertas Blindadas', 'Sofás de Cuero', 'Minimalismo', 'Mesas de Mármol'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-5 py-2 rounded-full border border-white/10 text-white/60 hover:border-[#00C2FF] hover:text-white transition-all text-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Simulación de resultados (Aquí mapearías tus datos de Supabase)
              <div className="col-span-2">
                <p className="text-white/40 text-sm mb-6 uppercase tracking-widest">
                  Resultados para: <span className="text-white">"{searchQuery}"</span>
                </p>
                <div className="grid gap-4">
                   {/* Ejemplo de resultado */}
                   <Link 
                    href="/gabinetes/gabinete-lateral-hygl81518-a" 
                    onClick={closeSearch}
                    className="flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 rounded-2xl group transition-all"
                   >
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-zinc-800 rounded-lg overflow-hidden">
                           <img src="/images/GABINETES/GAB8/render.jpg" className="w-full h-full object-cover" />
                        </div>
                        <div>
                           <h4 className="text-xl font-medium text-white group-hover:text-[#00C2FF] transition-colors">Gabinete HYGL81518-A</h4>
                           <p className="text-white/40 text-sm">Categoría: Sistemas de Gabinetes</p>
                        </div>
                     </div>
                     <ArrowRight className="text-white/20 group-hover:text-[#00C2FF] transition-all transform group-hover:translate-x-2" />
                   </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}