import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import PuertasClient from "./PuertasClient";
import { getDedicatedDoorProductPath } from "../../lib/door-product-routes";
import {
  ALL_CATEGORIES,
  PRODUCT_CARD_FIELDS,
  PRODUCT_PAGE_SIZE,
  applyProductFilters,
} from "./catalog";

export const revalidate = 300;

const createServerSupabaseClient = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  },
);

const getInitialCatalogue = unstable_cache(
  async (category) => {
    const supabase = createServerSupabaseClient();
    let query = supabase
      .from("products")
      .select(PRODUCT_CARD_FIELDS, { count: "exact" })
      .order("id", { ascending: true });

    query = applyProductFilters(query, category)
      .range(0, PRODUCT_PAGE_SIZE - 1);

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      products: data || [],
      total: count ?? data?.length ?? 0,
    };
  },
  ["puertas-initial-catalogue"],
  { revalidate: 300 },
);

const getProductByName = unstable_cache(
  async (productName) => {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("name", productName)
      .limit(1);

    if (error) throw error;
    return data?.[0] || null;
  },
  ["puertas-product-detail"],
  { revalidate: 300 },
);

const getProductByImage = unstable_cache(
  async (productImage) => {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("img", productImage)
      .limit(1);

    if (error) throw error;
    return data?.[0] || null;
  },
  ["puertas-product-detail-by-image"],
  { revalidate: 300 },
);

const getFirstSearchParam = (value) => (
  Array.isArray(value) ? value[0] : value
);

export default async function PuertasPage({ searchParams = {} }) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const requestedCategory = getFirstSearchParam(resolvedSearchParams.category);
  const initialCategory = ALL_CATEGORIES.has(requestedCategory)
    ? requestedCategory
    : "TODAS";
  const requestedProduct = getFirstSearchParam(resolvedSearchParams.producto);
  const requestedProductImage = getFirstSearchParam(
    resolvedSearchParams.productoImagen,
  );

  const dedicatedProductPath = getDedicatedDoorProductPath(requestedProduct);
  if (dedicatedProductPath) redirect(dedicatedProductPath);

  let initialCatalogue = { products: [], total: 0 };
  let initialProduct = null;
  let initialLoadSucceeded = true;

  try {
    initialCatalogue = await getInitialCatalogue(initialCategory);
  } catch (error) {
    initialLoadSucceeded = false;
    console.error("Error cargando el catálogo inicial de puertas:", error);
  }

  if (requestedProduct || requestedProductImage) {
    try {
      initialProduct = requestedProductImage
        ? await getProductByImage(requestedProductImage)
        : await getProductByName(requestedProduct);
    } catch (error) {
      console.error("Error cargando la ficha inicial de puerta:", error);
    }
  }

  return (
    <Suspense
      fallback={(
        <div className="flex min-h-screen items-center justify-center bg-white" role="status">
          <Loader2 className="animate-spin" aria-hidden="true" />
          <span className="sr-only">Cargando catálogo de puertas</span>
        </div>
      )}
    >
      <PuertasClient
        initialCategory={initialCategory}
        initialProducts={initialCatalogue.products}
        initialTotalProducts={initialCatalogue.total}
        initialProduct={initialProduct}
        initialLoadSucceeded={initialLoadSucceeded}
      />
    </Suspense>
  );
}
