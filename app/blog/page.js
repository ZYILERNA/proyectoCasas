"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, PlayCircle, Camera, ArrowUpRight, Newspaper } from "lucide-react";
import { blogPosts, getCover, TIPOS } from "./blogData";

const FILTROS = ["Todos", TIPOS.PUERTA, TIPOS.CERRADURA, TIPOS.MANILLA];

// Pequeña pastilla con el tipo + contador de medios
function MediaMeta({ post }) {
  const fotos = post.media.filter((m) => m.type === "image").length;
  const videos = post.media.filter((m) => m.type === "video").length;
  return (
    <div className="flex items-center gap-3 text-xs font-semibold text-gray-400">
      <span className="inline-flex items-center gap-1.5">
        <Camera size={14} className="text-[#00C2FF]" /> {fotos} fotos
      </span>
      {videos > 0 && (
        <span className="inline-flex items-center gap-1.5">
          <PlayCircle size={14} className="text-[#00C2FF]" /> {videos} vídeo
          {videos > 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}

export default function BlogPage() {
  const [filtro, setFiltro] = useState("Todos");

  const filtrados =
    filtro === "Todos"
      ? blogPosts
      : blogPosts.filter((p) => p.tipo === filtro);

  // Solo destacamos un post cuando no hay filtro activo
  const destacado = filtro === "Todos" ? filtrados[0] : null;
  const grid = destacado ? filtrados.slice(1) : filtrados;

  return (
    <main className="bg-[#070707] min-h-screen text-white selection:bg-[#00C2FF] selection:text-black">
      {/* 1. CABECERA EDITORIAL (alineada a la izquierda) */}
      <section className="pt-36 pb-12 px-6 border-b border-white/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[#00C2FF] mb-5"
          >
            <Newspaper size={18} />
            <span className="uppercase tracking-[0.25em] text-xs font-bold">
              Diario de Instalaciones
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl leading-[1.05]"
            >
              Casos reales, fotos y vídeos de cada{" "}
              <span className="italic font-light text-[#00C2FF]">
                instalación
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed lg:text-right"
            >
              Puertas de seguridad y cerraduras inteligentes ya montadas en
              hogares y locales de toda Barcelona. Del antes al resultado final.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. POST DESTACADO (imagen a brillo completo, sin oscurecer) */}
      {destacado && (
        <section className="px-6 pt-14">
          <div className="container mx-auto max-w-6xl">
            <Link href={`/blog/${destacado.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Imagen */}
                <div className="relative overflow-hidden rounded-3xl aspect-[16/11] ring-1 ring-white/10">
                  <img
                    src={getCover(destacado)}
                    alt={destacado.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-5 left-5 text-[11px] font-bold uppercase tracking-widest bg-[#00C2FF] text-black px-3 py-1.5 rounded-full shadow-lg">
                    {destacado.tipo}
                  </span>
                </div>

                {/* Texto */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00C2FF]">
                    Caso destacado
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 leading-tight group-hover:text-[#00C2FF] transition-colors">
                    {destacado.title}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-5">
                    <MapPin size={15} className="text-[#00C2FF]" />
                    {destacado.location}
                  </div>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                    {destacado.excerpt}
                  </p>
                  <div className="flex items-center justify-between max-w-xl">
                    <MediaMeta post={destacado} />
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-[#00C2FF] transition-colors">
                      Ver caso
                      <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#00C2FF] group-hover:bg-[#00C2FF] group-hover:text-black transition-all">
                        <ArrowUpRight size={16} />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* 3. FILTROS */}
      <section className="px-6 pt-16 pb-2">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500">
            Todos los casos
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {FILTROS.map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                  filtro === f
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-gray-300 border-white/15 hover:border-white/40 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GRID DE CASOS (tarjetas limpias, texto debajo de la imagen) */}
      <section className="px-6 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">
            {grid.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.08 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Imagen — cuadrada, brillo completo, sin overlay oscuro */}
                  <div className="relative overflow-hidden rounded-2xl aspect-square ring-1 ring-white/10 mb-5">
                    <img
                      src={getCover(post)}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-white/95 text-black px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {post.tipo}
                    </span>
                  </div>

                  {/* Texto */}
                  <div className="flex items-center gap-2 text-[#00C2FF] text-xs font-bold uppercase tracking-wider mb-2">
                    <MapPin size={13} />
                    {post.location}
                  </div>
                  <h3 className="text-xl font-bold leading-snug mb-2 group-hover:text-[#00C2FF] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <div className="pt-3">
                      <MediaMeta post={post} />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="mt-3 text-gray-500 group-hover:text-[#00C2FF] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {grid.length === 0 && (
            <p className="text-center text-gray-500 py-16">
              No hay casos en esta categoría todavía.
            </p>
          )}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="relative px-6 py-24 border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[400px] bg-[#00C2FF] blur-[160px] rounded-full" />
        </div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Quieres una instalación así en tu hogar?
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Solicita un presupuesto sin compromiso para tu puerta de seguridad o
            cerradura inteligente.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#00C2FF] hover:text-white transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-[#00C2FF]/40"
          >
            PEDIR PRESUPUESTO
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
