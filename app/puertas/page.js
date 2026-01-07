// app/puertas/page.js
"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { X, Filter, ChevronRight, ScanFace, ShieldCheck, Shield, Lock, Music, VolumeX, MicOff } from 'lucide-react';

// --- 1. CONFIGURACIÓN DE CATEGORÍAS ---

const CATEGORIAS = [
  "PUERTA DE SEGURIDAD IA",
  "PUERTA DE ACERO REFORZADO",
  "PUERTA DE SEGURIDAD ACORAZADA",
  "PUERTA DE ALUMINIO FUNDIDO",
  "PUERTA ACÚSTICA DE MADERA", // Nueva Categoría
  "PUERTA INTERIOR"
];

// --- 2. LISTAS DE MODELOS ---

// IA Flagships
const MODELOS_IA = [
  "X50", "X50 Pro", "X60", "X60 Pro", 
  "S108", "S108 Pro", "Glory", "Glory Pro"
];

// Acero Reforzado
const MODELOS_ACERO = [
  "GL098", "NC9020", "GF091", "CL39", "GF092", "GL123-1", "Mid Night", "Contemporary", 
  "GL099", "GL083", "CL56", "GF090", "CL66", "CL37", "CL36", "CL38", "CJ03", "CL23", 
  "CL50", "CL51", "CL097 Pro", "P101", "GL23", "CL058", "CL65", "CL60", "CL72", 
  "P107", "CL55", "CL62", "CL63", "P105", "GF061", "JD073", "NC9516", "P102"
];

// Acorazada (Serie WL)
const MODELOS_ACORAZADA = [
  "WL001", "WL002", "WL003", "WL005", "WL006", "WL007", "WL008", "WL009", 
  "WL010", "WL011", "WL015", "WL016", "WL012", "WL021", "WL029", "WL018", 
  "WL019", "WL020", "WL026", "WL027", "WL022", "WL017", "WL023", "WL028", "WL025"
];

// Aluminio Fundido
const MODELOS_ALUMINIO = [
  "Wave", "Castle", "Woodland", "Louis", "Saab", "Senna", "Lange", "Heidelberg", "Prada"
];

// --- NUEVA CATEGORÍA: MADERA ACÚSTICA ---

// Serie J (Base)
const MODELOS_MADERA_J = [
  "WL-J002", "WL-008", "WL-J011", "WL-J012", "WL-J001", 
  "WL-J003", "WL-J009", "WL-J006", "WL-J010", "WL-J005"
];

// Serie D (Minimalismo Extremo & Arte)
const MODELOS_MADERA_D = [
  "WL-D003", "WL-D015", "WL-D017", "WL-D011", "WL-D002", "WL-D005", "WL-D006", 
  "WL-D007", "WL-D008", "WL-D010", "WL-D012", "WL-D013", "WL-D016", "WL-D018", 
  "WL-D019", "WL-D020", "WL-D033", "WL-D037", "WL-D001", "WL-D009", "WL-D021", 
  "WL-D022", "WL-D023", "WL-D025", "WL-D026", "WL-D027", "WL-D028", "WL-D029", 
  "WL-D030", "WL-D031", "WL-D032", "WL-D036", "WL-D038", "WL-5103", "WL-5105", 
  "WL-5107", "WL-5109", "WL-5110", "WL-5117", "WL-503", "WL-5503"
];

// Serie S (Panel Plano & Pureza)
const MODELOS_MADERA_S = [
  "WL-S009", "WL-S108", "WL-S023", "WL-S206", "WL-S003", "WL-S008", "WL-S010", 
  "WL-S011", "WL-S012", "WL-S020", "WL-S027", "WL-S001", "WL-S002", "WL-S005", 
  "WL-S013", "WL-S015", "WL-S016", "WL-S017", "WL-S019", "WL-S021", "WL-S022", 
  "WL-S025", "WL-S026", "WL-S201", "WL-S205", "WL-S207", "WL-S208", 
  "WL-S209", "WL-S210", "WL-S101B", "WL-S102B", "WL-S103B"
];

// --- 3. ESPECIFICACIONES Y CARACTERÍSTICAS ---

// --- SPECS IA ---
const SPECS_IA = [
  { label: "Tecnología", value: "IA 3ª Generación" },
  { label: "Sistema", value: "Reconocimiento Facial 3D" },
  { label: "Pantalla", value: "10.1\" IPS Táctil" },
  { label: "Cámara", value: "Gran Angular HD" },
  { label: "Cilindro", value: "Clase C (Máxima Seguridad)" },
  { label: "Automátismo", value: "Motor Brushless Silencioso" }
];
const FEATURES_IA = [
  "Apertura 100% automática sin contacto",
  "Reconocimiento Facial 3D Infrarrojo",
  "Videollamada y vigilancia desde App"
];
const UNLOCK_IA = "Facial / Huella / App / Clave / Tarjeta / Llave";

// --- SPECS COMUNES (ACERO REFORZADO Y ACORAZADA) ---
const SPECS_SEGURIDAD_MECANICA = [
  { label: "Seguridad", value: "9 Capas de Protección" },
  { label: "Relleno", value: "Panal de Aluminio Aeroespacial" },
  { label: "Núcleo", value: "Placa de Acero + Malla Antirrobo" },
  { label: "Bisagras", value: "Invisibles (Instalación Oculta)" },
  { label: "Marco", value: "Engrosado con Riel Elevado" },
  { label: "Blindaje", value: "Protección Cuádruple Reforzada" }
];
const FEATURES_SEGURIDAD_MECANICA = [
  "Seguridad inquebrantable con 9 capas de protección",
  "Estructura de malla de acero antirrobo integrada",
  "Relleno de panal de aluminio y placas de acero"
];
const UNLOCK_MECANICO = "Llave de Seguridad / Opción Cerradura Smart";

// --- SPECS ALUMINIO FUNDIDO ---
const SPECS_ALUMINIO = [
  { label: "Material", value: "Aluminio Fundido al Vacío" },
  { label: "Estructura", value: "Hoja Engrosada de una Pieza" },
  { label: "Marco", value: "Acero Ultra Alta Resistencia" },
  { label: "Relleno", value: "Lámina Aluminio Aeronáutico" },
  { label: "Acabado", value: "Tratamiento Anti-Oxidación" },
  { label: "Aislamiento", value: "Térmico y Acústico Superior" }
];
const FEATURES_ALUMINIO = [
  "Placas procesadas mediante técnica de fundición al vacío",
  "Unión continua a marco de acero de ultra alta resistencia",
  "Bloqueo efectivo del calor y frío exterior"
];

// --- SPECS MADERA ACÚSTICA (NUEVO) ---
const SPECS_MADERA = [
  { label: "Núcleo", value: "Madera Sólida Multicapa" },
  { label: "Aislamiento", value: "Alta Reducción dB" },
  { label: "Superficie", value: "Laca UV Ecológica" },
  { label: "Cierre", value: "Magnético Silencioso" },
  { label: "Juntas", value: "Goma EPDM de Sellado" }
];

// Features Específicas por Serie de Madera
const FEATURES_MADERA_D = [
  "Estilo minimalista extremo con texturas exquisitas",
  "Integración de funciones y detalles inesperados",
  "Fusión de calidad, moda y arte en el diseño"
];

const FEATURES_MADERA_S = [
  "Diseño de panel plano: simple, directo y puro",
  "Eliminación de elementos innecesarios",
  "Interpretación natural de la practicidad del hogar"
];

const FEATURES_MADERA_J = [
  "Equilibrio entre robustez y elegancia clásica",
  "Aislamiento acústico de alto rendimiento",
  "Acabados premium en madera texturizada"
];

const UNLOCK_MADERA = "Manilla Magnética / Cerradura Silenciosa";


// --- SPECS INTERIOR ---
const SPECS_INTERIOR = [
  { label: "Colección", value: "Contempo" },
  { label: "Acabado", value: "Fresno Eslovenia" },
  { label: "Núcleo", value: "Sólido Alta Densidad" },
  { label: "Cristales", value: "Vidrio Glaseado Templado" }
];
const FEATURES_INTERIOR = ["Diseño vanguardista con Viva Metal", "Tacto madera natural texturizado"];

// --- 4. GENERACIÓN DE DATOS ---

// Generador IA
const PRODUCTOS_IA = MODELOS_IA.map((nombre, index) => ({
  id: `ia-${index}`,
  name: nombre,
  category: "PUERTA DE SEGURIDAD IA",
  description: `Flagship de seguridad modelo ${nombre}. Integra la última tecnología en Inteligencia Artificial con reconocimiento facial 3D.`,
  specs: SPECS_IA,
  features: FEATURES_IA,
  unlock: UNLOCK_IA,
  img: `/images/AI/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// Generador ACERO
const PRODUCTOS_ACERO = MODELOS_ACERO.map((nombre, index) => ({
  id: `acero-${index}`,
  name: nombre,
  category: "PUERTA DE ACERO REFORZADO",
  description: `Modelo ${nombre}. Estructura multicapa con malla de acero antirrobo y relleno de panal de aluminio.`,
  specs: SPECS_SEGURIDAD_MECANICA,
  features: FEATURES_SEGURIDAD_MECANICA,
  unlock: UNLOCK_MECANICO,
  img: `/images/ACERO/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// Generador ACORAZADA
const PRODUCTOS_ACORAZADA = MODELOS_ACORAZADA.map((nombre, index) => ({
  id: `acorazada-${index}`,
  name: nombre,
  category: "PUERTA DE SEGURIDAD ACORAZADA",
  description: `Puerta acorazada Serie WL modelo ${nombre}. Núcleo de acero sólido, 9 capas de blindaje y bisagras ocultas.`,
  specs: SPECS_SEGURIDAD_MECANICA,
  features: FEATURES_SEGURIDAD_MECANICA,
  unlock: UNLOCK_MECANICO,
  img: `/images/ACORAZADA/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// Generador ALUMINIO
const PRODUCTOS_ALUMINIO = MODELOS_ALUMINIO.map((nombre, index) => ({
  id: `aluminio-${index}`,
  name: nombre,
  category: "PUERTA DE ALUMINIO FUNDIDO",
  description: `Modelo ${nombre} en aluminio fundido al vacío. Marco de acero ultra resistente y aislamiento térmico superior.`,
  specs: SPECS_ALUMINIO,
  features: FEATURES_ALUMINIO,
  unlock: UNLOCK_MECANICO,
  img: `/images/ALUMINIO/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// --- GENERADORES MADERA ACÚSTICA ---

// Serie J
const PRODUCTOS_MADERA_J = MODELOS_MADERA_J.map((nombre, index) => ({
  id: `madera-j-${index}`,
  name: nombre,
  category: "PUERTA ACÚSTICA DE MADERA",
  description: `Serie J Modelo ${nombre}. Puerta acústica que combina el confort del silencio con la calidez de la madera natural.`,
  specs: SPECS_MADERA,
  features: FEATURES_MADERA_J,
  unlock: UNLOCK_MADERA,
  img: `/images/MADERAACÚSTICA/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// Serie D
const PRODUCTOS_MADERA_D = MODELOS_MADERA_D.map((nombre, index) => ({
  id: `madera-d-${index}`,
  name: nombre,
  category: "PUERTA ACÚSTICA DE MADERA",
  description: `Serie D Minimalista (${nombre}). Basada en un estilo minimalista extremo, resalta la exquisitez a través de la textura y artesanía, integrando funciones inesperadas.`,
  specs: SPECS_MADERA,
  features: FEATURES_MADERA_D,
  unlock: UNLOCK_MADERA,
  img: `/images/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// Serie S
const PRODUCTOS_MADERA_S = [...new Set(MODELOS_MADERA_S)].map((nombre, index) => ({ // Set para eliminar duplicados si los hay
  id: `madera-s-${index}`,
  name: nombre,
  category: "PUERTA ACÚSTICA DE MADERA",
  description: `Serie S Pure (${nombre}). Elimina diseños innecesarios recuperando la forma más simple de la vida. Diseño de panel plano: simple, directo y natural.`,
  specs: SPECS_MADERA,
  features: FEATURES_MADERA_S,
  unlock: UNLOCK_MADERA,
  img: `/images/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));


// Producto INTERIOR
const PRODUCTO_INTERIOR = {
  id: "int-001",
  name: "Modelo 200",
  category: "PUERTA INTERIOR",
  description: "Puerta de interior gama Contempo. Acabado en Fresno Eslovenia con detalles en Viva Metal y cristalera integrada.",
  specs: SPECS_INTERIOR,
  features: FEATURES_INTERIOR,
  unlock: "Manilla de Diseño",
  img: "/images/door-200.jpg"
};

// DATA FINAL ORDENADA
const DATA_PRODUCTOS = [
  ...PRODUCTOS_IA, 
  ...PRODUCTOS_ACERO, 
  ...PRODUCTOS_ACORAZADA, 
  ...PRODUCTOS_ALUMINIO,
  ...PRODUCTOS_MADERA_J,
  ...PRODUCTOS_MADERA_D,
  ...PRODUCTOS_MADERA_S,
  PRODUCTO_INTERIOR
];


// --- COMPONENTES UI ---

const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 text-[10px] font-bold uppercase border-b transition-all flex justify-between items-center tracking-widest
      ${active 
        ? 'bg-black text-white border-black pl-6' 
        : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:text-black hover:pl-6'
      }`}
  >
    {label}
    {active && <ChevronRight size={12} />}
  </button>
);

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!product) return null;

  // Lógica de colores según categoría
  let accentColor = "text-gray-900";
  let Icon = ShieldCheck;
  
  if (product.category === "PUERTA DE SEGURIDAD IA") { accentColor = "text-[#00C2FF]"; Icon = ScanFace; }
  else if (product.category === "PUERTA DE SEGURIDAD ACORAZADA") { accentColor = "text-[#D4AF37]"; }
  else if (product.category === "PUERTA DE ALUMINIO FUNDIDO") { accentColor = "text-[#718096]"; }
  else if (product.category === "PUERTA ACÚSTICA DE MADERA") { accentColor = "text-[#8D6E63]"; Icon = VolumeX; } // Marrón madera / Icono acústico

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-[900px] h-full shadow-2xl flex flex-col md:flex-row animate-in slide-in-from-right duration-500 ease-out">
        <button onClick={onClose} className="absolute top-4 left-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-black hover:text-white transition"><X size={20} /></button>

        <div className="w-full md:w-1/2 bg-[#F8F8F8] relative min-h-[300px] md:h-full flex items-center justify-center p-10">
           <div className="relative w-full h-full max-h-[500px]">
             <Image src={product.img} alt={product.name} fill className="object-contain mix-blend-multiply" />
           </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white">
            <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${accentColor}`}>{product.category}</span>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-900 mb-3 flex items-center gap-2">
                  <Icon size={14} /> 
                  Características
                </h3>
                <ul className="space-y-2">
                  {product.features?.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className={`${accentColor} mt-0.5`}>•</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>

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

              <div className="pt-4">
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Sistema de Acceso</p>
                 <p className="text-xs font-medium text-gray-800 border inline-block px-2 py-1 rounded bg-gray-50">{product.unlock}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onClick }) => {
  // Simplificar nombre de categoría para la tarjeta
  const shortCategory = product.category
    .replace("PUERTA DE ", "")
    .replace("PUERTA ", "")
    .replace("SEGURIDAD ", "");
  
  // Color highlight para la tarjeta
  const highlightClass = product.category.includes("IA") ? "text-[#00C2FF]" : 
                         product.category.includes("MADERA") ? "text-[#8D6E63]" : "text-gray-400";

  return (
    <div onClick={onClick} className="group cursor-pointer flex flex-col h-full animate-in fade-in duration-700">
      <div className="relative aspect-[3/5] bg-[#FCFCFC] mb-4 overflow-hidden border border-transparent group-hover:border-gray-100 transition-all">
        <Image 
          src={product.img} 
          alt={product.name} 
          fill 
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end justify-center pb-6">
           <span className="bg-white text-black text-[9px] font-bold uppercase px-3 py-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm tracking-widest">
             Ver Detalles
           </span>
        </div>
      </div>
      
      <div className="text-center group-hover:text-left transition-all">
        <h4 className={`font-bold text-base text-gray-900 transition-colors ${product.category.includes("MADERA") ? "group-hover:text-[#8D6E63]" : "group-hover:text-[#00C2FF]"}`}>{product.name}</h4>
        <p className={`text-[9px] uppercase tracking-widest mt-1 ${product.category.includes("IA") ? "text-[#00C2FF] font-semibold" : highlightClass}`}>
          {shortCategory}
        </p>
      </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---

export default function PuertasPage() {
  const [selectedCategory, setSelectedCategory] = useState("TODAS");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "TODAS") return DATA_PRODUCTOS;
    return DATA_PRODUCTOS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="bg-white min-h-screen text-black pt-28 pb-20">
      
      {/* HEADER */}
      <div className="container mx-auto px-6 mb-16 text-center">
         <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-black mb-6">Wonly Collection</h1>
         <div className="w-px h-12 bg-gray-200 mx-auto mb-6"></div>
         <p className="text-gray-500 max-w-lg mx-auto text-sm font-light leading-relaxed">
            Catálogo completo Wonly. Tecnología IA, resistencia extrema en acero, lujo en aluminio fundido y la nueva colección acústica de madera minimalista.
         </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-32 h-fit">
             <div className="mb-6 pb-2 border-b border-gray-100">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categorías</span>
             </div>
             <div className="flex flex-col gap-1">
                <FilterButton label="Ver Todo" active={selectedCategory === "TODAS"} onClick={() => setSelectedCategory("TODAS")} />
                {CATEGORIAS.map((cat) => (
                  <FilterButton key={cat} label={cat} active={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} />
                ))}
             </div>
          </aside>

          {/* GRID */}
          <section className="flex-grow">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
               <span className="text-xs font-bold uppercase tracking-widest text-gray-900">
                 {selectedCategory === "TODAS" ? "Catálogo Completo" : selectedCategory}
                 <span className="text-gray-400 ml-2">({filteredProducts.length})</span>
               </span>
               
               <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden flex items-center gap-2 text-[10px] font-bold uppercase bg-black text-white px-3 py-2">
                 <Filter size={12} /> Filtros
               </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={() => setSelectedProduct(product)} 
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
               <div className="py-24 text-center text-gray-300 text-sm uppercase tracking-widest">No hay productos en esta categoría.</div>
            )}
          </section>
        </div>
      </div>

      {/* MODAL & MOBILE MENU */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-6 lg:hidden">
           <div className="bg-white w-full max-w-sm p-6 space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-bold uppercase tracking-widest text-sm">Categorías</span>
                <button onClick={() => setMobileMenuOpen(false)}><X size={20}/></button>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => {setSelectedCategory("TODAS"); setMobileMenuOpen(false);}} className="text-left py-3 border-b text-xs font-bold uppercase">Ver Todo</button>
                {CATEGORIAS.map(cat => (
                   <button key={cat} onClick={() => {setSelectedCategory(cat); setMobileMenuOpen(false);}} className="text-left py-3 border-b text-xs font-bold uppercase">{cat}</button>
                ))}
              </div>
           </div>
        </div>
      )}

    </main>
  );
}