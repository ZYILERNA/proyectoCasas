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
const MODELOS_IA = ["X70 Shunliu", "X70 Jinxiu", "X60", "X60 Pro", "X60 Max", "X50", "X50 Pro", "X50 Max", "S108", "S108 Pro", "Glory", "Glory Pro"];
const MODELOS_ACERO = ["GL098", "NC9020", "GF091", "CL39", "GF092", "GL123-1", "Mid Night", "Contemporary", "GL099", "GL083", "CL56", "GF090", "CL66", "CL37", "CL36", "CL38", "CJ03", "CL23", "CL50", "CL51", "CL097 Pro", "P101", "GL23", "CL058", "CL65", "CL60", "CL72", "P107", "CL55", "CL62", "CL63", "P105", "GF061", "JD073", "NC9516", "P102"];
const MODELOS_ACORAZADA = ["WL001", "WL002", "WL003", "WL005", "WL006", "WL007", "WL008", "WL009", "WL010", "WL011", "WL015", "WL016", "WL012", "WL021", "WL029", "WL018", "WL019", "WL020", "WL026", "WL027", "WL022", "WL017", "WL023", "WL028", "WL025"];
const MODELOS_ALUMINIO = ["Wave", "Castle", "Woodland", "Louis", "Saab", "Senna", "Lange", "Heidelberg", "Prada"];
const MODELOS_MADERA_J = ["WL-J002", "WL-J008", "WL-J011", "WL-J012", "WL-J001", "WL-J003", "WL-J009", "WL-J006", "WL-J010", "WL-J005"];
const MODELOS_MADERA_D = ["WL-D003", "WL-D015", "WL-D017", "WL-D011", "WL-D002", "WL-D005", "WL-D006", "WL-D007", "WL-D008", "WL-D010", "WL-D012", "WL-D013", "WL-D016", "WL-D018", "WL-D019", "WL-D020", "WL-D033", "WL-D037", "WL-D001", "WL-D009", "WL-D021", "WL-D022", "WL-D023", "WL-D025", "WL-D026", "WL-D027", "WL-D028", "WL-D029", "WL-D030", "WL-D031", "WL-D032", "WL-D036", "WL-D038", "WL-5103", "WL-5105", "WL-5107", "WL-5109", "WL-5110", "WL-5117", "WL-5203", "WL-5503"];
const MODELOS_MADERA_S = ["WL-S009", "WL-S108", "WL-S023", "WL-S206", "WL-S003", "WL-S008", "WL-S010", "WL-S011", "WL-S012", "WL-S020", "WL-S027", "WL-S001", "WL-S002", "WL-S005", "WL-S013", "WL-S015", "WL-S016", "WL-S017", "WL-S019", "WL-S021", "WL-S022", "WL-S025", "WL-S026", "WL-S201", "WL-S205", "WL-S207", "WL-S208", "WL-S209", "WL-S210", "WL-S101B", "WL-S102B", "WL-S103B"];
const MODELOS_PVC = ["WL-P001", "WL-P002", "WL-P003", "WL-P005", "WL-P006", "WL-P007", "WL-P008", "WL-P009", "WL-P010", "WL-P011", "WL-P015", "WL-P016", "WL-P201"];
const MODELOS_CORREDIZAS = ["WL-A23001", "WL-A23002", "WL-A23019", "WL-A23020"];
const MODELOS_CORTAFUEGOS = ["GD-01", "GD-02", "GD-03", "TD-01", "TD-02", "TD-03", "GF026"];
const MODELOS_MEDICAS = ["PUERTA DE SALA1", "PUERTA DE SALA2", "PUERTA DE SALA3", "PUERTA DE SALA4", "PUERTA DE SALA5", "PUERTA CORTAFUEGO AISLANTE1", "PUERTA CORTAFUEGO AISLANTE2", "PUERTA AUTOMÁTICA PLANA, HERMÉTICA Y ABATIBLE", "PUERTAS AUTOMÁTICAS HERMÉTICAS"];

// Specs
const SPECS_IA = [{ label: "Tecnología", value: "IA 3ª Generación" }, { label: "Sistema", value: "Reconocimiento Facial 3D" }, { label: "Pantalla", value: "10.1\" IPS Táctil" }];
const FEATURES_IA = ["Apertura 100% automática", "Reconocimiento Facial 3D", "Videollamada App"];
const UNLOCK_IA = "Facial / Huella / App";
const UNLOCK_X70 = "Remoto / Facial / Contraseña / Tarjeta CPU / App / Llave";

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

// ---- T200 ----
const MODELOS_T200 = ["T200"];

const SPECS_T200 = [
  { label: "Nivel", value: "Seguridad 4.0 / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "Tipo C Alto Marco" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Patentado" },
  { label: "Cerradura IA", value: "Manilla T200 + Pantalla Trasera 10.1\"" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_T200 = [
  "Seguridad antirrobo nivel 4",
  "Supercerradura patentada A5021-80",
  "Pantalla trasera inteligente 10.1\"",
  "Fabricación a medida no estándar",
  "Cumple norma GB17565-2022"
];

const UNLOCK_T200 = "Manilla Inteligente T200 / App / Llave";

const productos_t200 = MODELOS_T200.map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 4.0 modelo T200. Nivel antirrobo 4, grosor 90mm y pantalla trasera inteligente de 10.1\".",
  specs: SPECS_T200,
  features: FEATURES_T200,
  unlock: UNLOCK_T200,
  img: `/images/AI/door-t200.jpg`
}));

// ---- K300 Max ----
const MODELOS_K300_MAX = ["K300 Max"];

const SPECS_K300_MAX = [
  { label: "Nivel", value: "Seguridad 3.0 Max / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "De Suelo a Techo" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Patentado" },
  { label: "Cerradura IA", value: "Sistema K300 Max + Pantalla Táctil HD 10.1\" + Cubierta Deslizante Inteligente" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_K300_MAX = [
  "Seguridad antirrobo nivel 4",
  "Marco de suelo a techo",
  "Supercerradura patentada A5021-80",
  "Pantalla táctil HD 10.1\" con cubierta deslizante inteligente",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_K300_MAX = "Sistema Inteligente K300 Max / App / Llave";

const productos_k300_max = MODELOS_K300_MAX.map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 Max modelo K300 Max. Nivel antirrobo 4, marco de suelo a techo y pantalla táctil HD 10.1\".",
  specs: SPECS_K300_MAX,
  features: FEATURES_K300_MAX,
  unlock: UNLOCK_K300_MAX,
  img: `/images/AI/door-k300-max.jpg`
}));

// ---- K300 Pro ----
const MODELOS_K300_PRO = ["K300 Pro"];

const SPECS_K300_PRO = [
  { label: "Nivel", value: "Seguridad 3.0 Pro / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo Ángulo Recto + De Suelo a Techo" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Patentado" },
  { label: "Cerradura IA", value: "Sistema Inteligente K300" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_K300_PRO = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo ángulo recto de suelo a techo",
  "Supercerradura patentada A5021-80",
  "Sistema inteligente K300",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_K300_PRO = "Sistema Inteligente K300 / App / Llave";

const productos_k300_pro = MODELOS_K300_PRO.map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 Pro modelo K300 Pro. Nivel antirrobo 4, marco T ángulo recto de suelo a techo.",
  specs: SPECS_K300_PRO,
  features: FEATURES_K300_PRO,
  unlock: UNLOCK_K300_PRO,
  img: `/images/AI/door-k300-pro.jpg`
}));

// ---- S121 ----
const MODELOS_S121 = ["S121"];

const SPECS_S121 = [
  { label: "Nivel", value: "Seguridad 3.0 / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo Ángulo Recto + De Suelo a Techo" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Patentado" },
  { label: "Cerradura IA", value: "Manilla Inteligente Empotrada P16 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_S121 = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo ángulo recto de suelo a techo",
  "Supercerradura patentada A5021-80",
  "Manilla inteligente empotrada P16 Pro",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_S121 = "Manilla Inteligente P16 Pro / App / Llave";

const productos_s121 = MODELOS_S121.map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 modelo S121. Nivel antirrobo 4 con manilla inteligente empotrada P16 Pro.",
  specs: SPECS_S121,
  features: FEATURES_S121,
  unlock: UNLOCK_S121,
  img: `/images/AI/door-s121.jpg`
}));

// ---- S101 ----
const MODELOS_S101 = ["S101"];

const SPECS_S101 = [
  { label: "Nivel", value: "Seguridad 3.0 / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo Aluminio Ensamblado + De Suelo a Techo" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Patentado" },
  { label: "Cerradura IA", value: "Manilla Inteligente S935 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_S101 = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo aluminio ensamblado de suelo a techo",
  "Supercerradura patentada A5021-80",
  "Manilla inteligente S935 Pro",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_S101 = "Manilla Inteligente S935 Pro / App / Llave";

const productos_s101 = MODELOS_S101.map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 modelo S101. Nivel antirrobo 4 con marco de aluminio ensamblado y manilla inteligente S935 Pro.",
  specs: SPECS_S101,
  features: FEATURES_S101,
  unlock: UNLOCK_S101,
  img: `/images/AI/door-s101.jpg`
}));

// ---- S119 ----
const MODELOS_S119 = ["S119"];

const SPECS_S119 = [
  { label: "Nivel", value: "Seguridad 3.0 / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo Ángulo Recto + De Suelo a Techo" },
  { label: "Cerradura", value: "A5021-80 Supercerradura + Placa Decorativa Cerradura Principal y Secundaria" },
  { label: "Núcleo", value: "Embrague Especial Motor Eléctrico Antimanipulación" },
  { label: "Cerradura IA", value: "Manilla Inteligente Facial P10 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_S119 = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo ángulo recto de suelo a techo",
  "Cerradura A5021-80 con placa decorativa doble (principal y secundaria)",
  "Núcleo de embrague eléctrico especial antimanipulación",
  "Manilla inteligente con reconocimiento facial P10 Pro",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_S119 = "Reconocimiento Facial P10 Pro / App / Llave";

const productos_s119 = MODELOS_S119.map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 modelo S119. Nivel antirrobo 4 con núcleo de embrague eléctrico antimanipulación y reconocimiento facial P10 Pro.",
  specs: SPECS_S119,
  features: FEATURES_S119,
  unlock: UNLOCK_S119,
  img: `/images/AI/door-s119.jpg`
}));

// ---- S118 ----
const productos_s118 = ["S118"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 modelo S118. Nivel antirrobo 4 con núcleo de embrague eléctrico antimanipulación y reconocimiento facial P10 Pro.",
  specs: SPECS_S119,      // ✅ Specs idénticas al S119
  features: FEATURES_S119, // ✅ Features idénticas al S119
  unlock: UNLOCK_S119,     // ✅ Desbloqueo idéntico al S119
  img: `/images/AI/door-s118.jpg`
}));

// ---- S116 ----
const SPECS_S116 = [
  { label: "Nivel", value: "Seguridad 3.0 / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo Ángulo Recto + De Suelo a Techo" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Patentado" },
  { label: "Cerradura IA", value: "Cerradura Inteligente S50 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_S116 = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo ángulo recto de suelo a techo",
  "Supercerradura patentada A5021-80",
  "Cerradura inteligente S50 Pro",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_S116 = "Cerradura Inteligente S50 Pro / App / Llave";

const productos_s116 = ["S116"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 modelo S116. Nivel antirrobo 4 con cerradura inteligente S50 Pro y cilindro patentado.",
  specs: SPECS_S116,
  features: FEATURES_S116,
  unlock: UNLOCK_S116,
  img: `/images/AI/door-s116.jpg`
}));

// ---- P102 (IA 3.0) ----
const SPECS_P102_IA = [
  { label: "Nivel", value: "Seguridad 3.0 / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo C Marco Alto Artesanal" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Patentado" },
  { label: "Cerradura IA", value: "Manilla Inteligente Negra S922 Pro (Z)" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_P102_IA = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo C alto artesanal",
  "Supercerradura patentada A5021-80",
  "Manilla inteligente negra S922 Pro (Z)",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_P102_IA = "Manilla Inteligente S922 Pro / App / Llave";

const productos_p102_ia = ["P102 IA"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 modelo P102. Nivel antirrobo 4 con marco alto artesanal y manilla inteligente negra S922 Pro.",
  specs: SPECS_P102_IA,
  features: FEATURES_P102_IA,
  unlock: UNLOCK_P102_IA,
  img: `/images/AI/door-p102-ia.jpg`
}));
// ---- P103 ----
const SPECS_P103 = [
  { label: "Nivel", value: "Seguridad 3.0 / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo C Marco Alto Artesanal + De Suelo a Techo" },
  { label: "Cerradura", value: "A5021-80 Supercerradura + Placa Decorativa Principal y Secundaria" },
  { label: "Núcleo", value: "Embrague Eléctrico Especial Mango Plegable Antimanipulación" },
  { label: "Cerradura IA", value: "Manilla Inteligente Negra S935" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_P103 = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo C alto artesanal de suelo a techo",
  "Cerradura A5021-80 con placa decorativa doble (principal y secundaria)",
  "Núcleo de embrague eléctrico con mango plegable antimanipulación",
  "Manilla inteligente negra S935",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_P103 = "Manilla Inteligente S935 / App / Llave";

const productos_p103 = ["P103"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 modelo P103. Nivel antirrobo 4 con núcleo de embrague eléctrico plegable y manilla inteligente negra S935.",
  specs: SPECS_P103,
  features: FEATURES_P103,
  unlock: UNLOCK_P103,
  img: `/images/AI/door-p103.jpg`
}));

// ---- P108 ----
const SPECS_P108 = [
  { label: "Nivel", value: "Seguridad 2.0 / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo Ángulo Recto + De Suelo a Techo" },
  { label: "Cerradura", value: "A9-80 Doble Acción Doble Cierre Rápido + Placa Decorativa Principal y Secundaria" },
  { label: "Núcleo", value: "Triple Fila Antiarranque Motor Eléctrico" },
  { label: "Cerradura IA", value: "Manilla Inteligente S922 Max" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_P108 = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo ángulo recto de suelo a techo",
  "Cerradura A9-80 doble acción con placa decorativa doble",
  "Núcleo de triple fila antiarranque con motor eléctrico",
  "Manilla inteligente S922 Max",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_P108 = "Manilla Inteligente S922 Max / App / Llave";

const productos_p108 = ["P108"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 2.0 modelo P108. Nivel antirrobo 4 con cerradura de doble acción rápida y núcleo de triple fila antiarranque.",
  specs: SPECS_P108,
  features: FEATURES_P108,
  unlock: UNLOCK_P108,
  img: `/images/AI/door-p108.jpg`
}));

// ---- P106 ----
const productos_p106 = ["P106"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 2.0 modelo P106. Nivel antirrobo 4 con cerradura de doble acción rápida y núcleo de triple fila antiarranque.",
  specs: SPECS_P108,       // ✅ Idéntico al P108
  features: FEATURES_P108, // ✅ Idéntico al P108
  unlock: UNLOCK_P108,     // ✅ Idéntico al P108
  img: `/images/AI/door-p106.jpg`
}));

// ---- GL097 Pro ----
const SPECS_GL097_PRO = [
  { label: "Nivel", value: "Seguridad 3.0 / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo C Marco Alto Artesanal" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Súper Clase C Patentado" },
  { label: "Cerradura IA", value: "Manilla Inteligente S50 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_GL097_PRO = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo C alto artesanal",
  "Supercerradura patentada A5021-80",
  "Núcleo cilindro súper clase C patentado",
  "Manilla inteligente S50 Pro",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_GL097_PRO = "Manilla Inteligente S50 Pro / App / Llave";

const productos_gl097_pro = ["GL097 Pro"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 modelo GL097 Pro. Nivel antirrobo 4 con núcleo cilindro súper clase C y manilla inteligente S50 Pro.",
  specs: SPECS_GL097_PRO,
  features: FEATURES_GL097_PRO,
  unlock: UNLOCK_GL097_PRO,
  img: `/images/AI/door-gl097-pro.jpg`
}));

// ---- GL098 Pro ----
const productos_gl098_pro = ["GL098 Pro"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 modelo GL098 Pro. Nivel antirrobo 4 con núcleo cilindro súper clase C y manilla inteligente S50 Pro.",
  specs: SPECS_GL097_PRO,       // ✅ Idéntico al GL097 Pro
  features: FEATURES_GL097_PRO, // ✅ Idéntico al GL097 Pro
  unlock: UNLOCK_GL097_PRO,     // ✅ Idéntico al GL097 Pro
  img: `/images/AI/door-gl098-pro.jpg`
}));

// ---- CL96 ----
const SPECS_CL96 = [
  { label: "Nivel", value: "Seguridad 3.0 / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "Tipo H Marco Alto" },
  { label: "Cerradura", value: "A5021-80 Supercerradura + Placa Decorativa Principal y Secundaria" },
  { label: "Núcleo", value: "Embrague Eléctrico Especial Mango Plegable Acero Inoxidable Antimanipulación" },
  { label: "Cerradura IA", value: "Manilla Inteligente S60 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_CL96 = [
  "Seguridad antirrobo nivel 4",
  "Marco tipo H alto",
  "Cerradura A5021-80 con placa decorativa doble (principal y secundaria)",
  "Núcleo de embrague eléctrico con mango plegable de acero inoxidable antimanipulación",
  "Manilla inteligente S60 Pro",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_CL96 = "Manilla Inteligente S60 Pro / App / Llave";

const productos_cl96 = ["CL96"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 modelo CL96. Nivel antirrobo 4 con marco H alto, núcleo plegable de acero inoxidable y manilla inteligente S60 Pro.",
  specs: SPECS_CL96,
  features: FEATURES_CL96,
  unlock: UNLOCK_CL96,
  img: `/images/AI/door-cl96.jpg`
}));
// ---- N9518 ----
const SPECS_N9518 = [
  { label: "Nivel", value: "Seguridad 1.0 Pro / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo C Marco Alto Artesanal (Marco Flotante)" },
  { label: "Cerradura", value: "Doble Acción Doble Cierre Rápido Antiexplosión" },
  { label: "Núcleo", value: "Triple Fila Antiarranque Motor Eléctrico" },
  { label: "Cerradura IA", value: "Manilla Inteligente S922 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_N9518 = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo C alto artesanal con marco flotante",
  "Cerradura doble acción antiexplosión",
  "Núcleo de triple fila antiarranque con motor eléctrico",
  "Manilla inteligente S922 Pro",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_N9518 = "Manilla Inteligente S922 Pro / App / Llave";

const productos_n9518 = ["N9518"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 1.0 Pro modelo N9518. Nivel antirrobo 4 con marco flotante, cerradura antiexplosión y núcleo de triple fila antiarranque.",
  specs: SPECS_N9518,
  features: FEATURES_N9518,
  unlock: UNLOCK_N9518,
  img: `/images/AI/door-n9518.jpg`
}));

// ---- N9519 ----
const SPECS_N9519 = [
  { label: "Nivel", value: "Seguridad 1.0 Pro / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo Ángulo Recto + De Suelo a Techo" },
  { label: "Cerradura", value: "Doble Acción Doble Cierre Rápido Antiexplosión" },
  { label: "Núcleo", value: "Triple Fila Antiarranque Motor Eléctrico" },
  { label: "Cerradura IA", value: "Manilla Inteligente S922 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const productos_n9519 = ["N9519"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 1.0 Pro modelo N9519. Nivel antirrobo 4 con marco de suelo a techo, cerradura antiexplosión y núcleo de triple fila antiarranque.",
  specs: SPECS_N9519,
  features: FEATURES_N9518, // ✅ Features idénticas al N9518
  unlock: UNLOCK_N9518,     // ✅ Desbloqueo idéntico al N9518
  img: `/images/AI/door-n9519.jpg`
}));

// --- 2. GENERADORES ---

// Specs categorías generales
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

// ---- N9520 ----
const SPECS_N9520 = [
  { label: "Nivel", value: "Seguridad 1.0 Pro / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo Ángulo Recto + De Suelo a Techo" },
  { label: "Cerradura", value: "A7-5 Doble Acción Doble Cierre Rápido + Placa Decorativa Principal y Secundaria" },
  { label: "Núcleo", value: "Triple Fila Antiarranque Motor Eléctrico" },
  { label: "Cerradura IA", value: "Cerradura Inteligente Externa S922 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_N9520 = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo ángulo recto de suelo a techo",
  "Cerradura A7-5 doble acción con placa decorativa doble",
  "Núcleo de triple fila antiarranque con motor eléctrico",
  "Cerradura inteligente externa S922 Pro",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_N9520 = "Cerradura Inteligente Externa S922 Pro / App / Llave";

const productos_n9520 = ["N9520"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 1.0 Pro modelo N9520. Nivel antirrobo 4 con cerradura A7-5 de doble acción y cerradura inteligente externa S922 Pro.",
  specs: SPECS_N9520,
  features: FEATURES_N9520,
  unlock: UNLOCK_N9520,
  img: `/images/AI/door-n9520.jpg`
}));

// ---- P101 IA ----
const SPECS_P101_IA = [
  { label: "Nivel", value: "Seguridad 1.0 Pro / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo Alto Plano" },
  { label: "Cerradura", value: "A7-5 Doble Acción Doble Cierre Rápido + Placa Decorativa Principal y Secundaria" },
  { label: "Núcleo", value: "Triple Fila Motor Eléctrico Mango Plegable" },
  { label: "Cerradura IA", value: "Manilla Inteligente S922 Ojo de Pez" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_P101_IA = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo alto plano",
  "Cerradura A7-5 doble acción con placa decorativa doble",
  "Núcleo de triple fila eléctrico con mango plegable",
  "Manilla inteligente S922 con ojo de pez integrado",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_P101_IA = "Manilla Inteligente S922 / App / Llave";

const productos_p101_ia = ["P101 IA"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 1.0 Pro modelo P101. Nivel antirrobo 4 con núcleo plegable eléctrico y manilla inteligente S922 con ojo de pez.",
  specs: SPECS_P101_IA,
  features: FEATURES_P101_IA,
  unlock: UNLOCK_P101_IA,
  img: `/images/AI/door-p101-ia.jpg`
}));

// ---- P107 IA ----
const SPECS_P107_IA = [
  { label: "Nivel", value: "Seguridad 1.0 Pro / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo C Marco Alto Artesanal" },
  { label: "Cerradura", value: "A7-5 Doble Acción Doble Cierre Rápido + Placa Decorativa Principal y Secundaria" },
  { label: "Núcleo", value: "Triple Fila Antiarranque Motor Eléctrico" },
  { label: "Cerradura IA", value: "Manilla Inteligente Negra S922 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_P107_IA = [
  "Seguridad antirrobo nivel 4",
  "Marco T tipo C alto artesanal",
  "Cerradura A7-5 doble acción con placa decorativa doble",
  "Núcleo de triple fila antiarranque con motor eléctrico",
  "Manilla inteligente negra S922 Pro",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_P107_IA = "Manilla Inteligente S922 Pro / App / Llave";

const productos_p107_ia = ["P107 IA"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 1.0 Pro modelo P107. Nivel antirrobo 4 con marco C alto artesanal y manilla inteligente negra S922 Pro.",
  specs: SPECS_P107_IA,
  features: FEATURES_P107_IA,
  unlock: UNLOCK_P107_IA,
  img: `/images/AI/door-p107-ia.jpg`
}));

// ---- Y118 ----
const SPECS_Y118 = [
  { label: "Nivel", value: "Seguridad 3.0 / Antirrobo Nivel 3" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "Marco Flotante Borde Tridimensional" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Patentado" },
  { label: "Cerradura Mecánica", value: "Manilla Mecánica P10 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_Y118 = [
  "Seguridad antirrobo nivel 3",
  "Marco flotante con borde tridimensional",
  "Supercerradura patentada A5021-80",
  "Cilindro patentado",
  "Manilla mecánica P10 Pro",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_Y118 = "Manilla Mecánica P10 Pro / Llave";

const productos_y118 = ["Y118"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 3.0 modelo Y118. Antirrobo nivel 3 con marco flotante de borde tridimensional y manilla mecánica P10 Pro.",
  specs: SPECS_Y118,
  features: FEATURES_Y118,
  unlock: UNLOCK_Y118,
  img: `/images/AI/door-y118.jpg`
}));

// ---- Y119 ----
const SPECS_Y119 = [
  { label: "Nivel", value: "Seguridad 3.0 / Antirrobo Nivel 3" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "T Tipo Ángulo Recto + Marco Flotante" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Patentado" },
  { label: "Cerradura Mecánica", value: "Manilla Mecánica P10 Pro" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_Y119 = [
  "Seguridad antirrobo nivel 3",
  "Marco T tipo ángulo recto con marco flotante",
  "Supercerradura patentada A5021-80",
  "Cilindro patentado",
  "Manilla mecánica P10 Pro",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_Y119 = "Manilla Mecánica P10 Pro / Llave";

const productos_y119 = ["Y119"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 3.0 modelo Y119. Antirrobo nivel 3 con marco T ángulo recto y flotante, manilla mecánica P10 Pro.",
  specs: SPECS_Y119,
  features: FEATURES_Y119,
  unlock: UNLOCK_Y119,
  img: `/images/AI/door-y119.jpg`
}));

// ---- Y106 ----
const SPECS_Y106 = [
  { label: "Nivel", value: "Seguridad 3.0 / Antirrobo Nivel 3" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "Marco Flotante 85 Borde Pequeño Plegado a Mano" },
  { label: "Cerradura", value: "A7-3 Cierre Rápido Antiexplosión + Placa Decorativa Principal y Secundaria" },
  { label: "Núcleo", value: "Doble Fila Todo Negro" },
  { label: "Cerradura Mecánica", value: "Manilla Mecánica T007 Gris Metálico" },
  { label: "Estándar", value: "GB17565-2022" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_Y106 = [
  "Seguridad antirrobo nivel 3",
  "Marco flotante 85 con borde pequeño plegado a mano",
  "Cerradura A7-3 antiexplosión con placa decorativa doble",
  "Núcleo de doble fila todo negro",
  "Manilla mecánica T007 gris metálico",
  "Cumple norma GB17565-2022",
  "Fabricación a medida no estándar"
];

const UNLOCK_Y106 = "Manilla Mecánica T007 / Llave";

const productos_y106 = ["Y106"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 3.0 modelo Y106. Antirrobo nivel 3 con marco flotante 85 borde plegado, cerradura A7-3 antiexplosión y manilla gris metálico T007.",
  specs: SPECS_Y106,
  features: FEATURES_Y106,
  unlock: UNLOCK_Y106,
  img: `/images/AI/door-y106.jpg`
}));

// ---- 潮和 (Chaohe) ----
const SPECS_CHAOHE = [
  { label: "Nivel", value: "Seguridad 2.0" },
  { label: "Grosor", value: "95mm" },
  { label: "Marco", value: "Vanguard Navegación Artesanal" },
  { label: "Cerradura", value: "A9-80 Doble Acción Doble Cierre Rápido Antiexplosión" },
  { label: "Núcleo", value: "Triple Fila Motor Eléctrico Mango Plegable" },
  { label: "Cerradura IA", value: "A Elección del Cliente" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_CHAOHE = [
  "Seguridad 2.0",
  "Grosor 95mm — máxima robustez",
  "Marco vanguard navegación artesanal",
  "Cerradura A9-80 doble acción antiexplosión",
  "Núcleo de triple fila eléctrico con mango plegable",
  "Cerradura IA personalizable a elección del cliente",
  "Fabricación a medida no estándar"
];

const UNLOCK_CHAOHE = "A Elección del Cliente / App / Llave";

const productos_chaohe = ["潮和"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 2.0 modelo 潮和 (Chaohe). 95mm de grosor, marco artesanal vanguard y cerradura IA personalizable a elección del cliente.",
  specs: SPECS_CHAOHE,
  features: FEATURES_CHAOHE,
  unlock: UNLOCK_CHAOHE,
  img: `/images/AI/door-chaohe.jpg`
}));

// ---- L5859 ----
const SPECS_L5859 = [
  { label: "Nivel", value: "Seguridad 3.0 Max" },
  { label: "Grosor", value: "95mm" },
  { label: "Marco", value: "T Tipo C (Bisel 50°) + De Suelo a Techo" },
  { label: "Cerradura", value: "A5021-80 Panel Continuo + Placa Decorativa Continua Principal y Secundaria" },
  { label: "Núcleo", value: "Antimanipulación Eléctrico Mango Metálico" },
  { label: "Cerradura IA", value: "Manilla T200 + Pantalla Trasera 10.1\" + Cubierta IV126 + Manilla Oculta HT-1018 Negra (Hengtai)" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_L5859 = [
  "Seguridad 3.0 Max",
  "Grosor 95mm con marco T tipo C de bisel a 50°, de suelo a techo",
  "Cerradura A5021-80 de panel continuo con placa decorativa doble",
  "Núcleo eléctrico antimanipulación con mango metálico",
  "Sistema IA cuádruple: manilla T200 + pantalla trasera 10.1\" + cubierta IV126 + manilla oculta HT-1018",
  "Fabricación a medida no estándar"
];

const UNLOCK_L5859 = "Manilla T200 / Pantalla Trasera / App / Llave";

const productos_l5859 = ["L5859"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 3.0 Max modelo L5859. 95mm, marco T-C bisel 50° de suelo a techo y sistema IA cuádruple con manilla T200, pantalla 10.1\", cubierta IV126 y manilla oculta HT-1018.",
  specs: SPECS_L5859,
  features: FEATURES_L5859,
  unlock: UNLOCK_L5859,
  img: `/images/AI/door-l5859.jpg`
}));

// ---- L5857 ----
const productos_l5857 = ["L5857"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 3.0 Max modelo L5857. 95mm, marco T-C bisel 50° de suelo a techo y cerradura IA personalizable a elección del cliente.",
  specs: [
    ...SPECS_L5859.slice(0, 5), // Nivel, Grosor, Marco, Cerradura, Núcleo — idénticos
    { label: "Cerradura IA", value: "A Elección del Cliente" },
    { label: "Medidas", value: "A Medida / No Estándar" }
  ],
  features: [
    "Seguridad 3.0 Max",
    "Grosor 95mm con marco T tipo C de bisel a 50°, de suelo a techo",
    "Cerradura A5021-80 de panel continuo con placa decorativa doble",
    "Núcleo eléctrico antimanipulación con mango metálico",
    "Cerradura IA personalizable a elección del cliente",
    "Fabricación a medida no estándar"
  ],
  unlock: "A Elección del Cliente / App / Llave",
  img: `/images/AI/door-l5857.jpg`
}));

// ---- L5601 ----
const productos_l5601 = ["L5601"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 3.0 Max modelo L5601. 95mm, marco T-C bisel 50° de suelo a techo y cerradura IA personalizable a elección del cliente.",
  specs: productos_l5857[0].specs,       // ✅ Idéntico al L5857
  features: productos_l5857[0].features, // ✅ Idéntico al L5857
  unlock: productos_l5857[0].unlock,     // ✅ Idéntico al L5857
  img: `/images/AI/door-l5601.jpg`
}));

// ---- P105 IA ----
const SPECS_P105_IA = [
  { label: "Nivel", value: "Seguridad IA / Antirrobo Nivel 4" },
  { label: "Grosor", value: "90mm" },
  { label: "Marco", value: "Tipo H Marco Alto" },
  { label: "Cerradura", value: "Doble Acción Doble Cierre Rápido Antiexplosión + Placa Decorativa Principal y Secundaria" },
  { label: "Núcleo", value: "Triple Fila Antiarranque Motor Eléctrico" },
  { label: "Cerradura IA", value: "Manilla Inteligente S922 Pro" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_P105_IA = [
  "Marco tipo H alto",
  "Cerradura doble acción antiexplosión con placa decorativa doble",
  "Núcleo de triple fila antiarranque con motor eléctrico",
  "Manilla inteligente S922 Pro",
  "Fabricación a medida no estándar"
];

const UNLOCK_P105_IA = "Manilla Inteligente S922 Pro / App / Llave";

const productos_p105_ia = ["P105 IA"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad IA modelo P105. Marco H alto, cerradura antiexplosión con placa decorativa doble y manilla inteligente S922 Pro.",
  specs: SPECS_P105_IA,
  features: FEATURES_P105_IA,
  unlock: UNLOCK_P105_IA,
  img: `/images/AI/door-p105-ia.jpg`
}));

// ---- 路易 (Louis) ----
const SPECS_LUYI = [
  { label: "Nivel", value: "Seguridad 4.0" },
  { label: "Grosor", value: "95mm" },
  { label: "Marco", value: "Vanguard Navegación Artesanal" },
  { label: "Cerradura", value: "A7-3 Doble Acción Doble Cierre Rápido Antiexplosión" },
  { label: "Núcleo", value: "Triple Fila Motor Eléctrico Mango Plegable" },
  { label: "Cerradura IA", value: "A Elección del Cliente" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_LUYI = [
  "Seguridad 4.0",
  "Grosor 95mm con marco vanguard navegación artesanal",
  "Cerradura A7-3 doble acción antiexplosión",
  "Núcleo de triple fila eléctrico con mango plegable",
  "Cerradura IA personalizable a elección del cliente",
  "Fabricación a medida no estándar"
];

const UNLOCK_LUYI = "A Elección del Cliente / App / Llave";

const productos_luyi = ["路易"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 4.0 modelo 路易 (Louis). 95mm, marco vanguard artesanal, cerradura A7-3 antiexplosión y sistema IA a elección del cliente.",
  specs: SPECS_LUYI,
  features: FEATURES_LUYI,
  unlock: UNLOCK_LUYI,
  img: `/images/AI/door-luyi.jpg`
}));

// ---- 潮普 (Chaopu) ----
const productos_chaopu = ["潮普"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 4.0 modelo 潮普 (Chaopu). 95mm, marco vanguard artesanal, cerradura A7-3 antiexplosión y sistema IA a elección del cliente.",
  specs: SPECS_LUYI,       // ✅ Idéntico al 路易
  features: FEATURES_LUYI, // ✅ Idéntico al 路易
  unlock: UNLOCK_LUYI,     // ✅ Idéntico al 路易
  img: `/images/AI/door-chaopu.jpg`
}));

// ---- 帝华 (Dihua) ----
const SPECS_DIHUA = [
  { label: "Nivel", value: "Seguridad 4.0" },
  { label: "Grosor", value: "95mm" },
  { label: "Marco", value: "T Tipo Marco Alto" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Patentado" },
  { label: "Cerradura IA", value: "A Elección del Cliente" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_DIHUA = [
  "Seguridad 4.0",
  "Grosor 95mm con marco T tipo alto",
  "Supercerradura patentada A5021-80",
  "Cilindro patentado",
  "Cerradura IA personalizable a elección del cliente",
  "Fabricación a medida no estándar"
];

const UNLOCK_DIHUA = "A Elección del Cliente / App / Llave";

const productos_dihua = ["帝华"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 4.0 modelo 帝华 (Dihua). 95mm, marco T alto, supercerradura A5021-80 y sistema IA a elección del cliente.",
  specs: SPECS_DIHUA,
  features: FEATURES_DIHUA,
  unlock: UNLOCK_DIHUA,
  img: `/images/AI/door-dihua.jpg`
}));

// ---- 塞纳 (Saina) ----
const productos_saina = ["塞纳"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 4.0 modelo 塞纳 (Saina). 95mm, marco T alto, supercerradura A5021-80 y sistema IA a elección del cliente.",
  specs: SPECS_DIHUA,       // ✅ Idéntico al 帝华
  features: FEATURES_DIHUA, // ✅ Idéntico al 帝华
  unlock: UNLOCK_DIHUA,     // ✅ Idéntico al 帝华
  img: `/images/AI/door-saina.jpg`
}));

// ---- 迈凯伦 (Makailen) ----
const productos_makailen = ["迈凯伦"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 4.0 modelo 迈凯伦 (Makailen). 95mm, marco vanguard artesanal, cerradura A7-3 antiexplosión y sistema IA a elección del cliente.",
  specs: SPECS_LUYI,       // ✅ Idéntico al 路易/潮普
  features: FEATURES_LUYI, // ✅ Idéntico al 路易/潮普
  unlock: UNLOCK_LUYI,     // ✅ Idéntico al 路易/潮普
  img: `/images/AI/door-makailen.jpg`
}));

// ---- 萨博 (Sabo) ----
const SPECS_SABO = [
  { label: "Nivel", value: "Seguridad 4.0" },
  { label: "Grosor", value: "95mm" },
  { label: "Marco", value: "T Tipo Marco Alto" },
  { label: "Cerradura", value: "A5021-80 Supercerradura Patentada" },
  { label: "Núcleo", value: "Cilindro Patentado" },
  { label: "Cerradura IA", value: "Manilla Inteligente S60 Max" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_SABO = [
  "Seguridad 4.0",
  "Grosor 95mm con marco T tipo alto",
  "Supercerradura patentada A5021-80",
  "Cilindro patentado",
  "Manilla inteligente S60 Max",
  "Fabricación a medida no estándar"
];

const UNLOCK_SABO = "Manilla Inteligente S60 Max / App / Llave";

const productos_sabo = ["萨博"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 4.0 modelo 萨博 (Sabo). 95mm, marco T alto, supercerradura A5021-80 y manilla inteligente S60 Max.",
  specs: SPECS_SABO,
  features: FEATURES_SABO,
  unlock: UNLOCK_SABO,
  img: `/images/AI/door-sabo.jpg`
}));

// ---- 潮领 (Chaoling) ----
const productos_chaoling = ["潮领"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 4.0 modelo 潮领 (Chaoling). 95mm, marco T alto, supercerradura A5021-80 y sistema IA a elección del cliente.",
  specs: SPECS_DIHUA,       // ✅ Idéntico al 帝华/塞纳
  features: FEATURES_DIHUA, // ✅ Idéntico al 帝华/塞纳
  unlock: UNLOCK_DIHUA,     // ✅ Idéntico al 帝华/塞纳
  img: `/images/AI/door-chaoling.jpg`
}));

// ---- 普拉达 (Pulada) ----
const productos_pulada = ["普拉达"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad 4.0 modelo 普拉达 (Pulada). 95mm, marco T alto, supercerradura A5021-80 y sistema IA a elección del cliente.",
  specs: SPECS_DIHUA,       // ✅ Idéntico al 帝华/塞纳/潮领
  features: FEATURES_DIHUA, // ✅ Idéntico al 帝华/塞纳/潮领
  unlock: UNLOCK_DIHUA,     // ✅ Idéntico al 帝华/塞纳/潮领
  img: `/images/AI/door-pulada.jpg`
}));

// ---- TDF-2009 ----
const SPECS_TDF2009 = [
  { label: "Serie", value: "Puerta de Cobre Compuesta" },
  { label: "Tipo", value: "Puerta Antirrobo Totalmente Automática" },
  { label: "Grosor", value: "90mm" },
  { label: "Cerradura", value: "Cerradura Especial de Alto Rendimiento" },
  { label: "Núcleo", value: "Cilindro Patentado Súper Clase C" },
  { label: "Cerradura IA", value: "Opcional / A Elección del Cliente" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_TDF2009 = [
  "Serie puerta de cobre compuesta",
  "Apertura totalmente automática antirrobo",
  "Grosor 90mm",
  "Cerradura especial de alto rendimiento",
  "Núcleo cilindro patentado súper clase C",
  "Cerradura IA opcional a elección del cliente",
  "Fabricación a medida no estándar"
];

const UNLOCK_TDF2009 = "Automático / Cerradura IA Opcional / Llave";

const productos_tdf2009 = ["TDF-2009"].map(n => ({
  name: n,
  category: "PUERTA DE COBRE COMPUESTA",
  description: "Puerta de cobre compuesta totalmente automática modelo TDF-2009. Núcleo súper clase C y cerradura IA opcional.",
  specs: SPECS_TDF2009,
  features: FEATURES_TDF2009,
  unlock: UNLOCK_TDF2009,
  img: `/images/COBRE/door-tdf-2009.jpg`
}));

// ---- TDF-2003 ----
const SPECS_TDF2003 = [
  { label: "Serie", value: "Puerta de Cobre Compuesta" },
  { label: "Tipo", value: "Puerta Antirrobo Totalmente Automática" },
  { label: "Grosor", value: "90mm" },
  { label: "Cerradura", value: "Cerradura Especial" },
  { label: "Núcleo", value: "Cilindro Súper Clase C Patentado" },
  { label: "Cerradura IA", value: "A Elección del Cliente" },
  { label: "Medidas", value: "A Medida / No Estándar" }
];

const FEATURES_TDF2003 = [
  "Serie puerta de cobre compuesta",
  "Apertura totalmente automática antirrobo",
  "Núcleo cilindro súper clase C patentado",
  "Cerradura especial de alta seguridad",
  "Cerradura IA opcional a elección del cliente",
  "Fabricación a medida no estándar"
];

const UNLOCK_TDF2003 = "A Elección del Cliente / App / Llave";

const productos_tdf2003 = ["TDF-2003"].map(n => ({
  name: n,
  category: "PUERTA DE COBRE COMPUESTA",
  description: "Puerta de cobre compuesta modelo TDF-2003. Apertura totalmente automática antirrobo con núcleo cilindro súper clase C y cerradura IA opcional.",
  specs: SPECS_TDF2003,
  features: FEATURES_TDF2003,
  unlock: UNLOCK_TDF2003,
  img: `/images/COBRE/door-tdf-2003.jpg`
}));

// ---- 盛世 (Shengshi) ----
const productos_shengshi = ["盛世"].map(n => ({
  name: n,
  category: "PUERTA DE SEGURIDAD IA",
  description: "Puerta de seguridad inteligente 3.0 modelo 盛世 (Shengshi). Nivel antirrobo 4 con marco de suelo a techo, cerradura antiexplosión y manilla inteligente S922 Pro.",
  specs: SPECS_N9519,       // ✅ Idéntico al N9519
  features: FEATURES_N9518, // ✅ Idéntico al N9519
  unlock: UNLOCK_N9518,     // ✅ Idéntico al N9519
  img: `/images/AI/door-shengshi.jpg`
}));

// --- 3. UNIFICACIÓN ---
const DATA_PRODUCTOS = [
  ...productos_ia, ...productos_t200, ...productos_k300_max, ...productos_k300_pro, ...productos_s121, ...productos_s101, ...productos_s119, ...productos_s118, ...productos_s116, ...productos_p102_ia, ...productos_p103, ...productos_p108, ...productos_p106, ...productos_gl097_pro, ...productos_gl098_pro, ...productos_cl96, ...productos_n9518, ...productos_n9519, ...productos_n9520, ...productos_p101_ia, ...productos_p107_ia, ...productos_y118, ...productos_y119, ...productos_y106, ...productos_chaohe, ...productos_l5859, ...productos_l5857, ...productos_l5601, ...productos_p105_ia, ...productos_luyi, ...productos_chaopu, ...productos_dihua, ...productos_saina, ...productos_makailen, ...productos_sabo, ...productos_chaoling, ...productos_pulada, ...productos_shengshi,
  ...productos_acero, ...productos_acorazada,
  ...productos_aluminio, ...productos_madera_j, ...productos_madera_d,
  ...productos_madera_s, ...productos_pvc, ...productos_corredizas,
  ...productos_cortafuegos, ...productos_medicas,
  ...productos_tdf2003, ...productos_tdf2009
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