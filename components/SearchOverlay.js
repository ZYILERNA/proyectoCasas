// components/SearchOverlay.js
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, CornerDownLeft, ArrowRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Secciones estáticas del sitio (navegación instantánea)
const SECTIONS = [
  { label: "Puertas de Seguridad", href: "/puertas", keywords: "puertas seguridad acero acorazada ia aluminio madera pvc cortafuego" },
  { label: "Ventanas Panorámicas", href: "/ventanas", keywords: "ventanas panoramicas cristal aluminio" },
  { label: "Cerraduras Inteligentes", href: "/cerraduras", keywords: "cerraduras smart lock biometrica huella facial" },
  { label: "Manillas de Diseño", href: "/manillas", keywords: "manillas manijas pomos tiradores" },
  { label: "Colección Sofás", href: "/sofas", keywords: "sofas sillon mobiliario salon" },
  { label: "Mesas de Diseño", href: "/mesas", keywords: "mesas comedor centro" },
  { label: "Sillas y Sillones", href: "/sillas", keywords: "sillas sillones asientos" },
  { label: "Dormitorios", href: "/dormitorios", keywords: "dormitorios camas habitacion" },
  { label: "Sistemas de Gabinetes", href: "/gabinetes", keywords: "gabinetes armarios cocina almacenaje" },
  { label: "Proyectos Contract", href: "/proyectos", keywords: "proyectos contract instalaciones obras" },
  { label: "Empresa", href: "/empresa", keywords: "empresa nosotros about quienes somos" },
  { label: "Blog", href: "/blog", keywords: "blog noticias articulos" },
  { label: "Contacto", href: "/contacto", keywords: "contacto contactar telefono email" },
];

// Catálogos en Supabase: tabla, ruta destino, etiqueta y campo de imagen
const CATALOGS = [
  { table: "products", route: "/puertas", label: "Puerta", imgField: "img", withCategory: true },
  { table: "locks", route: "/cerraduras", label: "Cerradura", imgField: "img" },
  { table: "manillas", route: "/manillas", label: "Manilla", imgField: "image" },
  { table: "sofas", route: "/sofas", label: "Sofá", imgField: "image" },
  { table: "mesas", route: "/mesas", label: "Mesa", imgField: "image" },
  { table: "sillas", route: "/sillas", label: "Silla", imgField: "image" },
  { table: "dormitorios", route: "/dormitorios", label: "Dormitorio", imgField: "image" },
  { table: "gabinetes", route: "/gabinetes", label: "Gabinete", imgField: "image" },
];

// Ventanas: catálogo estático (no está en Supabase)
const VENTANAS = [
  { name: "Fashion 110", img: "/images/VENTANAS/fashion110.webp" },
  { name: "Fashion 120", img: "/images/VENTANAS/fashion120.webp" },
  { name: "Glory 70", img: "/images/VENTANAS/glory70.webp" },
  { name: "Glory 118", img: "/images/VENTANAS/glory118.webp" },
];

export default function SearchOverlay({ open, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // Secciones filtradas (instantáneo, en cliente)
  const term = query.trim().toLowerCase();
  const matchedSections = term
    ? SECTIONS.filter(
        (s) =>
          s.label.toLowerCase().includes(term) ||
          s.keywords.includes(term)
      )
    : SECTIONS.slice(0, 4); // Sugerencias por defecto

  // Bloquear scroll y enfocar input al abrir
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset al cerrar
  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setLoading(false);
    }
  }, [open]);

  // Búsqueda de productos en Supabase (con debounce)
  useEffect(() => {
    if (!open) return;
    if (term.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    const handle = setTimeout(async () => {
      const like = `%${term}%`;
      const queries = CATALOGS.map((c) =>
        supabase
          .from(c.table)
          .select(`name,category,${c.imgField}`)
          .or(`name.ilike.${like},category.ilike.${like}`)
          .limit(4)
      );

      const settled = await Promise.allSettled(queries);
      if (cancelled) return;

      const out = [];

      // Ventanas (estático)
      VENTANAS.filter((v) => v.name.toLowerCase().includes(term)).forEach((v) =>
        out.push({
          title: v.name,
          subtitle: "Ventana",
          img: v.img,
          href: `/ventanas?producto=${encodeURIComponent(v.name)}`,
        })
      );

      // Catálogos de Supabase
      settled.forEach((res, i) => {
        if (res.status !== "fulfilled" || !res.value.data) return;
        const c = CATALOGS[i];
        res.value.data.forEach((item) => {
          const cat = item.category || c.label;
          const href = c.withCategory
            ? `${c.route}?category=${encodeURIComponent(item.category || "")}&producto=${encodeURIComponent(item.name)}`
            : `${c.route}?producto=${encodeURIComponent(item.name)}`;
          out.push({
            title: item.name,
            subtitle: cat,
            img: item[c.imgField],
            href,
          });
        });
      });

      setResults(out);
      setLoading(false);
    }, 280);

    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [term, open]);

  const go = useCallback(
    (href) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  // Enter: ir al primer resultado disponible
  const onSubmit = (e) => {
    e.preventDefault();
    const first = results[0] || matchedSections[0];
    if (first) go(first.href);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex flex-col items-center px-4 pt-24 md:pt-28">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Input */}
        <form onSubmit={onSubmit} className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search size={20} className="text-[#00C2FF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos, categorías, páginas..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-base"
          />
          {loading && <Loader2 size={18} className="text-gray-500 animate-spin shrink-0" />}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar búsqueda"
            className="shrink-0 text-gray-500 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </form>

        {/* Resultados */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Productos */}
          {results.length > 0 && (
            <div className="py-2">
              <p className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">Productos</p>
              {results.map((r, i) => (
                <button
                  key={`r-${i}`}
                  onClick={() => go(r.href)}
                  className="group w-full flex items-center gap-4 px-5 py-2.5 hover:bg-white/5 transition-colors text-left"
                >
                  <div className="w-11 h-11 rounded-lg bg-white shrink-0 overflow-hidden flex items-center justify-center">
                    {r.img ? (
                      <img src={r.img} alt="" className="w-full h-full object-contain p-1" loading="lazy" />
                    ) : (
                      <Search size={14} className="text-gray-300" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">{r.title}</p>
                    <p className="text-[11px] text-gray-500 uppercase tracking-wide truncate">{r.subtitle}</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-600 group-hover:text-[#00C2FF] shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {/* Secciones / Páginas */}
          {matchedSections.length > 0 && (
            <div className="py-2 border-t border-white/5">
              <p className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {term ? "Páginas" : "Sugerencias"}
              </p>
              {matchedSections.map((s) => (
                <button
                  key={s.href}
                  onClick={() => go(s.href)}
                  className="group w-full flex items-center gap-4 px-5 py-2.5 hover:bg-white/5 transition-colors text-left"
                >
                  <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
                    <CornerDownLeft size={15} className="text-gray-400 group-hover:text-[#00C2FF] transition-colors" />
                  </div>
                  <p className="flex-1 text-sm font-semibold text-gray-200 group-hover:text-white truncate">{s.label}</p>
                  <ArrowRight size={16} className="text-gray-600 group-hover:text-[#00C2FF] shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {/* Sin resultados */}
          {term.length >= 2 && !loading && results.length === 0 && matchedSections.length === 0 && (
            <div className="px-5 py-12 text-center text-gray-500 text-sm">
              Sin resultados para <span className="text-white">&quot;{query}&quot;</span>
            </div>
          )}
        </div>

        {/* Pie */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/10 bg-black/40 text-[10px] text-gray-600 uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><CornerDownLeft size={11} /> Enter para ir</span>
          <span>Esc para cerrar</span>
        </div>
      </div>
    </div>
  );
}
