// app/page.js
import Link from 'next/link';
// SOLUCIÓN: Renombramos 'Home' a 'HomeIcon' en la importación para evitar el conflicto
import { ShieldCheck, Lock, Home as HomeIcon, ChevronRight } from 'lucide-react'; 

export default function Home() {
  return (
    <main className="bg-black text-white selection:bg-[#00C2FF] selection:text-black">
      
      {/* =========================================
          1. HERO SECTION: MARCA Y SEGURIDAD
         ========================================= */}
      <section className="relative w-full h-screen flex items-center">
        
        {/* FONDO: Imagen del Robot */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-robot.jpg" 
            alt="WONLY Technology" 
            className="w-full h-full object-cover object-top opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        </div>
        
        {/* CONTENIDO TEXTO */}
        <div className="relative z-10 container mx-auto px-6 mt-20">
          <span className="text-[#00C2FF] font-bold tracking-[0.3em] uppercase text-sm md:text-base animate-fade-in">
            Tecnología & Seguridad S.L.
          </span>
          <h1 className="text-5xl md:text-8xl font-bold mt-4 mb-6 leading-tight max-w-4xl">
            EL FUTURO <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              ES SEGURO
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 font-light border-l-2 border-[#00C2FF] pl-6">
            Especialistas en puertas de seguridad, cerraduras inteligentes y blindaje de alta tecnología. Protegemos lo que más importa.
          </p>
          
          <div className="flex gap-4">
            <Link 
              href="/puertas" 
              className="bg-[#00C2FF] text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition duration-300"
            >
              Ver Puertas
            </Link>
            <Link 
              href="/contacto" 
              className="border border-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition duration-300"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>


      {/* =========================================
          2. SECCIÓN PRIORITARIA: PUERTAS SMART
         ========================================= */}
      <section className="py-24 bg-[#111]">
        <div className="container mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-[#00C2FF] font-bold tracking-widest uppercase mb-2">Nuestro Enfoque Principal</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white">SEGURIDAD INTELIGENTE</h3>
            </div>
            <Link href="/puertas" className="group flex items-center gap-2 text-gray-400 hover:text-white transition">
              Ver catálogo completo <ChevronRight className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>

          {/* GRID DE CATEGORÍAS DE PUERTAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CARD 1: SMART (Destacada) */}
            <Link href="/puertas?cat=smart" className="group relative h-[500px] overflow-hidden bg-gray-900 border border-white/10 hover:border-[#00C2FF] transition-colors duration-500">
              <img src="/images/puerta-smart.jpg" alt="Smart Door" className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <ShieldCheck className="text-[#00C2FF] w-10 h-10 mb-4" />
                <h4 className="text-2xl font-bold uppercase mb-2">Puertas Inteligentes</h4>
                <p className="text-gray-400 text-sm">Acceso biométrico, control por app y máxima tecnología.</p>
              </div>
            </Link>

            {/* CARD 2: ACORAZADAS */}
            <Link href="/puertas?cat=acorazada" className="group relative h-[500px] overflow-hidden bg-gray-900 border border-white/10 hover:border-white transition-colors">
              <img src="/images/cat-03.jpg" alt="Acorazada" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <Lock className="text-white w-10 h-10 mb-4" />
                <h4 className="text-2xl font-bold uppercase mb-2">Acorazadas</h4>
                <p className="text-gray-400 text-sm">Resistencia de grado militar y acero reforzado.</p>
              </div>
            </Link>

            {/* CARD 3: TÉCNICAS / OTRAS */}
            <Link href="/puertas" className="group relative h-[500px] overflow-hidden bg-gray-900 border border-white/10 hover:border-white transition-colors">
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#1a1a1a] p-8 text-center group-hover:bg-[#222] transition-colors">
                <div className="border border-white/20 rounded-full p-6 mb-6 group-hover:border-[#00C2FF] transition-colors">
                   <span className="text-3xl font-light text-white">+10</span>
                </div>
                <h4 className="text-xl font-bold uppercase mb-2">Colecciones Especiales</h4>
                <p className="text-gray-400 text-sm mb-6">Cortafuegos, Médicas, Aluminio y más.</p>
                <span className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest border-b border-[#00C2FF] pb-1">Descargar Catálogo</span>
              </div>
            </Link>

          </div>
        </div>
      </section>


      {/* =========================================
          3. SECCIÓN SECUNDARIA: SOFÁS Y HOGAR
         ========================================= */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#1a1a1a]/50 -skew-x-12 transform translate-x-1/4 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* TEXTO */}
            <div>
              <span className="text-gray-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                Interior & Confort
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                DISEÑO PARA <br/> TU HOGAR
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Más allá de la seguridad, creamos espacios únicos. Descubre nuestra exclusiva línea de sofás modulares y mobiliario de alta gama, diseñados para el confort absoluto.
              </p>
              
              <div className="flex flex-col gap-4">
                <Link href="/sofas" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center text-white group-hover:bg-[#00C2FF] group-hover:text-black transition-colors">
                    {/* USAMOS EL ICONO RENOMBRADO AQUÍ */}
                    <HomeIcon size={20}/>
                  </div>
                  <div>
                    <h5 className="text-white font-bold uppercase text-sm">Colección de Sofás</h5>
                    <span className="text-gray-500 text-xs">Modelos modulares, piel y tela</span>
                  </div>
                </Link>
                
                <Link href="/mesas" className="flex items-center gap-4 group">
                   <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <span className="font-serif italic">M</span>
                  </div>
                  <div>
                    <h5 className="text-white font-bold uppercase text-sm">Mesas y Sillas</h5>
                    <span className="text-gray-500 text-xs">Comedor y centro</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* IMAGEN GRANDE */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-800 border border-white/10 p-2">
                 <img 
                   src="/images/sofa-home.jpg" 
                   alt="Sofá WONLY" 
                   className="w-full h-full object-cover"
                 />
              </div>
              {/* Cuadro decorativo flotante */}
              <div className="absolute -bottom-6 -left-6 bg-[#00C2FF] text-black p-6 w-48 hidden md:block">
                 <p className="font-bold text-2xl mb-1">2025</p>
                 <p className="text-xs font-bold uppercase tracking-widest">Nueva Colección</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          4. BANNER FINAL DE CONTACTO
         ========================================= */}
      <section className="py-20 bg-[#00C2FF]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-black text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8">
            ¿Tienes un proyecto en mente?
          </h2>
          <Link 
            href="/contacto" 
            className="inline-block bg-black text-white px-10 py-5 font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 shadow-2xl"
          >
            Hablemos
          </Link>
        </div>
      </section>

    </main>
  );
}