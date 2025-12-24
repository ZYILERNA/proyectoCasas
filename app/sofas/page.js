// app/sofas/page.js
import Link from 'next/link';
import { sofas } from '@/data/sofaList';

export default function SofasPage() {
  return (
    <div className="bg-white pb-20">
      
      {/* 1. CABECERA DE SECCIÓN (Estilo Dimoldura) */}
      <div className="relative w-full h-[40vh] bg-gray-900 overflow-hidden">
        {/* IMAGEN DE FONDO DE LA SECCIÓN */}
        {/* Guarda una foto apaisada en public/images/sofa-header.jpg */}
        <div className="absolute inset-0">
           <img 
             src="/images/sofa-header.jpg" 
             alt="Cabecera Sofás" 
             className="w-full h-full object-cover opacity-60"
           />
           <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* TÍTULO */}
        <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-widest mb-4">
            Sofás
          </h1>
          <p className="text-gray-200 text-lg max-w-xl font-light">
            Confort y diseño unidos en nuestra colección exclusiva de tapicería.
          </p>
        </div>
      </div>

      {/* 2. BARRA DE FILTROS (Simulada) */}
      <div className="border-b border-gray-200 sticky top-20 bg-white z-40">
        <div className="container mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto py-6">
            {/* Botón Activo */}
            <button className="text-black font-bold uppercase text-xs tracking-widest border-b-2 border-black pb-1">
              Todos
            </button>
            {/* Botones Inactivos */}
            <button className="text-gray-500 hover:text-black font-medium uppercase text-xs tracking-widest whitespace-nowrap">
              Modulares
            </button>
            <button className="text-gray-500 hover:text-black font-medium uppercase text-xs tracking-widest whitespace-nowrap">
              Chaise Longue
            </button>
            <button className="text-gray-500 hover:text-black font-medium uppercase text-xs tracking-widest whitespace-nowrap">
              Butacas
            </button>
            <button className="text-gray-500 hover:text-black font-medium uppercase text-xs tracking-widest whitespace-nowrap">
              Sofá Cama
            </button>
          </div>
        </div>
      </div>

      {/* 3. REJILLA DE PRODUCTOS */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          
          {sofas.map((sofa) => (
            <Link href={`/sofas/${sofa.id}`} key={sofa.id} className="group cursor-pointer">
              
              {/* IMAGEN CARD */}
              <div className="aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative">
                {/* Si no hay imagen real, mostramos un gris elegante */}
                {sofa.image ? (
                  <img 
                    src={sofa.image} 
                    alt={sofa.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Sin Foto</div>
                )}
                
                {/* Efecto Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>

              {/* TEXTOS */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {sofa.category}
                </span>
                <h3 className="text-xl font-medium text-gray-900 group-hover:text-black transition-colors">
                  {sofa.name}
                </h3>
                <span className="text-xs text-black border-b border-black w-max pb-0.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest">
                  Ver Detalles
                </span>
              </div>

            </Link>
          ))}

        </div>
      </div>

    </div>
  );
}