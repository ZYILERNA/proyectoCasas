"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import CatalogDoorScene from "./CatalogDoorScene";

const clamp = (value) => Math.min(1, Math.max(0, value));
const smoothstep = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

export default function DoorHeroExperience() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const sceneRef = useRef(null);
  const skipRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const scene = sceneRef.current;
    if (!section || !frame || !scene) return undefined;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    let disposed = false;
    let visible = true;
    let ready = false;
    let failed = false;
    let raf = 0;
    let previousTime = 0;
    let progress = 0;
    let travel = 1;
    let revealed = null;
    let introTimer = 0;
    let copyAdvanced = false;
    let hasOpened = false;

    const staticMode = () => motion.matches || Boolean(connection?.saveData);
    const advanceCopy = () => {
      if (disposed || copyAdvanced || staticMode() || failed) return;
      copyAdvanced = true;
      section.dataset.copy = "product";
      window.clearTimeout(introTimer);
      introTimer = 0;
    };
    const queueIntro = () => {
      if (ready && visible && !document.hidden && !staticMode() && !hasOpened && !copyAdvanced && !introTimer) {
        introTimer = window.setTimeout(advanceCopy, 4200);
      }
    };
    const reveal = (value) => {
      if (disposed || value === revealed) return;
      revealed = value;
      section.dataset.revealed = String(value);
      section.dataset.stage = value ? "inside" : "opening";
      document.body.dataset.wonlyDoorRevealed = String(value);
      window.dispatchEvent(new CustomEvent("wonly:door-reveal", { detail: { visible: value } }));
    };
    revealRef.current = reveal;

    const paint = () => {
      // Keep the door fully closed until the visitor starts scrolling.
      const position = smoothstep(progress / 0.78);
      scene.setProgress(staticMode() ? 0 : position);
      frame.dataset.progress = position.toFixed(4);
      frame.style.setProperty("--door-progress", progress.toFixed(4));
      frame.style.setProperty("--door-copy-opacity", (1 - smoothstep(progress / 0.26)).toFixed(4));
      frame.style.setProperty("--door-copy-y", String(-progress * 70) + "px");
      const productExit = smoothstep((progress - 0.62) / 0.16);
      frame.dataset.productExiting = String(productExit > 0);
      frame.style.setProperty("--door-product-opacity", (1 - productExit).toFixed(4));
      frame.style.setProperty("--door-product-y", `${-14 * productExit}px`);
      frame.style.setProperty("--door-shade", (0.25 + 0.16 * smoothstep((progress - 0.6) / 0.18)).toFixed(4));
      if (ready && !staticMode()) {
        if (progress > 0 && !hasOpened) {
          hasOpened = true;
          window.clearTimeout(introTimer);
          introTimer = 0;
        }
        if (progress > 0.12) advanceCopy();
        else if (progress === 0 && hasOpened && copyAdvanced) {
          // Returning to the closed door restores its opening message until the next scroll.
          copyAdvanced = false;
          section.dataset.copy = "intro";
        }
      }
      reveal(staticMode() || failed || (ready && position >= 0.9999));
    };
    const update = (time) => {
      raf = 0;
      if (disposed || !visible || document.hidden || staticMode() || !ready) return;
      const elapsed = Math.min(time - (previousTime || time), 64);
      previousTime = time;
      const target = clamp(-section.getBoundingClientRect().top / travel);
      progress += (target - progress) * (1 - Math.exp(-elapsed / 85));
      if (Math.abs(target - progress) < 0.0005) progress = target;
      paint();
      if (progress !== target) raf = window.requestAnimationFrame(update);
    };
    const requestUpdate = () => {
      if (!raf && ready && visible && !document.hidden && !staticMode()) {
        raf = window.requestAnimationFrame(update);
      }
    };
    const handleVisibility = () => {
      if (document.hidden) {
        window.clearTimeout(introTimer);
        introTimer = 0;
      } else {
        previousTime = 0;
        queueIntro();
        requestUpdate();
      }
    };
    const measure = () => {
      const header = document.querySelector("header");
      section.style.setProperty("--door-header-height", String(header?.offsetHeight || 108) + "px");
      travel = Math.max(1, section.offsetHeight - frame.offsetHeight);
      requestUpdate();
    };
    const handlePreference = () => {
      section.dataset.static = String(staticMode());
      if (staticMode()) {
        if (raf) window.cancelAnimationFrame(raf);
        raf = 0;
        window.clearTimeout(introTimer);
        introTimer = 0;
      }
      queueIntro();
      measure();
      paint();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      section.dataset.active = String(visible);
      if (visible) {
        previousTime = 0;
        queueIntro();
        requestUpdate();
      } else {
        window.clearTimeout(introTimer);
        introTimer = 0;
        if (raf) window.cancelAnimationFrame(raf);
        raf = 0;
        if (entry.boundingClientRect.bottom <= 0) reveal(true);
      }
    });
    const resizeObserver = new ResizeObserver(measure);
    handlePreference();
    progress = clamp(-section.getBoundingClientRect().top / travel);
    paint();
    Promise.resolve(scene.ready).then((result) => {
      if (disposed) return;
      ready = result?.ok !== false;
      failed = !ready;
      frame.dataset.ready = String(ready);
      paint();
      queueIntro();
      // A restored position below the hero must retain usable navigation.
      if (section.getBoundingClientRect().bottom <= 0) reveal(true);
      requestUpdate();
    }).catch(() => {
      if (disposed) return;
      failed = true;
      reveal(true);
    });
    observer.observe(section);
    resizeObserver.observe(frame);
    const header = document.querySelector("header");
    if (header) resizeObserver.observe(header);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    motion.addEventListener("change", handlePreference);
    connection?.addEventListener?.("change", handlePreference);

    return () => {
      disposed = true;
      window.clearTimeout(introTimer);
      observer.disconnect();
      resizeObserver.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", handleVisibility);
      motion.removeEventListener("change", handlePreference);
      connection?.removeEventListener?.("change", handlePreference);
      revealRef.current = null;
      document.body.removeAttribute("data-wonly-door-revealed");
      window.dispatchEvent(new CustomEvent("wonly:door-reveal", { detail: { visible: true } }));
    };
  }, []);

  const enter = () => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;
    if (section.dataset.stage === "inside") {
      skip();
      return;
    }
    window.scrollTo({
      top: window.scrollY + section.getBoundingClientRect().top + section.offsetHeight - frame.offsetHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };
  const skip = () => {
    revealRef.current?.(true);
    skipRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
    skipRef.current?.focus({ preventScroll: true });
  };

  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className="door-hero" data-stage="opening" data-revealed="false" data-copy="intro">
      <div ref={frameRef} className="door-hero__frame">
        <CatalogDoorScene ref={sceneRef} />
        <div className="door-hero__veil" aria-hidden="true" />
        <div className="door-hero__grain" aria-hidden="true" />
        <div className="door-hero__topline">
          <span><span className="door-hero__status-dot" /> X60 Pro · Diseño que protege.</span>
          <button type="button" onClick={skip} className="door-hero__skip">Saltar animación <ArrowDown size={13} aria-hidden="true" /></button>
        </div>
        <div className="door-hero__copy">
          <p className="door-hero__eyebrow">WONLY · Tecnología &amp; Seguridad</p>
          <h1 id="hero-title">Todo en tu casa es inteligente.<br /><span>Menos la puerta.</span></h1>
          <p className="door-hero__description">Hasta ahora.</p>
        </div>
        <div className="door-hero__product">
          <h2>La puerta y la cerradura.<br /><span>Un solo producto.</span></h2>
        </div>
        <div className="door-hero__arrival">
          <h2>Ingeniería de seguridad.<br /><span>Hecha para tu vida.</span></h2>
        </div>
        <div className="door-hero__bottom">
          <div className="door-hero__signature"><ShieldCheck size={18} aria-hidden="true" /><span>WONLY · X60 Pro<br /><strong>Tecnología &amp; Seguridad</strong></span></div>
          <button className="door-hero__enter" type="button" onClick={enter}>
            <span className="door-hero__enter-opening">Desliza para abrir</span>
            <span className="door-hero__enter-inside">Descubre WONLY</span>
            <span className="door-hero__enter-icon"><ArrowDown size={17} aria-hidden="true" /></span>
          </button>
          <div className="door-hero__actions">
            <Link href="/contacto" className="door-hero__contact">Hablemos</Link>
            <Link href="/puertas" className="door-hero__catalog">Explorar puertas <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="door-hero__progress" aria-hidden="true" />
      </div>
      <div ref={skipRef} tabIndex={-1} className="door-hero__exit" aria-label="Fin de la animación. Descubre WONLY." />
    </section>
  );
}
