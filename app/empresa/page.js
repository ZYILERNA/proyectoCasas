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
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

// Datos de la sección de Fabricación (Extraídos de tus imágenes)
const factoryModules = [
  {
    title: "Línea Digital de Puertas de Seguridad",
    desc: "Inversión millonaria para una línea capaz de cambiar entre cientos de referencias (SKUs) automáticamente. Aumenta la capacidad en un 300% y mejora la precisión eliminando el trabajo manual.",
    icon: <Bot size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/security-line.jpg", 
    stats: "+300% Capacidad"
  },
  {
    title: "Centro de Inspección IA",
    desc: "Sistema visual CCD y escaneo láser para detectar par de torsión y espacios. Los datos se sincronizan con sistemas SCADA y ERP para evitar cualquier error humano en el control de calidad.",
    icon: <Scan size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/inspection.jpg",
    stats: "Cero Errores"
  },
  {
    title: "Línea SMT de Cerraduras",
    desc: "Producción electrónica de vanguardia con una capacidad mensual superior al millón de unidades. Integra I+D y fabricación con una tasa de aprobación del 99,8%.",
    icon: <Cpu size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/smt.jpg",
    stats: "99.8% Aprobación"
  },
  {
    title: "Almacenamiento Automático (AS/RS)",
    desc: "Sistema logístico inteligente que gestiona el almacenamiento y recuperación, aumentando el aprovechamiento del espacio en 3.6 veces y acelerando los envíos.",
    icon: <Warehouse size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/storage.jpg",
    stats: "3.6x Eficiencia"
  },
  {
    title: "Fabricación de Puertas de Madera",
    desc: "Base de producción en Sichuan con tecnología 3 años por delante del sector. Automatización completa para mejorar la calidad de acabados y reducir costes laborales.",
    icon: <Factory size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/wood-line.jpg",
    stats: "Tecnología Líder"
  },
  {
    title: "Recubrimiento Inteligente",
    desc: "Línea de pintura con inversión de 70M de yuanes. Aumenta la tasa de aplicación de polvo al 80-90%, optimizando la durabilidad y el acabado estético del producto.",
    icon: <Paintbrush size={24} className="text-[#00C2FF]"/>,
    image: "/images/COMPANY/FACTORY/coating.jpg",
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
            src="/images/COMPANY/hq-building.jpg" 
            alt="WONLY Headquarters" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded border border-[#00C2FF]/30 bg-[#00C2FF]/10 text-[#00C2FF] text-xs font-mono mb-4 tracking-widest backdrop-blur-md">
              EST. 1996 // STOCK CODE: 605268
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Ingeniería de <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Escala Global</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Desde la "Fábrica del Futuro" hasta tu hogar. La primera empresa del sector cotizada en la bolsa de Shanghai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CINTA DE DATOS */}
      <div className="border-y border-white/10 bg-[#111] py-4 overflow-hidden relative">
        <div className="flex gap-12 items-center justify-center opacity-70 font-mono text-sm md:text-base whitespace-nowrap">
           <span className="flex items-center gap-2"><TrendingUp size={16} className="text-[#00C2FF]"/> SHA: 605268</span>
           <span className="hidden md:inline w-1 h-1 bg-gray-500 rounded-full"/>
           <span className="hidden md:inline">VALOR DE MARCA: ¥35.07 BILLION</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full"/>
           <span>RED DOT AWARD WINNER</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full"/>
           <span>+200M USUARIOS</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full"/>
           <span className="text-[#00C2FF]">Nº1 MARKET SHARE</span>
        </div>
      </div>

      {/* 3. GRID CORPORATIVO: IPO FULL WIDTH & CLEAN */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* =========================================================
              FILA 1: IMAGEN IPO (GIGANTE, LIMPIA, SIN SOMBRAS DE FONDO)
             ========================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // Aumentamos altura a 600px para que impacte visualmente
            className="col-span-1 md:col-span-2 lg:col-span-12 bg-[#111] border border-white/10 rounded-2xl overflow-hidden relative group min-h-[600px]"
          >
             <img 
            src="/images/COMPANY/ipo-celebration.jpg" 
            alt="Salida a Bolsa 2021" 
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />

             
             {/* TEXTO: Se lee gracias al drop-shadow, sin oscurecer la foto */}
             <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full max-w-4xl">
                <div className="bg-[#00C2FF] text-black text-sm font-bold px-4 py-1.5 inline-block rounded mb-4 shadow-xl border border-white/20">
                  HITO HISTÓRICO 2021
                </div>
                <h3 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
                  Primera Cotizada del Sector
                </h3>
                <p className="text-white font-medium text-lg md:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-relaxed">
                  WONLY hizo historia al convertirse en la primera empresa de seguridad inteligente en listar en la Bolsa de Shanghai (Main Board).
                </p>
             </div>
          </motion.div>


          {/* =========================================================
              FILA 2: PROYECTOS + ESTADÍSTICAS (Los 3 bloques abajo)
             ========================================================= */}

          {/* 1. PROYECTOS (Izquierda) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[300px]"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2FF] blur-[80px] opacity-20"/>
             
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <Globe2 size={20} className="text-[#00C2FF]"/> Presencia Global
             </h3>
             
             <ul className="space-y-4">
               <li className="border-l-2 border-white/10 pl-4">
                 <p className="text-white font-medium text-sm">Aeropuerto Pekín-Daxing</p>
               </li>
               <li className="border-l-2 border-white/10 pl-4">
                 <p className="text-white font-medium text-sm">Cumbre del G20</p>
               </li>
               <li className="border-l-2 border-[#00C2FF] pl-4">
                 <p className="text-white font-medium text-sm">Palacio Presidencial Togo</p>
               </li>
             </ul>
          </motion.div>

          {/* 2. ESTADÍSTICA 9M (Centro) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             whileHover={{ y: -5 }}
             className="lg:col-span-4 bg-[#161616] border border-white/5 p-8 rounded-2xl flex flex-col justify-center items-center text-center min-h-[300px]"
          >
            <div className="p-4 bg-white/5 rounded-full mb-6">
              <Factory className="text-[#00C2FF]" size={40}/>
            </div>
            <h4 className="text-5xl font-mono font-bold text-white mb-2">9M+</h4>
            <p className="text-gray-400">Capacidad Anual de Producción</p>
          </motion.div>

          {/* 3. ESTADÍSTICA 1000+ (Derecha) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             whileHover={{ y: -5 }}
             className="lg:col-span-4 bg-[#161616] border border-white/5 p-8 rounded-2xl flex flex-col justify-center items-center text-center min-h-[300px]"
          >
             <div className="p-4 bg-white/5 rounded-full mb-6">
               <Award className="text-[#00C2FF]" size={40}/>
             </div>
             <h4 className="text-5xl font-mono font-bold text-white mb-2">1000+</h4>
             <p className="text-gray-400">Patentes Globales Registradas</p>
          </motion.div>

        </div>
      </section>
      {/* =========================================================================
          4. NUEVA SECCIÓN: FABRICACIÓN INTELIGENTE (Contenido de tus imágenes)
         ========================================================================= */}
      <section className="py-20 bg-[#0A0A0A] relative">
        {/* Fondo decorativo */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00C2FF]/50 to-transparent"/>
        
        <div className="container mx-auto px-6">
          
          {/* Header de la sección */}
          <div className="mb-16 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Fabricación <span className="text-[#00C2FF]">Inteligente</span></h2>
            <p className="text-gray-400 text-lg mb-8">
              Nuestra "Fábrica del Futuro" integra robótica y datos para aportar cuatro valores fundamentales: 
              mejora de calidad, reducción de plazos, aumento de capacidad y optimización de costes.
            </p>
          </div>

          {/* Grid de Módulos de Fabricación */}
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
                {/* Imagen del módulo */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 text-xs font-bold text-[#00C2FF] rounded border border-[#00C2FF]/20">
                    {item.stats}
                  </div>
                </div>

                {/* Texto del módulo */}
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
      <section className="py-24 bg-[#0a0a0a] overflow-hidden">
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
                 <span className="text-[#00C2FF] font-bold tracking-widest text-sm uppercase">Innovación Global</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                5 Bases de I+D <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                  Estratégicas
                </span>
              </h2>
              
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Con más de **400 ingenieros** y expertos internacionales, WONLY lidera la innovación en seguridad. 
                Nuestra red global conecta el diseño alemán con la velocidad tecnológica de China.
              </p>

              {/* Lista de ubicaciones (opcional, para reforzar visualmente) */}
              <div className="flex flex-wrap gap-3 mb-8">
                  {["Múnich", "Shanghái", "Hangzhou", "Shenzhen", "Yongkang"].map((city) => (
                    <span key={city} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                      {city}
                    </span>
                  ))}
              </div>
            </motion.div>

            {/* DERECHA: GRID DE LAS 5 BASES (4 Cuadradas + 1 Horizontal) */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="grid grid-cols-2 gap-3 md:gap-4"
            >
              {/* 1. Sede Central (Cuadrada) */}
              <div className="relative group overflow-hidden rounded-xl aspect-square border border-white/10">
                <img 
                  src="/images/COMPANY/FACTORY/rd-central.jpg" 
                  alt="Base de I+D Sede Central" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm py-2 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full border border-white"></div>
                    <span className="text-white text-xs md:text-sm font-medium">Sede Central</span>
                  </div>
                </div>
              </div>

              {/* 2. Shanghái (Cuadrada) */}
              <div className="relative group overflow-hidden rounded-xl aspect-square border border-white/10">
                <img 
                  src="/images/COMPANY/FACTORY/rd-shanghai.jpg" 
                  alt="Base de I+D Shanghái" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm py-2 px-3">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full border border-white"></div>
                     <span className="text-white text-xs md:text-sm font-medium">Shanghái</span>
                  </div>
                </div>
              </div>

              {/* 3. Hangzhou (Cuadrada) */}
              <div className="relative group overflow-hidden rounded-xl aspect-square border border-white/10">
                <img 
                  src="/images/COMPANY/FACTORY/rd-hangzhou.jpg" 
                  alt="Base de I+D Hangzhou" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm py-2 px-3">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full border border-white"></div>
                     <span className="text-white text-xs md:text-sm font-medium">Hangzhou</span>
                  </div>
                </div>
              </div>

              {/* 4. Shenzhen (Cuadrada) */}
              <div className="relative group overflow-hidden rounded-xl aspect-square border border-white/10">
                <img 
                  src="/images/COMPANY/FACTORY/rd-shenzhen.jpg" 
                  alt="Base de I+D Shenzhen" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm py-2 px-3">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full border border-white"></div>
                     <span className="text-white text-xs md:text-sm font-medium">Shenzhen</span>
                  </div>
                </div>
              </div>

              {/* 5. Alemania (Horizontal - Ocupa 2 columnas) */}
              <div className="relative group overflow-hidden rounded-xl col-span-2 h-48 md:h-64 border border-white/10">
                <img 
                  src="/images/COMPANY/FACTORY/rd-germany.jpg" 
                  alt="Base de I+D Alemania" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                     <div className="w-3 h-3 rounded-full border-2 border-white"></div>
                     <span className="text-white text-sm md:text-base font-bold">Base de I+D de Alemania</span>
                  </div>
                </div>
                {/* Bandera decorativa opcional o etiqueta */}
                <div className="absolute top-4 right-4 bg-[#00C2FF] text-black text-xs font-bold px-2 py-1 rounded">
                  Diseño Europeo
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>
      {/* =========================================================
          6. SECCIÓN HISTORIA: LÍNEA DE TIEMPO (TIMELINE)
         ========================================================= */}
      <section className="py-24 bg-[#111] relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00C2FF] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"/>

        <div className="container mx-auto px-6 relative z-10">
          
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              9 Innovaciones que <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-white">
                Redefinen los Estándares
              </span>
            </motion.h2>
          </div>

          {/* CONTENEDOR DE LA LÍNEA DE TIEMPO */}
          <div className="relative max-w-4xl mx-auto">
            
            {/* La Línea Central Vertical */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#00C2FF]/50 to-transparent md:-translate-x-1/2"></div>

            {/* ITEMS DE LA HISTORIA */}
            {[
              { year: "1998", title: "Cerradura Automática", desc: "Invención de la cerradura automática multidireccional." },
              { year: "1999", title: "Cilindro Cilíndrico", desc: "Invención del cilindro de cerradura cilíndrico revolucionario." },
              { year: "2000", title: "Puerta Alta Resistencia", desc: "Invención de la puerta de alta resistencia y bisagra invisible ajustable." },
              { year: "2001", title: "Función Especial", desc: "Invención de la cerradura de función especial." },
              { year: "2015", title: "Triple Aislamiento", desc: "Tecnología de triple aislamiento y evolución a súper seguridad." },
              { year: "2019", title: "Seguridad con IA", desc: "Invención de la puerta de seguridad con Inteligencia Artificial (IA)." },
              { year: "2021", title: "Detección Remota", desc: "Invención de la cerradura inteligente con detección remota y sistema IPO." },
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
                {/* Espacio vacío para alternar lados en desktop */}
                <div className="hidden md:block w-1/2" />

                {/* El Punto Central (NODO) */}
                <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-[#00C2FF] rounded-full border-4 border-black shadow-[0_0_15px_rgba(0,194,255,0.8)] z-10 md:-translate-x-1/2 transform -translate-x-1/2 mt-1.5 md:mt-0"></div>

                {/* El Contenido de la Tarjeta */}
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
    7. SECCIÓN PREMIOS Y CERTIFICACIONES (CIERRE DE AUTORIDAD)
   ========================================================= */}
<section className="py-24 bg-black border-t border-white/10">
  <div className="container mx-auto px-6">

    <div className="text-center mb-16">
      <h3 className="text-3xl font-bold text-white mb-4">
        Excelencia y Estándares Globales
      </h3>
      <p className="text-gray-400 max-w-2xl mx-auto">
        WONLY no solo innova, sino que certifica su calidad bajo los estándares más exigentes del mundo.
      </p>
    </div>

    {/* Grid de 6 Certificaciones */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-end justify-items-center">

      {/* 1. CE */}
      <div className="flex flex-col items-center gap-4 cursor-default">
        <div className="h-16 flex items-center justify-center bg-white p-2 rounded">
          <img
            src="/images/COMPANY/LOGO/cert-ce.png"
            alt="Certificación CE"
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="text-center">
          <h4 className="text-white font-bold text-sm">Conformidad UE</h4>
          <p className="text-[10px] text-gray-500">Estándar Europeo</p>
        </div>
      </div>

      {/* 2. ISO */}
      <div className="flex flex-col items-center gap-4 cursor-default">
        <div className="h-16 flex items-center justify-center bg-white p-2 rounded">
          <img
            src="/images/COMPANY/LOGO/cert-iso.png"
            alt="Certificación ISO"
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="text-center">
          <h4 className="text-white font-bold text-sm">ISO 9001</h4>
          <p className="text-[10px] text-gray-500">Calidad Internacional</p>
        </div>
      </div>

      {/* 3. GA */}
      <div className="flex flex-col items-center gap-4 cursor-default">
        <div className="h-16 flex items-center justify-center bg-white p-2 rounded">
          <img
            src="/images/COMPANY/LOGO/cert-ga.png"
            alt="Certificación GA"
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="text-center">
          <h4 className="text-white font-bold text-sm">Norma GA</h4>
          <p className="text-[10px] text-gray-500">Seguridad Pública</p>
        </div>
      </div>

      {/* 4. GB */}
      <div className="flex flex-col items-center gap-4 cursor-default">
        <div className="h-16 flex items-center justify-center bg-white p-2 rounded">
          <img
            src="/images/COMPANY/LOGO/cert-gb.png"
            alt="Estándar GB"
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="text-center">
          <h4 className="text-white font-bold text-sm">Estándar GB</h4>
          <p className="text-[10px] text-gray-500">Norma Nacional</p>
        </div>
      </div>

      {/* 5. Red Dot */}
      <div className="flex flex-col items-center gap-4 cursor-default">
        <div className="h-16 flex items-center justify-center bg-white p-2 rounded">
          <img
            src="/images/COMPANY/LOGO/cert-reddot.png"
            alt="Red Dot Award"
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="text-center">
          <h4 className="text-white font-bold text-sm">Red Dot</h4>
          <p className="text-[10px] text-gray-500">Best of the Best</p>
        </div>
      </div>

      {/* 6. iF Design */}
      <div className="flex flex-col items-center gap-4 cursor-default">
        <div className="h-16 flex items-center justify-center bg-white p-2 rounded">
          <img
            src="/images/COMPANY/LOGO/cert-if.png"
            alt="iF Design Award"
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="text-center">
          <h4 className="text-white font-bold text-sm">iF Design</h4>
          <p className="text-[10px] text-gray-500">Design Award</p>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* 5. FOOTER VISUAL: CALL TO ACTION */}
      <section className="relative py-24 border-t border-white/10 overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#00C2FF] blur-[150px] rounded-full mix-blend-screen"/>
         </div>
         
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">El Futuro de la Seguridad</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
              Combinamos escala industrial con I+D de vanguardia para dar forma a una vida segura e inteligente para más de 200 millones de usuarios.
            </p>
            <Link 
            href="/contacto" 
            className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#00C2FF] hover:text-white transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-[#00C2FF]/50">
               CONTACTAR CON VENTAS
            </Link>
         </div>
      </section>

    </div>
  );
};

export default EmpresaPage;