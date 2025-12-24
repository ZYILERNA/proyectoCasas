// components/Header.js
import Link from 'next/link';
import { Search, Menu, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    // CAMBIO: Quitamos la lógica condicional. Ahora es SIEMPRE blanco (bg-white) y texto negro.
    <header className="sticky top-0 z-50 bg-white text-black border-b border-gray-100 shadow-sm transition-all">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* 1. LOGOTIPO */}
        <div className="text-2xl font-bold tracking-tighter uppercase cursor-pointer z-50">
          <Link href="/">Dimoldura</Link>
        </div>

        {/* 2. NAVEGACIÓN CENTRAL */}
        <nav className="hidden md:flex h-full items-center space-x-10">
          
          {/* BOTÓN "PRODUCTOS" CON MENÚ DESPLEGABLE */}
          <div className="group h-full flex items-center relative cursor-pointer">
            <span className="text-sm font-bold uppercase tracking-wide flex items-center gap-1 hover:text-gray-600 transition">
              Productos <ChevronDown size={14} />
            </span>

            {/* --- EL MENÚ OSCURO (Dropdown) --- */}
            {/* Se mantiene oscuro como pediste, para dar contraste y elegancia */}
            <div className="absolute top-full -left-6 w-72 bg-[#1a1a1a] text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-2xl rounded-b-sm">
              <div className="p-8 flex flex-col gap-6 text-left">
                
                {/* Sección 1: POR TIPO */}
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                    Por Tipo:
                  </h3>
                  <ul className="space-y-3">
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

          {/* OTROS ENLACES */}
          <Link href="/empresa" className="text-sm font-medium hover:text-gray-600 uppercase tracking-wide">
            Empresa
          </Link>
          <Link href="/proyectos" className="text-sm font-medium hover:text-gray-600 uppercase tracking-wide">
            Proyectos
          </Link>
        </nav>

        {/* 3. ICONOS (Siempre negros sobre fondo blanco) */}
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 text-black cursor-pointer hover:text-gray-600 transition" />
          
          <Link href="/contacto" className="hidden md:block bg-black text-white px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition">
            Contacto
          </Link>

          <Menu className="w-6 h-6 md:hidden cursor-pointer text-black" />
        </div>

      </div>
    </header>
  );
}

// Componente pequeño para los items de la lista
function MenuItem({ text, href }) {
  return (
    <li>
      <Link href={href} className="block text-lg font-medium hover:text-gray-300 transition-colors">
        {text}
      </Link>
    </li>
  );
}