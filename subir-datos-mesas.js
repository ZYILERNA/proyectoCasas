// subir-mesas.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// NOTA: Para scripts de subida, es mejor usar la SERVICE_ROLE_KEY si tienes RLS activado.
// Si no tienes RLS (Row Level Security) activado, la ANON_KEY funcionará bien.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Faltan las variables de entorno en .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --------------------------------------------------------------------------------
// 1. DATOS COMPLETOS DE MESAS (1 al 47)
// --------------------------------------------------------------------------------

const tablesData = [
  // --- MESAS DE CENTRO Y AUXILIARES ---
  { 
    id: "mesa-hyjl82103", 
    name: "Mesa Moon Valley Series", 
    category: "Mesa de Centro", 
    code: "HYJL82103-B6", 
    priceBase: 9760, 
    image: "/images/MESAS/CENTRO/MESA1/render.jpg", 
    specs: { 
        dimensions: "1400 * 615 * 385 mm", 
        volume: "0.34 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Moon Valley (Acabado Aceite)" },
        { part: "Base", material: "Acero Inoxidable", detail: "Brushed Antique Bronze" },
        { part: "Detalle Hebilla", material: "Aleación Zinc", detail: "Mirror Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Moon Valley Marble", hex: "#635A52" } 
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Estándar (1400mm)", price: 9760 },
        { code: "LGE", desc: "Tamaño Grande (1600mm)", price: 11380 }
    ],
    priceList: [
        { name: "Mesa Estándar", size: "1400*615*385", price: 9760 },
        { name: "Mesa Grande (Opcional)", size: "1600*700*385", price: 11380 }
    ]
  },

  // PRODUCTO 2: MESA AUXILIAR (ANCIENT WOOD) [NUEVA]
  { 
    id: "mesa-auxiliar-ancient", 
    name: "Mesa Auxiliar Ancient Wood", 
    category: "Mesa Auxiliar", 
    code: "HYJL82103-C1", 
    priceBase: 5460, 
    // RECUERDA: Guardar la imagen aquí
    image: "/images/MESAS/AUXILIAR/MESA2/render.jpg", 
    specs: { 
        dimensions: "520 * 416 * 450 mm", 
        volume: "0.12 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Ancient Wood Grain (Brillo)" },
        { part: "Estructura", material: "Acero Inoxidable", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Ancient Wood Marble", hex: "#2A2A2A" } // Tono gris oscuro veteado
        ]
    },
    configurations: [
        { code: "STD", desc: "Un tamaño disponible", price: 5460 }
    ],
    priceList: [
        { name: "Mesa Auxiliar", size: "520*416*450", price: 5460 }
    ]
  },
  // PRODUCTO 3: MESA RINCÓN (ZILO RED)
  { 
    id: "mesa-rincon-zilo", 
    name: "Mesa Auxiliar Zilo Red", 
    category: "Mesa Auxiliar", 
    code: "HYJL82105-A1", 
    priceBase: 5790, 
    // RECUERDA: Guardar la imagen aquí
    image: "/images/MESAS/AUXILIAR/MESA3/render.jpg", 
    specs: { 
        dimensions: "Ø700 * 380 mm", 
        volume: "0.22 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Zilo Red (Acabado Aceite)" },
        { part: "Estructura", material: "Acero Inoxidable", detail: "Brushed Antique Bronze" }
    ],
    colors: {
        interior: [
            { name: "Zilo Red Marble", hex: "#59302D" } // Tono rojo oscuro/marrón según la muestra
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 700mm", price: 5790 }
    ],
    priceList: [
        { name: "Mesa Rincón Redonda", size: "Ø700*380", price: 5790 }
    ]
  },
 // PRODUCTO 4: MESA RINCÓN (SNOW WHITE)
  { 
    id: "mesa-rincon-snow", 
    name: "Mesa Auxiliar Snow White", 
    category: "Mesa Auxiliar", 
    code: "HYJL82105-B1", 
    priceBase: 5080, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA4/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA4/render.jpg", 
    specs: { 
        dimensions: "Ø450 * 480 mm", 
        volume: "0.14 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Snow White (Acabado Aceite)" },
        { part: "Estructura", material: "Acero Inoxidable", detail: "Brushed Antique Bronze" }
    ],
    colors: {
        interior: [
            { name: "Snow White Marble", hex: "#E5E5E5" } // Blanco con vetas grises
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 450mm", price: 5080 }
    ],
    priceList: [
        { name: "Mesa Rincón Alta", size: "Ø450*480", price: 5080 }
    ]
  },
  // PRODUCTO 5: SET MESA BRASILIA BLACK
  { 
    id: "set-mesa-brasilia", 
    name: "Set Centro Brasília Black", 
    category: "Sets Completos", 
    code: "HYJL82106-A2/B", 
    priceBase: 22870, // Precio combinado del Set (16390 + 6480)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA5/render.jpg
    image: "/images/MESAS/CENTRO/MESA5/render.jpg", 
    specs: { 
        dimensions: "1500*850*420 mm (Mesa) + 900*550*280 mm (Módulo)", 
        volume: "0.93 m³", 
        assembly: "Mixto (3 Piezas)" 
    },
    materials: [
        { part: "Sobre Mesa Alta", material: "Mármol Natural", detail: "Brasília Black (Superficie Cuero)" },
        { part: "Estructura Mesa", material: "Madera de Fresno", detail: "Color Oil-wax + Acero Gunmetal" },
        { part: "Módulo Bajo", material: "MDF Grado E0", detail: "Acabado Negro Oil-wax" }
    ],
    colors: {
        interior: [
            { name: "Brasília Black", hex: "#2B2B2B" } // Negro texturizado
        ]
    },
    configurations: [
        { code: "SET", desc: "Set Completo (A+B)", price: 22870 },
        { code: "Mesa", desc: "Solo Mesa Alta", price: 16390 },
        { code: "Módulo", desc: "Solo Módulo Bajo", price: 6480 }
    ],
    priceList: [
        { name: "Set Completo (Mesa + Módulo)", size: "Combinación", price: 22870 },
        { name: "Mesa Alta (Mármol/Fresno)", size: "1500*850*420", price: 16390 },
        { name: "Módulo Bajo (Almacenaje)", size: "900*550*280", price: 6480 }
    ]
  },
  // PRODUCTO 6: MESA DE CENTRO BRASILIA BLACK
  { 
    id: "mesa-centro-brasilia", 
    name: "Mesa Centro Brasília Black", 
    category: "Mesa de Centro", 
    code: "HYJL82107-A1", 
    priceBase: 20260, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA6/render.jpg
    image: "/images/MESAS/CENTRO/MESA6/render.jpg", 
    specs: { 
        dimensions: "1060 * 1060 * 300 mm", 
        volume: "0.47 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Brasília Black (Superficie Cuero)" },
        { part: "Placa Inferior", material: "Saddle Leather", detail: "Color PLMA0001" },
        { part: "Estructura", material: "Acero Inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Brasília Black", hex: "#2B2B2B" } // Negro con vetas claras
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único (1060mm)", price: 20260 }
    ],
    priceList: [
        { name: "Mesa de Centro Redonda", size: "1060*1060*300", price: 20260 }
    ]
  },
   // PRODUCTO 7: MESA CENTRO EMERALD CLOUDS
  { 
    id: "mesa-centro-emerald", 
    name: "Mesa Centro Emerald Clouds", 
    category: "Mesa de Centro", 
    code: "HYJL82107-B2", 
    priceBase: 13950, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA7/render.jpg
    image: "/images/MESAS/CENTRO/MESA7/render.jpg", 
    specs: { 
        dimensions: "970 * 760 * 400 mm", 
        volume: "0.38 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Emerald in the Clouds (Oil-bright)" },
        { part: "Placa Inferior", material: "Saddle Leather", detail: "Color PLMA0001" },
        { part: "Estructura", material: "Acero Inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Emerald Clouds", hex: "#7C827A" } // Tono gris verdoso veteado
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único (970mm)", price: 13950 }
    ],
    priceList: [
        { name: "Mesa Centro Ovalada", size: "970*760*400", price: 13950 }
    ]
  },
  // PRODUCTO 8: MESA AUXILIAR PRADA GREEN
  { 
    id: "mesa-auxiliar-prada", 
    name: "Mesa Auxiliar Prada Green", 
    category: "Mesa Auxiliar", 
    code: "HYJL82107-C1", 
    priceBase: 7690, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA8/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA8/render.jpg", 
    specs: { 
        dimensions: "520 * 537 * 500 mm", 
        volume: "0.20 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Prada Green (Oil-bright)" },
        { part: "Estructura", material: "Acero Inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Prada Green", hex: "#1B2821" } // Verde oscuro profundo
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único", price: 7690 }
    ],
    priceList: [
        { name: "Mesa Auxiliar Orgánica", size: "520*537*500", price: 7690 }
    ]
  },
  // PRODUCTO 9: MESA CENTRO SILVER SCULPTURE
  { 
    id: "mesa-centro-silver", 
    name: "Mesa Centro Silver Sculpture", 
    category: "Mesa de Centro", 
    code: "HYJL82108-A", 
    priceBase: 9980, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA9/render.jpg
    image: "/images/MESAS/CENTRO/MESA9/render.jpg", 
    specs: { 
        dimensions: "1400 * 750 * 360 mm", 
        volume: "0.51 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Cuerpo Principal", material: "Acero Inoxidable", detail: "Acabado Silver (Texturizado)" }
    ],
    colors: {
        interior: [
            { name: "Textured Silver", hex: "#C0C0C0" } // Plateado metálico
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único (1400mm)", price: 9980 }
    ],
    priceList: [
        { name: "Mesa Escultural Plateada", size: "1400*750*360", price: 9980 }
    ]
  },
  // PRODUCTO 10: MESA AUXILIAR SILVER SCULPTURE
  { 
    id: "mesa-auxiliar-silver", 
    name: "Mesa Auxiliar Silver Sculpture", 
    category: "Mesa Auxiliar", 
    code: "HYJL82108-B", 
    priceBase: 6160, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA10/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA10/render.jpg", 
    specs: { 
        dimensions: "520 * 500 * 475 mm", 
        volume: "0.18 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Cuerpo Principal", material: "Acero Inoxidable", detail: "Acabado Silver (Texturizado)" }
    ],
    colors: {
        interior: [
            { name: "Textured Silver", hex: "#C0C0C0" } 
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único", price: 6160 }
    ],
    priceList: [
        { name: "Mesa Auxiliar Escultural", size: "520*500*475", price: 6160 }
    ]
  },
  // PRODUCTO 11: MESA CENTRO MILKY WAY
  { 
    id: "mesa-centro-milky-way", 
    name: "Mesa Centro Milky Way Starry", 
    category: "Mesa de Centro", 
    code: "HYJL82109-A", 
    priceBase: 17460, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA11/render.jpg
    image: "/images/MESAS/CENTRO/MESA11/render.jpg", 
    specs: { 
        dimensions: "Ø1200 * 300 mm", 
        volume: "0.70 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Milky Way Starry Sky (Oil-matte)" },
        { part: "Base", material: "Acero Inox + Mármol", detail: "Brushed Gunmetal + Milky Way" }
    ],
    colors: {
        interior: [
            { name: "Milky Way Starry Sky", hex: "#1F1F1F" } // Negro profundo texturizado
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 1200mm", price: 17460 }
    ],
    priceList: [
        { name: "Mesa Centro Redonda", size: "Ø1200*300", price: 17460 }
    ]
  },
  // PRODUCTO 12: MESA CENTRO SNOW MOUNTAIN
  { 
    id: "mesa-centro-snow-mountain", 
    name: "Mesa Centro Snow Mountain", 
    category: "Mesa de Centro", 
    code: "HYJL82109-B1", 
    priceBase: 17580, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA12/render.jpg
    image: "/images/MESAS/CENTRO/MESA12/render.jpg", 
    specs: { 
        dimensions: "Ø920 * 350 mm", 
        volume: "0.46 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Snow Mountain Blue (Oil-bright)" },
        { part: "Base", material: "Acero Inox + Mármol", detail: "Brushed Gunmetal + Snow Mountain Blue" }
    ],
    colors: {
        interior: [
            { name: "Snow Mountain Blue", hex: "#DCDFE1" } // Blanco agrisado con vetas
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 920mm", price: 17580 }
    ],
    priceList: [
        { name: "Mesa Centro Redonda", size: "Ø920*350", price: 17580 }
    ]
  },
  // PRODUCTO 13: MESA AUXILIAR MILKY WAY
  { 
    id: "mesa-auxiliar-milky-way", 
    name: "Mesa Auxiliar Milky Way", 
    category: "Mesa Auxiliar", 
    code: "HYJL82109-C", 
    priceBase: 5250, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA13/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA13/render.jpg", 
    specs: { 
        dimensions: "Ø440 * 450 mm", 
        volume: "0.15 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Milky Way Starry Sky (Oil-matte)" },
        { part: "Base", material: "Acero Inox + Mármol", detail: "Brushed Gunmetal + Milky Way" }
    ],
    colors: {
        interior: [
            { name: "Milky Way Starry Sky", hex: "#1F1F1F" } // Negro profundo texturizado
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 440mm", price: 5250 }
    ],
    priceList: [
        { name: "Mesa Auxiliar Redonda", size: "Ø440*450", price: 5250 }
    ]
  },
  // PRODUCTO 14: MESA CENTRO SNOW WHITE RECTANGULAR
  { 
    id: "mesa-centro-snow-white-rect", 
    name: "Mesa Centro Snow White Rectangular", 
    category: "Mesa de Centro", 
    code: "HYJL82111-A", 
    priceBase: 14560, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA14/render.jpg
    image: "/images/MESAS/CENTRO/MESA14/render.jpg", 
    specs: { 
        dimensions: "1350 * 750 * 405 mm", 
        volume: "0.57 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Snow White (Oil-bright)" },
        { part: "Panel Lateral", material: "Saddle Leather", detail: "Color PLMA0001" },
        { part: "Estructura", material: "Acero Inoxidable", detail: "Brushed Gunmetal" },
        { part: "Base Inferior", material: "MDF Grado E0", detail: "Acabado Oil-wax" }
    ],
    colors: {
        interior: [
            { name: "Snow White Marble", hex: "#E5E5E5" } // Blanco con vetas suaves
        ]
    },
    configurations: [
        { code: "Mesa", desc: "Mesa Principal", price: 14560 },
        { code: "Cajón", desc: "Módulo Cajón Opcional", price: 2890 }
    ],
    priceList: [
        { name: "Mesa Centro Rectangular", size: "1350*750*405", price: 14560 },
        { name: "Módulo Cajonera (Opcional)", size: "600*748*160", price: 2890 }
    ]
  },
  // PRODUCTO 15: MESA CENTRO LAN KWAI FONG
  { 
    id: "mesa-centro-lan-kwai", 
    name: "Mesa Centro Lan Kwai Fong", 
    category: "Mesa de Centro", 
    code: "HYJL82112-A3", 
    priceBase: 13260, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA15/render.jpg
    image: "/images/MESAS/CENTRO/MESA15/render.jpg", 
    specs: { 
        dimensions: "1070 * 1080 * 330 mm", 
        volume: "0.39 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Lan Kwai Fong Cave (Matte)" },
        { part: "Patas", material: "Madera de Fresno", detail: "Acabado Oil-wax" },
        { part: "Detalles Base", material: "Acero Inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Lan Kwai Fong Cave", hex: "#BCAEA1" } // Tono piedra beige/taupe mate
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único", price: 13260 }
    ],
    priceList: [
        { name: "Mesa Centro Orgánica", size: "1070*1080*330", price: 13260 }
    ]
  },
  // PRODUCTO 16: MESA RINCÓN ANCIENT WOOD
  { 
    id: "mesa-rincon-ancient-wood", 
    name: "Mesa Auxiliar Ancient Wood", 
    category: "Mesa Auxiliar", 
    code: "HYJL82112-B1", 
    priceBase: 6160, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA16/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA16/render.jpg", 
    specs: { 
        dimensions: "620 * 620 * 430 mm", 
        volume: "0.17 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Ancient Wood Grain (Oil-bright)" },
        { part: "Patas", material: "Madera de Fresno", detail: "Acabado Oil-wax" },
        { part: "Detalles Base", material: "Acero Inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Ancient Wood Grain", hex: "#2A2A2A" } // Negro veteado brillo
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único", price: 6160 }
    ],
    priceList: [
        { name: "Mesa Rincón Triangular", size: "620*620*430", price: 6160 }
    ]
  },
  // PRODUCTO 17: SET MESA ANCIENT & ZILO
  { 
    id: "set-mesa-ancient-zilo", 
    name: "Set Centro Ancient & Zilo", 
    category: "Sets Completos", 
    code: "HYJL82119-A1/B2", 
    priceBase: 17930, // Precio combinado (11450 + 6480)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA17/render.jpg
    image: "/images/MESAS/CENTRO/MESA17/render.jpg", 
    specs: { 
        dimensions: "Ø1000*305 mm (Centro) + Ø520*455 mm (Auxiliar)", 
        volume: "0.80 m³", 
        assembly: "Desmontable / 4 Piezas" 
    },
    materials: [
        { part: "Mesa Centro", material: "Mármol Ancient Wood Grain", detail: "Acabado Genuine Bright" },
        { part: "Mesa Auxiliar", material: "Mármol Zilo Red", detail: "Acabado Oil-bright" },
        { part: "Estructura", material: "Acero Inoxidable", detail: "Brushed Antique Bronze" }
    ],
    colors: {
        interior: [
            { name: "Ancient Wood Grain", hex: "#2A2A2A" }, // Negro veteado
            { name: "Zilo Red", hex: "#59302D" }       // Rojizo oscuro
        ]
    },
    configurations: [
        { code: "SET", desc: "Set Completo (A1+B2)", price: 17930 },
        { code: "A1", desc: "Solo Mesa Centro", price: 11450 },
        { code: "B2", desc: "Solo Mesa Auxiliar", price: 6480 }
    ],
    priceList: [
        { name: "Set Completo", size: "Combinación", price: 17930 },
        { name: "Mesa Centro (Ancient Wood)", size: "Ø1000*305", price: 11450 },
        { name: "Mesa Auxiliar (Zilo Red)", size: "Ø520*455", price: 6480 }
    ]
  },
  // PRODUCTO 18: SET MESA ORGANIC BLACK
  { 
    id: "set-mesa-organic-black", 
    name: "Set Centro Organic Black", 
    category: "Sets Completos", 
    code: "HYJL82130A/B", 
    priceBase: 15320, // Precio combinado (10460 + 4860)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA18/render.jpg
    image: "/images/MESAS/CENTRO/MESA18/render.jpg", 
    specs: { 
        dimensions: "1655*875*200 mm (Base) + Ø600*320 mm (Alta)", 
        volume: "0.40 m³", 
        assembly: "Desmontable / 4 Piezas" 
    },
    materials: [
        { part: "Mesa Base (A)", material: "Fresno + Fibra Vidrio + MDF", detail: "Oil-wax + Metal Black" },
        { part: "Mesa Alta (B)", material: "Fresno + Fibra Vidrio", detail: "Oil-wax + Metal Black" }
    ],
    colors: {
        interior: [
            { name: "Metal Black Pattern", hex: "#1A1A1A" } // Negro texturizado
        ]
    },
    configurations: [
        { code: "SET", desc: "Set Completo (A+B)", price: 15320 },
        { code: "A", desc: "Mesa Base Irregular", price: 10460 },
        { code: "B", desc: "Mesa Satélite Redonda", price: 4860 }
    ],
    priceList: [
        { name: "Set Completo Escultural", size: "Combinación", price: 15320 },
        { name: "Mesa Base Irregular", size: "1655*875*200", price: 10460 },
        { name: "Mesa Satélite Redonda", size: "Ø600*320", price: 4860 }
    ]
  },
  // PRODUCTO 19: MESA AUXILIAR HUAYI RED
  { 
    id: "mesa-auxiliar-huayi-red", 
    name: "Mesa Auxiliar Huayi Red", 
    category: "Mesa Auxiliar", 
    code: "HYJL82131", 
    priceBase: 5190, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA19/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA19/render.jpg", 
    specs: { 
        dimensions: "Ø700 * 430 mm", 
        volume: "0.10 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre y Base", material: "MDF Grado E0", detail: "Huayi Red (Alto Brillo)" },
        { part: "Detalle Pie", material: "Acero Inoxidable", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Huayi Red Gloss", hex: "#7A3E3E" } // Rojo terracota brillo
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 700mm", price: 5190 }
    ],
    priceList: [
        { name: "Mesa Auxiliar Lacada", size: "Ø700*430", price: 5190 }
    ]
  },
  // PRODUCTO 20: SET MESA SPACE GRAY & HUAYI
  { 
    id: "set-mesa-space-gray-huayi", 
    name: "Set Centro Space Gray & Huayi", 
    category: "Sets Completos", 
    code: "HYJL82132-A/B", 
    priceBase: 20940, // Precio combinado (16980 + 3960)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA20/render.jpg
    image: "/images/MESAS/CENTRO/MESA20/render.jpg", 
    specs: { 
        dimensions: "1200*1200*230 mm (Mármol) + 1200*600*230 mm (Módulo)", 
        volume: "0.78 m³", 
        assembly: "Mixto (3 Piezas)" 
    },
    materials: [
        { part: "Mesa Principal (A)", material: "Mármol Italian Space Gray", detail: "Acabado Oil-matte + Gunmetal" },
        { part: "Módulo Lateral (B)", material: "MDF Grado E0", detail: "Huayi Red (Alto Brillo)" }
    ],
    colors: {
        interior: [
            { name: "Italian Space Gray", hex: "#4A4A4A" }, // Gris piedra oscuro
            { name: "Huayi Red Gloss", hex: "#7A3E3E" }     // Rojo terracota brillo
        ]
    },
    configurations: [
        { code: "SET", desc: "Set Completo (A+B)", price: 20940 },
        { code: "A", desc: "Mesa Mármol Cuadrada", price: 16980 },
        { code: "B", desc: "Módulo Lateral Rojo", price: 3960 }
    ],
    priceList: [
        { name: "Set Completo Arquitectónico", size: "Combinación", price: 20940 },
        { name: "Mesa Mármol (Space Gray)", size: "1200*1200*230", price: 16980 },
        { name: "Módulo Lateral (Huayi Red)", size: "1200*600*230", price: 3960 }
    ]
  },
  // PRODUCTO 21: SET MESA CALACATTA GRAY
  { 
    id: "set-mesa-calacatta-gray", 
    name: "Set Centro Calacatta Gray", 
    category: "Sets Completos", 
    code: "HYJL82133-A1/B1", 
    priceBase: 39340, // Precio combinado (23750 + 15590)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA21/render.jpg
    image: "/images/MESAS/CENTRO/MESA21/render.jpg", 
    specs: { 
        dimensions: "Ø1200*365 mm (A1) + Ø1000*340 mm (B1)", 
        volume: "1.33 m³", 
        assembly: "Desmontable / 7 Piezas" 
    },
    materials: [
        { part: "Mesa A1 (Vidrio/Mármol)", material: "Mármol Calacatta + Vidrio", detail: "European Gray Glass + Brushed Space Gold" },
        { part: "Mesa B1 (Mármol)", material: "Mármol Calacatta Gray", detail: "Acabado Oil-bright + Brushed Space Gold" },
        { part: "Estructura", material: "MDF Grado E0 + Acero", detail: "Acabado Oil-wax + Oro Espacial" }
    ],
    colors: {
        interior: [
            { name: "Calacatta Gray", hex: "#D4D4D4" }, // Gris claro veteado
            { name: "European Gray Glass", hex: "#808080" } // Gris medio transparente
        ]
    },
    configurations: [
        { code: "SET", desc: "Set Completo (A1+B1)", price: 39340 },
        { code: "A1", desc: "Mesa Grande (Vidrio/Mármol)", price: 23750 },
        { code: "B1", desc: "Mesa Baja (Mármol)", price: 15590 }
    ],
    priceList: [
        { name: "Set Completo Premium", size: "Combinación", price: 39340 },
        { name: "Mesa A1 (Vidrio/Mármol)", size: "Ø1200*365", price: 23750 },
        { name: "Mesa B1 (Mármol Completo)", size: "Ø1000*340", price: 15590 }
    ]
  },
  // PRODUCTO 22: SET MESA SPACE GRAY HEXAGONAL
  { 
    id: "set-mesa-space-gray-hex", 
    name: "Set Centro Space Gray Hex", 
    category: "Sets Completos", 
    code: "HYJL82135-A/B", 
    priceBase: 13180, // Precio combinado (7990 + 5190)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA22/render.jpg
    image: "/images/MESAS/CENTRO/MESA22/render.jpg", 
    specs: { 
        dimensions: "1190*950*320 mm (A) + 845*730*380 mm (B)", 
        volume: "0.57 m³", 
        assembly: "Desmontable / 4 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Italian Space Gray (Oil-matte)" },
        { part: "Base", material: "Acero Inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Italian Space Gray", hex: "#3E3E3E" } // Gris piedra oscuro mate
        ]
    },
    configurations: [
        { code: "SET", desc: "Set Completo (A+B)", price: 13180 },
        { code: "A", desc: "Mesa Grande Irregular", price: 7990 },
        { code: "B", desc: "Mesa Pequeña Irregular", price: 5190 }
    ],
    priceList: [
        { name: "Set Completo Hexagonal", size: "Combinación", price: 13180 },
        { name: "Mesa Grande (A)", size: "1190*950*320", price: 7990 },
        { name: "Mesa Pequeña (B)", size: "845*730*380", price: 5190 }
    ]
  },
  // PRODUCTO 23: MESA CENTRO GLASS & CAVE
  { 
    id: "mesa-centro-glass-cave", 
    name: "Mesa Centro Glass & Cave", 
    category: "Mesa de Centro", 
    code: "HYJL82150-A", 
    priceBase: 17460, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA23/render.jpg
    image: "/images/MESAS/CENTRO/MESA23/render.jpg", 
    specs: { 
        dimensions: "1400 * 750 * 350 mm", 
        volume: "0.50 m³", 
        assembly: "Desmontable / 3 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Vidrio Templado", detail: "Ultra-clear Glass" },
        { part: "Base Escultórica", material: "Mármol Natural", detail: "Lan Kwai Fong Cave (Matte)" }
    ],
    colors: {
        interior: [
            { name: "Lan Kwai Fong Cave", hex: "#BCAEA1" } // Tono piedra beige mate
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único (1400mm)", price: 17460 }
    ],
    priceList: [
        { name: "Mesa Centro Rectangular", size: "1400*750*350", price: 17460 }
    ]
  },
  // PRODUCTO 24: SET MESA SNOW & EMERALD
  { 
    id: "set-mesa-snow-emerald", 
    name: "Set Centro Snow & Emerald", 
    category: "Sets Completos", 
    code: "HYJL82151-A1/B1", 
    priceBase: 28730, // Precio combinado (18750 + 9980)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA24/render.jpg
    image: "/images/MESAS/CENTRO/MESA24/render.jpg", 
    specs: { 
        dimensions: "1208*800*460 mm (Alta) + 1060*580*300 mm (Baja)", 
        volume: "1.07 m³", 
        assembly: "Assembled / 2 Piezas" 
    },
    materials: [
        { part: "Mesa Alta (A1)", material: "Mármol Snow Mountain Blue", detail: "Oil-bright + Brushed Japanese Gold" },
        { part: "Mesa Baja (B1)", material: "Mármol Emerald Clouds", detail: "Oil-bright + Brushed Japanese Gold" },
        { part: "Estructura", material: "MDF Grado E0 + Acero", detail: "Acabado Oil-wax" }
    ],
    colors: {
        interior: [
            { name: "Snow Mountain Blue", hex: "#DCDFE1" }, // Blanco agrisado
            { name: "Emerald in the Clouds", hex: "#7C827A" } // Gris verdoso
        ]
    },
    configurations: [
        { code: "SET", desc: "Set Completo (A1+B1)", price: 28730 },
        { code: "A1", desc: "Mesa Alta (Snow Mountain)", price: 18750 },
        { code: "B1", desc: "Mesa Baja (Emerald)", price: 9980 }
    ],
    priceList: [
        { name: "Set Completo Orgánico", size: "Combinación", price: 28730 },
        { name: "Mesa Alta (A1)", size: "1208*800*460", price: 18750 },
        { name: "Mesa Baja (B1)", size: "1060*580*300", price: 9980 }
    ]
  },
  // PRODUCTO 25: SET MESA EMERALD & OLIVE
  { 
    id: "set-mesa-emerald-olive", 
    name: "Set Centro Emerald & Olive", 
    category: "Sets Completos", 
    code: "HYJL82152-3A/B", 
    priceBase: 18510, // Precio combinado (13650 + 4860)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA25/render.jpg
    image: "/images/MESAS/CENTRO/MESA25/render.jpg", 
    specs: { 
        dimensions: "1000*1000*250 mm (A) + Ø800*380 mm (B)", 
        volume: "0.95 m³", 
        assembly: "Desmontable / 4 Piezas" 
    },
    materials: [
        { part: "Mesa A (Cuadrada)", material: "Mármol Emerald in the Clouds", detail: "Oil-bright + Oil-wax Wood" },
        { part: "Mesa B (Redonda)", material: "MDF Grado E0", detail: "Olive Gray (High Gloss)" }
    ],
    colors: {
        interior: [
            { name: "Emerald Clouds", hex: "#7C827A" }, // Verde grisáceo
            { name: "Olive Gray Gloss", hex: "#5F6059" } // Gris oliva oscuro
        ]
    },
    configurations: [
        { code: "SET S", desc: "Set Pequeño (1000+800)", price: 18510 },
        { code: "SET L", desc: "Set Grande (1200+1000)", price: 20840 },
        { code: "A-100", desc: "Mesa A (1000mm)", price: 13650 },
        { code: "B-800", desc: "Mesa B (Ø800mm)", price: 4860 }
    ],
    priceList: [
        { name: "Set Pequeño (A+B)", size: "1000+800mm", price: 18510 },
        { name: "Set Grande (A+B)", size: "1200+1000mm", price: 20840 },
        { name: "Mesa A (Mármol)", size: "1000*1000*250", price: 13650 },
        { name: "Mesa A (Mármol)", size: "1200*1200*250", price: 15750 },
        { name: "Mesa B (Lacada)", size: "Ø800*380", price: 4860 },
        { name: "Mesa B (Lacada)", size: "Ø1000*380", price: 5090 }
    ]
  },
  // PRODUCTO 26: SET MESA VERONA & EMERALD MULTI
  { 
    id: "set-mesa-verona-emerald", 
    name: "Set Centro Verona & Emerald", 
    category: "Sets Completos", 
    code: "HYJL82153-Set", 
    priceBase: 20040, // Precio combinado (4380 + 6650 + 6350 + 2660)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA26/render.jpg
    image: "/images/MESAS/CENTRO/MESA26/render.jpg", 
    specs: { 
        dimensions: "Combinación Modular (4 Piezas)", 
        volume: "0.89 m³", 
        assembly: "Mixto (9 Piezas Total)" 
    },
    materials: [
        { part: "Mesa A1", material: "Mármol + MDF", detail: "Verona Green (Matte) + Emerald (Bright)" },
        { part: "Mesa B1", material: "Mármol + MDF", detail: "Emerald (Bright) + Metal Black" },
        { part: "Mesa C1", material: "Mármol + MDF", detail: "Bordeaux Red (Bright) + Haoyue Gray" },
        { part: "Mesa D", material: "MDF Grado E0", detail: "Random-pattern Metal Black" }
    ],
    colors: {
        interior: [
            { name: "Emerald Clouds", hex: "#7C827A" }, // Gris verdoso
            { name: "Bordeaux Red", hex: "#4A1A1C" },   // Rojo vino
            { name: "Verona Green", hex: "#2E4634" },   // Verde oscuro mate
            { name: "Metal Black", hex: "#1F1F1F" }      // Negro texturizado
        ]
    },
    configurations: [
        { code: "SET", desc: "Set Completo (4 Piezas)", price: 20040 },
        { code: "A1", desc: "Módulo A1 (Verona/Emerald)", price: 4380 },
        { code: "B1", desc: "Módulo B1 (Emerald/Black)", price: 6650 },
        { code: "C1", desc: "Mesa Redonda C1 (Bordeaux)", price: 6350 },
        { code: "D", desc: "Bloque Bajo D (Black)", price: 2660 }
    ],
    priceList: [
        { name: "Set Completo 4 Módulos", size: "Combinación", price: 20040 },
        { name: "Módulo A1 (Verona/Emerald)", size: "1400*500*300", price: 4380 },
        { name: "Módulo B1 (Emerald/Black)", size: "1400*500*300", price: 6650 },
        { name: "Mesa Redonda C1 (Bordeaux)", size: "Ø800*350", price: 6350 },
        { name: "Bloque Bajo D (Metal Black)", size: "1000*300*400", price: 2660 }
    ]
  },
  // PRODUCTO 27: MESA CENTRO MILKY WAY & GOLD
  { 
    id: "mesa-centro-milky-way-gold", 
    name: "Mesa Centro Milky Way Gold", 
    category: "Mesa de Centro", 
    code: "HYJL82156-A1", 
    priceBase: 14690, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/CENTRO/MESA27/render.jpg
    image: "/images/MESAS/CENTRO/MESA27/render.jpg", 
    specs: { 
        dimensions: "Ø1000 * 385 mm", 
        volume: "0.85 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Milky Way Starry Sky (Oil-bright)" },
        { part: "Esfera Base", material: "Mármol Natural", detail: "Black & White Root (Genuine Bright)" },
        { part: "Estructura", material: "Acero Inoxidable", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Milky Way Starry Sky", hex: "#1F1F1F" } // Negro profundo con textura
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 1000mm", price: 14690 }
    ],
    priceList: [
        { name: "Mesa Escultural Gold", size: "Ø1000*385", price: 14690 }
    ]
  },
  // PRODUCTO 28: MESA AUXILIAR SNOW WHITE RECT
  { 
    id: "mesa-auxiliar-snow-rect", 
    name: "Mesa Auxiliar Snow White Rect", 
    category: "Mesa Auxiliar", 
    code: "HYJL82201", 
    priceBase: 10450, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA28/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA28/render.jpg", 
    specs: { 
        dimensions: "985 * 310 * 455 mm", 
        volume: "0.20 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Snow White (Oil-bright)" },
        { part: "Panel Envolvente", material: "Saddle Leather", detail: "Color GLMA0001" },
        { part: "Placa Soporte", material: "Acero Inoxidable", detail: "Brushed Gunmetal" },
        { part: "Base Inferior", material: "MDF Grado E0", detail: "Acabado Oil-wax" }
    ],
    colors: {
        interior: [
            { name: "Snow White Marble", hex: "#E5E5E5" } // Blanco con vetas suaves
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único", price: 10450 }
    ],
    priceList: [
        { name: "Mesa Auxiliar Rectangular", size: "985*310*455", price: 10450 }
    ]
  },
  // PRODUCTO 29: MESA AUXILIAR C-SHAPE GUNMETAL
  { 
    id: "mesa-auxiliar-c-shape-gunmetal", 
    name: "Mesa Auxiliar C-Shape Gunmetal", 
    category: "Mesa Auxiliar", 
    code: "HYJL82202", 
    priceBase: 6150, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA29/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA29/render.jpg", 
    specs: { 
        dimensions: "540 * 400 * 500 mm", 
        volume: "0.17 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Estructura Principal", material: "Acero Inoxidable", detail: "Brushed Gunmetal" },
        { part: "Panel Lateral", material: "Saddle Leather", detail: "Color GLMA0011 (Camel)" }
    ],
    colors: {
        interior: [
            { name: "Brushed Gunmetal", hex: "#4A4A4A" }, // Gris oscuro metálico
            { name: "Saddle Leather Camel", hex: "#C48A58" } // Tono cuero marrón claro (visual)
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único", price: 6150 }
    ],
    priceList: [
        { name: "Mesa Auxiliar C-Shape", size: "540*400*500", price: 6150 }
    ]
  },
  // PRODUCTO 30: MESA RINCÓN SPACE GOLD
  { 
    id: "mesa-rincon-space-gold", 
    name: "Mesa Rincón Space Gold", 
    category: "Mesa Auxiliar", 
    code: "HYJL82302-B", 
    priceBase: 7560, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA30/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA30/render.jpg", 
    specs: { 
        dimensions: "Ø580 * 330 mm", 
        volume: "0.12 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Acero Inoxidable", detail: "Brushed Space Gold" },
        { part: "Base", material: "MDF Grado E0", detail: "Acabado Oil-wax (Madera Oscura)" },
        { part: "Detalles Pie", material: "Acero Inoxidable", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Brushed Space Gold", hex: "#B49B68" }, // Dorado mate suave
            { name: "Dark Wood", hex: "#2C2C2C" }           // Madera oscura/negra
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 580mm", price: 7560 }
    ],
    priceList: [
        { name: "Mesa Rincón Baja", size: "Ø580*330", price: 7560 }
    ]
  },
  // PRODUCTO 31: MESA RINCÓN CALACATTA GOLD
  { 
    id: "mesa-rincon-calacatta-gold", 
    name: "Mesa Rincón Calacatta Gold", 
    category: "Mesa Auxiliar", 
    code: "HYJL82302-A1", 
    priceBase: 12790, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA31/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA31/render.jpg", 
    specs: { 
        dimensions: "Ø700 * 420 mm", 
        volume: "0.28 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Imported Calacatta Gray (Oil-matte)" },
        { part: "Base", material: "MDF Grado E0", detail: "Acabado Oil-wax (Madera Oscura)" },
        { part: "Detalles Pie", material: "Acero Inoxidable", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Calacatta Gray", hex: "#D4D4D4" }, // Gris claro veteado mate
            { name: "Brushed Space Gold", hex: "#B49B68" } // Dorado mate suave
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 700mm", price: 12790 }
    ],
    priceList: [
        { name: "Mesa Rincón Mármol", size: "Ø700*420", price: 12790 }
    ]
  },
  // PRODUCTO 32: MESA RINCÓN GOLD & CAVE
  { 
    id: "mesa-rincon-gold-cave", 
    name: "Mesa Rincón Gold & Cave", 
    category: "Mesa Auxiliar", 
    code: "HYJL82303-C", 
    priceBase: 6950, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA32/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA32/render.jpg", 
    specs: { 
        dimensions: "365 * 350 * 460 mm", 
        volume: "0.10 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Acero Inoxidable", detail: "Brushed Space Gold" },
        { part: "Base Cilíndrica", material: "Mármol Natural", detail: "Lan Kwai Fong Cave (Matte)" }
    ],
    colors: {
        interior: [
            { name: "Brushed Space Gold", hex: "#B49B68" }, // Dorado mate suave
            { name: "Lan Kwai Fong Cave", hex: "#BCAEA1" } // Piedra beige mate
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único", price: 6950 }
    ],
    priceList: [
        { name: "Mesa Escultural Pequeña", size: "365*350*460", price: 6950 }
    ]
  },
  // PRODUCTO 33: MESA AUXILIAR C-SHAPE GOLD
  { 
    id: "mesa-auxiliar-c-shape-gold", 
    name: "Mesa Auxiliar C-Shape Gold", 
    category: "Mesa Auxiliar", 
    code: "HYJL82307", 
    priceBase: 4390, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA33/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA33/render.jpg", 
    specs: { 
        dimensions: "370 * 350 * 610 mm", 
        volume: "0.12 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Cuerpo Principal", material: "Acero Inoxidable", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Brushed Space Gold", hex: "#B49B68" } // Dorado mate suave
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único", price: 4390 }
    ],
    priceList: [
        { name: "Mesa Auxiliar C-Shape", size: "370*350*610", price: 4390 }
    ]
  },
  // PRODUCTO 34: MESA RINCÓN PLATINUM DIAMOND
  { 
    id: "mesa-rincon-platinum-diamond", 
    name: "Mesa Rincón Platinum Diamond", 
    category: "Mesa Auxiliar", 
    code: "HYJL82308-A1", 
    priceBase: 5450, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA34/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA34/render.jpg", 
    specs: { 
        dimensions: "Ø500 * 540 mm", 
        volume: "0.16 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Platinum Diamond (Oil-bright)" },
        { part: "Base Central", material: "Acero Inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Platinum Diamond", hex: "#8A8A8A" }, // Gris medio texturizado
            { name: "Brushed Gunmetal", hex: "#4A4A4A" }  // Gris oscuro metálico
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 500mm", price: 5450 }
    ],
    priceList: [
        { name: "Mesa Rincón Pedestal", size: "Ø500*540", price: 5450 }
    ]
  },
  // PRODUCTO 35: MESA RINCÓN HUAYI RED FIBERGLASS
  { 
    id: "mesa-rincon-huayi-red-fiberglass", 
    name: "Mesa Rincón Huayi Red Fiberglass", 
    category: "Mesa Auxiliar", 
    code: "HYJL82317", 
    priceBase: 3790, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA35/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA35/render.jpg", 
    specs: { 
        dimensions: "Ø380 * 440 mm", 
        volume: "0.11 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Cuerpo Principal", material: "Fibra de Vidrio (Fiberglass)", detail: "Huayi Red (High Gloss)" },
        { part: "Superficie Superior", material: "Eco-leather", detail: "Color PLST0003 (Dark)" }
    ],
    colors: {
        interior: [
            { name: "Huayi Red Gloss", hex: "#7A3E3E" }, // Rojo terracota brillo
            { name: "Eco-leather Dark", hex: "#2C2C2C" } // Cuero oscuro tapa
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 380mm", price: 3790 }
    ],
    priceList: [
        { name: "Mesa Auxiliar / Taburete", size: "Ø380*440", price: 3790 }
    ]
  },
  
  // PRODUCTO 36: MESA RINCÓN PRADA & GLASS
  { 
    id: "mesa-rincon-prada-glass-gold", 
    name: "Mesa Rincón Prada & Glass", 
    category: "Mesa Auxiliar", 
    code: "HYJL82318", 
    priceBase: 9390, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA36/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA36/render.jpg", 
    specs: { 
        dimensions: "750 * 380 * 520 mm", 
        volume: "0.21 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Sobre Superior", material: "Vidrio Templado", detail: "European Gray Glass" },
        { part: "Sobre Inferior y Base", material: "Mármol Natural", detail: "Prada Green (Oil-bright)" },
        { part: "Pilar Superior", material: "Madera de Fresno", detail: "Acabado Oil-wax" },
        { part: "Estructura Base", material: "Acero Inoxidable", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Prada Green", hex: "#1B2821" },      // Verde oscuro veteado
            { name: "European Gray Glass", hex: "#808080" }, // Gris transparente
            { name: "Brushed Japanese Gold", hex: "#B49B68" } // Dorado mate
        ]
    },
    configurations: [
        { code: "STD", desc: "Doble Nivel (750x380)", price: 9390 }
    ],
    priceList: [
        { name: "Mesa Auxiliar Doble Nivel", size: "750*380*520", price: 9390 }
    ]
  },
  // PRODUCTO 37: MESA RINCÓN EMERALD & GOLD
  { 
    id: "mesa-rincon-emerald-gold", 
    name: "Mesa Rincón Emerald Gold", 
    category: "Mesa Auxiliar", 
    code: "HYJL82319-A", 
    priceBase: 4550, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA37/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA37/render.jpg", 
    specs: { 
        dimensions: "Ø450 * 500 mm", 
        volume: "0.14 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Emerald in the Clouds (Oil-bright)" },
        { part: "Estructura Base", material: "Acero Inoxidable", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Emerald Clouds", hex: "#7C827A" },    // Verde grisáceo veteado
            { name: "Brushed Japanese Gold", hex: "#B49B68" } // Dorado mate suave
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 450mm", price: 4550 }
    ],
    priceList: [
        { name: "Mesa Rincón Diseño", size: "Ø450*500", price: 4550 }
    ]
  },
  // PRODUCTO 38: MESA RINCÓN PRADA ARCH
  { 
    id: "mesa-rincon-prada-arch", 
    name: "Mesa Rincón Prada Arch", 
    category: "Mesa Auxiliar", 
    code: "HYJL82320", 
    priceBase: 7280, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA38/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA38/render.jpg", 
    specs: { 
        dimensions: "Ø600 * 435 mm", 
        volume: "0.20 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Prada Green (Oil-bright)" },
        { part: "Estructura Arco", material: "Acero Inoxidable", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Prada Green", hex: "#1B2821" },       // Verde oscuro profundo
            { name: "Brushed Japanese Gold", hex: "#B49B68" } // Dorado mate suave
        ]
    },
    configurations: [
        { code: "STD", desc: "Diámetro 600mm", price: 7280 }
    ],
    priceList: [
        { name: "Mesa Rincón Arquitectónica", size: "Ø600*435", price: 7280 }
    ]
  },
  // PRODUCTO 39: MESA RINCÓN BURL & CALACATTA
  { 
    id: "mesa-rincon-burl-calacatta", 
    name: "Mesa Rincón Burl & Calacatta", 
    category: "Mesa Auxiliar", 
    code: "HYJL82321-A", 
    priceBase: 5890, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/AUXILIAR/MESA39/render.jpg
    image: "/images/MESAS/AUXILIAR/MESA39/render.jpg", 
    specs: { 
        dimensions: "390 * 320 * 520 mm", 
        volume: "0.11 m³", 
        assembly: "Assembled / 1 Piece" 
    },
    materials: [
        { part: "Cuerpo Principal", material: "MDF Grado E0", detail: "Oval Tree Burl (Matte)" },
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Imported Calacatta Gray (Oil-bright)" },
        { part: "Detalle Base", material: "Acero Inoxidable", detail: "Brushed Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Oval Tree Burl", hex: "#654321" },   // Marrón madera raíz oscuro
            { name: "Calacatta Gray", hex: "#D4D4D4" },   // Gris claro veteado
            { name: "Brushed Japanese Gold", hex: "#B49B68" } // Dorado mate suave
        ]
    },
    configurations: [
        { code: "STD", desc: "Tamaño Único", price: 5890 }
    ],
    priceList: [
        { name: "Mesa Rincón Madera Burl", size: "390*320*520", price: 5890 }
    ]
  },
  // PRODUCTO 40: MESA COMEDOR WYNDHAM GRAY
  { 
    id: "mesa-comedor-wyndham-gray", 
    name: "Mesa Comedor Wyndham Gray", 
    category: "Mesa de Comedor", 
    code: "HYTL86101", 
    priceBase: 25450, // Precio de la medida referencia (2100mm)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/COMEDOR/MESA40/render.jpg
    image: "/images/MESAS/COMEDOR/MESA40/render.jpg", 
    specs: { 
        dimensions: "2100 * 1000 * 750 mm", 
        volume: "0.82 m³", 
        assembly: "Desmontable / 3 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Wyndham Gray (Oil-bright)" },
        { part: "Estructura", material: "Madera de Fresno", detail: "Acabado Oil-wax" },
        { part: "Zócalo Patas", material: "Acero Inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Wyndham Gray", hex: "#4A4A4A" },    // Gris oscuro veteado
            { name: "Calacatta Gray", hex: "#D4D4D4" },  // Gris claro
            { name: "Zilo Red", hex: "#8B4513" }          // Rojo/Marrón
        ]
    },
    configurations: [
        { code: "1800", desc: "Largo 1800mm", price: 23660 },
        { code: "2100", desc: "Largo 2100mm", price: 25450 },
        { code: "2400", desc: "Largo 2400mm", price: 29260 },
        { code: "2600", desc: "Largo 2600mm", price: 32450 }
    ],
    priceList: [
        // Variantes Wyndham Gray
        { name: "Mesa 1800 (Wyndham)", size: "1800*900*750", price: 23660 },
        { name: "Mesa 2100 (Wyndham)", size: "2100*1000*750", price: 25450 },
        { name: "Mesa 2400 (Wyndham)", size: "2400*1100*750", price: 29260 },
        { name: "Mesa 2600 (Wyndham)", size: "2600*1100*750", price: 32450 },
        // Variantes Calacatta Gray
        { name: "Mesa 1800 (Calacatta)", size: "1800*900*750", price: 25380 },
        { name: "Mesa 2100 (Calacatta)", size: "2100*1000*750", price: 27590 },
        { name: "Mesa 2400 (Calacatta)", size: "2400*1100*750", price: 32050 },
        { name: "Mesa 2600 (Calacatta)", size: "2600*1100*750", price: 35290 },
        // Variantes Zilo Red
        { name: "Mesa 1800 (Zilo Red)", size: "1800*900*750", price: 22250 },
        { name: "Mesa 2100 (Zilo Red)", size: "2100*1000*750", price: 23390 },
        { name: "Mesa 2400 (Zilo Red)", size: "2400*1100*750", price: 26880 },
        { name: "Mesa 2600 (Zilo Red)", size: "2600*1100*750", price: 29850 }
    ]
  },
  // PRODUCTO 41: MESA COMEDOR REDONDA ZILO & WOOD
  { 
    id: "mesa-comedor-redonda-zilo", 
    name: "Mesa Comedor Redonda Zilo", 
    category: "Mesa de Comedor", 
    code: "HYTL86102-B", 
    priceBase: 28190, // Precio medida referencia (Ø1530mm)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/COMEDOR/MESA41/render.jpg
    image: "/images/MESAS/COMEDOR/MESA41/render.jpg", 
    specs: { 
        dimensions: "Ø1530 * 760 mm (Mesa) + Ø920 mm (Giratorio)", 
        volume: "1.24 m³", 
        assembly: "Desmontable / 3 Piezas" 
    },
    materials: [
        { part: "Sobre Principal", material: "MDF Grado E0", detail: "Acabado Oil-wax (Madera Oscura)" },
        { part: "Plato Giratorio y Pie", material: "Mármol Natural", detail: "Zilo Red (Oil-bright)" },
        { part: "Estructura Base", material: "Acero Inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Zilo Red Marble", hex: "#8B4513" },      // Rojo/Marrón veteado
            { name: "Calacatta Gray", hex: "#D4D4D4" },       // Gris claro mate
            { name: "French Red", hex: "#A52A2A" },           // Rojo intenso
            { name: "Ancient Wood Grain", hex: "#2F2F2F" }    // Piedra negra veteada
        ]
    },
    configurations: [
        { code: "1380", desc: "Diámetro 1380mm", price: 27260 },
        { code: "1530", desc: "Diámetro 1530mm", price: 28190 },
        { code: "1800", desc: "Diámetro 1800mm", price: 31080 }
    ],
    priceList: [
        // Variantes Zilo Red / Ancient Wood Grain (Mismo precio)
        { name: "Mesa Ø1380 (Zilo/Ancient)", size: "Ø1380*760", price: 27260 },
        { name: "Mesa Ø1530 (Zilo/Ancient)", size: "Ø1530*760", price: 28190 },
        { name: "Mesa Ø1800 (Zilo/Ancient)", size: "Ø1800*760", price: 31080 },
        // Variantes Calacatta Gray
        { name: "Mesa Ø1380 (Calacatta)", size: "Ø1380*760", price: 29960 },
        { name: "Mesa Ø1530 (Calacatta)", size: "Ø1530*760", price: 31260 },
        { name: "Mesa Ø1800 (Calacatta)", size: "Ø1800*760", price: 34760 },
        // Variantes French Red
        { name: "Mesa Ø1380 (French Red)", size: "Ø1380*760", price: 28550 },
        { name: "Mesa Ø1530 (French Red)", size: "Ø1530*760", price: 29590 },
        { name: "Mesa Ø1800 (French Red)", size: "Ø1800*760", price: 32760 }
    ]
  },
  // PRODUCTO 42: MESA COMEDOR MOON VALLEY BRONZE
  { 
    id: "mesa-comedor-moon-valley-bronze", 
    name: "Mesa Comedor Moon Valley Bronze", 
    category: "Mesa de Comedor", 
    code: "HYTL86105-B", 
    priceBase: 25550, 
    // RECUERDA: Guardar imagen en: /public/images/MESAS/COMEDOR/MESA42/render.jpg
    image: "/images/MESAS/COMEDOR/MESA42/render.jpg", 
    specs: { 
        dimensions: "2100 * 1000 * 750 mm", 
        volume: "0.81 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Moon Valley (Oil-bright)" },
        { part: "Patas Laterales", material: "Acero Inoxidable", detail: "Brushed Antique Bronze" },
        { part: "Detalles Unión", material: "Acero Inoxidable", detail: "Mirror Steel Japanese Gold" }
    ],
    colors: {
        interior: [
            { name: "Moon Valley", hex: "#8D7864" },          // Marrón bronce veteado
            { name: "Snow Mountain Blue", hex: "#DCDFE1" },    // Blanco agrisado
            { name: "Platinum Diamond", hex: "#8A8A8A" },      // Gris medio
            { name: "Emerald in the Clouds", hex: "#7C827A" }  // Verde grisáceo
        ]
    },
    configurations: [
        { code: "2100", desc: "Largo 2100mm", price: 25550 }
    ],
    priceList: [
        { name: "Mesa Comedor Bronze Base", size: "2100*1000*750", price: 25550 }
    ]
  },
  // PRODUCTO 43: MESA COMEDOR ITALIAN SPACE GRAY
  { 
    id: "mesa-comedor-italian-space-gray", 
    name: "Mesa Comedor Italian Space Gray", 
    category: "Mesa de Comedor", 
    code: "HYTL86108-A", 
    priceBase: 24450, // Precio medida referencia (2100mm en Italian Space Gray)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/COMEDOR/MESA43/render.jpg
    image: "/images/MESAS/COMEDOR/MESA43/render.jpg", 
    specs: { 
        dimensions: "2100 * 1000 * 750 mm", 
        volume: "0.77 m³", 
        assembly: "Desmontable / 3 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Italian Space Gray (Oil-matte)" },
        { part: "Estructura Patas", material: "Madera de Fresno", detail: "Acabado Oil-wax (Negro)" },
        { part: "Detalle Zócalo", material: "Acero Inoxidable", detail: "Brushed Space Gold" }
    ],
    colors: {
        interior: [
            { name: "Italian Space Gray", hex: "#555555" },     // Gris medio mate
            { name: "Snow White", hex: "#E5E5E5" },             // Blanco mate
            { name: "Milky Way Starry Sky", hex: "#1A1A1A" },   // Negro con vetas
            { name: "Wyndham Gray", hex: "#4A4A4A" }            // Gris oscuro veteado
        ]
    },
    configurations: [
        { code: "1600", desc: "Largo 1600mm", price: 20950 },
        { code: "1800", desc: "Largo 1800mm", price: 21650 },
        { code: "2100", desc: "Largo 2100mm", price: 24450 },
        { code: "2400", desc: "Largo 2400mm", price: 26880 },
        { code: "2600", desc: "Largo 2600mm", price: 29750 },
        { code: "2800", desc: "Largo 2800mm", price: 33560 }
    ],
    priceList: [
        // Variantes Italian Space Gray / Milky Way Starry Sky (Mismo precio)
        { name: "Mesa 1600 (Space/Milky)", size: "1600*900*750", price: 20950 },
        { name: "Mesa 1800 (Space/Milky)", size: "1800*900*750", price: 21650 },
        { name: "Mesa 2100 (Space/Milky)", size: "2100*1000*750", price: 24450 },
        { name: "Mesa 2400 (Space/Milky)", size: "2400*1000*750", price: 26880 },
        { name: "Mesa 2600 (Space/Milky)", size: "2600*1100*750", price: 29750 },
        { name: "Mesa 2800 (Space/Milky)", size: "2800*1100*750", price: 33560 },
        // Variantes Snow White (Premium)
        { name: "Mesa 1600 (Snow White)", size: "1600*900*750", price: 22590 },
        { name: "Mesa 1800 (Snow White)", size: "1800*900*750", price: 23650 },
        { name: "Mesa 2100 (Snow White)", size: "2100*1000*750", price: 26890 },
        { name: "Mesa 2400 (Snow White)", size: "2400*1000*750", price: 29690 },
        { name: "Mesa 2600 (Snow White)", size: "2600*1100*750", price: 33090 },
        { name: "Mesa 2800 (Snow White)", size: "2800*1100*750", price: 37280 },
        // Variantes Wyndham Gray (Opción más económica)
        { name: "Mesa 1600 (Wyndham)", size: "1600*900*750", price: 19450 },
        { name: "Mesa 1800 (Wyndham)", size: "1800*900*750", price: 19890 },
        { name: "Mesa 2100 (Wyndham)", size: "2100*1000*750", price: 22250 },
        { name: "Mesa 2400 (Wyndham)", size: "2400*1000*750", price: 24360 },
        { name: "Mesa 2600 (Wyndham)", size: "2600*1100*750", price: 26780 },
        { name: "Mesa 2800 (Wyndham)", size: "2800*1100*750", price: 30290 }
    ]
  },
  // PRODUCTO 44: MESA COMEDOR PLATINUM SCULPTURAL
  { 
    id: "mesa-comedor-platinum-sculptural", 
    name: "Mesa Comedor Platinum Sculptural", 
    category: "Mesa de Comedor", 
    code: "HYTL86111-A", 
    priceBase: 40560, // Precio medida referencia (2100mm en Platinum Diamond)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/COMEDOR/MESA44/render.jpg
    image: "/images/MESAS/COMEDOR/MESA44/render.jpg", 
    specs: { 
        dimensions: "2100 * 1000 * 750 mm", 
        volume: "0.91 m³", 
        assembly: "Desmontable / 4 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Platinum Diamond (Oil-bright)" },
        { part: "Estructura Patas", material: "Acero Inoxidable", detail: "Brushed Gunmetal (Escultórico)" }
    ],
    colors: {
        interior: [
            { name: "Platinum Diamond", hex: "#8A8A8A" },       // Gris texturizado
            { name: "Prada Green", hex: "#1B2821" },           // Verde oscuro lujo
            { name: "Snow White", hex: "#E5E5E5" },            // Blanco puro
            { name: "Milky Way Starry Sky", hex: "#1A1A1A" }   // Negro profundo
        ]
    },
    configurations: [
        { code: "1600", desc: "Largo 1600mm", price: 36350 },
        { code: "1800", desc: "Largo 1800mm", price: 37650 },
        { code: "2100", desc: "Largo 2100mm", price: 40560 },
        { code: "2400", desc: "Largo 2400mm", price: 45790 },
        { code: "2600", desc: "Largo 2600mm", price: 48760 }
    ],
    priceList: [
        // Variantes Platinum Diamond / Snow White (Mismo precio)
        { name: "Mesa 1600 (Plat/Snow)", size: "1600*900*750", price: 36350 },
        { name: "Mesa 1800 (Plat/Snow)", size: "1800*900*750", price: 37650 },
        { name: "Mesa 2100 (Plat/Snow)", size: "2100*1000*750", price: 40560 },
        { name: "Mesa 2400 (Plat/Snow)", size: "2400*1000*750", price: 45790 },
        { name: "Mesa 2600 (Plat/Snow)", size: "2600*1100*750", price: 48760 },
        // Variantes Milky Way Starry Sky (Opción más económica)
        { name: "Mesa 1600 (Milky Way)", size: "1600*900*750", price: 34590 },
        { name: "Mesa 1800 (Milky Way)", size: "1800*900*750", price: 35660 },
        { name: "Mesa 2100 (Milky Way)", size: "2100*1000*750", price: 38080 },
        { name: "Mesa 2400 (Milky Way)", size: "2400*1000*750", price: 42890 },
        { name: "Mesa 2600 (Milky Way)", size: "2600*1100*750", price: 45360 },
        // Variantes Prada Green (Premium)
        { name: "Mesa 1600 (Prada Green)", size: "1600*900*750", price: 39160 },
        { name: "Mesa 1800 (Prada Green)", size: "1800*900*750", price: 40790 },
        { name: "Mesa 2100 (Prada Green)", size: "2100*1000*750", price: 44660 },
        { name: "Mesa 2400 (Prada Green)", size: "2400*1000*750", price: 50580 },
        { name: "Mesa 2600 (Prada Green)", size: "2600*1100*750", price: 54450 }
    ]
  },
  // PRODUCTO 45: MESA COMEDOR PLATINUM FIBERGLASS
  { 
    id: "mesa-comedor-platinum-fiberglass", 
    name: "Mesa Comedor Platinum Fiberglass", 
    category: "Mesa de Comedor", 
    code: "HYTL86111-B", 
    priceBase: 35450, // Precio medida referencia (2100mm en Platinum Diamond)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/COMEDOR/MESA45/render.jpg
    image: "/images/MESAS/COMEDOR/MESA45/render.jpg", 
    specs: { 
        dimensions: "2100 * 1000 * 750 mm", 
        volume: "0.83 m³", 
        assembly: "Desmontable / 3 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Platinum Diamond (Oil-bright)" },
        { part: "Marco Metal", material: "Acero Inoxidable", detail: "Brushed Gunmetal" },
        { part: "Patas Laterales", material: "Fibra de Vidrio", detail: "Acabado Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Platinum Diamond", hex: "#8A8A8A" },       // Gris texturizado
            { name: "Prada Green", hex: "#1B2821" },           // Verde oscuro lujo
            { name: "Snow White", hex: "#E5E5E5" },            // Blanco puro
            { name: "Milky Way Starry Sky", hex: "#1A1A1A" }   // Negro profundo
        ]
    },
    configurations: [
        { code: "1600", desc: "Largo 1600mm", price: 30100 },
        { code: "1800", desc: "Largo 1800mm", price: 32050 },
        { code: "2100", desc: "Largo 2100mm", price: 35450 },
        { code: "2400", desc: "Largo 2400mm", price: 39760 },
        { code: "2600", desc: "Largo 2600mm", price: 41350 }
    ],
    priceList: [
        // Variantes Platinum Diamond / Snow White (Mismo precio)
        { name: "Mesa 1600 (Plat/Snow)", size: "1600*900*750", price: 30100 },
        { name: "Mesa 1800 (Plat/Snow)", size: "1800*900*750", price: 32050 },
        { name: "Mesa 2100 (Plat/Snow)", size: "2100*1000*750", price: 35450 },
        { name: "Mesa 2400 (Plat/Snow)", size: "2400*1000*750", price: 39760 },
        { name: "Mesa 2600 (Plat/Snow)", size: "2600*1100*750", price: 41350 },
        // Variantes Milky Way Starry Sky (Opción más económica)
        { name: "Mesa 1600 (Milky Way)", size: "1600*900*750", price: 28290 },
        { name: "Mesa 1800 (Milky Way)", size: "1800*900*750", price: 30060 },
        { name: "Mesa 2100 (Milky Way)", size: "2100*1000*750", price: 32860 },
        { name: "Mesa 2400 (Milky Way)", size: "2400*1000*750", price: 36590 },
        { name: "Mesa 2600 (Milky Way)", size: "2600*1100*750", price: 37980 },
        // Variantes Prada Green (Premium)
        { name: "Mesa 1600 (Prada Green)", size: "1600*900*750", price: 32860 },
        { name: "Mesa 1800 (Prada Green)", size: "1800*900*750", price: 35190 },
        { name: "Mesa 2100 (Prada Green)", size: "2100*1000*750", price: 39490 },
        { name: "Mesa 2400 (Prada Green)", size: "2400*1000*750", price: 44390 },
        { name: "Mesa 2600 (Prada Green)", size: "2600*1100*750", price: 46990 }
    ]
  },
  // PRODUCTO 46: MESA COMEDOR SNOW WHITE ASH
  { 
    id: "mesa-comedor-snow-white-ash", 
    name: "Mesa Comedor Snow White Ash", 
    category: "Mesa de Comedor", 
    code: "HYTL86128-B", 
    priceBase: 22260, // Precio medida referencia (2100mm en Snow White)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/COMEDOR/MESA46/render.jpg
    image: "/images/MESAS/COMEDOR/MESA46/render.jpg", 
    specs: { 
        dimensions: "2100 * 950 * 750 mm", 
        volume: "0.60 m³", 
        assembly: "Desmontable / 3 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Snow White (Oil-bright)" },
        { part: "Estructura Patas", material: "Madera de Fresno", detail: "Acabado Oil-wax (Tono Oscuro)" }
    ],
    colors: {
        interior: [
            { name: "Snow White", hex: "#E5E5E5" },             // Blanco brillante
            { name: "Calacatta Gray", hex: "#D4D4D4" },         // Gris claro mate
            { name: "Wyndham Gray", hex: "#4A4A4A" }            // Gris oscuro veteado
        ]
    },
    configurations: [
        { code: "1600", desc: "Largo 1600mm", price: 17790 },
        { code: "1800", desc: "Largo 1800mm", price: 19080 },
        { code: "2100", desc: "Largo 2100mm", price: 22260 }
    ],
    priceList: [
        // Variantes Snow White (Premium)
        { name: "Mesa 1600 (Snow White)", size: "1600*900*750", price: 17790 },
        { name: "Mesa 1800 (Snow White)", size: "1800*900*750", price: 19080 },
        { name: "Mesa 2100 (Snow White)", size: "2100*950*750", price: 22260 },
        // Variantes Imported Calacatta Gray (Opción intermedia)
        { name: "Mesa 1600 (Calacatta)", size: "1600*900*750", price: 16060 },
        { name: "Mesa 1800 (Calacatta)", size: "1800*900*750", price: 17090 },
        { name: "Mesa 2100 (Calacatta)", size: "2100*950*750", price: 19880 },
        // Variantes Wyndham Gray (Opción más económica)
        { name: "Mesa 1600 (Wyndham)", size: "1600*900*750", price: 14560 },
        { name: "Mesa 1800 (Wyndham)", size: "1800*900*750", price: 15360 },
        { name: "Mesa 2100 (Wyndham)", size: "2100*950*750", price: 17780 }
    ]
  },
  // PRODUCTO 47: MESA COMEDOR EMERALD CYLINDERS
  { 
    id: "mesa-comedor-emerald-cylinders", 
    name: "Mesa Comedor Emerald Cylinders", 
    category: "Mesa de Comedor", 
    code: "HYTL86129-A", 
    priceBase: 24350, // Precio medida referencia (1600mm en Emerald)
    // RECUERDA: Guardar imagen en: /public/images/MESAS/COMEDOR/MESA47/render.jpg
    image: "/images/MESAS/COMEDOR/MESA47/render.jpg", 
    specs: { 
        dimensions: "1600 * 900 * 750 mm", 
        volume: "0.63 m³", 
        assembly: "Desmontable / 2 Piezas" 
    },
    materials: [
        { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Emerald in the Clouds (Oil-bright)" },
        { part: "Bases Cilíndricas", material: "Acero Inoxidable", detail: "Brushed Gunmetal" }
    ],
    colors: {
        interior: [
            { name: "Emerald in the Clouds", hex: "#7C827A" }, // Verde grisáceo veteado
            { name: "Snow Mountain Blue", hex: "#DCDFE1" },    // Blanco agrisado premium
            { name: "Snow White", hex: "#E5E5E5" },            // Blanco puro
            { name: "Moon Valley", hex: "#8D7864" }            // Marrón bronce tierra
        ]
    },
    configurations: [
        { code: "1600", desc: "Largo 1600mm", price: 24350 },
        { code: "1800", desc: "Largo 1800mm", price: 25380 },
        { code: "2100", desc: "Largo 2100mm", price: 26780 },
        { code: "2400", desc: "Largo 2400mm", price: 30290 },
        { code: "2600", desc: "Largo 2600mm", price: 31460 }
    ],
    priceList: [
        // Variantes Emerald in the Clouds / Moon Valley (Mismo precio)
        { name: "Mesa 1600 (Emerald/Moon)", size: "1600*900*750", price: 24350 },
        { name: "Mesa 1800 (Emerald/Moon)", size: "1800*900*750", price: 25380 },
        { name: "Mesa 2100 (Emerald/Moon)", size: "2100*1000*750", price: 26780 },
        { name: "Mesa 2400 (Emerald/Moon)", size: "2400*1100*750", price: 30290 },
        { name: "Mesa 2600 (Emerald/Moon)", size: "2600*1100*750", price: 31460 },
        // Variantes Snow White
        { name: "Mesa 1600 (Snow White)", size: "1600*900*750", price: 28880 },
        { name: "Mesa 1800 (Snow White)", size: "1800*900*750", price: 30390 },
        { name: "Mesa 2100 (Snow White)", size: "2100*1000*750", price: 33450 },
        { name: "Mesa 2400 (Snow White)", size: "2400*1100*750", price: 38680 },
        { name: "Mesa 2600 (Snow White)", size: "2600*1100*750", price: 40460 },
        // Variantes Snow Mountain Blue (Premium)
        { name: "Mesa 1600 (Snow Mtn)", size: "1600*900*750", price: 33450 },
        { name: "Mesa 1800 (Snow Mtn)", size: "1800*900*750", price: 35560 },
        { name: "Mesa 2100 (Snow Mtn)", size: "2100*1000*750", price: 40080 },
        { name: "Mesa 2400 (Snow Mtn)", size: "2400*1100*750", price: 46860 },
        { name: "Mesa 2600 (Snow Mtn)", size: "2600*1100*750", price: 49550 }
    ]
  }
];

// --- 4. FUNCIÓN DE SUBIDA ---
async function subirMesas() {
  console.log(`🔥 Limpiando tabla 'mesas' en Supabase...`);
  // OJO: Esto borra TODO lo que haya en la tabla 'mesas'
  const { error: deleteError } = await supabase.from('mesas').delete().neq('id', '0');
  
  if (deleteError) {
      console.error("❌ Error borrando datos existentes:", deleteError);
      return;
  }

  console.log(`📦 Preparando subida de ${tablesData.length} productos...`);
  
  const { data, error } = await supabase.from('mesas').insert(tablesData);

  if (error) {
    console.error("❌ Error subiendo datos:", error.message);
  } else {
    console.log("✅ ¡ÉXITO! Las 47 mesas se han subido correctamente a la tabla 'mesas'.");
  }
}

subirMesas();