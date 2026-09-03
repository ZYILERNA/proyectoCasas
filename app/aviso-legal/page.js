'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Scale, 
  FileText, 
  Copyright, 
  Lock, 
  AlertTriangle,
  Building2,
  Mail
} from 'lucide-react';
import Link from 'next/link';

// Datos de las secciones legales
const legalSections = [
  {
    id: "datos-identificativos",
    title: "1. Datos Identificativos",
    icon: <Building2 size={24} className="text-[#D4A868]"/>,
    content: "En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, la titular del dominio es Zhongyuankeji S.L., que opera bajo la marca comercial WONLY, con domicilio en Carrer Noi del Sucre, 13, 08840 Viladecans, Barcelona, España. Correo electrónico de contacto: info@wonlyspain.com."
  },
  {
    id: "usuarios",
    title: "2. Usuarios",
    icon: <FileText size={24} className="text-[#D4A868]"/>,
    content: "El acceso y/o uso de este portal de La Empresa atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento."
  },
  {
    id: "propiedad-intelectual",
    title: "3. Propiedad Intelectual e Industrial",
    icon: <Copyright size={24} className="text-[#D4A868]"/>,
    content: "La Empresa por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, etc.). Todos los derechos reservados."
  },
  {
    id: "responsabilidad",
    title: "4. Exclusión de Garantías y Responsabilidad",
    icon: <AlertTriangle size={24} className="text-[#D4A868]"/>,
    content: "La Empresa no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo."
  },
  {
    id: "privacidad",
    title: "5. Protección de Datos",
    icon: <Lock size={24} className="text-[#D4A868]"/>,
    content: "La Empresa cumple con las directrices del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales (RGPD), y vela por garantizar un correcto uso y tratamiento de los datos personales del usuario."
  },
  {
    id: "legislacion",
    title: "6. Legislación Aplicable y Jurisdicción",
    icon: <Scale size={24} className="text-[#D4A868]"/>,
    content: "La relación entre La Empresa y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de Barcelona, salvo que la ley aplicable disponga otra cosa."
  }
];

const AvisoLegalPage = () => {
  return (
    <div className="bg-[#050505] text-white overflow-hidden font-sans min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          {/* Fondo abstracto oscuro en lugar de una foto de edificio para mantenerlo sobrio */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-[#050505]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A868] opacity-[0.05] blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded border border-[#D4A868]/30 bg-[#D4A868]/10 text-[#D4A868] text-xs font-mono mb-4 tracking-widest backdrop-blur-md">
              <ShieldCheck size={14} />
              CUMPLIMIENTO NORMATIVO
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Aviso <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Legal</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Términos, condiciones de uso y políticas legales aplicables a nuestros servicios y plataformas corporativas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CINTA DE DATOS */}
      <div className="border-b border-white/10 bg-[#111] py-3 overflow-hidden relative">
        <div className="flex gap-8 md:gap-12 items-center justify-center opacity-70 font-mono text-xs md:text-sm whitespace-nowrap overflow-x-auto px-4">
           <span>ÚLTIMA ACTUALIZACIÓN: {new Date().getFullYear()}</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full"/>
           <span>RGPD COMPLIANT</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full hidden md:inline"/>
           <span className="hidden md:inline">TRANSPARENCIA CORPORATIVA</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full"/>
           <span className="text-[#D4A868]">TÉRMINOS DE USO</span>
        </div>
      </div>

      {/* 3. CONTENIDO LEGAL (GRID DE TARJETAS) */}
      <section className="py-20 container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col gap-8">
          {legalSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group bg-[#111] border border-white/10 rounded-2xl p-6 md:p-10 hover:border-[#D4A868]/30 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Efecto hover suave en el fondo */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A868] opacity-0 group-hover:opacity-[0.02] blur-[80px] transition-opacity duration-500 rounded-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                <div className="p-4 bg-[#1a1a1a] border border-white/5 rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
                    {section.title}
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. SECCIÓN DE CONTACTO LEGAL */}
      <section className="py-16 bg-[#0a0a0a] border-t border-white/10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex p-4 bg-white/5 rounded-full mb-6">
            <Mail className="text-[#D4A868]" size={32}/>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Tienes dudas sobre nuestra política?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Si necesitas ejercer tus derechos de acceso, rectificación, cancelación u oposición, o tienes cualquier consulta legal, nuestro equipo está a tu disposición.
          </p>
          <Link 
            href="/contacto" 
            className="inline-flex items-center gap-2 bg-[#111] border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:border-[#D4A868] hover:text-[#D4A868] transition-all duration-300"
          >
            Contactar con Departamento Legal
          </Link>
        </div>
      </section>

      {/* 5. FOOTER VISUAL: CALL TO ACTION */}
      <section className="relative py-20 border-t border-white/10 overflow-hidden bg-[#050505]">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#D4A868] blur-[150px] rounded-full mix-blend-screen"/>
         </div>
         
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Seguridad Inteligente, Transparencia Total</h2>
            <Link 
            href="/" 
            className="inline-block mt-4 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-[#D4A868] hover:text-black transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-[#D4A868]/50">
               VOLVER AL INICIO
            </Link>
         </div>
      </section>

    </div>
  );
};

export default AvisoLegalPage;
