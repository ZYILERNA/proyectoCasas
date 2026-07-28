import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Box,
  ChevronRight,
  Fingerprint,
  Layers3,
  LockKeyhole,
  ScanFace,
  ShieldCheck,
  Sofa,
  Sparkles,
  Sun,
  TableProperties,
  Warehouse,
  Waves,
  Wind,
} from "lucide-react";
import CertificateShowcase from "../components/home/CertificateShowcase";
import PatentCarousel from "../components/home/PatentCarousel";

export const metadata = {
  title: "Puertas inteligentes, seguridad y diseño",
  description:
    "Puertas de seguridad inteligentes, cerraduras biométricas, ventanas panorámicas y soluciones de interior WONLY en España.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WONLY España | Seguridad inteligente y diseño",
    description:
      "Soluciones integrales para puertas inteligentes, cerramientos y espacios de interior.",
    url: "/",
    type: "website",
  },
};

const securityCollections = [
  {
    eyebrow: "Acceso inteligente",
    title: "Puertas con IA",
    description:
      "Reconocimiento biométrico, control conectado y una entrada diseñada como parte de la arquitectura.",
    href: "/puertas?category=PUERTA%20DE%20SEGURIDAD%20IA",
    image: "/images/PUERTAS/AI/door-x60-pro.webp",
    imageAlt: "Puerta inteligente WONLY X60 Pro",
    icon: ScanFace,
    tone: "cyan",
    imageFit: "contain",
  },
  {
    eyebrow: "Protección estructural",
    title: "Puertas acorazadas",
    description:
      "Estructuras reforzadas, cierres multipunto y acabados contemporáneos para proyectos exigentes.",
    href: "/puertas?category=PUERTA%20DE%20SEGURIDAD%20ACORAZADA",
    image: "/images/PUERTAS/ACORAZADA/door-wl001.webp",
    imageAlt: "Puerta acorazada WONLY",
    icon: ShieldCheck,
    tone: "white",
    imageFit: "contain",
  },
  {
    eyebrow: "Resistencia reforzada",
    title: "Puertas de acero",
    description:
      "Construcción robusta, acabados duraderos y soluciones versátiles para viviendas y proyectos profesionales.",
    href: "/puertas?category=PUERTA%20DE%20ACERO%20REFORZADO",
    image: "/images/PUERTAS/ACERO/contemporary/original.webp",
    imageAlt: "Puerta de acero reforzado WONLY",
    icon: LockKeyhole,
    tone: "white",
    imageFit: "contain",
  },
  {
    eyebrow: "Diseño interior",
    title: "Puertas de interior",
    description:
      "Colecciones lacadas, de madera, vidriadas y correderas para dar continuidad a cada estancia.",
    href: "/puertas?category=PUERTA%20AC%C3%9ASTICA%20DE%20MADERA",
    image: "/images/madera.webp",
    imageAlt: "Puerta de interior WONLY instalada en una vivienda",
    icon: Sparkles,
    tone: "white",
    imageFit: "cover",
  },
  {
    eyebrow: "Soluciones especiales",
    title: "Una puerta para cada proyecto",
    description:
      "Modelos cortafuego, acústicos, de aluminio y colecciones a medida en un catálogo unificado.",
    href: "/puertas?category=TODAS",
    image: "/images/todas.webp",
    imageAlt: "Colección de puertas especiales WONLY",
    icon: Layers3,
    tone: "white",
    imageFit: "cover",
  },
];

const interiorCollections = [
  {
    title: "Sofás",
    text: "Confort modular y proporciones contemporáneas.",
    href: "/sofas",
    image: "/images/sofa-home.webp",
    imageAlt: "Sofá contemporáneo de la colección WONLY",
    icon: Sofa,
  },
  {
    title: "Mesas",
    text: "Piezas escultóricas para espacios residenciales y contract.",
    href: "/mesas",
    image: "/images/mesas-home.webp",
    imageAlt: "Mesa de diseño de la colección WONLY",
    icon: TableProperties,
  },
  {
    title: "Dormitorios",
    text: "Sistemas de descanso con una estética serena y precisa.",
    href: "/dormitorios",
    image: "/images/dormitorios-header.webp",
    imageAlt: "Dormitorio de la colección WONLY",
    icon: BedDouble,
  },
  {
    title: "Gabinetes",
    text: "Almacenaje integrado, iluminación y módulos configurables.",
    href: "/gabinetes",
    image: "/images/gabinetes-header.webp",
    imageAlt: "Sistema de gabinetes WONLY",
    icon: Warehouse,
  },
];

const milestones = [
  {
    year: "1996",
    title: "Nace WONLY",
    text: "Comienza una trayectoria dedicada a la seguridad y la fabricación avanzada.",
  },
  {
    year: "2003",
    title: "Reto de seguridad",
    text: "La marca lleva la resistencia de sus sistemas de cierre a una prueba pública.",
  },
  {
    year: "2019",
    title: "Puertas con IA",
    text: "La biometría y la automatización pasan a formar parte de la puerta de entrada.",
  },
  {
    year: "2021",
    title: "Grupo Wangli en bolsa",
    text: "Wangli Security & Surveillance Product Co., Ltd. cotiza en Shanghái con el código 605268.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WONLY España",
  legalName: "Zhongyuankeji S.L.",
  url: "https://www.wonlyspain.com",
  logo: "https://www.wonlyspain.com/images/logo-wonly.webp",
  email: "info@wonlyspain.com",
  telephone: "+34689858129",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carrer Noi del Sucre, 13",
    postalCode: "08840",
    addressLocality: "Viladecans",
    addressRegion: "Barcelona",
    addressCountry: "ES",
  },
  sameAs: [
    "https://www.instagram.com/wonlyspain/",
    "https://www.facebook.com/people/WONLY/61580719733874/",
    "https://www.tiktok.com/@wonlyspain",
  ],
};

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#050505] pt-28 text-white selection:bg-cyan-300 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section
        aria-labelledby="hero-title"
        className="relative isolate min-h-[calc(100svh-7rem)] overflow-hidden border-b border-white/10"
      >
        <div className="hero-background-enter absolute inset-0 z-0">
          <Image
            src="/images/hero-robot.webp"
            alt="Tecnología de seguridad WONLY"
            fill
            priority
            quality={82}
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 md:hidden" />
        </div>

        <div className="container relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] items-center px-6 py-16 md:py-20">
          <div className="hero-enter max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300 md:text-base">
              Tecnología &amp; Seguridad S.L.
            </p>

            <h1
              id="hero-title"
              className="mt-4 max-w-4xl text-5xl font-bold uppercase leading-tight tracking-tight md:text-8xl"
            >
              El futuro
              <br />
              <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                es seguro
              </span>
            </h1>

            <p className="mb-10 mt-6 max-w-xl border-l-2 border-cyan-300 pl-6 text-lg font-light leading-8 text-zinc-300 md:text-xl">
              Especialistas en puertas de seguridad, cerraduras inteligentes y
              blindaje de alta tecnología. Protegemos lo que más importa.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/puertas?category=PUERTA%20DE%20SEGURIDAD%20IA"
                className="inline-flex min-h-14 items-center justify-center bg-cyan-400 px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                Ver puertas
              </Link>
              <Link
                href="/contacto"
                className="inline-flex min-h-14 items-center justify-center border border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition duration-300 hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Principales garantías de WONLY"
        className="border-b border-white/10 bg-[#090909]"
      >
        <div className="container mx-auto grid grid-cols-1 divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            [Fingerprint, "Acceso biométrico", "Tecnología para una entrada más cómoda y controlada."],
            [LockKeyhole, "Protección multicapa", "Estructura, cerradura y control de acceso trabajan en conjunto."],
            [Sparkles, "Diseño integral", "Acabados pensados para convivir con la arquitectura."],
          ].map(([Icon, title, text]) => (
            <div key={title} className="flex gap-4 py-7 sm:px-7 first:pl-0 last:pr-0">
              <Icon className="mt-0.5 shrink-0 text-cyan-300" size={22} aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em]">
                  {title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-zinc-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Timeline />

      <section
        aria-labelledby="security-title"
        className="content-auto bg-[#080808] py-20 md:py-28"
      >
        <div className="container mx-auto px-6">
          <SectionHeading
            eyebrow="Seguridad inteligente"
            title="Elige cómo quieres proteger tu entrada"
            description="Desde el acceso conectado hasta la resistencia estructural: una gama preparada para diferentes necesidades y lenguajes arquitectónicos."
            id="security-title"
            action={{ href: "/puertas", label: "Ver catálogo completo" }}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            {securityCollections.map((item, index) => (
              <SecurityCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="windows-title"
        className="content-auto relative border-y border-white/10 bg-[#0d1115] py-20 md:py-28"
      >
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(0,194,255,.1),transparent_60%)]"
        />
        <div className="container relative mx-auto grid items-center gap-12 px-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 md:min-h-[520px]">
            <Image
              src="/images/windows-view.webp"
              alt="Ventana panorámica WONLY abierta hacia un paisaje de montaña"
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.025]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
              {["Aislamiento", "Luz natural", "Perfil minimalista"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/15 bg-black/55 px-3 py-2 text-xs font-medium text-white backdrop-blur"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:pl-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
              Ventanas panorámicas
            </p>
            <h2
              id="windows-title"
              className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-[-0.035em] md:text-6xl"
            >
              Más horizonte. Menos barreras.
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Cerramientos de aluminio con perfiles limpios, sellado avanzado y
              una apertura visual que conecta interior y exterior.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                [Wind, "Hermeticidad", "Protección frente a aire, polvo y humedad."],
                [Sun, "Eficiencia", "Mejor control térmico y aprovechamiento de luz."],
                [Waves, "Confort acústico", "Soluciones pensadas para reducir el ruido exterior."],
              ].map(([Icon, title, text]) => (
                <div key={title} className="border-t border-white/10 pt-4">
                  <Icon size={20} className="text-cyan-300" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-500">{text}</p>
                </div>
              ))}
            </div>

            <Link
              href="/ventanas"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-white hover:text-cyan-300"
            >
              Descubrir ventanas
              <ChevronRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="interior-title"
        className="content-auto bg-[#070707] py-20 md:py-28"
      >
        <div className="container mx-auto px-6">
          <SectionHeading
            eyebrow="Interior WONLY"
            title="Un mismo criterio, en todo el espacio"
            description="Colecciones de mobiliario para crear interiores coherentes, funcionales y visualmente serenos."
            id="interior-title"
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {interiorCollections.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative min-h-[360px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 md:min-h-[440px]"
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <Icon className="mb-4 text-cyan-300" size={24} aria-hidden="true" />
                        <h3 className="text-3xl font-semibold tracking-[-0.03em]">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-300">
                          {item.text}
                        </p>
                      </div>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-black/30 transition group-hover:border-cyan-300 group-hover:bg-cyan-300 group-hover:text-black">
                        <ArrowRight size={18} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="certifications-title"
        className="content-auto bg-[#070707] py-20 md:py-28"
      >
        <div className="container mx-auto px-6">
          <SectionHeading
            eyebrow="Confianza documentada"
            title="Certificaciones y propiedad intelectual"
            description="Consulta los documentos que respaldan los procesos, la gestión y la capacidad de innovación de la marca."
            id="certifications-title"
          />
          <div className="mt-12">
            <CertificateShowcase />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="patents-title"
        className="content-auto border-y border-white/10 bg-[#0b0f13] py-20 md:py-28"
      >
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                Innovación protegida
              </p>
              <h2
                id="patents-title"
                className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] md:text-5xl"
              >
                Patentes que se pueden consultar
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-400">
                Una selección de documentos originales y sus traducciones al
                español, presentada de forma clara y accesible.
              </p>
              <div className="mt-7 flex items-center gap-3 text-sm text-zinc-400">
                <Box size={18} className="text-cyan-300" aria-hidden="true" />
                13 documentos de invención disponibles
              </div>
            </div>
            <PatentCarousel />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="contact-title"
        className="relative isolate overflow-hidden border-t border-white/10 bg-black py-20 text-white md:py-24"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_80%_0%,rgba(103,232,249,.35),transparent_36%)]"
        />
        <div className="container relative mx-auto flex flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em]">
              Tu proyecto empieza aquí
            </p>
            <h2
              id="contact-title"
              className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-6xl"
            >
              Cuéntanos qué quieres proteger y cómo quieres vivirlo.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Te ayudamos a encontrar una solución coherente con el uso, el
              espacio y la estética de tu proyecto.
            </p>
          </div>
          <Link
            href="/contacto"
            className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-white bg-white/5 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:px-8 sm:text-sm sm:tracking-[0.14em]"
          >
            Solicitar asesoramiento
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

function Timeline() {
  return (
    <section
      aria-label="Historia de WONLY"
      className="content-auto border-b border-white/10 bg-[#0a0a0a] py-10 md:py-12"
    >
      <div className="container mx-auto px-6">
        <ol
          aria-label="Cronología de WONLY"
          className="scrollbar-hide -mx-6 flex snap-x snap-mandatory overflow-x-auto px-6 pb-3 md:mx-0 md:px-0"
        >
          {milestones.map((item, index) => (
            <li
              key={item.year}
              className="relative w-[190px] shrink-0 snap-start md:min-w-0 md:flex-1"
              title={item.text}
              aria-describedby={`milestone-${item.year}`}
            >
              <time
                dateTime={item.year}
                className="mb-3 block text-center font-mono text-2xl font-semibold tracking-tight text-white"
              >
                {item.year}
              </time>

              <div
                aria-hidden="true"
                className="relative mb-3 flex h-3 items-center justify-center"
              >
                {index > 0 && (
                  <span className="absolute left-0 right-1/2 top-1/2 h-px -translate-y-1/2 bg-cyan-300/50 shadow-[0_0_8px_rgba(103,232,249,.45)]" />
                )}
                {index < milestones.length - 1 && (
                  <span className="absolute left-1/2 right-0 top-1/2 h-px -translate-y-1/2 bg-cyan-300/50 shadow-[0_0_8px_rgba(103,232,249,.45)]" />
                )}
                <span className="relative h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0a] bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.8)]" />
              </div>

              <h2 className="px-3 text-center text-xs font-bold uppercase tracking-wide text-white md:text-sm">
                {item.title}
              </h2>
              <span id={`milestone-${item.year}`} className="sr-only">
                {item.text}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description, id, action }) {
  return (
    <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
          {eyebrow}
        </p>
        <h2
          id={id}
          className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl"
        >
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
          {description}
        </p>
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-zinc-300 hover:text-cyan-300"
        >
          {action.label}
          <ChevronRight
            size={18}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}

function SecurityCard({ item, index }) {
  const Icon = item.icon;
  const desktopPosition =
    index === 3
      ? "xl:col-span-2 xl:col-start-2"
      : "xl:col-span-2";

  return (
    <Link
      href={item.href}
      className={`group relative min-h-[520px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${desktopPosition}`}
    >
      <div className="absolute inset-x-0 top-0 h-[64%]">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className={`transition duration-700 group-hover:scale-[1.035] ${
            item.imageFit === "contain"
              ? "object-contain object-top"
              : "object-cover"
          }`}
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
        <div
          className={`mb-5 grid h-11 w-11 place-items-center rounded-full border ${
            item.tone === "cyan"
              ? "border-cyan-300/30 bg-cyan-300 text-black"
              : "border-white/15 bg-white/5 text-white"
          }`}
        >
          <Icon size={20} aria-hidden="true" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
          {item.eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{item.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
          Explorar
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
