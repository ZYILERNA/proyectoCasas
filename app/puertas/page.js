// app/puertas/page.js
import Link from 'next/link';
import { doors } from '@/data/doorList';

export default function DoorsPage() {
  return (
    <div className="bg-white pb-20">
      
      {/* 1. CABECERA (HERO) */}
      <div className="relative w-full h-[50vh] bg-gray-900 overflow-hidden">
        {/* FOTO DE FONDO */}
        <div className="absolute inset-0">
           {/* Usa una foto impactante de una puerta abierta o un pasillo elegante */}
           <img 
             src="/images/header-puertas.jpg" 
             alt="Cabecera Puertas" 
             className="w-full h-full object-cover opacity-70"
           />
           <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* TÍTULO Y TEXTO */}
        <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-start">
          <span className="text-white/80 uppercase tracking-[0.2em] text-sm mb-2">
            Catálogo General
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            PUERTAS
          </h1>
          {/* Lema extraído de tu imagen subida */}
          <p className="text-white text-xl md:text-2xl font-light border-l-4 border-white pl-6">
            Creando puertas, construyendo hogares.
          </p>
        </div>
      </div>

      {/* 2. FILTROS (Basado en tu menú) */}
      <div className="border-b border-gray-200 sticky top-[80px] bg-white z-40 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto py-6 items-center">
            {/* Botón Activo */}
            <button className="text-black font-bold uppercase text-xs tracking-widest border-b-2 border-black pb-1">
              Todas
            </button>
            
            {/* Categorías extraídas de tu imagen de menú */}
            <button className="text-gray-500 hover:text-black font-medium uppercase text-xs tracking-widest whitespace-nowrap transition-colors">
              Puertas de Interior
            </button>
            <button className="text-gray-500 hover:text-black font-medium uppercase text-xs tracking-widest whitespace-nowrap transition-colors">
              Puertas de Entrada
            </button>
            <button className="text-gray-500 hover:text-black font-medium uppercase text-xs tracking-widest whitespace-nowrap transition-colors">
              Puertas Técnicas
            </button>
            <button className="text-gray-500 hover:text-black font-medium uppercase text-xs tracking-widest whitespace-nowrap transition-colors">
              Molduras
            </button>
            <button className="text-gray-500 hover:text-black font-medium uppercase text-xs tracking-widest whitespace-nowrap transition-colors">
              Accesorios
            </button>
          </div>
        </div>
      </div>

      {/* 3. REJILLA DE PRODUCTOS */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          
          {doors.map((door) => (
            <Link href={`/puertas/${door.id}`} key={door.id} className="group cursor-pointer block">
              
              {/* IMAGEN CARD (Vertical para puertas) */}
              {/* Las puertas suelen ser verticales, así que cambiamos el aspecto a aspect-[3/4] */}
              <div className="aspect-[3/4] bg-gray-100 mb-6 overflow-hidden relative">
                {door.image ? (
                  <img 
                    src={door.image} 
                    alt={door.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                    <span className="text-4xl mb-2">🚪</span>
                    <span className="text-xs uppercase">Sin imagen</span>
                  </div>
                )}
                
                {/* Overlay al pasar el ratón */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* TEXTOS */}
              <div className="flex flex-col gap-1 pr-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  {door.category}
                </span>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors leading-tight">
                  {door.name}
                </h3>
                
                <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                  <span className="h-[1px] w-8 bg-black"></span>
                  <span className="text-xs font-bold uppercase tracking-widest">Ver Ficha</span>
                </div>
              </div>

            </Link>
          ))}

        </div>
      </div>
    </div>
  );
}