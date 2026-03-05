// subir-gabinete.js
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
// 1. DATOS COMPLETOS DE GABINETES
// --------------------------------------------------------------------------------

const gabinetesData = [
  // --- MUEBLES TV Y APARADORES ---
{ 
    id: "gabinete-lateral-hygl81501-a", 
    name: "Gabinete HYGL81501-A", 
    category: "Gabinete", 
    code: "HYGL81501-A/HBG1856Y", 
    priceBase: 27590, 
    // RECUERDA: Guardar imagen en la ruta correspondiente, ej: /public/images/GABINETES/LATERAL/HYGL81501-A/render.jpg
    image: "/images/GABINETES/GAB1/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB1/img1.jpg", 
        "/images/GABINETES/GAB1/img2.jpg",
        "/images/GABINETES/GAB1/img3.jpg"
    ],
    specs: { 
        dimensions: "1788 * 450 * 860 mm", 
        volume: "1.11 m³", 
        assembly: "Desmontado y Ensamblado / 2 Piezas" 
    },
    materials: [
        { part: "Cuerpo principal (Main body)", material: "MDF Grado E0", detail: "Color cera de aceite + Rojo Huayi (Alto brillo)" },
        { part: "Panel", material: "Mármol", detail: "Zilo Red (Oil-bright)" },
        { part: "Patas (Hardware foot)", material: "Acero Inoxidable", detail: "Gunmetal cepillado (Brushed Gunmetal)" }
    ],
    colors: {
        marble: [
            { name: "Zilo Red (Oil-bright)", hex: "#6A2C2A" } // Rojo oscuro texturizado (estimado basado en la imagen)
        ]
    },
    configurations: [
        { code: "HYGL81501-A", desc: "1788*450*860 mm", price: 27590 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1788mm (Zilo Red)", size: "1788*450*860 mm", price: 27590 }
    ],
    customInstructions: {
        marble: "Interchangeable (oil-finish marbles)",
        dimensions: "Not customizable" // Asumido ya que no hay lista de otras medidas
    }
},
{ 
    id: "gabinete-lateral-hygl81502", 
    name: "Gabinete HYGL81502", 
    category: "Gabinete", 
    code: "HYGL81502/HBG1857Y", 
    priceBase: 17760, 
    image: "/images/GABINETES/GAB2/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB2/img1.jpg", 
        "/images/GABINETES/GAB2/img2.jpg",
        "/images/GABINETES/GAB2/img3.jpg"
    ],
    specs: { 
        dimensions: "1600 * 450 * 900 mm", 
        volume: "1.06 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Panel", material: "Vidrio (Glass)", detail: "Gris Carbón Mate (Matte Carbon Gray)" },
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Estructura de patas (Foot frame)", material: "Aleación de aluminio", detail: "Space Gray" },
        { part: "Caja de cuero (Leather box)", material: "PU (Poliuretano)", detail: "GLPU0009" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#2A2522" } 
        ]
    },
    configurations: [
        { code: "HYGL81502", desc: "1600*450*900 mm", price: 17760 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1600mm (Oil-wax color)", size: "1600*450*900 mm", price: 17760 }
    ],
    customInstructions: {
        material: "Not interchangeable (según muestra de color)",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81503", 
    name: "Gabinete HYGL81503", 
    category: "Gabinete", 
    code: "HYGL81503/HBG1858Y", 
    priceBase: 15960, 
    image: "/images/GABINETES/GAB3/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB3/img1.jpg", 
        "/images/GABINETES/GAB3/img2.jpg",
        "/images/GABINETES/GAB3/img3.jpg"
    ],
    specs: { 
        dimensions: "2200 * 450 * 575 mm", 
        volume: "0.58 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Panel", material: "Piedra Sinterizada (Sintered stone)", detail: "Laurent Black Gold (Interchangeable)" },
        { part: "Panel interior (Inner panel)", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Vidrio en capas (Layered glass)", material: "Vidrio", detail: "Gris Carbón (Carbon Gray Glass)" },
        { part: "Estructura de patas (Foot frame)", material: "Aleación de aluminio", detail: "Gunmetal cepillado (Brushed Gunmetal)" },
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Gris Azulado Oriental (Eastern Blue Gray)" }
    ],
    colors: {
        stone: [
            { name: "Laurent Black Gold", hex: "#1A1514" } // Negro oscuro con posibles tonos dorados
        ]
    },
    configurations: [
        { code: "HYGL81503", desc: "2200*450*575 mm", price: 15960 }
    ],
    priceList: [
        { name: "Gabinete Lateral 2200mm (Laurent Black Gold)", size: "2200*450*575 mm", price: 15960 }
    ],
    customInstructions: {
        material: "Interchangeable (6mm Sintered stone)",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81507-a", 
    name: "Gabinete HYGL81507-A", 
    category: "Gabinete", 
    code: "HYGL81507-A/HBG1862A", 
    priceBase: 18060, 
    image: "/images/GABINETES/GAB4/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB4/img1.jpg", 
        "/images/GABINETES/GAB4/img2.jpg",
        "/images/GABINETES/GAB4/img3.jpg"
    ],
    specs: { 
        dimensions: "1730 * 450 * 723 mm", 
        volume: "0.63 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Panel", material: "Losa de roca (Rock slab)", detail: "Calacatta White" },
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color roble blanco (White oak color)" },
        { part: "Estructura de patas (Foot frame)", material: "Aleación de aluminio", detail: "Gunmetal cepillado (Brushed Gunmetal)" }
    ],
    colors: {
        stone: [
            { name: "Calacatta White", hex: "#EBEAE8" } // Blanco con vetas grisáceas (estimado)
        ]
    },
    configurations: [
        { code: "HYGL81507-A", desc: "1730*450*723 mm", price: 18060 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1730mm (Calacatta White)", size: "1730*450*723 mm", price: 18060 }
    ],
    customInstructions: {
        material: "Interchangeable (Panel)",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81515", 
    name: "Gabinete HYGL81515", 
    category: "Gabinete", 
    code: "HYGL81515", 
    priceBase: 13960, 
    image: "/images/GABINETES/GAB5/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB5/img1.jpg", 
        "/images/GABINETES/GAB5/img2.jpg",
        "/images/GABINETES/GAB5/img3.jpg"
    ],
    specs: { 
        dimensions: "1550 * 500 * 830 mm", 
        volume: "0.66 m³", 
        assembly: "Desmontado y Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Hermès Orange (Alto brillo / High gloss)" }
    ],
    colors: {
        body: [
            { name: "Hermès Orange (High gloss)", hex: "#D86B27" } // Naranja vibrante característico
        ]
    },
    configurations: [
        { code: "HYGL81515", desc: "1550*500*830 mm", price: 13960 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1550mm (Hermès Orange)", size: "1550*500*830 mm", price: 13960 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81516", 
    name: "Gabinete HYGL81516", 
    category: "Gabinete", 
    code: "HYGL81516", 
    priceBase: 18160, 
    image: "/images/GABINETES/GAB6/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB6/img1.jpg", 
        "/images/GABINETES/GAB6/img2.jpg",
        "/images/GABINETES/GAB6/img3.jpg"
    ],
    specs: { 
        dimensions: "2080 * 520 * 650 mm", 
        volume: "1.15 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Haoyue Gray (Alto brillo / High gloss)" }
    ],
    colors: {
        body: [
            { name: "Haoyue Gray (High gloss)", hex: "#A4A19E" } // Gris claro cálido/topo (estimado)
        ]
    },
    configurations: [
        { code: "HYGL81516", desc: "2080*520*650 mm", price: 18160 }
    ],
    priceList: [
        { name: "Gabinete Lateral 2080mm (Haoyue Gray)", size: "2080*520*650 mm", price: 18160 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81517", 
    name: "Gabinete HYGL81517", 
    category: "Gabinete", 
    code: "HYGL81517/MGL8611", 
    priceBase: 10060, 
    image: "/images/GABINETES/GAB7/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB7/img1.jpg", 
        "/images/GABINETES/GAB7/img2.jpg",
        "/images/GABINETES/GAB7/img3.jpg"
    ],
    specs: { 
        dimensions: "1643 * 425 * 735 mm", 
        volume: "0.84 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "PU (Poliuretano)", detail: "GLPU0025" },
        { part: "Tira decorativa (Decorative strip)", material: "Acero inoxidable", detail: "Oro japonés cepillado (Brushed Japanese Gold)" },
        { part: "Pata de apoyo (Foot post)", material: "Madera de fresno (Ash wood)", detail: "Color cera de aceite (Oil-wax color)" }
    ],
    colors: {
        body: [
            { name: "GLPU0025 / M8180PU", hex: "#A8907E" } // Tono arena/taupe basado en la muestra
        ]
    },
    configurations: [
        { code: "HYGL81517", desc: "1643*425*735 mm", price: 10060 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1643mm (GLPU0025)", size: "1643*425*735 mm", price: 10060 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81518-a", 
    name: "Gabinete HYGL81518-A", 
    category: "Gabinete", 
    code: "HYGL81518-A/MGL8616", 
    priceBase: 22960, 
    image: "/images/GABINETES/GAB8/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB8/img1.jpg", 
        "/images/GABINETES/GAB8/img2.jpg",
        "/images/GABINETES/GAB8/img3.jpg"
    ],
    specs: { 
        dimensions: "2000 * 440 * 730 mm", 
        volume: "1.82 m³", 
        assembly: "Desmontado y Ensamblado / 4 Piezas" 
    },
    materials: [
        { part: "Cubierta (Tabletop)", material: "Vidrio (Glass)", detail: "Gris Europeo (European Gray)" },
        { part: "Cubierta del cuerpo (Cabinet body Tabletop)", material: "Mármol (Marble)", detail: "Emerald in the Clouds (Oil-bright)" },
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Pieza decorativa / Base", material: "Acero inoxidable", detail: "Gunmetal cepillado (Brushed Gunmetal)" }
    ],
    colors: {
        stone: [
            { name: "Emerald in the Clouds", hex: "#6C7D7B" } // Tono mármol verdoso/grisáceo
        ]
    },
    configurations: [
        { code: "HYGL81518-A", desc: "2000*440*730 mm", price: 22960 }
    ],
    priceList: [
        { name: "Gabinete Lateral 2000mm (Emerald in the Clouds)", size: "2000*440*730 mm", price: 22960 }
    ],
    customInstructions: {
        material: "Interchangeable (Oil-finish marbles)",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-hygl81505-b", 
    name: "Gabinete HYGL81505-B", 
    category: "Gabinete", 
    code: "HYGL81505-B/HE1821Y-B", 
    priceBase: 13060, 
    image: "/images/GABINETES/GAB9/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB9/img1.jpg", 
        "/images/GABINETES/GAB9/img2.jpg",
        "/images/GABINETES/GAB9/img3.jpg"
    ],
    specs: { 
        dimensions: "1600 * 350 * 875 mm", 
        volume: "0.83 m³", 
        assembly: "Desmontado y Ensamblado / 2 Piezas" 
    },
    materials: [
        { part: "Panel", material: "Mármol (Marble)", detail: "Zilo Red (Oil-bright)" },
        { part: "Estructura de patas (Foot frame)", material: "Acero inoxidable + Madera de fresno", detail: "Brushed Gunmetal + Oil-wax color" }
    ],
    colors: {
        stone: [
            { name: "Zilo Red", hex: "#7B3F37" } // Tono rojizo marmolado profundo
        ]
    },
    configurations: [
        { code: "HYGL81505-B", desc: "1600*350*875 mm", price: 13060 }
    ],
    priceList: [
        { name: "Mesa Consola 1600mm (Zilo Red)", size: "1600*350*875 mm", price: 13060 }
    ],
    customInstructions: {
        material: "Interchangeable (Oil-finish marbles)",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-hygl81506", 
    name: "Gabinete HYGL81506", 
    category: "Gabinete", 
    code: "HYGL81506/HE1835Y", 
    priceBase: 13260, 
    image: "/images/GABINETES/GAB10/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB10/img1.jpg", 
        "/images/GABINETES/GAB10/img2.jpg",
        "/images/GABINETES/GAB10/img3.jpg"
    ],
    specs: { 
        dimensions: "1500 * 380 * 1000 mm", 
        volume: "0.65 m³", 
        assembly: "Desmontado y Ensamblado / 2 Piezas" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF grado E0", detail: "Oil-wax color" },
        { part: "Marco interior (Inner frame)", material: "MDF grado E0", detail: "Huayi Red (High gloss)" },
        { part: "Estructura de patas (Foot frame)", material: "Acero inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#1D1C1A" } 
        ],
        accent: [
            { name: "Huayi Red (High gloss)", hex: "#B32428" }
        ]
    },
    configurations: [
        { code: "HYGL81506", desc: "1500*380*1000 mm", price: 13260 }
    ],
    priceList: [
        { name: "Mesa Consola 1500mm (Oil-wax / Huayi Red)", size: "1500*380*1000 mm", price: 13260 }
    ],
    customInstructions: {
        material: "Not interchangeable (Cabinet body)",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-hygl81302", 
    name: "Gabinete HYGL81302", 
    category: "Gabinete", 
    code: "HYGL81302/HA1802", 
    priceBase: 14990, 
    image: "/images/GABINETES/GAB11/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB11/img1.jpg", 
        "/images/GABINETES/GAB11/img2.jpg",
        "/images/GABINETES/GAB11/img3.jpg"
    ],
    specs: { 
        dimensions: "850 * 420 * 1200 mm", 
        volume: "0.62 m³", 
        assembly: "Desmontado y Ensamblado / 2 Piezas" 
    },
    materials: [
        { part: "Panel", material: "Vidrio (Glass)", detail: "European Gray" },
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF grado E0", detail: "Oil-wax color" },
        { part: "Superficie decorativa (Decorative surface)", material: "Cuero de silla (Saddle leather)", detail: "GLMA0004" },
        { part: "Base del marco de conexión (Connecting frame base)", material: "Acero inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#1D1C1A" } 
        ],
        leather: [
            { name: "GLMA0004", hex: "#D2B48C" } 
        ],
        glass: [
            { name: "European Gray", hex: "#5C5C5C" }
        ]
    },
    configurations: [
        { code: "HYGL81302", desc: "850*420*1200 mm", price: 14990 }
    ],
    priceList: [
        { name: "Cajonera 850mm (Oil-wax / European Gray)", size: "850*420*1200 mm", price: 14990 }
    ],
    customInstructions: {
        material: "Not interchangeable (Cabinet body)",
        dimensions: "Not customizable"
    }
},
{ 
    id: "mesa-hytl86201", 
    name: "Mesa de Té HYTL86201", 
    category: "Mesa", 
    code: "HYTL86201/HCT1801Y-1", 
    priceBase: 18760, 
    image: "/images/GABINETES/GAB12/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB12/img1.jpg", 
        "/images/GABINETES/GAB12/img2.jpg",
        "/images/GABINETES/GAB12/img3.jpg"
    ],
    specs: { 
        dimensions: "1500 / 1800 / 2000 / 2400 * 700/750 * 720 mm", 
        volume: "0.71 - 1.17 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Superficie principal (Main surface)", material: "Piedra sinterizada (Sintered stone)", detail: "Moonlight White" },
        { part: "Estructura de madera (Wood frame)", material: "Madera de fresno + MDF E0", detail: "Oil-wax color" },
        { part: "Detalles (Accents)", material: "Obsidiana (Obsidian)", detail: "Obsidian" },
        { part: "Estructura de patas (Foot frame)", material: "Acero inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#1D1C1A" } 
        ],
        stone: [
            { name: "Moonlight White", hex: "#F4F4F0" },
            { name: "Obsidian", hex: "#0F0F0F" }
        ],
        metal: [
            { name: "Brushed Gunmetal", hex: "#4A4A4A" }
        ]
    },
    configurations: [
        { code: "HYTL86201-1500", desc: "1500*700*720 mm", price: 18760 },
        { code: "HYTL86201-1800", desc: "1800*700*720 mm", price: 19790 },
        { code: "HYTL86201-2000", desc: "2000*700*720 mm", price: 20860 },
        { code: "HYTL86201-2400", desc: "2400*750*720 mm", price: 25390 }
    ],
    priceList: [
        { name: "Mesa de Té 1500mm", size: "1500*700*720 mm", price: 18760 },
        { name: "Mesa de Té 1800mm", size: "1800*700*720 mm", price: 19790 },
        { name: "Mesa de Té 2000mm", size: "2000*700*720 mm", price: 20860 },
        { name: "Mesa de Té 2400mm", size: "2400*750*720 mm", price: 25390 }
    ],
    customInstructions: {
        material: "Not customizable",
        dimensions: "Available in multiple sizes (1500/1800/2000/2400mm)"
    }
},
{ 
    id: "mesa-hytl86202", 
    name: "Mesa de Té HYTL86202", 
    category: "Mesa", 
    code: "HYTL86202/HCT1839", 
    priceBase: 46480, 
    image: "/images/GABINETES/GAB13/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB13/img1.jpg", 
        "/images/GABINETES/GAB13/img2.jpg",
        "/images/GABINETES/GAB13/img3.jpg"
    ],
    specs: { 
        dimensions: "2400 / 2600 / 2800 / 3130 * 1000 * 820 mm", 
        volume: "1.27 - 1.40 m³", 
        assembly: "Desmontado y Ensamblado / 6 Piezas" 
    },
    materials: [
        { part: "Estructura principal (Main structure)", material: "MDF grado E0", detail: "Oil-wax color" },
        { part: "Base decorativa (Decorative base)", material: "Piedra sinterizada (Sintered stone)", detail: "Cold River Snow" },
        { part: "Detalles metálicos (Metal accents)", material: "Acero inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#1D1C1A" } 
        ],
        stone: [
            { name: "Cold River Snow", hex: "#EAEAEA" }
        ],
        metal: [
            { name: "Brushed Gunmetal", hex: "#4A4A4A" }
        ]
    },
    configurations: [
        { code: "HYTL86202-2400", desc: "2400(2300)*1000*820 mm", price: 46480 },
        { code: "HYTL86202-2600", desc: "2600(2500)*1000*820 mm", price: 48690 },
        { code: "HYTL86202-2800", desc: "2800(2700)*1000*820 mm", price: 49290 },
        { code: "HYTL86202-3130", desc: "3130(3030)*1000*820 mm", price: 49990 }
    ],
    priceList: [
        { name: "Mesa de Té 2400mm", size: "2400(2300)*1000*820 mm", price: 46480 },
        { name: "Mesa de Té 2600mm", size: "2600(2500)*1000*820 mm", price: 48690 },
        { name: "Mesa de Té 2800mm", size: "2800(2700)*1000*820 mm", price: 49290 },
        { name: "Mesa de Té 3130mm", size: "3130(3030)*1000*820 mm", price: 49990 }
    ],
    customInstructions: {
        material: "Not customizable. Note: Price does not include tea tray stones and green plants.",
        dimensions: "Available in multiple sizes (2400/2600/2800/3130mm)"
    }
},
{ 
    id: "mesa-hytl86202-b", 
    name: "Mesa de Té HYTL86202-B", 
    category: "Mesa", 
    code: "HYTL86202-B/HCT1839-B", 
    priceBase: 37060, 
    image: "/images/GABINETES/GAB14/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB14/img1.jpg", 
        "/images/GABINETES/GAB14/img2.jpg",
        "/images/GABINETES/GAB14/img3.jpg"
    ],
    specs: { 
        dimensions: "2400 / 2600 / 2800 / 3000 * 1000 * 750 mm", 
        volume: "1.21 - 1.35 m³", 
        assembly: "Desmontado y Ensamblado / 5 Piezas" 
    },
    materials: [
        { part: "Estructura principal (Main structure)", material: "MDF grado E0", detail: "Oil-wax color" },
        { part: "Base decorativa (Decorative base)", material: "Piedra sinterizada (Sintered stone)", detail: "Cold River Snow" },
        { part: "Detalles metálicos (Metal accents)", material: "Acero inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#1D1C1A" } 
        ],
        stone: [
            { name: "Cold River Snow", hex: "#EAEAEA" }
        ],
        metal: [
            { name: "Brushed Gunmetal", hex: "#4A4A4A" }
        ]
    },
    configurations: [
        { code: "HYTL86202-B-2400", desc: "2400*1000*750 mm", price: 37060 },
        { code: "HYTL86202-B-2600", desc: "2600*1000*750 mm", price: 39160 },
        { code: "HYTL86202-B-2800", desc: "2800*1000*750 mm", price: 40190 },
        { code: "HYTL86202-B-3000", desc: "3000*1000*750 mm", price: 41260 }
    ],
    priceList: [
        { name: "Mesa de Té 2400mm", size: "2400*1000*750 mm", price: 37060 },
        { name: "Mesa de Té 2600mm", size: "2600*1000*750 mm", price: 39160 },
        { name: "Mesa de Té 2800mm", size: "2800*1000*750 mm", price: 40190 },
        { name: "Mesa de Té 3000mm", size: "3000*1000*750 mm", price: 41260 }
    ],
    customInstructions: {
        material: "Not customizable. Note: Price does not include tea tray stones.",
        dimensions: "Available in multiple sizes (2400/2600/2800/3000mm)"
    }
},
{ 
    id: "mesa-hytl86205", 
    name: "Mesa de Té HYTL86205", 
    category: "Mesa", 
    code: "HYTL86205/MQT7715-C", 
    priceBase: 44750, 
    image: "/images/GABINETES/GAB15/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB15/img1.jpg", 
        "/images/GABINETES/GAB15/img2.jpg",
        "/images/GABINETES/GAB15/img3.jpg"
    ],
    specs: { 
        dimensions: "2000/2200/2400/2600 * 850 * 720 mm | 2800/3000 * 1000 * 720 mm", 
        volume: "1.20 - 1.57 m³", 
        assembly: "Desmontado y Ensamblado / 5 Piezas" 
    },
    materials: [
        { part: "Superficie (Surface)", material: "Mármol (Marble)", detail: "Picasso (Genuine bright)" },
        { part: "Estructura principal (Main structure)", material: "Madera de fresno + MDF grado E0", detail: "Oil-wax color" },
        { part: "Detalles metálicos (Metal details)", material: "Acero inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#1D1C1A" } 
        ],
        stone: [
            { name: "Picasso (Genuine bright)", hex: "#EBEBEB" }
        ],
        metal: [
            { name: "Brushed Gunmetal", hex: "#4A4A4A" }
        ]
    },
    configurations: [
        { code: "HYTL86205-2000", desc: "2000*850*720 mm", price: 44750 },
        { code: "HYTL86205-2200", desc: "2200*850*720 mm", price: 45780 },
        { code: "HYTL86205-2400", desc: "2400*850*720 mm", price: 46850 },
        { code: "HYTL86205-2600", desc: "2600*850*720 mm", price: 48260 },
        { code: "HYTL86205-2800", desc: "2800*1000*720 mm", price: 49990 },
        { code: "HYTL86205-3000", desc: "3000*1000*720 mm", price: 52460 }
    ],
    priceList: [
        { name: "Mesa de Té 2000mm", size: "2000*850*720 mm", price: 44750 },
        { name: "Mesa de Té 2200mm", size: "2200*850*720 mm", price: 45780 },
        { name: "Mesa de Té 2400mm", size: "2400*850*720 mm", price: 46850 },
        { name: "Mesa de Té 2600mm", size: "2600*850*720 mm", price: 48260 },
        { name: "Mesa de Té 2800mm", size: "2800*1000*720 mm", price: 49990 },
        { name: "Mesa de Té 3000mm", size: "3000*1000*720 mm", price: 52460 }
    ],
    customInstructions: {
        material: "Not customizable.",
        dimensions: "Available in multiple sizes (2000 to 3000mm length). Note the depth change at 2800mm."
    }
},
{ 
    id: "estanteria-hygl81909", 
    name: "Estantería HYGL81909", 
    category: "Estantería", 
    code: "HYGL81909", 
    priceBase: 29360, 
    image: "/images/GABINETES/GAB16/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB16/img1.jpg", 
        "/images/GABINETES/GAB16/img2.jpg",
        "/images/GABINETES/GAB16/img3.jpg"
    ],
    specs: { 
        dimensions: "1830 * 435 * 2050 mm", 
        volume: "1.51 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Estantes (Shelf)", material: "MDF grado E0", detail: "Oil-wax color" },
        { part: "Estructura de patas (Foot frame)", material: "Acero inoxidable + Madera de fresno", detail: "Brushed Gunmetal + Oil-wax color" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#1D1C1A" } 
        ],
        metal: [
            { name: "Brushed Gunmetal", hex: "#4A4A4A" }
        ]
    },
    configurations: [
        { code: "HYGL81909", desc: "1830*435*2050 mm", price: 29360 }
    ],
    priceList: [
        { name: "Estantería 1830mm", size: "1830*435*2050 mm", price: 29360 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-hygl81705-a", 
    name: "Gabinete de Té HYGL81705-A", 
    category: "Gabinete", 
    code: "HYGL81705-A/MQT7711A", 
    priceBase: 42990, 
    image: "/images/GABINETES/GAB17/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB17/img1.jpg", 
        "/images/GABINETES/GAB17/img2.jpg",
        "/images/GABINETES/GAB17/img3.jpg"
    ],
    specs: { 
        dimensions: "2200 / 2400 / 2600 / 2790 * 430 * 1645 mm", 
        volume: "0.62 - 0.67 m³", 
        assembly: "Desmontado y Ensamblado / 2 Piezas" 
    },
    materials: [
        { part: "Estructura principal (Main structure)", material: "MDF grado E0", detail: "Oil-wax color + Haoyue Gray (Matte)" },
        { part: "Panel central (Center panel)", material: "Piedra sinterizada (Sintered stone)", detail: "Calacatta Gold" },
        { part: "Detalles metálicos (Metal details)", material: "Acero inoxidable", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#1D1C1A" },
            { name: "Haoyue Gray (Matte)", hex: "#8A8A8A" }
        ],
        stone: [
            { name: "Calacatta Gold", hex: "#D4CFC9" }
        ],
        metal: [
            { name: "Brushed Japanese Gold", hex: "#C5B358" }
        ]
    },
    configurations: [
        { code: "HYGL81705-A2200", desc: "2200*430*1645 mm", price: 42990 },
        { code: "HYGL81705-A2400", desc: "2400*430*1645 mm", price: 43360 },
        { code: "HYGL81705-A2600", desc: "2600*430*1645 mm", price: 43750 },
        { code: "HYGL81705-A2790", desc: "2790*430*1645 mm", price: 44190 }
    ],
    priceList: [
        { name: "Gabinete de Té 2200mm", size: "2200*430*1645 mm", price: 42990 },
        { name: "Gabinete de Té 2400mm", size: "2400*430*1645 mm", price: 43360 },
        { name: "Gabinete de Té 2600mm", size: "2600*430*1645 mm", price: 43750 },
        { name: "Gabinete de Té 2790mm", size: "2790*430*1645 mm", price: 44190 }
    ],
    customInstructions: {
        material: "Not customizable.",
        dimensions: "Available in multiple sizes (2200/2400/2600/2790mm)"
    }
},
{ 
    id: "gabinete-hygl81705-b", 
    name: "Gabinete de Té HYGL81705-B", 
    category: "Gabinete", 
    code: "HYGL81705-B/MQT7711", 
    priceBase: 26460, 
    image: "/images/GABINETES/GAB18/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB18/img1.jpg", 
        "/images/GABINETES/GAB18/img2.jpg",
        "/images/GABINETES/GAB18/img3.jpg"
    ],
    specs: { 
        dimensions: "1500 / 1600 / 1700 / 1800 * 425 * 1645 mm", 
        volume: "0.51 - 0.54 m³", 
        assembly: "Desmontado y Ensamblado / 2 Piezas" 
    },
    materials: [
        { part: "Estructura principal (Main structure)", material: "MDF grado E0", detail: "Oil-wax color + Haoyue Gray (Matte)" },
        { part: "Revestimiento/Detalles (Covering/Details)", material: "Cuero (Leather)", detail: "GLMA0020" },
        { part: "Detalles metálicos (Metal details)", material: "Acero inoxidable", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#1D1C1A" },
            { name: "Haoyue Gray (Matte)", hex: "#8A8A8A" }
        ],
        leather: [
            { name: "GLMA0020", hex: "#BCA38F" }
        ],
        metal: [
            { name: "Brushed Japanese Gold", hex: "#C5B358" }
        ]
    },
    configurations: [
        { code: "HYGL81705-B1500", desc: "1500*425*1645 mm", price: 26460 },
        { code: "HYGL81705-B1600", desc: "1600*425*1645 mm", price: 26790 },
        { code: "HYGL81705-B1700", desc: "1700*425*1645 mm", price: 27160 },
        { code: "HYGL81705-B1800", desc: "1800*425*1645 mm", price: 27560 }
    ],
    priceList: [
        { name: "Gabinete de Té 1500mm", size: "1500*425*1645 mm", price: 26460 },
        { name: "Gabinete de Té 1600mm", size: "1600*425*1645 mm", price: 26790 },
        { name: "Gabinete de Té 1700mm", size: "1700*425*1645 mm", price: 27160 },
        { name: "Gabinete de Té 1800mm", size: "1800*425*1645 mm", price: 27560 }
    ],
    customInstructions: {
        material: "Not customizable.",
        dimensions: "Available in multiple sizes (1500/1600/1700/1800mm)"
    }
},
{ 
    id: "biombo-hygl81913", 
    name: "Biombo HYGL81913", 
    category: "Biombo", 
    code: "HYGL81913", 
    priceBase: 39160, 
    image: "/images/GABINETES/GAB19/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB19/img1.jpg", 
        "/images/GABINETES/GAB19/img2.jpg",
        "/images/GABINETES/GAB19/img3.jpg"
    ],
    specs: { 
        dimensions: "2690 * 100 * 1800 mm", 
        volume: "0.4 m³", 
        assembly: "Desmontado y Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Marco (Frame)", material: "Acero inoxidable", detail: "Brushed Gunmetal" },
        { part: "Cuerda trenzada (Braided cord)", material: "Cuerda trenzada", detail: "PL519 Light Khaki" },
        { part: "Madera maciza (Solid wood)", material: "Madera de fresno", detail: "Oil-wax color" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#1D1C1A" } 
        ],
        fabric: [
            { name: "PL519 Light Khaki", hex: "#D8CDBA" }
        ],
        metal: [
            { name: "Brushed Gunmetal", hex: "#4A4A4A" }
        ]
    },
    configurations: [
        { code: "HYGL81913", desc: "2690*100*1800 mm", price: 39160 }
    ],
    priceList: [
        { name: "Biombo 2690mm", size: "2690*100*1800 mm", price: 39160 }
    ],
    customInstructions: {
        material: "Not interchangeable.",
        dimensions: "Not customizable."
    }
},
{ 
    id: "Estanteria-hygl819098", 
    name: "Estantería HYGL819098", 
    category: "Estantería", 
    code: "HYGL819098", 
    priceBase: 11550, 
    image: "/images/GABINETES/GAB20/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB20/img1.jpg", 
        "/images/GABINETES/GAB20/img2.jpg",
        "/images/GABINETES/GAB20/img3.jpg"
    ],
    specs: { 
        dimensions: "1500 * 380 * 1000 mm", 
        volume: "0.65 m³", 
        assembly: "Desmontado y Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF grado E0", detail: "Oil-wax color" },
        { part: "Marco interior (Inner frame)", material: "MDF grado E0", detail: "Huayi Red (High gloss)" },
        { part: "Estructura de patas (Foot frame)", material: "Acero inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        wood: [
            { name: "Oil-wax color", hex: "#1D1C1A" },
            { name: "Huayi Red (High gloss)", hex: "#8A1C1C" }
        ],
        metal: [
            { name: "Brushed Gunmetal", hex: "#4A4A4A" }
        ]
    },
    configurations: [
        { code: "HYGL819098", desc: "1500*380*1000 mm", price: 13260 }
    ],
    priceList: [
        { name: "Consola 1500mm", size: "1500*380*1000 mm", price: 13260 }
    ],
    customInstructions: {
        material: "Cabinet body material is not interchangeable.",
        dimensions: "Not customizable."
    }
},
// ✅ CÓMO DEBE QUEDAR (Correcto)
{ 
    id: "comoda-hygl81906-1", 
    name: "Cómoda HYGL81906-1", 
    category: "Cómoda", 
    code: "HYGL81906", 
    priceBase: 29800, 
    image: "/images/GABINETES/GAB21/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB21/img1.jpg", 
        "/images/GABINETES/GAB21/img2.jpg",
        "/images/GABINETES/GAB21/img3.jpg"
    ],
    specs: { 
        dimensions: "850 * 420 * 1200 mm", 
        volume: "0.62 m³", 
        assembly: "Desmontado y Ensamblado / 2 Piezas" 
    },
    materials: [
        { part: "Panel (Panel)", material: "Vidrio (Glass)", detail: "European Gray" },
        { part: "Superficie decorativa (Decorative surface)", material: "Cuero de silla de montar (Saddle leather)", detail: "GLMA0004" },
        { part: "Base del marco (Connecting frame base)", material: "Acero inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        glass: [
            { name: "Light Gray", hex: "#A0A0A0" }
        ],
        leather: [
            { name: "GLMA0004", hex: "#D4C7BA" }
        ],
        metal: [
            { name: "Brushed Gunmetal", hex: "#4A4A4A" }
        ]
    },
    configurations: [
        { code: "HYGL81906-1 (Upper)", desc: "1810*298*599 mm", price: 4750 },
        { code: "HYGL81906-2 (Lower)", desc: "1810*298*2400 mm", price: 25050 }
    ],
    priceList: [
        { name: "Gabinete Superior (Upper)", size: "1810*298*599 mm", price: 4750 },
        { name: "Gabinete Inferior (Lower)", size: "1810*298*2400 mm", price: 25050 }
    ],
    customInstructions: {
        material: "Cabinet body material is not interchangeable.",
        dimensions: "Not customizable."
    }
},
];

// --- 2. FUNCIÓN DE SUBIDA ---
async function subirGabinetes() {
  console.log(`🔥 Limpiando tabla 'gabinetes' en Supabase...`);
  
  // OJO: Esto borra TODO lo que haya en la tabla 'gabinetes' (y dejamos los dormitorios a salvo)
  const { error: deleteError } = await supabase.from('gabinetes').delete().neq('id', '0');
  
  if (deleteError) {
      console.error("❌ Error borrando datos existentes:", deleteError);
      return;
  }

  console.log(`📦 Preparando subida de ${gabinetesData.length} productos...`);
  
  // Insertamos en la tabla correcta
  const { data, error } = await supabase.from('gabinetes').upsert(gabinetesData);

  if (error) {
    console.error("❌ Error subiendo datos:", error.message);
  } else {
    console.log(`✅ ¡ÉXITO! Los ${gabinetesData.length} gabinetes se han subido correctamente a la tabla 'gabinetes'.`);
  }
}

// Llamada a la función
subirGabinetes();