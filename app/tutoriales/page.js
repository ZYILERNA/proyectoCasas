import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  MapPin,
  Newspaper,
} from "lucide-react";
import { blogPosts, getCover } from "../blog/blogData";
import { createPageMetadata } from "../../lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Clases gratuitas sobre puertas y cerraduras",
  description:
    "Clases presenciales gratuitas de WONLY sobre puertas y cerraduras inteligentes en nuestra sede de Viladecans, Barcelona.",
  path: "/tutoriales",
  image: "/images/BLOG/CALLEMARINA/despues1.webp",
});

const featuredSlugs = ["calle-marina", "montgat", "fabra-y-puig"];
const featuredPosts = featuredSlugs
  .map((slug) => blogPosts.find((post) => post.slug === slug))
  .filter(Boolean);

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Carrer+Noi+del+Sucre+13+08840+Viladecans";

export default function TutorialesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white selection:bg-[#D4A868] selection:text-black">
      <section className="relative border-b border-white/10 px-6 pb-20 pt-36 md:pb-28 md:pt-44">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:72px_72px]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 top-10 h-[440px] w-[440px] rounded-full bg-[#D4A868]/10 blur-[130px]"
        />

        <div className="container relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.12fr_.88fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 text-[#D4A868]">
              <GraduationCap size={20} aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.25em]">
                Academia WONLY
              </span>
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl md:text-7xl">
              Aprende con nosotros. Las clases son gratuitas.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
              Ofrecemos clases presenciales gratuitas sobre puertas,
              cerraduras inteligentes y su uso en nuestra sede de Viladecans.
              Contacta con nosotros para conocer las próximas fechas y reservar
              tu plaza.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="inline-flex min-h-14 items-center gap-2 rounded-full bg-[#D4A868] px-7 py-3.5 text-sm font-bold text-[#221f20] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A868]"
              >
                Consultar próximas clases
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Ver ubicación
                <MapPin size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-sm md:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4A868] text-[#221f20]">
              <MapPin size={23} aria-hidden="true" />
            </div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#D4A868]">
              Clases presenciales
            </p>
            <h2 className="mt-3 text-2xl font-semibold">WONLY Viladecans</h2>
            <address className="mt-5 not-italic text-base leading-8 text-zinc-300">
              Carrer Noi del Sucre, 13
              <br />
              08840 Viladecans
              <br />
              Barcelona, España
            </address>
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-sm leading-7 text-zinc-400">
                La asistencia es gratuita. Confirma la fecha, el horario y la
                disponibilidad antes de desplazarte.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#100f0d] px-6 py-16 md:py-20">
        <div className="container mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex max-w-3xl gap-5">
            <div className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4A868]/30 bg-[#D4A868]/10 text-[#D4A868] sm:flex">
              <BookOpen size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4A868]">
                Formación cercana
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">
                Un espacio para aprender, practicar y resolver dudas
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400 md:text-base">
                Las clases están pensadas para conocer mejor las puertas, las
                cerraduras inteligentes y su funcionamiento con el apoyo de
                nuestro equipo.
              </p>
            </div>
          </div>
          <Link
            href="/contacto"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#D4A868] transition hover:text-white"
          >
            Reservar una plaza
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 text-[#D4A868]">
                <Newspaper size={18} aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.24em]">
                  También en nuestro Blog
                </p>
              </div>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.035em] md:text-5xl">
                Instalaciones reales para seguir aprendiendo
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-[#D4A868]"
            >
              Ver todos los casos
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                    <Image
                      src={getCover(post)}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      {post.tipo}
                    </span>
                  </div>
                  <div className="pt-5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#D4A868]">
                      <MapPin size={13} aria-hidden="true" />
                      {post.location}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold leading-snug transition group-hover:text-[#D4A868]">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-400">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
                      Leer el caso
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-[#0d0c0a] px-6 py-20 md:py-24">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-72 w-[640px] max-w-full -translate-x-1/2 rounded-full bg-[#D4A868]/10 blur-[140px]"
        />
        <div className="container relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <GraduationCap size={31} className="text-[#D4A868]" aria-hidden="true" />
          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.035em] md:text-5xl">
            Ven a aprender con WONLY
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
            Escríbenos para conocer las próximas clases gratuitas disponibles
            en nuestra sede de Viladecans.
          </p>
          <Link
            href="/contacto"
            className="mt-9 inline-flex min-h-14 items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-[#D4A868]"
          >
            Contactar y reservar
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
