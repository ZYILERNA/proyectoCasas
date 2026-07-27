"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useRef, useState } from "react";
import useAccessibleDialog from "../useAccessibleDialog";

const certificates = [
  {
    id: "fsc",
    title: "Certificado FSC",
    subtitle: "Gestión forestal responsable",
    logo: "/images/Asset/CERTIFICADOS/LOGOS/FSC.png",
    image: "/images/Asset/CERTIFICADOS/fsc-certificate-wangli.webp",
    width: 1224,
    height: 1584,
  },
  {
    id: "iso9001",
    title: "ISO 9001:2015",
    subtitle: "Gestión de calidad",
    logo: "/images/Asset/CERTIFICADOS/LOGOS/ISO.png",
    image: "/images/Asset/CERTIFICADOS/iso-certificate.webp",
    width: 2191,
    height: 3096,
  },
  {
    id: "iso14001",
    title: "ISO 14001:2015",
    subtitle: "Gestión ambiental",
    logo: "/images/Asset/CERTIFICADOS/LOGOS/ISO.png",
    image: "/images/Asset/CERTIFICADOS/iso-14001-certificate.webp",
    width: 2191,
    height: 3096,
  },
  {
    id: "iso45001",
    title: "ISO 45001:2018",
    subtitle: "Seguridad y salud",
    logo: "/images/Asset/CERTIFICADOS/LOGOS/ISO.png",
    image: "/images/Asset/CERTIFICADOS/iso-45001-certificate.webp",
    width: 2180,
    height: 3096,
  },
  {
    id: "intellectual-property",
    title: "Propiedad intelectual",
    subtitle: "GB/T 29490-2023",
    logo: "/images/Asset/CERTIFICADOS/intellectual-property-certificate-2026.webp",
    image:
      "/images/Asset/CERTIFICADOS/intellectual-property-certificate-2026.webp",
    width: 2024,
    height: 2867,
  },
  {
    id: "low-noise",
    title: "Low Noise",
    subtitle: "Documento PDF",
    logo: "/images/Asset/CERTIFICADOS/LOGOS/LOWNOISE.png",
    pdf: "/images/Asset/CERTIFICADOS/Lownoise.pdf",
  },
];

export default function CertificateShowcase() {
  const [selected, setSelected] = useState(null);
  const scrollerRef = useRef(null);
  const dialogRef = useAccessibleDialog(Boolean(selected), () =>
    setSelected(null),
  );

  const scroll = (direction) => {
    scrollerRef.current?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.72, 380),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Ver certificados anteriores"
          className="absolute -left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/85 text-white transition hover:border-cyan-300 hover:bg-cyan-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 md:grid"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <div
          ref={scrollerRef}
          className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0"
        >
          {certificates.map((certificate) =>
            certificate.pdf ? (
              <a
                key={certificate.id}
                href={certificate.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-60 w-[78vw] max-w-[330px] shrink-0 snap-start flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                <CertificateLogo certificate={certificate} />
                <CertificateText certificate={certificate} external />
              </a>
            ) : (
              <button
                key={certificate.id}
                type="button"
                onClick={() => setSelected(certificate)}
                className="group flex min-h-60 w-[78vw] max-w-[330px] shrink-0 snap-start flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-left transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                <CertificateLogo certificate={certificate} />
                <CertificateText certificate={certificate} />
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Ver certificados siguientes"
          className="absolute -right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/85 text-white transition hover:border-cyan-300 hover:bg-cyan-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 md:grid"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      {selected && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[90] grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-dialog-title"
          tabIndex={-1}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p
                  id="certificate-dialog-title"
                  className="font-semibold text-white"
                >
                  {selected.title}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {selected.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Cerrar certificado"
                className="grid h-10 w-10 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="overflow-y-auto bg-zinc-900 p-3 sm:p-6">
              <Image
                src={selected.image}
                alt={`${selected.title}: ${selected.subtitle}`}
                width={selected.width}
                height={selected.height}
                quality={82}
                className="mx-auto h-auto max-h-[75vh] w-auto rounded bg-white object-contain"
                sizes="(max-width: 768px) 94vw, 780px"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CertificateLogo({ certificate }) {
  return (
    <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-white p-3">
      <Image
        src={certificate.logo}
        alt=""
        width={72}
        height={72}
        className="h-full w-full object-contain"
        sizes="80px"
      />
    </div>
  );
}

function CertificateText({ certificate, external = false }) {
  return (
    <div className="mt-8">
      <p className="text-lg font-semibold text-white transition group-hover:text-cyan-300">
        {certificate.title}
      </p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-sm text-zinc-500">{certificate.subtitle}</span>
        {external ? (
          <ExternalLink size={16} className="text-zinc-500" aria-hidden="true" />
        ) : (
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">
            Consultar
          </span>
        )}
      </div>
    </div>
  );
}
