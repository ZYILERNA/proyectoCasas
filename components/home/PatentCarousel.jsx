"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";

const TOTAL_PATENTS = 13;

export default function PatentCarousel() {
  const [current, setCurrent] = useState(1);

  const move = (direction) => {
    setCurrent((value) => {
      const next = value + direction;
      if (next < 1) return TOTAL_PATENTS;
      if (next > TOTAL_PATENTS) return 1;
      return next;
    });
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/35 p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Patente seleccionada
          </p>
          <p className="mt-1 text-lg font-semibold">
            Documento {String(current).padStart(2, "0")} de {TOTAL_PATENTS}
          </p>
        </div>
        <div className="flex gap-2">
          <CarouselButton
            label="Ver patente anterior"
            onClick={() => move(-1)}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </CarouselButton>
          <CarouselButton
            label="Ver patente siguiente"
            onClick={() => move(1)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </CarouselButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <PatentDocument
          src={`/images/Asset/CERTIFICADOS/CERT${current}/chino.webp`}
          alt={`Patente de invención ${current}, documento original de CNIPA`}
          label="Documento original"
          language="CN"
          width={960}
          height={1360}
        />
        <PatentDocument
          src={`/images/Asset/CERTIFICADOS/CERT${current}/espanol.webp`}
          alt={`Patente de invención ${current}, traducción al español`}
          label="Traducción"
          language="ES"
          width={1054}
          height={1492}
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <label
          htmlFor="patent-select"
          className="text-xs font-medium text-zinc-500"
        >
          Ir al documento
        </label>
        <select
          id="patent-select"
          value={current}
          onChange={(event) => setCurrent(Number(event.target.value))}
          className="rounded-full border border-white/15 bg-[#111] px-4 py-2 text-sm text-white outline-none focus:border-[#D4A868]"
        >
          {Array.from({ length: TOTAL_PATENTS }, (_, index) => index + 1).map(
            (number) => (
              <option key={number} value={number}>
                Patente {number}
              </option>
            ),
          )}
        </select>
      </div>
    </div>
  );
}

function PatentDocument({ src, alt, label, language, width, height }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <figcaption className="text-sm font-medium text-zinc-300">
          {label}
        </figcaption>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          {language}
        </span>
      </div>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir ${label.toLocaleLowerCase("es")} en tamaño completo`}
        className="group relative block aspect-[.71] overflow-hidden bg-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#D4A868]"
      >
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          quality={74}
          className="object-contain"
          sizes="(max-width: 768px) 92vw, 390px"
        />
        <span className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-full bg-black/80 px-4 py-2 text-xs font-semibold text-white opacity-100 backdrop-blur transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          Abrir en tamaño completo
          <ExternalLink size={14} aria-hidden="true" />
        </span>
      </a>
    </figure>
  );
}

function CarouselButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-[#D4A868] hover:bg-[#D4A868] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A868]"
    >
      {children}
    </button>
  );
}
