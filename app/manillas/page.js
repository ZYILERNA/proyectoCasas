"use client";
import React, { useState, useEffect, useMemo, memo, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Loader2, ChevronRight, ChevronLeft, Search,
  DoorOpen, Ruler, Layers, ScanLine, Package, Hammer, Gem, Tag
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import useAccessibleDialog from '../../components/useAccessibleDialog';

// --- CONFIGURACIÓN SUPABASE ---


// --- PILARES (franja superior estilo cerraduras) ---
const PILLARS = [
  { icon: <Gem className="w-5 h-5" />,     label: "Zinc + Hierro", desc: "Aleación robusta" },
  { icon: <Ruler className="w-5 h-5" />,    label: "Eje 90 mm",     desc: "Estándar interior" },
  { icon: <DoorOpen className="w-5 h-5" />, label: "Cilindro",      desc: "Bocallave incluida" },
  { icon: <Package className="w-5 h-5" />,  label: "Kit Completo",  desc: "Cuerpo + bisagras" },
  { icon: <Layers className="w-5 h-5" />,   label: "Acabados",      desc: "Negro · Madera · Oro" },
  { icon: <Hammer className="w-5 h-5" />,    label: "Instalación",   desc: "Tornillería incluida" },
];

// --- ETIQUETAS LEGIBLES DE LA FICHA TÉCNICA ---
const SPEC_LABELS = {
  color_familia: "Familia de color",
  distancia_ejes: "Distancia entre ejes de fijación",
  material: "Material principal",
  perforacion: "Perforación",
  marca: "Marca del producto",
};

// --- TARJETA DE PRODUCTO (estilo cerraduras) ---
const ProductCard = memo(({ product, onClick, index }) => (
  <motion.button
    type="button"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.04 }}
    whileHover={{ y: -4 }}
    onClick={onClick}
    className="group relative bg-[#0d0d0d] rounded-2xl overflow-hidden border border-white/8 cursor-pointer hover:border-[#D4A868]/40 transition-all duration-300 flex flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A868]"
  >
    {/* Imagen — fondo blanco para encajar las fotos */}
    <div className="relative aspect-[4/3] bg-white overflow-hidden flex items-center justify-center p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute top-3 left-3 bg-[#D4A868]/10 border border-[#D4A868]/30 text-[#D4A868] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
        {product.category}
      </div>
      {product.has_kit && (
        <div className="absolute top-3 right-3 bg-amber-500/20 border border-amber-500/40 text-amber-500 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Package size={10} /> KIT
        </div>
      )}
    </div>

    {/* Info */}
    <div className="p-5 flex-1 flex flex-col gap-2.5">
      <div>
        <p className="text-[#D4A868] text-[10px] font-bold uppercase tracking-widest mb-0.5 font-mono">{product.code}</p>
        <h3 className="text-white text-lg font-bold leading-tight">{product.name}</h3>
      </div>
      <p className="text-gray-500 text-sm line-clamp-2 flex-1">{product.description}</p>

      {/* Swatches de acabado */}
      {product.colors?.length > 0 && (
        <div className="flex items-center gap-1.5 pt-3 border-t border-white/5 mt-auto">
          {product.colors.map((c, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border border-white/20"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
          <span className="text-gray-600 text-[10px] uppercase ml-1">
            {product.colors.length} acabado{product.colors.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className="flex items-center gap-1.5 text-[#D4A868] text-xs font-semibold mt-1 group-hover:gap-2.5 transition-all">
        Ver detalles <ChevronRight size={14} />
      </div>
    </div>
  </motion.button>
));
ProductCard.displayName = 'ProductCard';

// --- PANEL LATERAL (estilo sofás: galería izq + datos der) ---
const ProductDrawer = memo(({ product, onClose }) => {
  const dialogRef = useAccessibleDialog(Boolean(product), onClose);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [mobileImageIndex, setMobileImageIndex] = useState(0);
  const mobileScrollRef = useRef(null);

  const allImages = useMemo(
    () => (product ? [product.image, ...(product.gallery || [])] : []),
    [product]
  );
  const hasMultiple = allImages.length > 1;

  useEffect(() => {
    setGalleryIndex(0);
    if (mobileScrollRef.current) mobileScrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
  }, [product?.id]);

  if (!product) return null;

  const next = () => setGalleryIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  const prev = () => setGalleryIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  const isKit = product.has_kit && galleryIndex === allImages.length - 1;

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`Detalles de ${product.name}`} tabIndex={-1} className="fixed inset-0 z-[100] flex justify-end h-[100dvh]">
      {/* BACKDROP — wallpaper = imagen activa del carrusel (solo escritorio) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-black/85"
        onClick={onClose}
      >
        {/* Zona del wallpaper: ocupa todo menos el panel lateral */}
        <div
          className="hidden md:block absolute inset-0 right-[620px] overflow-hidden bg-white"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={galleryIndex}
              src={allImages[galleryIndex]}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          {/* Difuminado hacia el panel para integrar el wallpaper */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/25 pointer-events-none" />

          {/* Etiqueta galería / kit */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
              <ScanLine size={11} /> {isKit ? 'Kit de instalación' : 'Galería'}
            </span>
            {isKit && (
              <span className="flex items-center gap-1 bg-black text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full">
                <Package size={10} /> KIT COMPLETO
              </span>
            )}
          </div>

          {/* Flechas de navegación (no cierran el modal) */}
          {hasMultiple && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-5 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 shadow-lg border border-gray-100 hover:bg-white hover:scale-110 transition-all text-gray-900"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-5 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 shadow-lg border border-gray-100 hover:bg-white hover:scale-110 transition-all text-gray-900"
              >
                <ChevronRight size={20} />
              </button>
              {/* Indicadores */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setGalleryIndex(idx); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === galleryIndex ? 'w-5 bg-[#D4A868]' : 'w-1.5 bg-white/60 hover:bg-white'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* PANEL LATERAL */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.32 }}
        style={{ willChange: "transform" }}
        className="relative bg-[#080808] text-white w-full max-w-[620px] h-full shadow-2xl flex flex-col border-l border-white/8 overflow-hidden"
      >
        {/* MÓVIL: carrusel deslizable (no hay wallpaper en móvil) */}
        <div className="md:hidden relative w-full bg-white h-[42vh] shrink-0">
          <button type="button" aria-label="Cerrar detalles" onClick={onClose} className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md border border-gray-100 z-20 text-gray-900">
            <X size={20} />
          </button>
          <div
            ref={mobileScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory h-full w-full [&::-webkit-scrollbar]:hidden"
            style={{ scrollBehavior: 'smooth' }}
            onScroll={(e) => {
              const idx = Math.round(e.target.scrollLeft / e.target.clientWidth);
              setMobileImageIndex(idx);
            }}
          >
            {allImages.map((img, idx) => (
              <div key={idx} className="w-full h-full shrink-0 snap-center relative flex items-center justify-center p-6">
                <img src={img} alt={`${product.name} ${idx}`} className="object-contain w-full h-full" />
                {product.has_kit && idx === allImages.length - 1 && (
                  <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Package size={10} /> KIT COMPLETO
                  </span>
                )}
              </div>
            ))}
          </div>
          {hasMultiple && (
            <div className="absolute bottom-4 left-0 w-full flex justify-center gap-1.5 z-10">
              {allImages.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === mobileImageIndex ? 'w-4 bg-black' : 'w-1.5 bg-gray-300'}`} />
              ))}
            </div>
          )}
        </div>

        {/* DATOS */}
        <div className="flex flex-col flex-1 bg-[#080808] relative min-h-0">
          <div className="p-6 md:p-8 pb-0 shrink-0">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-block bg-[#D4A868] text-black text-[10px] font-mono font-bold px-2 py-1 mb-2 rounded">
                  {product.code}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{product.name}</h2>
                <p className="text-[10px] text-[#D4A868] uppercase tracking-widest mt-1 font-bold">{product.category}</p>
              </div>
              <button type="button" aria-label="Cerrar detalles" onClick={onClose} className="hidden md:block text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"><X size={24} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-6 pb-32 md:pb-40 [&::-webkit-scrollbar]:hidden">
            <div className="space-y-8">
              <p className="text-gray-400 leading-relaxed text-sm">{product.description}</p>

              {/* Acabados */}
              {product.colors?.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                    <Layers size={14} className="text-[#D4A868]" /> Acabados disponibles
                  </h3>
                  <div className="flex flex-wrap gap-4 p-4 bg-white/5 rounded-xl">
                    {product.colors.map((color, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div
                          className="w-12 h-12 rounded-full shadow-md border-2 border-white/20"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                        <span className="text-[9px] uppercase font-bold text-gray-400 max-w-[64px] text-center leading-tight">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ficha técnica */}
              {product.specs && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                    <Tag size={14} className="text-[#D4A868]" /> Ficha técnica
                  </h3>
                  <div className="rounded-xl overflow-hidden border border-white/10 divide-y divide-white/10">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between gap-4 px-4 py-3 text-sm bg-white/3 hover:bg-white/6 transition-colors">
                        <span className="text-gray-500">{SPEC_LABELS[key] || key}</span>
                        <span className="text-white font-medium text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.has_kit && (
                <div className="flex items-start gap-3 bg-[#D4A868]/10 border border-[#D4A868]/20 rounded-xl p-4">
                  <Package size={18} className="text-[#D4A868] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white">Incluye kit de instalación</p>
                    <p className="text-xs text-gray-400">Cuerpo de cerradura, cilindro con llaves, bisagras, tope y tornillería. Ver última imagen de la galería.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full bg-[#080808] border-t border-white/10 p-4 md:p-6 z-20">
            <Link href="/contacto" className="flex items-center justify-center gap-2 w-full bg-[#D4A868] text-black text-center px-6 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#D4A868]/20">
              Solicitar Cotización <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
ProductDrawer.displayName = 'ProductDrawer';

// --- PÁGINA PRINCIPAL ---
function ManillasContent() {
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [manillas, setManillas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Abrir ficha de producto desde URL (deep-link del buscador)
  useEffect(() => {
    const producto = searchParams.get('producto');
    if (!producto) return;
    let active = true;
    (async () => {
      const { data } = await supabase
        .from('manillas')
        .select('*')
        .eq('name', producto)
        .limit(1);
      if (active && data && data[0]) setSelectedProduct(data[0]);
    })();
    return () => { active = false; };
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('manillas').select('*').order('id');
        if (error) throw error;
        setManillas(data || []);
      } catch (error) {
        console.error("Error cargando manillas:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filterCategories = useMemo(() => {
    if (!manillas.length) return ["Todos"];
    const cats = [...new Set(manillas.map(m => m.category).filter(Boolean))].sort();
    return ["Todos", ...cats];
  }, [manillas]);

  const filtered = useMemo(() => {
    let result = activeFilter === "Todos" ? manillas : manillas.filter(m => m.category === activeFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m =>
        m.name?.toLowerCase().includes(q) ||
        m.code?.toLowerCase().includes(q) ||
        m.category?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [manillas, activeFilter, searchQuery]);

  return (
    <main className="bg-[#060606] min-h-screen text-white pt-20 overflow-hidden">

      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/MANILLAS/5801259/img1.webp"
            alt=""
            className="w-full h-full object-cover object-center opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060606]/70 via-[#060606]/50 to-[#060606]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/80 via-transparent to-[#060606]/80" />
        </div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4A868]/8 rounded-full blur-[120px] z-0 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 pt-16 pb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#D4A868]/10 border border-[#D4A868]/25 text-[#D4A868] text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <DoorOpen size={12} /> Manijas WONLY
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6"
            >
              Manillas
              <br />
              <span className="text-[#D4A868]">de Diseño</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed"
            >
              Manijas de puerta en aleación de zinc y hierro. Acabados en negro,
              madera natural, dorado y cromo — con kit de instalación completo.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-700 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ===== PILARES ===== */}
      <section className="py-16 border-y border-white/5 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#080808] p-6 flex flex-col items-center text-center gap-3 hover:bg-[#0f0f0f] transition-colors group"
              >
                <div className="text-[#D4A868]/60 group-hover:text-[#D4A868] transition-colors">{pillar.icon}</div>
                <div>
                  <p className="text-white text-sm font-bold">{pillar.label}</p>
                  <p className="text-gray-600 text-[11px] mt-0.5">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATÁLOGO ===== */}
      <section className="py-24 bg-[#060606]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[#D4A868] text-xs font-bold uppercase tracking-widest mb-2">Catálogo</p>
              <h2 className="text-3xl font-black uppercase">Colección Manillas</h2>
            </div>
            {!isLoading && manillas.length > 0 && (
              <p className="text-gray-600 text-sm">{filtered.length} modelo{filtered.length !== 1 ? 's' : ''}</p>
            )}
          </div>

          {/* Buscador */}
          {!isLoading && manillas.length > 0 && (
            <div className="relative mb-6 max-w-md">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar manilla o código..."
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-full pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4A868]/50 transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
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
                      ? 'bg-[#D4A868] border-[#D4A868] text-black'
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
              <Loader2 className="animate-spin mb-4 text-[#D4A868]" size={36} />
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
                {filtered.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center py-24 text-gray-600">
                    <Search size={36} className="mb-4 opacity-30" />
                    <p className="text-sm">Sin resultados{searchQuery && <> para <span className="text-white/50">"{searchQuery}"</span></>}</p>
                    <button onClick={() => { setSearchQuery(""); setActiveFilter("Todos"); }} className="mt-3 text-[#D4A868] text-xs hover:underline">Limpiar filtros</button>
                  </div>
                ) : filtered.map((product, i) => (
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

      {/* ===== DRAWER ===== */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>

      {/* ===== CTA FINAL ===== */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4A868]/6 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-[#D4A868] text-xs font-bold uppercase tracking-widest mb-4">¿Necesitas asesoramiento?</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-tight">
            El Detalle<br />que Marca la Diferencia
          </h2>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-3 bg-[#D4A868] hover:bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,104,0.3)]"
          >
            Contactar con ventas <ChevronRight size={16} />
          </Link>
        </div>
      </section>

    </main>
  );
}

export default function ManillasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060606]" />}>
      <ManillasContent />
    </Suspense>
  );
}
