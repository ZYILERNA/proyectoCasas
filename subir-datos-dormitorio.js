// subir-dormitorios.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// NOTA: Para scripts de subida, es mejor usar la SERVICE_ROLE_KEY si tienes RLS activado.
// Si no tienes RLS (Row Level Security) activado, la ANON_KEY funcionará bien.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Faltan las variables de entorno en .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --------------------------------------------------------------------------------
// 1. DATOS COMPLETOS DE DORMITORIOS
// --------------------------------------------------------------------------------

const dormitoriosData = [
  // --- CAMAS ---
{ 
    id: "cama-hyrc89101", 
    name: "Cama HYRC89101", 
    category: "Camas", 
    code: "HYRC89101/HB106", 
    priceBase: 15960, 
    image: "/images/DORMITORIOS/CAMA1/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/CAMA1/img1.jpg", 
        "/images/DORMITORIOS/CAMA1/img2.jpg",
        "/images/DORMITORIOS/CAMA1/img3.jpg"
    ],
    specs: { 
        dimensions: "1800 * 2000 mm", 
        volume: "0.60 m³", 
        assembly: "Desmontable y Ensamblable / 3 Piezas" 
    },
    materials: [
        { part: "Main body", material: "Eco-leather", detail: "PLST0011 (Opcional)" },
        { part: "Hardware foot", material: "Aluminum alloy", detail: "Fluorocarbon baking finish" }
    ],
    colors: {
        interior: [
            { name: "Eco-leather PLST0011", hex: "#2B2A29" } 
        ]
    },
    configurations: [
        { code: "1500", size: "1500*2000mm", vol: "0.53m³", price: 15260 },
        { code: "1800", size: "1800*2000mm", vol: "0.60m³", price: 15960 }
    ],
    priceList: [
        { 
            name: "Cama 1500", 
            size: "1840*2230*930", 
            prices: { fa: 14250, fb: 14250, fc: 14250, fd: 15260, fe: 16550, la: 22480, lb: 26360, lc: 29960 } 
        },
        { 
            name: "Cama 1800", 
            size: "2140*2230*930", 
            prices: { fa: 14880, fb: 14880, fc: 14880, fd: 15960, fe: 17190, la: 23280, lb: 27050, lc: 30660 } 
        }
    ]
  },
{ 
    id: "cama-hyrc89101-b", 
    name: "Cama HYRC89101-B", 
    category: "Camas", 
    code: "HYRC89101-B/HB106B", 
    priceBase: 15960, 
    image: "/images/DORMITORIOS/CAMA2/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/CAMA2/img1.jpg", 
        "/images/DORMITORIOS/CAMA2/img2.jpg",
        "/images/DORMITORIOS/CAMA2/img3.jpg"
    ],
    specs: { 
        dimensions: "1800 * 2000 mm", 
        volume: "0.57 m³", 
        assembly: "Desmontable y Ensamblable / 3 Piezas" 
    },
    materials: [
        { part: "Main body", material: "Eco-leather", detail: "PLST0010" },
        { part: "Hardware foot", material: "Aluminum alloy", detail: "Fluorocarbon baking finish" }
    ],
    colors: {
        interior: [
            { name: "Eco-leather PLST0010", hex: "#4D4641" } 
        ]
    },
    configurations: [
        { code: "1500", size: "1500*2000mm", vol: "0.50m³", price: 15260 },
        { code: "1800", size: "1800*2000mm", vol: "0.57m³", price: 15960 }
    ],
    priceList: [
        { 
            name: "Cama 1500", 
            size: "1660*2230*930", 
            prices: { fa: 14250, fb: 14250, fc: 14250, fd: 15260, fe: 16550, la: 22480, lb: 26360, lc: 29960 } 
        },
        { 
            name: "Cama 1800", 
            size: "1960*2230*930", 
            prices: { fa: 14880, fb: 14880, fc: 14880, fd: 15960, fe: 17190, la: 23280, lb: 27050, lc: 30660 } 
        }
    ]
  },
  { 
    id: "cama-hyrc89102", 
    name: "Cama HYRC89102", 
    category: "Camas", 
    code: "HYRC89102/HB126", 
    priceBase: 16630, 
    image: "/images/DORMITORIOS/CAMA3/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/CAMA3/img1.jpg", 
        "/images/DORMITORIOS/CAMA3/img2.jpg",
        "/images/DORMITORIOS/CAMA3/img3.jpg"
    ],
    specs: { 
        dimensions: "1800 * 2000 mm", 
        volume: "0.48 m³", 
        assembly: "Desmontable y Ensamblable / 3 Piezas" 
    },
    materials: [
        { part: "Main body", material: "Eco-leather", detail: "PLST0009" },
        { part: "Piping", material: "Nylon", detail: "Black webbing" },
        { part: "Hardware frame", material: "Aluminum alloy", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Eco-leather PLST0009", hex: "#4A453F" }, // Tono marrón/gris oscuro (estimado)
            { name: "Genuine leather PLBQ0045 (Opcional)", hex: "#4D5B6B" } // Tono azulado/gris (estimado de la nota inferior)
        ]
    },
    configurations: [
        { code: "1500", size: "1500*2000mm", vol: "0.42m³", price: 15930 },
        { code: "1800", size: "1800*2000mm", vol: "0.48m³", price: 16630 }
    ],
    priceList: [
        { 
            name: "Cama 1500", 
            size: "1580*2220*980", 
            prices: { fa: 13260, fb: 13900, fc: 14800, fd: 15930, fe: 18830, la: 21670, lb: 24820, lc: 27860 } 
        },
        { 
            name: "Cama 1800", 
            size: "1880*2220*980", 
            prices: { fa: 13960, fb: 14600, fc: 15500, fd: 16630, fe: 19530, la: 22370, lb: 25520, lc: 28560 } 
        }
    ]
  },
  { 
    id: "cama-hyrc89103", 
    name: "Cama HYRC89103", 
    category: "Camas", 
    code: "HYRC89103/HB128", 
    priceBase: 35380, 
    image: "/images/DORMITORIOS/CAMA4/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/CAMA4/img1.jpg", 
        "/images/DORMITORIOS/CAMA4/img2.jpg",
        "/images/DORMITORIOS/CAMA4/img3.jpg"
    ],
    specs: { 
        dimensions: "1800 * 2000 mm", 
        volume: "1.12 m³", 
        assembly: "Desmontable y Ensamblable / 4 Piezas" 
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLQQ0006" },
        { part: "Back of the headboard", material: "Braided leather", detail: "GLBZ0001" },
        { part: "Piping", material: "Nylon", detail: "Black webbing" },
        { part: "Hardware frame", material: "Aluminum alloy", detail: "Brushed Space Gray" }
    ],
    colors: {
        interior: [
            { name: "Genuine leather PLQQ0006", hex: "#3D3D3D" }, // Gris oscuro (estimado)
            { name: "Braided leather GLBZ0001", hex: "#2E2E2E" }  // Negro/Gris trama (estimado)
        ]
    },
    configurations: [
        { code: "1500", size: "1500*2000mm", vol: "0.98m³", price: 34650 },
        { code: "1800", size: "1800*2000mm", vol: "1.12m³", price: 35380 }
    ],
    priceList: [
        { 
            name: "Cama 1500", 
            size: "1600*2230*1200", 
            prices: { fa: 24360, fb: 24360, fc: 24360, fd: 26180, fe: 28660, sample: 34650, la: 38750, lb: 42250, lc: 48550 } 
        },
        { 
            name: "Cama 1800", 
            size: "1960*2230*1200", 
            prices: { fa: 25060, fb: 25060, fc: 25060, fd: 26880, fe: 29360, sample: 35380, la: 39760, lb: 42950, lc: 49250 } 
        }
    ]
  },
  { 
    id: "cama-hyrc89105-bs", 
    name: "Cama HYRC89105-BS", 
    category: "Camas", 
    code: "HYRC89105/HB129BS", 
    priceBase: 29480, 
    image: "/images/DORMITORIOS/CAMA5/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/CAMA5/img1.jpg", 
        "/images/DORMITORIOS/CAMA5/img2.jpg",
        "/images/DORMITORIOS/CAMA5/img3.jpg"
    ],
    specs: { 
        dimensions: "1800 * 2000 mm", 
        volume: "0.72 m³", 
        assembly: "Desmontable y Ensamblable / 3 Piezas" 
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLQS0002" },
        { part: "Solid wood foot", material: "Ash wood", detail: "Oil-wax color" }
    ],
    colors: {
        interior: [
            { name: "Genuine leather PLQS0002", hex: "#634F44" } // Tono marrón cuero (estimado de la muestra)
        ]
    },
    configurations: [
        { code: "1500", size: "1500*2000mm", vol: "0.65m³", price: 28780 },
        { code: "1800", size: "1800*2000mm", vol: "0.72m³", price: 29480 }
    ],
    priceList: [
        { 
            name: "Cama 1500", 
            size: "1720*2330*960", 
            prices: { fa: 14950, fb: 14950, fc: 14950, fd: 16390, fe: 19180, la: 28780, lb: 34380, lc: 39060 } 
        },
        { 
            name: "Cama 1800", 
            size: "2020*2330*960", 
            prices: { fa: 15650, fb: 15650, fc: 15650, fd: 17090, fe: 19880, la: 29480, lb: 35080, lc: 39760 } 
        }
    ]
  },
  { 
    id: "cama-hyrc89106", 
    name: "Cama HYRC89106", 
    category: "Camas", 
    code: "HYRC89106/HB130", 
    priceBase: 41550, 
    image: "/images/DORMITORIOS/CAMA6/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/CAMA6/img1.jpg", 
        "/images/DORMITORIOS/CAMA6/img2.jpg",
        "/images/DORMITORIOS/CAMA6/img3.jpg"
    ],
    specs: { 
        dimensions: "1800 * 2000 mm", 
        volume: "1.15 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0022" },
        { part: "Headboard decorative strip", material: "Braided leather", detail: "GLBZ0004" },
        { part: "Solid wood foot", material: "Ash wood", detail: "Oil-wax color" }
    ],
    colors: {
        interior: [
            { name: "Genuine leather PLBQ0022", hex: "#6D6863" }, // Gris topo/marrón (estimado)
            { name: "Braided leather GLBZ0004", hex: "#8C847C" }  // Trama decorativa (estimado)
        ]
    },
    configurations: [
        { code: "1500", size: "1500*2000mm", vol: "1.05m³", price: 40850 },
        { code: "1800", size: "1800*2000mm", vol: "1.15m³", price: 41550 }
    ],
    priceList: [
        { 
            name: "Cama 1500", 
            size: "2430*2310*1160", 
            prices: { fa: 17050, fb: 17050, fc: 17050, fd: 18380, fe: 21990, la: 37350, lb: 40850, lc: 46060 } 
        },
        { 
            name: "Cama 1800", 
            size: "2730*2310*1160", 
            prices: { fa: 17750, fb: 17750, fc: 17750, fd: 19080, fe: 22690, la: 38050, lb: 41550, lc: 46760 } 
        }
    ]
  },
  { 
    id: "cama-hyrc89107", 
    name: "Cama HYRC89107", 
    category: "Camas", 
    code: "HYRC89107/HB133B", 
    priceBase: 32860, 
    image: "/images/DORMITORIOS/CAMA7/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/CAMA7/img1.jpg", 
        "/images/DORMITORIOS/CAMA7/img2.jpg",
        "/images/DORMITORIOS/CAMA7/img3.jpg"
    ],
    specs: { 
        dimensions: "1800 * 2000 mm", 
        volume: "0.96 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Main body", material: "Matte genuine leather", detail: "PLMS0010" }
    ],
    colors: {
        interior: [
            { name: "Matte genuine leather PLMS0010", hex: "#4E5B66" } // Tono azul grisáceo mate (estimado)
        ]
    },
    configurations: [
        { code: "1500", size: "1500*2000mm", vol: "0.58m³", price: 32060 },
        { code: "1800", size: "1800*2000mm", vol: "0.96m³", price: 32860 }
    ],
    priceList: [
        { 
            name: "Cama 1500", 
            size: "1830*2280*1030", 
            prices: { fa: 12600, fb: 12600, fc: 12600, fd: 14290, fe: 16760, la: 24150, lb: 27860, lc: 32060 } 
        },
        { 
            name: "Cama 1800", 
            size: "2130*2280*1030", 
            prices: { fa: 13300, fb: 13300, fc: 13300, fd: 14990, fe: 17460, la: 24850, lb: 28560, lc: 32860 } 
        }
    ]
  },
  { 
    id: "cama-hyrc89118", 
    name: "Cama HYRC89118", 
    category: "Camas", 
    code: "HYRC89118", 
    priceBase: 34480, 
    image: "/images/DORMITORIOS/CAMA8/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/CAMA8/img1.jpg", 
        "/images/DORMITORIOS/CAMA8/img2.jpg",
        "/images/DORMITORIOS/CAMA8/img3.jpg"
    ],
    specs: { 
        dimensions: "1800 * 2000 mm", 
        volume: "1.87 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Front side headboard / Bed surround", material: "Genuine leather", detail: "PLQT0021" },
        { part: "Decorative board", material: "Saddle leather", detail: "GLMA0016" },
        { part: "Back of the headboard", material: "Braided leather", detail: "GLBZ0026" }
    ],
    colors: {
        interior: [
            { name: "Genuine leather PLQT0021", hex: "#7E715B" }, // Tono taupe/tierra (estimado)
            { name: "Saddle leather GLMA0016", hex: "#5C3D2E" }  // Tono marrón cuero (estimado)
        ]
    },
    configurations: [
        { code: "1500", size: "1500*2000mm", vol: "1.67m³", price: 33780 },
        { code: "1800", size: "1800*2000mm", vol: "1.87m³", price: 34480 }
    ],
    priceList: [
        { 
            name: "Cama 1500", 
            size: "2130*2380*1090", 
            prices: { fa: 18850, fb: 19680, fc: 20750, fd: 21980, fe: 25380, la: 33780, lb: 38460, lc: 42790 } 
        },
        { 
            name: "Cama 1800", 
            size: "2430*2380*1090", 
            prices: { fa: 19550, fb: 20380, fc: 21390, fd: 22680, fe: 26080, la: 34480, lb: 39160, lc: 43490 } 
        }
    ]
  },
  { 
    id: "cama-hyrc89122", 
    name: "Cama HYRC89122", 
    category: "Camas", 
    code: "HYRC89122/MCJ5812", 
    priceBase: 23460, 
    image: "/images/DORMITORIOS/CAMA9/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/CAMA9/img1.jpg", 
        "/images/DORMITORIOS/CAMA9/img2.jpg",
        "/images/DORMITORIOS/CAMA9/img3.jpg"
    ],
    specs: { 
        dimensions: "1800 * 2000 mm", 
        volume: "1.49 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Main body", material: "Genuine leather", detail: "PLBQ0037" },
        { part: "Decorative piece", material: "Stainless steel", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Genuine leather PLBQ0037", hex: "#A89D96" } // Tono gris cálido/topo (estimado)
        ]
    },
    configurations: [
        { code: "1500", size: "1500*2000mm", vol: "1.32m³", price: 22760 },
        { code: "1800", size: "1800*2000mm", vol: "1.49m³", price: 23460 }
    ],
    priceList: [
        { 
            name: "Cama 1500", 
            size: "2030*2400*1000", 
            prices: { fa: 12560, fb: 13490, fc: 14560, fd: 15960, fe: 19560, la: 22760, lb: 26460, lc: 30360 } 
        },
        { 
            name: "Cama 1800", 
            size: "2330*2400*1000", 
            prices: { fa: 13260, fb: 14190, fc: 15260, fd: 16660, fe: 20260, la: 23460, lb: 27160, lc: 31060 } 
        }
    ]
  },
  { 
    id: "mesa-noche-hygl81803-a", 
    name: "Mesa de Noche HYGL81803-A", 
    category: "Mesas de Noche", 
    code: "HYGL81803-A/HB132Y-CTG", 
    priceBase: 8450, 
    image: "/images/DORMITORIOS/MESA10/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA10/img1.jpg", 
        "/images/DORMITORIOS/MESA10/img2.jpg",
        "/images/DORMITORIOS/MESA10/img3.jpg"
    ],
    specs: { 
        dimensions: "550 * 430 * 500 mm", 
        volume: "0.17 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Panel (Top)", material: "Sintered stone", detail: "Rainbow Phantom (6mm)" },
        { part: "Cabinet body", material: "E0-grade MDF", detail: "Oil-wax color" },
        { part: "Base/Handle", material: "Stainless steel", detail: "Brushed Space Gold" }
    ],
    colors: {
        stone: [
            { name: "Rainbow Phantom", hex: "#1C2526" } 
        ]
    },
    configurations: [
        { code: "STD", size: "550*430*500mm", vol: "0.17m³", price: 8450 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche Estándar", 
            size: "550*430*500", 
            prices: { unique: 8450 } 
        }
    ],
    customInstructions: {
        electronics: "Wireless charger not included",
        material_note: "6MM rock slab interchangeable"
    }
  },
  { 
    id: "mesa-noche-hygl81808-b", 
    name: "Mesa de Noche HYGL81808-B", 
    category: "Mesas de Noche", 
    code: "HYGL81808-B/HB126Y-CTG", 
    priceBase: 5890, 
    image: "/images/DORMITORIOS/MESA11/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA11/img1.jpg", 
        "/images/DORMITORIOS/MESA11/img2.jpg",
        "/images/DORMITORIOS/MESA11/img3.jpg"
    ],
    specs: { 
        dimensions: "500 * 420 * 450 mm", 
        volume: "0.15 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Panel (Top)", material: "Sintered stone", detail: "Moonlight White" },
        { part: "Cabinet body", material: "E0-grade MDF", detail: "Oil-wax color" }
    ],
    colors: {
        stone: [
            { name: "Moonlight White", hex: "#F2F2F2" } // Blanco veteado (estimado)
        ]
    },
    configurations: [
        { code: "STD", size: "500*420*450mm", vol: "0.15m³", price: 5890 },
        { code: "ALT", size: "900*420*450mm", vol: "0.27m³", price: 7190 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche 500mm", 
            size: "500*420*450", 
            prices: { unique: 5890 } 
        },
        { 
            name: "Mesa de Noche 900mm", 
            size: "900*420*450", 
            prices: { unique: 7190 } 
        }
    ],
    customInstructions: {
        optional_models: "Available in 900mm width (HYGL81808-A)",
        material_note: "3MM rock slab interchangeable"
    }
  },
  { 
    id: "mesa-noche-hygl81810", 
    name: "Mesa de Noche HYGL81810", 
    category: "Mesas de Noche", 
    code: "HYGL81810/HB130Y-CTG", 
    priceBase: 7190, 
    image: "/images/DORMITORIOS/MESA12/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA12/img1.jpg", 
        "/images/DORMITORIOS/MESA12/img2.jpg",
        "/images/DORMITORIOS/MESA12/img3.jpg"
    ],
    specs: { 
        dimensions: "500 * 380 * 500 mm", 
        volume: "0.14 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Tabletop", material: "Sintered stone", detail: "Saint Laurent Gold Threads" },
        { part: "Cabinet body", material: "E0-grade MDF", detail: "Oil-wax color" }
    ],
    colors: {
        stone: [
            { name: "Saint Laurent Gold Threads", hex: "#1A1A1A" } // Negro con vetas doradas (estimado)
        ]
    },
    configurations: [
        { code: "STD", size: "500*380*500mm", vol: "0.14m³", price: 7190 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche Estándar", 
            size: "500*380*500", 
            prices: { unique: 7190 } 
        }
    ],
    customInstructions: {
        material_note: "3MM rock slab interchangeable"
    }
  },
  { 
    id: "mesa-noche-hygl81811-l", 
    name: "Mesa de Noche HYGL81811-L", 
    category: "Mesas de Noche", 
    code: "HYGL81811-L/HB135Y-CTGL", 
    priceBase: 5460, 
    image: "/images/DORMITORIOS/MESA13/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA13/img1.jpg", 
        "/images/DORMITORIOS/MESA13/img2.jpg",
        "/images/DORMITORIOS/MESA13/img3.jpg"
    ],
    specs: { 
        dimensions: "550 * 470 * 460 mm", 
        volume: "0.19 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Panel", material: "Sintered stone", detail: "Laurent Black Gold" },
        { part: "Cabinet body", material: "E0-grade MDF", detail: "Olive Gray (High gloss)" },
        { part: "Stop strip", material: "E0-grade MDF", detail: "Oil-wax color" }
    ],
    colors: {
        stone: [
            { name: "Laurent Black Gold", hex: "#1C1C1B" } 
        ],
        body: [
            { name: "Olive Gray (High gloss)", hex: "#706E67" }
        ]
    },
    configurations: [
        { code: "STD-L", size: "550*470*460mm", vol: "0.19m³", price: 5460 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche (L)", 
            size: "550*470*460", 
            prices: { unique: 5460 } 
        }
    ],
    customInstructions: {
        orientation: "Left-side configuration (L)",
        optional_models: "Available in right-side configuration (HYGL81811-R)",
        material_note: "6MM rock slab interchangeable"
    }
  },
  { 
    id: "mesa-noche-hygl81811-al", 
    name: "Mesa de Noche HYGL81811-AL", 
    category: "Mesas de Noche", 
    code: "HYGL81811-AL/HB135Y-CTGL", 
    priceBase: 5460, 
    image: "/images/DORMITORIOS/MESA14/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA14/img1.jpg", 
        "/images/DORMITORIOS/MESA14/img2.jpg",
        "/images/DORMITORIOS/MESA14/img3.jpg"
    ],
    specs: { 
        dimensions: "550 * 470 * 460 mm", 
        volume: "0.19 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Panel", material: "Sintered stone", detail: "Saint Laurent Gold Threads" },
        { part: "Cabinet body", material: "E0-grade MDF", detail: "Haoyue Gray (High gloss)" },
        { part: "Stop strip", material: "E0-grade MDF", detail: "Oil-wax color" }
    ],
    colors: {
        stone: [
            { name: "Saint Laurent Gold Threads", hex: "#1A1A1A" } 
        ],
        body: [
            { name: "Haoyue Gray (High gloss)", hex: "#9EA1A3" }
        ]
    },
    configurations: [
        { code: "STD-AL", size: "550*470*460mm", vol: "0.19m³", price: 5460 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche (AL)", 
            size: "550*470*460", 
            prices: { unique: 5460 } 
        }
    ],
    customInstructions: {
        orientation: "Left-side configuration (L)",
        optional_models: "Available in right-side configuration (HYGL81811-AR)",
        material_note: "3MM rock slab interchangeable"
    }
  },
  { 
    id: "mesa-noche-hygl81812-a", 
    name: "Mesa de Noche HYGL81812-A", 
    category: "Mesas de Noche", 
    code: "HYGL81812-A/HB136-CTGA", 
    priceBase: 4760, 
    image: "/images/DORMITORIOS/MESA15/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA15/img1.jpg", 
        "/images/DORMITORIOS/MESA15/img2.jpg",
        "/images/DORMITORIOS/MESA15/img3.jpg"
    ],
    specs: { 
        dimensions: "700 * 440 * 420 mm", 
        volume: "0.20 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Panel", material: "E0-grade MDF", detail: "Oil-wax color" },
        { part: "Cabinet body", material: "E0-grade MDF", detail: "Eastern Blue Gray" }
    ],
    colors: {
        body: [
            { name: "Eastern Blue Gray", hex: "#5D6770" }, // Tono azul grisáceo (estimado)
            { name: "Oil-wax color (Panel)", hex: "#2B2A29" } // Tono madera oscura (estimado)
        ]
    },
    configurations: [
        { code: "700", size: "700*440*420mm", vol: "0.20m³", price: 4760 },
        { code: "550", size: "550*440*420mm", vol: "0.16m³", price: 4150 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche 700mm", 
            size: "700*440*420", 
            prices: { unique: 4760 } 
        },
        { 
            name: "Mesa de Noche 550mm", 
            size: "550*440*420", 
            prices: { unique: 4150 } 
        }
    ],
    customInstructions: {
        material_note: "Panel material is non-interchangeable",
        optional_models: "Available in 550mm width (HYGL81812-B)"
    }
  },
  { 
    id: "mesa-noche-hygl81813", 
    name: "Mesa de Noche HYGL81813", 
    category: "Mesas de Noche", 
    code: "HYGL81813/HB137-CTG", 
    priceBase: 6260, 
    image: "/images/DORMITORIOS/MESA16/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA16/img1.jpg", 
        "/images/DORMITORIOS/MESA16/img2.jpg",
        "/images/DORMITORIOS/MESA16/img3.jpg"
    ],
    specs: { 
        dimensions: "530 * 470 * 570 mm", 
        volume: "0.21 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Base", material: "Acrylic", detail: "Wild Goose Gray" },
        { part: "Upper cabinet", material: "E0-grade MDF", detail: "Eastern Blue Gray" },
        { part: "L-shaped foot / wrapping top plate", material: "Acrylic", detail: "Ochre - Tea Gray" }
    ],
    colors: {
        body: [
            { name: "Wild Goose Gray (Base)", hex: "#A6A195" }, // Tono gris cálido (estimado)
            { name: "Eastern Blue Gray (Cabinet)", hex: "#5D6770" } // Tono azul grisáceo (estimado)
        ]
    },
    configurations: [
        { code: "STD", size: "530*470*570mm", vol: "0.21m³", price: 6260 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche Estándar", 
            size: "530*470*570", 
            prices: { unique: 6260 } 
        }
    ],
    customInstructions: {
        design_note: "Features transparent acrylic elements in Ochre - Tea Gray",
        material_note: "Materials are non-interchangeable"
    }
  },
  { 
    id: "mesa-noche-hygl81818-a", 
    name: "Mesa de Noche HYGL81818-A", 
    category: "Mesas de Noche", 
    code: "HYGL81818-A", 
    priceBase: 3790, 
    image: "/images/DORMITORIOS/MESA17/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA17/img1.jpg", 
        "/images/DORMITORIOS/MESA17/img2.jpg",
        "/images/DORMITORIOS/MESA17/img3.jpg"
    ],
    specs: { 
        dimensions: "460 * 400 * 450 mm", 
        volume: "0.11 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Tabletop", material: "Glass", detail: "Black oil glass" },
        { part: "Main body", material: "E0-grade MDF", detail: "White oak color" },
        { part: "Foot strip", material: "Acrylic", detail: "Transparent acrylic" }
    ],
    colors: {
        body: [
            { name: "White oak color", hex: "#D9B99B" } // Tono roble claro (estimado)
        ],
        top: [
            { name: "Black oil glass", hex: "#000000" }
        ]
    },
    configurations: [
        { code: "STD", size: "460*400*450mm", vol: "0.11m³", price: 3790 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche Estándar", 
            size: "460*400*450", 
            prices: { unique: 3790 } 
        }
    ],
    customInstructions: {
        design_note: "Features a minimalist pedestal design with a transparent acrylic foot strip for a floating effect",
        material_note: "Main body material is non-interchangeable"
    }
  },
  { 
    id: "mesa-noche-hygl81823-ar", 
    name: "Mesa de Noche HYGL81823-AR", 
    category: "Mesas de Noche", 
    code: "HYGL81823-AR", 
    priceBase: 6960, 
    image: "/images/DORMITORIOS/MESA18/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA18/img1.jpg", 
        "/images/DORMITORIOS/MESA18/img2.jpg",
        "/images/DORMITORIOS/MESA18/img3.jpg"
    ],
    specs: { 
        dimensions: "545 * 420 * 475 mm", 
        volume: "0.18 m³", 
        assembly: "Desmontado y Ensamblado / 2 Piezas" 
    },
    materials: [
        { part: "Tabletop", material: "Marble", detail: "Snow White (Genuine bright)" },
        { part: "Cabinet body", material: "E0-grade MDF", detail: "Oil-wax color" },
        { part: "Decorative hardware", material: "Stainless steel", detail: "Brushed Space Gold" },
        { part: "Cabinet feet", material: "E0-grade MDF", detail: "Haoyue Gray (Matte)" }
    ],
    colors: {
        top: [
            { name: "Snow White Marble", hex: "#F2F2F2" } 
        ],
        body: [
            { name: "Oil-wax color", hex: "#2B2A29" }
        ]
    },
    configurations: [
        { code: "AR", size: "545*420*475mm", vol: "0.18m³", price: 6960 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche (AR)", 
            size: "545*420*475", 
            prices: { unique: 6960 } 
        }
    ],
    customInstructions: {
        orientation: "Right-side configuration (R)",
        optional_models: "Available in left-side configuration (HYGL81823-AL)",
        material_note: "Interchangeable oil-finish marbles"
    }
  },
  { 
    id: "mesa-noche-hygl81823-br", 
    name: "Mesa de Noche HYGL81823-BR", 
    category: "Mesas de Noche", 
    code: "HYGL81823-BR", 
    priceBase: 6260, 
    image: "/images/DORMITORIOS/MESA19/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA19/img1.jpg", 
        "/images/DORMITORIOS/MESA19/img2.jpg",
        "/images/DORMITORIOS/MESA19/img3.jpg"
    ],
    specs: { 
        dimensions: "545 * 420 * 475 mm", 
        volume: "0.18 m³", 
        assembly: "Desmontado y Ensamblado / 2 Piezas" 
    },
    materials: [
        { part: "Cabinet body", material: "E0-grade MDF", detail: "Oil-wax color" },
        { part: "Hardware decorative part", material: "Stainless steel", detail: "Brushed Space Gold" },
        { part: "Cabinet feet", material: "E0-grade MDF", detail: "Haoyue Gray (Matte)" }
    ],
    colors: {
        body: [
            { name: "Oil-wax color", hex: "#2B2A29" }
        ],
        feet: [
            { name: "Haoyue Gray (Matte)", hex: "#9EA1A3" }
        ]
    },
    configurations: [
        { code: "BR", size: "545*420*475mm", vol: "0.18m³", price: 6260 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche (BR)", 
            size: "545*420*475", 
            prices: { unique: 6260 } 
        }
    ],
    customInstructions: {
        orientation: "Right-side configuration (R)",
        optional_models: "Available in left-side configuration (HYGL81823-BL)",
        material_note: "Main body material is non-interchangeable"
    }
  },
  { 
    id: "mesa-noche-hygl81825", 
    name: "Mesa de Noche HYGL81825", 
    category: "Mesas de Noche", 
    code: "HYGL81825/GEGL91807", 
    priceBase: 4160, 
    image: "/images/DORMITORIOS/MESA20/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA20/img1.jpg", 
        "/images/DORMITORIOS/MESA20/img2.jpg",
        "/images/DORMITORIOS/MESA20/img3.jpg"
    ],
    specs: { 
        dimensions: "450 * 420 * 520 mm", 
        volume: "0.16 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Surface", material: "Saddle leather", detail: "GLMA0019" },
        { part: "Main body", material: "E0-grade MDF", detail: "White oak color" }
    ],
    colors: {
        body: [
            { name: "White oak color", hex: "#D9B99B" }
        ],
        leather: [
            { name: "Saddle leather GLMA0019", hex: "#8B5A2B" } // Tono cuero (estimado)
        ]
    },
    configurations: [
        { code: "STD", size: "450*420*520mm", vol: "0.16m³", price: 4160 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche Estándar", 
            size: "450*420*520", 
            prices: { unique: 4160 } 
        }
    ],
    customInstructions: {
        design_note: "Unique arched base design with saddle leather top surface",
        material_note: "Main body material is non-interchangeable"
    }
  },
  { 
    id: "mesa-noche-hygl81826-l", 
    name: "Mesa de Noche HYGL81826-L", 
    category: "Mesas de Noche", 
    code: "HYGL81826-L/MGL8310L", 
    priceBase: 3250, 
    image: "/images/DORMITORIOS/MESA21/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA21/img1.jpg", 
        "/images/DORMITORIOS/MESA21/img2.jpg",
        "/images/DORMITORIOS/MESA21/img3.jpg"
    ],
    specs: { 
        dimensions: "540 * 445 * 525 mm", 
        volume: "0.19 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cabinet body", material: "PU", detail: "GLPU0025" },
        { part: "Foot post", material: "Ash wood", detail: "Oil-wax color" },
        { part: "Foot post decorative strip", material: "Stainless steel", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        body: [
            { name: "GLPU0025 (Nude/Pinkish Taupe)", hex: "#C4A495" } // Tono piel/taupe (estimado)
        ]
    },
    configurations: [
        { code: "L", size: "540*445*525mm", vol: "0.19m³", price: 3250 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche (L)", 
            size: "540*445*525", 
            prices: { unique: 3250 } 
        }
    ],
    customInstructions: {
        orientation: "Left-side configuration (L)",
        optional_models: "Available in right-side configuration (HYGL81826-R)",
        material_note: "Cabinet body material is non-interchangeable"
    }
  },
  { 
    id: "mesa-noche-hygl81827-ar", 
    name: "Mesa de Noche HYGL81827-AR", 
    category: "Mesas de Noche", 
    code: "HYGL81827-AR/MGL8311R", 
    priceBase: 4160, 
    image: "/images/DORMITORIOS/MESA22/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA22/img1.jpg", 
        "/images/DORMITORIOS/MESA22/img2.jpg",
        "/images/DORMITORIOS/MESA22/img3.jpg"
    ],
    specs: { 
        dimensions: "545 * 405 * 470 mm", 
        volume: "0.16 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Outer frame / Drawer front", material: "PU", detail: "GLPU0024" },
        { part: "Cabinet body", material: "E0-grade MDF", detail: "Oil-wax color" },
        { part: "Decorative piece", material: "Stainless steel", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        body: [
            { name: "Oil-wax color (Cabinet)", hex: "#2B2A29" }
        ],
        frame: [
            { name: "GLPU0024 (Taupe PU)", hex: "#8E8279" } // Tono taupe (estimado)
        ]
    },
    configurations: [
        { code: "AR", size: "545*405*470mm", vol: "0.16m³", price: 4160 }
    ],
    priceList: [
        { 
            name: "Mesa de Noche (AR)", 
            size: "545*405*470", 
            prices: { unique: 4160 } 
        }
    ],
    customInstructions: {
        orientation: "Right-side configuration (R)",
        optional_models: "Available in left-side configuration (HYGL81827-AL)",
        material_note: "Cabinet body material is non-interchangeable"
    }
  },
  { 
    id: "mesa-tocador-hygl81605", 
    name: "Tocador HYGL81605 (Set)", 
    category: "Tocadores", 
    code: "HYGL81605-1 / HYGL81605-2", 
    priceBase: 20550, 
    image: "/images/DORMITORIOS/MESA23/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA23/img1.jpg", 
        "/images/DORMITORIOS/MESA23/img2.jpg",
        "/images/DORMITORIOS/MESA23/img3.jpg"
    ],
    specs: { 
        dimensions: "1300 * 530 * 755 mm (Mesa principal)", 
        volume: "0.55 m³", 
        assembly: "Ensamblado y Desmontado / 3 Piezas" 
    },
    materials: [
        { part: "Cabinet Top", material: "Sintered stone", detail: "Saint Laurent Gold" },
        { part: "Cabinet Body", material: "E0-grade MDF", detail: "Haoyue Gray (High gloss)" },
        { part: "Table Surface", material: "Saddle leather", detail: "PLMA0001" }
    ],
    colors: {
        body: [
            { name: "Haoyue Gray (High gloss)", hex: "#9EA1A3" }
        ],
        leather: [
            { name: "Saddle leather PLMA0001", hex: "#7B3F00" }
        ]
    },
    configurations: [
        { 
            code: "SET-23", 
            name: "Gabinete + Mesa Tocador", 
            price: 20550 
        }
    ],
    priceList: [
        { 
            name: "HYGL81605-1 (Cabinet)", 
            size: "900*470*515", 
            prices: { unit: 8690 }
        },
        { 
            name: "HYGL81605-2 (Table)", 
            size: "1300*530*755", 
            prices: { unit: 11860 }
        }
    ],
    customInstructions: {
        note: "HYGL81605-2 Dressing table cannot be ordered separately",
        options: "Customizable door opening ways"
    }
  },
  { 
    id: "mesa-tocador-hygl81606", 
    name: "Tocador HYGL81606", 
    category: "Tocadores", 
    code: "HYGL81606/MZL3505A", 
    priceBase: 11390, 
    image: "/images/DORMITORIOS/MESA24/render.jpg", 
    schematics: [
        "/images/DORMITORIOS/MESA24/img1.jpg", 
        "/images/DORMITORIOS/MESA24/img2.jpg",
        "/images/DORMITORIOS/MESA24/img3.jpg"
    ],
    specs: { 
        dimensions: "1300 * 450 * 775 mm", 
        volume: "0.32 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Panel / Right foot", material: "E0-grade MDF", detail: "Oil-wax color" },
        { part: "Left round cabinet", material: "E0-grade MDF", detail: "Haoyue Gray (High gloss)" },
        { part: "Foot frame / Pull-bar foot stand", material: "Stainless steel", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        body: [
            { name: "Haoyue Gray (High gloss)", hex: "#9EA1A3" },
            { name: "Oil-wax color", hex: "#2B2A29" }
        ],
        hardware: [
            { name: "Brushed Japanese Gold", hex: "#C5B358" }
        ]
    },
    configurations: [
        { code: "STD", size: "1300*450*775mm", vol: "0.32m³", price: 11390 }
    ],
    priceList: [
        { 
            name: "Tocador Estándar", 
            size: "1300*450*775", 
            prices: { unique: 11390 } 
        }
    ],
    customInstructions: {
        design_note: "Features a distinctive circular left cabinet and a minimalist right foot support",
        material_note: "Main body materials are non-interchangeable"
    }
  },
  { 
    id: "colchon-fyrc59201-hmcd-006", 
    name: "Colchón FYRC59201", 
    category: "Colchones", 
    code: "FYRC59201/HMCD-006", 
    priceBase: 6160, 
    image: "/images/DORMITORIOS/CAMA25/render.jpg", 
    specs: { 
        dimensions: "1800 * 2000 * 250 mm", 
        volume: "0.90 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Cover", material: "Tencel™ Fabric", detail: "White" },
        { part: "Core", material: "Natural Latex + High-Resilience Foam", detail: "5-Zone Pocket Spring System" }
    ],
    configurations: [
        { code: "1500", size: "1500*2000*250mm", price: 5860 },
        { code: "1800", size: "1800*2000*250mm", price: 6160 }
    ],
    priceList: [
        { 
            name: "Colchón 1.8m", 
            size: "1800*2000*250", 
            prices: { unique: 6160 } 
        }
    ]
  },
  { 
    id: "colchon-fyrc59203-hmcd-008", 
    name: "Colchón FYRC59203", 
    category: "Colchones", 
    code: "FYRC59203/HMCD-008", 
    priceBase: 17760, 
    image: "/images/DORMITORIOS/CAMA26/render.jpg", 
    specs: { 
        dimensions: "1800 * 2000 * 280 mm", 
        volume: "1.01 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Cover", material: "Premium Knitted Fabric", detail: "White" },
        { part: "Comfort Layer", material: "Imported Latex + Anti-Dustmite Wave-Top Memory Foam", detail: "High comfort" },
        { part: "Support System", material: "Individually Pocketed Imported Springs", detail: "Independent support" }
    ],
    configurations: [
        { code: "1500", size: "1500*2000*280mm", vol: "0.84m³", price: 16360 },
        { code: "1800", size: "1800*2000*280mm", vol: "1.01m³", price: 17760 },
        { code: "2000", size: "2000*2200*280mm", vol: "1.23m³", price: 22960 }
    ],
    priceList: [
        { 
            name: "Colchón Premium", 
            size: "1800*2000*280", 
            prices: { unique: 17760 } 
        }
    ],
    customInstructions: {
        feature_note: "Includes Anti-Dustmite Wave-Top Memory Foam for enhanced hygiene and comfort",
        material_note: "Premium imported components"
    }
  },
  { 
    id: "colchon-fyrc59202-hmcd-007", 
    name: "Colchón FYRC59203", 
    category: "Colchones", 
    code: "FYRC59202/HMCD-007", 
    priceBase: 9760, 
    image: "/images/DORMITORIOS/CAMA27/render.jpg", 
    specs: { 
        dimensions: "1800 * 2000 * 250 mm", 
        volume: "0.94 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Cover", material: "Bekaert Deslee Fabric", detail: "White" },
        { part: "Comfort Layer", material: "Natural Latex + High-Resilience Foam", detail: "Balanced support" },
        { part: "Support System", material: "Individually Pocketed Imported Springs", detail: "Independent support" }
    ],
    configurations: [
        { code: "1500", size: "1500*2000*250mm", vol: "0.75m³", price: 9060 },
        { code: "1800", size: "1800*2000*250mm", vol: "0.94m³", price: 9760 },
        { code: "2000", size: "2000*2200*250mm", vol: "1.10m³", price: 12780 }
    ],
    priceList: [
        { 
            name: "Colchón Confort", 
            size: "1800*2000*250", 
            prices: { unique: 9760 } 
        }
    ],
    customInstructions: {
        feature_note: "Features high-quality Bekaert Deslee fabric from Belgium",
        material_note: "Combines natural latex with high-resilience foam for a medium-firm feel"
    }
  },
  { 
    id: "colchon-fyrc59206-hmcd-010", 
    name: "Colchón FYRC59206", 
    category: "Colchones", 
    code: "FYRC59206/HMCD-010", 
    priceBase: 14560, 
    image: "/images/DORMITORIOS/CAMA28/render.jpg", 
    specs: { 
        dimensions: "1800 * 2000 * 280 mm", 
        volume: "1.01 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Cover", material: "Premium Knitted Fabric", detail: "White" },
        { part: "Comfort Layer", material: "Imported Latex + Anti-Dustmite Wave-Top Memory Foam", detail: "High-density comfort" },
        { part: "Support System", material: "Individually Pocketed Imported Springs", detail: "Independent pocket system" }
    ],
    configurations: [
        { code: "1500", size: "1500*2000*280mm", vol: "0.84m³", price: 12460 },
        { code: "1800", size: "1800*2000*280mm", vol: "1.01m³", price: 14560 }
    ],
    priceList: [
        { 
            name: "Colchón Ortopédico Premium", 
            size: "1800*2000*280", 
            prices: { unique: 14560 } 
        }
    ],
    customInstructions: {
        feature_note: "Combines imported latex with specialized anti-dustmite wave-top memory foam",
        construction: "Features individually pocketed imported spring system for motion isolation"
    }
  },
  { 
    id: "colchon-fyrc59207-hmcd-011", 
    name: "Colchón FYRC59207", 
    category: "Colchones", 
    code: "FYRC59207/HMCD-011", 
    priceBase: 18460, 
    image: "/images/DORMITORIOS/CAMA29/render.jpg", 
    specs: { 
        dimensions: "1800 * 2000 * 330 mm", 
        volume: "1.19 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Cover", material: "LAVA Cover", detail: "White premium fabric" },
        { part: "Comfort Layer", material: "Quilted Padding + Imported Latex", detail: "Multi-layer comfort" },
        { part: "Support System", material: "Mini Springs + Individually Pocketed Imported Springs", detail: "Dual spring support system" }
    ],
    configurations: [
        { code: "1500", size: "1500*2000*330mm", vol: "0.99m³", price: 15760 },
        { code: "1800", size: "1800*2000*330mm", vol: "1.19m³", price: 18460 }
    ],
    priceList: [
        { 
            name: "Colchón High-Profile Dual Spring", 
            size: "1800*2000*330", 
            prices: { unique: 18460 } 
        }
    ],
    customInstructions: {
        feature_note: "High-profile 330mm mattress featuring a specialized LAVA cover",
        tech_note: "Advanced support system combining mini springs with individually pocketed imported springs"
    }
  },
  { 
    "id": "bases-cama-tyrc-series", 
    "name": "Colección de Somieres TYRC", 
    "category": "Bases de Cama", 
    "image": "/images/DORMITORIOS/BASE37/render.jpg", 
    "models": [
        {
            "code": "TYRC9303 PGJ-007",
            "name": "Luxury Colorful Slatted Bed Base",
            "materials": "Steel frame with POM connectors",
            "color": "grey",
            "sizes": [
                { "dimensions": "1500*2000*70", "vol": "0.21m³", "price": 3690 },
                { "dimensions": "1800*2000*70", "vol": "0.26m³", "price": 3950 },
                { "dimensions": "2000*2200*70", "vol": "0.31m³", "price": 4060 }
            ]
        },
        {
            "code": "TYRC9305 PGJ-008",
            "name": "Classic Folding Reinforced Slatted Bed Base",
            "materials": "Steel frame + Poplar Wood",
            "color": "grey",
            "sizes": [
                { "dimensions": "1500*2000*30", "vol": "0.14m³", "price": 1860 },
                { "dimensions": "1800*2000*30", "vol": "0.17m³", "price": 2050 },
                { "dimensions": "2000*2200*30", "vol": "0.20m³", "price": 2100 }
            ]
        },
        {
            "code": "TYRC9306 PGJ-009",
            "name": "Classic Disassembled Reinforced Slatted Bed Base",
            "materials": "Steel frame + Birch Wood",
            "color": "grey",
            "sizes": [
                { "dimensions": "1500*2000*30", "vol": "0.14m³", "price": 1860 },
                { "dimensions": "1800*2000*30", "vol": "0.17m³", "price": 2050 },
                { "dimensions": "2000*2200*30", "vol": "0.20m³", "price": 2100 }
            ]
        },
        {
            "code": "TYRC9307",
            "name": "Slatted Base for Flush-Frame Beds",
            "materials": "Steel frame + Birch Wood",
            "color": "grey",
            "sizes": [
                { "dimensions": "1380*1940*30", "vol": "0.14m³", "price": 1860 },
                { "dimensions": "1680*1940*30", "vol": "0.17m³", "price": 2050 },
                { "dimensions": "1880*2140*30", "vol": "0.20m³", "price": 2100 }
            ]
        }
    ]
  },
];

// --- 2. FUNCIÓN DE SUBIDA ---
async function subirDormitorios() {
  console.log(`🔥 Limpiando tabla 'dormitorios' en Supabase...`);
  // OJO: Esto borra TODO lo que haya en la tabla 'dormitorios'
  const { error: deleteError } = await supabase.from('dormitorios').delete().neq('id', '0');
  
  if (deleteError) {
      console.error("❌ Error borrando datos existentes:", deleteError);
      return;
  }

  console.log(`📦 Preparando subida de ${dormitoriosData.length} productos...`);
  
  const { data, error } = await supabase.from('dormitorios').insert(dormitoriosData);

  if (error) {
    console.error("❌ Error subiendo datos:", error.message);
  } else {
    console.log(`✅ ¡ÉXITO! Los ${dormitoriosData.length} dormitorios se han subido correctamente a la tabla 'dormitorios'.`);
  }
}

subirDormitorios();