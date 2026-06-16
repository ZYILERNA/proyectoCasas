"use client";
import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Fingerprint, GripHorizontal, ShieldCheck, Key, Radio, ScanFace,
  Smartphone, Video, Wifi, Eye, Cpu, Scan, Activity, Zap, Globe,
  CheckCircle, X, Loader2, ChevronRight, Lock, Star, Search
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- DATOS ESTÁTICOS ---
const COMPARATIVA_DATA = [
  { clase: "Clase A", tiempo: "≥ 1 min", destructiva: "≥ 15 min", mutua: "≤ 0.03%", highlight: false },
  { clase: "Clase B", tiempo: "≥ 5 min", destructiva: "≥ 30 min", mutua: "≤ 0.01%", highlight: false },
  { clase: "Clase C", tiempo: "≥ 10 min", destructiva: "≥ 30 min", mutua: "≤ 0.0001%", highlight: false },
  { clase: "WONLY", tiempo: "≥ 360 min", destructiva: "Superior", mutua: "≤ 0.00001%", highlight: true },
];

const TECH_PILLARS = [
  { icon: <Radio className="w-5 h-5" />,       label: "Radar 24G",    desc: "Detección a 2-4 metros" },
  { icon: <ScanFace className="w-5 h-5" />,     label: "Facial 3D",   desc: "Anti-falsificación" },
  { icon: <ShieldCheck className="w-5 h-5" />,  label: "G-Point",     desc: "Bloqueo automático" },
  { icon: <Cpu className="w-5 h-5" />,          label: "3 Sistemas",  desc: "Operación aislada" },
  { icon: <Fingerprint className="w-5 h-5" />,  label: "Venas Palma", desc: "Grado bancario" },
  { icon: <Smartphone className="w-5 h-5" />,   label: "App Control", desc: "Gestión remota" },
];

// --- MAPEO DE ICONOS ---
const getPerformanceIcon = (label) => {
  const l = label.toLowerCase();
  if (l.includes("biometría") || l.includes("acceso")) return <ScanFace size={17}/>;
  if (l.includes("detección") || l.includes("sensor") || l.includes("tecnología")) return <Radio size={17}/>;
  if (l.includes("seguridad") || l.includes("protección") || l.includes("fiabilidad") || l.includes("material")) return <ShieldCheck size={17}/>;
  if (l.includes("control") || l.includes("app") || l.includes("pantalla") || l.includes("visión")) return <Smartphone size={17}/>;
  if (l.includes("sistemas") || l.includes("mecanismo") || l.includes("acabado")) return <Cpu size={17}/>;
  if (l.includes("respaldo") || l.includes("llave") || l.includes("invitados")) return <Key size={17}/>;
  if (l.includes("video") || l.includes("cámara") || l.includes("vigilancia") || l.includes("comunicación")) return <Video size={17}/>;
  if (l.includes("mirilla") || l.includes("nocturna")) return <Eye size={17}/>;
  if (l.includes("confort") || l.includes("ergonomía")) return <Zap size={17}/>;
  if (l.includes("global") || l.includes("domótica") || l.includes("conectividad") || l.includes("remoto")) return <Wifi size={17}/>;
  return <CheckCircle size={17}/>;
};

// --- PRODUCT CARD ---
const ProductCard = memo(({ product, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    whileHover={{ y: -4 }}
    onClick={onClick}
    className="group relative bg-[#0d0d0d] rounded-2xl overflow-hidden border border-white/8 cursor-pointer hover:border-[#00C2FF]/40 transition-all duration-300 flex flex-col"
  >
    {/* Imagen — fondo blanco para que encajen las fotos con bg blanco */}
    <div className="relative aspect-[4/3] bg-white overflow-hidden flex items-center justify-center p-6">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {/* Badge tipo */}
      <div className="absolute top-3 left-3 bg-[#00C2FF]/10 border border-[#00C2FF]/30 text-[#00C2FF] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
        {product.type}
      </div>
      {(product.category === "Flagship" || product.category === "Best Seller" || product.category === "Tope de Gama") && (
        <div className="absolute top-3 right-3 bg-amber-500/20 border border-amber-500/40 text-amber-500 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Star size={10} fill="currentColor" /> TOP
        </div>
      )}
    </div>

    {/* Info */}
    <div className="p-5 flex-1 flex flex-col gap-2.5">
      <div>
        <p className="text-[#00C2FF] text-[10px] font-bold uppercase tracking-widest mb-0.5">{product.category}</p>
        <h3 className="text-white text-lg font-bold leading-tight">{product.name}</h3>
      </div>
      <p className="text-gray-500 text-sm line-clamp-2 flex-1">{product.description}</p>

      {/* Specs */}
      {product.specs?.length > 0 && (
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5 mt-auto">
          {product.specs.map((spec, i) => (
            <div key={i} className="text-center">
              <p className="text-white font-bold text-sm truncate">{spec.value}</p>
              <p className="text-gray-600 text-[10px] uppercase">{spec.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1.5 text-[#00C2FF] text-xs font-semibold mt-1 group-hover:gap-2.5 transition-all">
        Ver detalles <ChevronRight size={14} />
      </div>
    </div>
  </motion.div>
));

// --- PRODUCT MODAL ---
const ProductModal = memo(({ product, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);
  if (!product) return null;

  const hasWallpaper = !!product?.wallpaper;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* BACKDROP — wallpaper animado para S80, oscuro para el resto */}
      {hasWallpaper ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
        >
          {/* Wallpaper solo en la zona izquierda, sin cubrir el panel */}
          <div className="absolute inset-0 right-[680px] overflow-hidden">
            <motion.img
              src={product.wallpaper}
              alt=""
              aria-hidden="true"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="absolute bottom-12 left-12 right-8 pointer-events-none"
            >
              <p className="text-[#00C2FF] text-[9px] font-bold uppercase tracking-[0.35em] mb-3">Serie S80</p>
              <h3 className="text-white text-3xl font-bold leading-tight mb-3">{product.name}</h3>
              <div className="w-8 h-0.5 bg-[#00C2FF] mb-3" />
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 max-w-xs">{product.description}</p>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/85"
          onClick={onClose}
        />
      )}

      {/* PANEL LATERAL — igual para todos los productos */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.32 }}
        className="relative bg-[#080808] w-full max-w-[680px] h-full shadow-2xl overflow-y-auto border-l border-white/8 will-change-transform"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#080808]/95 backdrop-blur z-30 px-8 py-6 border-b border-white/5 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#00C2FF] text-[10px] font-bold uppercase tracking-widest">{product.category}</span>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-gray-500 text-[10px] uppercase tracking-wider">{product.type}</span>
            </div>
            <h2 className="text-3xl font-bold text-white">{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/8 mt-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Imagen */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white border border-white/10 flex items-center justify-center">
            <img
              src={product.img}
              alt={product.name}
              className="object-contain w-full h-full p-6"
            />
          </div>

          {/* Descripción */}
          <p className="text-gray-300 leading-relaxed">{product.description}</p>

          {/* Detalles técnicos */}
          {product.details && (
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#00C2FF] inline-block"></span> Especificaciones
              </h3>
              <div className="rounded-xl overflow-hidden border border-white/8 divide-y divide-white/5">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between px-4 py-3 bg-white/3 hover:bg-white/6 transition-colors text-sm">
                    <span className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="text-white font-medium text-right ml-4">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance */}
          {product.performance && (
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#00C2FF] inline-block"></span> Rendimiento
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.performance.map((perf, i) => (
                  <div key={i} className="bg-white/4 border border-white/6 rounded-xl p-4 hover:bg-white/7 hover:border-[#00C2FF]/20 transition-all">
                    <div className="text-[#00C2FF] mb-2">{getPerformanceIcon(perf.label)}</div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider font-bold mb-1">{perf.label}</p>
                    <p className="text-white font-bold text-sm">{perf.value}</p>
                    <p className="text-gray-600 text-[10px] mt-0.5">{perf.level}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Colores */}
          {product.colors?.interior?.length > 0 && (
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#00C2FF] inline-block"></span> Acabados
              </h3>
              <div className="flex flex-wrap gap-4">
                {product.colors.interior.map((color, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-white/15 group-hover:border-white/60 group-hover:scale-110 transition-all"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[9px] text-gray-500 uppercase font-medium max-w-[64px] text-center leading-tight">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="h-2" />
          <Link
            href="/contacto"
            className="flex items-center justify-center gap-2 w-full bg-[#00C2FF] hover:bg-[#00a8e0] transition-colors text-black py-4 font-bold uppercase rounded-xl text-sm tracking-widest"
          >
            Solicitar Cotización <ChevronRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
});

// --- PÁGINA PRINCIPAL ---
export default function CerradurasPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [locks, setLocks] = useState([]);
  const [hardware, setHardware] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [activeHardwareTab, setActiveHardwareTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data: locksData, error: locksError } = await supabase
          .from('locks').select('*').order('id');
        if (locksError) throw locksError;
        setLocks(locksData || []);

        const { data: hardData, error: hardError } = await supabase
          .from('lock_hardware').select('*');
        if (hardError) throw hardError;
        setHardware(hardData || []);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filterCategories = useMemo(() => {
    if (!locks.length) return ["Todos"];
    const cats = [...new Set(locks.map(l => l.type).filter(Boolean))];
    return ["Todos", ...cats];
  }, [locks]);

  const filteredLocks = useMemo(() => {
    let result = activeFilter === "Todos" ? locks : locks.filter(l => l.type === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(l =>
        l.name?.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q) ||
        l.type?.toLowerCase().includes(q) ||
        l.category?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [locks, activeFilter, searchQuery]);

  const hardwareGrouped = useMemo(() => {
    if (!hardware.length) return [];
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

  useEffect(() => {
    if (hardwareGrouped.length > 0 && !activeHardwareTab) {
      setActiveHardwareTab(hardwareGrouped[0].title);
    }
  }, [hardwareGrouped]);

  const activeHardwareItems = useMemo(
    () => hardwareGrouped.find(g => g.title === activeHardwareTab)?.items || [],
    [hardwareGrouped, activeHardwareTab]
  );

  return (
    <main className="bg-[#060606] min-h-screen text-white pt-20 overflow-hidden">

      {/* ===== 1. HERO ===== */}
      <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/CERRADURA/detalle-cuerpo.webp"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060606]/60 via-[#060606]/40 to-[#060606]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/80 via-transparent to-[#060606]/80" />
        </div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00C2FF]/8 rounded-full blur-[120px] z-0 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 pt-16 pb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#00C2FF]/10 border border-[#00C2FF]/25 text-[#00C2FF] text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <Lock size={12} /> Tecnología WONLY
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6"
            >
              Cerraduras
              <br />
              <span className="text-[#00C2FF]">Inteligentes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Seguridad patentada que supera <span className="text-white font-semibold">360×</span> el estándar
              Clase C. Tecnología de detección remota real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-10 text-center"
            >
              {[
                { value: "360×",      label: "Sobre Clase C" },
                { value: "≥360 min",  label: "Resistencia" },
                { value: "0.00001%",  label: "Apertura mutua" },
                { value: "9 en 1",    label: "Métodos acceso" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-4xl font-black text-white">{stat.value}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-700 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ===== 2. TECH PILLARS ===== */}
      <section className="py-16 border-y border-white/5 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {TECH_PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#080808] p-6 flex flex-col items-center text-center gap-3 hover:bg-[#0f0f0f] transition-colors group"
              >
                <div className="text-[#00C2FF]/60 group-hover:text-[#00C2FF] transition-colors">{pillar.icon}</div>
                <div>
                  <p className="text-white text-sm font-bold">{pillar.label}</p>
                  <p className="text-gray-600 text-[11px] mt-0.5">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. BENTO TECNOLOGÍA ===== */}
      <section className="py-28 bg-[#060606] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C2FF]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-xl mx-auto">
            <p className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest mb-3">Ingeniería de vanguardia</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Core <span className="text-[#00C2FF]">Technology</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Cilindro */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 relative h-72 rounded-2xl border border-white/8 bg-[#0d0d0d] overflow-hidden group"
            >
              <div className="absolute top-7 left-7 z-20 max-w-[280px]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#00C2FF] text-black text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider">PATENTED</span>
                  <span className="text-[#00C2FF]/50 font-mono text-[10px]">C-CLASS-360</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Cilindro Anti-Taladro</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Pines reales y falsos con aleación tratada térmicamente. 360× más seguro que Clase A.
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/70 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-end z-0">
                <img
                  src="/images/CERRADURA/cilindro-core.webp"
                  alt="Cilindro"
                  className="w-[60%] h-full object-contain object-right translate-x-6 group-hover:translate-x-2 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* UWB */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="md:col-span-5 h-72 relative bg-[#0d0d0d] border border-white/8 rounded-2xl p-8 group hover:border-[#00C2FF]/25 transition-colors overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00C2FF]/5 rounded-full blur-2xl group-hover:w-44 group-hover:h-44 transition-all duration-500" />
              <div className="w-11 h-11 bg-[#00C2FF]/10 border border-[#00C2FF]/20 rounded-xl flex items-center justify-center mb-5 text-[#00C2FF]">
                <Radio size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sensor UWB 4.0</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Detección radar de presencia. La cerradura "despierta" antes de que la toques — apertura automática sin contacto.
              </p>
              <div className="absolute bottom-6 right-6 font-mono text-5xl font-black text-white/5 group-hover:text-[#00C2FF]/10 transition-colors select-none">02</div>
            </motion.div>

            {/* Detalle cuerpo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-5 h-72 relative border border-white/8 rounded-2xl overflow-hidden group"
            >
              <img
                src="/images/CERRADURA/detalle-cuerpo.webp"
                alt="Detalle cuerpo"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="bg-[#00C2FF] text-black text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider mb-2 inline-block">Anti-Palanca</span>
                <h3 className="text-lg font-bold text-white">Ganchos Bidireccionales</h3>
                <p className="text-white/60 text-sm mt-1">Mayor resistencia ante fuerza bruta</p>
              </div>
            </motion.div>

            {/* G-Point */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-7 h-72 relative bg-[#0d0d0d] border border-white/8 rounded-2xl p-8 group hover:border-[#00C2FF]/25 transition-colors overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C2FF]/4 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-11 h-11 bg-[#00C2FF]/10 border border-[#00C2FF]/20 rounded-xl flex items-center justify-center mb-5 text-[#00C2FF]">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sistema Safety G-Point</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                Bloqueo automático al detectar el marco. Todos los cerrojos se despliegan solos — imposible olvidar cerrar.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Anti-ganzúa", "Anti-taladro", "Anti-palanca", "Auto-bloqueo"].map(tag => (
                  <span key={tag} className="text-[10px] text-gray-500 uppercase border border-white/10 rounded-full px-3 py-1 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 4. COMPARATIVA ===== */}
      <section className="py-24 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest mb-3">Certificación técnica</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase">
              Estándares vs <span className="text-[#00C2FF]">WONLY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {COMPARATIVA_DATA.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative rounded-2xl p-6 border overflow-hidden ${
                  row.highlight
                    ? 'bg-[#00C2FF]/8 border-[#00C2FF]/30 ring-1 ring-[#00C2FF]/20'
                    : 'bg-[#0d0d0d] border-white/8'
                }`}
              >
                {row.highlight && (
                  <div className="absolute top-4 right-4 bg-[#00C2FF] text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    SUPERIOR
                  </div>
                )}
                <p className={`text-xs font-bold uppercase tracking-wider mb-5 ${row.highlight ? 'text-[#00C2FF]' : 'text-gray-500'}`}>
                  {row.clase}
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase mb-0.5">Apertura</p>
                    <p className={`font-mono font-black text-2xl ${row.highlight ? 'text-[#00C2FF]' : 'text-white'}`}>{row.tiempo}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase mb-0.5">Anti-destructiva</p>
                    <p className="text-gray-300 text-sm font-medium">{row.destructiva}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase mb-0.5">Apertura mutua</p>
                    <p className="text-gray-300 text-sm font-medium">{row.mutua}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. PRODUCTOS ===== */}
      <section className="py-24 bg-[#060606]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest mb-2">Catálogo</p>
              <h2 className="text-3xl font-black uppercase">Colección 2025</h2>
            </div>
            {!isLoading && locks.length > 0 && (
              <p className="text-gray-600 text-sm">{filteredLocks.length} modelo{filteredLocks.length !== 1 ? 's' : ''}</p>
            )}
          </div>

          {/* Buscador */}
          {!isLoading && locks.length > 0 && (
            <div className="relative mb-6 max-w-md">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar cerradura..."
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-full pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00C2FF]/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* Filtros */}
          {!isLoading && filterCategories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {filterCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                    activeFilter === cat
                      ? 'bg-[#00C2FF] border-[#00C2FF] text-black'
                      : 'bg-transparent border-white/15 text-gray-500 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 text-gray-600">
              <Loader2 className="animate-spin mb-4 text-[#00C2FF]" size={36} />
              <p className="text-sm">Cargando catálogo...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {filteredLocks.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center py-24 text-gray-600">
                    <Search size={36} className="mb-4 opacity-30" />
                    <p className="text-sm">Sin resultados para <span className="text-white/50">"{searchQuery}"</span></p>
                    <button onClick={() => setSearchQuery("")} className="mt-3 text-[#00C2FF] text-xs hover:underline">Limpiar búsqueda</button>
                  </div>
                ) : filteredLocks.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ===== 6. HARDWARE (tabs) ===== */}
      {!isLoading && hardwareGrouped.length > 0 && (
        <section className="py-24 bg-[#080808] border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <p className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest mb-2">Componentes</p>
              <h2 className="text-3xl font-black uppercase">Catálogo de Hardware</h2>
              <p className="text-gray-500 mt-2 text-sm">Piezas de precisión para una instalación blindada</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-white/6 pb-5">
              {hardwareGrouped.map(cat => (
                <button
                  key={cat.title}
                  onClick={() => setActiveHardwareTab(cat.title)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                    activeHardwareTab === cat.title
                      ? 'bg-[#00C2FF]/10 border-[#00C2FF]/30 text-[#00C2FF]'
                      : 'bg-transparent border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20'
                  }`}
                >
                  {cat.title}
                  <span className={`ml-2 text-[10px] rounded-full px-1.5 py-0.5 ${
                    activeHardwareTab === cat.title
                      ? 'bg-[#00C2FF]/15 text-[#00C2FF]'
                      : 'bg-white/8 text-gray-600'
                  }`}>
                    {hardwareGrouped.find(g => g.title === cat.title)?.items.length}
                  </span>
                </button>
              ))}
            </div>

            {/* Grid items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHardwareTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {activeHardwareItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="group bg-[#0d0d0d] rounded-xl overflow-hidden border border-white/6 hover:border-[#00C2FF]/30 transition-all"
                  >
                    {/* Fondo blanco para las imágenes de hardware */}
                    <div className="aspect-square bg-white p-5 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-400"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-3 py-3 bg-[#0a0a0a] border-t border-white/5">
                      <p className="text-white text-xs font-bold uppercase text-center leading-tight group-hover:text-[#00C2FF] transition-colors line-clamp-2">
                        {item.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>

      {/* ===== CTA FINAL ===== */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] bg-[#00C2FF]/6 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest mb-4">¿Listo para proteger tu hogar?</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-tight">
            El Futuro de<br />la Seguridad
          </h2>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-3 bg-[#00C2FF] hover:bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,194,255,0.3)]"
          >
            Contactar con ventas <ChevronRight size={16} />
          </Link>
        </div>
      </section>

    </main>
  );
}
