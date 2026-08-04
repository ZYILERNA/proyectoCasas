"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Copy,
  Layers3,
  Palette,
  Plus,
  Printer,
  Ruler,
  Share2,
  Settings,
  Volume2,
} from "lucide-react";
import {
  WL_J001_DIMENSION_FIELDS,
  WL_J001_FAQS,
  WL_J001_OPENING_OPTIONS,
  WL_J001_PRODUCT,
  WL_J001_TECHNICAL_FACTS,
} from "../../lib/wl-j001-product";

const FACT_ICONS = {
  application: Settings,
  design: Layers3,
  core: Layers3,
  acoustic: Volume2,
  operation: Settings,
  finishes: Palette,
};

const sanitizeDigits = (value, maxLength = 5) => value
  .replace(/\D/g, "")
  .slice(0, maxLength);

const isPositiveMeasurement = (value) => /^\d{1,5}$/.test(value)
  && Number(value) > 0;

const formatMeasurement = (value) => {
  if (!value) return "por indicar";
  return isPositiveMeasurement(value) ? `${value} mm` : "dato no válido";
};

export default function WLJ001TechnicalConfigurator({
  selectedFinish,
  configuration,
  setConfiguration,
  configurationSearch,
  contactHref,
  configurationIsValid,
}) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const [shareStatus, setShareStatus] = useState("idle");
  const {
    width,
    height,
    wallThickness,
    opening,
    quantity,
  } = configuration;
  const measurements = { width, height, wallThickness };

  const openingOption = WL_J001_OPENING_OPTIONS.find(({ id }) => id === opening)
    || WL_J001_OPENING_OPTIONS[0];
  const openingLabel = openingOption.label;
  const hasInvalidMeasurements = Object.values(measurements).some((value) => (
    value && !isPositiveMeasurement(value)
  ));
  const hasInvalidQuantity = !/^\d{1,3}$/.test(quantity) || Number(quantity) < 1;

  const configurationSummary = useMemo(() => [
    `Modelo: ${WL_J001_PRODUCT.code}`,
    `Acabado orientativo: ${selectedFinish}`,
    `Ancho del hueco: ${formatMeasurement(width)}`,
    `Alto del hueco: ${formatMeasurement(height)}`,
    `Espesor del muro: ${formatMeasurement(wallThickness)}`,
    `Posición de bisagras: ${openingLabel}`,
    `Cantidad: ${quantity || "1"}`,
  ], [height, openingLabel, quantity, selectedFinish, wallThickness, width]);

  useEffect(() => {
    if (copyStatus === "idle" && shareStatus === "idle") return undefined;
    const timeoutId = window.setTimeout(() => {
      setCopyStatus("idle");
      setShareStatus("idle");
    }, 2600);
    return () => window.clearTimeout(timeoutId);
  }, [copyStatus, shareStatus]);

  const updateMeasurement = (field, value) => {
    setConfiguration((current) => ({
      ...current,
      [field]: sanitizeDigits(value),
    }));
  };

  const copyConfiguration = async () => {
    try {
      await navigator.clipboard.writeText(configurationSummary.join("\n"));
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  const copyShareLink = async () => {
    const query = configurationSearch ? `?${configurationSearch}` : "";
    const shareUrl = `${window.location.origin}${window.location.pathname}${query}#wlj001-dimensions-title`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus("copied");
    } catch {
      setShareStatus("error");
    }
  };

  return (
    <section
      id="wlj001-configurator"
      aria-labelledby="wlj001-technical-title"
      className="mt-20 border-t border-zinc-300 pt-14 sm:mt-24 sm:pt-16"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#866142]">
            Información del modelo
          </p>
          <h2
            id="wlj001-technical-title"
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-zinc-950 sm:text-4xl lg:text-5xl"
          >
            Características técnicas y medidas del proyecto.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-zinc-600 lg:justify-self-end">
          La WL-J001 se configura a partir de las necesidades del espacio. Las
          medidas y la prestación acústica definitivas se validan técnicamente
          antes de confirmar el proyecto.
        </p>
      </div>

      <dl className="mt-10 grid border-l border-t border-zinc-300 sm:grid-cols-2 lg:grid-cols-3">
        {WL_J001_TECHNICAL_FACTS.map((fact, index) => {
          const Icon = FACT_ICONS[fact.id] || Settings;

          return (
            <div
              key={fact.id}
              className="min-h-44 border-b border-r border-zinc-300 bg-white/45 p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[10px] font-bold uppercase tracking-[0.17em] text-zinc-600">
                  {fact.label}
                </dt>
                <span className="text-[#866142]" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
              </div>
              <dd className="mt-8">
                <p className="text-xl font-semibold tracking-tight text-zinc-950">
                  {fact.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-zinc-600">
                  {fact.detail}
                </p>
              </dd>
              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#866142]">
                {String(index + 1).padStart(2, "0")}
              </p>
            </div>
          );
        })}
      </dl>

      <section
        aria-labelledby="wlj001-dimensions-title"
        className="mt-12 overflow-hidden bg-[#17130F] text-white sm:mt-16"
      >
        <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A781]">
                  Planificador de medidas
                </p>
                <h3
                  id="wlj001-dimensions-title"
                  className="mt-4 scroll-mt-28 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
                >
                  Define el hueco de tu puerta.
                </h3>
              </div>
              <Ruler className="mt-1 shrink-0 text-[#C9A781]" size={25} aria-hidden="true" />
            </div>

            <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-400">
              Introduce las medidas disponibles. Puedes dejar cualquier dato
              pendiente y nuestro equipo te ayudará a comprobarlo.
            </p>

            <div className="mt-8 border border-white/10 bg-black/20 p-4 sm:p-6">
              <svg
                viewBox="0 0 520 360"
                className="h-auto w-full"
                role="img"
                aria-labelledby="wlj001-measurement-diagram-title wlj001-measurement-diagram-description"
              >
                <title id="wlj001-measurement-diagram-title">
                  Esquema de medición del hueco de la WL-J001
                </title>
                <desc id="wlj001-measurement-diagram-description">
                  El esquema señala el ancho, el alto y el espesor del muro.
                </desc>
                <rect x="153" y="40" width="214" height="258" fill="#D8C7B2" opacity="0.13" />
                <rect x="176" y="59" width="168" height="239" fill="#B9936B" opacity="0.9" />
                <rect x="188" y="70" width="144" height="228" fill="#8C694C" opacity="0.62" />
                <circle cx="310" cy="187" r="5" fill="#F5F2ED" />

                <line x1="153" y1="327" x2="367" y2="327" stroke="#C9A781" strokeWidth="2" />
                <path d="M153 327l11-6v12zM367 327l-11-6v12z" fill="#C9A781" />
                <text x="260" y="350" fill="#F5F2ED" textAnchor="middle" fontSize="15">
                  {measurements.width ? `${measurements.width} mm` : "Ancho del hueco"}
                </text>

                <line x1="112" y1="40" x2="112" y2="298" stroke="#C9A781" strokeWidth="2" />
                <path d="M112 40l-6 11h12zM112 298l-6-11h12z" fill="#C9A781" />
                <text x="83" y="170" fill="#F5F2ED" textAnchor="middle" fontSize="15" transform="rotate(-90 83 170)">
                  {measurements.height ? `${measurements.height} mm` : "Alto del hueco"}
                </text>

                <line x1="386" y1="76" x2="433" y2="46" stroke="#C9A781" strokeWidth="2" />
                <path d="M386 76l4-12 7 11zM433 46l-4 12-7-11z" fill="#C9A781" />
                <text x="434" y="83" fill="#F5F2ED" textAnchor="middle" fontSize="14">
                  {measurements.wallThickness ? `${measurements.wallThickness} mm` : "Espesor"}
                </text>
              </svg>
            </div>

            <p className="mt-4 text-xs leading-5 text-zinc-500">
              Orden de referencia: ancho × alto × espesor, siempre en milímetros.
            </p>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <form onSubmit={(event) => event.preventDefault()}>
              <fieldset>
                <legend className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A781]">
                  Medidas preliminares
                </legend>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {WL_J001_DIMENSION_FIELDS.map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={`wlj001-${field.id}`}
                        className="block text-xs font-semibold text-zinc-200"
                      >
                        {field.label}
                        {field.optional && (
                          <span className="ml-1 font-normal text-zinc-500">(opcional)</span>
                        )}
                      </label>
                      <div className="relative mt-2">
                        <input
                          id={`wlj001-${field.id}`}
                          type="text"
                          inputMode="numeric"
                          autoComplete="off"
                          value={measurements[field.id]}
                          onChange={(event) => updateMeasurement(field.id, event.target.value)}
                          placeholder={field.placeholder}
                          aria-invalid={Boolean(measurements[field.id] && !isPositiveMeasurement(measurements[field.id]))}
                          aria-describedby="wlj001-measurement-note wlj001-measurement-validation"
                          className="min-h-12 w-full scroll-mt-28 border border-white/15 bg-white/[0.06] px-4 pr-12 text-base text-white placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-[#C9A781]"
                        />
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                          mm
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p id="wlj001-measurement-note" className="mt-3 text-xs leading-5 text-zinc-500">
                  Son datos de consulta, sujetos a comprobación profesional.
                </p>
                <p id="wlj001-measurement-validation" className="mt-1 min-h-5 text-xs leading-5 text-[#D6B48F]" aria-live="polite">
                  {hasInvalidMeasurements && "Las medidas indicadas deben ser superiores a 0."}
                </p>
              </fieldset>

              <fieldset className="mt-7" aria-describedby="wlj001-opening-note">
                <legend className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A781]">
                  Posición orientativa de bisagras
                </legend>
                <p id="wlj001-opening-note" className="mt-3 text-xs leading-5 text-zinc-500">
                  Izquierda o derecha se interpreta mirando la puerta desde el lado de entrada. La mano final se confirma técnicamente.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {WL_J001_OPENING_OPTIONS.map((option) => {
                    const isSelected = option.id === opening;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setConfiguration((current) => ({
                          ...current,
                          opening: option.id,
                        }))}
                        aria-pressed={isSelected}
                        className={`min-h-12 border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition focus-visible:ring-2 focus-visible:ring-[#C9A781] motion-reduce:transition-none ${
                          isSelected
                            ? "border-[#C9A781] bg-[#C9A781] text-[#17130F]"
                            : "border-white/15 text-zinc-300 hover:border-white/40"
                        }`}
                      >
                        {option.buttonLabel}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8 grid gap-5 sm:grid-cols-[8rem_1fr] sm:items-end">
                <div>
                  <label htmlFor="wlj001-quantity" className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A781]">
                    Cantidad
                  </label>
                  <input
                    id="wlj001-quantity"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={quantity}
                    aria-invalid={hasInvalidQuantity}
                    aria-describedby="wlj001-quantity-validation"
                    onChange={(event) => setConfiguration((current) => ({
                      ...current,
                      quantity: sanitizeDigits(event.target.value, 3),
                    }))}
                    onBlur={() => {
                      if (!quantity || Number(quantity) < 1) {
                        setConfiguration((current) => ({
                          ...current,
                          quantity: "1",
                        }));
                      }
                    }}
                    className="mt-2 min-h-12 w-full scroll-mt-28 border border-white/15 bg-white/[0.06] px-4 text-base text-white focus-visible:ring-2 focus-visible:ring-[#C9A781]"
                  />
                  <p id="wlj001-quantity-validation" className="mt-2 min-h-5 text-xs leading-5 text-[#D6B48F]" aria-live="polite">
                    {hasInvalidQuantity && "Indica una cantidad superior a 0."}
                  </p>
                </div>

                <div className="border-l border-white/10 pl-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                    Acabado vinculado
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white" aria-live="polite">
                    {selectedFinish}
                  </p>
                </div>
              </div>

              <div className="mt-8 border border-white/10 bg-black/20 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#C9A781]">
                  Resumen de configuración
                </p>
                <dl className="mt-4 grid gap-x-5 gap-y-3 text-xs sm:grid-cols-2">
                  {configurationSummary.map((line) => {
                    const separatorIndex = line.indexOf(":");
                    const label = line.slice(0, separatorIndex);
                    const value = line.slice(separatorIndex + 1).trim();

                    return (
                      <div key={label} className="border-t border-white/10 pt-3">
                        <dt className="text-zinc-500">{label}</dt>
                        <dd className="mt-1 font-semibold text-zinc-100">{value}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={copyConfiguration}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition hover:border-white hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
                >
                  {copyStatus === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  {copyStatus === "copied" ? "Configuración copiada" : "Copiar configuración"}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition hover:border-white hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
                >
                  <Printer size={16} aria-hidden="true" />
                  Imprimir ficha
                </button>
                <button
                  type="button"
                  onClick={copyShareLink}
                  disabled={!configurationIsValid}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition hover:border-white hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:border-white/10 disabled:text-zinc-600 disabled:hover:bg-transparent motion-reduce:transition-none"
                >
                  {shareStatus === "copied" ? <Check size={16} aria-hidden="true" /> : <Share2 size={16} aria-hidden="true" />}
                  {shareStatus === "copied"
                    ? "Enlace copiado"
                    : configurationIsValid
                      ? "Copiar enlace"
                      : "Revisa los datos"}
                </button>
              </div>

              <p className="mt-3 min-h-5 text-xs text-[#D6B48F]" aria-live="polite">
                {copyStatus === "error" && "No se pudo copiar. Puedes enviar la configuración directamente."}
                {shareStatus === "error" && "No se pudo copiar el enlace. Prueba a copiar la dirección del navegador."}
              </p>

              <Link
                href={contactHref}
                aria-disabled={!configurationIsValid}
                onClick={(event) => {
                  if (!configurationIsValid) event.preventDefault();
                }}
                className="mt-3 inline-flex min-h-14 w-full items-center justify-between bg-white px-5 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-[#C9A781] focus-visible:ring-2 focus-visible:ring-[#C9A781] focus-visible:ring-offset-4 focus-visible:ring-offset-[#17130F] motion-reduce:transition-none sm:px-6"
              >
                {!configurationIsValid
                  ? "Revisa las medidas y la cantidad"
                  : "Enviar solicitud para validar medidas"}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </form>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="wlj001-faq-title"
        className="mt-16 border-t border-zinc-300 pt-14 sm:mt-20 sm:pt-16"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(15rem,0.65fr)_minmax(0,1.35fr)] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#866142]">
              Antes de solicitar información
            </p>
            <h2
              id="wlj001-faq-title"
              className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-zinc-950 sm:text-4xl"
            >
              Preguntas frecuentes sobre la WL-J001.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-600">
              Respuestas claras para preparar la consulta. Las dimensiones,
              el acabado y la prestación final se validan para cada proyecto.
            </p>
          </div>

          <div className="border-t border-zinc-300">
            {WL_J001_FAQS.map((item, index) => (
              <details
                key={item.id}
                className="group border-b border-zinc-300"
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left focus-visible:ring-2 focus-visible:ring-[#866142] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F2ED] [&::-webkit-details-marker]:hidden">
                  <span className="grid min-w-0 grid-cols-[2rem_1fr] items-start gap-3">
                    <span className="pt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#866142]" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold leading-6 text-zinc-950 sm:text-lg">
                      {item.question}
                    </span>
                  </span>
                  <Plus
                    size={19}
                    className="shrink-0 text-[#866142] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-6 pl-11 pr-10 text-sm leading-7 text-zinc-600 sm:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="wlj001-print-sheet" aria-hidden="true">
        <header className="wlj001-print-header">
          <div>
            <p>WONLY · Ficha de consulta</p>
            <h1>{WL_J001_PRODUCT.code}</h1>
          </div>
          <p>Serie {WL_J001_PRODUCT.series} · Puerta interior acústica de madera</p>
        </header>

        <section>
          <h2>Información del modelo</h2>
          <dl className="wlj001-print-grid">
            {WL_J001_TECHNICAL_FACTS.map((fact) => (
              <div key={fact.id}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
                <p>{fact.detail}</p>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Configuración de la consulta</h2>
          <dl className="wlj001-print-grid">
            {configurationSummary.map((line) => {
              const separatorIndex = line.indexOf(":");
              return (
                <div key={line.slice(0, separatorIndex)}>
                  <dt>{line.slice(0, separatorIndex)}</dt>
                  <dd>{line.slice(separatorIndex + 1).trim()}</dd>
                </div>
              );
            })}
          </dl>
        </section>

        <footer>
          Medidas preliminares sujetas a comprobación profesional. La prestación acústica final depende de la configuración validada para el proyecto.
        </footer>
      </div>
    </section>
  );
}
