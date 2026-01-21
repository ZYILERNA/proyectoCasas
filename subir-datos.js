"use client";

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'; 
import { X, ChevronRight, ScanFace, ShieldCheck, VolumeX, Sparkles, MoveHorizontal, Palette, Settings, Flame, Zap, Filter, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// --- 1. CONFIGURACIÓN (CONSTANTES ESTÁTICAS) ---
const CATEGORIAS = [
  "PUERTA DE SEGURIDAD IA",
  "PUERTA DE ACERO REFORZADO",
  "PUERTA DE SEGURIDAD ACORAZADA",
  "PUERTA DE ALUMINIO FUNDIDO",
  "PUERTA ACÚSTICA DE MADERA",
  "PUERTA DE PVC",
  "PUERTAS CORREDIZAS Y ABATIBLES",
  "PUERTA COMERCIAL CORTAFUEGO",
  "PUERTA MÉDICA"
];

const ACCESORIOS_CORREDIZAS = [
  { name: "Manilla VBH con base", tag: "Ventana abatible", img: "/images/Asset/Accesorios/manilla_vbh_base.jpg" },
  { name: "Manilla Runas", tag: "Ventana abatible", img: "/images/Asset/Accesorios/manilla_runas.jpg" },
  { name: "Manilla VBH sin base", tag: "Ventana", img: "/images/Asset/Accesorios/manilla_vbh_sin_base.jpg" },
  { name: "Manilla y Accesorios", tag: "Ventana corrediza", img: "/images/Asset/Accesorios/manilla_accesorios_corrediza.jpg" },
  { name: "Cerradura de Una Línea", tag: "Ventana corrediza", img: "/images/Asset/Accesorios/cerradura_una_linea.jpg" },
  { name: "Manilla con Cerradura Ultrafina", tag: "Puerta corrediza · 210 mm", img: "/images/Asset/Accesorios/manilla_ultrafina.jpg" },
  { name: "A01 Manilla", tag: "310 mm", img: "/images/Asset/Accesorios/a01.jpg" },
  { name: "A03 Manilla", tag: "304 Stainless Steel · 360 mm", img: "/images/Asset/Accesorios/a03.jpg" },
  { name: "A04 Manilla", tag: "390 mm", img: "/images/Asset/Accesorios/a04.jpg" },
  { name: "A05 Manilla", tag: "450 mm", img: "/images/Asset/Accesorios/a05.jpg" },
  { name: "A06 Manilla", tag: "600 mm", img: "/images/Asset/Accesorios/a06.jpg" },
  { name: "A07 Manilla", tag: "1200 mm", img: "/images/Asset/Accesorios/a07.jpg" },
  { name: "B01 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b01.jpg" },
  { name: "B02 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b02.jpg" },
  { name: "B03 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b03.jpg" },
  { name: "B04 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b04.jpg" },
  { name: "C01 Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/c01.jpg" },
  { name: "C02 Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/c02.jpg" },
  { name: "Ultra Narrow Swing Door Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/ultra_narrow_flat_lock.jpg" }
];

const VIDRIOS_CORREDIZAS = [
  { name: "VIDRIO-01", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-01.jpg" },
  { name: "VIDRIO-02", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-02.jpg" },
  { name: "VIDRIO-03", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-03.jpg" },
  { name: "VIDRIO-04", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-04.jpg" },
  { name: "VIDRIO-05", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-05.jpg" },
  { name: "VIDRIO-06", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-06.jpg" },
  { name: "VIDRIO-07", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-07.jpg" },
  { name: "VIDRIO-08", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-08.jpg" },
  { name: "VIDRIO-09", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-09.jpg" },
  { name: "VIDRIO-10", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-10.jpg" },
  { name: "VIDRIO-11", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-11.jpg" },
  { name: "VIDRIO-12", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-12.jpg" },
  { name: "VIDRIO-13", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-13.jpg" },
  { name: "VIDRIO-14", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-14.jpg" },
  { name: "VIDRIO-15", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-15.jpg" },
  { name: "VIDRIO-16", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-16.jpg" },
  { name: "VIDRIO-17", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-17.jpg" },
  { name: "VIDRIO-18", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-18.jpg" },
  { name: "VIDRIO-19", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-19.jpg" },
  { name: "VIDRIO-20", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-20.jpg" },
];

// --- 2. COMPONENTES UI AUXILIARES ---

const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 text-[10px] font-bold uppercase border-b transition-all duration-300 flex justify-between items-center tracking-widest relative overflow-hidden group
      ${active 
        ? 'text-white border-black pl-6' 
        : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:text-black hover:pl-6'
      }`}
  >
    {/* Fondo animado para el botón activo */}
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

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!product) return null;

  let accentColor = "text-gray-900";
  let borderColor = "border-gray-900";
  let Icon = ShieldCheck;
  
  if (product.category.includes("IA")) { accentColor = "text-[#00C2FF]"; borderColor="border-[#00C2FF]"; Icon = ScanFace; }
  else if (product.category.includes("ACORAZADA")) { accentColor = "text-[#D4AF37]"; borderColor="border-[#D4AF37]"; }
  else if (product.category.includes("ALUMINIO")) { accentColor = "text-[#718096]"; borderColor="border-[#718096]"; }
  else if (product.category.includes("MADERA")) { accentColor = "text-[#8D6E63]"; borderColor="border-[#8D6E63]"; Icon = VolumeX; }
  else if (product.category.includes("PVC")) { accentColor = "text-teal-600"; borderColor="border-teal-600"; Icon = Sparkles; }
  else if (product.category.includes("CORREDIZAS")) { accentColor = "text-indigo-600"; borderColor="border-indigo-600"; Icon = MoveHorizontal; }
  else if (product.category.includes("CORTAFUEGO")) { accentColor = "text-orange-600"; borderColor="border-orange-600"; Icon = Flame; }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* BACKDROP ANIMADO */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* PANEL DEL MODAL ANIMADO */}
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-white w-full max-w-[900px] h-full shadow-2xl flex flex-col md:flex-row z-10"
      >
        <button onClick={onClose} className="absolute top-4 left-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-black hover:text-white transition"><X size={20} /></button>

        <div className="w-full md:w-1/2 bg-[#F8F8F8] relative min-h-[300px] md:h-full flex items-center justify-center p-10">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="relative w-full h-full max-h-[500px]"
           >
             <Image src={product.img} alt={product.name} fill className="object-contain mix-blend-multiply" />
           </motion.div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white scrollbar-hide">
            <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${accentColor}`}>{product.category}</span>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            <div className="space-y-8">
              {/* Características */}
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-900 mb-3 flex items-center gap-2">
                  <Icon size={14} /> Características
                </h3>
                <ul className="space-y-2">
                  {product.features?.map((feat, i) => (
                    <motion.li 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      key={i} 
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <span className={`${accentColor} mt-0.5`}>•</span> {feat}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Carta de Colores */}
              {product.colors && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className={`text-gray-900 text-xs font-bold uppercase mb-4 border-l-4 ${borderColor} pl-3 flex items-center gap-2`}>
                        <Palette size={14}/> Carta de Colores
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-start">
                        {product.colors.map((color, i) => (
                            <div key={i} className="text-center group flex flex-col items-center gap-2 cursor-pointer">
                                <div 
                                    className="w-10 h-10 rounded-full shadow-sm border-2 border-white group-hover:border-gray-300 transition-all transform group-hover:scale-110" 
                                    style={{backgroundColor: color.hex}}
                                    title={color.name}
                                ></div>
                                <span className="text-[9px] text-gray-500 uppercase font-medium max-w-[60px] leading-tight">{color.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
              )}

              {/* Especificaciones Técnicas */}
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

              {/* Sistema de Acceso */}
              <div className="">
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Sistema de Acceso</p>
                 <p className="text-xs font-medium text-gray-800 border inline-block px-2 py-1 rounded bg-gray-50">{product.unlock}</p>
              </div>

              {/* Accesorios (Corredizas) */}
              {product.category === "PUERTAS CORREDIZAS Y ABATIBLES" && (
                <div className="pt-6 mt-6 border-t border-gray-100">
                    <h3 className="text-xs font-bold uppercase text-indigo-600 mb-4 flex items-center gap-2">
                        <Settings size={14} /> Accesorios Compatibles
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {ACCESORIOS_CORREDIZAS.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-100 flex flex-col items-center text-center hover:border-indigo-200 transition-colors">
                                <div className="h-24 w-full flex items-center justify-center mb-2 bg-white rounded-sm">
                                    <Image src={item.img} alt={item.name} width={80} height={80} className="object-contain max-h-full" onError={(e) => { e.target.style.display='none'; }} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-800 leading-tight">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
              )}
              
              {/* Vidrios (Corredizas) */}
              {product.category === "PUERTAS CORREDIZAS Y ABATIBLES" && (
                <div className="pt-6 mt-6 border-t border-gray-100">
                    <h3 className="text-xs font-bold uppercase text-indigo-600 mb-4 flex items-center gap-2">
                        <Settings size={14} /> Vidrios De Uso Interior
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {VIDRIOS_CORREDIZAS.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-100 flex flex-col items-center text-center hover:border-indigo-200 transition-colors">
                                <div className="h-24 w-full flex items-center justify-center mb-2 relative rounded-sm overflow-hidden bg-gray-50">
                                  <Image src={item.img} alt={item.name} fill className="object-cover w-full h-full" onError={(e) => { e.target.style.display='none'; }} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-800 leading-tight">{item.name}</span>
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

// --- PRODUCT CARD ACTUALIZADO (Con borde y padding) ---
const ProductCard = ({ product, onClick }) => {
  let highlightClass = "text-gray-400";
  if (product.category.includes("IA")) highlightClass = "text-[#00C2FF]";
  else if (product.category.includes("MADERA")) highlightClass = "text-[#8D6E63]";
  else if (product.category.includes("PVC")) highlightClass = "text-teal-600";
  else if (product.category.includes("CORREDIZAS")) highlightClass = "text-indigo-600";
  else if (product.category.includes("CORTAFUEGO")) highlightClass = "text-orange-600";

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={onClick} 
      className="group cursor-pointer flex flex-col h-full"
    >
      {/* CAMBIOS AQUÍ:
          1. Se agrego 'p-6' al contenedor principal (el cuadro gris) para dar el "borde" interno.
          2. Se añadió un div interno relativo.
          3. Se cambio 'object-cover' por 'object-contain' en la imagen para que no se recorte.
      */}
      <div className="relative aspect-[3/5] w-full overflow-hidden bg-[#F5F5F7] rounded-xl mb-4 border border-transparent group-hover:border-gray-200 transition-all p-6">
        <div className="relative w-full h-full">
            <Image 
            src={product.img} 
            alt={product.name} 
            fill 
            className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${highlightClass}`}>
          {product.category.split(" ")[0]} 
        </span>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-transparent group-hover:border-black self-start transition-all pb-0.5">
          Ver Detalles <ChevronRight size={12} className="ml-1" />
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. PÁGINA PRINCIPAL UNIFICADA ---

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  // ESTADOS PRINCIPALES
  const [activeCategory, setActiveCategory] = useState(initialCategory || "TODOS");
  const [products, setProducts] = useState([]); // PRODUCTOS DE SUPABASE
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. EFECTO: CARGAR DATOS DE SUPABASE
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      
      let query = supabase.from('products').select('*');
      
      if (activeCategory !== "TODOS") {
        query = query.eq('category', activeCategory);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error cargando productos:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    
    fetchProducts();
  }, [activeCategory]);

  // 2. FILTRO LOCAL (BUSCADOR)
  const displayProducts = useMemo(() => {
    if (searchTerm.trim() === "") return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      (p.description && p.description.toLowerCase().includes(term))
    );
  }, [products, searchTerm]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="bg-black text-white pt-32 pb-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter"
          >
            Catálogo WONLY
          </motion.h1>
          <p className="text-gray-400 max-w-xl text-lg font-light">
            Innovación en seguridad y diseño arquitectónico.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row min-h-screen relative">
        
        {/* --- SIDEBAR FILTROS --- */}
        <aside className="w-full md:w-64 flex-shrink-0 border-r border-gray-100 bg-white z-20">
          <div className="sticky top-20 p-6 space-y-8">
            
            {/* Buscador */}
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Buscar modelo..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F5F5F7] border-none rounded-lg py-3 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-black/5 transition-all outline-none"
              />
              <Sparkles className="absolute left-3 top-3 text-gray-400 group-focus-within:text-black transition-colors" size={14} />
            </div>

            {/* Lista Categorías Desktop */}
            <div className="hidden md:block space-y-1">
              <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-4 tracking-widest px-4">Categorías</h3>
              <FilterButton 
                label="Ver Todo" 
                active={activeCategory === "TODOS"} 
                onClick={() => setActiveCategory("TODOS")} 
              />
              {CATEGORIAS.map((cat) => (
                <FilterButton 
                  key={cat} 
                  label={cat.replace("PUERTA ", "").replace("DE ", "")} 
                  active={activeCategory === cat} 
                  onClick={() => setActiveCategory(cat)} 
                />
              ))}
            </div>

            {/* Filtros Móvil */}
            <div className="md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center justify-between w-full bg-black text-white p-3 rounded text-xs font-bold uppercase"
                >
                  <span className="flex items-center gap-2"><Filter size={14}/> Filtrar por categoría</span>
                  <ChevronRight className={`transform transition ${isMobileMenuOpen ? 'rotate-90' : ''}`} size={14}/>
                </button>
                
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-2 border rounded-lg"
                    >
                       <FilterButton label="Ver Todo" active={activeCategory === "TODOS"} onClick={() => {setActiveCategory("TODOS"); setIsMobileMenuOpen(false)}} />
                       {CATEGORIAS.map((cat) => (
                          <FilterButton 
                            key={cat} 
                            label={cat.replace("PUERTA ", "")} 
                            active={activeCategory === cat} 
                            onClick={() => {setActiveCategory(cat); setIsMobileMenuOpen(false)}} 
                          />
                       ))}
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
          </div>
        </aside>

        {/* --- GRID DE PRODUCTOS --- */}
        <main className="flex-1 p-6 md:p-12 bg-white">
          <div className="mb-6 flex justify-between items-end">
             <div>
               <h2 className="text-2xl font-bold tracking-tight">{activeCategory === "TODOS" ? "Todos los Productos" : activeCategory}</h2>
               <p className="text-xs text-gray-400 mt-1">
                 {loading ? "Cargando..." : `${displayProducts.length} modelos disponibles`}
               </p>
             </div>
          </div>

          {loading ? (
             <div className="flex h-64 w-full flex-col items-center justify-center text-gray-400 gap-3">
                <Loader2 className="animate-spin" size={32} />
                <span className="text-xs tracking-widest uppercase">Cargando catálogo...</span>
             </div>
          ) : (
            <motion.div 
              layout 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
            >
              <AnimatePresence mode='popLayout'>
                {displayProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => setSelectedProduct(product)} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && displayProducts.length === 0 && (
            <div className="py-20 text-center text-gray-400">
              <p>No se encontraron productos.</p>
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="mt-4 text-xs font-bold text-black border-b border-black">
                   Borrar búsqueda
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* MODAL DETALLE */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}