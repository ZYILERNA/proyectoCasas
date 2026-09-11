"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, FileText, ImageOff, Maximize2, Play, X } from "lucide-react";
import useAccessibleDialog from "../useAccessibleDialog";
import { buildFurnitureContactHref } from "../../lib/furniture-contact";
import { SHOW_FURNITURE_PRICES } from "../../lib/furniture-settings";
import { getFurnitureCategoryLabel } from "../../lib/furniture-labels";
import { formatFurnitureDetailText } from "../../lib/furniture-presentation";
import { formatFurniturePrice, getFurnitureFinishes, getFurnitureImage } from "./furniture-utils";
import styles from "./FurnitureProductDrawer.module.css";

const FIELD_LABELS = {
  dimensions: "Medidas", volume: "Volumen", assembly: "Montaje", pillows: "Cojines",
  includes: "Incluye", interior: "Acabados", exterior: "Exterior", body: "Cuerpo",
  wood: "Madera", metal: "Metal", leather: "Piel", stone: "Piedra", marble: "Mármol",
  frame: "Estructura", legs: "Patas", top: "Superficie", fabric: "Tela",
  color: "Color", colors: "Colores", size: "Medidas", material: "Material",
  width: "Ancho", height: "Alto", length: "Largo", modules: "Módulos", notes: "Notas del catálogo",
  feature_note: "Características", material_note: "Indicaciones del material",
};
const PRICE_LABELS = { price: "Precio", unique: "Precio unitario", fa: "Tela A", fb: "Tela B", fc: "Tela C", fd: "Tela D", fe: "Tela E", la: "Piel A", lb: "Piel B", lc: "Piel C" };
const UNAVAILABLE_IMAGES = new Set([
  "/images/SILLAS/SILLA37/img5.webp",
  "/images/GABINETES/GAB27/img3.webp",
]);
const labelFor = (key) => FIELD_LABELS[key] || String(key).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ");
const present = (value) => value !== null && value !== undefined && value !== "";
const hasVariantDetails = (row) => [row.name, row.code, row.size].some((value) => String(value ?? "").trim());

function collectFinishGroups(colors) {
  const groups = Array.isArray(colors) ? [["finishes", colors]] : Object.entries(colors || {});
  let offset = 0;
  return groups.map(([key, values]) => ({
    key,
    name: key === "finishes" ? "Acabados" : labelFor(key),
    entries: getFurnitureFinishes(Array.isArray(values) ? values : [values])
      .map((finish) => ({ finish, index: offset++ })),
  })).filter((group) => group.entries.length);
}

function DetailValue({ value }) {
  if (Array.isArray(value)) return <ul className={styles.valueList}>{value.filter(present).map((entry, index) => <li key={index}><DetailValue value={entry} /></li>)}</ul>;
  if (value && typeof value === "object") return <dl className={styles.nestedList}>{Object.entries(value).filter(([, entry]) => present(entry)).map(([key, entry]) => <div key={key}><dt>{labelFor(key)}</dt><dd><DetailValue value={entry} /></dd></div>)}</dl>;
  return typeof value === "boolean" ? (value ? "Sí" : "No") : formatFurnitureDetailText(String(value ?? ""));
}

function collectMedia(product, finishes) {
  const media = [];
  const seen = new Set();
  const add = (value, label, forcedKind) => {
    if (!value) return;
    const src = getFurnitureImage(typeof value === "string" ? value : value.src || value.url || value.image);
    if (typeof src !== "string" || !src || seen.has(src) || UNAVAILABLE_IMAGES.has(src)) return;
    seen.add(src);
    const kind = forcedKind || (/\.(mp4|webm|mov|m4v)(?:[?#]|$)/i.test(src) ? "video" : /\.pdf(?:[?#]|$)/i.test(src) ? "document" : "image");
    media.push({ src, kind, label: String(value.label || value.alt || label), poster: value.poster || product.videoPoster });
  };
  add(product.image, "Vista principal");
  (Array.isArray(product.schematics) ? product.schematics : []).forEach((entry, index) => add(entry, `Vista ${index + 2}`));
  (Array.isArray(product.gallery) ? product.gallery : []).forEach((entry, index) => add(entry, `Galería ${index + 1}`));
  finishes.forEach((finish) => add(finish.image, finish.name || "Acabado"));
  add(product.video, "Vídeo del producto", "video");
  (Array.isArray(product.videos) ? product.videos : []).forEach((entry, index) => add(entry, `Vídeo ${index + 1}`, "video"));
  return media;
}

function VariantTable({ rows }) {
  const columns = useMemo(() => {
    if (!SHOW_FURNITURE_PRICES) return [];
    const keys = new Set();
    rows.forEach((row) => {
      if (Object.prototype.hasOwnProperty.call(row, "price")) keys.add("price");
      Object.keys(row.prices || {}).forEach((key) => keys.add(key));
    });
    return [...Object.keys(PRICE_LABELS).filter((key) => keys.has(key)), ...[...keys].filter((key) => !(key in PRICE_LABELS))];
  }, [rows]);
  return (
    <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={`${SHOW_FURNITURE_PRICES ? "Precios" : "Medidas"} por variante, desplazamiento horizontal disponible`}>
      <table className={styles.priceTable}>
        {SHOW_FURNITURE_PRICES && <caption>Precios orientativos en euros según la tarifa del catálogo.</caption>}
        <thead><tr><th scope="col">Variante</th><th scope="col">Medidas</th>{columns.map((key) => <th key={key} scope="col">{PRICE_LABELS[key] || labelFor(key)}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={`${row.name || row.code || "variante"}-${index}`}><th scope="row">{row.name || row.code || "Variante"}</th><td>{row.size || "—"}</td>{columns.map((key) => <td key={key}>{formatFurniturePrice(key === "price" ? row.price : row.prices?.[key]) || "—"}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function ZoomDialog({ media, productName, onClose }) {
  const dialogRef = useAccessibleDialog(true, onClose);
  return <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`Imagen ampliada de ${productName}`} tabIndex={-1} className={styles.zoomOverlay} onClick={(event) => { event.stopPropagation(); if (event.target === event.currentTarget) onClose(); }}>
    <button type="button" className={styles.zoomClose} aria-label="Cerrar imagen ampliada" onClick={(event) => { event.stopPropagation(); onClose(); }}><X size={24} /></button>
    <div className={styles.zoomImage} onClick={(event) => event.stopPropagation()}><Image src={media.src} alt={`${productName}. ${media.label}`} fill sizes="100vw" className={styles.containImage} /></div>
  </div>;
}

function OpenProductDrawer({ product, onClose }) {
  const dialogRef = useAccessibleDialog(true, onClose);
  const titleId = useId();
  const priceDetailsRef = useRef(null);
  const finishHeadingRef = useRef(null);
  const finishes = useMemo(() => getFurnitureFinishes(product.colors), [product.colors]);
  const finishGroups = useMemo(() => collectFinishGroups(product.colors), [product.colors]);
  const initialFinish = Number.isInteger(product.initialFinishIndex) && finishes[product.initialFinishIndex] ? product.initialFinishIndex : null;
  const [finishSelections, setFinishSelections] = useState(() => {
    const group = finishGroups.find(({ entries }) => entries.some(({ index }) => index === initialFinish));
    return group ? { [group.key]: initialFinish } : {};
  });
  const media = useMemo(() => collectMedia(product, finishes), [product, finishes]);
  const [mediaIndex, setMediaIndex] = useState(() => Math.max(0, media.findIndex((entry) => entry.src === getFurnitureImage(finishes[initialFinish]?.image))));
  const [zoomOpen, setZoomOpen] = useState(false);
  const [failedImages, setFailedImages] = useState(() => new Set());
  const requestedMedia = media[mediaIndex];
  const currentMedia = requestedMedia?.kind === "image" && failedImages.has(requestedMedia.src)
    ? media.find((entry) => entry.kind === "image" && !failedImages.has(entry.src)) || requestedMedia
    : requestedMedia;
  const displayedMediaIndex = currentMedia ? media.indexOf(currentMedia) : 0;
  const selectedFinishes = finishGroups.flatMap((group) => {
    const entry = group.entries.find(({ index }) => index === finishSelections[group.key]);
    return entry ? [{ ...entry.finish, group: group.name }] : [];
  });
  const specs = Object.entries({ ...product.specs, ...(present(product.modules) ? { modules: product.modules } : {}), ...(present(product.notes) ? { notes: product.notes } : {}) }).filter(([, value]) => present(value));
  const materials = Array.isArray(product.materials) ? product.materials.filter(present) : [];
  const configurations = Array.isArray(product.configurations) ? product.configurations.filter((entry) => entry && typeof entry === "object") : [];
  const priceRows = Array.isArray(product.priceList) ? product.priceList.filter((row) => row && typeof row === "object") : [];
  const variantRows = SHOW_FURNITURE_PRICES ? priceRows : priceRows.filter(hasVariantDetails);
  const price = formatFurniturePrice(product.priceBase);
  const showMedia = (index) => { if (media.length) setMediaIndex((index + media.length) % media.length); };
  const moveMedia = (direction) => {
    for (let step = 1; step <= media.length; step += 1) {
      const index = (displayedMediaIndex + direction * step + media.length) % media.length;
      if (media[index].kind !== "image" || !failedImages.has(media[index].src)) {
        showMedia(index);
        return;
      }
    }
  };
  const markImageFailed = (src) => setFailedImages((previous) => new Set([...previous, src]));
  const selectFinish = (groupKey, index) => {
    const next = finishSelections[groupKey] === index ? null : index;
    setFinishSelections((previous) => {
      const updated = { ...previous };
      if (next === null) delete updated[groupKey];
      else updated[groupKey] = next;
      return updated;
    });
    if (next === null) setMediaIndex(0);
    else {
      const imageIndex = media.findIndex((entry) => entry.src === getFurnitureImage(finishes[next]?.image));
      setMediaIndex(imageIndex >= 0 ? imageIndex : 0);
    }
  };
  const resetFinishes = () => {
    setFinishSelections({});
    setMediaIndex(0);
    finishHeadingRef.current?.focus({ preventScroll: true });
  };
  const showPrices = () => {
    const details = priceDetailsRef.current;
    if (!details) return;
    details.open = true;
    details.scrollIntoView({ block: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} className={styles.overlay} onClick={onClose}>
    <div className={styles.drawer} onClick={(event) => event.stopPropagation()}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>{getFurnitureCategoryLabel(product.category || "Mobiliario")}{product.code && <span> / {product.code}</span>}</p><h2 id={titleId}>{product.name || product.code || "Detalle del producto"}</h2></div>
        <button type="button" className={styles.iconButton} aria-label="Cerrar detalles del producto" onClick={onClose}><X size={23} /></button>
      </header>

      <div className={styles.body}>
        <section className={styles.gallery} aria-label={`Galería de ${product.name || "producto"}`} onKeyDown={(event) => {
          if (event.target.tagName === "VIDEO" || media.length < 2) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); moveMedia(event.key === "ArrowRight" ? 1 : -1); }
        }}>
          <div className={styles.galleryStage}>
            {currentMedia?.kind === "image" && !failedImages.has(currentMedia.src) ? <button type="button" className={styles.mainImageButton} aria-label={`Ampliar imagen de ${product.name}`} onClick={() => setZoomOpen(true)}><Image src={currentMedia.src} alt={`${product.name}. ${currentMedia.label}`} fill priority sizes="(max-width: 900px) calc(100vw - 32px), 760px" className={styles.containImage} onError={() => markImageFailed(currentMedia.src)} /><span className={styles.zoomHint}><Maximize2 size={17} /> Ampliar</span></button>
              : currentMedia?.kind === "video" ? <video key={currentMedia.src} src={currentMedia.src} poster={currentMedia.poster} controls playsInline preload="metadata" className={styles.video} aria-label={`${product.name}. ${currentMedia.label}`} />
                : currentMedia?.kind === "document" ? <a href={currentMedia.src} target="_blank" rel="noopener noreferrer" className={styles.documentLink}><FileText size={36} /> Abrir documento <ArrowUpRight size={18} /></a>
                  : <div className={styles.imagePlaceholder}><ImageOff size={35} /><p>Imagen no disponible</p></div>}
          </div>
          <div className={styles.galleryControls}><p aria-live="polite">{currentMedia?.label || "Galería"}<span>{media.length ? `${displayedMediaIndex + 1} / ${media.length}` : ""}</span></p>{media.length > 1 && <div className={styles.galleryArrows}><button type="button" className={styles.iconButton} aria-label="Ver imagen anterior" onClick={() => moveMedia(-1)}><ChevronLeft size={20} /></button><button type="button" className={styles.iconButton} aria-label="Ver imagen siguiente" onClick={() => moveMedia(1)}><ChevronRight size={20} /></button></div>}</div>
          {media.length > 1 && <div className={styles.thumbnails}>{media.map((entry, index) => <button key={entry.src} type="button" className={`${styles.thumbnail} ${displayedMediaIndex === index ? styles.thumbnailSelected : ""}`} onClick={() => showMedia(index)} aria-label={`Ver ${entry.label.toLowerCase()}`} aria-pressed={displayedMediaIndex === index}>{entry.kind === "image" && !failedImages.has(entry.src) ? <Image src={entry.src} alt="" fill sizes="72px" className={styles.containImage} onError={() => markImageFailed(entry.src)} /> : entry.kind === "video" ? <Play size={22} /> : entry.kind === "document" ? <FileText size={22} /> : <ImageOff size={20} />}</button>)}</div>}
        </section>

        <div className={styles.information}>
          {product.description && <div className={styles.description}><DetailValue value={product.description} /></div>}
          {finishes.length > 0 && <section className={styles.finishes}>
            <div className={styles.sectionHeading}>
              <h3 ref={finishHeadingRef} tabIndex={-1}>{finishGroups.length > 1 ? "Elige tus acabados" : "Elige tu acabado"}</h3>
              <span aria-live="polite">{selectedFinishes.length
                ? selectedFinishes.map((finish) => finishGroups.length > 1 ? `${finish.group}: ${finish.name}` : finish.name).join(" · ")
                : "Sin selección"}</span>
            </div>
            {selectedFinishes.length > 0 && <button type="button" className={styles.resetFinishes} onClick={resetFinishes} aria-label="Restablecer todos los acabados y volver a la vista original">Restablecer acabados</button>}
            {finishGroups.map((group) => <fieldset className={styles.finishGroup} key={group.key}>
              <legend>{group.name}</legend>
              <div className={styles.finishOptions}>{group.entries.map(({ finish, index }) => {
                const selected = finishSelections[group.key] === index;
                const imageSrc = getFurnitureImage(finish.image);
                return <button type="button" key={`${finish.name || "acabado"}-${index}`} className={`${styles.finishButton} ${selected ? styles.finishSelected : ""}`} aria-pressed={selected} onClick={() => selectFinish(group.key, index)}>
                  <span className={styles.swatch} style={{ backgroundColor: finish.hex || "#deded6" }}>
                    {imageSrc && !UNAVAILABLE_IMAGES.has(imageSrc) && !failedImages.has(imageSrc) && <Image src={imageSrc} alt="" fill sizes="44px" className={styles.swatchImage} onError={() => markImageFailed(imageSrc)} />}
                    {selected && <span className={styles.selectedMark}><Check size={12} /></span>}
                  </span>
                  <span>{finish.name || `Acabado ${index + 1}`}</span>
                </button>;
              })}</div>
            </fieldset>)}
          </section>}

          {specs.length > 0 && <details className={styles.details} open><summary>Medidas y detalles <ChevronDown size={18} /></summary><dl className={styles.specs}>{specs.map(([key, value]) => <div key={key}><dt>{labelFor(key)}</dt><dd><DetailValue value={value} /></dd></div>)}</dl></details>}
          {materials.length > 0 && <details className={styles.details}><summary>Materiales y composición <ChevronDown size={18} /></summary><div className={styles.materials}>{materials.map((material, index) => <div key={index}>{typeof material === "object" ? <><h4>{material.part || material.name || "Material"}</h4><p>{formatFurnitureDetailText(material.material)}</p>{material.detail && <p className={styles.muted}>{formatFurnitureDetailText(material.detail)}</p>}</> : <p>{formatFurnitureDetailText(material)}</p>}</div>)}</div></details>}
          {configurations.length > 0 && <details className={styles.details}><summary>Variantes y configuraciones <ChevronDown size={18} /></summary><ul className={styles.configurations}>{configurations.map((configuration, index) => <li key={`${configuration.code || "variante"}-${index}`}><div>{configuration.code && <strong>{configuration.code}</strong>}<span>{configuration.desc || configuration.size || configuration.name}</span>{configuration.desc && configuration.size && configuration.desc !== configuration.size && <span>{configuration.size}</span>}</div>{SHOW_FURNITURE_PRICES && formatFurniturePrice(configuration.price) && <span className={styles.configurationPrice}>{formatFurniturePrice(configuration.price)}</span>}</li>)}</ul></details>}
          {product.customInstructions && Object.keys(product.customInstructions).length > 0 && <details className={styles.details}><summary>Opciones del catálogo <ChevronDown size={18} /></summary><div className={styles.instructions}><DetailValue value={product.customInstructions} /></div></details>}
          {variantRows.length > 0 && <details ref={priceDetailsRef} className={styles.details}><summary>{SHOW_FURNITURE_PRICES ? "Precios por variante" : "Medidas por variante"} <ChevronDown size={18} /></summary><VariantTable rows={variantRows} /></details>}
        </div>
      </div>

      <footer className={`${styles.footer} ${SHOW_FURNITURE_PRICES ? "" : styles.consultationFooter}`}>
        {SHOW_FURNITURE_PRICES
          ? <div className={styles.priceBlock}><span>{price ? "Precio base orientativo" : "Presupuesto a consultar"}</span><strong>{price || "Hablemos de tu proyecto"}</strong>{priceRows.length > 0 && <button type="button" onClick={showPrices}>Ver todos los precios <ChevronRight size={13} /></button>}</div>
          : <div className={styles.consultationBlock}><strong>Cuéntanos tu proyecto</strong><span>Te ayudamos a elegir medidas y acabados.</span></div>}
        <Link href={buildFurnitureContactHref(product, selectedFinishes)} className={styles.contactButton} onClick={onClose}>Solicitar presupuesto <ArrowUpRight size={18} /></Link>
      </footer>
    </div>
    {zoomOpen && currentMedia?.kind === "image" && <ZoomDialog media={currentMedia} productName={product.name} onClose={() => setZoomOpen(false)} />}
  </div>;
}

export default function FurnitureProductDrawer({ product, onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !product) return null;
  const key = `${product.id ?? product.code ?? product.name}:${product.initialFinishIndex ?? "original"}`;
  return createPortal(<OpenProductDrawer key={key} product={product} onClose={onClose} />, document.body);
}
