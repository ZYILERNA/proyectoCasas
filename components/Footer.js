import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Music2,
  Phone,
  Youtube,
} from "lucide-react";
import CookieSettingsButton from "./CookieSettingsButton";

const securityLinks = [
  { href: "/puertas", label: "Puertas de seguridad" },
  {
    href: "/puertas?category=PUERTA%20AC%C3%9ASTICA%20DE%20MADERA",
    label: "Puertas de interior",
  },
  { href: "/ventanas", label: "Ventanas panorámicas" },
  { href: "/cerraduras", label: "Cerraduras inteligentes" },
  { href: "/manillas", label: "Manillas de diseño" },
];

const interiorLinks = [
  { href: "/sofas", label: "Colección sofás" },
  { href: "/mesas", label: "Mesas de diseño" },
  { href: "/sillas", label: "Sillas y sillones" },
  { href: "/dormitorios", label: "Dormitorios" },
  { href: "/gabinetes", label: "Sistemas de gabinetes" },
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
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030303] pb-8 pt-20 text-white md:pt-24">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-32 w-full max-w-xl -translate-x-1/2 bg-cyan-300/5 blur-[100px]"
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col lg:col-span-4">
            <Link
              href="/"
              aria-label="WONLY España, ir a inicio"
              className="mb-6 inline-block rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            >
              <Image
                src="/images/logo-wonly.webp"
                alt="WONLY"
                width={160}
                height={40}
                className="h-10 w-auto object-contain transition-opacity hover:opacity-80"
              />
            </Link>

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
              Zhongyuankeji S.L.
            </p>
            <p className="mb-8 max-w-sm text-sm font-light leading-7 text-zinc-400">
              Puertas inteligentes, soluciones de seguridad y colecciones de
              interior diseñadas para convivir con la arquitectura.
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <SocialIcon
                  key={href}
                  href={href}
                  label={label}
                  icon={Icon}
                />
              ))}
            </div>
          </div>

          <FooterColumn
            title="Seguridad"
            links={securityLinks}
            className="lg:col-span-3"
            extraLinks={[
              { href: "/proyectos", label: "Proyectos contract" },
              { href: "/blog", label: "Blog · Instalaciones" },
            ]}
          />

          <FooterColumn
            title="Mobiliario"
            links={interiorLinks}
            className="lg:col-span-2"
          />

          <div className="lg:col-span-3">
            <FooterTitle>Contacto</FooterTitle>

            <address className="flex flex-col gap-6 not-italic">
              <ContactItem icon={Mail} label="Email">
                <a
                  href="mailto:info@wonlyspain.com"
                  className="break-all text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  info@wonlyspain.com
                </a>
              </ContactItem>

              <ContactItem icon={Phone} label="Teléfono">
                <a
                  href="tel:+34689858129"
                  className="text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  +34 689 858 129
                </a>
              </ContactItem>

              <ContactItem icon={MapPin} label="Sede principal">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Carrer+Noi+del+Sucre+13+08840+Viladecans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-6 text-zinc-300 transition-colors hover:text-white"
                >
                  Carrer Noi del Sucre, 13
                  <br />
                  08840 Viladecans
                  <br />
                  Barcelona, España
                </a>
              </ContactItem>
            </address>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 lg:flex-row">
          <p className="text-xs font-medium text-zinc-500">
            © {new Date().getFullYear()} Zhongyuankeji S.L. Todos los derechos
            reservados.
          </p>

          <nav aria-label="Enlaces legales">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-medium text-zinc-500">
              <li>
                <Link href="/empresa" className="transition-colors hover:text-white">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/aviso-legal"
                  className="transition-colors hover:text-white"
                >
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="transition-colors hover:text-white"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="transition-colors hover:text-white">
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

function FooterTitle({ children }) {
  return (
    <h2 className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
      <span className="h-px w-4 bg-cyan-300" aria-hidden="true" />
      {children}
    </h2>
  );
}

function FooterColumn({ title, links, extraLinks = [], className = "" }) {
  return (
    <div className={className}>
      <FooterTitle>{title}</FooterTitle>
      <ul className="space-y-4 text-sm">
        {links.map((link) => (
          <FooterLink key={link.href} {...link} />
        ))}
        {extraLinks.length > 0 && (
          <li role="separator" aria-hidden="true" className="my-4 h-px w-full bg-white/5" />
        )}
        {extraLinks.map((link) => (
          <FooterLink key={link.href} {...link} />
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ href, label }) {
  return (
    <li className="group">
      <Link
        href={href}
        className="flex items-center text-zinc-400 transition-colors duration-300 hover:text-white"
      >
        <ChevronRight
          size={14}
          aria-hidden="true"
          className="-ml-4 mr-0 text-cyan-300 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:mr-2 group-hover:opacity-100"
        />
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {label}
        </span>
      </Link>
    </li>
  );
}

function ContactItem({ icon: Icon, label, children }) {
  return (
    <div className="group flex items-start gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-colors group-hover:border-cyan-300 group-hover:bg-cyan-300/10 group-hover:text-cyan-300">
        <Icon size={16} aria-hidden="true" />
      </span>
      <span>
        <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          {label}
        </span>
        {children}
      </span>
    </div>
  );
}

function SocialIcon({ icon: Icon, href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
    >
      <Icon size={18} aria-hidden="true" />
    </a>
  );
}
