"use client";

import React, { useState, useEffect, useMemo, memo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ScanLine, Ruler, Box, Palette, RefreshCw, Lock, Layers, Armchair, Maximize2, Barcode, Search } from 'lucide-react';

// --- CONFIGURACIÓN SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- CONSTANTES ---
const EXCHANGE_RATE = 0.13;
const AUTOPLAY_INTERVAL = 3000;

const formatPrice = (priceCNY) => {
    if (!priceCNY) return "-";
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    }).format(priceCNY * EXCHANGE_RATE);
};

// --- VARIANTES DE ANIMACIÓN ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- COMPONENTE MODAL PRECIOS ---
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
                <div className="overflow-auto p-0 scrollbar-hide">
                    <table className="w-full text-xs text-left text-gray-600 min-w-[700px]">
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
                                    <td className="p-3 font-bold text-gray-900 bg-gray-50/30 sticky left-0 z-10">{row.name}</td>
                                    <td className="p-3 font-mono text-gray-400 text-[10px] whitespace-nowrap">{row.size}</td>
                                    <td className="p-3 text-center font-medium">{formatPrice(row.prices?.fa)}</td>
                                    <td className="p-3 text-center font-medium">{formatPrice(row.prices?.fb)}</td>
                                    <td className="p-3 text-center font-bold text-blue-700 bg-blue-50/30">{formatPrice(row.prices?.fc)}</td>
                                    <td className="p-3 text-center font-medium text-gray-500">{formatPrice(row.prices?.la)}</td>
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

// --- COMPONENTE DRAWER ---
const ProductDrawer = memo(({ selectedProduct, onClose }) => {
    const [currentSchematicIndex, setCurrentSchematicIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [mobileImageIndex, setMobileImageIndex] = useState(0);
    const [selectedColorIdx, setSelectedColorIdx] = useState(null);

    // Imagen principal: usa color.image directo, sin depender del orden de schematics
    const mainImage = useMemo(() => {
        if (selectedColorIdx !== null) {
            const img = selectedProduct?.colors?.interior?.[selectedColorIdx]?.image;
            if (img) return img;
        }
        return selectedProduct?.image;
    }, [selectedProduct, selectedColorIdx]);

    // Resetea color al cambiar producto
    useEffect(() => { setSelectedColorIdx(null); }, [selectedProduct?.id]);

    const allImages = useMemo(() => {
        if (!selectedProduct) return [];
        return [selectedProduct.image, ...(selectedProduct.schematics || [])];
    }, [selectedProduct]);

    const hasMultipleImages = selectedProduct?.schematics && selectedProduct.schematics.length > 0;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    useEffect(() => {
        if (!hasMultipleImages || isPaused) return;
        const timer = setInterval(() => {
            setCurrentSchematicIndex((prev) => prev === selectedProduct.schematics.length - 1 ? 0 : prev + 1);
        }, AUTOPLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [selectedProduct, isPaused, hasMultipleImages]);

    const nextSchematic = () => {
        if (!hasMultipleImages) return;
        setCurrentSchematicIndex((prev) => prev === selectedProduct.schematics.length - 1 ? 0 : prev + 1);
    };

    const prevSchematic = () => {
        if (!hasMultipleImages) return;
        setCurrentSchematicIndex((prev) => prev === 0 ? selectedProduct.schematics.length - 1 : prev - 1);
    };

    if (!selectedProduct) return null;

    return (
        <>
            <PriceTableModal
                isOpen={showPriceModal}
                onClose={() => setShowPriceModal(false)}
                data={selectedProduct?.priceList}
                title={selectedProduct?.name}
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
                    className="bg-white w-full max-w-5xl h-full shadow-2xl flex flex-col md:flex-row overflow-hidden md:rounded-l-2xl"
                >
                    {/* IZQUIERDA: GALERÍA */}
                    <div className="md:w-3/5 bg-gray-50 md:p-8 flex flex-col md:gap-6 relative shrink-0 border-b md:border-b-0 border-gray-100">
                        <button onClick={onClose} className="absolute top-4 right-4 md:hidden bg-white/90 p-2 rounded-full shadow-md border border-gray-100 z-20 text-gray-900">
                            <X size={20} />
                        </button>

                        {/* MÓVIL: CARRUSEL DESLIZABLE */}
                        <div className="md:hidden relative w-full bg-white h-[45vh]">
                            <div
                                className="flex overflow-x-auto snap-x snap-mandatory h-full w-full scrollbar-hide"
                                style={{ scrollBehavior: 'smooth' }}
                                onScroll={(e) => {
                                    const index = Math.round(e.target.scrollLeft / e.target.clientWidth);
                                    setMobileImageIndex(index);
                                }}
                            >
                                {allImages.map((img, idx) => (
                                    <div key={idx} className="w-full h-full shrink-0 snap-center relative flex items-center justify-center p-6">
                                        <Image
                                            src={img}
                                            alt={`${selectedProduct.name} vista ${idx}`}
                                            fill
                                            priority={idx === 0}
                                            sizes="100vw"
                                            className="object-contain mix-blend-multiply p-4"
                                        />
                                    </div>
                                ))}
                            </div>
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

                        {/* ESCRITORIO: IMAGEN + PLANOS TÉCNICOS */}
                        <div className="hidden md:flex flex-col gap-6 h-full">
                            <div className="aspect-video w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-4 flex items-center justify-center relative group shrink-0">
                                <div className="relative w-full h-full">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={mainImage}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={mainImage}
                                                alt="Render"
                                                fill
                                                priority
                                                className="object-contain mix-blend-multiply"
                                                sizes="60vw"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {selectedProduct.schematics && selectedProduct.schematics.length > 0 && (
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
                                                src={selectedProduct.schematics[currentSchematicIndex]}
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
                                                    {selectedProduct.schematics.map((_, index) => (
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
                                        {selectedProduct.code}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{selectedProduct.name}</h2>
                                </div>
                                <button onClick={onClose} className="hidden md:block hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={24} /></button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-6 pb-32 md:pb-48 scrollbar-hide">
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-blue-600 mb-1"><Ruler size={16} /> <span className="text-[10px] font-bold uppercase">Tamaño</span></div>
                                        <div className="text-sm font-bold text-gray-900">{selectedProduct.specs?.dimensions || "N/A"}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1"><Box size={16} /> <span className="text-[10px] font-bold uppercase">Volumen</span></div>
                                        <div className="text-sm font-bold text-gray-900">{selectedProduct.specs?.volume || "N/A"}</div>
                                    </div>
                                </div>

                                {selectedProduct.colors && (
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 mb-3 flex items-center gap-2">
                                            <Palette size={14} /> Acabados y Carta de Colores
                                        </h3>
                                        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-xl justify-center md:justify-start">
                                            {selectedProduct.colors.interior?.map((color, i) => {
                                                const isSelected = selectedColorIdx === i;
                                                const hasImage = !!selectedProduct.schematics?.[i];
                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => setSelectedColorIdx(isSelected ? null : i)}
                                                        className={`flex flex-col items-center gap-2 transition-all duration-200 ${hasImage ? 'cursor-pointer' : 'cursor-default'}`}
                                                        title={color.name}
                                                    >
                                                        <div
                                                            className={`w-12 h-12 rounded-full shadow-md transition-all duration-300 hover:scale-110
                                                                ${isSelected
                                                                    ? 'border-4 border-black scale-110 shadow-lg'
                                                                    : 'border-2 border-white'}`}
                                                            style={{ backgroundColor: color.hex }}
                                                        />
                                                        <span className={`text-[9px] uppercase font-bold max-w-[60px] leading-tight transition-colors
                                                            ${isSelected ? 'text-black' : 'text-gray-400'}`}>
                                                            {color.name}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            {selectedProduct.materials?.map((mat, idx) => (
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
                                        {selectedProduct.materials?.map((mat, idx) => (
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
                                        {selectedProduct.configurations?.map((conf, idx) => (
                                            <div key={idx} className={`p-2.5 rounded border flex justify-between items-center text-xs ${conf.code === '1S' || conf.code === 'LCH' ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-600'}`}>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold font-mono bg-black/10 px-1.5 rounded">{conf.code}</span>
                                                    <span className="opacity-80">{conf.desc || conf.size}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 md:p-6 z-20">
                            <Link href="/contacto" className="block w-full bg-black text-white text-center px-6 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-black/20">
                                Solicitar Cotización
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
});
ProductDrawer.displayName = 'ProductDrawer';

// --- TARJETA DE PRODUCTO ---
const ProductCard = memo(({ item, index, onSelect }) => {
    const [hoverColorIdx, setHoverColorIdx] = useState(null);

    const cardImage = useMemo(() => {
        if (hoverColorIdx !== null) {
            const img = item.colors?.interior?.[hoverColorIdx]?.image;
            if (img) return img;
        }
        return item.image || "/images/placeholder.jpg";
    }, [item, hoverColorIdx]);

    return (
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
                onClick={() => onSelect(item)}
                className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white mb-4 cursor-pointer"
            >
                <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur text-black border border-gray-100 text-[10px] font-mono px-2 py-1 flex items-center gap-2 rounded shadow-sm">
                        <Barcode size={10} /> {item.code}
                    </div>
                </div>

                <div className="relative w-full h-full p-8 transition-transform duration-500 ease-out group-hover:scale-105">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={cardImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 p-8"
                        >
                            <Image
                                src={cardImage}
                                alt={item.name}
                                fill
                                priority={index < 6}
                                sizes="400px"
                                unoptimized
                                className="object-contain"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-xl rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Ver Detalles
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                    <h3
                        className="text-lg font-medium text-gray-900 leading-tight group-hover:text-gray-600 transition-colors cursor-pointer"
                        onClick={() => onSelect(item)}
                    >
                        {item.name}
                    </h3>
                </div>

                <div className="flex items-center gap-2 mt-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mr-2">{item.category}</p>
                    {item.colors?.interior && (
                        <div className="flex gap-1.5">
                            {item.colors.interior.slice(0, 5).map((c, i) => (
                                <div
                                    key={i}
                                    className={`w-4 h-4 rounded-full border-2 shadow-sm cursor-pointer transition-all duration-200
                                        ${hoverColorIdx === i ? 'border-black scale-125' : 'border-white hover:scale-110'}`}
                                    style={{ backgroundColor: c.hex }}
                                    title={c.name}
                                    onMouseEnter={() => setHoverColorIdx(i)}
                                    onMouseLeave={() => setHoverColorIdx(null)}
                                />
                            ))}
                            {item.colors.interior.length > 5 && (
                                <div className="w-4 h-4 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[6px] text-gray-500 shadow-sm">+</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
});
ProductCard.displayName = 'ProductCard';

// --- PÁGINA PRINCIPAL ---
// Extrae el tipo de tapizado: "Tela" o "Piel"
function getMaterialType(product) {
    const main = product.materials?.[0]?.material || "";
    if (/leather|piel|cuero/i.test(main)) return "Piel";
    return "Tela";
}

// Extrae el máximo de plazas del producto (por configuraciones)
function getMaxSeats(product) {
    const codes = (product.configurations || []).map(c => c.code || "");
    const nums = codes.map(c => {
        const m = c.match(/^(\d+)/);
        return m ? parseInt(m[1]) : 0;
    });
    return nums.length ? Math.max(...nums) : 0;
}

export default function SofasPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeMaterial, setActiveMaterial] = useState("Todos");
    const [activeSeats, setActiveSeats] = useState("Todos");
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const gridTopRef = useRef(null);
    const filtersRef = useRef(null);

    // Scroll horizontal con rueda del ratón en filtros
    useEffect(() => {
        const el = filtersRef.current;
        if (!el) return;
        const handleWheel = (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
        };
        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => el.removeEventListener("wheel", handleWheel);
    }, []);

    // --- FETCH DATOS ---
    useEffect(() => {
        const controller = new AbortController();
        async function fetchSofas() {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('sofas')
                    .select('*')
                    .order('id', { ascending: true })
                    .abortSignal(controller.signal);
                if (error) throw error;
                if (data) setProducts(data);
            } catch (error) {
                if (error.name !== 'AbortError') console.error("Error cargando sofás:", error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSofas();
        return () => controller.abort();
    }, []);

    // --- FILTROS ---
    const categories = useMemo(() => {
        if (!products.length) return ["Todos"];
        const uniqueCats = [...new Set(products.map(p => p.category).filter(Boolean))];
        uniqueCats.sort();
        return ["Todos", ...uniqueCats];
    }, [products]);

    // Precio mínimo y máximo reales del catálogo
    const [priceMin, priceMax] = useMemo(() => {
        if (!products.length) return [0, 100000];
        const prices = products.map(p => p.priceBase || 0).filter(Boolean);
        return [Math.min(...prices), Math.max(...prices)];
    }, [products]);

    // Inicializa el rango cuando llegan los datos
    useEffect(() => {
        if (products.length) setPriceRange([priceMin, priceMax]);
    }, [priceMin, priceMax]);

    const filteredProducts = useMemo(() => {
        const searchLower = searchTerm.toLowerCase();
        return products.filter(item => {
            const matchCategory = activeCategory === "Todos" || item.category === activeCategory;
            if (!matchCategory) return false;
            const matchMaterial = activeMaterial === "Todos" || getMaterialType(item) === activeMaterial;
            if (!matchMaterial) return false;
            const seats = getMaxSeats(item);
            const matchSeats = activeSeats === "Todos"
                || (activeSeats === "4+" ? seats >= 4 : seats === parseInt(activeSeats));
            if (!matchSeats) return false;
            const price = item.priceBase || 0;
            if (price && (price < priceRange[0] || price > priceRange[1])) return false;
            if (searchTerm === "") return true;
            return item.name.toLowerCase().includes(searchLower) ||
                item.code?.toLowerCase().includes(searchLower);
        });
    }, [products, activeCategory, searchTerm, activeMaterial, activeSeats, priceRange]);

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        setTimeout(() => {
            if (gridTopRef.current) {
                const rect = gridTopRef.current.getBoundingClientRect();
                const absoluteTop = rect.top + window.pageYOffset;
                const offsetPosition = absoluteTop - 140;
                if (window.scrollY > offsetPosition) {
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }
        }, 10);
    };

    return (
        <div className="bg-white min-h-screen pb-32 font-sans selection:bg-black selection:text-white">

            <AnimatePresence>
                {selectedProduct && (
                    <ProductDrawer
                        selectedProduct={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </AnimatePresence>

            {/* HEADER */}
            <div className="relative h-[55vh] md:h-[65vh] bg-[#0a0a0a] overflow-hidden flex items-end pb-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        poster="/images/sofa-header.jpg"
                        className="w-full h-full object-cover opacity-60 scale-110"
                    >
                        <source src="/videos/sofa-hero.webm" type="video/webm" />
                        <source src="/videos/sofa-hero.mp4" type="video/mp4" />
                    </video>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 container mx-auto px-6"
                >
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-7xl font-bold text-white mb-2 tracking-tighter">
                        COLECCIÓN SOFÁS
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-gray-300 max-w-xl text-sm md:text-base">
                        Ingeniería de confort. Diseño directo de fábrica.
                    </motion.p>
                </motion.div>
            </div>

            {/* BARRA DE FILTROS */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300"
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                        <div
                            ref={filtersRef}
                            className="flex gap-2 overflow-x-auto flex-1 pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                        >
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

                        <div className="flex items-center gap-3 shrink-0">
                            {!isLoading && (
                                <span className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                                </span>
                            )}
                            <div className="relative group w-full md:w-72">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
                                <input
                                    type="text"
                                    placeholder="BUSCAR SOFÁ..."
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
                </div>
            </motion.div>

            {/* GRID PRODUCTOS */}
            <div className="container mx-auto px-6 py-12" ref={gridTopRef}>
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 aspect-[4/3] rounded-sm mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-32 text-gray-400 flex flex-col items-center">
                        <Search size={48} className="mb-4 opacity-20" />
                        <p className="text-lg">No encontramos sofás.</p>
                        <button
                            onClick={() => { setSearchTerm(""); handleCategoryChange("Todos"); }}
                            className="mt-4 text-xs font-bold uppercase border-b border-black pb-0.5 hover:opacity-50 transition-opacity"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((item, index) => (
                                <ProductCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onSelect={setSelectedProduct}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
