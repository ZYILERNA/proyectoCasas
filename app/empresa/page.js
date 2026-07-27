'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Globe2, 
  Award, 
  TrendingUp, 
  Users2, 
  Factory,
  Cpu,
  Scan,
  Warehouse,
  Paintbrush,
  Bot,
  ShieldCheck,
  MapPin,
  Star
} from 'lucide-react';
import Link from 'next/link';

// Datos de la sección de Fabricación
const factoryModules = [
  {
    title: "Línea Digital de Puertas de Seguridad",
    desc: "Inversión millonaria para una línea capaz de cambiar entre cientos de referencias (SKUs) automáticamente. Aumenta la capacidad en un 300% y mejora la precisión eliminando el trabajo manual.",
    icon: <Bot size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/security-line.webp", 
    stats: "+300% Capacidad"
  },
  {
    title: "Centro de Inspección IA",
    desc: "Sistema visual CCD y escaneo láser para detectar par de torsión y espacios. Los datos se sincronizan con sistemas SCADA y ERP para evitar cualquier error humano en el control de calidad.",
    icon: <Scan size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/inspection.webp",
    stats: "Cero Errores"
  },
  {
    title: "Línea SMT de Cerraduras",
    desc: "Producción electrónica de vanguardia con una capacidad mensual superior al millón de unidades. Integra I+D y fabricación con una tasa de aprobación del 99,8%.",
    icon: <Cpu size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/smt.webp",
    stats: "99.8% Aprobación"
  },
  {
    title: "Almacenamiento Automático (AS/RS)",
    desc: "Sistema logístico inteligente que gestiona el almacenamiento y recuperación, aumentando el aprovechamiento del espacio en 3.6 veces y acelerando los envíos.",
    icon: <Warehouse size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/storage.webp",
    stats: "3.6x Eficiencia"
  },
  {
    title: "Fabricación de Puertas de Madera",
    desc: "Base de producción en Sichuan con tecnología 3 años por delante del sector. Automatización completa para mejorar la calidad de acabados y reducir costes laborales.",
    icon: <Factory size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/wood-line.webp",
    stats: "Tecnología Líder"
  },
  {
    title: "Recubrimiento Inteligente",
    desc: "Línea de pintura con inversión de 70M de yuanes. Aumenta la tasa de aplicación de polvo al 80-90%, optimizando la durabilidad y el acabado estético del producto.",
    icon: <Paintbrush size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/coating.webp",
    stats: "90% Eficiencia"
  }
];

const EmpresaPage = () => {
  return (
    <div className="bg-[#050505] text-white overflow-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/COMPANY/wonlyblue.webp" 
            alt="WONLY Headquarters" 
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-[#050505]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded border border-[#00C2FF]/30 bg-[#00C2FF]/10 text-[#00C2FF] text-xs font-mono mb-4 tracking-widest backdrop-blur-md">
              EST. 1996 // GRUPO WANGLI · SSE 605268
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Liderazgo a <br/>
              <span className="block mt-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-white">
                Escala Global
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Integrando I+D, diseño, fabricación y servicios. Proveedor integral de hogares inteligentes para más de 200 millones de usuarios.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CINTA DE DATOS CLAVE */}
      <section className="border-y border-white/10 bg-[#0A0A0A] relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <TrendingUp size={22} />, value: "1996", label: "Año de Fundación" },
              { icon: <Users2 size={22} />, value: "200M+", label: "Usuarios Globales" },
              { icon: <Factory size={22} />, value: "5", label: "Bases de Producción" },
              { icon: <Award size={22} />, value: "1.000+", label: "Patentes Nacionales" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center py-10 px-4 border-white/10 lg:border-l lg:first:border-l-0"
              >
                <div className="text-[#00C2FF] mb-3">{s.icon}</div>
                <span className="text-3xl md:text-4xl font-bold font-mono text-white">{s.value}</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 mt-2">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 3. PERFIL CORPORATIVO & IPO (BENTO GRID PROFESIONAL) */}
      <section className="py-24 container mx-auto px-6 relative">
        {/* Decoración de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C2FF] opacity-[0.02] blur-[100px] rounded-full pointer-events-none"/>

        <div className="mb-12">
           <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00C2FF] mb-4">Perfil Corporativo</span>
           <h2 className="text-3xl md:text-4xl font-bold mb-4">El Poder de la <span className="text-[#00C2FF]">Integración</span></h2>
           <p className="text-gray-400 max-w-2xl">
             Pioneros desde 1996. Operamos 5 grandes bases de producción en China estableciendo los más altos estándares de calidad, diseño y tecnología del sector.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* =========================================================
              BLOQUE PRINCIPAL: IPO CELEBRATION (Span 8)
             ========================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-8 bg-[#111] border border-white/10 rounded-2xl overflow-hidden relative group min-h-[400px] md:min-h-[500px]"
          >
             <img 
              src="/images/COMPANY/ipo-celebration.webp" 
              alt="Salida a bolsa del grupo Wangli Security en 2021"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-60 group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent p-8 md:p-12 flex flex-col justify-end">
                <div className="flex gap-3 mb-4">
                  <span className="bg-[#00C2FF] text-black text-xs font-bold px-3 py-1 rounded shadow-lg">
                    24 FEB 2021
                  </span>
                  <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded">
                    SSE: 605268
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
                  Grupo industrial cotizado
                </h3>
                <p className="text-gray-300 font-medium text-base md:text-lg max-w-2xl leading-relaxed">
                  Wangli Security &amp; Surveillance Product Co., Ltd., sociedad industrial del grupo de origen de la marca, cotiza en el mercado principal de Shanghái con el código 605268.
                </p>
             </div>
          </motion.div>

          {/* =========================================================
              BLOQUE SECUNDARIO: CAPACIDAD DE PRODUCCIÓN (Span 4)
             ========================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 lg:col-span-4 flex flex-col gap-6"
          >
            {/* Tarjeta de Capacidades */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 flex-1 group hover:border-white/20 transition-colors">
               <div className="flex items-center justify-between mb-6">
                 <h4 className="text-xl font-bold">Producción Anual</h4>
                 <Factory className="text-[#00C2FF] opacity-50" size={24}/>
               </div>
               
               <ul className="space-y-5">
                 <li className="flex flex-col border-b border-white/5 pb-3">
                   <span className="text-gray-400 text-sm mb-1">Puertas de Acero / Seguridad</span>
                   <span className="font-mono text-2xl font-bold text-white">6,000,000+</span>
                 </li>
                 <li className="flex flex-col border-b border-white/5 pb-3">
                   <span className="text-gray-400 text-sm mb-1">Cerraduras Inteligentes</span>
                   <span className="font-mono text-2xl font-bold text-white">3,000,000+</span>
                 </li>
                 <li className="flex flex-col">
                   <span className="text-gray-400 text-sm mb-1">Puertas de Madera</span>
                   <span className="font-mono text-2xl font-bold text-white">3,000,000+</span>
                 </li>
               </ul>
            </div>
          </motion.div>

          {/* =========================================================
              FILA INFERIOR: PROYECTOS Y PATENTES
             ========================================================= */}
          
          {/* Tarjeta Proyectos Clave (Span 8) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 lg:col-span-8 bg-gradient-to-r from-[#111] to-[#0A0A0A] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
             <div>
               <h4 className="text-lg text-[#00C2FF] font-bold mb-2 tracking-wide uppercase text-sm">Confianza Gubernamental e Institucional</h4>
               <h3 className="text-2xl font-bold text-white mb-2">Proyectos Nacionales de Referencia</h3>
               <p className="text-gray-400 text-sm max-w-md">Elegidos sistemáticamente para asegurar infraestructuras críticas y eventos de talla mundial.</p>
             </div>
             
             <div className="flex flex-wrap gap-3">
               <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium">Cumbre G20 Hangzhou</span>
               <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium">Juegos Asiáticos</span>
               <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium">Aeropuerto Beijing Daxing</span>
               <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium">Ministerio Central</span>
             </div>
          </motion.div>

          {/* Tarjeta Patentes (Span 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-1 lg:col-span-4 bg-[#111] border border-[#00C2FF]/20 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center"
          >
             <div className="absolute -right-6 -bottom-6 opacity-10">
               <ShieldCheck size={120} className="text-[#00C2FF]"/>
             </div>
             <h4 className="text-5xl font-mono font-bold text-white mb-2">1,000+</h4>
             <p className="text-lg font-bold text-[#00C2FF] mb-1">Patentes Nacionales</p>
             <p className="text-gray-400 text-sm">Liderando la industria con más de 300 patentes de invención tecnológica directa.</p>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          VÍDEOS CORPORATIVOS
         ========================================================================= */}
      <section className="py-20 bg-[#070707] relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00C2FF]/5 blur-[140px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00C2FF] mb-4">
              En Movimiento
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Descubre <span className="text-[#00C2FF]">WONLY</span> en Vídeo
            </h2>
            <p className="text-gray-400 text-lg">
              De la fábrica a tu hogar: la tecnología, la precisión y la tranquilidad que hay detrás de cada producto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: "/images/COMPANY/VIDEOS/fabrica.mp4", poster: "/images/COMPANY/VIDEOS/fabrica-poster.jpg", title: "La Fábrica del Futuro", desc: "Una puerta terminada cada 7,68 segundos. Líneas robotizadas y logística inteligente que producen a gran escala con precisión milimétrica." },
              { src: "/images/COMPANY/VIDEOS/el-secreto.mp4", poster: "/images/COMPANY/VIDEOS/el-secreto-poster.jpg", title: "El Secreto de WONLY", desc: "Soldadura con IA, control de calidad de 74 indicadores y puertas robotizadas inteligentes: la tecnología que confían más de 200 millones de usuarios." },
              { src: "/images/COMPANY/VIDEOS/tranquilidad.mp4", poster: "/images/COMPANY/VIDEOS/tranquilidad-poster.jpg", title: "Hecho para tu Tranquilidad", desc: "Artesanía, tecnología propia y obsesión por el detalle con un único propósito: proteger a tu familia y darte verdadera tranquilidad." },
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00C2FF]/50 transition-colors duration-300"
              >
                <div className="aspect-video w-full bg-black overflow-hidden">
                  <video
                    src={video.src}
                    poster={video.poster}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    Tu navegador no soporta la reproducción de vídeo.
                  </video>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00C2FF] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{video.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FABRICACIÓN INTELIGENTE
         ========================================================================= */}
      <section className="py-20 bg-[#0A0A0A] relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center max-w-4xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#00C2FF] mb-4">Industria 4.0</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Fabricación <span className="text-[#00C2FF]">Inteligente</span></h2>
            <p className="text-gray-400 text-lg mb-8">
              Nuestra Base de Changtian fue reconocida en 2021 como la primera "Fábrica del Futuro" del sector. Integramos robótica y datos para garantizar cero errores y máxima eficiencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {factoryModules.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-[#00C2FF]/50 transition-colors duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 text-xs font-bold text-[#00C2FF] rounded border border-[#00C2FF]/20">
                    {item.stats}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#00C2FF]/10 rounded-lg">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* =========================================================
          5. SECCIÓN I+D GLOBAL (RED DE BASES)
         ========================================================= */}
      <section className="py-24 bg-[#050505] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* IZQUIERDA: Texto Descriptivo */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-[#00C2FF]"></div>
                  <span className="text-[#00C2FF] font-bold tracking-widest text-sm uppercase">Innovación Constante</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                5 Bases de I+D y <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                  6 Centros de Desarrollo
                </span>
              </h2>
              
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Fieles a nuestra estrategia de "Investigar una generación, usar una generación, reservar múltiples generaciones".
                Con un equipo de <span className="font-bold text-white">más de 400 investigadores</span>, invertimos cientos de millones anualmente para liderar las tendencias globales en hogares inteligentes y seguridad.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                  {["Yongkang", "Wuyi", "Sichuan", "Hangzhou", "Hubei"].map((city) => (
                    <span key={city} className="px-4 py-2 bg-[#111] border border-white/10 rounded-full text-sm text-gray-300 flex items-center gap-2">
                      <MapPin size={14} className="text-[#00C2FF]"/> {city}
                    </span>
                  ))}
              </div>
            </motion.div>

            {/* DERECHA: GRID DE LAS BASES */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-3 md:gap-4"
            >
              <div className="relative group overflow-hidden rounded-xl aspect-square border border-white/10">
                <img src="/images/COMPANY/FACTORY/rd-central.webp" alt="Sede Central" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm py-2 px-3">
                  <span className="text-white text-xs md:text-sm font-medium">Sede Central</span>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-xl aspect-square border border-white/10">
                <img src="/images/COMPANY/FACTORY/rd-shanghai.webp" alt="Shanghái" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm py-2 px-3">
                  <span className="text-white text-xs md:text-sm font-medium">Shanghái</span>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-xl aspect-square border border-white/10">
                <img src="/images/COMPANY/FACTORY/rd-hangzhou.webp" alt="Hangzhou" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm py-2 px-3">
                  <span className="text-white text-xs md:text-sm font-medium">Hangzhou</span>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-xl aspect-square border border-white/10">
                <img src="/images/COMPANY/FACTORY/rd-shenzhen.webp" alt="Shenzhen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm py-2 px-3">
                  <span className="text-white text-xs md:text-sm font-medium">Shenzhen</span>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-xl col-span-2 h-48 border border-white/10">
                <img src="/images/COMPANY/FACTORY/rd-germany.webp" alt="Alemania" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm py-3 px-4 flex justify-between items-center">
                  <span className="text-white text-sm md:text-base font-bold">Base de I+D de Múnich, Alemania</span>
                  <Star size={16} className="text-[#00C2FF]"/>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          6. SECCIÓN HISTORIA: LÍNEA DE TIEMPO
         ========================================================= */}
      <section className="py-24 bg-[#111] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00C2FF] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"/>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Hitos que redefinen <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-white">
                los Estándares
              </span>
            </motion.h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#00C2FF]/50 to-transparent md:-translate-x-1/2"></div>

            {[
              { year: "1996", title: "Fundación de la Marca", desc: "Nace WONLY, iniciando una trayectoria de innovación en seguridad." },
              { year: "1998", title: "Cerradura Automática", desc: "Invención de la cerradura automática multidireccional." },
              { year: "2003", title: "Desafío del Rey de la Cerradura", desc: "Lanzamiento del reto con premio de hasta 1 millón. Nunca abierto en más de 20 años." },
              { year: "2015", title: "Súper Seguridad", desc: "Tecnología de triple aislamiento acústico y térmico." },
              { year: "2019", title: "Puertas con IA", desc: "Lanzamiento global de la primera puerta de seguridad robótica impulsada por Inteligencia Artificial." },
              { year: "2021", title: "Salida a Bolsa", desc: "Wangli Security & Surveillance Product Co., Ltd. comienza a cotizar en el mercado principal de Shanghái con el código 605268." },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-16 md:mb-24 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden md:block w-1/2" />
                <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-[#00C2FF] rounded-full border-4 border-black shadow-[0_0_15px_rgba(0,194,255,0.8)] z-10 md:-translate-x-1/2 transform -translate-x-1/2 mt-1.5 md:mt-0"></div>

                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
                   <div className={`flex flex-col ${index % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}>
                      <span className="text-5xl md:text-6xl font-bold text-white/10 mb-2 font-mono tracking-tighter">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00C2FF] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
                        {item.desc}
                      </p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          7. PREMIOS Y CERTIFICACIONES (DISEÑO FUTURISTA / ESPACIAL)
         ========================================================= */}
      <section className="relative py-24 md:py-32 bg-[#020617] overflow-hidden border-t border-white/10">
        
        {/* FONDO ESPACIAL Y ROBOT */}
        <div className="absolute inset-0 z-0">
         <img 
          src="images/hero-robot.webp" 
          alt="WONLY Robot Security" 
          className="w-full h-full object-cover opacity-100"
          style={{ objectPosition: "center 0%" }}
        />
          {/* Degradado para asegurar que el texto sea legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"></div>
          
          {/* NUEVO: Degradado inferior oscuro para fusionar con la siguiente sección */}
          <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#011425] to-transparent z-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
          
          <div className="w-full lg:w-3/5 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Liderazgo Nacional en <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-white">
                  Ventas de Seguridad Inteligente
                </span>
              </h2>
              
              <div className="space-y-6 mb-16 border-l-2 border-[#00C2FF] pl-6">
                <div>
                  <p className="text-white font-bold text-xl md:text-2xl mb-1">200 Millones+ de Usuarios Globales</p>
                  <p className="text-gray-400 text-sm">Servicio acumulado durante más de 30 años de excelencia.</p>
                </div>
                
                <div>
                  <p className="text-white font-bold text-xl md:text-2xl mb-1">Grupo industrial cotizado</p>
                  <p className="text-gray-400 text-sm font-mono">Wangli Security · SSE 605268</p>
                </div>
              </div>

              {/* LOS 4 LOGOS DE CERTIFICACIÓN */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-12">
                {[
                  { img: "cert-ga.webp", title: "Norma GA", sub: "Seguridad Pública" },
                  { img: "cert-gb.webp", title: "Estándar GB", sub: "Norma Nacional" },
                  { img: "cert-if.webp", title: "iF Design", sub: "Design Award 2020" },
                  { img: "cert-reddot.webp", title: "Red Dot", sub: "Best of the Best" }
                ].map((cert, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group">
                    <div className="h-16 md:h-20 aspect-square flex items-center justify-center bg-white p-2 md:p-3 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-300">
                      <img src={`/images/COMPANY/LOGO/${cert.img}`} alt={cert.title} className="h-full w-auto object-contain"/>
                    </div>
                    <div className="text-center text-white hidden sm:block">
                      <p className="text-xs font-bold">{cert.title}</p>
                      <p className="text-[9px] text-gray-400">{cert.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>

          <div className="hidden lg:block w-2/5"></div>
        </div>
      </section>

      {/* =========================================================
          SEPARADOR VISUAL PARA DAR RESPIRO ENTRE SECCIONES
         ========================================================= */}
      <div className="w-full bg-[#011425] py-8 flex justify-center items-center relative z-20">
         <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/30 to-transparent"></div>
      </div>

      {/* =========================================================
          8. TOP 500 ASIAN BRANDS (Diseño Ciudad)
         ========================================================= */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center lg:justify-end overflow-hidden bg-[#011425]">
        
        {/* FONDO DE CIUDAD CON EL 500 DORADO */}
        <div className="absolute inset-0 z-0">
          {/* NUEVO: Degradado superior para suavizar la entrada de la imagen */}
          <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#011425] to-transparent z-10 pointer-events-none"></div>
          
          <img 
            src="/images/COMPANY/wonly500final.webp" 
            alt="Top 500 Asian Brands - WONLY" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#011425]/90 lg:from-transparent via-[#011425]/40 lg:via-transparent to-[#011425]/90 lg:to-[#011425]/80"></div>
        </div>

        {/* CONTENEDOR DE TEXTO Y DATOS */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-24 lg:pb-0 lg:justify-center items-center lg:items-end text-center lg:text-right">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] leading-tight tracking-wide">
              Top 500 Marcas <br className="hidden md:block"/> de Asia
            </h2>
            <p className="text-xl md:text-3xl text-[#E5B869] font-bold mb-2 drop-shadow-md tracking-wider">
              Reconocimiento corporativo del grupo Wangli
            </p>
            <p className="text-lg md:text-xl text-white/90 mb-10 drop-shadow-md font-light">
              Líder indiscutible de la industria por <span className="font-bold text-white">14 años consecutivos</span>
            </p>

            {/* Panel de Estadísticas CORREGIDO */}
            <div className="flex flex-wrap justify-center lg:justify-end items-center gap-6 md:gap-10 mt-8">
              
              {/* Dato 1: 200M Usuarios */}
              <div className="flex flex-col items-center lg:items-end">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">200</span>
                  <span className="text-xl text-white font-bold drop-shadow-lg">M+</span>
                </div>
                <span className="text-[10px] md:text-xs text-gray-300 uppercase tracking-widest mt-1">Usuarios Globales</span>
              </div>

              <div className="w-px h-10 bg-white/30 hidden md:block"></div>

              {/* Dato 2: 50M Familias */}
              <div className="flex flex-col items-center lg:items-end">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">50</span>
                  <span className="text-xl text-white font-bold drop-shadow-lg">M+</span>
                </div>
                <span className="text-[10px] md:text-xs text-gray-300 uppercase tracking-widest mt-1">Hogares Equipados</span>
              </div>

              <div className="w-px h-10 bg-white/30 hidden md:block"></div>

              {/* Dato 3: 10k Redes */}
              <div className="flex flex-col items-center lg:items-end">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">10,000</span>
                  <span className="text-xl text-white font-bold drop-shadow-lg">+</span>
                </div>
                <span className="text-[10px] md:text-xs text-gray-300 uppercase tracking-widest mt-1">Puntos de Venta</span>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
      {/* =========================================================
          9. PROVEEDOR TOP 500 REAL ESTATE (GRID LOGOS)
         ========================================================= */}
      <section className="relative py-24 lg:py-32 min-h-[80vh] flex items-center overflow-hidden bg-[#011425]">
        {/* FONDO EDIFICIOS */}
        <div className="absolute inset-0 z-0">
          {/* Degradado superior para fusionar con la sección anterior */}
          <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#011425] to-transparent z-10 pointer-events-none"></div>
          
          <img 
            src="/images/COMPANY/skyland.webp" // CAMBIA ESTO POR LA RUTA DE TU IMAGEN DE LOS EDIFICIOS
            alt="Real Estate Partners WONLY" 
            className="w-full h-full object-cover object-center"
          />
          
          {/* Degradado oscuro a la izquierda para leer el texto, y tenue a la derecha */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#011425]/95 via-[#011425]/80 to-[#011425]/20 z-0"></div>
          
          {/* Degradado inferior para fusionar con el Footer (que es bg-[#111]) */}
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#111] to-transparent z-10 pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* ==========================================
                TEXTO IZQUIERDA (Adaptación del original)
                ========================================== */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Reconocido por <br/>
                <span className="text-[#00C2FF]">12 años consecutivos</span> <br/>
                como Proveedor Preferido
              </h2>
              
              <p className="text-xl md:text-2xl text-white font-bold mb-4 drop-shadow-md">
                Top 500 del Sector Inmobiliario en China
              </p>
              
              <div className="w-12 h-1 bg-[#00C2FF] mb-6"></div>
              
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                De las 30 principales empresas inmobiliarias, <span className="font-bold text-white">WONLY colabora activamente con 29</span>.
              </p>
              
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                El grupo industrial mantiene colaboraciones de largo plazo con promotores como Greentown, Sunac y Vanke para desarrollar soluciones de seguridad destinadas a proyectos residenciales.
              </p>
            </motion.div>

            {/* ==========================================
                GRID LOGOS DERECHA (Huecos exactos)
                ========================================== */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              {/* Contenedor tipo cristal para agrupar los logos */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-2xl">
                
                {/* Grid exacto de 4 columnas */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3">
                  
                  {/* Generamos 28 huecos (7 filas x 4 columnas) tal como en tu imagen */}
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-white rounded hover:scale-105 transition-transform duration-300 flex items-center justify-center aspect-[2.5/1] sm:aspect-[2/1] p-2 relative group overflow-hidden shadow-sm"
                    >
                      {/*
                      AQUÍ INSERTARÁS TUS LOGOS REALES. Ejemplo:
                          <img src={`/images/COMPANY/LOGOS/inmobiliaria-${i+1}.webp`} className="max-w-full max-h-full object-contain" alt={`Partner ${i+1}`} /> 
                      */}
                      
                      {/* Texto placeholder temporal - Puedes borrarlo cuando pongas las imágenes */}
                      <img src={`/images/COMPANY/LOGO/partner${i+1}.webp`} className="max-w-full max-h-full object-contain" alt={`Partner ${i+1}`} /> 
                    </div>
                  ))}  
                  
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER CTA
         ========================================================= */}
      <section className="relative py-24 border-t border-white/10 overflow-hidden bg-[#111]">
         <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#00C2FF] blur-[150px] rounded-full mix-blend-screen"/>
         </div>
         
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Únete a la Revolución de la Seguridad</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
              Con más de 10,000 redes de venta y servicio, estamos listos para llevar la tecnología de WONLY a tu próximo gran proyecto.
            </p>
            <Link 
            href="/contacto" 
            className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#00C2FF] hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(0,194,255,0.3)] hover:shadow-[0_0_40px_rgba(0,194,255,0.6)]">
               CONTACTAR CON VENTAS
            </Link>
         </div>
      </section>

    </div>
  );
};

export default EmpresaPage;
