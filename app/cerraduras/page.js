// app/cerraduras/page.js
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Radio, Lock, Zap, MousePointerClick } from 'lucide-react';
import Link from 'next/link';

// --- DATOS BASADOS EN TUS IMÁGENES ---
const FEATURES_TECH = [
  {
    icon: <Radio className="w-8 h-8 text-[#00C2FF]" />,
    title: "Radar Aeroespacial 24G",
    desc: "Detección activa del propietario a 2-4 metros. Desbloqueo remoto automático sin contacto."
  },
  {
    icon: <Cpu className="w-8 h-8 text-[#00C2FF]" />,
    title: "3 Sistemas Aislados",
    desc: "Recolección, Reconocimiento y Control operan independientemente para máxima seguridad."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#00C2FF]" />,
    title: "Seguridad G-Point",
    desc: "Punto seguro patentado: bloqueo automático inmediato al tocar el marco. Sin olvidos."
  }
];

const COMPARATIVA_DATA = [
  { clase: "Clase A", tiempo: "≥ 1 MIN", destructiva: "≥ 15 MIN", mutua: "≤ 0.03%" },
  { clase: "Clase B", tiempo: "≥ 5 MIN", destructiva: "≥ 30 MIN", mutua: "≤ 0.01%" },
  { clase: "Clase C (Estándar)", tiempo: "≥ 10 MIN", destructiva: "≥ 30 MIN", mutua: "≤ 0.0001%" },
  { clase: "WONLY INTELIGENTE", tiempo: "≥ 360 MIN", destructiva: "SUPERIOR", mutua: "≤ 0.00001%", highlight: true },
];

const MODELOS = [
  {
    id: 1,
    nombre: "WONLY Smart G-Series",
    img: "/images/CERRADURAS/lock-1.jpg", // Asegúrate de tener esta imagen
    desc: "El buque insignia con tecnología de reconocimiento facial 3D y Radar 24G.",
    price: "Consultar"
  },
  {
    id: 2,
    nombre: "WONLY Biometric Pro",
    img: "/images/CERRADURAS/lock-2.jpg",
    desc: "Seguridad dactilar de alta velocidad con cuerpo de acero reforzado.",
    price: "Consultar"
  },
  {
    id: 3,
    nombre: "WONLY Handle X1",
    img: "/images/CERRADURAS/lock-3.jpg",
    desc: "Diseño minimalista integrado en manilla con panel IML resistente.",
    price: "Consultar"
  }
];

export default function CerradurasPage() {
  return (
    <main className="bg-black min-h-screen text-white pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-0" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-4"
          >
            Cerraduras <span className="text-[#00C2FF]">Inteligentes</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Tecnología de seguridad patentada que supera 360 veces el estándar Clase C.
          </motion.p>
        </div>
      </section>

      {/* 2. GRID DE TECNOLOGÍA (ICONOS) */}
      <section className="py-20 bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES_TECH.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#1a1a1a] p-8 border border-white/5 hover:border-[#00C2FF]/50 transition-colors group"
              >
                <div className="mb-4 bg-black/50 w-16 h-16 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DETALLE TÉCNICO (Imagen Cuerpo Cerradura) */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
             {/* REEMPLAZAR CON TU IMAGEN REAL DEL CUERPO DE LA CERRADURA */}
            <div className="relative aspect-[4/5] bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/10">
              <img 
                src="/images/CERRADURAS/detalle-cuerpo.png" 
                alt="Estructura Interna WONLY" 
                className="object-contain w-full h-full p-8 hover:scale-105 transition duration-700"
              />
              {/* Etiqueta flotante decorativa */}
              <div className="absolute bottom-8 right-8 bg-[#00C2FF] text-black text-xs font-bold px-3 py-1 uppercase">
                Patente Anti-Palanca
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight">
              Ingeniería de <br/>
              <span className="text-[#00C2FF]">Súper Seguridad</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1 bg-[#00C2FF] h-auto" />
                <div>
                  <h4 className="text-lg font-bold text-white">Bloqueo Safety G-Point</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Sistema patentado que despliega todos los cerrojos automáticamente al detectar el marco. Ideal para evitar olvidos al salir.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1 bg-gray-700 h-auto" />
                <div>
                  <h4 className="text-lg font-bold text-white">Ganchos Anti-Palanca (6 Capas)</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Cuanto mayor sea la fuerza de palanca intentada, más firmemente se enganchan los ganchos bidireccionales al marco.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1 bg-gray-700 h-auto" />
                <div>
                  <h4 className="text-lg font-bold text-white">Compensación Automática</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    La cerradura ajusta automáticamente la holgura con el tiempo, funcionando como nueva incluso tras 20 años de uso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TABLA COMPARATIVA (CLASE C vs WONLY) */}
      <section className="py-20 bg-[#0A0A0A] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-4">La seguridad de la puerta se basa en la cerradura</h2>
            <p className="text-gray-400">Comparativa de estándares nacionales vs Tecnología WONLY</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20 text-gray-500 text-xs uppercase tracking-widest">
                  <th className="p-4">Clase / Estándar</th>
                  <th className="p-4 text-[#00C2FF]">Tiempo Apertura Antitécnica</th>
                  <th className="p-4">Tiempo Anti-Destructiva</th>
                  <th className="p-4">Tasa Apertura Mutua</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-300">
                {COMPARATIVA_DATA.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-white/5 hover:bg-white/5 transition ${row.highlight ? 'bg-[#00C2FF]/10' : ''}`}
                  >
                    <td className={`p-4 font-bold ${row.highlight ? 'text-white' : ''}`}>{row.clase}</td>
                    <td className={`p-4 font-mono text-lg ${row.highlight ? 'text-[#00C2FF] font-bold' : ''}`}>{row.tiempo}</td>
                    <td className="p-4">{row.destructiva}</td>
                    <td className="p-4">{row.mutua}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center">* Datos basados en pruebas de laboratorio y patentes WONLY. Patente cilindro Nº: ZL200910078005.5</p>
        </div>
      </section>

      {/* 5. CATÁLOGO DE MODELOS */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-bold uppercase mb-12 text-center">Modelos Disponibles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {MODELOS.map((modelo) => (
            <div key={modelo.id} className="group cursor-pointer">
              <div className="relative aspect-square bg-[#151515] mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00C2FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 z-10" />
                <img 
                  src={modelo.img} 
                  alt={modelo.nombre} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-700"
                />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2 group-hover:text-[#00C2FF] transition">{modelo.nombre}</h3>
              <p className="text-sm text-gray-400 mb-4 h-12">{modelo.desc}</p>
              <Link href="/contacto" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-[#00C2FF] pb-1 hover:text-[#00C2FF] transition">
                Solicitar Info <Zap size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="py-20 bg-[#00C2FF] text-black text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold uppercase mb-6">Protege lo que más importa</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto font-medium">
            Actualiza la seguridad de tu hogar con la tecnología de radar 24G y cilindros antitécnicos.
          </p>
          <Link 
            href="/contacto" 
            className="inline-block bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition duration-300"
          >
            Contactar con un Especialista
          </Link>
        </div>
      </section>
    </main>
  );
}