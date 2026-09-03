"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ScanLine } from "lucide-react";
import { useEffect, useRef } from "react";

const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const smoothstep = (value) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

export default function DoorHeroExperience() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;

    if (!section || !frame) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let animationFrame = 0;
    let lastProgress = -1;
    let travel = 1;
    let visible = true;

    const paint = (rawProgress) => {
      const progress = clamp(rawProgress);
      const reveal = smoothstep((progress - 0.04) / 0.78);
      const detailReveal = smoothstep((progress - 0.48) / 0.34);
      const glowFade = 1 - smoothstep((progress - 0.72) / 0.22);
      const portalInset = (1 - reveal) * 49.88;

      frame.style.setProperty("--door-progress", progress.toFixed(4));
      frame.style.setProperty("--door-portal-inset", `${portalInset.toFixed(3)}%`);
      frame.style.setProperty(
        "--door-model-scale",
        (1 + reveal * 0.105).toFixed(4),
      );
      frame.style.setProperty(
        "--door-model-opacity",
        (1 - reveal * 0.22).toFixed(4),
      );
      frame.style.setProperty(
        "--door-scene-scale",
        (1.085 - reveal * 0.085).toFixed(4),
      );
      frame.style.setProperty(
        "--door-copy-offset",
        `${(-10 * detailReveal).toFixed(2)}px`,
      );
      frame.style.setProperty(
        "--door-hint-opacity",
        (1 - smoothstep(progress / 0.28)).toFixed(4),
      );
      frame.style.setProperty(
        "--door-detail-opacity",
        detailReveal.toFixed(4),
      );
      frame.style.setProperty(
        "--door-detail-y",
        `${((1 - detailReveal) * 12).toFixed(2)}px`,
      );
      frame.style.setProperty(
        "--door-glow-opacity",
        (0.82 * glowFade).toFixed(4),
      );
      frame.style.setProperty(
        "--door-shadow-opacity",
        (0.34 * glowFade).toFixed(4),
      );
    };

    const measure = () => {
      travel = Math.max(section.offsetHeight - frame.offsetHeight, 1);
    };

    const update = () => {
      animationFrame = 0;

      if (reducedMotion.matches) {
        if (lastProgress !== 1) {
          lastProgress = 1;
          paint(1);
        }
        return;
      }

      if (!visible) return;

      const sectionRect = section.getBoundingClientRect();
      const nextProgress = clamp(-sectionRect.top / travel);

      if (Math.abs(nextProgress - lastProgress) < 0.001) return;

      lastProgress = nextProgress;
      paint(nextProgress);
    };

    const requestUpdate = () => {
      if (reducedMotion.matches && lastProgress === 1) return;
      if (!visible && !reducedMotion.matches) return;

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(update);
      }
    };

    const handleResize = () => {
      measure();
      lastProgress = -1;
      requestUpdate();
    };

    const handleMotionPreference = () => {
      measure();
      lastProgress = -1;
      requestUpdate();
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        section.dataset.active = visible ? "true" : "false";

        if (visible) {
          measure();
          lastProgress = -1;
          requestUpdate();
        }
      },
      { rootMargin: "200px 0px" },
    );

    measure();
    paint(reducedMotion.matches ? 1 : 0);
    lastProgress = reducedMotion.matches ? 1 : 0;
    visibilityObserver.observe(section);
    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      reducedMotion.removeEventListener("change", handleMotionPreference);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="door-hero relative isolate border-b border-white/10"
    >
      <div ref={frameRef} className="door-hero__frame sticky top-0 overflow-hidden">
        <div aria-hidden="true" className="door-hero__ambient absolute inset-0" />

        <div aria-hidden="true" className="door-hero__visual">
          <div className="door-hero__model absolute inset-0">
            <Image
              src="/images/PUERTAS/AI/door-x50-max-transparent.png"
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 118vw, 60vw"
              className="object-contain object-center"
            />
          </div>

          <div className="door-hero__scene absolute inset-0">
            <Image
              src="/images/PUERTAS/WALLPAPER/x50max.png"
              alt=""
              fill
              sizes="(max-width: 767px) 118vw, 60vw"
              className="object-cover object-[44%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20" />
          </div>

          <div className="door-hero__portal-rim absolute inset-y-0" />

          <div className="door-hero__badge absolute right-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md md:right-8 md:top-8">
            <ScanLine size={14} className="text-[#D4A868]" />
            X50 Max · Serie IA
          </div>

          <div className="door-hero__detail absolute bottom-7 right-5 z-10 max-w-[15rem] border-r border-[#D4A868] pr-4 text-right md:bottom-28 md:right-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A868]">
              Del producto al espacio
            </p>
            <p className="mt-1 text-sm leading-5 text-white/75">
              Seguridad inteligente integrada en la arquitectura.
            </p>
          </div>
        </div>

        <div aria-hidden="true" className="door-hero__veil absolute inset-0" />

        <div className="container relative z-20 mx-auto flex h-full items-center px-6 py-16">
          <div className="door-hero__copy max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A868] sm:text-sm md:text-base">
              Tecnología &amp; Seguridad S.L.
            </p>

            <h1
              id="hero-title"
              className="mt-4 max-w-3xl text-5xl font-bold uppercase leading-[0.96] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-8xl"
            >
              El futuro
              <br />
              <span className="bg-gradient-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent">
                es seguro
              </span>
            </h1>

            <p className="mb-8 mt-6 max-w-xl border-l-2 border-[#D4A868] pl-5 text-base font-light leading-7 text-zinc-300 sm:text-lg md:mb-10 md:pl-6 md:text-xl md:leading-8">
              Especialistas en puertas de seguridad, cerraduras inteligentes y
              blindaje de alta tecnología. Protegemos lo que más importa.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/puertas?category=PUERTA%20DE%20SEGURIDAD%20IA"
                className="inline-flex min-h-12 items-center justify-center bg-[#D4A868] px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A868] sm:min-h-14 sm:px-8 sm:py-4 sm:text-sm"
              >
                Ver puertas
              </Link>
              <Link
                href="/contacto"
                className="inline-flex min-h-12 items-center justify-center border border-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition duration-300 hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-14 sm:px-8 sm:py-4 sm:text-sm"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="door-hero__scroll-hint absolute left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 md:text-xs"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A868]" />
          Desliza para entrar
          <ArrowDown size={15} className="text-[#D4A868]" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A868]" />
        </div>

        <div aria-hidden="true" className="door-hero__progress absolute bottom-0 left-0 z-30 h-0.5 bg-[#D4A868]" />
      </div>
    </section>
  );
}
