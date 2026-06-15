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
        "/images/GABINETES/GAB1/img3.jpg", 
        "/images/GABINETES/GAB1/img4.jpg",
        "/images/GABINETES/GAB1/img5.jpg"
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
        "/images/GABINETES/GAB2/img3.jpg",
        "/images/GABINETES/GAB2/img4.jpg"
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
        "/images/GABINETES/GAB3/img3.jpg",
        "/images/GABINETES/GAB3/img4.jpg", 
        "/images/GABINETES/GAB3/img5.jpg"
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
        "/images/GABINETES/GAB4/img3.jpg",
        "/images/GABINETES/GAB4/img4.jpg", 
        "/images/GABINETES/GAB4/img5.jpg",
        "/images/GABINETES/GAB4/img6.jpg"
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
        "/images/GABINETES/GAB5/img3.jpg",
        "/images/GABINETES/GAB5/img4.jpg"
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
        "/images/GABINETES/GAB6/img3.jpg",
        "/images/GABINETES/GAB6/img4.jpg"
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
    id: "gabinete-hygl81518",
    name: "Gabinete HYGL81518",
    category: "Gabinete",
    code: "HYGL81518/MGL8616",
    priceBase: 22960,
    image: "/images/GABINETES/GAB8/render.jpg",
    schematics: [
        "/images/GABINETES/GAB8/img1.jpg",
        "/images/GABINETES/GAB8/img2.jpg",
        "/images/GABINETES/GAB8/img3.jpg",
        "/images/GABINETES/GAB8/img4.jpg",
        "/images/GABINETES/GAB8/img5.jpg",
        "/images/GABINETES/GAB8/img6.jpg",
        "/images/GABINETES/GAB8/img7.jpg"
    ],
    specs: {
        dimensions: "2000 * 440 * 730 mm",
        volume: "1.82 m³",
        assembly: "Desmontado y Ensamblado / 4 Piezas"
    },
    materials: [
        { part: "Cubierta superior (Oval glass top)", material: "Vidrio (Glass)", detail: "Smoked / Dark tinted — oval shape" },
        { part: "Stone insert (below glass)", material: "Mármol / Sintered stone", detail: "Interchangeable (oil-finish marbles)" },
        { part: "Cabinet body & 4 drawers", material: "MDF Grado E0 / Ash wood", detail: "Dark Gray or Light Beige (Oil-wax color)" },
        { part: "Side ends (x2)", material: "MDF Grado E0", detail: "Curved cylindrical ends" },
        { part: "Base legs", material: "Vidrio / Acero inoxidable", detail: "Smoked glass panels + Brushed Gunmetal bar" }
    ],
    colors: {
        body: [
            { name: "Dark Gray Ash (Oil-wax)", hex: "#4A4948" },
            { name: "Light Beige / Cream Ash", hex: "#D8CCB4" }
        ],
        stone: [
            { name: "Emerald in the Clouds", hex: "#6C7D7B" },
            { name: "Light White / Calacatta", hex: "#F0EDE8" },
            { name: "Black Marble with veins", hex: "#1A1A1A" }
        ],
        glass: [
            { name: "Smoked Dark Gray", hex: "#3A3A3E" }
        ]
    },
    configurations: [
        { code: "HYGL81518", desc: "2000*440*730 mm", price: 22960 }
    ],
    priceList: [
        { name: "Gabinete HYGL81518 2000mm", size: "2000*440*730 mm", price: 22960 }
    ],
    customInstructions: {
        material: "Interchangeable (Oil-finish marbles)",
        color_options: "Available in Dark Gray Ash and Light Beige/Cream body finishes",
        design_note: "Wide credenza with oval smoked glass top, 4-drawer body, curved side ends and smoked glass panel legs"
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
        "/images/GABINETES/GAB9/img3.jpg",
        "/images/GABINETES/GAB9/img4.jpg", 
        "/images/GABINETES/GAB9/img5.jpg",
        "/images/GABINETES/GAB9/img6.jpg"
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
        "/images/GABINETES/GAB11/img3.jpg",
        "/images/GABINETES/GAB11/img4.jpg", 
        "/images/GABINETES/GAB11/img5.jpg",
        "/images/GABINETES/GAB11/img6.jpg"
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
// GAB12 → movido a mesas (mesa-hytl86201 → MESA57)
// GAB13 → movido a mesas (mesa-hytl86202 → MESA58)
// GAB14 → movido a mesas (mesa-hytl86202-b → MESA59)
// GAB15 → movido a mesas (mesa-hytl86205 → MESA60)
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
        "/images/GABINETES/GAB16/img3.jpg",
        "/images/GABINETES/GAB16/img4.jpg",
        "/images/GABINETES/GAB16/img5.jpg"
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
        "/images/GABINETES/GAB17/img3.jpg",
        "/images/GABINETES/GAB17/img4.jpg"
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
        "/images/GABINETES/GAB18/img3.jpg",
        "/images/GABINETES/GAB18/img4.jpg"
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
{
        id: "escritorio-hytl86303",
        name: "Escritorio Ejecutivo CHIN",
        category: "Mesa de Centro",
        code: "HYTL86303",
        priceBase: null,
        image: "/images/GABINETES/GAB22/render.jpg",
        schematics: [
            "/images/GABINETES/GAB22/img1.jpg",
            "/images/GABINETES/GAB22/img2.jpg",
            "/images/GABINETES/GAB22/img3.jpg"
        ],
        specs: {
            dimensions: "1800 * 730 * 760 mm",
            volume: null,
            assembly: null
        },
        materials: [
            { part: "Superficie de Trabajo", material: "Madera de Fresno + Cuero", detail: "Madera perimetral de grano natural con inserción central de cuero para calidez táctil" },
            { part: "Estructura Principal", material: "MDF Grado E0", detail: "Diseño optimizado con estanterías abiertas para artículos de uso frecuente" },
            { part: "Ribetes y Acentos", material: "Acero Inoxidable", detail: "Acero cepillado que evoca la antigua artesanía de incrustaciones metálicas" },
            { part: "Inteligencia Funcional", material: "Tecnología Oculta", detail: "Integración de carga inalámbrica y módulo de enchufes emergente multidispositivo" }
        ],
        colors: {
            wood: [
                { name: "Dark Ash (Oil-wax)", hex: "#1A1817" }
            ],
            leather: [
                { name: "Beige / Taupe (desk insert + drawer fronts)", hex: "#C9B99A" }
            ]
        },
        configurations: [
            { code: "HYTL86303", desc: "1800*730*760 mm", price: null }
        ],
        priceList: [
            { name: "Escritorio Ejecutivo CHIN (Diseñador: He Dongxiao)", size: "1800*730*760", price: null }
        ],
        customInstructions: null
    },
{
    id: "escritorio-hytl86305",
    name: "Book Table HYTL86305",
    category: "Mesa de Escritorio",
    code: "HYTL86305",
    priceBase: null,
    image: "/images/GABINETES/GAB23/render.jpg",
    schematics: [
        "/images/GABINETES/GAB23/img1.jpg",
        "/images/GABINETES/GAB23/img2.jpg"
    ],
    specs: {
        dimensions: "2200 * 900 * 760 mm",
        volume: null,
        assembly: "Desmontado y Ensamblado"
    },
    materials: [
        { part: "Tabletop", material: "E0-grade MDF", detail: "Dark Ash wood veneer (Oil-wax color)" },
        { part: "Pedestal bases (x2)", material: "E0-grade MDF", detail: "Dark Ash wood veneer — curved cylindrical form with drawers" },
        { part: "Cylindrical accent piece", material: "Sintered stone / Metal", detail: "Brushed Gunmetal — positioned on one pedestal" }
    ],
    colors: {
        body: [
            { name: "Dark Ash (Black)", hex: "#1A1A1A" },
            { name: "Dark Ash (Gray-Brown)", hex: "#4A4540" }
        ]
    },
    configurations: [
        { code: "L", desc: "Accent pedestal on left side", price: null },
        { code: "R", desc: "Accent pedestal on right side", price: null }
    ],
    priceList: [
        { name: "Book Table HYTL86305", size: "2200*900*760 mm", price: null }
    ],
    customInstructions: {
        design_note: "Dual curved-pedestal desk with integrated drawers and a detachable cylindrical accent column on one base",
        color_options: "Available in Black and Gray-Brown dark ash wood finishes",
        orientation: "Accent column configurable on left or right pedestal"
    }
},
  {
    id: "escritorio-hytl86301",
    name: "Escritorio CHIN HYTL86301",
    category: "Mesa de Escritorio",
    code: "HYTL86301",
    priceBase: null,
    image: "/images/GABINETES/GAB24/render.jpg",
    schematics: [
        "/images/GABINETES/GAB24/img1.jpg",
        "/images/GABINETES/GAB24/img2.jpg",
        "/images/GABINETES/GAB24/img3.jpg"
    ],
    specs: {
        dimensions: "1500-1800 * 730-780 * 760 mm",
        volume: null,
        assembly: null
    },
    materials: [
        { part: "Superficie de Trabajo", material: "Madera de Fresno oscura + Cuero PU", detail: "Bordes de madera con inserción central de cuero, evocando los antiguos pergaminos de bambú" },
        { part: "Estructura y Almacenaje", material: "MDF Grado E0 + Acero Inox", detail: "Estructura inspirada en armas de la era Qin con almacenaje discreto de 'borde oculto'" },
        { part: "Funciones Inteligentes", material: "Tecnología Oculta", detail: "Carga inalámbrica integrada y hub de energía emergente multidispositivo" }
    ],
    colors: {
        wood: [{ name: "Dark Ash (Oil-wax)", hex: "#1A1817" }],
        leather: [{ name: "Beige / Taupe", hex: "#C9B99A" }],
        metal: [{ name: "Matte Black", hex: "#1C1C1C" }]
    },
    configurations: [
        { code: "HYTL86301-1500", desc: "1500*780*760 mm", price: null },
        { code: "HYTL86301-1800", desc: "1800*730*760 mm", price: null }
    ],
    priceList: [
        { name: "Escritorio CHIN 1500mm", size: "1500*780*760", price: null },
        { name: "Escritorio CHIN 1800mm (Diseñador: He Dongxiao)", size: "1800*730*760", price: null }
    ],
    customInstructions: {
        length: "Customizable (1500-1800 mm)",
        width: "Customizable (730-780 mm)",
        height: "Not customizable (760 mm)"
    }
  },
  {
    id: "gabinete-hysf88901-fsg-01",
    name: "Cabinet HYSF88901-FSG-01",
    category: "Gabinete",
    code: "HYSF88901/FSG-01",
    priceBase: null,
    image: "/images/GABINETES/GAB25/render.jpg",
    schematics: [
        "/images/GABINETES/GAB25/img1.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: null
    },
    materials: [
        { part: "Exterior body", material: "Leather", detail: "Taupe / Warm Gray — full wrap with visible stitching" },
        { part: "Top panel", material: "Sintered stone", detail: "Laurent Black Gold (Interchangeable)" },
        { part: "Base plinth", material: "E0-grade MDF", detail: "Dark Ash (Oil-wax color)" },
        { part: "Wireless charger", material: "Technology", detail: "Integrated wireless charging module (top right)" }
    ],
    colors: {
        leather: [
            { name: "Taupe / Warm Gray", hex: "#9E8E7E" }
        ],
        stone: [
            { name: "Laurent Black Gold", hex: "#1A1514" }
        ],
        base: [
            { name: "Dark Ash (Oil-wax)", hex: "#1A1A1A" }
        ]
    },
    configurations: [
        { code: "FSG-01", desc: "Standard size", price: null }
    ],
    priceList: [
        { name: "Cabinet HYSF88901-FSG-01", size: null, price: null }
    ],
    customInstructions: {
        stone_note: "Sintered stone top is interchangeable",
        tech_note: "Integrated wireless charging pad on top right surface"
    }
  },
  {
    id: "gabinete-hygl81918-a",
    name: "Wine Cabinet HYGL81918-A",
    category: "Gabinete",
    code: "HYGL81918-A",
    priceBase: null,
    image: "/images/GABINETES/GAB26/render.jpg",
    schematics: [
        "/images/GABINETES/GAB26/img1.jpg",
        "/images/GABINETES/GAB26/img2.jpg",
        "/images/GABINETES/GAB26/img3.jpg",
        "/images/GABINETES/GAB26/img4.jpg",
        "/images/GABINETES/GAB26/img5.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: null
    },
    materials: [
        { part: "Cabinet body & doors", material: "E0-grade MDF", detail: "Deep Teal Green (High gloss) — arched double-door design" },
        { part: "Top frame & leg surround", material: "E0-grade MDF / Ash wood", detail: "Dark Gray (Oil-wax color)" },
        { part: "Legs & base frame", material: "Metal", detail: "Brushed Gunmetal — 4-leg structure with cross bar" },
        { part: "Door handles", material: "Metal", detail: "Thin vertical bar, Brushed Silver" }
    ],
    colors: {
        body: [
            { name: "Deep Teal Green (High gloss)", hex: "#1B5E5A" }
        ],
        frame: [
            { name: "Dark Gray Ash (Oil-wax)", hex: "#4A4845" }
        ],
        metal: [
            { name: "Brushed Gunmetal", hex: "#5A5755" }
        ]
    },
    configurations: [
        { code: "HYGL81918-A", desc: "Standard size", price: null }
    ],
    priceList: [
        { name: "Wine Cabinet HYGL81918-A", size: null, price: null }
    ],
    customInstructions: {
        color_note: "Available in Deep Teal Green high gloss — additional color options may be available",
        design_note: "Arched double-door cabinet on elevated metal base"
    }
  },
  {
    id: "estanteria-hygl81910",
    name: "Bookshelf HYGL81910",
    category: "Estantería",
    code: "HYGL81910",
    priceBase: null,
    image: "/images/GABINETES/GAB27/render.jpg",
    schematics: [
        "/images/GABINETES/GAB27/img1.jpg",
        "/images/GABINETES/GAB27/img2.jpg",
        "/images/GABINETES/GAB27/img3.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Desmontado y Ensamblado"
    },
    materials: [
        { part: "Shelves (5 levels)", material: "E0-grade MDF / Ash wood", detail: "Light Beige Gray (Oil-wax color) — rounded front edges" },
        { part: "Vertical posts (4 columns)", material: "Metal", detail: "Brushed Gunmetal / Dark Gray — cylindrical section with U-bracket shelf connectors" }
    ],
    colors: {
        shelves: [
            { name: "Light Beige Gray (Oil-wax)", hex: "#D4CFC7" }
        ],
        metal: [
            { name: "Brushed Gunmetal", hex: "#5A5755" }
        ]
    },
    configurations: [
        { code: "HYGL81910", desc: "5-shelf open bookcase", price: null }
    ],
    priceList: [
        { name: "Bookshelf HYGL81910", size: null, price: null }
    ],
    customInstructions: {
        design_note: "Open 5-level bookshelf with cantilevered shelves supported by 4 vertical metal posts with U-bracket connectors"
    }
  },
  {
    id: "gabinete-hygl81901-hm1833y-1",
    name: "Wine Cabinet HYGL81901-HM1833Y-1",
    category: "Gabinete",
    code: "HYGL81901/HM1833Y-1",
    priceBase: null,
    image: "/images/GABINETES/GAB28/render.jpg",
    schematics: [
        "/images/GABINETES/GAB28/img1.jpg",
        "/images/GABINETES/GAB28/img2.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: null
    },
    materials: [
        { part: "Frame & legs", material: "Metal / Ash wood", detail: "Dark Gunmetal (Matte)" },
        { part: "Doors (x2)", material: "Glass", detail: "Smoked / Tinted glass with dark metal frame" },
        { part: "Interior body, shelves & drawer", material: "E0-grade MDF", detail: "Warm Taupe / Mocha (Matte)" },
        { part: "Interior lighting", material: "LED", detail: "Top-mounted strip light" }
    ],
    colors: {
        frame: [
            { name: "Dark Gunmetal (Matte)", hex: "#3A3735" }
        ],
        interior: [
            { name: "Warm Taupe / Mocha", hex: "#8C7E6E" }
        ]
    },
    configurations: [
        { code: "HYGL81901/HM1833Y-1", desc: "2-door glass display cabinet with shelf + drawer", price: null }
    ],
    priceList: [
        { name: "Wine Cabinet HYGL81901-HM1833Y-1", size: null, price: null }
    ],
    customInstructions: {
        design_note: "Two smoked glass doors opening to reveal taupe interior with 2 shelves, 1 central drawer, and top LED lighting",
        legs_note: "4 slim dark metal legs"
    }
  },
  {
    id: "gabinete-hygl81701-hcg1801y-1",
    name: "CHIN Tea Cabinet HYGL81701-HCG1801Y-1",
    category: "Gabinete",
    code: "HYGL81701/HCG1801Y-1",
    priceBase: null,
    image: "/images/GABINETES/GAB29/render.jpg",
    schematics: [
        "/images/GABINETES/GAB29/img1.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Desmontado y Ensamblado"
    },
    materials: [
        { part: "Main body & shelves", material: "E0-grade MDF / Ash wood", detail: "Dark Gray-Brown (Oil-wax color)" },
        { part: "Side panels", material: "E0-grade MDF", detail: "Vertical slatted design — curved rounded edges" },
        { part: "Central drawers (x4)", material: "E0-grade MDF", detail: "Round recessed pull handles — Dark Gray" },
        { part: "Bottom drawers (x2)", material: "E0-grade MDF", detail: "Full-width push-to-open" },
        { part: "Base legs", material: "Metal", detail: "Matte Black — sled/frame base" }
    ],
    colors: {
        body: [
            { name: "Dark Gray-Brown (Oil-wax)", hex: "#3A3530" }
        ],
        metal: [
            { name: "Matte Black", hex: "#1C1C1C" }
        ]
    },
    configurations: [
        { code: "HYGL81701/HCG1801Y-1", desc: "Open shelving unit with central drawer block", price: null }
    ],
    priceList: [
        { name: "CHIN Tea Cabinet HYGL81701", size: null, price: null }
    ],
    customInstructions: {
        design_note: "Wide open-shelf cabinet with curved slatted side columns, 4 central round-pull drawers, and 2 full-width bottom drawers on a black metal sled base"
    }
  },
  {
    id: "mesa-tocador-hygl81606",
    name: "Dressing Table HYGL81606",
    category: "Mesa de Escritorio",
    code: "HYGL81606/MZL3505A",
    priceBase: 11390,
    image: "/images/GABINETES/GAB30/render.jpg",
    schematics: [
        "/images/GABINETES/GAB30/img1.jpg",
        "/images/GABINETES/GAB30/img2.jpg",
        "/images/GABINETES/GAB30/img3.jpg"
    ],
    specs: {
        dimensions: "1300 * 450 * 775 mm",
        volume: "0.32 m³",
        assembly: "Desmontado y Ensamblado / 3 Piezas"
    },
    materials: [
        { part: "Tabletop / Right leg", material: "E0-grade MDF", detail: "Oil-wax color (Dark Gray)" },
        { part: "Left cylindrical cabinet (3 drawers)", material: "E0-grade MDF", detail: "Haoyue Gray (High gloss)" },
        { part: "Foot frame / base bar", material: "Stainless steel", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        body: [
            { name: "Haoyue Gray (High gloss)", hex: "#9EA1A3" },
            { name: "Oil-wax color (Dark)", hex: "#2B2A29" }
        ],
        hardware: [
            { name: "Brushed Japanese Gold", hex: "#C5B358" }
        ]
    },
    configurations: [
        { code: "STD", size: "1300*450*775mm", vol: "0.32m³", price: 11390 }
    ],
    priceList: [
        { name: "Dressing Table HYGL81606", size: "1300*450*775", price: 11390 }
    ],
    customInstructions: {
        design_note: "Oval tabletop with cylindrical 3-drawer left cabinet on a gold metal base bar",
        material_note: "Main body materials are non-interchangeable"
    }
  },
  {
    id: "mesa-tocador-hygl81605",
    name: "Tocador HYGL81605 (Set)",
    category: "Mesa de Escritorio",
    code: "HYGL81605-1 / HYGL81605-2",
    priceBase: 20550,
    image: "/images/GABINETES/GAB31/render.jpg",
    schematics: [
        "/images/GABINETES/GAB31/img1.jpg",
        "/images/GABINETES/GAB31/img2.jpg",
        "/images/GABINETES/GAB31/img3.jpg",
        "/images/GABINETES/GAB31/img4.jpg",
        "/images/GABINETES/GAB31/img5.jpg",
        "/images/GABINETES/GAB31/img6.jpg",
        "/images/GABINETES/GAB31/img7.jpg",
        "/images/GABINETES/GAB31/img8.jpg"
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
        { code: "SET", name: "Gabinete + Mesa Tocador", price: 20550 }
    ],
    priceList: [
        { name: "HYGL81605-1 (Cabinet)", size: "900*470*515", price: 8690 },
        { name: "HYGL81605-2 (Table)", size: "1300*530*755", price: 11860 }
    ],
    customInstructions: {
        note: "HYGL81605-2 Dressing table cannot be ordered separately",
        options: "Customizable door opening ways"
    }
  },
  {
    id: "tocador-hygl81603-a",
    name: "WhisperArc Dressing Table HYGL81603-A",
    category: "Mesa de Escritorio",
    code: "HYGL81603-A",
    priceBase: null,
    image: "/images/GABINETES/GAB32/render.jpg",
    schematics: [
        "/images/GABINETES/GAB32/img1.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Desmontado y Ensamblado"
    },
    materials: [
        { part: "Tabletop & body", material: "E0-grade MDF / Ash wood", detail: "Dark Ash (Oil-wax color)" },
        { part: "Top insert", material: "Glass / Mirror", detail: "Frosted / Light gray" },
        { part: "Drawers (x3)", material: "E0-grade MDF", detail: "Push-to-open, flush front" },
        { part: "Legs (x4)", material: "Metal", detail: "Brushed Gunmetal (Dark Gray)" },
        { part: "Cross bar", material: "Metal", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        body: [
            { name: "Dark Ash (Oil-wax)", hex: "#1E1C1A" }
        ],
        metal: [
            { name: "Brushed Gunmetal", hex: "#5A5755" },
            { name: "Brushed Japanese Gold", hex: "#C5B358" }
        ]
    },
    configurations: [
        { code: "HYGL81603-A", desc: "Standard", price: null }
    ],
    priceList: [
        { name: "WhisperArc Dressing Table HYGL81603-A", size: null, price: null }
    ],
    customInstructions: {
        design_note: "Asymmetric dressing table with 3 flush drawers, frosted glass top insert, gunmetal legs and gold cross bar"
    }
  },
  {
    id: "tocador-hygl81602-a-hz1851a",
    name: "Be Water Dressing Table HYGL81602-A-HZ1851A",
    category: "Mesa de Escritorio",
    code: "HYGL81602-A/HZ1851A",
    priceBase: null,
    image: "/images/GABINETES/GAB33/render.jpg",
    schematics: [
        "/images/GABINETES/GAB33/img1.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Desmontado y Ensamblado"
    },
    materials: [
        { part: "Tabletop", material: "E0-grade MDF", detail: "Light Gray (High gloss)" },
        { part: "Left pedestal with 3 drawers", material: "E0-grade MDF", detail: "Medium Gray (High gloss)" },
        { part: "Right panel / screen", material: "Fabric / PU", detail: "Beige / Warm Cream (Textured)" },
        { part: "Base feet", material: "Metal", detail: "Matte Black" }
    ],
    colors: {
        body: [
            { name: "Light Gray (High gloss)", hex: "#C0BEBE" },
            { name: "Medium Gray (High gloss)", hex: "#9E9C9C" }
        ],
        panel: [
            { name: "Beige / Warm Cream (Fabric)", hex: "#D8D0C4" }
        ],
        metal: [
            { name: "Matte Black", hex: "#1C1C1C" }
        ]
    },
    configurations: [
        { code: "HYGL81602-A", desc: "Standard", price: null }
    ],
    priceList: [
        { name: "Be Water Dressing Table HYGL81602-A", size: null, price: null }
    ],
    customInstructions: {
        design_note: "L-shaped desk with left 3-drawer pedestal in gray high gloss and right fabric privacy panel on black metal feet"
    }
  },
  {
    id: "gabinete-hygl81512",
    name: "Change Modular Cabinet HYGL81512",
    category: "Gabinete",
    code: "HYGL81512",
    priceBase: null,
    image: "/images/GABINETES/GAB34/render.jpg",
    schematics: [
        "/images/GABINETES/GAB34/img1.jpg",
        "/images/GABINETES/GAB34/img2.jpg",
        "/images/GABINETES/GAB34/img3.jpg",
        "/images/GABINETES/GAB34/img4.jpg",
        "/images/GABINETES/GAB34/img5.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Desmontado y Ensamblado"
    },
    materials: [
        { part: "Cabinet body & doors", material: "E0-grade MDF", detail: "Burgundy Red (High gloss) — main panels" },
        { part: "Accent panels (top & bottom drawer)", material: "E0-grade MDF", detail: "Deep Navy Blue (High gloss)" },
        { part: "Open niche interior", material: "E0-grade MDF", detail: "Amber / Mustard Yellow — LED backlit" },
        { part: "Base legs", material: "Metal / Cast aluminum", detail: "Brushed Champagne / Taupe — decorative arch-leg design" }
    ],
    colors: {
        body: [
            { name: "Burgundy Red (High gloss)", hex: "#6B1E1E" },
            { name: "Deep Navy Blue (High gloss)", hex: "#1C2B4A" }
        ],
        interior: [
            { name: "Amber / Mustard Yellow (LED niche)", hex: "#C8841A" }
        ],
        metal: [
            { name: "Brushed Champagne / Taupe", hex: "#A89880" }
        ]
    },
    configurations: [
        { code: "L", desc: "Left-oriented niche layout", price: null },
        { code: "R", desc: "Right-oriented niche layout (mirrored)", price: null }
    ],
    priceList: [
        { name: "Change Modular Cabinet HYGL81512", size: null, price: null }
    ],
    customInstructions: {
        design_note: "Modular high cabinet with geometric color-block doors in burgundy and navy, central amber LED-lit open niche, sold in pairs (L+R mirrored)",
        color_note: "Color-block layout is interchangeable — navy and burgundy panels can be rearranged"
    }
  },
  {
    id: "consola-hygl81511-a",
    name: "Blending Entryway HYGL81511-A",
    category: "Gabinete",
    code: "HYGL81511-A",
    priceBase: null,
    image: "/images/GABINETES/GAB35/render.jpg",
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Desmontado y Ensamblado"
    },
    materials: [
        { part: "Tabletop", material: "Sintered stone / Marble", detail: "Dark Gray with Gold/Cream veins (Interchangeable)" },
        { part: "Base (petal/wave form)", material: "Stainless steel", detail: "Brushed Champagne Gold — sculpted double-panel wave design" },
        { part: "Decorative clasps", material: "Stainless steel", detail: "Brushed Japanese Gold — 2 vertical bar accents" }
    ],
    colors: {
        stone: [
            { name: "Dark Gray Marble with veins", hex: "#4A4540" }
        ],
        metal: [
            { name: "Brushed Champagne Gold", hex: "#B5A882" },
            { name: "Brushed Japanese Gold (clasps)", hex: "#C5B358" }
        ]
    },
    configurations: [
        { code: "HYGL81511-A", desc: "Standard", price: null }
    ],
    priceList: [
        { name: "Blending Entryway HYGL81511-A", size: null, price: null }
    ],
    customInstructions: {
        design_note: "Console/entryway table with dark marble top and sculpted double-wave stainless steel base with gold clasp details",
        stone_note: "Sintered stone top is interchangeable"
    }
  },
  {
    id: "gabinete-hygl81105-hj1850",
    name: "Diamond Cabinet HYGL81105-HJ1850",
    category: "Gabinete",
    code: "HYGL81105/HJ1850",
    priceBase: null,
    image: "/images/GABINETES/GAB36/render.jpg",
    schematics: [
        "/images/GABINETES/GAB36/img1.jpg",
        "/images/GABINETES/GAB36/img2.jpg",
        "/images/GABINETES/GAB36/img3.jpg",
        "/images/GABINETES/GAB36/img4.jpg",
        "/images/GABINETES/GAB36/img5.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Desmontado y Ensamblado"
    },
    materials: [
        { part: "Top panel", material: "Sintered stone / Marble", detail: "Black with gold veins — raw/chiseled edge finish" },
        { part: "Door & drawer fronts", material: "E0-grade MDF", detail: "Warm Taupe / Gray-Beige (Matte)" },
        { part: "Cabinet body sides", material: "E0-grade MDF", detail: "Matte Black" },
        { part: "Center open niche", material: "Sintered stone", detail: "Black marble — visible raw edge" },
        { part: "Legs (x4)", material: "Metal", detail: "Matte Black — slim tapered" }
    ],
    colors: {
        body: [
            { name: "Warm Taupe / Gray-Beige (Matte)", hex: "#A8A095" },
            { name: "Matte Black (sides)", hex: "#1A1A1A" }
        ],
        stone: [
            { name: "Black Marble with Gold veins", hex: "#1C1C1C" }
        ],
        metal: [
            { name: "Matte Black", hex: "#1A1A1A" }
        ]
    },
    configurations: [
        { code: "HYGL81105/HJ1850", desc: "Standard — modular sideboard with open center niche", price: null }
    ],
    priceList: [
        { name: "Diamond Cabinet HYGL81105-HJ1850", size: null, price: null }
    ],
    customInstructions: {
        design_note: "Long low sideboard with black marble top (chiseled edge), taupe door/drawer fronts, open central niche and slim matte black legs",
        stone_note: "Top stone is interchangeable"
    }
  },
  {
    id: "gabinete-hygl81102-hj1838",
    name: "Modular Cabinet HYGL81102-HJ1838",
    category: "Estantería",
    code: "HYGL81102/HJ1838",
    priceBase: null,
    image: "/images/GABINETES/GAB37/render.jpg",
    schematics: [
        "/images/GABINETES/GAB37/img1.jpg",
        "/images/GABINETES/GAB37/img2.jpg",
        "/images/GABINETES/GAB37/img3.jpg"
    ],
    specs: {
        dimensions: null,
        volume: null,
        assembly: "Desmontado y Ensamblado / Modular"
    },
    materials: [
        { part: "Open shelving body & back panels", material: "E0-grade MDF / Ash wood", detail: "Dark Walnut / Rosewood Brown (Oil-wax color)" },
        { part: "Shelf dividers & frame", material: "E0-grade MDF", detail: "Dark Gray / Charcoal — contrasting edge detail" },
        { part: "Bottom drawers (x4)", material: "E0-grade MDF", detail: "Dark Charcoal Gray (push-to-open)" },
        { part: "Bottom open compartments", material: "E0-grade MDF", detail: "Dark Charcoal Gray" }
    ],
    colors: {
        body: [
            { name: "Dark Walnut / Rosewood Brown", hex: "#3D1F10" },
            { name: "Dark Charcoal Gray (lower section)", hex: "#2E2E2E" }
        ]
    },
    configurations: [
        { code: "HYGL81102/HJ1838", desc: "Full wall modular bookcase — 5 rows × 5 columns + drawer base", price: null }
    ],
    priceList: [
        { name: "Modular Cabinet HYGL81102-HJ1838", size: null, price: null }
    ],
    customInstructions: {
        design_note: "Large modular wall unit with 5-row open shelving in dark walnut, charcoal lower section with 4 drawers and open base compartments",
        modular_note: "Modular system — configurable in width and height"
    }
  },
  // GAB38 → movido a mesas (mesa-te-hygl81706 → MESA61)
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