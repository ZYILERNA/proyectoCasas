import Hero from '@/components/Hero';
import Carousel from '@/components/Carousel'; // <--- Importamos el carrusel

export default function Home() {
  return (
    <main>
      
      {/* 1. PORTADA PRINCIPAL */}
      <Hero />

      {/* 2. CARRUSEL DE IMÁGENES (Sustituye al producto del mes) */}
      <section className="bg-white">
        {/* Título pequeño decorativo antes del carrusel */}
        <div className="py-12 text-center">
           <h3 className="text-xl font-light text-gray-500 uppercase tracking-widest">
             Descubre nuestro mundo
           </h3>
        </div>
        
        {/* El componente Carrusel */}
        <Carousel />
      </section>

      {/* Espacio extra antes del footer */}
      <div className="h-20 bg-white"></div>

    </main>
  );
}