require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Faltan las variables de entorno en .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --------------------------------------------------------------------------------
// 1. DATOS DE SILLAS Y SILLONES
// --------------------------------------------------------------------------------

const sillasData = [
{ 
    id: "hyyd85-lounge-chair", 
    name: "Silla HYYD85101", 
    category: "Lounge chair", 
    code: "HYYD85101/HX8026B", 
    priceBase: 9100, 
    image: "/images/SILLAS/SILLA1/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA1/img1.jpg", 
        "/images/SILLAS/SILLA1/img2.jpg",
        "/images/SILLAS/SILLA1/img3.jpg",
        "/images/SILLAS/SILLA1/img4.jpg",
        "/images/SILLAS/SILLA1/img5.jpg"
    ],
    specs: {
        dimensions: "640 * 600 * 770 mm",
        volume: "0.38 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0045 (Interchangeable)" },
        { part: "Foot frame", material: "Ash wood", detail: "Oil-wax color" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather", hex: "#455562" } 
        ]
    },
    configurations: [
        { code: "STD", size: "640mm", vol: "0.38m³", price: 9100 }
    ],
    priceList: [
        { name: "Tea Chair", size: "640*600*770", vol: "0.38", prices: { fa: 5250, fb: 5460, fc: 5680, fd: 6260, fe: 6960, la: 9100, lb: 9800, lc: 10580 } }
    ]
},
{ 
    id: "hyyd85102-lounge-chair", 
    name: "Silla HYYD85102", 
    category: "Lounge chair", 
    code: "HYYD85102/HX8025Y", 
    priceBase: 14200, 
    image: "/images/SILLAS/SILLA2/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA2/img1.jpg", 
        "/images/SILLAS/SILLA2/img2.jpg",
        "/images/SILLAS/SILLA2/img3.jpg",
        "/images/SILLAS/SILLA2/img4.jpg", 
        "/images/SILLAS/SILLA2/img5.jpg",
        "/images/SILLAS/SILLA2/img6.jpg",
        "/images/SILLAS/SILLA2/img7.jpg", 
        "/images/SILLAS/SILLA2/img8.jpg",
        "/images/SILLAS/SILLA2/img9.jpg",
        "/images/SILLAS/SILLA2/img10.jpg",
        "/images/SILLAS/SILLA2/img11.jpg"
    ],
    specs: {
        dimensions: "685 * 800 * 770 mm",
        volume: "0.53 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0026/HY9052 (Interchangeable)" },
        { part: "Solid wood sheet", material: "Ash wood", detail: "Oil-wax color" },
        { part: "Foot frame", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather (Brown)", hex: "#7B5C38" } // Color aproximado del swatch
        ]
    },
    configurations: [
        { code: "STD", size: "685mm", vol: "0.53m³", price: 14200 }
    ],
    priceList: [
        { name: "Lounge chair", size: "685*800*770", vol: "0.53", prices: { fa: 8050, fb: 8260, fc: 8580, fd: 8960, fe: 9990, la: 14200, lb: 15500, lc: 16760 } }
    ]
},
{ 
    id: "hyyd85-lounge-chair-red", 
    name: "Silla HYYD85103", 
    category: "Lounge chair", 
    code: "HYYD85103/HX8055", 
    priceBase: 16660, 
    image: "/images/SILLAS/SILLA3/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA3/img1.jpg", 
        "/images/SILLAS/SILLA3/img2.jpg",
        "/images/SILLAS/SILLA3/img3.jpg",
        "/images/SILLAS/SILLA3/img4.jpg", 
        "/images/SILLAS/SILLA3/img5.jpg",
        "/images/SILLAS/SILLA3/img6.jpg",
        "/images/SILLAS/SILLA3/img7.jpg", 
        "/images/SILLAS/SILLA3/img8.jpg",
        "/images/SILLAS/SILLA3/img9.jpg",
        "/images/SILLAS/SILLA3/img10.jpg", 
        "/images/SILLAS/SILLA3/img11.jpg",
        "/images/SILLAS/SILLA3/img12.jpg",
        "/images/SILLAS/SILLA3/img13.jpg", 
        "/images/SILLAS/SILLA3/img14.jpg",
        "/images/SILLAS/SILLA3/img15.jpg",
        "/images/SILLAS/SILLA3/img16.jpg"
    ],
    specs: {
        dimensions: "810 * 840 * 700 mm",
        volume: "0.60 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLQQ0010 (Interchangeable)" },
        { part: "Piping", material: "Nylon", detail: "Black webbing" },
        { part: "Hardware color coating", material: "Saddle leather", detail: "GLMA0001" },
        { part: "Base", material: "Ash wood", detail: "Oil-wax color" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Red", hex: "#8B2323" } 
        ]
    },
    configurations: [
        { code: "STD", size: "810mm", vol: "0.60m³", price: 16660 }
    ],
    priceList: [
        { name: "Lounge chair", size: "810*840*700", vol: "0.60", prices: { fa: 7780, fb: 8100, fc: 8600, fd: 9300, fe: 10360, la: 16660, lb: 18460, lc: 20560 } }
    ]
},
{ 
    id: "hyyd85-lounge-chair-bicolor", 
    name: "Silla HYYD85106", 
    category: "Lounge chair", 
    code: "HYYD85106/HX8050", 
    priceBase: 14780, 
    image: "/images/SILLAS/SILLA4/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA4/img1.jpg", 
        "/images/SILLAS/SILLA4/img2.jpg",
        "/images/SILLAS/SILLA4/img3.jpg",
        "/images/SILLAS/SILLA4/img4.jpg", 
        "/images/SILLAS/SILLA4/img5.jpg",
        "/images/SILLAS/SILLA4/img6.jpg",
        "/images/SILLAS/SILLA4/img7.jpg"
    ],
    specs: {
        dimensions: "740 * 850 * 855 mm",
        volume: "0.67 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Backrest", material: "Genuine leather", detail: "PLQQ0004 (Interchangeable)" },
        { part: "Cushion", material: "Fabric", detail: "HY7065-1 (Not washable)" },
        { part: "Piping", material: "Microfiber leather", detail: "GLCQ0041" },
        { part: "Foot frame", material: "Stainless steel", detail: "Brushed Antique Bronze" }
    ],
    colors: {
        interior: [
            { name: "Backrest Leather", hex: "#8B4513" },
            { name: "Cushion Fabric", hex: "#A98D85" }
        ]
    },
    configurations: [
        { code: "STD", size: "740mm", vol: "0.67m³", price: 14780 }
    ],
    priceList: [
        { name: "Lounge chair", size: "740*850*855", vol: "0.67", prices: { fa: 9280, fb: 9650, fc: 9980, fd: 10680, fe: 12090, sample: 14780, la: 16880, lb: 18980, lc: 21080 } }
    ]
},
{ 
    id: "hyyd85-lounge-chair-pattern", 
    name: "Silla HYYD85107", 
    category: "Lounge chair", 
    code: "HYYD85107/HX8051", 
    priceBase: 12890, 
    image: "/images/SILLAS/SILLA5/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA5/img1.jpg", 
        "/images/SILLAS/SILLA5/img2.jpg",
        "/images/SILLAS/SILLA5/img3.jpg",
        "/images/SILLAS/SILLA5/img4.jpg", 
        "/images/SILLAS/SILLA5/img5.jpg",
        "/images/SILLAS/SILLA5/img6.jpg",
        "/images/SILLAS/SILLA5/img7.jpg", 
        "/images/SILLAS/SILLA5/img8.jpg",
        "/images/SILLAS/SILLA5/img10.jpg",
        "/images/SILLAS/SILLA5/img11.jpg"
    ],
    specs: {
        dimensions: "730 * 720 * 660 mm",
        volume: "0.45 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Contact surface", material: "Fabric", detail: "BLMM0217 (Not washable)" },
        { part: "Outer periphery", material: "Braided leather", detail: "GLBZ0015" },
        { part: "Piping", material: "Nylon", detail: "Black webbing" },
        { part: "Foot", material: "Stainless steel", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Patterned Fabric", hex: "#D1D1D1" },
            { name: "Braided Leather Black", hex: "#1A1A1A" }
        ]
    },
    configurations: [
        { code: "STD", size: "730mm", vol: "0.45m³", price: 12890 }
    ],
    priceList: [
        { name: "Lounge chair", size: "730*720*660", vol: "0.45", prices: { fa: 9180, fb: 9880, fc: 10760, fd: 11760, fe: 14290, sample: 12890, la: 18060, lb: 20860, lc: 24060 } }
    ]
},
{ 
    id: "hyyd85-lounge-chair-comfy", 
    name: "Silla HYYD85108", 
    category: "Lounge chair", 
    code: "HYYD85108/HX8056", 
    priceBase: 9760, 
    image: "/images/SILLAS/SILLA6/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA6/img1.jpg", 
        "/images/SILLAS/SILLA6/img2.jpg",
        "/images/SILLAS/SILLA6/img3.jpg",
        "/images/SILLAS/SILLA6/img4.jpg", 
        "/images/SILLAS/SILLA6/img5.jpg",
        "/images/SILLAS/SILLA6/img6.jpg",
        "/images/SILLAS/SILLA6/img7.jpg", 
        "/images/SILLAS/SILLA6/img8.jpg",
        "/images/SILLAS/SILLA6/img9.jpg",
        "/images/SILLAS/SILLA6/img10.jpg"
    ],
    specs: {
        dimensions: "930 * 850 * 730 mm",
        volume: "0.71 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "BLMR0026 (Not washable)" }
    ],
    colors: {
        interior: [
            { name: "Grey Elastic Fabric", hex: "#5A5E5B" } 
        ]
    },
    configurations: [
        { code: "STD", size: "930mm", vol: "0.71m³", price: 9760 }
    ],
    priceList: [
        { name: "Lounge chair", size: "930*850*730", vol: "0.71", prices: { fa: 9760, fb: 10360, fc: 11160, fd: 12460, fe: 14380, la: 19890, lb: 22960, lc: 25990 } }
    ]
},
{ 
    id: "hyyd85-lounge-chair-swivel", 
    name: "Silla HYYD85115", 
    category: "Lounge chair", 
    code: "HYYD85115/HX8058", 
    priceBase: 13650, 
    image: "/images/SILLAS/SILLA7/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA7/img1.jpg", 
        "/images/SILLAS/SILLA7/img2.jpg",
        "/images/SILLAS/SILLA7/img3.jpg",
        "/images/SILLAS/SILLA7/img4.jpg", 
        "/images/SILLAS/SILLA7/img5.jpg",
        "/images/SILLAS/SILLA7/img6.jpg",
        "/images/SILLAS/SILLA7/img7.jpg",
        "/images/SILLAS/SILLA7/img8.jpg"
    ],
    specs: {
        dimensions: "860 * 695 * 725 mm",
        volume: "0.53 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0030 (Interchangeable)" },
        { part: "Decorative piece", material: "Stainless steel", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Caramel", hex: "#8B5A2B" } 
        ]
    },
    configurations: [
        { code: "STD", size: "860mm", vol: "0.53m³", price: 13650 }
    ],
    priceList: [
        { name: "Lounge chair", size: "860*695*725", vol: "0.53", prices: { fa: null, fb: null, fc: null, fd: null, fe: null, la: 13650, lb: 14960, lc: 16360 } }
    ]
 },
 { 
    id: "hyyd85-lounge-chair-wrap", 
    name: "Silla HYYD85117", 
    category: "Lounge chair", 
    code: "HYYD85117/HX8065", 
    priceBase: 10460, 
    image: "/images/SILLAS/SILLA8/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA8/img1.jpg", 
        "/images/SILLAS/SILLA8/img2.jpg",
        "/images/SILLAS/SILLA8/img3.jpg",
        "/images/SILLAS/SILLA8/img4.jpg", 
        "/images/SILLAS/SILLA8/img5.jpg",
        "/images/SILLAS/SILLA8/img6.jpg"
    ],
    specs: {
        dimensions: "770 * 730 * 720 mm",
        volume: "0.51 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Backrest", material: "Genuine leather", detail: "PLBQ0046 (Interchangeable)" },
        { part: "Cushion", material: "Fabric", detail: "BLMM0084" }
    ],
    colors: {
        interior: [
            { name: "Backrest Leather Mustard", hex: "#A67B23" },
            { name: "Cushion Fabric Grey", hex: "#B7B2AD" }
        ]
    },
    configurations: [
        { code: "STD", size: "770mm", vol: "0.51m³", price: 10460 }
    ],
    priceList: [
        { name: "Lounge chair", size: "770*730*720", vol: "0.51", prices: { fa: 9990, fb: 10220, fc: 10460, fd: 10790, fe: 11760, sample: 10460, la: 13760, lb: 14980, lc: 16060 } }
    ]
 },
 { 
    id: "hyyd85-lounge-chair-draped", 
    name: "Silla HYYD85120", 
    category: "Lounge chair", 
    code: "HYYD85120/HX8068", 
    priceBase: 13160, 
    image: "/images/SILLAS/SILLA9/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA9/img1.jpg", 
        "/images/SILLAS/SILLA9/img2.jpg",
        "/images/SILLAS/SILLA9/img3.jpg",
        "/images/SILLAS/SILLA9/img4.jpg", 
        "/images/SILLAS/SILLA9/img5.jpg",
        "/images/SILLAS/SILLA9/img6.jpg",
        "/images/SILLAS/SILLA9/img7.jpg", 
        "/images/SILLAS/SILLA9/img8.jpg",
        "/images/SILLAS/SILLA9/img9.jpg",
        "/images/SILLAS/SILLA9/img10.jpg", 
        "/images/SILLAS/SILLA9/img11.jpg",
        "/images/SILLAS/SILLA9/img12.jpg"
    ],
    specs: {
        dimensions: "910 * 920 * 795 mm",
        volume: "0.81 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "BLMM0069" },
        { part: "Frame", material: "Ash wood", detail: "Oil-wax color" },
        { part: "Backrest decoration", material: "Stainless steel", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Main Fabric Light Grey", hex: "#D3D3D3" } 
        ]
    },
    configurations: [
        { code: "STD", size: "910mm", vol: "0.81m³", price: 13160 }
    ],
    priceList: [
        { name: "Lounge chair", size: "910*920*795", vol: "0.81", prices: { fa: 9190, fb: 9750, fc: 10360, fd: 11160, fe: 13160, la: 14890, lb: 17460, lc: 19790 } }
    ]
 },
 {
    id: "hyyd85-lounge-chair-85122",
    name: "Silla HYYD85122",
    category: "Lounge chair",
    code: "HYYD85122 / HYYD85122A",
    priceBase: 13250,
    image: "/images/SILLAS/SILLA10/render.jpg",
    schematics: [
        "/images/SILLAS/SILLA10/img1.jpg",
        "/images/SILLAS/SILLA10/img2.jpg",
        "/images/SILLAS/SILLA10/img3.jpg",
        "/images/SILLAS/SILLA10/img4.jpg",
        "/images/SILLAS/SILLA10/img5.jpg",
        "/images/SILLAS/SILLA10/img6.jpg",
        "/images/SILLAS/SILLA10/img7.jpg",
        "/images/SILLAS/SILLA10/img8.jpg",
        "/images/SILLAS/SILLA10/img9.jpg",
        "/images/SILLAS/SILLA10/img10.jpg",
        "/images/SILLAS/SILLA10/img11.jpg",
        "/images/SILLAS/SILLA10/img12.jpg",
        "/images/SILLAS/SILLA10/img13.jpg",
        "/images/SILLAS/SILLA10/img14.jpg"
    ],
    specs: {
        dimensions: "780 * 855 * 890 mm",
        volume: "0.73 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body (variant A)", material: "Genuine leather", detail: "PLQQ0005 (Interchangeable)" },
        { part: "Wooden frame (variant A)", material: "Ash wood", detail: "Oil-wax color (Black)" },
        { part: "Main body (variant B)", material: "Fabric", detail: "BLMM0195 (Not washable)" },
        { part: "Wooden frame (variant B)", material: "Beech wood", detail: "Ochre color" },
        { part: "Metal decorative sheet", material: "Stainless steel", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Tan", hex: "#A46D4D" },
            { name: "Fabric Ochre", hex: "#A0522D" }
        ]
    },
    configurations: [
        { code: "HYYD85122A", size: "780mm", vol: "0.73m³", price: 13250 },
        { code: "HYYD85122", size: "780mm", vol: "0.73m³", price: 9650 }
    ],
    priceList: [
        { name: "Lounge chair", size: "780*855*890", vol: "0.73", prices: { fa: 8260, fb: 8590, fc: 9060, fd: 9650, fe: 10360, la: 11860, lb: 13250, lc: 14650 } }
    ]
 },
 { 
    id: "hyyd85-cigar-chair", 
    name: "Silla HYYD85125 (Cigar chair)", 
    category: "Lounge chair", 
    code: "HYYD85125", 
    priceBase: 35740, 
    image: "/images/SILLAS/SILLA12/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA12/img1.jpg", 
        "/images/SILLAS/SILLA12/img2.jpg",
        "/images/SILLAS/SILLA12/img3.jpg",
        "/images/SILLAS/SILLA12/img4.jpg", 
        "/images/SILLAS/SILLA12/img5.jpg",
        "/images/SILLAS/SILLA12/img6.jpg",
        "/images/SILLAS/SILLA12/img7.jpg", 
        "/images/SILLAS/SILLA12/img8.jpg",
        "/images/SILLAS/SILLA12/img9.jpg",
        "/images/SILLAS/SILLA12/img10.jpg", 
        "/images/SILLAS/SILLA12/img11.jpg"
    ],
    specs: {
        dimensions: "940 * 950 * 1020 mm",
        volume: "1.09 m³",
        assembly: "Assembled / 1 piece",
        includes: "Lounge chair body + Footrest"
    },
    materials: [
        { part: "Main leather", material: "Genuine leather", detail: "PLQT0021" },
        { part: "Outer armrest", material: "Saddle leather", detail: "GLMA0016" },
        { part: "Tray panel", material: "Walnut wood", detail: "Natural walnut color" },
        { part: "Metal part/Chassis", material: "Stainless steel", detail: "Brushed Antique Bronze" },
        { part: "Decorative buckle", material: "Zinc alloy", detail: "Mirror Steel Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Main Leather Greyish", hex: "#938E85" },
            { name: "Outer Armrest Brown", hex: "#5D4037" }
        ]
    },
    configurations: [
        { code: "SET", size: "940mm", vol: "1.09m³", price: 35740 }
    ],
    priceList: [
        { 
            name: "Cigar Chair (HYYD85125)", 
            prices: { fa: 22050, fb: 22480, fc: 22960, fd: 23560, fe: 25150, la: 27850, lb: 29580, lc: 31360 } 
        },
        { 
            name: "Footrest (HYYD85125-ST)", 
            prices: { fa: 6960, fb: 6960, fc: 6960, fd: 7190, fe: 7630, la: 7890, lb: 8360, lc: 9060 } 
        }
    ]
 },
 { 
    id: "hyyd85-lounge-chair-127", 
    name: "Silla HYYD85127", 
    category: "Lounge chair", 
    code: "HYYD85127/HX8061", 
    priceBase: 13960, 
    image: "/images/SILLAS/SILLA13/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA13/img1.jpg", 
        "/images/SILLAS/SILLA13/img2.jpg",
        "/images/SILLAS/SILLA13/img3.jpg",
        "/images/SILLAS/SILLA13/img4.jpg", 
        "/images/SILLAS/SILLA13/img5.jpg",
        "/images/SILLAS/SILLA13/img6.jpg",
        "/images/SILLAS/SILLA13/img7.jpg"
    ],
    specs: {
        dimensions: "880 * 900 * 770 mm",
        volume: "0.75 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main fabric", material: "Fabric", detail: "BLMM0232 (Interchangeable)" },
        { part: "Main leather", material: "Genuine leather", detail: "PLQS0025 (Interchangeable)" }
    ],
    colors: {
        interior: [
            { name: "Main Fabric Teal", hex: "#2F4F4F" },
            { name: "Genuine Leather Teal", hex: "#365E5E" }
        ]
    },
    configurations: [
        { code: "STD", size: "880mm", vol: "0.75m³", price: 13960 }
    ],
    priceList: [
        { name: "Lounge chair", size: "880*900*770", vol: "0.75", prices: { fa: 10080, fb: 10680, fc: 11380, fd: 12190, fe: 14550, sample: 13960, la: 18550, lb: 21180, lc: 23800 } }
    ]
 },
 { 
    id: "hyyd85-rabbit-chair", 
    name: "Silla HYYD85131-B (Rabbit chair)", 
    category: "Lounge chair", 
    code: "HYYD85131-B/MXX6650B", 
    priceBase: 8260, 
    image: "/images/SILLAS/SILLA14/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA14/img1.jpg", 
        "/images/SILLAS/SILLA14/img2.jpg",
        "/images/SILLAS/SILLA14/img3.jpg"
    ],
    specs: {
        dimensions: "680 * 780 * 820 mm",
        volume: "0.55 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "BLMR0007" },
        { part: "Base", material: "Stainless steel", detail: "Natural color" }
    ],
    colors: {
        interior: [
            { name: "Main Fabric Cream", hex: "#E3DFCC" } 
        ]
    },
    configurations: [
        { code: "STD", size: "680mm", vol: "0.55m³", price: 8260 }
    ],
    priceList: [
        { name: "Rabbit chair", size: "680*780*820", vol: "0.55", prices: { fa: 6300, fb: 6580, fc: 6960, fd: 7280, fe: 8260, la: 11160, lb: 12560, lc: 13960 } }
    ]
 },
 { 
    id: "hyyd85-rabbit-chair-black", 
    name: "Silla HYYD85131-A (Rabbit chair)", 
    category: "Lounge chair", 
    code: "HYYD85131-A/MXX6650", 
    priceBase: 6580, 
    image: "/images/SILLAS/SILLA15/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA15/img1.jpg", 
        "/images/SILLAS/SILLA15/img2.jpg",
        "/images/SILLAS/SILLA15/img3.jpg",
        "/images/SILLAS/SILLA15/img4.jpg", 
        "/images/SILLAS/SILLA15/img5.jpg",
        "/images/SILLAS/SILLA15/img6.jpg",
        "/images/SILLAS/SILLA15/img7.jpg", 
        "/images/SILLAS/SILLA15/img8.jpg",
        "/images/SILLAS/SILLA15/img9.jpg",
        "/images/SILLAS/SILLA15/img10.jpg", 
        "/images/SILLAS/SILLA15/img11.jpg",
        "/images/SILLAS/SILLA15/img12.jpg",
        "/images/SILLAS/SILLA15/img13.jpg"
    ],
    specs: {
        dimensions: "760 * 700 * 730 mm",
        volume: "0.49 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "BLMR0006" },
        { part: "Base", material: "Stainless steel", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Main Fabric Black", hex: "#1A1A1A" } 
        ]
    },
    configurations: [
        { code: "STD", size: "760mm", vol: "0.49m³", price: 6580 }
    ],
    priceList: [
        { name: "Rabbit chair", size: "760*700*730", vol: "0.49", prices: { fa: 4660, fb: 4880, fc: 5260, fd: 5580, fe: 6580, la: 9460, lb: 10860, lc: 12260 } }
    ]
 },
 { 
    id: "hyyd85-lounge-chair-132", 
    name: "Silla HYYD85132", 
    category: "Lounge chair", 
    code: "HYYD85132/MXX6638", 
    priceBase: 9980, 
    image: "/images/SILLAS/SILLA16/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA16/img1.jpg", 
        "/images/SILLAS/SILLA16/img2.jpg",
        "/images/SILLAS/SILLA16/img3.jpg",
        "/images/SILLAS/SILLA16/img4.jpg", 
        "/images/SILLAS/SILLA16/img5.jpg",
        "/images/SILLAS/SILLA16/img6.jpg",
        "/images/SILLAS/SILLA16/img7.jpg", 
        "/images/SILLAS/SILLA16/img8.jpg",
        "/images/SILLAS/SILLA16/img9.jpg",
        "/images/SILLAS/SILLA16/img10.jpg", 
        "/images/SILLAS/SILLA16/img11.jpg",
        "/images/SILLAS/SILLA16/img12.jpg",
        "/images/SILLAS/SILLA16/img13.jpg"
    ],
    specs: {
        dimensions: "980 * 840 * 700 mm",
        volume: "0.71 m³",
        assembly: "Assembled / 1 piece",
        pillows: "1 piece (500*300)"
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "BLMM0207 (Interchangeable)" },
        { part: "Solid wood foot", material: "Ash wood", detail: "Oil-wax color" },
        { part: "Foot pad/Bottom frame", material: "Stainless steel", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Main Fabric Textured", hex: "#D9C5B2" } 
        ]
    },
    configurations: [
        { code: "STD", size: "980mm", vol: "0.71m³", price: 9980 }
    ],
    priceList: [
        { name: "Lounge chair", size: "980*840*700", vol: "0.71", prices: { fa: 7360, fb: 7680, fc: 8260, fd: 8660, fe: 9980, la: 11550, lb: 12560, lc: 14200 } }
    ]
 },
 { 
    id: "hyyd85-butterfly-chair", 
    name: "Silla HYYD85135 (Butterfly chair)", 
    category: "Lounge chair", 
    code: "HYYD85135/MXX6652", 
    priceBase: 20560, 
    image: "/images/SILLAS/SILLA17/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA17/img1.jpg",
        "/images/SILLAS/SILLA17/img2.jpg",
        "/images/SILLAS/SILLA17/img3.jpg", 
        "/images/SILLAS/SILLA17/img4.jpg",
        "/images/SILLAS/SILLA17/img5.jpg",
        "/images/SILLAS/SILLA17/img6.jpg",
        "/images/SILLAS/SILLA17/img7.jpg"
    ],
    specs: {
        dimensions: "910 * 745 * 890 mm",
        volume: "0.74 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "BLMR0010" },
        { part: "Frame", material: "Stainless steel", detail: "High gloss finish" }
    ],
    colors: {
        interior: [
            { name: "Main Fabric Rose/Burgundy", hex: "#9B4E5B" } 
        ]
    },
    configurations: [
        { code: "STD", size: "910mm", vol: "0.74m³", price: 20560 }
    ],
    priceList: [
        { name: "Butterfly chair", size: "910*745*890", vol: "0.74", prices: { fa: 20260, fb: 20380, fc: 20560, fd: 20760, fe: 21360, la: 23360, lb: 24060, lc: 24780 } }
    ]
 },
 { 
    id: "hyyd85-knot-chair", 
    name: "Silla HYYD85136-A (Knot Chair)", 
    category: "Lounge chair", 
    code: "HYYD85136-A/MXX6658", 
    priceBase: 13860, 
    image: "/images/SILLAS/SILLA18/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA18/img1.jpg", 
        "/images/SILLAS/SILLA18/img2.jpg",
        "/images/SILLAS/SILLA18/img3.jpg"
    ],
    specs: {
        dimensions: "1010 * 930 * 810 mm",
        volume: "0.92 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Elastic fabric", detail: "BLTL0013" },
        { part: "Base", material: "Stainless steel", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Elastic Fabric Pattern", hex: "#C2B49A" } 
        ]
    },
    configurations: [
        { code: "STD", size: "1010mm", vol: "0.92m³", price: 13860 }
    ],
    priceList: [
        { name: "Knot Chair", size: "1010*930*810", vol: "0.92", prices: { fa: 11550, fb: 11990, fc: 12460, fd: 13060, fe: 13860, la: 17850, lb: 19960, lc: 21960 } }
    ]
 },
 { 
    id: "hyyd85-knot-chair-art", 
    name: "Silla HYYD85136-B (Knot Chair)", 
    category: "Lounge chair", 
    code: "HYYD85136-B/MXX6658B", 
    priceBase: 13790, 
    image: "/images/SILLAS/SILLA19/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA19/img1.jpg", 
        "/images/SILLAS/SILLA19/img2.jpg",
        "/images/SILLAS/SILLA19/img3.jpg"
    ],
    specs: {
        dimensions: "1010 * 930 * 810 mm",
        volume: "0.92 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "BLTL0027 (Elastic)" },
        { part: "Hardware turntable base", material: "Stainless steel", detail: "Stainless steel natural color" }
    ],
    colors: {
        interior: [
            { name: "Multicolor Splatter Fabric", hex: "#EAEAEA" } 
        ]
    },
    configurations: [
        { code: "STD", size: "1010mm", vol: "0.92m³", price: 13790 }
    ],
    priceList: [
        { name: "Knot Chair", size: "1010*930*810", vol: "0.92", prices: { fa: 13390, fb: 13790, fc: 14290, fd: 14890, fe: 15690, la: 19690, lb: 21790, lc: 23760 } }
    ]
 },
 { 
    id: "hyyd85-monkey-chair", 
    name: "Silla HYYD85138 (Monkey chair)", 
    category: "Lounge chair", 
    code: "HYYD85138/GEYD95113", 
    priceBase: 11760, 
    image: "/images/SILLAS/SILLA20/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA20/img1.jpg", 
        "/images/SILLAS/SILLA20/img2.jpg",
        "/images/SILLAS/SILLA20/img3.jpg",
        "/images/SILLAS/SILLA20/img4.jpg", 
        "/images/SILLAS/SILLA20/img5.jpg",
        "/images/SILLAS/SILLA20/img6.jpg",
        "/images/SILLAS/SILLA20/img7.jpg"
    ],
    specs: {
        dimensions: "840 * 910 * 660 mm",
        volume: "0.63 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Fleece fabric", detail: "BLMR0016" },
        { part: "Face + seat cushion", material: "Elastic fabric", detail: "BLTL0015" },
        { part: "Eye", material: "Microfiber leather", detail: "GLCQ0023" },
        { part: "Hardware base", material: "Stainless steel", detail: "Brushed Gunmetal" },
        { part: "Decorative piece", material: "Stainless steel", detail: "High-gloss Gunmetal Black" }
    ],
    colors: {
        interior: [
            { name: "Fleece Black", hex: "#000000" },
            { name: "Elastic Grey", hex: "#8E8E8E" }
        ]
    },
    configurations: [
        { code: "STD", size: "840mm", vol: "0.63m³", price: 11760 }
    ],
    priceList: [
        { name: "Monkey chair", size: "840*910*660", vol: "0.63", prices: { fa: 9380, fb: 9760, fc: 10150, fd: 10690, fe: 11760, la: 15590, lb: 17360, lc: 19180 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-201", 
    name: "Silla HYYD85201 (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85201/HI8039", 
    priceBase: 6860, 
    image: "/images/SILLAS/SILLA21/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA21/img1.jpg", 
        "/images/SILLAS/SILLA21/img2.jpg",
        "/images/SILLAS/SILLA21/img3.jpg",
        "/images/SILLAS/SILLA21/img4.jpg", 
        "/images/SILLAS/SILLA21/img5.jpg",
        "/images/SILLAS/SILLA21/img6.jpg"
    ],
    specs: {
        dimensions: "610 * 615 * 835 mm",
        volume: "0.37 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Contact surface", material: "Eco-leather", detail: "PLST0015" },
        { part: "Non-contact surface", material: "Leather", detail: "GLWR0004" },
        { part: "Base", material: "Stainless steel", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Eco-leather Slate", hex: "#4A4E5A" },
            { name: "Leather Dark Grey", hex: "#3C3F4A" }
        ]
    },
    configurations: [
        { code: "STD", size: "610mm", vol: "0.37m³", price: 6860 }
    ],
    priceList: [
        { name: "Dining chair", size: "610*615*835", vol: "0.37", prices: { fa: 5780, fb: 6150, fc: 6490, fd: 7190, fe: 8590, sample: 6860, la: 12690, lb: 14660, lc: 16650 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-202", 
    name: "Silla HYYD85202 (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85202/HI1910Y-A", 
    priceBase: 6490, 
    image: "/images/SILLAS/SILLA22/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA22/img1.jpg", 
        "/images/SILLAS/SILLA22/img2.jpg",
        "/images/SILLAS/SILLA22/img3.jpg",
        "/images/SILLAS/SILLA22/img4.jpg", 
        "/images/SILLAS/SILLA22/img5.jpg",
        "/images/SILLAS/SILLA22/img6.jpg",
        "/images/SILLAS/SILLA22/img7.jpg",
        "/images/SILLAS/SILLA22/img8.jpg"
    ],
    specs: {
        dimensions: "620 * 635 * 780 mm",
        volume: "0.39 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0023" },
        { part: "Foot frame", material: "Ash wood", detail: "Oil-wax color" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Dark Grey", hex: "#444449" } 
        ]
    },
    configurations: [
        { code: "STD", size: "620mm", vol: "0.39m³", price: 6490 }
    ],
    priceList: [
        { name: "Dining chair", size: "620*635*780", vol: "0.39", prices: { fa: 3850, fb: 3960, fc: 4150, fd: 4390, fe: 4860, la: 6490, lb: 7190, lc: 7890 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-203", 
    name: "Silla HYYD85203 (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85203/HI8051", 
    priceBase: 4760, 
    image: "/images/SILLAS/SILLA23/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA23/img1.jpg", 
        "/images/SILLAS/SILLA23/img2.jpg",
        "/images/SILLAS/SILLA23/img3.jpg",
        "/images/SILLAS/SILLA23/img4.jpg", 
        "/images/SILLAS/SILLA23/img5.jpg",
        "/images/SILLAS/SILLA23/img6.jpg",
        "/images/SILLAS/SILLA23/img7.jpg"
    ],
    specs: {
        dimensions: "580 * 635 * 790 mm",
        volume: "0.38 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Contact surface", material: "Eco-leather", detail: "PLST0011" },
        { part: "Non-contact surface", material: "Braided leather", detail: "GLBZ0014" },
        { part: "Piping", material: "Nylon", detail: "Black webbing" },
        { part: "Foot", material: "Stainless steel", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Eco-leather Dark", hex: "#2C2C2A" },
            { name: "Braided leather Grey", hex: "#4A4D52" }
        ]
    },
    configurations: [
        { code: "STD", size: "580mm", vol: "0.38m³", price: 4760 }
    ],
    priceList: [
        { name: "Dining chair", size: "580*635*790", vol: "0.38", prices: { fa: 4390, fb: 4590, fc: 5090, fd: 5460, fe: 6490, sample: 4760, la: 8960, lb: 10360, lc: 11760 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-211b", 
    name: "Silla HYYD85211-B (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85211-B/HI8057-B", 
    priceBase: 4490, 
    image: "/images/SILLAS/SILLA24/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA24/img1.jpg", 
        "/images/SILLAS/SILLA24/img2.jpg",
        "/images/SILLAS/SILLA24/img3.jpg"
    ],
    specs: {
        dimensions: "620 * 650 * 800 mm",
        volume: "0.39 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Backrest/Seat cushion", material: "Fabric", detail: "BLMM0019" },
        { part: "Outer side/Piping", material: "Eco-leather", detail: "PLST0021" },
        { part: "Foot frame", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Main Fabric Grey", hex: "#7B7B7B" },
            { name: "Outer Eco-leather Black", hex: "#2A2A2A" }
        ]
    },
    configurations: [
        { code: "STD", size: "620mm", vol: "0.39m³", price: 4490 }
    ],
    priceList: [
        { name: "Dining chair", size: "620*650*800", vol: "0.39", prices: { fa: 4490, fb: 4860, fc: 5090, fd: 5460, fe: 6490, la: 9390, lb: 10790, lc: 12190 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-212a", 
    name: "Silla HYYD85212-A (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85212-A/HI8059-A", 
    priceBase: 3460, 
    image: "/images/SILLAS/SILLA25/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA25/img1.jpg", 
        "/images/SILLAS/SILLA25/img2.jpg",
        "/images/SILLAS/SILLA25/img3.jpg"
    ],
    specs: {
        dimensions: "610 * 595 * 835 mm",
        volume: "0.39 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Eco-leather", detail: "PLST0010" },
        { part: "Solid wood foot", material: "Ash wood", detail: "Oil-wax color" }
    ],
    colors: {
        interior: [
            { name: "Eco-leather Taupe", hex: "#6F655E" } 
        ]
    },
    configurations: [
        { code: "STD", size: "610mm", vol: "0.39m³", price: 3460 }
    ],
    priceList: [
        { name: "Dining chair", size: "610*595*835", vol: "0.39", prices: { fa: 2980, fb: 3090, fc: 3260, fd: 3460, fe: 3950, la: 6050, lb: 6850, lc: 7650 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-212b", 
    name: "Silla HYYD85212-B (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85212-B/HI8059-B", 
    priceBase: 3250, 
    image: "/images/SILLAS/SILLA26/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA26/img1.jpg", 
        "/images/SILLAS/SILLA26/img2.jpg",
        "/images/SILLAS/SILLA26/img3.jpg"
    ],
    specs: {
        dimensions: "540 * 595 * 835 mm",
        volume: "0.35 m³",
        assembly: "Assembled / 2 pieces"
    },
    materials: [
        { part: "Main body", material: "Eco-leather", detail: "PLST0009" },
        { part: "Solid wood foot", material: "Ash wood", detail: "Oil-wax color" }
    ],
    colors: {
        interior: [
            { name: "Eco-leather Umber", hex: "#4D443C" } 
        ]
    },
    configurations: [
        { code: "STD", size: "540mm", vol: "0.35m³", price: 3250 }
    ],
    priceList: [
        { name: "Dining chair", size: "540*595*835", vol: "0.35", prices: { fa: 2880, fb: 2980, fc: 3080, fd: 3250, fe: 3680, la: 5190, lb: 5880, lc: 6490 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-213b", 
    name: "Silla HYYD85213-B (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85213-B/HI8058-B", 
    priceBase: 3950, 
    image: "/images/SILLAS/SILLA27/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA27/img1.jpg", 
        "/images/SILLAS/SILLA27/img2.jpg",
        "/images/SILLAS/SILLA27/img3.jpg"
    ],
    specs: {
        dimensions: "575 * 555 * 770 mm",
        volume: "0.32 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Eco-leather", detail: "PLST0006" },
        { part: "Hardware foot", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Eco-leather Grey/Stone", hex: "#938E85" } 
        ]
    },
    configurations: [
        { code: "STD", size: "575mm", vol: "0.32m³", price: 3950 }
    ],
    priceList: [
        { name: "Dining chair", size: "575*555*770", vol: "0.32", prices: { fa: 3350, fb: 3460, fc: 3690, fd: 3950, fe: 4490, la: 4860, lb: 5560, lc: 6480 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-213a", 
    name: "Silla HYYD85213-A (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85213-A/HI8058-A", 
    priceBase: 4860, 
    image: "/images/SILLAS/SILLA28/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA28/img1.jpg", 
        "/images/SILLAS/SILLA28/img2.jpg",
        "/images/SILLAS/SILLA28/img3.jpg"
    ],
    specs: {
        dimensions: "575 * 555 * 770 mm",
        volume: "0.32 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLQS0020" },
        { part: "Hardware foot", material: "Stainless steel", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Brown", hex: "#7E524A" } 
        ]
    },
    configurations: [
        { code: "STD", size: "575mm", vol: "0.32m³", price: 4860 }
    ],
    priceList: [
        { name: "Dining chair", size: "575*555*770", vol: "0.32", prices: { fa: 3350, fb: 3460, fc: 3690, fd: 3950, fe: 4490, la: 4860, lb: 5560, lc: 6480 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-215", 
    name: "Silla HYYD85215 (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85215", 
    priceBase: 3080, 
    image: "/images/SILLAS/SILLA29/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA29/img1.jpg", 
        "/images/SILLAS/SILLA29/img2.jpg",
        "/images/SILLAS/SILLA29/img3.jpg"
    ],
    specs: {
        dimensions: "490 * 545 * 800 mm",
        volume: "0.28 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Contact surface", material: "Microfiber leather", detail: "GLCQ0060" },
        { part: "Back backrest", material: "Braided leather", detail: "GLBZ0026" },
        { part: "Hardware foot", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Microfiber Leather Taupe", hex: "#B4A596" } 
        ]
    },
    configurations: [
        { code: "STD", size: "490mm", vol: "0.28m³", price: 3080 }
    ],
    priceList: [
        { name: "Dining chair", size: "490*545*800", vol: "0.28", prices: { fa: 2800, fb: 2980, fc: 3250, fd: 3460, fe: 4150, sample: 3080, la: 5600, lb: 6490, lc: 7290 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-216", 
    name: "Silla HYYD85216 (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85216", 
    priceBase: 4860, 
    image: "/images/SILLAS/SILLA30/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA30/img1.jpg", 
        "/images/SILLAS/SILLA30/img2.jpg",
        "/images/SILLAS/SILLA30/img3.jpg"
    ],
    specs: {
        dimensions: "600 * 560 * 780 mm",
        volume: "0.34 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Eco-leather", detail: "PLST0013" },
        { part: "Solid wood frame", material: "Ash wood", detail: "Oil-wax color" }
    ],
    colors: {
        interior: [
            { name: "Eco-leather Taupe Grey", hex: "#7A7671" } 
        ]
    },
    configurations: [
        { code: "STD", size: "600mm", vol: "0.34m³", price: 4860 }
    ],
    priceList: [
        { name: "Dining chair", size: "600*560*780", vol: "0.34", prices: { fa: 4760, fb: 4760, fc: 4760, fd: 4860, fe: 5090, la: 5560, lb: 5880, lc: 6160 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-217", 
    name: "Silla HYYD85217 (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85217", 
    priceBase: 4160, 
    image: "/images/SILLAS/SILLA31/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA31/img1.jpg", 
        "/images/SILLAS/SILLA31/img2.jpg",
        "/images/SILLAS/SILLA31/img3.jpg"
    ],
    specs: {
        dimensions: "620 * 540 * 740 mm",
        volume: "0.33 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main leather", material: "Microfiber leather", detail: "GLCQ0053" },
        { part: "Solid wood frame", material: "Ash wood", detail: "Oil-wax color" }
    ],
    colors: {
        interior: [
            { name: "Microfiber Leather Beige", hex: "#CDBAAD" } 
        ]
    },
    configurations: [
        { code: "STD", size: "620mm", vol: "0.33m³", price: 4160 }
    ],
    priceList: [
        { name: "Dining chair", size: "620*540*740", vol: "0.33", prices: { fa: 4160, fb: 4160, fc: 4160, fd: 4290, fe: 4490, la: 5180, lb: 5460, lc: 5790 } }
    ]
 },
 { 
    id: "hyyd85-dining-chair-219", 
    name: "Silla HYYD85219 (Dining chair)", 
    category: "Dining chair", 
    code: "HYYD85219/MYD1818", 
    priceBase: 4060, 
    image: "/images/SILLAS/SILLA32/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA32/img1.jpg", 
        "/images/SILLAS/SILLA32/img2.jpg",
        "/images/SILLAS/SILLA32/img3.jpg"
    ],
    specs: {
        dimensions: "520 * 675 * 800 mm",
        volume: "0.37 m³",
        assembly: "Assembled / 2 pieces"
    },
    materials: [
        { part: "Main body", material: "Microfiber leather", detail: "GLCQ0060" }
    ],
    colors: {
        interior: [
            { name: "Microfiber Leather Stone", hex: "#B2A99F" } 
        ]
    },
    configurations: [
        { code: "STD", size: "520mm", vol: "0.37m³", price: 4060 }
    ],
    priceList: [
        { name: "Dining chair", size: "520*675*800", vol: "0.37", prices: { fa: 2990, fb: 3090, fc: 3260, fd: 3460, fe: 4060, la: 5450, lb: 6260, lc: 6960 } }
    ]
 },
 { 
    id: "hyyd85-bar-chair-301c", 
    name: "Silla HYYD85301-C (Bar chair)", 
    category: "Bar chair", 
    code: "HYYD85301-C/WHB1802Y-C", 
    priceBase: 5090, 
    image: "/images/SILLAS/SILLA33/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA33/img1.jpg", 
        "/images/SILLAS/SILLA33/img2.jpg",
        "/images/SILLAS/SILLA33/img3.jpg"
    ],
    specs: {
        dimensions: "470 * 470 * 840 mm",
        volume: "0.24 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0013" },
        { part: "Foot frame", material: "Ash wood", detail: "Oil-wax color" },
        { part: "Footrest", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Beige", hex: "#C5B3A1" } 
        ]
    },
    configurations: [
        { code: "STD", size: "470mm", vol: "0.24m³", price: 5090 }
    ],
    priceList: [
        { name: "Bar chair", size: "470*470*840", vol: "0.24", prices: { fa: 4200, fb: 4200, fc: 4200, fd: 4390, fe: 4760, la: 5090, lb: 5360, lc: 5680 } }
    ]
 },
 { 
    id: "hyyd85-chair-305", 
    name: "Silla HYYD85305", 
    category: "Lounge chair", 
    code: "HYYD85305/MYD1822", 
    priceBase: 11760, 
    image: "/images/SILLAS/SILLA34/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA34/img1.jpg", 
        "/images/SILLAS/SILLA34/img2.jpg",
        "/images/SILLAS/SILLA34/img3.jpg"
    ],
    specs: {
        dimensions: "720 * 680 * 995 mm",
        volume: "0.61 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0002 (Interchangeable)" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Brown", hex: "#6F4E37" } 
        ]
    },
    configurations: [
        { code: "STD", size: "720mm", vol: "0.61m³", price: 11760 }
    ],
    priceList: [
        { name: "Chair", size: "720*680*995", vol: "0.61", prices: { fa: 6300, fb: 6650, fc: 7000, fd: 7660, fe: 8960, la: 11760, lb: 13560, lc: 15050 } }
    ]
 },
 { 
    id: "hyyd85-chin-chair", 
    name: "Silla HYYD85306 (CHIN chair)", 
    category: "Lounge chair", 
    code: "HYYD85306/CHIN", 
    priceBase: 10080, 
    image: "/images/SILLAS/SILLA35/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA35/img1.jpg", 
        "/images/SILLAS/SILLA35/img2.jpg",
        "/images/SILLAS/SILLA35/img3.jpg"
    ],
    specs: {
        dimensions: "640 * 730 * 890 mm",
        volume: "0.53 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0030" },
        { part: "Solid wood foot", material: "Ash wood", detail: "Oil-wax color" },
        { part: "Metal frame", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Walnut", hex: "#775842" } 
        ]
    },
    configurations: [
        { code: "STD", size: "640mm", vol: "0.53m³", price: 10080 }
    ],
    priceList: [
        { name: "CHIN chair", size: "640*730*890", vol: "0.53", prices: { fa: 7630, fb: 7790, fc: 7980, fd: 8160, fe: 8690, la: 10080, lb: 10790, lc: 11490 } }
    ]
 },
 { 
    id: "hyyd85-bar-chair-307", 
    name: "Silla HYYD85307 (Bar chair)", 
    category: "Bar chair", 
    code: "HYYD85307", 
    priceBase: 4860, 
    image: "/images/SILLAS/SILLA36/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA36/img1.jpg", 
        "/images/SILLAS/SILLA36/img2.jpg",
        "/images/SILLAS/SILLA36/img3.jpg"
    ],
    specs: {
        dimensions: "410 * 460 * 740 mm",
        volume: "0.17 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Cushion", material: "Genuine leather", detail: "PLQS0035" },
        { part: "Wooden frame", material: "Ash wood", detail: "Oil-wax color" },
        { part: "Footrest", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Umber", hex: "#5D4B3E" } 
        ]
    },
    configurations: [
        { code: "STD", size: "410mm", vol: "0.17m³", price: 4860 }
    ],
    priceList: [
        { name: "Bar chair", size: "410*460*740", vol: "0.17", prices: { fa: 4660, fb: 4660, fc: 4660, fd: 4760, fe: 4860, la: 4860, lb: 4990, lc: 5160 } }
    ]
 },
 { 
    id: "hyyd85-chaise-lounge-501b", 
    name: "Chaise lounge HYYD85501-B", 
    category: "Chaise lounge", 
    code: "HYYD85501-B/HZD118B", 
    priceBase: 12860, 
    image: "/images/SILLAS/SILLA37/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA37/img1.jpg", 
        "/images/SILLAS/SILLA37/img2.jpg",
        "/images/SILLAS/SILLA37/img3.jpg"
    ],
    specs: {
        dimensions: "1600 * 500 * 570 mm",
        volume: "0.58 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0029" },
        { part: "Solid wood sheet", material: "Ash wood", detail: "Oil-wax color" },
        { part: "Foot frame", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Slate Grey", hex: "#4E5764" } 
        ]
    },
    configurations: [
        { code: "STD", size: "1600mm", vol: "0.58m³", price: 12860 }
    ],
    priceList: [
        { name: "Chaise lounge", size: "1600*500*570", vol: "0.58", prices: { fa: 8600, fb: 8960, fc: 9300, fd: 9990, fe: 10460, la: 12860, lb: 14260, lc: 15660 } }
    ]
 },
 { 
    id: "hyyd85-chaise-lounge-501c", 
    name: "Chaise lounge HYYD85501-C", 
    category: "Chaise lounge", 
    code: "HYYD85501-C/HZD118C", 
    priceBase: 12460, 
    image: "/images/SILLAS/SILLA38/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA38/img1.jpg", 
        "/images/SILLAS/SILLA38/img2.jpg",
        "/images/SILLAS/SILLA38/img3.jpg"
    ],
    specs: {
        dimensions: "1600 * 500 * 430 mm",
        volume: "0.46 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0036" },
        { part: "Solid wood sheet", material: "Ash wood", detail: "Oil-wax color" },
        { part: "Foot frame", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Charcoal", hex: "#5A5A5E" } 
        ]
    },
    configurations: [
        { code: "STD", size: "1600mm", vol: "0.46m³", price: 12460 }
    ],
    priceList: [
        { name: "Chaise lounge", size: "1600*500*430", vol: "0.46", prices: { fa: 8480, fb: 8820, fc: 9180, fd: 9880, fe: 10350, la: 12460, lb: 13860, lc: 15260 } }
    ]
 },
 { 
    id: "hyyd85-footrest-505", 
    name: "Footrest HYYD85505", 
    category: "Footrest", 
    code: "HYYD85505/HZD01A", 
    priceBase: 4060, 
    image: "/images/SILLAS/SILLA39/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA39/img1.jpg", 
        "/images/SILLAS/SILLA39/img2.jpg",
        "/images/SILLAS/SILLA39/img3.jpg"
    ],
    specs: {
        dimensions: "Φ440 * 450 mm",
        volume: "0.13 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Braided leather", detail: "GLBZ0016" },
        { part: "Foot", material: "Stainless steel", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Braided leather Charcoal", hex: "#3E3E3F" } 
        ]
    },
    configurations: [
        { code: "STD", size: "440mm", vol: "0.13m³", price: 4060 }
    ],
    priceList: [
        { name: "Footrest", size: "Φ440*450", vol: "0.13", prices: { fa: 3960, fb: 4060, fc: 4160, fd: 4460, fe: 4850, la: 5160, lb: 5680, lc: 6260 } }
    ]
 },
 { 
    id: "hyyd85-footrest-506", 
    name: "Footrest HYYD85506", 
    category: "Footrest", 
    code: "HYYD85506/HZD02Y", 
    priceBase: 12460, 
    image: "/images/SILLAS/SILLA40/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA40/img1.jpg", 
        "/images/SILLAS/SILLA40/img2.jpg",
        "/images/SILLAS/SILLA40/img3.jpg"
    ],
    specs: {
        dimensions: "1600 * 450 * 425 mm",
        volume: "0.41 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0012" },
        { part: "Solid wood sheet", material: "Ash wood", detail: "Oil-wax color" },
        { part: "Foot frame", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Deep Grey", hex: "#4A4A4C" } 
        ]
    },
    configurations: [
        { code: "STD", size: "1600mm", vol: "0.41m³", price: 12460 }
    ],
    priceList: [
        { name: "Footrest", size: "1600*450*425", vol: "0.41", prices: { fa: 9280, fb: 9450, fc: 9690, fd: 10150, fe: 10790, la: 12460, lb: 13860, lc: 15260 } }
    ]
 },
 { 
    id: "hyyd85-footrest-507", 
    name: "Footrest HYYD85507", 
    category: "Footrest", 
    code: "HYYD85507/HZD03", 
    priceBase: 8260, 
    image: "/images/SILLAS/SILLA41/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA41/img1.jpg", 
        "/images/SILLAS/SILLA41/img2.jpg",
        "/images/SILLAS/SILLA41/img3.jpg"
    ],
    specs: {
        dimensions: "1700 * 450 * 450 mm",
        volume: "0.49 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Seat pad", material: "Fabric", detail: "BLQT0001" },
        { part: "Hardware foot frame", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Textured Fabric Grey", hex: "#6D6E71" } 
        ]
    },
    configurations: [
        { code: "STD", size: "1700mm", vol: "0.49m³", price: 8260 }
    ],
    priceList: [
        { name: "Footrest", size: "1700*450*450", vol: "0.49", prices: { fa: 8260, fb: 8260, fc: 8260, fd: 9060, fe: 10090, la: 12450, lb: 13850, lc: 15260 } }
    ]
 },
 { 
    id: "hyyd85-footrest-510", 
    name: "Footrest HYYD85510", 
    category: "Footrest", 
    code: "HYYD85510/D21", 
    priceBase: 2060, 
    image: "/images/SILLAS/SILLA42/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA42/img1.jpg", 
        "/images/SILLAS/SILLA42/img2.jpg",
        "/images/SILLAS/SILLA42/img3.jpg"
    ],
    specs: {
        dimensions: "750 * 750 * 350 mm",
        volume: "0.26 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Braided leather", detail: "GLBZ0002" }
    ],
    colors: {
        interior: [
            { name: "Braided Leather Dark Grey", hex: "#3A3A3A" } 
        ]
    },
    configurations: [
        { code: "STD", size: "750mm", vol: "0.26m³", price: 2060 }
    ],
    priceList: [
        { name: "Footrest", size: "750*750*350", vol: "0.26", prices: { fa: 2060, fb: 2200, fc: 2450, fd: 2760, fe: 3150, la: 5350, lb: 6060, lc: 6760 } }
    ]
 },
 { 
    id: "hyyd85-footrest-512b", 
    name: "Footrest HYYD85512-B", 
    category: "Footrest", 
    code: "HYYD85512-B/D19-B", 
    priceBase: 4760, 
    image: "/images/SILLAS/SILLA43/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA43/img1.jpg", 
        "/images/SILLAS/SILLA43/img2.jpg",
        "/images/SILLAS/SILLA43/img3.jpg"
    ],
    specs: {
        dimensions: "ø1000 * 410 mm",
        volume: "0.53 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Braided leather", detail: "GLBZ0002" },
        { part: "Metal foot", material: "Zinc alloy", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Braided Leather Grey", hex: "#555555" } 
        ]
    },
    configurations: [
        { code: "STD", size: "1000mm", vol: "0.53m³", price: 4760 }
    ],
    priceList: [
        { name: "Footrest", size: "ø1000*410", vol: "0.53", prices: { fa: 4760, fb: 4760, fc: 4760, fd: 4760, fe: 5560, la: 7890, lb: 8960, lc: 9990 } }
    ]
 },
 { 
    id: "hyyd85-footrest-512c", 
    name: "Footrest HYYD85512-C", 
    category: "Footrest", 
    code: "HYYD85512-C/D19-C", 
    priceBase: 3080, 
    image: "/images/SILLAS/SILLA44/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA44/img1.jpg", 
        "/images/SILLAS/SILLA44/img2.jpg",
        "/images/SILLAS/SILLA44/img3.jpg"
    ],
    specs: {
        dimensions: "Φ530 * 410 mm",
        volume: "0.17 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Leather", detail: "GLQT0014" },
        { part: "Metal foot", material: "Zinc alloy", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Leather Burgundy/Deep Red", hex: "#632E32" } 
        ]
    },
    configurations: [
        { code: "STD", size: "530mm", vol: "0.17m³", price: 3080 }
    ],
    priceList: [
        { name: "Footrest", size: "Φ530*410", vol: "0.17", prices: { fa: 2760, fb: 2880, fc: 3080, fd: 3220, fe: 3590, la: 4660, lb: 5190, lc: 5790 } }
    ]
 },
 { 
    id: "hyyd85-footrest-512d", 
    name: "Footrest HYYD85512-D", 
    category: "Footrest", 
    code: "HYYD85512-D/D19-D", 
    priceBase: 2990, 
    image: "/images/SILLAS/SILLA45/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA45/img1.jpg", 
        "/images/SILLAS/SILLA45/img2.jpg",
        "/images/SILLAS/SILLA45/img3.jpg"
    ],
    specs: {
        dimensions: "450 * 450 * 410 mm",
        volume: "0.12 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "BLMM0048" },
        { part: "Metal foot", material: "Zinc alloy", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Textured Fabric Red/Brown", hex: "#A36E64" } 
        ]
    },
    configurations: [
        { code: "STD", size: "450mm", vol: "0.12m³", price: 2990 }
    ],
    priceList: [
        { name: "Footrest", size: "450*450*410", vol: "0.12", prices: { fa: 2660, fb: 2760, fc: 2890, fd: 2990, fe: 3460, la: 4490, lb: 5090, lc: 5560 } }
    ]
 },
 { 
    id: "hyyd85-makeup-stool-515a", 
    name: "Makeup stool HYYD85515-A", 
    category: "Stool", 
    code: "HYYD85515-A/HD1825A", 
    priceBase: 2660, 
    image: "/images/SILLAS/SILLA46/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA46/img1.jpg", 
        "/images/SILLAS/SILLA46/img2.jpg",
        "/images/SILLAS/SILLA46/img3.jpg"
    ],
    specs: {
        dimensions: "470 * 440 * 500 mm",
        volume: "0.16 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Microfiber leather", detail: "GLCQ0068" }
    ],
    colors: {
        interior: [
            { name: "Microfiber Leather Slate Grey", hex: "#707372" } 
        ]
    },
    configurations: [
        { code: "STD", size: "470mm", vol: "0.16m³", price: 2660 }
    ],
    priceList: [
        { name: "Makeup stool", size: "470*440*500", vol: "0.16", prices: { standard: 2660 } }
    ],
    notes: "El color no es personalizable. Cojín suave BLMR0012 disponible por separado (350 yuan)."
 },
 { 
    id: "hyyd85-stool-519a", 
    name: "Stool HYYD85519-A", 
    category: "Stool", 
    code: "HYYD85519-A/HZD121A", 
    priceBase: 6660, 
    image: "/images/SILLAS/SILLA47/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA47/img1.jpg", 
        "/images/SILLAS/SILLA47/img2.jpg",
        "/images/SILLAS/SILLA47/img3.jpg"
    ],
    specs: {
        dimensions: "1600 * 450 * 410 mm",
        volume: "0.43 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Microfiber leather", detail: "GLCQ0068" }
    ],
    colors: {
        interior: [
            { name: "Microfiber Leather Slate Grey", hex: "#707372" } 
        ]
    },
    configurations: [
        { code: "STD", size: "1600mm", vol: "0.43m³", price: 6660 }
    ],
    priceList: [
        { name: "Stool", size: "1600*450*410", vol: "0.43", prices: { standard: 6660 } }
    ],
    notes: "El color no es personalizable. La cotización no incluye cojín suave; el cojín BLMR0012 está disponible por separado (980 yuan)."
 },
 { 
    id: "hyyd85-footrest-520", 
    name: "Footrest HYYD85520", 
    category: "Footrest", 
    code: "HYYD85520/D22", 
    priceBase: 9390, 
    image: "/images/SILLAS/SILLA48/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA48/img1.jpg", 
        "/images/SILLAS/SILLA48/img2.jpg",
        "/images/SILLAS/SILLA48/img4.jpg",
        "/images/SILLAS/SILLA48/img3.jpg"
    ],
    specs: {
        dimensions: "935 * 920 * 380 mm",
        volume: "0.38 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLQT0020" },
        { part: "Upper foot pedal", material: "Fabric", detail: "BLMM0217" }
    ],
    colors: {
        interior: [
            { name: "Genuine Leather Deep Blue", hex: "#343F4D" },
            { name: "Patterned Fabric", hex: "#D1CDC8" }
        ]
    },
    configurations: [
        { code: "STD", size: "935mm", vol: "0.38m³", price: 9390 }
    ],
    priceList: [
        { name: "Footrest", size: "935*920*380", vol: "0.38", prices: { fa: 4390, fb: 4760, fc: 5250, fd: 5790, fe: 7390, sample: 9390, la: 11390, lb: 13490, lc: 15590 } }
    ]
 },
 { 
    id: "hyyd85-stool-521", 
    name: "Stool HYYD85521", 
    category: "Stool", 
    code: "HYYD85521/MYD1125", 
    priceBase: 2080, 
    image: "/images/SILLAS/SILLA49/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA49/img1.jpg", 
        "/images/SILLAS/SILLA49/img2.jpg",
        "/images/SILLAS/SILLA49/img3.jpg"
    ],
    specs: {
        dimensions: "Φ420 * 440 mm",
        volume: "0.12 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "BLMM0209" },
        { part: "Leather belt", material: "Saddle leather", detail: "GLMA0012" }
    ],
    colors: {
        interior: [
            { name: "Textured Fabric Brown/White", hex: "#7B5E4F" },
            { name: "Saddle Leather Tan", hex: "#B06B31" }
        ]
    },
    configurations: [
        { code: "STD", size: "420mm", vol: "0.12m³", price: 2080 }
    ],
    priceList: [
        { name: "Stool", size: "Φ420*440", vol: "0.12", prices: { fa: 1860, fb: 1860, fc: 1860, fd: 2080, fe: 2460, la: 3260, lb: 3700, lc: 4090 } }
    ],
    notes: "Materiales no disponibles: tela elástica y PU."
 },
 { 
    id: "hyyd85-footrest-522", 
    name: "Footrest HYYD85522", 
    category: "Footrest", 
    code: "HYYD85522/MYD1115", 
    priceBase: 8500, 
    image: "/images/SILLAS/SILLA50/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA50/img1.jpg", 
        "/images/SILLAS/SILLA50/img2.jpg",
        "/images/SILLAS/SILLA50/img3.jpg",
        "/images/SILLAS/SILLA50/img4.jpg"
    ],
    specs: {
        dimensions: "1500 * 400 * 420 mm",
        volume: "0.34 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Seat surface", material: "Fabric", detail: "BLMM0139" },
        { part: "Bottom frame", material: "Microfiber leather", detail: "GLCQ0065" },
        { part: "Hardware", material: "Stainless steel", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Textured Fabric Light Grey", hex: "#C7C8C9" },
            { name: "Microfiber Leather Taupe", hex: "#8D7E71" }
        ]
    },
    configurations: [
        { code: "STD", size: "1500mm", vol: "0.34m³", price: 8500 }
    ],
    priceList: [
        { name: "Footrest", size: "1500*400*420", vol: "0.34", prices: { fa: 7990, fb: 7990, fc: 7990, fd: 8260, fe: 8500, la: 9560, lb: 9980, lc: 10480 } }
    ],
    notes: "El precio por defecto para el cuero del cojín es de grado Fabric-E."
 },
 { 
    id: "hyyd85-footrest-523", 
    name: "Footrest HYYD85523", 
    category: "Footrest", 
    code: "HYYD85523/MYD1122", 
    priceBase: 2560, 
    image: "/images/SILLAS/SILLA51/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA51/img1.jpg", 
        "/images/SILLAS/SILLA51/img2.jpg",
        "/images/SILLAS/SILLA51/img3.jpg",
        "/images/SILLAS/SILLA51/img4.jpg"
    ],
    specs: {
        dimensions: "750 * 750 * 360 mm",
        volume: "0.28 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Microfiber leather", detail: "GLCQ0058" }
    ],
    colors: {
        interior: [
            { name: "Microfiber Leather Wine Red", hex: "#722F37" } 
        ]
    },
    configurations: [
        { code: "STD", size: "750mm", vol: "0.28m³", price: 2560 }
    ],
    priceList: [
        { name: "Footrest", size: "750*750*360", vol: "0.28", prices: { fa: 2290, fb: 2290, fc: 2290, fd: 2560, fe: 3160, la: 4880, lb: 5680, lc: 6480 } }
    ],
    notes: "Materiales no disponibles: tela elástica y PU."
 },
 { 
    id: "hyyd85-tea-stool-525", 
    name: "Silla Stool HYYD85525", 
    category: "Stool", 
    code: "HYYD85525/MYD1116", 
    priceBase: 4660, 
    image: "/images/SILLAS/SILLA52/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA52/img1.jpg", 
        "/images/SILLAS/SILLA52/img2.jpg",
        "/images/SILLAS/SILLA52/img3.jpg",
        "/images/SILLAS/SILLA52/img4.jpg",
        "/images/SILLAS/SILLA52/img5.jpg"
    ],
    specs: {
        dimensions: "430 * 420 * 420 mm",
        volume: "0.11 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Seat pad", material: "Fabric", detail: "BLMM0139" },
        { part: "Outer frame", material: "Microfiber leather", detail: "GLCQ0065" },
        { part: "Foot frame", material: "Ash wood", detail: "Oil-wax color" }
    ],
    colors: {
        interior: [
            { name: "Textured Fabric Grey", hex: "#C7C8C9" },
            { name: "Microfiber Leather Taupe", hex: "#8D7E71" }
        ]
    },
    configurations: [
        { code: "STD", size: "430mm", vol: "0.11m³", price: 4660 }
    ],
    priceList: [
        { name: "Tea Stool", size: "430*420*420", vol: "0.11", prices: { fa: 4060, fb: 4060, fc: 4060, fd: 4200, fe: 4660, la: 6060, lb: 6660, lc: 7190 } }
    ],
    notes: "El precio indicado es para la configuración de cuero completo y tela completa."
 },
 { 
    id: "hyyd85-bench-526", 
    name: "Bench HYYD85526", 
    category: "Bench", 
    code: "HYYD85526/GEYD95518", 
    priceBase: 7800, 
    image: "/images/SILLAS/SILLA53/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA53/img1.jpg", 
        "/images/SILLAS/SILLA53/img2.jpg",
        "/images/SILLAS/SILLA53/img3.jpg"
    ],
    specs: {
        dimensions: "1580 * 485 * 450 mm",
        volume: "0.46 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Eco-leather", detail: "PLST0007" },
        { part: "Decorative piece", material: "Stainless steel", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Eco-leather Black", hex: "#1A1A1A" } 
        ]
    },
    configurations: [
        { code: "STD", size: "1580mm", vol: "0.46m³", price: 7800 }
    ],
    priceList: [
        { name: "Bench", size: "1580*485*450", vol: "0.46", prices: { fa: 6390, fb: 6760, fc: 7190, fd: 7800, fe: 9190, la: 12360, lb: 14100, lc: 15850 } }
    ]
 },
 { 
    id: "hyyd85-stool-905", 
    name: "Stool HYYD85905", 
    category: "Stool", 
    code: "HYYD85905", 
    priceBase: 10460, 
    image: "/images/SILLAS/SILLA54/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA54/img1.jpg", 
        "/images/SILLAS/SILLA54/img2.jpg",
        "/images/SILLAS/SILLA54/img3.jpg",
        "/images/SILLAS/SILLA54/img4.jpg",
        "/images/SILLAS/SILLA54/img5.jpg"
    ],
    specs: {
        dimensions: "400 * 400 * 380 mm",
        volume: "0.11 m³",
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Main body", material: "Multi-layer solid wood board", detail: "Oil-wax color" }
    ],
    colors: {
        interior: [
            { name: "Oil-wax Black Wood", hex: "#1A1A1A" } 
        ]
    },
    configurations: [
        { code: "STD", size: "400mm", vol: "0.11m³", price: 10460 }
    ],
    priceList: [
        { name: "Stool", size: "400*400*380", vol: "0.11", prices: { standard: 10460 } }
    ]
 },
{ 
    id: "hyyd85-egg-119", 
    name: "Silla HYYD85119 (Egg Chair)", 
    category: "Lounge chair", 
    code: "HYYD85119", 
    priceBase: null, 
    image: "/images/SILLAS/SILLA55/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA55/img1.jpg", 
        "/images/SILLAS/SILLA55/img2.jpg",
        "/images/SILLAS/SILLA55/img3.jpg",
        "/images/SILLAS/SILLA55/img4.jpg", 
        "/images/SILLAS/SILLA55/img5.jpg",
        "/images/SILLAS/SILLA55/img6.jpg",
        "/images/SILLAS/SILLA55/img7.jpg", 
        "/images/SILLAS/SILLA55/img8.jpg",
        "/images/SILLAS/SILLA55/img9.jpg",
        "/images/SILLAS/SILLA55/img10.jpg", 
        "/images/SILLAS/SILLA55/img11.jpg"
    ],
    specs: {
        dimensions: "1040 * 940 * 800 mm",
        volume: null,
        assembly: null
    },
    materials: [
        { part: "Main body", material: "Fabric", detail: "Organic curvature" }
    ],
    colors: {
        interior: [
            { name: "Terracotta Fabric", hex: "#943A36" } 
        ]
    },
    configurations: [
        { code: "STD", size: "1040mm", vol: null, price: null }
    ],
    priceList: [
        { name: "Egg Chair", size: "1040*940*800", vol: null, prices: { fa: null, fb: null, fc: null, fd: null, fe: null, la: null, lb: null, lc: null } }
    ]
 },
 { 
    id: "hyyd85-loong-118", 
    name: "Silla HYYD85118 (Loong Chair)", 
    category: "Lounge chair", 
    code: "HYYD85118", 
    priceBase: null, 
    image: "/images/SILLAS/SILLA56/img1.jpg", 
    schematics: [
        "/images/SILLAS/SILLA56/img2.jpg",
        "/images/SILLAS/SILLA56/img3.jpg",
        "/images/SILLAS/SILLA56/img4.jpg",
        "/images/SILLAS/SILLA56/img5.jpg",
        "/images/SILLAS/SILLA56/img6.jpg",
        "/images/SILLAS/SILLA56/img7.jpg",
        "/images/SILLAS/SILLA56/img8.jpg",
        "/images/SILLAS/SILLA56/img9.jpg"
    ],
    specs: {
        dimensions: "1110 * 960 * 800 mm",
        volume: null,
        assembly: "360-degree rotating mechanism"
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "Inspired by the Chinese dragon" }
    ],
    colors: {
        interior: [
            { name: "Obsidian Black", hex: "#1A1A1B" },
            { name: "Imperial Gold", hex: "#B79545" },
            { name: "Royal Purple", hex: "#634981" },
            { name: "Deep Crimson", hex: "#82162A" },
            { name: "Midnight Blue", hex: "#1D334A" }
        ]
    },
    configurations: [
        { code: "ROT-STD", size: "1110mm", vol: null, price: null }
    ],
    priceList: [
        { name: "Loong Chair", size: "1110*960*800", vol: null, prices: { fa: null, fb: null, fc: null, fd: null, fe: null, la: null, lb: null, lc: null } }
    ]
 },
 { 
    id: "hyyd85-ant-137", 
    name: "Silla HYYD85137 (Ant Chair)", 
    category: "Lounge chair", 
    code: "HYYD85137", 
    priceBase: null, 
    image: "/images/SILLAS/SILLA57/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA57/img1.jpg", 
        "/images/SILLAS/SILLA57/img2.jpg", 
        "/images/SILLAS/SILLA57/img3.jpg"
    ],
    specs: {
        dimensions: "630 * 850 * 850 mm",
        volume: null,
        assembly: "Stainless steel reinforced frame"
    },
    materials: [
        { part: "Upholstery", material: "Breathable fabric", detail: "Durable and elegant" },
        { part: "Frame", material: "Stainless Steel", detail: "Reinforced structure" }
    ],
    colors: {
        interior: [
            { name: "Deep Violet Fabric", hex: "#4B447A" } 
        ]
    },
    configurations: [
        { code: "STD", size: "630mm", vol: null, price: null }
    ],
    priceList: [
        { name: "Ant Chair", size: "630*850*850", vol: null, prices: { fa: null, fb: null, fc: null, fd: null, fe: null, la: null, lb: null, lc: null } }
    ]
 },
{ 
    id: "hyyd85-flower-133", 
    name: "Silla HYYD85133 (Flower Chair)", 
    category: "Lounge chair", 
    code: "HYYD85133", 
    priceBase: null, 
    image: "/images/SILLAS/SILLA58/render.jpg", 
    schematics: [
        "/images/SILLAS/SILLA58/img1.jpg",
        "/images/SILLAS/SILLA58/img2.jpg",
        "/images/SILLAS/SILLA58/img3.jpg",
        "/images/SILLAS/SILLA58/img4.jpg",
        "/images/SILLAS/SILLA58/img5.jpg"
    ],
    specs: {
        dimensions: "850 * 800 * 770 mm",
        volume: null,
        assembly: "Single pivot point / 150kg load capacity"
    },
    materials: [
        { part: "Upholstery", material: "Breathable fabric + Microfiber", detail: "Petal-inspired design" },
        { part: "Base", material: "Metal", detail: "Gold finish pivot base" }
    ],
    colors: {
        interior: [
            { name: "Ruby Red", hex: "#8B0000" },
            { name: "Midnight Navy", hex: "#1B2A3E" }
        ]
    },
    configurations: [
        { code: "STD", size: "850mm", vol: null, price: null }
    ],
    priceList: [
        { name: "Flower Chair", size: "850*800*770", vol: null, prices: { fa: null, fb: null, fc: null, fd: null, fe: null, la: null, lb: null, lc: null } }
    ]
 },
 { 
    id: "hyyd85-heart-518", 
    name: "Silla HYYD85518 (Heart-Shaped Stool)", 
    category: "Stool", 
    code: "HYYD85518", 
    priceBase: null, 
    image: "/images/SILLAS/SILLA59/render.jpg", 
    specs: {
        dimensions: "480 * 445 * 420 mm",
        volume: null,
        assembly: "Assembled / Brushed gunmetal steel base"
    },
    materials: [
        { part: "Upholstery", material: "Plush beige fabric", detail: "Cloud-soft texture" },
        { part: "Base", material: "Steel", detail: "Brushed gunmetal (420mm height)" }
    ],
    colors: {
        interior: [
            { name: "Plush Beige", hex: "#F5F5DC" } 
        ]
    },
    configurations: [
        { code: "STD", size: "480mm", vol: null, price: null }
    ],
    priceList: [
        { name: "Heart Stool", size: "480*445*420", vol: null, prices: { fa: null, fb: null, fc: null, fd: null, fe: null, la: null, lb: null, lc: null } }
    ]
 },
 {
    id: "hyyd85210-cornice-dining-chair",
    name: "Cornice Dining Chair HYYD85210",
    category: "Dining chair",
    code: "HYYD85210/HI8053",
    priceBase: null,
    image: "/images/SILLAS/SILLA60/render.jpg",
    schematics: [
        "/images/SILLAS/SILLA60/img1.jpg",
        "/images/SILLAS/SILLA60/img2.jpg",
        "/images/SILLAS/SILLA60/img3.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Seat & backrest", material: "Genuine leather / PU", detail: "Gray (Interchangeable)" },
        { part: "Frame & legs", material: "Ash wood", detail: "Oil-wax color (Dark Gray)" },
        { part: "Armrests", material: "Ash wood", detail: "Integrated — Dark Gray" }
    ],
    colors: {
        interior: [
            { name: "Gray Leather", hex: "#808080" }
        ],
        frame: [
            { name: "Dark Gray Ash (Oil-wax)", hex: "#3A3835" }
        ]
    },
    configurations: [
        { code: "HYYD85210/HI8053", size: null, vol: null, price: null }
    ],
    priceList: [
        { name: "Cornice Dining Chair", size: null, vol: null, prices: { fa: null, fb: null, fc: null, fd: null, fe: null, la: null, lb: null, lc: null } }
    ]
 },
 {
    id: "hyyd85209-a-dining-chair",
    name: "Dining Chair HYYD85209-A",
    category: "Dining chair",
    code: "HYYD85209-A/HI8052-A",
    priceBase: null,
    image: "/images/SILLAS/SILLA61/render.jpg",
    schematics: [
        "/images/SILLAS/SILLA61/img1.jpg",
        "/images/SILLAS/SILLA61/img2.jpg",
        "/images/SILLAS/SILLA61/img3.jpg",
        "/images/SILLAS/SILLA61/img4.jpg",
        "/images/SILLAS/SILLA61/img5.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Seat & backrest (full wrap)", material: "Genuine leather / PU", detail: "Interchangeable — Beige/Taupe or Steel Blue" },
        { part: "Frame & legs", material: "Metal", detail: "Brushed Gunmetal — slim tapered legs" }
    ],
    colors: {
        interior: [
            { name: "Beige / Taupe", hex: "#C4B49A" },
            { name: "Steel Blue / Slate", hex: "#6B7A8D" }
        ],
        frame: [
            { name: "Brushed Gunmetal", hex: "#5A5755" }
        ]
    },
    configurations: [
        { code: "HYYD85209-A/HI8052-A", size: null, vol: null, price: null }
    ],
    priceList: [
        { name: "Dining Chair (no armrests)", size: null, vol: null, prices: { fa: null, fb: null, fc: null, fd: null, fe: null, la: null, lb: null, lc: null } }
    ]
 },
 {
    id: "hyyd85129-change-tea-chair",
    name: "Change Tea Chair HYYD85129",
    category: "Lounge chair",
    code: "HYYD85129",
    priceBase: null,
    image: "/images/SILLAS/SILLA62/render.jpg",
    schematics: [
        "/images/SILLAS/SILLA62/img1.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Seat, backrest & exterior", material: "Genuine leather / PU", detail: "Warm Gray / Taupe (Interchangeable)" },
        { part: "Headrest (detachable)", material: "Genuine leather / PU", detail: "Matching — gathered top detail" },
        { part: "Armrest caps", material: "Ash wood", detail: "Oil-wax color (Dark)" },
        { part: "Base & casters", material: "Metal", detail: "Matte Black — 4 rolling casters" }
    ],
    colors: {
        interior: [
            { name: "Warm Gray / Taupe", hex: "#9E9590" }
        ],
        frame: [
            { name: "Dark Ash (Oil-wax)", hex: "#2A2A2A" },
            { name: "Matte Black (casters)", hex: "#1C1C1C" }
        ]
    },
    configurations: [
        { code: "HYYD85129", size: null, vol: null, price: null }
    ],
    priceList: [
        { name: "Change Tea Chair", size: null, vol: null, prices: { fa: null, fb: null, fc: null, fd: null, fe: null, la: null, lb: null, lc: null } }
    ]
 },
 {
    id: "hyyd85128-wabi-sabi-lounge-chair",
    name: "Wabi-Sabi Lounge Chair HYYD85128",
    category: "Lounge chair",
    code: "HYYD85128",
    priceBase: null,
    image: "/images/SILLAS/SILLA63/render.jpg",
    schematics: [
        "/images/SILLAS/SILLA63/img1.jpg",
        "/images/SILLAS/SILLA63/img2.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Assembled / 1 piece"
    },
    materials: [
        { part: "Cushions & upholstery (seat, back, armrests)", material: "Velvet / Fabric", detail: "Blush Pink / Rose (Interchangeable)" },
        { part: "Base frame", material: "Acrylic", detail: "Transparent — curved sled base" },
        { part: "Center bar", material: "Metal", detail: "Taupe / Warm Gray matte" }
    ],
    colors: {
        interior: [
            { name: "Blush Pink / Rose Velvet", hex: "#D4A09A" }
        ],
        frame: [
            { name: "Transparent Acrylic", hex: "#E8E8E8" },
            { name: "Taupe Matte (bar)", hex: "#9E9590" }
        ]
    },
    configurations: [
        { code: "HYYD85128", size: null, vol: null, price: null }
    ],
    priceList: [
        { name: "Wabi-Sabi Lounge Chair", size: null, vol: null, prices: { fa: null, fb: null, fc: null, fd: null, fe: null, la: null, lb: null, lc: null } }
    ]
 },
];

// --------------------------------------------------------------------------------
// 2. FUNCIÓN DE SUBIDA
// --------------------------------------------------------------------------------

async function subirSillas() {
  console.log(`🔥 Limpiando tabla 'sillas' en Supabase...`);
  
  // Borra los datos existentes para evitar duplicados en pruebas
  const { error: deleteError } = await supabase.from('sillas').delete().neq('id', '0');
  
  if (deleteError) {
      console.error("❌ Error borrando datos existentes:", deleteError.message);
      return;
  }

  console.log(`📦 Preparando subida de ${sillasData.length} productos...`);
  
  const { data, error } = await supabase.from('sillas').insert(sillasData);

  if (error) {
    console.error("❌ Error subiendo datos:", error.message);
  } else {
    console.log(`✅ ¡ÉXITO! Las ${sillasData.length} sillas se han subido correctamente a la tabla 'sillas'.`);
  }
}

subirSillas();