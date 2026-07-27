import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Youtube,
} from "lucide-react";
import CookieSettingsButton from "./CookieSettingsButton";

const securityLinks = [
  { href: "/puertas", label: "Puertas de seguridad" },
  { href: "/cerraduras", label: "Cerraduras inteligentes" },
  { href: "/ventanas", label: "Ventanas panorámicas" },
  { href: "/manillas", label: "Manillas" },
];

const interiorLinks = [
  { href: "/sofas", label: "Sofás" },
  { href: "/mesas", label: "Mesas" },
  { href: "/sillas", label: "Sillas y sillones" },
  { href: "/dormitorios", label: "Dormitorios" },
  { href: "/gabinetes", label: "Gabinetes" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/wonlyspain/",
    label: "Instagram de WONLY",
    icon: Instagram,
  },
  {
    href: "https://www.facebook.com/people/WONLY/61580719733874/",
    label: "Facebook de WONLY",
    icon: Facebook,
  },
  {
    href: "https://www.tiktok.com/@wonlyspain",
    label: "TikTok de WONLY",
    icon: Music2,
  },
  {
    href: "https://www.youtube.com/@jackjiang-u4r",
    label: "YouTube de WONLY",
    icon: Youtube,
  },
  {
    href: "https://www.linkedin.com/in/jack-jiang-a024483a9/",
    label: "LinkedIn de WONLY",
    icon: Linkedin,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030303] text-white">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-full max-w-5xl -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"
      />

      <div className="container mx-auto px-6 pb-8 pt-16 md:pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="WONLY España, ir a inicio"
              className="inline-block rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            >
              <Image
                src="/images/logo-wonly.webp"
                alt="WONLY"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-400">
              Puertas inteligentes, soluciones de seguridad y colecciones de
              interior diseñadas para convivir con la arquitectura.
            </p>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-600">
              Zhongyuankeji S.L.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-zinc-400 transition hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
                >
                  <Icon size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn
            title="Seguridad"
            links={securityLinks}
            className="lg:col-span-2"
          />
          <FooterColumn
            title="Interior"
            links={interiorLinks}
            className="lg:col-span-2"
          />

          <div className="lg:col-span-4 lg:pl-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Hablemos de tu proyecto
            </p>
            <div className="mt-6 grid gap-4">
              <ContactLink
                href="mailto:info@wonlyspain.com"
                icon={Mail}
                label="Correo"
                value="info@wonlyspain.com"
              />
              <ContactLink
                href="tel:+34689858129"
                icon={Phone}
                label="Teléfono"
                value="+34 689 858 129"
              />
              <ContactLink
                href="https://wa.me/34689858129"
                icon={MessageCircle}
                label="WhatsApp"
                value="Abrir conversación"
                external
              />
              <ContactLink
                href="https://www.google.com/maps/search/?api=1&query=Carrer+Noi+del+Sucre+13+08840+Viladecans"
                icon={MapPin}
                label="Showroom"
                value="Carrer Noi del Sucre, 13 · Viladecans"
                external
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 pt-7 text-xs text-zinc-500 lg:flex-row">
          <p>
            © {new Date().getFullYear()} Zhongyuankeji S.L. Todos los derechos
            reservados.
          </p>
          <nav aria-label="Enlaces legales">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-3">
              <li>
                <Link href="/aviso-legal" className="transition hover:text-white">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="transition hover:text-white">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="transition hover:text-white">
                  Cookies
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, className = "" }) {
  return (
    <div className={className}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white">
        {title}
      </p>
      <ul className="mt-6 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center text-sm text-zinc-500 transition hover:text-white"
            >
              <ChevronRight
                size={14}
                className="mr-0 w-0 overflow-hidden text-cyan-300 opacity-0 transition-all group-hover:mr-1.5 group-hover:w-3.5 group-hover:opacity-100"
                aria-hidden="true"
              />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactLink({ href, icon: Icon, label, value, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-zinc-500 transition group-hover:border-cyan-300/50 group-hover:text-cyan-300">
        <Icon size={16} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">
          {label}
        </span>
        <span className="mt-0.5 block text-sm text-zinc-300 transition group-hover:text-white">
          {value}
        </span>
      </span>
    </a>
  );
}
