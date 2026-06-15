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
        color_general: "Marrón",
        material_general: "Mármol",
        colores_disponibles: ["Marrón"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Moon Valley Series",
        category: "Mesa de Centro",
        code: "HYJL82103-B6",
        priceBase: 9760,
        image: "/images/MESAS/MESA1/render.jpg",
        schematics: [
            "/images/MESAS/MESA1/img1.jpg"
        ],
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
                { name: "Marrón", hex: "#8B6914", image: "/images/MESAS/MESA1/render.jpg" }
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
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Gris","Dorado"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Gris", hex: "#6B6D6E", image: "/images/MESAS/MESA2/render.jpg" }
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
        color_general: "Rojo",
        material_general: "Mármol",
        colores_disponibles: ["Rojo"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Auxiliar Zilo Red",
        category: "Mesa Auxiliar",
        code: "HYJL82105-A1",
        priceBase: 5790,
        // RECUERDA: Guardar la imagen aquí
        image: "/images/MESAS/MESA3/render.jpg",
        schematics: [
            "/images/MESAS/MESA3/img1.jpg"
        ],
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
                { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA3/render.jpg" }
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
        color_general: "Blanco",
        material_general: "Mármol",
        colores_disponibles: ["Blanco"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA4/render.jpg" }
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
        color_general: "Negro",
        material_general: "Mixto",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Mármol","Metal","Madera"],
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
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA5/render.jpg" }
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
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Gris","Negro"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Centro Brasília Black",
        category: "Mesa de Centro",
        code: "HYJL82107-A-HC1929-A",
        priceBase: 20260,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA6/render.jpg
        image: "/images/MESAS/MESA6/render.jpg",
        schematics: [
            "/images/MESAS/MESA6/img1.jpg"
        ],
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
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA6/render.jpg" }
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
        color_general: "Gris",
        material_general: "Mármol",
        colores_disponibles: ["Verde","Negro"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Centro Emerald Clouds",
        category: "Mesa de Centro",
        code: "HYJL82107-BHC1929-B",
        priceBase: 13950,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA7/render.jpg
        image: "/images/MESAS/MESA7/render.jpg",
        schematics: [
            "/images/MESAS/MESA7/img1.jpg"
        ],
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
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA7/render.jpg" }
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
        color_general: "Verde",
        material_general: "Mármol",
        colores_disponibles: ["Verde","Negro"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Auxiliar Prada Green",
        category: "Mesa Auxiliar",
        code: "HYJL82107-C1",
        priceBase: 7690,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA8/render.jpg
        image: "/images/MESAS/MESA8/render.jpg",
        schematics: [
            "/images/MESAS/MESA8/img1.jpg"
        ],
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
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA8/render.jpg" }
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
        color_general: "Plateado",
        material_general: "Metal",
        colores_disponibles: ["Plateado"],
        materiales_disponibles: ["Metal","Mármol"],
        name: "Mesa Centro Silver Sculpture",
        category: "Mesa de Centro",
        code: "HYJL82108-A",
        priceBase: 9980,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA9/render.jpg
        image: "/images/MESAS/MESA9/render.jpg",
        schematics: [
            "/images/MESAS/MESA9/img1.jpg"
        ],
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
                { name: "Plateado", hex: "#C0C0C0", image: "/images/MESAS/MESA9/render.jpg" }
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
        color_general: "Plateado",
        material_general: "Metal",
        colores_disponibles: ["Plateado"],
        materiales_disponibles: ["Metal"],
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
                { name: "Plateado", hex: "#C0C0C0", image: "/images/MESAS/MESA10/render.jpg" }
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
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Centro Milky Way Starry",
        category: "Mesa de Centro",
        code: "HYJL82109-A",
        priceBase: 17460,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA11/render.jpg
        image: "/images/MESAS/MESA11/render.jpg",
        schematics: [
            "/images/MESAS/MESA11/img1.jpg"
        ],
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
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA11/render.jpg" }
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
        color_general: "Blanco",
        material_general: "Mármol",
        colores_disponibles: ["Blanco","Negro"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Centro Snow Mountain",
        category: "Mesa de Centro",
        code: "HYJL82109-B1",
        priceBase: 17580,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA12/render.jpg
        image: "/images/MESAS/MESA12/render.jpg",
        schematics: [
            "/images/MESAS/MESA12/img1.jpg"
        ],
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
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA12/render.jpg" }
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
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Auxiliar Milky Way",
        category: "Mesa Auxiliar",
        code: "HYJL82109-C",
        priceBase: 5250,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA13/render.jpg
        image: "/images/MESAS/MESA13/render.jpg",
        schematics: [
            "/images/MESAS/MESA13/img1.jpg"
        ],
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
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA13/render.jpg" }
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
        color_general: "Blanco",
        material_general: "Mármol",
        colores_disponibles: ["Blanco"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Centro Snow White Rectangular",
        category: "Mesa de Centro",
        code: "HYJL82111-A",
        priceBase: 14560,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA14/render.jpg
        image: "/images/MESAS/MESA14/render.jpg",
        schematics: [
            "/images/MESAS/MESA14/img1.jpg",
            "/images/MESAS/MESA14/img2.jpg"
        ],
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
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA14/render.jpg" }
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
        color_general: "Beige",
        material_general: "Mármol",
        colores_disponibles: ["Beige"],
        materiales_disponibles: ["Piedra","Metal"],
        name: "Mesa Centro Lan Kwai Fong",
        category: "Mesa de Centro",
        code: "HYJL82112-A3",
        priceBase: 13260,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA15/render.jpg
        image: "/images/MESAS/MESA15/render.jpg",
        schematics: [
            "/images/MESAS/MESA15/img1.jpg"
        ],
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
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA15/render.jpg" }
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
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Auxiliar Ancient Wood",
        category: "Mesa Auxiliar",
        code: "HYJL82112-B1",
        priceBase: 6160,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA16/render.jpg
        image: "/images/MESAS/MESA16/render.jpg",
        schematics: [
            "/images/MESAS/MESA16/img1.jpg"
        ],
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
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA16/render.jpg" }
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
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro","Rojo"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA17/render.jpg" },
                { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA17/render.jpg" }
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
        color_general: "Negro",
        material_general: "Madera",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Madera","Metal"],
        name: "Set Centro Organic Black",
        category: "Sets Completos",
        code: "HYJL82130A-B",
        priceBase: 15320, // Precio combinado (10460 + 4860)
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA18/render.jpg
        image: "/images/MESAS/MESA18/render.jpg",
        schematics: [
            "/images/MESAS/MESA18/img1.jpg",
            "/images/MESAS/MESA18/img2.jpg",
            "/images/MESAS/MESA18/img3.jpg",
            "/images/MESAS/MESA18/img4.jpg"
        ],
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
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA18/render.jpg" }
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
        color_general: "Rojo",
        material_general: "Madera",
        colores_disponibles: ["Rojo"],
        materiales_disponibles: ["Metal","Fibra"],
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
                { name: "Rojo", hex: "#C0392B", image: "/images/MESAS/MESA19/render.jpg" }
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
        color_general: "Gris",
        material_general: "Mixto",
        colores_disponibles: ["Gris","Rojo"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Set Centro Space Gray & Huayi",
        category: "Sets Completos",
        code: "HYJL82132",
        priceBase: 20940, // Precio combinado (16980 + 3960)
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA20/render.jpg
        image: "/images/MESAS/MESA20/render.jpg",
        schematics: [
            "/images/MESAS/MESA20/img1.jpg"
        ],
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
                { name: "Gris", hex: "#6B6D6E", image: "/images/MESAS/MESA20/render.jpg" },
                { name: "Rojo", hex: "#C0392B", image: "/images/MESAS/MESA20/render.jpg" }
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
        color_general: "Gris",
        material_general: "Mixto",
        colores_disponibles: ["Gris"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA21/render.jpg" }
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
        color_general: "Gris",
        material_general: "Mármol",
        colores_disponibles: ["Gris"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Gris", hex: "#6B6D6E", image: "/images/MESAS/MESA22/render.jpg" }
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
        color_general: "Beige",
        material_general: "Vidrio",
        colores_disponibles: ["Blanco"],
        materiales_disponibles: ["Vidrio","Metal"],
        name: "Mesa Centro Glass & Cave",
        category: "Mesa de Centro",
        code: "HYJL82150-A",
        priceBase: 17460,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA23/render.jpg
        image: "/images/MESAS/MESA23/render.jpg",
        schematics: [
            "/images/MESAS/MESA23/img1.jpg"
        ],
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
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA23/render.jpg" }
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
        color_general: "Blanco",
        material_general: "Mármol",
        colores_disponibles: ["Blanco","Verde"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Set Centro Snow & Emerald",
        category: "Sets Completos",
        code: "HYJL82151",
        priceBase: 28730, // Precio combinado (18750 + 9980)
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA24/render.jpg
        image: "/images/MESAS/MESA24/render.jpg",
        schematics: [
            "/images/MESAS/MESA24/img1.jpg"
        ],
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
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA24/render.jpg" },
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA24/render.jpg" }
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
        color_general: "Gris",
        material_general: "Mármol",
        colores_disponibles: ["Verde"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA25/render.jpg" }
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
        color_general: "Gris",
        material_general: "Mixto",
        colores_disponibles: ["Verde","Negro","Rojo"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA26/render.jpg" },
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA26/render.jpg" },
                { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA26/render.jpg" }
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
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Centro Milky Way Gold",
        category: "Mesa de Centro",
        code: "HYJL82156-A1",
        priceBase: 14690,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA27/render.jpg
        image: "/images/MESAS/MESA27/render.jpg",
        schematics: [
            "/images/MESAS/MESA27/img1.jpg",
            "/images/MESAS/MESA27/img2.jpg",
            "/images/MESAS/MESA27/img3.jpg"
        ],
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
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA27/render.jpg" }
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
        color_general: "Blanco",
        material_general: "Mármol",
        colores_disponibles: ["Blanco"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA28/render.jpg" }
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
        color_general: "Gris",
        material_general: "Metal",
        colores_disponibles: ["Gris"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Auxiliar C-Shape Gunmetal",
        category: "Mesa Auxiliar",
        code: "HYJL82202",
        priceBase: 6150,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA29/render.jpg
        image: "/images/MESAS/MESA29/render.jpg",
        schematics: [
            "/images/MESAS/MESA29/img1.jpg"
        ],
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
                { name: "Gris", hex: "#6B6D6E", image: "/images/MESAS/MESA29/render.jpg" }
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
        color_general: "Dorado",
        material_general: "Metal",
        colores_disponibles: ["Dorado"],
        materiales_disponibles: ["Metal"],
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
                { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA30/render.jpg" }
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
        color_general: "Blanco",
        material_general: "Mármol",
        colores_disponibles: ["Blanco","Negro"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Rincón Calacatta Gold",
        category: "Mesa Auxiliar",
        code: "HYJL82302-A1",
        priceBase: 12790,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA31/render.jpg
        image: "/images/MESAS/MESA31/render.jpg",
        schematics: [
            "/images/MESAS/MESA31/img1.jpg"
        ],
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
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA31/render.jpg" },
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA31/render.jpg" }
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
        color_general: "Dorado",
        material_general: "Metal",
        colores_disponibles: ["Dorado","Beige"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA32/render.jpg" },
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA32/render.jpg" }
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
        color_general: "Dorado",
        material_general: "Metal",
        colores_disponibles: ["Dorado"],
        materiales_disponibles: ["Metal"],
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
                { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA33/render.jpg" }
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
        color_general: "Gris",
        material_general: "Mármol",
        colores_disponibles: ["Verde"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA34/render.jpg" }
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
        color_general: "Rojo",
        material_general: "Mixto",
        colores_disponibles: ["Rojo"],
        materiales_disponibles: ["Metal","Fibra"],
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
                { name: "Rojo", hex: "#C0392B", image: "/images/MESAS/MESA35/render.jpg" }
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
        color_general: "Verde",
        material_general: "Vidrio",
        colores_disponibles: ["Verde","Negro"],
        materiales_disponibles: ["Vidrio","Metal"],
        name: "Mesa Rincón Prada & Glass",
        category: "Mesa Auxiliar",
        code: "HYJL82318",
        priceBase: 9390,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA36/render.jpg
        image: "/images/MESAS/MESA36/render.jpg",
        schematics: [
            "/images/MESAS/MESA36/img1.jpg",
            "/images/MESAS/MESA36/img2.jpg"
        ],
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
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA36/render.jpg" },
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA36/render.jpg" }
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
        color_general: "Gris",
        material_general: "Mármol",
        colores_disponibles: ["Verde"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA37/render.jpg" }
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
        color_general: "Verde",
        material_general: "Mármol",
        colores_disponibles: ["Verde"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Rincón Prada Arch",
        category: "Mesa Auxiliar",
        code: "HYJL82320",
        priceBase: 7280,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA38/render.jpg
        image: "/images/MESAS/MESA38/render.jpg",
        schematics: [
            "/images/MESAS/MESA38/img1.jpg"
        ],
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
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA38/render.jpg" }
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
        color_general: "Marrón",
        material_general: "Madera",
        colores_disponibles: ["Marrón","Blanco"],
        materiales_disponibles: ["Madera","Mármol"],
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
                { name: "Marrón", hex: "#8B6914", image: "/images/MESAS/MESA39/render.jpg" },
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA39/render.jpg" }
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
        color_general: "Verde",
        material_general: "Mármol",
        colores_disponibles: ["Verde"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA40/render.jpg" }
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
        color_general: "Dorado",
        material_general: "Metal",
        colores_disponibles: ["Dorado"],
        materiales_disponibles: ["Metal"],
        name: "Mesa Rincón Cilíndrica",
        category: "Mesa Auxiliar",
        code: "HYJL82306/HG1913",
        priceBase: 5880,
        // RECUERDA: Guardar imagen en: /public/images/MESAS/MESA41/render.jpg
        image: "/images/MESAS/MESA41/render.jpg",
        schematics: [
            "/images/MESAS/MESA41/img1.jpg"
        ],
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
                { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA41/render.jpg" }
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
        color_general: "Gris",
        material_general: "Mármol",
        colores_disponibles: ["Gris"],
        materiales_disponibles: ["Mármol","Metal","Madera"],
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
            interior: [
                { name: "Gris", hex: "#6B6D6E", image: "/images/MESAS/MESA42/render.jpg" }
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
        color_general: "Rojo",
        material_general: "Mármol",
        colores_disponibles: ["Rojo","Negro"],
        materiales_disponibles: ["Mármol","Madera","Metal"],
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
            interior: [
                { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA43/render.jpg" },
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA43/img1.jpg" }
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
        color_general: "Marrón",
        material_general: "Mármol",
        colores_disponibles: ["Marrón","Beige"],
        materiales_disponibles: ["Mármol","Metal"],
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
            interior: [
                { name: "Marrón", hex: "#8B6914", image: "/images/MESAS/MESA44/render.jpg" },
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA44/img3.jpg" }
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
        color_general: "Gris",
        material_general: "Mármol",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Mármol","Madera"],
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
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA45/render.jpg" }
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
        color_general: "Marrón",
        material_general: "Mármol",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Mármol","Metal"],
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
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA46/render.jpg" }
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
        color_general: "Blanco",
        material_general: "Mármol",
        colores_disponibles: ["Blanco","Beige"],
        materiales_disponibles: ["Mármol","Madera"],
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
            interior: [
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA48/render.jpg" },
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA48/img2.jpg" }
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
        color_general: "Gris",
        material_general: "Mármol",
        colores_disponibles: ["Gris"],
        materiales_disponibles: ["Mármol","Metal"],
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
            interior: [
                { name: "Gris", hex: "#6B6D6E", image: "/images/MESAS/MESA49/render.jpg" }
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
        color_general: "Marrón",
        material_general: "Mármol",
        colores_disponibles: ["Marrón","Negro"],
        materiales_disponibles: ["Mármol","Madera"],
        name: "Mesa de Centro CHIN",
        category: "Sets Completos",
        code: "HYJL82106-HC1922Y-A-B-CHIN",
        priceBase: null,
        image: "/images/MESAS/MESA50/render.jpg",
        schematics: [
            "/images/MESAS/MESA50/img1.jpg",
            "/images/MESAS/MESA50/img2.jpg",
            "/images/MESAS/MESA50/img3.jpg"
        ],
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
        color_general: "Gris",
        material_general: "Mármol",
        colores_disponibles: ["Gris"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Comedor CHIN",
        category: "Mesa de Comedor",
        code: "HYJL82901",
        priceBase: null,
        image: "/images/MESAS/MESA51/render.jpg",
        schematics: [
            "/images/MESAS/MESA51/img1.jpg",
        ],
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
        color_general: "Negro",
        material_general: "Madera",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Madera","Mármol"],
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
        color_general: "Marrón",
        material_general: "Mixto",
        colores_disponibles: ["Negro","Marrón"],
        materiales_disponibles: ["Madera","Cuero","Metal"],
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
        color_general: "Beige",
        material_general: "Mármol",
        colores_disponibles: ["Blanco"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA54/render.jpg" }
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
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Mármol","Metal"],
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
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA55/render.jpg" }
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
        color_general: "Beige",
        material_general: "Mármol",
        colores_disponibles: ["Beige","Gris"],
        materiales_disponibles: ["Mármol","Madera"],
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
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA56/render.jpg" },
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA56/render.jpg" }
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
        color_general: "Blanco",
        material_general: "Piedra",
        colores_disponibles: ["Negro","Blanco"],
        materiales_disponibles: ["Madera","Mármol","Metal"],
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
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA57/render.jpg" },
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA57/img1.jpg" }
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
    // MESA 58 (movida desde gabinetes GAB13)
    {
        id: "mesa-hytl86202",
        color_general: "Negro",
        material_general: "Madera",
        colores_disponibles: ["Negro","Blanco"],
        materiales_disponibles: ["Madera","Mármol","Metal"],
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
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA58/render.jpg" },
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA58/render.jpg" }
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
    // MESA 59 (movida desde gabinetes GAB14)
    {
        id: "mesa-hytl86202-b",
        color_general: "Negro",
        material_general: "Madera",
        colores_disponibles: ["Negro","Gris"],
        materiales_disponibles: ["Madera","Mármol"],
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
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA59/render.jpg" },
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA59/render.jpg" }
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
    // MESA 60 (movida desde gabinetes GAB15)
    {
        id: "mesa-hytl86205",
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro","Gris"],
        materiales_disponibles: ["Madera","Mármol","Metal"],
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
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA60/render.jpg" },
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA60/render.jpg" }
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
    // MESA 61
    {
        id: "mesa-te-hygl81706",
        color_general: "Negro",
        material_general: "Madera",
        colores_disponibles: ["Gris"],
        materiales_disponibles: ["Madera","Metal"],
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
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA61/render.jpg" }
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
        color_general: "Negro",
        material_general: "Madera",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Madera"],
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
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA62/render.jpg" }
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
    // MESA 63
    {
        id: "mesa-auxiliar-hyjl82309-hg1908",
        color_general: "Beige",
        material_general: "Piedra",
        colores_disponibles: ["Beige","Negro"],
        materiales_disponibles: ["Piedra","Metal"],
        name: "Mesa Auxiliar HYJL82309",
        category: "Mesa Auxiliar",
        code: "HYJL82309-HG1908",
        priceBase: null,
        image: "/images/MESAS/MESA63/render.jpg",
        schematics: [
            "/images/MESAS/MESA63/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Assembled / 1 piece"
        },
        materials: [
            { part: "Columna (Column)", material: "Travertino (Travertine)", detail: "Beige / Crema — textura porosa natural" },
            { part: "Tablero lateral (Side top)", material: "Metal", detail: "Bronce oscuro / Gunmetal — forma oval asimétrica" }
        ],
        colors: {
            interior: [
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA63/render.jpg" },
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA63/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82309-HG1908", desc: null, price: null }
        ],
        priceList: [
            { name: "Mesa Auxiliar HYJL82309", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 64
    {
        id: "mesa-auxiliar-set-hyjl82105-hg1917",
        color_general: "Rojo",
        material_general: "Mármol",
        colores_disponibles: ["Rojo","Blanco"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Set Mesas Auxiliares HYJL82105",
        category: "Mesa Auxiliar",
        code: "HYJL82105-HG1917",
        priceBase: null,
        image: "/images/MESAS/MESA64/render.jpg",
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable / 2 Piezas por mesa"
        },
        materials: [
            { part: "Tablero grande (Large top)", material: "Mármol Natural", detail: "Rojo Borgoña / Rosso Levanto" },
            { part: "Tablero pequeño (Small top)", material: "Mármol Natural", detail: "Blanco Calacatta" },
            { part: "Base (ambas mesas)", material: "Acero Inoxidable", detail: "Brushed Antique Bronze — base cilíndrica" }
        ],
        colors: {
            interior: [
                { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA64/render.jpg" },
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA64/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82105-HG1917", desc: "Set de 2 mesas (grande + pequeña)", price: null }
        ],
        priceList: [
            { name: "Set Mesas Auxiliares HG1917", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 65
    {
        id: "mesa-centro-set-hyjl82103-hc1923",
        color_general: "Beige",
        material_general: "Mármol",
        colores_disponibles: ["Blanco","Gris"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Set Mesas Zen HYJL82103",
        category: "Mesa de Centro",
        code: "HYJL82103-HC1923",
        priceBase: null,
        image: "/images/MESAS/MESA65/render.jpg",
        schematics: [
            "/images/MESAS/MESA65/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable / 2 Piezas por mesa"
        },
        materials: [
            { part: "Tablero grande (Large top)", material: "Mármol Natural", detail: "Beige dorado / Calacatta Gold — forma orgánica" },
            { part: "Base grande (Large base)", material: "Acero Inoxidable", detail: "Brushed Antique Bronze — paneles ondulados con pasadores" },
            { part: "Tablero pequeño (Small top)", material: "Mármol Natural", detail: "Gris rayado / Ice Gray" },
            { part: "Base pequeña (Small base)", material: "Acero Inoxidable", detail: "Brushed Antique Bronze — cilíndrica" }
        ],
        colors: {
            interior: [
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA65/render.jpg" },
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA65/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82103-HC1923", desc: "Set de 2 mesas (centro + auxiliar)", price: null }
        ],
        priceList: [
            { name: "Set Mesas Zen HC1923", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 66
    {
        id: "mesa-centro-set-hc1912",
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro","Rojo"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Set Mesas HC1912",
        category: "Mesa de Centro",
        code: "HC1912",
        priceBase: null,
        image: "/images/MESAS/MESA66/render.jpg",
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable / 2 Piezas por mesa"
        },
        materials: [
            { part: "Tablero grande (Large top)", material: "Mármol Natural", detail: "Negro / Nero Marquina — redondo" },
            { part: "Base grande (Large base)", material: "Acero Inoxidable", detail: "Champagne / Brushed Bronze — arcos curvos" },
            { part: "Tablero pequeño (Small top)", material: "Mármol Natural", detail: "Rojo Borgoña / Rosso Levanto — redondo" },
            { part: "Base pequeña (Small base)", material: "Acero Inoxidable", detail: "Champagne / Brushed Bronze — cilíndrica con arcos" }
        ],
        colors: {
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA66/render.jpg" },
                { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA66/render.jpg" }
            ]
        },
        configurations: [
            { code: "HC1912", desc: "Set de 2 mesas (centro + auxiliar)", price: null }
        ],
        priceList: [
            { name: "Set Mesas HC1912", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 67
    {
        id: "mesa-auxiliar-hc1912-b",
        color_general: "Marrón",
        material_general: "Mármol",
        colores_disponibles: ["Gris"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa Auxiliar HC1912-B",
        category: "Mesa Auxiliar",
        code: "HC1912-B",
        priceBase: null,
        image: "/images/MESAS/MESA67/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Mármol Natural", detail: "Gris veteado — redondo" },
            { part: "Base", material: "Acero Inoxidable", detail: "Champagne / Brushed Bronze — arco en U curvo" }
        ],
        colors: {
            interior: [
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA67/render.jpg" }
            ]
        },
        configurations: [
            { code: "HC1912-B", desc: "Mesa auxiliar individual", price: null }
        ],
        priceList: [
            { name: "Mesa Auxiliar HC1912-B", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 68
    {
        id: "mesa-centro-hc1912-a",
        color_general: "Gris",
        material_general: "Mármol",
        colores_disponibles: ["Gris"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa de Centro HC1912-A",
        category: "Mesa de Centro",
        code: "HC1912-A",
        priceBase: null,
        image: "/images/MESAS/MESA68/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Mármol Natural", detail: "Negro con vetas grises / Black Forest — redondo" },
            { part: "Base", material: "Acero Inoxidable", detail: "Champagne / Brushed Bronze — cilíndrico con arco abierto" }
        ],
        colors: {
            interior: [
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA68/render.jpg" }
            ]
        },
        configurations: [
            { code: "HC1912-A", desc: "Mesa de centro individual", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HC1912-A", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 69
    {
        id: "mesa-auxiliar-set-hyjl82302-hg1906y",
        color_general: "Blanco",
        material_general: "Mármol",
        colores_disponibles: ["Blanco","Dorado"],
        materiales_disponibles: ["Mármol","Metal","Madera"],
        name: "Set Mesas Auxiliares HYJL82302-HG1906Y",
        category: "Mesa Auxiliar",
        code: "HYJL82302-HG1906Y",
        priceBase: null,
        image: "/images/MESAS/MESA69/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable / 2 piezas"
        },
        materials: [
            { part: "Tablero grande", material: "Mármol Natural", detail: "Blanco / Calacatta — redondo" },
            { part: "Base grande", material: "Madera de Fresno", detail: "Negro — cuerpo curvo con ribete bronce champagne" },
            { part: "Detalle base grande", material: "Acero Inoxidable", detail: "Champagne / Brushed Bronze — asa con ojo y patín inferior" },
            { part: "Bandeja pequeña", material: "Acero Inoxidable", detail: "Champagne / Brushed Bronze — bandeja redonda" },
            { part: "Pata pequeña", material: "Madera / Metal", detail: "Negro + base en cruz champagne" }
        ],
        colors: {
            interior: [
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA69/render.jpg" },
                { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA69/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82302-HG1906Y", desc: "Set de 2 mesas auxiliares (grande + pequeña)", price: null }
        ],
        priceList: [
            { name: "Set Mesas Auxiliares HYJL82302", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 70
    {
        id: "mesa-centro-hyjl82157",
        color_general: "Rojo",
        material_general: "Mármol",
        colores_disponibles: ["Rojo","Negro"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa de Centro HYJL82157",
        category: "Mesa de Centro",
        code: "HYJL82157",
        priceBase: null,
        image: "/images/MESAS/MESA70/render.jpg",
        schematics: [
            "/images/MESAS/MESA70/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Mármol Natural", detail: "Rojo / Rosso Levanto — ovalado" },
            { part: "Base", material: "Acero / MDF lacado", detail: "Gunmetal / Negro mate — cuerpo rectangular asimétrico" },
            { part: "Panel lateral", material: "Metal lacado", detail: "Gris claro — panel curvo lateral" }
        ],
        colors: {
            interior: [
                { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA70/render.jpg" },
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA70/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82157", desc: "Mesa de centro ovalada con base asimétrica", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82157", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 71
    {
        id: "mesa-set-hyjl82156",
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro","Verde","Dorado"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Set Mesas HYJL82156",
        category: "Mesa de Centro",
        code: "HYJL82156",
        priceBase: null,
        image: "/images/MESAS/MESA71/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable / 3 piezas"
        },
        materials: [
            { part: "Tablero grande", material: "Mármol Natural", detail: "Negro / Nero Marquina con veta dorada — redondo grande" },
            { part: "Base grande", material: "Acero Inoxidable", detail: "Dorado / Brushed Gold — panel rectangular con arco circular y esferas negras" },
            { part: "Tableros auxiliares", material: "Mármol Natural", detail: "Verde / Verde Guatemala — redondos (2 tamaños)" },
            { part: "Bases auxiliares", material: "Acero Inoxidable", detail: "Dorado / Brushed Gold — estructura con arcos gemelos" }
        ],
        colors: {
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA71/render.jpg" },
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA71/render.jpg" },
                { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA71/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82156", desc: "Set de 3 mesas (1 centro + 2 auxiliares)", price: null }
        ],
        priceList: [
            { name: "Set Mesas HYJL82156", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 72
    {
        id: "mesa-consola-hyjl82153-d",
        color_general: "Negro",
        material_general: "Mixto",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Madera"],
        name: "Mesa Consola HYJL82153-D",
        category: "Mesa Consola",
        code: "HYJL82153-D",
        priceBase: null,
        image: "/images/MESAS/MESA72/render.jpg",
        schematics: [
            "/images/MESAS/MESA72/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Madera lacada / Piedra sinterizada", detail: "Negro mate — ovalado alargado (pill shape)" },
            { part: "Patas", material: "Madera lacada", detail: "Negro mate — placas rectangulares planas" }
        ],
        colors: {
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA72/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82153-D", desc: "Mesa consola / straddle table en negro mate", price: null }
        ],
        priceList: [
            { name: "Mesa Consola HYJL82153-D", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 73
    {
        id: "mesa-centro-hyjl82153-c",
        color_general: "Beige",
        material_general: "Mármol",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Madera"],
        name: "Mesa de Centro HYJL82153-C",
        category: "Mesa de Centro",
        code: "HYJL82153-C",
        priceBase: null,
        image: "/images/MESAS/MESA73/render.jpg",
        schematics: [
            "/images/MESAS/MESA73/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Mármol Natural", detail: "Blanco con vetas verde gris / Calacatta Arabescato — redondo" },
            { part: "Base", material: "MDF lacado", detail: "Beige / Taupe — pedestal trébol de tres lóbulos redondeados" }
        ],
        colors: {
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA73/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82153-C", desc: "Mesa de centro redonda con base trébol taupe", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82153-C", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 74
    {
        id: "mesa-centro-hyjl82153-a",
        color_general: "Verde",
        material_general: "Madera",
        colores_disponibles: ["Blanco","Beige"],
        materiales_disponibles: ["Mármol"],
        name: "Mesa de Centro HYJL82153-A",
        category: "Mesa de Centro",
        code: "HYJL82153-A",
        priceBase: null,
        image: "/images/MESAS/MESA74/render.jpg",
        schematics: [
            "/images/MESAS/MESA74/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "MDF lacado", detail: "Verde oscuro / Forest Green — ovalado alargado (pill shape)" },
            { part: "Pata izquierda", material: "MDF lacado", detail: "Verde oscuro / Forest Green — placa rectangular con esquinas redondeadas" },
            { part: "Pata derecha", material: "Mármol Natural", detail: "Blanco con vetas grises / Calacatta — placa rectangular con esquinas redondeadas" }
        ],
        colors: {
            interior: [
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA74/render.jpg" },
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA74/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82153-A", desc: "Mesa de centro ovalada verde con pata mixta madera-mármol", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82153-A", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 75
    {
        id: "mesa-centro-hyjl82152-b",
        color_general: "Beige",
        material_general: "Madera",
        colores_disponibles: ["Verde","Blanco"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa de Centro HYJL82152-B",
        category: "Mesa de Centro",
        code: "HYJL82152-B",
        priceBase: null,
        image: "/images/MESAS/MESA75/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "MDF lacado", detail: "Beige / Taupe — redondo" },
            { part: "Base", material: "MDF lacado", detail: "Beige / Taupe — dos placas en cruz (X)" }
        ],
        colors: {
            interior: [
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA75/render.jpg" },
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA75/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82152-B", desc: "Mesa de centro redonda monocromática beige/taupe con base en cruz", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82152-B", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 76
    {
        id: "mesa-centro-hyjl82152-a",
        color_general: "Verde",
        material_general: "Mármol",
        colores_disponibles: ["Beige"],
        materiales_disponibles: ["Metal"],
        name: "Mesa de Centro HYJL82152-A",
        category: "Mesa de Centro",
        code: "HYJL82152-A",
        priceBase: null,
        image: "/images/MESAS/MESA76/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Mármol Natural", detail: "Verde / Verde Alpi — cuadrado con esquinas redondeadas" },
            { part: "Base", material: "Madera de Fresno", detail: "Negro oscuro — cuerpo rectangular bajo con patas/columnas redondeadas" },
            { part: "Pieza lateral", material: "Mármol Natural + Madera", detail: "Verde Alpi + Fresno negro — módulo auxiliar anidado" }
        ],
        colors: {
            interior: [
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA76/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82152-A", desc: "Mesa de centro cuadrada baja con módulo lateral anidado", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82152-A", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 77
    {
        id: "mesa-auxiliar-hyjl82151-c",
        color_general: "Blanco",
        material_general: "Mármol",
        colores_disponibles: ["Verde","Negro"],
        materiales_disponibles: ["Mármol","Madera"],
        name: "Mesa Auxiliar HYJL82151-C",
        category: "Mesa Auxiliar",
        code: "HYJL82151-C",
        priceBase: null,
        image: "/images/MESAS/MESA77/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Mármol Natural", detail: "Blanco con vetas grises / Arabescato — redondo con ribete dorado" },
            { part: "Panel vertical", material: "Madera de Fresno", detail: "Negro — placa curva en arco (bracket)" },
            { part: "Columna", material: "Mármol Natural", detail: "Blanco con vetas grises / Arabescato — cilíndrica" }
        ],
        colors: {
            interior: [
                { name: "Verde", hex: "#2A5A35", image: "/images/MESAS/MESA77/render.jpg" },
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA77/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82151-C", desc: "Mesa auxiliar escultórica panel arco negro + columna mármol", price: null }
        ],
        priceList: [
            { name: "Mesa Auxiliar HYJL82151-C", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 78
    {
        id: "mesa-centro-hyjl82151-b",
        color_general: "Verde",
        material_general: "Mármol",
        colores_disponibles: ["Blanco","Negro","Dorado"],
        materiales_disponibles: ["Mármol","Madera","Metal"],
        name: "Mesa de Centro HYJL82151-B",
        category: "Mesa de Centro",
        code: "HYJL82151-B",
        priceBase: null,
        image: "/images/MESAS/MESA78/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Mármol Natural", detail: "Verde gris veteado — ovalado con ribete dorado/bronce" },
            { part: "Pata izquierda", material: "Metal lacado", detail: "Bronce oscuro / Bronze — columna rectangular redondeada" },
            { part: "Pata derecha", material: "Madera de Fresno", detail: "Gris oscuro — columna rectangular redondeada" },
            { part: "Conector", material: "Metal", detail: "Gunmetal — lámina vertical entre patas" }
        ],
        colors: {
            interior: [
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA78/render.jpg" },
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA78/render.jpg" },
                { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA78/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82151-B", desc: "Mesa de centro ovalada con patas asimétricas bronce + ash gris", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82151-B", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 79
    {
        id: "mesa-centro-hyjl82151-a",
        color_general: "Beige",
        material_general: "Mármol",
        colores_disponibles: ["Gris","Marrón","Dorado"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Mesa de Centro HYJL82151-A",
        category: "Mesa de Centro",
        code: "HYJL82151-A",
        priceBase: null,
        image: "/images/MESAS/MESA79/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Mármol Natural", detail: "Multicolor / Patagonia — blanco + nubes gris oscuro + vetas ámbar, ovalado con ribete dorado" },
            { part: "Pata izquierda", material: "Acero Inoxidable", detail: "Brushed Gold / Brass — placa plana con capuchón decorativo superior" },
            { part: "Pata derecha", material: "Madera de Fresno", detail: "Gris oscuro — placa rectangular con esquinas redondeadas" }
        ],
        colors: {
            interior: [
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA79/render.jpg" },
                { name: "Marrón", hex: "#8B6914", image: "/images/MESAS/MESA79/render.jpg" },
                { name: "Dorado", hex: "#B8860B", image: "/images/MESAS/MESA79/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82151-A", desc: "Mesa de centro ovalada mármol exótico con patas asimétricas brass + ash gris", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82151-A", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 80
    {
        id: "mesa-centro-hyjl82137",
        color_general: "Gris",
        material_general: "Vidrio",
        colores_disponibles: ["Beige"],
        materiales_disponibles: ["Piedra","Vidrio"],
        name: "Mesa de Centro HYJL82137",
        category: "Mesa de Centro",
        code: "HYJL82137",
        priceBase: null,
        image: "/images/MESAS/MESA80/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Vidrio templado", detail: "Ahumado gris oscuro — redondo" },
            { part: "Base", material: "Travertino", detail: "Beige / Crema — dos prismas triangulares cruzados en X" }
        ],
        colors: {
            interior: [
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA80/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82137", desc: "Mesa de centro vidrio ahumado + base travertino prismas cruzados", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82137", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 81
    {
        id: "mesa-set-hyjl82136",
        color_general: "Rojo",
        material_general: "Mármol",
        colores_disponibles: ["Gris","Rojo"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Set Mesas HYJL82136",
        category: "Mesa de Centro",
        code: "HYJL82136",
        priceBase: null,
        image: "/images/MESAS/MESA81/render.jpg",
        schematics: [
            "/images/MESAS/MESA81/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable / 3 piezas"
        },
        materials: [
            { part: "Tablero grande", material: "Piedra / Mármol", detail: "Blanco — redondo" },
            { part: "Aro superior", material: "Madera lacada", detail: "Borgoña / Burgundy — borde redondo" },
            { part: "Cuerpo cilíndrico", material: "Cuero genuino", detail: "Gris / Taupe — cosido, cuerpo tambor" },
            { part: "Detalles metálicos", material: "Acero Inoxidable", detail: "Brushed Gold / Brass — tiras verticales y pies" },
            { part: "Tableros auxiliares", material: "Madera lacada", detail: "Borgoña / Burgundy — redondos (2 tamaños)" }
        ],
        colors: {
            interior: [
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA81/render.jpg" },
                { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA81/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82136", desc: "Set de 3 mesas (grande baja + auxiliar alta + auxiliar baja) cuero y borgoña", price: null }
        ],
        priceList: [
            { name: "Set Mesas HYJL82136", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 82
    {
        id: "mesa-auxiliar-hyjl82136-b",
        color_general: "Rojo",
        material_general: "Madera",
        colores_disponibles: ["Gris","Rojo"],
        materiales_disponibles: ["Metal"],
        name: "Mesa Auxiliar HYJL82136-B",
        category: "Mesa Auxiliar",
        code: "HYJL82136-B",
        priceBase: null,
        image: "/images/MESAS/MESA82/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero superior", material: "Madera lacada", detail: "Borgoña / Burgundy — redondo" },
            { part: "Banda superior", material: "Cuero genuino", detail: "Gris / Taupe — cosido, aro cilíndrico" },
            { part: "Tablero inferior", material: "Madera lacada", detail: "Borgoña / Burgundy — redondo más ancho" },
            { part: "Cuerpo inferior", material: "Cuero genuino", detail: "Gris / Taupe — cosido, banda cilíndrica baja" },
            { part: "Estructura", material: "Acero Inoxidable", detail: "Brushed Gold / Brass — varillas verticales y pies" }
        ],
        colors: {
            interior: [
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA82/render.jpg" },
                { name: "Rojo", hex: "#7A3532", image: "/images/MESAS/MESA82/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82136-B", desc: "Mesa auxiliar 2 niveles cuero taupe + borgoña + estructura brass", price: null }
        ],
        priceList: [
            { name: "Mesa Auxiliar HYJL82136-B", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 83
    {
        id: "mesa-centro-hyjl82136-a",
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Gris","Negro"],
        materiales_disponibles: ["Mármol"],
        name: "Mesa de Centro HYJL82136-A",
        category: "Mesa de Centro",
        code: "HYJL82136-A",
        priceBase: null,
        image: "/images/MESAS/MESA83/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Mármol Natural", detail: "Gris oscuro / Nero Marquina — redondo" },
            { part: "Aro superior", material: "Madera lacada", detail: "Borgoña / Burgundy — borde redondo" },
            { part: "Cuerpo cilíndrico", material: "Cuero genuino", detail: "Gris / Taupe — cosido, cuerpo tambor" },
            { part: "Detalle metálico", material: "Acero Inoxidable", detail: "Brushed Gold / Brass — tira vertical" }
        ],
        colors: {
            interior: [
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA83/render.jpg" },
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA83/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82136-A", desc: "Mesa de centro grande individual cuerpo tambor cuero taupe + mármol oscuro", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82136-A", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 84
    {
        id: "mesa-set-hyjl82135",
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Mármol"],
        name: "Set Mesas HYJL82135",
        category: "Mesa de Centro",
        code: "HYJL82135",
        priceBase: null,
        image: "/images/MESAS/MESA84/render.jpg",
        schematics: [
            "/images/MESAS/MESA84/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable / 2 piezas"
        },
        materials: [
            { part: "Tableros", material: "Mármol Natural", detail: "Negro / Nero Marquina con vetas blancas — forma orgánica irregular (2 tamaños/alturas)" },
            { part: "Bases", material: "Acero Inoxidable", detail: "Gunmetal / Negro mate — cónicas truncadas (2 tamaños)" }
        ],
        colors: {
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA84/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82135", desc: "Set de 2 mesas con tableros orgánicos mármol negro + bases cónicas gunmetal a distinta altura", price: null }
        ],
        priceList: [
            { name: "Set Mesas HYJL82135", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 85
    {
        id: "mesa-centro-hyjl82135",
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro","Plateado"],
        materiales_disponibles: ["Mármol"],
        name: "Mesa de Centro HYJL82135",
        category: "Mesa de Centro",
        code: "HYJL82135",
        priceBase: null,
        image: "/images/MESAS/MESA85/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "Mármol Natural", detail: "Negro / Nero Marquina con vetas blancas — forma orgánica irregular" },
            { part: "Base", material: "Acero Inoxidable", detail: "Gunmetal / Negro mate — cónica truncada" }
        ],
        colors: {
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA85/render.jpg" },
                { name: "Plateado", hex: "#C0C0C0", image: "/images/MESAS/MESA85/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82135", desc: "Mesa de centro individual tablero orgánico mármol negro + base cónica gunmetal", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82135", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 86
    {
        id: "mesa-centro-hyjl82132-b",
        color_general: "Rojo",
        material_general: "Madera",
        colores_disponibles: ["Rojo"],
        materiales_disponibles: ["Madera"],
        name: "Mesa de Centro HYJL82132-B",
        category: "Mesa de Centro",
        code: "HYJL82132-B",
        priceBase: null,
        image: "/images/MESAS/MESA86/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero", material: "MDF lacado", detail: "Rojo borgoña / Terracota — rectangular con detalle circular rehundido" },
            { part: "Base", material: "MDF lacado", detail: "Rojo borgoña / Terracota — plinto rectangular bajo" }
        ],
        colors: {
            interior: [
                { name: "Rojo", hex: "#8B2020", image: "/images/MESAS/MESA86/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82132-B", desc: "Mesa de centro rectangular monocromática rojo borgoña con detalle circular en tablero", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82132-B", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 87
    {
        id: "mesa-centro-hyjl82132-a",
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro"],
        materiales_disponibles: ["Mármol"],
        name: "Mesa de Centro HYJL82132-A",
        category: "Mesa de Centro",
        code: "HYJL82132-A",
        priceBase: null,
        image: "/images/MESAS/MESA87/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Tablero / Cuerpo", material: "Mármol Natural", detail: "Gris oscuro con vetas blancas / Grigio Carnico — rectangular grueso con detalle circular rehundido" },
            { part: "Base", material: "Acero Inoxidable", detail: "Gunmetal / Negro mate — plinto rectangular" }
        ],
        colors: {
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA87/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82132-A", desc: "Mesa de centro rectangular mármol gris oscuro con detalle circular rehundido", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82132-A", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 88
    {
        id: "mesa-set-hyjl82122-hc1951",
        color_general: "Negro",
        material_general: "Vidrio",
        colores_disponibles: ["Negro","Beige","Plateado"],
        materiales_disponibles: ["Mármol","Metal"],
        name: "Set Mesas HYJL82122-HC1951A-B-C",
        category: "Mesa de Centro",
        code: "HYJL82122-HC1951A-B-C",
        priceBase: null,
        image: "/images/MESAS/MESA88/render.jpg",
        schematics: [
            "/images/MESAS/MESA88/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable / 3 piezas"
        },
        materials: [
            { part: "Mesa A — Tablero y base", material: "Vidrio espejo", detail: "Ahumado gris oscuro — cuadrado con base facetada geométrica / origami" },
            { part: "Mesa B — Cuerpo", material: "Mármol Natural", detail: "Blanco con manchas gris oscuro / Fantasy Brown — bloque macizo cuadrado" },
            { part: "Mesa C — Estructura", material: "Acero Inoxidable", detail: "Gunmetal / Negro mate — marco angular" }
        ],
        colors: {
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA88/render.jpg" },
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA88/render.jpg" },
                { name: "Plateado", hex: "#C0C0C0", image: "/images/MESAS/MESA88/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82122-HC1951A-B-C", desc: "Set 3 mesas: espejo facetado + bloque mármol exótico + marco gunmetal", price: null }
        ],
        priceList: [
            { name: "Set Mesas HYJL82122-HC1951", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 89
    {
        id: "mesa-set-hyjl82112-chin",
        color_general: "Blanco",
        material_general: "Mármol",
        colores_disponibles: ["Blanco","Negro"],
        materiales_disponibles: ["Mármol"],
        name: "Set Mesas HYJL82112-CHIN",
        category: "Mesa de Centro",
        code: "HYJL82112-CHIN",
        priceBase: null,
        image: "/images/MESAS/MESA89/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable / 3 piezas"
        },
        materials: [
            { part: "Tablero grande", material: "Mármol Natural", detail: "Blanco / Calacatta — redondo" },
            { part: "Tablero pequeño", material: "Mármol Natural", detail: "Negro / Nero Marquina — redondo" },
            { part: "Patas", material: "Madera", detail: "Nogal oscuro / Ebony — columnas cilíndricas con detalle metálico" },
            { part: "Puf", material: "Tela / Cuero", detail: "Gris antracita — redondo con capitoné" }
        ],
        colors: {
            interior: [
                { name: "Blanco", hex: "#F0EDE8", image: "/images/MESAS/MESA89/render.jpg" },
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA89/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82112-CHIN", desc: "Set 2 mesas redondas (mármol blanco + negro, patas nogal) + puf redondo antracita", price: null }
        ],
        priceList: [
            { name: "Set Mesas HYJL82112-CHIN", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 90
    {
        id: "mesa-centro-hyjl82111-b-hc1930y-b",
        color_general: "Negro",
        material_general: "Madera",
        colores_disponibles: ["Gris"],
        materiales_disponibles: ["Madera"],
        name: "Mesa de Centro HYJL82111-B-HC1930Y-B",
        category: "Mesa de Centro",
        code: "HYJL82111-B-HC1930Y-B",
        priceBase: null,
        image: "/images/MESAS/MESA90/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Cuerpo / Tablero", material: "Madera de Fresno", detail: "Gris oscuro / Charcoal — bloque cuadrado con textura veteada ondulada" },
            { part: "Interior", material: "Madera", detail: "Cajón / almacenamiento oculto integrado" }
        ],
        colors: {
            interior: [
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA90/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82111-B-HC1930Y-B", desc: "Mesa de centro bloque cuadrado ash gris oscuro con cajón oculto", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82111-B", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 91
    {
        id: "mesa-set-hyjl82109-hc1931",
        color_general: "Negro",
        material_general: "Mármol",
        colores_disponibles: ["Negro","Beige"],
        materiales_disponibles: ["Mármol"],
        name: "Set Mesas HYJL82109-HC1931",
        category: "Mesa de Centro",
        code: "HYJL82109-HC1931",
        priceBase: null,
        image: "/images/MESAS/MESA91/render.jpg",
        schematics: [
            "/images/MESAS/MESA91/img1.jpg"
        ],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable / 2 piezas"
        },
        materials: [
            { part: "Tableros", material: "Mármol Natural", detail: "Negro / Marrón — Emperador Dark con vetas doradas (2 tamaños)" },
            { part: "Base grande", material: "Acero Inoxidable", detail: "Bronze oscuro / Dark Bronze — 4 patas con arcos curvos entrelazados en trébol" },
            { part: "Base pequeña", material: "Acero Inoxidable", detail: "Bronze oscuro / Dark Bronze — 4 patas con travesaño en arco" }
        ],
        colors: {
            interior: [
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA91/render.jpg" },
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA91/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82109-HC1931", desc: "Set 2 mesas redondas mármol Emperador + bases bronze escultóricas (grande + pequeña)", price: null }
        ],
        priceList: [
            { name: "Set Mesas HYJL82109-HC1931", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 92
    {
        id: "mesa-set-hyjl82107-hc1929",
        color_general: "Blanco",
        material_general: "Mármol",
        colores_disponibles: ["Gris","Beige"],
        materiales_disponibles: ["Mármol"],
        name: "Set Mesas HYJL82107-HC1929",
        category: "Mesa de Centro",
        code: "HYJL82107-HC1929",
        priceBase: null,
        image: "/images/MESAS/MESA92/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable / 3 piezas"
        },
        materials: [
            { part: "Tablero grande", material: "Mármol Natural", detail: "Blanco / Calacatta con vetas grises — redondo" },
            { part: "Tablero mediano", material: "Mármol Natural", detail: "Gris oscuro / Nero Marquina — redondo" },
            { part: "Tablero auxiliar", material: "Madera / Piedra", detail: "Negro — redondo pequeño" },
            { part: "Bases", material: "Acero Inoxidable", detail: "Bronze oscuro / Gunmetal — estructura oval abierta con estante inferior cuero taupe (mesa mediana)" }
        ],
        colors: {
            interior: [
                { name: "Gris", hex: "#8A8A8A", image: "/images/MESAS/MESA92/render.jpg" },
                { name: "Beige", hex: "#C8B68A", image: "/images/MESAS/MESA92/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82107-HC1929", desc: "Set 3 mesas: grande Calacatta + mediana Nero Marquina con estante cuero + auxiliar alta, bases bronze oval", price: null }
        ],
        priceList: [
            { name: "Set Mesas HYJL82107-HC1929", size: null, price: null }
        ],
        customInstructions: null
    },
    // MESA 93
    {
        id: "mesa-centro-hyjl82106-hc1922y",
        color_general: "Negro",
        material_general: "Madera",
        colores_disponibles: ["Marrón","Negro"],
        materiales_disponibles: ["Madera"],
        name: "Mesa de Centro HYJL82106-HC1922Y",
        category: "Mesa de Centro",
        code: "HYJL82106-HC1922Y",
        priceBase: null,
        image: "/images/MESAS/MESA93/render.jpg",
        schematics: [],
        specs: {
            dimensions: null,
            volume: null,
            assembly: "Desmontable"
        },
        materials: [
            { part: "Cuerpo", material: "Madera", detail: "Nogal oscuro / Espresso — bloque rectangular con esquinas redondeadas" },
            { part: "Tablero", material: "Metal lacado", detail: "Gunmetal / Gris oscuro — tapa rectangular con reborde redondeado" }
        ],
        colors: {
            interior: [
                { name: "Marrón", hex: "#8B6914", image: "/images/MESAS/MESA93/render.jpg" },
                { name: "Negro", hex: "#1A1A1A", image: "/images/MESAS/MESA93/render.jpg" }
            ]
        },
        configurations: [
            { code: "HYJL82106-HC1922Y", desc: "Mesa de centro bloque rectangular nogal oscuro con tapa gunmetal", price: null }
        ],
        priceList: [
            { name: "Mesa de Centro HYJL82106-HC1922Y", size: null, price: null }
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