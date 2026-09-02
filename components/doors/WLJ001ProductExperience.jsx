"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import useAccessibleDialog from "../useAccessibleDialog";
import {
  buildWLJ001ContactHref,
  isWLJ001ConfigurationValid,
  isWLJ001PositiveInteger,
  WL_J001_DEFAULT_CONFIGURATION,
  WL_J001_FINISH_OPTIONS,
  WL_J001_OPENING_OPTIONS,
} from "../../lib/wl-j001-product";
import WLJ001TechnicalConfigurator from "./WLJ001TechnicalConfigurator";
import WLJ001MobileSummaryBar from "./WLJ001MobileSummaryBar";

const ASSET_ROOT = "/images/PUERTAS/MADERAACÚSTICA/wl-j001";
const PRODUCT_BASE = "/images/PUERTAS/MADERAACÚSTICA/door-wl-j001.webp";
const MEDIA_COUNT = 4;

const BASE_GALLERY = [
  {
    src: `${ASSET_ROOT}/scene-warm-ai.webp`,
    alt: "Puerta WL-J001 natural en un salón contemporáneo luminoso",
    eyebrow: "Ambiente",
    label: "Luz natural",
    detail: "Acabado natural",
    imageClass: "object-cover",
    surfaceClass: "bg-[#E7DED2]",
  },
  {
    src: `${ASSET_ROOT}/scene-dark-ai.webp`,
    alt: "Puerta WL-J001 grafito en un estudio contemporáneo al atardecer",
    eyebrow: "Ambiente",
    label: "Atardecer",
    detail: "Acabado grafito",
    imageClass: "object-cover",
    surfaceClass: "bg-[#211D1A]",
  },
  {
    src: PRODUCT_BASE,
    alt: "Vista frontal de la puerta WL-J001 en su acabado original",
    eyebrow: "Producto",
    label: "Vista frontal",
    detail: "Acabado original",
    imageClass: "object-contain p-[2%]",
    surfaceClass: "bg-[#E8E4DE]",
  },
];

const FINISH_VISUALS = {
  negro: {
    image: `${ASSET_ROOT}/door-wl-j001-negro-ai.png`,
    surface: "#242424",
  },
  wengue: {
    image: `${ASSET_ROOT}/door-wl-j001-wengue-ai.png`,
    surface: "#4A382E",
  },
  "gris-oscuro": {
    image: `${ASSET_ROOT}/door-wl-j001-gris-oscuro-ai.png`,
    surface: "#494947",
  },
  antracita: {
    image: `${ASSET_ROOT}/door-wl-j001-antracita-ai.png`,
    surface: "#5A5A57",
  },
  nogal: {
    image: `${ASSET_ROOT}/door-wl-j001-nogal-ai.png`,
    surface: "#7A5A42",
  },
  roble: {
    image: `${ASSET_ROOT}/door-wl-j001-roble-ai.png`,
    surface: "#C3A17D",
  },
  "gris-claro": {
    image: `${ASSET_ROOT}/door-wl-j001-gris-claro-ai.png`,
    surface: "#AAA7A1",
  },
  natural: {
    image: `${ASSET_ROOT}/door-wl-j001-natural-ai.png`,
    surface: "#D7C5AF",
  },
  blanco: {
    image: `${ASSET_ROOT}/door-wl-j001-blanco-ai.png`,
    surface: "#ECE9E2",
  },
};

const FINISHES = WL_J001_FINISH_OPTIONS.map((finish) => ({
  ...finish,
  ...FINISH_VISUALS[finish.id],
}));

const MANAGED_QUERY_KEYS = [
  "acabado",
  "ancho",
  "alto",
  "espesor",
  "bisagras",
  "cantidad",
];

const readPositiveInteger = (params, key, maxLength) => {
  const value = (params.get(key) || "").trim();
  return isWLJ001PositiveInteger(value, maxLength) ? value : "";
};

const MODEL_KEYS = [
  "Hoja lisa de lectura limpia y contemporánea",
  "Veta vertical con marco y herrajes oscuros",
  "Configuración adaptada a las necesidades del proyecto",
];

export default function WLJ001ProductExperience() {
  const [configuration, setConfiguration] = useState(() => ({
    ...WL_J001_DEFAULT_CONFIGURATION,
  }));
  const [urlReady, setUrlReady] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const selectedFinish = FINISHES.find(({ id }) => id === configuration.finishId)
    || FINISHES[7];
  const configurationIsValid = isWLJ001ConfigurationValid(configuration);

  const configurationSearch = useMemo(() => {
    const query = new URLSearchParams();

    if (configuration.finishId !== WL_J001_DEFAULT_CONFIGURATION.finishId) {
      query.set("acabado", configuration.finishId);
    }
    if (isWLJ001PositiveInteger(configuration.width, 5)) {
      query.set("ancho", configuration.width);
    }
    if (isWLJ001PositiveInteger(configuration.height, 5)) {
      query.set("alto", configuration.height);
    }
    if (isWLJ001PositiveInteger(configuration.wallThickness, 5)) {
      query.set("espesor", configuration.wallThickness);
    }
    if (configuration.opening !== WL_J001_DEFAULT_CONFIGURATION.opening) {
      query.set("bisagras", configuration.opening);
    }
    if (
      configuration.quantity !== WL_J001_DEFAULT_CONFIGURATION.quantity
      && isWLJ001PositiveInteger(configuration.quantity, 3)
    ) {
      query.set("cantidad", configuration.quantity);
    }

    return query.toString();
  }, [configuration]);

  const contactHref = useMemo(
    () => buildWLJ001ContactHref(configuration),
    [configuration],
  );

  const gallery = useMemo(() => [
    ...BASE_GALLERY,
    {
      src: selectedFinish.image,
      alt: `Vista frontal de la puerta WL-J001 en acabado ${selectedFinish.name.toLowerCase()}`,
      eyebrow: "Acabado",
      label: selectedFinish.name,
      detail: "Vista frontal",
      imageClass: "object-contain px-[29%] py-[8%]",
      surface: selectedFinish.surface,
    },
  ], [selectedFinish]);

  const isLightboxOpen = lightboxIndex !== null;
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const lightboxRef = useAccessibleDialog(isLightboxOpen, closeLightbox);

  const showPreviousImage = useCallback(() => {
    setLightboxIndex((current) => (
      current === null ? 0 : (current - 1 + MEDIA_COUNT) % MEDIA_COUNT
    ));
  }, []);

  const showNextImage = useCallback(() => {
    setLightboxIndex((current) => (
      current === null ? 0 : (current + 1) % MEDIA_COUNT
    ));
  }, []);

  useEffect(() => {
    const restoreConfiguration = () => {
      const params = new URLSearchParams(window.location.search);
      const requestedFinish = params.get("acabado");
      const requestedOpening = params.get("bisagras");
      const finishId = FINISHES.some(({ id }) => id === requestedFinish)
        ? requestedFinish
        : WL_J001_DEFAULT_CONFIGURATION.finishId;
      const opening = WL_J001_OPENING_OPTIONS.some(
        ({ id }) => id === requestedOpening,
      )
        ? requestedOpening
        : WL_J001_DEFAULT_CONFIGURATION.opening;

      setConfiguration({
        finishId,
        width: readPositiveInteger(params, "ancho", 5),
        height: readPositiveInteger(params, "alto", 5),
        wallThickness: readPositiveInteger(params, "espesor", 5),
        opening,
        quantity: readPositiveInteger(params, "cantidad", 3)
          || WL_J001_DEFAULT_CONFIGURATION.quantity,
      });
      setUrlReady(true);
    };

    restoreConfiguration();
    window.addEventListener("popstate", restoreConfiguration);
    return () => window.removeEventListener("popstate", restoreConfiguration);
  }, []);

  useEffect(() => {
    if (!urlReady) return;

    const nextParams = new URLSearchParams(window.location.search);
    MANAGED_QUERY_KEYS.forEach((key) => nextParams.delete(key));
    const configurationParams = new URLSearchParams(configurationSearch);
    configurationParams.forEach((value, key) => nextParams.set(key, value));

    const nextSearch = nextParams.toString();
    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(window.history.state, "", nextUrl);
    }
  }, [configurationSearch, urlReady]);

  useEffect(() => {
    if (!isLightboxOpen) return undefined;

    const handleArrowKeys = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousImage();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleArrowKeys);
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, [isLightboxOpen, showNextImage, showPreviousImage]);

  const activeLightboxImage = lightboxIndex === null
    ? gallery[0]
    : gallery[lightboxIndex];

  return (
    <>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,2.15fr)_minmax(340px,0.8fr)] xl:gap-16">
        <div className="contents lg:order-2 lg:sticky lg:top-28 lg:block lg:w-full lg:max-w-[390px]">
          <section
            aria-labelledby="wlj001-product-title"
            className="order-1 mx-auto w-full max-w-[390px]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#866142]">
              Colección acústica de madera
            </p>
            <h1
              id="wlj001-product-title"
              className="mt-5 text-[clamp(3.75rem,6vw,6.75rem)] font-medium leading-[0.88] tracking-[-0.055em] text-zinc-950"
            >
              WL-J001
            </h1>
            <p className="mt-7 max-w-xl text-[15px] leading-7 text-zinc-600">
              Una puerta interior de hoja lisa que deja hablar a la veta de la
              madera. Su diseño sereno acompaña tanto espacios luminosos como
              ambientes más envolventes.
            </p>

            <Link
              href={configurationIsValid ? contactHref : "#wlj001-dimensions-title"}
              className="mt-7 inline-flex min-h-14 w-full items-center justify-between bg-zinc-950 px-6 py-4 text-xs font-bold uppercase tracking-[0.17em] text-white transition-colors hover:bg-[#866142] focus-visible:ring-2 focus-visible:ring-[#866142] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F2ED] motion-reduce:transition-none"
            >
              {configurationIsValid ? "Solicitar asesoramiento" : "Revisar configuración"}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </section>

          <section
            aria-label="Características y acabados de WL-J001"
            className="order-3 mx-auto w-full max-w-[390px] lg:mt-8"
          >
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
                El modelo en tres claves
              </h2>
              <ol className="mt-3 border-b border-zinc-300">
                {MODEL_KEYS.map((feature, index) => (
                  <li
                    key={feature}
                    className="grid grid-cols-[2rem_1fr] gap-3 border-t border-zinc-300 py-3.5 text-sm leading-5 text-zinc-600"
                  >
                    <span className="text-[10px] font-bold tracking-[0.14em] text-[#866142]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {feature}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
                    Acabado seleccionado
                  </h2>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-zinc-950" aria-live="polite">
                    {selectedFinish.name}
                  </p>
                </div>
                <p className="text-right text-[9px] font-bold uppercase tracking-[0.14em] text-[#866142]">
                  09 visualizaciones
                </p>
              </div>

              <div className="mt-4 grid grid-cols-[6.5rem_1fr] gap-4 border border-zinc-300 bg-white p-3.5">
                <div
                  className="relative aspect-[3/5] overflow-hidden"
                  style={{ backgroundColor: selectedFinish.surface }}
                >
                  <Image
                    key={selectedFinish.id}
                    src={selectedFinish.image}
                    alt={`Puerta WL-J001 en acabado ${selectedFinish.name.toLowerCase()}`}
                    fill
                    quality={85}
                    className="object-contain p-3"
                    sizes="104px"
                  />
                </div>

                <div
                  className="grid grid-cols-3 gap-2"
                  role="group"
                  aria-label="Elegir acabado de WL-J001"
                >
                  {FINISHES.map((finish) => {
                    const isSelected = finish.id === selectedFinish.id;

                    return (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => setConfiguration((current) => ({
                          ...current,
                          finishId: finish.id,
                        }))}
                        aria-pressed={isSelected}
                        aria-label={`Ver acabado ${finish.name}`}
                        className={`group min-w-0 p-1 text-left transition focus-visible:ring-2 focus-visible:ring-[#866142] motion-reduce:transition-none ${
                          isSelected
                            ? "bg-[#F0E8DF] ring-1 ring-[#866142]"
                            : "hover:bg-zinc-100"
                        }`}
                      >
                        <span
                          className="relative block h-8 w-full overflow-hidden border border-black/5"
                          style={{ backgroundColor: finish.surface }}
                          aria-hidden="true"
                        >
                          <Image
                            src={finish.image}
                            alt=""
                            fill
                            quality={60}
                            className="scale-[2.8] object-cover"
                            sizes="48px"
                          />
                        </span>
                        <span className="mt-1 block truncate text-[8px] font-bold uppercase tracking-[0.06em] text-zinc-700">
                          {finish.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="mt-3 text-[11px] leading-5 text-zinc-600">
                Previsualización orientativa. Confirmamos muestra, medidas y
                prestaciones antes de definir cada proyecto.
              </p>
            </div>
          </section>
        </div>

        <section
          aria-labelledby="wlj001-gallery-title"
          className="order-2 min-w-0 lg:order-1"
        >
          <div className="mb-4 flex items-end justify-between gap-6 border-b border-zinc-300 pb-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#866142]">
                Ambientes y producto
              </p>
              <h2 id="wlj001-gallery-title" className="sr-only">
                Galería de la puerta WL-J001
              </h2>
            </div>
            <p className="text-right text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-600">
              04 vistas · Pulsa para ampliar
            </p>
          </div>

          <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-8 sm:overflow-visible sm:px-0 sm:pb-0">
            {gallery.map((image, index) => (
              <figure
                key={`${image.src}-${index}`}
                className="w-[84vw] max-w-[350px] shrink-0 snap-center sm:w-auto sm:max-w-none"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Ampliar ${image.label.toLowerCase()}, ${image.detail.toLowerCase()}`}
                  className={`group relative block aspect-square w-full overflow-hidden focus-visible:ring-2 focus-visible:ring-[#866142] focus-visible:ring-offset-4 ${image.surfaceClass || ""}`}
                  style={image.surface ? { backgroundColor: image.surface } : undefined}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index < 2}
                    quality={88}
                    className={`${image.imageClass} transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.018] motion-reduce:transform-none motion-reduce:transition-none`}
                    sizes="(max-width: 639px) 84vw, (max-width: 1023px) 48vw, 35vw"
                  />
                  <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-zinc-950 opacity-100 shadow-sm backdrop-blur transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 motion-reduce:transition-none">
                    <Maximize2 size={16} aria-hidden="true" />
                  </span>
                </button>

                <figcaption className="mt-3 flex items-start justify-between gap-4 border-t border-zinc-300 pt-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#866142]">
                      {String(index + 1).padStart(2, "0")} · {image.eyebrow}
                    </p>
                    <p className="mt-1 text-sm font-semibold tracking-tight text-zinc-950">
                      {image.label}
                    </p>
                  </div>
                  <p className="text-right text-[10px] uppercase tracking-[0.12em] text-zinc-600">
                    {image.detail}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-3 text-[11px] leading-5 text-zinc-600 sm:hidden">
            Desliza para ver las cuatro vistas.
          </p>
        </section>
      </div>

      <WLJ001TechnicalConfigurator
        selectedFinish={selectedFinish.name}
        configuration={configuration}
        setConfiguration={setConfiguration}
        configurationSearch={configurationSearch}
        contactHref={contactHref}
        configurationIsValid={configurationIsValid}
      />

      <WLJ001MobileSummaryBar
        selectedFinish={selectedFinish.name}
        configuration={configuration}
        contactHref={contactHref}
        isLightboxOpen={isLightboxOpen}
        configurationIsValid={configurationIsValid}
      />

      {isLightboxOpen && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="wlj001-lightbox-title"
          tabIndex={-1}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
          className="fixed inset-0 z-[130] grid place-items-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
        >
          <div className="relative flex h-full max-h-[920px] w-full max-w-[1320px] flex-col bg-[#11100F] text-white shadow-2xl">
            <div className="flex min-h-16 items-center justify-between border-b border-white/10 px-4 sm:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D6B48F]">
                  {activeLightboxImage.eyebrow} · {String((lightboxIndex ?? 0) + 1).padStart(2, "0")} / 04
                </p>
                <h2 id="wlj001-lightbox-title" className="mt-1 text-sm font-semibold">
                  {activeLightboxImage.label} · {activeLightboxImage.detail}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Cerrar imagen ampliada"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden">
              <Image
                key={activeLightboxImage.src}
                src={activeLightboxImage.src}
                alt={activeLightboxImage.alt}
                fill
                priority
                quality={92}
                className="object-contain p-2 sm:p-6"
                sizes="100vw"
              />

              <button
                type="button"
                onClick={showPreviousImage}
                aria-label="Ver imagen anterior"
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:left-6 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={21} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label="Ver imagen siguiente"
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:right-6 sm:h-12 sm:w-12"
              >
                <ChevronRight size={21} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
