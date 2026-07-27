'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cookie, 
  ShieldCheck, 
  BarChart3, 
  Target, 
  SlidersHorizontal, 
  Trash2,
  Settings,
  Globe
} from 'lucide-react';
import Link from 'next/link';

// Datos de las secciones de cookies
const cookieSections = [
  {
    id: "que-son",
    title: "1. ¿Qué son las Cookies?",
    icon: <Cookie size={24} className="text-[#00C2FF]"/>,
    content: "Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo (ordenador, smartphone o tablet) a través de su navegador. Su objetivo principal es recordar sus preferencias, mantener la seguridad de la sesión y recopilar datos estadísticos para mejorar la experiencia de navegación."
  },
  {
    id: "tecnicas",
    title: "2. Cookies Técnicas y Estrictamente Necesarias",
    icon: <ShieldCheck size={24} className="text-[#00C2FF]"/>,
    content: "Son necesarias para recordar sus preferencias de privacidad y, cuando usted cambia el idioma, conservar esa elección. No se utilizan para elaborar perfiles publicitarios."
  },
  {
    id: "analiticas",
    title: "3. Cookies de Rendimiento y Análisis",
    icon: <BarChart3 size={24} className="text-[#00C2FF]"/>,
    content: "Si las acepta, activamos Vercel Analytics, Speed Insights y nuestra medición interna de visitas para conocer el uso y el rendimiento del sitio. Permanecen desactivados hasta que usted presta su consentimiento y puede retirarlo en cualquier momento."
  },
  {
    id: "traduccion",
    title: "4. Traducción Solicitada por el Usuario",
    icon: <Target size={24} className="text-[#00C2FF]"/>,
    content: "El selector de idioma es local hasta que elige traducir a un idioma distinto del español. En ese momento se carga Google Translate y se guarda la cookie googtrans para recordar su elección. Puede volver a español para eliminarla."
  },
  {
    id: "terceros",
    title: "5. Servicios de Terceros",
    icon: <Globe size={24} className="text-[#00C2FF]"/>,
    content: "Utilizamos Vercel para analítica y rendimiento únicamente con consentimiento, Google Translate cuando usted solicita una traducción y Formspree para entregar las consultas enviadas desde el formulario. Cada proveedor se rige además por su propia política de privacidad."
  },
  {
    id: "gestion",
    title: "6. Gestión y Eliminación",
    icon: <Trash2 size={24} className="text-[#00C2FF]"/>,
    content: "Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones de su navegador (Chrome, Safari, Firefox, Edge). Tenga en cuenta que, si desactiva las cookies, es posible que no pueda acceder a ciertas áreas o funcionalidades de nuestra web."
  }
];

const CookiesPage = () => {
  return (
    <div className="bg-[#050505] text-white overflow-hidden font-sans min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-[#050505]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C2FF] opacity-[0.04] blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded border border-[#00C2FF]/30 bg-[#00C2FF]/10 text-[#00C2FF] text-xs font-mono mb-4 tracking-widest backdrop-blur-md">
              <Cookie size={14} />
              TRANSPARENCIA DE NAVEGACIÓN
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Cookies</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Información clara sobre qué rastreadores utilizamos, por qué los usamos y cómo puedes tomar el control de tus preferencias.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CINTA DE DATOS */}
      <div className="border-b border-white/10 bg-[#111] py-3 overflow-hidden relative">
        <div className="flex gap-8 md:gap-12 items-center justify-center opacity-70 font-mono text-xs md:text-sm whitespace-nowrap overflow-x-auto px-4">
           <span>ANALÍTICA OPCIONAL</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full"/>
           <span>SIN PUBLICIDAD</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full hidden md:inline"/>
           <span className="hidden md:inline">PREFERENCIAS REVOCABLES</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full"/>
           <span className="text-[#00C2FF]">CONTROL DE USUARIO</span>
        </div>
      </div>

      {/* 3. CONTENIDO LEGAL (GRID DE TARJETAS) */}
      <section className="py-20 container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cookieSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#00C2FF]/30 transition-colors duration-300 relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00C2FF] opacity-0 group-hover:opacity-[0.03] blur-[60px] transition-opacity duration-500 rounded-full pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="p-3 bg-[#1a1a1a] border border-white/5 rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-white leading-tight">
                  {section.title}
                </h2>
              </div>
              
              <div className="relative z-10 mt-auto">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
          <div className="flex flex-col gap-2 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
            <h2 className="text-xl font-bold">Inventario actual</h2>
            <p className="text-xs text-gray-500">Última actualización: 27 de julio de 2026</p>
          </div>
          <dl className="mt-5 grid gap-4 text-sm md:grid-cols-3">
            <div>
              <dt className="font-mono text-xs text-[#00C2FF]">wonly_cookie_consent</dt>
              <dd className="mt-2 leading-relaxed text-gray-400">
                Almacenamiento local propio. Guarda la elección de analítica durante seis meses.
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-[#00C2FF]">googtrans</dt>
              <dd className="mt-2 leading-relaxed text-gray-400">
                Cookie funcional de sesión. Solo se crea al solicitar una traducción con Google Translate.
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-[#00C2FF]">wonly_admin_session</dt>
              <dd className="mt-2 leading-relaxed text-gray-400">
                Cookie técnica, segura y HTTP-only del panel privado. Caduca a las 12 horas.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 4. SECCIÓN GESTIÓN DE PREFERENCIAS */}
      <section className="py-16 bg-[#0a0a0a] border-t border-white/10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex p-4 bg-white/5 rounded-full mb-6">
            <SlidersHorizontal className="text-[#00C2FF]" size={32}/>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Tú Tienes el Control</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Puedes cambiar o retirar tu consentimiento en cualquier momento. Si deseas gestionar tus preferencias actuales de cookies en nuestra plataforma, o si necesitas contactarnos por dudas legales, haz clic abajo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Este botón podría abrir tu modal/banner de cookies en el futuro si usas uno */}
            <button 
                className="inline-flex items-center justify-center gap-2 bg-[#00C2FF] text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300"
                onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
            >
                <Settings size={18} />
                Configurar Cookies
            </button>
            
            <Link 
              href="/contacto" 
              className="inline-flex items-center justify-center gap-2 bg-[#111] border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:border-[#00C2FF] hover:text-[#00C2FF] transition-all duration-300"
            >
              Contactar Soporte Legal
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FOOTER VISUAL */}
      <section className="relative py-20 border-t border-white/10 overflow-hidden bg-[#050505]">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-[#00C2FF] blur-[150px] rounded-full mix-blend-screen"/>
         </div>
         
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Navegación Segura y Optimizada</h2>
            <Link 
            href="/" 
            className="inline-block mt-4 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-[#00C2FF] hover:text-white transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-[#00C2FF]/50">
               VOLVER AL INICIO
            </Link>
         </div>
      </section>

    </div>
  );
};

export default CookiesPage;
