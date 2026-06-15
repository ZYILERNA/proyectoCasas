"use client";

import React, { useState, useEffect, useMemo, memo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ScanLine, Ruler, Box, Palette, RefreshCw, Lock, Layers, Maximize2, Barcode, Search, BookOpen } from 'lucide-react';

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

const getAllColors = (colors) => {
    if (!colors) return [];
    return Object.values(colors).flat();
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- MODAL PRECIOS ---
const PriceTableModal = memo(({ isOpen, onClose, data, title }) => {
    if (!isOpen || !data) return null;
    const isSimpleFormat = data.some(row => row.prices?.unique !== undefined);

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
                    <table className={`w-full text-xs text-left text-gray-600 ${isSimpleFormat ? 'min-w-[400px]' : 'min-w-[800px]'}`}>
                        <thead className="text-[10px] uppercase bg-white text-gray-700 font-bold sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="p-3 bg-gray-50 border-b">Modelo</th>
                                <th className="p-3 bg-gray-50 border-b">Medidas (mm)</th>
                                {isSimpleFormat ? (
                                    <th className="p-3 text-center bg-emerald-50/50 text-emerald-800 border-b border-emerald-100">Precio Unitario</th>
                                ) : (
                                    <>
                                        <th className="p-3 text-center bg-blue-50/50 text-blue-800 border-b border-blue-100">Tela A</th>
                                        <th className="p-3 text-center bg-blue-50/50 text-blue-800 border-b border-blue-100">Tela B</th>
                                        <th className="p-3 text-center bg-blue-100/50 text-blue-900 border-b border-blue-200">Tela C</th>
                                        <th className="p-3 text-center bg-blue-50/50 text-blue-800 border-b border-blue-100">Tela D</th>
                                        <th className="p-3 text-center bg-blue-50/50 text-blue-800 border-b border-blue-100">Tela E</th>
                                        <th className="p-3 text-center bg-orange-50/50 text-orange-800 border-b border-orange-100">Piel A</th>
                                        <th className="p-3 text-center bg-orange-50/50 text-orange-800 border-b border-orange-100">Piel B</th>
                                        <th className="p-3 text-center bg-orange-50/50 text-orange-800 border-b border-orange-100">Piel C</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 font-bold text-gray-900 bg-gray-50/30 sticky left-0 z-10">{row.name}</td>
                                    <td className="p-3 font-mono text-gray-400 text-[10px] whitespace-nowrap">{row.size}</td>
                                    {isSimpleFormat ? (
                                        <td className="p-3 text-center font-bold text-emerald-700 bg-emerald-50/30">
                                            {formatPrice(row.prices?.unique)}
                                        </td>
                                    ) : (
                                        <>
                                            <td className="p-3 text-center font-medium">{formatPrice(row.prices?.fa)}</td>
                                            <td className="p-3 text-center font-medium">{formatPrice(row.prices?.fb)}</td>
                                            <td className="p-3 text-center font-bold text-blue-700 bg-blue-50/30">{formatPrice(row.prices?.fc)}</td>
                                            <td className="p-3 text-center font-medium">{formatPrice(row.prices?.fd)}</td>
                                            <td className="p-3 text-center font-medium">{formatPrice(row.prices?.fe)}</td>
                                            <td className="p-3 text-center font-medium text-gray-700 bg-orange-50/10">{formatPrice(row.prices?.la)}</td>
                                            <td className="p-3 text-center font-medium text-gray-700 bg-orange-50/10">{formatPrice(row.prices?.lb)}</td>
                                            <td className="p-3 text-center font-medium text-gray-700 bg-orange-50/10">{formatPrice(row.prices?.lc)}</td>
                                        </>
                                    )}
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

// --- DRAWER ---
const ProductDrawer = memo(({ selectedProduct, onClose }) => {
    const [currentSchematicIndex, setCurrentSchematicIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [mobileImageIndex, setMobileImageIndex] = useState(0);
    const [selectedColorIdx, setSelectedColorIdx] = useState(null);
    const mobileScrollRef = useRef(null);

    const mainImage = useMemo(() => {
        if (selectedColorIdx !== null) {
            const img = getAllColors(selectedProduct?.colors)?.[selectedColorIdx]?.image;
            if (img) return img;
        }
        return selectedProduct?.image;
    }, [selectedProduct, selectedColorIdx]);

    useEffect(() => {
        setSelectedColorIdx(null);
        setCurrentSchematicIndex(0);
        if (mobileScrollRef.current) mobileScrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }, [selectedProduct?.id]);

    useEffect(() => {
        if (selectedColorIdx === null) return;
        const colorImg = getAllColors(selectedProduct?.colors)?.[selectedColorIdx]?.image;
        if (!colorImg) return;
        const schemIdx = (selectedProduct?.schematics || []).indexOf(colorImg);
        if (schemIdx !== -1) setCurrentSchematicIndex(schemIdx);
        if (mobileScrollRef.current) {
            const allImgs = [selectedProduct.image, ...(selectedProduct.schematics || [])];
            const mIdx = allImgs.indexOf(colorImg);
            if (mIdx !== -1) mobileScrollRef.current.scrollTo({ left: mIdx * mobileScrollRef.current.clientWidth, behavior: 'smooth' });
        }
    }, [selectedColorIdx, selectedProduct]);

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
    }, [selectedProduct, isPaused, hasMultipleImages, currentSchematicIndex]);

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

                        {/* MÓVIL: CARRUSEL */}
                        <div className="md:hidden relative w-full bg-white h-[45vh]">
                            <div
                                ref={mobileScrollRef}
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

                        {/* ESCRITORIO: IMAGEN + GALERÍA CON THUMBNAILS */}
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
                                    className="bg-white rounded-xl border border-gray-100 overflow-hidden shrink-0 group"
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >
                                    <div className="flex items-center gap-1.5 text-gray-400 px-4 pt-3 pb-2">
                                        <ScanLine size={11} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Galería</span>
                                    </div>

                                    <div className="relative h-56 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={currentSchematicIndex}
                                                src={selectedProduct.schematics[currentSchematicIndex]}
                                                alt="Vista"
                                                initial={{ opacity: 0, scale: 0.97 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 1.02 }}
                                                transition={{ duration: 0.25 }}
                                                decoding="async"
                                                className="max-w-full max-h-full object-contain p-4 mix-blend-multiply"
                                            />
                                        </AnimatePresence>
                                        {hasMultipleImages && (
                                            <>
                                                <button onClick={prevSchematic} className="absolute left-2 p-1.5 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                                                    <ChevronLeft size={16} />
                                                </button>
                                                <button onClick={nextSchematic} className="absolute right-2 p-1.5 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                                                    <ChevronRight size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {hasMultipleImages && (
                                        <div className="flex gap-1.5 px-3 pb-3 pt-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                                            {selectedProduct.schematics.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentSchematicIndex(idx)}
                                                    className={`shrink-0 w-14 h-10 rounded-md overflow-hidden border-2 transition-all duration-200
                                                        ${idx === currentSchematicIndex ? 'border-black opacity-100' : 'border-transparent opacity-40 hover:opacity-70'}`}
                                                >
                                                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply bg-gray-50 p-0.5" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
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
                                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1"><Layers size={16} /> <span className="text-[10px] font-bold uppercase">Montaje</span></div>
                                        <div className="text-sm font-bold text-gray-900">{selectedProduct.specs?.assembly || "N/A"}</div>
                                    </div>
                                </div>

                                {selectedProduct.colors && (
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 mb-3 flex items-center gap-2">
                                        <Palette size={14} /> Acabados y Carta de Colores
                                    </h3>
                                    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-xl justify-center md:justify-start">
                                        {getAllColors(selectedProduct.colors).map((color, i) => {
                                            const isSelected = selectedColorIdx === i;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedColorIdx(isSelected ? null : i)}
                                                    className="flex flex-col items-center gap-2 transition-all duration-200"
                                                    title={color.name}
                                                >
                                                    <div
                                                        className={`w-12 h-12 rounded-full shadow-md transition-all duration-300 hover:scale-110 overflow-hidden
                                                            ${isSelected ? 'border-2 border-black scale-110 shadow-lg' : 'border-2 border-white'}`}
                                                        style={color.image
                                                            ? { backgroundImage: `url(${color.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                                                            : { backgroundColor: color.hex }}
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
                                            <BookOpen size={14} /> Variantes
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
                                            <div key={idx} className="p-2.5 rounded border flex justify-between items-center text-xs border-gray-100 text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold font-mono bg-black/10 px-1.5 rounded">{conf.code}</span>
                                                    <span className="opacity-80">{conf.desc || conf.size}</span>
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
                                    <div className="text-xl font-bold font-mono">{formatPrice(selectedProduct.priceBase)}</div>
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
ProductDrawer.displayName = 'ProductDrawer';

// --- TARJETA DE PRODUCTO ---
const ProductCard = memo(({ item, index, onSelect }) => {
    const [hoverColorIdx, setHoverColorIdx] = useState(null);
    const cardImage = useMemo(() => {
        if (hoverColorIdx !== null) {
            const img = getAllColors(item.colors)?.[hoverColorIdx]?.image;
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
                <div className="relative w-full h-full p-4 md:p-8 transition-transform duration-500 ease-out group-hover:scale-105">
                    <Image
                        src={cardImage}
                        alt={item.name}
                        fill
                        priority={index < 6}
                        sizes="400px"
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
            <div className="flex flex-col gap-0.5">
                <div className="flex justify-between items-baseline gap-1">
                    <h3 className="text-sm md:text-lg font-medium text-gray-900 leading-tight group-hover:text-gray-600 transition-colors cursor-pointer" onClick={() => onSelect(item)}>{item.name}</h3>
                    <span className="text-xs md:text-sm font-bold text-gray-900 whitespace-nowrap">{formatPrice(item.priceBase)}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest mr-1">{item.category}</p>
                    {getAllColors(item.colors).length > 0 && (
                        <div className="flex -space-x-1">
                            {getAllColors(item.colors).slice(0, 4).map((c, i) => (
                                <div
                                    key={i}
                                    className={`w-4 h-4 rounded-full border-2 shadow-sm cursor-pointer transition-all duration-200 overflow-hidden
                                        ${hoverColorIdx === i ? 'border-black scale-125' : 'border-white hover:scale-110'}`}
                                    style={c.image
                                        ? { backgroundImage: `url(${c.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                                        : { backgroundColor: c.hex }}
                                    onMouseEnter={() => setHoverColorIdx(i)}
                                    onMouseLeave={() => setHoverColorIdx(null)}
                                />
                            ))}
                            {getAllColors(item.colors).length > 4 && (
                                <div className="w-4 h-4 rounded-full bg-gray-100 border border-white flex items-center justify-center text-[6px] text-gray-500">+</div>
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
export default function GabinetesPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeColor, setActiveColor] = useState(null);
  const [activeMaterial, setActiveMaterial] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const gridTopRef = useRef(null);
  const filtersRef = useRef(null);

  useEffect(() => {
    const el = filtersRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      if (e.deltaY !== 0) { e.preventDefault(); el.scrollLeft += e.deltaY; }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchGabinetes() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('gabinetes')
          .select('*')
          .order('id', { ascending: true })
          .abortSignal(controller.signal);
        if (error) throw error;
        if (data) setProducts(data);
      } catch (error) {
        if (error.name !== 'AbortError') console.error("Error cargando gabinetes:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGabinetes();
    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    if (!products.length) return ["Todos"];
    const uniqueCats = [...new Set(products.map(p => p.category).filter(Boolean))];
    uniqueCats.sort();
    return ["Todos", ...uniqueCats];
  }, [products]);

  const allColors = useMemo(() => {
    const set = new Set();
    products.forEach(p => (p.colores_disponibles || []).forEach(c => set.add(c)));
    return [...set].sort();
  }, [products]);

  const allMaterials = useMemo(() => {
    const set = new Set();
    products.forEach(p => (p.materiales_disponibles || []).forEach(m => set.add(m)));
    return [...set].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return products.filter(item => {
      if (activeCategory !== "Todos" && item.category !== activeCategory) return false;
      if (activeColor && !(item.colores_disponibles || []).includes(activeColor)) return false;
      if (activeMaterial && !(item.materiales_disponibles || []).includes(activeMaterial)) return false;
      if (searchTerm === "") return true;
      return item.name.toLowerCase().includes(searchLower) ||
             item.code.toLowerCase().includes(searchLower);
    });
  }, [products, activeCategory, activeColor, activeMaterial, searchTerm]);

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

      {/* HEADER */}
      <div className="relative h-[35vh] md:h-[65vh] bg-[#0a0a0a] overflow-hidden flex items-end pb-8 md:pb-12">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
        >
            <video
                autoPlay loop muted playsInline preload="auto"
                poster="/images/gabinetes-header.jpg"
                className="w-full h-full object-cover opacity-60 scale-110"
            >
                <source src="/videos/gabinetes-hero.webm" type="video/webm" />
                <source src="/videos/gabinetes-hero.mp4" type="video/mp4" />
            </video>
        </motion.div>
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 container mx-auto px-6"
        >
            <motion.h1 variants={fadeInUp} className="text-2xl md:text-7xl font-bold text-white mb-1 md:mb-2 tracking-tighter">
              COLECCIÓN GABINETES
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-300 max-w-xl text-sm md:text-base">
              Almacenamiento, estilo y funcionalidad para cada espacio del hogar.
            </motion.p>
        </motion.div>
      </div>

      {/* BARRA DE FILTROS */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="md:sticky md:top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300"
      >
        <div className="container mx-auto px-4 md:px-6 py-2 md:py-4 space-y-2 md:space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div
                  ref={filtersRef}
                  className="flex gap-2 overflow-x-auto flex-1 pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 border whitespace-nowrap
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
                            placeholder="BUSCAR GABINETE..."
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

            {!isLoading && (allColors.length > 0 || allMaterials.length > 0) && (
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mr-1">Color:</span>
                    {allColors.map(color => (
                        <button key={color}
                            onClick={() => setActiveColor(activeColor === color ? null : color)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-200 border whitespace-nowrap
                                ${activeColor === color ? 'bg-black text-white border-black' : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800'}`}
                        >{color}</button>
                    ))}
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-3 mr-1">Material:</span>
                    {allMaterials.map(mat => (
                        <button key={mat}
                            onClick={() => setActiveMaterial(activeMaterial === mat ? null : mat)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-200 border whitespace-nowrap
                                ${activeMaterial === mat ? 'bg-black text-white border-black' : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800'}`}
                        >{mat}</button>
                    ))}
                    {(activeColor || activeMaterial) && (
                        <button onClick={() => { setActiveColor(null); setActiveMaterial(null); }}
                            className="ml-2 text-[10px] text-gray-400 hover:text-black underline">Limpiar</button>
                    )}
                </div>
            )}
        </div>
      </motion.div>

      {/* GRID PRODUCTOS */}
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-12" ref={gridTopRef}>
        {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 md:gap-x-8 gap-y-8 md:gap-y-16">
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
                <Search size={48} className="mb-4 opacity-20" />
                <p className="text-lg">No encontramos gabinetes.</p>
                <button onClick={() => { setSearchTerm(""); setActiveColor(null); setActiveMaterial(null); handleCategoryChange("Todos"); }} className="mt-4 text-xs font-bold uppercase border-b border-black pb-0.5 hover:opacity-50 transition-opacity">
                    Limpiar filtros
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 md:gap-x-8 gap-y-8 md:gap-y-16">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((item, index) => (
                        <ProductCard key={item.id} item={item} index={index} onSelect={setSelectedProduct} />
                    ))}
                </AnimatePresence>
            </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && <ProductDrawer selectedProduct={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>
    </div>
  );
}
