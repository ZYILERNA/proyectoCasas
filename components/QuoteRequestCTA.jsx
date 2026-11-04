"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildFurnitureContactHref } from "../lib/furniture-contact";

const sentenceCase = (value = "") => {
  const text = String(value).trim().toLocaleLowerCase("es");
  return text ? text[0].toLocaleUpperCase("es") + text.slice(1).replace(/\bia\b/g, "IA").replace(/\bpvc\b/g, "PVC") : "";
};

// Botón de presupuesto para las fichas de producto: abre el formulario de
// contacto con el modelo, la categoría y el acabado elegido ya rellenados.
export default function QuoteRequestCTA({ product, finish, onNavigate }) {
  if (!product?.name) return null;
  const href = buildFurnitureContactHref(
    { name: product.name, code: product.code, category: sentenceCase(product.category) },
    finish || undefined,
  );
  return (
    <div className="mt-8 border-t border-gray-100 pt-6">
      <Link
        href={href}
        onClick={onNavigate}
        className="flex w-full items-center justify-center gap-2 rounded bg-black px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#866142] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      >
        Solicitar presupuesto <ArrowRight size={16} aria-hidden="true" />
      </Link>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-gray-500">
        Incluiremos el modelo {product.name}{finish ? ` y el acabado ${finish}` : ""} en tu consulta. Sin compromiso.
      </p>
    </div>
  );
}
