// components/Header.js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, ChevronDown, X } from 'lucide-react'; 

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
          
          <div className="group h-full flex items-center relative cursor-pointer">
            <span className="text-sm font-bold uppercase tracking-wide flex items-center gap-1 hover:text-[#00C2FF] transition">
              Productos <ChevronDown size={14} />
            </span>
            {/* DESPLEGABLE */}
            <div className="absolute top-full -left-6 w-72 bg-[#1a1a1a] text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-2xl border-t border-[#00C2FF] rounded-none">
              <div className="p-8 flex flex-col gap-6 text-left">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                    Catálogo General
                  </h3>
                  <ul className="space-y-3">
                    <MenuItem href="/puertas" text="Puertas de Seguridad" />
                    <MenuItem href="/ventanas" text="Ventanas" />
                    <MenuItem href="/cerraduras" text="Cerraduras Inteligentes" />
                    
                    <li className="w-full h-px bg-white/10 my-2"></li> {/* Separador */}
                    
                    <MenuItem href="/sofas" text="Sofás" />
                    
                    {/* --- CAMBIO REALIZADO: Unificado en "Mesas" --- */}
                    <MenuItem href="/mesas" text="Mesas" />
                    
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
              href="/ventanas" 
              onClick={closeMobileMenu}
              className="text-2xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF]"
            >
              Ventanas
            </Link>

            <Link 
              href="/cerraduras" 
              onClick={closeMobileMenu}
              className="text-2xl font-bold uppercase tracking-widest text-white hover:text-[#00C2FF]"
            >
              Cerraduras
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

          {/* SECCIÓN 2: OTROS PRODUCTOS */}
          <div>
            <h3 className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-4">
              Hogar y Confort
            </h3>
            <ul className="flex flex-col gap-3 pl-2 border-l border-white/10">
              <MobileMenuItem href="/sofas" text="Sofás" close={closeMobileMenu} />
              
              {/* --- CAMBIO REALIZADO: Unificado en "Mesas" --- */}
              <MobileMenuItem href="/mesas" text="Mesas" close={closeMobileMenu} />
              
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
      <Link href={href} className="block text-sm font-medium hover:text-[#00C2FF] transition-colors">
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