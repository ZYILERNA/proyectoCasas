"use client";

import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ChevronRight,
  Filter,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import useAccessibleDialog from "../../components/useAccessibleDialog";
import {
  CATALOGUE_CACHE_TTL_MS,
  CATEGORIAS,
  CATEGORIAS_INTERIOR,
  PRODUCT_CARD_FIELDS,
  PRODUCT_PAGE_SIZE,
  applyProductFilters,
  getCatalogueCacheKey,
} from "./catalog";

const ProductModal = dynamic(() => import("./ProductModal"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60" role="status">
      <div className="flex items-center gap-3 rounded bg-white px-5 py-4 text-xs font-bold uppercase tracking-widest text-gray-700 shadow-2xl">
        <Loader2 className="animate-spin" size={18} aria-hidden="true" />
        Abriendo ficha…
      </div>
    </div>
  ),
});

const IMAGENES_HERO = {
  TODAS: "/images/todas.webp",
  "PUERTA DE SEGURIDAD IA": "/images/family.webp",
  "PUERTA DE ACERO REFORZADO": "/images/specs.webp",
  "PUERTA DE SEGURIDAD ACORAZADA": "/images/acorazada.webp",
  "PUERTA DE ALUMINIO FUNDIDO": "/images/fundido.webp",
  "PUERTA ACÚSTICA DE MADERA": "/images/madera.webp",
  "PUERTA DE PVC": "/images/pvc.webp",
  "PUERTAS CORREDIZAS Y ABATIBLES": "/images/corredizas.webp",
  "PUERTA COMERCIAL CORTAFUEGO": "/images/cortafuego.webp",
  "PUERTA DE EVACUACIÓN": "/images/evacuacion.webp",
  "PUERTA MINIMALISTA": "/images/minimalista.webp",
  "PUERTA DE BAJO CARBONO": "/images/carbono.webp",
  "PUERTA MÉDICA": "/images/medica.webp",
  "PUERTA DE COBRE COMPUESTA": "/images/cobrewallaper.webp",
};

const CARD_SWATCHES = ["#171717", "#4A2E1A", "#36383A", "#484A4B", "#5C3524"];
const catalogueCache = new Map();
const productDetailCache = new Map();

const isFreshCacheEntry = (entry) => (
  entry && Date.now() - entry.timestamp < CATALOGUE_CACHE_TTL_MS
);

const getCachedCatalogue = (key) => {
  const entry = catalogueCache.get(key);
  if (isFreshCacheEntry(entry)) return entry;
  if (entry) catalogueCache.delete(key);
  return null;
};

const cacheProductDetail = (product) => {
  if (!product) return;
  productDetailCache.set(`id:${product.id}`, product);
  productDetailCache.set(`name:${product.name}`, product);
};

const isAbortError = (error) => (
  error?.name === "AbortError"
  || error?.message?.toLowerCase().includes("abort")
);

const FilterButton = memo(function FilterButton({
  label,
  active,
  onClick,
  small = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex w-full items-center justify-between overflow-hidden border-b px-4 py-3 text-left font-bold uppercase tracking-widest transition-all duration-300 ${
        small ? "py-2 text-[9px]" : "text-[10px]"
      } ${
        active
          ? "border-black bg-black pl-6 text-white"
          : "border-gray-100 bg-white text-gray-500 hover:bg-gray-50 hover:pl-6 hover:text-black"
      }`}
    >
      <span className="relative z-10 flex w-full items-center justify-between">
        {label}
        {active && <ChevronRight size={12} aria-hidden="true" />}
      </span>
    </button>
  );
});

const SearchInput = memo(function SearchInput({ value, onChange, onClear }) {
  return (
    <div className="group relative w-full">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-black"
        size={16}
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder="BUSCAR MODELO..."
        value={value}
        onChange={onChange}
        className="w-full rounded-full border border-transparent bg-[#F5F5F5] py-2.5 pl-11 pr-10 text-xs font-bold uppercase tracking-wide text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-200 focus:bg-white focus:ring-0"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpiar búsqueda"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-black"
        >
          <X size={12} aria-hidden="true" />
        </button>
      )}
    </div>
  );
});

const ProductCard = memo(forwardRef(function ProductCard({
  product,
  onSelect,
  priority = false,
  opening = false,
}, ref) {
  const shortCategory = product.category
    .replace("PUERTA DE ", "")
    .replace("PUERTA ", "")
    .replace("SEGURIDAD ", "");

  let highlightClass = "text-gray-400";
  if (product.category.includes("IA")) highlightClass = "text-[#00C2FF]";
  else if (product.category.includes("MADERA")) highlightClass = "text-[#8D6E63]";
  else if (product.category.includes("PVC")) highlightClass = "text-teal-600";
  else if (product.category.includes("CORREDIZAS")) highlightClass = "text-indigo-600";
  else if (product.category.includes("CORTAFUEGO")) highlightClass = "text-orange-600";
  else if (product.category.includes("EVACUACIÓN")) highlightClass = "text-red-600";
  else if (product.category.includes("MINIMALISTA")) highlightClass = "text-stone-500";
  else if (product.category.includes("BAJO CARBONO")) highlightClass = "text-green-600";

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onSelect(product)}
      aria-label={`Ver detalles de ${product.name}`}
      aria-busy={opening}
      className="group flex h-full w-full appearance-none flex-col bg-transparent text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
    >
      <div className="relative mb-4 aspect-[3/5] overflow-hidden rounded-sm border border-transparent bg-[#FCFCFC] transition-all group-hover:border-gray-100">
        <div className="absolute inset-x-[7%] bottom-[6%] top-[7%]">
          <Image
            src={product.img}
            alt={product.name}
            fill
            priority={priority}
            quality={82}
            className="object-contain object-bottom mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 767px) 44vw, (max-width: 1279px) 30vw, 220px"
          />
        </div>

        <div className="absolute inset-0 flex items-end justify-center bg-black/0 pb-6 transition-colors duration-300 group-hover:bg-black/5">
          <span className="translate-y-2 bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-widest text-black opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {opening ? "Abriendo…" : "Ver Detalles"}
          </span>
        </div>
      </div>

      <div className="text-center transition-all group-hover:text-left">
        <h2 className={`text-base font-bold uppercase text-gray-900 transition-colors ${
          product.category.includes("MADERA")
            ? "group-hover:text-[#8D6E63]"
            : product.category.includes("PVC")
              ? "group-hover:text-teal-600"
              : product.category.includes("CORREDIZAS")
                ? "group-hover:text-indigo-600"
                : "group-hover:text-[#00C2FF]"
        }`}>
          {product.name}
        </h2>
        <div className="mt-1 flex items-center justify-center gap-2 group-hover:justify-start">
          <p className={`text-[9px] uppercase tracking-widest ${product.category.includes("IA") ? "font-semibold text-[#00C2FF]" : highlightClass}`}>
            {shortCategory}
          </p>
          <div className="flex -space-x-1" aria-hidden="true">
            {CARD_SWATCHES.map((hex) => (
              <span
                key={hex}
                className="h-3 w-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: hex }}
              />
            ))}
            <span className="flex h-3 w-3 items-center justify-center rounded-full border border-white bg-gray-100 text-[6px] text-gray-500">
              +
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}));

export default function PuertasClient({
  initialCategory = "TODAS",
  initialProducts = [],
  initialTotalProducts = 0,
  initialProduct = null,
  initialLoadSucceeded = true,
}) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [loadingProductDetails, setLoadingProductDetails] = useState(false);
  const [openingProductId, setOpeningProductId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileFilterRef = useAccessibleDialog(
    isMobileMenuOpen,
    () => setIsMobileMenuOpen(false),
  );
  const [loading, setLoading] = useState(!initialLoadSucceeded);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalProducts, setTotalProducts] = useState(initialTotalProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isInteriorOpen, setIsInteriorOpen] = useState(
    CATEGORIAS_INTERIOR.includes(initialCategory),
  );
  const gridTopRef = useRef(null);
  const catalogueRequestRef = useRef(0);
  const loadMoreAbortRef = useRef(null);
  const detailAbortRef = useRef(null);
  const selectedProductIdRef = useRef(initialProduct?.id ?? null);
  const initialCacheSeededRef = useRef(false);

  if (!initialCacheSeededRef.current) {
    initialCacheSeededRef.current = true;
    if (initialLoadSucceeded) {
      catalogueCache.set(getCatalogueCacheKey(initialCategory), {
        products: initialProducts,
        total: initialTotalProducts,
        timestamp: Date.now(),
      });
    }
    cacheProductDetail(initialProduct);
  }

  useEffect(() => () => {
    loadMoreAbortRef.current?.abort();
    detailAbortRef.current?.abort();
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => window.clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (!categoryFromUrl) return;
    setActiveCategory(categoryFromUrl);
    if (CATEGORIAS_INTERIOR.includes(categoryFromUrl)) {
      setIsInteriorOpen(true);
    }
  }, [searchParams]);

  const closeProduct = useCallback(() => {
    detailAbortRef.current?.abort();
    selectedProductIdRef.current = null;
    setSelectedProduct(null);
    setLoadingProductDetails(false);
    setOpeningProductId(null);
  }, []);

  const loadProductDetails = useCallback(async (summary) => {
    if (!summary) return;

    detailAbortRef.current?.abort();
    selectedProductIdRef.current = summary.id;
    setSelectedProduct(summary);

    const cachedProduct = productDetailCache.get(`id:${summary.id}`);
    if (cachedProduct) {
      setSelectedProduct(cachedProduct);
      setLoadingProductDetails(false);
      setOpeningProductId(null);
      return;
    }

    const controller = new AbortController();
    detailAbortRef.current = controller;
    setLoadingProductDetails(true);
    setOpeningProductId(summary.id);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", summary.id)
      .single()
      .abortSignal(controller.signal);

    if (controller.signal.aborted || selectedProductIdRef.current !== summary.id) return;

    if (error) {
      if (!isAbortError(error)) console.error("Error cargando la ficha:", error);
    } else if (data) {
      cacheProductDetail(data);
      setSelectedProduct(data);
    }

    setLoadingProductDetails(false);
    setOpeningProductId(null);
  }, []);

  useEffect(() => {
    const productName = searchParams.get("producto");
    if (!productName || selectedProduct?.name === productName) return;

    const cachedProduct = productDetailCache.get(`name:${productName}`);
    if (cachedProduct) {
      selectedProductIdRef.current = cachedProduct.id;
      setSelectedProduct(cachedProduct);
      return;
    }

    const controller = new AbortController();
    detailAbortRef.current?.abort();
    detailAbortRef.current = controller;
    setLoadingProductDetails(true);

    (async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("name", productName)
        .limit(1)
        .abortSignal(controller.signal);

      if (controller.signal.aborted) return;
      if (error) {
        if (!isAbortError(error)) console.error("Error cargando la ficha enlazada:", error);
      } else if (data?.[0]) {
        cacheProductDetail(data[0]);
        selectedProductIdRef.current = data[0].id;
        setSelectedProduct(data[0]);
      }
      setLoadingProductDetails(false);
    })();

    return () => controller.abort();
  }, [searchParams, selectedProduct?.name]);

  useEffect(() => {
    const requestId = ++catalogueRequestRef.current;
    const cacheKey = getCatalogueCacheKey(activeCategory, debouncedSearchTerm);
    const cached = getCachedCatalogue(cacheKey);

    loadMoreAbortRef.current?.abort();
    setLoadingMore(false);

    if (cached) {
      setProducts(cached.products);
      setTotalProducts(cached.total);
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setLoading(true);

    (async () => {
      let query = supabase
        .from("products")
        .select(PRODUCT_CARD_FIELDS, { count: "exact" })
        .order("id", { ascending: true });

      query = applyProductFilters(query, activeCategory, debouncedSearchTerm)
        .range(0, PRODUCT_PAGE_SIZE - 1)
        .abortSignal(controller.signal);

      const { data, error, count } = await query;
      if (controller.signal.aborted || requestId !== catalogueRequestRef.current) return;

      if (error) {
        if (!isAbortError(error)) console.error("Error cargando productos:", error);
        setProducts([]);
        setTotalProducts(0);
      } else {
        const nextProducts = data || [];
        const nextTotal = count ?? nextProducts.length;
        catalogueCache.set(cacheKey, {
          products: nextProducts,
          total: nextTotal,
          timestamp: Date.now(),
        });
        setProducts(nextProducts);
        setTotalProducts(nextTotal);
      }
      setLoading(false);
    })();

    return () => controller.abort();
  }, [activeCategory, debouncedSearchTerm]);

  const loadMoreProducts = useCallback(async () => {
    if (loading || loadingMore || products.length >= totalProducts) return;

    const requestId = catalogueRequestRef.current;
    const rangeStart = products.length;
    const controller = new AbortController();
    loadMoreAbortRef.current?.abort();
    loadMoreAbortRef.current = controller;
    setLoadingMore(true);

    let query = supabase
      .from("products")
      .select(PRODUCT_CARD_FIELDS)
      .order("id", { ascending: true });

    query = applyProductFilters(query, activeCategory, debouncedSearchTerm)
      .range(rangeStart, rangeStart + PRODUCT_PAGE_SIZE - 1)
      .abortSignal(controller.signal);

    const { data, error } = await query;
    if (controller.signal.aborted || requestId !== catalogueRequestRef.current) return;

    if (error) {
      if (!isAbortError(error)) console.error("Error cargando más productos:", error);
    } else {
      setProducts((currentProducts) => {
        const currentIds = new Set(currentProducts.map((product) => product.id));
        const newProducts = (data || []).filter((product) => !currentIds.has(product.id));
        const mergedProducts = [...currentProducts, ...newProducts];
        catalogueCache.set(
          getCatalogueCacheKey(activeCategory, debouncedSearchTerm),
          {
            products: mergedProducts,
            total: totalProducts,
            timestamp: Date.now(),
          },
        );
        return mergedProducts;
      });
    }

    setLoadingMore(false);
  }, [
    activeCategory,
    debouncedSearchTerm,
    loading,
    loadingMore,
    products.length,
    totalProducts,
  ]);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    if (gridTopRef.current && window.scrollY > 300) {
      gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const clearSearch = useCallback(() => setSearchTerm(""), []);
  const hasMoreProducts = products.length < totalProducts;
  const heroImage = IMAGENES_HERO[activeCategory] || IMAGENES_HERO.TODAS;

  return (
    <main className="min-h-screen bg-white pb-20 font-sans text-black selection:bg-black selection:text-white">
      <div className="relative mb-16 mt-20 h-[45vh] w-full overflow-hidden bg-black md:h-[62vh]">
        <Image
          key={heroImage}
          src={heroImage}
          alt={`Wonly ${activeCategory}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="mb-3 max-w-5xl text-3xl font-bold uppercase tracking-tighter text-white drop-shadow-2xl md:mb-10 md:text-5xl lg:text-6xl">
            {activeCategory === "TODAS" ? "Wonly Collection" : activeCategory}
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-gray-200 drop-shadow-md md:text-base">
            {activeCategory === "TODAS"
              ? "Catálogo completo Wonly. Tecnología IA, resistencia extrema, lujo en aluminio, colección acústica de madera y la nueva línea vanguardista en PVC."
              : `Explora nuestra exclusiva línea de productos clasificados en ${activeCategory.toLowerCase()} con la mejor tecnología, máxima seguridad y diseño de vanguardia.`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-12 lg:flex-row">
          <aside className="sticky top-32 hidden h-fit w-64 flex-shrink-0 lg:block">
            <div className="mb-8">
              <SearchInput
                value={searchTerm}
                onChange={handleSearchChange}
                onClear={clearSearch}
              />
            </div>
            <div className="mb-6 border-b border-gray-100 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Categorías
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <FilterButton
                label="Ver Todo"
                active={activeCategory === "TODAS"}
                onClick={() => handleCategoryChange("TODAS")}
              />
              {CATEGORIAS.slice(0, 4).map((category) => (
                <FilterButton
                  key={category}
                  label={category}
                  active={activeCategory === category}
                  onClick={() => handleCategoryChange(category)}
                />
              ))}

              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setIsInteriorOpen((current) => !current)}
                  aria-expanded={isInteriorOpen}
                  className={`flex w-full items-center justify-between rounded px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    CATEGORIAS_INTERIOR.includes(activeCategory)
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>Puertas Interior</span>
                  <ChevronRight
                    size={14}
                    aria-hidden="true"
                    className={`transition-transform duration-300 ${isInteriorOpen ? "rotate-90" : ""}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isInteriorOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-gray-200 pl-3">
                    {CATEGORIAS_INTERIOR.map((category) => (
                      <FilterButton
                        key={category}
                        label={category}
                        active={activeCategory === category}
                        onClick={() => handleCategoryChange(category)}
                        small
                      />
                    ))}
                  </div>
                </div>
              </div>

              {CATEGORIAS.slice(4).map((category) => (
                <FilterButton
                  key={category}
                  label={category}
                  active={activeCategory === category}
                  onClick={() => handleCategoryChange(category)}
                />
              ))}
            </div>
          </aside>

          <section className="min-w-0 flex-grow" ref={gridTopRef}>
            <div className="mb-6 lg:hidden">
              <SearchInput
                value={searchTerm}
                onChange={handleSearchChange}
                onClear={clearSearch}
              />
            </div>

            <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-900" aria-live="polite">
                {activeCategory === "TODAS" ? "Catálogo Completo" : activeCategory}
                <span className="ml-2 text-gray-400">({totalProducts})</span>
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center gap-2 bg-black px-3 py-2 text-[10px] font-bold uppercase text-white lg:hidden"
              >
                <Filter size={12} aria-hidden="true" /> Filtros
              </button>
            </div>

            <div className="relative min-h-64" aria-busy={loading}>
              {loading && products.length === 0 ? (
                <div className="flex h-64 w-full flex-col items-center justify-center gap-3 text-gray-400" role="status">
                  <Loader2 className="animate-spin" size={32} aria-hidden="true" />
                  <span className="text-xs uppercase tracking-widest">Cargando colección…</span>
                </div>
              ) : (
                <>
                  <div className={`grid grid-cols-2 gap-x-6 gap-y-12 transition-opacity md:grid-cols-3 xl:grid-cols-4 ${loading ? "opacity-45" : "opacity-100"}`}>
                    {products.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={loadProductDetails}
                        opening={openingProductId === product.id}
                        priority={index < 4}
                      />
                    ))}
                  </div>
                  {loading && (
                    <div className="absolute inset-x-0 top-8 flex justify-center" role="status">
                      <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 shadow-lg">
                        <Loader2 className="animate-spin" size={14} aria-hidden="true" />
                        Actualizando…
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            {!loading && hasMoreProducts && (
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={loadMoreProducts}
                  disabled={loadingMore}
                  aria-label={`Cargar más puertas. Mostrando ${products.length} de ${totalProducts}`}
                  className="inline-flex min-w-48 items-center justify-center gap-2 border border-black bg-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-60"
                >
                  {loadingMore && <Loader2 className="animate-spin" size={14} aria-hidden="true" />}
                  {loadingMore ? "Cargando…" : `Ver más (${products.length} de ${totalProducts})`}
                </button>
              </div>
            )}

            {!loading && products.length === 0 && (
              <div className="py-24 text-center text-sm uppercase text-gray-300">
                Sin resultados.
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mx-auto mt-2 block text-black underline"
                  >
                    Limpiar búsqueda
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          loadingDetails={loadingProductDetails}
          onClose={closeProduct}
        />
      )}

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur lg:hidden">
          <div
            ref={mobileFilterRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filter-title"
            tabIndex={-1}
            className="w-full max-w-sm space-y-4 rounded bg-white p-6"
          >
            <div className="flex justify-between border-b pb-4">
              <span id="mobile-filter-title" className="text-sm font-bold uppercase tracking-widest">
                Categorías
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar filtros"
                className="rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto">
              <button
                type="button"
                onClick={() => {
                  handleCategoryChange("TODAS");
                  setIsMobileMenuOpen(false);
                }}
                className="border-b py-3 text-left text-xs font-bold uppercase"
              >
                Ver Todo
              </button>
              {CATEGORIAS.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => {
                    handleCategoryChange(category);
                    setIsMobileMenuOpen(false);
                  }}
                  className="border-b py-3 text-left text-xs font-bold uppercase"
                >
                  {category}
                </button>
              ))}
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setIsInteriorOpen((current) => !current)}
                  aria-expanded={isInteriorOpen}
                  className={`flex w-full items-center justify-between border-b py-3 text-left text-xs font-bold uppercase ${
                    CATEGORIAS_INTERIOR.includes(activeCategory) ? "text-black" : "text-gray-600"
                  }`}
                >
                  <span>Puertas Interior</span>
                  <ChevronRight
                    size={14}
                    aria-hidden="true"
                    className={`transition-transform duration-300 ${isInteriorOpen ? "rotate-90" : ""}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isInteriorOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="ml-4 flex flex-col border-l-2 border-gray-200">
                    {CATEGORIAS_INTERIOR.map((category) => (
                      <button
                        type="button"
                        key={category}
                        onClick={() => {
                          handleCategoryChange(category);
                          setIsMobileMenuOpen(false);
                        }}
                        className="py-2 pl-3 text-left text-[11px] font-semibold uppercase text-gray-600 hover:text-black"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
