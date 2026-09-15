// Run after generating the optimized catalog assets:
// node scripts/test-door-image-paths.cjs
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");
const PUBLIC_ROOT = path.join(ROOT, "public");
const OPTIMIZED_EXTENSION = "optimized.webp";
const FINISHES = [
  "negro", "wengue", "gris-oscuro", "antracita", "nogal",
  "roble", "gris-claro", "natural", "blanco",
];
const DIRECT_REFERENCE_FILES = [
  ["app/page.js", 3],
  ["app/puertas/layout.js", 1],
  ["components/doors/InteriorShowcase.jsx", 2],
  ["components/doors/WLJ001ProductExperience.jsx", 9],
];

function loadImageHelpers() {
  const filename = path.join(ROOT, "lib", "door-image-assets.js");
  // The application module is ESM in a CommonJS package. Evaluate this
  // dependency-free module without changing its source or the package type.
  const source = fs.readFileSync(filename, "utf8")
    .replace(/^export const /gm, "const ");
  const context = {};
  vm.runInNewContext(`${source}\nglobalThis.helpers = {
    bases: [...LOGO_FREE_BASE_IMAGE_PATHS],
    variantDirectories: [...LOGO_FREE_VARIANT_DIRECTORIES],
    wallpapers: [...LOGO_FREE_WALLPAPER_SLUGS],
    getLogoFreeDoorImagePath,
    getDoorVariantExtension,
    getDoorWallpaperExtension,
  };`, context, { filename, timeout: 1000 });
  return context.helpers;
}

function assertOptimizedAssetExists(assetPath) {
  assert.ok(assetPath.startsWith("/images/PUERTAS/"), assetPath);
  assert.ok(assetPath.endsWith(`.${OPTIMIZED_EXTENSION}`), assetPath);
  const filePath = path.resolve(PUBLIC_ROOT, assetPath.slice(1));
  const relativePath = path.relative(PUBLIC_ROOT, filePath);
  assert.ok(!relativePath.startsWith("..") && !path.isAbsolute(relativePath), assetPath);
  assert.ok(fs.existsSync(filePath), `Missing optimized asset: ${assetPath}`);
  const stat = fs.statSync(filePath);
  assert.ok(stat.isFile() && stat.size > 0, `Empty or invalid asset: ${assetPath}`);
}

function testHelperPaths(helpers) {
  const paths = [];
  for (const base of helpers.bases) {
    const expected = base.replace(/\.webp$/i, `.${OPTIMIZED_EXTENSION}`);
    const actual = helpers.getLogoFreeDoorImagePath(base);
    assert.equal(actual, expected, `Base display mapping: ${base}`);
    paths.push(actual);

    const query = "?v=logo-free&width=640&name=a%2Fb";
    assert.equal(helpers.getLogoFreeDoorImagePath(`${base}${query}`), `${expected}${query}`);
    assert.equal(helpers.getLogoFreeDoorImagePath(`${actual}${query}`), `${actual}${query}`);
  }

  for (const directory of helpers.variantDirectories) {
    const parent = path.posix.dirname(directory);
    const slug = path.posix.basename(directory);
    const extension = helpers.getDoorVariantExtension(parent, slug);
    assert.equal(extension, OPTIMIZED_EXTENSION, `Variant extension: ${directory}`);
    for (const finish of FINISHES) {
      paths.push(`${directory}/door-${slug}-${finish}-ai.${extension}`);
    }
  }

  for (const slug of helpers.wallpapers) {
    const extension = helpers.getDoorWallpaperExtension(slug);
    assert.equal(extension, OPTIMIZED_EXTENSION, `Wallpaper extension: ${slug}`);
    paths.push(`/images/PUERTAS/WALLPAPER/${slug}.${extension}`);
  }

  assert.equal(new Set(paths).size, paths.length, "Helper paths must be unique");
  for (const assetPath of paths) assertOptimizedAssetExists(assetPath);

  const unchangedPaths = [
    "",
    "/images/madera.png",
    "/images/PUERTAS/AI/not-listed.webp?v=1",
    "/images/PUERTAS/AI/door-x60-pro.png?legacy=1",
    "/images/PUERTAS/WALLPAPER/2026/collection-2026.webp",
    "https://example.com/images/PUERTAS/AI/door-x60-pro.webp",
  ];
  for (const imagePath of unchangedPaths) {
    assert.equal(helpers.getLogoFreeDoorImagePath(imagePath), imagePath);
  }
  assert.equal(helpers.getLogoFreeDoorImagePath(), "");
  assert.equal(helpers.getDoorVariantExtension("/images/PUERTAS/AI", "not-listed"), "webp");
  assert.equal(helpers.getDoorWallpaperExtension("not-listed"), "webp");
  return paths;
}

function testDirectReferences() {
  const paths = [];
  for (const [filename, expectedCount] of DIRECT_REFERENCE_FILES) {
    const source = fs.readFileSync(path.join(ROOT, filename), "utf8");
    const assetRoot = source.match(/const ASSET_ROOT = "([^"]+)"/)?.[1];
    const references = [...source.matchAll(/["`]([^"`]*\.optimized\.webp)["`]/g)]
      .map((match) => match[1].replace("${ASSET_ROOT}", assetRoot || ""));
    assert.equal(references.length, expectedCount, `Optimized references in ${filename}`);
    for (const assetPath of references) {
      assert.ok(!assetPath.includes("${"), `Unresolved asset reference in ${filename}`);
      assertOptimizedAssetExists(assetPath);
      paths.push(assetPath);
    }
  }
  return paths;
}

async function testLegacyRewrite(assetPaths) {
  const config = require(path.join(ROOT, "next.config.js"));
  const rules = await config.rewrites();
  assert.ok(Array.isArray(rules), "Legacy rewrite must run after filesystem matching");
  const rule = rules.find((candidate) => candidate.source === "/images/PUERTAS/:path*\\.png");
  assert.ok(rule, "Missing legacy door PNG rewrite");
  assert.equal(rule.destination, "/images/PUERTAS/:path*.optimized.webp");

  const { getPathMatch } = require("next/dist/shared/lib/router/utils/path-match");
  const match = getPathMatch(rule.source, { strict: true });
  const legacyPaths = new Set(assetPaths.map((assetPath) => assetPath.replace(/\.optimized\.webp$/, ".png")));
  for (const legacyPath of legacyPaths) {
    assert.ok(match(legacyPath), `Legacy rewrite does not match: ${legacyPath}`);
    assert.ok(match(encodeURI(legacyPath)), `Encoded legacy rewrite does not match: ${legacyPath}`);
  }
  for (const assetPath of [
    "/images/madera.png",
    "/images/PUERTAS/AI/door-x60-pro.webp",
    "/images/PUERTAS/AI/door-x60-pro.optimized.webp",
    "/images/PUERTAS/AI/door-x60-proXpng",
  ]) {
    assert.equal(match(assetPath), false, `Rewrite must not match: ${assetPath}`);
  }
  return legacyPaths.size;
}

async function main() {
  const helpers = loadImageHelpers();
  const helperPaths = testHelperPaths(helpers);
  const directPaths = testDirectReferences();
  const legacyPaths = await testLegacyRewrite([...helperPaths, ...directPaths]);
  console.log(`Verified ${helperPaths.length} helper assets and ${directPaths.length} direct image references.`);
  console.log(`Verified query preservation, passthrough, and ${legacyPaths} legacy PNG rewrite paths (plain and encoded).`);
}

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exitCode = 1;
});
