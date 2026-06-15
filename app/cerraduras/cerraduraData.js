// --- 2. MODELOS (Cerraduras Principales) ---
const MODELOS = [
  {
    id: "s60max",
    name: "S60 Max",
    category: "Smart Lock",
    type: "Serie Max",
    img: "/images/CERRADURA/lock-s60-max.webp", 
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
      { icon: <Wifi size={20}/>, label: "Detección", value: "2-4 Metros", level: "Apertura Automática" },
      { icon: <ScanFace size={20}/>, label: "Biometría", value: "Facial 3D", level: "Anti-falsificación" },
      { icon: <ShieldCheck size={20}/>, label: "Seguridad", value: "Cifrado M1", level: "Nivel Financiero" },
      { icon: <Smartphone size={20}/>, label: "Control", value: "App + Mirilla", level: "Visualización Remota" },
      { icon: <Cpu size={20}/>, label: "Sistemas", value: "3 Aislados", level: "Gestión Independiente" },
      { icon: <Key size={20}/>, label: "Respaldo", value: "Llave Mecánica", level: "Clase C Superior" }
    ],
    colors: { interior: [{ name: "Negro Espacial", hex: "#1a1a1a" }] }
  },
  {
    id: "s922max",
    name: "S922 Max",
    category: "Smart Lock",
    type: "Serie Max",
    img: "/images/CERRADURA/lock-s922-max.webp", 
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
      { icon: <ScanFace size={20}/>, label: "Biometría", value: "Facial 3D", level: "Reconocimiento Profundo" },
      { icon: <Fingerprint size={20}/>, label: "Acceso", value: "Huella + Clave", level: "Multifuncional" },
      { icon: <Eye size={20}/>, label: "Vigilancia", value: "Mirilla Visual", level: "Captura de Estancia" },
      { icon: <ShieldCheck size={20}/>, label: "Seguridad", value: "Cifrado M1", level: "Tarjeta Encriptada" },
      { icon: <Smartphone size={20}/>, label: "Pantalla", value: "4 Pulgadas", level: "Panel Trasero HD" },
      { icon: <Key size={20}/>, label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "s935pro",
    name: "S935 Pro",
    category: "Smart Lock",
    type: "Serie Pro",
    img: "/images/CERRADURA/lock-s935-pro.webp",
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
      { icon: <Video size={20}/>, label: "Comunicación", value: "Video Portero", level: "Intercomunicador Visual" },
      { icon: <ScanFace size={20}/>, label: "Biometría", value: "Facial 3D", level: "Alta Precisión" },
      { icon: <Wifi size={20}/>, label: "Remoto", value: "App Control", level: "Desbloqueo a Distancia" },
      { icon: <ShieldCheck size={20}/>, label: "Seguridad", value: "Tarjeta CPU", level: "Anti-copia Avanzado" },
      { icon: <Fingerprint size={20}/>, label: "Acceso", value: "Huella + Clave", level: "Respuesta Rápida" },
      { icon: <Key size={20}/>, label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
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
      { icon: <Video size={20}/>, label: "Video", value: "Video Portero", level: "Comunicación Bidireccional" },
      { icon: <ScanFace size={20}/>, label: "Biometría", value: "Facial 3D", level: "Reconocimiento Profundo" },
      { icon: <Wifi size={20}/>, label: "Conectividad", value: "App Remota", level: "Control Total" },
      { icon: <ShieldCheck size={20}/>, label: "Protección", value: "Tarjeta CPU", level: "Cifrado Bancario" },
      { icon: <Eye size={20}/>, label: "Vigilancia", value: "Captura Estancia", level: "Monitoreo Activo" },
      { icon: <Key size={20}/>, label: "Respaldo", value: "Llave Mecánica", level: "Clase C" }
    ],
    colors: { interior: [{ name: "Negro Obsidiana", hex: "#111111" }] }
  },
  {
    id: "s953max",
    name: "S953 Max",
    category: "Smart Lock",
    type: "Serie Max",
    img: "/images/CERRADURA/lock-s953-max.webp", 
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
      { icon: <Fingerprint size={20}/>, label: "Biometría", value: "Venas Dactilares", level: "Máxima Seguridad" },
      { icon: <ScanFace size={20}/>, label: "Biometría 2", value: "Facial + Huella", level: "Multifuncional" },
      { icon: <Eye size={20}/>, label: "Vigilancia", value: "Captura Estancia", level: "Monitor Trasero" },
      { icon: <ShieldCheck size={20}/>, label: "Protección", value: "Tarjeta CPU", level: "Anti-Clonación" },
      { icon: <Smartphone size={20}/>, label: "Pantalla", value: "4 Pulgadas", level: "Panel HD" },
      { icon: <Key size={20}/>, label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro Obsidiana", hex: "#111111" }] }
  },
  {
    id: "p15pro",
    name: "P15 Pro",
    category: "Smart Lock",
    type: "Serie Pro",
    img: "/images/CERRADURA/lock-p15-pro.webp", 
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
      { icon: <ScanFace size={20}/>, label: "Biometría", value: "Facial 3D", level: "Alta Precisión" },
      { icon: <Smartphone size={20}/>, label: "Pantalla", value: "4.5 Pulgadas", level: "Gran Formato" },
      { icon: <Eye size={20}/>, label: "Vigilancia", value: "Mirilla + Captura", level: "Monitor Activo" },
      { icon: <ShieldCheck size={20}/>, label: "Seguridad", value: "Cifrado M1", level: "Tarjeta Encriptada" },
      { icon: <Fingerprint size={20}/>, label: "Acceso", value: "Huella + Clave", level: "Respuesta Rápida" },
      { icon: <Key size={20}/>, label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
  {
    id: "s936",
    name: "S936",
    category: "Smart Lock",
    type: "Semi-Auto",
    img: "/images/CERRADURA/lock-s936.webp", 
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
      { icon: <Fingerprint size={20}/>, label: "Biometría", value: "Huella Dactilar", level: "Acceso Rápido" },
      { icon: <GripHorizontal size={20}/>, label: "Mecanismo", value: "Un Agarre", level: "Ergonomía Directa" },
      { icon: <ShieldCheck size={20}/>, label: "Seguridad", value: "Cifrado M1", level: "Tarjeta Encriptada" },
      { icon: <Key size={20}/>, label: "Respaldo", value: "Llave Mecánica", level: "Emergencia" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
{
    id: "s80-vision",
    name: "S80 Vision Series",
    category: "Flagship",
    type: "Smart Lock UWB",
    img: "/images/CERRADURA/s80-lock.webp",
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
      { icon: <Radio size={20}/>, label: "Sensor", value: "UWB 4.0", level: "Detección Remota" },
      { icon: <ScanFace size={20}/>, label: "Biometría", value: "Facial 3D", level: "Sin Contacto" },
      { icon: <Smartphone size={20}/>, label: "Pantalla", value: "4.7'' HD", level: "Interactiva" },
      { icon: <ShieldCheck size={20}/>, label: "Seguridad", value: "Alerta", level: "Anti-Merodeo" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#000000" }] }
  },
{
    id: "dsm-r9",
    name: "DSM:R9 Series",
    category: "Best Seller",
    type: "Face ID + Palm Vein",
    img: "/images/CERRADURA/r9-lock.webp", // ⚠️ Ajusta la ruta si es necesario
    description: "El modelo más vendido con más de 100.000 unidades. Integra una pantalla gigante de 5 pulgadas, reconocimiento de venas de la palma y acabado premium en aleación con IML.",
    specs: [
      { value: "5.0\" HD", label: "Pantalla" },
      { value: "Venas", label: "Biometría" },
      { value: "IML", label: "Acabado" }
    ],
    details: {
      reconocimiento: "Facial 3D + Venas de Palma",
      camara: "2MP + Vigilancia Activa 24h",
      pantalla: "5.0 Pulgadas HD (Gran Formato)",
      interaccion: "Pantalla externa con Emojis",
      material: "Aleación + Proceso IML",
      seguridad: "Certificación BCTC",
      bateria: "Consumo 310uA - 4-5 meses"
    },
    performance: [
      { icon: <Fingerprint size={20}/>, label: "Biometría", value: "Venas", level: "Palma de Mano" },
      { icon: <Smartphone size={20}/>, label: "Visión", value: "5.0''", level: "Pantalla Gigante" },
      { icon: <Video size={20}/>, label: "Vigilancia", value: "Activa", level: "24 Horas" },
      { icon: <Cpu size={20}/>, label: "Acabado", value: "IML", level: "Anti-Rayaduras" }
    ],
    colors: { interior: [{ name: "Negro", hex: "#111111" }, { name: "Gris Espacial", hex: "#4a4a4a" }] }
  },
  {
    id: "s80-max",
    name: "S80 Max Flagship",
    category: "Tope de Gama",
    type: "UWB + 3D Face ID",
    img: "/images/CERRADURA/s80-max.webp", 
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
      { icon: <Radio size={20}/>, label: "Tecnología", value: "UWB Gen4", level: "Apertura Auto" },
      { icon: <Eye size={20}/>, label: "Cámara", value: "Color", level: "Visión Nocturna" },
      { icon: <Key size={20}/>, label: "Acceso", value: "9 Modos", level: "Versatilidad Total" },
      { icon: <ShieldCheck size={20}/>, label: "Seguridad", value: "Total", level: "Gama Alta" }
    ],
    colors: { interior: [{ name: "Negro Obsidiana", hex: "#111111" }, { name: "Cobre", hex: "#5D4037" }] }
  },
  {
    id: "s60m-smart",
    name: "S60M Smart Home",
    category: "Ecosistema Mijia",
    type: "Face ID + App Control",
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
      { icon: <Wifi size={20}/>, label: "Domótica", value: "Mijia", level: "Xiaomi Home" },
      { icon: <Eye size={20}/>, label: "Nocturna", value: "Dual IR", level: "Infrarrojo Doble" },
      { icon: <ScanFace size={20}/>, label: "Biometría", value: "Facial 3D", level: "Rápido" },
      { icon: <Smartphone size={20}/>, label: "Control", value: "App", level: "Remoto" }
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
      { icon: <GripHorizontal size={20}/>, label: "Ergonomía", value: "Manija", level: "Quick Open" },
      { icon: <Video size={20}/>, label: "Comunicación", value: "Video", level: "Portero Visual" },
      { icon: <Key size={20}/>, label: "Invitados", value: "Códigos", level: "Temporales" },
      { icon: <ShieldCheck size={20}/>, label: "Protección", value: "Dual IR", level: "Vigilancia" }
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
      { icon: <ShieldCheck size={20}/>, label: "Fiabilidad", value: "Top 1", level: "Más Vendida" },
      { icon: <ScanFace size={20}/>, label: "Biometría", value: "Facial", level: "Acceso Seguro" },
      { icon: <Cpu size={20}/>, label: "Mecanismo", value: "Doble", level: "Acción Rápida" },
      { icon: <Smartphone size={20}/>, label: "Pantalla", value: "3.5''", level: "Monitor" }
    ],
    colors: { interior: [{ name: "Negro Star", hex: "#111111" }, { name: "Café Profundo", hex: "#3e2723" }] }
  },
  {
    id: "s60-pro-wonly",
    name: "S60 Pro Ultra",
    category: "Gama Alta",
    type: "Palm Vein + Face ID",
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
      { icon: <Scan size={20}/>, label: "Biometría", value: "Palm Vein", level: "Grado Bancario" },
      { icon: <Activity size={20}/>, label: "Sensor", value: "Movimiento", level: "Auto-Activación" },
      { icon: <Smartphone size={20}/>, label: "Control", value: "App Total", level: "Gestión Remota" },
      { icon: <Zap size={20}/>, label: "Mecanismo", value: "Automático", level: "Motorizado" }
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
      { icon: <Globe size={20}/>, label: "Global", value: "9 Idiomas", level: "Internacional" },
      { icon: <Video size={20}/>, label: "Video", value: "FaceTime", level: "Llamada Live" },
      { icon: <Scan size={20}/>, label: "Seguridad", value: "Venas", level: "Biometría Top" },
      { icon: <Key size={20}/>, label: "Invitados", value: "OTP", level: "Clave 1 Uso" }
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
      { icon: <Zap size={20}/>, label: "Confort", value: "Motorizado", level: "Full Auto" },
      { icon: <ScanFace size={20}/>, label: "Acceso", value: "Face ID", level: "3D Facial" },
      { icon: <ShieldCheck size={20}/>, label: "Material", value: "Aluminio", level: "Robusto" },
      { icon: <Key size={20}/>, label: "Respaldo", value: "Llave/IC", level: "Emergencia" }
    ],
    colors: { 
        interior: [
            { name: "Negro", hex: "#111111" }, 
            { name: "Gris Metal", hex: "#4a4a4a" }
        ] 
    }
  },
];

// --- 3. HARDWARE Y ACCESORIOS (Con listado de modelos) ---
// --- 3. HARDWARE Y ACCESORIOS DESGLOSADOS ---
const HARDWARE_CATEGORIES = [
  {
    title: "Cuerpos de Cerradura",
    description: "Mecanismos internos de alta resistencia",
    items: [
      { name: "Cerradura de 5 pernos", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-5pernos.webp" },
      { name: "Cerradura Empotrada", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-empotrada.webp" },
      { name: "Cerradura Autocontrol", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-auto.webp" },
      { name: "Anti-explosión A7-3", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-a73.webp" }
    ]
  },
  {
    title: "Cilindros de Seguridad",
    description: "Núcleos blindados anti-ganzúa",
    items: [
      { name: "Plegable Doble Fila", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-plegable.webp" },
      { name: "Doble Fila Negra", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-negro.webp" },
      { name: "Ultra Seguro 5.0", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-50.webp" },
      { name: "Ultra Seguro 6.0", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-60.webp" }
    ]
  },
  {
    title: "Bisagras",
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
    title: "Manijas",
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
    title: "Mirillas",
    description: "Visión clara y protección física",
    items: [
      { name: "Antirrobo Ignífuga", img: "/images/CERRADURA/ACCESORIO/hard-mirilla-fuego.webp" },
      { name: "Aleación de Zinc", img: "/images/CERRADURA/ACCESORIO/hard-mirilla-zinc.webp" },
      { name: "Antirrobo Cobre", img: "/images/CERRADURA/ACCESORIO/hard-mirilla-cobre.webp" }
    ]
  }
];