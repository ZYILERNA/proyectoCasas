// app/puertas/page.js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { doors } from '@/data/doorList';

export default function DoorsPage() {
  
  // 1. Estados
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("TODAS");
  
  // Estado para la visibilidad de la barra de filtros (Smart Hide)
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 2. Lógica de Scroll (Igual que en el Header)
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Umbral de 100px para empezar a actuar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // BAJANDO: Ocultar barra
        setIsVisible(false);
      } else {
        // SUBIENDO: Mostrar barra
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // 3. Categorías
  const categories = [
    "TODAS",
    "PUERTA DE SEGURIDAD INTELIGENTE",
    "PUERTA DE ENTRADA DE ACERO",
    "PUERTA ACORAZADA",
    "PUERTA DE ALUMINIO FUNDIDO",
    "PUERTA INTERIOR DE MADERA",
    "PUERTA COMERCIAL CORTAFUEGOS",
    "PUERTA MÉDICA",
    "VENTANA DE ALUMINIO",
    "CERRADURA INTELIGENTE",
    "ACCESORIOS DE FERRETERÍA"
  ];

  // 4. Filtrado
  const puertasFiltradas = categoriaSeleccionada === "TODAS" 
    ? doors 
    : doors.filter(door => door.category === categoriaSeleccionada);

  return (
    <div className="bg-white pb-20">
      
      {/* 1. CABECERA (HERO) */}
      <div className="relative w-full h-[50vh] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
           {/* Asegúrate de que esta imagen exista o cámbiala */}
           <img 
             src="/images/header-puertas.jpg" 
             alt="Cabecera Puertas" 
             className="w-full h-full object-cover opacity-60"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-start">
          <span className="text-white/80 uppercase tracking-[0.2em] text-sm mb-2 animate-fade-in">
            Colección 2025
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            PUERTAS
          </h1>
          <p className="text-white text-xl md:text-2xl font-light border-l-4 border-[#00C2FF] pl-6 italic">
            Tecnología y seguridad para tu hogar.
          </p>
        </div>
      </div>

      {/* 2. BARRA DE FILTROS (OPTIMIZADA MÓVIL) 
         - sticky top-[80px]: Se pega justo debajo del header (que mide 80px).
         - transition-transform: Suaviza el movimiento.
         - Si isVisible es false: Lo movemos hacia arriba (-200%) para que salga de la pantalla.
      */}
      <div 
        className={`border-b border-gray-200 sticky top-[80px] bg-white/95 backdrop-blur z-40 shadow-sm transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-[250%]' 
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto py-5 items-center scrollbar-hide">
            
            {categories.map((cat, index) => (
              <button 
                key={index}
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${
                  categoriaSeleccionada === cat
                  ? "text-[#00C2FF] font-bold border-b-2 border-[#00C2FF] pb-1" 
                  : "text-gray-400 hover:text-black font-medium"
                }`}
              >
                {cat}
              </button>
            ))}

          </div>
        </div>
      </div>

      {/* 3. REJILLA DE PRODUCTOS */}
      <div className="container mx-auto px-6 py-16">
        
        {puertasFiltradas.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>No hay productos en esta categoría todavía.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 animate-fade-in-up">
          {puertasFiltradas.map((door) => (
            <Link href={`/puertas/${door.id}`} key={door.id} className="group cursor-pointer block">
              
              {/* IMAGEN */}
              <div className="aspect-[3/4] bg-gray-100 mb-6 overflow-hidden relative">
                <img 
                  src={door.image} 
                  alt={door.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay oscuro al pasar el mouse */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                
                {/* Etiqueta flotante (Opcional, estilo Wonly) */}
                <div className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver Detalles
                </div>
              </div>

              {/* TEXTOS */}
              <div className="flex flex-col gap-1 pr-4">
                <span className="text-[10px] font-bold text-[#00C2FF] uppercase tracking-widest line-clamp-1">
                  {door.category}
                </span>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors leading-tight">
                  {door.name}
                </h3>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}