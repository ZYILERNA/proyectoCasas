const CATEGORY_LABELS = {
  "dining chair": "Sillas de comedor",
  "bar chair": "Taburetes de bar",
  "lounge chair": "Sillones",
  "chaise lounge": "Tumbonas de interior",
  footrest: "Reposapiés",
  stool: "Taburetes",
  bench: "Bancos",
  "sets completos": "Conjuntos completos",
};

// Keep catalogue values intact; translate only the labels people see.
export function getFurnitureCategoryLabel(category) {
  const value = String(category ?? "").trim();
  return CATEGORY_LABELS[value.toLocaleLowerCase("es")] || value;
}

const normalizeSearch = (value) => String(value ?? "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("es")
  .trim();

// Return only known catalogue values; user text is never returned as an alias.
export function getFurnitureCategorySearchAliases(term) {
  const query = normalizeSearch(term);
  if (!query) return [];
  return Object.entries(CATEGORY_LABELS)
    .filter(([category, label]) => normalizeSearch(label).includes(query)
      || normalizeSearch(category).includes(query))
    .map(([category]) => category);
}
