"use client";

import { useState, useMemo, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ScanFace, ShieldCheck, VolumeX, Sparkles, MoveHorizontal, Palette, Settings, Flame, Filter, Search, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- 1. CONFIGURACIÓN VISUAL Y CATEGORÍAS ---

const CATEGORIAS = [
  "PUERTA DE SEGURIDAD IA",
  "PUERTA DE ALUMINIO FUNDIDO",
  "PUERTA DE ACERO REFORZADO",
  "PUERTA DE SEGURIDAD ACORAZADA",
  "PUERTAS CORREDIZAS Y ABATIBLES",
  "PUERTA COMERCIAL CORTAFUEGO",
  "PUERTA DE EVACUACIÓN",
  "PUERTA DE COBRE COMPUESTA",
  "PUERTA MÉDICA",
];

// Categorías agrupadas bajo "PUERTAS INTERIOR"
const CATEGORIAS_INTERIOR = [
  "PUERTA ACÚSTICA DE MADERA",
  "PUERTA MINIMALISTA",
  "PUERTA DE BAJO CARBONO",
  "PUERTA DE PVC",
];

// NUEVO: Mapa de imágenes para el Hero según la categoría
const IMAGENES_HERO = {
  "TODAS": "/images/todas.webp", // Imagen por defecto
  "PUERTA DE SEGURIDAD IA": "/images/family.webp",
  "PUERTA DE ACERO REFORZADO": "/images/specs.webp", // Cambia estas rutas por tus imágenes reales
  "PUERTA DE SEGURIDAD ACORAZADA": "/images/acorazada.webp",
  "PUERTA DE ALUMINIO FUNDIDO": "/images/fundido.webp",
  "PUERTA ACÚSTICA DE MADERA": "/images/madera.webp",
  "PUERTA DE PVC": "/images/pvc.webp",
  "PUERTAS CORREDIZAS Y ABATIBLES": "/images/corredizas.webp",
  "PUERTA COMERCIAL CORTAFUEGO": "/images/cortafuego.webp",
  "PUERTA DE EVACUACIÓN": "/images/evacuacion.webp",
  "PUERTA MINIMALISTA": "/images/minimalista.webp",
  "PUERTA DE BAJO CARBONO": "/images/carbono.webp",
  "PUERTA MÉDICA": "/images/medica.webp",
  "PUERTA DE COBRE COMPUESTA": "/images/cobrewallaper.webp"
};

// --- CARTA DE COLORES (igual para todas las puertas, de más oscuro a más claro) ---
const DOOR_COLORS = [
  { name: "Lacado Negro",          hex: "#171717", saturation: 0.08, strength: 0.88 },
  { name: "Tinte Wengué",          hex: "#4A2E1A" },
  { name: "Tinte Gris Oscuro",     hex: "#36383A", saturation: 0.08, strength: 0.80 },
  { name: "Lacado Gris Antracita", hex: "#484A4B", saturation: 0.06, strength: 0.76 },
  { name: "Tinte Nogal Oscuro",    hex: "#5C3524", saturation: 0.48, strength: 0.78, aiVariants: { "door-x70-shunliu": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-nogal-ai.webp" } },
  { name: "Tinte Roble",           hex: "#A8784E", saturation: 0.40, strength: 0.68 },
  { name: "Tinte Gris Claro",      hex: "#A5A19A", saturation: 0.06, strength: 0.68 },
  { name: "Tinte Natural",         hex: "#C19A6B", saturation: 0.34, strength: 0.62 },
  { name: "Lacado Blanco",         hex: "#E8E5DE", saturation: 0.04, strength: 0.72, aiVariants: { "door-x70-shunliu": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-blanco-ai-v3.webp" } },
];

const X70_SHUNLIU_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-blanco-ai-v3.webp",
};

const X70_JINXIU_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/x70-jinxiu/door-x70-jinxiu-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/x70-jinxiu/door-x70-jinxiu-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/x70-jinxiu/door-x70-jinxiu-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/x70-jinxiu/door-x70-jinxiu-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/x70-jinxiu/door-x70-jinxiu-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/x70-jinxiu/door-x70-jinxiu-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/x70-jinxiu/door-x70-jinxiu-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/x70-jinxiu/door-x70-jinxiu-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/x70-jinxiu/door-x70-jinxiu-blanco-ai.webp",
};

const X60_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/x60/door-x60-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/x60/door-x60-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/x60/door-x60-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/x60/door-x60-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/x60/door-x60-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/x60/door-x60-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/x60/door-x60-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/x60/door-x60-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/x60/door-x60-blanco-ai.webp",
};

const X60_MAX_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/x60-max/door-x60-max-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/x60-max/door-x60-max-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/x60-max/door-x60-max-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/x60-max/door-x60-max-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/x60-max/door-x60-max-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/x60-max/door-x60-max-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/x60-max/door-x60-max-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/x60-max/door-x60-max-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/x60-max/door-x60-max-blanco-ai.webp",
};

const X60_PRO_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/x60-pro/door-x60-pro-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/x60-pro/door-x60-pro-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/x60-pro/door-x60-pro-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/x60-pro/door-x60-pro-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/x60-pro/door-x60-pro-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/x60-pro/door-x60-pro-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/x60-pro/door-x60-pro-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/x60-pro/door-x60-pro-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/x60-pro/door-x60-pro-blanco-ai.webp",
};

const X50_MAX_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/x50-max/door-x50-max-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/x50-max/door-x50-max-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/x50-max/door-x50-max-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/x50-max/door-x50-max-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/x50-max/door-x50-max-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/x50-max/door-x50-max-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/x50-max/door-x50-max-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/x50-max/door-x50-max-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/x50-max/door-x50-max-blanco-ai.webp",
};

const X50_PRO_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/x50-pro/door-x50-pro-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/x50-pro/door-x50-pro-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/x50-pro/door-x50-pro-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/x50-pro/door-x50-pro-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/x50-pro/door-x50-pro-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/x50-pro/door-x50-pro-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/x50-pro/door-x50-pro-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/x50-pro/door-x50-pro-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/x50-pro/door-x50-pro-blanco-ai.webp",
};

const X50_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/x50/door-x50-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/x50/door-x50-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/x50/door-x50-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/x50/door-x50-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/x50/door-x50-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/x50/door-x50-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/x50/door-x50-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/x50/door-x50-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/x50/door-x50-blanco-ai.webp",
};

const K300_MAX_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/k300-max/door-k300-max-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/k300-max/door-k300-max-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/k300-max/door-k300-max-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/k300-max/door-k300-max-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/k300-max/door-k300-max-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/k300-max/door-k300-max-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/k300-max/door-k300-max-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/k300-max/door-k300-max-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/k300-max/door-k300-max-blanco-ai.webp",
};

const K300_PRO_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/k300-pro/door-k300-pro-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/k300-pro/door-k300-pro-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/k300-pro/door-k300-pro-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/k300-pro/door-k300-pro-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/k300-pro/door-k300-pro-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/k300-pro/door-k300-pro-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/k300-pro/door-k300-pro-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/k300-pro/door-k300-pro-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/k300-pro/door-k300-pro-blanco-ai.webp",
};

const L5857_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/l5857/door-l5857-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/l5857/door-l5857-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/l5857/door-l5857-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/l5857/door-l5857-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/l5857/door-l5857-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/l5857/door-l5857-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/l5857/door-l5857-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/l5857/door-l5857-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/l5857/door-l5857-blanco-ai.webp",
};

const L5859_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/l5859/door-l5859-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/l5859/door-l5859-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/l5859/door-l5859-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/l5859/door-l5859-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/l5859/door-l5859-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/l5859/door-l5859-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/l5859/door-l5859-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/l5859/door-l5859-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/l5859/door-l5859-blanco-ai.webp",
};

const P101_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/p101/door-p101-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/p101/door-p101-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/p101/door-p101-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/p101/door-p101-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/p101/door-p101-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/p101/door-p101-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/p101/door-p101-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/p101/door-p101-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/p101/door-p101-blanco-ai.webp",
};

const P102_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/p102/door-p102-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/p102/door-p102-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/p102/door-p102-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/p102/door-p102-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/p102/door-p102-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/p102/door-p102-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/p102/door-p102-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/p102/door-p102-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/p102/door-p102-blanco-ai.webp",
};

const P105_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/p105/door-p105-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/p105/door-p105-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/p105/door-p105-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/p105/door-p105-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/p105/door-p105-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/p105/door-p105-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/p105/door-p105-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/p105/door-p105-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/p105/door-p105-blanco-ai.webp",
};

const P107_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/p107/door-p107-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/p107/door-p107-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/p107/door-p107-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/p107/door-p107-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/p107/door-p107-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/p107/door-p107-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/p107/door-p107-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/p107/door-p107-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/p107/door-p107-blanco-ai.webp",
};

const T200_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/t200/door-t200-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/t200/door-t200-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/t200/door-t200-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/t200/door-t200-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/t200/door-t200-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/t200/door-t200-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/t200/door-t200-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/t200/door-t200-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/t200/door-t200-blanco-ai.webp",
};

const P103_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/p103/door-p103-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/p103/door-p103-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/p103/door-p103-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/p103/door-p103-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/p103/door-p103-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/p103/door-p103-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/p103/door-p103-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/p103/door-p103-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/p103/door-p103-blanco-ai.webp",
};

const P106_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/p106/door-p106-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/p106/door-p106-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/p106/door-p106-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/p106/door-p106-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/p106/door-p106-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/p106/door-p106-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/p106/door-p106-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/p106/door-p106-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/p106/door-p106-blanco-ai.webp",
};

const P108_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/p108/door-p108-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/p108/door-p108-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/p108/door-p108-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/p108/door-p108-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/p108/door-p108-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/p108/door-p108-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/p108/door-p108-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/p108/door-p108-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/p108/door-p108-blanco-ai.webp",
};

const S108_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/s108/door-s108-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/s108/door-s108-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/s108/door-s108-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/s108/door-s108-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/s108/door-s108-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/s108/door-s108-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/s108/door-s108-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/s108/door-s108-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/s108/door-s108-blanco-ai.webp",
};

const S108_PRO_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/s108-pro/door-s108-pro-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/s108-pro/door-s108-pro-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/s108-pro/door-s108-pro-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/s108-pro/door-s108-pro-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/s108-pro/door-s108-pro-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/s108-pro/door-s108-pro-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/s108-pro/door-s108-pro-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/s108-pro/door-s108-pro-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/s108-pro/door-s108-pro-blanco-ai.webp",
};

const S116_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/s116/door-s116-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/s116/door-s116-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/s116/door-s116-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/s116/door-s116-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/s116/door-s116-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/s116/door-s116-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/s116/door-s116-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/s116/door-s116-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/s116/door-s116-blanco-ai.webp",
};

const S118_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/s118/door-s118-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/s118/door-s118-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/s118/door-s118-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/s118/door-s118-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/s118/door-s118-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/s118/door-s118-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/s118/door-s118-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/s118/door-s118-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/s118/door-s118-blanco-ai.webp",
};

const S119_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/s119/door-s119-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/s119/door-s119-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/s119/door-s119-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/s119/door-s119-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/s119/door-s119-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/s119/door-s119-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/s119/door-s119-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/s119/door-s119-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/s119/door-s119-blanco-ai.webp",
};

const S121_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/s121/door-s121-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/s121/door-s121-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/s121/door-s121-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/s121/door-s121-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/s121/door-s121-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/s121/door-s121-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/s121/door-s121-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/s121/door-s121-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/s121/door-s121-blanco-ai.webp",
};

const Y106_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/y106/door-y106-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/y106/door-y106-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/y106/door-y106-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/y106/door-y106-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/y106/door-y106-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/y106/door-y106-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/y106/door-y106-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/y106/door-y106-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/y106/door-y106-blanco-ai.webp",
};

const Y116_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/y116/door-y116-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/y116/door-y116-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/y116/door-y116-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/y116/door-y116-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/y116/door-y116-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/y116/door-y116-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/y116/door-y116-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/y116/door-y116-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/y116/door-y116-blanco-ai.webp",
};

const Y118_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/y118/door-y118-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/y118/door-y118-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/y118/door-y118-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/y118/door-y118-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/y118/door-y118-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/y118/door-y118-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/y118/door-y118-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/y118/door-y118-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/y118/door-y118-blanco-ai.webp",
};

const Y119_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/y119/door-y119-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/y119/door-y119-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/y119/door-y119-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/y119/door-y119-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/y119/door-y119-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/y119/door-y119-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/y119/door-y119-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/y119/door-y119-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/y119/door-y119-blanco-ai.webp",
};

const CJ03_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cj03/door-cj03-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cj03/door-cj03-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cj03/door-cj03-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cj03/door-cj03-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cj03/door-cj03-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cj03/door-cj03-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cj03/door-cj03-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cj03/door-cj03-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cj03/door-cj03-blanco-ai.webp",
};

const CL058_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl058/door-cl058-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl058/door-cl058-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl058/door-cl058-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl058/door-cl058-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl058/door-cl058-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl058/door-cl058-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl058/door-cl058-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl058/door-cl058-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl058/door-cl058-blanco-ai.webp",
};

const CL097_PRO_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl097-pro/door-cl097-pro-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl097-pro/door-cl097-pro-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl097-pro/door-cl097-pro-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl097-pro/door-cl097-pro-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl097-pro/door-cl097-pro-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl097-pro/door-cl097-pro-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl097-pro/door-cl097-pro-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl097-pro/door-cl097-pro-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl097-pro/door-cl097-pro-blanco-ai.webp",
};

const CL23_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl23/door-cl23-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl23/door-cl23-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl23/door-cl23-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl23/door-cl23-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl23/door-cl23-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl23/door-cl23-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl23/door-cl23-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl23/door-cl23-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl23/door-cl23-blanco-ai.webp",
};

const CL36_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl36/door-cl36-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl36/door-cl36-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl36/door-cl36-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl36/door-cl36-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl36/door-cl36-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl36/door-cl36-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl36/door-cl36-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl36/door-cl36-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl36/door-cl36-blanco-ai.webp",
};

const CL37_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl37/door-cl37-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl37/door-cl37-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl37/door-cl37-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl37/door-cl37-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl37/door-cl37-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl37/door-cl37-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl37/door-cl37-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl37/door-cl37-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl37/door-cl37-blanco-ai.webp",
};

const CL38_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl38/door-cl38-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl38/door-cl38-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl38/door-cl38-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl38/door-cl38-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl38/door-cl38-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl38/door-cl38-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl38/door-cl38-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl38/door-cl38-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl38/door-cl38-blanco-ai.webp",
};

const CL39_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl39/door-cl39-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl39/door-cl39-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl39/door-cl39-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl39/door-cl39-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl39/door-cl39-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl39/door-cl39-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl39/door-cl39-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl39/door-cl39-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl39/door-cl39-blanco-ai.webp",
};

const CL50_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl50/door-cl50-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl50/door-cl50-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl50/door-cl50-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl50/door-cl50-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl50/door-cl50-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl50/door-cl50-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl50/door-cl50-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl50/door-cl50-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl50/door-cl50-blanco-ai.webp",
};

const CL51_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl51/door-cl51-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl51/door-cl51-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl51/door-cl51-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl51/door-cl51-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl51/door-cl51-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl51/door-cl51-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl51/door-cl51-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl51/door-cl51-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl51/door-cl51-blanco-ai.webp",
};

const CL55_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl55/door-cl55-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl55/door-cl55-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl55/door-cl55-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl55/door-cl55-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl55/door-cl55-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl55/door-cl55-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl55/door-cl55-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl55/door-cl55-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl55/door-cl55-blanco-ai.webp",
};

const CL56_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl56/door-cl56-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl56/door-cl56-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl56/door-cl56-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl56/door-cl56-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl56/door-cl56-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl56/door-cl56-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl56/door-cl56-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl56/door-cl56-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl56/door-cl56-blanco-ai.webp",
};

const CL59_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl59/door-cl59-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl59/door-cl59-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl59/door-cl59-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl59/door-cl59-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl59/door-cl59-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl59/door-cl59-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl59/door-cl59-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl59/door-cl59-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl59/door-cl59-blanco-ai.webp",
};

const CL60_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl60/door-cl60-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl60/door-cl60-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl60/door-cl60-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl60/door-cl60-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl60/door-cl60-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl60/door-cl60-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl60/door-cl60-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl60/door-cl60-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl60/door-cl60-blanco-ai.webp",
};

const CL62_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl62/door-cl62-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl62/door-cl62-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl62/door-cl62-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl62/door-cl62-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl62/door-cl62-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl62/door-cl62-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl62/door-cl62-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl62/door-cl62-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl62/door-cl62-blanco-ai.webp",
};

const CL63_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl63/door-cl63-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl63/door-cl63-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl63/door-cl63-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl63/door-cl63-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl63/door-cl63-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl63/door-cl63-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl63/door-cl63-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl63/door-cl63-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl63/door-cl63-blanco-ai.webp",
};

const CL65_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl65/door-cl65-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl65/door-cl65-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl65/door-cl65-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl65/door-cl65-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl65/door-cl65-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl65/door-cl65-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl65/door-cl65-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl65/door-cl65-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl65/door-cl65-blanco-ai.webp",
};

const CL66_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl66/door-cl66-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl66/door-cl66-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl66/door-cl66-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl66/door-cl66-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl66/door-cl66-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl66/door-cl66-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl66/door-cl66-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl66/door-cl66-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl66/door-cl66-blanco-ai.webp",
};

const CL72_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl72/door-cl72-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl72/door-cl72-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl72/door-cl72-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl72/door-cl72-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl72/door-cl72-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl72/door-cl72-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl72/door-cl72-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl72/door-cl72-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl72/door-cl72-blanco-ai.webp",
};

const CL96_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/cl96/door-cl96-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/cl96/door-cl96-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/cl96/door-cl96-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/cl96/door-cl96-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/cl96/door-cl96-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/cl96/door-cl96-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/cl96/door-cl96-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/cl96/door-cl96-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/cl96/door-cl96-blanco-ai.webp",
};

const CONTEMPORARY_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/contemporary/door-contemporary-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/contemporary/door-contemporary-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/contemporary/door-contemporary-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/contemporary/door-contemporary-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/contemporary/door-contemporary-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/contemporary/door-contemporary-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/contemporary/door-contemporary-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/contemporary/door-contemporary-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/contemporary/door-contemporary-blanco-ai.webp",
};

const GF061_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gf061/door-gf061-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gf061/door-gf061-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gf061/door-gf061-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gf061/door-gf061-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gf061/door-gf061-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gf061/door-gf061-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gf061/door-gf061-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gf061/door-gf061-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gf061/door-gf061-blanco-ai.webp",
};

const GF090_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gf090/door-gf090-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gf090/door-gf090-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gf090/door-gf090-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gf090/door-gf090-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gf090/door-gf090-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gf090/door-gf090-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gf090/door-gf090-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gf090/door-gf090-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gf090/door-gf090-blanco-ai.webp",
};

const GF091_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gf091/door-gf091-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gf091/door-gf091-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gf091/door-gf091-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gf091/door-gf091-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gf091/door-gf091-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gf091/door-gf091-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gf091/door-gf091-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gf091/door-gf091-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gf091/door-gf091-blanco-ai.webp",
};

const GF092_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gf092/door-gf092-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gf092/door-gf092-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gf092/door-gf092-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gf092/door-gf092-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gf092/door-gf092-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gf092/door-gf092-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gf092/door-gf092-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gf092/door-gf092-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gf092/door-gf092-blanco-ai.webp",
};

const GL083_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gl083/door-gl083-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gl083/door-gl083-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gl083/door-gl083-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gl083/door-gl083-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gl083/door-gl083-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gl083/door-gl083-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gl083/door-gl083-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gl083/door-gl083-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gl083/door-gl083-blanco-ai.webp",
};

const GL097_PRO_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gl097-pro/door-gl097-pro-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gl097-pro/door-gl097-pro-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gl097-pro/door-gl097-pro-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gl097-pro/door-gl097-pro-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gl097-pro/door-gl097-pro-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gl097-pro/door-gl097-pro-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gl097-pro/door-gl097-pro-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gl097-pro/door-gl097-pro-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gl097-pro/door-gl097-pro-blanco-ai.webp",
};

const GL097_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gl097/door-gl097-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gl097/door-gl097-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gl097/door-gl097-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gl097/door-gl097-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gl097/door-gl097-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gl097/door-gl097-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gl097/door-gl097-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gl097/door-gl097-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gl097/door-gl097-blanco-ai.webp",
};

const GL098_PRO_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gl098-pro/door-gl098-pro-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gl098-pro/door-gl098-pro-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gl098-pro/door-gl098-pro-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gl098-pro/door-gl098-pro-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gl098-pro/door-gl098-pro-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gl098-pro/door-gl098-pro-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gl098-pro/door-gl098-pro-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gl098-pro/door-gl098-pro-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gl098-pro/door-gl098-pro-blanco-ai.webp",
};

const GL098_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gl098/door-gl098-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gl098/door-gl098-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gl098/door-gl098-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gl098/door-gl098-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gl098/door-gl098-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gl098/door-gl098-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gl098/door-gl098-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gl098/door-gl098-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gl098/door-gl098-blanco-ai.webp",
};

const GL099_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gl099/door-gl099-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gl099/door-gl099-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gl099/door-gl099-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gl099/door-gl099-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gl099/door-gl099-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gl099/door-gl099-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gl099/door-gl099-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gl099/door-gl099-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gl099/door-gl099-blanco-ai.webp",
};

const GL123_1_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gl123-1/door-gl123-1-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gl123-1/door-gl123-1-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gl123-1/door-gl123-1-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gl123-1/door-gl123-1-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gl123-1/door-gl123-1-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gl123-1/door-gl123-1-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gl123-1/door-gl123-1-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gl123-1/door-gl123-1-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gl123-1/door-gl123-1-blanco-ai.webp",
};

const GL23_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/gl23/door-gl23-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/gl23/door-gl23-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/gl23/door-gl23-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/gl23/door-gl23-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/gl23/door-gl23-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/gl23/door-gl23-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/gl23/door-gl23-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/gl23/door-gl23-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/gl23/door-gl23-blanco-ai.webp",
};

const GLORY_PRO_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/glory-pro/door-glory-pro-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/glory-pro/door-glory-pro-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/glory-pro/door-glory-pro-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/glory-pro/door-glory-pro-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/glory-pro/door-glory-pro-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/glory-pro/door-glory-pro-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/glory-pro/door-glory-pro-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/glory-pro/door-glory-pro-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/glory-pro/door-glory-pro-blanco-ai.webp",
};

const GLORY_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/glory/door-glory-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/glory/door-glory-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/glory/door-glory-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/glory/door-glory-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/glory/door-glory-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/glory/door-glory-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/glory/door-glory-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/glory/door-glory-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/glory/door-glory-blanco-ai.webp",
};

const JD073_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/jd073/door-jd073-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/jd073/door-jd073-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/jd073/door-jd073-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/jd073/door-jd073-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/jd073/door-jd073-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/jd073/door-jd073-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/jd073/door-jd073-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/jd073/door-jd073-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/jd073/door-jd073-blanco-ai.webp",
};

const L5601_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/l5601/door-l5601-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/l5601/door-l5601-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/l5601/door-l5601-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/l5601/door-l5601-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/l5601/door-l5601-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/l5601/door-l5601-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/l5601/door-l5601-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/l5601/door-l5601-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/l5601/door-l5601-blanco-ai.webp",
};

const LINGAN_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/lingan/door-lingan-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/lingan/door-lingan-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/lingan/door-lingan-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/lingan/door-lingan-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/lingan/door-lingan-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/lingan/door-lingan-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/lingan/door-lingan-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/lingan/door-lingan-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/lingan/door-lingan-blanco-ai.webp",
};

const MID_NIGHT_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/mid-night/door-mid-night-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/mid-night/door-mid-night-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/mid-night/door-mid-night-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/mid-night/door-mid-night-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/mid-night/door-mid-night-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/mid-night/door-mid-night-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/mid-night/door-mid-night-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/mid-night/door-mid-night-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/mid-night/door-mid-night-blanco-ai.webp",
};

const N9518_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/n9518/door-n9518-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/n9518/door-n9518-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/n9518/door-n9518-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/n9518/door-n9518-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/n9518/door-n9518-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/n9518/door-n9518-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/n9518/door-n9518-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/n9518/door-n9518-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/n9518/door-n9518-blanco-ai.webp",
};

const N9519_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/n9519/door-n9519-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/n9519/door-n9519-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/n9519/door-n9519-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/n9519/door-n9519-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/n9519/door-n9519-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/n9519/door-n9519-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/n9519/door-n9519-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/n9519/door-n9519-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/n9519/door-n9519-blanco-ai.webp",
};

const N9520_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/n9520/door-n9520-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/n9520/door-n9520-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/n9520/door-n9520-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/n9520/door-n9520-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/n9520/door-n9520-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/n9520/door-n9520-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/n9520/door-n9520-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/n9520/door-n9520-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/n9520/door-n9520-blanco-ai.webp",
};

const NC9020_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/nc9020/door-nc9020-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/nc9020/door-nc9020-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/nc9020/door-nc9020-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/nc9020/door-nc9020-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/nc9020/door-nc9020-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/nc9020/door-nc9020-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/nc9020/door-nc9020-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/nc9020/door-nc9020-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/nc9020/door-nc9020-blanco-ai.webp",
};

const NC9516_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/nc9516/door-nc9516-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/nc9516/door-nc9516-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/nc9516/door-nc9516-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/nc9516/door-nc9516-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/nc9516/door-nc9516-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/nc9516/door-nc9516-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/nc9516/door-nc9516-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/nc9516/door-nc9516-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/nc9516/door-nc9516-blanco-ai.webp",
};

const S101_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACERO/s101/door-s101-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACERO/s101/door-s101-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACERO/s101/door-s101-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACERO/s101/door-s101-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACERO/s101/door-s101-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACERO/s101/door-s101-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACERO/s101/door-s101-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACERO/s101/door-s101-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACERO/s101/door-s101-blanco-ai.webp",
};

const WL001_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl001/door-wl001-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl001/door-wl001-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl001/door-wl001-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl001/door-wl001-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl001/door-wl001-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl001/door-wl001-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl001/door-wl001-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl001/door-wl001-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl001/door-wl001-blanco-ai.webp",
};

const WL002_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl002/door-wl002-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl002/door-wl002-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl002/door-wl002-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl002/door-wl002-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl002/door-wl002-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl002/door-wl002-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl002/door-wl002-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl002/door-wl002-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl002/door-wl002-blanco-ai.webp",
};

const WL003_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl003/door-wl003-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl003/door-wl003-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl003/door-wl003-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl003/door-wl003-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl003/door-wl003-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl003/door-wl003-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl003/door-wl003-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl003/door-wl003-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl003/door-wl003-blanco-ai.webp",
};

const WL005_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl005/door-wl005-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl005/door-wl005-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl005/door-wl005-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl005/door-wl005-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl005/door-wl005-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl005/door-wl005-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl005/door-wl005-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl005/door-wl005-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl005/door-wl005-blanco-ai.webp",
};

const WL006_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl006/door-wl006-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl006/door-wl006-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl006/door-wl006-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl006/door-wl006-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl006/door-wl006-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl006/door-wl006-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl006/door-wl006-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl006/door-wl006-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl006/door-wl006-blanco-ai.webp",
};

const WL007_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl007/door-wl007-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl007/door-wl007-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl007/door-wl007-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl007/door-wl007-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl007/door-wl007-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl007/door-wl007-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl007/door-wl007-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl007/door-wl007-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl007/door-wl007-blanco-ai.webp",
};

const WL008_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl008/door-wl008-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl008/door-wl008-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl008/door-wl008-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl008/door-wl008-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl008/door-wl008-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl008/door-wl008-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl008/door-wl008-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl008/door-wl008-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl008/door-wl008-blanco-ai.webp",
};

const WL009_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl009/door-wl009-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl009/door-wl009-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl009/door-wl009-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl009/door-wl009-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl009/door-wl009-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl009/door-wl009-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl009/door-wl009-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl009/door-wl009-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl009/door-wl009-blanco-ai.webp",
};

const WL010_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl010/door-wl010-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl010/door-wl010-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl010/door-wl010-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl010/door-wl010-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl010/door-wl010-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl010/door-wl010-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl010/door-wl010-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl010/door-wl010-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl010/door-wl010-blanco-ai.webp",
};

const WL011_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl011/door-wl011-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl011/door-wl011-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl011/door-wl011-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl011/door-wl011-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl011/door-wl011-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl011/door-wl011-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl011/door-wl011-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl011/door-wl011-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl011/door-wl011-blanco-ai.webp",
};

const WL012_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl012/door-wl012-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl012/door-wl012-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl012/door-wl012-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl012/door-wl012-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl012/door-wl012-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl012/door-wl012-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl012/door-wl012-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl012/door-wl012-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl012/door-wl012-blanco-ai.webp",
};

const WL013_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl013/door-wl013-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl013/door-wl013-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl013/door-wl013-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl013/door-wl013-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl013/door-wl013-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl013/door-wl013-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl013/door-wl013-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl013/door-wl013-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl013/door-wl013-blanco-ai.webp",
};

const WL015_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl015/door-wl015-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl015/door-wl015-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl015/door-wl015-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl015/door-wl015-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl015/door-wl015-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl015/door-wl015-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl015/door-wl015-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl015/door-wl015-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl015/door-wl015-blanco-ai.webp",
};

const WL016_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl016/door-wl016-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl016/door-wl016-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl016/door-wl016-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl016/door-wl016-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl016/door-wl016-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl016/door-wl016-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl016/door-wl016-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl016/door-wl016-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl016/door-wl016-blanco-ai.webp",
};

const WL017_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl017/door-wl017-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl017/door-wl017-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl017/door-wl017-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl017/door-wl017-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl017/door-wl017-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl017/door-wl017-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl017/door-wl017-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl017/door-wl017-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl017/door-wl017-blanco-ai.webp",
};

const WL018_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl018/door-wl018-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl018/door-wl018-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl018/door-wl018-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl018/door-wl018-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl018/door-wl018-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl018/door-wl018-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl018/door-wl018-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl018/door-wl018-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl018/door-wl018-blanco-ai.webp",
};

const WL019_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl019/door-wl019-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl019/door-wl019-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl019/door-wl019-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl019/door-wl019-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl019/door-wl019-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl019/door-wl019-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl019/door-wl019-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl019/door-wl019-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl019/door-wl019-blanco-ai.webp",
};

const WL020_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl020/door-wl020-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl020/door-wl020-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl020/door-wl020-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl020/door-wl020-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl020/door-wl020-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl020/door-wl020-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl020/door-wl020-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl020/door-wl020-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl020/door-wl020-blanco-ai.webp",
};

const WL021_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl021/door-wl021-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl021/door-wl021-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl021/door-wl021-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl021/door-wl021-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl021/door-wl021-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl021/door-wl021-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl021/door-wl021-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl021/door-wl021-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl021/door-wl021-blanco-ai.webp",
};

const WL022_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl022/door-wl022-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl022/door-wl022-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl022/door-wl022-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl022/door-wl022-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl022/door-wl022-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl022/door-wl022-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl022/door-wl022-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl022/door-wl022-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl022/door-wl022-blanco-ai.webp",
};

const WL023_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl023/door-wl023-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl023/door-wl023-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl023/door-wl023-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl023/door-wl023-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl023/door-wl023-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl023/door-wl023-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl023/door-wl023-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl023/door-wl023-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl023/door-wl023-blanco-ai.webp",
};

const WL025_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl025/door-wl025-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl025/door-wl025-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl025/door-wl025-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl025/door-wl025-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl025/door-wl025-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl025/door-wl025-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl025/door-wl025-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl025/door-wl025-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl025/door-wl025-blanco-ai.webp",
};

const WL026_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl026/door-wl026-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl026/door-wl026-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl026/door-wl026-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl026/door-wl026-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl026/door-wl026-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl026/door-wl026-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl026/door-wl026-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl026/door-wl026-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl026/door-wl026-blanco-ai.webp",
};

const WL027_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl027/door-wl027-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl027/door-wl027-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl027/door-wl027-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl027/door-wl027-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl027/door-wl027-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl027/door-wl027-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl027/door-wl027-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl027/door-wl027-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl027/door-wl027-blanco-ai.webp",
};

const WL028_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl028/door-wl028-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl028/door-wl028-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl028/door-wl028-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl028/door-wl028-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl028/door-wl028-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl028/door-wl028-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl028/door-wl028-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl028/door-wl028-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl028/door-wl028-blanco-ai.webp",
};

const WL029_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ACORAZADA/wl029/door-wl029-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ACORAZADA/wl029/door-wl029-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ACORAZADA/wl029/door-wl029-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ACORAZADA/wl029/door-wl029-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ACORAZADA/wl029/door-wl029-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ACORAZADA/wl029/door-wl029-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ACORAZADA/wl029/door-wl029-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ACORAZADA/wl029/door-wl029-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ACORAZADA/wl029/door-wl029-blanco-ai.webp",
};

const CASTLE_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/castle/door-castle-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/castle/door-castle-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/castle/door-castle-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/castle/door-castle-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/castle/door-castle-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/castle/door-castle-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/castle/door-castle-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/castle/door-castle-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/castle/door-castle-blanco-ai.webp",
};

const CHAOHE_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/chaohe/door-chaohe-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/chaohe/door-chaohe-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/chaohe/door-chaohe-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/chaohe/door-chaohe-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/chaohe/door-chaohe-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/chaohe/door-chaohe-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/chaohe/door-chaohe-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/chaohe/door-chaohe-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/chaohe/door-chaohe-blanco-ai.webp",
};

const CHAOLING_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/chaoling/door-chaoling-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/chaoling/door-chaoling-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/chaoling/door-chaoling-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/chaoling/door-chaoling-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/chaoling/door-chaoling-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/chaoling/door-chaoling-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/chaoling/door-chaoling-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/chaoling/door-chaoling-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/chaoling/door-chaoling-blanco-ai.webp",
};

const CHAOPU_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/chaopu/door-chaopu-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/chaopu/door-chaopu-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/chaopu/door-chaopu-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/chaopu/door-chaopu-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/chaopu/door-chaopu-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/chaopu/door-chaopu-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/chaopu/door-chaopu-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/chaopu/door-chaopu-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/chaopu/door-chaopu-blanco-ai.webp",
};

const CHAOSE_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/chaose/door-chaose-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/chaose/door-chaose-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/chaose/door-chaose-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/chaose/door-chaose-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/chaose/door-chaose-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/chaose/door-chaose-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/chaose/door-chaose-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/chaose/door-chaose-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/chaose/door-chaose-blanco-ai.webp",
};

const DIHUA_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/dihua/door-dihua-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/dihua/door-dihua-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/dihua/door-dihua-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/dihua/door-dihua-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/dihua/door-dihua-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/dihua/door-dihua-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/dihua/door-dihua-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/dihua/door-dihua-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/dihua/door-dihua-blanco-ai.webp",
};

const DONGSELIUNIAN_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/dongseliunian/door-dongseliunian-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/dongseliunian/door-dongseliunian-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/dongseliunian/door-dongseliunian-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/dongseliunian/door-dongseliunian-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/dongseliunian/door-dongseliunian-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/dongseliunian/door-dongseliunian-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/dongseliunian/door-dongseliunian-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/dongseliunian/door-dongseliunian-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/dongseliunian/door-dongseliunian-blanco-ai.webp",
};

const HEIDELBERG_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/heidelberg/door-heidelberg-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/heidelberg/door-heidelberg-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/heidelberg/door-heidelberg-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/heidelberg/door-heidelberg-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/heidelberg/door-heidelberg-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/heidelberg/door-heidelberg-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/heidelberg/door-heidelberg-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/heidelberg/door-heidelberg-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/heidelberg/door-heidelberg-blanco-ai.webp",
};

const JINGHONG_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/jinghong/door-jinghong-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/jinghong/door-jinghong-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/jinghong/door-jinghong-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/jinghong/door-jinghong-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/jinghong/door-jinghong-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/jinghong/door-jinghong-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/jinghong/door-jinghong-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/jinghong/door-jinghong-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/jinghong/door-jinghong-blanco-ai.webp",
};

const LANGE_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/lange/door-lange-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/lange/door-lange-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/lange/door-lange-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/lange/door-lange-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/lange/door-lange-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/lange/door-lange-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/lange/door-lange-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/lange/door-lange-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/lange/door-lange-blanco-ai.webp",
};

const LOUIS_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/louis/door-louis-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/louis/door-louis-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/louis/door-louis-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/louis/door-louis-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/louis/door-louis-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/louis/door-louis-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/louis/door-louis-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/louis/door-louis-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/louis/door-louis-blanco-ai.webp",
};

const LUYI_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/luyi/door-luyi-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/luyi/door-luyi-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/luyi/door-luyi-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/luyi/door-luyi-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/luyi/door-luyi-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/luyi/door-luyi-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/luyi/door-luyi-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/luyi/door-luyi-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/luyi/door-luyi-blanco-ai.webp",
};

const MAKAILEN_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/makailen/door-makailen-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/makailen/door-makailen-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/makailen/door-makailen-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/makailen/door-makailen-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/makailen/door-makailen-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/makailen/door-makailen-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/makailen/door-makailen-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/makailen/door-makailen-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/makailen/door-makailen-blanco-ai.webp",
};

const MINGMENGUIZU_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/mingmenguizu/door-mingmenguizu-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/mingmenguizu/door-mingmenguizu-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/mingmenguizu/door-mingmenguizu-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/mingmenguizu/door-mingmenguizu-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/mingmenguizu/door-mingmenguizu-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/mingmenguizu/door-mingmenguizu-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/mingmenguizu/door-mingmenguizu-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/mingmenguizu/door-mingmenguizu-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/mingmenguizu/door-mingmenguizu-blanco-ai.webp",
};

const PRADA_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/prada/door-prada-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/prada/door-prada-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/prada/door-prada-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/prada/door-prada-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/prada/door-prada-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/prada/door-prada-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/prada/door-prada-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/prada/door-prada-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/prada/door-prada-blanco-ai.webp",
};

const PULADA_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/pulada/door-pulada-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/pulada/door-pulada-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/pulada/door-pulada-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/pulada/door-pulada-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/pulada/door-pulada-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/pulada/door-pulada-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/pulada/door-pulada-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/pulada/door-pulada-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/pulada/door-pulada-blanco-ai.webp",
};

const RUIHE_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/ruihe/door-ruihe-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/ruihe/door-ruihe-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/ruihe/door-ruihe-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/ruihe/door-ruihe-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/ruihe/door-ruihe-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/ruihe/door-ruihe-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/ruihe/door-ruihe-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/ruihe/door-ruihe-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/ruihe/door-ruihe-blanco-ai.webp",
};

const RUOYIN_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/ruoyin/door-ruoyin-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/ruoyin/door-ruoyin-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/ruoyin/door-ruoyin-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/ruoyin/door-ruoyin-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/ruoyin/door-ruoyin-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/ruoyin/door-ruoyin-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/ruoyin/door-ruoyin-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/ruoyin/door-ruoyin-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/ruoyin/door-ruoyin-blanco-ai.webp",
};

const SABO_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/sabo/door-sabo-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/sabo/door-sabo-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/sabo/door-sabo-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/sabo/door-sabo-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/sabo/door-sabo-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/sabo/door-sabo-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/sabo/door-sabo-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/sabo/door-sabo-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/sabo/door-sabo-blanco-ai.webp",
};

const SAINA_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/saina/door-saina-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/saina/door-saina-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/saina/door-saina-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/saina/door-saina-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/saina/door-saina-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/saina/door-saina-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/saina/door-saina-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/saina/door-saina-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/saina/door-saina-blanco-ai.webp",
};

const SENNA_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/senna/door-senna-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/senna/door-senna-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/senna/door-senna-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/senna/door-senna-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/senna/door-senna-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/senna/door-senna-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/senna/door-senna-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/senna/door-senna-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/senna/door-senna-blanco-ai.webp",
};

const SHENGSHI_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/shengshi/door-shengshi-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/shengshi/door-shengshi-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/shengshi/door-shengshi-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/shengshi/door-shengshi-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/shengshi/door-shengshi-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/shengshi/door-shengshi-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/shengshi/door-shengshi-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/shengshi/door-shengshi-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/shengshi/door-shengshi-blanco-ai.webp",
};

const WAVE_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/wave/door-wave-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/wave/door-wave-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/wave/door-wave-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/wave/door-wave-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/wave/door-wave-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/wave/door-wave-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/wave/door-wave-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/wave/door-wave-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/wave/door-wave-blanco-ai.webp",
};

const WOODLAND_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/woodland/door-woodland-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/woodland/door-woodland-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/woodland/door-woodland-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/woodland/door-woodland-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/woodland/door-woodland-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/woodland/door-woodland-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/woodland/door-woodland-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/woodland/door-woodland-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/woodland/door-woodland-blanco-ai.webp",
};

const YASHANG_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/ALUMINIO/yashang/door-yashang-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/ALUMINIO/yashang/door-yashang-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/ALUMINIO/yashang/door-yashang-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/ALUMINIO/yashang/door-yashang-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/ALUMINIO/yashang/door-yashang-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/ALUMINIO/yashang/door-yashang-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/ALUMINIO/yashang/door-yashang-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/ALUMINIO/yashang/door-yashang-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/ALUMINIO/yashang/door-yashang-blanco-ai.webp",
};

const WL_DT08_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/BAJOCARBONO/wl-dt08/door-wl-dt08-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/BAJOCARBONO/wl-dt08/door-wl-dt08-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/BAJOCARBONO/wl-dt08/door-wl-dt08-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/BAJOCARBONO/wl-dt08/door-wl-dt08-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/BAJOCARBONO/wl-dt08/door-wl-dt08-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/BAJOCARBONO/wl-dt08/door-wl-dt08-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/BAJOCARBONO/wl-dt08/door-wl-dt08-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/BAJOCARBONO/wl-dt08/door-wl-dt08-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/BAJOCARBONO/wl-dt08/door-wl-dt08-blanco-ai.webp",
};

const WL_DT103_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/BAJOCARBONO/wl-dt103/door-wl-dt103-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/BAJOCARBONO/wl-dt103/door-wl-dt103-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/BAJOCARBONO/wl-dt103/door-wl-dt103-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/BAJOCARBONO/wl-dt103/door-wl-dt103-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/BAJOCARBONO/wl-dt103/door-wl-dt103-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/BAJOCARBONO/wl-dt103/door-wl-dt103-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/BAJOCARBONO/wl-dt103/door-wl-dt103-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/BAJOCARBONO/wl-dt103/door-wl-dt103-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/BAJOCARBONO/wl-dt103/door-wl-dt103-blanco-ai.webp",
};

const WL_DT107_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/BAJOCARBONO/wl-dt107/door-wl-dt107-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/BAJOCARBONO/wl-dt107/door-wl-dt107-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/BAJOCARBONO/wl-dt107/door-wl-dt107-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/BAJOCARBONO/wl-dt107/door-wl-dt107-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/BAJOCARBONO/wl-dt107/door-wl-dt107-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/BAJOCARBONO/wl-dt107/door-wl-dt107-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/BAJOCARBONO/wl-dt107/door-wl-dt107-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/BAJOCARBONO/wl-dt107/door-wl-dt107-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/BAJOCARBONO/wl-dt107/door-wl-dt107-blanco-ai.webp",
};

const TDF_2003_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/COBRE/tdf-2003/door-tdf-2003-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/COBRE/tdf-2003/door-tdf-2003-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/COBRE/tdf-2003/door-tdf-2003-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/COBRE/tdf-2003/door-tdf-2003-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/COBRE/tdf-2003/door-tdf-2003-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/COBRE/tdf-2003/door-tdf-2003-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/COBRE/tdf-2003/door-tdf-2003-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/COBRE/tdf-2003/door-tdf-2003-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/COBRE/tdf-2003/door-tdf-2003-blanco-ai.webp",
};

const TDF_2009_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/COBRE/tdf-2009/door-tdf-2009-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/COBRE/tdf-2009/door-tdf-2009-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/COBRE/tdf-2009/door-tdf-2009-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/COBRE/tdf-2009/door-tdf-2009-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/COBRE/tdf-2009/door-tdf-2009-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/COBRE/tdf-2009/door-tdf-2009-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/COBRE/tdf-2009/door-tdf-2009-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/COBRE/tdf-2009/door-tdf-2009-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/COBRE/tdf-2009/door-tdf-2009-blanco-ai.webp",
};

const WL_A23001_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/CORREDIZA/wl-a23001/door-wl-a23001-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/CORREDIZA/wl-a23001/door-wl-a23001-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/CORREDIZA/wl-a23001/door-wl-a23001-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/CORREDIZA/wl-a23001/door-wl-a23001-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/CORREDIZA/wl-a23001/door-wl-a23001-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/CORREDIZA/wl-a23001/door-wl-a23001-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/CORREDIZA/wl-a23001/door-wl-a23001-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/CORREDIZA/wl-a23001/door-wl-a23001-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/CORREDIZA/wl-a23001/door-wl-a23001-blanco-ai.webp",
};

const WL_A23002_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/CORREDIZA/wl-a23002/door-wl-a23002-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/CORREDIZA/wl-a23002/door-wl-a23002-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/CORREDIZA/wl-a23002/door-wl-a23002-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/CORREDIZA/wl-a23002/door-wl-a23002-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/CORREDIZA/wl-a23002/door-wl-a23002-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/CORREDIZA/wl-a23002/door-wl-a23002-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/CORREDIZA/wl-a23002/door-wl-a23002-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/CORREDIZA/wl-a23002/door-wl-a23002-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/CORREDIZA/wl-a23002/door-wl-a23002-blanco-ai.webp",
};

const WL_A23019_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/CORREDIZA/wl-a23019/door-wl-a23019-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/CORREDIZA/wl-a23019/door-wl-a23019-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/CORREDIZA/wl-a23019/door-wl-a23019-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/CORREDIZA/wl-a23019/door-wl-a23019-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/CORREDIZA/wl-a23019/door-wl-a23019-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/CORREDIZA/wl-a23019/door-wl-a23019-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/CORREDIZA/wl-a23019/door-wl-a23019-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/CORREDIZA/wl-a23019/door-wl-a23019-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/CORREDIZA/wl-a23019/door-wl-a23019-blanco-ai.webp",
};

const WL_A23020_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/CORREDIZA/wl-a23020/door-wl-a23020-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/CORREDIZA/wl-a23020/door-wl-a23020-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/CORREDIZA/wl-a23020/door-wl-a23020-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/CORREDIZA/wl-a23020/door-wl-a23020-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/CORREDIZA/wl-a23020/door-wl-a23020-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/CORREDIZA/wl-a23020/door-wl-a23020-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/CORREDIZA/wl-a23020/door-wl-a23020-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/CORREDIZA/wl-a23020/door-wl-a23020-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/CORREDIZA/wl-a23020/door-wl-a23020-blanco-ai.webp",
};

const GD_01_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/CORTAFUEGO/gd-01/door-gd-01-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/CORTAFUEGO/gd-01/door-gd-01-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/CORTAFUEGO/gd-01/door-gd-01-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/CORTAFUEGO/gd-01/door-gd-01-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/CORTAFUEGO/gd-01/door-gd-01-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/CORTAFUEGO/gd-01/door-gd-01-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/CORTAFUEGO/gd-01/door-gd-01-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/CORTAFUEGO/gd-01/door-gd-01-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/CORTAFUEGO/gd-01/door-gd-01-blanco-ai.webp",
};

const GD_02_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/CORTAFUEGO/gd-02/door-gd-02-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/CORTAFUEGO/gd-02/door-gd-02-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/CORTAFUEGO/gd-02/door-gd-02-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/CORTAFUEGO/gd-02/door-gd-02-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/CORTAFUEGO/gd-02/door-gd-02-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/CORTAFUEGO/gd-02/door-gd-02-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/CORTAFUEGO/gd-02/door-gd-02-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/CORTAFUEGO/gd-02/door-gd-02-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/CORTAFUEGO/gd-02/door-gd-02-blanco-ai.webp",
};

const GD_03_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/CORTAFUEGO/gd-03/door-gd-03-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/CORTAFUEGO/gd-03/door-gd-03-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/CORTAFUEGO/gd-03/door-gd-03-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/CORTAFUEGO/gd-03/door-gd-03-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/CORTAFUEGO/gd-03/door-gd-03-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/CORTAFUEGO/gd-03/door-gd-03-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/CORTAFUEGO/gd-03/door-gd-03-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/CORTAFUEGO/gd-03/door-gd-03-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/CORTAFUEGO/gd-03/door-gd-03-blanco-ai.webp",
};

const GF026_FIRE_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/CORTAFUEGO/gf026/door-gf026-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/CORTAFUEGO/gf026/door-gf026-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/CORTAFUEGO/gf026/door-gf026-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/CORTAFUEGO/gf026/door-gf026-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/CORTAFUEGO/gf026/door-gf026-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/CORTAFUEGO/gf026/door-gf026-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/CORTAFUEGO/gf026/door-gf026-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/CORTAFUEGO/gf026/door-gf026-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/CORTAFUEGO/gf026/door-gf026-blanco-ai.webp",
};

const TD_01_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/CORTAFUEGO/td-01/door-td-01-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/CORTAFUEGO/td-01/door-td-01-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/CORTAFUEGO/td-01/door-td-01-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/CORTAFUEGO/td-01/door-td-01-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/CORTAFUEGO/td-01/door-td-01-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/CORTAFUEGO/td-01/door-td-01-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/CORTAFUEGO/td-01/door-td-01-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/CORTAFUEGO/td-01/door-td-01-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/CORTAFUEGO/td-01/door-td-01-blanco-ai.webp",
};

const TD_02_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/CORTAFUEGO/td-02/door-td-02-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/CORTAFUEGO/td-02/door-td-02-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/CORTAFUEGO/td-02/door-td-02-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/CORTAFUEGO/td-02/door-td-02-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/CORTAFUEGO/td-02/door-td-02-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/CORTAFUEGO/td-02/door-td-02-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/CORTAFUEGO/td-02/door-td-02-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/CORTAFUEGO/td-02/door-td-02-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/CORTAFUEGO/td-02/door-td-02-blanco-ai.webp",
};

const TD_03_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/CORTAFUEGO/td-03/door-td-03-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/CORTAFUEGO/td-03/door-td-03-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/CORTAFUEGO/td-03/door-td-03-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/CORTAFUEGO/td-03/door-td-03-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/CORTAFUEGO/td-03/door-td-03-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/CORTAFUEGO/td-03/door-td-03-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/CORTAFUEGO/td-03/door-td-03-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/CORTAFUEGO/td-03/door-td-03-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/CORTAFUEGO/td-03/door-td-03-blanco-ai.webp",
};

const GK_01_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/EVACUACION/gk-01/door-gk-01-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/EVACUACION/gk-01/door-gk-01-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/EVACUACION/gk-01/door-gk-01-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/EVACUACION/gk-01/door-gk-01-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/EVACUACION/gk-01/door-gk-01-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/EVACUACION/gk-01/door-gk-01-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/EVACUACION/gk-01/door-gk-01-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/EVACUACION/gk-01/door-gk-01-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/EVACUACION/gk-01/door-gk-01-blanco-ai.webp",
};

const GK_02_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/EVACUACION/gk-02/door-gk-02-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/EVACUACION/gk-02/door-gk-02-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/EVACUACION/gk-02/door-gk-02-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/EVACUACION/gk-02/door-gk-02-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/EVACUACION/gk-02/door-gk-02-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/EVACUACION/gk-02/door-gk-02-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/EVACUACION/gk-02/door-gk-02-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/EVACUACION/gk-02/door-gk-02-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/EVACUACION/gk-02/door-gk-02-blanco-ai.webp",
};

const GK_03_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/EVACUACION/gk-03/door-gk-03-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/EVACUACION/gk-03/door-gk-03-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/EVACUACION/gk-03/door-gk-03-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/EVACUACION/gk-03/door-gk-03-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/EVACUACION/gk-03/door-gk-03-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/EVACUACION/gk-03/door-gk-03-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/EVACUACION/gk-03/door-gk-03-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/EVACUACION/gk-03/door-gk-03-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/EVACUACION/gk-03/door-gk-03-blanco-ai.webp",
};

const MK_01_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/EVACUACION/mk-01/door-mk-01-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/EVACUACION/mk-01/door-mk-01-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/EVACUACION/mk-01/door-mk-01-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/EVACUACION/mk-01/door-mk-01-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/EVACUACION/mk-01/door-mk-01-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/EVACUACION/mk-01/door-mk-01-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/EVACUACION/mk-01/door-mk-01-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/EVACUACION/mk-01/door-mk-01-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/EVACUACION/mk-01/door-mk-01-blanco-ai.webp",
};

const MK_02_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/EVACUACION/mk-02/door-mk-02-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/EVACUACION/mk-02/door-mk-02-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/EVACUACION/mk-02/door-mk-02-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/EVACUACION/mk-02/door-mk-02-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/EVACUACION/mk-02/door-mk-02-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/EVACUACION/mk-02/door-mk-02-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/EVACUACION/mk-02/door-mk-02-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/EVACUACION/mk-02/door-mk-02-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/EVACUACION/mk-02/door-mk-02-blanco-ai.webp",
};

const MK_03_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/EVACUACION/mk-03/door-mk-03-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/EVACUACION/mk-03/door-mk-03-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/EVACUACION/mk-03/door-mk-03-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/EVACUACION/mk-03/door-mk-03-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/EVACUACION/mk-03/door-mk-03-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/EVACUACION/mk-03/door-mk-03-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/EVACUACION/mk-03/door-mk-03-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/EVACUACION/mk-03/door-mk-03-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/EVACUACION/mk-03/door-mk-03-blanco-ai.webp",
};

const MADERA_ACUSTICA_5203_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/5203/door-5203-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/5203/door-5203-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/5203/door-5203-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/5203/door-5203-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/5203/door-5203-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/5203/door-5203-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/5203/door-5203-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/5203/door-5203-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/5203/door-5203-blanco-ai.webp",
};

const MADERA_ACUSTICA_S203_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/s203/door-s203-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/s203/door-s203-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/s203/door-s203-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/s203/door-s203-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/s203/door-s203-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/s203/door-s203-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/s203/door-s203-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/s203/door-s203-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/s203/door-s203-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_5103_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-5103/door-wl-5103-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-5103/door-wl-5103-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-5103/door-wl-5103-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-5103/door-wl-5103-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-5103/door-wl-5103-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-5103/door-wl-5103-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-5103/door-wl-5103-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-5103/door-wl-5103-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-5103/door-wl-5103-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_5105_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-5105/door-wl-5105-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-5105/door-wl-5105-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-5105/door-wl-5105-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-5105/door-wl-5105-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-5105/door-wl-5105-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-5105/door-wl-5105-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-5105/door-wl-5105-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-5105/door-wl-5105-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-5105/door-wl-5105-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_5107_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-5107/door-wl-5107-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-5107/door-wl-5107-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-5107/door-wl-5107-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-5107/door-wl-5107-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-5107/door-wl-5107-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-5107/door-wl-5107-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-5107/door-wl-5107-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-5107/door-wl-5107-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-5107/door-wl-5107-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_5109_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-5109/door-wl-5109-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-5109/door-wl-5109-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-5109/door-wl-5109-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-5109/door-wl-5109-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-5109/door-wl-5109-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-5109/door-wl-5109-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-5109/door-wl-5109-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-5109/door-wl-5109-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-5109/door-wl-5109-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_5110_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-5110/door-wl-5110-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-5110/door-wl-5110-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-5110/door-wl-5110-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-5110/door-wl-5110-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-5110/door-wl-5110-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-5110/door-wl-5110-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-5110/door-wl-5110-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-5110/door-wl-5110-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-5110/door-wl-5110-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_5117_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-5117/door-wl-5117-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-5117/door-wl-5117-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-5117/door-wl-5117-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-5117/door-wl-5117-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-5117/door-wl-5117-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-5117/door-wl-5117-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-5117/door-wl-5117-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-5117/door-wl-5117-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-5117/door-wl-5117-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_5203_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-5203/door-wl-5203-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-5203/door-wl-5203-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-5203/door-wl-5203-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-5203/door-wl-5203-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-5203/door-wl-5203-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-5203/door-wl-5203-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-5203/door-wl-5203-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-5203/door-wl-5203-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-5203/door-wl-5203-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_5503_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-5503/door-wl-5503-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-5503/door-wl-5503-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-5503/door-wl-5503-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-5503/door-wl-5503-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-5503/door-wl-5503-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-5503/door-wl-5503-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-5503/door-wl-5503-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-5503/door-wl-5503-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-5503/door-wl-5503-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D001_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d001/door-wl-d001-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d001/door-wl-d001-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d001/door-wl-d001-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d001/door-wl-d001-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d001/door-wl-d001-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d001/door-wl-d001-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d001/door-wl-d001-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d001/door-wl-d001-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d001/door-wl-d001-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D002_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d002/door-wl-d002-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d002/door-wl-d002-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d002/door-wl-d002-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d002/door-wl-d002-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d002/door-wl-d002-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d002/door-wl-d002-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d002/door-wl-d002-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d002/door-wl-d002-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d002/door-wl-d002-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D003_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d003/door-wl-d003-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d003/door-wl-d003-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d003/door-wl-d003-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d003/door-wl-d003-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d003/door-wl-d003-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d003/door-wl-d003-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d003/door-wl-d003-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d003/door-wl-d003-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d003/door-wl-d003-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D005_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d005/door-wl-d005-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d005/door-wl-d005-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d005/door-wl-d005-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d005/door-wl-d005-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d005/door-wl-d005-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d005/door-wl-d005-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d005/door-wl-d005-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d005/door-wl-d005-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d005/door-wl-d005-blanco-ai.webp",
};


const MADERA_ACUSTICA_WL_D006_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d006/door-wl-d006-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d006/door-wl-d006-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d006/door-wl-d006-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d006/door-wl-d006-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d006/door-wl-d006-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d006/door-wl-d006-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d006/door-wl-d006-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d006/door-wl-d006-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d006/door-wl-d006-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D007_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d007/door-wl-d007-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d007/door-wl-d007-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d007/door-wl-d007-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d007/door-wl-d007-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d007/door-wl-d007-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d007/door-wl-d007-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d007/door-wl-d007-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d007/door-wl-d007-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d007/door-wl-d007-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D008_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d008/door-wl-d008-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d008/door-wl-d008-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d008/door-wl-d008-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d008/door-wl-d008-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d008/door-wl-d008-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d008/door-wl-d008-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d008/door-wl-d008-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d008/door-wl-d008-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d008/door-wl-d008-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D009_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d009/door-wl-d009-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d009/door-wl-d009-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d009/door-wl-d009-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d009/door-wl-d009-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d009/door-wl-d009-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d009/door-wl-d009-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d009/door-wl-d009-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d009/door-wl-d009-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d009/door-wl-d009-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D010_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d010/door-wl-d010-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d010/door-wl-d010-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d010/door-wl-d010-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d010/door-wl-d010-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d010/door-wl-d010-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d010/door-wl-d010-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d010/door-wl-d010-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d010/door-wl-d010-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d010/door-wl-d010-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D011_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d011/door-wl-d011-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d011/door-wl-d011-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d011/door-wl-d011-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d011/door-wl-d011-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d011/door-wl-d011-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d011/door-wl-d011-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d011/door-wl-d011-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d011/door-wl-d011-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d011/door-wl-d011-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D012_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d012/door-wl-d012-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d012/door-wl-d012-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d012/door-wl-d012-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d012/door-wl-d012-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d012/door-wl-d012-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d012/door-wl-d012-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d012/door-wl-d012-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d012/door-wl-d012-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d012/door-wl-d012-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D013_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d013/door-wl-d013-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d013/door-wl-d013-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d013/door-wl-d013-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d013/door-wl-d013-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d013/door-wl-d013-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d013/door-wl-d013-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d013/door-wl-d013-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d013/door-wl-d013-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d013/door-wl-d013-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D015_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d015/door-wl-d015-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d015/door-wl-d015-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d015/door-wl-d015-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d015/door-wl-d015-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d015/door-wl-d015-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d015/door-wl-d015-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d015/door-wl-d015-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d015/door-wl-d015-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d015/door-wl-d015-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D016_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d016/door-wl-d016-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d016/door-wl-d016-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d016/door-wl-d016-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d016/door-wl-d016-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d016/door-wl-d016-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d016/door-wl-d016-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d016/door-wl-d016-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d016/door-wl-d016-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d016/door-wl-d016-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D017_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d017/door-wl-d017-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d017/door-wl-d017-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d017/door-wl-d017-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d017/door-wl-d017-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d017/door-wl-d017-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d017/door-wl-d017-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d017/door-wl-d017-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d017/door-wl-d017-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d017/door-wl-d017-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D018_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d018/door-wl-d018-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d018/door-wl-d018-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d018/door-wl-d018-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d018/door-wl-d018-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d018/door-wl-d018-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d018/door-wl-d018-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d018/door-wl-d018-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d018/door-wl-d018-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d018/door-wl-d018-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D019_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d019/door-wl-d019-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d019/door-wl-d019-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d019/door-wl-d019-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d019/door-wl-d019-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d019/door-wl-d019-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d019/door-wl-d019-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d019/door-wl-d019-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d019/door-wl-d019-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d019/door-wl-d019-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D020_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d020/door-wl-d020-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d020/door-wl-d020-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d020/door-wl-d020-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d020/door-wl-d020-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d020/door-wl-d020-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d020/door-wl-d020-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d020/door-wl-d020-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d020/door-wl-d020-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d020/door-wl-d020-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D021_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d021/door-wl-d021-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d021/door-wl-d021-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d021/door-wl-d021-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d021/door-wl-d021-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d021/door-wl-d021-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d021/door-wl-d021-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d021/door-wl-d021-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d021/door-wl-d021-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d021/door-wl-d021-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D022_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d022/door-wl-d022-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d022/door-wl-d022-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d022/door-wl-d022-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d022/door-wl-d022-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d022/door-wl-d022-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d022/door-wl-d022-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d022/door-wl-d022-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d022/door-wl-d022-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d022/door-wl-d022-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D023_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d023/door-wl-d023-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d023/door-wl-d023-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d023/door-wl-d023-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d023/door-wl-d023-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d023/door-wl-d023-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d023/door-wl-d023-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d023/door-wl-d023-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d023/door-wl-d023-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d023/door-wl-d023-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D025_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d025/door-wl-d025-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d025/door-wl-d025-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d025/door-wl-d025-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d025/door-wl-d025-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d025/door-wl-d025-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d025/door-wl-d025-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d025/door-wl-d025-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d025/door-wl-d025-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d025/door-wl-d025-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D026_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d026/door-wl-d026-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d026/door-wl-d026-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d026/door-wl-d026-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d026/door-wl-d026-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d026/door-wl-d026-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d026/door-wl-d026-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d026/door-wl-d026-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d026/door-wl-d026-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d026/door-wl-d026-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D027_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d027/door-wl-d027-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d027/door-wl-d027-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d027/door-wl-d027-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d027/door-wl-d027-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d027/door-wl-d027-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d027/door-wl-d027-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d027/door-wl-d027-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d027/door-wl-d027-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d027/door-wl-d027-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D028_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d028/door-wl-d028-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d028/door-wl-d028-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d028/door-wl-d028-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d028/door-wl-d028-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d028/door-wl-d028-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d028/door-wl-d028-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d028/door-wl-d028-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d028/door-wl-d028-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d028/door-wl-d028-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D029_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d029/door-wl-d029-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d029/door-wl-d029-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d029/door-wl-d029-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d029/door-wl-d029-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d029/door-wl-d029-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d029/door-wl-d029-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d029/door-wl-d029-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d029/door-wl-d029-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d029/door-wl-d029-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D030_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d030/door-wl-d030-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d030/door-wl-d030-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d030/door-wl-d030-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d030/door-wl-d030-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d030/door-wl-d030-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d030/door-wl-d030-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d030/door-wl-d030-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d030/door-wl-d030-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d030/door-wl-d030-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D031_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d031/door-wl-d031-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d031/door-wl-d031-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d031/door-wl-d031-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d031/door-wl-d031-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d031/door-wl-d031-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d031/door-wl-d031-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d031/door-wl-d031-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d031/door-wl-d031-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d031/door-wl-d031-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D032_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d032/door-wl-d032-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d032/door-wl-d032-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d032/door-wl-d032-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d032/door-wl-d032-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d032/door-wl-d032-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d032/door-wl-d032-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d032/door-wl-d032-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d032/door-wl-d032-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d032/door-wl-d032-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D033_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d033/door-wl-d033-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d033/door-wl-d033-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d033/door-wl-d033-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d033/door-wl-d033-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d033/door-wl-d033-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d033/door-wl-d033-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d033/door-wl-d033-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d033/door-wl-d033-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d033/door-wl-d033-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D036_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d036/door-wl-d036-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d036/door-wl-d036-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d036/door-wl-d036-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d036/door-wl-d036-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d036/door-wl-d036-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d036/door-wl-d036-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d036/door-wl-d036-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d036/door-wl-d036-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d036/door-wl-d036-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D037_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d037/door-wl-d037-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d037/door-wl-d037-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d037/door-wl-d037-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d037/door-wl-d037-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d037/door-wl-d037-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d037/door-wl-d037-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d037/door-wl-d037-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d037/door-wl-d037-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d037/door-wl-d037-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_D038_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-d038/door-wl-d038-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-d038/door-wl-d038-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-d038/door-wl-d038-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-d038/door-wl-d038-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-d038/door-wl-d038-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-d038/door-wl-d038-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-d038/door-wl-d038-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-d038/door-wl-d038-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-d038/door-wl-d038-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_J001_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-j001/door-wl-j001-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-j001/door-wl-j001-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-j001/door-wl-j001-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-j001/door-wl-j001-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-j001/door-wl-j001-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-j001/door-wl-j001-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-j001/door-wl-j001-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-j001/door-wl-j001-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-j001/door-wl-j001-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_J002_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-j002/door-wl-j002-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-j002/door-wl-j002-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-j002/door-wl-j002-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-j002/door-wl-j002-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-j002/door-wl-j002-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-j002/door-wl-j002-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-j002/door-wl-j002-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-j002/door-wl-j002-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-j002/door-wl-j002-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_J003_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-j003/door-wl-j003-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-j003/door-wl-j003-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-j003/door-wl-j003-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-j003/door-wl-j003-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-j003/door-wl-j003-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-j003/door-wl-j003-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-j003/door-wl-j003-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-j003/door-wl-j003-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-j003/door-wl-j003-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_J005_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-j005/door-wl-j005-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-j005/door-wl-j005-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-j005/door-wl-j005-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-j005/door-wl-j005-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-j005/door-wl-j005-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-j005/door-wl-j005-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-j005/door-wl-j005-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-j005/door-wl-j005-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-j005/door-wl-j005-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_J006_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-j006/door-wl-j006-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-j006/door-wl-j006-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-j006/door-wl-j006-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-j006/door-wl-j006-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-j006/door-wl-j006-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-j006/door-wl-j006-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-j006/door-wl-j006-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-j006/door-wl-j006-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-j006/door-wl-j006-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_J008_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-j008/door-wl-j008-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-j008/door-wl-j008-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-j008/door-wl-j008-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-j008/door-wl-j008-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-j008/door-wl-j008-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-j008/door-wl-j008-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-j008/door-wl-j008-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-j008/door-wl-j008-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-j008/door-wl-j008-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_J009_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-j009/door-wl-j009-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-j009/door-wl-j009-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-j009/door-wl-j009-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-j009/door-wl-j009-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-j009/door-wl-j009-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-j009/door-wl-j009-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-j009/door-wl-j009-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-j009/door-wl-j009-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-j009/door-wl-j009-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_J010_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-j010/door-wl-j010-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-j010/door-wl-j010-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-j010/door-wl-j010-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-j010/door-wl-j010-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-j010/door-wl-j010-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-j010/door-wl-j010-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-j010/door-wl-j010-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-j010/door-wl-j010-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-j010/door-wl-j010-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_J011_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-j011/door-wl-j011-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-j011/door-wl-j011-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-j011/door-wl-j011-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-j011/door-wl-j011-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-j011/door-wl-j011-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-j011/door-wl-j011-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-j011/door-wl-j011-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-j011/door-wl-j011-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-j011/door-wl-j011-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_J012_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-j012/door-wl-j012-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-j012/door-wl-j012-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-j012/door-wl-j012-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-j012/door-wl-j012-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-j012/door-wl-j012-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-j012/door-wl-j012-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-j012/door-wl-j012-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-j012/door-wl-j012-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-j012/door-wl-j012-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S001_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s001/door-wl-s001-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s001/door-wl-s001-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s001/door-wl-s001-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s001/door-wl-s001-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s001/door-wl-s001-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s001/door-wl-s001-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s001/door-wl-s001-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s001/door-wl-s001-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s001/door-wl-s001-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S002_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s002/door-wl-s002-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s002/door-wl-s002-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s002/door-wl-s002-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s002/door-wl-s002-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s002/door-wl-s002-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s002/door-wl-s002-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s002/door-wl-s002-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s002/door-wl-s002-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s002/door-wl-s002-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S003_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s003/door-wl-s003-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s003/door-wl-s003-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s003/door-wl-s003-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s003/door-wl-s003-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s003/door-wl-s003-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s003/door-wl-s003-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s003/door-wl-s003-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s003/door-wl-s003-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s003/door-wl-s003-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S005_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s005/door-wl-s005-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s005/door-wl-s005-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s005/door-wl-s005-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s005/door-wl-s005-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s005/door-wl-s005-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s005/door-wl-s005-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s005/door-wl-s005-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s005/door-wl-s005-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s005/door-wl-s005-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S008_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s008/door-wl-s008-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s008/door-wl-s008-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s008/door-wl-s008-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s008/door-wl-s008-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s008/door-wl-s008-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s008/door-wl-s008-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s008/door-wl-s008-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s008/door-wl-s008-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s008/door-wl-s008-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S009_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s009/door-wl-s009-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s009/door-wl-s009-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s009/door-wl-s009-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s009/door-wl-s009-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s009/door-wl-s009-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s009/door-wl-s009-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s009/door-wl-s009-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s009/door-wl-s009-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s009/door-wl-s009-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S010_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s010/door-wl-s010-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s010/door-wl-s010-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s010/door-wl-s010-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s010/door-wl-s010-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s010/door-wl-s010-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s010/door-wl-s010-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s010/door-wl-s010-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s010/door-wl-s010-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s010/door-wl-s010-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S011_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s011/door-wl-s011-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s011/door-wl-s011-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s011/door-wl-s011-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s011/door-wl-s011-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s011/door-wl-s011-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s011/door-wl-s011-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s011/door-wl-s011-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s011/door-wl-s011-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s011/door-wl-s011-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S012_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s012/door-wl-s012-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s012/door-wl-s012-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s012/door-wl-s012-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s012/door-wl-s012-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s012/door-wl-s012-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s012/door-wl-s012-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s012/door-wl-s012-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s012/door-wl-s012-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s012/door-wl-s012-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S013_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s013/door-wl-s013-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s013/door-wl-s013-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s013/door-wl-s013-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s013/door-wl-s013-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s013/door-wl-s013-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s013/door-wl-s013-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s013/door-wl-s013-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s013/door-wl-s013-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s013/door-wl-s013-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S015_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s015/door-wl-s015-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s015/door-wl-s015-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s015/door-wl-s015-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s015/door-wl-s015-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s015/door-wl-s015-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s015/door-wl-s015-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s015/door-wl-s015-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s015/door-wl-s015-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s015/door-wl-s015-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S016_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s016/door-wl-s016-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s016/door-wl-s016-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s016/door-wl-s016-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s016/door-wl-s016-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s016/door-wl-s016-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s016/door-wl-s016-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s016/door-wl-s016-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s016/door-wl-s016-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s016/door-wl-s016-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S017_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s017/door-wl-s017-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s017/door-wl-s017-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s017/door-wl-s017-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s017/door-wl-s017-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s017/door-wl-s017-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s017/door-wl-s017-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s017/door-wl-s017-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s017/door-wl-s017-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s017/door-wl-s017-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S019_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s019/door-wl-s019-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s019/door-wl-s019-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s019/door-wl-s019-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s019/door-wl-s019-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s019/door-wl-s019-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s019/door-wl-s019-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s019/door-wl-s019-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s019/door-wl-s019-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s019/door-wl-s019-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S020_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s020/door-wl-s020-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s020/door-wl-s020-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s020/door-wl-s020-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s020/door-wl-s020-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s020/door-wl-s020-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s020/door-wl-s020-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s020/door-wl-s020-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s020/door-wl-s020-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s020/door-wl-s020-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S021_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s021/door-wl-s021-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s021/door-wl-s021-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s021/door-wl-s021-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s021/door-wl-s021-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s021/door-wl-s021-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s021/door-wl-s021-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s021/door-wl-s021-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s021/door-wl-s021-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s021/door-wl-s021-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S022_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s022/door-wl-s022-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s022/door-wl-s022-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s022/door-wl-s022-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s022/door-wl-s022-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s022/door-wl-s022-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s022/door-wl-s022-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s022/door-wl-s022-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s022/door-wl-s022-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s022/door-wl-s022-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S023_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s023/door-wl-s023-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s023/door-wl-s023-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s023/door-wl-s023-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s023/door-wl-s023-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s023/door-wl-s023-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s023/door-wl-s023-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s023/door-wl-s023-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s023/door-wl-s023-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s023/door-wl-s023-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S025_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s025/door-wl-s025-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s025/door-wl-s025-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s025/door-wl-s025-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s025/door-wl-s025-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s025/door-wl-s025-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s025/door-wl-s025-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s025/door-wl-s025-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s025/door-wl-s025-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s025/door-wl-s025-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S026_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s026/door-wl-s026-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s026/door-wl-s026-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s026/door-wl-s026-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s026/door-wl-s026-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s026/door-wl-s026-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s026/door-wl-s026-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s026/door-wl-s026-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s026/door-wl-s026-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s026/door-wl-s026-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S027_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s027/door-wl-s027-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s027/door-wl-s027-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s027/door-wl-s027-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s027/door-wl-s027-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s027/door-wl-s027-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s027/door-wl-s027-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s027/door-wl-s027-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s027/door-wl-s027-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s027/door-wl-s027-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S101B_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s101b/door-wl-s101b-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s101b/door-wl-s101b-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s101b/door-wl-s101b-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s101b/door-wl-s101b-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s101b/door-wl-s101b-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s101b/door-wl-s101b-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s101b/door-wl-s101b-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s101b/door-wl-s101b-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s101b/door-wl-s101b-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S102B_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s102b/door-wl-s102b-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s102b/door-wl-s102b-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s102b/door-wl-s102b-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s102b/door-wl-s102b-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s102b/door-wl-s102b-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s102b/door-wl-s102b-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s102b/door-wl-s102b-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s102b/door-wl-s102b-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s102b/door-wl-s102b-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S103B_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s103b/door-wl-s103b-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s103b/door-wl-s103b-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s103b/door-wl-s103b-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s103b/door-wl-s103b-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s103b/door-wl-s103b-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s103b/door-wl-s103b-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s103b/door-wl-s103b-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s103b/door-wl-s103b-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s103b/door-wl-s103b-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S108_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s108/door-wl-s108-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s108/door-wl-s108-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s108/door-wl-s108-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s108/door-wl-s108-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s108/door-wl-s108-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s108/door-wl-s108-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s108/door-wl-s108-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s108/door-wl-s108-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s108/door-wl-s108-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S201_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s201/door-wl-s201-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s201/door-wl-s201-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s201/door-wl-s201-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s201/door-wl-s201-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s201/door-wl-s201-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s201/door-wl-s201-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s201/door-wl-s201-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s201/door-wl-s201-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s201/door-wl-s201-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S205_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s205/door-wl-s205-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s205/door-wl-s205-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s205/door-wl-s205-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s205/door-wl-s205-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s205/door-wl-s205-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s205/door-wl-s205-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s205/door-wl-s205-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s205/door-wl-s205-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s205/door-wl-s205-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S206_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s206/door-wl-s206-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s206/door-wl-s206-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s206/door-wl-s206-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s206/door-wl-s206-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s206/door-wl-s206-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s206/door-wl-s206-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s206/door-wl-s206-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s206/door-wl-s206-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s206/door-wl-s206-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S207_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s207/door-wl-s207-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s207/door-wl-s207-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s207/door-wl-s207-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s207/door-wl-s207-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s207/door-wl-s207-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s207/door-wl-s207-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s207/door-wl-s207-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s207/door-wl-s207-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s207/door-wl-s207-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S208_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s208/door-wl-s208-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s208/door-wl-s208-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s208/door-wl-s208-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s208/door-wl-s208-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s208/door-wl-s208-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s208/door-wl-s208-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s208/door-wl-s208-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s208/door-wl-s208-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s208/door-wl-s208-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S209_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s209/door-wl-s209-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s209/door-wl-s209-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s209/door-wl-s209-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s209/door-wl-s209-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s209/door-wl-s209-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s209/door-wl-s209-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s209/door-wl-s209-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s209/door-wl-s209-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s209/door-wl-s209-blanco-ai.webp",
};

const MADERA_ACUSTICA_WL_S210_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/MADERAACÚSTICA/wl-s210/door-wl-s210-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/MADERAACÚSTICA/wl-s210/door-wl-s210-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/MADERAACÚSTICA/wl-s210/door-wl-s210-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/MADERAACÚSTICA/wl-s210/door-wl-s210-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/MADERAACÚSTICA/wl-s210/door-wl-s210-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/MADERAACÚSTICA/wl-s210/door-wl-s210-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/MADERAACÚSTICA/wl-s210/door-wl-s210-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/MADERAACÚSTICA/wl-s210/door-wl-s210-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/MADERAACÚSTICA/wl-s210/door-wl-s210-blanco-ai.webp",
};

const PVC_WL_P001_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p001/door-wl-p001-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p001/door-wl-p001-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p001/door-wl-p001-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p001/door-wl-p001-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p001/door-wl-p001-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p001/door-wl-p001-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p001/door-wl-p001-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p001/door-wl-p001-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p001/door-wl-p001-blanco-ai.webp",
};

const PVC_WL_P002_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p002/door-wl-p002-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p002/door-wl-p002-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p002/door-wl-p002-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p002/door-wl-p002-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p002/door-wl-p002-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p002/door-wl-p002-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p002/door-wl-p002-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p002/door-wl-p002-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p002/door-wl-p002-blanco-ai.webp",
};

const PVC_WL_P003_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p003/door-wl-p003-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p003/door-wl-p003-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p003/door-wl-p003-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p003/door-wl-p003-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p003/door-wl-p003-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p003/door-wl-p003-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p003/door-wl-p003-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p003/door-wl-p003-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p003/door-wl-p003-blanco-ai.webp",
};

const PVC_WL_P005_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p005/door-wl-p005-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p005/door-wl-p005-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p005/door-wl-p005-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p005/door-wl-p005-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p005/door-wl-p005-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p005/door-wl-p005-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p005/door-wl-p005-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p005/door-wl-p005-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p005/door-wl-p005-blanco-ai.webp",
};

const PVC_WL_P006_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p006/door-wl-p006-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p006/door-wl-p006-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p006/door-wl-p006-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p006/door-wl-p006-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p006/door-wl-p006-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p006/door-wl-p006-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p006/door-wl-p006-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p006/door-wl-p006-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p006/door-wl-p006-blanco-ai.webp",
};

const PVC_WL_P007_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p007/door-wl-p007-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p007/door-wl-p007-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p007/door-wl-p007-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p007/door-wl-p007-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p007/door-wl-p007-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p007/door-wl-p007-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p007/door-wl-p007-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p007/door-wl-p007-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p007/door-wl-p007-blanco-ai.webp",
};

const PVC_WL_P008_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p008/door-wl-p008-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p008/door-wl-p008-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p008/door-wl-p008-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p008/door-wl-p008-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p008/door-wl-p008-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p008/door-wl-p008-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p008/door-wl-p008-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p008/door-wl-p008-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p008/door-wl-p008-blanco-ai.webp",
};

const PVC_WL_P009_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p009/door-wl-p009-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p009/door-wl-p009-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p009/door-wl-p009-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p009/door-wl-p009-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p009/door-wl-p009-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p009/door-wl-p009-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p009/door-wl-p009-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p009/door-wl-p009-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p009/door-wl-p009-blanco-ai.webp",
};

const PVC_WL_P010_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p010/door-wl-p010-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p010/door-wl-p010-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p010/door-wl-p010-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p010/door-wl-p010-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p010/door-wl-p010-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p010/door-wl-p010-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p010/door-wl-p010-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p010/door-wl-p010-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p010/door-wl-p010-blanco-ai.webp",
};

const PVC_WL_P011_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p011/door-wl-p011-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p011/door-wl-p011-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p011/door-wl-p011-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p011/door-wl-p011-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p011/door-wl-p011-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p011/door-wl-p011-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p011/door-wl-p011-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p011/door-wl-p011-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p011/door-wl-p011-blanco-ai.webp",
};

const PVC_WL_P015_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p015/door-wl-p015-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p015/door-wl-p015-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p015/door-wl-p015-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p015/door-wl-p015-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p015/door-wl-p015-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p015/door-wl-p015-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p015/door-wl-p015-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p015/door-wl-p015-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p015/door-wl-p015-blanco-ai.webp",
};

const PVC_WL_P016_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p016/door-wl-p016-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p016/door-wl-p016-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p016/door-wl-p016-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p016/door-wl-p016-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p016/door-wl-p016-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p016/door-wl-p016-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p016/door-wl-p016-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p016/door-wl-p016-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p016/door-wl-p016-blanco-ai.webp",
};

const PVC_WL_P201_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/PVC/wl-p201/door-wl-p201-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/PVC/wl-p201/door-wl-p201-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/PVC/wl-p201/door-wl-p201-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/PVC/wl-p201/door-wl-p201-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/PVC/wl-p201/door-wl-p201-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/PVC/wl-p201/door-wl-p201-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/PVC/wl-p201/door-wl-p201-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/PVC/wl-p201/door-wl-p201-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/PVC/wl-p201/door-wl-p201-blanco-ai.webp",
};

const AI_VARIANTS_BY_PRODUCT = {
  "door-x70-shunliu": X70_SHUNLIU_AI_VARIANTS,
  "door-x70-jinxiu": X70_JINXIU_AI_VARIANTS,
  "door-x60": X60_AI_VARIANTS,
  "door-x60-max": X60_MAX_AI_VARIANTS,
  "door-x60-pro": X60_PRO_AI_VARIANTS,
  "door-x50-max": X50_MAX_AI_VARIANTS,
  "door-x50-pro": X50_PRO_AI_VARIANTS,
  "door-x50": X50_AI_VARIANTS,
  "door-k300-max": K300_MAX_AI_VARIANTS,
  "door-k300-pro": K300_PRO_AI_VARIANTS,
  "door-l5857": L5857_AI_VARIANTS,
  "door-l5859": L5859_AI_VARIANTS,
  "door-p101-ia": P101_AI_VARIANTS,
  "door-p102-ia": P102_AI_VARIANTS,
  "door-p105-ia": P105_AI_VARIANTS,
  "door-p107-ia": P107_AI_VARIANTS,
  "door-t200": T200_AI_VARIANTS,
  "door-p103": P103_AI_VARIANTS,
  "door-p106": P106_AI_VARIANTS,
  "door-p108": P108_AI_VARIANTS,
  "door-s108": S108_AI_VARIANTS,
  "door-s108-pro": S108_PRO_AI_VARIANTS,
  "door-s116": S116_AI_VARIANTS,
  "door-s118": S118_AI_VARIANTS,
  "door-s119": S119_AI_VARIANTS,
  "door-s121": S121_AI_VARIANTS,
  "door-y106": Y106_AI_VARIANTS,
  "door-y116": Y116_AI_VARIANTS,
  "door-y118": Y118_AI_VARIANTS,
  "door-y119": Y119_AI_VARIANTS,
  "door-cj03": CJ03_AI_VARIANTS,
  "door-cl058": CL058_AI_VARIANTS,
  "door-cl097-pro": CL097_PRO_AI_VARIANTS,
  "door-cl23": CL23_AI_VARIANTS,
  "door-cl36": CL36_AI_VARIANTS,
  "door-cl37": CL37_AI_VARIANTS,
  "door-cl38": CL38_AI_VARIANTS,
  "door-cl39": CL39_AI_VARIANTS,
  "door-cl50": CL50_AI_VARIANTS,
  "door-cl51": CL51_AI_VARIANTS,
  "door-cl55": CL55_AI_VARIANTS,
  "door-cl56": CL56_AI_VARIANTS,
  "door-cl59": CL59_AI_VARIANTS,
  "door-cl60": CL60_AI_VARIANTS,
  "door-cl62": CL62_AI_VARIANTS,
  "door-cl63": CL63_AI_VARIANTS,
  "door-cl65": CL65_AI_VARIANTS,
  "door-cl66": CL66_AI_VARIANTS,
  "door-cl72": CL72_AI_VARIANTS,
  "door-cl96": CL96_AI_VARIANTS,
  "door-contemporary": CONTEMPORARY_AI_VARIANTS,
  "door-gf061": GF061_AI_VARIANTS,
  "door-gf090": GF090_AI_VARIANTS,
  "door-gf091": GF091_AI_VARIANTS,
  "door-gf092": GF092_AI_VARIANTS,
  "door-gl083": GL083_AI_VARIANTS,
  "door-gl097-pro": GL097_PRO_AI_VARIANTS,
  "door-gl097": GL097_AI_VARIANTS,
  "door-gl098-pro": GL098_PRO_AI_VARIANTS,
  "door-gl098": GL098_AI_VARIANTS,
  "door-gl099": GL099_AI_VARIANTS,
  "door-gl123-1": GL123_1_AI_VARIANTS,
  "door-gl23": GL23_AI_VARIANTS,
  "door-glory-pro": GLORY_PRO_AI_VARIANTS,
  "door-glory": GLORY_AI_VARIANTS,
  "door-jd073": JD073_AI_VARIANTS,
  "door-l5601": L5601_AI_VARIANTS,
  "door-lingan": LINGAN_AI_VARIANTS,
  "door-mid-night": MID_NIGHT_AI_VARIANTS,
  "door-n9518": N9518_AI_VARIANTS,
  "door-n9519": N9519_AI_VARIANTS,
  "door-n9520": N9520_AI_VARIANTS,
  "door-nc9020": NC9020_AI_VARIANTS,
  "door-nc9516": NC9516_AI_VARIANTS,
  "door-p101": P101_AI_VARIANTS,
  "door-p102": P102_AI_VARIANTS,
  "door-p105": P105_AI_VARIANTS,
  "door-p107": P107_AI_VARIANTS,
  "door-s101": S101_AI_VARIANTS,
  "door-wl001": WL001_AI_VARIANTS,
  "door-wl002": WL002_AI_VARIANTS,
  "door-wl003": WL003_AI_VARIANTS,
  "door-wl005": WL005_AI_VARIANTS,
  "door-wl006": WL006_AI_VARIANTS,
  "door-wl007": WL007_AI_VARIANTS,
  "door-wl008": WL008_AI_VARIANTS,
  "door-wl009": WL009_AI_VARIANTS,
  "door-wl010": WL010_AI_VARIANTS,
  "door-wl011": WL011_AI_VARIANTS,
  "door-wl012": WL012_AI_VARIANTS,
  "door-wl013": WL013_AI_VARIANTS,
  "door-wl015": WL015_AI_VARIANTS,
  "door-wl016": WL016_AI_VARIANTS,
  "door-wl017": WL017_AI_VARIANTS,
  "door-wl018": WL018_AI_VARIANTS,
  "door-wl019": WL019_AI_VARIANTS,
  "door-wl020": WL020_AI_VARIANTS,
  "door-wl021": WL021_AI_VARIANTS,
  "door-wl022": WL022_AI_VARIANTS,
  "door-wl023": WL023_AI_VARIANTS,
  "door-wl025": WL025_AI_VARIANTS,
  "door-wl026": WL026_AI_VARIANTS,
  "door-wl027": WL027_AI_VARIANTS,
  "door-wl028": WL028_AI_VARIANTS,
  "door-wl029": WL029_AI_VARIANTS,
  "door-castle": CASTLE_AI_VARIANTS,
  "door-chaohe": CHAOHE_AI_VARIANTS,
  "door-chaoling": CHAOLING_AI_VARIANTS,
  "door-chaopu": CHAOPU_AI_VARIANTS,
  "door-chaose": CHAOSE_AI_VARIANTS,
  "door-dihua": DIHUA_AI_VARIANTS,
  "door-dongseliunian": DONGSELIUNIAN_AI_VARIANTS,
  "door-heidelberg": HEIDELBERG_AI_VARIANTS,
  "door-jinghong": JINGHONG_AI_VARIANTS,
  "door-lange": LANGE_AI_VARIANTS,
  "door-louis": LOUIS_AI_VARIANTS,
  "door-luyi": LUYI_AI_VARIANTS,
  "door-makailen": MAKAILEN_AI_VARIANTS,
  "door-mingmenguizu": MINGMENGUIZU_AI_VARIANTS,
  "door-prada": PRADA_AI_VARIANTS,
  "door-pulada": PULADA_AI_VARIANTS,
  "door-ruihe": RUIHE_AI_VARIANTS,
  "door-ruoyin": RUOYIN_AI_VARIANTS,
  "door-sabo": SABO_AI_VARIANTS,
  "door-saina": SAINA_AI_VARIANTS,
  "door-senna": SENNA_AI_VARIANTS,
  "door-shengshi": SHENGSHI_AI_VARIANTS,
  "door-wave": WAVE_AI_VARIANTS,
  "door-woodland": WOODLAND_AI_VARIANTS,
  "door-yashang": YASHANG_AI_VARIANTS,
  "door-wl-dt08": WL_DT08_AI_VARIANTS,
  "door-wl-dt103": WL_DT103_AI_VARIANTS,
  "door-wl-dt107": WL_DT107_AI_VARIANTS,
  "door-tdf-2003": TDF_2003_AI_VARIANTS,
  "door-tdf-2009": TDF_2009_AI_VARIANTS,
  "door-WL-A23001": WL_A23001_AI_VARIANTS,
  "door-wl-a23001": WL_A23001_AI_VARIANTS,
  "door-WL-A23002": WL_A23002_AI_VARIANTS,
  "door-wl-a23002": WL_A23002_AI_VARIANTS,
  "door-WL-A23019": WL_A23019_AI_VARIANTS,
  "door-wl-a23019": WL_A23019_AI_VARIANTS,
  "door-WL-A23020": WL_A23020_AI_VARIANTS,
  "door-wl-a23020": WL_A23020_AI_VARIANTS,
  "door-gd-01": GD_01_AI_VARIANTS,
  "door-gd-02": GD_02_AI_VARIANTS,
  "door-gd-03": GD_03_AI_VARIANTS,
  "door-gf026": GF026_FIRE_AI_VARIANTS,
  "door-td-01": TD_01_AI_VARIANTS,
  "door-td-02": TD_02_AI_VARIANTS,
  "door-td-03": TD_03_AI_VARIANTS,
  "door-gk-01": GK_01_AI_VARIANTS,
  "door-gk-02": GK_02_AI_VARIANTS,
  "door-gk-03": GK_03_AI_VARIANTS,
  "door-mk-01": MK_01_AI_VARIANTS,
  "door-mk-02": MK_02_AI_VARIANTS,
  "door-mk-03": MK_03_AI_VARIANTS,
  "door-5203": MADERA_ACUSTICA_5203_AI_VARIANTS,
  "door-s203": MADERA_ACUSTICA_S203_AI_VARIANTS,
  "door-wl-5103": MADERA_ACUSTICA_WL_5103_AI_VARIANTS,
  "door-wl-5105": MADERA_ACUSTICA_WL_5105_AI_VARIANTS,
  "door-wl-5107": MADERA_ACUSTICA_WL_5107_AI_VARIANTS,
  "door-wl-5109": MADERA_ACUSTICA_WL_5109_AI_VARIANTS,
  "door-wl-5110": MADERA_ACUSTICA_WL_5110_AI_VARIANTS,
  "door-wl-5117": MADERA_ACUSTICA_WL_5117_AI_VARIANTS,
  "door-wl-5203": MADERA_ACUSTICA_WL_5203_AI_VARIANTS,
  "door-wl-5503": MADERA_ACUSTICA_WL_5503_AI_VARIANTS,
  "door-wl-d001": MADERA_ACUSTICA_WL_D001_AI_VARIANTS,
  "door-wl-d002": MADERA_ACUSTICA_WL_D002_AI_VARIANTS,
  "door-wl-d003": MADERA_ACUSTICA_WL_D003_AI_VARIANTS,
  "door-wl-d005": MADERA_ACUSTICA_WL_D005_AI_VARIANTS,
  "door-wl-d006": MADERA_ACUSTICA_WL_D006_AI_VARIANTS,
  "door-wl-d007": MADERA_ACUSTICA_WL_D007_AI_VARIANTS,
  "door-wl-d008": MADERA_ACUSTICA_WL_D008_AI_VARIANTS,
  "door-wl-d009": MADERA_ACUSTICA_WL_D009_AI_VARIANTS,
  "door-wl-d010": MADERA_ACUSTICA_WL_D010_AI_VARIANTS,
  "door-wl-d011": MADERA_ACUSTICA_WL_D011_AI_VARIANTS,
  "door-wl-d012": MADERA_ACUSTICA_WL_D012_AI_VARIANTS,
  "door-wl-d013": MADERA_ACUSTICA_WL_D013_AI_VARIANTS,
  "door-wl-d015": MADERA_ACUSTICA_WL_D015_AI_VARIANTS,
  "door-wl-d016": MADERA_ACUSTICA_WL_D016_AI_VARIANTS,
  "door-wl-d017": MADERA_ACUSTICA_WL_D017_AI_VARIANTS,
  "door-wl-d018": MADERA_ACUSTICA_WL_D018_AI_VARIANTS,
  "door-wl-d019": MADERA_ACUSTICA_WL_D019_AI_VARIANTS,
  "door-wl-d020": MADERA_ACUSTICA_WL_D020_AI_VARIANTS,
  "door-wl-d021": MADERA_ACUSTICA_WL_D021_AI_VARIANTS,
  "door-wl-d022": MADERA_ACUSTICA_WL_D022_AI_VARIANTS,
  "door-wl-d023": MADERA_ACUSTICA_WL_D023_AI_VARIANTS,
  "door-wl-d025": MADERA_ACUSTICA_WL_D025_AI_VARIANTS,
  "door-wl-d026": MADERA_ACUSTICA_WL_D026_AI_VARIANTS,
  "door-wl-d027": MADERA_ACUSTICA_WL_D027_AI_VARIANTS,
  "door-wl-d028": MADERA_ACUSTICA_WL_D028_AI_VARIANTS,
  "door-wl-d029": MADERA_ACUSTICA_WL_D029_AI_VARIANTS,
  "door-wl-d030": MADERA_ACUSTICA_WL_D030_AI_VARIANTS,
  "door-wl-d031": MADERA_ACUSTICA_WL_D031_AI_VARIANTS,
  "door-wl-d032": MADERA_ACUSTICA_WL_D032_AI_VARIANTS,
  "door-wl-d033": MADERA_ACUSTICA_WL_D033_AI_VARIANTS,
  "door-wl-d036": MADERA_ACUSTICA_WL_D036_AI_VARIANTS,
  "door-wl-d037": MADERA_ACUSTICA_WL_D037_AI_VARIANTS,
  "door-wl-d038": MADERA_ACUSTICA_WL_D038_AI_VARIANTS,
  "door-wl-j001": MADERA_ACUSTICA_WL_J001_AI_VARIANTS,
  "door-wl-j002": MADERA_ACUSTICA_WL_J002_AI_VARIANTS,
  "door-wl-j003": MADERA_ACUSTICA_WL_J003_AI_VARIANTS,
  "door-wl-j005": MADERA_ACUSTICA_WL_J005_AI_VARIANTS,
  "door-wl-j006": MADERA_ACUSTICA_WL_J006_AI_VARIANTS,
  "door-wl-j008": MADERA_ACUSTICA_WL_J008_AI_VARIANTS,
  "door-wl-j009": MADERA_ACUSTICA_WL_J009_AI_VARIANTS,
  "door-wl-j010": MADERA_ACUSTICA_WL_J010_AI_VARIANTS,
  "door-wl-j011": MADERA_ACUSTICA_WL_J011_AI_VARIANTS,
  "door-wl-j012": MADERA_ACUSTICA_WL_J012_AI_VARIANTS,
  "door-wl-s001": MADERA_ACUSTICA_WL_S001_AI_VARIANTS,
  "door-wl-s002": MADERA_ACUSTICA_WL_S002_AI_VARIANTS,
  "door-wl-s003": MADERA_ACUSTICA_WL_S003_AI_VARIANTS,
  "door-wl-s005": MADERA_ACUSTICA_WL_S005_AI_VARIANTS,
  "door-wl-s008": MADERA_ACUSTICA_WL_S008_AI_VARIANTS,
  "door-wl-s009": MADERA_ACUSTICA_WL_S009_AI_VARIANTS,
  "door-wl-s010": MADERA_ACUSTICA_WL_S010_AI_VARIANTS,
  "door-wl-s011": MADERA_ACUSTICA_WL_S011_AI_VARIANTS,
  "door-wl-s012": MADERA_ACUSTICA_WL_S012_AI_VARIANTS,
  "door-wl-s013": MADERA_ACUSTICA_WL_S013_AI_VARIANTS,
  "door-wl-s015": MADERA_ACUSTICA_WL_S015_AI_VARIANTS,
  "door-wl-s016": MADERA_ACUSTICA_WL_S016_AI_VARIANTS,
  "door-wl-s017": MADERA_ACUSTICA_WL_S017_AI_VARIANTS,
  "door-wl-s019": MADERA_ACUSTICA_WL_S019_AI_VARIANTS,
  "door-wl-s020": MADERA_ACUSTICA_WL_S020_AI_VARIANTS,
  "door-wl-s021": MADERA_ACUSTICA_WL_S021_AI_VARIANTS,
  "door-wl-s022": MADERA_ACUSTICA_WL_S022_AI_VARIANTS,
  "door-wl-s023": MADERA_ACUSTICA_WL_S023_AI_VARIANTS,
  "door-wl-s025": MADERA_ACUSTICA_WL_S025_AI_VARIANTS,
  "door-wl-s026": MADERA_ACUSTICA_WL_S026_AI_VARIANTS,
  "door-wl-s027": MADERA_ACUSTICA_WL_S027_AI_VARIANTS,
  "door-wl-s101b": MADERA_ACUSTICA_WL_S101B_AI_VARIANTS,
  "door-wl-s102b": MADERA_ACUSTICA_WL_S102B_AI_VARIANTS,
  "door-wl-s103b": MADERA_ACUSTICA_WL_S103B_AI_VARIANTS,
  "door-wl-s108": MADERA_ACUSTICA_WL_S108_AI_VARIANTS,
  "door-wl-s201": MADERA_ACUSTICA_WL_S201_AI_VARIANTS,
  "door-wl-s205": MADERA_ACUSTICA_WL_S205_AI_VARIANTS,
  "door-wl-s206": MADERA_ACUSTICA_WL_S206_AI_VARIANTS,
  "door-wl-s207": MADERA_ACUSTICA_WL_S207_AI_VARIANTS,
  "door-wl-s208": MADERA_ACUSTICA_WL_S208_AI_VARIANTS,
  "door-wl-s209": MADERA_ACUSTICA_WL_S209_AI_VARIANTS,
  "door-wl-s210": MADERA_ACUSTICA_WL_S210_AI_VARIANTS,
  "door-wl-p001": PVC_WL_P001_AI_VARIANTS,
  "door-wl-p002": PVC_WL_P002_AI_VARIANTS,
  "door-wl-p003": PVC_WL_P003_AI_VARIANTS,
  "door-wl-p005": PVC_WL_P005_AI_VARIANTS,
  "door-wl-p006": PVC_WL_P006_AI_VARIANTS,
  "door-wl-p007": PVC_WL_P007_AI_VARIANTS,
  "door-wl-p008": PVC_WL_P008_AI_VARIANTS,
  "door-wl-p009": PVC_WL_P009_AI_VARIANTS,
  "door-wl-p010": PVC_WL_P010_AI_VARIANTS,
  "door-wl-p011": PVC_WL_P011_AI_VARIANTS,
  "door-wl-p015": PVC_WL_P015_AI_VARIANTS,
  "door-wl-p016": PVC_WL_P016_AI_VARIANTS,
  "door-wl-p201": PVC_WL_P201_AI_VARIANTS,
};

const ACCESORIOS_CORREDIZAS = [
  { name: "Manilla VBH con base", tag: "Ventana abatible", img: "/images/Asset/Accesorios/manilla_vbh_base.webp" },
  { name: "Manilla Runas", tag: "Ventana abatible", img: "/images/Asset/Accesorios/manilla_runas.webp" },
  { name: "Manilla VBH sin base", tag: "Ventana", img: "/images/Asset/Accesorios/manilla_vbh_sin_base.webp" },
  { name: "Manilla y Accesorios", tag: "Ventana corrediza", img: "/images/Asset/Accesorios/manilla_accesorios_corrediza.webp" },
  { name: "Cerradura de Una Línea", tag: "Ventana corrediza", img: "/images/Asset/Accesorios/cerradura_una_linea.webp" },
  { name: "Manilla con Cerradura Ultrafina", tag: "Puerta corrediza · 210 mm", img: "/images/Asset/Accesorios/manilla_ultrafina.webp" },
  { name: "A01 Manilla", tag: "310 mm", img: "/images/Asset/Accesorios/a01.webp" },
  { name: "A03 Manilla", tag: "304 Stainless Steel · 360 mm", img: "/images/Asset/Accesorios/a03.webp" },
  { name: "A04 Manilla", tag: "390 mm", img: "/images/Asset/Accesorios/a04.webp" },
  { name: "A05 Manilla", tag: "450 mm", img: "/images/Asset/Accesorios/a05.webp" },
  { name: "A06 Manilla", tag: "600 mm", img: "/images/Asset/Accesorios/a06.webp" },
  { name: "A07 Manilla", tag: "1200 mm", img: "/images/Asset/Accesorios/a07.webp" },
  { name: "B01 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b01.webp" },
  { name: "B02 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b02.webp" },
  { name: "B03 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b03.webp" },
  { name: "B04 One-Line Lock", tag: "Vertical", img: "/images/Asset/Accesorios/b04.webp" },
  { name: "C01 Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/c01.webp" },
  { name: "C02 Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/c02.webp" },
  { name: "Ultra Narrow Swing Door Flat Lock", tag: "Puerta batiente", img: "/images/Asset/Accesorios/ultra_narrow_flat_lock.webp" }
];

const VIDRIOS_CORREDIZAS = [
  { name: "VIDRIO-01", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-01.webp" },
  { name: "VIDRIO-02", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-02.webp" },
  { name: "VIDRIO-03", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-03.webp" },
  { name: "VIDRIO-04", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-04.webp" },
  { name: "VIDRIO-05", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-05.webp" },
  { name: "VIDRIO-06", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-06.webp" },
  { name: "VIDRIO-07", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-07.webp" },
  { name: "VIDRIO-08", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-08.webp" },
  { name: "VIDRIO-09", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-09.webp" },
  { name: "VIDRIO-10", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-10.webp" },
  { name: "VIDRIO-11", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-11.webp" },
  { name: "VIDRIO-12", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-12.webp" },
  { name: "VIDRIO-13", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-13.webp" },
  { name: "VIDRIO-14", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-14.webp" },
  { name: "VIDRIO-15", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-15.webp" },
  { name: "VIDRIO-16", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-16.webp" },
  { name: "VIDRIO-17", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-17.webp" },
  { name: "VIDRIO-18", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-18.webp" },
  { name: "VIDRIO-19", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-19.webp" },
  { name: "VIDRIO-20", tag: "Vidrio 8mm", img: "/images/Asset/Vidrios/vidrio-20.webp" },
];

// --- WALLPAPERS (fondo lateral del modal, estilo cerraduras) ---
const WALLPAPER_DIR = "/images/PUERTAS/WALLPAPER";
const WALLPAPER_SLUGS = new Set([
  "chaobu", "chaohe", "chaoling", "cl96", "dihua", "gl097pro", "gl098pro", "k300max", "k300pro",
  "l5601", "l5857", "l5859", "lingan", "louis", "mclaren", "n9518", "n9519", "n9520", "p101", "p102",
  "p103", "p105", "p106", "p107", "p108", "pulada", "s101", "s108pro", "s116", "s118", "s119", "s121",
  "sabo", "saina", "shengshi", "t200", "tdf-2003", "tdf-2009", "x50max", "x50pro", "x60max", "x60pro",
  "x70jinxiu", "x70shunliu", "y106", "y118", "y119",
  "s108", "wave", "wl001", "wl-d003", "wl-j001", "wl-p001", "wl-s009",
]);
// Correcciones nombre de producto -> nombre real del archivo de wallpaper
const WALLPAPER_OVERRIDES = { chaopu: "chaobu", makailen: "mclaren" };

const getWallpaper = (name) => {
  if (!name) return null;
  const base = name.toLowerCase().replace(/\s+/g, '');
  const slug = WALLPAPER_OVERRIDES[base] || base;
  return WALLPAPER_SLUGS.has(slug) ? `${WALLPAPER_DIR}/${slug}.webp` : null;
};

// --- 2. COMPONENTES UI ---

const FilterButton = ({ label, active, onClick, small = false }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 ${small ? 'text-[9px] py-2' : 'text-[10px]'} font-bold uppercase border-b transition-all duration-300 flex justify-between items-center tracking-widest relative overflow-hidden group
      ${active
        ? 'text-white border-black pl-6'
        : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:text-black hover:pl-6'
      }`}
  >
    {active && (
      <motion.div
        layoutId="activeFilter"
        className="absolute inset-0 bg-black z-0"
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    <span className="relative z-10 flex items-center justify-between w-full">
      {label}
      {active && <ChevronRight size={12} />}
    </span>
  </button>
);

// --- COMPONENTE DE BÚSQUEDA REUTILIZABLE (estilo redondo, igual que Sofás) ---
const SearchInput = ({ value, onChange }) => (
  <div className="relative group w-full">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
    <input
      type="text"
      placeholder="BUSCAR MODELO..."
      value={value}
      onChange={onChange}
      className="w-full bg-[#F5F5F5] border border-transparent focus:bg-white focus:border-gray-200 rounded-full py-2.5 pl-11 pr-4 text-xs font-bold uppercase tracking-wide focus:ring-0 transition-all outline-none text-gray-900 placeholder:text-gray-400"
    />
    {value && (
      <button
        onClick={() => onChange({ target: { value: "" } })}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-black transition-colors"
      >
        <X size={12} />
      </button>
    )}
  </div>
);

const hexToRgb = (hex) => {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16));
};

const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  const delta = max - min;
  if (!delta) return [0, 0, lightness];

  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  let hue;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;
  return [((hue * 60) + 360) % 360, saturation, lightness];
};

const hslToRgb = (h, s, l) => {
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const match = l - chroma / 2;
  let rgb = [0, 0, 0];
  if (h < 60) rgb = [chroma, x, 0];
  else if (h < 120) rgb = [x, chroma, 0];
  else if (h < 180) rgb = [0, chroma, x];
  else if (h < 240) rgb = [0, x, chroma];
  else if (h < 300) rgb = [x, 0, chroma];
  else rgb = [chroma, 0, x];
  return rgb.map((channel) => Math.round((channel + match) * 255));
};

// Genera una mÃ¡scara por pÃ­xel: conserva fondo, cristales y herrajes, y tiÃ±e la superficie.
const DoorFinishMask = ({ src, finish }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !finish || !src) return;
    let cancelled = false;
    const image = new window.Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      if (cancelled) return;
      const maxDimension = 1200;
      const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = pixels.data;
      const [targetR, targetG, targetB] = hexToRgb(finish.hex);
      const [targetHue, targetSaturation, targetLightness] = rgbToHsl(targetR, targetG, targetB);
      const finishSaturation = finish.saturation ?? targetSaturation;
      const finishStrength = finish.strength ?? 0.76;

      // Solo considera fondo los pÃ­xeles similares a las esquinas que estÃ¡n
      // conectados con el borde. AsÃ­ una puerta blanca sigue siendo puerta.
      const width = canvas.width;
      const height = canvas.height;
      const pixelCount = width * height;
      const backgroundMask = new Uint8Array(pixelCount);
      const cornerIndexes = [0, width - 1, (height - 1) * width, pixelCount - 1];
      const cornerColors = cornerIndexes.map((index) => {
        const offset = index * 4;
        return [data[offset], data[offset + 1], data[offset + 2]];
      });
      const backgroundColor = [0, 1, 2].map((channel) =>
        cornerColors.reduce((sum, color) => sum + color[channel], 0) / cornerColors.length
      );
      const backgroundLuminance = 0.2126 * backgroundColor[0] + 0.7152 * backgroundColor[1] + 0.0722 * backgroundColor[2];
      const cornersAreSimilar = cornerColors.every((color) =>
        color.reduce((distance, channel, index) => distance + Math.abs(channel - backgroundColor[index]), 0) < 38
      );

      if (backgroundLuminance > 215 && cornersAreSimilar) {
        const queue = new Int32Array(pixelCount);
        let head = 0;
        let tail = 0;
        const enqueueBackground = (index) => {
          if (index < 0 || index >= pixelCount || backgroundMask[index]) return;
          const offset = index * 4;
          const distance = Math.abs(data[offset] - backgroundColor[0])
            + Math.abs(data[offset + 1] - backgroundColor[1])
            + Math.abs(data[offset + 2] - backgroundColor[2]);
          if (distance > 28) return;
          backgroundMask[index] = 1;
          queue[tail++] = index;
        };

        for (let x = 0; x < width; x++) {
          enqueueBackground(x);
          enqueueBackground((height - 1) * width + x);
        }
        for (let y = 1; y < height - 1; y++) {
          enqueueBackground(y * width);
          enqueueBackground(y * width + width - 1);
        }

        while (head < tail) {
          const index = queue[head++];
          const x = index % width;
          if (x > 0) enqueueBackground(index - 1);
          if (x < width - 1) enqueueBackground(index + 1);
          if (index >= width) enqueueBackground(index - width);
          if (index < pixelCount - width) enqueueBackground(index + width);
        }
      }

      // Una zona oscura solo se protege si tiene suficiente superficie continua.
      // Esto conserva cerraduras y franjas, pero no confunde cada veta con un herraje.
      const darkIntegral = new Uint32Array((width + 1) * (height + 1));
      for (let y = 0; y < height; y++) {
        let rowDarkPixels = 0;
        for (let x = 0; x < width; x++) {
          const pixelIndex = y * width + x;
          const offset = pixelIndex * 4;
          const r = data[offset];
          const g = data[offset + 1];
          const b = data[offset + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          if (luminance < 52 && saturation < 0.18) rowDarkPixels++;
          darkIntegral[(y + 1) * (width + 1) + x + 1] = darkIntegral[y * (width + 1) + x + 1] + rowDarkPixels;
        }
      }

      const hardwareMask = new Uint8Array(pixelCount);
      const hardwareRadius = 2;
      for (let y = 0; y < height; y++) {
        const top = Math.max(0, y - hardwareRadius);
        const bottom = Math.min(height - 1, y + hardwareRadius);
        for (let x = 0; x < width; x++) {
          const left = Math.max(0, x - hardwareRadius);
          const right = Math.min(width - 1, x + hardwareRadius);
          const count = darkIntegral[(bottom + 1) * (width + 1) + right + 1]
            - darkIntegral[top * (width + 1) + right + 1]
            - darkIntegral[(bottom + 1) * (width + 1) + left]
            + darkIntegral[top * (width + 1) + left];
          if (count >= 17) hardwareMask[y * width + x] = 1;
        }
      }

      const detailStrength = targetLightness > 0.72
        ? 0.16
        : targetLightness < 0.18
          ? 0.24
          : 0.34;
      const imageName = src.split("/").pop()?.toLowerCase() || "";
      const hasX70PanelMask = imageName.includes("x70-shunliu");

      for (let i = 0; i < data.length; i += 4) {
        const pixelIndex = i / 4;
        const pixelX = pixelIndex % width;
        const pixelY = Math.floor(pixelIndex / width);
        const normalizedX = pixelX / width;
        const normalizedY = pixelY / height;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const outsideX70Panels = hasX70PanelMask && (
          normalizedX < 0.07 || normalizedX > 0.94 || normalizedY < 0.025 || normalizedY > 0.995
          || (normalizedX > 0.345 && normalizedX < 0.43)
        );

        if (backgroundMask[pixelIndex] || hardwareMask[pixelIndex] || outsideX70Panels) {
          data[i + 3] = 0;
          continue;
        }

        const originalLightness = rgbToHsl(r, g, b)[2];
        const detail = (originalLightness - 0.5) * detailStrength;
        const recoloredLightness = Math.max(0.035, Math.min(0.94, targetLightness + detail));
        const [newR, newG, newB] = hslToRgb(targetHue, finishSaturation, recoloredLightness);
        data[i] = newR;
        data[i + 1] = newG;
        data[i + 2] = newB;

        const highlightProtection = luminance > 235 ? 0.65 : 1;
        data[i + 3] = Math.round(255 * finishStrength * highlightProtection);
      }

      context.putImageData(pixels, 0, 0);
    };

    image.onerror = () => {
      const context = canvas.getContext("2d");
      context?.clearRect(0, 0, canvas.width, canvas.height);
    };
    image.src = src;

    return () => { cancelled = true; };
  }, [src, finish]);

  if (!finish) return null;
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      aria-hidden="true"
    />
  );
};

// --- MODAL OPTIMIZADO PARA VELOCIDAD ---
const ProductModal = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  useEffect(() => {
    setSelectedColor(null);
  }, [product?.name]);

  if (!product) return null;

  let accentColor = "text-gray-900";
  let borderColor = "border-gray-900";
  let Icon = ShieldCheck;

  if (product.category.includes("IA")) { accentColor = "text-[#00C2FF]"; borderColor = "border-[#00C2FF]"; Icon = ScanFace; }
  else if (product.category.includes("ACORAZADA")) { accentColor = "text-[#D4AF37]"; borderColor = "border-[#D4AF37]"; }
  else if (product.category.includes("ALUMINIO")) { accentColor = "text-[#718096]"; borderColor = "border-[#718096]"; }
  else if (product.category.includes("MADERA")) { accentColor = "text-[#8D6E63]"; borderColor = "border-[#8D6E63]"; Icon = VolumeX; }
  else if (product.category.includes("PVC")) { accentColor = "text-teal-600"; borderColor = "border-teal-600"; Icon = Sparkles; }
  else if (product.category.includes("CORREDIZAS")) { accentColor = "text-indigo-600"; borderColor = "border-indigo-600"; Icon = MoveHorizontal; }
  else if (product.category.includes("CORTAFUEGO")) { accentColor = "text-orange-600"; borderColor = "border-orange-600"; Icon = Flame; }
  else if (product.category.includes("EVACUACIÓN")) { accentColor = "text-red-600"; borderColor = "border-red-600"; Icon = Flame; }
  else if (product.category.includes("MINIMALISTA")) { accentColor = "text-stone-500"; borderColor = "border-stone-500"; Icon = Sparkles; }
  else if (product.category.includes("BAJO CARBONO")) { accentColor = "text-green-600"; borderColor = "border-green-600"; Icon = Sparkles; }

  const wallpaper = getWallpaper(product.name);
  const productImageKey = product.img?.split("/").pop()?.replace(/\.[^.]+$/, "");
  const aiVariant = AI_VARIANTS_BY_PRODUCT[productImageKey]?.[selectedColor?.hex];
  const selectedImage = aiVariant || selectedColor?.aiVariants?.[productImageKey] || product.img;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop — con wallpaper lateral si el producto lo tiene (estilo cerraduras) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      >
        {wallpaper && (
          <div className="hidden md:block absolute inset-y-0 left-0 right-[900px] overflow-hidden">
            <motion.img
              src={wallpaper}
              alt=""
              aria-hidden="true"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40 pointer-events-none" />
          </div>
        )}
      </motion.div>

      {/* Panel deslizante */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.8 }}
        style={{ willChange: "transform" }}
        className="relative bg-white w-full max-w-[900px] h-full shadow-2xl flex flex-col md:flex-row z-10"
      >
        <button onClick={onClose} className="absolute top-4 left-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-black hover:text-white transition"><X size={20} /></button>

        {/* Imagen en Modal */}
        <div className="w-full md:w-1/2 bg-[#F8F8F8] relative min-h-[300px] md:h-full flex items-center justify-center p-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="relative w-full h-full max-h-[500px]"
          >
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority // Carga prioritaria
              className="object-contain mix-blend-multiply"
            />
          </motion.div>

          {selectedColor && (
            <div className="absolute bottom-3 left-1/2 w-[min(280px,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur md:bottom-5 md:w-[min(360px,calc(100%-2rem))] md:p-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div
                  className="h-12 w-12 shrink-0 rounded-xl border border-black/10 shadow-inner md:h-20 md:w-20"
                  style={{
                    backgroundColor: selectedColor.hex,
                    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,.28), transparent 42%, rgba(0,0,0,.16))",
                  }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 md:text-[10px]">Acabado seleccionado</p>
                  <p className="truncate text-xs font-bold uppercase tracking-wide text-gray-900 md:text-base">{selectedColor.name}</p>
                  <p className="mt-1 text-[10px] text-gray-500 md:text-xs">
                    {aiVariant ? "Variante generada por IA" : "La foto se mantiene original"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contenido en Modal */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white scrollbar-hide">
          <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${accentColor}`}>{product.category}</span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight">{product.name}</h2>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">{product.description}</p>

          <div className="space-y-8">
            {/* Características Animadas */}
            <div>
              <h3 className="text-xs font-bold uppercase text-gray-900 mb-3 flex items-center gap-2">
                <Icon size={14} /> Características
              </h3>
              <ul className="space-y-2">
                {product.features?.map((feat, i) => (
                  <motion.li
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-600"
                  >
                    <span className={`${accentColor} mt-0.5`}>•</span> {feat}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Carta de Colores */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2 mb-3 flex items-center gap-2">
                <Palette size={14} /> Acabados y Carta de Colores
              </h3>
              <div className="flex flex-wrap gap-4 mb-3 p-4 bg-gray-50 rounded-xl justify-center md:justify-start" role="group" aria-label="Seleccionar acabado de la puerta">
                <button
                  type="button"
                  onClick={() => setSelectedColor(null)}
                  aria-pressed={selectedColor === null}
                  className="text-center group flex flex-col items-center gap-2"
                  title="Ver color original"
                >
                  <span className={`w-12 h-12 rounded-full bg-white shadow-md border-2 grid place-items-center transition-all duration-300 ${selectedColor === null ? 'border-black scale-110 ring-2 ring-black/10' : 'border-white group-hover:scale-110'}`}>
                    <X size={15} className="text-gray-400" />
                  </span>
                  <span className={`text-[9px] uppercase font-bold max-w-[60px] leading-tight ${selectedColor === null ? 'text-black' : 'text-gray-500'}`}>Original</span>
                </button>
                {DOOR_COLORS.map((color) => {
                  const isSelected = selectedColor?.hex === color.hex;
                  return (
                  <button
                    type="button"
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    aria-pressed={isSelected}
                    aria-label={`Ver puerta en ${color.name}`}
                    className="text-center group flex flex-col items-center gap-2"
                    title={`Ver en ${color.name}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full shadow-md border-2 transition-all duration-300 ${isSelected ? 'border-black scale-110 ring-2 ring-black/10' : 'border-white group-hover:scale-110'}`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className={`text-[9px] uppercase font-bold max-w-[60px] leading-tight ${isSelected ? 'text-black' : 'text-gray-500'}`}>{color.name}</span>
                  </button>
                )})}
              </div>
              <p className="mb-3 text-[10px] leading-relaxed text-gray-400">
                La visualizaciÃ³n es orientativa; el acabado puede variar segÃºn la pantalla y el material de la puerta.
              </p>
              <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                <Palette size={16} className="text-gray-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  ¿Buscas un color diferente? Disponemos de una amplia gama de acabados y colores personalizados bajo pedido.{" "}
                  <span className="font-bold text-gray-800">Consúltanos sin compromiso.</span>
                </p>
              </div>
            </div>

            {/* Specs */}
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

            {/* Accesorios (Solo Corredizas) */}
            {product.category === "PUERTAS CORREDIZAS Y ABATIBLES" && (
              <div className="pt-6 mt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase text-indigo-600 mb-4 flex items-center gap-2">
                  <Settings size={14} /> Accesorios
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {ACCESORIOS_CORREDIZAS.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-100 flex flex-col items-center text-center">
                      <div className="h-20 w-full relative mb-2 bg-white rounded-sm">
                        <Image src={item.img} alt={item.name} fill className="object-contain p-2" onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                      <span className="text-[9px] font-bold text-gray-800 leading-tight">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vidrios (Solo Corredizas) */}
            {product.category === "PUERTAS CORREDIZAS Y ABATIBLES" && (
              <div className="pt-6 mt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold uppercase text-indigo-600 mb-4 flex items-center gap-2">
                  <Settings size={14} /> Vidrios
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {VIDRIOS_CORREDIZAS.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-100 flex flex-col items-center text-center">
                      <div className="h-20 w-full relative mb-2 bg-gray-200 rounded-sm">
                        <Image src={item.img} alt={item.name} fill className="object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                      <span className="text-[9px] font-bold text-gray-800 leading-tight">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- PRODUCT CARD ---
const ProductCard = ({ product, onClick, priority = false }) => {
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
  else if (product.category.includes("EVACUACIÓN")) highlightClass = "text-red-600";
  else if (product.category.includes("MINIMALISTA")) highlightClass = "text-stone-500";
  else if (product.category.includes("BAJO CARBONO")) highlightClass = "text-green-600";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col h-full"
    >
      {/* IMAGEN FLOTANTE */}
      <div className="relative aspect-[3/5] bg-[#FCFCFC] mb-4 overflow-hidden border border-transparent group-hover:border-gray-100 transition-all rounded-sm">
        <Image
          src={product.img}
          alt={product.name}
          fill
          priority={priority} // Carga prioritaria si es de los primeros
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
          sizes="100px"
          unoptimized
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end justify-center pb-6">
          <span className="bg-white text-black text-[9px] font-bold uppercase px-3 py-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm tracking-widest">
            Ver Detalles
          </span>
        </div>
      </div>

      {/* TEXTO */}
      <div className="text-center group-hover:text-left transition-all">
        <h4 className={`font-bold text-base text-gray-900 transition-colors uppercase ${product.category.includes("MADERA") ? "group-hover:text-[#8D6E63]" :
          product.category.includes("PVC") ? "group-hover:text-teal-600" :
            product.category.includes("CORREDIZAS") ? "group-hover:text-indigo-600" :
              "group-hover:text-[#00C2FF]"}`}>{product.name}</h4>
        <div className="flex items-center justify-center group-hover:justify-start gap-2 mt-1">
          <p className={`text-[9px] uppercase tracking-widest ${product.category.includes("IA") ? "text-[#00C2FF] font-semibold" : highlightClass}`}>
            {shortCategory}
          </p>
          <div className="flex -space-x-1">
            {DOOR_COLORS.slice(0, 5).map((c, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <div className="w-3 h-3 rounded-full bg-gray-100 border border-white flex items-center justify-center text-[6px] text-gray-500">+</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- PÁGINA PRINCIPAL ---
function PuertasContent() {
  const searchParams = useSearchParams();
  // Inicializar directamente desde la URL para no lanzar una consulta de "TODAS"
  // que pueda resolverse tarde y pisar la de la categoría correcta
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || "TODAS");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInteriorOpen, setIsInteriorOpen] = useState(false);
  const gridTopRef = useRef(null);

  // Sincronizar categoría si la URL cambia con la página ya montada
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
      // Abrir automáticamente el menú de PUERTAS INTERIOR si la categoría pertenece a ese grupo
      if (CATEGORIAS_INTERIOR.includes(categoryFromUrl)) {
        setIsInteriorOpen(true);
      }
    }
  }, [searchParams]);

  // Abrir ficha de producto desde URL (deep-link del buscador)
  useEffect(() => {
    const producto = searchParams.get('producto');
    if (!producto) return;
    let active = true;
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('name', producto)
        .limit(1);
      if (active && data && data[0]) setSelectedProduct(data[0]);
    })();
    return () => { active = false; };
  }, [searchParams]);

  // CARGAR DATOS DE SUPABASE
  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);

      let query = supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (activeCategory !== "TODAS") {
        query = query.eq('category', activeCategory);
      }

      const { data, error } = await query;

      // Ignorar respuestas de una categoría que ya no está activa
      if (cancelled) return;

      if (error) {
        console.error("Error cargando productos:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, [activeCategory]);

  const displayProducts = useMemo(() => {
    if (searchTerm.trim() === "") return products;
    const term = searchTerm.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      (p.description && p.description.toLowerCase().includes(term))
    );
  }, [products, searchTerm]);

  // Scroll suave al cambiar categoría
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (gridTopRef.current && window.scrollY > 300) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    // Quitamos el pt-28 para que el Hero pegue bien arriba con el menú transparente (si lo tienes)
    <main className="bg-white min-h-screen text-black pb-20 font-sans selection:bg-black selection:text-white">

      {/* HERO SECTION DINÁMICO */}
<div className="w-full h-[45vh] md:h-[62vh] relative mb-16 overflow-hidden bg-black mt-20">{/* mt-20 compensa el header fijo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={IMAGENES_HERO[activeCategory] || IMAGENES_HERO["TODAS"]}
              alt={`Wonly ${activeCategory}`}
              fill
              priority
              className="object-cover opacity-75" // Opacidad al 50% para que el texto se lea bien
            />
          </motion.div>
        </AnimatePresence>

        {/* Texto superpuesto en el Hero */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter text-white mb-3 md:mb-10 drop-shadow-2xl max-w-5xl"
            >
              {activeCategory === "TODAS" ? "Wonly Collection" : activeCategory}
            </motion.h1>
          </AnimatePresence>

          {/* <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="w-px h-12 bg-[#00C2FF] mx-auto mb-6 shadow-[0_0_10px_#00C2FF]"
          /> */}

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed drop-shadow-md"
            >
              {activeCategory === "TODAS"
                ? "Catálogo completo Wonly. Tecnología IA, resistencia extrema, lujo en aluminio, colección acústica de madera y la nueva línea vanguardista en PVC."
                : `Explora nuestra exclusiva línea de productos clasificados en ${activeCategory.toLowerCase()} con la mejor tecnología, máxima seguridad y diseño de vanguardia.`}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* SIDEBAR (Escritorio) */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-32 h-fit">
            {/* Buscador Desktop */}
            <div className="mb-8">
              <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="mb-6 pb-2 border-b border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categorías</span>
            </div>
            <div className="flex flex-col gap-1">
              <FilterButton label="Ver Todo" active={activeCategory === "TODAS"} onClick={() => handleCategoryChange("TODAS")} />

              {/* Primeras 4 categorías antes de PUERTAS INTERIOR */}
              {CATEGORIAS.slice(0, 4).map((cat) => (
                <FilterButton key={cat} label={cat} active={activeCategory === cat} onClick={() => handleCategoryChange(cat)} />
              ))}

              {/* Categoría desplegable PUERTAS INTERIOR */}
              <div className="flex flex-col">
                <button
                  onClick={() => setIsInteriorOpen(!isInteriorOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded ${
                    CATEGORIAS_INTERIOR.includes(activeCategory)
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>Puertas Interior</span>
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-300 ${isInteriorOpen ? 'rotate-90' : ''}`}
                  />
                </button>

                {/* Subcategorías */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isInteriorOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col gap-1 ml-4 mt-1 pl-3 border-l-2 border-gray-200">
                    {CATEGORIAS_INTERIOR.map((cat) => (
                      <FilterButton
                        key={cat}
                        label={cat}
                        active={activeCategory === cat}
                        onClick={() => handleCategoryChange(cat)}
                        small
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Resto de categorías después de PUERTAS INTERIOR */}
              {CATEGORIAS.slice(4).map((cat) => (
                <FilterButton key={cat} label={cat} active={activeCategory === cat} onClick={() => handleCategoryChange(cat)} />
              ))}
            </div>
          </aside>

          {/* GRID PRODUCTOS */}
          <section className="flex-grow" ref={gridTopRef}>

            {/* BUSCADOR MÓVIL (Añadido Aquí) */}
            <div className="lg:hidden mb-6">
              <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-900">
                {activeCategory === "TODAS" ? "Catálogo Completo" : activeCategory} <span className="text-gray-400 ml-2">({displayProducts.length})</span>
              </span>
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden flex items-center gap-2 text-[10px] font-bold uppercase bg-black text-white px-3 py-2"><Filter size={12} /> Filtros</button>
            </div>

            {loading ? (
              <div className="flex h-64 w-full flex-col items-center justify-center text-gray-400 gap-3">
                <Loader2 className="animate-spin" size={32} />
                <span className="text-xs tracking-widest uppercase">Cargando colección...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                <AnimatePresence mode='popLayout'>
                  {displayProducts.map((p, index) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onClick={() => setSelectedProduct(p)}
                      priority={index < 8} // Las primeras 8 imágenes cargan YA
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {!loading && displayProducts.length === 0 && (
              <div className="py-24 text-center text-gray-300 text-sm uppercase">
                Sin resultados.
                {searchTerm && <button onClick={() => setSearchTerm("")} className="block mx-auto mt-2 underline text-black">Limpiar búsqueda</button>}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* MODAL (Con AnimatePresence Global) */}
      <AnimatePresence>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-6 lg:hidden"
          >
            <motion.div
              initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }}
              className="bg-white w-full max-w-sm p-6 space-y-4 rounded"
            >
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-bold uppercase tracking-widest text-sm">Categorías</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
              </div>
              <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
                <button onClick={() => { handleCategoryChange("TODAS"); setIsMobileMenuOpen(false); }} className="text-left py-3 border-b text-xs font-bold uppercase">Ver Todo</button>
                {CATEGORIAS.map(cat => (
                  <button key={cat} onClick={() => { handleCategoryChange(cat); setIsMobileMenuOpen(false); }} className="text-left py-3 border-b text-xs font-bold uppercase">{cat}</button>
                ))}

                {/* Categoría desplegable PUERTAS INTERIOR en móvil */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsInteriorOpen(!isInteriorOpen)}
                    className={`flex items-center justify-between w-full py-3 text-left text-xs font-bold uppercase border-b ${
                      CATEGORIAS_INTERIOR.includes(activeCategory) ? 'text-black' : 'text-gray-600'
                    }`}
                  >
                    <span>Puertas Interior</span>
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-300 ${isInteriorOpen ? 'rotate-90' : ''}`}
                    />
                  </button>

                  {/* Subcategorías móvil */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isInteriorOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex flex-col ml-4 border-l-2 border-gray-200">
                      {CATEGORIAS_INTERIOR.map(cat => (
                        <button
                          key={cat}
                          onClick={() => { handleCategoryChange(cat); setIsMobileMenuOpen(false); }}
                          className="text-left py-2 pl-3 text-[11px] font-semibold uppercase text-gray-600 hover:text-black"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default function PuertasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
      <PuertasContent />
    </Suspense>
  );
}
