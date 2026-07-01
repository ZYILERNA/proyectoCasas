"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowLeft, X, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { blogPosts, getPostBySlug } from "../blogData";

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  const [lightboxIndex, setLightboxIndex] = useState(null); // índice de la imagen ampliada
  const [videoIndex, setVideoIndex] = useState(0); // vídeo actual del carrusel

  const images = post ? post.media.filter((m) => m.type === "image") : [];
  const videos = post ? post.media.filter((m) => m.type === "video") : [];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const showNext = useCallback(
    () => setLightboxIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  // Navegación con teclado (← → y Esc)
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, showPrev, showNext, closeLightbox]);

  if (!post) {
    notFound();
  }

  // Otros casos para la sección final
  const relacionados = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // Separamos "antes" y "después" conservando el índice global (para el lightbox)
  const indexed = images.map((img, idx) => ({ img, idx }));
  const beforeShots = indexed.filter((it) => it.img.before);
  const afterShots = indexed.filter((it) => !it.img.before);
  const hasBeforeAfter = beforeShots.length > 0;

  // Si hay fotos Y vídeos, los mostramos en dos columnas (galería + vídeos al lado)
  const sideBySide = images.length > 0 && videos.length > 0;

  // Miniatura reutilizable de la galería
  const renderThumb = ({ img, idx }) => (
    <motion.button
      key={idx}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: (idx % 3) * 0.05 }}
      onClick={() => setLightboxIndex(idx)}
      className="relative h-48 md:h-60 rounded-xl overflow-hidden border border-white/10 hover:border-[#00C2FF] transition-colors group cursor-zoom-in"
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </motion.button>
  );

  return (
    <main className="bg-[#070707] min-h-screen text-white selection:bg-[#00C2FF] selection:text-black">
      {/* HERO */}
      <section className="pt-32 pb-10 px-6">
        <div className="container mx-auto max-w-5xl">
          <Link
            href="/blog"
            className="flex w-fit items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#00C2FF] transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Volver al blog
          </Link>

          <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-[#00C2FF] text-black px-3 py-1 rounded-full mb-5">
            {post.tipo}
          </span>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-[#00C2FF] text-sm font-bold uppercase tracking-widest mb-6">
            <MapPin size={16} />
            {post.location}
          </div>

          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            {post.description}
          </p>
        </div>
      </section>

      {/* MEDIA: galería (antes/después) + vídeos al lado */}
      {(images.length > 0 || videos.length > 0) && (
        <section className="px-6 py-10">
          <div className="container mx-auto max-w-6xl">
            <div
              className={
                sideBySide
                  ? "grid lg:grid-cols-3 gap-8 lg:gap-10 items-start"
                  : ""
              }
            >
              {/* COLUMNA GALERÍA */}
              {images.length > 0 && (
                <div className={sideBySide ? "lg:col-span-2" : ""}>
                  {hasBeforeAfter ? (
                    <>
                      {/* ANTES */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs font-bold uppercase tracking-[0.25em] bg-white/10 text-gray-300 px-3 py-1.5 rounded-full">
                          Antes
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-gray-400">
                          Cómo estaba
                        </h2>
                        <div className="h-px bg-white/15 flex-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-12">
                        {beforeShots.map(renderThumb)}
                      </div>

                      {/* DESPUÉS (solo si ya hay fotos del resultado) */}
                      {afterShots.length > 0 && (
                        <>
                          <div className="flex items-center gap-3 mb-6">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] bg-[#00C2FF] text-black px-3 py-1.5 rounded-full">
                              Después
                            </span>
                            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-[#00C2FF]">
                              El resultado
                            </h2>
                            <div className="h-px bg-[#00C2FF]/30 flex-1" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {afterShots.map(renderThumb)}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-px bg-white/20 flex-1" />
                        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-[#00C2FF]">
                          Galería
                        </h2>
                        <div className="h-px bg-white/20 flex-1" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {afterShots.map(renderThumb)}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* COLUMNA VÍDEOS (CARRUSEL) */}
              {videos.length > 0 && (
                <aside
                  className={
                    sideBySide
                      ? "lg:col-span-1 lg:sticky lg:top-28"
                      : "max-w-md mx-auto"
                  }
                >
                  <div className="flex items-center gap-3 mb-6">
                    <PlayCircle className="text-[#00C2FF]" size={22} />
                    <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest">
                      Vídeos
                    </h2>
                  </div>

                  {/* Reproductor del vídeo actual */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={videoIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-2xl overflow-hidden border border-white/10 bg-[#111]"
                    >
                      <video
                        src={videos[videoIndex].src}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-auto max-h-[70vh] bg-black"
                      >
                        Tu navegador no soporta la reproducción de vídeo.
                      </video>
                    </motion.div>
                  </AnimatePresence>

                  {/* Controles del carrusel */}
                  {videos.length > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <button
                        onClick={() =>
                          setVideoIndex(
                            (i) => (i - 1 + videos.length) % videos.length
                          )
                        }
                        aria-label="Vídeo anterior"
                        className="w-10 h-10 rounded-full border border-white/15 hover:border-[#00C2FF] hover:bg-[#00C2FF] hover:text-black text-white flex items-center justify-center transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {/* Puntos indicadores */}
                      <div className="flex items-center gap-2">
                        {videos.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setVideoIndex(i)}
                            aria-label={`Ir al vídeo ${i + 1}`}
                            className={`h-2 rounded-full transition-all ${
                              i === videoIndex
                                ? "w-6 bg-[#00C2FF]"
                                : "w-2 bg-white/25 hover:bg-white/50"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          setVideoIndex((i) => (i + 1) % videos.length)
                        }
                        aria-label="Vídeo siguiente"
                        className="w-10 h-10 rounded-full border border-white/15 hover:border-[#00C2FF] hover:bg-[#00C2FF] hover:text-black text-white flex items-center justify-center transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </aside>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CASOS RELACIONADOS */}
      {relacionados.length > 0 && (
        <section className="px-6 py-16 border-t border-white/10 mt-10">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-8">Otros casos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relacionados.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-square ring-1 ring-white/10 mb-4">
                    <img
                      src={rel.media.find((m) => m.type === "image")?.src}
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-white/95 text-black px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {rel.tipo}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#00C2FF] text-[10px] font-bold uppercase mb-1.5">
                    <MapPin size={11} /> {rel.location}
                  </div>
                  <h3 className="text-base font-bold leading-tight group-hover:text-[#00C2FF] transition-colors">
                    {rel.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 py-20 text-center border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-5">
          ¿Te interesa una instalación similar?
        </h2>
        <Link
          href="/contacto"
          className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#00C2FF] hover:text-white transition-all duration-300"
        >
          PEDIR PRESUPUESTO
        </Link>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Cerrar */}
            <button
              onClick={closeLightbox}
              aria-label="Cerrar"
              className="absolute top-6 right-6 z-10 text-white hover:text-[#00C2FF] transition-colors"
            >
              <X size={32} />
            </button>

            {/* Contador */}
            {images.length > 1 && (
              <span className="absolute top-7 left-1/2 -translate-x-1/2 text-sm font-semibold text-white/70">
                {lightboxIndex + 1} / {images.length}
              </span>
            )}

            {/* Flecha anterior */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Foto anterior"
                className="absolute left-3 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-[#00C2FF] hover:text-black text-white flex items-center justify-center backdrop-blur-sm transition-all"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Imagen actual */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                onClick={(e) => e.stopPropagation()}
                className="max-w-full max-h-[90vh] object-contain rounded-lg cursor-default"
              />
            </AnimatePresence>

            {/* Flecha siguiente */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Foto siguiente"
                className="absolute right-3 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-[#00C2FF] hover:text-black text-white flex items-center justify-center backdrop-blur-sm transition-all"
              >
                <ChevronRight size={28} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
