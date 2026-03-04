"use client";
import React, { useState } from 'react';
import Header from '../../components/Header';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, Clock, MessageSquare, AlertCircle } from 'lucide-react';

export default function ContactoPage() {
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  // --- TU CONFIGURACIÓN REAL DE FORMSPREE ---
  const FORMSPREE_ID = "xwvooakd"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.target);
    
    try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            setFormStatus('success');
            e.target.reset(); // Limpiar formulario tras envío exitoso
        } else {
            setFormStatus('error');
        }
    } catch (error) {
        setFormStatus('error');
    }
  };

  return (
    <main className="bg-black min-h-screen text-white selection:bg-[#00C2FF] selection:text-black flex flex-col">
      <Header />

      {/* 1. HERO & INTRO */}
      <section className="pt-40 pb-10 px-6 relative overflow-hidden">
         <div className="container mx-auto text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 text-[#00C2FF] mb-4 border border-[#00C2FF]/20 px-4 py-1.5 rounded-full bg-[#00C2FF]/5"
            >
                <MessageSquare size={16} />
                <span className="text-sm font-bold uppercase tracking-widest">Atención al Cliente</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            >
              Hablemos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-blue-600">Seguridad</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
            >
              Contacta con nuestra sede en Barcelona. Nuestro equipo está listo para asesorarte en tus proyectos de seguridad.
            </motion.p>
         </div>
         {/* Fondo decorativo */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full -z-10" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00C2FF]/10 blur-[120px] rounded-full -z-10" />
      </section>

      {/* 2. CONTENIDO PRINCIPAL (GRID) */}
      <section className="py-20 px-6 flex-grow">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* COLUMNA IZQUIERDA: INFORMACIÓN */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-3xl font-bold mb-8">Información de Contacto</h2>
                    
                    <div className="space-y-8">
                        {/* Dirección */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 shrink-0 bg-[#111] rounded-full flex items-center justify-center border border-white/10 group-hover:border-[#00C2FF] group-hover:text-[#00C2FF] transition-all duration-300">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Sede España</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Carrer Noi del Sucre, 13<br />
                                    08840 Viladecans<br />
                                    Barcelona, España
                                </p>
                            </div>
                        </div>

                        {/* Correo */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 shrink-0 bg-[#111] rounded-full flex items-center justify-center border border-white/10 group-hover:border-[#00C2FF] group-hover:text-[#00C2FF] transition-all duration-300">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Correo Electrónico</h3>
                                <a href="mailto:Zhongyuankejisl@gmail.com" className="text-gray-400 hover:text-[#00C2FF] transition-colors">
                                    Zhongyuankejisl@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Teléfonos */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 shrink-0 bg-[#111] rounded-full flex items-center justify-center border border-white/10 group-hover:border-[#00C2FF] group-hover:text-[#00C2FF] transition-all duration-300">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Teléfonos de Contacto</h3>
                                <div className="flex flex-col gap-1">
                                    <a href="tel:+34689858129" className="text-gray-400 hover:text-[#00C2FF] transition-colors">
                                        +34 689 858 129
                                    </a>
                                    <a href="tel:+34615772136" className="text-gray-400 hover:text-[#00C2FF] transition-colors">
                                        +34 615 772 136
                                    </a>
                                </div>
                            </div>
                        </div>

                         {/* Horario */}
                         <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 shrink-0 bg-[#111] rounded-full flex items-center justify-center border border-white/10 group-hover:border-[#00C2FF] group-hover:text-[#00C2FF] transition-all duration-300">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Horario de Atención</h3>
                                <p className="text-gray-400">Lunes a Sábado</p>
                                <p className="text-gray-500 text-sm mt-1">9:00 - 19:00</p>
                            </div>
                        </div>
                    </div>

                    {/* --- GOOGLE MAPS IFRAME (Modo Oscuro) --- */}
                    <div className="mt-12 h-72 bg-[#111] rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.6558661642236!2d2.0163353765665857!3d41.31612060041834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49c36236bb6b1%3A0x6283b5443314050d!2sCarrer+Noi+del+Sucre%2C+13%2C+08840+Viladecans%2C+Barcelona!5e0!3m2!1ses!2ses!4v1709664585123!5m2!1ses!2ses" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                        <div className="absolute inset-0 pointer-events-none border-2 border-transparent hover:border-[#00C2FF]/30 transition-colors duration-500 rounded-2xl z-10"></div>
                    </div>

                </motion.div>

                {/* COLUMNA DERECHA: FORMULARIO REAL CON FORMSPREE */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/10 relative"
                >
                    {/* MENSAJE DE ÉXITO */}
                    {formStatus === 'success' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 z-20 bg-[#111] rounded-3xl animate-in fade-in duration-500">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-500">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                            <p className="text-gray-400">Gracias por contactar con Zhongyuankeji. Hemos recibido tu correo correctamente.</p>
                            <button 
                                onClick={() => setFormStatus('idle')}
                                className="mt-8 text-[#00C2FF] hover:text-white font-bold text-sm uppercase tracking-widest"
                            >
                                Enviar otro mensaje
                            </button>
                        </div>
                    )}

                    {/* MENSAJE DE ERROR */}
                    {formStatus === 'error' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 z-20 bg-[#111] rounded-3xl animate-in fade-in duration-500">
                            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500">
                                <AlertCircle size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Error al enviar</h3>
                            <p className="text-gray-400">Hubo un problema de conexión. Por favor, inténtalo de nuevo.</p>
                            <button 
                                onClick={() => setFormStatus('idle')}
                                className="mt-8 text-red-500 hover:text-white font-bold text-sm uppercase tracking-widest"
                            >
                                Intentar de nuevo
                            </button>
                        </div>
                    )}

                    <h3 className="text-2xl font-bold mb-6">Envíanos un mensaje</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Nombre</label>
                                <input name="nombre" required type="text" placeholder="Su nombre" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00C2FF] transition-colors text-white placeholder-gray-600" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Empresa</label>
                                <input name="empresa" type="text" placeholder="Su empresa" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00C2FF] transition-colors text-white placeholder-gray-600" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Correo Electrónico</label>
                            <input name="email" required type="email" placeholder="ejemplo@correo.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00C2FF] transition-colors text-white placeholder-gray-600" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Asunto</label>
                            <select name="asunto" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00C2FF] transition-colors text-white text-gray-400 appearance-none cursor-pointer">
                                <option value="Presupuesto">Presupuesto</option>
                                <option value="Producto">Información de Producto</option>
                                <option value="Soporte">Soporte Técnico</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Mensaje</label>
                            <textarea name="mensaje" required rows={4} placeholder="¿En qué podemos ayudarte?" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00C2FF] transition-colors text-white placeholder-gray-600 resize-none"></textarea>
                        </div>

                        <button 
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-[#00C2FF] hover:text-white transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-[#00C2FF]/20 flex items-center justify-center gap-2"
                        >
                            {formStatus === 'submitting' ? (
                                <span>Enviando...</span>
                            ) : (
                                <>
                                    ENVIAR MENSAJE <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="py-20 border-t border-white/10 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
                <p className="text-gray-400">Respuestas rápidas para nuestros clientes.</p>
            </div>

            <div className="space-y-4">
                {[
                    { 
                      q: "¿Cómo puedo realizar una compra?", 
                      a: "Para garantizar una atención personalizada y asegurarnos de que el producto se adapta perfectamente a su proyecto, las compras no se realizan directamente en la web. Le invitamos a utilizar nuestro formulario de contacto indicando los modelos de su interés, y un asesor le guiará en el proceso." 
                    },
                    { 
                      q: "¿Los precios mostrados en la web son definitivos?", 
                      a: "No, los importes que visualiza en nuestro catálogo son precios base de referencia. El presupuesto final puede variar dependiendo de las configuraciones elegidas, materiales, dimensiones, gastos de envío y requerimientos de instalación. Solicite su cotización exacta sin compromiso." 
                    },
                    { 
                      q: "¿Ofrecen servicio de envío e instalación?", 
                      a: "Sí. Debido a la naturaleza de nuestros productos (puertas de alta seguridad, muebles de gran volumen y losas de piedra), contamos con un equipo técnico especializado. Los costes de transporte e instalación se calcularán y añadirán a su presupuesto final según la ubicación de su proyecto." 
                    },
                    { 
                      q: "¿Puedo personalizar las medidas o materiales de un producto?", 
                      a: "Gran parte de nuestro catálogo, como los gabinetes y escritorios de té, permite ciertas configuraciones (intercambio de paneles de piedra sinterizada, colores de piel o diferentes acabados de madera). Indíquenos sus necesidades en el mensaje y evaluaremos la viabilidad de fabricación a medida." 
                    },
                    { 
                      q: "¿Cuáles son los plazos de entrega estimados?", 
                      a: "El plazo varía según la disponibilidad en nuestra sede de Barcelona y el nivel de personalización de su pedido. Los artículos en stock estándar tienen un proceso rápido, mientras que las piezas fabricadas bajo demanda requieren plazos de logística que le serán detallados en su presupuesto final." 
                    },
                ].map((item, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#111] border border-white/5 p-6 md:p-8 rounded-2xl hover:border-[#00C2FF]/30 transition-colors cursor-default group"
                    >
                        <h4 className="font-bold text-white mb-3 text-lg group-hover:text-[#00C2FF] transition-colors">{item.q}</h4>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.a}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

    </main>
  );
}