"use client";

import { useState, useMemo, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ScanFace, ShieldCheck, VolumeX, Sparkles, MoveHorizontal, Palette, Settings, Flame, Filter, Search, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- 1. CONFIGURACIÓN VISUAL Y CATEGORÍAS ---

const CATEGORIAS = [
  "PUERTA DE SEGURIDAD IA",
  "PUERTA DE ALUMINIO FUNDIDO",
  "PUERTA DE ACERO REFORZADO",
  "PUERTA DE SEGURIDAD ACORAZADA",
  "PUERTAS CORREDIZAS Y ABATIBLES",
  "PUERTA COMERCIAL CORTAFUEGO",
  "PUERTA DE EVACUACIÓN",
  "PUERTA DE COBRE COMPUESTA",
  "PUERTA MÉDICA",
];

// Categorías agrupadas bajo "PUERTAS INTERIOR"
const CATEGORIAS_INTERIOR = [
  "PUERTA ACÚSTICA DE MADERA",
  "PUERTA MINIMALISTA",
  "PUERTA DE BAJO CARBONO",
  "PUERTA DE PVC",
];

// NUEVO: Mapa de imágenes para el Hero según la categoría
const IMAGENES_HERO = {
  "TODAS": "/images/todas.webp", // Imagen por defecto
  "PUERTA DE SEGURIDAD IA": "/images/family.webp",
  "PUERTA DE ACERO REFORZADO": "/images/specs.webp", // Cambia estas rutas por tus imágenes reales
  "PUERTA DE SEGURIDAD ACORAZADA": "/images/acorazada.webp",
  "PUERTA DE ALUMINIO FUNDIDO": "/images/fundido.webp",
  "PUERTA ACÚSTICA DE MADERA": "/images/madera.webp",
  "PUERTA DE PVC": "/images/pvc.webp",
  "PUERTAS CORREDIZAS Y ABATIBLES": "/images/corredizas.webp",
  "PUERTA COMERCIAL CORTAFUEGO": "/images/cortafuego.webp",
  "PUERTA DE EVACUACIÓN": "/images/evacuacion.webp",
  "PUERTA MINIMALISTA": "/images/minimalista.webp",
  "PUERTA DE BAJO CARBONO": "/images/carbono.webp",
  "PUERTA MÉDICA": "/images/medica.webp",
  "PUERTA DE COBRE COMPUESTA": "/images/cobrewallaper.webp"
};

// --- CARTA DE COLORES (igual para todas las puertas, de más oscuro a más claro) ---
const DOOR_COLORS = [
  { name: "Lacado Negro",          hex: "#1A1A1A" },
  { name: "Tinte Wengué",          hex: "#4A2E1A" },
  { name: "Tinte Gris Oscuro",     hex: "#3D3530" },
  { name: "Morado",                hex: "#6A0DAD" },
  { name: "Lacado Gris Antracita", hex: "#3C3F42" },
  { name: "Tinte Nogal Oscuro",    hex: "#7B3F1A" },
  { name: "Azul",                  hex: "#1565C0" },
  { name: "Tinte Roble",           hex: "#A0522D" },
  { name: "Tinte Gris Claro",      hex: "#7A6E65" },
  { name: "Tinte Natural",         hex: "#C47C2B" },
  { name: "Lacado Blanco",         hex: "#F5F5F5" },
];

const ACCESORIOS_CORREDIZAS = [
  { name: "Manilla VBH con base", tag: "Ventana abatible", img: "/images/Asset/Accesorios/manilla_vbh_base.webp" },
  { name: "Manilla Runas", tag: "Ventana abatible", img: "/images/Asset/Accesorios/manilla_runas.webp" },
  { name: "Manilla VBH sin base", tag: "Ventana", img: "/images/Asset/Accesorios/manilla_vbh_sin_base.webp" },
  { name: "Manilla y Accesorios", tag: "Ventana corrediza", img: "/images/Asset/Accesorios/manilla_accesorios_corrediza.webp" },
  { name: "Cerradura de Una Línea", tag: "Ventana corrediza", img: "/images/Asset/Accesorios/cerradura_una_linea.webp" },
  { name: "Manilla con Cerradura Ultrafina", tag: "Puerta corrediza · 210 mm", img: "/images/Asset/Accesorios/manilla_ultrafina.webp" },
  { name: "A01 Manilla", tag: "310 mm", img: "/images/Asset/Accesorios/a01.webp" },
  { name: "A03 Manilla", tag: "304 Stainless Steel · 360 mm", img: "/images/Asset/Accesorios/a03.webp" },
  { name: "A04 Manilla", tag: "390 mm", img: "/images/Asset/Accesorios/a04.webp" },
  { name: "A05 Manilla", tag: "450 mm", img: "/images/Asset/Accesorios/a05.webp" },
  { name: "A06 Manilla", tag: "600 mm", img: "/images/Asset/Accesorios/a06.webp" },
  { name: "A07 Manilla", tag: "1200 mm", img: "/images/Asset/Accesorios/a07.webp" },
  { name: "B01 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b01.webp" },
  { name: "B02 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b02.webp" },
  { name: "B03 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b03.webp" },
  { name: "B04 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b04.webp" },
  { name: "C01 Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/c01.webp" },
  { name: "C02 Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/c02.webp" },
  { name: "Ultra Narrow Swing Door Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/ultra_narrow_flat_lock.webp" }
];

const VIDRIOS_CORREDIZAS = [
  { name: "VIDRIO-01", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-01.webp" },
  { name: "VIDRIO-02", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-02.webp" },
  { name: "VIDRIO-03", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-03.webp" },
  { name: "VIDRIO-04", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-04.webp" },
  { name: "VIDRIO-05", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-05.webp" },
  { name: "VIDRIO-06", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-06.webp" },
  { name: "VIDRIO-07", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-07.webp" },
  { name: "VIDRIO-08", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-08.webp" },
  { name: "VIDRIO-09", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-09.webp" },
  { name: "VIDRIO-10", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-10.webp" },
  { name: "VIDRIO-11", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-11.webp" },
  { name: "VIDRIO-12", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-12.webp" },
  { name: "VIDRIO-13", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-13.webp" },
  { name: "VIDRIO-14", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-14.webp" },
  { name: "VIDRIO-15", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-15.webp" },
  { name: "VIDRIO-16", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-16.webp" },
  { name: "VIDRIO-17", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-17.webp" },
  { name: "VIDRIO-18", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-18.webp" },
  { name: "VIDRIO-19", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-19.webp" },
  { name: "VIDRIO-20", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-20.webp" },
];

// --- WALLPAPERS (fondo lateral del modal, estilo cerraduras) ---
const WALLPAPER_DIR = "/images/PUERTAS/WALLPAPER";
const WALLPAPER_SLUGS = new Set([
  "chaobu", "chaohe", "chaoling", "cl96", "dihua", "gl097pro", "gl098pro", "k300max", "k300pro",
  "l5601", "l5857", "l5859", "lingan", "louis", "mclaren", "n9518", "n9519", "n9520", "p101", "p102",
  "p103", "p105", "p106", "p107", "p108", "pulada", "s101", "s108pro", "s116", "s118", "s119", "s121",
  "sabo", "saina", "shengshi", "t200", "tdf-2003", "tdf-2009", "x50max", "x50pro", "x60max", "x60pro",
  "x70jinxiu", "x70shunliu", "y106", "y118", "y119",
  "s108", "wave", "wl001", "wl-d003", "wl-j001", "wl-p001", "wl-s009",
]);
// Correcciones nombre de producto -> nombre real del archivo de wallpaper
const WALLPAPER_OVERRIDES = { chaopu: "chaobu", makailen: "mclaren" };

const getWallpaper = (name) => {
  if (!name) return null;
  const base = name.toLowerCase().replace(/\s+/g, '');
  const slug = WALLPAPER_OVERRIDES[base] || base;
  return WALLPAPER_SLUGS.has(slug) ? `${WALLPAPER_DIR}/${slug}.webp` : null;
};

// --- 2. COMPONENTES UI ---

const FilterButton = ({ label, active, onClick, small = false }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 ${small ? 'text-[9px] py-2' : 'text-[10px]'} font-bold uppercase border-b transition-all duration-300 flex justify-between items-center tracking-widest relative overflow-hidden group
      ${active
        ? 'text-white border-black pl-6'
        : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:text-black hover:pl-6'
      }`}
  >
    {active && (
      <motion.div
        layoutId="activeFilter"
        className="absolute inset-0 bg-black z-0"
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    <span className="relative z-10 flex items-center justify-between w-full">
      {label}
      {active && <ChevronRight size={12} />}
    </span>
  </button>
);

// --- COMPONENTE DE BÚSQUEDA REUTILIZABLE (estilo redondo, igual que Sofás) ---
const SearchInput = ({ value, onChange }) => (
  <div className="relative group w-full">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
    <input
      type="text"
      placeholder="BUSCAR MODELO..."
      value={value}
      onChange={onChange}
      className="w-full bg-[#F5F5F5] border border-transparent focus:bg-white focus:border-gray-200 rounded-full py-2.5 pl-11 pr-4 text-xs font-bold uppercase tracking-wide focus:ring-0 transition-all outline-none text-gray-900 placeholder:text-gray-400"
    />
    {value && (
      <button
        onClick={() => onChange({ target: { value: "" } })}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-black transition-colors"
      >
        <X size={12} />
      </button>
    )}
  </div>
);

// --- MODAL OPTIMIZADO PARA VELOCIDAD ---
const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!product) return null;

  let accentColor = "text-gray-900";
  let borderColor = "border-gray-900";
  let Icon = ShieldCheck;

  if (product.category.includes("IA")) { accentColor = "text-[#00C2FF]"; borderColor = "border-[#00C2FF]"; Icon = ScanFace; }
  else if (product.category.includes("ACORAZADA")) { accentColor = "text-[#D4AF37]"; borderColor = "border-[#D4AF37]"; }
  else if (product.category.includes("ALUMINIO")) { accentColor = "text-[#718096]"; borderColor = "border-[#718096]"; }
  else if (product.category.includes("MADERA")) { accentColor = "text-[#8D6E63]"; borderColor = "border-[#8D6E63]"; Icon = VolumeX; }
  else if (product.category.includes("PVC")) { accentColor = "text-teal-600"; borderColor = "border-teal-600"; Icon = Sparkles; }
  else if (product.category.includes("CORREDIZAS")) { accentColor = "text-indigo-600"; borderColor = "border-indigo-600"; Icon = MoveHorizontal; }
  else if (product.category.includes("CORTAFUEGO")) { accentColor = "text-orange-600"; borderColor = "border-orange-600"; Icon = Flame; }
  else if (product.category.includes("EVACUACIÓN")) { accentColor = "text-red-600"; borderColor = "border-red-600"; Icon = Flame; }
  else if (product.category.includes("MINIMALISTA")) { accentColor = "text-stone-500"; borderColor = "border-stone-500"; Icon = Sparkles; }
  else if (product.category.includes("BAJO CARBONO")) { accentColor = "text-green-600"; borderColor = "border-green-600"; Icon = Sparkles; }

  const wallpaper = getWallpaper(product.name);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop — con wallpaper lateral si el producto lo tiene (estilo cerraduras) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      >
        {wallpaper && (
          <div className="hidden md:block absolute inset-y-0 left-0 right-[900px] overflow-hidden">
            <motion.img
              src={wallpaper}
              alt=""
              aria-hidden="true"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40 pointer-events-none" />
          </div>
        )}
      </motion.div>

      {/* Panel deslizante */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.8 }}
        style={{ willChange: "transform" }}
        className="relative bg-white w-full max-w-[900px] h-full shadow-2xl flex flex-col md:flex-row z-10"
      >
        <button onClick={onClose} className="absolute top-4 left-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-black hover:text-white transition"><X size={20} /></button>

        {/* Imagen en Modal */}
        <div className="w-full md:w-1/2 bg-[#F8F8F8] relative min-h-[300px] md:h-full flex items-center justify-center p-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="relative w-full h-full max-h-[500px]"
          >
            <Image
              src={product.img}
              alt={product.name}
              fill
              priority // Carga prioritaria
              className="object-contain mix-blend-multiply"
            />
          </motion.div>
        </div>

        {/* Contenido en Modal */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white scrollbar-hide">
          <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${accentColor}`}>{product.category}</span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight">{product.name}</h2>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">{product.description}</p>

          <div className="space-y-8">
            {/* Características Animadas */}
            <div>
              <h3 className="text-xs font-bold uppercase text-gray-900 mb-3 flex items-center gap-2">
                <Icon size={14} /> Características
              </h3>
              <ul className="space-y-2">
                {product.features?.map((feat, i) => (
                  <motion.li
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-600"
                  >
                    <span className={`${accentColor} mt-0.5`}>•</span> {feat}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Carta de Colores */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 mb-3 flex items-center gap-2">
                <Palette size={14} /> Acabados y Carta de Colores
              </h3>
              <div className="flex flex-wrap gap-4 mb-3 p-4 bg-gray-50 rounded-xl justify-center md:justify-start">
                {DOOR_COLORS.map((color, i) => (
                  <div key={i} className="text-center group flex flex-col items-center gap-2 cursor-help">
                    <div
                      className="w-12 h-12 rounded-full shadow-md border-2 border-white group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    ></div>
                    <span className="text-[9px] text-gray-500 uppercase font-bold max-w-[60px] leading-tight">{color.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                <Palette size={16} className="text-gray-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  ¿Buscas un color diferente? Disponemos de una amplia gama de acabados y colores personalizados bajo pedido.{" "}
                  <span className="font-bold text-gray-800">Consúltanos sin compromiso.</span>
                </p>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-gray-50 p-5 rounded border border-gray-100">
              <h3 className="text-xs font-bold uppercase text-gray-400 mb-3">Especificaciones</h3>
              <div className="grid grid-cols-1 gap-y-2">
                {product.specs?.map((spec, i) => (
                  <div key={i} className="flex justify-between border-b border-gray-200 pb-1 last:border-0">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{spec.label}</span>
                    <span className="text-[11px] font-semibold text-gray-900 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accesorios (Solo Corredizas) */}
            {product.category === "PUERTAS CORREDIZAS Y ABATIBLES" && (
              <div className="pt-6 mt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase text-indigo-600 mb-4 flex items-center gap-2">
                  <Settings size={14} /> Accesorios
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {ACCESORIOS_CORREDIZAS.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-100 flex flex-col items-center text-center">
                      <div className="h-20 w-full relative mb-2 bg-white rounded-sm">
                        <Image src={item.img} alt={item.name} fill className="object-contain p-2" onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                      <span className="text-[9px] font-bold text-gray-800 leading-tight">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vidrios (Solo Corredizas) */}
            {product.category === "PUERTAS CORREDIZAS Y ABATIBLES" && (
              <div className="pt-6 mt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase text-indigo-600 mb-4 flex items-center gap-2">
                  <Settings size={14} /> Vidrios
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {VIDRIOS_CORREDIZAS.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-100 flex flex-col items-center text-center">
                      <div className="h-20 w-full relative mb-2 bg-gray-200 rounded-sm">
                        <Image src={item.img} alt={item.name} fill className="object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                      <span className="text-[9px] font-bold text-gray-800 leading-tight">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- PRODUCT CARD ---
const ProductCard = ({ product, onClick, priority = false }) => {
  const shortCategory = product.category
    .replace("PUERTA DE ", "")
    .replace("PUERTA ", "")
    .replace("SEGURIDAD ", "");

  let highlightClass = "text-gray-400";
  if (product.category.includes("IA")) highlightClass = "text-[#00C2FF]";
  else if (product.category.includes("MADERA")) highlightClass = "text-[#8D6E63]";
  else if (product.category.includes("PVC")) highlightClass = "text-teal-600";
  else if (product.category.includes("CORREDIZAS")) highlightClass = "text-indigo-600";
  else if (product.category.includes("CORTAFUEGO")) highlightClass = "text-orange-600";
  else if (product.category.includes("EVACUACIÓN")) highlightClass = "text-red-600";
  else if (product.category.includes("MINIMALISTA")) highlightClass = "text-stone-500";
  else if (product.category.includes("BAJO CARBONO")) highlightClass = "text-green-600";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col h-full"
    >
      {/* IMAGEN FLOTANTE */}
      <div className="relative aspect-[3/5] bg-[#FCFCFC] mb-4 overflow-hidden border border-transparent group-hover:border-gray-100 transition-all rounded-sm">
        <Image
          src={product.img}
          alt={product.name}
          fill
          priority={priority} // Carga prioritaria si es de los primeros
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
          sizes="100px"
          unoptimized
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end justify-center pb-6">
          <span className="bg-white text-black text-[9px] font-bold uppercase px-3 py-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm tracking-widest">
            Ver Detalles
          </span>
        </div>
      </div>

      {/* TEXTO */}
      <div className="text-center group-hover:text-left transition-all">
        <h4 className={`font-bold text-base text-gray-900 transition-colors uppercase ${product.category.includes("MADERA") ? "group-hover:text-[#8D6E63]" :
          product.category.includes("PVC") ? "group-hover:text-teal-600" :
            product.category.includes("CORREDIZAS") ? "group-hover:text-indigo-600" :
              "group-hover:text-[#00C2FF]"}`}>{product.name}</h4>
        <div className="flex items-center justify-center group-hover:justify-start gap-2 mt-1">
          <p className={`text-[9px] uppercase tracking-widest ${product.category.includes("IA") ? "text-[#00C2FF] font-semibold" : highlightClass}`}>
            {shortCategory}
          </p>
          <div className="flex -space-x-1">
            {DOOR_COLORS.slice(0, 5).map((c, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <div className="w-3 h-3 rounded-full bg-gray-100 border border-white flex items-center justify-center text-[6px] text-gray-500">+</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- PÁGINA PRINCIPAL ---
function PuertasContent() {
  const searchParams = useSearchParams();
  // Inicializar directamente desde la URL para no lanzar una consulta de "TODAS"
  // que pueda resolverse tarde y pisar la de la categoría correcta
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || "TODAS");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInteriorOpen, setIsInteriorOpen] = useState(false);
  const gridTopRef = useRef(null);

  // Sincronizar categoría si la URL cambia con la página ya montada
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
      // Abrir automáticamente el menú de PUERTAS INTERIOR si la categoría pertenece a ese grupo
      if (CATEGORIAS_INTERIOR.includes(categoryFromUrl)) {
        setIsInteriorOpen(true);
      }
    }
  }, [searchParams]);

  // Abrir ficha de producto desde URL (deep-link del buscador)
  useEffect(() => {
    const producto = searchParams.get('producto');
    if (!producto) return;
    let active = true;
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('name', producto)
        .limit(1);
      if (active && data && data[0]) setSelectedProduct(data[0]);
    })();
    return () => { active = false; };
  }, [searchParams]);

  // CARGAR DATOS DE SUPABASE
  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);

      let query = supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (activeCategory !== "TODAS") {
        query = query.eq('category', activeCategory);
      }

      const { data, error } = await query;

      // Ignorar respuestas de una categoría que ya no está activa
      if (cancelled) return;

      if (error) {
        console.error("Error cargando productos:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, [activeCategory]);

  const displayProducts = useMemo(() => {
    if (searchTerm.trim() === "") return products;
    const term = searchTerm.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      (p.description && p.description.toLowerCase().includes(term))
    );
  }, [products, searchTerm]);

  // Scroll suave al cambiar categoría
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (gridTopRef.current && window.scrollY > 300) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    // Quitamos el pt-28 para que el Hero pegue bien arriba con el menú transparente (si lo tienes)
    <main className="bg-white min-h-screen text-black pb-20 font-sans selection:bg-black selection:text-white">

      {/* HERO SECTION DINÁMICO */}
<div className="w-full h-[45vh] md:h-[62vh] relative mb-16 overflow-hidden bg-black mt-20">{/* mt-20 compensa el header fijo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={IMAGENES_HERO[activeCategory] || IMAGENES_HERO["TODAS"]}
              alt={`Wonly ${activeCategory}`}
              fill
              priority
              className="object-cover opacity-75" // Opacidad al 50% para que el texto se lea bien
            />
          </motion.div>
        </AnimatePresence>

        {/* Texto superpuesto en el Hero */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-white mb-3 md:mb-10 drop-shadow-2xl max-w-5xl"
            >
              {activeCategory === "TODAS" ? "Wonly Collection" : activeCategory}
            </motion.h1>
          </AnimatePresence>

          {/* <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="w-px h-12 bg-[#00C2FF] mx-auto mb-6 shadow-[0_0_10px_#00C2FF]"
          /> */}

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed drop-shadow-md"
            >
              {activeCategory === "TODAS"
                ? "Catálogo completo Wonly. Tecnología IA, resistencia extrema, lujo en aluminio, colección acústica de madera y la nueva línea vanguardista en PVC."
                : `Explora nuestra exclusiva línea de productos clasificados en ${activeCategory.toLowerCase()} con la mejor tecnología, máxima seguridad y diseño de vanguardia.`}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* SIDEBAR (Escritorio) */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-32 h-fit">
            {/* Buscador Desktop */}
            <div className="mb-8">
              <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="mb-6 pb-2 border-b border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categorías</span>
            </div>
            <div className="flex flex-col gap-1">
              <FilterButton label="Ver Todo" active={activeCategory === "TODAS"} onClick={() => handleCategoryChange("TODAS")} />

              {/* Primeras 4 categorías antes de PUERTAS INTERIOR */}
              {CATEGORIAS.slice(0, 4).map((cat) => (
                <FilterButton key={cat} label={cat} active={activeCategory === cat} onClick={() => handleCategoryChange(cat)} />
              ))}

              {/* Categoría desplegable PUERTAS INTERIOR */}
              <div className="flex flex-col">
                <button
                  onClick={() => setIsInteriorOpen(!isInteriorOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded ${
                    CATEGORIAS_INTERIOR.includes(activeCategory)
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>Puertas Interior</span>
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-300 ${isInteriorOpen ? 'rotate-90' : ''}`}
                  />
                </button>

                {/* Subcategorías */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isInteriorOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col gap-1 ml-4 mt-1 pl-3 border-l-2 border-gray-200">
                    {CATEGORIAS_INTERIOR.map((cat) => (
                      <FilterButton
                        key={cat}
                        label={cat}
                        active={activeCategory === cat}
                        onClick={() => handleCategoryChange(cat)}
                        small
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Resto de categorías después de PUERTAS INTERIOR */}
              {CATEGORIAS.slice(4).map((cat) => (
                <FilterButton key={cat} label={cat} active={activeCategory === cat} onClick={() => handleCategoryChange(cat)} />
              ))}
            </div>
          </aside>

          {/* GRID PRODUCTOS */}
          <section className="flex-grow" ref={gridTopRef}>

            {/* BUSCADOR MÓVIL (Añadido Aquí) */}
            <div className="lg:hidden mb-6">
              <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-900">
                {activeCategory === "TODAS" ? "Catálogo Completo" : activeCategory} <span className="text-gray-400 ml-2">({displayProducts.length})</span>
              </span>
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden flex items-center gap-2 text-[10px] font-bold uppercase bg-black text-white px-3 py-2"><Filter size={12} /> Filtros</button>
            </div>

            {loading ? (
              <div className="flex h-64 w-full flex-col items-center justify-center text-gray-400 gap-3">
                <Loader2 className="animate-spin" size={32} />
                <span className="text-xs tracking-widest uppercase">Cargando colección...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                <AnimatePresence mode='popLayout'>
                  {displayProducts.map((p, index) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onClick={() => setSelectedProduct(p)}
                      priority={index < 8} // Las primeras 8 imágenes cargan YA
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {!loading && displayProducts.length === 0 && (
              <div className="py-24 text-center text-gray-300 text-sm uppercase">
                Sin resultados.
                {searchTerm && <button onClick={() => setSearchTerm("")} className="block mx-auto mt-2 underline text-black">Limpiar búsqueda</button>}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* MODAL (Con AnimatePresence Global) */}
      <AnimatePresence>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-6 lg:hidden"
          >
            <motion.div
              initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }}
              className="bg-white w-full max-w-sm p-6 space-y-4 rounded"
            >
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-bold uppercase tracking-widest text-sm">Categorías</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
              </div>
              <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
                <button onClick={() => { handleCategoryChange("TODAS"); setIsMobileMenuOpen(false); }} className="text-left py-3 border-b text-xs font-bold uppercase">Ver Todo</button>
                {CATEGORIAS.map(cat => (
                  <button key={cat} onClick={() => { handleCategoryChange(cat); setIsMobileMenuOpen(false); }} className="text-left py-3 border-b text-xs font-bold uppercase">{cat}</button>
                ))}

                {/* Categoría desplegable PUERTAS INTERIOR en móvil */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsInteriorOpen(!isInteriorOpen)}
                    className={`flex items-center justify-between w-full py-3 text-left text-xs font-bold uppercase border-b ${
                      CATEGORIAS_INTERIOR.includes(activeCategory) ? 'text-black' : 'text-gray-600'
                    }`}
                  >
                    <span>Puertas Interior</span>
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-300 ${isInteriorOpen ? 'rotate-90' : ''}`}
                    />
                  </button>

                  {/* Subcategorías móvil */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isInteriorOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex flex-col ml-4 border-l-2 border-gray-200">
                      {CATEGORIAS_INTERIOR.map(cat => (
                        <button
                          key={cat}
                          onClick={() => { handleCategoryChange(cat); setIsMobileMenuOpen(false); }}
                          className="text-left py-2 pl-3 text-[11px] font-semibold uppercase text-gray-600 hover:text-black"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default function PuertasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
      <PuertasContent />
    </Suspense>
  );
}