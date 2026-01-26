"use client";
import React from 'react';
import Header from '../../components/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Award, Cpu, Globe, Plane } from 'lucide-react';

// --- 1. DATOS PROYECTOS CHINA ---
const chinaProjects = [
  {
    title: "Sede de los Juegos Asiáticos - Hangzhou",
    category: "Deportes / Infraestructura",
    description: "Infraestructura y gestión de seguridad para la sede principal de los Juegos Asiáticos de Hangzhou.",
    image: "/images/PROYECTOS/hangzhou-games.jpg"
  },
  {
    title: "Cumbre del G20 - Hangzhou",
    category: "Gubernamental / Eventos",
    description: "Proveedores de seguridad para uno de los eventos diplomáticos más importantes del mundo.",
    image: "/images/PROYECTOS/g20.jpg" 
  },
  {
    title: "Centro Nacional de Natación",
    category: "Deportes / Instalaciones",
    description: "Gestión y sistemas de seguridad en el Centro Nacional de Natación para competiciones internacionales.",
    image: "/images/PROYECTOS/natacion-nacional.jpg"
  },
  {
    title: "Villa de los Juegos Nacionales - Tianjin",
    category: "Deportes / Infraestructura",
    description: "Soporte y control de seguridad en la Villa de los Juegos Nacionales durante el evento deportivo.",
    image: "/images/PROYECTOS/villa-juegos-tianjin.jpg"
  },
  {
    title: "Viviendas del Ministerio Central",
    category: "Gubernamental / Residencial",
    description: "Gestión integral de seguridad en complejos residenciales destinados a personal del Ministerio Central.",
    image: "/images/PROYECTOS/viviendas-ministerio-central.jpg"
  }, 
  {
    title: "Centro de Lanzamiento de Satélites de Xichang",
    category: "Aeroespacial / Infraestructura",
    description: "Sistemas avanzados de seguridad y control en el Centro de Lanzamiento de Satélites de Xichang.",
    image: "/images/PROYECTOS/xichang-satellite.jpg"
  },
  {
    title: "Salón de Conferencias de la Calidad de China",
    category: "Gubernamental / Conferencias",
    description: "Soluciones de seguridad y control para el Salón de Conferencias de la Calidad de China.",
    image: "/images/PROYECTOS/salon-calidad-china.jpg"
  },
  {
    title: "Puerto de la Innovación",
    category: "Infraestructura / Tecnología",
    description: "Gestión y sistemas de seguridad en el Puerto de la Innovación como núcleo tecnológico y logístico.",
    image: "/images/PROYECTOS/puerto-innovacion.jpg"
  },
  {
    title: "Aeropuerto Internacional de Pekín-Daxing",
    category: "Transporte / Infraestructura",
    description: "Sistemas integrales de seguridad y control en el Aeropuerto Internacional de Pekín-Daxing.",
    image: "/images/PROYECTOS/aeropuerto-daxing.jpg"
  },
];

// --- 2. DATOS PROYECTOS INTERNACIONALES ---
const internationalProjects = [
    {
    title: "Estadio Nacional de Senegal",
    location: "Dakar, Senegal",
    category: "Deportes / Infraestructura",
    description: "Sistemas de seguridad y control de accesos en el Estadio Nacional de Senegal para eventos deportivos internacionales.",
    image: "/images/PROYECTOS/estadio-senegal.jpg"
    },
    {
    title: "Escuelas Modelo en Irak",
    location: "Irak",
    category: "Educación / Infraestructura",
    description: "Gestión de seguridad y control en la construcción de escuelas modelo para impulsar la educación en Irak.",
    image: "/images/PROYECTOS/escuelas-irak.jpg"
    },
    {
    title: "CBD de la Nueva Capital Administrativa - Egipto",
    location: "Egipto",
    category: "Infraestructura / Negocios",
    description: "Sistemas de seguridad y gestión integral en el Distrito Central de Negocios de la Nueva Capital Administrativa.",
    image: "/images/PROYECTOS/cbd-egipto.jpg"
    },
    {
    title: "Proyecto de Apartamentos - Sri Lanka",
    location: "Sri Lanka",
    category: "Residencial / Infraestructura",
    description: "Gestión de seguridad y control de accesos en el proyecto de apartamentos de alta gama en Sri Lanka.",
    image: "/images/PROYECTOS/apartamentos-srilanka.jpg"
    },
    {
    title: "Zona FOH - Torre Crescent, Egipto",
    location: "Egipto",
    category: "Infraestructura / Comercial",
    description: "Sistemas de seguridad y control de accesos en la zona FOH de la Torre Crescent en Egipto.",
    image: "/images/PROYECTOS/foh-torre-crescent.jpg"
    },
    {
    title: "Palacio Presidencial - Togo",
    location: "Togo",
    category: "Gubernamental / Seguridad",
    description: "Gestión de asistencia y sistemas de seguridad en el Palacio Presidencial de Togo.",
    image: "/images/PROYECTOS/palacio-togo.jpg"
    },
    {
    title: "Escuela Secundaria Naxtong - Vientián, Laos",
    location: "Laos",
    category: "Educación / Infraestructura",
    description: "Gestión de asistencia y sistemas de seguridad en la Escuela Secundaria Naxtong en Vientián, Laos.",
    image: "/images/PROYECTOS/escuela-naxtong-laos.jpg"
    },
    {
    title: "Asistencia Presidencial - Vanuatu",
    location: "Vanuatu",
    category: "Gubernamental / Seguridad",
    description: "Gestión de asistencia y sistemas de seguridad para la Presidencia en Vanuatu.",
    image: "/images/PROYECTOS/asistencia-presidencial-vanuatu.jpg"
    },

];

const stats = [
  { id: 1, number: "5", label: "Bases Globales de I+D", sub: "Múnich, Shanghái, Shenzhen, Hangzhou, Yongkang" },
  { id: 2, number: "400+", label: "Ingenieros de I+D", sub: "Expertos en seguridad e IA" },
  { id: 3, number: "1000+", label: "Patentes Nacionales", sub: "Líderes en propiedad intelectual" },
  { id: 4, number: "99.8%", label: "Tasa de Aprobación", sub: "En líneas de producción SMT inteligente" },
];

export default function ProyectosPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-[#00C2FF] selection:text-black">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Ingeniería que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-blue-600">Protege el Mundo</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Desde aeropuertos internacionales hasta residencias de lujo. Descubre por qué 
            las infraestructuras más críticas confían en la tecnología WONLY.
          </motion.p>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10 blur-3xl" />
      </section>

      {/* 2. PROYECTOS CHINA (REDISEÑADO CON ESTILO INTERNACIONAL) */}
      <section className="py-10 px-6">
        <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-white/20 flex-1"></div>
                <h2 className="text-2xl font-bold uppercase tracking-widest text-[#00C2FF]">Proyectos Destacados en China</h2>
                <div className="h-px bg-white/20 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {chinaProjects.map((project, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    // --- NUEVO ESTILO DE TARJETA (Igual que International) ---
                    className="bg-[#111] rounded-xl overflow-hidden border border-white/10 hover:border-[#00C2FF] transition-colors group"
                >
                    {/* Contenedor Imagen + Overlay Título */}
                    <div className="h-52 overflow-hidden relative">
                         {/* Overlay Oscuro que desaparece al hover */}
                         <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                         
                         <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                         
                         {/* Gradiente inferior con Título y Ubicación */}
                         <div className="absolute bottom-0 left-0 w-full p-4 z-20 bg-gradient-to-t from-black to-transparent">
                            <div className="flex items-center gap-2 text-[#00C2FF] text-xs font-bold uppercase mb-1">
                                <MapPin size={12} />
                                CHINA
                            </div>
                            <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
                         </div>
                    </div>

                    {/* Contenedor Descripción + Categoría */}
                    <div className="p-6">
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                            {project.description}
                        </p>
                        <span className="text-xs text-white/50 border border-white/20 px-2 py-1 rounded inline-block">
                            {project.category}
                        </span>
                    </div>
                </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. SECCIÓN PROYECTOS INTERNACIONALES */}
      <section className="py-20 bg-[#080808] border-t border-white/5 relative overflow-hidden">
          {/* Fondo sutil para diferenciar la sección */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10">
              {/* Encabezado descriptivo */}
              <div className="text-center max-w-4xl mx-auto mb-16">
                  <div className="inline-flex items-center gap-2 text-[#00C2FF] mb-4">
                    <Globe size={20} />
                    <span className="uppercase tracking-widest text-sm font-bold">Presencia Global</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Proyectos Internacionales</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    WONLY ha participado ampliamente en la construcción de diversos proyectos internacionales 
                    de ayuda y comerciales, tales como <span className="text-white font-semibold">escuelas, hospitales, hoteles, apartamentos, estadios y edificios de oficinas</span>, 
                    distribuidos por <span className="text-[#00C2FF]">Asia, África y América</span>.
                  </p>
              </div>

              {/* Grid Internacional */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {internationalProjects.map((project, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-[#111] rounded-xl overflow-hidden border border-white/10 hover:border-[#00C2FF] transition-colors group"
                    >
                        <div className="h-52 overflow-hidden relative">
                             {/* Overlay oscuro */}
                             <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                             <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                             
                             <div className="absolute bottom-0 left-0 w-full p-4 z-20 bg-gradient-to-t from-black to-transparent">
                                <div className="flex items-center gap-2 text-[#00C2FF] text-xs font-bold uppercase mb-1">
                                    <MapPin size={12} />
                                    {project.location}
                                </div>
                                <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
                             </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                            <span className="text-xs text-white/50 border border-white/20 px-2 py-1 rounded inline-block">
                                {project.category}
                            </span>
                        </div>
                    </motion.div>
                ))}
              </div>
          </div>
      </section>

      {/* 4. SECCIÓN DE I+D */}
      <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Texto */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Potencia Global de <span className="text-[#00C2FF]">I+D</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Con 5 bases estratégicas en <strong>Múnich (Alemania), Shanghái, Hangzhou, Shenzhen y Yongkang</strong>. 
                        Nuestra tecnología ha sido galardonada con el premio <em>Red Dot: Best of the Best</em> y el <em>iF Design Award</em>.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat) => (
                            <div key={stat.id} className="bg-[#151515] p-6 rounded-xl border border-white/5">
                                <h4 className="text-4xl font-bold text-white mb-1">{stat.number}</h4>
                                <p className="text-[#00C2FF] font-bold text-sm uppercase mb-2">{stat.label}</p>
                                <p className="text-xs text-gray-500">{stat.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Imagen decorativa / Mapa */}
                <div className="relative h-[500px] bg-[#111] rounded-2xl border border-white/10 overflow-hidden p-8 flex flex-col justify-center items-center text-center">
                     <MapPin className="w-16 h-16 text-[#00C2FF] mb-4" />
                     <h3 className="text-2xl font-bold mb-2">Base de I+D Alemania</h3>
                     <p className="text-gray-500 max-w-md">
                         Nuestros centros colaboran globalmente para integrar diseño alemán y tecnología de fabricación inteligente.
                     </p>
                     
                     <div className="mt-12 flex flex-wrap gap-4 justify-center opacity-50">
                        <div className="border border-white/20 px-4 py-2 rounded text-xs uppercase">RedDot 2019</div>
                        <div className="border border-white/20 px-4 py-2 rounded text-xs uppercase">iF Design 2020</div>
                        <div className="border border-white/20 px-4 py-2 rounded text-xs uppercase">Certificación CE</div>
                     </div>
                </div>
            </div>
          </div>
      </section>

      {/* 5. FABRICACIÓN INTELIGENTE */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Fabricación Inteligente 4.0</h2>
            <p className="text-gray-400">Automatización avanzada para garantizar precisión milimétrica.</p>
        </div>
        
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-[#00C2FF] transition duration-300">
                <Cpu className="w-10 h-10 text-[#00C2FF] mb-6" />
                <h3 className="text-xl font-bold mb-3">Robots KUKA & SMT</h3>
                <p className="text-gray-400 text-sm">Líneas de producción digitales capaces de cambiar entre cientos de referencias automáticamente.</p>
            </div>
            <div className="bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-[#00C2FF] transition duration-300">
                <Award className="w-10 h-10 text-[#00C2FF] mb-6" />
                <h3 className="text-xl font-bold mb-3">Calidad Certificada</h3>
                <p className="text-gray-400 text-sm">Sistemas de visión CCD y escaneo láser para inspeccionar cada milímetro del producto terminado.</p>
            </div>
            <div className="bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-[#00C2FF] transition duration-300">
                <Globe className="w-10 h-10 text-[#00C2FF] mb-6" />
                <h3 className="text-xl font-bold mb-3">Logística AS/RS</h3>
                <p className="text-gray-400 text-sm">Sistema inteligente de almacenamiento y recuperación automática que optimiza el espacio.</p>
            </div>
        </div>
      </section>

      {/* 6. FOOTER VISUAL */}
      <section className="relative py-24 border-t border-white/10 overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#00C2FF] blur-[150px] rounded-full mix-blend-screen"/>
         </div>
         
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">El Futuro de la Seguridad</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
              Contáctanos para recibir asesoramiento técnico personalizado y catálogos exclusivos.
            </p>
            <Link 
            href="/contacto" 
            className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#00C2FF] hover:text-white transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-[#00C2FF]/50">
               CONTACTAR CON VENTAS
            </Link>
         </div>
      </section>

    </main>
  );
}