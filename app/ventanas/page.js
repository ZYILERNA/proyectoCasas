"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  X, Thermometer, Droplets, Wind, Shield, 
  Volume2, CloudRain, Maximize 
} from 'lucide-react';

// --- 1. DATOS DE PRODUCTOS (SOLO VENTANAS) ---
const PRODUCTOS = [
  
  // ================= VENTANAS - GAMA FASHION =================
  {
    id: "w-fashion-110",
    name: "Fashion 110",
    category: "Ventana",
    type: "SERIE ABATIBLE INTEGRADA",
    description: "Serie de ventanas abatibles integradas con mosquitero y rotura de puente térmico multicavidad. Equilibrio perfecto entre estética y aislamiento.",
    img: "/images/VENTANAS/fashion110.jpg",
    specs: [
      { label: "Espesor", value: "1.4 mm" },
      { label: "Marco", value: "110 mm" },
      { label: "Vidrio", value: "5+20A+5 mm" },
    ],
    details: {
        profile: "6063A-T5 Super",
        rubber: "EPDM Grado Automotriz",
        hardware: "German Runas",
        insulation: "Nailon PA66-GF25",
        glass: "Templado Xinyi Grado Auto"
    },
    performance: [
        { label: "Térmico", value: "1.42 W/(m²·K)", level: "Nivel 8", icon: <Thermometer size={18}/> },
        { label: "Hermeticidad", value: "0.4 (q1)", level: "Nivel 8", icon: <Wind size={18}/> },
        { label: "Insonorización", value: "≥41 dB", level: "Nivel 6", icon: <Volume2 size={18}/> },
        { label: "Estanqueidad", value: "≥700 Pa", level: "Nivel 6", icon: <CloudRain size={18}/> },
        { label: "Resistencia Viento", value: "≥5 KPa", level: "Nivel 9", icon: <Shield size={18}/> }
    ],
    colors: {
        interior: [
            { name: "Metal Grey", hex: "#757a7d" },
            { name: "Metal Cafe", hex: "#4b3621" },
            { name: "Jade Champagne", hex: "#e2d2b6" },
            { name: "Enamel White", hex: "#f0f0f0" },
            { name: "Bubinga", hex: "#654321" },
            { name: "Pure Black", hex: "#1a1a1a" }
        ],
        exterior: [ { name: "Metal Grey", hex: "#757a7d" }, { name: "Metal Cafe", hex: "#4b3621" } ]
    }
  },
  {
    id: "w-fashion-120",
    name: "Fashion 120",
    category: "Ventana",
    type: "SERIE ABATIBLE PREMIUM",
    description: "La evolución de la serie Fashion con mayor espesor de perfil y rendimiento térmico optimizado. Robustez superior para grandes exigencias.",
    img: "/images/VENTANAS/fashion120.jpg",
    specs: [
      { label: "Espesor", value: "2.0 mm" },
      { label: "Marco", value: "120 mm" },
      { label: "Vidrio", value: "5+20A+5 mm" },
    ],
    details: {
        profile: "6063A-T5 Super",
        rubber: "EPDM Grado Automotriz",
        hardware: "German Runas",
        insulation: "Nailon PA66-GF25",
        glass: "Templado Xinyi Grado Auto"
    },
    performance: [
        { label: "Térmico", value: "1.40 W/(m²·K)", level: "Nivel 7.8", icon: <Thermometer size={18}/> },
        { label: "Hermeticidad", value: "0.4 (q1)", level: "Nivel 8", icon: <Wind size={18}/> },
        { label: "Insonorización", value: "≥41 dB", level: "Nivel 6", icon: <Volume2 size={18}/> },
        { label: "Estanqueidad", value: "≥650 Pa", level: "Nivel 6", icon: <CloudRain size={18}/> },
        { label: "Resistencia Viento", value: "≥5 KPa", level: "Nivel 9", icon: <Shield size={18}/> }
    ],
    colors: {
        interior: [
            { name: "Metal Grey", hex: "#757a7d" },
            { name: "Metal Cafe", hex: "#4b3621" },
            { name: "Jade Champagne", hex: "#e2d2b6" },
            { name: "Pure Black", hex: "#1a1a1a" }
        ],
        exterior: [ { name: "Metal Grey", hex: "#757a7d" }, { name: "Metal Cafe", hex: "#4b3621" } ]
    }
  },

  // ================= VENTANAS - GAMA GLORY =================
  {
    id: "w-glory-70",
    name: "Glory 70",
    category: "Ventana",
    type: "ABATIBLE DOBLE APERTURA",
    description: "Ventana abatible de doble apertura interior. Diseño compacto de alto rendimiento con herrajes alemanes VBH.",
    img: "/images/VENTANAS/glory70.jpg",
    specs: [
      { label: "Espesor", value: "2.0 mm" },
      { label: "Marco", value: "70 mm" },
      { label: "Vidrio", value: "5+20A+5 mm" },
    ],
    details: {
        profile: "6063A-T5 Super",
        rubber: "EPDM Grado Automotriz",
        hardware: "German VBH",
        insulation: "Nailon PA66-GF25",
        glass: "Templado Xinyi Grado Auto"
    },
    performance: [
        { label: "Térmico", value: "1.42 W/(m²·K)", level: "Nivel 7.5", icon: <Thermometer size={18}/> },
        { label: "Hermeticidad", value: "0.4 (q1)", level: "Nivel 8", icon: <Wind size={18}/> },
        { label: "Insonorización", value: "≥41 dB", level: "Nivel 6.5", icon: <Volume2 size={18}/> },
        { label: "Estanqueidad", value: "≥700 Pa", level: "Nivel 6", icon: <CloudRain size={18}/> },
        { label: "Resistencia Viento", value: "≥5 KPa", level: "Nivel 9", icon: <Shield size={18}/> }
    ],
    colors: {
        interior: [
            { name: "Metal Grey", hex: "#757a7d" },
            { name: "Cafe", hex: "#5c4a3d" },
            { name: "Sand Grey", hex: "#636466" },
            { name: "Black Crystal Stone", hex: "#222222" }
        ],
        exterior: [ { name: "Metal Grey", hex: "#757a7d" }, { name: "Cafe", hex: "#5c4a3d" } ]
    }
  },
  {
    id: "w-glory-118",
    name: "Glory 118",
    category: "Ventana",
    type: "SISTEMA ABATIBLE INTEGRAL",
    description: "Sistema de ventana abatible robusta con marco de 118mm. Estabilidad estructural superior y máxima protección.",
    img: "/images/VENTANAS/glory118.jpg",
    specs: [
      { label: "Espesor", value: "1.8 mm" },
      { label: "Marco", value: "118 mm" },
      { label: "Vidrio", value: "5+20A+5 mm" },
    ],
    details: {
        profile: "6063A-T5 Super",
        rubber: "EPDM Grado Automotriz",
        hardware: "German VBH",
        insulation: "Nailon PA66-GF25",
        glass: "Templado Xinyi Grado Auto"
    },
    performance: [
        { label: "Térmico", value: "1.42 W/(m²·K)", level: "Nivel 7.5", icon: <Thermometer size={18}/> },
        { label: "Hermeticidad", value: "0.4 (q1)", level: "Nivel 8", icon: <Wind size={18}/> },
        { label: "Insonorización", value: "≥41 dB", level: "Nivel 6.5", icon: <Volume2 size={18}/> },
        { label: "Estanqueidad", value: "≥700 Pa", level: "Nivel 6", icon: <CloudRain size={18}/> },
        { label: "Resistencia Viento", value: "≥5 KPa", level: "Nivel 9", icon: <Shield size={18}/> }
    ],
    colors: {
        interior: [
            { name: "Metal Grey", hex: "#757a7d" },
            { name: "Cafe", hex: "#5c4a3d" },
            { name: "Sand Grey", hex: "#636466" },
            { name: "Black Crystal Stone", hex: "#222222" }
        ],
        exterior: [ { name: "Metal Grey", hex: "#757a7d" }, { name: "Cafe", hex: "#5c4a3d" } ]
    }
  }
];

// --- 2. COMPONENTES UI ---
const ProductCard = ({ product, onClick }) => (
  <div onClick={onClick} className="group cursor-pointer flex flex-col gap-4 bg-[#111] pb-6 border border-transparent hover:border-gray-800 transition-all duration-500">
    <div className="relative aspect-[4/3] overflow-hidden w-full bg-gray-900">
      <Image 
        src={product.img} 
        alt={product.name} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
      />
      <div className="absolute top-4 left-4 flex flex-col items-start gap-1">
        <span className="bg-[#00C2FF] text-black text-[10px] font-bold uppercase px-2 py-1 tracking-widest">{product.category}</span>
        <span className="bg-black/80 text-white border border-white/20 text-[9px] font-bold uppercase px-2 py-1 tracking-widest backdrop-blur-sm">{product.type}</span>
      </div>
    </div>
    <div className="px-6">
      <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-bold text-white group-hover:text-[#00C2FF] transition-colors">{product.name}</h3>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
         {product.specs.slice(0,2).map((s,i) => (
             <span key={i} className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">{s.label}: {s.value}</span>
         ))}
      </div>
    </div>
  </div>
);

// --- COMPONENTE MODAL DE PRODUCTO ---
const ProductModal = ({ product, onClose }) => {
  if (!product) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay oscuro de fondo */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Panel lateral deslizable */}
      <div className="relative bg-[#111] w-full max-w-[700px] h-full shadow-2xl overflow-y-auto border-l border-white/10 animate-in slide-in-from-right duration-300">
        
        {/* Header Fijo */}
        <div className="sticky top-0 bg-[#111]/95 backdrop-blur z-30 p-8 border-b border-white/5 flex justify-between items-start">
            <div>
                <span className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest">{product.category} / {product.type}</span>
                <h2 className="text-4xl font-bold text-white mt-2">{product.name}</h2>
            </div>
            <button onClick={onClose} className="text-white hover:text-[#00C2FF] transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10">
                <X size={24} />
            </button>
        </div>

        <div className="p-8 space-y-8">
            
            {/* --- IMAGEN DEL PRODUCTO (MODO VISUALIZACIÓN COMPLETA) --- */}
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white flex items-center justify-center z-0">
                <Image 
                    src={product.img} 
                    alt={product.name} 
                    fill 
                    className="object-contain p-4 z-20" 
                    priority 
                />
            </div>
            
            {/* Descripción */}
            <p className="text-gray-300 text-lg font-light leading-relaxed border-b border-white/5 pb-8">
                {product.description}
            </p>
            
            {/* Especificaciones Técnicas (Grid) */}
            <div>
                <h3 className="text-white font-bold uppercase mb-4 border-l-4 border-[#00C2FF] pl-3">Detalles Técnicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {Object.entries(product.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-white/10 py-3 text-sm hover:bg-white/5 px-2 rounded transition-colors">
                            <span className="text-gray-500 capitalize">{key.replace('profile', 'Perfil').replace('rubber', 'Goma').replace('hardware', 'Herrajes').replace('insulation', 'Aislamiento').replace('glass', 'Vidrio').replace('finish', 'Acabado').replace('series', 'Serie')}</span>
                            <span className="text-white text-right font-medium">{value}</span>
                        </div>
                    ))}
                    {product.specs.map((spec, i) => (
                          <div key={i} className="flex justify-between border-b border-white/10 py-3 text-sm hover:bg-white/5 px-2 rounded transition-colors">
                            <span className="text-gray-500">{spec.label}</span>
                            <span className="text-white text-right font-medium">{spec.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sección Rendimiento (Solo si existe) */}
            {product.performance && (
                <div>
                    <h3 className="text-white font-bold uppercase mb-4 border-l-4 border-[#00C2FF] pl-3">Rendimiento Certificado</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {product.performance.map((perf, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded border border-white/5 flex flex-col gap-2 hover:bg-white/10 transition-colors">
                                <div className="text-[#00C2FF] mb-1">{perf.icon}</div>
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

            {/* Sección Colores */}
            {product.colors && (
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5">
                    <h3 className="text-white font-bold uppercase mb-6 border-l-4 border-[#00C2FF] pl-3">Carta de Colores</h3>
                    
                    <div className="mb-6">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block mb-4">Acabados Disponibles</span>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            {product.colors.interior.map((color, i) => (
                                <div key={i} className="text-center group flex flex-col items-center gap-2 cursor-pointer">
                                    <div className="w-12 h-12 rounded-full shadow-lg border-2 border-transparent group-hover:border-white transition-all transform group-hover:scale-110" style={{backgroundColor: color.hex}}></div>
                                    <span className="text-[9px] text-gray-400 uppercase font-medium max-w-[60px] leading-tight">{color.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="h-4"></div> {/* Espaciador final */}
            
            <Link href="/contacto" className="block w-full text-center bg-[#00C2FF] hover:bg-[#009bcC] transition-colors text-black py-4 font-bold uppercase rounded text-sm tracking-widest sticky bottom-8 shadow-xl shadow-black/50">
                Solicitar Cotización
            </Link>
        </div>
      </div>
    </div>
  );
};

// --- 3. PÁGINA PRINCIPAL ---

export default function CatalogoPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main className="bg-black min-h-screen text-white pt-24 pb-20 selection:bg-[#00C2FF] selection:text-black">
      
      {/* HEADER SECTION */}
      <section className="container mx-auto px-6 mb-24 text-center">
         <span className="text-[#00C2FF] font-bold tracking-[0.2em] text-xs uppercase">Wonly Architectural Systems</span>
         <h1 className="text-5xl md:text-7xl font-bold uppercase text-white mt-4 mb-6">Catálogo <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Fashion & Glory</span></h1>
         <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light">
           Sistemas arquitectónicos de alto rendimiento. Ventanas de ingeniería alemana y máxima eficiencia energética.
         </p>
      </section>

      {/* --- SECCIÓN DE INGENIERÍA (Bionic Blocks) --- */}
      <section className="container mx-auto px-6 mb-32">
        <div className="mb-12 border-l-4 border-[#00C2FF] pl-6">
          <h2 className="text-3xl font-bold uppercase text-white mb-2">Ingeniería Wonly</h2>
          <p className="text-gray-400 text-sm max-w-xl">
            Tecnología aplicada a nuestros sistemas de ventanas térmicas.
          </p>
        </div>

        {/* GRID LAYOUT DE TECNOLOGÍA (4 BLOQUES COMPLETOS) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* 1. TÉRMICO */}
          <div className="md:col-span-7 bg-[#0f0f0f] border border-white/10 rounded-xl relative overflow-hidden group hover:border-[#00C2FF]/30 transition-colors h-[450px]">
             <Image src="/images/VENTANAS/termico.jpg" alt="Diseño Térmico" fill className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"/>
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
             <div className="absolute bottom-0 left-0 p-8 z-10 w-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#00C2FF] text-black p-2 rounded"><Thermometer size={20}/></div>
                  <h3 className="text-xl font-bold text-white uppercase">Aislamiento Térmico</h3>
                </div>
                <p className="text-gray-200 text-xs leading-relaxed mb-4 max-w-lg font-light">
                   Estructura multicavidad que reduce el coeficiente de transmisión de calor en un 35%.
                </p>
             </div>
          </div>

          {/* 2. DESAGÜE */}
          <div className="md:col-span-5 bg-[#0f0f0f] border border-white/10 rounded-xl relative overflow-hidden group hover:border-white/30 transition-colors h-[450px]">
             <Image src="/images/VENTANAS/desague.jpg" alt="Desagüe" fill className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"/>
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
             <div className="absolute bottom-0 left-0 p-8 z-10">
                <div className="flex items-center gap-3 mb-3">
                   <div className="bg-white text-black p-2 rounded"><Droplets size={20}/></div>
                   <h3 className="text-xl font-bold text-white uppercase">Desagüe Oculto</h3>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed max-w-sm">
                   Sistema de drenaje de suelo patentado. Flujo fluido y silencioso.
                </p>
             </div>
          </div>

          {/* 3. TRIPLE SELLADO */}
          <div className="md:col-span-6 bg-[#0f0f0f] border border-white/10 rounded-xl relative overflow-hidden group hover:border-[#00C2FF]/30 transition-colors h-[400px]">
              <Image src="/images/VENTANAS/sellado.jpg" alt="Sellado" fill className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 z-10">
                 <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[#00C2FF] text-black p-2 rounded"><Wind size={20}/></div>
                    <h3 className="text-xl font-bold text-white uppercase">Triple Sellado</h3>
                 </div>
                 <p className="text-gray-300 text-xs leading-relaxed max-w-md">
                   Junta de goma EPDM continua. Garantiza la máxima hermeticidad y estanqueidad.
                 </p>
              </div>
          </div>

          {/* 4. PROTECTOR */}
          <div className="md:col-span-6 bg-[#0f0f0f] border border-white/10 rounded-xl relative overflow-hidden group hover:border-white/30 transition-colors h-[400px]">
              <Image src="/images/VENTANAS/protector.jpg" alt="Protector" fill className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 z-10 w-full">
                 <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white text-black p-2 rounded"><Shield size={20}/></div>
                    <h3 className="text-xl font-bold text-white uppercase">Protector Abatible</h3>
                 </div>
                 <p className="text-gray-300 text-xs leading-relaxed mb-4 max-w-md">
                   Seguridad integrada para niños y mascotas con función de escape de emergencia rápida.
                 </p>
              </div>
          </div>

        </div>
      </section>

      {/* --- LISTADO DE PRODUCTOS (SOLO VENTANAS) --- */}
      <section className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-4">
           <h2 className="text-2xl font-bold uppercase text-white">Colección 2025</h2>
           {/* Filtros eliminados al solo haber una categoría */}
        </div>
        
        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PRODUCTOS.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
          ))}
        </div>
      </section>

      {/* MODAL DETALLE */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

    </main>
  );
}