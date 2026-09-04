import {
  WONLY_2026_CATEGORY,
  WONLY_2026_MODEL_NAMES,
} from "../../lib/wonly-2026-door-assets";

export const PRODUCT_PAGE_SIZE = 24;
export const PRODUCT_CARD_FIELDS = "id,name,category,img";
export const CATALOGUE_CACHE_TTL_MS = 5 * 60 * 1000;

export const CATEGORIAS = [
  WONLY_2026_CATEGORY,
  "PUERTA DE SEGURIDAD IA",
  "PUERTA DE ALUMINIO FUNDIDO",
  "PUERTA DE ACERO FUNDIDO",
  "PUERTA DE ACERO REFORZADO",
  "PUERTA DE SEGURIDAD ACORAZADA",
  "PUERTAS CORREDIZAS Y ABATIBLES",
  "PUERTA COMERCIAL CORTAFUEGO",
  "PUERTA DE EVACUACIÓN",
  "PUERTA DE COBRE COMPUESTA",
  "PUERTA MÉDICA",
];

export const CATEGORIAS_INTERIOR = [
  "PUERTA ACÚSTICA DE MADERA",
  "PUERTA MINIMALISTA",
  "PUERTA DE BAJO CARBONO",
  "PUERTA DE PVC",
];

export const ALL_CATEGORIES = new Set([
  ...CATEGORIAS,
  ...CATEGORIAS_INTERIOR,
]);

export const sanitizeSearchTerm = (searchTerm = "") => searchTerm
  .trim()
  .replace(/[^\p{L}\p{N}\s-]/gu, " ")
  .replace(/\s+/g, " ");

export const applyProductFilters = (query, category, searchTerm = "") => {
  let filteredQuery = query;

  if (category === WONLY_2026_CATEGORY) {
    filteredQuery = filteredQuery.in("name", WONLY_2026_MODEL_NAMES);
  } else if (category !== "TODAS") {
    filteredQuery = filteredQuery.eq("category", category);
  }

  const safeSearchTerm = sanitizeSearchTerm(searchTerm);
  if (safeSearchTerm) {
    filteredQuery = filteredQuery.or(
      `name.ilike.%${safeSearchTerm}%,description.ilike.%${safeSearchTerm}%`,
    );
  }

  return filteredQuery;
};

export const getCatalogueCacheKey = (category, searchTerm = "") => (
  `${category}::${sanitizeSearchTerm(searchTerm).toLocaleLowerCase("es")}`
);
