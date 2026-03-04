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
    id: "consola-hygl81505-b", 
    name: "Consola HYGL81505-B", 
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
    id: "gabinete-lateral-hygl81513", 
    name: "Gabinete HYGL81513", 
    category: "Gabinete", 
    code: "HYGL81513/HBG1868Y", 
    priceBase: 12960, 
    image: "/images/GABINETES/GAB10/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB10/img1.jpg", 
        "/images/GABINETES/GAB10/img2.jpg",
        "/images/GABINETES/GAB10/img3.jpg"
    ],
    specs: { 
        dimensions: "1600 * 450 * 850 mm", 
        volume: "0.85 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Panel", material: "Vidrio (Glass)", detail: "Gris Carbón Mate (Matte Carbon Gray)" },
        { part: "Patas (Hardware foot)", material: "Aleación de aluminio", detail: "Space Gray" }
    ],
    colors: {
        body: [
            { name: "Oil-wax color", hex: "#2C2623" } // Marrón muy oscuro/negro madera
        ]
    },
    configurations: [
        { code: "HYGL81513", desc: "1600*450*850 mm", price: 12960 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1600mm (Oil-wax color)", size: "1600*450*850 mm", price: 12960 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81519", 
    name: "Gabinete HYGL81519", 
    category: "Gabinete", 
    code: "HYGL81519/MGL8620", 
    priceBase: 12060, 
    image: "/images/GABINETES/GAB11/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB11/img1.jpg", 
        "/images/GABINETES/GAB11/img2.jpg",
        "/images/GABINETES/GAB11/img3.jpg"
    ],
    specs: { 
        dimensions: "1600 * 450 * 850 mm", 
        volume: "0.85 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Panel", material: "Vidrio (Glass)", detail: "Gris Carbón Mate (Matte Carbon Gray)" },
        { part: "Patas (Hardware foot)", material: "Aleación de aluminio", detail: "Space Gray" }
    ],
    colors: {
        body: [
            { name: "Oil-wax color", hex: "#2C2623" } 
        ]
    },
    configurations: [
        { code: "HYGL81519", desc: "1600*450*850 mm", price: 12060 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1600mm (Oil-wax color)", size: "1600*450*850 mm", price: 12060 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81512", 
    name: "Gabinete HYGL81512", 
    category: "Gabinete", 
    code: "HYGL81512/HBG1867Y", 
    priceBase: 12160, 
    image: "/images/GABINETES/GAB12/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB12/img1.jpg", 
        "/images/GABINETES/GAB12/img2.jpg",
        "/images/GABINETES/GAB12/img3.jpg"
    ],
    specs: { 
        dimensions: "1600 * 450 * 850 mm", 
        volume: "0.85 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Panel", material: "Vidrio (Glass)", detail: "Gris Carbón Mate (Matte Carbon Gray)" },
        { part: "Patas (Hardware foot)", material: "Aleación de aluminio", detail: "Space Gray" }
    ],
    colors: {
        body: [
            { name: "Oil-wax color", hex: "#2C2623" } 
        ]
    },
    configurations: [
        { code: "HYGL81512", desc: "1600*450*850 mm", price: 12160 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1600mm (Oil-wax color)", size: "1600*450*850 mm", price: 12160 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81514", 
    name: "Gabinete HYGL81514", 
    category: "Gabinete", 
    code: "HYGL81514/HBG1869Y", 
    priceBase: 12960, 
    image: "/images/GABINETES/GAB13/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB13/img1.jpg", 
        "/images/GABINETES/GAB13/img2.jpg",
        "/images/GABINETES/GAB13/img3.jpg"
    ],
    specs: { 
        dimensions: "1600 * 450 * 850 mm", 
        volume: "0.85 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Panel", material: "Vidrio (Glass)", detail: "Gris Carbón Mate (Matte Carbon Gray)" },
        { part: "Patas (Hardware foot)", material: "Aleación de aluminio", detail: "Space Gray" }
    ],
    colors: {
        body: [
            { name: "Oil-wax color", hex: "#2C2623" } 
        ]
    },
    configurations: [
        { code: "HYGL81514", desc: "1600*450*850 mm", price: 12960 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1600mm (Oil-wax color)", size: "1600*450*850 mm", price: 12960 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81511", 
    name: "Gabinete HYGL81511", 
    category: "Gabinete", 
    code: "HYGL81511/HBG1866Y", 
    priceBase: 12160, 
    image: "/images/GABINETES/GAB14/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB14/img1.jpg", 
        "/images/GABINETES/GAB14/img2.jpg",
        "/images/GABINETES/GAB14/img3.jpg"
    ],
    specs: { 
        dimensions: "1600 * 450 * 850 mm", 
        volume: "0.85 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Panel", material: "Vidrio (Glass)", detail: "Gris Carbón Mate (Matte Carbon Gray)" },
        { part: "Patas (Hardware foot)", material: "Aleación de aluminio", detail: "Space Gray" }
    ],
    colors: {
        body: [
            { name: "Oil-wax color", hex: "#2C2623" } 
        ]
    },
    configurations: [
        { code: "HYGL81511", desc: "1600*450*850 mm", price: 12160 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1600mm (Oil-wax color)", size: "1600*450*850 mm", price: 12160 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81510", 
    name: "Gabinete HYGL81510", 
    category: "Gabinete", 
    code: "HYGL81510/HBG1865Y", 
    priceBase: 12960, 
    image: "/images/GABINETES/GAB15/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB15/img1.jpg", 
        "/images/GABINETES/GAB15/img2.jpg",
        "/images/GABINETES/GAB15/img3.jpg"
    ],
    specs: { 
        dimensions: "1600 * 450 * 850 mm", 
        volume: "0.85 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Panel", material: "Vidrio (Glass)", detail: "Gris Carbón Mate (Matte Carbon Gray)" },
        { part: "Patas (Hardware foot)", material: "Aleación de aluminio", detail: "Space Gray" }
    ],
    colors: {
        body: [
            { name: "Oil-wax color", hex: "#2C2623" } 
        ]
    },
    configurations: [
        { code: "HYGL81510", desc: "1600*450*850 mm", price: 12960 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1600mm (Oil-wax color)", size: "1600*450*850 mm", price: 12960 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81509", 
    name: "Gabinete HYGL81509", 
    category: "Gabinete", 
    code: "HYGL81509/HBG1864Y", 
    priceBase: 12160, 
    image: "/images/GABINETES/GAB16/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB16/img1.jpg", 
        "/images/GABINETES/GAB16/img2.jpg",
        "/images/GABINETES/GAB16/img3.jpg"
    ],
    specs: { 
        dimensions: "1600 * 450 * 850 mm", 
        volume: "0.85 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Panel", material: "Vidrio (Glass)", detail: "Gris Carbón Mate (Matte Carbon Gray)" },
        { part: "Patas (Hardware foot)", material: "Aleación de aluminio", detail: "Space Gray" }
    ],
    colors: {
        body: [
            { name: "Oil-wax color", hex: "#2C2623" } 
        ]
    },
    configurations: [
        { code: "HYGL81509", desc: "1600*450*850 mm", price: 12160 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1600mm (Oil-wax color)", size: "1600*450*850 mm", price: 12160 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81508", 
    name: "Gabinete HYGL81508", 
    category: "Gabinete", 
    code: "HYGL81508/HBG1863Y", 
    priceBase: 12160, 
    image: "/images/GABINETES/GAB17/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB17/img1.jpg", 
        "/images/GABINETES/GAB17/img2.jpg",
        "/images/GABINETES/GAB17/img3.jpg"
    ],
    specs: { 
        dimensions: "1600 * 450 * 850 mm", 
        volume: "0.85 m³", 
        assembly: "Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Panel", material: "Vidrio (Glass)", detail: "Gris Carbón Mate (Matte Carbon Gray)" },
        { part: "Patas (Hardware foot)", material: "Aleación de aluminio", detail: "Space Gray" }
    ],
    colors: {
        body: [
            { name: "Oil-wax color", hex: "#2C2623" } 
        ]
    },
    configurations: [
        { code: "HYGL81508", desc: "1600*450*850 mm", price: 12160 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1600mm (Oil-wax color)", size: "1600*450*850 mm", price: 12160 }
    ],
    customInstructions: {
        material: "Not interchangeable",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81507-b", 
    name: "Gabinete HYGL81507-B", 
    category: "Gabinete", 
    code: "HYGL81507-B/HBG1862B", 
    priceBase: 20160, 
    image: "/images/GABINETES/GAB18/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB18/img1.jpg", 
        "/images/GABINETES/GAB18/img2.jpg",
        "/images/GABINETES/GAB18/img3.jpg"
    ],
    specs: { 
        dimensions: "2130 * 450 * 723 mm", 
        volume: "0.77 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Panel", material: "Losa de roca (Rock slab)", detail: "Calacatta White" },
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Color roble blanco (White oak color)" },
        { part: "Estructura de patas (Foot frame)", material: "Aleación de aluminio", detail: "Gunmetal cepillado (Brushed Gunmetal)" }
    ],
    colors: {
        stone: [
            { name: "Calacatta White", hex: "#EBEAE8" } 
        ]
    },
    configurations: [
        { code: "HYGL81507-B", desc: "2130*450*723 mm", price: 20160 }
    ],
    priceList: [
        { name: "Gabinete Lateral 2130mm (Calacatta White)", size: "2130*450*723 mm", price: 20160 }
    ],
    customInstructions: {
        material: "Interchangeable (Panel)",
        dimensions: "Not customizable"
    }
},
{ 
    id: "gabinete-lateral-hygl81503-b", 
    name: "Gabinete HYGL81503-B", 
    category: "Gabinete", 
    code: "HYGL81503/HBG1858Y", 
    priceBase: 15960, 
    image: "/images/GABINETES/GAB19/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB19/img1.jpg", 
        "/images/GABINETES/GAB19/img2.jpg",
        "/images/GABINETES/GAB19/img3.jpg"
    ],
    specs: { 
        dimensions: "2200 * 450 * 575 mm", 
        volume: "0.58 m³", 
        assembly: "Desmontado y Ensamblado / 3 Piezas" 
    },
    materials: [
        { part: "Panel", material: "Piedra sinterizada (Sintered stone)", detail: "Laurent Black Gold" },
        { part: "Panel interno", material: "MDF Grado E0", detail: "Color cera de aceite (Oil-wax color)" },
        { part: "Vidrio laminado", material: "Vidrio", detail: "Gris Carbón (Carbon Gray Glass)" },
        { part: "Estructura de patas", material: "Aleación de aluminio", detail: "Gunmetal cepillado (Brushed Gunmetal)" },
        { part: "Cuerpo del gabinete", material: "MDF Grado E0", detail: "Gris azulado oriental (Eastern Blue Gray)" }
    ],
    colors: {
        stone: [
            { name: "Laurent Black Gold", hex: "#2B2A29" } // Negro con vetas doradas/oxido
        ],
        body: [
            { name: "Eastern Blue Gray", hex: "#4A525A" } // Gris azulado profundo
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
    id: "gabinete-lateral-hygl81507-b-v2", 
    name: "Gabinete HYGL81507-A (v2)", 
    category: "Gabinete", 
    code: "HYGL81507-A/HBG1862A", 
    priceBase: 18060, 
    image: "/images/GABINETES/GAB20/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB20/img1.jpg", 
        "/images/GABINETES/GAB20/img2.jpg",
        "/images/GABINETES/GAB20/img3.jpg"
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
            { name: "Calacatta White", hex: "#EBEAE8" } 
        ],
        body: [
            { name: "White oak color", hex: "#D9C5B2" } // Tono madera clara natural
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
    id: "gabinete-lateral-hygl81515-b", 
    name: "Gabinete HYGL81515-B", 
    category: "Gabinete", 
    code: "HYGL81515", 
    priceBase: 13960, 
    image: "/images/GABINETES/GAB21/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB21/img1.jpg", 
        "/images/GABINETES/GAB21/img2.jpg",
        "/images/GABINETES/GAB21/img3.jpg"
    ],
    specs: { 
        dimensions: "1550 * 500 * 830 mm", 
        volume: "0.66 m³", 
        assembly: "Desmontado y Ensamblado / 1 Pieza" 
    },
    materials: [
        { part: "Cuerpo del gabinete (Cabinet body)", material: "MDF Grado E0", detail: "Hermès Orange (High gloss)" }
    ],
    colors: {
        body: [
            { name: "Hermès Orange", hex: "#E86C2C" } 
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