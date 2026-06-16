// subir-cerraduras.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// ConfiguraciÃ³n de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Usamos preferiblemente la SERVICE_ROLE para permisos de escritura
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("âŒ Error: Faltan las variables de entorno en .env.local");
  console.error("AsegÃºrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- 1. MODELOS (Cerraduras Principales) ---
// NOTA: Se han eliminado los iconos JSX. El frontend los reasignarÃ¡ segÃºn el 'label'.
const MODELOS = [
  {
    id: "s60max",
    name: "S60 Max",
    category: "Smart Lock",
    type: "Serie Max",
    img: "/images/CERRADURA/lock-s60-max.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s60wallpaper.webp",
    description: "La cerradura inteligente con detecciÃ³n remota real. Se abre automÃ¡ticamente al acercarte a 2-4 metros. Incorpora reconocimiento facial 3D, mirilla digital con captura de instantÃ¡neas y una pantalla trasera de 4,5 pulgadas para mÃ¡xima seguridad y comodidad.",
    specs: [
      { label: "Pantalla", value: "4.5''" },
      { label: "Acceso", value: "6 MÃ©todos" },
      { label: "Sensor", value: "2-4 Metros" }
    ],
    details: {
      Tipo: "Inteligente con sensor remoto",
      VersiÃ³n: "Max",
      Pantalla: "4,5 Pulgadas",
      Color: "Negro Espacial",
      Cuerpo_Compatible: "MecÃ¡nica AutomÃ¡tica WONLY",
      Cilindro_Compatible: "ElectrÃ³nico / ElÃ©ctrico 3 filas"
    },
    performance: [
      { label: "DetecciÃ³n", value: "2-4 Metros", level: "Apertura AutomÃ¡tica" },
      { label: "BiometrÃ­a", value: "Facial 3D", level: "Anti-falsificaciÃ³n" },
      { label: "Seguridad", value: "Cifrado M1", level: "Nivel Financiero" },
      { label: "Control", value: "App + Mirilla", level: "VisualizaciÃ³n Remota" },
      { label: "Sistemas", value: "3 Aislados", level: "GestiÃ³n Independiente" },
      { label: "Respaldo", value: "Llave MecÃ¡nica", level: "Clase C Superior" }
    ],
    colors: { interior: [{ name: "Negro Espacial", hex: "#1a1a1a" }] }
  },
  {
    id: "s922max",
    name: "S922 Max",
    category: "Smart Lock",
    type: "Serie Max",
    img: "/images/CERRADURA/lock-s922-max.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s922maxwallpaper.webp",
    description: "Cerradura inteligente de alta seguridad con reconocimiento facial 3D avanzado. Integra mirilla visual, captura de estancia y una pantalla trasera de 4 pulgadas para un control total del acceso.",
    specs: [
      { label: "Pantalla", value: "4.0''" },
      { label: "Acceso", value: "5 MÃ©todos" },
      { label: "BiometrÃ­a", value: "Facial 3D" }
    ],
    details: {
      Tipo: "Inteligente Reconocimiento Facial",
      VersiÃ³n: "Max",
      CaracterÃ­sticas: "Facial 3D + Mirilla + Captura",
      Pantalla: "4 Pulgadas",
      Color: "Negro",
      Cuerpo_Compatible: "MecÃ¡nica WONLY Auto",
      Cilindro_Compatible: "ElectrÃ³nico / ElÃ©ctrico 3 filas"
    },
    performance: [
      { label: "BiometrÃ­a", value: "Facial 3D", level: "Reconocimiento Profundo" },
      { label: "Acceso", value: "Huella + Clave", level: "Multifuncional" },
      { label: "Vigilancia", value: "Mirilla Visual", level: "Captura de Estancia" },
      { label: "Seguridad", value: "Cifrado M1", level: "Tarjeta Encriptada" },
      { label: "Pantalla", value: "4 Pulgadas", level: "Panel Trasero HD" },
      { label: "Respaldo", value: "Llave MecÃ¡nica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "s935pro",
    name: "S935 Pro",
    category: "Smart Lock",
    type: "Serie Pro",
    img: "/images/CERRADURA/lock-s935-pro.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s935wallpaper.webp",
    description: "Sistema de seguridad integral con Video Portero y Desbloqueo Remoto. Combina reconocimiento facial 3D, tarjeta CPU de alta seguridad y una pantalla de 4 pulgadas para una gestiÃ³n de acceso total.",
    specs: [
      { label: "Pantalla", value: "4.0''" },
      { label: "ComunicaciÃ³n", value: "Video Portero" },
      { label: "Acceso", value: "Huella + Facial" }
    ],
    details: {
      Tipo: "Inteligente Facial + Video",
      VersiÃ³n: "Pro",
      Funciones: "Video Portero + Desbloqueo Remoto",
      Pantalla: "4 Pulgadas",
      Color: "Negro",
      Cuerpo_Compatible: "MecÃ¡nica WONLY Auto/RÃ¡pido",
      Cilindro_Compatible: "ElectrÃ³nico / Antirrobo 3 filas"
    },
    performance: [
      { label: "ComunicaciÃ³n", value: "Video Portero", level: "Intercomunicador Visual" },
      { label: "BiometrÃ­a", value: "Facial 3D", level: "Alta PrecisiÃ³n" },
      { label: "Remoto", value: "App Control", level: "Desbloqueo a Distancia" },
      { label: "Seguridad", value: "Tarjeta CPU", level: "Anti-copia Avanzado" },
      { label: "Acceso", value: "Huella + Clave", level: "Respuesta RÃ¡pida" },
      { label: "Respaldo", value: "Llave MecÃ¡nica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "s958pro",
    name: "S958 Pro",
    category: "Smart Lock",
    type: "Serie Pro",
    img: "/images/CERRADURA/lock-s958-pro.webp",
    description: "Cerradura inteligente de diseÃ±o exclusivo en Negro Obsidiana. Integra reconocimiento facial 3D, video portero, mirilla digital y captura de estancia, ofreciendo la mÃ¡xima protecciÃ³n y conectividad.",
    specs: [
      { label: "Pantalla", value: "4.0''" },
      { label: "Seguridad", value: "Tarjeta CPU" },
      { label: "BiometrÃ­a", value: "Facial 3D" }
    ],
    details: {
      Tipo: "Inteligente Facial + Video",
      VersiÃ³n: "Pro",
      Funciones: "Video Portero + Mirilla + Captura",
      Pantalla: "4 Pulgadas",
      Color: "Negro Obsidiana",
      Cuerpo_Compatible: "MecÃ¡nica WONLY Auto/RÃ¡pido",
      Cilindro_Compatible: "ElectrÃ³nico / Antirrobo 3 filas"
    },
    performance: [
      { label: "Video", value: "Video Portero", level: "ComunicaciÃ³n Bidireccional" },
      { label: "BiometrÃ­a", value: "Facial 3D", level: "Reconocimiento Profundo" },
      { label: "Conectividad", value: "App Remota", level: "Control Total" },
      { label: "ProtecciÃ³n", value: "Tarjeta CPU", level: "Cifrado Bancario" },
      { label: "Vigilancia", value: "Captura Estancia", level: "Monitoreo Activo" },
      { label: "Respaldo", value: "Llave MecÃ¡nica", level: "Clase C" }
    ],
    colors: { interior: [{ name: "Negro Obsidiana", hex: "#111111" }] }
  },
  {
    id: "s953max",
    name: "S953 Max",
    category: "Smart Lock",
    type: "Serie Max",
    img: "/images/CERRADURA/s953max.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s953maxwallpaper.webp",
    description: "TecnologÃ­a de vanguardia con Reconocimiento de Venas Dactilares para una seguridad infalible. Combina lo mejor de la biometrÃ­a (facial y venas) con mirilla visual y pantalla de 4 pulgadas.",
    specs: [
      { label: "BiometrÃ­a", value: "Venas + Facial" },
      { label: "Pantalla", value: "4.0''" },
      { label: "Seguridad", value: "Tarjeta CPU" }
    ],
    details: {
      Tipo: "Inteligente Venas Dactilares",
      VersiÃ³n: "Max",
      CaracterÃ­sticas: "Facial + Venas + Mirilla + Captura",
      Pantalla: "4 Pulgadas",
      Color: "Negro Obsidiana",
      Cuerpo_Compatible: "MecÃ¡nica WONLY Auto/RÃ¡pido",
      Cilindro_Compatible: "ElectrÃ³nico / Antirrobo 3 filas"
    },
    performance: [
      { label: "BiometrÃ­a", value: "Venas Dactilares", level: "MÃ¡xima Seguridad" },
      { label: "BiometrÃ­a 2", value: "Facial + Huella", level: "Multifuncional" },
      { label: "Vigilancia", value: "Captura Estancia", level: "Monitor Trasero" },
      { label: "ProtecciÃ³n", value: "Tarjeta CPU", level: "Anti-ClonaciÃ³n" },
      { label: "Pantalla", value: "4 Pulgadas", level: "Panel HD" },
      { label: "Respaldo", value: "Llave MecÃ¡nica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro Obsidiana", hex: "#111111" }] }
  },
  {
    id: "p15",
    name: "P15",
    category: "Smart Lock",
    type: "Serie Pro",
    img: "/images/CERRADURA/p15.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/p15wallpaper.webp",
    description: "DiseÃ±o elegante con una gran pantalla trasera de 4.5 pulgadas para una visibilidad superior. Integra reconocimiento facial 3D y mirilla digital con captura de estancia, ideal para quienes buscan tecnologÃ­a visual avanzada.",
    specs: [
      { label: "Pantalla", value: "4.5''" },
      { label: "BiometrÃ­a", value: "Facial 3D" },
      { label: "Tarjeta", value: "Cifrado M1" }
    ],
    details: {
      Tipo: "Inteligente Facial",
      VersiÃ³n: "Pro",
      CaracterÃ­sticas: "Facial 3D + Mirilla + Captura",
      Pantalla: "4.5 Pulgadas",
      Color: "Negro",
      Cuerpo_Compatible: "MecÃ¡nica WONLY Auto/RÃ¡pido",
      Cilindro_Compatible: "ElectrÃ³nico / Antirrobo 3 filas"
    },
    performance: [
      { label: "BiometrÃ­a", value: "Facial 3D", level: "Alta PrecisiÃ³n" },
      { label: "Pantalla", value: "4.5 Pulgadas", level: "Gran Formato" },
      { label: "Vigilancia", value: "Mirilla + Captura", level: "Monitor Activo" },
      { label: "Seguridad", value: "Cifrado M1", level: "Tarjeta Encriptada" },
      { label: "Acceso", value: "Huella + Clave", level: "Respuesta RÃ¡pida" },
      { label: "Respaldo", value: "Llave MecÃ¡nica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "s936",
    name: "S936",
    category: "Smart Lock",
    type: "Semi-Auto",
    img: "/images/CERRADURA/lock-s936.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s936wallpaper.webp",
    description: "Cerradura inteligente semi-automÃ¡tica con diseÃ±o ergonÃ³mico de 'un solo agarre'. Ideal para acceso rÃ¡pido mediante huella dactilar, combinando simplicidad de uso y seguridad con tarjeta cifrada M1.",
    specs: [
      { label: "Apertura", value: "Un Agarre" },
      { label: "Acceso", value: "Huella + M1" },
      { label: "Mecanismo", value: "Semi-Auto" }
    ],
    details: {
      Tipo: "Inteligente Huella Dactilar",
      VersiÃ³n: "Semi-AutomÃ¡tica / Un Agarre",
      Funciones: "Huella + Clave + Tarjeta M1 + Llave",
      Color: "Negro",
      Cuerpo_Compatible: "Desbloqueo rÃ¡pido WONLY",
      Cilindro_Compatible: "WONLY Media Luna (Doble Fila)"
    },
    performance: [
      { label: "BiometrÃ­a", value: "Huella Dactilar", level: "Acceso RÃ¡pido" },
      { label: "Mecanismo", value: "Un Agarre", level: "ErgonomÃ­a Directa" },
      { label: "Seguridad", value: "Cifrado M1", level: "Tarjeta Encriptada" },
      { label: "Respaldo", value: "Llave MecÃ¡nica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "s80-vision",
    name: "S80 Vision Series",
    category: "Flagship",
    type: "Smart Lock UWB",
    img: "/images/CERRADURA/s80-lock.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s80wallpaper.webp",
    description: "La cerradura mÃ¡s avanzada con tecnologÃ­a UWB de 4Âª generaciÃ³n. Detecta tu presencia y abre automÃ¡ticamente. Cuenta con pantalla interactiva que reacciona con 50 expresiones y monitoreo activo.",
    specs: [
      { value: "UWB 4.0", label: "TecnologÃ­a" },
      { value: "4.7\" HD", label: "Pantalla" },
      { value: "CNC", label: "Cuerpo" }
    ],
    details: {
      reconocimiento: "Facial 3D + Venas + UWB",
      camara: "2MP Gran Angular + VisiÃ³n Nocturna",
      pantalla: "4.7 Pulgadas IPS Alta DefiniciÃ³n",
      interaccion: "Pantalla externa con 50 Emojis",
      material: "Aluminio AeronÃ¡utico (Tallado CNC)",
      seguridad: "Alerta de merodeo + Captura automÃ¡tica",
      bateria: "Bajo consumo (220uA) - 6 meses+"
    },
    performance: [
      { label: "Sensor", value: "UWB 4.0", level: "DetecciÃ³n Remota" },
      { label: "BiometrÃ­a", value: "Facial 3D", level: "Sin Contacto" },
      { label: "Pantalla", value: "4.7'' HD", level: "Interactiva" },
      { label: "Seguridad", value: "Alerta", level: "Anti-Merodeo" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "s80-max",
    name: "S80 Max Flagship",
    category: "Tope de Gama",
    type: "UWB + 3D Face ID",
    img: "/images/CERRADURA/s80-max.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s80wallpaper.webp",
    description: "El estÃ¡ndar mÃ¡s alto en seguridad inteligente. Combina detecciÃ³n UWB de 4Âª generaciÃ³n para apertura automÃ¡tica con una cÃ¡mara de visiÃ³n nocturna a todo color y 9 mÃ©todos de acceso.",
    specs: [
      { value: "UWB 4.0", label: "Sensor" },
      { value: "Color", label: "Nocturna" },
      { value: "9 en 1", label: "Acceso" }
    ],
    details: {
      reconocimiento: "Facial 3D + UWB Gen4",
      camara: "VisiÃ³n Nocturna a TODO COLOR",
      pantalla: "4.7 Pulgadas HD",
      interaccion: "Mensajes de Voz + Emojis",
      seguridad: "9 MÃ©todos de Desbloqueo",
      conectividad: "App Control",
      sensor: "Radar de presencia"
    },
    performance: [
      { label: "TecnologÃ­a", value: "UWB Gen4", level: "Apertura Auto" },
      { label: "CÃ¡mara", value: "Color", level: "VisiÃ³n Nocturna" },
      { label: "Acceso", value: "9 Modos", level: "Versatilidad Total" },
      { label: "Seguridad", value: "Total", level: "Gama Alta" }
    ],
    colors: { interior: [{ name: "Negro Obsidiana", hex: "#111111" }, { name: "Cobre", hex: "#5D4037" }] }
  },
  {
    id: "s60m-smart",
    name: "S60M Smart Home",
    category: "Ecosistema Mijia",
    type: "Face ID + App Control",
    wallpaper: "/images/CERRADURA/WALLPAPER/s60wallpaper.webp",
    img: "/images/CERRADURA/s60m.webp",
    description: "La opciÃ³n definitiva para la domÃ³tica. Se integra perfectamente con el ecosistema Xiaomi (Mijia) y ofrece videoportero remoto, pantalla de 4.5 pulgadas y visiÃ³n nocturna por doble infrarrojo.",
    specs: [
      { value: "Mijia", label: "App" },
      { value: "4.5\"", label: "Pantalla" },
      { value: "Dual IR", label: "VisiÃ³n" }
    ],
    details: {
      sistema: "Compatible Xiaomi Smart Home",
      reconocimiento: "Facial 3D + Huella",
      pantalla: "4.5 Pulgadas HD",
      vision: "Doble Infrarrojo (Dual IR)",
      seguridad: "8 MÃ©todos de Desbloqueo",
      mecanismo: "AutomÃ¡tico ElectrÃ³nico",
      interaccion: "Videoportero Remoto"
    },
    performance: [
      { label: "DomÃ³tica", value: "Mijia", level: "Xiaomi Home" },
      { label: "Nocturna", value: "Dual IR", level: "Infrarrojo Doble" },
      { label: "BiometrÃ­a", value: "Facial 3D", level: "RÃ¡pido" },
      { label: "Control", value: "App", level: "Remoto" }
    ],
    colors: { interior: [{ name: "Negro Mate", hex: "#1a1a1a" }, { name: "Gris Titanio", hex: "#383838" }] }
  },
  {
    id: "s50-pro",
    name: "S50 Pro Visual",
    category: "Estrella 2025",
    type: "Face ID + Quick Handle",
    img: "/images/CERRADURA/s50-pro.webp",
    description: "El modelo proyectado como lÃ­der de ventas para 2025. Combina un videoportero avanzado con una gran manija de diseÃ±o 'Quick Open' para una salida rÃ¡pida y segura.",
    specs: [
      { value: "RÃ¡pida", label: "Manija" },
      { value: "4.5\"", label: "Pantalla" },
      { value: "Video", label: "Intercom" }
    ],
    details: {
      reconocimiento: "Facial 3D + Videoportero",
      manija: "Quick Open (Apertura RÃ¡pida)",
      pantalla: "4.5 Pulgadas HD",
      vision: "Doble Infrarrojo",
      funciones: "CÃ³digos temporales remotos",
      seguridad: "8 MÃ©todos de Desbloqueo",
      app: "GestiÃ³n App Seguridad"
    },
    performance: [
      { label: "ErgonomÃ­a", value: "Manija", level: "Quick Open" },
      { label: "ComunicaciÃ³n", value: "Video", level: "Portero Visual" },
      { label: "Invitados", value: "CÃ³digos", level: "Temporales" },
      { label: "ProtecciÃ³n", value: "Dual IR", level: "Vigilancia" }
    ],
    colors: { interior: [{ name: "Negro ClÃ¡sico", hex: "#111111" }, { name: "Gris Industrial", hex: "#2f2f2f" }] }
  },
  {
    id: "q3f-pro",
    name: "Q3F Pro Classic",
    category: "Top Ventas 500k+",
    type: "Face ID + 3.5\" Screen",
    img: "/images/CERRADURA/q3f-pro.webp",
    description: "La cerradura mÃ¡s probada del mercado con mÃ¡s de 500.000 unidades vendidas al aÃ±o. Equilibrio perfecto entre seguridad y funcionalidad con pantalla de 3.5 pulgadas.",
    specs: [
      { value: "+500k", label: "Ventas" },
      { value: "3.5\"", label: "Pantalla" },
      { value: "1MP", label: "CÃ¡mara" }
    ],
    details: {
      reconocimiento: "Facial + Huella + Tarjeta",
      camara: "1 MegapÃ­xel",
      pantalla: "3.5 Pulgadas",
      vision: "Infrarroja (IR)",
      bateria: "4-5 Meses duraciÃ³n",
      mecanismo: "Doble AcciÃ³n RÃ¡pida",
      seguridad: "Captura sospechosos"
    },
    performance: [
      { label: "Fiabilidad", value: "Top 1", level: "MÃ¡s Vendida" },
      { label: "BiometrÃ­a", value: "Facial", level: "Acceso Seguro" },
      { label: "Mecanismo", value: "Doble", level: "AcciÃ³n RÃ¡pida" },
      { label: "Pantalla", value: "3.5''", level: "Monitor" }
    ],
    colors: { interior: [{ name: "Negro Star", hex: "#111111" }, { name: "CafÃ© Profundo", hex: "#3e2723" }] }
  },
  {
    id: "s60-pro-wonly",
    name: "S60 Pro Ultra",
    category: "Gama Alta",
    type: "Palm Vein + Face ID",
    wallpaper: "/images/CERRADURA/WALLPAPER/s60wallpaper.webp",
    img: "/images/CERRADURA/s60-pro.webp",
    description: "El modelo mÃ¡s sofisticado. Incorpora desbloqueo por meridianos de la palma (Palm Vein), sensor de movimiento, gestiÃ³n por App y acabado de lujo.",
    specs: [
      { value: "Venas", label: "BiometrÃ­a" },
      { value: "Sensor", label: "Movimiento" },
      { value: "Total", label: "App" }
    ],
    details: {
      reconocimiento: "Meridiano de Palma + Facial + Huella",
      seguridad: "Grado Bancario (Palm Vein)",
      sensores: "Sensor de movimiento integrado",
      conectividad: "Control total por App + Tarjeta IC",
      mecanismo: "Totalmente AutomÃ¡tico",
      bateria: "Puerto de carga de emergencia incluido",
      extra: "Control remoto incluido"
    },
    performance: [
      { label: "BiometrÃ­a", value: "Palm Vein", level: "Grado Bancario" },
      { label: "Sensor", value: "Movimiento", level: "Auto-ActivaciÃ³n" },
      { label: "Control", value: "App Total", level: "GestiÃ³n Remota" },
      { label: "Mecanismo", value: "AutomÃ¡tico", level: "Motorizado" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "d235-facetime",
    name: "D235 Global",
    category: "Video Connect",
    type: "FaceTime + Palm Vein",
    img: "/images/CERRADURA/d235.webp",
    description: "TecnologÃ­a global con interfaz en 9 idiomas y sistema 'FaceTime' para videollamadas directas. Combina reconocimiento de venas y contraseÃ±as de un solo uso.",
    specs: [
      { value: "Video", label: "Llamada" },
      { value: "9", label: "Idiomas" },
      { value: "Venas", label: "Sensor" }
    ],
    details: {
      idiomas: "9 (EspaÃ±ol, InglÃ©s, Chino, Ruso...)",
      comunicacion: "Sistema FaceTime + CÃ¡mara",
      reconocimiento: "Meridiano de Palma + Facial",
      funciones: "ContraseÃ±a temporal (OTP)",
      pantalla: "VersiÃ³n Corta con cÃ¡mara",
      sistema: "ConfiguraciÃ³n por cÃ³digos"
    },
    performance: [
      { label: "Global", value: "9 Idiomas", level: "Internacional" },
      { label: "Video", value: "FaceTime", level: "Llamada Live" },
      { label: "Seguridad", value: "Venas", level: "BiometrÃ­a Top" },
      { label: "Invitados", value: "OTP", level: "Clave 1 Uso" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "s922-wonly",
    name: "S922 Full Auto",
    category: "Premium AutomÃ¡tica",
    type: "Face ID + Auto Lock",
    img: "/images/CERRADURA/s922.webp",
    description: "Cerradura inteligente totalmente automÃ¡tica construida en aleaciÃ³n de aluminio. Experiencia de acceso fluida 'manos libres' gracias a su motorizaciÃ³n completa.",
    specs: [
      { value: "Auto", label: "Mecanismo" },
      { value: "Face ID", label: "BiometrÃ­a" },
      { value: "Aluminio", label: "Cuerpo" }
    ],
    details: {
      sistema: "Cerradura Totalmente AutomÃ¡tica",
      material: "Cuerpo robusto de AleaciÃ³n",
      desbloqueo_bio: "Facial + Huella Digital",
      accesos_extra: "ContraseÃ±a + Tarjeta IC",
      emergencia: "Puerto de carga externo",
      seguridad: "Cierre automÃ¡tico al cerrar"
    },
    performance: [
      { label: "Confort", value: "Motorizado", level: "Full Auto" },
      { label: "Acceso", value: "Face ID", level: "3D Facial" },
      { label: "Material", value: "Aluminio", level: "Robusto" },
      { label: "Respaldo", value: "Llave/IC", level: "Emergencia" }
    ],
    colors: {
      interior: [
        { name: "Negro", hex: "#111111" },
        { name: "Gris Metal", hex: "#4a4a4a" }
      ]
    }
  },
  {
    id: "p10-pro-black",
    name: "P10",
    category: "Smart Lock",
    type: "Serie Pro",
    img: "/images/CERRADURA/p10.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/p10wallpaper.webp",
    description: "Serie 3D de alta gama con pantalla trasera de 4.5\", ojo de buey con cÃ¡mara visible y captura automÃ¡tica por intrusiÃ³n. BiometrÃ­a avanzada con acceso por WeChat/QR.",
    specs: [
      { label: "Pantalla", value: "4.5''" },
      { label: "BiometrÃ­a", value: "Facial 3D" },
      { label: "Tarjeta", value: "Cifrado M1" }
    ],
    details: {
      Tipo: "3D Alta Gama Serie Facial",
      VersiÃ³n: "Pro",
      CaracterÃ­sticas: "Facial 3D + Ojo de Buey con CÃ¡mara + Captura por IntrusiÃ³n + Pantalla 4.5\"",
      Pantalla: "4.5 Pulgadas",
      Color: "Negro",
      Cuerpo_Compatible: "MecÃ¡nica WONLY Auto Serie 1/Serie 5",
      Cilindro_Compatible: "ElectrÃ³nico Wang Li / ElÃ©ctrico 3 filas"
    },
    performance: [
      { label: "BiometrÃ­a", value: "Facial 3D", level: "Alta PrecisiÃ³n" },
      { label: "Pantalla", value: "4.5 Pulgadas", level: "Gran Formato" },
      { label: "Vigilancia", value: "Ojo de Buey", level: "Captura IntrusiÃ³n" },
      { label: "Seguridad", value: "Cifrado M1", level: "Tarjeta Encriptada" },
      { label: "Acceso", value: "Huella + Clave", level: "MultimÃ©todo" },
      { label: "Respaldo", value: "Llave / M1 / WeChat", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#0f0f0f" }] }
  },
  {
    id: "z117z-engineering",
    name: "Z117-Z",
    category: "Smart Lock",
    type: "Semi-Auto IngenierÃ­a",
    img: "/images/CERRADURA/z117-z.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/z117-zwallpaper.webp",
    description: "Cerradura inteligente semi-automÃ¡tica de la lÃ­nea de ingenierÃ­a GUXIN. DiseÃ±o robusto con manija de palanca, acceso por huella, contraseÃ±a, llave y tarjeta IC. Ideal para proyectos de obra y uso intensivo.",
    specs: [
      { label: "Mecanismo", value: "Semi-Auto" },
      { label: "Acceso", value: "Huella + IC" },
      { label: "LÃ­nea", value: "IngenierÃ­a" }
    ],
    details: {
      Tipo: "Semi-AutomÃ¡tica de IngenierÃ­a",
      VersiÃ³n: "EdiciÃ³n Obra",
      CaracterÃ­sticas: "Huella + ContraseÃ±a + Llave + Tarjeta IC",
      Color: "Negro /é¦™æ§Ÿé‡‘ (ChampÃ¡n Dorado)",
      Cuerpo_Compatible: "Doble RÃ¡pido MecÃ¡nico",
      Cilindro_Compatible: "Lunar Doble Fila Cabeza Simple / Antipalanca Triple Cabeza Simple"
    },
    performance: [
      { label: "BiometrÃ­a", value: "Huella Dactilar", level: "Acceso RÃ¡pido" },
      { label: "Mecanismo", value: "Semi-Auto", level: "Palanca ErgonÃ³mica" },
      { label: "Seguridad", value: "Tarjeta IC", level: "Cifrado EstÃ¡ndar" },
      { label: "Uso", value: "Intensivo", level: "Grado IngenierÃ­a" },
      { label: "Acceso", value: "Huella + Clave", level: "4 MÃ©todos" },
      { label: "Respaldo", value: "Llave MecÃ¡nica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#111111" }, { name: "ChampÃ¡n Dorado", hex: "#b8975a" }] }
  },
  {
    id: "xd515-v1",
    name: "XD515",
    category: "Smart Lock",
    type: "Semi-Auto IngenierÃ­a",
    img: "/images/CERRADURA/xd515.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/xd515wallpaper.webp",
    description: "Cerradura inteligente semi-automÃ¡tica de ingenierÃ­a WONLY con apertura remota y pantalla integrada. DiseÃ±o de palanca compacto con acceso por huella, contraseÃ±a, llave, tarjeta IC y WeChat/QR.",
    specs: [
      { label: "Mecanismo", value: "Semi-Auto" },
      { label: "Acceso", value: "Remoto + IC" },
      { label: "LÃ­nea", value: "IngenierÃ­a" }
    ],
    details: {
      Tipo: "Semi-AutomÃ¡tica de IngenierÃ­a",
      VersiÃ³n: "VersiÃ³n 1",
      CaracterÃ­sticas: "Apertura Remota + Pantalla Display",
      Color: "Negro",
      Cuerpo_Compatible: "Doble RÃ¡pido MecÃ¡nico",
      Cilindro_Compatible: "Lunar Doble Fila Cabeza Simple / Antipalanca Triple Cabeza Simple"
    },
    performance: [
      { label: "BiometrÃ­a", value: "Huella Dactilar", level: "Acceso RÃ¡pido" },
      { label: "Remoto", value: "App Control", level: "Apertura a Distancia" },
      { label: "Pantalla", value: "Display", level: "Indicador Visual" },
      { label: "Seguridad", value: "Tarjeta IC", level: "Cifrado EstÃ¡ndar" },
      { label: "Acceso", value: "5 MÃ©todos", level: "WeChat / QR incluido" },
      { label: "Respaldo", value: "Llave MecÃ¡nica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#111111" }] }
  },
  {
    id: "s933-standard",
    name: "S933",
    category: "Smart Lock",
    type: "IngenierÃ­a EstÃ¡ndar",
    img: "/images/CERRADURA/s933.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s933wallpaper.webp",
    description: "Cerradura inteligente de ingenierÃ­a GUXIN en versiÃ³n estÃ¡ndar. DiseÃ±o de palanca con lector de huella frontal iluminado, acceso por contraseÃ±a, tarjeta IC y llave de emergencia. SoluciÃ³n robusta para uso intensivo en obra.",
    specs: [
      { label: "Mecanismo", value: "Semi-Auto" },
      { label: "Acceso", value: "Huella + IC" },
      { label: "LÃ­nea", value: "IngenierÃ­a" }
    ],
    details: {
      Tipo: "Inteligente de IngenierÃ­a",
      VersiÃ³n: "EstÃ¡ndar",
      CaracterÃ­sticas: "Huella + ContraseÃ±a + Tarjeta IC + Llave de Emergencia",
      Color: "Negro",
      Cuerpo_Compatible: "Doble RÃ¡pido MecÃ¡nico",
      Cilindro_Compatible: "Lunar Doble Fila Cabeza Simple / Antipalanca Triple Cabeza Simple"
    },
    performance: [
      { label: "BiometrÃ­a", value: "Huella Dactilar", level: "Lector Iluminado" },
      { label: "Mecanismo", value: "Semi-Auto", level: "Palanca ErgonÃ³mica" },
      { label: "Seguridad", value: "Tarjeta IC", level: "Cifrado EstÃ¡ndar" },
      { label: "Uso", value: "Intensivo", level: "Grado IngenierÃ­a" },
      { label: "Acceso", value: "4 MÃ©todos", level: "Huella + Clave + IC" },
      { label: "Respaldo", value: "Llave Emergencia", level: "Seguridad Total" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#111111" }] }
  },
  {
    id: "s932-square-standard",
    name: "S932",
    category: "Smart Lock",
    type: "Facial â€” Cuadrado EstÃ¡ndar",
    img: "/images/CERRADURA/s932.webp",
    description: "Cerradura inteligente facial con tapa cuadrada en versiÃ³n estÃ¡ndar. Ojo de buey con captura por timbre, apertura remota y pantalla trasera. Acceso por huella, contraseÃ±a, llave y tarjeta CPU.",
    specs: [
      { label: "Tapa", value: "Cuadrada" },
      { label: "Acceso", value: "Facial + CPU" },
      { label: "Pantalla", value: "Posterior" }
    ],
    details: {
      Tipo: "Inteligente Facial",
      VersiÃ³n: "EstÃ¡ndar â€” Tapa Cuadrada",
      CaracterÃ­sticas: "Ojo de Buey (Timbre + Captura) + Apertura Remota + Pantalla Posterior",
      Color: "Gris Pizarra / Negro",
      Cuerpo_Compatible: "MecÃ¡nica WONLY Auto/RÃ¡pido Serie 1/2Ã—5",
      Cilindro_Compatible: "ElectrÃ³nico Wang Li / ElÃ©ctrico 3 filas"
    },
    performance: [
      { label: "BiometrÃ­a", value: "Facial + Huella", level: "Doble BiometrÃ­a" },
      { label: "Vigilancia", value: "Ojo de Buey", level: "Captura al Timbre" },
      { label: "Remoto", value: "App Control", level: "Apertura a Distancia" },
      { label: "Seguridad", value: "Tarjeta CPU", level: "Anti-copia Avanzado" },
      { label: "Acceso", value: "Huella + Clave", level: "5 MÃ©todos + WeChat" },
      { label: "Respaldo", value: "Llave MecÃ¡nica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Gris Pizarra", hex: "#4a4a4a" }, { name: "Negro", hex: "#111111" }] }
  },
  {
    id: "s932-square-pro",
    name: "S932 Pro",
    category: "Smart Lock",
    type: "Facial â€” Cuadrado Pro",
    img: "/images/CERRADURA/s932.webp",
    description: "VersiÃ³n Pro de la S932 con tapa cuadrada. AÃ±ade reconocimiento facial 3D completo al ojo de buey, captura por timbre mejorada y pantalla trasera HD.",
    specs: [
      { label: "Tapa", value: "Cuadrada" },
      { label: "BiometrÃ­a", value: "Facial 3D" },
      { label: "Pantalla", value: "Posterior HD" }
    ],
    details: {
      Tipo: "Inteligente Facial",
      VersiÃ³n: "Pro â€” Tapa Cuadrada",
      CaracterÃ­sticas: "Facial 3D + Ojo de Buey (Timbre + Captura) + Apertura Remota + Pantalla HD",
      Color: "Gris Pizarra / Negro",
      Cuerpo_Compatible: "MecÃ¡nica WONLY Auto/RÃ¡pido Serie 1/2Ã—5",
      Cilindro_Compatible: "ElectrÃ³nico Wang Li / ElÃ©ctrico 3 filas"
    },
    performance: [
      { label: "BiometrÃ­a", value: "Facial 3D", level: "Alta PrecisiÃ³n" },
      { label: "Vigilancia", value: "Ojo de Buey", level: "Captura al Timbre" },
      { label: "Remoto", value: "App Control", level: "Apertura a Distancia" },
      { label: "Seguridad", value: "Tarjeta CPU", level: "Anti-copia Avanzado" },
      { label: "Pantalla", value: "Posterior HD", level: "Monitor Trasero" },
      { label: "Respaldo", value: "Llave MecÃ¡nica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Gris Pizarra", hex: "#4a4a4a" }, { name: "Negro", hex: "#111111" }] }
  },
  {
    id: "s80-standard",
    name: "S80",
    category: "Smart Lock",
    type: "Telesensado EstÃ¡ndar",
    img: "/images/CERRADURA/s80-lock.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s80wallpaper.webp",
    description: "Cerradura de telesensado con reconocimiento facial 3D, apertura y visiÃ³n remota, ojo de buey con captura por intrusiÃ³n y pantalla trasera de 5 pulgadas. Acabado en Negro Xuanwu (çŽ„æ­¦é‡‘).",
    specs: [
      { label: "Sensor", value: "Telesensado" },
      { label: "BiometrÃ­a", value: "Facial 3D" },
      { label: "Pantalla", value: "5.0''" }
    ],
    details: {
      Tipo: "Inteligente con Sensor Remoto",
      VersiÃ³n: "EstÃ¡ndar",
      CaracterÃ­sticas: "Telesensado + Facial 3D + Apertura Remota + VisiÃ³n Remota + Ojo de Buey + Captura IntrusiÃ³n + Pantalla 5\"",
      Pantalla: "5 Pulgadas",
      Color: "Negro Xuanwu (çŽ„æ­¦é‡‘)",
      Cuerpo_Compatible: "MecÃ¡nica WONLY Auto/RÃ¡pido Serie 1/2Ã—5",
      Cilindro_Compatible: "ElectrÃ³nico Wang Li / ElÃ©ctrico 3 filas"
    },
    performance: [
      { label: "DetecciÃ³n", value: "Telesensado", level: "Apertura AutomÃ¡tica" },
      { label: "BiometrÃ­a", value: "Facial 3D", level: "Anti-falsificaciÃ³n" },
      { label: "Remote", value: "Apertura + Vista", level: "Control Total" },
      { label: "Vigilancia", value: "Ojo de Buey", level: "Captura IntrusiÃ³n" },
      { label: "Pantalla", value: "5 Pulgadas", level: "Gran Formato" },
      { label: "Respaldo", value: "Llave / M1 / APP", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro Xuanwu", hex: "#2b2520" }] }
  },
];

// --- 2. HARDWARE Y ACCESORIOS ---
const HARDWARE_RAW = [
  {
    category: "Cuerpos de Cerradura",
    description: "Mecanismos internos de alta resistencia",
    items: [
      { name: "Cerradura de 5 pernos", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-5pernos.webp" },
      { name: "Cerradura Empotrada", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-empotrada.webp" },
      { name: "Cerradura Autocontrol", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-auto.webp" },
      { name: "Anti-explosiÃ³n A7-3", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-a73.webp" }
    ]
  },
  {
    category: "Cilindros de Seguridad",
    description: "NÃºcleos blindados anti-ganzÃºa",
    items: [
      { name: "Plegable Doble Fila", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-plegable.webp" },
      { name: "Doble Fila Negra", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-negro.webp" },
      { name: "Ultra Seguro 5.0", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-50.webp" },
      { name: "Ultra Seguro 6.0", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-60.webp" }
    ]
  },
  {
    category: "Bisagras",
    description: "Soporte de carga y movimiento fluido",
    items: [
      { name: "Modelo H-001", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h001.webp" },
      { name: "Modelo H-005", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h005.webp" },
      { name: "Modelo H-006", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h006.webp" },
      { name: "Modelo H-008", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h008.webp" },
      { name: "Modelo H-009", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h009.webp" },
      { name: "Modelo H-010", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h010.webp" }
    ]
  },
  {
    category: "Manijas",
    description: "ErgonomÃ­a y diseÃ±o premium",
    items: [
      { name: "PF6851", img: "/images/CERRADURA/ACCESORIO/hard-manija-pf6851.webp" },
      { name: "PG6818", img: "/images/CERRADURA/ACCESORIO/hard-manija-pg6818.webp" },
      { name: "PZ6850", img: "/images/CERRADURA/ACCESORIO/hard-manija-pz6850.webp" },
      { name: "PF6853", img: "/images/CERRADURA/ACCESORIO/hard-manija-pf6853.webp" },
      { name: "PZ6820", img: "/images/CERRADURA/ACCESORIO/hard-manija-pz6820.webp" }
    ]
  },
  {
    category: "Mirillas",
    description: "VisiÃ³n clara y protecciÃ³n fÃ­sica",
    items: [
      { name: "Antirrobo IgnÃ­fuga", img: "/images/CERRADURA/ACCESORIO/hard-mirilla-fuego.webp" },
      { name: "AleaciÃ³n de Zinc", img: "/images/CERRADURA/ACCESORIO/hard-mirilla-zinc.webp" },
      { name: "Antirrobo Cobre", img: "/images/CERRADURA/ACCESORIO/hard-mirilla-cobre.webp" }
    ]
  }
];

const HARDWARE_FLAT = [];
HARDWARE_RAW.forEach(cat => {
  cat.items.forEach(item => {
    HARDWARE_FLAT.push({
      name: item.name,
      img: item.img,
      category: cat.category,
      description: cat.description // Guardamos la descripciÃ³n de la categorÃ­a
    });
  });
});

async function uploadData() {
  console.log(`ðŸ“¡ Conectando a Supabase...`);

  // 1. SUBIR MODELOS (borrar todo primero para eliminar registros huÃ©rfanos)
  console.log(`Subiendo ${MODELOS.length} Cerraduras...`);
  const { error: errDeleteLocks } = await supabase.from('locks').delete().neq('id', '');
  if (errDeleteLocks) {
    console.error('âŒ Error al limpiar locks:', errDeleteLocks.message);
    return;
  }
  const { error: err1 } = await supabase.from('locks').insert(MODELOS);

  if (err1) {
    console.error('âŒ Error locks:', err1.message);
  } else {
    console.log('âœ… Cerraduras subidas.');
  }

  // 2. SUBIR HARDWARE
  console.log(`Subiendo ${HARDWARE_FLAT.length} piezas de Hardware...`);
  // Limpiamos tabla hardware para evitar duplicados al correr el script varias veces
  // (Ojo: esto borra todo en lock_hardware antes de insertar lo nuevo)
  const { error: errDelete } = await supabase.from('lock_hardware').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  if (!errDelete) {
    const { error: err2 } = await supabase.from('lock_hardware').insert(HARDWARE_FLAT);
    if (err2) console.error('âŒ Error hardware:', err2.message);
    else console.log('âœ… Hardware subido.');
  } else {
    console.error('Error al limpiar tabla hardware:', errDelete);
  }
}

uploadData();
