"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Box, Palette, Armchair, Maximize2, Barcode, Search as SearchIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- 1. CONFIGURACIÓN SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- UTILS ---
const EXCHANGE_RATE = 0.13; 

const formatPrice = (priceCNY) => {
    if (!priceCNY) return "-";
    return new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0 
    }).format(priceCNY * EXCHANGE_RATE);
};

// --- VARIANTES DE ANIMACIÓN EXACTAS A "SILLAS" ---
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

// --- COMPONENTE MODAL PRECIOS ---
const PriceTableModal = React.memo(({ isOpen, onClose, data, title }) => {
    if (!isOpen || !data) return null;
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ willChange: "opacity, transform" }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">Lista de Precios: {title}</h3>
                        <p className="text-xs text-gray-500">Estimación en Euros (€)</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                <div className="overflow-auto p-0">
                    <table className="w-full text-xs text-left text-gray-600">
                        <thead className="text-[10px] uppercase bg-white text-gray-700 font-bold sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="p-4 bg-gray-50 border-b">Variante</th>
                                <th className="p-4 bg-gray-50 border-b">Medidas (mm)</th>
                                <th className="p-4 text-right bg-gray-50 border-b">Precio</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold text-gray-900">{row.name}</td>
                                    <td className="p-4 font-mono text-gray-400 text-[10px]">{row.size}</td>
                                    <td className="p-4 text-right font-bold text-gray-900 text-sm">{formatPrice(row.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
});
PriceTableModal.displayName = 'PriceTableModal';

export default function MesasPage() {
  const [products, setProducts] = useState([]);       
  const [isLoading, setIsLoading] = useState(true);   
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");   
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [showPriceModal, setShowPriceModal] = useState(false);
  
  const gridTopRef = useRef(null);

  // --- FETCH DATOS ---
  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchMesas() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('mesas')
          .select('*')
          .order('id', { ascending: true })
          .abortSignal(controller.signal);

        if (error) throw error;
        if (data) setProducts(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
             console.error("Error cargando mesas:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchMesas();
    return () => controller.abort();
  }, []);

  // --- FILTROS ---
  const categories = useMemo(() => {
    if (!products.length) return ["Todos"];
    const uniqueCats = [...new Set(products.map(p => p.category).filter(Boolean))];
    uniqueCats.sort();
    return ["Todos", ...uniqueCats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return products.filter(item => {
      const matchCategory = activeCategory === "Todos" || item.category === activeCategory;
      if (!matchCategory) return false;
      if (searchTerm === "") return true;
      return item.name.toLowerCase().includes(searchLower) || 
             item.code.toLowerCase().includes(searchLower);
    });
  }, [products, activeCategory, searchTerm]);

  // --- SCROLL HANDLE ---
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setTimeout(() => {
        if (gridTopRef.current) {
            const element = gridTopRef.current;
            const rect = element.getBoundingClientRect();
            const absoluteTop = rect.top + window.pageYOffset;
            const offsetPosition = absoluteTop - 140; 
    
            if (window.scrollY > offsetPosition) {
                 window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }, 10);
  };

  // Bloqueo de scroll body
  useEffect(() => {
    if (selectedProduct || showPriceModal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct, showPriceModal]);

  const openModal = (product) => {
      setSelectedProduct(product);
      setShowPriceModal(false);
  };

  return (
    <div className="bg-white min-h-screen pb-32 font-sans selection:bg-black selection:text-white">
      
      <PriceTableModal 
        isOpen={showPriceModal} 
        onClose={() => setShowPriceModal(false)} 
        data={selectedProduct?.priceList}
        title={selectedProduct?.name}
      />

      {/* HEADER ADAPTADO ESTILO "SILLAS" */}
      <div className="relative h-[40vh] md:h-[50vh] bg-[#0a0a0a] overflow-hidden flex items-end pb-12">
        <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
        >
             <Image 
                src="/images/mesas-header.jpg" 
                alt="Header Mesas" 
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
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-7xl font-bold text-white mb-2 tracking-tighter">
              COLECCIÓN MESAS
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-300 max-w-xl text-sm md:text-base">
              Diseño escultórico y materiales nobles.
            </motion.p>
        </motion.div>
      </div>

      {/* BARRA DE FILTROS ADAPTADA ESTILO "SOFÁS/SILLAS" */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300"
      >
        <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Contenedor de Categorías (Scroll oculto nativo y sin recortes) */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border whitespace-nowrap 
                        ${activeCategory === cat 
                            ? 'bg-black text-white border-black' 
                            : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Buscador Integrado */}
                <div className="relative group w-full md:w-72 shrink-0">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
                    <input 
                        type="text" 
                        placeholder="BUSCAR MESA..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#F5F5F5] border border-transparent focus:bg-white focus:border-gray-200 rounded-full py-2.5 pl-11 pr-4 text-xs font-bold uppercase tracking-wide focus:ring-0 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-black transition-colors"
                        >
                            <X size={12} />
                        </button>
                    )}
                </div>
            </div>
        </div>
      </motion.div>

      {/* GRID PRODUCTOS */}
      <div className="container mx-auto px-6 py-12" ref={gridTopRef}>
        {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 aspect-[4/3] rounded-sm mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                ))}
            </div>
        ) : filteredProducts.length === 0 ? (
            <div className="text-center py-32 text-gray-400 flex flex-col items-center">
                <SearchIcon size={48} className="mb-4 opacity-20" />
                <p className="text-lg">No encontramos mesas.</p>
                <button onClick={() => {setSearchTerm(""); handleCategoryChange("Todos")}} className="mt-4 text-xs font-bold uppercase border-b border-black pb-0.5 hover:opacity-50 transition-opacity">
                    Limpiar filtros
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                <AnimatePresence mode="popLayout">
                {filteredProducts.map((item, index) => (
                <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    key={item.id} 
                    className="group block h-full flex flex-col relative"
                >
                    <div 
                        onClick={() => openModal(item)} 
                        className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white mb-4 cursor-pointer"
                    >
                        <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur text-black border border-gray-100 text-[10px] font-mono px-2 py-1 flex items-center gap-2 rounded shadow-sm">
                                <Barcode size={10} /> {item.code}
                            </div>
                        </div>
                        
                        <div className="relative w-full h-full p-8 transition-transform duration-500 ease-out group-hover:scale-105">
                             <Image 
                                src={item.image || "/images/placeholder.jpg"} 
                                alt={item.name}
                                fill
                                priority={index < 6}
                                sizes="100px"
                                unoptimized
                                className="object-contain"
                             />
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-xl rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                Ver Detalles
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-lg font-medium text-gray-900 leading-tight group-hover:text-gray-600 transition-colors cursor-pointer" onClick={() => openModal(item)}>{item.name}</h3>
                            <span className="text-sm font-bold text-gray-900 whitespace-nowrap ml-4">{formatPrice(item.priceBase)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mr-2">{item.category}</p>
                            {item.colors?.interior && (
                                <div className="flex -space-x-1">
                                    {item.colors.interior.slice(0, 4).map((c, i) => (
                                        <div 
                                            key={i} 
                                            className="w-3 h-3 rounded-full border border-white shadow-sm" 
                                            style={{ backgroundColor: c.hex }}
                                        />
                                    ))}
                                    {item.colors.interior.length > 4 && (
                                        <div className="w-3 h-3 rounded-full bg-gray-100 border border-white flex items-center justify-center text-[6px] text-gray-500">
                                            +
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
                ))}
                </AnimatePresence>
            </div>
        )}
      </div>

      {/* DRAWER DETALLE */}
      <AnimatePresence>
        {selectedProduct && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50 flex justify-end bg-black/60 h-[100dvh]" 
                onClick={() => setSelectedProduct(null)}
            >
                <motion.div 
                    initial={{ x: "100%" }} 
                    animate={{ x: 0 }} 
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.8 }} 
                    style={{ willChange: "transform" }}
                    onClick={(e) => e.stopPropagation()} 
                    className="bg-white w-full max-w-5xl h-full shadow-2xl flex flex-col md:flex-row overflow-hidden md:rounded-l-2xl"
                >
                    {/* IZQUIERDA: IMAGEN */}
                    <div className="md:w-3/5 bg-white p-6 md:p-8 flex items-center justify-center relative shrink-0 border-b md:border-b-0 border-gray-100">
                         <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 md:hidden bg-white p-2 rounded-full shadow-lg border border-gray-100 z-10 text-gray-900 active:scale-95 transition-transform"><X size={20} /></button>

                        <div className="relative w-full h-[40vh] md:h-full flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                                className="relative w-full h-full"
                            >
                                <Image 
                                    src={selectedProduct.image} 
                                    alt={selectedProduct.name} 
                                    fill
                                    className="object-contain p-4 md:p-12"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* DERECHA: DATOS */}
                    <div className="md:w-2/5 flex flex-col h-full bg-white border-l border-gray-100 relative min-h-0">
                        {/* Cabecera */}
                        <div className="p-6 md:p-8 pb-4 shrink-0 bg-white z-10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="inline-block bg-black text-white text-[10px] font-mono px-2 py-1 mb-3 rounded-sm">
                                        {selectedProduct.code}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{selectedProduct.name}</h2>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-2">{selectedProduct.category}</p>
                                </div>
                                <button onClick={() => setSelectedProduct(null)} className="hidden md:block hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={24} /></button>
                            </div>
                        </div>

                        {/* Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-0 pb-32 md:pb-40 scrollbar-hide">
                            <div className="space-y-8 mt-4">
                                {/* Dimensiones */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                        <div className="flex items-center gap-2 text-blue-600 mb-1"><Ruler size={16} /> <span className="text-[10px] font-bold uppercase">Medidas</span></div>
                                        <div className="text-sm font-bold text-gray-900">{selectedProduct.specs?.dimensions || "N/A"}</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1"><Box size={16} /> <span className="text-[10px] font-bold uppercase">Volumen</span></div>
                                        <div className="text-sm font-bold text-gray-900">{selectedProduct.specs?.volume || "N/A"}</div>
                                    </div>
                                </div>

                                {/* Colores */}
                                {selectedProduct.colors?.interior && selectedProduct.colors.interior.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-2">
                                        <Palette size={14} /> Acabados Disponibles
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                    {selectedProduct.colors.interior.map((color, i) => (
                                        <div key={i} className="group relative">
                                            <div 
                                                className="w-10 h-10 rounded-full shadow-sm border border-gray-200 cursor-help transition-transform hover:scale-110" 
                                                style={{ backgroundColor: color.hex }}
                                                title={color.name}
                                            ></div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                )}

                                {/* Materiales */}
                                {selectedProduct.materials && (
                                    <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
                                    {selectedProduct.materials.map((mat, idx) => (
                                        <div key={idx} className="p-4 bg-white hover:bg-gray-50 transition-colors">
                                            <span className="text-[9px] font-bold uppercase text-gray-400 block mb-1 tracking-wide">{mat.part}</span>
                                            <div className="text-sm font-bold text-gray-900">{mat.material}</div>
                                            {mat.detail && <div className="text-xs text-gray-500 mt-0.5">{mat.detail}</div>}
                                        </div>
                                    ))}
                                    </div>
                                )}

                                {/* Configuraciones */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                                            <Armchair size={14} /> Opciones
                                        </h3>
                                        <button 
                                            onClick={() => setShowPriceModal(true)}
                                            className="text-[10px] flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors font-bold uppercase tracking-wide"
                                        >
                                            <Maximize2 size={12} /> Ver Tabla Precios
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        {selectedProduct.configurations?.map((conf, idx) => (
                                            <div key={idx} className="p-3 rounded-lg border border-dashed border-gray-200 flex justify-between items-center text-xs group hover:border-gray-300 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">{conf.code}</span>
                                                    <span className="text-gray-600 font-medium">{conf.desc}</span>
                                                </div>
                                                <div className="font-bold font-mono text-gray-900">{formatPrice(conf.price)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Fijo */}
                        <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 z-20">
                            <div className="flex gap-4 items-center">
                                <div className="flex-1">
                                    <div className="text-[10px] uppercase text-gray-400 tracking-widest font-bold">Precio Base</div>
                                    <div className="text-2xl font-bold font-mono text-gray-900">{formatPrice(selectedProduct.priceBase)}</div>
                                </div>
                                <Link href="/contacto" className="flex-1 bg-black text-white text-center py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-transform active:scale-95 shadow-lg shadow-gray-200">
                                    Solicitar Info
                                </Link>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}