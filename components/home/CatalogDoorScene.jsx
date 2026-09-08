"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import styles from "./CatalogDoorScene.module.css";

const DEFAULT_SIZE = { width: 1672, height: 941 };
// The narrow ribbed panel on the left is fixed. The active leaf starts at the
// brown access strip and includes the wider right panel, hinged on the right.
const DEFAULT_OPENING = { x: 735, y: 103, width: 298, height: 727 };
const clamp = (value) => Math.min(1, Math.max(0, Number(value) || 0));
const smoothstep = (value) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

function createReadySignal() {
  let resolve;
  const promise = new Promise((complete) => { resolve = complete; });
  return { promise, resolve };
}

function decodeImage(src) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => {
      if (typeof image.decode !== "function") {
        resolve(image);
        return;
      }
      image.decode().then(() => resolve(image), reject);
    };
    image.onerror = () => reject(new Error("Catalog scene image unavailable"));
    image.src = src;
  });
}

/**
 * The scroll controller owns timing and calls setProgress(0..1).
 * ready resolves { ok: boolean }; setProgress returns true only once the
 * decoded scene has fully entered its interior. No animation loop runs here.
 * opening coordinates address the original photo pixels, excluding the frame.
 */
const CatalogDoorScene = forwardRef(function CatalogDoorScene({
  exteriorSrc = "/images/home/catalog-door-v1/exterior.webp",
  interiorSrc = "/images/home/catalog-door-v1/interior.webp",
  sourceSize = DEFAULT_SIZE,
  opening = DEFAULT_OPENING,
  className = "",
  onReady,
}, forwardedRef) {
  const rootRef = useRef(null);
  const progressRef = useRef(0);
  const loadedRef = useRef(false);
  const geometryRef = useRef({ fit: 1, finalZoom: 1 });
  const configRef = useRef({ sourceSize, opening });
  const onReadyRef = useRef(onReady);
  const readySignal = useMemo(createReadySignal, [exteriorSrc, interiorSrc]);
  configRef.current = { sourceSize, opening };
  onReadyRef.current = onReady;

  const paint = useCallback(() => {
    const root = rootRef.current;
    if (!root) return false;
    const progress = progressRef.current;
    const { sourceSize: size, opening: door } = configRef.current;
    const { fit, finalZoom } = geometryRef.current;
    const open = smoothstep(progress / 0.55);
    const travel = smoothstep((progress - 0.52) / 0.48);
    const centerX = door.x + door.width / 2;
    const centerY = door.y + door.height / 2;
    const entered = loadedRef.current && progress >= 1;

    root.style.setProperty("--catalog-fit", fit.toFixed(6));
    root.style.setProperty("--catalog-door-angle", `${(-110 * open).toFixed(4)}deg`);
    root.style.setProperty("--catalog-door-shade", (0.22 * open).toFixed(4));
    root.style.setProperty("--catalog-camera-scale", (1 + (finalZoom - 1) * travel).toFixed(6));
    root.style.setProperty("--catalog-camera-x", `${((size.width / 2 - centerX) * travel).toFixed(4)}px`);
    root.style.setProperty("--catalog-camera-y", `${((size.height / 2 - centerY) * travel).toFixed(4)}px`);
    root.style.setProperty("--catalog-interior-scale", (1.025 - 0.025 * travel).toFixed(6));
    root.dataset.closed = String(progress === 0);
    root.dataset.entered = String(entered);
    root.dataset.progress = progress.toFixed(4);
    return entered;
  }, []);

  useImperativeHandle(forwardedRef, () => ({
    ready: readySignal.promise,
    setProgress(value) {
      progressRef.current = clamp(value);
      return paint();
    },
  }), [paint, readySignal]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    let disposed = false;
    loadedRef.current = false;
    root.dataset.ready = "false";
    root.dataset.error = "false";

    const measure = () => {
      const { sourceSize: size, opening: door } = configRef.current;
      const width = Math.max(root.clientWidth, 1);
      const height = Math.max(root.clientHeight, 1);
      const fit = Math.max(width / size.width, height / size.height);
      geometryRef.current = {
        fit,
        // An overscan margin puts the complete facade outside the viewport.
        finalZoom: Math.max(1, width / (door.width * fit), height / (door.height * fit)) * 1.08,
      };
      paint();
    };
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
    observer?.observe(root);
    window.addEventListener("resize", measure, { passive: true });
    measure();

    Promise.all([decodeImage(exteriorSrc), decodeImage(interiorSrc)]).then(() => {
      if (disposed) return;
      loadedRef.current = true;
      measure();
      root.dataset.ready = "true";
      const result = { ok: true };
      readySignal.resolve(result);
      onReadyRef.current?.(result);
    }).catch(() => {
      if (disposed) return;
      root.dataset.error = "true";
      const result = { ok: false };
      readySignal.resolve(result);
      onReadyRef.current?.(result);
    });

    return () => {
      disposed = true;
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [exteriorSrc, interiorSrc, sourceSize.width, sourceSize.height,
    opening.x, opening.y, opening.width, opening.height, paint, readySignal]);

  const top = opening.y / sourceSize.height * 100;
  const bottom = (sourceSize.height - opening.y - opening.height) / sourceSize.height * 100;
  const left = opening.x / sourceSize.width * 100;
  const right = (sourceSize.width - opening.x - opening.width) / sourceSize.width * 100;
  const slices = [
    `inset(0 0 ${100 - top}% 0)`,
    `inset(${100 - bottom}% 0 0 0)`,
    `inset(${top}% ${100 - left}% ${bottom}% 0)`,
    `inset(${top}% 0 ${bottom}% ${100 - right}%)`,
  ];

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`${styles.scene} ${className}`}
      data-ready="false"
      data-closed="true"
      data-entered="false"
      style={{
        "--catalog-source-width": `${sourceSize.width}px`,
        "--catalog-source-height": `${sourceSize.height}px`,
        "--catalog-exterior": `url("${exteriorSrc}")`,
        "--catalog-opening-x": `${opening.x}px`,
        "--catalog-opening-y": `${opening.y}px`,
        "--catalog-opening-width": `${opening.width}px`,
        "--catalog-opening-height": `${opening.height}px`,
        "--catalog-origin-x": `${opening.x + opening.width / 2}px`,
        "--catalog-origin-y": `${opening.y + opening.height / 2}px`,
        "--catalog-texture-x": `${-opening.x}px`,
        "--catalog-texture-y": `${-opening.y}px`,
      }}
    >
      <div className={styles.interior} style={{ backgroundImage: `url("${interiorSrc}")` }} />
      <div className={styles.stage}>
        <div className={styles.camera}>
          {slices.map((clipPath, index) => (
            <div key={index} className={styles.facadeSlice} style={{ clipPath }} />
          ))}
          <div className={styles.door}>
            <div className={styles.front} />
            <div className={styles.back} />
            <div className={styles.edge} />
          </div>
        </div>
      </div>
      <picture className={styles.fallback}>
        <img src={exteriorSrc} width={sourceSize.width} height={sourceSize.height} alt="" decoding="async" loading="eager" fetchPriority="high" />
      </picture>
    </div>
  );
});

export default CatalogDoorScene;
