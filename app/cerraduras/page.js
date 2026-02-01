// app/cerraduras/page.js
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fingerprint, 
  GripHorizontal, 
  ShieldCheck, 
  Key, 
  Radio, 
  ScanFace, 
  Smartphone, 
  Video, 
  Wifi, 
  Eye, 
  Cpu, 
  Scan, 
  Activity, 
  Zap, 
  Globe, 
  Camera, 
  CheckCircle,
  X // <--- Este es el que te falta ahora
} from 'lucide-react';
import Link from 'next/link';

// --- 1. DATOS TÉCNICOS ---
const FEATURES_TECH = [
  {
    icon: <Radio className="w-8 h-8 text-[#00C2FF]" />,
    title: "Radar Aeroespacial 24G",
    desc: "Detección activa del propietario a 2-4 metros. Desbloqueo remoto automático sin contacto."
  },
  {
    icon: <Cpu className="w-8 h-8 text-[#00C2FF]" />,
    title: "3 Sistemas Aislados",
    desc: "Recolección, Reconocimiento y Control operan independientemente para máxima seguridad."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#00C2FF]" />,
    title: "Seguridad G-Point",
    desc: "Punto seguro patentado: bloqueo automático inmediato al tocar el marco. Sin olvidos."
  }
];

const COMPARATIVA_DATA = [
  { clase: "Clase A", tiempo: "≥ 1 MIN", destructiva: "≥ 15 MIN", mutua: "≤ 0.03%" },
  { clase: "Clase B", tiempo: "≥ 5 MIN", destructiva: "≥ 30 MIN", mutua: "≤ 0.01%" },
  { clase: "Clase C (Estándar)", tiempo: "≥ 10 MIN", destructiva: "≥ 30 MIN", mutua: "≤ 0.0001%" },
  { clase: "WONLY INTELIGENTE", tiempo: "≥ 360 MIN", destructiva: "SUPERIOR", mutua: "≤ 0.00001%", highlight: true },
];

// --- 2. MODELOS (Cerraduras Principales) ---
const MODELOS = [
  {
    id: "s60max",
    name: "S60 Max",
    category: "Smart Lock",
    type: "Serie Max",
    img: "/images/CERRADURA/lock-s60-max.jpg", 
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
    img: "/images/CERRADURA/lock-s922-max.jpg", 
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
    img: "/images/CERRADURA/lock-s935-pro.jpg",
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
    img: "/images/CERRADURA/lock-s958-pro.jpg",
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
    img: "/images/CERRADURA/lock-s953-max.jpg", 
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
    img: "/images/CERRADURA/lock-p15-pro.jpg", 
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
    img: "/images/CERRADURA/lock-s936.jpg", 
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
    img: "/images/CERRADURA/s80-lock.jpg",
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
    img: "/images/CERRADURA/r9-lock.jpg", // ⚠️ Ajusta la ruta si es necesario
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
    img: "/images/CERRADURA/s80-max.jpg", 
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
    img: "/images/CERRADURA/s60m.jpg",
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
    img: "/images/CERRADURA/s50-pro.jpg",
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
    img: "/images/CERRADURA/q3f-pro.jpg",
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
    img: "/images/CERRADURA/s60-pro.jpg",
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
    img: "/images/CERRADURA/d235.png",
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
    img: "/images/CERRADURA/s922.png",
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
      { name: "Cerradura de 5 pernos", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-5pernos.jpg" },
      { name: "Cerradura Empotrada", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-empotrada.jpg" },
      { name: "Cerradura Autocontrol", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-auto.jpg" },
      { name: "Anti-explosión A7-3", img: "/images/CERRADURA/ACCESORIO/hard-cuerpo-a73.jpg" }
    ]
  },
  {
    title: "Cilindros de Seguridad",
    description: "Núcleos blindados anti-ganzúa",
    items: [
      { name: "Plegable Doble Fila", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-plegable.jpg" },
      { name: "Doble Fila Negra", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-negro.jpg" },
      { name: "Ultra Seguro 5.0", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-50.jpg" },
      { name: "Ultra Seguro 6.0", img: "/images/CERRADURA/ACCESORIO/hard-cilindro-60.jpg" }
    ]
  },
  {
    title: "Bisagras",
    description: "Soporte de carga y movimiento fluido",
    items: [
      { name: "Modelo H-001", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h001.jpg" },
      { name: "Modelo H-005", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h005.jpg" },
      { name: "Modelo H-006", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h006.jpg" },
      { name: "Modelo H-008", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h008.jpg" },
      { name: "Modelo H-009", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h009.jpg" },
      { name: "Modelo H-010", img: "/images/CERRADURA/ACCESORIO/hard-bisagra-h010.jpg" }
    ]
  },
  {
    title: "Manijas",
    description: "Ergonomía y diseño premium",
    items: [
      { name: "PF6851", img: "/images/CERRADURA/ACCESORIO/hard-manija-pf6851.jpg" },
      { name: "PG6818", img: "/images/CERRADURA/ACCESORIO/hard-manija-pg6818.jpg" },
      { name: "PZ6850", img: "/images/CERRADURA/ACCESORIO/hard-manija-pz6850.jpg" },
      { name: "PF6853", img: "/images/CERRADURA/ACCESORIO/hard-manija-pf6853.jpg" },
      { name: "PZ6820", img: "/images/CERRADURA/ACCESORIO/hard-manija-pz6820.jpg" }
    ]
  },
  {
    title: "Mirillas",
    description: "Visión clara y protección física",
    items: [
      { name: "Antirrobo Ignífuga", img: "/images/CERRADURA/ACCESORIO/hard-mirilla-fuego.jpg" },
      { name: "Aleación de Zinc", img: "/images/CERRADURA/ACCESORIO/hard-mirilla-zinc.jpg" },
      { name: "Antirrobo Cobre", img: "/images/CERRADURA/ACCESORIO/hard-mirilla-cobre.jpg" }
    ]
  }
];


// --- 4. COMPONENTES ---
const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-[#111] rounded-xl overflow-hidden border border-white/10 cursor-pointer group hover:border-[#00C2FF]/50 transition-all duration-300"
    >
      <div className="relative aspect-square bg-white p-8 flex items-center justify-center">
        
        <img 
            src={product.img} 
            alt={product.name}
            // CAMBIO 3: Eliminado 'drop-shadow-xl' de la imagen
            className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
            onError={(e) => e.currentTarget.style.display = 'none'} 
        />
        
        {/* Etiqueta (Badge) sin sombra */}
        <div className="absolute top-4 right-4 z-20 bg-[#00C2FF] text-black text-xs font-bold px-2 py-1 rounded">
          {product.type}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-white">{product.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">{product.description}</p>
        
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
          {product.specs.map((spec, idx) => (
            <div key={idx} className="text-center">
              <p className="text-[#00C2FF] font-bold text-sm truncate">{spec.value}</p>
              <p className="text-gray-600 text-[10px] uppercase truncate">{spec.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- MODAL LATERAL ---
const ProductModal = ({ product, onClose }) => {
  if (!product) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Fondo oscuro borroso detrás */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Panel Deslizante */}
      <motion.div 
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-[#111] w-full max-w-[700px] h-full shadow-2xl overflow-y-auto border-l border-white/10"
      >
        {/* Cabecera Sticky */}
        <div className="sticky top-0 bg-[#111]/95 backdrop-blur z-30 p-8 border-b border-white/5 flex justify-between items-start">
            <div>
                <span className="text-[#00C2FF] text-xs font-bold uppercase tracking-widest">{product.category} / {product.type}</span>
                <h2 className="text-4xl font-bold text-white mt-2">{product.name}</h2>
            </div>
            <button onClick={onClose} className="text-white hover:text-[#00C2FF] transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10">
                <X size={24} />
            </button>
        </div>

        <div className="p-8 space-y-8">
            {/* --- AQUÍ ESTÁ EL CAMBIO --- */}
            {/* He cambiado bg-[#1a1a1a] por bg-white */}
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white flex items-center justify-center z-0">
                <img 
                    src={product.img} 
                    alt={product.name} 
                    // Añadí un poco de padding (p-4) para que la cerradura no toque los bordes blancos
                    className="object-contain w-full h-full p-4 z-20" 
                    onError={(e) => e.currentTarget.style.display = 'none'}
                />
            </div>
            
            <p className="text-gray-300 text-lg font-light leading-relaxed border-b border-white/5 pb-8">
                {product.description}
            </p>
            
            <div>
                <h3 className="text-white font-bold uppercase mb-4 border-l-4 border-[#00C2FF] pl-3">Detalles Técnicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {Object.entries(product.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-white/10 py-3 text-sm hover:bg-white/5 px-2 rounded transition-colors">
                            <span className="text-gray-500 capitalize">{key.replace('_', ' ')}</span>
                            <span className="text-white text-right font-medium">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {product.performance && (
                <div>
                    <h3 className="text-white font-bold uppercase mb-4 border-l-4 border-[#00C2FF] pl-3">Rendimiento Certificado</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {product.performance.map((perf, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded border border-white/5 flex flex-col gap-2 hover:bg-white/10 transition-colors">
                                <div className="text-[#00C2FF] mb-1">{perf.icon}</div>
                                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">{perf.label}</span>
                                <div className="flex flex-col">
                                    <span className="text-white font-bold text-sm">{perf.value}</span>
                                    <span className="text-[10px] text-gray-500">{perf.level}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {product.colors && (
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5">
                    <h3 className="text-white font-bold uppercase mb-6 border-l-4 border-[#00C2FF] pl-3">Carta de Colores</h3>
                    <div className="mb-6">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block mb-4">Acabados Disponibles</span>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            {product.colors.interior.map((color, i) => (
                                <div key={i} className="text-center group flex flex-col items-center gap-2 cursor-pointer">
                                    <div className="w-12 h-12 rounded-full shadow-lg border-2 border-transparent group-hover:border-white transition-all transform group-hover:scale-110" style={{backgroundColor: color.hex}}></div>
                                    <span className="text-[9px] text-gray-400 uppercase font-medium max-w-[60px] leading-tight">{color.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="h-4"></div>
            
            <Link href="/contacto" className="block w-full text-center bg-[#00C2FF] hover:bg-[#009bcC] transition-colors text-black py-4 font-bold uppercase rounded text-sm tracking-widest sticky bottom-8 shadow-xl shadow-black/50">
                Solicitar Cotización
            </Link>
        </div>
      </motion.div>
    </div>
  );
};


// --- 5. PAGINA PRINCIPAL ---
export default function CerradurasPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main className="bg-black min-h-screen text-white pt-20">
      
      {/* 1. HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-0" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-4"
          >
            Cerraduras <span className="text-[#00C2FF]">Inteligentes</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Tecnología de seguridad patentada que supera 360 veces el estándar Clase C.
          </motion.p>
        </div>
      </section>

      {/* 2. GRID TECNOLOGÍA - BENTO STYLE */}
<section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
  
  {/* Fondo ambiental */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
    <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#00C2FF] rounded-full blur-[140px]" />
  </div>

  <div className="container mx-auto px-6 relative z-10">
    
    <div className="mb-16 text-center max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Core <span className="text-[#00C2FF]">Technology</span>
      </h2>
      <p className="text-gray-400">
        Componentes de precisión militar ensamblados para una seguridad inquebrantable.
      </p>
    </div>

    {/* GRID ASIMÉTRICO (BENTO) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
      
      {/* TARJETA 1: HERO IMAGE (EL CILINDRO) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="md:col-span-2 relative group rounded-2xl border border-white/10 bg-[#111] overflow-hidden"
      >
        {/* 1. TEXTO (z-20 para que flote ENCIMA de todo) */}
        <div className="absolute top-6 left-6 z-20 max-w-[280px] md:max-w-[350px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#00C2FF] text-black text-xs font-bold px-2 py-1 rounded">PATENTED</span>
            <span className="text-[#00C2FF] font-mono text-xs">REF: C-CLASS-360</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 shadow-black drop-shadow-lg">
            Cilindro Maestro Anti-Taladro
          </h3>
          <p className="text-gray-300 text-sm font-medium leading-relaxed drop-shadow-md">
            Estructura de pines reales y falsos con aleación tratada térmicamente. 360 veces más seguro que un cilindro clase A.
          </p>
        </div>

        {/* 2. CAPA DE PROTECCIÓN (EL TRUCO MÁGICO) */}
        {/* Esto crea un degradado de NEGRO (izquierda) a TRANSPARENTE (derecha).
            Asegura que el texto se lea perfecto aunque el cilindro pase por debajo. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/80 to-transparent z-10 pointer-events-none"></div>

        {/* 3. IMAGEN DEL CILINDRO (z-0) */}
        <div className="absolute inset-0 flex items-center justify-end z-0">
            <img 
              src="/images/CERRADURA/cilindro-core.png" 
              alt="Mecanismo Interno" 
              // Ajustamos opacity-100 para que brille bien (ya no necesitamos ocultarlo tanto)
              className="w-[85%] md:w-[70%] h-full object-contain object-right transform translate-x-10 group-hover:translate-x-0 transition-transform duration-700"
            />
        </div>

        {/* Efecto Scanline (Opcional, z-10 para estar sobre la imagen pero bajo el texto) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-10"></div>
      </motion.div>

      {/* TARJETA 2: UWB (Ocupa 1 espacio) */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: 0.2 }}
         className="relative bg-[#161616] border border-white/5 p-8 rounded-2xl hover:border-[#00C2FF]/30 transition-colors group"
      >
         <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-[#00C2FF] group-hover:scale-110 transition-transform">
            <Radio size={24} />
         </div>
         <h3 className="text-xl font-bold text-white mb-2">Sensor UWB 4.0</h3>
         <p className="text-gray-400 text-sm">
            Detección de presencia por radar. La cerradura "despierta" antes de que la toques.
         </p>
         <div className="absolute bottom-6 right-6 text-[#00C2FF]/20 font-mono text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">02</div>
      </motion.div>

      {/* TARJETAS 3, 4, 5... (Mapeo del resto) */}
      {FEATURES_TECH.slice(0, 3).map((item, idx) => ( 
         // Nota: He puesto slice para no repetir demasiadas, ajusta según tu array
         <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + (idx * 0.1) }}
            className="relative bg-[#161616] border border-white/5 p-8 rounded-2xl hover:border-[#00C2FF]/30 transition-colors group"
         >
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-white group-hover:text-[#00C2FF] transition-colors">
               {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
         </motion.div>
      ))}

    </div>
  </div>
</section>
      {/* 3. DETALLE INGENIERÍA */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/10 group">
              <img 
                src="/images/CERRADURA/detalle-cuerpo.jpg" 
                alt="Estructura Interna WONLY" 
                onError={(e) => {e.target.style.display='none'}}
                className="object-contain w-full h-full p-8 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute bottom-8 right-8 bg-[#00C2FF] text-black text-xs font-bold px-3 py-1 uppercase rounded-sm">
                Patente Anti-Palanca
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight">
              Ingeniería de <br/>
              <span className="text-[#00C2FF]">Súper Seguridad</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-4 bg-white/5 rounded-lg border-l-2 border-[#00C2FF]">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00C2FF]"/> Bloqueo Safety G-Point
                  </h4>
                  <p className="text-sm text-gray-400 mt-1 pl-6">
                    Sistema patentado que despliega todos los cerrojos automáticamente al detectar el marco.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-white/5 rounded-lg border-l-2 border-transparent hover:border-gray-500 transition">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                     <CheckCircle size={16} className="text-gray-500"/> Ganchos Anti-Palanca (6 Capas)
                  </h4>
                  <p className="text-sm text-gray-400 mt-1 pl-6">
                    Ganchos bidireccionales que se aferran con más fuerza ante intentos de palanca.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-white/5 rounded-lg border-l-2 border-transparent hover:border-gray-500 transition">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                     <CheckCircle size={16} className="text-gray-500"/> Compensación Automática
                  </h4>
                  <p className="text-sm text-gray-400 mt-1 pl-6">
                    Ajuste automático de holgura para una vida útil superior a 20 años.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TABLA COMPARATIVA */}
      <section className="py-20 bg-[#0A0A0A] border-y border-white/5 mb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-4">Estándares vs WONLY</h2>
            <p className="text-gray-400">Comparativa de seguridad técnica</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/20 text-gray-500 text-xs uppercase tracking-widest">
                  <th className="p-4">Clase / Estándar</th>
                  <th className="p-4 text-[#00C2FF]">Tiempo Apertura</th>
                  <th className="p-4">Anti-Destructiva</th>
                  <th className="p-4">Tasa Apertura Mutua</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-300">
                {COMPARATIVA_DATA.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-white/5 hover:bg-white/5 transition ${row.highlight ? 'bg-[#00C2FF]/10' : ''}`}
                  >
                    <td className={`p-4 font-bold ${row.highlight ? 'text-white' : ''}`}>{row.clase}</td>
                    <td className={`p-4 font-mono text-lg ${row.highlight ? 'text-[#00C2FF] font-bold' : ''}`}>{row.tiempo}</td>
                    <td className="p-4">{row.destructiva}</td>
                    <td className="p-4">{row.mutua}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- LISTADO DE PRODUCTOS --- */}
      <section className="container mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold uppercase text-white">Colección 2025</h2>
        </div>
        
        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MODELOS.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
          ))}
        </div>
      </section>

{/* --- SECCIÓN: HARDWARE & ACCESORIOS DETALLADOS --- */}
      <section className="container mx-auto px-6 pb-24 space-y-20">
        
        <div className="border-b border-gray-800 pb-4 mb-10">
            <h2 className="text-3xl font-bold uppercase text-white">Catálogo de Hardware</h2>
            <p className="text-gray-400 mt-2">Componentes de precisión para una instalación blindada.</p>
        </div>

        {/* Bucle para cada Categoría */}
        {HARDWARE_CATEGORIES.map((category, catIdx) => (
          <div key={catIdx} className="mb-16">
            
            {/* Cabecera de la Categoría */}
            <div className="flex items-center gap-4 mb-6">
               <div className="w-1 h-8 bg-[#00C2FF]"></div>
               <div>
                 <h3 className="text-xl font-bold uppercase text-white">{category.title}</h3>
                 <p className="text-xs text-gray-500 uppercase tracking-widest">{category.description}</p>
               </div>
            </div>

            {/* Grid ajustado */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx} 
                  // CAMBIO 1: flex flex-col para asegurar que imagen y texto se apilen correctamente
                  className="flex flex-col bg-[#111] rounded-lg overflow-hidden border border-white/5 hover:border-[#00C2FF]/50 transition-all group"
                >
                  {/* Imagen (Parte Superior) */}
                  <div className="relative h-32 md:h-56 bg-white p-6 flex items-center justify-center overflow-hidden shrink-0">
                    <img 
                      src={item.img} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentNode.style.backgroundColor = '#222';
                      }} 
                    />
                  </div>

                  {/* Texto (Parte Inferior) */}
                  {/* CAMBIO 2: Quitamos h-full y usamos grow para que ocupe el espacio necesario */}
                  <div className="grow bg-[#0a0a0a] border-t border-white/5 p-4 flex items-center justify-center">
                    {/* CAMBIO 3: !text-white para forzar el color blanco sí o sí */}
                    <h4 className="!text-white text-sm font-bold uppercase text-center group-hover:text-[#00C2FF] transition-colors">
                      {item.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      {/* ------------------------------------------- */}

      {/* MODAL DETALLE (Lateral) */}
      <AnimatePresence>
         {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>

      {/* 5. FOOTER VISUAL: CALL TO ACTION */}
      <section className="relative py-24 border-t border-white/10 overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#00C2FF] blur-[150px] rounded-full mix-blend-screen"/>
         </div>
         
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">El Futuro de la Seguridad</h2>
            <Link 
            href="/contacto" 
            className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#00C2FF] hover:text-white transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-[#00C2FF]/50">
               CONTACTAR CON VENTAS
            </Link>
         </div>
      </section>

    </main>
  );
}