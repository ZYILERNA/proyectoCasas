'use client'; // 👈 ESTO ES OBLIGATORIO EN NEXT.JS PARA ANIMACIONES

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Globe2, 
  Award, 
  TrendingUp, 
  Users2, 
  Factory 
} from 'lucide-react';

export default function EmpresaPage() {
  return (
    <div className="bg-[#050505] text-white overflow-hidden font-sans">
      
      {/* 1. HERO SECTION: SEDE CENTRAL */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/COMPANY/hq-building.webp" 
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

      {/* 3. GRID CORPORATIVO */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          
          {/* BLOQUE A: HISTORIA (IPO) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-[#111] border border-white/10 rounded-2xl overflow-hidden relative group min-h-[300px]"
          >
             <div className="absolute inset-0">
               <img 
                 src="/images/COMPANY/ipo-celebration.webp" 
                 alt="Salida a Bolsa 2021" 
                 className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"/>
             </div>
             <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-[#00C2FF] text-black text-xs font-bold px-2 py-1 inline-block rounded mb-3">
                  HITO HISTÓRICO 2021
                </div>
                <h3 className="text-2xl font-bold mb-2">Primera Cotizada del Sector</h3>
                <p className="text-gray-400 text-sm">
                  WONLY hizo historia al convertirse en la primera empresa de seguridad inteligente en listar en la Bolsa de Shanghai (Main Board).
                </p>
             </div>
          </motion.div>

          {/* BLOQUE B: ESTADÍSTICAS */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div 
               whileHover={{ y: -5 }}
               className="flex-1 bg-[#161616] border border-white/5 p-6 rounded-2xl flex flex-col justify-center min-h-[200px]"
            >
              <Factory className="text-[#00C2FF] mb-4" size={32}/>
              <h4 className="text-4xl font-mono font-bold text-white mb-1">9M+</h4>
              <p className="text-gray-500 text-sm">Capacidad Anual (Puertas + Cerraduras)</p>
            </motion.div>

            <motion.div 
               whileHover={{ y: -5 }}
               className="flex-1 bg-[#161616] border border-white/5 p-6 rounded-2xl flex flex-col justify-center min-h-[200px]"
            >
               <Award className="text-[#00C2FF] mb-4" size={32}/>
               <h4 className="text-4xl font-mono font-bold text-white mb-1">1000+</h4>
               <p className="text-gray-500 text-sm">Patentes Globales Registradas</p>
            </motion.div>
          </div>

          {/* BLOQUE C: PROYECTOS */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-8 relative overflow-hidden min-h-[400px]"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2FF] blur-[80px] opacity-20"/>
             
             <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
               <Globe2 size={18} className="text-[#00C2FF]"/> Presencia Global
             </h3>
             
             <ul className="space-y-6">
               <li className="border-l-2 border-white/10 pl-4">
                 <p className="text-white font-medium text-sm">Aeropuerto Pekín-Daxing</p>
                 <span className="text-xs text-gray-500">Proveedor Oficial</span>
               </li>
               <li className="border-l-2 border-white/10 pl-4">
                 <p className="text-white font-medium text-sm">Cumbre del G20</p>
                 <span className="text-xs text-gray-500">Proyecto Emblemático</span>
               </li>
               <li className="border-l-2 border-white/10 pl-4">
                 <p className="text-white font-medium text-sm">Torre Crescent (Egipto)</p>
                 <span className="text-xs text-gray-500">Zona FOH</span>
               </li>
               <li className="border-l-2 border-[#00C2FF] pl-4">
                 <p className="text-white font-medium text-sm">Palacio Presidencial Togo</p>
                 <span className="text-xs text-[#00C2FF]">Alta Seguridad</span>
               </li>
             </ul>
          </motion.div>

        </div>
      </section>

      {/* 4. FOOTER VISUAL: FÁBRICA DEL FUTURO */}
      <section className="relative py-20 border-t border-white/10">
         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
               <h2 className="text-3xl font-bold mb-4">La "Fábrica del Futuro"</h2>
               <p className="text-gray-400 mb-6 leading-relaxed">
                 Contamos con 5 bases de producción masiva, incluyendo instalaciones de vanguardia en Sichuan y Hubei. 
                 Integramos robótica avanzada y gestión de datos para crear el estándar de calidad más alto de la industria.
               </p>
               <button className="text-[#00C2FF] border border-[#00C2FF] px-6 py-2 rounded hover:bg-[#00C2FF] hover:text-black transition-colors font-medium text-sm">
                 DESCUBRIR MÁS
               </button>
            </div>
            <div className="md:w-1/2 relative h-[300px] w-full rounded-xl overflow-hidden border border-white/10">
               <img 
                 src="/images/COMPANY/factory-render.webp" 
                 alt="Future Factory" 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-mono text-white/70">
                 BASE DE PRODUCCIÓN HUBEI
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}