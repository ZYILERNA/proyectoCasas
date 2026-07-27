// subir-cerraduras.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Usamos preferiblemente la SERVICE_ROLE para permisos de escritura
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Faltan las variables de entorno en .env.local");
  console.error("Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- 1. MODELOS (Cerraduras Principales) ---
// NOTA: Se han eliminado los iconos JSX. El frontend los reasignará según el 'label'.
const MODELOS = [
  {
    id: "s60max",
    name: "S60 Max",
    category: "Smart Lock",
    type: "Serie Max",
    img: "/images/CERRADURA/lock-s60-max.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s60wallpaper.webp",
    description: "La cerradura inteligente con detección remota real. Se abre automáticamente al acercarte a 2-4 metros. Incorpora reconocimiento facial 3D, mirilla digital con captura de instantáneas y una pantalla trasera de 4,5 pulgadas para máxima seguridad y comodidad.",
    specs: [
      { label: "Pantalla", value: "4.5''" },
      { label: "Acceso", value: "6 Métodos" },
      { label: "Sensor", value: "2-4 Metros" }
    ],
    details: {
      Tipo: "Inteligente con sensor remoto",
      Versión: "Max",
      Pantalla: "4,5 Pulgadas",
      Color: "Negro Espacial",
      Cuerpo_Compatible: "Mecánica Automática WONLY",
      Cilindro_Compatible: "Electrónico / Eléctrico 3 filas"
    },
    performance: [
      { label: "Detección", value: "2-4 Metros", level: "Apertura Automática" },
      { label: "Biometría", value: "Facial 3D", level: "Anti-falsificación" },
      { label: "Seguridad", value: "Cifrado M1", level: "Nivel Financiero" },
      { label: "Control", value: "App + Mirilla", level: "Visualización Remota" },
      { label: "Sistemas", value: "3 Aislados", level: "Gestión Independiente" },
      { label: "Respaldo", value: "Llave Mecánica", level: "Clase C Superior" }
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
      { label: "Acceso", value: "5 Métodos" },
      { label: "Biometría", value: "Facial 3D" }
    ],
    details: {
      Tipo: "Inteligente Reconocimiento Facial",
      Versión: "Max",
      Características: "Facial 3D + Mirilla + Captura",
      Pantalla: "4 Pulgadas",
      Color: "Negro",
      Cuerpo_Compatible: "Mecánica WONLY Auto",
      Cilindro_Compatible: "Electrónico / Eléctrico 3 filas"
    },
    performance: [
      { label: "Biometría", value: "Facial 3D", level: "Reconocimiento Profundo" },
      { label: "Acceso", value: "Huella + Clave", level: "Multifuncional" },
      { label: "Vigilancia", value: "Mirilla Visual", level: "Captura de Estancia" },
      { label: "Seguridad", value: "Cifrado M1", level: "Tarjeta Encriptada" },
      { label: "Pantalla", value: "4 Pulgadas", level: "Panel Trasero HD" },
      { label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
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
    description: "Sistema de seguridad integral con Video Portero y Desbloqueo Remoto. Combina reconocimiento facial 3D, tarjeta CPU de alta seguridad y una pantalla de 4 pulgadas para una gestión de acceso total.",
    specs: [
      { label: "Pantalla", value: "4.0''" },
      { label: "Comunicación", value: "Video Portero" },
      { label: "Acceso", value: "Huella + Facial" }
    ],
    details: {
      Tipo: "Inteligente Facial + Video",
      Versión: "Pro",
      Funciones: "Video Portero + Desbloqueo Remoto",
      Pantalla: "4 Pulgadas",
      Color: "Negro",
      Cuerpo_Compatible: "Mecánica WONLY Auto/Rápido",
      Cilindro_Compatible: "Electrónico / Antirrobo 3 filas"
    },
    performance: [
      { label: "Comunicación", value: "Video Portero", level: "Intercomunicador Visual" },
      { label: "Biometría", value: "Facial 3D", level: "Alta Precisión" },
      { label: "Remoto", value: "App Control", level: "Desbloqueo a Distancia" },
      { label: "Seguridad", value: "Tarjeta CPU", level: "Anti-copia Avanzado" },
      { label: "Acceso", value: "Huella + Clave", level: "Respuesta Rápida" },
      { label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "s958pro",
    name: "S958 Pro",
    category: "Smart Lock",
    type: "Serie Pro",
    img: "/images/CERRADURA/lock-s958-pro.webp",
    description: "Cerradura inteligente de diseño exclusivo en Negro Obsidiana. Integra reconocimiento facial 3D, video portero, mirilla digital y captura de estancia, ofreciendo la máxima protección y conectividad.",
    specs: [
      { label: "Pantalla", value: "4.0''" },
      { label: "Seguridad", value: "Tarjeta CPU" },
      { label: "Biometría", value: "Facial 3D" }
    ],
    details: {
      Tipo: "Inteligente Facial + Video",
      Versión: "Pro",
      Funciones: "Video Portero + Mirilla + Captura",
      Pantalla: "4 Pulgadas",
      Color: "Negro Obsidiana",
      Cuerpo_Compatible: "Mecánica WONLY Auto/Rápido",
      Cilindro_Compatible: "Electrónico / Antirrobo 3 filas"
    },
    performance: [
      { label: "Video", value: "Video Portero", level: "Comunicación Bidireccional" },
      { label: "Biometría", value: "Facial 3D", level: "Reconocimiento Profundo" },
      { label: "Conectividad", value: "App Remota", level: "Control Total" },
      { label: "Protección", value: "Tarjeta CPU", level: "Cifrado Bancario" },
      { label: "Vigilancia", value: "Captura Estancia", level: "Monitoreo Activo" },
      { label: "Respaldo", value: "Llave Mecánica", level: "Clase C" }
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
    description: "Tecnología de vanguardia con Reconocimiento de Venas Dactilares para una seguridad infalible. Combina lo mejor de la biometría (facial y venas) con mirilla visual y pantalla de 4 pulgadas.",
    specs: [
      { label: "Biometría", value: "Venas + Facial" },
      { label: "Pantalla", value: "4.0''" },
      { label: "Seguridad", value: "Tarjeta CPU" }
    ],
    details: {
      Tipo: "Inteligente Venas Dactilares",
      Versión: "Max",
      Características: "Facial + Venas + Mirilla + Captura",
      Pantalla: "4 Pulgadas",
      Color: "Negro Obsidiana",
      Cuerpo_Compatible: "Mecánica WONLY Auto/Rápido",
      Cilindro_Compatible: "Electrónico / Antirrobo 3 filas"
    },
    performance: [
      { label: "Biometría", value: "Venas Dactilares", level: "Máxima Seguridad" },
      { label: "Biometría 2", value: "Facial + Huella", level: "Multifuncional" },
      { label: "Vigilancia", value: "Captura Estancia", level: "Monitor Trasero" },
      { label: "Protección", value: "Tarjeta CPU", level: "Anti-Clonación" },
      { label: "Pantalla", value: "4 Pulgadas", level: "Panel HD" },
      { label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
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
    description: "Diseño elegante con una gran pantalla trasera de 4.5 pulgadas para una visibilidad superior. Integra reconocimiento facial 3D y mirilla digital con captura de estancia, ideal para quienes buscan tecnología visual avanzada.",
    specs: [
      { label: "Pantalla", value: "4.5''" },
      { label: "Biometría", value: "Facial 3D" },
      { label: "Tarjeta", value: "Cifrado M1" }
    ],
    details: {
      Tipo: "Inteligente Facial",
      Versión: "Pro",
      Características: "Facial 3D + Mirilla + Captura",
      Pantalla: "4.5 Pulgadas",
      Color: "Negro",
      Cuerpo_Compatible: "Mecánica WONLY Auto/Rápido",
      Cilindro_Compatible: "Electrónico / Antirrobo 3 filas"
    },
    performance: [
      { label: "Biometría", value: "Facial 3D", level: "Alta Precisión" },
      { label: "Pantalla", value: "4.5 Pulgadas", level: "Gran Formato" },
      { label: "Vigilancia", value: "Mirilla + Captura", level: "Monitor Activo" },
      { label: "Seguridad", value: "Cifrado M1", level: "Tarjeta Encriptada" },
      { label: "Acceso", value: "Huella + Clave", level: "Respuesta Rápida" },
      { label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
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
    description: "Cerradura inteligente semi-automática con diseño ergonómico de 'un solo agarre'. Ideal para acceso rápido mediante huella dactilar, combinando simplicidad de uso y seguridad con tarjeta cifrada M1.",
    specs: [
      { label: "Apertura", value: "Un Agarre" },
      { label: "Acceso", value: "Huella + M1" },
      { label: "Mecanismo", value: "Semi-Auto" }
    ],
    details: {
      Tipo: "Inteligente Huella Dactilar",
      Versión: "Semi-Automática / Un Agarre",
      Funciones: "Huella + Clave + Tarjeta M1 + Llave",
      Color: "Negro",
      Cuerpo_Compatible: "Desbloqueo rápido WONLY",
      Cilindro_Compatible: "WONLY Media Luna (Doble Fila)"
    },
    performance: [
      { label: "Biometría", value: "Huella Dactilar", level: "Acceso Rápido" },
      { label: "Mecanismo", value: "Un Agarre", level: "Ergonomía Directa" },
      { label: "Seguridad", value: "Cifrado M1", level: "Tarjeta Encriptada" },
      { label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
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
    description: "La cerradura más avanzada con tecnología UWB de 4ª generación. Detecta tu presencia y abre automáticamente. Cuenta con pantalla interactiva que reacciona con 50 expresiones y monitoreo activo.",
    specs: [
      { value: "UWB 4.0", label: "Tecnología" },
      { value: "4.7\" HD", label: "Pantalla" },
      { value: "CNC", label: "Cuerpo" }
    ],
    details: {
      reconocimiento: "Facial 3D + Venas + UWB",
      camara: "2MP Gran Angular + Visión Nocturna",
      pantalla: "4.7 Pulgadas IPS Alta Definición",
      interaccion: "Pantalla externa con 50 Emojis",
      material: "Aluminio Aeronáutico (Tallado CNC)",
      seguridad: "Alerta de merodeo + Captura automática",
      bateria: "Bajo consumo (220uA) - 6 meses+"
    },
    performance: [
      { label: "Sensor", value: "UWB 4.0", level: "Detección Remota" },
      { label: "Biometría", value: "Facial 3D", level: "Sin Contacto" },
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
    description: "El estándar más alto en seguridad inteligente. Combina detección UWB de 4ª generación para apertura automática con una cámara de visión nocturna a todo color y 9 métodos de acceso.",
    specs: [
      { value: "UWB 4.0", label: "Sensor" },
      { value: "Color", label: "Nocturna" },
      { value: "9 en 1", label: "Acceso" }
    ],
    details: {
      reconocimiento: "Facial 3D + UWB Gen4",
      camara: "Visión Nocturna a TODO COLOR",
      pantalla: "4.7 Pulgadas HD",
      interaccion: "Mensajes de Voz + Emojis",
      seguridad: "9 Métodos de Desbloqueo",
      conectividad: "App Control",
      sensor: "Radar de presencia"
    },
    performance: [
      { label: "Tecnología", value: "UWB Gen4", level: "Apertura Auto" },
      { label: "Cámara", value: "Color", level: "Visión Nocturna" },
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
    description: "La opción definitiva para la domótica. Se integra perfectamente con el ecosistema Xiaomi (Mijia) y ofrece videoportero remoto, pantalla de 4.5 pulgadas y visión nocturna por doble infrarrojo.",
    specs: [
      { value: "Mijia", label: "App" },
      { value: "4.5\"", label: "Pantalla" },
      { value: "Dual IR", label: "Visión" }
    ],
    details: {
      sistema: "Compatible Xiaomi Smart Home",
      reconocimiento: "Facial 3D + Huella",
      pantalla: "4.5 Pulgadas HD",
      vision: "Doble Infrarrojo (Dual IR)",
      seguridad: "8 Métodos de Desbloqueo",
      mecanismo: "Automático Electrónico",
      interaccion: "Videoportero Remoto"
    },
    performance: [
      { label: "Domótica", value: "Mijia", level: "Xiaomi Home" },
      { label: "Nocturna", value: "Dual IR", level: "Infrarrojo Doble" },
      { label: "Biometría", value: "Facial 3D", level: "Rápido" },
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
    description: "El modelo proyectado como líder de ventas para 2025. Combina un videoportero avanzado con una gran manija de diseño 'Quick Open' para una salida rápida y segura.",
    specs: [
      { value: "Rápida", label: "Manija" },
      { value: "4.5\"", label: "Pantalla" },
      { value: "Video", label: "Intercom" }
    ],
    details: {
      reconocimiento: "Facial 3D + Videoportero",
      manija: "Quick Open (Apertura Rápida)",
      pantalla: "4.5 Pulgadas HD",
      vision: "Doble Infrarrojo",
      funciones: "Códigos temporales remotos",
      seguridad: "8 Métodos de Desbloqueo",
      app: "Gestión App Seguridad"
    },
    performance: [
      { label: "Ergonomía", value: "Manija", level: "Quick Open" },
      { label: "Comunicación", value: "Video", level: "Portero Visual" },
      { label: "Invitados", value: "Códigos", level: "Temporales" },
      { label: "Protección", value: "Dual IR", level: "Vigilancia" }
    ],
    colors: { interior: [{ name: "Negro Clásico", hex: "#111111" }, { name: "Gris Industrial", hex: "#2f2f2f" }] }
  },
  {
    id: "q3f-pro",
    name: "Q3F Pro Classic",
    category: "Top Ventas 500k+",
    type: "Face ID + 3.5\" Screen",
    img: "/images/CERRADURA/q3f-pro.webp",
    description: "La cerradura más probada del mercado con más de 500.000 unidades vendidas al año. Equilibrio perfecto entre seguridad y funcionalidad con pantalla de 3.5 pulgadas.",
    specs: [
      { value: "+500k", label: "Ventas" },
      { value: "3.5\"", label: "Pantalla" },
      { value: "1MP", label: "Cámara" }
    ],
    details: {
      reconocimiento: "Facial + Huella + Tarjeta",
      camara: "1 Megapíxel",
      pantalla: "3.5 Pulgadas",
      vision: "Infrarroja (IR)",
      bateria: "4-5 Meses duración",
      mecanismo: "Doble Acción Rápida",
      seguridad: "Captura sospechosos"
    },
    performance: [
      { label: "Fiabilidad", value: "Top 1", level: "Más Vendida" },
      { label: "Biometría", value: "Facial", level: "Acceso Seguro" },
      { label: "Mecanismo", value: "Doble", level: "Acción Rápida" },
      { label: "Pantalla", value: "3.5''", level: "Monitor" }
    ],
    colors: { interior: [{ name: "Negro Star", hex: "#111111" }, { name: "Café Profundo", hex: "#3e2723" }] }
  },
  {
    id: "s60-pro-wonly",
    name: "S60 Pro Ultra",
    category: "Gama Alta",
    type: "Palm Vein + Face ID",
    wallpaper: "/images/CERRADURA/WALLPAPER/s60wallpaper.webp",
    img: "/images/CERRADURA/s60-pro.webp",
    description: "El modelo más sofisticado. Incorpora desbloqueo por meridianos de la palma (Palm Vein), sensor de movimiento, gestión por App y acabado de lujo.",
    specs: [
      { value: "Venas", label: "Biometría" },
      { value: "Sensor", label: "Movimiento" },
      { value: "Total", label: "App" }
    ],
    details: {
      reconocimiento: "Meridiano de Palma + Facial + Huella",
      seguridad: "Grado Bancario (Palm Vein)",
      sensores: "Sensor de movimiento integrado",
      conectividad: "Control total por App + Tarjeta IC",
      mecanismo: "Totalmente Automático",
      bateria: "Puerto de carga de emergencia incluido",
      extra: "Control remoto incluido"
    },
    performance: [
      { label: "Biometría", value: "Palm Vein", level: "Grado Bancario" },
      { label: "Sensor", value: "Movimiento", level: "Auto-Activación" },
      { label: "Control", value: "App Total", level: "Gestión Remota" },
      { label: "Mecanismo", value: "Automático", level: "Motorizado" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "d235-facetime",
    name: "D235 Global",
    category: "Video Connect",
    type: "FaceTime + Palm Vein",
    img: "/images/CERRADURA/d235.webp",
    description: "Tecnología global con interfaz en 9 idiomas y sistema 'FaceTime' para videollamadas directas. Combina reconocimiento de venas y contraseñas de un solo uso.",
    specs: [
      { value: "Video", label: "Llamada" },
      { value: "9", label: "Idiomas" },
      { value: "Venas", label: "Sensor" }
    ],
    details: {
      idiomas: "9 (Español, Inglés, Chino, Ruso...)",
      comunicacion: "Sistema FaceTime + Cámara",
      reconocimiento: "Meridiano de Palma + Facial",
      funciones: "Contraseña temporal (OTP)",
      pantalla: "Versión Corta con cámara",
      sistema: "Configuración por códigos"
    },
    performance: [
      { label: "Global", value: "9 Idiomas", level: "Internacional" },
      { label: "Video", value: "FaceTime", level: "Llamada Live" },
      { label: "Seguridad", value: "Venas", level: "Biometría Top" },
      { label: "Invitados", value: "OTP", level: "Clave 1 Uso" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "s922-wonly",
    name: "S922 Full Auto",
    category: "Premium Automática",
    type: "Face ID + Auto Lock",
    img: "/images/CERRADURA/s922.webp",
    description: "Cerradura inteligente totalmente automática construida en aleación de aluminio. Experiencia de acceso fluida 'manos libres' gracias a su motorización completa.",
    specs: [
      { value: "Auto", label: "Mecanismo" },
      { value: "Face ID", label: "Biometría" },
      { value: "Aluminio", label: "Cuerpo" }
    ],
    details: {
      sistema: "Cerradura Totalmente Automática",
      material: "Cuerpo robusto de Aleación",
      desbloqueo_bio: "Facial + Huella Digital",
      accesos_extra: "Contraseña + Tarjeta IC",
      emergencia: "Puerto de carga externo",
      seguridad: "Cierre automático al cerrar"
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
    description: "Serie 3D de alta gama con pantalla trasera de 4.5\", ojo de buey con cámara visible y captura automática por intrusión. Biometría avanzada con acceso por WeChat/QR.",
    specs: [
      { label: "Pantalla", value: "4.5''" },
      { label: "Biometría", value: "Facial 3D" },
      { label: "Tarjeta", value: "Cifrado M1" }
    ],
    details: {
      Tipo: "3D Alta Gama Serie Facial",
      Versión: "Pro",
      Características: "Facial 3D + Ojo de Buey con Cámara + Captura por Intrusión + Pantalla 4.5\"",
      Pantalla: "4.5 Pulgadas",
      Color: "Negro",
      Cuerpo_Compatible: "Mecánica WONLY Auto Serie 1/Serie 5",
      Cilindro_Compatible: "Electrónico Wang Li / Eléctrico 3 filas"
    },
    performance: [
      { label: "Biometría", value: "Facial 3D", level: "Alta Precisión" },
      { label: "Pantalla", value: "4.5 Pulgadas", level: "Gran Formato" },
      { label: "Vigilancia", value: "Ojo de Buey", level: "Captura Intrusión" },
      { label: "Seguridad", value: "Cifrado M1", level: "Tarjeta Encriptada" },
      { label: "Acceso", value: "Huella + Clave", level: "Multimétodo" },
      { label: "Respaldo", value: "Llave / M1 / WeChat", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#0f0f0f" }] }
  },
  {
    id: "z117z-engineering",
    name: "Z117-Z",
    category: "Smart Lock",
    type: "Semi-Auto Ingeniería",
    img: "/images/CERRADURA/z117-z.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/z117-zwallpaper.webp",
    description: "Cerradura inteligente semi-automática de la línea de ingeniería GUXIN. Diseño robusto con manija de palanca, acceso por huella, contraseña, llave y tarjeta IC. Ideal para proyectos de obra y uso intensivo.",
    specs: [
      { label: "Mecanismo", value: "Semi-Auto" },
      { label: "Acceso", value: "Huella + IC" },
      { label: "Línea", value: "Ingeniería" }
    ],
    details: {
      Tipo: "Semi-Automática de Ingeniería",
      Versión: "Edición Obra",
      Características: "Huella + Contraseña + Llave + Tarjeta IC",
      Color: "Negro /é¦™æ§Ÿé‡‘ (Champán Dorado)",
      Cuerpo_Compatible: "Doble Rápido Mecánico",
      Cilindro_Compatible: "Lunar Doble Fila Cabeza Simple / Antipalanca Triple Cabeza Simple"
    },
    performance: [
      { label: "Biometría", value: "Huella Dactilar", level: "Acceso Rápido" },
      { label: "Mecanismo", value: "Semi-Auto", level: "Palanca Ergonómica" },
      { label: "Seguridad", value: "Tarjeta IC", level: "Cifrado Estándar" },
      { label: "Uso", value: "Intensivo", level: "Grado Ingeniería" },
      { label: "Acceso", value: "Huella + Clave", level: "4 Métodos" },
      { label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#111111" }, { name: "Champán Dorado", hex: "#b8975a" }] }
  },
  {
    id: "xd515-v1",
    name: "XD515",
    category: "Smart Lock",
    type: "Semi-Auto Ingeniería",
    img: "/images/CERRADURA/xd515.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/xd515wallpaper.webp",
    description: "Cerradura inteligente semi-automática de ingeniería WONLY con apertura remota y pantalla integrada. Diseño de palanca compacto con acceso por huella, contraseña, llave, tarjeta IC y WeChat/QR.",
    specs: [
      { label: "Mecanismo", value: "Semi-Auto" },
      { label: "Acceso", value: "Remoto + IC" },
      { label: "Línea", value: "Ingeniería" }
    ],
    details: {
      Tipo: "Semi-Automática de Ingeniería",
      Versión: "Versión 1",
      Características: "Apertura Remota + Pantalla Display",
      Color: "Negro",
      Cuerpo_Compatible: "Doble Rápido Mecánico",
      Cilindro_Compatible: "Lunar Doble Fila Cabeza Simple / Antipalanca Triple Cabeza Simple"
    },
    performance: [
      { label: "Biometría", value: "Huella Dactilar", level: "Acceso Rápido" },
      { label: "Remoto", value: "App Control", level: "Apertura a Distancia" },
      { label: "Pantalla", value: "Display", level: "Indicador Visual" },
      { label: "Seguridad", value: "Tarjeta IC", level: "Cifrado Estándar" },
      { label: "Acceso", value: "5 Métodos", level: "WeChat / QR incluido" },
      { label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#111111" }] }
  },
  {
    id: "s933-standard",
    name: "S933",
    category: "Smart Lock",
    type: "Ingeniería Estándar",
    img: "/images/CERRADURA/s933.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s933wallpaper.webp",
    description: "Cerradura inteligente de ingeniería GUXIN en versión estándar. Diseño de palanca con lector de huella frontal iluminado, acceso por contraseña, tarjeta IC y llave de emergencia. Solución robusta para uso intensivo en obra.",
    specs: [
      { label: "Mecanismo", value: "Semi-Auto" },
      { label: "Acceso", value: "Huella + IC" },
      { label: "Línea", value: "Ingeniería" }
    ],
    details: {
      Tipo: "Inteligente de Ingeniería",
      Versión: "Estándar",
      Características: "Huella + Contraseña + Tarjeta IC + Llave de Emergencia",
      Color: "Negro",
      Cuerpo_Compatible: "Doble Rápido Mecánico",
      Cilindro_Compatible: "Lunar Doble Fila Cabeza Simple / Antipalanca Triple Cabeza Simple"
    },
    performance: [
      { label: "Biometría", value: "Huella Dactilar", level: "Lector Iluminado" },
      { label: "Mecanismo", value: "Semi-Auto", level: "Palanca Ergonómica" },
      { label: "Seguridad", value: "Tarjeta IC", level: "Cifrado Estándar" },
      { label: "Uso", value: "Intensivo", level: "Grado Ingeniería" },
      { label: "Acceso", value: "4 Métodos", level: "Huella + Clave + IC" },
      { label: "Respaldo", value: "Llave Emergencia", level: "Seguridad Total" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#111111" }] }
  },
  {
    id: "s932-square-standard",
    name: "S932",
    category: "Smart Lock",
    type: "Facial — Cuadrado Estándar",
    img: "/images/CERRADURA/s932.webp",
    description: "Cerradura inteligente facial con tapa cuadrada en versión estándar. Ojo de buey con captura por timbre, apertura remota y pantalla trasera. Acceso por huella, contraseña, llave y tarjeta CPU.",
    specs: [
      { label: "Tapa", value: "Cuadrada" },
      { label: "Acceso", value: "Facial + CPU" },
      { label: "Pantalla", value: "Posterior" }
    ],
    details: {
      Tipo: "Inteligente Facial",
      Versión: "Estándar — Tapa Cuadrada",
      Características: "Ojo de Buey (Timbre + Captura) + Apertura Remota + Pantalla Posterior",
      Color: "Gris Pizarra / Negro",
      Cuerpo_Compatible: "Mecánica WONLY Auto/Rápido Serie 1/2×5",
      Cilindro_Compatible: "Electrónico Wang Li / Eléctrico 3 filas"
    },
    performance: [
      { label: "Biometría", value: "Facial + Huella", level: "Doble Biometría" },
      { label: "Vigilancia", value: "Ojo de Buey", level: "Captura al Timbre" },
      { label: "Remoto", value: "App Control", level: "Apertura a Distancia" },
      { label: "Seguridad", value: "Tarjeta CPU", level: "Anti-copia Avanzado" },
      { label: "Acceso", value: "Huella + Clave", level: "5 Métodos + WeChat" },
      { label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Gris Pizarra", hex: "#4a4a4a" }, { name: "Negro", hex: "#111111" }] }
  },
  {
    id: "s932-square-pro",
    name: "S932 Pro",
    category: "Smart Lock",
    type: "Facial — Cuadrado Pro",
    img: "/images/CERRADURA/s932.webp",
    description: "Versión Pro de la S932 con tapa cuadrada. Añade reconocimiento facial 3D completo al ojo de buey, captura por timbre mejorada y pantalla trasera HD.",
    specs: [
      { label: "Tapa", value: "Cuadrada" },
      { label: "Biometría", value: "Facial 3D" },
      { label: "Pantalla", value: "Posterior HD" }
    ],
    details: {
      Tipo: "Inteligente Facial",
      Versión: "Pro — Tapa Cuadrada",
      Características: "Facial 3D + Ojo de Buey (Timbre + Captura) + Apertura Remota + Pantalla HD",
      Color: "Gris Pizarra / Negro",
      Cuerpo_Compatible: "Mecánica WONLY Auto/Rápido Serie 1/2×5",
      Cilindro_Compatible: "Electrónico Wang Li / Eléctrico 3 filas"
    },
    performance: [
      { label: "Biometría", value: "Facial 3D", level: "Alta Precisión" },
      { label: "Vigilancia", value: "Ojo de Buey", level: "Captura al Timbre" },
      { label: "Remoto", value: "App Control", level: "Apertura a Distancia" },
      { label: "Seguridad", value: "Tarjeta CPU", level: "Anti-copia Avanzado" },
      { label: "Pantalla", value: "Posterior HD", level: "Monitor Trasero" },
      { label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Gris Pizarra", hex: "#4a4a4a" }, { name: "Negro", hex: "#111111" }] }
  },
  {
    id: "s80-standard",
    name: "S80",
    category: "Smart Lock",
    type: "Telesensado Estándar",
    img: "/images/CERRADURA/s80-lock.webp",
    wallpaper: "/images/CERRADURA/WALLPAPER/s80wallpaper.webp",
    description: "Cerradura de telesensado con reconocimiento facial 3D, apertura y visión remota, ojo de buey con captura por intrusión y pantalla trasera de 5 pulgadas. Acabado en Negro Xuanwu (çŽ„æ­¦é‡‘).",
    specs: [
      { label: "Sensor", value: "Telesensado" },
      { label: "Biometría", value: "Facial 3D" },
      { label: "Pantalla", value: "5.0''" }
    ],
    details: {
      Tipo: "Inteligente con Sensor Remoto",
      Versión: "Estándar",
      Características: "Telesensado + Facial 3D + Apertura Remota + Visión Remota + Ojo de Buey + Captura Intrusión + Pantalla 5\"",
      Pantalla: "5 Pulgadas",
      Color: "Negro Xuanwu (çŽ„æ­¦é‡‘)",
      Cuerpo_Compatible: "Mecánica WONLY Auto/Rápido Serie 1/2×5",
      Cilindro_Compatible: "Electrónico Wang Li / Eléctrico 3 filas"
    },
    performance: [
      { label: "Detección", value: "Telesensado", level: "Apertura Automática" },
      { label: "Biometría", value: "Facial 3D", level: "Anti-falsificación" },
      { label: "Remote", value: "Apertura + Vista", level: "Control Total" },
      { label: "Vigilancia", value: "Ojo de Buey", level: "Captura Intrusión" },
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
      { name: "Anti-explosión A7-3", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-a73.webp" }
    ]
  },
  {
    category: "Cilindros de Seguridad",
    description: "Núcleos blindados anti-ganzúa",
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
    description: "Ergonomía y diseño premium",
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
    description: "Visión clara y protección física",
    items: [
      { name: "Antirrobo Ignífuga", img: "/images/CERRADURA/ACCESORIO/hard-mirilla-fuego.webp" },
      { name: "Aleación de Zinc", img: "/images/CERRADURA/ACCESORIO/hard-mirilla-zinc.webp" },
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
      description: cat.description // Guardamos la descripción de la categoría
    });
  });
});

async function uploadData() {
  console.log(`📡 Conectando a Supabase...`);

  // 1. SUBIR MODELOS (borrar todo primero para eliminar registros huérfanos)
  console.log(`Subiendo ${MODELOS.length} Cerraduras...`);
  const { error: errDeleteLocks } = await supabase.from('locks').delete().neq('id', '');
  if (errDeleteLocks) {
    console.error('❌ Error al limpiar locks:', errDeleteLocks.message);
    return;
  }
  const { error: err1 } = await supabase.from('locks').insert(MODELOS);

  if (err1) {
    console.error('❌ Error locks:', err1.message);
  } else {
    console.log('✅ Cerraduras subidas.');
  }

  // 2. SUBIR HARDWARE
  console.log(`Subiendo ${HARDWARE_FLAT.length} piezas de Hardware...`);
  // Limpiamos tabla hardware para evitar duplicados al correr el script varias veces
  // (Ojo: esto borra todo en lock_hardware antes de insertar lo nuevo)
  const { error: errDelete } = await supabase.from('lock_hardware').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  if (!errDelete) {
    const { error: err2 } = await supabase.from('lock_hardware').insert(HARDWARE_FLAT);
    if (err2) console.error('❌ Error hardware:', err2.message);
    else console.log('✅ Hardware subido.');
  } else {
    console.error('Error al limpiar tabla hardware:', errDelete);
  }
}

uploadData();
