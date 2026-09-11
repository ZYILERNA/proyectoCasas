'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Heart, Search, SlidersHorizontal, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { furnitureCollections } from '../../lib/furniture-collections';
import { SHOW_FURNITURE_PRICES } from '../../lib/furniture-settings';
import { getFurnitureCategoryLabel } from '../../lib/furniture-labels';
import { getProductColors, getProductMaterials } from './furniture-filters';
import FurnitureProductCard from './FurnitureProductCard';
import FurnitureProductDrawer from './FurnitureProductDrawer';
import FurnitureComparison, { FurnitureCompareTray } from './FurnitureComparison';
import useFurnitureFavorites from './useFurnitureFavorites';
import { getFurnitureProductId } from '../../lib/furniture-favorites';
import styles from './FurnitureCollection.module.css';

const PAGE_SIZE = 24;
const collator = new Intl.Collator('es', { sensitivity: 'base', numeric: true });
const normalize = (value) => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const COLOR_TONES = { Amarillo: '#d7b95b', Azul: '#657d91', Beige: '#d5c7b0', Blanco: '#fffdf8', Dorado: '#aa8950', Gris: '#92958e', Marrón: '#8d6650', Naranja: '#c88352', Negro: '#30322e', Rojo: '#a45349', Rosa: '#c59a9b', Topo: '#a59887', Verde: '#7c8864', Morado: '#938097', Terracota: '#b86e52', Plateado: 'linear-gradient(135deg, #a5aaa5, #f0f1ec, #a5aaa5)', Transparente: 'repeating-linear-gradient(135deg, #fffdf8 0 5px, #e2e5dc 5px 10px)', Multicolor: 'conic-gradient(#a45349, #d7b95b, #7c8864, #657d91, #a45349)' };

export default function FurnitureCollection({ collection }) {
  return <CollectionContent key={collection} collection={collection} />;
}

function CollectionContent({ collection }) {
  const config = furnitureCollections[collection];
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [sort, setSort] = useState('selection');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [missingProduct, setMissingProduct] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [allColors, setAllColors] = useState(false);
  const [comparedProducts, setComparedProducts] = useState([]);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const { favoriteIds, isReady: favoritesReady, toggleFavorite } = useFurnitureFavorites(collection);
  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);
  const comparedSet = useMemo(() => new Set(comparedProducts.map(getFurnitureProductId)), [comparedProducts]);
  const favoriteCount = products.filter((product) => favoriteSet.has(getFurnitureProductId(product))).length;
  const collectionLinksRef = useRef(null);
  const resultsRef = useRef(null);
  const openedFromComparisonRef = useRef(false);

  const handleFavoriteToggle = (product) => {
    const restoreFocus = favoritesOnly && favoriteSet.has(getFurnitureProductId(product));
    const card = restoreFocus ? document.activeElement?.closest('article') : null;
    const nextButton = (card?.nextElementSibling || card?.previousElementSibling)?.querySelector('button');
    toggleFavorite(product);
    if (restoreFocus) requestAnimationFrame(() => {
      const target = nextButton?.isConnected ? nextButton : resultsRef.current?.querySelector('button');
      target?.focus({ preventScroll: true });
    });
  };

  const removeComparedProduct = (product) => setComparedProducts((previous) => previous.filter((item) => getFurnitureProductId(item) !== getFurnitureProductId(product)));
  const toggleCompare = (product) => setComparedProducts((previous) => {
    const id = getFurnitureProductId(product);
    if (previous.some((item) => getFurnitureProductId(item) === id)) return previous.filter((item) => getFurnitureProductId(item) !== id);
    return previous.length < 3 ? [...previous, product] : previous;
  });
  const openComparedProduct = (product) => { openedFromComparisonRef.current = true; setComparisonOpen(false); setSelectedProduct(product); };
  const closeProduct = () => {
    setSelectedProduct(null);
    if (openedFromComparisonRef.current) requestAnimationFrame(() => document.querySelector('[data-furniture-compare-open="true"]:not([disabled])')?.focus({ preventScroll: true }));
    openedFromComparisonRef.current = false;
  };

  useEffect(() => {
    const nav = collectionLinksRef.current;
    const current = nav?.querySelector('[aria-current="page"]');
    if (current) nav.scrollLeft = current.offsetLeft - nav.offsetLeft - (nav.clientWidth - current.clientWidth) / 2;
  }, [collection]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    async function fetchProducts() {
      setIsLoading(true);
      setLoadError(false);
      try {
        const { data, error } = await supabase.from(collection).select('*')
          .order('id', { ascending: true }).abortSignal(controller.signal);
        if (error) throw error;
        if (active) setProducts(data || []);
      } catch {
        if (active && !controller.signal.aborted) setLoadError(true);
      } finally {
        if (active) setIsLoading(false);
      }
    }
    fetchProducts();
    return () => { active = false; controller.abort(); };
  }, [collection, retry]);

  const indexedProducts = useMemo(() => products.map((product) => ({
    product,
    colors: getProductColors(product),
    materials: getProductMaterials(product),
    searchText: normalize([product.name, product.code, product.category, getFurnitureCategoryLabel(product.category)].join(' ')),
  })), [products]);

  const choices = useMemo(() => ({
    categories: [...new Set(products.map((product) => product.category).filter(Boolean))].sort((a, b) => collator.compare(getFurnitureCategoryLabel(a), getFurnitureCategoryLabel(b))),
    colors: [...new Set(indexedProducts.flatMap((entry) => entry.colors))].sort(collator.compare),
    materials: [...new Set(indexedProducts.flatMap((entry) => entry.materials))].sort(collator.compare),
  }), [products, indexedProducts]);

  const filtered = useMemo(() => {
    const query = normalize(search);
    const result = indexedProducts.filter(({ product, colors, materials, searchText }) => {
      if (category !== 'Todos' && product.category !== category) return false;
      if (color && !colors.includes(color)) return false;
      if (material && !materials.includes(material)) return false;
      if (favoritesOnly && !favoriteSet.has(getFurnitureProductId(product))) return false;
      return !query || searchText.includes(query);
    }).map(({ product }) => product);
    if (sort === 'name') result.sort((a, b) => collator.compare(a.name || '', b.name || ''));
    if (SHOW_FURNITURE_PRICES && (sort === 'price-asc' || sort === 'price-desc')) {
      result.sort((a, b) => {
        const left = Number(a.priceBase), right = Number(b.priceBase);
        const leftValid = Number.isFinite(left) && left > 0;
        const rightValid = Number.isFinite(right) && right > 0;
        if (!leftValid || !rightValid) return Number(rightValid) - Number(leftValid);
        return sort === 'price-asc' ? left - right : right - left;
      });
    }
    return result;
  }, [indexedProducts, search, category, color, material, sort, favoritesOnly, favoriteSet]);

  const palette = useMemo(() => {
    const counts = new Map();
    const query = normalize(search);
    indexedProducts.forEach(({ product, colors, materials, searchText }) => {
      if (category !== 'Todos' && product.category !== category) return;
      if (material && !materials.includes(material)) return;
      if (favoritesOnly && !favoriteSet.has(getFurnitureProductId(product))) return;
      if (query && !searchText.includes(query)) return;
      colors.forEach((name) => counts.set(name, (counts.get(name) || 0) + 1));
    });
    return choices.colors.map((name) => ({ name, count: counts.get(name) || 0 }))
      .sort((a, b) => b.count - a.count || collator.compare(a.name, b.name));
  }, [indexedProducts, choices.colors, search, category, material, favoritesOnly, favoriteSet]);
  const visiblePalette = allColors ? palette : palette.filter((item, index) => index < 6 || item.name === color);

  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [search, category, color, material, sort, favoritesOnly]);

  const activeCount = Number(category !== 'Todos') + Number(Boolean(color)) + Number(Boolean(material));
  const hasFilters = activeCount > 0 || Boolean(search) || favoritesOnly;
  const resetFilters = () => { setSearch(''); setCategory('Todos'); setColor(''); setMaterial(''); setFavoritesOnly(false); };
  const contactHref = `/contacto?${new URLSearchParams({ categoria: 'Mobiliario', coleccion: config.label })}`;

  return (
    <main className={`${styles.page} ${comparedProducts.length ? styles.withComparison : ''}`}>
      <Suspense fallback={null}>
        <ProductDeepLink products={products} isLoading={isLoading} loadError={loadError} onSelect={setSelectedProduct} onMissing={setMissingProduct} />
      </Suspense>
      <FurnitureProductDrawer product={selectedProduct} onClose={closeProduct} />
      {comparisonOpen && <FurnitureComparison products={comparedProducts} onClose={() => setComparisonOpen(false)} onSelect={openComparedProduct} onRemove={removeComparedProduct} />}
      <div hidden={Boolean(selectedProduct) || comparisonOpen}>
        <FurnitureCompareTray products={comparedProducts} onRemove={removeComparedProduct} onClear={() => setComparedProducts([])} onOpen={() => setComparisonOpen(true)} />
      </div>

      <div className={styles.headerSpace} aria-hidden="true" />
      <nav className={styles.collectionNav} aria-label="Colecciones de mobiliario">
        <Link href="/" className={styles.collectionBrand}>WONLY <span>Interiores</span></Link>
        <div className={styles.collectionLinks} ref={collectionLinksRef}>
          {Object.entries(furnitureCollections).map(([key, item]) => (
            <Link key={key} href={`/${key}`} aria-current={key === collection ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <section className={styles.hero} aria-labelledby="collection-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>La colección <span>— {config.number} / 05</span></p>
          <h1 id="collection-title">{config.label}</h1>
          <p className={styles.heroHeadline}>{config.headline}</p>
          <p className={styles.heroDescription}>{config.description}</p>
          <a href="#coleccion" className={styles.primaryLink}>Explorar colección <ArrowDown size={17} aria-hidden="true" /></a>
          <p className={styles.heroFootnote}>Diseño para tu forma de vivir.</p>
        </div>
        <div className={styles.heroVisual}>
          <Image src={config.image} alt={config.imageAlt} fill priority sizes="(max-width: 760px) 100vw, 58vw" className={styles.heroImage} />
          <div className={styles.heroCaption}><span>{config.caption}</span><span aria-hidden="true">W / {config.number}</span></div>
        </div>
      </section>

      <section id="coleccion" className={styles.catalog} aria-labelledby="catalog-title">
        <div className={styles.catalogIntro}>
          <div><p className={styles.eyebrow}>Encuentra tu pieza</p><h2 id="catalog-title">Hecho para tu espacio.</h2></div>
          <p>{config.note}</p>
        </div>

        {!isLoading && !loadError && palette.length > 0 && <section className={styles.colorDiscovery} aria-label="Explorar por color">
          <div className={styles.discoveryHeading}><p className={styles.eyebrow}>Dale tu toque</p><h3>Empieza por un color.</h3><p>Descubre las piezas que encajan contigo.</p></div>
          <div className={styles.paletteArea}>
            <div className={styles.palette} role="group" aria-label="Colores de la colección">
              {visiblePalette.map(({ name, count }) => <button type="button" key={name} className={styles.colorChoice} aria-pressed={color === name} disabled={!count && color !== name} onClick={() => setColor((previous) => previous === name ? '' : name)} aria-label={`${color === name ? 'Quitar color' : 'Explorar color'} ${name}, ${count} ${count === 1 ? 'pieza' : 'piezas'}`}>
                <span className={styles.colorDisc} style={{ background: COLOR_TONES[name] || '#c6c4b9' }}>{color === name && <Check size={15} aria-hidden="true" />}</span><span>{name}</span><span className={styles.colorCount}>{count}</span>
              </button>)}
            </div>
            {palette.length > 6 && <button type="button" className={styles.moreColors} aria-expanded={allColors} onClick={() => setAllColors((open) => !open)}>{allColors ? 'Mostrar menos colores' : 'Ver todos los colores'}<ChevronDown size={14} className={allColors ? styles.rotated : ''} aria-hidden="true" /></button>}
          </div>
        </section>}

        <div className={styles.selectionTools}>
          <p>Guarda tus favoritos y compara hasta 3 piezas.</p>
          <button type="button" className={styles.favoritesToggle} onClick={() => setFavoritesOnly((value) => !value)} aria-pressed={favoritesOnly} disabled={!favoritesReady || isLoading}>
            <Heart size={16} fill={favoritesOnly ? 'currentColor' : 'none'} aria-hidden="true" /> Mis favoritos <span>{favoriteCount}</span>
          </button>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.toolbarMain}>
            <label className={styles.search}>
              <Search size={18} aria-hidden="true" />
              <span className={styles.srOnly}>Buscar en {config.label}</span>
              <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nombre, modelo o referencia" />
            </label>
            <div className={styles.toolbarActions}>
              <button type="button" className={styles.filterToggle} aria-expanded={filtersOpen} aria-controls="collection-filters" onClick={() => setFiltersOpen((open) => !open)}>
                <SlidersHorizontal size={16} aria-hidden="true" /> Filtros {activeCount > 0 && <span className={styles.filterBadge}>{activeCount}</span>}
                <ChevronDown size={14} className={filtersOpen ? styles.rotated : ''} aria-hidden="true" />
              </button>
              <label className={styles.sort}>
                <span className={styles.srOnly}>Ordenar productos</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="selection">Selección WONLY</option>
                  <option value="name">Nombre: A–Z</option>
                  {SHOW_FURNITURE_PRICES && <option value="price-asc">Precio: menor a mayor</option>}
                  {SHOW_FURNITURE_PRICES && <option value="price-desc">Precio: mayor a menor</option>}
                </select>
                <ChevronDown size={14} aria-hidden="true" />
              </label>
            </div>
          </div>
          <div id="collection-filters" className={styles.filterPanel} hidden={!filtersOpen}>
            <FilterSelect label="Tipo de pieza" value={category} onChange={setCategory} allLabel="Todos los tipos" allValue="Todos" values={choices.categories} getLabel={getFurnitureCategoryLabel} />
            <FilterSelect label="Color" value={color} onChange={setColor} allLabel="Todos los colores" values={choices.colors} />
            <FilterSelect label="Material" value={material} onChange={setMaterial} allLabel="Todos los materiales" values={choices.materials} />
            <button type="button" onClick={resetFilters} disabled={!hasFilters} className={styles.resetFilters}>Restablecer filtros</button>
          </div>
          <div className={styles.categoryRow}>
            <div className={styles.categories} aria-label="Filtrar por tipo">
              {['Todos', ...choices.categories].map((value) => (
                <button type="button" key={value} onClick={() => setCategory(value)} aria-pressed={category === value}>
                  {category === value && <Check size={13} aria-hidden="true" />}{value === 'Todos' ? 'Ver todo' : getFurnitureCategoryLabel(value)}
                </button>
              ))}
            </div>
            <p className={styles.count} role="status">{isLoading ? 'Cargando colección…' : loadError ? 'Colección no disponible' : `${filtered.length} pieza${filtered.length !== 1 ? 's' : ''}`}</p>
          </div>
          {(color || material) && <div className={styles.appliedFilters}>
            {color && <button type="button" onClick={() => setColor('')} aria-label={`Quitar filtro de color ${color}`}>{color}<X size={13} aria-hidden="true" /></button>}
            {material && <button type="button" onClick={() => setMaterial('')} aria-label={`Quitar filtro de material ${material}`}>{material}<X size={13} aria-hidden="true" /></button>}
          </div>}
        </div>

        {missingProduct && <p className={styles.notice} role="status">Ese modelo no está disponible. Puedes descubrir el resto de la colección a continuación.</p>}
        <div className={styles.results} ref={resultsRef} aria-busy={isLoading}>
          {isLoading ? <div className={styles.grid} aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <div className={styles.skeleton} key={index}><div /><span /><span /></div>)}</div>
            : loadError ? <div className={styles.empty} role="alert"><p className={styles.eyebrow}>Un momento</p><h3>No hemos podido cargar la colección.</h3><p>Vuelve a intentarlo para ver los modelos y sus acabados.</p><button type="button" className={styles.primaryLink} onClick={() => setRetry((value) => value + 1)}>Volver a cargar <ArrowRight size={16} aria-hidden="true" /></button></div>
              : filtered.length === 0 ? <div className={styles.empty}>{favoritesOnly ? <Heart size={28} aria-hidden="true" /> : <Search size={28} aria-hidden="true" />}<h3>{favoritesOnly && favoriteCount === 0 ? 'Aquí empieza tu selección.' : hasFilters ? 'Todavía no encontramos esa pieza.' : 'Estamos preparando esta colección.'}</h3><p>{favoritesOnly && favoriteCount === 0 ? `Pulsa el corazón de las piezas de ${config.label.toLowerCase()} que te gusten. Las encontrarás aquí cuando vuelvas desde este navegador.` : hasFilters ? 'Prueba otro nombre o ajusta los filtros para descubrir más opciones.' : 'Contacta con nuestro equipo para conocer los modelos disponibles.'}</p>{hasFilters ? <button type="button" className={styles.primaryLink} onClick={resetFilters}>Ver toda la colección <ArrowRight size={16} aria-hidden="true" /></button> : <Link href={contactHref} className={styles.primaryLink}>Consultar colección <ArrowRight size={16} aria-hidden="true" /></Link>}</div>
                : <>
                  <div className={styles.grid}>{filtered.slice(0, visibleCount).map((product, index) => <FurnitureProductCard key={getFurnitureProductId(product)} product={product} index={index} onSelect={setSelectedProduct} fallbackImage={config.image} isFavorite={favoriteSet.has(getFurnitureProductId(product))} onToggleFavorite={handleFavoriteToggle} isCompared={comparedSet.has(getFurnitureProductId(product))} onToggleCompare={toggleCompare} compareDisabled={comparedProducts.length >= 3} />)}</div>
                  <div className={styles.pagination}>
                    <p>Has visto {Math.min(visibleCount, filtered.length)} de {filtered.length} piezas</p>
                    <div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${Math.min(visibleCount / filtered.length, 1) * 100}%` }} /></div>
                    {visibleCount < filtered.length && <button type="button" onClick={() => {
                      const nextIndex = visibleCount;
                      setVisibleCount((value) => value + PAGE_SIZE);
                      // Keep keyboard navigation beside the newly revealed products.
                      requestAnimationFrame(() => {
                        const firstNewCard = document.querySelectorAll(`.${styles.grid} > *`)[nextIndex];
                        firstNewCard?.querySelector('button')?.focus({ preventScroll: true });
                      });
                    }} className={styles.outlineLink}>Descubrir más piezas <ArrowDown size={16} aria-hidden="true" /></button>}
                    {SHOW_FURNITURE_PRICES && <p className={styles.priceNote}>Los precios en euros son orientativos. Consulta el detalle de cada modelo.</p>}
                  </div>
                </>}
        </div>
      </section>

      <section className={styles.advice} aria-labelledby="advice-title">
        <div className={styles.adviceNumber} aria-hidden="true">W.</div>
        <div><p className={styles.eyebrow}>A tu manera</p><h2 id="advice-title">Tu hogar empieza<br />con una buena elección.</h2></div>
        <div className={styles.adviceCopy}><p>{config.advice}</p><Link href={contactHref}>Hablemos de tu espacio <ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      </section>

      <section className={styles.related} aria-labelledby="related-title">
        <div className={styles.relatedHeading}><div><p className={styles.eyebrow}>Una casa, muchas posibilidades</p><h2 id="related-title">Sigue imaginando.</h2></div><span>Explora nuestras colecciones <ArrowRight size={17} aria-hidden="true" /></span></div>
        <div className={styles.relatedGrid}>{config.related.map((key) => {
          const item = furnitureCollections[key];
          return <Link href={`/${key}`} key={key} className={styles.relatedCard}><div><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 600px) 86vw, 33vw" /></div><span><span>{item.label}</span><ArrowUpRight size={22} aria-hidden="true" /></span></Link>;
        })}</div>
      </section>
    </main>
  );
}

// Only URL-dependent behaviour waits for hydration; the collection is rendered
// by the server so its heading, imagery and navigation are available immediately.
function ProductDeepLink({ products, isLoading, loadError, onSelect, onMissing }) {
  const searchParams = useSearchParams();
  const requestedProduct = searchParams.get('producto');
  const openedQuery = useRef(null);

  useEffect(() => {
    if (!requestedProduct) {
      if (openedQuery.current !== null) onSelect(null);
      openedQuery.current = null;
      onMissing(false);
      return;
    }
    if (isLoading || loadError || openedQuery.current === requestedProduct) return;
    const found = products.find((product) =>
      [product.name, product.code, product.id].some((value) => normalize(value) === normalize(requestedProduct)));
    openedQuery.current = requestedProduct;
    onMissing(!found);
    onSelect(found || null);
  }, [requestedProduct, products, isLoading, loadError, onSelect, onMissing]);

  return null;
}

function FilterSelect({ label, value, onChange, allLabel, allValue = '', values, getLabel = (option) => option }) {
  return <label className={styles.filterSelect}><span>{label}</span><div><select value={value} onChange={(event) => onChange(event.target.value)}><option value={allValue}>{allLabel}</option>{values.map((option) => <option key={option} value={option}>{getLabel(option)}</option>)}</select><ChevronDown size={15} aria-hidden="true" /></div></label>;
}
