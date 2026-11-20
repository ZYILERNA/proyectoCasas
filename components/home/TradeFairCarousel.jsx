"use client";

import { ChevronLeft, ChevronRight, Pause, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Carrusel del bloque de la feria SMART DOORS en la página principal.
// - Avanza solo: cada vídeo al terminar o, como mucho, a los VIDEO_MAX_MS.
// - Se detiene mientras el ratón está encima, mientras se toca con el dedo
//   (y unos segundos después) o si tiene el foco del teclado.
// - Solo se reproduce el vídeo visible, siempre en silencio salvo que el
//   usuario active el sonido.

const VIDEO_MAX_MS = 30000;
const TOUCH_RESUME_MS = 5000;
const SWIPE_PX = 50;

const SLIDES = [
  {
    title: "Montaje del stand",
    src: "/videos/smart-doors-2026/stand-montaje.mp4",
    poster: "/videos/smart-doors-2026/stand-montaje-poster.webp",
    label: "Vídeo del montaje del stand de WONLY en SMART DOORS 2026",
  },
  {
    title: "Recorrido por el stand",
    src: "/videos/smart-doors-2026/stand-recorrido.mp4",
    poster: "/videos/smart-doors-2026/stand-recorrido-poster.webp",
    label: "Vídeo del recorrido por el stand de WONLY en SMART DOORS 2026",
  },
];

export default function TradeFairCarousel() {
  const rootRef = useRef(null);
  const videoRefs = useRef([]);
  const touchTimer = useRef(null);
  const swipeStart = useRef(null);

  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [loadVideos, setLoadVideos] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [muted, setMuted] = useState(true);

  const paused = hovered || touched || focused;

  const go = useCallback((direction) => {
    setCurrent((value) => (value + direction + SLIDES.length) % SLIDES.length);
  }, []);

  // Preferencia de movimiento reducido y visibilidad del bloque
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setLoadVideos(true);
      },
      { threshold: 0.25 },
    );
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      observer.disconnect();
      clearTimeout(touchTimer.current);
    };
  }, []);

  // Reproduce solo el vídeo activo cuando el bloque está a la vista
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === current && inView && !reducedMotion) {
        video.muted = muted;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [current, inView, reducedMotion, muted]);

  // Vuelve al principio el vídeo que deja de verse
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== current) video.currentTime = 0;
    });
  }, [current]);

  // Avance automático
  useEffect(() => {
    if (paused || !inView || reducedMotion) return;
    const timer = setTimeout(() => go(1), VIDEO_MAX_MS);
    return () => clearTimeout(timer);
  }, [current, paused, inView, reducedMotion, go]);

  const handleVideoEnded = () => {
    if (!paused && !reducedMotion) go(1);
    else videoRefs.current[current]?.play().catch(() => {});
  };

  // Ratón: pausa al entrar. Dedo: pausa al tocar y reanuda tras unos segundos.
  const handlePointerEnter = (event) => {
    if (event.pointerType === "mouse") setHovered(true);
  };
  const handlePointerLeave = (event) => {
    if (event.pointerType === "mouse") setHovered(false);
  };
  const handlePointerDown = (event) => {
    // Los botones de control no cuentan como gesto de deslizar
    swipeStart.current = event.target.closest("button") ? null : event.clientX;
    if (event.pointerType !== "mouse") {
      clearTimeout(touchTimer.current);
      setTouched(true);
    }
  };
  const handlePointerUp = (event) => {
    if (swipeStart.current !== null) {
      const delta = event.clientX - swipeStart.current;
      if (Math.abs(delta) > SWIPE_PX) go(delta < 0 ? 1 : -1);
    }
    swipeStart.current = null;
    if (event.pointerType !== "mouse") {
      clearTimeout(touchTimer.current);
      touchTimer.current = setTimeout(() => setTouched(false), TOUCH_RESUME_MS);
    }
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carrusel"
      aria-label="SMART DOORS 2026: vídeos del stand de WONLY"
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => (swipeStart.current = null)}
      onFocus={(event) => {
        // Solo pausa con el teclado; un clic con el ratón no deja el carrusel parado
        if (event.target.matches(":focus-visible")) setFocused(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="relative aspect-video touch-pan-y bg-black">
        {SLIDES.map((item, index) => {
          const active = index === current;
          return (
            <div
              key={item.src}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${SLIDES.length}: ${item.title}`}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-700 ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <video
                ref={(node) => {
                  videoRefs.current[index] = node;
                }}
                src={loadVideos ? item.src : undefined}
                poster={item.poster}
                muted
                playsInline
                preload="none"
                onEnded={handleVideoEnded}
                aria-label={item.label}
                className="h-full w-full bg-black object-cover"
              />
            </div>
          );
        })}

        {/* Flechas grandes a los lados */}
        <ArrowButton side="left" label="Vídeo anterior" onClick={() => go(-1)}>
          <ChevronLeft size={28} strokeWidth={2.5} aria-hidden="true" />
        </ArrowButton>
        <ArrowButton side="right" label="Vídeo siguiente" onClick={() => go(1)}>
          <ChevronRight size={28} strokeWidth={2.5} aria-hidden="true" />
        </ArrowButton>

        {/* Aviso de pausa */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur transition-opacity duration-300 ${
            paused ? "opacity-100" : "opacity-0"
          }`}
        >
          <Pause size={12} fill="currentColor" aria-hidden="true" />
          En pausa
        </div>
      </div>

      {/* Pestañas de los vídeos y sonido */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/60 p-3 sm:p-4">
        <div className="flex flex-wrap gap-2">
          {SLIDES.map((item, index) => {
            const active = index === current;
            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Ver vídeo: ${item.title}`}
                aria-current={active}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A868] sm:text-sm ${
                  active
                    ? "bg-[#D4A868] text-black"
                    : "border border-white/25 text-white hover:border-[#D4A868] hover:text-[#D4A868]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${
                    active ? "bg-black text-[#D4A868]" : "bg-white/15"
                  }`}
                >
                  {index + 1}
                </span>
                {item.title}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setMuted((value) => !value)}
          aria-pressed={!muted}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:border-[#D4A868] hover:text-[#D4A868] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A868] sm:text-sm"
        >
          {muted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
          {muted ? "Activar sonido" : "Silenciar"}
        </button>
      </div>
    </div>
  );
}

function ArrowButton({ side, label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[#D4A868] text-black shadow-lg shadow-black/40 transition hover:scale-110 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-14 sm:w-14 ${
        side === "left" ? "left-3 sm:left-4" : "right-3 sm:right-4"
      }`}
    >
      {children}
    </button>
  );
}
