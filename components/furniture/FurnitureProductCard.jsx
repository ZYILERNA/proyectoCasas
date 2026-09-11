"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Columns2, Heart, Ruler } from "lucide-react";
import { SHOW_FURNITURE_PRICES } from "../../lib/furniture-settings";
import { getFurnitureCategoryLabel } from "../../lib/furniture-labels";
import { formatFurniturePrice, getFurnitureFinishes, getFurnitureImage, hasFurniturePrice } from "./furniture-utils";
import styles from "./FurnitureProductCard.module.css";

export { getFurnitureFinishes } from "./furniture-utils";

const FurnitureProductCard = memo(function FurnitureProductCard({
    product,
    index = 0,
    onSelect,
    fallbackImage,
    isFavorite = false,
    onToggleFavorite,
    isCompared = false,
    onToggleCompare,
    compareDisabled = false,
}) {
    const reduceMotion = useReducedMotion();
    const [selectedFinishIndex, setSelectedFinishIndex] = useState(null);
    const [hoveredFinishIndex, setHoveredFinishIndex] = useState(null);
    const [focusedFinishIndex, setFocusedFinishIndex] = useState(null);
    const [failedImages, setFailedImages] = useState([]);
    const finishes = getFurnitureFinishes(product.colors);
    const visibleFinishes = finishes.slice(0, 4);
    const previewIndex = hoveredFinishIndex ?? focusedFinishIndex ?? selectedFinishIndex;
    const previewFinish = previewIndex === null ? null : finishes[previewIndex];
    const name = product.name || product.code || "Producto";
    const imageSrc = [previewFinish?.image, product.image, fallbackImage]
        .map(getFurnitureImage)
        .find((src) => typeof src === "string" && src.trim() && !failedImages.includes(src));
    const hasPrice = hasFurniturePrice(product.priceBase);
    const dimensions = typeof product.specs?.dimensions === "string"
        ? product.specs.dimensions.trim().replace(/\s*\*\s*/g, " × ")
        : "";
    const finishLabel = previewFinish?.name || `${finishes.length} ${finishes.length === 1 ? "acabado" : "acabados"}`;

    const openProduct = () => {
        if (selectedFinishIndex === null) {
            onSelect(product);
            return;
        }

        onSelect({ ...product, initialFinishIndex: selectedFinishIndex });
    };

    return (
        <motion.article
            className={styles.card}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : Math.min((index % 3) * 0.045, 0.12), ease: "easeOut" }}
        >
            <div className={styles.imageArea}>
                <button type="button" className={styles.imageButton} onClick={openProduct} aria-label={`Ver detalles de ${name}`}>
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt={previewFinish?.name ? `${name}, acabado ${previewFinish.name}` : name}
                            fill
                            sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1050px) 46vw, 31vw"
                            className={styles.image}
                            onError={() => setFailedImages((previous) => previous.includes(imageSrc) ? previous : [...previous, imageSrc])}
                        />
                    ) : (
                        <span className={styles.imageUnavailable}>Imagen no disponible</span>
                    )}
                    <span className={styles.imageHint} aria-hidden="true">Explorar pieza <ArrowUpRight size={15} strokeWidth={1.5} /></span>
                </button>
                {onToggleFavorite && (
                    <button
                        type="button"
                        className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteSelected : ""}`}
                        onClick={() => onToggleFavorite(product)}
                        aria-pressed={isFavorite}
                        aria-label={isFavorite ? `Quitar ${name} de favoritos` : `Guardar ${name} en favoritos`}
                        title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
                    >
                        <Heart size={19} strokeWidth={1.6} aria-hidden="true" />
                    </button>
                )}
            </div>

            <div className={styles.information}>
                <div className={styles.metadata}>
                    {product.category && <span>{getFurnitureCategoryLabel(product.category)}</span>}
                    {product.code && <span className={styles.code}>Ref. {product.code}</span>}
                </div>

                <h3 className={styles.name}>
                    <button type="button" onClick={openProduct}>{name}</button>
                </h3>

                {dimensions && <p className={styles.dimensions} title={`Medidas: ${dimensions}`}><Ruler size={14} aria-hidden="true" /><span><span className={styles.srOnly}>Medidas: </span>{dimensions}</span></p>}

                {SHOW_FURNITURE_PRICES && <p className={styles.price}>
                    <span>{hasPrice ? formatFurniturePrice(product.priceBase) : "Consultar precio"}</span>
                    {hasPrice && <span className={styles.priceNote}>Precio orientativo</span>}
                </p>}

                <div className={styles.footer}>
                    {finishes.length > 0 ? (
                        <div className={styles.finishes}>
                            <span className={styles.finishLabel}>{finishLabel}</span>
                            <div className={styles.swatches} role="group" aria-label={`Acabados de ${name}`}>
                                {visibleFinishes.map((finish, finishIndex) => (
                                    <button
                                        key={`${finish.name || "acabado"}-${finishIndex}`}
                                        type="button"
                                        className={`${styles.swatch} ${selectedFinishIndex === finishIndex ? styles.swatchSelected : ""}`}
                                        aria-label={`Previsualizar acabado ${finish.name || finishIndex + 1}`}
                                        aria-pressed={selectedFinishIndex === finishIndex}
                                        title={finish.name || `Acabado ${finishIndex + 1}`}
                                        onClick={() => setSelectedFinishIndex(finishIndex)}
                                        onMouseEnter={() => setHoveredFinishIndex(finishIndex)}
                                        onMouseLeave={() => setHoveredFinishIndex(null)}
                                        onFocus={() => setFocusedFinishIndex(finishIndex)}
                                        onBlur={() => setFocusedFinishIndex(null)}
                                    >
                                        <span
                                            className={styles.swatchColor}
                                            style={finish.hex
                                                ? { backgroundColor: finish.hex }
                                                : typeof finish.image === "string" && finish.image
                                                    ? { backgroundImage: `url("${getFurnitureImage(finish.image).replaceAll('"', '%22')}")` }
                                                    : undefined}
                                        />
                                    </button>
                                ))}
                                {finishes.length > visibleFinishes.length && (
                                    <button type="button" className={styles.moreFinishes} onClick={openProduct} aria-label={`Ver los ${finishes.length} acabados de ${name}`}>
                                        +{finishes.length - visibleFinishes.length}
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : <span className={styles.detailLabel}>Descubre los detalles</span>}

                    {!onToggleCompare && (
                        <button type="button" className={styles.detailButton} onClick={openProduct} aria-label={`Ver ficha de ${name}`}>
                            <ArrowUpRight size={21} strokeWidth={1.4} aria-hidden="true" />
                        </button>
                    )}
                </div>

                {onToggleCompare && (
                    <div className={styles.cardActions}>
                        <button
                            type="button"
                            className={`${styles.compareButton} ${isCompared ? styles.compareSelected : ""}`}
                            onClick={() => onToggleCompare(product)}
                            aria-pressed={isCompared}
                            aria-label={isCompared ? `Quitar ${name} del comparador` : `Añadir ${name} al comparador`}
                            disabled={compareDisabled && !isCompared}
                            title={compareDisabled && !isCompared ? "Quita una pieza del comparador para añadir otra" : undefined}
                        >
                            {isCompared ? <Check size={16} strokeWidth={1.7} aria-hidden="true" /> : <Columns2 size={16} strokeWidth={1.5} aria-hidden="true" />}
                            <span>{isCompared ? "Seleccionado" : "Comparar"}</span>
                        </button>
                        <button type="button" className={styles.detailButton} onClick={openProduct} aria-label={`Ver ficha de ${name}`}>
                            <ArrowUpRight size={21} strokeWidth={1.4} aria-hidden="true" />
                        </button>
                    </div>
                )}
            </div>
        </motion.article>
    );
});

export default FurnitureProductCard;
