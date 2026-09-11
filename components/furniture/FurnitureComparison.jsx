"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ImageOff, X } from "lucide-react";
import useAccessibleDialog from "../useAccessibleDialog";
import { getProductMaterials } from "./furniture-filters";
import { getFurnitureFinishes, getFurnitureImage } from "./furniture-utils";
import { getFurnitureCategoryLabel } from "../../lib/furniture-labels";
import { buildFurnitureContactHref } from "../../lib/furniture-contact";
import { formatFurnitureDetailText } from "../../lib/furniture-presentation";
import styles from "./FurnitureComparison.module.css";

const productName = (product) => product.name || product.code || "Pieza del catálogo";
const productKey = (product, index) => `${product.id ?? product.code ?? product.name ?? index}`;
const validProducts = (products) => Array.isArray(products) ? products.filter((product) => product && typeof product === "object").slice(0, 3) : [];

function ProductImage({ product, compact = false }) {
  const src = getFurnitureImage(product.image);
  const [failedSource, setFailedSource] = useState(null);
  return <div className={compact ? styles.trayImage : styles.productImage}>
    {src && failedSource !== src
      ? <Image src={src} alt={compact ? "" : productName(product)} fill sizes={compact ? "48px" : "(max-width: 700px) 240px, 320px"} className={styles.image} onError={() => setFailedSource(src)} />
      : <span className={styles.imageFallback} role={compact ? undefined : "img"} aria-label={compact ? undefined : `Imagen no disponible de ${productName(product)}`}><ImageOff size={compact ? 18 : 30} aria-hidden="true" />{!compact && <span>Imagen no disponible</span>}</span>}
  </div>;
}

function displayDimensions(value) {
  if (Array.isArray(value)) return value.map(displayDimensions).filter(Boolean).join(" · ");
  if (value && typeof value === "object") return Object.entries(value).map(([key, entry]) => {
    const text = displayDimensions(entry);
    return text ? `${key}: ${text}` : "";
  }).filter(Boolean).join(" · ");
  return value === null || value === undefined ? "" : formatFurnitureDetailText(String(value).trim(), false);
}

export function FurnitureCompareTray({ products, onRemove, onClear, onOpen }) {
  const pieces = validProducts(products);
  const originFocusRef = useRef(null);
  const clearButtonRef = useRef(null);
  useEffect(() => {
    if (pieces.length > 0 && !originFocusRef.current) originFocusRef.current = document.activeElement;
    if (!pieces.length) originFocusRef.current = null;
  }, [pieces.length]);
  if (!pieces.length) return null;

  const returnToSelection = () => {
    const origin = originFocusRef.current;
    if (origin?.isConnected) origin.focus?.({ preventScroll: true });
    else document.querySelector('#coleccion input[type="search"]')?.focus({ preventScroll: true });
  };
  return <aside className={styles.tray} aria-label="Piezas seleccionadas para comparar">
    <div className={styles.traySelection}>
      <p className={styles.trayHeading} aria-live="polite">{pieces.length} de 3 piezas{pieces.length === 1 && <span>Elige otra pieza</span>}</p>
      <ul className={styles.trayProducts}>{pieces.map((product, index) => <li key={productKey(product, index)} className={styles.trayProduct}>
        <ProductImage product={product} compact />
        <span className={styles.trayName} title={productName(product)}>{productName(product)}</span>
        <button type="button" className={styles.trayRemove} aria-label={`Quitar ${productName(product)} de la comparación`} onClick={() => {
          if (pieces.length === 1) returnToSelection();
          else clearButtonRef.current?.focus({ preventScroll: true });
          onRemove?.(product);
        }}><X size={16} aria-hidden="true" /></button>
      </li>)}</ul>
    </div>
    <div className={styles.trayActions}>
      <button ref={clearButtonRef} type="button" className={styles.clearButton} data-furniture-compare-clear="true" onClick={() => { returnToSelection(); onClear?.(); }}>Vaciar</button>
      <button type="button" className={styles.primaryButton} data-furniture-compare-open="true" disabled={pieces.length < 2} onClick={onOpen}>Comparar ({pieces.length}) <ArrowRight size={17} aria-hidden="true" /></button>
    </div>
  </aside>;
}

function ComparisonDialog({ products, onClose, onSelect, onRemove }) {
  const dialogRef = useAccessibleDialog(true, onClose);
  const closeButtonRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const pieces = validProducts(products);

  useEffect(() => () => {
    // Restore focus if removing a piece also removed the original trigger.
    window.requestAnimationFrame(() => {
      if (document.activeElement === document.body) {
        const target = document.querySelector('[data-furniture-compare-open="true"]:not([disabled])') || document.querySelector('[data-furniture-compare-clear="true"]') || document.querySelector('#coleccion input[type="search"]');
        target?.focus({ preventScroll: true });
      }
    });
  }, []);

  const removeProduct = (product) => {
    closeButtonRef.current?.focus({ preventScroll: true });
    onRemove?.(product);
  };
  return <div ref={dialogRef} className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId} tabIndex={-1} onClick={(event) => { if (event.target === event.currentTarget) onClose?.(); }}>
    <section className={styles.dialog}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>Mobiliario · Tu selección</p><h2 id={titleId}>Compara tus piezas</h2><p id={descriptionId} className={styles.description}>{pieces.length >= 2 ? "Medidas, materiales y acabados para elegir con calma." : "Añade al menos dos piezas del catálogo para compararlas."}</p>{pieces.length > 1 && <p className={styles.scrollHint}>Desliza para comparar las piezas</p>}</div>
        <button ref={closeButtonRef} type="button" className={styles.iconButton} aria-label="Cerrar comparación" onClick={onClose}><X size={23} aria-hidden="true" /></button>
      </header>

      <div className={styles.body}>
        {pieces.length < 2 && <p className={styles.selectionNotice} role="status">{pieces.length === 1 ? "Te queda una pieza. Puedes conservarla y seguir eligiendo en el catálogo." : "Tu comparación está vacía. Vuelve al catálogo para elegir tus piezas."}</p>}
        {pieces.length > 0 && <div className={styles.tableScroll} role="region" aria-label="Comparación de piezas, desplazamiento horizontal disponible" tabIndex={0}>
          <table className={styles.table} style={{ "--piece-count": pieces.length }}>
            <caption className={styles.visuallyHidden}>Comparación de las medidas, materiales y acabados publicados en el catálogo.</caption>
            <thead><tr>
              <th scope="col" className={styles.rowHeading}><span className={styles.visuallyHidden}>Características</span></th>
              {pieces.map((product, index) => <th scope="col" key={productKey(product, index)} className={styles.productHeading}>
                <button type="button" className={styles.removeProduct} onClick={() => removeProduct(product)} aria-label={`Quitar ${productName(product)} de la comparación`}><X size={17} aria-hidden="true" /><span>Quitar</span></button>
                <ProductImage product={product} />
                <span className={styles.code}>{product.code}</span>
                <h3>{productName(product)}</h3>
                <span className={styles.category}>{getFurnitureCategoryLabel(product.category || "Mobiliario")}</span>
              </th>)}
            </tr></thead>
            <tbody>
              <tr><th scope="row" className={styles.rowHeading}>Medidas</th>{pieces.map((product, index) => <td key={productKey(product, index)}>{displayDimensions(product.specs?.dimensions) || "Consultar medidas en la ficha"}</td>)}</tr>
              <tr><th scope="row" className={styles.rowHeading}>Materiales</th>{pieces.map((product, index) => {
                const materials = getProductMaterials(product);
                return <td key={productKey(product, index)}>{materials.length ? <ul className={styles.materials}>{materials.map((material) => <li key={material}>{material}</li>)}</ul> : "Consultar materiales en la ficha"}</td>;
              })}</tr>
              <tr><th scope="row" className={styles.rowHeading}>Acabados</th>{pieces.map((product, index) => {
                const count = getFurnitureFinishes(product.colors).length;
                return <td key={productKey(product, index)}>{count ? `${count} ${count === 1 ? "acabado" : "acabados"} en el catálogo` : "Acabados no indicados"}</td>;
              })}</tr>
              <tr className={styles.actionRow}><th scope="row" className={styles.rowHeading}><span className={styles.visuallyHidden}>Más información</span></th>{pieces.map((product, index) => <td key={productKey(product, index)}><div className={styles.productActions}>
                <button type="button" className={styles.secondaryButton} onClick={() => onSelect?.(product)} aria-label={`Ver ficha de ${productName(product)}`}>Ver ficha <ArrowRight size={17} aria-hidden="true" /></button>
                <Link className={styles.quoteLink} href={buildFurnitureContactHref(product)} onClick={onClose} aria-label={`Solicitar presupuesto para ${productName(product)}`}>Solicitar presupuesto <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </div></td>)}</tr>
            </tbody>
          </table>
        </div>}
      </div>
      <footer className={styles.footer}><span>{pieces.length} de 3 piezas seleccionadas</span><button type="button" className={styles.primaryButton} onClick={onClose}>Seguir explorando <ArrowRight size={17} aria-hidden="true" /></button></footer>
    </section>
  </div>;
}

export default function FurnitureComparison(props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(<ComparisonDialog {...props} />, document.body) : null;
}
