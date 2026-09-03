"use client";

import {
  ArrowRight,
  CornerDownLeft,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const sections = [
  {
    label: "Puertas de seguridad",
    href: "/puertas",
    keywords: "puertas seguridad acero acorazada ia aluminio madera pvc cortafuego",
  },
  {
    label: "Ventanas panorámicas",
    href: "/ventanas",
    keywords: "ventanas panoramicas cristal aluminio",
  },
  {
    label: "Cerraduras inteligentes",
    href: "/cerraduras",
    keywords: "cerraduras smart lock biometrica huella facial",
  },
  {
    label: "Manillas de diseño",
    href: "/manillas",
    keywords: "manillas manijas pomos tiradores",
  },
  {
    label: "Colección de sofás",
    href: "/sofas",
    keywords: "sofas sillon mobiliario salon",
  },
  {
    label: "Mesas de diseño",
    href: "/mesas",
    keywords: "mesas comedor centro",
  },
  {
    label: "Sillas y sillones",
    href: "/sillas",
    keywords: "sillas sillones asientos",
  },
  {
    label: "Dormitorios",
    href: "/dormitorios",
    keywords: "dormitorios camas habitacion",
  },
  {
    label: "Sistemas de gabinetes",
    href: "/gabinetes",
    keywords: "gabinetes armarios cocina almacenaje",
  },
  {
    label: "Proyectos",
    href: "/proyectos",
    keywords: "proyectos contract instalaciones obras",
  },
  {
    label: "Empresa",
    href: "/empresa",
    keywords: "empresa nosotros quienes somos",
  },
  {
    label: "Blog",
    href: "/blog",
    keywords: "blog noticias articulos instalaciones",
  },
  {
    label: "Contacto",
    href: "/contacto",
    keywords: "contacto telefono email presupuesto asesoramiento",
  },
];

export default function SearchOverlay({ open, onClose }) {
  const router = useRouter();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const term = query.trim().toLocaleLowerCase("es");
  const matchedSections = useMemo(() => {
    if (!term) return sections.slice(0, 4);
    return sections.filter(
      (section) =>
        section.label.toLocaleLowerCase("es").includes(term) ||
        section.keywords.includes(term),
    );
  }, [term]);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const background = [
      document.querySelector("header"),
      document.querySelector("[data-site-content]"),
      document.querySelector("footer"),
    ].filter(Boolean);

    document.body.style.overflow = "hidden";
    background.forEach((element) => element.setAttribute("inert", ""));
    window.requestAnimationFrame(() => inputRef.current?.focus());

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = [
        ...(dialogRef.current?.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) || []),
      ].filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => element.removeAttribute("inert"));
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || term.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(term)}`,
          {
            signal: controller.signal,
            headers: { Accept: "application/json" },
          },
        );
        if (!response.ok) throw new Error("Search failed");
        const payload = await response.json();
        setResults(Array.isArray(payload.results) ? payload.results : []);
      } catch (error) {
        if (error.name !== "AbortError") setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [open, term]);

  const go = useCallback(
    (href) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const first = results[0] || matchedSections[0];
    if (first) go(first.href);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/85 px-4 py-20 backdrop-blur-md md:py-24">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Cerrar búsqueda"
        tabIndex={-1}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-dialog-title"
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
      >
        <div className="border-b border-white/10 px-5 pt-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p
                id="search-dialog-title"
                className="font-semibold text-white"
              >
                Buscar en WONLY
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                Productos, colecciones y páginas
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar búsqueda"
              className="grid h-10 w-10 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A868]"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4"
          >
            <Search size={19} className="shrink-0 text-[#D4A868]" aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Buscar productos, categorías o páginas
            </label>
            <input
              ref={inputRef}
              id="site-search"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ej. puerta inteligente, sofá, contacto…"
              className="min-h-14 flex-1 bg-transparent text-base text-white outline-none placeholder:text-zinc-600"
            />
            {loading && (
              <Loader2
                size={18}
                className="shrink-0 animate-spin text-zinc-500"
                aria-label="Buscando"
              />
            )}
          </form>
          <div className="h-5" aria-live="polite">
            {term.length >= 2 && !loading && (
              <p className="mt-1 text-[11px] text-zinc-600">
                {results.length + matchedSections.length} resultados
              </p>
            )}
          </div>
        </div>

        <div className="max-h-[58dvh] overflow-y-auto py-2">
          {results.length > 0 && (
            <ResultGroup title="Productos">
              {results.map((result) => (
                <ResultButton
                  key={`${result.href}-${result.title}`}
                  result={result}
                  onClick={() => go(result.href)}
                />
              ))}
            </ResultGroup>
          )}

          {matchedSections.length > 0 && (
            <ResultGroup title={term ? "Páginas y colecciones" : "Sugerencias"}>
              {matchedSections.map((section) => (
                <button
                  key={section.href}
                  type="button"
                  onClick={() => go(section.href)}
                  className="group flex min-h-14 w-full items-center gap-4 px-5 py-2.5 text-left transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#D4A868]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                    <CornerDownLeft
                      size={15}
                      className="text-zinc-500 transition group-hover:text-[#D4A868]"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-zinc-200">
                    {section.label}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-zinc-600 transition group-hover:text-[#D4A868]"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </ResultGroup>
          )}

          {term.length >= 2 &&
            !loading &&
            results.length === 0 &&
            matchedSections.length === 0 && (
              <div className="px-5 py-12 text-center text-sm text-zinc-500">
                No encontramos resultados para{" "}
                <span className="text-white">&ldquo;{query}&rdquo;</span>
              </div>
            )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-zinc-600">
          <span className="flex items-center gap-1.5">
            <CornerDownLeft size={11} aria-hidden="true" />
            Enter para abrir
          </span>
          <span>Esc para cerrar</span>
        </div>
      </div>
    </div>
  );
}

function ResultGroup({ title, children }) {
  return (
    <section className="border-b border-white/5 py-2 last:border-b-0">
      <h2 className="px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ResultButton({ result, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-16 w-full items-center gap-4 px-5 py-2.5 text-left transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#D4A868]"
    >
      <span className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white">
        {result.img ? (
          // Product images can come from the connected catalogue as well as local assets.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={result.img}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-1"
          />
        ) : (
          <span className="grid h-full w-full place-items-center">
            <Search size={14} className="text-zinc-300" aria-hidden="true" />
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-white">
          {result.title}
        </span>
        <span className="block truncate text-[11px] uppercase tracking-wide text-zinc-500">
          {result.subtitle}
        </span>
      </span>
      <ArrowRight
        size={16}
        className="shrink-0 text-zinc-600 transition group-hover:text-[#D4A868]"
        aria-hidden="true"
      />
    </button>
  );
}
