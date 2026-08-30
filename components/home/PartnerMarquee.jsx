import Image from "next/image";

const partnerNames = [
  "Poly Developments",
  "China Overseas Land & Investment",
  "CR Land",
  "China Merchants Shekou",
  "Greentown",
  "Longfor",
  "Yuexiu Property",
  "Vanke",
  "Huafa Industrial Share",
  "Seazen",
  "C&D",
  "China Jinmao",
  "China Railway Construction",
  "Binjiang Real Estate",
  "Gemdale",
  "China Railway Real Estate",
  "Grandjoy",
  "PowerChina",
  "Midea Real Estate",
  "ITG Real Estate",
  "Shokai",
  "Poly Property",
  "Dahua Group",
  "Weixing Real Estate",
  "CSC Dongfu Group",
  "Lianfa Group",
  "Shenzhen Investment Holdings",
  "CCCC Real Estate",
  "RK Properties",
  "Wuhan Urban Construction Group",
  "Sino-Ocean Group",
];

const partnerLogos = partnerNames.map((name, index) => ({
  id: index + 1,
  src: `/images/COMPANY/LOGO/partner${index + 1}.webp`,
  alt: `Logotipo de ${name}`,
}));

const partnerRows = [partnerLogos.slice(0, 16), partnerLogos.slice(16)];

export default function PartnerMarquee() {
  return (
    <section
      aria-labelledby="partners-title"
      className="content-auto relative overflow-hidden border-y border-white/10 bg-[#080d12] py-16 text-white md:py-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,.12),transparent_42%)]"
      />

      <div className="container relative mx-auto px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
          Confianza a gran escala
        </p>
        <h2
          id="partners-title"
          className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.035em] md:text-5xl"
        >
          Elegidos por los principales promotores inmobiliarios
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
          Colaboraciones de largo plazo que llevan la seguridad WONLY a grandes
          proyectos residenciales.
        </p>
      </div>

      <div
        className="partner-carousel relative mt-10 space-y-4 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 md:mt-12 md:space-y-5"
        tabIndex={0}
        aria-label="Empresas colaboradoras. El carrusel se pausa al situar el cursor o el foco sobre él."
      >
        {partnerRows.map((partners, rowIndex) => (
          <div className="partner-logo-row" key={`partner-row-${rowIndex + 1}`}>
            <div
              className={`partner-logo-track${rowIndex === 1 ? " partner-logo-track--reverse" : ""}`}
            >
              {[false, true].map((isDuplicate) => (
                <ul
                  className="partner-logo-group"
                  aria-hidden={isDuplicate ? "true" : undefined}
                  key={isDuplicate ? "duplicate" : "original"}
                >
                  {partners.map((partner) => (
                    <li
                      className="relative h-20 w-40 shrink-0 overflow-hidden rounded-2xl border border-cyan-300/10 bg-white p-4 shadow-[0_12px_35px_rgba(0,0,0,.22)] sm:h-24 sm:w-52 sm:p-5 md:w-56"
                      key={`${partner.id}-${isDuplicate ? "duplicate" : "original"}`}
                    >
                      <Image
                        src={partner.src}
                        alt={isDuplicate ? "" : partner.alt}
                        fill
                        sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, 224px"
                        className="object-contain p-4 sm:p-5"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
