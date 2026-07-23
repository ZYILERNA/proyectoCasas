"use client";

import { useState, useEffect, Suspense, useRef, forwardRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ScanFace, ShieldCheck, VolumeX, Sparkles, MoveHorizontal, Palette, Settings, Flame, Filter, Search, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const PRODUCT_PAGE_SIZE = 24;

const applyProductFilters = (query, category, searchTerm) => {
  let filteredQuery = query;

  if (category !== "TODAS") {
    filteredQuery = filteredQuery.eq("category", category);
  }

  const safeSearchTerm = searchTerm
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ");

  if (safeSearchTerm) {
    filteredQuery = filteredQuery.or(
      `name.ilike.%${safeSearchTerm}%,description.ilike.%${safeSearchTerm}%`,
    );
  }

  return filteredQuery;
};

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
  { name: "Lacado Blanco",         hex: "#E8E5DE", saturation: 0.04, strength: 0.72, aiVariants: { "door-x70-shunliu": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu-blanco-ai.webp" } },
];

const AI_VARIANT_SUFFIX_BY_HEX = Object.freeze({
  "#171717": "negro",
  "#4A2E1A": "wengue",
  "#36383A": "gris-oscuro",
  "#484A4B": "antracita",
  "#5C3524": "nogal",
  "#A8784E": "roble",
  "#A5A19A": "gris-claro",
  "#C19A6B": "natural",
  "#E8E5DE": "blanco"
});

// Cada producto registra una única ruta base. El acabado se resuelve al abrir la ficha.
const AI_VARIANTS_BY_PRODUCT = Object.freeze({
  "door-ume-102": "/images/PUERTAS/MINIMALISTA/ume-102/door-ume-102",
  "door-ume-103": "/images/PUERTAS/MINIMALISTA/ume-103/door-ume-103",
  "door-ume-105": "/images/PUERTAS/MINIMALISTA/ume-105/door-ume-105",
  "door-ume-114": "/images/PUERTAS/MINIMALISTA/ume-114/door-ume-114",
  "door-ume-117": "/images/PUERTAS/MINIMALISTA/ume-117/door-ume-117",
  "door-ume-120": "/images/PUERTAS/MINIMALISTA/ume-120/door-ume-120",
  "door-puerta-automática-plana,-hermética-y-abatible": "/images/PUERTAS/MEDICA/puerta-automatica-plana-hermetica-y-abatible/door-puerta-automatica-plana-hermetica-y-abatible",
  "door-puerta-cortafuego-aislante1": "/images/PUERTAS/MEDICA/puerta-cortafuego-aislante1/door-puerta-cortafuego-aislante1",
  "door-puerta-cortafuego-aislante2": "/images/PUERTAS/MEDICA/puerta-cortafuego-aislante2/door-puerta-cortafuego-aislante2",
  "door-puerta-de-sala1": "/images/PUERTAS/MEDICA/puerta-de-sala1/door-puerta-de-sala1",
  "door-puerta-de-sala2": "/images/PUERTAS/MEDICA/puerta-de-sala2/door-puerta-de-sala2",
  "door-puerta-de-sala3": "/images/PUERTAS/MEDICA/puerta-de-sala3/door-puerta-de-sala3",
  "door-puerta-de-sala4": "/images/PUERTAS/MEDICA/puerta-de-sala4/door-puerta-de-sala4",
  "door-puerta-de-sala5": "/images/PUERTAS/MEDICA/puerta-de-sala5/door-puerta-de-sala5",
  "door-puertas-automáticas-herméticas": "/images/PUERTAS/MEDICA/puertas-automaticas-hermeticas/door-puertas-automaticas-hermeticas",
  "door-x70-shunliu": "/images/PUERTAS/AI/x70-shunliu/door-x70-shunliu",
  "door-x70-jinxiu": "/images/PUERTAS/AI/x70-jinxiu/door-x70-jinxiu",
  "door-x60": "/images/PUERTAS/AI/x60/door-x60",
  "door-x60-max": "/images/PUERTAS/AI/x60-max/door-x60-max",
  "door-x60-pro": "/images/PUERTAS/AI/x60-pro/door-x60-pro",
  "door-x50-max": "/images/PUERTAS/AI/x50-max/door-x50-max",
  "door-x50-pro": "/images/PUERTAS/AI/x50-pro/door-x50-pro",
  "door-x50": "/images/PUERTAS/AI/x50/door-x50",
  "door-k300-max": "/images/PUERTAS/AI/k300-max/door-k300-max",
  "door-k300-pro": "/images/PUERTAS/AI/k300-pro/door-k300-pro",
  "door-l5857": "/images/PUERTAS/AI/l5857/door-l5857",
  "door-l5859": "/images/PUERTAS/AI/l5859/door-l5859",
  "door-p101-ia": "/images/PUERTAS/ACERO/p101/door-p101",
  "door-p102-ia": "/images/PUERTAS/ACERO/p102/door-p102",
  "door-p105-ia": "/images/PUERTAS/ACERO/p105/door-p105",
  "door-p107-ia": "/images/PUERTAS/ACERO/p107/door-p107",
  "door-t200": "/images/PUERTAS/AI/t200/door-t200",
  "door-p103": "/images/PUERTAS/ACERO/p103/door-p103",
  "door-p106": "/images/PUERTAS/ACERO/p106/door-p106",
  "door-p108": "/images/PUERTAS/ACERO/p108/door-p108",
  "door-s108": "/images/PUERTAS/ACERO/s108/door-s108",
  "door-s108-pro": "/images/PUERTAS/ACERO/s108-pro/door-s108-pro",
  "door-s116": "/images/PUERTAS/ACERO/s116/door-s116",
  "door-s118": "/images/PUERTAS/ACERO/s118/door-s118",
  "door-s119": "/images/PUERTAS/ACERO/s119/door-s119",
  "door-s121": "/images/PUERTAS/ACERO/s121/door-s121",
  "door-y106": "/images/PUERTAS/ACERO/y106/door-y106",
  "door-y116": "/images/PUERTAS/ACERO/y116/door-y116",
  "door-y118": "/images/PUERTAS/ACERO/y118/door-y118",
  "door-y119": "/images/PUERTAS/ACERO/y119/door-y119",
  "door-cj03": "/images/PUERTAS/ACERO/cj03/door-cj03",
  "door-cl058": "/images/PUERTAS/ACERO/cl058/door-cl058",
  "door-cl097-pro": "/images/PUERTAS/ACERO/cl097-pro/door-cl097-pro",
  "door-cl23": "/images/PUERTAS/ACERO/cl23/door-cl23",
  "door-cl36": "/images/PUERTAS/ACERO/cl36/door-cl36",
  "door-cl37": "/images/PUERTAS/ACERO/cl37/door-cl37",
  "door-cl38": "/images/PUERTAS/ACERO/cl38/door-cl38",
  "door-cl39": "/images/PUERTAS/ACERO/cl39/door-cl39",
  "door-cl50": "/images/PUERTAS/ACERO/cl50/door-cl50",
  "door-cl51": "/images/PUERTAS/ACERO/cl51/door-cl51",
  "door-cl55": "/images/PUERTAS/ACERO/cl55/door-cl55",
  "door-cl56": "/images/PUERTAS/ACERO/cl56/door-cl56",
  "door-cl59": "/images/PUERTAS/ACERO/cl59/door-cl59",
  "door-cl60": "/images/PUERTAS/ACERO/cl60/door-cl60",
  "door-cl62": "/images/PUERTAS/ACERO/cl62/door-cl62",
  "door-cl63": "/images/PUERTAS/ACERO/cl63/door-cl63",
  "door-cl65": "/images/PUERTAS/ACERO/cl65/door-cl65",
  "door-cl66": "/images/PUERTAS/ACERO/cl66/door-cl66",
  "door-cl72": "/images/PUERTAS/ACERO/cl72/door-cl72",
  "door-cl96": "/images/PUERTAS/ACERO/cl96/door-cl96",
  "door-contemporary": "/images/PUERTAS/ACERO/contemporary/door-contemporary",
  "door-gf061": "/images/PUERTAS/ACERO/gf061/door-gf061",
  "door-gf090": "/images/PUERTAS/ACERO/gf090/door-gf090",
  "door-gf091": "/images/PUERTAS/ACERO/gf091/door-gf091",
  "door-gf092": "/images/PUERTAS/ACERO/gf092/door-gf092",
  "door-gl083": "/images/PUERTAS/ACERO/gl083/door-gl083",
  "door-gl097-pro": "/images/PUERTAS/ACERO/gl097-pro/door-gl097-pro",
  "door-gl097": "/images/PUERTAS/ACERO/gl097/door-gl097",
  "door-gl098-pro": "/images/PUERTAS/ACERO/gl098-pro/door-gl098-pro",
  "door-gl098": "/images/PUERTAS/ACERO/gl098/door-gl098",
  "door-gl099": "/images/PUERTAS/ACERO/gl099/door-gl099",
  "door-gl123-1": "/images/PUERTAS/ACERO/gl123-1/door-gl123-1",
  "door-gl23": "/images/PUERTAS/ACERO/gl23/door-gl23",
  "door-glory-pro": "/images/PUERTAS/ACERO/glory-pro/door-glory-pro",
  "door-glory": "/images/PUERTAS/ACERO/glory/door-glory",
  "door-jd073": "/images/PUERTAS/ACERO/jd073/door-jd073",
  "door-l5601": "/images/PUERTAS/ACERO/l5601/door-l5601",
  "door-lingan": "/images/PUERTAS/ACERO/lingan/door-lingan",
  "door-mid-night": "/images/PUERTAS/ACERO/mid-night/door-mid-night",
  "door-n9518": "/images/PUERTAS/ACERO/n9518/door-n9518",
  "door-n9519": "/images/PUERTAS/ACERO/n9519/door-n9519",
  "door-n9520": "/images/PUERTAS/ACERO/n9520/door-n9520",
  "door-nc9020": "/images/PUERTAS/ACERO/nc9020/door-nc9020",
  "door-nc9516": "/images/PUERTAS/ACERO/nc9516/door-nc9516",
  "door-p101": "/images/PUERTAS/ACERO/p101/door-p101",
  "door-p102": "/images/PUERTAS/ACERO/p102/door-p102",
  "door-p105": "/images/PUERTAS/ACERO/p105/door-p105",
  "door-p107": "/images/PUERTAS/ACERO/p107/door-p107",
  "door-s101": "/images/PUERTAS/ACERO/s101/door-s101",
  "door-wl001": "/images/PUERTAS/ACORAZADA/wl001/door-wl001",
  "door-wl002": "/images/PUERTAS/ACORAZADA/wl002/door-wl002",
  "door-wl003": "/images/PUERTAS/ACORAZADA/wl003/door-wl003",
  "door-wl005": "/images/PUERTAS/ACORAZADA/wl005/door-wl005",
  "door-wl006": "/images/PUERTAS/ACORAZADA/wl006/door-wl006",
  "door-wl007": "/images/PUERTAS/ACORAZADA/wl007/door-wl007",
  "door-wl008": "/images/PUERTAS/ACORAZADA/wl008/door-wl008",
  "door-wl009": "/images/PUERTAS/ACORAZADA/wl009/door-wl009",
  "door-wl010": "/images/PUERTAS/ACORAZADA/wl010/door-wl010",
  "door-wl011": "/images/PUERTAS/ACORAZADA/wl011/door-wl011",
  "door-wl012": "/images/PUERTAS/ACORAZADA/wl012/door-wl012",
  "door-wl013": "/images/PUERTAS/ACORAZADA/wl013/door-wl013",
  "door-wl015": "/images/PUERTAS/ACORAZADA/wl015/door-wl015",
  "door-wl016": "/images/PUERTAS/ACORAZADA/wl016/door-wl016",
  "door-wl017": "/images/PUERTAS/ACORAZADA/wl017/door-wl017",
  "door-wl018": "/images/PUERTAS/ACORAZADA/wl018/door-wl018",
  "door-wl019": "/images/PUERTAS/ACORAZADA/wl019/door-wl019",
  "door-wl020": "/images/PUERTAS/ACORAZADA/wl020/door-wl020",
  "door-wl021": "/images/PUERTAS/ACORAZADA/wl021/door-wl021",
  "door-wl022": "/images/PUERTAS/ACORAZADA/wl022/door-wl022",
  "door-wl023": "/images/PUERTAS/ACORAZADA/wl023/door-wl023",
  "door-wl025": "/images/PUERTAS/ACORAZADA/wl025/door-wl025",
  "door-wl026": "/images/PUERTAS/ACORAZADA/wl026/door-wl026",
  "door-wl027": "/images/PUERTAS/ACORAZADA/wl027/door-wl027",
  "door-wl028": "/images/PUERTAS/ACORAZADA/wl028/door-wl028",
  "door-wl029": "/images/PUERTAS/ACORAZADA/wl029/door-wl029",
  "door-castle": "/images/PUERTAS/ALUMINIO/castle/door-castle",
  "door-chaohe": "/images/PUERTAS/ALUMINIO/chaohe/door-chaohe",
  "door-chaoling": "/images/PUERTAS/ALUMINIO/chaoling/door-chaoling",
  "door-chaopu": "/images/PUERTAS/ALUMINIO/chaopu/door-chaopu",
  "door-chaose": "/images/PUERTAS/ALUMINIO/chaose/door-chaose",
  "door-dihua": "/images/PUERTAS/ALUMINIO/dihua/door-dihua",
  "door-dongseliunian": "/images/PUERTAS/ALUMINIO/dongseliunian/door-dongseliunian",
  "door-heidelberg": "/images/PUERTAS/ALUMINIO/heidelberg/door-heidelberg",
  "door-jinghong": "/images/PUERTAS/ALUMINIO/jinghong/door-jinghong",
  "door-lange": "/images/PUERTAS/ALUMINIO/lange/door-lange",
  "door-louis": "/images/PUERTAS/ALUMINIO/louis/door-louis",
  "door-luyi": "/images/PUERTAS/ALUMINIO/luyi/door-luyi",
  "door-makailen": "/images/PUERTAS/ALUMINIO/makailen/door-makailen",
  "door-mingmenguizu": "/images/PUERTAS/ALUMINIO/mingmenguizu/door-mingmenguizu",
  "door-prada": "/images/PUERTAS/ALUMINIO/prada/door-prada",
  "door-pulada": "/images/PUERTAS/ALUMINIO/pulada/door-pulada",
  "door-ruihe": "/images/PUERTAS/ALUMINIO/ruihe/door-ruihe",
  "door-ruoyin": "/images/PUERTAS/ALUMINIO/ruoyin/door-ruoyin",
  "door-sabo": "/images/PUERTAS/ALUMINIO/sabo/door-sabo",
  "door-saina": "/images/PUERTAS/ALUMINIO/saina/door-saina",
  "door-senna": "/images/PUERTAS/ALUMINIO/senna/door-senna",
  "door-shengshi": "/images/PUERTAS/ALUMINIO/shengshi/door-shengshi",
  "door-wave": "/images/PUERTAS/ALUMINIO/wave/door-wave",
  "door-woodland": "/images/PUERTAS/ALUMINIO/woodland/door-woodland",
  "door-yashang": "/images/PUERTAS/ALUMINIO/yashang/door-yashang",
  "door-wl-dt08": "/images/PUERTAS/BAJOCARBONO/wl-dt08/door-wl-dt08",
  "door-wl-dt103": "/images/PUERTAS/BAJOCARBONO/wl-dt103/door-wl-dt103",
  "door-wl-dt107": "/images/PUERTAS/BAJOCARBONO/wl-dt107/door-wl-dt107",
  "door-tdf-2003": "/images/PUERTAS/COBRE/tdf-2003/door-tdf-2003",
  "door-tdf-2009": "/images/PUERTAS/COBRE/tdf-2009/door-tdf-2009",
  "door-WL-A23001": "/images/PUERTAS/CORREDIZA/wl-a23001/door-wl-a23001",
  "door-wl-a23001": "/images/PUERTAS/CORREDIZA/wl-a23001/door-wl-a23001",
  "door-WL-A23002": "/images/PUERTAS/CORREDIZA/wl-a23002/door-wl-a23002",
  "door-wl-a23002": "/images/PUERTAS/CORREDIZA/wl-a23002/door-wl-a23002",
  "door-WL-A23019": "/images/PUERTAS/CORREDIZA/wl-a23019/door-wl-a23019",
  "door-wl-a23019": "/images/PUERTAS/CORREDIZA/wl-a23019/door-wl-a23019",
  "door-WL-A23020": "/images/PUERTAS/CORREDIZA/wl-a23020/door-wl-a23020",
  "door-wl-a23020": "/images/PUERTAS/CORREDIZA/wl-a23020/door-wl-a23020",
  "door-gd-01": "/images/PUERTAS/CORTAFUEGO/gd-01/door-gd-01",
  "door-gd-02": "/images/PUERTAS/CORTAFUEGO/gd-02/door-gd-02",
  "door-gd-03": "/images/PUERTAS/CORTAFUEGO/gd-03/door-gd-03",
  "door-gf026": "/images/PUERTAS/CORTAFUEGO/gf026/door-gf026",
  "door-td-01": "/images/PUERTAS/CORTAFUEGO/td-01/door-td-01",
  "door-td-02": "/images/PUERTAS/CORTAFUEGO/td-02/door-td-02",
  "door-td-03": "/images/PUERTAS/CORTAFUEGO/td-03/door-td-03",
  "door-gk-01": "/images/PUERTAS/EVACUACION/gk-01/door-gk-01",
  "door-gk-02": "/images/PUERTAS/EVACUACION/gk-02/door-gk-02",
  "door-gk-03": "/images/PUERTAS/EVACUACION/gk-03/door-gk-03",
  "door-mk-01": "/images/PUERTAS/EVACUACION/mk-01/door-mk-01",
  "door-mk-02": "/images/PUERTAS/EVACUACION/mk-02/door-mk-02",
  "door-mk-03": "/images/PUERTAS/EVACUACION/mk-03/door-mk-03",
  "door-5203": "/images/PUERTAS/MADERAACÚSTICA/5203/door-5203",
  "door-s203": "/images/PUERTAS/MADERAACÚSTICA/s203/door-s203",
  "door-wl-5103": "/images/PUERTAS/MADERAACÚSTICA/wl-5103/door-wl-5103",
  "door-wl-5105": "/images/PUERTAS/MADERAACÚSTICA/wl-5105/door-wl-5105",
  "door-wl-5107": "/images/PUERTAS/MADERAACÚSTICA/wl-5107/door-wl-5107",
  "door-wl-5109": "/images/PUERTAS/MADERAACÚSTICA/wl-5109/door-wl-5109",
  "door-wl-5110": "/images/PUERTAS/MADERAACÚSTICA/wl-5110/door-wl-5110",
  "door-wl-5117": "/images/PUERTAS/MADERAACÚSTICA/wl-5117/door-wl-5117",
  "door-wl-5203": "/images/PUERTAS/MADERAACÚSTICA/wl-5203/door-wl-5203",
  "door-wl-5503": "/images/PUERTAS/MADERAACÚSTICA/wl-5503/door-wl-5503",
  "door-wl-d001": "/images/PUERTAS/MADERAACÚSTICA/wl-d001/door-wl-d001",
  "door-wl-d002": "/images/PUERTAS/MADERAACÚSTICA/wl-d002/door-wl-d002",
  "door-wl-d003": "/images/PUERTAS/MADERAACÚSTICA/wl-d003/door-wl-d003",
  "door-wl-d005": "/images/PUERTAS/MADERAACÚSTICA/wl-d005/door-wl-d005",
  "door-wl-d006": "/images/PUERTAS/MADERAACÚSTICA/wl-d006/door-wl-d006",
  "door-wl-d007": "/images/PUERTAS/MADERAACÚSTICA/wl-d007/door-wl-d007",
  "door-wl-d008": "/images/PUERTAS/MADERAACÚSTICA/wl-d008/door-wl-d008",
  "door-wl-d009": "/images/PUERTAS/MADERAACÚSTICA/wl-d009/door-wl-d009",
  "door-wl-d010": "/images/PUERTAS/MADERAACÚSTICA/wl-d010/door-wl-d010",
  "door-wl-d011": "/images/PUERTAS/MADERAACÚSTICA/wl-d011/door-wl-d011",
  "door-wl-d012": "/images/PUERTAS/MADERAACÚSTICA/wl-d012/door-wl-d012",
  "door-wl-d013": "/images/PUERTAS/MADERAACÚSTICA/wl-d013/door-wl-d013",
  "door-wl-d015": "/images/PUERTAS/MADERAACÚSTICA/wl-d015/door-wl-d015",
  "door-wl-d016": "/images/PUERTAS/MADERAACÚSTICA/wl-d016/door-wl-d016",
  "door-wl-d017": "/images/PUERTAS/MADERAACÚSTICA/wl-d017/door-wl-d017",
  "door-wl-d018": "/images/PUERTAS/MADERAACÚSTICA/wl-d018/door-wl-d018",
  "door-wl-d019": "/images/PUERTAS/MADERAACÚSTICA/wl-d019/door-wl-d019",
  "door-wl-d020": "/images/PUERTAS/MADERAACÚSTICA/wl-d020/door-wl-d020",
  "door-wl-d021": "/images/PUERTAS/MADERAACÚSTICA/wl-d021/door-wl-d021",
  "door-wl-d022": "/images/PUERTAS/MADERAACÚSTICA/wl-d022/door-wl-d022",
  "door-wl-d023": "/images/PUERTAS/MADERAACÚSTICA/wl-d023/door-wl-d023",
  "door-wl-d025": "/images/PUERTAS/MADERAACÚSTICA/wl-d025/door-wl-d025",
  "door-wl-d026": "/images/PUERTAS/MADERAACÚSTICA/wl-d026/door-wl-d026",
  "door-wl-d027": "/images/PUERTAS/MADERAACÚSTICA/wl-d027/door-wl-d027",
  "door-wl-d028": "/images/PUERTAS/MADERAACÚSTICA/wl-d028/door-wl-d028",
  "door-wl-d029": "/images/PUERTAS/MADERAACÚSTICA/wl-d029/door-wl-d029",
  "door-wl-d030": "/images/PUERTAS/MADERAACÚSTICA/wl-d030/door-wl-d030",
  "door-wl-d031": "/images/PUERTAS/MADERAACÚSTICA/wl-d031/door-wl-d031",
  "door-wl-d032": "/images/PUERTAS/MADERAACÚSTICA/wl-d032/door-wl-d032",
  "door-wl-d033": "/images/PUERTAS/MADERAACÚSTICA/wl-d033/door-wl-d033",
  "door-wl-d036": "/images/PUERTAS/MADERAACÚSTICA/wl-d036/door-wl-d036",
  "door-wl-d037": "/images/PUERTAS/MADERAACÚSTICA/wl-d037/door-wl-d037",
  "door-wl-d038": "/images/PUERTAS/MADERAACÚSTICA/wl-d038/door-wl-d038",
  "door-wl-j001": "/images/PUERTAS/MADERAACÚSTICA/wl-j001/door-wl-j001",
  "door-wl-j002": "/images/PUERTAS/MADERAACÚSTICA/wl-j002/door-wl-j002",
  "door-wl-j003": "/images/PUERTAS/MADERAACÚSTICA/wl-j003/door-wl-j003",
  "door-wl-j005": "/images/PUERTAS/MADERAACÚSTICA/wl-j005/door-wl-j005",
  "door-wl-j006": "/images/PUERTAS/MADERAACÚSTICA/wl-j006/door-wl-j006",
  "door-wl-j008": "/images/PUERTAS/MADERAACÚSTICA/wl-j008/door-wl-j008",
  "door-wl-j009": "/images/PUERTAS/MADERAACÚSTICA/wl-j009/door-wl-j009",
  "door-wl-j010": "/images/PUERTAS/MADERAACÚSTICA/wl-j010/door-wl-j010",
  "door-wl-j011": "/images/PUERTAS/MADERAACÚSTICA/wl-j011/door-wl-j011",
  "door-wl-j012": "/images/PUERTAS/MADERAACÚSTICA/wl-j012/door-wl-j012",
  "door-wl-s001": "/images/PUERTAS/MADERAACÚSTICA/wl-s001/door-wl-s001",
  "door-wl-s002": "/images/PUERTAS/MADERAACÚSTICA/wl-s002/door-wl-s002",
  "door-wl-s003": "/images/PUERTAS/MADERAACÚSTICA/wl-s003/door-wl-s003",
  "door-wl-s005": "/images/PUERTAS/MADERAACÚSTICA/wl-s005/door-wl-s005",
  "door-wl-s008": "/images/PUERTAS/MADERAACÚSTICA/wl-s008/door-wl-s008",
  "door-wl-s009": "/images/PUERTAS/MADERAACÚSTICA/wl-s009/door-wl-s009",
  "door-wl-s010": "/images/PUERTAS/MADERAACÚSTICA/wl-s010/door-wl-s010",
  "door-wl-s011": "/images/PUERTAS/MADERAACÚSTICA/wl-s011/door-wl-s011",
  "door-wl-s012": "/images/PUERTAS/MADERAACÚSTICA/wl-s012/door-wl-s012",
  "door-wl-s013": "/images/PUERTAS/MADERAACÚSTICA/wl-s013/door-wl-s013",
  "door-wl-s015": "/images/PUERTAS/MADERAACÚSTICA/wl-s015/door-wl-s015",
  "door-wl-s016": "/images/PUERTAS/MADERAACÚSTICA/wl-s016/door-wl-s016",
  "door-wl-s017": "/images/PUERTAS/MADERAACÚSTICA/wl-s017/door-wl-s017",
  "door-wl-s019": "/images/PUERTAS/MADERAACÚSTICA/wl-s019/door-wl-s019",
  "door-wl-s020": "/images/PUERTAS/MADERAACÚSTICA/wl-s020/door-wl-s020",
  "door-wl-s021": "/images/PUERTAS/MADERAACÚSTICA/wl-s021/door-wl-s021",
  "door-wl-s022": "/images/PUERTAS/MADERAACÚSTICA/wl-s022/door-wl-s022",
  "door-wl-s023": "/images/PUERTAS/MADERAACÚSTICA/wl-s023/door-wl-s023",
  "door-wl-s025": "/images/PUERTAS/MADERAACÚSTICA/wl-s025/door-wl-s025",
  "door-wl-s026": "/images/PUERTAS/MADERAACÚSTICA/wl-s026/door-wl-s026",
  "door-wl-s027": "/images/PUERTAS/MADERAACÚSTICA/wl-s027/door-wl-s027",
  "door-wl-s101b": "/images/PUERTAS/MADERAACÚSTICA/wl-s101b/door-wl-s101b",
  "door-wl-s102b": "/images/PUERTAS/MADERAACÚSTICA/wl-s102b/door-wl-s102b",
  "door-wl-s103b": "/images/PUERTAS/MADERAACÚSTICA/wl-s103b/door-wl-s103b",
  "door-wl-s108": "/images/PUERTAS/MADERAACÚSTICA/wl-s108/door-wl-s108",
  "door-wl-s201": "/images/PUERTAS/MADERAACÚSTICA/wl-s201/door-wl-s201",
  "door-wl-s205": "/images/PUERTAS/MADERAACÚSTICA/wl-s205/door-wl-s205",
  "door-wl-s206": "/images/PUERTAS/MADERAACÚSTICA/wl-s206/door-wl-s206",
  "door-wl-s207": "/images/PUERTAS/MADERAACÚSTICA/wl-s207/door-wl-s207",
  "door-wl-s208": "/images/PUERTAS/MADERAACÚSTICA/wl-s208/door-wl-s208",
  "door-wl-s209": "/images/PUERTAS/MADERAACÚSTICA/wl-s209/door-wl-s209",
  "door-wl-s210": "/images/PUERTAS/MADERAACÚSTICA/wl-s210/door-wl-s210",
  "door-wl-p001": "/images/PUERTAS/PVC/wl-p001/door-wl-p001",
  "door-wl-p002": "/images/PUERTAS/PVC/wl-p002/door-wl-p002",
  "door-wl-p003": "/images/PUERTAS/PVC/wl-p003/door-wl-p003",
  "door-wl-p005": "/images/PUERTAS/PVC/wl-p005/door-wl-p005",
  "door-wl-p006": "/images/PUERTAS/PVC/wl-p006/door-wl-p006",
  "door-wl-p007": "/images/PUERTAS/PVC/wl-p007/door-wl-p007",
  "door-wl-p008": "/images/PUERTAS/PVC/wl-p008/door-wl-p008",
  "door-wl-p009": "/images/PUERTAS/PVC/wl-p009/door-wl-p009",
  "door-wl-p010": "/images/PUERTAS/PVC/wl-p010/door-wl-p010",
  "door-wl-p011": "/images/PUERTAS/PVC/wl-p011/door-wl-p011",
  "door-wl-p015": "/images/PUERTAS/PVC/wl-p015/door-wl-p015",
  "door-wl-p016": "/images/PUERTAS/PVC/wl-p016/door-wl-p016",
  "door-wl-p201": "/images/PUERTAS/PVC/wl-p201/door-wl-p201",
});

const normalizeProductImageKey = (value = "") => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const AI_VARIANTS_BY_NORMALIZED_PRODUCT = Object.freeze(
  Object.fromEntries(
    Object.entries(AI_VARIANTS_BY_PRODUCT).map(([productImageKey, basePath]) => [
      normalizeProductImageKey(productImageKey),
      basePath,
    ]),
  ),
);

const getAiVariantPath = (productImageKey, colorHex) => {
  const basePath = AI_VARIANTS_BY_PRODUCT[productImageKey]
    || AI_VARIANTS_BY_NORMALIZED_PRODUCT[normalizeProductImageKey(productImageKey)];
  const suffix = AI_VARIANT_SUFFIX_BY_HEX[colorHex];
  return basePath && suffix ? `${basePath}-${suffix}-ai.webp` : null;
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
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    setSelectedColor(null);
  }, [product?.name]);

  useEffect(() => {
    previouslyFocusedElementRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const handleDialogKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = [...dialogRef.current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter((element) => element instanceof HTMLElement && element.offsetParent !== null);

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeyDown);
    return () => {
      document.removeEventListener("keydown", handleDialogKeyDown);
      if (previouslyFocusedElementRef.current instanceof HTMLElement) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [onClose]);

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
  const aiVariant = getAiVariantPath(productImageKey, selectedColor?.hex);
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
        ref={dialogRef}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.8 }}
        style={{ willChange: "transform" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="door-product-title"
        aria-describedby="door-product-description"
        className="relative bg-white w-full max-w-[900px] h-full shadow-2xl flex flex-col md:flex-row z-10"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={`Cerrar ficha de ${product.name}`}
          className="absolute top-4 left-4 z-20 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-black hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Imagen en Modal */}
        <div className="relative flex min-h-[440px] w-full shrink-0 flex-col items-center justify-center bg-[#F8F8F8] px-6 pb-5 pt-12 md:h-full md:min-h-0 md:w-1/2 md:p-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="relative h-[300px] w-full shrink-0 md:h-full md:max-h-[500px]"
          >
            <Image
              key={selectedImage}
              src={selectedImage}
              alt={product.name}
              fill
              priority // Carga prioritaria
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain mix-blend-multiply"
            />
          </motion.div>

          {selectedColor && (
            <div className="relative mt-3 w-[min(280px,100%)] rounded-2xl border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur md:absolute md:bottom-5 md:left-1/2 md:mt-0 md:w-[min(360px,calc(100%-2rem))] md:-translate-x-1/2 md:p-4">
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
          <h2 id="door-product-title" className="text-3xl font-bold mb-4 text-gray-900 tracking-tight">{product.name}</h2>
          <p id="door-product-description" className="text-sm text-gray-600 mb-8 leading-relaxed">{product.description}</p>

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
                La visualización es orientativa; el acabado puede variar según la pantalla y el material de la puerta.
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
                        <Image src={item.img} alt={item.name} fill sizes="(max-width: 768px) 50vw, 160px" className="object-contain p-2" onError={(e) => { e.target.style.display = 'none'; }} />
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
                        <Image src={item.img} alt={item.name} fill sizes="(max-width: 768px) 50vw, 160px" className="object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
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
const ProductCard = forwardRef(function ProductCard({ product, onClick, priority = false }, ref) {
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
    <motion.button
      ref={ref}
      type="button"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      aria-label={`Ver detalles de ${product.name}`}
      className="group flex h-full w-full appearance-none flex-col bg-transparent text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
    >
      {/* IMAGEN FLOTANTE */}
      <div className="relative aspect-[3/5] bg-[#FCFCFC] mb-4 overflow-hidden border border-transparent group-hover:border-gray-100 transition-all rounded-sm">
        <div className="absolute inset-x-[7%] bottom-[6%] top-[7%]">
          <Image
            src={product.img}
            alt={product.name}
            fill
            priority={priority}
            quality={82}
            className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04] mix-blend-multiply"
            sizes="(max-width: 767px) 44vw, (max-width: 1279px) 30vw, 220px"
          />
        </div>

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
    </motion.button>
  );
});

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
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isInteriorOpen, setIsInteriorOpen] = useState(false);
  const gridTopRef = useRef(null);
  const catalogueRequestRef = useRef(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [searchTerm]);

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
    const requestId = ++catalogueRequestRef.current;

    async function fetchProducts() {
      setLoading(true);
      setLoadingMore(false);
      setProducts([]);

      let query = supabase
        .from('products')
        .select('*', { count: 'exact' })
        .order('id', { ascending: true });

      query = applyProductFilters(query, activeCategory, debouncedSearchTerm)
        .range(0, PRODUCT_PAGE_SIZE - 1);

      const { data, error, count } = await query;
      if (requestId !== catalogueRequestRef.current) return;

      if (error) {
        console.error("Error cargando productos:", error);
        setProducts([]);
        setTotalProducts(0);
      } else {
        setProducts(data || []);
        setTotalProducts(count ?? data?.length ?? 0);
      }
      setLoading(false);
    }

    fetchProducts();
  }, [activeCategory, debouncedSearchTerm]);

  const loadMoreProducts = async () => {
    if (loading || loadingMore || products.length >= totalProducts) return;

    const requestId = catalogueRequestRef.current;
    const rangeStart = products.length;
    setLoadingMore(true);

    let query = supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    query = applyProductFilters(query, activeCategory, debouncedSearchTerm)
      .range(rangeStart, rangeStart + PRODUCT_PAGE_SIZE - 1);

    const { data, error } = await query;
    if (requestId !== catalogueRequestRef.current) return;

    if (error) {
      console.error("Error cargando más productos:", error);
    } else {
      setProducts((currentProducts) => {
        const currentIds = new Set(currentProducts.map((product) => product.id));
        const newProducts = (data || []).filter((product) => !currentIds.has(product.id));
        return [...currentProducts, ...newProducts];
      });
    }

    setLoadingMore(false);
  };

  const hasMoreProducts = products.length < totalProducts;

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
              sizes="100vw"
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
              <span className="text-xs font-bold uppercase tracking-widest text-gray-900" aria-live="polite">
                {activeCategory === "TODAS" ? "Catálogo Completo" : activeCategory} <span className="text-gray-400 ml-2">({totalProducts})</span>
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
                  {products.map((p, index) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onClick={() => setSelectedProduct(p)}
                      priority={index < 4}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {!loading && hasMoreProducts && (
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={loadMoreProducts}
                  disabled={loadingMore}
                  aria-label={`Cargar más puertas. Mostrando ${products.length} de ${totalProducts}`}
                  className="inline-flex min-w-48 items-center justify-center gap-2 border border-black bg-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-60"
                >
                  {loadingMore && <Loader2 className="animate-spin" size={14} aria-hidden="true" />}
                  {loadingMore ? "Cargando..." : `Ver más (${products.length} de ${totalProducts})`}
                </button>
              </div>
            )}

            {!loading && products.length === 0 && (
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
