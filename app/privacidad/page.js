'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Database, 
  Target, 
  Fingerprint, 
  Share2, 
  UserCheck,
  Clock,
  LockKeyhole,
  Mail
} from 'lucide-react';
import Link from 'next/link';

// Datos de las secciones de privacidad
const privacySections = [
  {
    id: "responsable",
    title: "1. Responsable del Tratamiento",
    icon: <Database size={24} className="text-[#00C2FF]"/>,
    content: "La entidad responsable del tratamiento de sus datos personales es Zhongyuankeji S.L., operando bajo la marca WONLY, con domicilio en Carrer Noi del Sucre, 13, 08840 Viladecans, Barcelona, España. Para cualquier consulta relativa a privacidad puede escribir a info@wonlyspain.com."
  },
  {
    id: "datos-recopilados",
    title: "2. Datos que Recopilamos",
    icon: <Fingerprint size={24} className="text-[#00C2FF]"/>,
    content: "Recopilamos los datos que usted facilita en el formulario (nombre, empresa, email, asunto y mensaje), los necesarios para prestar un servicio contratado y, solo si acepta la analítica, datos técnicos de navegación como página visitada, referencia, dispositivo y agente de usuario."
  },
  {
    id: "finalidad",
    title: "3. Finalidad del Tratamiento",
    icon: <Target size={24} className="text-[#00C2FF]"/>,
    content: "Utilizamos su información para: gestionar la contratación de nuestros productos (puertas de seguridad, cerraduras, gabinetes), responder a consultas de soporte o ventas, mejorar la experiencia de usuario en nuestra plataforma y, si lo ha consentido expresamente, enviarle comunicaciones comerciales sobre innovaciones y ofertas."
  },
  {
    id: "legitimacion",
    title: "4. Legitimación",
    icon: <ShieldAlert size={24} className="text-[#00C2FF]"/>,
    content: "La base legal depende de cada tratamiento: la aplicación de medidas precontractuales solicitadas por usted al pedir información o presupuesto, la ejecución de un contrato, el consentimiento para las comunicaciones o mediciones que lo requieran, y el interés legítimo en mantener la seguridad del sitio."
  },
  {
    id: "destinatarios",
    title: "5. Destinatarios y Transferencias",
    icon: <Share2 size={24} className="text-[#00C2FF]"/>,
    content: "Para prestar el servicio podemos utilizar proveedores con acceso limitado a los datos, como Formspree para tramitar el formulario, alojamiento web, logística o pagos. También podremos comunicar información por obligación legal. Cuando un proveedor trate datos fuera del Espacio Económico Europeo, exigiremos una base y garantías válidas conforme a la normativa aplicable."
  },
  {
    id: "derechos",
    title: "6. Derechos del Usuario",
    icon: <UserCheck size={24} className="text-[#00C2FF]"/>,
    content: "Usted puede acceder, rectificar y suprimir sus datos, limitar u oponerse al tratamiento, solicitar la portabilidad y retirar un consentimiento sin afectar a la licitud previa. Puede ejercerlos en info@wonlyspain.com y reclamar ante la Agencia Española de Protección de Datos (www.aepd.es). Solo pediremos la información imprescindible para verificar su identidad."
  },
  {
    id: "retencion",
    title: "7. Retención de Datos",
    icon: <Clock size={24} className="text-[#00C2FF]"/>,
    content: "Las consultas se conservan mientras se atienden y, cuando proceda, durante los plazos legales de responsabilidad. La analítica interna depura los registros anteriores a 13 meses cuando recibe nueva actividad. Las preferencias de consentimiento se renuevan cada seis meses."
  },
  {
    id: "seguridad",
    title: "8. Seguridad de la Información",
    icon: <LockKeyhole size={24} className="text-[#00C2FF]"/>,
    content: "Aplicamos medidas técnicas y organizativas razonables y proporcionadas al riesgo para reducir la posibilidad de alteración, pérdida, tratamiento o acceso no autorizado. Ningún sistema es infalible; revisamos estas medidas cuando cambian el servicio, los riesgos o la tecnología disponible."
  }
];

const PrivacidadPage = () => {
  return (
    <div className="bg-[#050505] text-white overflow-hidden font-sans min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-[#050505]" />
          {/* Un toque de color diferente o posición para la privacidad */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C2FF] opacity-[0.06] blur-[130px] rounded-full" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded border border-[#00C2FF]/30 bg-[#00C2FF]/10 text-[#00C2FF] text-xs font-mono mb-4 tracking-widest backdrop-blur-md">
              <LockKeyhole size={14} />
              PROTECCIÓN DE DATOS
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Privacidad</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Cómo recopilamos, utilizamos, conservamos y protegemos tu información personal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CINTA DE DATOS */}
      <div className="border-b border-white/10 bg-[#111] py-3 overflow-hidden relative">
        <div className="flex gap-8 md:gap-12 items-center justify-center opacity-70 font-mono text-xs md:text-sm whitespace-nowrap overflow-x-auto px-4">
           <span>DATOS MÍNIMOS</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full"/>
           <span>CONTROL DE PREFERENCIAS</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full hidden md:inline"/>
           <span className="hidden md:inline">DERECHOS RGPD</span>
           <span className="w-1 h-1 bg-gray-500 rounded-full"/>
           <span className="text-[#00C2FF]">CONTACTO DIRECTO</span>
        </div>
      </div>

      {/* 3. CONTENIDO LEGAL (GRID DE TARJETAS) */}
      <section className="py-20 container mx-auto px-6 max-w-5xl">
        <p className="mb-8 text-center text-xs uppercase tracking-[0.16em] text-gray-500">
          Última actualización: 27 de julio de 2026
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {privacySections.map((section, index) => (
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
      </section>

      {/* 4. SECCIÓN DE CONTACTO SOBRE PRIVACIDAD */}
      <section className="py-16 bg-[#0a0a0a] border-t border-white/10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex p-4 bg-white/5 rounded-full mb-6">
            <Mail className="text-[#00C2FF]" size={32}/>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ejerce tus derechos</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Si deseas acceder, rectificar, suprimir o portar tus datos, limitar su tratamiento u oponerte, escríbenos a info@wonlyspain.com o utiliza el formulario de contacto.
          </p>
          <Link 
            href="/contacto" 
            className="inline-flex items-center gap-2 bg-[#111] border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:border-[#00C2FF] hover:text-[#00C2FF] transition-all duration-300"
          >
            Contactar sobre privacidad
          </Link>
        </div>
      </section>

      {/* 5. FOOTER VISUAL: CALL TO ACTION */}
      <section className="relative py-20 border-t border-white/10 overflow-hidden bg-[#050505]">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#00C2FF] blur-[150px] rounded-full mix-blend-screen"/>
         </div>
         
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Tu Privacidad es nuestra Prioridad</h2>
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

export default PrivacidadPage;
