// components/Hero.js
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative w-full h-[85vh] bg-gray-900">
      
      {/* 1. LA IMAGEN DE FONDO */}
      <div className="absolute inset-0">
        <img 
          src="/images/portrait1.png" 
          alt="Dimoldura Interiors" 
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* --- CAMBIO AQUÍ --- */}
        {/* Hemos subido de bg-black/30 a bg-black/60 para que sea más oscuro */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* ------------------- */}

      </div>

      {/* 2. EL TEXTO CENTRAL */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        
        <span className="text-white text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-6 animate-fade-in-up">
          Nueva Colección 2025
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight max-w-4xl leading-tight">
          Diseño que define <br/> <span className="font-light italic">tu espacio.</span>
        </h1>
        
        <p className="text-gray-200 text-lg md:text-xl max-w-xl mb-10 font-light">
          Muebles creados con pasión por el detalle. Fusionamos artesanía tradicional con estética contemporánea.
        </p>

        {/* Botón de acción */}
        <Link href="/sofas">
          <button className="bg-white text-black px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition duration-500">
            Explorar Catálogo
          </button>
        </Link>
      </div>
    </div>
  );
}