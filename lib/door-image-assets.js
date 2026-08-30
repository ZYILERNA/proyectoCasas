const LOGO_FREE_BASE_IMAGE_PATHS = new Set([
  "/images/PUERTAS/ACERO/door-cl96.webp",
  "/images/PUERTAS/ACERO/door-contemporary.webp",
  "/images/PUERTAS/ACERO/door-gl098.webp",
  "/images/PUERTAS/ACERO/door-gl099.webp",
  "/images/PUERTAS/ACERO/door-jd073.webp",
  "/images/PUERTAS/ACERO/door-l5601.webp",
  "/images/PUERTAS/ACERO/door-mid-night.webp",
  "/images/PUERTAS/ACERO/door-n9518.webp",
  "/images/PUERTAS/ACERO/door-p101.webp",
  "/images/PUERTAS/ACERO/door-p103.webp",
  "/images/PUERTAS/ACERO/door-p105.webp",
  "/images/PUERTAS/ACERO/door-p106.webp",
  "/images/PUERTAS/ACERO/door-p107.webp",
  "/images/PUERTAS/ACERO/door-s108.webp",
  "/images/PUERTAS/ACERO/door-s108-pro.webp",
  "/images/PUERTAS/ACERO/door-s119.webp",
  "/images/PUERTAS/ACERO/door-s121.webp",
  "/images/PUERTAS/ACERO/door-y106.webp",
  "/images/PUERTAS/ACERO/door-y118.webp",
  "/images/PUERTAS/ACERO/door-y119.webp",
  "/images/PUERTAS/ACORAZADA/door-wl006.webp",
  "/images/PUERTAS/ACORAZADA/door-wl007.webp",
  "/images/PUERTAS/ACORAZADA/door-wl008.webp",
  "/images/PUERTAS/ACORAZADA/door-wl015.webp",
  "/images/PUERTAS/ACORAZADA/door-wl016.webp",
  "/images/PUERTAS/ACORAZADA/door-wl017.webp",
  "/images/PUERTAS/AI/door-k300-pro.webp",
  "/images/PUERTAS/AI/door-l5857.webp",
  "/images/PUERTAS/AI/door-l5859.webp",
  "/images/PUERTAS/AI/door-x50.webp",
  "/images/PUERTAS/AI/door-x50-max.webp",
  "/images/PUERTAS/AI/door-x50-pro.webp",
  "/images/PUERTAS/AI/door-x60-pro.webp",
  "/images/PUERTAS/AI/door-x70-shunliu.webp",
]);

const LOGO_FREE_VARIANT_DIRECTORIES = new Set([
  "/images/PUERTAS/ACERO/cl96",
  "/images/PUERTAS/ACERO/contemporary",
  "/images/PUERTAS/ACERO/gl098",
  "/images/PUERTAS/ACERO/jd073",
  "/images/PUERTAS/ACERO/l5601",
  "/images/PUERTAS/ACERO/mid-night",
  "/images/PUERTAS/ACERO/n9518",
  "/images/PUERTAS/ACERO/p101",
  "/images/PUERTAS/ACERO/p105",
  "/images/PUERTAS/ACERO/p106",
  "/images/PUERTAS/ACERO/p107",
  "/images/PUERTAS/ACERO/s108",
  "/images/PUERTAS/ACERO/s108-pro",
  "/images/PUERTAS/ACERO/s119",
  "/images/PUERTAS/ACERO/s121",
  "/images/PUERTAS/ACERO/y106",
  "/images/PUERTAS/ACERO/y118",
  "/images/PUERTAS/ACERO/y119",
  "/images/PUERTAS/ACORAZADA/wl006",
  "/images/PUERTAS/ACORAZADA/wl015",
  "/images/PUERTAS/AI/k300-pro",
  "/images/PUERTAS/AI/l5857",
  "/images/PUERTAS/AI/l5859",
  "/images/PUERTAS/AI/x50",
  "/images/PUERTAS/AI/x50-max",
  "/images/PUERTAS/AI/x50-pro",
  "/images/PUERTAS/AI/x60-pro",
  "/images/PUERTAS/AI/x70-shunliu",
]);

const LOGO_FREE_WALLPAPER_SLUGS = new Set([
  "chaobu",
  "chaohe",
  "chaoling",
  "cl96",
  "dihua",
  "gl097pro",
  "gl098pro",
  "k300pro",
  "l5601",
  "l5857",
  "l5859",
  "louis",
  "mclaren",
  "n9519",
  "p101",
  "p102",
  "p103",
  "p105",
  "p106",
  "p107",
  "pulada",
  "s101",
  "s108",
  "s108pro",
  "s116",
  "s119",
  "s121",
  "sabo",
  "saina",
  "shengshi",
  "t200",
  "wl001",
  "x50max",
  "x50pro",
  "x60pro",
  "x70shunliu",
  "y106",
  "y118",
  "y119",
]);

export const getLogoFreeDoorImagePath = (imagePath = "") => {
  const queryIndex = imagePath.indexOf("?");
  const assetPath = queryIndex >= 0 ? imagePath.slice(0, queryIndex) : imagePath;
  const query = queryIndex >= 0 ? imagePath.slice(queryIndex) : "";

  return LOGO_FREE_BASE_IMAGE_PATHS.has(assetPath)
    ? `${assetPath.replace(/\.webp$/i, ".png")}${query}`
    : imagePath;
};

export const getDoorVariantExtension = (directory, slug) => (
  LOGO_FREE_VARIANT_DIRECTORIES.has(`${directory}/${slug}`) ? "png" : "webp"
);

export const getDoorWallpaperExtension = (slug) => (
  LOGO_FREE_WALLPAPER_SLUGS.has(slug) ? "png" : "webp"
);
