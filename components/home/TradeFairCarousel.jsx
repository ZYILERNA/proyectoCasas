"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Carrusel del bloque de la feria SMART DOORS en la página principal.
// - Avanza solo: las imágenes cada IMAGE_MS; los vídeos al terminar o, como
//   mucho, a los VIDEO_MAX_MS.
// - Se detiene mientras el ratón está encima, mientras se toca con el dedo
//   (y unos segundos después) o si tiene el foco del teclado.
// - Solo se reproduce el vídeo visible, siempre en silencio salvo que el
//   usuario active el sonido.

const IMAGE_MS = 7000;
const VIDEO_MAX_MS = 30000;
const TOUCH_RESUME_MS = 5000;
const SWIPE_PX = 50;

const SLIDES = [
  {
    type: "image",
    src: "/images/COMPANY/CAMPANA/smart-doors-2026.webp",
    alt: "Cartel de WONLY en SMART DOORS, IFEMA Madrid, del 10 al 13 de noviembre de 2026",
    href: "https://www.ifema.es/smart-doors",
  },
  {
    type: "video",
    src: "/videos/smart-doors-2026/stand-montaje.mp4",
    poster: "/videos/smart-doors-2026/stand-montaje-poster.webp",
    label: "Vídeo del montaje del stand de WONLY en SMART DOORS 2026",
  },
  {
    type: "video",
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
  const slide = SLIDES[current];

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
    const delay = slide.type === "video" ? VIDEO_MAX_MS : IMAGE_MS;
    const timer = setTimeout(() => go(1), delay);
    return () => clearTimeout(timer);
  }, [current, paused, inView, reducedMotion, slide.type, go]);

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
      aria-label="SMART DOORS 2026: cartel y vídeos del stand de WONLY"
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => (swipeStart.current = null)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="relative aspect-[3/2] touch-pan-y">
        {SLIDES.map((item, index) => {
          const active = index === current;
          return (
            <div
              key={item.src}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${SLIDES.length}`}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-700 ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {item.type === "image" ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={active ? 0 : -1}
                  aria-label="SMART DOORS 2026 en la web de IFEMA (se abre en una pestaña nueva)"
                  className="block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#D4A868]"
                  draggable={false}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={index === 0}
                    draggable={false}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </a>
              ) : (
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
              )}
            </div>
          );
        })}
      </div>

      {/* Controles */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="pointer-events-auto flex gap-2">
          {SLIDES.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Ir a la diapositiva ${index + 1}`}
              aria-current={index === current}
              className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A868] ${
                index === current ? "w-8 bg-[#D4A868]" : "w-2 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>

        <div className="pointer-events-auto flex gap-2">
          {slide.type === "video" && (
            <ControlButton
              label={muted ? "Activar sonido" : "Silenciar"}
              onClick={() => setMuted((value) => !value)}
            >
              {muted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
            </ControlButton>
          )}
          <ControlButton label="Diapositiva anterior" onClick={() => go(-1)}>
            <ChevronLeft size={18} aria-hidden="true" />
          </ControlButton>
          <ControlButton label="Diapositiva siguiente" onClick={() => go(1)}>
            <ChevronRight size={18} aria-hidden="true" />
          </ControlButton>
        </div>
      </div>
    </div>
  );
}

function ControlButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition hover:border-[#D4A868] hover:text-[#D4A868] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A868]"
    >
      {children}
    </button>
  );
}
