import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIdentifier,
} from "../../../lib/server-rate-limit";
import { getLogoFreeDoorImagePath } from "../../../lib/door-image-assets";

export const dynamic = "force-dynamic";

const cache = new Map();
const CACHE_TTL = 5 * 60_000;
const MAX_CACHE_ENTRIES = 100;

const catalogs = [
  {
    table: "products",
    route: "/puertas",
    label: "Puerta",
    imgField: "img",
    withCategory: true,
  },
  {
    table: "locks",
    route: "/cerraduras",
    label: "Cerradura",
    imgField: "img",
  },
  {
    table: "manillas",
    route: "/manillas",
    label: "Manilla",
    imgField: "image",
  },
  {
    table: "sofas",
    route: "/sofas",
    label: "Sofá",
    imgField: "image",
  },
  {
    table: "mesas",
    route: "/mesas",
    label: "Mesa",
    imgField: "image",
  },
  {
    table: "sillas",
    route: "/sillas",
    label: "Silla",
    imgField: "image",
  },
  {
    table: "dormitorios",
    route: "/dormitorios",
    label: "Dormitorio",
    imgField: "image",
  },
  {
    table: "gabinetes",
    route: "/gabinetes",
    label: "Gabinete",
    imgField: "image",
  },
];

const windows = [
  { name: "Fashion 110", img: "/images/VENTANAS/fashion110.webp" },
  { name: "Fashion 120", img: "/images/VENTANAS/fashion120.webp" },
  { name: "Glory 70", img: "/images/VENTANAS/glory70.webp" },
  { name: "Glory 118", img: "/images/VENTANAS/glory118.webp" },
];

export async function GET(request) {
  const rawTerm = new URL(request.url).searchParams.get("q") || "";
  const term = rawTerm
    .normalize("NFKC")
    .toLocaleLowerCase("es")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
  if (term.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const rateLimit = checkRateLimit({
    namespace: "catalog-search",
    identifier: getClientIdentifier(request.headers),
    limit: 30,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json({ results: [] }, { status: 429 });
  }

  const now = Date.now();
  const cached = cache.get(term);
  if (cached && cached.expiresAt > now) {
    return NextResponse.json(cached.payload, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Search-Cache": "HIT",
      },
    });
  }
  if (cached) cache.delete(term);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ results: [] });
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const like = `%${term}%`;

  const queries = catalogs.map((catalog) =>
    supabase
      .from(catalog.table)
      .select(`name,category,${catalog.imgField}`)
      .or(`name.ilike.${like},category.ilike.${like}`)
      .limit(3),
  );
  const settled = await Promise.allSettled(queries);

  const results = windows
    .filter((item) => item.name.toLocaleLowerCase("es").includes(term))
    .map((item) => ({
      title: item.name,
      subtitle: "Ventana",
      img: item.img,
      href: `/ventanas?producto=${encodeURIComponent(item.name)}`,
    }));

  settled.forEach((response, index) => {
    if (response.status !== "fulfilled" || !response.value.data) return;
    const catalog = catalogs[index];

    response.value.data.forEach((item) => {
      if (!item?.name) return;
      const category = item.category || catalog.label;
      const sourceImage = item[catalog.imgField] || null;
      const displayImage = catalog.table === "products" && sourceImage
        ? getLogoFreeDoorImagePath(sourceImage)
        : sourceImage;
      const params = new URLSearchParams({ producto: item.name });
      if (catalog.withCategory && item.category) {
        params.set("category", item.category);
      }
      if (catalog.table === "products" && item.img) {
        params.set("productoImagen", item.img);
      }

      results.push({
        title: String(item.name).slice(0, 140),
        subtitle: String(category).slice(0, 100),
        img: displayImage,
        href: `${catalog.route}?${params.toString()}`,
      });
    });
  });

  const payload = { results: results.slice(0, 20) };
  const hasResults = payload.results.length > 0;
  if (hasResults) {
    if (cache.size >= MAX_CACHE_ENTRIES) {
      cache.delete(cache.keys().next().value);
    }
    cache.set(term, { payload, expiresAt: now + CACHE_TTL });
  }

  return NextResponse.json(
    payload,
    {
      headers: {
        "Cache-Control": hasResults
          ? "public, s-maxage=300, stale-while-revalidate=600"
          : "no-store",
        "X-Search-Cache": "MISS",
      },
    },
  );
}
