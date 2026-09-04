export const WONLY_2026_CATEGORY = "NOVEDADES WONLY 2026";

export const WONLY_2026_MODEL_NAMES = [
  "WL-G021", "WL-G023", "WL-G027", "WL-G022", "WL-G025", "WL-G026",
  "WL-D039", "WL-D050", "WL-D051", "WL-D052", "WL-D053", "WL-D055",
  "WL-D056", "WL-D057", "WL-D059", "WL-D058", "WL-D061", "WL-D060",
  "WL-D062", "WL-D063", "WL-D101B", "WL-D102B", "WL-J007",
  "WL-P012", "WL-P013", "WL-P017", "WL-P019", "WL-P018", "WL-P020",
  "WL-P101B", "WL-P102B", "WL-BS022", "WL-S006", "WL-S007", "WL-C32",
  "WL-S211", "WL-C33", "WL-S202", "WL-S212", "WL-S212B", "WL-S213",
  "WL-S213B", "WL-LHJ001", "WL-YT007", "WL-YT013", "WL-ZT001",
  "WL-LHJY001", "WL-YT006", "WL-FT020", "WL-FT031", "WL-FT025", "WL-FT028",
];

const WONLY_2026_MODEL_SET = new Set(WONLY_2026_MODEL_NAMES);

export const WONLY_2026_HARDWARE = [
  { name: "WL-A01 · Cerradura con huella", img: "/images/Asset/Accesorios/WONLY-2026/wl-a01.webp" },
  { name: "WL-WS001 · Negro", img: "/images/Asset/Accesorios/WONLY-2026/wl-ws001.webp" },
  { name: "WL-WS003 · Dorado", img: "/images/Asset/Accesorios/WONLY-2026/wl-ws003.webp" },
  { name: "WL-WS005 · PVD", img: "/images/Asset/Accesorios/WONLY-2026/wl-ws005.webp" },
  { name: "WL-WS009 · Oro", img: "/images/Asset/Accesorios/WONLY-2026/wl-ws009.webp" },
  { name: "WL-W013 · Gris cañón", img: "/images/Asset/Accesorios/WONLY-2026/wl-w013.webp" },
  { name: "WL-W016 · Oro clásico", img: "/images/Asset/Accesorios/WONLY-2026/wl-w016.webp" },
  { name: "WL-W103 · Negro", img: "/images/Asset/Accesorios/WONLY-2026/wl-w103.webp" },
];

export const isWonly2026CatalogProduct = (name = "") => (
  WONLY_2026_MODEL_SET.has(name.toUpperCase())
);

export const getWonly2026Wallpaper = (name = "") => (
  isWonly2026CatalogProduct(name)
    ? `/images/PUERTAS/WALLPAPER/2026/${name.toLowerCase()}.webp`
    : null
);
