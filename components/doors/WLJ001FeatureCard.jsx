"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SCENES = [
  {
    id: "daylight",
    shortLabel: "Día",
    label: "Luz natural",
    description: "Roble, cal y luz de mañana",
    src: "/images/PUERTAS/MADERAACÚSTICA/wl-j001/scene-warm-ai.webp",
    alt: "Puerta WL-J001 en acabado natural integrada en un salón contemporáneo",
  },
  {
    id: "evening",
    shortLabel: "Noche",
    label: "Atardecer",
    description: "Grafito, nogal y luz indirecta",
    src: "/images/PUERTAS/MADERAACÚSTICA/wl-j001/scene-dark-ai.webp",
    alt: "Puerta WL-J001 en acabado grafito integrada en un estudio al atardecer",
  },
];

export default function WLJ001FeatureCard({ product, href, priority = false }) {
  const [selectedScene, setSelectedScene] = useState(0);
  const [previewingEvening, setPreviewingEvening] = useState(false);
  const activeSceneIndex = previewingEvening ? 1 : selectedScene;
  const activeScene = SCENES[activeSceneIndex];

  return (
    <article
      className="col-span-2 min-w-0"
      data-product-card="WL-J001"
      data-active-scene={activeScene.id}
    >
      <div className="relative">
        <Link
          href={href}
          aria-label={`${product.name} · Ver ficha`}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setPreviewingEvening(true);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setPreviewingEvening(false);
          }}
          className="group block focus-visible:ring-2 focus-visible:ring-[#866142] focus-visible:ring-offset-4"
        >
          <div className="relative aspect-square overflow-hidden bg-[#E8E1D8]">
            {SCENES.map((scene, index) => {
              const isActive = activeSceneIndex === index;

              return (
                <Image
                  key={scene.id}
                  src={scene.src}
                  alt=""
                  fill
                  priority={priority && index === 0}
                  quality={88}
                  aria-hidden="true"
                  className={`object-cover transition duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                    isActive
                      ? "scale-100 opacity-100 group-hover:scale-[1.018]"
                      : "scale-[1.018] opacity-0"
                  }`}
                  sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) 62vw, 520px"
                />
              );
            })}

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/15" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F1D8BB]">
                  0{activeSceneIndex + 1} / 02 · {activeScene.label}
                </p>
                <p className="mt-1.5 max-w-xs text-xs leading-5 text-white/85 sm:text-sm">
                  {activeScene.description}
                </p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/60 bg-white text-zinc-950 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-focus:-translate-y-1 group-focus:translate-x-1 motion-reduce:transform-none">
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>

        <div
          className="absolute right-4 top-4 z-10 flex items-center gap-1 border border-white/40 bg-black/35 p-1 backdrop-blur-md sm:right-5 sm:top-5"
          role="group"
          aria-label="Elegir ambiente de WL-J001"
        >
          {SCENES.map((scene, index) => {
            const isSelected = selectedScene === index;

            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => setSelectedScene(index)}
                aria-pressed={isSelected}
                aria-label={`Mostrar ambiente ${scene.label.toLowerCase()}`}
                className={`min-h-11 px-2.5 text-[10px] font-bold uppercase tracking-[0.12em] transition focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:px-3 ${
                  isSelected
                    ? "bg-white text-zinc-950"
                    : "text-white hover:bg-white/15"
                }`}
              >
                {scene.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      <Link
        href={href}
        className="group flex flex-wrap items-center justify-between gap-5 border-x border-b border-zinc-200 bg-[#F7F4EF] px-5 py-5 transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-[#866142] focus-visible:ring-offset-4 sm:px-7 sm:py-6"
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#866142]">
            Puerta acústica de madera
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            {product.name}
          </h2>
        </div>
        <span className="flex items-center gap-2 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-700 sm:text-[10px]">
          Ver ficha
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
            aria-hidden="true"
          />
        </span>
      </Link>
    </article>
  );
}
