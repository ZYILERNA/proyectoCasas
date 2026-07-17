"use client"; // Necesario en Next.js App Router para usar Framer Motion

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Home as HomeIcon, ChevronRight, ChevronLeft, Wind, Maximize2, Sun, BedDouble, Archive, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Variantes de Animación Reutilizables ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  // Certificado abierto en el modal (null = cerrado)
  const [certAbierto, setCertAbierto] = useState(null);

  // Índice del carrusel de patentes (0-12)
  const [patenteActual, setPatenteActual] = useState(0);

  // Índice del carrusel de logos de certificados (solo móvil)
  const [logoActual, setLogoActual] = useState(0);

  // Hitos históricos de la marca (línea de tiempo)
  const hitos = [
    { year: "1996", title: "Fundación de la Marca", desc: "Nace WONLY, iniciando una trayectoria de innovación en seguridad." },
    { year: "1998", title: "Cerradura Automática", desc: "Invención de la cerradura automática multidireccional." },
    { year: "2003", title: "Desafío del Rey de la Cerradura", desc: "Reto con premio de hasta 1 millón. Nunca abierto en más de 20 años." },
    { year: "2015", title: "Súper Seguridad", desc: "Tecnología de triple aislamiento acústico y térmico." },
    { year: "2019", title: "Puertas con IA", desc: "Primera puerta de seguridad robótica impulsada por Inteligencia Artificial." },
    { year: "2021", title: "Salida a Bolsa", desc: "Listado en el Main Board de Shanghai (605268) y distinción 'Fábrica del Futuro'." },
  ];

  const certificados = {
    fsc: {
      titulo: "Certificado FSC",
      imagen: "/images/Asset/CERTIFICADOS/fsc-certificate-wangli.webp",
      width: 1224,
      height: 1584,
    },
    iso: {
      titulo: "Certificado ISO 9001:2015",
      imagen: "/images/Asset/CERTIFICADOS/iso-certificate.webp",
      width: 2191,
      height: 3096,
    },
    iso14001: {
      titulo: "Certificado ISO 14001:2015",
      imagen: "/images/Asset/CERTIFICADOS/iso-14001-certificate.webp",
      width: 2191,
      height: 3096,
    },
  };

  // Logos de certificación mostrados en la sección 1b
  const logosCertificados = [
    {
      logo: "/images/Asset/CERTIFICADOS/LOGOS/FSC.png",
      titulo: "Certificado FSC",
      sub: null,
      cert: "fsc",
    },
    {
      logo: "/images/Asset/CERTIFICADOS/LOGOS/ISO.png",
      titulo: "Certificado ISO",
      sub: "ISO 9001:2015",
      cert: "iso",
    },
    {
      logo: "/images/Asset/CERTIFICADOS/LOGOS/ISO.png",
      titulo: "Certificado ISO",
      sub: "ISO 14001:2015",
      cert: "iso14001",
    },
    {
      logo: "/images/Asset/CERTIFICADOS/LOGOS/LOWNOISE.png",
      titulo: "Certificado Low Noise",
      sub: null,
      pdf: "/images/Asset/CERTIFICADOS/Lownoise.pdf",
    },
  ];

  // Rotación automática del carrusel de certificados en móvil
  useEffect(() => {
    const intervalo = setInterval(() => {
      setLogoActual((actual) => (actual + 1) % logosCertificados.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, [logosCertificados.length]);

  // Patentes CERT1-CERT13: original en chino + traducción al español
  const patentes = Array.from({ length: 13 }, (_, i) => ({
    numero: i + 1,
    chino: {
      titulo: `Patente de invención ${i + 1} — Documento original (CNIPA)`,
      imagen: `/images/Asset/CERTIFICADOS/CERT${i + 1}/chino.webp`,
      width: 960,
      height: 1360,
    },
    espanol: {
      titulo: `Patente de invención ${i + 1} — Traducción al español`,
      imagen: `/images/Asset/CERTIFICADOS/CERT${i + 1}/espanol.webp`,
      width: 1054,
      height: 1492,
    },
  }));

  return (
    <main className="bg-black text-white selection:bg-[#00C2FF] selection:text-black overflow-hidden">
      
      {/* =========================================
         1. HERO SECTION: MARCA Y SEGURIDAD
         ========================================= */}
      {/* CAMBIOS APLICADOS AQUÍ: 
          - mt-[80px]: Empuja la sección por debajo del header. 
          - h-[calc(100vh-80px)]: Mantiene el diseño a pantalla completa restando la altura del header. 
          (Nota: Si tu header es más grande o más pequeño, ajusta el "80px" por tu medida real) */}
      <section className="relative w-full h-[calc(100vh-120px)] mt-[120px] flex items-center">
        
        {/* FONDO: Imagen del Robot con animación de zoom lento */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/hero-robot.webp"
            alt="WONLY Technology"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "top center" }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        </motion.div>
        
        {/* CONTENIDO TEXTO */}
        {/* He quitado el 'mt-20' que tenías aquí para que el texto quede bien centrado ahora que la sección bajó */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 container mx-auto px-6"
        >
          <motion.span variants={fadeInUp} className="text-[#00C2FF] font-bold tracking-[0.3em] uppercase text-sm md:text-base">
            Tecnología & Seguridad S.L.
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-bold mt-4 mb-6 leading-tight max-w-4xl">
            EL FUTURO <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              ES SEGURO
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 font-light border-l-2 border-[#00C2FF] pl-6">
            Especialistas en puertas de seguridad, cerraduras inteligentes y blindaje de alta tecnología. Protegemos lo que más importa.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Link 
              href="/puertas?category=PUERTA DE SEGURIDAD IA" 
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
          </motion.div>
        </motion.div>
      </section>

      {/* =========================================
         1b. SECCIÓN: CERTIFICACIONES (LOGOS)
         ========================================= */}
      <section className="py-16 bg-[#111] border-t border-white/5">
        <div className="container mx-auto px-6">

          {/* ESCRITORIO: fila de logos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="hidden md:flex flex-wrap items-start justify-center gap-16 md:gap-24"
          >
            {logosCertificados.map((item) => {
              const contenido = (
                <>
                  <div className="bg-white rounded-full p-2.5 mb-3 w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={item.logo}
                      alt={item.titulo}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-base font-bold uppercase tracking-widest text-white group-hover:text-[#00C2FF] transition-colors">
                    {item.titulo}
                  </h4>
                  {item.sub && (
                    <span className="text-sm text-gray-400 tracking-widest mt-1">
                      {item.sub}
                    </span>
                  )}
                </>
              );

              return (
                <motion.div key={item.titulo} variants={fadeInUp}>
                  {item.pdf ? (
                    <a
                      href={item.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center cursor-pointer"
                    >
                      {contenido}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCertAbierto(certificados[item.cert])}
                      className="group flex flex-col items-center cursor-pointer"
                    >
                      {contenido}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* MÓVIL: carrusel rotativo automático */}
          <div className="md:hidden">
            <div className="relative h-32 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={logoActual}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {logosCertificados[logoActual].pdf ? (
                    <a
                      href={logosCertificados[logoActual].pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center"
                    >
                      <div className="bg-white rounded-full p-2.5 mb-3 w-14 h-14 flex items-center justify-center">
                        <Image
                          src={logosCertificados[logoActual].logo}
                          alt={logosCertificados[logoActual].titulo}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-base font-bold uppercase tracking-widest text-white">
                        {logosCertificados[logoActual].titulo}
                      </h4>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCertAbierto(certificados[logosCertificados[logoActual].cert])}
                      className="group flex flex-col items-center"
                    >
                      <div className="bg-white rounded-full p-2.5 mb-3 w-14 h-14 flex items-center justify-center">
                        <Image
                          src={logosCertificados[logoActual].logo}
                          alt={logosCertificados[logoActual].titulo}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-base font-bold uppercase tracking-widest text-white">
                        {logosCertificados[logoActual].titulo}
                      </h4>
                      {logosCertificados[logoActual].sub && (
                        <span className="text-sm text-gray-400 tracking-widest mt-1">
                          {logosCertificados[logoActual].sub}
                        </span>
                      )}
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Indicadores */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {logosCertificados.map((item, i) => (
                <button
                  key={item.titulo}
                  type="button"
                  onClick={() => setLogoActual(i)}
                  aria-label={`Ver ${item.titulo}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === logoActual ? 'w-6 bg-[#00C2FF]' : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
         1c. SECCIÓN: HITOS (LÍNEA DE TIEMPO HORIZONTAL)
         ========================================= */}
      <section className="pb-16 bg-[#111] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          {/* Línea de tiempo horizontal compacta: desplazable solo por debajo de lg */}
          <div className="flex overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
            {hitos.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08 }}
                title={item.desc}
                className="relative flex-shrink-0 w-[150px] lg:flex-shrink lg:flex-1 lg:w-auto lg:min-w-0 snap-start pr-4 last:pr-0"
              >
                <span className="block text-center text-2xl font-bold text-white font-mono tracking-tighter mb-3">
                  {item.year}
                </span>

                {/* Línea y punto centrado */}
                <div className="relative flex items-center justify-center h-3 mb-3">
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 h-px bg-[#00C2FF]/50 shadow-[0_0_8px_rgba(0,194,255,0.6)] ${
                      index === 0
                        ? "left-1/2 -right-4"
                        : index === hitos.length - 1
                        ? "left-0 right-1/2"
                        : "left-0 -right-4"
                    }`}
                  />
                  <div className="relative w-2.5 h-2.5 bg-[#00C2FF] rounded-full border-2 border-[#111] shadow-[0_0_10px_rgba(0,194,255,0.8)]"/>
                </div>

                <h3 className="text-xs font-bold text-white text-center uppercase tracking-wide px-1">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
         2. SECCIÓN PRIORITARIA: PUERTAS SMART
         ========================================= */}
      <section className="py-24 bg-[#111]">
        <div className="container mx-auto px-6">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h2 className="text-[#00C2FF] font-bold tracking-widest uppercase mb-2">Nuestro Enfoque Principal</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white">SEGURIDAD INTELIGENTE</h3>
            </div>
            <Link href="/puertas?category=TODAS" className="group flex items-center gap-2 text-gray-400 hover:text-white transition">
              Ver catálogo completo <ChevronRight className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </motion.div>

          {/* GRID DE CATEGORÍAS DE PUERTAS - Animación en cascada */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* CARD 1: SMART */}
            <motion.div variants={fadeInUp}>
              <Link href="/puertas?category=PUERTA DE SEGURIDAD IA" className="group relative block h-[500px] overflow-hidden bg-gray-900 border border-white/10 hover:border-[#00C2FF] transition-colors duration-500">
                <Image src="/images/PUERTAS/AI/door-x60-pro.webp" alt="Smart Door" fill className="object-cover opacity-70 group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <ShieldCheck className="text-[#00C2FF] w-10 h-10 mb-4" />
                  <h4 className="text-2xl font-bold uppercase mb-2">Puertas Inteligentes</h4>
                  <p className="text-gray-400 text-sm">Acceso biométrico, control por app y máxima tecnología.</p>
                </div>
              </Link>
            </motion.div>

            {/* CARD 2: ACORAZADAS */}
            <motion.div variants={fadeInUp}>
              <Link href="/puertas?category=PUERTA DE SEGURIDAD ACORAZADA" className="group relative block h-[500px] overflow-hidden bg-gray-900 border border-white/10 hover:border-white transition-colors duration-500">
                <Image src="/images/PUERTAS/ACORAZADA/door-wl001.webp" alt="Acorazada" fill className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <Lock className="text-white w-10 h-10 mb-4" />
                  <h4 className="text-2xl font-bold uppercase mb-2">Acorazadas</h4>
                  <p className="text-gray-400 text-sm">Resistencia de grado militar y acero reforzado.</p>
                </div>
              </Link>
            </motion.div>

            {/* CARD 3: COLECCIONES / TODAS */}
            <motion.div variants={fadeInUp}>
              <Link href="/puertas?category=TODAS" className="group relative block h-[500px] overflow-hidden bg-gray-900 border border-white/10 hover:border-white transition-colors duration-500">
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#1a1a1a] p-8 text-center group-hover:bg-[#222] transition-colors">
                  <div className="border border-white/20 rounded-full p-6 mb-6 group-hover:border-[#00C2FF] transition-colors">
                      <span className="text-3xl font-light text-white">+10</span>
                  </div>
                  <h4 className="text-xl font-bold uppercase mb-2">Colecciones Especiales</h4>
                  <p className="text-gray-400 text-sm mb-6">Cortafuegos, Médicas, Aluminio y más.</p>
                  <span className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest border-b border-[#00C2FF] pb-1">Descargar Catálogo</span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
         3. SECCIÓN: VENTANAS Y CERRAMIENTOS
         ========================================= */}
      <section className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* LADO IZQUIERDO: IMAGEN GRANDE */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative group"
                >
                    <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
                        <Image
                            src="/images/windows-view.webp"
                            alt="Ventanas Panorámicas WONLY"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                    {/* Detalle flotante técnico */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                      className="absolute -bottom-6 -right-6 bg-black border border-[#00C2FF] p-6 hidden md:block z-10"
                    >
                        <p className="text-[#00C2FF] text-3xl font-bold">50<span className="text-sm align-top">mm</span></p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Grosor de Hoja</p>
                    </motion.div>
                </motion.div>

                {/* LADO DERECHO: TEXTO TÉCNICO */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  className="lg:pl-10"
                >
                    <motion.span variants={fadeInUp} className="text-[#00C2FF] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                        Nueva Colección 2025
                    </motion.span>
                    <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-white mb-6 leading-none">
                        VISIÓN <br/>
                        <span className="text-gray-500">INFINITA</span>
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-gray-300 text-lg mb-8 font-light">
                        Rompe la barrera entre tu hogar y el mundo. Nuestras ventanas de aluminio combinan un <strong>diseño minimalista</strong> con la revolucionaria tecnología de <strong>sellado de doble escalón</strong> para un aislamiento acústico y térmico absoluto.
                    </motion.p>

                    {/* Features Icons */}
                    <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 border-t border-white/10 pt-8">
                        <div className="flex flex-col gap-2">
                            <Wind className="text-[#00C2FF] w-6 h-6" aria-hidden="true" />
                            <h3 className="font-bold uppercase text-sm">Hermético</h3>
                            <p className="text-xs text-gray-500">A prueba de humo y polvo.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Maximize2 className="text-[#00C2FF] w-6 h-6" aria-hidden="true" />
                            <h3 className="font-bold uppercase text-sm">Panorámico</h3>
                            <p className="text-xs text-gray-500">Marcos reducidos, más luz.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Sun className="text-[#00C2FF] w-6 h-6" aria-hidden="true" />
                            <h3 className="font-bold uppercase text-sm">Térmico</h3>
                            <p className="text-xs text-gray-500">Eficiencia energética total.</p>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <Link 
                          href="/ventanas" 
                          className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest border-b border-white pb-2 hover:text-[#00C2FF] hover:border-[#00C2FF] transition-all"
                      >
                          Ver Modelos <ChevronRight size={18} />
                      </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* =========================================
         4. SECCIÓN SOFÁS
         ========================================= */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Decoración de fondo animada */}
        <motion.div 
          initial={{ opacity: 0, x: "50%" }}
          whileInView={{ opacity: 1, x: "25%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute right-0 top-0 w-1/2 h-full bg-[#1a1a1a]/50 -skew-x-12 transform pointer-events-none"
        ></motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* TEXTO */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="text-gray-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                Interior & Confort
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
                DISEÑO PARA <br/> TU HOGAR
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-8 leading-relaxed">
                Más allá de la seguridad, creamos espacios únicos. Descubre nuestra exclusiva línea de sofás modulares y mobiliario de alta gama, diseñados para el confort absoluto.
              </motion.p>
              
              <motion.div variants={fadeInUp}>
                <Link href="/sofas" className="inline-flex items-center gap-4 group bg-white/5 hover:bg-white/10 px-6 py-4 rounded-lg transition-colors border border-white/10">
                  <div className="w-10 h-10 bg-[#00C2FF] flex items-center justify-center text-black rounded-full">
                    <HomeIcon size={18}/>
                  </div>
                  <div>
                    <p className="text-white font-bold uppercase text-sm">Colección de Sofás</p>
                    <span className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest">Explorar catálogo</span>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            {/* IMAGEN GRANDE */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gray-800 border border-white/10 p-2">
                 <div className="relative w-full h-full">
                   <Image
                     src="/images/sofa-home.webp"
                     alt="Sofá WONLY"
                     fill
                     className="object-cover"
                     sizes="(max-width: 1024px) 100vw, 50vw"
                   />
                 </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#00C2FF] text-black p-6 w-48 hidden md:block">
                 <p className="font-bold text-2xl mb-1">2025</p>
                 <p className="text-xs font-bold uppercase tracking-widest">Nueva Colección</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
         5. SECCIÓN: MESAS
         ========================================= */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* IMAGEN GRANDE (A la izquierda para romper el ritmo visual) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[4/3] bg-gray-800 border border-white/10 p-2">
                 <div className="relative w-full h-full">
                   <Image
                     src="/images/mesas-home.webp"
                     alt="Colección Mesas WONLY"
                     fill
                     className="object-cover"
                     sizes="(max-width: 1024px) 100vw, 50vw"
                   />
                 </div>
              </div>
            </motion.div>

            {/* TEXTO (A la derecha) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="order-1 lg:order-2 lg:pl-8"
            >
              <motion.span variants={fadeInUp} className="text-gray-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                Arte & Funcionalidad
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
                COLECCIÓN <br/> DE MESAS
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-8 leading-relaxed">
                Diseño escultórico y materiales nobles. Explora nuestra gama de mesas creadas para ser el centro de atención de cualquier espacio, combinando estética minimalista con durabilidad extrema.
              </motion.p>
              
              <motion.div variants={fadeInUp}>
                <Link href="/mesas" className="inline-flex items-center gap-4 group bg-white/5 hover:bg-white/10 px-6 py-4 rounded-lg transition-colors border border-white/10">
                  <div className="w-10 h-10 bg-white flex items-center justify-center text-black rounded-full transition-transform group-hover:scale-110">
                    <span className="font-serif italic font-bold text-lg">M</span>
                  </div>
                  <div>
                    <p className="text-white font-bold uppercase text-sm">Ver Mesas</p>
                    <span className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest">Descubrir Modelos</span>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
         6. SECCIÓN: DORMITORIOS (NUEVA)
         ========================================= */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* TEXTO (Izquierda para continuar el zig-zag) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="text-gray-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                Descanso & Elegancia
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
                SANTUARIO <br/> PERSONAL
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-8 leading-relaxed">
                Camas tapizadas, bases reforzadas y mesitas de noche diseñadas con precisión arquitectónica. Transforma tu habitación en un espacio de paz con la más alta calidad en materiales y confort.
              </motion.p>
              
              <motion.div variants={fadeInUp}>
                <Link href="/dormitorios" className="inline-flex items-center gap-4 group bg-white/5 hover:bg-white/10 px-6 py-4 rounded-lg transition-colors border border-white/10">
                  <div className="w-10 h-10 bg-[#00C2FF] flex items-center justify-center text-black rounded-full transition-transform group-hover:scale-110">
                    <BedDouble size={18}/>
                  </div>
                  <div>
                    <p className="text-white font-bold uppercase text-sm">Dormitorios</p>
                    <span className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest">Catálogo de Descanso</span>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            {/* IMAGEN GRANDE (Derecha) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-[4/3] bg-gray-800 border border-white/10 p-2 group overflow-hidden">
                 <Image
                   src="/images/dormitorios-header.webp"
                   alt="Colección Dormitorios WONLY"
                   fill
                   className="object-cover transition-transform duration-1000 group-hover:scale-105"
                   sizes="(max-width: 1024px) 100vw, 50vw"
                 />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
         7. SECCIÓN: GABINETES (NUEVA)
         ========================================= */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* IMAGEN GRANDE (Izquierda) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-[4/3] bg-gray-800 border border-white/10 p-2 group overflow-hidden">
                 <Image
                   src="/images/gabinetes-header.webp"
                   alt="Sistemas de Gabinetes WONLY"
                   fill
                   className="object-cover transition-transform duration-1000 group-hover:scale-105"
                   sizes="(max-width: 1024px) 100vw, 50vw"
                 />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white text-black p-6 w-48 hidden md:block z-10">
                 <Archive className="mb-2" size={28} />
                 <p className="font-bold text-lg mb-1 leading-tight">Módulos a Medida</p>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Piedra Sinterizada & MDF</p>
              </div>
            </motion.div>

            {/* TEXTO (Derecha) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="order-1 lg:order-2 lg:pl-8"
            >
              <motion.span variants={fadeInUp} className="text-[#00C2FF] font-bold tracking-widest uppercase text-sm mb-2 block">
                Organización Inteligente
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
                SISTEMAS DE <br/> ALMACENAJE
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-8 leading-relaxed">
                Armarios, vestidores y muebles de TV creados para maximizar tus espacios. La perfección de la piedra sinterizada combinada con la tecnología de iluminación integrada y un diseño minimalista.
              </motion.p>
              
              <motion.div variants={fadeInUp}>
                <Link href="/gabinetes" className="inline-flex items-center gap-4 group bg-white/5 hover:bg-white/10 px-6 py-4 rounded-lg transition-colors border border-white/10">
                  <div className="w-10 h-10 bg-white flex items-center justify-center text-black rounded-full transition-transform group-hover:scale-110">
                    <Archive size={18}/>
                  </div>
                  <div>
                    <p className="text-white font-bold uppercase text-sm">Ver Gabinetes</p>
                    <span className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest">Explorar Módulos</span>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
         8. SECCIÓN: PATENTES DE INVENCIÓN (CARRUSEL)
         ========================================= */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-[#00C2FF] font-bold tracking-widest uppercase mb-2">Innovación Protegida</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white uppercase">Certificado de Patente de Invención 1000+</h3>
            <p className="text-gray-500 max-w-3xl mx-auto mt-6 text-sm italic font-light">
              Documento original emitido por la Administración Nacional de Propiedad Intelectual de China (CNIPA).
              La traducción al español se proporciona únicamente con fines informativos.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="relative max-w-4xl mx-auto"
          >
            {/* Slide actual: original chino + traducción español */}
            <AnimatePresence mode="wait">
              <motion.div
                key={patenteActual}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-12 md:px-16"
              >
                {[patentes[patenteActual].chino, patentes[patenteActual].espanol].map((doc) => (
                  <button
                    key={doc.imagen}
                    type="button"
                    onClick={() => setCertAbierto(doc)}
                    className="group bg-[#111] border border-white/10 hover:border-[#00C2FF] p-4 transition-colors duration-300 cursor-pointer"
                  >
                    <Image
                      src={doc.imagen}
                      alt={doc.titulo}
                      width={doc.width}
                      height={doc.height}
                      className="w-full h-auto"
                    />
                    <span className="block mt-3 text-xs uppercase tracking-widest text-gray-400 group-hover:text-[#00C2FF] transition-colors">
                      {doc.titulo.includes('original') ? 'Documento original' : 'Traducción al español'}
                    </span>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Flechas */}
            <button
              type="button"
              onClick={() => setPatenteActual((patenteActual - 1 + patentes.length) % patentes.length)}
              aria-label="Patente anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white hover:text-[#00C2FF] transition-colors p-2"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              type="button"
              onClick={() => setPatenteActual((patenteActual + 1) % patentes.length)}
              aria-label="Patente siguiente"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-[#00C2FF] transition-colors p-2"
            >
              <ChevronRight size={36} />
            </button>

            {/* Indicadores */}
            <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
              {patentes.map((p, i) => (
                <button
                  key={p.numero}
                  type="button"
                  onClick={() => setPatenteActual(i)}
                  aria-label={`Ir a la patente ${p.numero}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === patenteActual ? 'w-8 bg-[#00C2FF]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-gray-500 text-xs mt-3 tracking-widest">
              {patenteActual + 1} / {patentes.length}
            </p>
          </motion.div>

        </div>
      </section>

      {/* MODAL: Visor de certificado en imagen */}
      <AnimatePresence>
        {certAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCertAbierto(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          >
            <button
              type="button"
              onClick={() => setCertAbierto(null)}
              className="absolute top-6 right-6 text-white hover:text-[#00C2FF] transition-colors z-10"
              aria-label="Cerrar"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full overflow-y-auto"
            >
              <Image
                src={certAbierto.imagen}
                alt={certAbierto.titulo}
                width={certAbierto.width}
                height={certAbierto.height}
                className="w-auto max-w-[90vw] md:max-w-[600px] h-auto shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
         9. FOOTER VISUAL
         ========================================= */}
      <section className="relative py-24 border-t border-white/10 overflow-hidden">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5] 
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#00C2FF] blur-[150px] rounded-full mix-blend-screen"
            />
         </div>
         
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 text-center relative z-10"
         >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">El Futuro de la Seguridad y el Diseño</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
              Contáctanos para recibir asesoramiento técnico personalizado y catálogos exclusivos.
            </p>
            <Link 
            href="/contacto" 
            className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#00C2FF] hover:text-white transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-[#00C2FF]/50">
               CONTACTAR CON VENTAS
            </Link>
         </motion.div>
      </section>

    </main>
  );
}