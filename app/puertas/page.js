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
  "#171717": "/images/PUERTAS/AI/p101/door-p101-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/p101/door-p101-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/p101/door-p101-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/p101/door-p101-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/p101/door-p101-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/p101/door-p101-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/p101/door-p101-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/p101/door-p101-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/p101/door-p101-blanco-ai.webp",
};

const P102_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/p102/door-p102-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/p102/door-p102-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/p102/door-p102-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/p102/door-p102-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/p102/door-p102-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/p102/door-p102-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/p102/door-p102-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/p102/door-p102-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/p102/door-p102-blanco-ai.webp",
};

const P105_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/p105/door-p105-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/p105/door-p105-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/p105/door-p105-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/p105/door-p105-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/p105/door-p105-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/p105/door-p105-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/p105/door-p105-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/p105/door-p105-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/p105/door-p105-blanco-ai.webp",
};

const P107_AI_VARIANTS = {
  "#171717": "/images/PUERTAS/AI/p107/door-p107-negro-ai.webp",
  "#4A2E1A": "/images/PUERTAS/AI/p107/door-p107-wengue-ai.webp",
  "#36383A": "/images/PUERTAS/AI/p107/door-p107-gris-oscuro-ai.webp",
  "#484A4B": "/images/PUERTAS/AI/p107/door-p107-antracita-ai.webp",
  "#5C3524": "/images/PUERTAS/AI/p107/door-p107-nogal-ai.webp",
  "#A8784E": "/images/PUERTAS/AI/p107/door-p107-roble-ai.webp",
  "#A5A19A": "/images/PUERTAS/AI/p107/door-p107-gris-claro-ai.webp",
  "#C19A6B": "/images/PUERTAS/AI/p107/door-p107-natural-ai.webp",
  "#E8E5DE": "/images/PUERTAS/AI/p107/door-p107-blanco-ai.webp",
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
