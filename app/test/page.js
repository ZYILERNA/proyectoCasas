"use client";

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { X, Filter, ChevronRight, ScanFace, ShieldCheck, VolumeX, Sparkles, MoveHorizontal, Palette, Settings, Flame } from 'lucide-react';

// --- 1. CONFIGURACIÓN DE CATEGORÍAS ---

const CATEGORIAS = [
  "PUERTA DE SEGURIDAD IA",
  "PUERTA DE ACERO REFORZADO",
  "PUERTA DE SEGURIDAD ACORAZADA",
  "PUERTA DE ALUMINIO FUNDIDO",
  "PUERTA ACÚSTICA DE MADERA",
  "PUERTA DE PVC",
  "PUERTAS CORREDIZAS Y ABATIBLES",
  "PUERTA COMERCIAL CORTAFUEGO",
  "PUERTA MÉDICA"
];

// --- 2. DATOS DE COLORES ---

const COLORS_GLORY = [
    { name: "Black Skin", hex: "#1A1A1A" },
    { name: "Moon Light Grey", hex: "#757575" },
    { name: "Mixed Glaze White", hex: "#FFFFFF" }, 
    { name: "Enamel Copper", hex: "#5D4037" }
];

const COLORS_FASHION = [
    { name: "Black Skin", hex: "#1A1A1A" },
    { name: "Moon Light Grey", hex: "#757575" },
    { name: "Enamel White", hex: "#F5F5F0" }, 
    { name: "Enamel White (Grey)", hex: "#BDBDBD" }
];

const COLORS_CORTAFUEGOS = [
  { name: "Blanco Perla", hex: "#CECFCA" },
  { name: "Beige Piedra", hex: "#BFBBB5" },
  { name: "Gris Plata", hex: "#ACAFAF" },
  { name: "Gris Cemento", hex: "#7C7C78" },
  { name: "Gris Grafito", hex: "#77797A" },
  { name: "Rojo Óxido", hex: "#5C211E" },
  { name: "Verde Musgo", hex: "#47504A" }
];


// --- 3. DATOS DE ACCESORIOS (SOLO CORREDIZAS) ---
const ACCESORIOS_CORREDIZAS = [
  { name: "Manilla VBH con base", tag: "Ventana abatible", img: "/images/Asset/Accesorios/manilla_vbh_base.jpg" },
  { name: "Manilla Runas", tag: "Ventana abatible", img: "/images/Asset/Accesorios/manilla_runas.jpg" },
  { name: "Manilla VBH sin base", tag: "Ventana", img: "/images/Asset/Accesorios/manilla_vbh_sin_base.jpg" },
  { name: "Manilla y Accesorios", tag: "Ventana corrediza", img: "/images/Asset/Accesorios/manilla_accesorios_corrediza.jpg" },
  { name: "Cerradura de Una Línea", tag: "Ventana corrediza", img: "/images/Asset/Accesorios/cerradura_una_linea.jpg" },
  { name: "Manilla con Cerradura Ultrafina", tag: "Puerta corrediza · 210 mm", img: "/images/Asset/Accesorios/manilla_ultrafina.jpg" },
  { name: "A01 Manilla", tag: "310 mm", img: "/images/Asset/Accesorios/a01.jpg" },
  { name: "A03 Manilla", tag: "304 Stainless Steel · 360 mm", img: "/images/Asset/Accesorios/a03.jpg" },
  { name: "A04 Manilla", tag: "390 mm", img: "/images/Asset/Accesorios/a04.jpg" },
  { name: "A05 Manilla", tag: "450 mm", img: "/images/Asset/Accesorios/a05.jpg" },
  { name: "A06 Manilla", tag: "600 mm", img: "/images/Asset/Accesorios/a06.jpg" },
  { name: "A07 Manilla", tag: "1200 mm", img: "/images/Asset/Accesorios/a07.jpg" },
  { name: "B01 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b01.jpg" },
  { name: "B02 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b02.jpg" },
  { name: "B03 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b03.jpg" },
  { name: "B04 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b04.jpg" },
  { name: "C01 Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/c01.jpg" },
  { name: "C02 Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/c02.jpg" },
  { name: "Ultra Narrow Swing Door Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/ultra_narrow_flat_lock.jpg" }
];

const VIDRIOS_CORREDIZAS = [
  { name: "VIDRIO-01", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-01.jpg" },
  { name: "VIDRIO-02", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-02.jpg" },
  { name: "VIDRIO-03", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-03.jpg" },
  { name: "VIDRIO-04", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-04.jpg" },
  { name: "VIDRIO-05", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-05.jpg" },
  { name: "VIDRIO-06", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-06.jpg" },
  { name: "VIDRIO-07", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-07.jpg" },
  { name: "VIDRIO-08", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-08.jpg" },
  { name: "VIDRIO-09", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-09.jpg" },
  { name: "VIDRIO-10", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-10.jpg" },
  { name: "VIDRIO-11", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-11.jpg" },
  { name: "VIDRIO-12", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-12.jpg" },
  { name: "VIDRIO-13", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-13.jpg" },
  { name: "VIDRIO-14", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-14.jpg" },
  { name: "VIDRIO-15", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-15.jpg" },
  { name: "VIDRIO-16", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-16.jpg" },
  { name: "VIDRIO-17", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-17.jpg" },
  { name: "VIDRIO-18", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-18.jpg" },
  { name: "VIDRIO-19", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-19.jpg" },
  { name: "VIDRIO-20", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-20.jpg" },
];


// --- 4. LISTAS DE MODELOS ---

// IA Flagships
const MODELOS_IA = [
  "X50", "X50 Pro", "X60", "X60 Pro", 
  "S108", "S108 Pro", "Glory", "Glory Pro"
];

// Acero Reforzado
const MODELOS_ACERO = [
  "GL098", "NC9020", "GF091", "CL39", "GF092", "GL123-1", "Mid Night", "Contemporary", 
  "GL099", "GL083", "CL56", "GF090", "CL66", "CL37", "CL36", "CL38", "CJ03", "CL23", 
  "CL50", "CL51", "CL097 Pro", "P101", "GL23", "CL058", "CL65", "CL60", "CL72", 
  "P107", "CL55", "CL62", "CL63", "P105", "GF061", "JD073", "NC9516", "P102"
];

// Acorazada (Serie WL)
const MODELOS_ACORAZADA = [
  "WL001", "WL002", "WL003", "WL005", "WL006", "WL007", "WL008", "WL009", 
  "WL010", "WL011", "WL015", "WL016", "WL012", "WL021", "WL029", "WL018", 
  "WL019", "WL020", "WL026", "WL027", "WL022", "WL017", "WL023", "WL028", "WL025"
];

// Aluminio Fundido
const MODELOS_ALUMINIO = [
  "Wave", "Castle", "Woodland", "Louis", "Saab", "Senna", "Lange", "Heidelberg", "Prada"
];

// Madera Acústica - Serie J
const MODELOS_MADERA_J = [
  "WL-J002", "WL-J008", "WL-J011", "WL-J012", "WL-J001", 
  "WL-J003", "WL-J009", "WL-J006", "WL-J010", "WL-J005"
];

// Madera Acústica - Serie D
const MODELOS_MADERA_D = [
  "WL-D003", "WL-D015", "WL-D017", "WL-D011", "WL-D002", "WL-D005", "WL-D006", 
  "WL-D007", "WL-D008", "WL-D010", "WL-D012", "WL-D013", "WL-D016", "WL-D018", 
  "WL-D019", "WL-D020", "WL-D033", "WL-D037", "WL-D001", "WL-D009", "WL-D021", 
  "WL-D022", "WL-D023", "WL-D025", "WL-D026", "WL-D027", "WL-D028", "WL-D029", 
  "WL-D030", "WL-D031", "WL-D032", "WL-D036", "WL-D038", "WL-5103", "WL-5105", 
  "WL-5107", "WL-5109", "WL-5110", "WL-5117", "WL-5203", "WL-5503"
];

// Madera Acústica - Serie S
const MODELOS_MADERA_S = [
  "WL-S009", "WL-S108", "WL-S023", "WL-S206", "WL-S003", "WL-S008", "WL-S010", 
  "WL-S011", "WL-S012", "WL-S020", "WL-S027", "WL-S001", "WL-S002", "WL-S005", 
  "WL-S013", "WL-S015", "WL-S016", "WL-S017", "WL-S019", "WL-S021", "WL-S022", 
  "WL-S025", "WL-S026", "WL-S201", "WL-S002", "WL-S205", "WL-S207", "WL-S208", 
  "WL-S209", "WL-S210", "WL-S101B", "WL-S102B", "WL-S103B"
];

// PVC Vanguardista
const MODELOS_PVC = [
  "WL-P001", "WL-P002", "WL-P003", "WL-P005", "WL-P006", "WL-P007", 
  "WL-P008", "WL-P009", "WL-P010", "WL-P011", "WL-P015", "WL-P016", "WL-P201"
];

// Modelos Corredizas
const MODELOS_CORREDIZAS = [
  "WL-A23001", "WL-A23002", "WL-A23019", "WL-A23020"
];

const MODELOS_CORTAFUEGOS = [
  "GD-01", "GD-02", "GD-03", "TD-01", "TD-02", "TD-03", "GF026"
];

const MODELOS_MEDICAS = [
  "PUERTA DE SALA1",                 // La azul
  "PUERTA DE SALA2",            // La madera/beige
  "PUERTA DE SALA3",
  "PUERTA DE SALA4",
  "PUERTA DE SALA5",
  "PUERTA CORTAFUEGO AISLANTE1",
  "PUERTA CORTAFUEGO AISLANTE2",
  "PUERTA AUTOMÁTICA PLANA, HERMÉTICA Y ABATIBLE",
  "PUERTAS AUTOMÁTICAS HERMÉTICAS"
];

// --- 5. ESPECIFICACIONES Y CARACTERÍSTICAS ---

// --- SPECS IA ---
const SPECS_IA = [
  { label: "Tecnología", value: "IA 3ª Generación" },
  { label: "Sistema", value: "Reconocimiento Facial 3D" },
  { label: "Pantalla", value: "10.1\" IPS Táctil" },
  { label: "Cámara", value: "Gran Angular HD" },
  { label: "Cilindro", value: "Clase C (Máxima Seguridad)" },
  { label: "Automátismo", value: "Motor Brushless Silencioso" }
];
const FEATURES_IA = [
  "Apertura 100% automática sin contacto",
  "Reconocimiento Facial 3D Infrarrojo",
  "Videollamada y vigilancia desde App"
];
const UNLOCK_IA = "Facial / Huella / App / Clave / Tarjeta / Llave";

// --- SPECS COMUNES (ACERO REFORZADO Y ACORAZADA) ---
const SPECS_SEGURIDAD_MECANICA = [
  { label: "Seguridad", value: "9 Capas de Protección" },
  { label: "Relleno", value: "Panal de Aluminio Aeroespacial" },
  { label: "Núcleo", value: "Placa de Acero + Malla Antirrobo" },
  { label: "Bisagras", value: "Invisibles (Instalación Oculta)" },
  { label: "Marco", value: "Engrosado con Riel Elevado" },
  { label: "Blindaje", value: "Protección Cuádruple Reforzada" }
];
const FEATURES_SEGURIDAD_MECANICA = [
  "Seguridad inquebrantable con 9 capas de protección",
  "Estructura de malla de acero antirrobo integrada",
  "Relleno de panal de aluminio y placas de acero"
];
const UNLOCK_MECANICO = "Llave de Seguridad / Opción Cerradura Smart";

// --- SPECS ALUMINIO FUNDIDO ---
const SPECS_ALUMINIO = [
  { label: "Material", value: "Aluminio Fundido al Vacío" },
  { label: "Estructura", value: "Hoja Engrosada de una Pieza" },
  { label: "Marco", value: "Acero Ultra Alta Resistencia" },
  { label: "Relleno", value: "Lámina Aluminio Aeronáutico" },
  { label: "Acabado", value: "Tratamiento Anti-Oxidación" },
  { label: "Aislamiento", value: "Térmico y Acústico Superior" }
];
const FEATURES_ALUMINIO = [
  "Placas procesadas mediante técnica de fundición al vacío",
  "Unión continua a marco de acero de ultra alta resistencia",
  "Bloqueo efectivo del calor y frío exterior"
];

// --- SPECS MADERA ACÚSTICA ---
const SPECS_MADERA = [
  { label: "Núcleo", value: "Madera Sólida Multicapa" },
  { label: "Aislamiento", value: "Alta Reducción dB" },
  { label: "Superficie", value: "Laca UV Ecológica" },
  { label: "Cierre", value: "Magnético Silencioso" },
  { label: "Juntas", value: "Goma EPDM de Sellado" }
];

const FEATURES_MADERA_D = [
  "Estilo minimalista extremo con texturas exquisitas",
  "Integración de funciones y detalles inesperados",
  "Fusión de calidad, moda y arte en el diseño"
];
const FEATURES_MADERA_S = [
  "Diseño de panel plano: simple, directo y puro",
  "Eliminación de elementos innecesarios",
  "Interpretación natural de la practicidad del hogar"
];
const FEATURES_MADERA_J = [
  "Equilibrio entre robustez y elegancia clásica",
  "Aislamiento acústico de alto rendimiento",
  "Acabados premium en madera texturizada"
];
const UNLOCK_MADERA = "Manilla Magnética / Cerradura Silenciosa";

// --- SPECS PVC ---
const SPECS_PVC = [
  { label: "Material", value: "PVC Alta Densidad" },
  { label: "Estilo", value: "Vanguardista Moderno" },
  { label: "Resistencia", value: "Humedad y Corrosión" },
  { label: "Acabado", value: "Contemporáneo" },
  { label: "Mantenimiento", value: "Fácil Limpieza" }
];
const FEATURES_PVC = [
  "Diseños y estilos vanguardistas que rompen el patrón tradicional",
  "Aportan nuevas ideas llenas de modernidad",
  "Llenan de brillo contemporáneo los espacios simples y elegantes"
];
const UNLOCK_PVC = "Cerradura Mecánica / Diseño Moderno";

// --- SPECS CORREDIZAS ---
const SPECS_CORREDIZAS = [
    { label: "Perfil", value: "Aleación 6063-T6 Heavy Duty" },
    { label: "Aislamiento", value: "Rotura Puente Térmico" },
    { label: "Juntas", value: "EPDM Automotriz" },
    { label: "Acabado", value: "PVDF / Anodizado Mate" },
    { label: "Vidrio", value: "Compatible con Doble/Triple" }
];
const FEATURES_CORREDIZAS = [
    "Diseño arquitectónico de gran formato y perfilería esbelta",
    "Máxima eficiencia energética y hermeticidad",
    "Sistemas de apertura suave de ingeniería alemana"
];
const UNLOCK_CORREDIZAS = "Multipunto de Seguridad / Biométrica Opcional";

// --- SPECS CORTAFUEGOS ---
const SPECS_CORTAFUEGOS = [
  { label: "Certificación", value: "Resistencia al Fuego" },
  { label: "Material", value: "Acero Galvanizado" },
  { label: "Relleno", value: "Material Ignífugo Alta Densidad" },
  { label: "Cierre", value: "Barra Antipánico (Opcional)" },
  { label: "Acabado", value: "Pintura Electrostática" }
];

const FEATURES_CORTAFUEGOS = [
  "Utilizadas ampliamente en áreas públicas, hospitales y escuelas",
  "Sistema de contención de fuego y humo certificado",
  "Estructura robusta diseñada para tráfico intenso y evacuación"
];

const UNLOCK_CORTAFUEGOS = "Barra Antipánico / Manilla Cortafuego";

const SPECS_MEDICAS = [
  { label: "Material", value: "Panel HPL / Resina / Acero Inox" },
  { label: "Propiedades", value: "Antibacteriano, Hermético" },
  { label: "Uso", value: "Hospitales, Laboratorios, Clínicas" },
  { label: "Certificación", value: "Estándar Hospitalario WONLY" },
];

const FEATURES_MEDICAS = [

];

// --- 6. GENERACIÓN DE DATOS ---

// Generador IA
const PRODUCTOS_IA = MODELOS_IA.map((nombre, index) => ({
  id: `ia-${index}`,
  name: nombre,
  category: "PUERTA DE SEGURIDAD IA",
  description: `Flagship de seguridad modelo ${nombre}. Integra la última tecnología en Inteligencia Artificial con reconocimiento facial 3D.`,
  specs: SPECS_IA,
  features: FEATURES_IA,
  unlock: UNLOCK_IA,
  img: `/images/AI/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// Generador ACERO
const PRODUCTOS_ACERO = MODELOS_ACERO.map((nombre, index) => ({
  id: `acero-${index}`,
  name: nombre,
  category: "PUERTA DE ACERO REFORZADO",
  description: `Modelo ${nombre}. Estructura multicapa con malla de acero antirrobo y relleno de panal de aluminio.`,
  specs: SPECS_SEGURIDAD_MECANICA,
  features: FEATURES_SEGURIDAD_MECANICA,
  unlock: UNLOCK_MECANICO,
  img: `/images/ACERO/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// Generador ACORAZADA
const PRODUCTOS_ACORAZADA = MODELOS_ACORAZADA.map((nombre, index) => ({
  id: `acorazada-${index}`,
  name: nombre,
  category: "PUERTA DE SEGURIDAD ACORAZADA",
  description: `Puerta acorazada Serie WL modelo ${nombre}. Núcleo de acero sólido, 9 capas de blindaje y bisagras ocultas.`,
  specs: SPECS_SEGURIDAD_MECANICA,
  features: FEATURES_SEGURIDAD_MECANICA,
  unlock: UNLOCK_MECANICO,
  img: `/images/ACORAZADA/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// Generador ALUMINIO
const PRODUCTOS_ALUMINIO = MODELOS_ALUMINIO.map((nombre, index) => ({
  id: `aluminio-${index}`,
  name: nombre,
  category: "PUERTA DE ALUMINIO FUNDIDO",
  description: `Modelo ${nombre} en aluminio fundido al vacío. Marco de acero ultra resistente y aislamiento térmico superior.`,
  specs: SPECS_ALUMINIO,
  features: FEATURES_ALUMINIO,
  unlock: UNLOCK_MECANICO,
  img: `/images/ALUMINIO/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// Generador MADERA Series
const PRODUCTOS_MADERA_J = MODELOS_MADERA_J.map((nombre, index) => ({
  id: `madera-j-${index}`,
  name: nombre,
  category: "PUERTA ACÚSTICA DE MADERA",
  description: `Serie J Modelo ${nombre}. Puerta acústica que combina el confort del silencio con la calidez de la madera natural.`,
  specs: SPECS_MADERA,
  features: FEATURES_MADERA_J,
  unlock: UNLOCK_MADERA,
  img: `/images/MADERAACÚSTICA/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

const PRODUCTOS_MADERA_D = MODELOS_MADERA_D.map((nombre, index) => ({
  id: `madera-d-${index}`,
  name: nombre,
  category: "PUERTA ACÚSTICA DE MADERA",
  description: `Serie D Minimalista (${nombre}). Basada en un estilo minimalista extremo, resalta la exquisitez a través de la textura y artesanía.`,
  specs: SPECS_MADERA,
  features: FEATURES_MADERA_D,
  unlock: UNLOCK_MADERA,
  img: `/images/MADERAACÚSTICA/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

const PRODUCTOS_MADERA_S = [...new Set(MODELOS_MADERA_S)].map((nombre, index) => ({
  id: `madera-s-${index}`,
  name: nombre,
  category: "PUERTA ACÚSTICA DE MADERA",
  description: `Serie S Pure (${nombre}). Elimina diseños innecesarios recuperando la forma más simple de la vida.`,
  specs: SPECS_MADERA,
  features: FEATURES_MADERA_S,
  unlock: UNLOCK_MADERA,
  img: `/images/MADERAACÚSTICA/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// Generador PVC
const PRODUCTOS_PVC = MODELOS_PVC.map((nombre, index) => ({
  id: `pvc-${index}`,
  name: nombre,
  category: "PUERTA DE PVC",
  description: `Modelo ${nombre}. Diseños vanguardistas que rompen el patrón tradicional y llenan de modernidad los espacios.`,
  specs: SPECS_PVC,
  features: FEATURES_PVC,
  unlock: UNLOCK_PVC,
  img: `/images/PVC/door-${nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// GENERACIÓN CORREDIZAS CON LOGICA DE COLORES
const PRODUCTOS_CORREDIZAS = MODELOS_CORREDIZAS.map((nombre, index) => {
    let description = "";
    let specs = SPECS_CORREDIZAS;
    let colors = null;
    
    // Descripción y Specs personalizados
    if (nombre === "WL-A23001") {
        description = "Puerta de entrada principal de diseño vanguardista. Panel de aluminio reforzado con núcleo aislante y sistema de seguridad multipunto.";
        specs = [
            { label: "Espesor Perfil", value: "2.0 mm" },
            { label: "Profundidad", value: "120 mm" },
            { label: "Panel", value: "Aluminio + Aislante" },
            { label: "Seguridad", value: "Clase RC3" }
        ];
    } else if (nombre === "WL-A23002") {
        description = "Imponente puerta pivotante de gran formato. Su eje desplazado permite hojas de grandes dimensiones con apertura suave.";
        specs = [
            { label: "Espesor Perfil", value: "2.5 mm" },
            { label: "Marco", value: "140 mm (Pivot)" },
            { label: "Altura Máx", value: "3000 mm" },
            { label: "Sistema", value: "Pivote Hidráulico" }
        ];
    } else if (nombre === "WL-A23019") {
        description = "Variante decorativa exclusiva de la Serie A23. Este modelo incorpora un diseño de enrejado geométrico.";
        specs = [
            { label: "Estilo", value: "Enrejado Geométrico" },
            { label: "Perfil", value: "Aluminio Heavy Duty" },
            { label: "Vidrio", value: "Templado + Decorativo" },
            { label: "Acabado", value: "Gris Mercurio Mate" }
        ];
    } else if (nombre === "WL-A23020") {
        description = "Variante panorámica del sistema A23. Prioriza la limpieza visual y grandes superficies acristaladas.";
        specs = [
            { label: "Estilo", value: "Visión Total" },
            { label: "Perfil", value: "Minimalista Oculto" },
            { label: "Vidrio", value: "Doble Panorámico" },
            { label: "Apertura", value: "Deslizante Suave" }
        ];
    }

    // Lógica de Colores
    if (["WL-A23001", "WL-A23002"].includes(nombre)) {
        colors = COLORS_GLORY;
    } else if (["WL-A23019", "WL-A23020"].includes(nombre)) {
        colors = COLORS_FASHION;
    }

    return {
        id: `corrediza-${index}`,
        name: nombre,
        category: "PUERTAS CORREDIZAS Y ABATIBLES",
        description: description,
        specs: specs,
        features: FEATURES_CORREDIZAS,
        unlock: UNLOCK_CORREDIZAS,
        colors: colors, 
        img: `/images/CORREDIZA/door-${nombre}.jpg` 
    };
});

// Generador CORTAFUEGOS
const PRODUCTOS_CORTAFUEGOS = MODELOS_CORTAFUEGOS.map((nombre, index) => {
  return {
    id: `cortafuego-${index}`,
    name: `Modelo ${nombre}`,
    category: "PUERTA COMERCIAL CORTAFUEGO",
    description: "Los productos Puerta Comercial Cortafuego WONLY se utilizan ampliamente en áreas públicas como centros comerciales, edificios de oficinas, hospitales, escuelas, aeropuertos y estaciones.",
    specs: SPECS_CORTAFUEGOS,
    features: FEATURES_CORTAFUEGOS,
    unlock: UNLOCK_CORTAFUEGOS,
    colors: COLORS_CORTAFUEGOS,
    // La ruta debe empezar con /images/...
    img: `/images/CORTAFUEGO/door-${nombre}.jpg`
  };
});

// --- GENERADOR DE PRODUCTOS (Con lógica de imágenes) ---
const PRODUCTOS_MEDICAS = MODELOS_MEDICAS.map((nombre, index) => {
  return {
    id: `medica-${index}`,
    name: nombre,
    category: "PUERTA MÉDICA",
    specs: SPECS_MEDICAS,
    features: FEATURES_MEDICAS,
    img: `/images/MEDICA/door-${nombre}.jpg`
  }; 
});

const DATA_PRODUCTOS = [
  ...PRODUCTOS_IA, 
  ...PRODUCTOS_ACERO, 
  ...PRODUCTOS_ACORAZADA, 
  ...PRODUCTOS_ALUMINIO,
  ...PRODUCTOS_MADERA_J,
  ...PRODUCTOS_MADERA_D,
  ...PRODUCTOS_MADERA_S,
  ...PRODUCTOS_PVC,
  ...PRODUCTOS_CORREDIZAS,
  ...PRODUCTOS_CORTAFUEGOS,
  ...PRODUCTOS_MEDICAS
];


// --- 7. COMPONENTES UI ---

const FilterButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 text-[10px] font-bold uppercase border-b transition-all flex justify-between items-center tracking-widest
      ${active 
        ? 'bg-black text-white border-black pl-6' 
        : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:text-black hover:pl-6'
      }`}
  >
    {label}
    {active && <ChevronRight size={12} />}
  </button>
);

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!product) return null;

  let accentColor = "text-gray-900";
  let borderColor = "border-gray-900";
  let Icon = ShieldCheck;
  
  if (product.category === "PUERTA DE SEGURIDAD IA") { accentColor = "text-[#00C2FF]"; borderColor="border-[#00C2FF]"; Icon = ScanFace; }
  else if (product.category === "PUERTA DE SEGURIDAD ACORAZADA") { accentColor = "text-[#D4AF37]"; borderColor="border-[#D4AF37]"; }
  else if (product.category === "PUERTA DE ALUMINIO FUNDIDO") { accentColor = "text-[#718096]"; borderColor="border-[#718096]"; }
  else if (product.category === "PUERTA ACÚSTICA DE MADERA") { accentColor = "text-[#8D6E63]"; borderColor="border-[#8D6E63]"; Icon = VolumeX; }
  else if (product.category === "PUERTA DE PVC") { accentColor = "text-teal-600"; borderColor="border-teal-600"; Icon = Sparkles; }
  else if (product.category === "PUERTAS CORREDIZAS Y ABATIBLES") { accentColor = "text-indigo-600"; borderColor="border-indigo-600"; Icon = MoveHorizontal; }
  else if (product.category === "PUERTAS CORREDIZAS Y ABATIBLES") { accentColor = "text-indigo-600"; borderColor="border-indigo-600"; Icon = MoveHorizontal; }
  else if (product.category === "PUERTA COMERCIAL CORTAFUEGO") { accentColor = "text-orange-600"; borderColor="border-orange-600"; Icon = Flame; }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-[900px] h-full shadow-2xl flex flex-col md:flex-row animate-in slide-in-from-right duration-500 ease-out">
        <button onClick={onClose} className="absolute top-4 left-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-black hover:text-white transition"><X size={20} /></button>

        <div className="w-full md:w-1/2 bg-[#F8F8F8] relative min-h-[300px] md:h-full flex items-center justify-center p-10">
           <div className="relative w-full h-full max-h-[500px]">
             <Image src={product.img} alt={product.name} fill className="object-contain mix-blend-multiply" />
           </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white">
            <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${accentColor}`}>{product.category}</span>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            <div className="space-y-8">
              {/* Características */}
              <div>
                <h3 className="text-xs font-bold uppercase text-gray-900 mb-3 flex items-center gap-2">
                  <Icon size={14} /> Características
                </h3>
                <ul className="space-y-2">
                  {product.features?.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className={`${accentColor} mt-0.5`}>•</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Carta de Colores */}
              {product.colors && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className={`text-gray-900 text-xs font-bold uppercase mb-4 border-l-4 ${borderColor} pl-3 flex items-center gap-2`}>
                        <Palette size={14}/> Carta de Colores
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-start">
                        {product.colors.map((color, i) => (
                            <div key={i} className="text-center group flex flex-col items-center gap-2 cursor-pointer">
                                <div 
                                    className="w-10 h-10 rounded-full shadow-sm border-2 border-white group-hover:border-gray-300 transition-all transform group-hover:scale-110" 
                                    style={{backgroundColor: color.hex}}
                                    title={color.name}
                                ></div>
                                <span className="text-[9px] text-gray-500 uppercase font-medium max-w-[60px] leading-tight">{color.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
              )}

              {/* Especificaciones Técnicas */}
              <div className="bg-gray-50 p-5 rounded border border-gray-100">
                 <h3 className="text-xs font-bold uppercase text-gray-400 mb-3">Especificaciones</h3>
                 <div className="grid grid-cols-1 gap-y-2">
                   {product.specs?.map((spec, i) => (
                     <div key={i} className="flex justify-between border-b border-gray-200 pb-1 last:border-0">
                       <span className="text-[10px] font-bold text-gray-500 uppercase">{spec.label}</span>
                       <span className="text-[11px] font-semibold text-gray-900 text-right">{spec.value}</span>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Sistema de Acceso */}
              <div className="">
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Sistema de Acceso</p>
                 <p className="text-xs font-medium text-gray-800 border inline-block px-2 py-1 rounded bg-gray-50">{product.unlock}</p>
              </div>

              {/* --- INTEGRACIÓN: SECCIÓN DE ACCESORIOS (SOLO CORREDIZAS) --- */}
              {product.category === "PUERTAS CORREDIZAS Y ABATIBLES" && (
                <div className="pt-6 mt-6 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h3 className="text-xs font-bold uppercase text-indigo-600 mb-4 flex items-center gap-2">
                        <Settings size={14} /> Accesorios Compatibles
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {ACCESORIOS_CORREDIZAS.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-100 flex flex-col items-center text-center hover:border-indigo-200 transition-colors">
                                <div className="h-24 w-full flex items-center justify-center mb-2 bg-white rounded-sm">
                                    <Image 
                                        src={item.img} 
                                        alt={item.name} 
                                        width={80} 
                                        height={80} 
                                        className="object-contain max-h-full"
                                        onError={(e) => { e.target.style.display='none'; }} 
                                    />
                                </div>
                                <span className="text-[10px] font-bold text-gray-800 leading-tight">{item.name}</span>
                                <span className="text-[9px] text-gray-400 mt-1 bg-white px-2 py-0.5 rounded-full border">{item.tag}</span>
                            </div>
                        ))}
                    </div>
                </div>
              )}
              {/* --- INTEGRACIÓN: SECCIÓN DE VIDRIOS (SOLO CORREDIZAS) --- */}
              {product.category === "PUERTAS CORREDIZAS Y ABATIBLES" && (
                <div className="pt-6 mt-6 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h3 className="text-xs font-bold uppercase text-indigo-600 mb-4 flex items-center gap-2">
                        <Settings size={14} /> Vidrios De Uso Interior
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {VIDRIOS_CORREDIZAS.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-100 flex flex-col items-center text-center hover:border-indigo-200 transition-colors">
                              <div className="h-24 w-full flex items-center justify-center mb-2 relative rounded-sm overflow-hidden bg-gray-50">
                                  <Image
                                      src={item.img}
                                      alt={item.name}
                                      fill
                                      className="object-cover w-full h-full"
                                      onError={(e) => { e.target.style.display='none'; }}
                                  />
                              </div>
                                <span className="text-[10px] font-bold text-gray-800 leading-tight">{item.name}</span>
                                <span className="text-[9px] text-gray-400 mt-1 bg-white px-2 py-0.5 rounded-full border">{item.tag}</span>
                            </div>
                        ))}
                    </div>
                </div>
              )}
              {/* --------------------------------------------------------- */}

            </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onClick }) => {
  const shortCategory = product.category
    .replace("PUERTA DE ", "")
    .replace("PUERTA ", "")
    .replace("SEGURIDAD ", "");
  
  let highlightClass = "text-gray-400";
  if (product.category.includes("IA")) highlightClass = "text-[#00C2FF]";
  else if (product.category.includes("MADERA")) highlightClass = "text-[#8D6E63]";
  else if (product.category.includes("PVC")) highlightClass = "text-teal-600";
  else if (product.category.includes("CORREDIZAS")) highlightClass = "text-indigo-600";
  else if (product.category.includes("CORTAFUEGO")) highlightClass = "text-orange-600";

  return (
    <div onClick={onClick} className="group cursor-pointer flex flex-col h-full animate-in fade-in duration-700">
      <div className="relative aspect-[3/5] bg-[#FCFCFC] mb-4 overflow-hidden border border-transparent group-hover:border-gray-100 transition-all">
        <Image 
          src={product.img} 
          alt={product.name} 
          fill 
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end justify-center pb-6">
           <span className="bg-white text-black text-[9px] font-bold uppercase px-3 py-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm tracking-widest">
             Ver Detalles
           </span>
        </div>
      </div>
      
      <div className="text-center group-hover:text-left transition-all">
        <h4 className={`font-bold text-base text-gray-900 transition-colors ${
          product.category.includes("MADERA") ? "group-hover:text-[#8D6E63]" : 
          product.category.includes("PVC") ? "group-hover:text-teal-600" :
          product.category.includes("CORREDIZAS") ? "group-hover:text-indigo-600" :
          "group-hover:text-[#00C2FF]"}`}>{product.name}</h4>
        <p className={`text-[9px] uppercase tracking-widest mt-1 ${product.category.includes("IA") ? "text-[#00C2FF] font-semibold" : highlightClass}`}>
          {shortCategory}
        </p>
      </div>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---
function PuertasContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("TODAS");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "TODAS") return DATA_PRODUCTOS;
    return DATA_PRODUCTOS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="bg-white min-h-screen text-black pt-28 pb-20">
      
      {/* HEADER */}
      <div className="container mx-auto px-6 mb-16 text-center">
         <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-black mb-6">Wonly Collection</h1>
         <div className="w-px h-12 bg-gray-200 mx-auto mb-6"></div>
         <p className="text-gray-500 max-w-lg mx-auto text-sm font-light leading-relaxed">
           Catálogo completo Wonly. Tecnología IA, resistencia extrema, lujo en aluminio, colección acústica de madera y la nueva línea vanguardista en PVC.
         </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-32 h-fit">
             <div className="mb-6 pb-2 border-b border-gray-100">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categorías</span>
             </div>
             <div className="flex flex-col gap-1">
                <FilterButton label="Ver Todo" active={selectedCategory === "TODAS"} onClick={() => setSelectedCategory("TODAS")} />
                {CATEGORIAS.map((cat) => (
                  <FilterButton key={cat} label={cat} active={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} />
                ))}
             </div>
          </aside>

          {/* GRID PRODUCTOS */}
          <section className="flex-grow">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
               <span className="text-xs font-bold uppercase tracking-widest text-gray-900">
                 {selectedCategory === "TODAS" ? "Catálogo Completo" : selectedCategory} <span className="text-gray-400 ml-2">({filteredProducts.length})</span>
               </span>
               <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden flex items-center gap-2 text-[10px] font-bold uppercase bg-black text-white px-3 py-2"><Filter size={12} /> Filtros</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map((p) => <ProductCard key={p.id} product={p} onClick={() => setSelectedProduct(p)} />)}
            </div>
            {filteredProducts.length === 0 && <div className="py-24 text-center text-gray-300 text-sm uppercase">Sin resultados.</div>}
          </section>
        </div>
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      
      {/* MENÚ MÓVIL */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-6 lg:hidden">
           <div className="bg-white w-full max-w-sm p-6 space-y-4">
             <div className="flex justify-between items-center border-b pb-4"><span className="font-bold uppercase tracking-widest text-sm">Categorías</span><button onClick={() => setMobileMenuOpen(false)}><X size={20}/></button></div>
             <div className="flex flex-col gap-2">
               <button onClick={() => {setSelectedCategory("TODAS"); setMobileMenuOpen(false);}} className="text-left py-3 border-b text-xs font-bold uppercase">Ver Todo</button>
               {CATEGORIAS.map(cat => <button key={cat} onClick={() => {setSelectedCategory(cat); setMobileMenuOpen(false);}} className="text-left py-3 border-b text-xs font-bold uppercase">{cat}</button>)}
             </div>
           </div>
        </div>
      )}
    </main>
  );
}

export default function PuertasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <PuertasContent />
    </Suspense>
  );
}