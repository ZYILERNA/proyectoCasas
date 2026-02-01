"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ScanLine, Ruler, Box, Palette, RefreshCw, Lock, Layers, Armchair, Maximize2, Barcode } from 'lucide-react';

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
    colors: [
        { 
            part: "Main body", 
            code: "BLRB0015", 
            material: "Fabric", 
            interchangeable: true 
        },
        { 
            part: "Waist-position decoration", 
            code: "PLQQ0004", 
            material: "Genuine leather", 
            interchangeable: false 
        },
        { 
            part: "Solid wood foot", 
            code: "Huayi Red (High gloss)", 
            material: "Birch wood", 
            interchangeable: false 
        }
    ],
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
        "/images/SOFA/MODULAR/SOFA3/img1.jpg",
        "/images/SOFA/MODULAR/SOFA3/img2.jpg",
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
    id: "hysf88106-modular", 
    name: "Sofa HYSF88106", 
    category: "Modulares", 
    code: "HYSF88106/2955", 
    modules: "Group: LS+short platform+wooden box cabinet+1S+1RE Soft armrest+ST", 
    priceBase: 109260, 
    image: "/images/SOFA/MODULAR/SOFA4/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA4/img1.jpg",
        "/images/SOFA/MODULAR/SOFA4/img2.jpg",
        "/images/SOFA/MODULAR/SOFA4/img3.jpg"
    ],
    specs: { 
        dimensions: "4800 * 1580 * 680/815 mm", 
        volume: "4.17 m³", 
        assembly: "Assembled (6 pieces)", 
        pillows: "2x(500*500)" 
    },
    materials: [
        { part: "Main body", material: "Fabric (Not washable)", detail: "Color: BLMM0139" },
        { part: "Back handle", material: "Saddle leather", detail: "Color: GLMA0002" },
        { part: "Wooden box cabinet", material: "Leather", detail: "Color: GLWR0002" },
        { part: "Details", material: "Piping (Nylon)", detail: "Black webbing" }
    ],
    configurations: [
        { code: "Group", size: "Full Modular Set", vol: "4.17m³", price: 109260 },
        { code: "1RE Soft", size: "Soft Armrest Unit", vol: "1.12m³", price: 29690 },
        { code: "1RE Wooden", size: "Wooden Handrail Unit", vol: "1.12m³", price: 39390 },
        { code: "LS", size: "Large Section", vol: "1.62m³", price: 31690 }
    ],
    priceList:[
    { name:"Group Full Set", size:"4800*1580*680", vol:"4.17", prices:{ fa:72890, fb:74460, fc:76220, fd:105120, fe:109260, la:130770, lb:147760, lc:168390 } },
    { name:"1RE Soft armrest", size:"1310*1075*680/815", vol:"1.12", prices:{ fa:19180, fb:19880, fc:20580, fd:28580, fe:29690, la:36280, lb:41180, lc:46780 } },
    { name:"1RE Wooden handrail", size:"1310*1075*680/815", vol:"1.12", prices:{ fa:26800, fb:27860, fc:28200, fd:37660, fe:39390, la:42560, lb:47460, lc:53760 } },
    { name:"1S", size:"1000*1075*680/815", vol:"0.86", prices:{ fa:16680, fb:17050, fc:17480, fd:22280, fe:23180, la:26180, lb:28950, lc:32780 } },
    { name:"LS", size:"1580*1310*680/815", vol:"1.62", prices:{ fa:18450, fb:18780, fc:19150, fd:30380, fe:31690, la:39850, lb:46450, lc:54150 } },
    { name:"ST", size:"980*980*240", vol:"0.31", prices:{ fa:3950, fb:4050, fc:4180, fd:6950, fe:7460, la:9450, lb:11080, lc:13180 } },
    { name:"Short platform", size:"1060*460*240", vol:"0.16", prices:{ fa:3180, fb:3250, fc:3380, fd:5480, fe:5790, la:7560, lb:8650, lc:10050 } },
    { name:"Wooden box cabinet", size:"1060*460*100", vol:"0.10", prices:{ fa:11450, fb:11450, fc:11450, fd:11450, fe:11450, la:11450, lb:11450, lc:11450 } }
    ]
  },
  { 
    id: "hysf88107-modular", 
    name: "Sofa HYSF88107", 
    category: "Modulares", 
    code: "HYSF88107/2956", 
    modules: "Group: LS + 3RE", 
    priceBase: 70460, 
    image: "/images/SOFA/MODULAR/SOFA5/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA5/img1.jpg",
        "/images/SOFA/MODULAR/SOFA5/img2.jpg",
        "/images/SOFA/MODULAR/SOFA5/img3.jpg"
    ],
    specs: { 
        dimensions: "3580 * 1600 * 690 mm", 
        volume: "2.71 m³", 
        assembly: "Disassembled and Assembled (6 pieces)", 
        pillows: "3x(520*520)" 
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "Color: PLBQ0059 (Not washable)" },
        { part: "Legs", material: "Hardware foot", detail: "Brushed Gunmetal" }
    ],
    configurations: [
        { code: "3RE+LS", size: "3-Seater Corner Group", vol: "2.71m³", price: 70460 },
        { code: "3D", size: "3-Seater Standard", vol: "1.78m³", price: 45060 },
        { code: "2S", size: "2-Seater", vol: "1.05m³", price: 24020 },
        { code: "1S", size: "Single Seater", vol: "0.74m³", price: 18060 }
    ],
    priceList:[
    { name:"3RE+LS", size:"3580*1600*690", vol:"2.71", prices:{ fa:34460, fb:36160, fc:38060, fd:40750, fe:47320, la:61860, lb:70460, lc:80560 } },
    { name:"3RE", size:"2130*1080*690", vol:"1.66", prices:{ fa:18480, fb:19480, fc:20680, fd:22360, fe:26460, la:35680, lb:41180, lc:47480 } },
    { name:"LS", size:"1550*1180*690", vol:"1.05", prices:{ fa:15980, fb:16680, fc:17380, fd:18390, fe:20860, la:26180, lb:29280, lc:33080 } },
    { name:"1S", size:"1080*1080*690", vol:"0.74", prices:{ fa:9300, fb:10050, fc:10700, fd:11480, fe:13260, la:15960, lb:18060, lc:20500 } },
    { name:"2S", size:"1700*1080*690", vol:"1.05", prices:{ fa:12420, fb:12880, fc:13580, fd:14290, fe:16380, la:21280, lb:24020, lc:27260 } },
    { name:"3D", size:"2530*1080*690", vol:"1.78", prices:{ fa:22960, fb:24360, fc:25860, fd:27860, fe:32830, la:39160, lb:45060, lc:51060 } }
    ]
  },
  { 
    id: "hysf88119-modular", 
    name: "Sofa HYSF88119",
    category: "Sofá Estándar",
    code: "HYSF88119/2957",
    modules: "Group: 4D",
    priceBase: 43260,
    image: "/images/SOFA/ESTANDAR/SOFA6/render_iso.jpg", 
    schematics: [
        "/images/SOFA/ESTANDAR/SOFA6/img1.jpg"
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
  { 
    id: "hysf88120-2958", 
    name: "HYSF 88120 Series", 
    category: "Modulares", 
    code: "HYSF88120/2958/SOFA", 
    modules: "2LE-B+1LE(GF)+ST+2RE-A", 
    priceBase: 39450, 
    image: "/images/SOFA/MODULAR/SOFA7/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA7/img1.jpg"
    ],
    specs: {
        dimensions: "3320 * 2660 * 750 mm",
        volume: "2.38 m³",
        assembly: "Disassembled and Assembled / 5 pieces",
        pillows: "4 pieces (500*500)"
    },
    colors: [
        { 
            part: "Main body", 
            code: "BLQT0186", 
            material: "Fabric", 
            interchangeable: true 
        },
        { 
            part: "Wooden box frame/backrest", 
            code: "GLBZ0012", 
            material: "Braided leather", 
            interchangeable: true 
        },
        { 
            part: "Solid wood foot", 
            code: "Oil-wax color", 
            material: "Ash wood", 
            interchangeable: false 
        },
        { 
            part: "Hardware foot", 
            code: "Brushed Space Gold", 
            material: "Stainless steel", 
            interchangeable: false 
        }
    ],
    materials: [
        { part: "Main Body", material: "Fabric (BLQT0186/HY7012-5T)", detail: "Interchangeable" },
        { part: "Frame/Backrest", material: "Braided Leather (GLBZ0012/HY9105)", detail: "Interchangeable" },
        { part: "Structure Foot", material: "Ash Wood", detail: "Oil-wax color" },
        { part: "Hardware", material: "Stainless Steel", detail: "Brushed Space Gold" }
    ],
    configurations: [
        { code: "Main Group", size: "3320*2660mm", vol: "2.38m³", price: 39450 }, 
        { code: "2LE-A", size: "1420mm", vol: "0.72m³", price: 11850 },
        { code: "2LE-B", size: "1620mm", vol: "0.81m³", price: 12600 }, 
        { code: "2LS", size: "1340mm", vol: "0.89m³", price: 13860 }
    ],
    priceList: [
        { name: "Group (2LE-B+1LE+ST+2RE-A)", size: "3320*2660*750", vol: "2.38", prices: { fa: 36090, fb: 37930, fc: 39450, fd: 43920, fe: 47190, la: 71680, lb: 81950, lc: 91930 } },
        { name: "1LE(GF)", size: "1020*1040*750", vol: "0.53", prices: { fa: 9100, fb: 9750, fc: 10150, fd: 11450, fe: 12180, la: 17920, lb: 20560, lc: 22960 } },
        { name: "1LE(DF)", size: "1020*1040*750", vol: "0.53", prices: { fa: 8960, fb: 9520, fc: 9800, fd: 11060, fe: 11760, la: 16880, lb: 19150, lc: 21420 } },
        { name: "2LE-A", size: "1420*1040*750", vol: "0.72", prices: { fa: 11060, fb: 11480, fc: 11850, fd: 13160, fe: 13860, la: 21280, lb: 24150, lc: 27160 } },
        { name: "2LE-B", size: "1620*1040*750", vol: "0.81", prices: { fa: 11480, fb: 12150, fc: 12600, fd: 13960, fe: 14990, la: 23800, lb: 27250, lc: 30660 } },
        { name: "2LS", size: "1340*1380*750", vol: "0.89", prices: { fa: 12460, fb: 13250, fc: 13860, fd: 15650, fe: 16760, la: 28560, lb: 33150, lc: 37750 } },
        { name: "1S", size: "900*1040*750", vol: "0.46", prices: { fa: 6950, fb: 7200, fc: 7560, fd: 8260, fe: 8960, la: 13500, lb: 15260, lc: 17150 } },
        { name: "ST", size: "980*860*400", vol: "0.32", prices: { fa: 4450, fb: 4550, fc: 4850, fd: 5350, fe: 6160, la: 8680, lb: 9990, lc: 11150 } }
    ]
},
  { 
    id: "hysf88121-modular", 
    name: "Sofa HYSF88121", 
    category: "Modulares", 
    code: "HYSF88121/2960", 
    modules: "Group: L-B+1S+R-A+1S+1RE-B", 
    priceBase: 62440, 
    image: "/images/SOFA/MODULAR/SOFA8/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA8/img1.jpg",
        "/images/SOFA/MODULAR/SOFA8/img2.jpg",
        "/images/SOFA/MODULAR/SOFA8/img3.jpg"
    ],
    specs: { 
        dimensions: "3820 * 4070 * 710 mm", 
        volume: "6.65 m³", 
        assembly: "Assembled (5 pieces)", 
        pillows: "2x(500*500 Leather) + 2x(500*500 Fabric) + 1x Lumbar" 
    },
    materials: [
        { part: "Main body (Leather)", material: "Genuine leather", detail: "Color: PLQS0012 (Modules L-B+1S)" },
        { part: "Main body (Fabric)", material: "Fabric", detail: "Color: BLQT0001 (Modules R-A+1S+1RE-B)" },
        { part: "Quilted edge/Piping", material: "Eco-leather", detail: "Color: PLST0012" }
    ],
    configurations: [
        { code: "Group", size: "L-B+1S+R-A+1S+1RE-B", vol: "6.65m³", price: 62440 },
        { code: "1RE-B", size: "Corner Unit", vol: "1.18m³", price: 16060 },
        { code: "R-A", size: "Corner Seater", vol: "1.85m³", price: 25020 },
        { code: "L-B", size: "Side Seater", vol: "1.82m³", price: 19080 }
    ],
    priceList:[
        { name:"L-B+1S+R-A+1S+1RE-B", size:"3820*4070*710", vol:"6.65", prices:{ fa:45830, fb:48640, fc:52040, fd:56680, fe:68590, la:85720, lb:102320, lc:119110 } },
        { name:"1RE-B", size:"1330*1040*710", vol:"1.18", prices:{ fa:8960, fb:9520, fc:10220, fd:11060, fe:13260, la:16060, lb:18980, lc:21900 } },
        { name:"1S", size:"1000*1040*710", vol:"0.90", prices:{ fa:6380, fb:6860, fc:7420, fd:8220, fe:10090, la:12780, lb:15600, lc:18450 } },
        { name:"R-A", size:"1490*1490*710", vol:"1.85", prices:{ fa:13260, fb:14200, fc:15360, fd:16760, fe:20490, la:25020, lb:29920, lc:34860 } },
        { name:"L-B", size:"1580*1380*710", vol:"1.82", prices:{ fa:10850, fb:11200, fc:11620, fd:12420, fe:14660, la:19080, lb:22220, lc:25450 } },
        { name:"ST", size:"960*960*390", vol:"0.47", prices:{ fa:4760, fb:4980, fc:5420, fd:6020, fe:7660, la:11160, lb:13860, lc:16660 } }
    ]
  },
{ 
    id: "hysf88123-modular", 
    name: "Sofa HYSF88123", 
    category: "Modulares", 
    code: "HYSF88123/SOFA", 
    modules: "Group: 1LE(Square grid) + 1S(Flat surface) + 1S-B(Square grid) + ST(Square grid)*2 + 1S-B(Flat surface)", 
    priceBase: 47480, 
    image: "/images/SOFA/MODULAR/SOFA9/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA9/img1.jpg",
        "/images/SOFA/MODULAR/SOFA9/img2.jpg",
        "/images/SOFA/MODULAR/SOFA9/img3.jpg"
    ],
    specs: { 
        dimensions: "3060 * 2600 * 690 mm", 
        volume: "4.79 m³", 
        assembly: "Assembled (6 pieces)", 
        pillows: "Optional: 2x(500 * 500)" 
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "Color: PLQS0031" },
        { part: "Main body (Mix)", material: "Fabric", detail: "Color: BLMM0046" },
        { part: "Maintenance", material: "Note", detail: "Not washable" }
    ],
    configurations: [
        { code: "Group", size: "Complete Set", vol: "4.79m³", price: 47480 },
        { code: "1S (Square)", size: "Square Grid Module", vol: "0.87m³", price: 6960 },
        { code: "1LE (Square)", size: "Corner/End Module", vol: "0.88m³", price: 9390 },
        { code: "ST (Square)", size: "Ottoman Module", vol: "0.42m³", price: 4390 }
    ],
    priceList:[
    { name:"Group Full Set", size:"3060*2600*690", vol:"4.79", prices:{ fa:26540, fb:28240, fc:30880, fd:33520, fe:40910, la:56840, lb:66990, lc:76990 } },
    { name:"1S (Square grid)", size:"1020*1020*690", vol:"0.87", prices:{ fa:4550, fb:4860, fc:5180, fd:5560, fe:6960, la:10360, lb:12260, lc:13960 } },
    { name:"1S (Flat surface)", size:"1020*1020*690", vol:"0.87", prices:{ fa:4550, fb:4860, fc:5180, fd:5560, fe:6960, la:10360, lb:12260, lc:13960 } },
    { name:"1S-B (Square grid)", size:"1020*1300*690", vol:"1.10", prices:{ fa:5100, fb:5460, fc:5960, fd:6500, fe:7890, la:11060, lb:12960, lc:14960 } },
    { name:"1S-B (Flat surface)", size:"1020*1300*690", vol:"1.10", prices:{ fa:5100, fb:5460, fc:5960, fd:6500, fe:7890, la:11060, lb:12960, lc:14960 } },
    { name:"1S-C (Square grid)", size:"1020*1020*590", vol:"0.76", prices:{ fa:4190, fb:4560, fc:4880, fd:5460, fe:6490, la:9080, lb:10850, lc:12560 } },
    { name:"1S-C (Flat surface)", size:"1020*1020*590", vol:"0.76", prices:{ fa:4190, fb:4560, fc:4880, fd:5460, fe:6490, la:9080, lb:10850, lc:12560 } },
    { name:"1LE (Square grid)", size:"1020*1020*690", vol:"0.88", prices:{ fa:5790, fb:6260, fc:6860, fd:7560, fe:9390, la:12560, lb:14890, lc:16990 } },
    { name:"1LE (Flat surface)", size:"1020*1020*690", vol:"0.88", prices:{ fa:5790, fb:6260, fc:6860, fd:7560, fe:9390, la:12560, lb:14890, lc:16990 } },
    { name:"ST (Square grid)", size:"1020*780*400", vol:"0.42", prices:{ fa:3000, fb:3100, fc:3460, fd:3700, fe:4390, la:5900, lb:6960, lc:8060 } },
    { name:"ST (Flat surface)", size:"1020*780*400", vol:"0.42", prices:{ fa:3000, fb:3100, fc:3460, fd:3700, fe:4390, la:5900, lb:6960, lc:8060 } },
    { name:"ST-B (Square grid)", size:"1020*1020*400", vol:"0.54", prices:{ fa:3490, fb:3780, fc:4060, fd:4390, fe:5560, la:7300, lb:8360, lc:9660 } },
    { name:"ST-B (Flat surface)", size:"1020*1020*400", vol:"0.54", prices:{ fa:3490, fb:3780, fc:4060, fd:4390, fe:5560, la:7300, lb:8360, lc:9660 } },
    { name:"Movable armrest (Flat)", size:"1020*500*470", vol:"0.32", prices:{ fa:4060, fb:4290, fc:4560, fd:4860, fe:6020, la:6960, lb:8060, lc:9460 } },
    { name:"FSGwooden box cabinet", size:"1000*500*400", vol:"0.25", prices:{ fa:7350, fb:7350, fc:7350, fd:7350, fe:7350, la:7350, lb:7350, lc:7350 } },
    { name:"Support plate", size:"525*380*90", vol:"0.04", prices:{ fa:2290, fb:2290, fc:2290, fd:2290, fe:2290, la:2290, lb:2290, lc:2290 } }
    ]
},
{ 
    id: "hysf88125-modular", 
    name: "Sofa HYSF88125", 
    category: "Modulares", 
    code: "HYSF88125/SOFA", 
    modules: "Group A:(2RE-D + FSG) + Group B:(2LE-B + 1S + R + R-A + Support plate)", 
    priceBase: 83710, 
    image: "/images/SOFA/MODULAR/SOFA10/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA10/img1.jpg",
        "/images/SOFA/MODULAR/SOFA10/img2.jpg",
        "/images/SOFA/MODULAR/SOFA10/img3.jpg"
    ],
    specs: { 
        dimensions: "5000 * 4000 * 740 mm", 
        volume: "6.53 m³", 
        assembly: "Disassembled and Assembled/9 pieces", 
        pillows: "Standard: 7x(500 * 500)" 
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "Color: BLMM0035" },
        { part: "Bottom frame", material: "Genuine leather", detail: "Color: PLQT0020" },
        { part: "Metal foot", material: "Stainless steel", detail: "Brushed Gunmetal" },
        { part: "Cabinet/Plate", material: "MDF", detail: "Oil-wax color" }
    ],
    configurations: [
        { code: "Group Set", size: "Complete Set (A+B)", vol: "6.53m³", price: 83710 },
        { code: "A:2RE-D", size: "Right End Module", vol: "1.85m³", price: 26190 },
        { code: "A:1S", size: "Single Module", vol: "0.73m³", price: 13230 },
        { code: "A:FSG", size: "Cabinet Module", vol: "0.12m³", price: 3690 }
    ],
    priceList:[
    { name:"Group Set (A+B)", size:"5000*4000*740", vol:"6.53", prices:{ fa:68000, fb:71330, fc:74940, fd:79440, fe:92460, la:101180, lb:113960, lc:126950 } },
    { name:"A: 2LE-A", size:"2110*1040*740", vol:"1.67", prices:{ fa:16760, fb:17690, fc:18860, fd:20160, fe:24360, la:27300, lb:31260, lc:35190 } },
    { name:"A: 2LE-B", size:"2450*1040*740", vol:"1.93", prices:{ fa:17690, fb:18730, fc:19880, fd:21080, fe:25160, la:28080, lb:32030, lc:35980 } },
    { name:"A: 2LE-C", size:"2010*1040*740", vol:"1.59", prices:{ fa:18160, fb:19190, fc:20260, fd:21660, fe:25860, la:28890, lb:32830, lc:36860 } },
    { name:"A: 2RE-D", size:"2350*1040*740", vol:"1.85", prices:{ fa:18490, fb:19560, fc:20590, fd:21890, fe:26190, la:29360, lb:33250, lc:37380 } },
    { name:"A: 1S", size:"900*1040*740", vol:"0.73", prices:{ fa:9880, fb:10330, fc:10850, fd:11480, fe:13230, la:14000, lb:15750, lc:17500 } },
    { name:"A: 1LE-A", size:"1210*1040*740", vol:"0.97", prices:{ fa:11380, fb:12080, fc:12920, fd:13620, fe:16290, la:19320, lb:22260, lc:25160 } },
    { name:"A: 1LE-B", size:"1550*1040*740", vol:"1.23", prices:{ fa:12680, fb:13380, fc:14280, fd:14990, fe:18160, la:20580, lb:23730, lc:26560 } },
    { name:"A: 1LE-C", size:"1110*1040*740", vol:"0.90", prices:{ fa:10960, fb:11490, fc:12190, fd:13150, fe:15360, la:16980, lb:19320, lc:21660 } },
    { name:"A: 1LE-D", size:"1450*1040*740", vol:"1.16", prices:{ fa:11280, fb:11900, fc:12690, fd:13490, fe:15960, la:17600, lb:19990, lc:22480 } },
    { name:"A: LS", size:"1440*1110*740", vol:"1.40", prices:{ fa:11480, fb:12180, fc:13020, fd:13860, fe:16630, la:19430, lb:22480, lc:25390 } },
    { name:"A: R", size:"1260*1220*740", vol:"1.18", prices:{ fa:10850, fb:11390, fc:12090, fd:12880, fe:15260, la:17350, lb:19780, lc:22090 } },
    { name:"A: 2LE-D (Seat cushion whole)", size:"2350*1040*740", vol:"1.85", prices:{ fa:18490, fb:19560, fc:20590, fd:21890, fe:26190, la:29360, lb:33250, lc:37380 } },
    { name:"A: FSG", size:"960*400*300", vol:"0.12", prices:{ fa:3690, fb:3690, fc:3690, fd:3690, fe:3690, la:3690, lb:3690, lc:3690 } },
    { name:"B: 2LE-A", size:"2110*1040*740", vol:"1.67", prices:{ fa:16380, fb:17360, fc:18520, fd:19920, fe:23990, la:26890, lb:30760, lc:34760 } },
    { name:"B: 2LE-B", size:"2450*1040*740", vol:"1.93", prices:{ fa:17360, fb:18380, fc:19530, fd:20720, fe:24820, la:27720, lb:31680, lc:35630 } },
    { name:"B: 1S", size:"900*1040*740", vol:"0.73", prices:{ fa:8580, fb:8930, fc:9290, fd:9990, fe:11060, la:11860, lb:13260, lc:14700 } },
    { name:"B: R", size:"1260*1220*740", vol:"1.18", prices:{ fa:10500, fb:11060, fc:11760, fd:12530, fe:14890, la:16980, lb:19430, lc:21780 } },
    { name:"B: R-A", size:"1260*1220*430", vol:"0.69", prices:{ fa:8490, fb:8820, fc:9190, fd:9730, fe:10920, la:10680, lb:11760, lc:12880 } },
    { name:"B: 1LE-A", size:"1210*1040*740", vol:"0.97", prices:{ fa:11060, fb:11760, fc:12460, fd:13260, fe:15360, la:18860, lb:21660, lc:24460 } },
    { name:"B: 1LE-B", size:"1550*1040*740", vol:"1.23", prices:{ fa:12190, fb:12890, fc:13860, fd:14660, fe:17790, la:20260, lb:23390, lc:26360 } },
    { name:"B: 2LE-D", size:"2350*1040*740", vol:"1.85", prices:{ fa:18160, fb:19190, fc:20260, fd:21560, fe:25860, la:28990, lb:32860, lc:37060 } },
    { name:"B: 1LE-C", size:"1110*1040*740", vol:"0.90", prices:{ fa:10590, fb:11160, fc:11860, fd:12780, fe:14990, la:16650, lb:18980, lc:21290 } },
    { name:"B: 1LE-D", size:"1450*1040*740", vol:"1.16", prices:{ fa:10950, fb:11550, fc:12360, fd:13160, fe:15590, la:17260, lb:19680, lc:22090 } },
    { name:"B: 2LE-D (Seat cushion whole)", size:"2350*1040*740", vol:"1.85", prices:{ fa:18160, fb:19190, fc:20260, fd:21560, fe:25860, la:28990, lb:32860, lc:37060 } },
    { name:"B: R-B", size:"1040*1040*740", vol:"0.97", prices:{ fa:10260, fb:10790, fc:11490, fd:12450, fe:14660, la:16280, lb:18650, lc:20960 } },
    { name:"B: TB", size:"960*310*25", vol:"0.01", prices:{ fa:890, fb:890, fc:890, fd:890, fe:890, la:890, lb:890, lc:890 } }
    ]
},
{ 
    id: "hysf88126-modular", 
    name: "Sofa HYSF88126", 
    category: "Modulares", 
    code: "HYSF88126/SOFA", 
    modules: "Group: LS + 1S + 1S + LE", 
    priceBase: 69560, 
    image: "/images/SOFA/MODULAR/SOFA11/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA11/img1.jpg",
        "/images/SOFA/MODULAR/SOFA11/img2.jpg",
        "/images/SOFA/MODULAR/SOFA11/img3.jpg"
    ],
    specs: { 
        dimensions: "5305 * 1820 * 795 mm", 
        volume: "6.97 m³", 
        assembly: "Assembled/4 pieces", 
        pillows: "Standard: 4x(500 * 500) + 3x(650 * 350)" 
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "Color: BLMM0165" },
        { part: "Backrest", material: "Saddle leather", detail: "Color: GLMA0013" },
        { part: "Hardware foot", material: "Stainless steel", detail: "Brushed Antique Bronze" },
        { part: "Decorative buckle", material: "Stainless steel", detail: "Mirror Steel Japanese Gold" }
    ],
    configurations: [
        { code: "Group", size: "Complete Set", vol: "6.97m³", price: 69560 },
        { code: "LS", size: "Chaise Module", vol: "2.26m³", price: 22260 },
        { code: "LE", size: "End Module", vol: "2.56m³", price: 16780 },
        { code: "Tray", size: "Accessory", vol: "0.08m³", price: 2760 }
    ],
    priceList:[
    { name:"Group Set", size:"5305*1820*795", vol:"6.97", prices:{ fa:55450, fb:57600, fc:60080, fd:63660, fe:69560, la:95560, lb:106760, lc:118700 } },
    { name:"LS", size:"1820*1345*795", vol:"2.26", prices:{ fa:17690, fb:18490, fc:19600, fd:20890, fe:22260, la:32180, lb:35990, lc:40190 } },
    { name:"1S", size:"1030*1085*795", vol:"1.04", prices:{ fa:12090, fb:12460, fc:12790, fd:13590, fe:15260, la:19790, lb:21990, lc:24460 } },
    { name:"LE", size:"1900*1480*795", vol:"2.56", prices:{ fa:13580, fb:14190, fc:14900, fd:15590, fe:16780, la:23800, lb:26790, lc:29590 } },
    { name:"2LE", size:"1400*1085*795", vol:"1.43", prices:{ fa:14660, fb:15260, fc:16060, fd:17090, fe:19560, la:25490, lb:28560, lc:31690 } },
    { name:"2LE-B", size:"1600*1085*795", vol:"1.63", prices:{ fa:15690, fb:16390, fc:17360, fd:18390, fe:20960, la:27490, lb:30760, lc:34160 } },
    { name:"R", size:"1680*1270*795", vol:"1.98", prices:{ fa:15260, fb:15960, fc:16990, fd:18060, fe:20590, la:25860, lb:28890, lc:32060 } },
    { name:"Tray", size:"870*450*355", vol:"0.08", prices:{ fa:2760, fb:2760, fc:2760, fd:2760, fe:2760, la:2760, lb:2760, lc:2760 } }
    ]
},
{ 
    id: "hysf88127-modular", 
    name: "Sofa HYSF88127", 
    category: "Modulares", 
    code: "HYSF88127/SOFA", 
    modules: "Group: 1LE-B + LS + 1S*2 + 1RE-A + Hanging basket (DL)", 
    priceBase: 80350, 
    image: "/images/SOFA/MODULAR/SOFA12/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA12/img1.jpg",
        "/images/SOFA/MODULAR/SOFA12/img2.jpg",
        "/images/SOFA/MODULAR/SOFA12/img3.jpg"
    ],
    specs: { 
        dimensions: "4660 * 2990 * 740 mm", 
        volume: "6.27 m³", 
        assembly: "Disassembled and Assembled/6 pieces", 
        pillows: "Standard: 5x(500*500) + 1x(600*380)" 
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "Color: BLMM0218" },
        { part: "Bottom frame/Box plate", material: "Genuine leather", detail: "Color: PLQS0021" },
        { part: "Hanging basket", material: "Saddle leather", detail: "Color: GLMA0013 (Not replaceable)" },
        { part: "Decoration", material: "Stainless steel", detail: "Brushed Space Gold" },
        { part: "Feet", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    configurations: [
        { code: "Group Set", size: "Complete Set", vol: "6.27m³", price: 80350 },
        { code: "1LE-B", size: "Left End Module", vol: "1.22m³", price: 18060 },
        { code: "LS", size: "Corner/Chaise Module", vol: "0.84m³", price: 19360 },
        { code: "1S", size: "Single Module", vol: "0.80m³", price: 12460 },
        { code: "Hanging basket/DL", size: "Accessory", vol: "0.03m³", price: 1950 }
    ],
    priceList:[
    { name:"Group Set (1LE-B+LS+1S*2+1RE-A+DL)", size:"4660*2990*740", vol:"6.27", prices:{ fa:64380, fb:66390, fc:69090, fd:72650, fe:80350, la:107860, lb:119360, lc:130900 } },
    { name:"1LE-B", size:"1350*1180*740", vol:"1.22", prices:{ fa:14980, fb:15360, fc:15980, fd:16660, fe:18060, la:23190, lb:25480, lc:27750 } },
    { name:"LS", size:"1640*1450*740", vol:"0.84", prices:{ fa:15160, fb:15660, fc:16390, fd:17360, fe:19360, la:26380, lb:29490, lc:32490 } },
    { name:"1S", size:"1000*1070*740", vol:"0.80", prices:{ fa:9750, fb:10080, fc:10460, fd:11060, fe:12460, la:16990, lb:18990, lc:20960 } },
    { name:"1RE-A", size:"1210*1070*740", vol:"1.00", prices:{ fa:12790, fb:13260, fc:13850, fd:14560, fe:16060, la:22360, lb:24460, lc:26790 } },
    { name:"Hanging basket/DL", size:"440*180*220", vol:"0.03", prices:{ fa:1950, fb:1950, fc:1950, fd:1950, fe:1950, la:1950, lb:1950, lc:1950 } }
    ]
},
{ 
    id: "hysf88128-standard", 
    name: "Sofa HYSF88128", 
    category: "Sofá Estándar", 
    code: "HYSF88128/SOFA", 
    modules: "Group: 2LE-B + 2RE-B", 
    priceBase: 18580, 
    image: "/images/SOFA/ESTANDAR/SOFA13/render_iso.jpg", 
    schematics: [
        "/images/SOFA/ESTANDAR/SOFA13/img1.jpg",
        "/images/SOFA/ESTANDAR/SOFA13/img2.jpg",
        "/images/SOFA/ESTANDAR/SOFA13/img3.jpg"
    ],
    specs: { 
        dimensions: "2800 * 1000 * 730 mm", 
        volume: "1.89 m³", 
        assembly: "Disassembled and Assembled/3 pieces", 
        pillows: "Standard: 2x(550*550) + 2x(500*500)" 
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "Color: BLMM0086" },
        { part: "Piping", material: "Nylon", detail: "Black webbing" },
        { part: "Sofa feet", material: "Metal", detail: "Space Gray" },
        { part: "Customization", material: "Note", detail: "Extend/shorten by multiples of 230mm" }
    ],
    configurations: [
        { code: "Group", size: "Complete Set", vol: "1.89m³", price: 18580 },
        { code: "2S", size: "2-Seater Module", vol: "1.23m³", price: 10250 },
        { code: "2LE", size: "Left End Module", vol: "1.09m³", price: 10090 },
        { code: "1S", size: "Single Module", vol: "0.63m³", price: 6480 }
    ],
    priceList:[
    { name:"Group Set (2LE-B+2RE-B)", size:"2800*1000*730", vol:"1.89", prices:{ fa:15980, fb:17180, fc:18580, fd:20180, fe:24380, la:32200, lb:37500, lc:42380 } },
    { name:"2LE", size:"1630*1000*730", vol:"1.09", prices:{ fa:8960, fb:9390, fc:10090, fd:11060, fe:13490, la:17460, lb:20480, lc:23290 } },
    { name:"2RE-B", size:"1400*1000*730", vol:"0.94", prices:{ fa:7990, fb:8590, fc:9290, fd:10090, fe:12190, la:16100, lb:18750, lc:21190 } },
    { name:"RS", size:"1600*1000*730", vol:"1.07", prices:{ fa:8690, fb:9290, fc:9990, fd:10850, fe:13150, la:17360, lb:19890, lc:22590 } },
    { name:"1S", size:"920*1000*730", vol:"0.63", prices:{ fa:5780, fb:6150, fc:6480, fd:6960, fe:8250, la:10360, lb:11850, lc:13250 } },
    { name:"2S", size:"1840*1000*730", vol:"1.23", prices:{ fa:8850, fb:9390, fc:10250, fd:11150, fe:13490, la:18060, lb:20850, lc:23390 } },
    { name:"1LE", size:"1170*1000*730", vol:"0.80", prices:{ fa:6750, fb:7190, fc:7790, fd:8580, fe:10450, la:13960, lb:16290, lc:18390 } }
    ]
},
{ 
    id: "hysf88129-modular", 
    name: "Sofa HYSF88129", 
    category: "Modulares", 
    code: "HYSF88129/SOFA", 
    modules: "Group: LE + FJ + 3RE-A (Whole cushion) + 3S-A (Whole cushion) + BJ + DX + Feet", 
    priceBase: 124280, 
    image: "/images/SOFA/MODULAR/SOFA14/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA14/img1.jpg",
        "/images/SOFA/MODULAR/SOFA14/img2.jpg",
        "/images/SOFA/MODULAR/SOFA14/img3.jpg"
    ],
    specs: { 
        dimensions: "4840 * 3390 * 625/810 mm", 
        volume: "4.81 m³", 
        assembly: "Disassembled and Assembled/9 pieces", 
        pillows: "Standard: 2x(550 * 550) + 3x(500 * 500)" 
    },
    materials: [
        { part: "Seat/Back cushion", material: "Fabric", detail: "Color: BLMM0231" },
        { part: "Frame/Backrest", material: "Saddle leather", detail: "Color: GLMA0004" },
        { part: "Tabletop", material: "Marble", detail: "Emerald in the Clouds (Oil-bright)" },
        { part: "Metal foot/Base", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    configurations: [
        { code: "Group Set", size: "Complete Set", vol: "4.81m³", price: 124280 },
        { code: "LE", size: "Corner Module", vol: "1.45m³", price: 27760 },
        { code: "3RE-A", size: "3-Seater End (Whole)", vol: "1.32m³", price: 34960 },
        { code: "3S-A", size: "3-Seater Middle (Whole)", vol: "1.14m³", price: 27150 },
        { code: "FJ", size: "Side Table Unit", vol: "0.71m³", price: 14190 }
    ],
    priceList:[
    { name:"Group Set", size:"4840*3390*625/810", vol:"4.81", prices:{ fa:106710, fb:109040, fc:111820, fd:115290, fe:124280, la:151560, lb:164370, lc:177140 } },
    { name:"3RE", size:"2220*990*625/810", vol:"1.32", prices:{ fa:27960, fb:28890, fc:30030, fd:31360, fe:34960, la:46490, lb:51650, lc:56780 } },
    { name:"3S", size:"1880*990*625/810", vol:"1.14", prices:{ fa:21980, fb:22680, fc:23390, fd:24460, fe:27150, la:34960, lb:38690, lc:42460 } },
    { name:"LE", size:"1680*1730*625/810", vol:"1.45", prices:{ fa:22360, fb:23060, fc:23990, fd:25060, fe:27760, la:35700, lb:39620, lc:43490 } },
    { name:"4D", size:"2910*990*625/810", vol:"1.70", prices:{ fa:34490, fb:35660, fc:37280, fd:39150, fe:43960, la:59790, lb:66790, lc:73790 } },
    { name:"3S-A (Whole cushion)", size:"1880*990*625/810", vol:"1.14", prices:{ fa:21980, fb:22680, fc:23390, fd:24460, fe:27150, la:34960, lb:38690, lc:42460 } },
    { name:"3RE-A (Whole cushion)", size:"2220*990*625/810", vol:"1.32", prices:{ fa:27960, fb:28890, fc:30030, fd:31360, fe:34960, la:46490, lb:51650, lc:56780 } },
    { name:"FJ", size:"940*975*625", vol:"0.71", prices:{ fa:14190, fb:14190, fc:14190, fd:14190, fe:14190, la:14190, lb:14190, lc:14190 } },
    { name:"BJ", size:"935*520*195", vol:"0.15", prices:{ fa:6960, fb:6960, fc:6960, fd:6960, fe:6960, la:6960, lb:6960, lc:6960 } },
    { name:"FJ-B", size:"940*975*625", vol:"0.71", prices:{ fa:17790, fb:17790, fc:17790, fd:17790, fe:17790, la:17790, lb:17790, lc:17790 } },
    { name:"DX", size:"630*130*205", vol:"0.04", prices:{ fa:13260, fb:13260, fc:13260, fd:13260, fe:13260, la:13260, lb:13260, lc:13260 } }
    ]
},
{ 
    id: "hysf88130-standard", 
    name: "Sofa HYSF88130", 
    category: "Sofá Estándar", 
    code: "HYSF88130/SOFA", 
    modules: "Group: 2LE + 2RE", 
    priceBase: 47300, 
    image: "/images/SOFA/ESTANDAR/SOFA15/render_iso.jpg", 
    schematics: [
        "/images/SOFA/ESTANDAR/SOFA15/img1.jpg",
        "/images/SOFA/ESTANDAR/SOFA15/img2.jpg",
        "/images/SOFA/ESTANDAR/SOFA15/img3.jpg"
    ],
    specs: { 
        dimensions: "2900 * 1050 * 760 mm", 
        volume: "2.75 m³", 
        assembly: "Assembled/2 pieces", 
        pillows: "Not specified" 
    },
    materials: [
        { part: "Main body", material: "Matte genuine leather", detail: "Color: PLMS0012" }
    ],
    configurations: [
        { code: "Group", size: "Complete Set", vol: "2.75m³", price: 47300 },
        { code: "2LE", size: "Left Module", vol: "1.37m³", price: 23650 },
        { code: "2RE", size: "Right Module", vol: "1.37m³", price: 23650 }
    ],
    priceList:[
    { name:"Group Set (2LE+2RE)", size:"2900*1050*760", vol:"2.75", prices:{ fa:19780, fb:20860, fc:22780, fd:24720, fe:29960, la:47300, lb:54980, lc:62520 } },
    { name:"2LE", size:"1450*1050*760", vol:"1.37", prices:{ fa:9890, fb:10430, fc:11390, fd:12360, fe:14980, la:23650, lb:27490, lc:31260 } },
    { name:"2RE", size:"1450*1050*760", vol:"1.37", prices:{ fa:9890, fb:10430, fc:11390, fd:12360, fe:14980, la:23650, lb:27490, lc:31260 } }
    ]
},
{ 
    id: "hysf88132-standard", 
    name: "Sofa HYSF88132 / MSF8828", 
    category: "Sofá Estándar", 
    code: "HYSF88132/MSF8828/SOFA", 
    modules: "Group: 1LE + 3RE", 
    priceBase: 38980, 
    image: "/images/SOFA/ESTANDAR/SOFA16/render_iso.jpg", 
    schematics: [
        "/images/SOFA/ESTANDAR/SOFA16/img1.jpg",
        "/images/SOFA/ESTANDAR/SOFA16/img2.jpg",
        "/images/SOFA/ESTANDAR/SOFA16/img3.jpg"
    ],
    specs: { 
        dimensions: "3240 * 1060 * 660 mm", 
        volume: "2.68 m³", 
        assembly: "Disassembled and Assembled/3 pieces", 
        pillows: "Not specified" 
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "Color: BLMM0089" },
        { part: "Sofa feet", material: "Ash wood", detail: "Oil-wax color" },
        { part: "Foot / Bottom frame", material: "Stainless steel", detail: "Brushed Japanese Gold" }
    ],
    configurations: [
        { code: "Group", size: "Complete Set", vol: "2.68m³", price: 38980 },
        { code: "3LE", size: "3-Seater Left", vol: "1.67m³", price: 22280 },
        { code: "3D", size: "3-Seater Module", vol: "1.88m³", price: 25160 },
        { code: "1S", size: "Single Module", vol: "0.72m³", price: 12460 }
    ],
    priceList:[
    { name:"Group Set (1LE+3RE)", size:"3240*1060*660", vol:"2.68", prices:{ fa:27140, fb:28780, fc:30640, fd:32980, fe:38980, la:52450, lb:58100, lc:66060 } },
    { name:"1LE", size:"1180*1060*660", vol:"1.01", prices:{ fa:11760, fb:12400, fc:13160, fd:14200, fe:16700, la:22490, lb:24900, LC:28280 } },
    { name:"RS", size:"1700*1180*660", vol:"1.54", prices:{ fa:14580, fb:15280, fc:15980, fd:17080, fe:20180, la:25090, lb:27500, lc:30680 } },
    { name:"3LE", size:"2060*1060*660", vol:"1.67", prices:{ fa:15380, fb:16380, fc:17480, fd:18780, fe:22280, la:29960, lb:33200, lc:37780 } },
    { name:"3D", size:"2320*1060*660", vol:"1.88", prices:{ fa:17000, fb:18060, fc:19460, fd:20960, fe:25160, la:34500, lb:38700, lc:43260 } },
    { name:"1S", size:"920*1060*660", vol:"0.72", prices:{ fa:9300, fb:9660, fc:10150, fd:10780, fe:12460, la:15960, lb:18160, lc:20260 } }
    ]
},
{ 
    id: "hysf88133-modular", 
    name: "Sofa HYSF88133 / MSF8830", 
    category: "Modulares", 
    code: "HYSF88133/MSF8830/SOFA", 
    modules: "Group: L-B + 2S + R-A + LS-A", 
    priceBase: 59110, 
    image: "/images/SOFA/MODULAR/SOFA17/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA17/img1.jpg",
        "/images/SOFA/MODULAR/SOFA17/img2.jpg",
        "/images/SOFA/MODULAR/SOFA17/img3.jpg"
    ],
    specs: { 
        dimensions: "4280 * 3380 * 680 mm", 
        volume: "6.12 m³", 
        assembly: "Assembled/4 pieces", 
        pillows: "Standard: 1x(450 * 450) + 2x(550 * 350)" 
    },
    materials: [
        { part: "Main body (L-B/2S/R-A)", material: "Fabric", detail: "Color: BLMM0118" },
        { part: "Main body (LS-A)", material: "Genuine leather", detail: "Color: PLBQ0033" },
        { part: "Decorative piece", material: "Stainless steel", detail: "Brushed Japanese Gold" }
    ],
    configurations: [
        { code: "Group Set", size: "Complete Set (Mix)", vol: "6.12m³", price: 59110 },
        { code: "LS-A", size: "Chaise Module", vol: "1.82m³", price: 12100 },
        { code: "R-A", size: "Corner Module", vol: "1.94m³", price: 14980 },
        { code: "2S", size: "2-Seater Module", vol: "1.39m³", price: 10580 },
        { code: "L-B", size: "End Module", vol: "0.97m³", price: 8360 }
    ],
    priceList:[
    { name:"Group Set (L-B+2S+R-A+LS-A)", size:"4280*3380*680", vol:"6.12", prices:{ fa:46020, fb:48290, fc:51460, fd:55880, fe:67790, la:90260, lb:105480, lc:120180 } },
    { name:"3D", size:"2300*1100*680", vol:"1.97", prices:{ fa:14200, fb:15060, fc:16280, fd:18000, fe:22200, la:29960, lb:35560, lc:40800 } },
    { name:"2S", size:"1600*1100*680", vol:"1.39", prices:{ fa:10580, fb:11060, fc:11860, fd:13100, fe:15900, la:21200, lb:25060, lc:28560 } },
    { name:"1S", size:"1000*1100*680", vol:"0.88", prices:{ fa:6260, fb:6600, fc:7180, fd:7980, fe:9660, la:12800, lb:14980, lc:17080 } },
    { name:"R-A", size:"1580*1580*680", vol:"1.94", prices:{ fa:14980, fb:15700, fc:16700, fd:17780, fe:21560, la:28880, lb:33460, lc:38000 } },
    { name:"L-B", size:"1100*1100*680", vol:"0.97", prices:{ fa:8360, fb:8850, fc:9400, fd:10100, fe:12480, la:16680, lb:19460, lc:22260 } },
    { name:"LS-A", size:"1800*1300*680", vol:"1.82", prices:{ fa:12100, fb:12680, fc:13500, fd:14900, fe:17850, la:23500, lb:27500, lc:31360 } },
    { name:"LS-B", size:"1720*1640*680", vol:"2.18", prices:{ fa:14280, fb:14880, fc:15680, fd:16980, fe:19900, la:24680, lb:28660, lc:32400 } }
    ]
},
{ 
    id: "hysf88203-modular", 
    name: "Sofa HYSF88203 / MSF8829", 
    category: "Modulares", 
    code: "HYSF88203/MSF8829/SOFA", 
    modules: "Group: 4LS", 
    priceBase: 15900, 
    image: "/images/SOFA/MODULAR/SOFA18/render_iso.jpg", 
    schematics: [
        "/images/SOFA/MODULAR/SOFA18/img1.jpg",
        "/images/SOFA/MODULAR/SOFA18/img2.jpg",
        "/images/SOFA/MODULAR/SOFA18/img3.jpg"
    ],
    specs: { 
        dimensions: "2870 * 1230 * 660 mm", 
        volume: "2.65 m³", 
        assembly: "Assembled/1 piece", 
        pillows: "Standard: 1x(500 * 500) + 1x(450 * 450) + 1x(Round Φ300)" 
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "Color: BLMR0005" },
        { part: "Alternative", material: "Fabric", detail: "Color: BLMR0011 (Price: 15050)" }
    ],
    configurations: [
        { code: "4LS", size: "4-Seater Module", vol: "2.65m³", price: 15900 },
        { code: "3RE", size: "3-Seater Right", vol: "2.07m³", price: 13860 },
        { code: "LE", size: "Left End Module", vol: "1.62m³", price: 11760 }
    ],
    priceList:[
    { name:"4LS", size:"2870*1230*660", vol:"2.65", prices:{ fa:15050, fb:15900, fc:16980, fd:19100, fe:23380, la:37000, lb:43260, lc:49560 } },
    { name:"3RE", size:"2250*1215*660", vol:"2.07", prices:{ fa:12900, fb:13860, fc:14900, fd:16660, fe:20500, la:33100, lb:38700, lc:44300 } },
    { name:"LE", size:"1900*1120*660", vol:"1.62", prices:{ fa:11060, fb:11760, fc:12680, fd:14200, fe:17460, la:28560, lb:33460, lc:38360 } }
    ]
},
{ 
    id: "hysf88206-butaca", 
    name: "Butaca HYSF88206", 
    category: "Butacas", 
    code: "HYSF88206/SOFA", 
    modules: "Group: 1S", 
    priceBase: 6960, 
    image: "/images/SOFA/BUTACAS/SOFA19/render_iso.jpg", 
    schematics: [
        "/images/SOFA/BUTACAS/SOFA19/img1.jpg",
        "/images/SOFA/BUTACAS/SOFA19/img2.jpg"
    ],
    specs: { 
        dimensions: "1090 * 1120 * 880 mm", 
        volume: "1.28 m³", 
        assembly: "Assembled/1 piece", 
        pillows: "Not specified" 
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "Color: BLRB0015" },
        { part: "Decorative leather", material: "Genuine leather", detail: "Color: PLQQ0004" },
        { part: "Solid wood foot", material: "Birch wood", detail: "Huayi Red (High gloss)" }
    ],
    configurations: [
        { code: "1S", size: "Single Seater", vol: "1.28m³", price: 6960 }
    ],
    priceList:[
    { name:"1S", size:"1090*1120*880", vol:"1.28", prices:{ fa:6590, fb:6960, fc:7290, fd:7990, fe:9290, la:14530, lb:16660, lc:18830 } }
    ]
}

];

// --- CATEGORÍAS ---
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

  // --- SOLUCIÓN 1: BLOQUEO DE SCROLL DEL BODY ---
  useEffect(() => {
    if (selectedSofa) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedSofa]);

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

      {/* --- SIDEBAR / DRAWER DETALLE PRODUCTO (MEJORADO) --- */}
      <AnimatePresence>
        {selectedSofa && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                // Contenedor del modal
                // CAMBIO: Eliminado items-end para que ocupe altura completa y centrado verticalmente por defecto (o stretch)
                className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm h-[100dvh]" 
                onClick={() => setSelectedSofa(null)}
            >
                <motion.div 
                    initial={{ x: "100%", opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }} 
                    onClick={(e) => e.stopPropagation()} 
                    
                    // --- CAMBIOS DE ESTILO AQUÍ ---
                    // 1. h-full: Ocupa toda la altura disponible (que es 100dvh del padre).
                    // 2. rounded-l-2xl: Mantiene bordes redondeados a la izquierda.
                    // 3. Eliminado md:h-[calc...] y md:rounded-tl-2xl para uniformidad.
                    className="bg-white w-full max-w-5xl h-full shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-l-2xl"
                >
                    
                    {/* IZQUIERDA: IMÁGENES */}
                    <div className="md:w-3/5 bg-gray-50 p-6 md:p-8 flex flex-col gap-6 relative shrink-0 border-b md:border-b-0 border-gray-100">
                         <button onClick={() => setSelectedSofa(null)} className="absolute top-4 right-4 md:hidden bg-white p-2 rounded-full shadow-md border border-gray-100 z-10 text-gray-900"><X size={20} /></button>

                        <div className="aspect-video w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-4 flex items-center justify-center relative group shrink-0 max-h-[35vh] md:max-h-full">
                            <img src={selectedSofa.image} alt="Render" className="max-w-full max-h-full object-contain mix-blend-multiply"/>
                        </div>
                        
                        {/* --- CARRUSEL TÉCNICO --- */}
                        <div className="hidden md:block">
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
                    </div>

                    {/* DERECHA: DATOS */}
                    <div className="md:w-2/5 flex flex-col h-full bg-white border-l border-gray-100 relative min-h-0">
                        
                        {/* Header fijo del panel derecho */}
                        <div className="p-6 md:p-8 pb-0 shrink-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="inline-block bg-black text-white text-[10px] font-mono px-2 py-1 mb-2">
                                        {selectedSofa.code}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{selectedSofa.name}</h2>
                                </div>
                                <button onClick={() => setSelectedSofa(null)} className="hidden md:block hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={24} /></button>
                            </div>
                        </div>

                        {/* Scroll area para el contenido de texto */}
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

                                {/* COLORES Y ACABADOS */}
                                {selectedSofa.colors && (
                                    <div>
                                       <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 mb-3 flex items-center gap-2">
                                         <Palette size={14} /> Acabados y Materiales
                                       </h3>
                                       <div className="grid grid-cols-1 gap-3">
                                         {selectedSofa.colors.map((color, idx) => (
                                           <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-300 transition-colors">
                                             <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${color.interchangeable ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-100 text-gray-400'}`}>
                                                {color.interchangeable ? <RefreshCw size={14} /> : <Lock size={14} />}
                                             </div>
                                             <div className="flex-1 min-w-0">
                                               <div className="flex justify-between items-baseline mb-0.5">
                                                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wide truncate">{color.part}</span>
                                                  {color.interchangeable && (
                                                    <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">Opcional</span>
                                                  )}
                                               </div>
                                               <div className="text-sm font-bold text-gray-900 truncate" title={color.code}>{color.code}</div>
                                               <div className="text-xs text-gray-500 truncate">{color.material}</div>
                                             </div>
                                           </div>
                                         ))}
                                       </div>
                                    </div>
                                )}

                                {/* COMPOSICIÓN */}
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
                                        {selectedSofa.configurations?.map((conf, idx) => (
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
                        <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-100 p-4 md:p-6 z-20">
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
        )}
      </AnimatePresence>
    </div>
  );
}