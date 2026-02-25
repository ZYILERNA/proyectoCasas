"use client";
import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fingerprint, GripHorizontal, ShieldCheck, Key, Radio, ScanFace, 
  Smartphone, Video, Wifi, Eye, Cpu, Scan, Activity, Zap, Globe, 
  Camera, CheckCircle, X, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- 1. DATOS ESTÁTICOS (No necesitan BD) ---
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

// --- MAPEO DE ICONOS PARA PERFORMANCE ---
const getPerformanceIcon = (label) => {
    const l = label.toLowerCase();
    if (l.includes("biometría") || l.includes("acceso")) return <ScanFace size={20}/>;
    if (l.includes("detección") || l.includes("sensor")) return <Radio size={20}/>;
    if (l.includes("seguridad") || l.includes("protección")) return <ShieldCheck size={20}/>;
    if (l.includes("control") || l.includes("app") || l.includes("pantalla")) return <Smartphone size={20}/>;
    if (l.includes("sistemas") || l.includes("tecnología")) return <Cpu size={20}/>;
    if (l.includes("respaldo") || l.includes("llave")) return <Key size={20}/>;
    if (l.includes("video") || l.includes("cámara")) return <Video size={20}/>;
    if (l.includes("vigilancia") || l.includes("mirilla")) return <Eye size={20}/>;
    if (l.includes("mecanismo") || l.includes("confort")) return <Zap size={20}/>;
    return <CheckCircle size={20}/>;
};

// --- COMPONENTES UI ---

const ProductCard = memo(({ product, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-[#111] rounded-xl overflow-hidden border border-white/10 cursor-pointer group hover:border-[#00C2FF]/50 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-square bg-white p-8 flex items-center justify-center overflow-hidden">
        <img 
            src={product.img} 
            alt={product.name}
            className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
        />
        <div className="absolute top-4 right-4 z-20 bg-[#00C2FF] text-black text-xs font-bold px-2 py-1 rounded">
          {product.type}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-white">{product.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
        
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 mt-auto">
          {product.specs?.map((spec, idx) => (
            <div key={idx} className="text-center">
              <p className="text-[#00C2FF] font-bold text-sm truncate">{spec.value}</p>
              <p className="text-gray-600 text-[10px] uppercase truncate">{spec.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

const ProductModal = memo(({ product, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!product) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Fondo optimizado: sin backdrop-blur */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/90" 
        onClick={onClose}
      />
      
      {/* Panel optimizado: animación tween y will-change-transform */}
      <motion.div 
        initial={{ x: "100%" }} 
        animate={{ x: 0 }} 
        exit={{ x: "100%" }} 
        transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
        className="relative bg-[#0a0a0a] w-full max-w-[700px] h-full shadow-2xl overflow-y-auto border-l border-white/10 will-change-transform"
      >
        {/* Encabezado sin backdrop-blur para evitar cálculos de GPU */}
        <div className="sticky top-0 bg-[#0a0a0a] z-30 p-8 border-b border-white/5 flex justify-between items-start">
            <div>
                <span className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest">{product.category} / {product.type}</span>
                <h2 className="text-4xl font-bold text-white mt-2">{product.name}</h2>
            </div>
            <button onClick={onClose} className="text-white hover:text-[#00C2FF] transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10">
                <X size={24} />
            </button>
        </div>

        <div className="p-8 space-y-8">
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-white/10 bg-white flex items-center justify-center z-0">
                <img 
                    src={product.img} 
                    alt={product.name} 
                    className="object-contain w-full h-full p-4 z-20" 
                />
            </div>
            
            <p className="text-gray-300 text-lg font-light leading-relaxed border-b border-white/5 pb-8">
                {product.description}
            </p>
            
            {product.details && (
                <div>
                    <h3 className="text-white font-bold uppercase mb-4 border-l-4 border-[#00C2FF] pl-3">Detalles Técnicos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {Object.entries(product.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between border-b border-white/10 py-3 text-sm hover:bg-white/5 px-2 rounded transition-colors">
                                <span className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}</span>
                                <span className="text-white text-right font-medium">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {product.performance && (
                <div>
                    <h3 className="text-white font-bold uppercase mb-4 border-l-4 border-[#00C2FF] pl-3">Rendimiento Certificado</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {product.performance.map((perf, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded border border-white/5 flex flex-col gap-2 hover:bg-white/10 transition-colors">
                                <div className="text-[#00C2FF] mb-1">
                                    {getPerformanceIcon(perf.label)}
                                </div>
                                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">{perf.label}</span>
                                <div className="flex flex-col">
                                    <span className="text-white font-bold text-sm">{perf.value}</span>
                                    <span className="text-[10px] text-gray-500">{perf.level}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {product.colors && (
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5">
                    <h3 className="text-white font-bold uppercase mb-6 border-l-4 border-[#00C2FF] pl-3">Carta de Colores</h3>
                    <div className="mb-6">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block mb-4">Acabados Disponibles</span>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            {product.colors.interior?.map((color, i) => (
                                <div key={i} className="text-center group flex flex-col items-center gap-2 cursor-pointer">
                                    <div className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-white transition-all transform group-hover:scale-110" style={{backgroundColor: color.hex}}></div>
                                    <span className="text-[9px] text-gray-400 uppercase font-medium max-w-[60px] leading-tight">{color.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="h-4"></div>
            
            <Link href="/contacto" className="block w-full text-center bg-[#00C2FF] hover:bg-[#009bcC] transition-colors text-black py-4 font-bold uppercase rounded text-sm tracking-widest sticky bottom-8 shadow-xl shadow-black/50">
                Solicitar Cotización
            </Link>
        </div>
      </motion.div>
    </div>
  );
});

// --- PÁGINA PRINCIPAL ---
export default function CerradurasPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // ESTADOS PARA SUPABASE
  const [locks, setLocks] = useState([]);
  const [hardware, setHardware] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  // EFECTO DE CARGA
  useEffect(() => {
    async function fetchData() {
        setIsLoading(true);
        try {
            // 1. Cargar Cerraduras
            const { data: locksData, error: locksError } = await supabase
                .from('locks')
                .select('*')
                .order('id');
            
            if(locksError) throw locksError;
            setLocks(locksData || []);

            // 2. Cargar Hardware
            const { data: hardData, error: hardError } = await supabase
                .from('lock_hardware')
                .select('*');
            
            if(hardError) throw hardError;
            setHardware(hardData || []);

        } catch (error) {
            console.error("Error cargando datos:", error);
        } finally {
            setIsLoading(false);
        }
    }
    fetchData();
  }, []);

  // Agrupar el hardware plano por categoría
  const hardwareGrouped = useMemo(() => {
    if(!hardware.length) return [];
    
    const categories = [...new Set(hardware.map(item => item.category))];
    
    return categories.map(cat => {
        const firstItem = hardware.find(h => h.category === cat);
        return {
            title: cat,
            description: firstItem?.description || "Accesorios WONLY",
            items: hardware.filter(h => h.category === cat)
        };
    });
  }, [hardware]);

  return (
    <main className="bg-black min-h-screen text-white pt-20 overflow-hidden">
      
      {/* 1. HERO */}
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

      {/* 2. GRID TECNOLOGÍA (Bento) */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#00C2FF] rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Core <span className="text-[#00C2FF]">Technology</span>
            </h2>
            <p className="text-gray-400">
                Componentes de precisión militar ensamblados para una seguridad inquebrantable.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
            {/* TARJETA CILINDRO */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 relative group rounded-2xl border border-white/10 bg-[#111] overflow-hidden"
            >
                <div className="absolute top-6 left-6 z-20 max-w-[280px] md:max-w-[350px]">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#00C2FF] text-black text-xs font-bold px-2 py-1 rounded">PATENTED</span>
                    <span className="text-[#00C2FF] font-mono text-xs">REF: C-CLASS-360</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 shadow-black drop-shadow-lg">
                    Cilindro Maestro Anti-Taladro
                </h3>
                <p className="text-gray-300 text-sm font-medium leading-relaxed drop-shadow-md">
                    Estructura de pines reales y falsos con aleación tratada térmicamente. 360 veces más seguro que un cilindro clase A.
                </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-0 flex items-center justify-end z-0">
                    <img 
                    src="/images/CERRADURA/cilindro-core.png" 
                    alt="Mecanismo Interno" 
                    className="w-[85%] md:w-[70%] h-full object-contain object-right transform translate-x-10 group-hover:translate-x-0 transition-transform duration-700"
                    />
                </div>
            </motion.div>

            {/* TARJETA UWB */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative bg-[#161616] border border-white/5 p-8 rounded-2xl hover:border-[#00C2FF]/30 transition-colors group"
            >
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-[#00C2FF] group-hover:scale-110 transition-transform">
                    <Radio size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sensor UWB 4.0</h3>
                <p className="text-gray-400 text-sm">
                    Detección de presencia por radar. La cerradura "despierta" antes de que la toques.
                </p>
                <div className="absolute bottom-6 right-6 text-[#00C2FF]/20 font-mono text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">02</div>
            </motion.div>

            {/* RESTO DE FEATURES */}
            {FEATURES_TECH.slice(0, 3).map((item, idx) => ( 
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    className="relative bg-[#161616] border border-white/5 p-8 rounded-2xl hover:border-[#00C2FF]/30 transition-colors group"
                >
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-white group-hover:text-[#00C2FF] transition-colors">
                    {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
            ))}
            </div>
        </div>
      </section>

      {/* 3. DETALLE INGENIERÍA */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/10 group">
              <img 
                src="/images/CERRADURA/detalle-cuerpo.jpg" 
                alt="Estructura Interna WONLY" 
                className="object-contain w-full h-full p-8 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute bottom-8 right-8 bg-[#00C2FF] text-black text-xs font-bold px-3 py-1 uppercase rounded-sm">
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
              <div className="flex gap-4 p-4 bg-white/5 rounded-lg border-l-2 border-[#00C2FF]">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00C2FF]"/> Bloqueo Safety G-Point
                  </h4>
                  <p className="text-sm text-gray-400 mt-1 pl-6">
                    Sistema patentado que despliega todos los cerrojos automáticamente al detectar el marco.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white/5 rounded-lg border-l-2 border-transparent hover:border-gray-500 transition">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <CheckCircle size={16} className="text-gray-500"/> Ganchos Anti-Palanca
                  </h4>
                  <p className="text-sm text-gray-400 mt-1 pl-6">
                    Ganchos bidireccionales que se aferran con más fuerza ante intentos de palanca.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TABLA COMPARATIVA */}
      <section className="py-20 bg-[#0A0A0A] border-y border-white/5 mb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-4">Estándares vs WONLY</h2>
            <p className="text-gray-400">Comparativa de seguridad técnica</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/20 text-gray-500 text-xs uppercase tracking-widest">
                  <th className="p-4">Clase / Estándar</th>
                  <th className="p-4 text-[#00C2FF]">Tiempo Apertura</th>
                  <th className="p-4">Anti-Destructiva</th>
                  <th className="p-4">Tasa Apertura Mutua</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-300">
                {COMPARATIVA_DATA.map((row, idx) => (
                  <tr key={idx} className={`border-b border-white/5 hover:bg-white/5 transition ${row.highlight ? 'bg-[#00C2FF]/10' : ''}`}>
                    <td className={`p-4 font-bold ${row.highlight ? 'text-white' : ''}`}>{row.clase}</td>
                    <td className={`p-4 font-mono text-lg ${row.highlight ? 'text-[#00C2FF] font-bold' : ''}`}>{row.tiempo}</td>
                    <td className="p-4">{row.destructiva}</td>
                    <td className="p-4">{row.mutua}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- LISTADO DE PRODUCTOS (DINÁMICO) --- */}
      <section className="container mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold uppercase text-white">Colección 2025</h2>
        </div>
        
        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p>Cargando catálogo inteligente...</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {locks.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
                ))}
            </div>
        )}
      </section>

      {/* --- HARDWARE & ACCESORIOS (DINÁMICO) --- */}
      {!isLoading && hardwareGrouped.length > 0 && (
          <section className="container mx-auto px-6 pb-24 space-y-20">
            <div className="border-b border-gray-800 pb-4 mb-10">
                <h2 className="text-3xl font-bold uppercase text-white">Catálogo de Hardware</h2>
                <p className="text-gray-400 mt-2">Componentes de precisión para una instalación blindada.</p>
            </div>

            {hardwareGrouped.map((category, catIdx) => (
                <div key={catIdx} className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1 h-8 bg-[#00C2FF]"></div>
                        <div>
                            <h3 className="text-xl font-bold uppercase text-white">{category.title}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">{category.description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {category.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex flex-col bg-[#111] rounded-lg overflow-hidden border border-white/5 hover:border-[#00C2FF]/50 transition-all group">
                                <div className="relative h-32 md:h-56 bg-white p-6 flex items-center justify-center overflow-hidden shrink-0">
                                    <img 
                                        src={item.img} 
                                        alt={item.name} 
                                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="grow bg-[#0a0a0a] border-t border-white/5 p-4 flex items-center justify-center">
                                    <h4 className="!text-white text-sm font-bold uppercase text-center group-hover:text-[#00C2FF] transition-colors">
                                        {item.name}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
          </section>
      )}

      {/* MODAL DETALLE (CON ANIMATE PRESENCE PARA CIERRE SUAVE) */}
      <AnimatePresence>
         {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>

      {/* FOOTER CTA */}
      <section className="relative py-24 border-t border-white/10 overflow-hidden">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#00C2FF] blur-[150px] rounded-full mix-blend-screen"/>
         </div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">El Futuro de la Seguridad</h2>
            <Link 
                href="/contacto" 
                className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#00C2FF] hover:text-white transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-[#00C2FF]/50"
            >
                CONTACTAR CON VENTAS
            </Link>
         </div>
      </section>

    </main>
  );
}