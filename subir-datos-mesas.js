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
        image: "/images/MESAS/MESA1/render.jpg",
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
        image: "/images/MESAS/MESA2/render.jpg",
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
        image: "/images/MESAS/MESA3/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA4/render.jpg
        image: "/images/MESAS/MESA4/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA5/render.jpg
        image: "/images/MESAS/MESA5/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA6/render.jpg
        image: "/images/MESAS/MESA6/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA7/render.jpg
        image: "/images/MESAS/MESA7/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA8/render.jpg
        image: "/images/MESAS/MESA8/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA9/render.jpg
        image: "/images/MESAS/MESA9/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA10/render.jpg
        image: "/images/MESAS/MESA10/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA11/render.jpg
        image: "/images/MESAS/MESA11/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA12/render.jpg
        image: "/images/MESAS/MESA12/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA13/render.jpg
        image: "/images/MESAS/MESA13/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA14/render.jpg
        image: "/images/MESAS/MESA14/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA15/render.jpg
        image: "/images/MESAS/MESA15/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA16/render.jpg
        image: "/images/MESAS/MESA16/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA17/render.jpg
        image: "/images/MESAS/MESA17/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA18/render.jpg
        image: "/images/MESAS/MESA18/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA19/render.jpg
        image: "/images/MESAS/MESA19/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA20/render.jpg
        image: "/images/MESAS/MESA20/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA21/render.jpg
        image: "/images/MESAS/MESA21/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA22/render.jpg
        image: "/images/MESAS/MESA22/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA23/render.jpg
        image: "/images/MESAS/MESA23/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA24/render.jpg
        image: "/images/MESAS/MESA24/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA25/render.jpg
        image: "/images/MESAS/MESA25/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA26/render.jpg
        image: "/images/MESAS/MESA26/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA27/render.jpg
        image: "/images/MESAS/MESA27/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA28/render.jpg
        image: "/images/MESAS/MESA28/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA29/render.jpg
        image: "/images/MESAS/MESA29/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA30/render.jpg
        image: "/images/MESAS/MESA30/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA31/render.jpg
        image: "/images/MESAS/MESA31/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA32/render.jpg
        image: "/images/MESAS/MESA32/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA33/render.jpg
        image: "/images/MESAS/MESA33/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA34/render.jpg
        image: "/images/MESAS/MESA34/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA35/render.jpg
        image: "/images/MESAS/MESA35/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA36/render.jpg
        image: "/images/MESAS/MESA36/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA37/render.jpg
        image: "/images/MESAS/MESA37/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA38/render.jpg
        image: "/images/MESAS/MESA38/render.jpg",
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
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA39/render.jpg
        image: "/images/MESAS/MESA39/render.jpg",
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
    // PRODUCTO 40: MESA RINCÓN PRADA GREEN
    {
        id: "mesa-rincon-prada-green-hg1911",
        name: "Mesa Rincón Prada Green",
        category: "Mesa Auxiliar",
        code: "HYJL82305-A/HG1911",
        priceBase: 8490,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA40/render.jpg
        image: "/images/MESAS/MESA40/render.jpg",
        specs: {
            dimensions: "980 * 608 * 380 mm",
            volume: "0.44 m³",
            assembly: "Desmontable / 2 Piezas"
        },
        materials: [
            { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Prada Green (Oil-bright)" },
            { part: "Estructura (Foot frame)", material: "Acero Inoxidable", detail: "Brushed Space Gold" }
        ],
        colors: {
            interior: [
                { name: "Prada Green", hex: "#1B2821" },       // Verde oscuro con vetas claras
                { name: "Brushed Space Gold", hex: "#B49B68" } // Dorado cepillado
            ]
        },
        configurations: [
            { code: "STD", desc: "980*608*380 mm", price: 8490 }
        ],
        priceList: [
            { name: "Corner table", size: "980*608*380", price: 8490 }
        ]
    },
    // PRODUCTO 41: MESA RINCÓN CILÍNDRICA
    {
        id: "mesa-rincon-cilindrica-hg1913",
        name: "Mesa Rincón Cilíndrica",
        category: "Mesa Auxiliar",
        code: "HYJL82306/HG1913",
        priceBase: 5880,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA41/render.jpg
        image: "/images/MESAS/MESA41/render.jpg",
        specs: {
            dimensions: "Ø495 * 500 mm",
            volume: "0.18 m³",
            assembly: "Ensamblado / 1 Pieza"
        },
        materials: [
            { part: "Cuerpo principal (Main body)", material: "Acero Inoxidable", detail: "Brushed Space Gold" },
            { part: "Hebilla decorativa (Decorative buckle)", material: "Aleación de Zinc", detail: "Mirror Steel Japanese Gold" }
        ],
        colors: {
            interior: [
                { name: "Brushed Space Gold", hex: "#B19B6A" },         // Dorado cepillado (estimado de la muestra)
                { name: "Mirror Steel Japanese Gold", hex: "#D4AF37" }  // Dorado brillante espejo (estimado)
            ]
        },
        configurations: [
            { code: "STD", desc: "Ø495*500 mm", price: 5880 }
        ],
        priceList: [
            { name: "Corner table", size: "Ø495*500", price: 5880 }
        ]
    },
    // PRODUCTO 42: MESA COMEDOR
    {
        id: "mesa-comedor-hytl86101",
        name: "Mesa de Comedor",
        category: "Mesa de Comedor",
        code: "HYTL86101/HF1823Y-1",
        priceBase: 25450,
        // RECUERDA: Guardar imagen en la ruta correspondiente, ej: /public/images/MESAS/MESA42/render.jpg
        image: "/images/MESAS/MESA42/render.jpg",
        schematics: [
            "/images/MESAS/MESA42/img1.jpg",
        ],
        specs: {
            dimensions: "2100 * 1000 * 750 mm",
            volume: "0.82 m³",
            assembly: "Desmontado y Ensamblado / 3 Piezas"
        },
        materials: [
            { part: "Sobre (Tabletop)", material: "Mármol", detail: "Wyndham Gray (Oil-bright)" },
            { part: "Estructura inferior (Bottom frame)", material: "Madera de Fresno (Ash wood)", detail: "Color cera de aceite (Oil-wax color)" },
            { part: "Estructura inferior (Bottom frame)", material: "Acero Inoxidable", detail: "Gunmetal cepillado (Brushed Gunmetal)" }
        ],
        colors: {
            marble: [
                { name: "Wyndham Gray (Oil-bright)", hex: "#4A4D4E" },          // Gris oscuro (estimado de la muestra)
                { name: "Imported Calacatta Gray (Oil-bright)", hex: "#A8A9A0" }, // Gris claro (estimado de la muestra)
                { name: "Zilo Red (Oil-bright)", hex: "#8A4A43" }                 // Rojo marmolado (estimado de la muestra)
            ]
        },
        configurations: [
            { code: "HYTL86101-A1800", desc: "1800*900*750 mm", price: 23660 },
            { code: "HYTL86101-A2100", desc: "2100*1000*750 mm", price: 25450 },
            { code: "HYTL86101-A2400", desc: "2400*1100*750 mm", price: 29260 },
            { code: "HYTL86101-A2600", desc: "2600*1100*750 mm", price: 32450 }
        ],
        priceList: [
            { name: "Mesa 1800mm (Wyndham Gray)", size: "1800*900*750", price: 23660 },
            { name: "Mesa 2100mm (Wyndham Gray)", size: "2100*1000*750", price: 25450 },
            { name: "Mesa 2400mm (Wyndham Gray)", size: "2400*1100*750", price: 29260 },
            { name: "Mesa 2600mm (Wyndham Gray)", size: "2600*1100*750", price: 32450 }
        ],
        customInstructions: {
            length: "Customizable (1600-2600 mm)",
            width: "Customizable (900-1100 mm)",
            height: "Not customizable"
        }
    },
    // PRODUCTO 43: MESA COMEDOR REDONDA
    {
        id: "mesa-comedor-redonda-hytl86102",
        name: "Mesa de Comedor Redonda",
        category: "Mesa de Comedor",
        code: "HYTL86102-B/HF1826Y-2",
        priceBase: 28190,
        // RECUERDA: Guardar imagen en la ruta correspondiente, ej: /public/images/MESAS/MESA43/render.jpg
        image: "/images/MESAS/MESA43/render.jpg",
        schematics: [
            "/images/MESAS/MESA43/img1.jpg",
            "/images/MESAS/MESA43/img2.jpg"
        ],
        specs: {
            dimensions: "920 / 1530 * 760 mm",
            volume: "1.24 m³",
            assembly: "Desmontado y Ensamblado / 3 Piezas"
        },
        materials: [
            { part: "Plato giratorio y pie de mesa (Turntable/Table foot)", material: "Mármol", detail: "Zilo Red (Oil-bright)" },
            { part: "Sobre (Tabletop)", material: "MDF grado E0", detail: "Color cera de aceite (Oil-wax color)" },
            { part: "Estructura inferior (Bottom frame)", material: "Acero Inoxidable", detail: "Gunmetal cepillado (Brushed Gunmetal)" }
        ],
        colors: {
            marble: [
                { name: "Zilo Red (Oil-bright)", hex: "#7A3532" },                 // Rojo intenso marmolado (estimado)
                { name: "Imported Calacatta Gray (Oil-matte)", hex: "#B0B3A8" },   // Gris claro mate (estimado)
                { name: "French Red (Oil-bright)", hex: "#8A3B37" },               // Rojo marmolado claro (estimado)
                { name: "Ancient wood grain (Oil-bright)", hex: "#2C2B29" }        // Negro veteado (estimado)
            ]
        },
        configurations: [
            { code: "HYTL86102-B1380", desc: "Ø820 / Ø1380 * 760 mm", price: 27260 },
            { code: "HYTL86102-B1530", desc: "Ø920 / Ø1530 * 760 mm", price: 28190 },
            { code: "HYTL86102-B1800", desc: "Ø1020 / Ø1800 * 760 mm", price: 31080 }
        ],
        priceList: [
            { name: "Mesa Ø1380mm (Zilo Red)", size: "Ø820 / Ø1380 * 760", price: 27260 },
            { name: "Mesa Ø1530mm (Zilo Red)", size: "Ø920 / Ø1530 * 760", price: 28190 },
            { name: "Mesa Ø1800mm (Zilo Red)", size: "Ø1020 / Ø1800 * 760", price: 31080 }
        ],
        customInstructions: {
            length: "Customizable (Ø1200-Ø1800 mm)",
            width: "Customizable (Ø1200-Ø1800 mm)",
            height: "Not customizable"
        }
    },
    // PRODUCTO 44: MESA COMEDOR
    {
        id: "mesa-comedor-hytl86105",
        name: "Mesa de Comedor",
        category: "Mesa de Comedor",
        code: "HYTL86105-B/HF1831",
        priceBase: 25550,
        // RECUERDA: Guardar imagen en la ruta correspondiente, ej: /public/images/MESAS/MESA44/render.jpg
        image: "/images/MESAS/MESA44/render.jpg",
        schematics: [
            "/images/MESAS/MESA44/img1.jpg", 
            "/images/MESAS/MESA44/img2.jpg",
            "/images/MESAS/MESA44/img3.jpg",
        ],
        specs: {
            dimensions: "2100 * 1000 * 750 mm",
            volume: "0.81 m³",
            assembly: "Desmontado y Ensamblado / 2 Piezas"
        },
        materials: [
            { part: "Sobre (Tabletop)", material: "Mármol", detail: "Moon Valley (Oil-bright)" },
            { part: "Patas laterales (Side feet)", material: "Acero Inoxidable", detail: "Brushed Antique Bronze" },
            { part: "Hebilla decorativa lateral (Side-foot decorative buckle)", material: "Acero Inoxidable", detail: "Mirror Steel Japanese Gold" }
        ],
        colors: {
            marble: [
                { name: "Moon Valley (Oil-bright)", hex: "#8B7D6B" },              // Tono tierra/bronceado (estimado de la muestra)
                { name: "Snow Mountain Blue (Oil-bright)", hex: "#D0D3D4" },       // Gris claro/azulado (estimado)
                { name: "Platinum Diamond (Oil-bright)", hex: "#6B5B5A" },         // Gris oscuro/pardo (estimado)
                { name: "Emerald in the Clouds (Oil-bright)", hex: "#7B8D83" }     // Verde grisáceo (estimado)
            ]
        },
        configurations: [
            { code: "HYTL86105-B1800", desc: "1800*900*750 mm", price: 23450 },
            { code: "HYTL86105-B2100", desc: "2100*1000*750 mm", price: 25550 },
            { code: "HYTL86105-B2400", desc: "2400*1000*750 mm", price: 27260 },
            { code: "HYTL86105-B2600", desc: "2600*1100*750 mm", price: 29360 }
        ],
        priceList: [
            { name: "Mesa 1800mm (Moon Valley)", size: "1800*900*750", price: 23450 },
            { name: "Mesa 2100mm (Moon Valley)", size: "2100*1000*750", price: 25550 },
            { name: "Mesa 2400mm (Moon Valley)", size: "2400*1000*750", price: 27260 },
            { name: "Mesa 2600mm (Moon Valley)", size: "2600*1100*750", price: 29360 }
        ],
        customInstructions: {
            length: "Customizable (1600-2800 mm)",
            width: "Customizable (850-1100 mm)",
            height: "Not customizable"
        }
    },
    // PRODUCTO 45: MESA COMEDOR
    {
        id: "mesa-comedor-hytl86108",
        name: "Mesa de Comedor",
        category: "Mesa de Comedor",
        code: "HYTL86108-A/HF1836Y",
        priceBase: 24450,
        // RECUERDA: Guardar imagen en la ruta correspondiente, ej: /public/images/MESAS/MESA45/render.jpg
        image: "/images/MESAS/MESA45/render.jpg",
        schematics: [
            "/images/MESAS/MESA45/img1.jpg", 
            "/images/MESAS/MESA45/img2.jpg",
            "/images/MESAS/MESA45/img3.jpg",
        ],
        specs: {
            dimensions: "2100 * 1000 * 750 mm",
            volume: "0.77 m³",
            assembly: "Desmontado y Ensamblado / 3 Piezas"
        },
        materials: [
            { part: "Sobre (Tabletop)", material: "Mármol", detail: "Italian Space Gray (Oil-matte)" },
            { part: "Estructura de las patas (Foot frame)", material: "Madera de Fresno (Ash wood)", detail: "Color cera de aceite (Oil-wax color)" },
            { part: "Cubierta decorativa (Decorative cover)", material: "Acero Inoxidable", detail: "Brushed Space Gold" }
        ],
        colors: {
            marble: [
                { name: "Italian Space Gray (Oil-matte)", hex: "#7A7B76" },       // Gris oscuro veteado mate (estimado)
                { name: "Snow White (Oil-matte)", hex: "#DCDCDC" },               // Blanco veteado mate (estimado)
                { name: "Milky Way Starry Sky (Oil-matte)", hex: "#1A1A1A" },     // Negro mate (estimado)
                { name: "Wyndham Gray (Oil-bright)", hex: "#4A4D4E" }             // Gris oscuro brillante (estimado)
            ]
        },
        configurations: [
            { code: "HYTL86108-A1600", desc: "1600*900*750 mm", price: 20950 },
            { code: "HYTL86108-A1800", desc: "1800*900*750 mm", price: 21650 },
            { code: "HYTL86108-A2100", desc: "2100*1000*750 mm", price: 24450 },
            { code: "HYTL86108-A2400", desc: "2400*1000*750 mm", price: 26880 },
            { code: "HYTL86108-A2600", desc: "2600*1100*750 mm", price: 29750 },
            { code: "HYTL86108-A2800", desc: "2800*1100*750 mm", price: 33560 }
        ],
        priceList: [
            { name: "Mesa 1600mm (Italian Space Gray)", size: "1600*900*750", price: 20950 },
            { name: "Mesa 1800mm (Italian Space Gray)", size: "1800*900*750", price: 21650 },
            { name: "Mesa 2100mm (Italian Space Gray)", size: "2100*1000*750", price: 24450 },
            { name: "Mesa 2400mm (Italian Space Gray)", size: "2400*1000*750", price: 26880 },
            { name: "Mesa 2600mm (Italian Space Gray)", size: "2600*1100*750", price: 29750 },
            { name: "Mesa 2800mm (Italian Space Gray)", size: "2800*1100*750", price: 33560 }
        ],
        customInstructions: {
            length: "Customizable (1400-2800 mm)",
            width: "Customizable (800-1100 mm)",
            height: "Not customizable"
        }
    },
    // PRODUCTO 46: MESA COMEDOR
    {
        id: "mesa-comedor-hytl86111",
        name: "Mesa de Comedor",
        category: "Mesa de Comedor",
        code: "HYTL86111-A/HF1837",
        priceBase: 40560,
        // RECUERDA: Guardar imagen en la ruta correspondiente, ej: /public/images/MESAS/MESA46/render.jpg
        image: "/images/MESAS/MESA46/render.jpg",
        specs: {
            dimensions: "2100 * 1000 * 750 mm",
            volume: "0.91 m³",
            assembly: "Desmontado y Ensamblado / 4 Piezas"
        },
        materials: [
            { part: "Sobre (Tabletop)", material: "Mármol", detail: "Platinum Diamond (Oil-bright)" },
            { part: "Estructura de las patas (Foot frame)", material: "Acero Inoxidable", detail: "Gunmetal cepillado (Brushed Gunmetal)" }
        ],
        colors: {
            marble: [
                { name: "Platinum Diamond (Oil-bright)", hex: "#5E504A" },        // Marrón oscuro/grisáceo veteado (estimado de la muestra)
                { name: "Prada Green (Oil-bright)", hex: "#2A3B32" },             // Verde oscuro veteado (estimado de la muestra)
                { name: "Snow White (Oil-bright)", hex: "#DCDCDC" },              // Blanco veteado (estimado de la muestra)
                { name: "Milky Way Starry Sky (Oil-bright)", hex: "#1A1A1A" }     // Negro brillante (estimado de la muestra)
            ]
        },
        configurations: [
            { code: "HYTL86111-A1600", desc: "1600*900*750 mm", price: 36350 },
            { code: "HYTL86111-A1800", desc: "1800*900*750 mm", price: 37650 },
            { code: "HYTL86111-A2100", desc: "2100*1000*750 mm", price: 40560 },
            { code: "HYTL86111-A2400", desc: "2400*1000*750 mm", price: 45790 },
            { code: "HYTL86111-A2600", desc: "2600*1100*750 mm", price: 48760 }
        ],
        priceList: [
            { name: "Mesa 1600mm (Platinum Diamond)", size: "1600*900*750", price: 36350 },
            { name: "Mesa 1800mm (Platinum Diamond)", size: "1800*900*750", price: 37650 },
            { name: "Mesa 2100mm (Platinum Diamond)", size: "2100*1000*750", price: 40560 },
            { name: "Mesa 2400mm (Platinum Diamond)", size: "2400*1000*750", price: 45790 },
            { name: "Mesa 2600mm (Platinum Diamond)", size: "2600*1100*750", price: 48760 }
        ],
        customInstructions: {
            length: "Customizable (1600-2600 mm)",
            width: "Customizable (900-1100 mm)",
            height: "Not customizable"
        }
    },
    // PRODUCTO 47: MESA COMEDOR → borrado (HYTL86111-B/HF1837-B)
    // PRODUCTO 48: MESA COMEDOR
    {
        id: "mesa-comedor-hytl86128-b",
        name: "Mesa de Comedor",
        category: "Mesa de Comedor",
        code: "HYTL86128-B",
        priceBase: 22260,
        // RECUERDA: Guardar imagen en la ruta correspondiente, ej: /public/images/MESAS/MESA48/render.jpg
        image: "/images/MESAS/MESA48/render.jpg",
        schematics: [
            "/images/MESAS/MESA48/img1.jpg", 
            "/images/MESAS/MESA48/img2.jpg",
            "/images/MESAS/MESA48/img3.jpg",
        ],
        specs: {
            dimensions: "2100 * 950 * 750 mm",
            volume: "0.6 m³",
            assembly: "Desmontado y Ensamblado / 3 Piezas"
        },
        materials: [
            { part: "Sobre (Tabletop)", material: "Mármol", detail: "Snow White (Oil-bright)" },
            { part: "Estructura de las patas (Foot frame)", material: "Madera de Fresno (Ash wood)", detail: "Color cera de aceite (Oil-wax color)" }
        ],
        colors: {
            marble: [
                { name: "Snow White (Oil-bright)", hex: "#DCDCDC" },              // Blanco veteado (estimado de la muestra)
                { name: "Imported Calacatta Gray (Oil-matte)", hex: "#B0B3A8" },  // Gris claro mate (estimado de la muestra)
                { name: "Wyndham Gray (Oil-bright)", hex: "#4A4D4E" }             // Gris oscuro (estimado de la muestra)
            ]
        },
        configurations: [
            { code: "HYTL86128-B1600", desc: "1600*900*750 mm", price: 17790 },
            { code: "HYTL86128-B1800", desc: "1800*900*750 mm", price: 19080 },
            { code: "HYTL86128-B2100", desc: "2100*950*750 mm", price: 22260 }
        ],
        priceList: [
            { name: "Mesa 1600mm (Snow White)", size: "1600*900*750", price: 17790 },
            { name: "Mesa 1800mm (Snow White)", size: "1800*900*750", price: 19080 },
            { name: "Mesa 2100mm (Snow White)", size: "2100*950*750", price: 22260 }
        ],
        customInstructions: {
            length: "Customizable (1400-2400 mm)",
            width: "Customizable (800-1100 mm)",
            height: "Not customizable"
        }
    },
    // PRODUCTO 49: MESA COMEDOR
    {
        id: "mesa-comedor-hytl86129-a",
        name: "Mesa de Comedor",
        category: "Mesa de Comedor",
        code: "HYTL86129-A/MZL3118",
        priceBase: 24350,
        // RECUERDA: Guardar imagen en la ruta correspondiente, ej: /public/images/MESAS/MESA49/render.jpg
        image: "/images/MESAS/MESA49/render.jpg",
        schematics: [
            "/images/MESAS/MESA49/img1.jpg", 
            "/images/MESAS/MESA49/img2.jpg",
            "/images/MESAS/MESA49/img3.jpg"
        ],
        specs: {
            dimensions: "1600 * 900 * 750 mm",
            volume: "0.63 m³",
            assembly: "Desmontado y Ensamblado / 2 Piezas"
        },
        materials: [
            { part: "Sobre (Tabletop)", material: "Mármol", detail: "Emerald in the Clouds (Oil-bright)" },
            { part: "Estructura de las patas (Foot frame)", material: "Acero Inoxidable", detail: "Gunmetal cepillado (Brushed Gunmetal)" }
        ],
        colors: {
            marble: [
                { name: "Emerald in the Clouds (Oil-bright)", hex: "#7B8D83" },     // Verde grisáceo (estimado de la muestra)
                { name: "Snow Mountain Blue (Oil-bright)", hex: "#D0D3D4" },       // Gris claro/azulado (estimado de la muestra)
                { name: "Snow White (Oil-bright)", hex: "#DCDCDC" },              // Blanco veteado (estimado de la muestra)
                { name: "Moon Valley (Oil-bright)", hex: "#8B7D6B" }               // Tono tierra/bronceado (estimado de la muestra)
            ]
        },
        configurations: [
            { code: "HYTL86129-A1600", desc: "1600*900*750 mm", price: 24350 },
            { code: "HYTL86129-A1800", desc: "1800*900*750 mm", price: 25380 },
            { code: "HYTL86129-A2100", desc: "2100*1000*750 mm", price: 26780 },
            { code: "HYTL86129-A2400", desc: "2400*1100*750 mm", price: 30290 },
            { code: "HYTL86129-A2600", desc: "2600*1100*750 mm", price: 31460 }
        ],
        priceList: [
            { name: "Mesa 1600mm (Emerald in the Clouds)", size: "1600*900*750", price: 24350 },
            { name: "Mesa 1800mm (Emerald in the Clouds)", size: "1800*900*750", price: 25380 },
            { name: "Mesa 2100mm (Emerald in the Clouds)", size: "2100*1000*750", price: 26780 },
            { name: "Mesa 2400mm (Emerald in the Clouds)", size: "2400*1100*750", price: 30290 },
            { name: "Mesa 2600mm (Emerald in the Clouds)", size: "2600*1100*750", price: 31460 }
        ],
        customInstructions: {
            length: "Customizable (1600-2600 mm)",
            width: "Customizable (900-1100 mm)",
            height: "Not customizable"
        }
    },
    // MESA50
    {
        id: "mesa-centro-hyjl82106-a1",
        name: "Mesa de Centro CHIN",
        category: "Sets Completos",
        code: "HYJL82106-A1",
        priceBase: null,
        image: "/images/MESAS/MESA50/render.jpg",
        specs: {
            dimensions: "1500 * 850 * 420 mm",
            volume: null,
            assembly: null
        },
        materials: [
            { part: "Sobre (Tabletop)", material: "Mármol", detail: "Filosofía 'borde oculto', redondeado a mano" },
            { part: "Estructura de las patas (Foot frame)", material: "Madera maciza de fresno", detail: "Patas cónicas (Diseñador: He Dongxiao)" },
            { part: "Acentos (Accents)", material: "Acero Inoxidable", detail: "Acabado cepillado" }
        ],
        colors: null,
        configurations: [
            { code: "HYJL82106-A1", desc: "1500*850*420 mm", price: null }
        ],
        priceList: [
            { name: "Model A (The Elevated Statement)", size: "1500*850*420", price: null }
        ],
        customInstructions: null
    },
    // MESA 51
    {
        id: "mesa-comedor-hyjl82901",
        name: "Mesa Comedor CHIN",
        category: "Mesa de Comedor",
        code: "HYJL82901",
        priceBase: null,
        image: "/images/MESAS/MESA51/render.jpg",
        specs: {
            dimensions: "1000 * 430 * 450 mm",
            volume: null,
            assembly: null
        },
        materials: [
            { part: "Sobre (Tabletop)", material: "Mármol Natural", detail: "Estética de 'borde oculto', veteado orgánico inspirado en paisajes de tinta china" },
            { part: "Estructura (Frame)", material: "Acero Inoxidable", detail: "Marco de líneas limpias, contraste de diseño contemporáneo" }
        ],
        colors: null,
        configurations: [
            { code: "HYJL82901", desc: "1000*430*450 mm", price: null }
        ],
        priceList: [
            { name: "Mesa Consola CHIN (Diseñador: He Dongxiao)", size: "1000*430*450", price: null }
        ],
        customInstructions: null
    },
    // MESA 52
    {
        id: "consola-te-hygl81702-b",
        name: "CHIN Tea Cabinet HYGL81702",
        category: "Mesa de Té",
        code: "HYGL81702-HQ1826Y-2",
        priceBase: null,
        image: "/images/MESAS/MESA52/render.jpg",
        schematics: [
            "/images/MESAS/MESA52/img1.jpg",
            "/images/MESAS/MESA52/img2.jpg"
        ],
        specs: {
            dimensions: "630 * 480 * 680 mm",
            volume: null,
            assembly: null
        },
        materials: [
            { part: "Sobre de Piedra (Stone Top)", material: "Mármol", detail: "Sistema de agua hirviendo instantánea y esterilizador de alta temperatura integrados" },
            { part: "Cuerpo del Mueble", material: "MDF Grado E0", detail: "Chapa de madera oscura, curvas orgánicas y tanque de agua oculto de 2L" },
            { part: "Base y Acentos", material: "Acero Inoxidable", detail: "Base con ribetes metálicos inspirada en antiguas técnicas de incrustación" }
        ],
        colors: null,
        configurations: [
            { code: "HYGL81702-B", desc: "630*480*680 mm", price: null }
        ],
        priceList: [
            { name: "Consola de Té CHIN (Diseñador: He Dongxiao)", size: "630*480*680", price: null }
        ],
        customInstructions: null
    },
    // MESA 53
    {
        id: "banco-te-hyyd85506",
        name: "Banco Largo de Té CHIN",
        category: "Mesa de Centro",
        code: "HYYD85506",
        priceBase: null,
        image: "/images/MESAS/MESA53/render.jpg",
        specs: {
            dimensions: "1600 * 450 * 425 mm",
            volume: null,
            assembly: null
        },
        materials: [
            { part: "Asiento (Seat)", material: "Cuero Premium", detail: "Doble panel con sutil curva cóncava ergonómica y costuras de precisión" },
            { part: "Estructura (Frame)", material: "Madera de Fresno", detail: "Perfil inspirado en las hachas-daga de la dinastía Qin, con patas abiertas para mayor estabilidad" },
            { part: "Refuerzos (Accents)", material: "Acero Inoxidable", detail: "Acabado cepillado, diseñado como eco de las antiguas técnicas de incrustación de metal" }
        ],
        colors: null,
        configurations: [
            { code: "HYYD85506", desc: "1600*450*425 mm", price: null }
        ],
        priceList: [
            { name: "Banco Largo de Té CHIN (Diseñador: He Dongxiao)", size: "1600*450*425", price: null }
        ],
        customInstructions: null
    },
    // MESA 54
    {
        id: "mesa-comedor-hytl86127-hf1850",
        name: "Change Dining Table HYTL86127",
        category: "Mesa de Comedor",
        code: "HYTL86127-HF1850",
        priceBase: null,
        image: "/images/MESAS/MESA54/render.jpg",
        specs: {
            dimensions: null,
            volume: null,
            assembly: null
        },
        materials: [
            { part: "Tablero (Tabletop)", material: "Mármol", detail: "Blanco / Calacatta (acabado brillante)" },
            { part: "Lazy Susan giratoria", material: "Mármol", detail: "Integrada, giratoria, con ribete dorado (brass)" },
            { part: "Base", material: "Acero Inoxidable", detail: "Gunmetal oscuro / Negro mate — estructura cilíndrica con paneles intercalados" }
        ],
        colors: {
            interior: [
                { name: "Calacatta White Marble", hex: "#E8E4DE" }
            ]
        },
        configurations: [
            { code: "HYTL86127-HF1850", desc: null, price: null }
        ],
        priceList: [
            { name: "Change Dining Table", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 55
    {
        id: "mesa-comedor-hytl86109-hf1838",
        name: "«Be Water» Dining Table HYTL86109",
        category: "Mesa de Comedor",
        code: "HYTL86109-HF1838",
        priceBase: null,
        image: "/images/MESAS/MESA55/render.jpg",
        schematics: [
            "/images/MESAS/MESA55/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: null
        },
        materials: [
            { part: "Tablero (Tabletop)", material: "Mármol", detail: "Negro veteado / Nero Marquina" },
            { part: "Lazy Susan", material: "Mármol", detail: "Integrada y giratoria" },
            { part: "Base", material: "Acero Inoxidable", detail: "Gunmetal oscuro — columna cilíndrica con elementos curvos tipo corchete" }
        ],
        colors: {
            interior: [
                { name: "Nero Marquina Black Marble", hex: "#1A1A1A" }
            ]
        },
        configurations: [
            { code: "HYTL86109-HF1838", desc: null, price: null }
        ],
        priceList: [
            { name: "Be Water Dining Table", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 56
    {
        id: "mesa-comedor-hytl86103-hf1830y",
        name: "Dining Table HYTL86103",
        category: "Mesa de Comedor",
        code: "HYTL86103-HF1830Y-1",
        priceBase: null,
        image: "/images/MESAS/MESA56/render.jpg",
        schematics: [
            "/images/MESAS/MESA56/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: null
        },
        materials: [
            { part: "Tablero (Tabletop)", material: "Mármol", detail: "Blanco veteado / Fantasy Brown — acabado brillante" },
            { part: "Base", material: "Madera de Fresno", detail: "Negro tintado — cuatro paneles curvos entrelazados" },
            { part: "Detalle base", material: "Acero Inoxidable", detail: "Gunmetal / Antique Bronze en la unión inferior" }
        ],
        colors: {
            interior: [
                { name: "Fantasy Brown / Ice Crystal Marble", hex: "#D8D0C8" }
            ]
        },
        configurations: [
            { code: "HYTL86103-HF1830Y-1", desc: null, price: null }
        ],
        priceList: [
            { name: "Dining Table HYTL86103", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 57 (movida desde gabinetes GAB12)
    {
        id: "mesa-hytl86201",
        name: "Mesa de Té HYTL86201",
        category: "Mesa de Té",
        code: "HYTL86201/HCT1801Y-1",
        priceBase: 18760,
        image: "/images/MESAS/MESA57/render.jpg",
        schematics: [
            "/images/MESAS/MESA57/img1.jpg",
            "/images/MESAS/MESA57/img2.jpg",
            "/images/MESAS/MESA57/img3.jpg",
            "/images/MESAS/MESA57/img4.jpg"
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
            wood: [{ name: "Oil-wax color", hex: "#1D1C1A" }],
            stone: [
                { name: "Moonlight White", hex: "#F4F4F0" },
                { name: "Obsidian", hex: "#0F0F0F" }
            ],
            metal: [{ name: "Brushed Gunmetal", hex: "#4A4A4A" }]
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
    // MESA 58 (movida desde gabinetes GAB13)
    {
        id: "mesa-hytl86202",
        name: "Mesa de Té HYTL86202",
        category: "Mesa de Té",
        code: "HYTL86202/HCT1839",
        priceBase: 46480,
        image: "/images/MESAS/MESA58/render.jpg",
        schematics: [
            "/images/MESAS/MESA58/img1.jpg",
            "/images/MESAS/MESA58/img2.jpg",
            "/images/MESAS/MESA58/img3.jpg",
            "/images/MESAS/MESA58/img4.jpg",
            "/images/MESAS/MESA58/img5.jpg",
            "/images/MESAS/MESA58/img6.jpg",
            "/images/MESAS/MESA58/img7.jpg",
            "/images/MESAS/MESA58/img8.jpg",
            "/images/MESAS/MESA58/img9.jpg",
            "/images/MESAS/MESA58/img10.jpg"
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
            wood: [{ name: "Oil-wax color", hex: "#1D1C1A" }],
            stone: [{ name: "Cold River Snow", hex: "#EAEAEA" }],
            metal: [{ name: "Brushed Gunmetal", hex: "#4A4A4A" }]
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
    // MESA 59 (movida desde gabinetes GAB14)
    {
        id: "mesa-hytl86202-b",
        name: "Mesa de Té HYTL86202-B",
        category: "Mesa de Té",
        code: "HYTL86202-B/HCT1839-B",
        priceBase: 37060,
        image: "/images/MESAS/MESA59/render.jpg",
        schematics: [
            "/images/MESAS/MESA59/img1.jpg",
            "/images/MESAS/MESA59/img2.jpg",
            "/images/MESAS/MESA59/img3.jpg"
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
            wood: [{ name: "Oil-wax color", hex: "#1D1C1A" }],
            stone: [{ name: "Cold River Snow", hex: "#EAEAEA" }],
            metal: [{ name: "Brushed Gunmetal", hex: "#4A4A4A" }]
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
    // MESA 60 (movida desde gabinetes GAB15)
    {
        id: "mesa-hytl86205",
        name: "Mesa de Té HYTL86205",
        category: "Mesa de Té",
        code: "HYTL86205/MQT7715-C",
        priceBase: 44750,
        image: "/images/MESAS/MESA60/render.jpg",
        schematics: [
            "/images/MESAS/MESA60/img1.jpg",
            "/images/MESAS/MESA60/img2.jpg",
            "/images/MESAS/MESA60/img3.jpg",
            "/images/MESAS/MESA60/img4.jpg"
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
            wood: [{ name: "Oil-wax color", hex: "#1D1C1A" }],
            stone: [{ name: "Picasso (Genuine bright)", hex: "#EBEBEB" }],
            metal: [{ name: "Brushed Gunmetal", hex: "#4A4A4A" }]
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
    // MESA 61
    {
        id: "mesa-te-hygl81706",
        name: "Tea Cabinet HYGL81706",
        category: "Mesa de Té",
        code: "HYGL81706",
        priceBase: null,
        image: "/images/MESAS/MESA61/render.jpg",
        schematics: [
            "/images/MESAS/MESA61/img1.jpg",
            "/images/MESAS/MESA61/img2.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Assembled / 1 piece"
        },
        materials: [
            { part: "Cuerpo cilíndrico (Body)", material: "Madera de Fresno (Ash wood)", detail: "Negro tintado — textura de grano vertical" },
            { part: "Bandeja superior giratoria (Rotating top tray)", material: "Piedra sinterizada / Metal", detail: "Blanco piedra con aro metálico gunmetal" },
            { part: "Puerta lateral (Side door)", material: "Cuero / Leather", detail: "Taupe / Bronce mate" },
            { part: "Interior (Shelves)", material: "Madera de Fresno (Ash wood)", detail: "Negro tintado — 2 estantes interiores" }
        ],
        colors: {
            interior: [
                { name: "Dark Ash / Black Stain", hex: "#2A2A2A" },
                { name: "Taupe / Bronze Leather", hex: "#8A7A68" }
            ]
        },
        configurations: [
            { code: "HYGL81706", desc: null, price: null }
        ],
        priceList: [
            { name: "Tea Cabinet HYGL81706", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 62
    {
        id: "mesa-te-hygl81703",
        name: "Tea Cabinet HYGL81703",
        category: "Mesa de Té",
        code: "HYGL81703",
        priceBase: null,
        image: "/images/MESAS/MESA62/render.jpg",
        schematics: [
            "/images/MESAS/MESA62/img1.jpg",
            "/images/MESAS/MESA62/img2.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Assembled / 1 piece"
        },
        materials: [
            { part: "Cuerpo (Body)", material: "Madera de Fresno (Ash wood)", detail: "Gris oscuro / Dark Gray — grano vertical" },
            { part: "Marco superior (Top frame)", material: "Metal", detail: "Negro mate — estructura abierta para servicio de té" },
            { part: "Equipamiento de té (Tea equipment)", material: "Metal", detail: "Negro mate — hervidor + dispensador integrados" },
            { part: "Patas (Feet)", material: "Metal", detail: "Negro mate — pequeñas patas tipo rueda" }
        ],
        colors: {
            interior: [
                { name: "Dark Gray Ash Wood", hex: "#3A3A3A" }
            ]
        },
        configurations: [
            { code: "HYGL81703", desc: null, price: null }
        ],
        priceList: [
            { name: "Tea Cabinet HYGL81703", size: null, price: null }
        ],
        customInstructions: null
    },
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
        console.log(`✅ ¡ÉXITO! Las ${tablesData.length} mesas se han subido correctamente a la tabla 'mesas'.`);
    }
}

subirMesas();