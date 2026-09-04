"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Flame,
  Loader2,
  MoveHorizontal,
  Palette,
  ScanFace,
  Settings,
  ShieldCheck,
  Sparkles,
  VolumeX,
  X,
} from "lucide-react";
import {
  getDoorVariantExtension,
  getDoorWallpaperExtension,
  getLogoFreeDoorImagePath,
} from "../../lib/door-image-assets";
import {
  WONLY_2026_HARDWARE,
  getWonly2026Wallpaper,
  isWonly2026CatalogProduct,
} from "../../lib/wonly-2026-door-assets";

const DOOR_COLORS = [
  { name: "Lacado Negro", hex: "#171717" },
  { name: "Tinte Wengué", hex: "#4A2E1A" },
  { name: "Tinte Gris Oscuro", hex: "#36383A" },
  { name: "Lacado Gris Antracita", hex: "#484A4B" },
  { name: "Tinte Nogal Oscuro", hex: "#5C3524" },
  { name: "Tinte Roble", hex: "#A8784E" },
  { name: "Tinte Gris Claro", hex: "#A5A19A" },
  { name: "Tinte Natural", hex: "#C19A6B" },
  { name: "Lacado Blanco", hex: "#E8E5DE" },
];

const VARIANT_SUFFIX_BY_HEX = Object.freeze({
  "#171717": "negro",
  "#4A2E1A": "wengue",
  "#36383A": "gris-oscuro",
  "#484A4B": "antracita",
  "#5C3524": "nogal",
  "#A8784E": "roble",
  "#A5A19A": "gris-claro",
  "#C19A6B": "natural",
  "#E8E5DE": "blanco",
});

const normalizeAssetSlug = (value = "") => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const getAiVariantPath = (productImagePath, colorHex) => {
  const suffix = VARIANT_SUFFIX_BY_HEX[colorHex];
  const cleanPath = productImagePath?.split("?")[0];
  if (cleanPath?.includes("/2026/")) return null;
  const lastSlashIndex = cleanPath?.lastIndexOf("/") ?? -1;
  if (!suffix || lastSlashIndex < 0) return null;

  const directory = cleanPath.slice(0, lastSlashIndex);
  const imageKey = cleanPath
    .slice(lastSlashIndex + 1)
    .replace(/\.[^.]+$/, "");
  const slug = normalizeAssetSlug(imageKey)
    .replace(/^door-/, "")
    .replace(/-ia$/, "");

  return slug
    ? `${directory}/${slug}/door-${slug}-${suffix}-ai.${getDoorVariantExtension(directory, slug)}`
    : null;
};

const ACCESORIOS_CORREDIZAS = [
  { name: "Manilla VBH con base", img: "/images/Asset/Accesorios/manilla_vbh_base.webp" },
  { name: "Manilla Runas", img: "/images/Asset/Accesorios/manilla_runas.webp" },
  { name: "Manilla VBH sin base", img: "/images/Asset/Accesorios/manilla_vbh_sin_base.webp" },
  { name: "Manilla y Accesorios", img: "/images/Asset/Accesorios/manilla_accesorios_corrediza.webp" },
  { name: "Cerradura de Una Línea", img: "/images/Asset/Accesorios/cerradura_una_linea.webp" },
  { name: "Manilla con Cerradura Ultrafina", img: "/images/Asset/Accesorios/manilla_ultrafina.webp" },
  { name: "A01 Manilla", img: "/images/Asset/Accesorios/a01.webp" },
  { name: "A03 Manilla", img: "/images/Asset/Accesorios/a03.webp" },
  { name: "A04 Manilla", img: "/images/Asset/Accesorios/a04.webp" },
  { name: "A05 Manilla", img: "/images/Asset/Accesorios/a05.webp" },
  { name: "A06 Manilla", img: "/images/Asset/Accesorios/a06.webp" },
  { name: "A07 Manilla", img: "/images/Asset/Accesorios/a07.webp" },
  { name: "B01 One-Line Lock", img: "/images/Asset/Accesorios/b01.webp" },
  { name: "B02 One-Line Lock", img: "/images/Asset/Accesorios/b02.webp" },
  { name: "B03 One-Line Lock", img: "/images/Asset/Accesorios/b03.webp" },
  { name: "B04 One-Line Lock", img: "/images/Asset/Accesorios/b04.webp" },
  { name: "C01 Flat Lock", img: "/images/Asset/Accesorios/c01.webp" },
  { name: "C02 Flat Lock", img: "/images/Asset/Accesorios/c02.webp" },
  { name: "Ultra Narrow Swing Door Flat Lock", img: "/images/Asset/Accesorios/ultra_narrow_flat_lock.webp" },
];

const VIDRIOS_CORREDIZAS = Array.from({ length: 20 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    name: `VIDRIO-${number}`,
    img: `/images/Asset/Vidrios/vidrio-${number}.webp`,
  };
});

const WALLPAPER_DIR = "/images/PUERTAS/WALLPAPER";
const WALLPAPER_SLUGS = new Set([
  "chaobu", "chaohe", "chaoling", "cl96", "dihua", "gl097pro", "gl098pro", "k300max", "k300pro",
  "l5601", "l5857", "l5859", "lingan", "louis", "mclaren", "n9518", "n9519", "n9520", "p101", "p102",
  "p103", "p105", "p106", "p107", "p108", "pulada", "s101", "s108pro", "s116", "s118", "s119", "s121",
  "sabo", "saina", "shengshi", "t200", "tdf-2003", "tdf-2009", "x50max", "x50pro", "x60max", "x60pro",
  "x70jinxiu", "x70shunliu", "y106", "y118", "y119", "s108", "wave", "wl001", "wl-d003", "wl-j001",
  "wl-p001", "wl-s009",
]);
const WALLPAPER_OVERRIDES = { chaopu: "chaobu", makailen: "mclaren" };

const getWallpaper = (name) => {
  if (!name) return null;
  const catalogWallpaper = getWonly2026Wallpaper(name);
  if (catalogWallpaper) return catalogWallpaper;
  const base = name.toLowerCase().replace(/\s+/g, "");
  const slug = WALLPAPER_OVERRIDES[base] || base;
  return WALLPAPER_SLUGS.has(slug)
    ? `${WALLPAPER_DIR}/${slug}.${getDoorWallpaperExtension(slug)}`
    : null;
};

const getCategoryAppearance = (category = "") => {
  if (category.includes("IA")) return { accent: "text-[#866142]", Icon: ScanFace };
  if (category.includes("ACORAZADA")) return { accent: "text-[#866142]", Icon: ShieldCheck };
  if (category.includes("ALUMINIO")) return { accent: "text-[#718096]", Icon: ShieldCheck };
  if (category.includes("MADERA")) return { accent: "text-[#8D6E63]", Icon: VolumeX };
  if (category.includes("PVC")) return { accent: "text-[#866142]", Icon: Sparkles };
  if (category.includes("CORREDIZAS")) return { accent: "text-[#866142]", Icon: MoveHorizontal };
  if (category.includes("CORTAFUEGO")) return { accent: "text-orange-600", Icon: Flame };
  if (category.includes("EVACUACIÓN")) return { accent: "text-red-600", Icon: Flame };
  if (category.includes("MINIMALISTA")) return { accent: "text-stone-500", Icon: Sparkles };
  if (category.includes("BAJO CARBONO")) return { accent: "text-green-600", Icon: Sparkles };
  return { accent: "text-gray-900", Icon: ShieldCheck };
};

const ProductDetailLoading = () => (
  <div className="flex items-center gap-2 py-8 text-xs uppercase tracking-widest text-gray-400" role="status">
    <Loader2 className="animate-spin" size={16} aria-hidden="true" />
    Cargando información…
  </div>
);

const AssetGrid = ({ title, items, objectFit = "object-contain p-2" }) => (
  <div className="mt-6 border-t border-gray-100 pt-6">
    <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase text-[#866142]">
      <Settings size={14} aria-hidden="true" /> {title}
    </h3>
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center rounded border border-gray-100 bg-gray-50 p-3 text-center"
        >
          <div className="relative mb-2 h-20 w-full rounded-sm bg-white">
            <Image
              src={item.img}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 50vw, 160px"
              className={objectFit}
            />
          </div>
          <span className="text-[9px] font-bold leading-tight text-gray-800">{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function ProductModal({
  product,
  loadingDetails = false,
  onClose,
}) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [failedVariant, setFailedVariant] = useState(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    setSelectedColor(null);
    setFailedVariant(null);
  }, [product?.id]);

  useEffect(() => {
    setFailedVariant(null);
  }, [selectedColor?.hex]);

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
      )].filter((element) => (
        element instanceof HTMLElement && element.offsetParent !== null
      ));

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

  const { accent, Icon } = getCategoryAppearance(product.category);
  const wallpaper = getWallpaper(product.name);
  const colorOptions = Array.isArray(product.colors) && product.colors.length > 0
    ? product.colors
    : DOOR_COLORS;
  const showWonly2026Hardware = isWonly2026CatalogProduct(product.name)
    && !product.img?.includes("/CORREDIZA/");
  const supportsInteractiveFinishPreview = !product.img?.includes("/2026/");
  const aiVariant = getAiVariantPath(product.img, selectedColor?.hex);
  const activeVariant = aiVariant && failedVariant !== aiVariant
    ? aiVariant
    : null;
  const selectedImage = activeVariant || getLogoFreeDoorImagePath(product.img);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.button
        type="button"
        aria-label={`Cerrar ficha de ${product.name}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 cursor-default bg-black/60"
        onClick={onClose}
      >
        {wallpaper && (
          <span className="absolute inset-y-0 left-0 right-[900px] hidden overflow-hidden md:block">
            <motion.img
              src={wallpaper}
              alt=""
              aria-hidden="true"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40" />
          </span>
        )}
      </motion.button>

      <motion.div
        ref={dialogRef}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.8 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="door-product-title"
        aria-describedby="door-product-description"
        className="relative z-10 flex h-full w-full max-w-[900px] flex-col bg-white shadow-2xl md:flex-row"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={`Cerrar ficha de ${product.name}`}
          className="absolute left-4 top-4 z-20 rounded-full bg-white/80 p-2 backdrop-blur transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="relative flex min-h-[440px] w-full shrink-0 flex-col items-center justify-center bg-[#F8F8F8] px-6 pb-5 pt-12 md:h-full md:min-h-0 md:w-1/2 md:p-10">
          <div className="relative h-[300px] w-full shrink-0 md:h-full md:max-h-[500px]">
            <Image
              key={selectedImage}
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-contain mix-blend-multiply"
              onError={() => {
                if (activeVariant) setFailedVariant(activeVariant);
              }}
            />
          </div>

        </div>

        <div className="scrollbar-hide w-full overflow-y-auto bg-white p-8 md:w-1/2 md:p-12">
          <span className={`mb-2 block text-[10px] font-bold uppercase tracking-widest ${accent}`}>
            {product.category}
          </span>
          <h2 id="door-product-title" className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h2>
          <p id="door-product-description" className="mb-8 text-sm leading-relaxed text-gray-600">
            {product.description || "Consulta los acabados y características disponibles para este modelo."}
          </p>

          {loadingDetails ? (
            <ProductDetailLoading />
          ) : (
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-gray-900">
                  <Icon size={14} aria-hidden="true" /> Características
                </h3>
                <ul className="space-y-2">
                  {product.features?.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className={`${accent} mt-0.5`} aria-hidden="true">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 text-xs font-bold uppercase tracking-wider text-gray-900">
                  <Palette size={14} aria-hidden="true" /> Acabados y Carta de Colores
                </h3>
                <div
                  className="mb-3 flex flex-wrap justify-center gap-4 rounded-xl bg-gray-50 p-4 md:justify-start"
                  role="group"
                  aria-label="Seleccionar acabado de la puerta"
                >
                  {supportsInteractiveFinishPreview && (
                    <button
                      type="button"
                      onClick={() => setSelectedColor(null)}
                      aria-pressed={selectedColor === null}
                      className="group flex flex-col items-center gap-2 text-center"
                      title="Ver color original"
                    >
                      <span className={`grid h-12 w-12 place-items-center rounded-full border-2 bg-white shadow-md transition ${selectedColor === null ? "scale-110 border-black ring-2 ring-black/10" : "border-white group-hover:scale-110"}`}>
                        <X size={15} className="text-gray-400" aria-hidden="true" />
                      </span>
                      <span className={`max-w-[60px] text-[9px] font-bold uppercase leading-tight ${selectedColor === null ? "text-black" : "text-gray-500"}`}>
                        Original
                      </span>
                    </button>
                  )}

                  {colorOptions.map((color) => {
                    if (!supportsInteractiveFinishPreview) {
                      return (
                        <div
                          key={`${color.name}-${color.hex}`}
                          className="flex flex-col items-center gap-2 text-center"
                          title={color.name}
                        >
                          <span
                            className="h-12 w-12 rounded-full border-2 border-white shadow-md"
                            style={{ backgroundColor: color.hex }}
                            aria-hidden="true"
                          />
                          <span className="max-w-[64px] text-[9px] font-bold uppercase leading-tight text-gray-500">
                            {color.name}
                          </span>
                        </div>
                      );
                    }
                    const isSelected = selectedColor?.hex === color.hex;
                    return (
                      <button
                        type="button"
                        key={color.hex}
                        onClick={() => setSelectedColor(color)}
                        aria-pressed={isSelected}
                        aria-label={`Ver puerta en ${color.name}`}
                        className="group flex flex-col items-center gap-2 text-center"
                        title={`Ver en ${color.name}`}
                      >
                        <span
                          className={`h-12 w-12 rounded-full border-2 shadow-md transition ${isSelected ? "scale-110 border-black ring-2 ring-black/10" : "border-white group-hover:scale-110"}`}
                          style={{ backgroundColor: color.hex }}
                          aria-hidden="true"
                        />
                        <span className={`max-w-[60px] text-[9px] font-bold uppercase leading-tight ${isSelected ? "text-black" : "text-gray-500"}`}>
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mb-3 text-[10px] leading-relaxed text-gray-400">
                  {supportsInteractiveFinishPreview
                    ? "La visualización es orientativa; el acabado puede variar según la pantalla y el material de la puerta."
                    : "Carta de acabados orientativa del catálogo WONLY 2026; confirma disponibilidad y muestra física antes del pedido."}
                </p>
                <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <Palette size={16} className="mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
                  <p className="text-xs leading-relaxed text-gray-500">
                    ¿Buscas un color diferente? Disponemos de acabados personalizados bajo pedido.{" "}
                    <span className="font-bold text-gray-800">Consúltanos sin compromiso.</span>
                  </p>
                </div>
              </div>

              <div className="rounded border border-gray-100 bg-gray-50 p-5">
                <h3 className="mb-3 text-xs font-bold uppercase text-gray-400">Especificaciones</h3>
                <div className="grid grid-cols-1 gap-y-2">
                  {product.specs?.map((spec) => (
                    <div key={`${spec.label}-${spec.value}`} className="flex justify-between border-b border-gray-200 pb-1 last:border-0">
                      <span className="text-[10px] font-bold uppercase text-gray-500">{spec.label}</span>
                      <span className="text-right text-[11px] font-semibold text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {product.category === "PUERTAS CORREDIZAS Y ABATIBLES" && (
                <>
                  <AssetGrid title="Accesorios" items={ACCESORIOS_CORREDIZAS} />
                  <AssetGrid title="Vidrios" items={VIDRIOS_CORREDIZAS} objectFit="object-cover" />
                </>
              )}

              {showWonly2026Hardware && (
                <AssetGrid title="Herrajes WONLY 2026" items={WONLY_2026_HARDWARE} />
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
