// subir-datos.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --------------------------------------------------------------------------------
// 1. DATOS COMPLETOS
// --------------------------------------------------------------------------------

// Colores
const COLORS_GLORY = [{ name: "Black Skin", hex: "#1A1A1A" }, { name: "Moon Light Grey", hex: "#757575" }, { name: "Mixed Glaze White", hex: "#FFFFFF" }, { name: "Enamel Copper", hex: "#5D4037" }];
const COLORS_FASHION = [{ name: "Black Skin", hex: "#1A1A1A" }, { name: "Moon Light Grey", hex: "#757575" }, { name: "Enamel White", hex: "#F5F5F0" }, { name: "Enamel White (Grey)", hex: "#BDBDBD" }];
const COLORS_CORTAFUEGOS = [{ name: "Blanco Perla", hex: "#CECFCA" }, { name: "Beige Piedra", hex: "#BFBBB5" }, { name: "Gris Plata", hex: "#ACAFAF" }, { name: "Gris Cemento", hex: "#7C7C78" }, { name: "Gris Grafito", hex: "#77797A" }, { name: "Rojo Óxido", hex: "#5C211E" }, { name: "Verde Musgo", hex: "#47504A" }];

// Listas de Nombres
const MODELOS_IA = ["X50", "X50 Pro", "X50 Max", "X60", "X60 Pro", "X60 Max", "X70 Shunliu", "X70 Jinxiu", "S108", "S108 Pro", "Glory", "Glory Pro"];
const MODELOS_ACERO = ["GL098", "NC9020", "GF091", "CL39", "GF092", "GL123-1", "Mid Night", "Contemporary", "GL099", "GL083", "CL56", "GF090", "CL66", "CL37", "CL36", "CL38", "CJ03", "CL23", "CL50", "CL51", "CL097 Pro", "P101", "GL23", "CL058", "CL65", "CL60", "CL72", "P107", "CL55", "CL62", "CL63", "P105", "GF061", "JD073", "NC9516", "P102"];
const MODELOS_ACORAZADA = ["WL001", "WL002", "WL003", "WL005", "WL006", "WL007", "WL008", "WL009", "WL010", "WL011", "WL015", "WL016", "WL012", "WL021", "WL029", "WL018", "WL019", "WL020", "WL026", "WL027", "WL022", "WL017", "WL023", "WL028", "WL025"];
const MODELOS_ALUMINIO = ["Wave", "Castle", "Woodland", "Louis", "Saab", "Senna", "Lange", "Heidelberg", "Prada"];
const MODELOS_MADERA_J = ["WL-J002", "WL-J008", "WL-J011", "WL-J012", "WL-J001", "WL-J003", "WL-J009", "WL-J006", "WL-J010", "WL-J005"];
const MODELOS_MADERA_D = ["WL-D003", "WL-D015", "WL-D017", "WL-D011", "WL-D002", "WL-D005", "WL-D006", "WL-D007", "WL-D008", "WL-D010", "WL-D012", "WL-D013", "WL-D016", "WL-D018", "WL-D019", "WL-D020", "WL-D033", "WL-D037", "WL-D001", "WL-D009", "WL-D021", "WL-D022", "WL-D023", "WL-D025", "WL-D026", "WL-D027", "WL-D028", "WL-D029", "WL-D030", "WL-D031", "WL-D032", "WL-D036", "WL-D038", "WL-5103", "WL-5105", "WL-5107", "WL-5109", "WL-5110", "WL-5117", "WL-5203", "WL-5503"];
const MODELOS_MADERA_S = ["WL-S009", "WL-S108", "WL-S023", "WL-S206", "WL-S003", "WL-S008", "WL-S010", "WL-S011", "WL-S012", "WL-S020", "WL-S027", "WL-S001", "WL-S002", "WL-S005", "WL-S013", "WL-S015", "WL-S016", "WL-S017", "WL-S019", "WL-S021", "WL-S022", "WL-S025", "WL-S026", "WL-S201", "WL-S002", "WL-S205", "WL-S207", "WL-S208", "WL-S209", "WL-S210", "WL-S101B", "WL-S102B", "WL-S103B"];
const MODELOS_PVC = ["WL-P001", "WL-P002", "WL-P003", "WL-P005", "WL-P006", "WL-P007", "WL-P008", "WL-P009", "WL-P010", "WL-P011", "WL-P015", "WL-P016", "WL-P201"];
const MODELOS_CORREDIZAS = ["WL-A23001", "WL-A23002", "WL-A23019", "WL-A23020"];
const MODELOS_CORTAFUEGOS = ["GD-01", "GD-02", "GD-03", "TD-01", "TD-02", "TD-03", "GF026"];
const MODELOS_MEDICAS = ["PUERTA DE SALA1", "PUERTA DE SALA2", "PUERTA DE SALA3", "PUERTA DE SALA4", "PUERTA DE SALA5", "PUERTA CORTAFUEGO AISLANTE1", "PUERTA CORTAFUEGO AISLANTE2", "PUERTA AUTOMÁTICA PLANA, HERMÉTICA Y ABATIBLE", "PUERTAS AUTOMÁTICAS HERMÉTICAS"];

// Specs
const SPECS_IA = [{ label: "Tecnología", value: "IA 3ª Generación" }, { label: "Sistema", value: "Reconocimiento Facial 3D" }, { label: "Pantalla", value: "10.1\" IPS Táctil" }];
const FEATURES_IA = ["Apertura 100% automática", "Reconocimiento Facial 3D", "Videollamada App"];
const UNLOCK_IA = "Facial / Huella / App";

const SPECS_X70_SHUNLIU = [
  { label: "Pantalla", value: "10.1\" IPS Multitáctil" },
  { label: "Cámara", value: "1080p + IA Privacidad" },
  { label: "Alimentación", value: "220V/24V + Batería 4200mAh" },
  { label: "Cerradura", value: "Núcleo Clase C / 0.8s" },
  { label: "Puerta", value: "Aluminio 6.0mm" }
];

const SPECS_X70_JINXIU = [
  { label: "Pantalla", value: "10.1\" IPS Multitáctil" },
  { label: "Cámara", value: "1080p + IA Privacidad y Cuidado" },
  { label: "Alimentación", value: "220V/24V + Batería 4200mAh" },
  { label: "Cerradura", value: "Núcleo Clase C / 0.8s" },
  { label: "Puerta", value: "Aluminio 4.0mm" } // Diferencia de grosor
];

// Las características y el desbloqueo son compartidos por ambos X70
const FEATURES_X70 = [
  "Apertura 100% automática + Anti-pinzamiento",
  "Monitorización ambiental (Sensor Formaldehído)",
  "Integración Smart Home (Aigan)",
  "Nube de video (3 días cíclicos)"
];

const SPECS_X60_MAX = [
  { label: "Pantalla", value: "10.1\" IPS Multitáctil" },
  { label: "Cámara", value: "1080p + IA Privacidad y Cuidado" },
  { label: "Alimentación", value: "220V/24V + Batería 4200mAh" },
  { label: "Cerradura", value: "Núcleo Clase C / 0.8s" },
  { label: "Puerta", value: "Aluminio 4.0mm" }
];

const SPECS_X50_MAX = [
  { label: "Pantalla", value: "10.1\" Multitáctil" },
  { label: "Cámara", value: "1080p (En marco) + IA Privacidad y Cuidado" },
  { label: "Alimentación", value: "220V/24V + Batería 4200mAh" },
  { label: "Cerradura", value: "Núcleo Clase C / 0.8s" },
  { label: "Puerta", value: "Acero 1.0mm (Imitación Cobre)" }
];

const FEATURES_X50_MAX = [
  "Apertura automática + Anti-pinzamiento físico",
  "Monitorización de calidad del aire",
  "Integración Smart Home (Aigan)",
  "Nube de video (3 días cíclicos)"
];

const UNLOCK_X70 = "Remoto / Facial / Contraseña / Tarjeta CPU / App / Llave";

const SPECS_MECANICA = [{ label: "Seguridad", value: "9 Capas" }, { label: "Relleno", value: "Panal Aluminio" }, { label: "Núcleo", value: "Acero + Malla" }];
const FEATURES_MECANICA = ["Seguridad 9 capas", "Malla antirrobo", "Relleno panal aluminio"];
const UNLOCK_MECANICO = "Llave Seguridad";

const SPECS_ALUMINIO = [{ label: "Material", value: "Aluminio Fundido" }, { label: "Estructura", value: "Hoja una Pieza" }];
const FEATURES_ALUMINIO = ["Fundición al vacío", "Marco acero resistente", "Aislamiento superior"];

const SPECS_MADERA = [{ label: "Núcleo", value: "Madera Sólida" }, { label: "Aislamiento", value: "Reducción dB" }];
const FEATURES_MADERA = ["Diseño minimalista", "Aislamiento acústico", "Acabados premium"];
const UNLOCK_MADERA = "Manilla Magnética";

const SPECS_PVC = [{ label: "Material", value: "PVC Alta Densidad" }, { label: "Estilo", value: "Vanguardista" }];
const FEATURES_PVC = ["Diseño vanguardista", "Resistente humedad", "Fácil limpieza"];
const UNLOCK_PVC = "Mecánica";

const SPECS_CORREDIZAS = [{ label: "Perfil", value: "Aleación 6063-T6" }, { label: "Aislamiento", value: "Rotura Puente Térmico" }];
const FEATURES_CORREDIZAS = ["Gran formato", "Eficiencia energética", "Apertura suave"];
const UNLOCK_CORREDIZAS = "Multipunto";

const SPECS_CORTAFUEGOS = [{ label: "Certificación", value: "Resistencia Fuego" }, { label: "Material", value: "Acero Galvanizado" }];
const FEATURES_CORTAFUEGOS = ["Contención fuego/humo", "Estructura robusta", "Certificada"];
const UNLOCK_CORTAFUEGOS = "Barra Antipánico";

const SPECS_MEDICAS = [{ label: "Material", value: "HPL / Resina / Acero Inox" }, { label: "Propiedades", value: "Antibacteriano, Hermético" }];
const FEATURES_MEDICAS = ["Certificación Estándar Hospitalario", "Hermeticidad garantizada", "Superficie antibacteriana"];


// --- 2. GENERADORES (CORREGIDOS) ---

const productos_ia = MODELOS_IA.map(n => {
  // --- NUEVO: Condicional para el X50 Max ---
  if (n === "X50 Max") {
    return {
      name: "X50 Max",
      category: "PUERTA DE SEGURIDAD IA",
      description: "Puerta de seguridad inteligente 5.0 modelo X50 Max con acabado de acero imitación cobre.",
      specs: SPECS_X50_MAX,
      features: FEATURES_X50_MAX,
      unlock: UNLOCK_X70, // Comparten los mismos métodos
      img: `/images/AI/door-x50-max.jpg`
    };
  }

  // --- Condicional para el X60 Max ---
  if (n === "X60 Max") {
    return {
      name: "X60 Max",
      category: "PUERTA DE SEGURIDAD IA",
      description: "Puerta de seguridad inteligente 5.0 modelo X60 Max.",
      specs: SPECS_X60_MAX,
      features: FEATURES_X70, 
      unlock: UNLOCK_X70,
      img: `/images/AI/door-x60-max.jpg`
    };
  }

  // --- Condicional para el X70 Shunliu (6.0mm) ---
  if (n === "X70 Shunliu") {
    return {
      name: "X70 Shunliu",
      category: "PUERTA DE SEGURIDAD IA",
      description: "Puerta de seguridad inteligente 5.0 modelo X70 Shunliu.",
      specs: SPECS_X70_SHUNLIU,
      features: FEATURES_X70,
      unlock: UNLOCK_X70,
      img: `/images/AI/door-x70-shunliu.jpg`
    };
  }
  
  // --- Condicional para el X70 Jinxiu (4.0mm) ---
  if (n === "X70 Jinxiu") {
    return {
      name: "X70 Jinxiu",
      category: "PUERTA DE SEGURIDAD IA",
      description: "Puerta de seguridad inteligente 5.0 modelo X70 Jinxiu.",
      specs: SPECS_X70_JINXIU,
      features: FEATURES_X70,
      unlock: UNLOCK_X70,
      img: `/images/AI/door-x70-jinxiu.jpg`
    };
  }
  
  // --- Comportamiento por defecto para el resto de puertas IA ---
  return {
    name: n,
    category: "PUERTA DE SEGURIDAD IA",
    description: `Flagship IA modelo ${n}.`,
    specs: SPECS_IA,
    features: FEATURES_IA,
    unlock: UNLOCK_IA,
    img: `/images/AI/door-${n.toLowerCase().replace(/\s+/g, '-')}.jpg`
  };
});

const productos_acero = MODELOS_ACERO.map(n => ({
  name: n, category: "PUERTA DE ACERO REFORZADO",
  description: `Modelo ${n}. Estructura multicapa reforzada.`,
  specs: SPECS_MECANICA, features: FEATURES_MECANICA, unlock: UNLOCK_MECANICO,
  img: `/images/ACERO/door-${n.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

const productos_acorazada = MODELOS_ACORAZADA.map(n => ({
  name: n, category: "PUERTA DE SEGURIDAD ACORAZADA",
  description: `Acorazada Serie WL modelo ${n}.`,
  specs: SPECS_MECANICA, features: FEATURES_MECANICA, unlock: UNLOCK_MECANICO,
  img: `/images/ACORAZADA/door-${n.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

const productos_aluminio = MODELOS_ALUMINIO.map(n => ({
  name: n, category: "PUERTA DE ALUMINIO FUNDIDO",
  description: `Modelo ${n} en aluminio fundido.`,
  specs: SPECS_ALUMINIO, features: FEATURES_ALUMINIO, unlock: UNLOCK_MECANICO,
  img: `/images/ALUMINIO/door-${n.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

const productos_madera_j = MODELOS_MADERA_J.map(n => ({
  name: n, category: "PUERTA ACÚSTICA DE MADERA",
  description: `Serie J Modelo ${n}.`,
  specs: SPECS_MADERA, features: FEATURES_MADERA, unlock: UNLOCK_MADERA,
  img: `/images/MADERAACÚSTICA/door-${n.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

const productos_madera_d = MODELOS_MADERA_D.map(n => ({
  name: n, category: "PUERTA ACÚSTICA DE MADERA",
  description: `Serie D Minimalista ${n}.`,
  specs: SPECS_MADERA, features: FEATURES_MADERA, unlock: UNLOCK_MADERA,
  img: `/images/MADERAACÚSTICA/door-${n.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

const productos_madera_s = [...new Set(MODELOS_MADERA_S)].map(n => ({
  name: n, category: "PUERTA ACÚSTICA DE MADERA",
  description: `Serie S Pure ${n}.`,
  specs: SPECS_MADERA, features: FEATURES_MADERA, unlock: UNLOCK_MADERA,
  img: `/images/MADERAACÚSTICA/door-${n.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

const productos_pvc = MODELOS_PVC.map(n => ({
  name: n, category: "PUERTA DE PVC",
  description: `Modelo ${n}. Diseño vanguardista.`,
  specs: SPECS_PVC, features: FEATURES_PVC, unlock: UNLOCK_PVC,
  img: `/images/PVC/door-${n.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

const productos_corredizas = MODELOS_CORREDIZAS.map(n => {
  let colors = null;
  if (["WL-A23001", "WL-A23002"].includes(n)) colors = COLORS_GLORY;
  else if (["WL-A23019", "WL-A23020"].includes(n)) colors = COLORS_FASHION;
  return {
    name: n, category: "PUERTAS CORREDIZAS Y ABATIBLES",
    description: `Sistema corredero modelo ${n}.`,
    specs: SPECS_CORREDIZAS, features: FEATURES_CORREDIZAS, unlock: UNLOCK_CORREDIZAS,
    colors: colors,
    img: `/images/CORREDIZA/door-${n}.jpg`
  };
});

// ✅ CORRECCIÓN 1: Convertir nombres de Cortafuegos a minúsculas y sin espacios
const productos_cortafuegos = MODELOS_CORTAFUEGOS.map(n => ({
  name: `Modelo ${n}`, category: "PUERTA COMERCIAL CORTAFUEGO",
  description: "Puerta cortafuego certificada.",
  specs: SPECS_CORTAFUEGOS, features: FEATURES_CORTAFUEGOS, unlock: UNLOCK_CORTAFUEGOS,
  colors: COLORS_CORTAFUEGOS,
  img: `/images/CORTAFUEGO/door-${n.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));

// ✅ CORRECCIÓN 2: Convertir nombres Médicos a minúsculas y sin espacios
const productos_medicas = MODELOS_MEDICAS.map(n => ({
  name: n,
  category: "PUERTA MÉDICA",
  description: "Puerta técnica especializada para uso hospitalario y sanitario.",
  specs: SPECS_MEDICAS,
  features: FEATURES_MEDICAS,
  // Esto convierte "PUERTA DE SALA1" -> "door-puerta-de-sala1.jpg"
  img: `/images/MEDICA/door-${n.toLowerCase().replace(/\s+/g, '-')}.jpg`
}));


// --- 3. UNIFICACIÓN ---
const DATA_PRODUCTOS = [
  ...productos_ia, ...productos_acero, ...productos_acorazada,
  ...productos_aluminio, ...productos_madera_j, ...productos_madera_d,
  ...productos_madera_s, ...productos_pvc, ...productos_corredizas,
  ...productos_cortafuegos, ...productos_medicas
];

// --- 4. FUNCIÓN DE SUBIDA ---
async function subirDatos() {
  console.log(`🔥 Limpiando base de datos...`);
  const { error: deleteError } = await supabase.from('products').delete().neq('id', 0);
  if (deleteError) console.error("Error borrando:", deleteError);

  console.log(`📦 Subiendo ${DATA_PRODUCTOS.length} productos...`);

  const { data, error } = await supabase.from('products').insert(DATA_PRODUCTOS);

  if (error) {
    console.error("❌ Error subiendo:", error.message);
  } else {
    console.log("✅ ¡ÉXITO! Datos subidos y rutas de imágenes corregidas.");
  }
}

subirDatos();