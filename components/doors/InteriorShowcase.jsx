import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const INTERIOR_COLLECTIONS = [
  {
    category: "PUERTA ACÚSTICA DE MADERA",
    title: "Madera acústica",
    description: "Calidez natural y confort sonoro.",
    image: "/images/madera.webp",
    imageAlt: "Puerta de madera integrada en un ambiente contemporáneo",
    imagePosition: "object-center",
  },
  {
    category: "PUERTA MINIMALISTA",
    title: "Minimalista",
    description: "Planos limpios y continuidad visual.",
    image: "/images/minimalista.webp",
    imageAlt: "Puerta minimalista en un interior de líneas limpias",
    imagePosition: "object-center",
  },
  {
    category: "PUERTA DE BAJO CARBONO",
    title: "Bajo carbono",
    description: "Diseño eficiente con menor impacto.",
    image: "/images/carbono.webp",
    imageAlt: "Puerta de bajo carbono en una vivienda contemporánea",
    imagePosition: "object-[34%_center]",
  },
  {
    category: "PUERTA DE PVC",
    title: "PVC",
    description: "Resistencia y mantenimiento sencillo.",
    image: "/images/pvc.webp",
    imageAlt: "Puerta de PVC integrada en un espacio interior",
    imagePosition: "object-[28%_center]",
  },
];

const ATMOSPHERES = [
  {
    image: "/images/PUERTAS/WALLPAPER/wl-d003.webp",
    imageAlt: "Inspiración de puerta de madera en un ambiente gris grafito",
    eyebrow: "Paleta mineral",
    title: "Madera y grafito",
  },
  {
    image: "/images/PUERTAS/MADERAACÚSTICA/wl-j001/scene-dark-ai.webp",
    imageAlt: "Puerta WL-J001 grafito integrada en un estudio al atardecer",
    eyebrow: "Contraste sereno",
    title: "WL-J001 al atardecer",
  },
  {
    image: "/images/PUERTAS/WALLPAPER/wl-s009.webp",
    imageAlt: "Inspiración de puerta integrada con el revestimiento de pared",
    eyebrow: "Continuidad visual",
    title: "Puerta y revestimiento",
  },
];

export function InteriorCollectionNav({ activeCategory }) {
  return (
    <section
      aria-labelledby="interior-collections-title"
      className="bg-white py-12 text-zinc-950 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 md:mb-9 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">
              Colecciones de interior
            </p>
            <h2
              id="interior-collections-title"
              className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl"
            >
              Elige el carácter de tu puerta
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-zinc-600 md:text-right">
            Explora cada familia y encuentra el acabado que mejor dialoga con
            tu espacio.
          </p>
        </div>

        <nav aria-label="Colecciones de puertas de interior">
          <div className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4">
            {INTERIOR_COLLECTIONS.map((collection) => {
              const isActive = activeCategory === collection.category;

              return (
                <Link
                  key={collection.category}
                  href={{
                    pathname: "/puertas",
                    query: { category: collection.category },
                  }}
                  prefetch={false}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative aspect-[4/5] w-[78vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-sm border bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A67C52] focus-visible:ring-offset-4 sm:w-[56vw] md:w-auto md:max-w-none ${
                    isActive
                      ? "border-[#A67C52] ring-2 ring-[#A67C52] ring-offset-2"
                      : "border-zinc-200"
                  }`}
                >
                  <Image
                    src={collection.image}
                    alt={collection.imageAlt}
                    fill
                    quality={82}
                    className={`object-cover transition duration-700 ease-out group-hover:scale-[1.035] ${collection.imagePosition}`}
                    sizes="(max-width: 639px) 78vw, (max-width: 767px) 56vw, (max-width: 1279px) 50vw, 292px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/5 transition duration-500 group-hover:from-black" />

                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                    {isActive && (
                      <span className="mb-3 inline-flex border border-[#D5B693]/70 bg-[#A67C52] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                        Seleccionada
                      </span>
                    )}
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {collection.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-5 text-zinc-200 sm:text-sm">
                      {collection.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D5B693]">
                      Ver modelos
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
}

export function InteriorAtmosphereShowcase() {
  return (
    <section
      aria-labelledby="interior-atmosphere-title"
      className="bg-[#15120F] py-14 text-white md:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 md:mb-10 md:grid-cols-[minmax(0,1fr)_minmax(18rem,30rem)] md:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#C8A783]">
              Inspiración para tu proyecto
            </p>
            <h2
              id="interior-atmosphere-title"
              className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            >
              Puertas que viven con el espacio
            </h2>
          </div>

          <div className="md:text-right">
            <p className="text-sm leading-6 text-zinc-400">
              Composiciones de inspiración para imaginar materiales, luz y
              proporciones. Los acabados y la configuración se adaptan a cada
              proyecto.
            </p>
            <Link
              href="/blog/fabra-y-puig"
              className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-[#A67C52] text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:text-[#D5B693] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A67C52] focus-visible:ring-offset-4 focus-visible:ring-offset-[#15120F]"
            >
              Ver un proyecto real
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {ATMOSPHERES.map((atmosphere, index) => (
            <article
              key={atmosphere.image}
              className="group relative aspect-[4/5] w-[82vw] max-w-[360px] shrink-0 snap-start overflow-hidden bg-zinc-900 sm:w-[58vw] md:w-auto md:max-w-none"
            >
              <Image
                src={atmosphere.image}
                alt={atmosphere.imageAlt}
                fill
                quality={82}
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                sizes="(max-width: 639px) 82vw, (max-width: 767px) 58vw, 395px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5B693]">
                  {String(index + 1).padStart(2, "0")} · {atmosphere.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {atmosphere.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
