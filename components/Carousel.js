// components/Carousel.js
"use client"; // Importante para animaciones
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel() {
  // Configuración de las diapositivas
  const slides = [
    {
      id: 1,
      image: "/images/slide1.jpg", 
      title: "Espacios que inspiran",
      subtitle: "NUEVA COLECCIÓN DE PUERTAS"
    },
    {
      id: 2,
      image: "/images/slide2.jpg",
      title: "Detalles Técnicos",
      subtitle: "CALIDAD CERTIFICADA"
    },
    {
      id: 3,
      image: "/images/slide3.jpg",
      title: "Diseño Sostenible",
      subtitle: "MADERA RESPONSABLE"
    }
  ];

  const [current, setCurrent] = useState(0);

  // Cambio automático cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full h-[600px] bg-gray-100 overflow-hidden group">
      
      {/* IMAGEN DE FONDO */}
      <div 
        className="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${slides[current].image})` }}
      >
        {/* Capa oscura para que se lea el texto (si no hay foto se ve gris oscuro) */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* TEXTO DEL SLIDER */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-4 animate-fade-in-up">
          {slides[current].subtitle}
        </h3>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
          {slides[current].title}
        </h2>
      </div>

      {/* FLECHAS (Solo aparecen al pasar el ratón) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={30} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={30} />
      </button>

      {/* PUNTITOS INDICADORES */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div 
            key={index}
            onClick={() => setCurrent(index)}
            className={`cursor-pointer w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </div>
  );
}