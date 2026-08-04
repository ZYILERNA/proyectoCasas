import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import WLJ001ProductExperience from "../../../../../components/doors/WLJ001ProductExperience";
import { createPageMetadata } from "../../../../../lib/site-metadata";
import { WL_J001_PRODUCT_PATH } from "../../../../../lib/door-product-routes";
import {
  WL_J001_FAQS,
  WL_J001_PRODUCT,
} from "../../../../../lib/wl-j001-product";

const CATEGORY_NAME = "PUERTA ACÚSTICA DE MADERA";
const ASSET_ROOT = "/images/PUERTAS/MADERAACÚSTICA/wl-j001";

export const metadata = createPageMetadata({
  title: WL_J001_PRODUCT.name,
  description: WL_J001_PRODUCT.description,
  path: WL_J001_PRODUCT_PATH,
  image: `${ASSET_ROOT}/scene-warm-ai.webp`,
});

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: WL_J001_PRODUCT.name,
  description: WL_J001_PRODUCT.description,
  category: WL_J001_PRODUCT.category,
  sku: WL_J001_PRODUCT.code,
  mpn: WL_J001_PRODUCT.code,
  model: WL_J001_PRODUCT.code,
  brand: {
    "@type": "Brand",
    name: "WONLY",
  },
  image: [
    `https://www.wonlyspain.com${ASSET_ROOT}/original.webp`,
    `https://www.wonlyspain.com${ASSET_ROOT}/scene-warm-ai.webp`,
    `https://www.wonlyspain.com${ASSET_ROOT}/scene-dark-ai.webp`,
  ],
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Serie",
      value: WL_J001_PRODUCT.series,
    },
    {
      "@type": "PropertyValue",
      name: "Aplicación",
      value: WL_J001_PRODUCT.application,
    },
    {
      "@type": "PropertyValue",
      name: "Accionamiento",
      value: WL_J001_PRODUCT.operation,
    },
    {
      "@type": "PropertyValue",
      name: "Núcleo",
      value: WL_J001_PRODUCT.core,
    },
  ],
  url: `https://www.wonlyspain.com${WL_J001_PRODUCT_PATH}`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: WL_J001_FAQS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function WLJ001Page() {
  return (
    <main className="min-h-screen bg-[#F5F2ED] text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="pb-16 pt-28 sm:pt-32 lg:pb-24">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <nav aria-label="Navegación del producto" className="mb-7 sm:mb-9">
            <Link
              href={{ pathname: "/puertas", query: { category: CATEGORY_NAME } }}
              className="inline-flex min-h-11 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600 transition-colors hover:text-zinc-950 focus-visible:ring-2 focus-visible:ring-[#866142] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F2ED] motion-reduce:transition-none"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Volver a madera acústica
            </Link>
          </nav>

          <WLJ001ProductExperience />
        </div>
      </section>

      <section className="bg-[#17130F] pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-16 text-white sm:pb-[calc(7rem+env(safe-area-inset-bottom))] sm:pt-20 lg:pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(18rem,32rem)] md:items-end lg:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A781]">
              Dos atmósferas, una misma puerta
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Imagina la WL-J001 dentro de tu espacio.
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-sm leading-6 text-zinc-400">
              Te ayudamos a elegir el acabado que mejor dialogue con la luz,
              los revestimientos y el carácter de tu vivienda.
            </p>
            <Link
              href="/contacto"
              className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-[#C9A781] text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:text-[#C9A781] focus-visible:ring-2 focus-visible:ring-[#C9A781] focus-visible:ring-offset-4 focus-visible:ring-offset-[#17130F] motion-reduce:transition-none"
            >
              Cuéntanos tu proyecto
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
