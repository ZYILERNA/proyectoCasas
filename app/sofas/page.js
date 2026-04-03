"use client";

import React, { useState, useEffect, useMemo, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ScanLine, Ruler, Box, Palette, RefreshCw, Lock, Layers, Armchair, Maximize2, Barcode, Loader2, Search } from 'lucide-react';

// --- CONFIGURACIÓN SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- CONSTANTES ---
const EXCHANGE_RATE = 0.13; 
const AUTOPLAY_INTERVAL = 3000;

// --- VARIANTES DE ANIMACIÓN ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Función para formatear precios (CNY -> EUR)
const formatPrice = (priceCNY) => {
    if (!priceCNY) return "-";
    return new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0 
    }).format(priceCNY * EXCHANGE_RATE);
};

// --- COMPONENTE 1: MODAL DE TABLA DE PRECIOS ---
const PriceTableModal = memo(({ isOpen, onClose, data, title }) => {
    if (!isOpen || !data) return null;
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80" onClick={onClose}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "tween", duration: 0.2 }}
                style={{ willChange: "transform, opacity" }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">Lista de Precios: {title}</h3>
                        <p className="text-xs text-gray-500">Estimación en Euros (€) basada en tasa de cambio actual.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                <div className="overflow-auto p-0">
                    <table className="w-full text-xs text-left text-gray-600">
                        <thead className="text-[10px] uppercase bg-white text-gray-700 font-bold sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="p-3 bg-gray-50 border-b">Modelo</th>
                                <th className="p-3 bg-gray-50 border-b">Medidas (mm)</th>
                                <th className="p-3 text-center bg-blue-50/50 text-blue-800 border-b border-blue-100">Tela A</th>
                                <th className="p-3 text-center bg-blue-50/50 text-blue-800 border-b border-blue-100">Tela B</th>
                                <th className="p-3 text-center bg-blue-100/50 text-blue-900 border-b border-blue-200">Tela C</th>
                                <th className="p-3 text-center bg-orange-50/50 text-orange-800 border-b border-orange-100">Piel A</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 font-bold text-gray-900 bg-gray-50/30">{row.name}</td>
                                    <td className="p-3 font-mono text-gray-400 text-[10px]">{row.size}</td>
                                    <td className="p-3 text-center font-medium">{formatPrice(row.prices.fa)}</td>
                                    <td className="p-3 text-center font-medium">{formatPrice(row.prices.fb)}</td>
                                    <td className="p-3 text-center font-bold text-blue-700 bg-blue-50/30">{formatPrice(row.prices.fc)}</td>
                                    <td className="p-3 text-center font-medium text-gray-500">{formatPrice(row.prices.la)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
});

// --- COMPONENTE 2: ITEM DE SOFÁ ---
const SofaItem = memo(({ sofa, onClick }) => {
    return (
        <motion.div variants={fadeInUp}>
            <div className="group block h-full flex flex-col relative">
                <div 
                    onClick={onClick} 
                    className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-100 mb-4 border border-gray-100 cursor-pointer"
                >
                    <div className="absolute top-0 left-0 z-20">
                        <div className="bg-black text-white text-[10px] font-mono px-2 py-1 flex items-center gap-2">
                            <Barcode size={10} /> {sofa.code}
                        </div>
                    </div>
                    <Image 
                        src={sofa.image || "/images/placeholder.jpg"} 
                        alt={sofa.name} 
                        fill
                        sizes="100px"
                        unoptimized
                        className="object-contain p-6 mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                </div>
                <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-medium text-gray-900">{sofa.name}</h3>
                    <span className="text-sm font-bold text-gray-900">{formatPrice(sofa.priceBase)}</span>
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{sofa.category}</p>
            </div>
        </motion.div>
    );
});

// --- COMPONENTE 3: DRAWER / DETALLE DEL PRODUCTO ---
const ProductDrawer = memo(({ selectedSofa, onClose }) => {
    // Estados para Desktop
    const [currentSchematicIndex, setCurrentSchematicIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    
    // Estados Globales
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [mobileImageIndex, setMobileImageIndex] = useState(0);

    // Unificamos todas las imágenes para el carrusel móvil
    const allImages = useMemo(() => {
        if (!selectedSofa) return [];
        return [selectedSofa.image, ...(selectedSofa.schematics || [])];
    }, [selectedSofa]);

    const hasMultipleImages = selectedSofa?.schematics && selectedSofa.schematics.length > 1;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Autoplay solo para Escritorio
    useEffect(() => {
        if (!hasMultipleImages || isPaused) return;
        const timer = setInterval(() => {
            setCurrentSchematicIndex((prev) => prev === selectedSofa.schematics.length - 1 ? 0 : prev + 1);
        }, AUTOPLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [selectedSofa, isPaused, hasMultipleImages]);

    const nextSchematic = () => {
        if (!hasMultipleImages) return;
        setCurrentSchematicIndex((prev) => prev === selectedSofa.schematics.length - 1 ? 0 : prev + 1);
    };

    const prevSchematic = () => {
        if (!hasMultipleImages) return;
        setCurrentSchematicIndex((prev) => prev === 0 ? selectedSofa.schematics.length - 1 : prev - 1);
    };

    if (!selectedSofa) return null;

    return (
        <>
            <PriceTableModal 
                isOpen={showPriceModal} 
                onClose={() => setShowPriceModal(false)} 
                data={selectedSofa?.priceList}
                title={selectedSofa?.name}
            />

            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex justify-end bg-black/80 h-[100dvh]" 
                onClick={onClose}
            >
                <motion.div 
                    initial={{ x: "100%" }} 
                    animate={{ x: 0 }} 
                    exit={{ x: "100%" }}
                    transition={{ type: "tween", ease: "circOut", duration: 0.35 }} 
                    style={{ willChange: "transform" }}
                    onClick={(e) => e.stopPropagation()} 
                    className="bg-white w-full max-w-5xl h-full shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-l-2xl"
                >
                    {/* IZQUIERDA: GALERÍA DE IMÁGENES */}
                    <div className="md:w-3/5 bg-gray-50 md:p-8 flex flex-col md:gap-6 relative shrink-0 border-b md:border-b-0 border-gray-100">
                        {/* Botón cerrar para móvil */}
                        <button onClick={onClose} className="absolute top-4 right-4 md:hidden bg-white/90 p-2 rounded-full shadow-md border border-gray-100 z-20 text-gray-900">
                            <X size={20} />
                        </button>

                        {/* --- MÓVIL: CARRUSEL DESLIZABLE (SWIPE) --- */}
                        <div className="md:hidden relative w-full bg-white h-[45vh]">
                            <div 
                                className="flex overflow-x-auto snap-x snap-mandatory h-full w-full scrollbar-hide"
                                style={{ scrollBehavior: 'smooth' }}
                                onScroll={(e) => {
                                    // Calcula qué imagen está activa basándose en el scroll
                                    const index = Math.round(e.target.scrollLeft / e.target.clientWidth);
                                    setMobileImageIndex(index);
                                }}
                            >
                                {allImages.map((img, idx) => (
                                    <div key={idx} className="w-full h-full shrink-0 snap-center relative flex items-center justify-center p-6">
                                        <Image 
                                            src={img} 
                                            alt={`${selectedSofa.name} vista ${idx}`} 
                                            fill 
                                            priority={idx === 0}
                                            sizes="100vw"
                                            className="object-contain mix-blend-multiply p-4" 
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Puntos Indicadores (Dots) para móvil */}
                            {allImages.length > 1 && (
                                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-1.5 z-10">
                                    {allImages.map((_, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === mobileImageIndex ? 'w-4 bg-black' : 'w-1.5 bg-gray-300'}`} 
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* --- ESCRITORIO: VISTA ESTÁTICA + ANIMACIÓN TÉCNICA --- */}
                        <div className="hidden md:flex flex-col gap-6 h-full">
                            {/* Imagen Principal Desktop */}
                            <div className="aspect-video w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-4 flex items-center justify-center relative group shrink-0">
                                <div className="relative w-full h-full">
                                    <Image 
                                        src={selectedSofa.image} 
                                        alt="Render" 
                                        fill
                                        priority
                                        className="object-contain mix-blend-multiply"
                                        sizes="60vw"
                                    />
                                </div>
                            </div>
                            
                            {/* Planos Técnicos Desktop */}
                            {selectedSofa.schematics && selectedSofa.schematics.length > 0 && (
                                <div 
                                    className="bg-white p-4 rounded-lg border border-gray-200 relative group shrink-0"
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >
                                    <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-3 flex items-center gap-1 justify-between">
                                        <div className="flex items-center gap-1"><ScanLine size={12} /> Vistas Técnicas</div>
                                        {hasMultipleImages && isPaused && <span className="text-[9px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">Pausado</span>}
                                    </h4>
                                    
                                    <div className="relative h-64 w-full bg-gray-50 rounded border border-gray-100 flex items-center justify-center overflow-hidden">
                                        <AnimatePresence mode='wait'>
                                            <motion.img 
                                                key={currentSchematicIndex}
                                                src={selectedSofa.schematics[currentSchematicIndex]}
                                                alt="Technical View"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                decoding="async"
                                                className="max-w-full max-h-full object-contain p-4 mix-blend-multiply cursor-crosshair"
                                            />
                                        </AnimatePresence>

                                        {hasMultipleImages && (
                                            <>
                                                <button onClick={prevSchematic} className="absolute left-2 p-2 rounded-full bg-white/90 shadow hover:bg-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100">
                                                    <ChevronLeft size={20} />
                                                </button>
                                                <button onClick={nextSchematic} className="absolute right-2 p-2 rounded-full bg-white/90 shadow hover:bg-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100">
                                                    <ChevronRight size={20} />
                                                </button>
                                                
                                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                                    {selectedSofa.schematics.map((_, index) => (
                                                        <div 
                                                            key={index} 
                                                            onClick={() => setCurrentSchematicIndex(index)}
                                                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentSchematicIndex ? 'w-4 bg-black' : 'w-1.5 bg-gray-300 hover:bg-gray-400'}`} 
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* DERECHA: DATOS */}
                    <div className="md:w-2/5 flex flex-col h-full bg-white border-l border-gray-100 relative min-h-0">
                        <div className="p-6 md:p-8 pb-0 shrink-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="inline-block bg-black text-white text-[10px] font-mono px-2 py-1 mb-2">
                                        {selectedSofa.code}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{selectedSofa.name}</h2>
                                </div>
                                <button onClick={onClose} className="hidden md:block hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={24} /></button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-6 pb-32 md:pb-48 scrollbar-hide">
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-blue-600 mb-1"><Ruler size={16} /> <span className="text-[10px] font-bold uppercase">Tamaño</span></div>
                                        <div className="text-sm font-bold text-gray-900">{selectedSofa.specs?.dimensions || "N/A"}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1"><Box size={16} /> <span className="text-[10px] font-bold uppercase">Volumen</span></div>
                                        <div className="text-sm font-bold text-gray-900">{selectedSofa.specs?.volume || "N/A"}</div>
                                    </div>
                                </div>

                                {selectedSofa.colors && (
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 mb-3 flex items-center gap-2">
                                    <Palette size={14} /> Acabados y Carta de Colores
                                    </h3>
                                    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-xl justify-center md:justify-start">
                                    {selectedSofa.colors.interior?.map((color, i) => (
                                        <div key={i} className="text-center group flex flex-col items-center gap-2 cursor-help">
                                        <div 
                                            className="w-12 h-12 rounded-full shadow-md border-2 border-white group-hover:scale-110 transition-transform duration-300" 
                                            style={{ 
                                                backgroundColor: color.hex,
                                                backgroundImage: color.name.includes("Grid") ? 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)' : 'none',
                                                backgroundSize: '4px 4px'
                                            }}
                                            title={color.name}
                                        ></div>
                                        <span className="text-[9px] text-gray-500 uppercase font-bold max-w-[60px] leading-tight">
                                            {color.name}
                                        </span>
                                        </div>
                                    ))}
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                    {selectedSofa.materials?.map((mat, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-300 transition-colors">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${mat.detail === 'Interchangeable' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-100 text-gray-400'}`}>
                                            {mat.detail === 'Interchangeable' ? <RefreshCw size={14} /> : <Lock size={14} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-0.5">
                                            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wide truncate">{mat.part}</span>
                                            {mat.detail === 'Interchangeable' && (
                                                <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">Opcional</span>
                                            )}
                                            </div>
                                            <div className="text-sm font-bold text-gray-900 truncate">{mat.material}</div>
                                            <div className="text-xs text-gray-500 truncate">{mat.detail}</div>
                                        </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                )}

                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 mb-3 flex items-center gap-2"><Layers size={14} /> Composición</h3>
                                    <div className="space-y-2">
                                        {selectedSofa.materials?.map((mat, idx) => (
                                            <div key={idx} className="flex justify-between text-xs">
                                                <span className="text-gray-500">{mat.part}</span>
                                                <div className="text-right">
                                                    <div className="font-medium text-gray-900">{mat.material}</div>
                                                    {mat.detail && <div className="text-[10px] text-gray-400">{mat.detail}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-end border-b border-gray-100 pb-2 mb-3">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                                            <Armchair size={14} /> Variantes
                                        </h3>
                                        <button 
                                            onClick={() => setShowPriceModal(true)}
                                            className="text-[10px] flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded transition-all cursor-pointer font-medium"
                                        >
                                            <Maximize2 size={12} />
                                            Ver lista completa
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        {selectedSofa.configurations?.map((conf, idx) => (
                                            <div key={idx} className={`p-2.5 rounded border flex justify-between items-center text-xs ${conf.code === '4D' || conf.code === '2LE' ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-600'}`}>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold font-mono bg-black/10 px-1.5 rounded">{conf.code}</span>
                                                    <span className="opacity-80">{conf.size}</span>
                                                </div>
                                                <div className="font-bold font-mono">{formatPrice(conf.price)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 md:p-6 z-20">
                            <div className="bg-gray-900 text-white p-4 rounded-lg flex justify-between items-center shadow-lg">
                                <div>
                                    <div className="text-[10px] uppercase text-gray-400 tracking-widest">Precio Estimado</div>
                                    <div className="text-xl font-bold font-mono">{formatPrice(selectedSofa.priceBase)}</div>
                                </div>
                                <Link href="/contacto" className="bg-white text-black px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                                    Cotizar
                                </Link>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </>
    );
});

// --- CATEGORÍAS ---
const categories = ["Todos", "Sofá Estándar", "Modulares", "Butacas"];

// --- PÁGINA PRINCIPAL ---
export default function SofasPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedSofa, setSelectedSofa] = useState(null); 
  
  // 1. ESTADO PARA DATOS Y CARGA
  const [sofas, setSofas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. NUEVO ESTADO PARA BUSQUEDA
  const [searchQuery, setSearchQuery] = useState("");

  // 3. EFECTO PARA CARGAR DESDE SUPABASE
  useEffect(() => {
    const fetchSofas = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('sofas')
          .select('*');

        if (error) {
          console.error('Error fetching sofas:', error);
        } else {
          setSofas(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSofas();
  }, []);

  // 4. MEMOIZACIÓN Y FILTRADO (Categoría + Búsqueda)
  const filteredSofas = useMemo(() => {
    if (isLoading) return [];
    
    return sofas.filter(sofa => {
        // Filtro Categoría
        const matchesCategory = activeCategory === "Todos" || sofa.category === activeCategory;
        
        // Filtro Búsqueda (insensitive)
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
            sofa.name.toLowerCase().includes(query) || 
            (sofa.code && sofa.code.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
    });
  }, [activeCategory, sofas, isLoading, searchQuery]);

  return (
    <div className="bg-white min-h-screen pb-32 font-sans selection:bg-black selection:text-white">
      
      <AnimatePresence>
        {selectedSofa && (
            <ProductDrawer 
                selectedSofa={selectedSofa} 
                onClose={() => setSelectedSofa(null)} 
            />
        )}
      </AnimatePresence>

      {/* HEADER ANIMADO */}
      <div className="relative h-[50vh] bg-[#0a0a0a] overflow-hidden flex items-end pb-12">
        <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
        >
           <Image 
                src="/images/sofa-header.jpg" 
                alt="Header" 
                fill
                priority
                className="w-full h-full object-cover"
           />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        
        <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 container mx-auto px-6"
        >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tighter">COLECCIÓN SOFÁS</motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-300">Ingeniería de confort. Precios directos de fábrica.</motion.p>
        </motion.div>
      </div>

      {/* BARRA DE CONTROL ANIMADA */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm transition-all"
      >
        <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Categorías */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide pb-2 md:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border whitespace-nowrap ${activeCategory === cat ? 'bg-black text-white border-black' : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Buscador Integrado */}
                <div className="relative w-full md:w-64 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    <input 
                        type="text" 
                        placeholder="Buscar modelo o código..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:bg-white focus:border-black transition-all text-gray-900 placeholder:text-gray-400"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

            </div>
        </div>
      </motion.div>

      {/* GRID PRODUCTOS CON CASCADA */}
      <div className="container mx-auto px-6 py-16">
        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p>Cargando catálogo...</p>
            </div>
        ) : (
            <>
                {filteredSofas.length > 0 ? (
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
                    >
                      {filteredSofas.map((sofa) => (
                        <SofaItem 
                          key={sofa.id} 
                          sofa={sofa} 
                          onClick={() => setSelectedSofa(sofa)} 
                        />
                      ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100 border-dashed"
                    >
                        <p className="text-gray-400 text-lg mb-2">No se encontraron resultados para <span className="text-black font-bold">"{searchQuery}"</span></p>
                        <p className="text-gray-400 text-sm">Prueba buscando por el código del producto (ej: HYSF...)</p>
                        <button onClick={() => setSearchQuery("")} className="mt-6 text-xs font-bold uppercase tracking-widest text-black border-b border-black hover:opacity-50 transition-opacity">
                            Limpiar búsqueda
                        </button>
                    </motion.div>
                )}
            </>
        )}
      </div>
    </div>
  );
}