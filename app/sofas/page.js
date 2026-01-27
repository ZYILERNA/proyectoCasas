"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ruler, Box, Layers, Armchair, Barcode, ScanLine, X, 
  ChevronLeft, ChevronRight, Maximize2 
} from 'lucide-react';

// --- CONSTANTES ---
const EXCHANGE_RATE = 0.13; 
const AUTOPLAY_INTERVAL = 3000; 

// Función para formatear precios (CNY -> EUR)
const formatPrice = (priceCNY) => {
    if (!priceCNY) return "-";
    return new Intl.NumberFormat('es-ES', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0 
    }).format(priceCNY * EXCHANGE_RATE);
};

// --- COMPONENTE MODAL DE TABLA DE PRECIOS ---
const PriceTableModal = ({ isOpen, onClose, data, title }) => {
    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
            >
                {/* Header del Modal */}
                <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">Lista de Precios: {title}</h3>
                        <p className="text-xs text-gray-500">Estimación en Euros (€) basada en tasa de cambio actual.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Tabla con Scroll */}
                <div className="overflow-auto p-0">
                    <table className="w-full text-xs text-left text-gray-600">
                        <thead className="text-[10px] uppercase bg-white text-gray-700 font-bold sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="p-3 bg-gray-50 border-b">Modelo</th>
                                <th className="p-3 bg-gray-50 border-b">Medidas (mm)</th>
                                <th className="p-3 text-center bg-blue-50/50 text-blue-800 border-b border-blue-100">Tela A</th>
                                <th className="p-3 text-center bg-blue-50/50 text-blue-800 border-b border-blue-100">Tela B</th>
                                <th className="p-3 text-center bg-blue-100/50 text-blue-900 border-b border-blue-200">Tela C</th>
                                <th className="p-3 text-center bg-blue-50/50 text-blue-800 border-b border-blue-100">Tela D</th>
                                <th className="p-3 text-center bg-blue-50/50 text-blue-800 border-b border-blue-100">Tela E</th>
                                <th className="p-3 text-center bg-orange-50/50 text-orange-800 border-b border-orange-100">Piel A</th>
                                <th className="p-3 text-center bg-orange-50/50 text-orange-800 border-b border-orange-100">Piel B</th>
                                <th className="p-3 text-center bg-orange-50/50 text-orange-800 border-b border-orange-100">Piel C</th>
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
                                    <td className="p-3 text-center font-medium">{formatPrice(row.prices.fd)}</td>
                                    <td className="p-3 text-center font-medium">{formatPrice(row.prices.fe)}</td>
                                    <td className="p-3 text-center font-medium text-gray-500">{formatPrice(row.prices.la)}</td>
                                    <td className="p-3 text-center font-medium text-gray-500">{formatPrice(row.prices.lb)}</td>
                                    <td className="p-3 text-center font-medium text-gray-500">{formatPrice(row.prices.lc)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

// --- BASE DE DATOS DE PRODUCTOS ---
const sofasData = [
  // ... (Tus datos se mantienen igual, solo copio la estructura para referencia) ...
  // PRODUCTO 1: MODENA 88 (SOFÁ ESTÁNDAR)
  { 
    id: "hysf88-standard", 
    name: "Modena 88 Series", 
    category: "Sofá Estándar", 
    code: "HYSF88101/2928BS", 
    modules: "4D (2795mm)", 
    priceBase: 35580, 
    image: "/images/SOFA/ESTANDAR/SOFA1/sofa_render.jpg", 
    schematics: [
        "/images/SOFA/ESTANDAR/SOFA1/plano_vista_frontal.jpg", 
        "/images/SOFA/ESTANDAR/SOFA1/plano_vista_lateral.jpg",
        "/images/SOFA/ESTANDAR/SOFA1/plano_vista_superior.jpg"
    ],
    specs: {
        dimensions: "2795 * 915 * 790 mm",
        volume: "2.31 m³",
        assembly: "Assembled / 1 piece",
        pillows: "3 pieces (500*450)"
    },
    materials: [
        { part: "Main Body", material: "Fabric (BLMM0122T)", detail: "Interchangeable" },
        { part: "Structure", material: "Ash Wood", detail: "Oil-wax color" },
        { part: "Foot Frame", material: "Stainless Steel", detail: "Brushed Gunmetal" }
    ],
    configurations: [
        { code: "1D", size: "1120mm", vol: "0.98m³", price: 15850 }, 
        { code: "2D", size: "2000mm", vol: "1.66m³", price: 27850 },
        { code: "4D", size: "2795mm", vol: "2.31m³", price: 35580 }, 
        { code: "3RE", size: "2065mm", vol: "1.97m³", price: 23760 }
    ],
    priceList: [
        { name: "1D (1-Seater)", size: "1120*915*790", vol: "0.98", prices: { fa: 15150, fb: 15580, fc: 15850, fd: 16650, fe: 18750, la: 29280, lb: 32080, lc: 34850 } },
        { name: "2D (2-Seater)", size: "2000*915*790", vol: "1.66", prices: { fa: 26480, fb: 27180, fc: 27850, fd: 29580, fe: 33790, la: 54850, lb: 60780, lc: 66750 } },
        { name: "4D (4-Seater)", size: "2795*915*790", vol: "2.31", prices: { fa: 33480, fb: 34580, fc: 35580, fd: 37390, fe: 42880, la: 69500, lb: 77250, lc: 84550 } },
        { name: "4D-1 (Large)", size: "3200*1030*790", vol: "3.02", prices: { fa: 33480, fb: 34580, fc: 35580, fd: 37390, fe: 42880, la: 69500, lb: 77250, lc: 84550 } },
        { name: "3RE (Chaise)", size: "2065*1030*790", vol: "1.97", prices: { fa: 22360, fb: 23060, fc: 23760, fd: 25160, fe: 28660, la: 46760, lb: 51760, lc: 56660 } },
        { name: "1LE (Arm Unit)", size: "1135*1030*790", vol: "1.11", prices: { fa: 12790, fb: 13160, fc: 13490, fd: 14180, fe: 15960, la: 26460, lb: 29360, lc: 32160 } },
    ]
  },

  // PRODUCTO 2: NORDIC MODULAR (HYSF88103)
  { 
    id: "hysf88-modular", 
    name: "Nordic Modular System", 
    category: "Modulares", 
    code: "HYSF88103/2951BS", 
    modules: "Group: 2LE+1S+R+1S+ST", 
    priceBase: 121990, 
    image: "/images/SOFA/MODULAR/SOFA2/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA2/plano_medidas.jpg",
        "/images/SOFA/MODULAR/SOFA2/despiece_modulos.jpg",
        "/images/SOFA/MODULAR/SOFA2/img3.jpg"
    ],
    specs: { 
        dimensions: "4430 * 2880 * 700 mm", 
        volume: "5.01 m³", 
        assembly: "Modular (6 Sections)", 
        pillows: "3x(520*520) + 3x(550*280)" 
    },
    materials: [
        { part: "Upholstery", material: "Genuine Leather", detail: "Color: PLBQ0022" },
        { part: "Filling", material: "High Density Foam", detail: "Custom Softness avail." },
        { part: "Legs", material: "Hidden Type", detail: "Low Profile" }
    ],
    configurations: [
        { code: "2LE", size: "Left 2-Seater", vol: "1.18m³", price: 29650 },
        { code: "1S", size: "Single Unit", vol: "0.85m³", price: 19080 },
        { code: "R", size: "Corner Unit", vol: "0.86m³", price: 22950 },
        { code: "ST", size: "Ottoman", vol: "0.42m³", price: 12150 }
    ],
    priceList: [
        { name: "Full Group (Set)", size: "4430*2880", vol: "5.01", prices: { fa: 45090, fb: 49190, fc: 53290, fd: 58600, fe: 65000, la: 114260, lb: 121990, lc: 148260 } },
        { name: "2LE (2-Seater)", size: "1400*1030", vol: "1.18", prices: { fa: 11480, fb: 12000, fc: 12550, fd: 13500, fe: 15000, la: 27080, lb: 29650, lc: 35580 } },
        { name: "1S (Single Unit)", size: "1000*1030", vol: "0.85", prices: { fa: 6850, fb: 7500, fc: 8280, fd: 9000, fe: 10000, la: 18050, lb: 19080, lc: 22950 } },
        { name: "R (Corner)", size: "1030*1030", vol: "0.86", prices: { fa: 8280, fb: 9100, fc: 10050, fd: 11000, fe: 12500, la: 21580, lb: 22950, lc: 28550 } },
        { name: "ST (Ottoman)", size: "1030*850", vol: "0.42", prices: { fa: 4780, fb: 5300, fc: 5850, fd: 6500, fe: 7500, la: 11450, lb: 12150, lc: 15280 } },
        { name: "3LE (3-Seater)", size: "2230*1030", vol: "1.85", prices: { fa: 15480, fb: 16500, fc: 17550, fd: 18800, fe: 21000, la: 38080, lb: 42050, lc: 48580 } },
    ]
  },
  // PRODUCTO 3: CURVED MODULAR (HYSF88105)
  { 
    id: "hysf88-curved", 
    name: "Curved Modular System", 
    category: "Modulares", 
    code: "HYSF88105/2952", 
    modules: "Group: 2LE+LE-A+1S+1RE", 
    priceBase: 63330, 
    image: "/images/SOFA/MODULAR/SOFA3/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA3/plano_medidas.jpg",
        "/images/SOFA/MODULAR/SOFA3/despiece_modulos.jpg",
        "/images/SOFA/MODULAR/SOFA3/img3.jpg"
    ],
    specs: { 
        dimensions: "3430 * 3870 * 690 mm", 
        volume: "5.67 m³", 
        assembly: "Modular (4 Sections)", 
        pillows: "4x(520*520) + 2x(450*450)" 
    },
    materials: [
        { part: "Upholstery", material: "Fabric (Series C)", detail: "Color: BLMM0033" },
        { part: "Details", material: "Piping", detail: "Black Nylon Webbing" },
        { part: "Legs", material: "Stainless Steel", detail: "Brushed Space Gold" }
    ],
    configurations: [
        { code: "2LE", size: "Left 2-Seater", vol: "1.85m³", price: 18500 },
        { code: "LE-A", size: "Curved Corner", vol: "1.65m³", price: 16200 },
        { code: "1S", size: "Single Unit", vol: "0.95m³", price: 9500 },
        { code: "1RE", size: "Right End Unit", vol: "1.22m³", price: 12100 }
    ],
    priceList:[
    { name:"2LE+LE-A+1S+1RE", size:"3430*3870*690", vol:"5.67", prices:{ fa:55090, fb:58710, fc:63330, fd:79130, fe:89240, la:106990, lb:115390, lc:124690 } },
    { name:"3LE", size:"2000*1040*690", vol:"1.65", prices:{ fa:19060, fb:20480, fc:22250, fd:29400, fe:32860, la:38750, lb:41890, lc:45350 } },
    { name:"RE-A", size:"1830*1830*690", vol:"2.61", prices:{ fa:16980, fb:18200, fc:19850, fd:24150, fe:27160, la:35580, lb:38380, lc:41850 } },
    { name:"2RE", size:"1600*1040*690", vol:"1.33", prices:{ fa:16650, fb:17680, fc:19150, fd:25160, fe:28560, la:34550, lb:37380, lc:40780 } },
    { name:"RE-B", size:"1425*1040*690", vol:"1.19", prices:{ fa:11750, fb:12450, fc:13150, fd:16900, fe:18860, la:20880, lb:22280, lc:24050 } },
    { name:"2S-A", size:"2000*1120*690", vol:"1.78", prices:{ fa:13980, fb:15050, fc:16350, fd:19460, fe:21990, la:32050, lb:34850, lc:37680 } },
    { name:"1S", size:"1000*1040*690", vol:"0.85", prices:{ fa:10380, fb:11050, fc:11850, fd:13460, fe:15360, la:17380, lb:18780, lc:19780 } },
    { name:"2S", size:"2000*1040*690", vol:"1.65", prices:{ fa:14220, fb:15620, fc:16880, fd:20380, fe:23290, la:33120, lb:37420, lc:40220 } },
    { name:"1LE", size:"1040*1040*690", vol:"0.88", prices:{ fa:11080, fb:11780, fc:12480, fd:16360, fe:18160, la:19480, lb:20850, lc:22280 } },
    { name:"ST", size:"1040*800*400", vol:"0.42", prices:{ fa:9350, fb:10050, fc:10750, fd:12090, fe:13490, la:15650, lb:17050, lc:17750 } }
    ]
  },
  { 
    id: "hysf88119-modular", 
    name: "Sofa HYSF88119",
    category: "Modulares",
    code: "HYSF88119/2957",
    modules: "Group: 4D",
    priceBase: 43260,
    image: "/images/SOFA/MODULAR/HYSF88119/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/HYSF88119/plano_medidas.jpg",
        "/images/SOFA/MODULAR/HYSF88119/despiece_modulos.jpg",
        "/images/SOFA/MODULAR/HYSF88119/foto_real.jpg"
    ],
    specs: { 
        dimensions: "2820 * 1060 * 730 mm",
        volume: "2.49 m³",
        assembly: "Assembled (1 piece)",
        pillows: "4x(500*500)"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "Color: PLQS0018" },
        { part: "Details", material: "Leather belt (Saddle leather)", detail: "Color: GLMA0002" },
        { part: "Legs", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    configurations: [
        { code: "4D", size: "4-Seater", vol: "2.49m³", price: 43260 },
        { code: "3D", size: "3-Seater Large", vol: "2.23m³", price: 39620 },
        { code: "1D", size: "Single Unit", vol: "1.18m³", price: 21660 },
        { code: "ST", size: "Footstool", vol: "0.44m³", price: 13990 }
    ],
    priceList:[
    { name:"1LE", size:"1190*1060*730", vol:"1.07", prices:{ fa:12180, fb:12820, fc:13580, fd:14920, fe:16760, la:19250, lb:23800, lc:28880 } },
    { name:"1D", size:"1270*1060*730", vol:"1.18", prices:{ fa:13160, fb:13860, fc:14660, fd:16060, fe:18480, la:21660, lb:26560, lc:31460 } },
    { name:"3LE", size:"2040*1060*730", vol:"1.81", prices:{ fa:16720, fb:17720, fc:18830, fd:20160, fe:23290, la:27520, lb:34160, lc:41160 } },
    { name:"3D", size:"2520*1060*730", vol:"2.23", prices:{ fa:25380, fb:26560, fc:28180, fd:30280, fe:34860, la:39620, lb:49420, lc:59920 } },
    { name:"4D", size:"2820*1060*730", vol:"2.49", prices:{ fa:26820, fb:28220, fc:29920, fd:32480, fe:37390, la:43260, lb:54120, lc:65660 } },
    { name:"4D-1", size:"3220*1060*730", vol:"2.81", prices:{ fa:27860, fb:29260, fc:31020, fd:33530, fe:38460, la:45020, lb:56220, lc:68220 } },
    { name:"1S", size:"850*1060*730", vol:"0.81", prices:{ fa:11060, fb:11760, fc:12460, fd:13580, fe:15260, la:17500, lb:21660, lc:26250 } },
    { name:"ST", size:"985*800*430", vol:"0.44", prices:{ fa:8960, fb:9290, fc:9990, fd:10790, fe:12190, la:13990, lb:17360, lc:21000 } }
    ]
  },
];

const categories = ["Todos", "Sofá Estándar", "Modulares", "Butacas"];

export default function SofasPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedSofa, setSelectedSofa] = useState(null); 
  
  // Estados para Carrusel y Modal de Precios
  const [currentSchematicIndex, setCurrentSchematicIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false); 

  const filteredSofas = activeCategory === "Todos" 
    ? sofasData 
    : sofasData.filter(sofa => sofa.category === activeCategory);

  const hasMultipleImages = selectedSofa?.schematics && selectedSofa.schematics.length > 1;

  // --- LÓGICA INTELIGENTE CARRUSEL ---
  useEffect(() => {
    if (!hasMultipleImages || isPaused) return;

    const timer = setInterval(() => {
        setCurrentSchematicIndex((prevIndex) => 
            prevIndex === selectedSofa.schematics.length - 1 ? 0 : prevIndex + 1
        );
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [selectedSofa, isPaused, hasMultipleImages]);

  // Funciones navegación carrusel
  const nextSchematic = () => {
      if (!hasMultipleImages) return;
      setCurrentSchematicIndex((prev) => 
          prev === selectedSofa.schematics.length - 1 ? 0 : prev + 1
      );
  };

  const prevSchematic = () => {
      if (!hasMultipleImages) return;
      setCurrentSchematicIndex((prev) => 
          prev === 0 ? selectedSofa.schematics.length - 1 : prev - 1
      );
  };

  const openModal = (sofa) => {
      setSelectedSofa(sofa);
      setCurrentSchematicIndex(0);
      setIsPaused(false);
      setShowPriceModal(false);
  };

  return (
    <div className="bg-white min-h-screen pb-32 font-sans selection:bg-black selection:text-white">
      
      {/* POPUP DE PRECIOS */}
      <PriceTableModal 
        isOpen={showPriceModal} 
        onClose={() => setShowPriceModal(false)} 
        data={selectedSofa?.priceList}
        title={selectedSofa?.name}
      />

      {/* HEADER & FILTROS */}
      <div className="relative h-[50vh] bg-[#0a0a0a] overflow-hidden flex items-end pb-12">
        <div className="absolute inset-0 opacity-60">
           <img src="/images/sofa-header.jpg" alt="Header" className="w-full h-full object-cover"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="relative z-10 container mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tighter">SOFAS</h1>
            <p className="text-gray-300">Ingeniería de confort. Precios directos de fábrica.</p>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-4">
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat ? 'bg-black text-white border-black' : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
        </div>
      </div>

      {/* GRID PRODUCTOS */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredSofas.map((sofa) => (
              <motion.div key={sofa.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="group block h-full flex flex-col relative">
                  
                  {/* CARD CLICKABLE */}
                  <div 
                    onClick={() => openModal(sofa)} 
                    className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-100 mb-4 border border-gray-100 cursor-pointer"
                  >
                      <div className="absolute top-0 left-0 z-20">
                        <div className="bg-black text-white text-[10px] font-mono px-2 py-1 flex items-center gap-2">
                            <Barcode size={10} /> {sofa.code}
                        </div>
                      </div>
                      
                      <img 
                        src={sofa.image || "/images/placeholder.jpg"} 
                        alt={sofa.name} 
                        className="w-full h-full object-contain p-6 mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-110"
                      />
                  </div>

                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-medium text-gray-900">{sofa.name}</h3>
                    <span className="text-sm font-bold text-gray-900">{formatPrice(sofa.priceBase)}</span>
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{sofa.category}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* --- SIDEBAR / DRAWER DETALLE PRODUCTO (MODIFICADO) --- */}
      <AnimatePresence>
        {selectedSofa && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" // justify-end alinea a la derecha
                onClick={() => setSelectedSofa(null)}
            >
                <motion.div 
                    // Animación en el eje X (Deslizar desde derecha)
                    initial={{ x: "100%", opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }} // Efecto rebote suave
                    onClick={(e) => e.stopPropagation()} 
                    // Estilos modificados: h-full (altura completa), max-w-5xl (ancho), rounded-l-2xl (solo borde izq)
                    className="bg-white w-full max-w-5xl h-full shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-l-2xl"
                >
                    
                    {/* IZQUIERDA: IMÁGENES */}
                    <div className="md:w-3/5 bg-gray-50 p-6 md:p-8 flex flex-col gap-6 relative overflow-y-auto">
                         <button onClick={() => setSelectedSofa(null)} className="absolute top-4 right-4 md:hidden bg-white p-2 rounded-full shadow-sm z-10"><X size={20} /></button>

                        <div className="aspect-video w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-4 flex items-center justify-center relative group shrink-0">
                            <img src={selectedSofa.image} alt="Render" className="max-w-full max-h-full object-contain mix-blend-multiply"/>
                        </div>
                        
                        {/* --- CARRUSEL TÉCNICO --- */}
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
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="max-w-full max-h-full object-contain p-4 mix-blend-multiply cursor-crosshair"
                                        />
                                    </AnimatePresence>

                                    {/* CONTROLES CARRUSEL */}
                                    {hasMultipleImages && (
                                        <>
                                            <button onClick={prevSchematic} className="absolute left-2 p-2 rounded-full bg-white/80 shadow hover:bg-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100">
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button onClick={nextSchematic} className="absolute right-2 p-2 rounded-full bg-white/80 shadow hover:bg-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100">
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

                    {/* DERECHA: DATOS */}
                    <div className="md:w-2/5 p-6 md:p-8 flex flex-col h-full bg-white border-l border-gray-100 relative">
                        {/* Scroll area para el contenido de texto */}
                        <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="inline-block bg-black text-white text-[10px] font-mono px-2 py-1 mb-2">
                                        {selectedSofa.code}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{selectedSofa.name}</h2>
                                </div>
                                <button onClick={() => setSelectedSofa(null)} className="hidden md:block hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={24} /></button>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-blue-600 mb-1"><Ruler size={16} /> <span className="text-[10px] font-bold uppercase">Tamaño</span></div>
                                        <div className="text-sm font-bold text-gray-900">{selectedSofa.specs.dimensions}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1"><Box size={16} /> <span className="text-[10px] font-bold uppercase">Volumen</span></div>
                                        <div className="text-sm font-bold text-gray-900">{selectedSofa.specs.volume}</div>
                                    </div>
                                </div>

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

                                {/* SECCIÓN VARIANTES */}
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
                                        {selectedSofa.configurations && selectedSofa.configurations.map((conf, idx) => (
                                            <div key={idx} className={`p-2.5 rounded border flex justify-between items-center text-xs ${conf.code === '4D' || conf.code === '2LE' ? 'bg-black text-white border-black' : 'border-gray-100 text-gray-600'}`}>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold font-mono bg-white/10 px-1.5 rounded">{conf.code}</span>
                                                    <span className="opacity-80">{conf.size}</span>
                                                </div>
                                                <div className="font-bold font-mono">{formatPrice(conf.price)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer fijo al fondo del drawer */}
                        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-6 z-20">
                            <div className="bg-gray-900 text-white p-4 rounded-lg flex justify-between items-center shadow-lg">
                                <div>
                                    <div className="text-[10px] uppercase text-gray-400 tracking-widest">Precio Estimado</div>
                                    <div className="text-xl font-bold font-mono">{formatPrice(selectedSofa.priceBase)}</div>
                                </div>
                                <Link href="/contacto" className="bg-white text-black px-3 py-2 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                                    Cotizar
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