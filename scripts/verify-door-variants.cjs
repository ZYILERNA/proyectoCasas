const fs = require("node:fs");
const path = require("node:path");

const sharpModule = process.env.DOOR_VARIANT_SHARP || "sharp";
// eslint-disable-next-line import/no-dynamic-require, global-require
const sharp = require(sharpModule);

const ROOT = path.resolve("public/images/PUERTAS");
const VERIFY_TEMPORARY = process.argv.slice(2).includes("--temporary");
const FINISHES = Object.freeze([
  "negro",
  "wengue",
  "gris-oscuro",
  "antracita",
  "nogal",
  "roble",
  "gris-claro",
  "natural",
  "blanco",
]);

function discoverModels() {
  const models = [];
  for (const category of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (!category.isDirectory()) continue;
    const categoryPath = path.join(ROOT, category.name);
    for (const model of fs.readdirSync(categoryPath, { withFileTypes: true })) {
      if (!model.isDirectory()) continue;
      const modelPath = path.join(categoryPath, model.name);
      if (fs.existsSync(path.join(modelPath, "original.webp"))) models.push(modelPath);
    }
  }
  return models.sort((left, right) => left.localeCompare(right, "es"));
}

async function verifyModel(modelPath) {
  const category = path.basename(path.dirname(modelPath));
  const slug = path.basename(modelPath);
  const label = `${category}/${slug}`;
  const originalPath = path.join(modelPath, "original.webp");
  const original = await sharp(originalPath).metadata();
  const errors = [];

  if (original.format !== "webp" || !original.width || !original.height) {
    errors.push(`${label}: original.webp is not a readable WebP image`);
    return errors;
  }

  const expectedNames = new Set(FINISHES.map(
    (finish) => `door-${slug}-${finish}-ai.webp`,
  ));
  const existingWebp = fs.readdirSync(modelPath)
    .filter((name) => /^door-.*-ai\.webp$/i.test(name));
  for (const extra of existingWebp.filter((name) => !expectedNames.has(name))) {
    errors.push(`${label}: unexpected WebP file ${extra}`);
  }

  await Promise.all([...expectedNames].map(async (name) => {
    const variantPath = path.join(modelPath, VERIFY_TEMPORARY ? `${name}.tmp` : name);
    if (!fs.existsSync(variantPath)) {
      errors.push(`${label}: missing ${name}`);
      return;
    }
    try {
      const metadata = await sharp(variantPath).metadata();
      if (metadata.format !== "webp") {
        errors.push(`${label}: ${name} has format ${metadata.format || "unknown"}`);
      }
      if (metadata.width !== original.width || metadata.height !== original.height) {
        errors.push(
          `${label}: ${name} is ${metadata.width}x${metadata.height}; `
          + `expected ${original.width}x${original.height}`,
        );
      }
    } catch (error) {
      errors.push(`${label}: ${name} is unreadable (${error.message})`);
    }
  }));

  return errors;
}

async function main() {
  const models = discoverModels();
  const errors = [];
  for (let index = 0; index < models.length; index += 1) {
    errors.push(...await verifyModel(models[index]));
    if ((index + 1) % 25 === 0 || index + 1 === models.length) {
      console.log(`Checked ${index + 1}/${models.length} model folders`);
    }
  }

  if (errors.length) {
    console.error(`\nVerification failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(
    `\nVerified ${models.length} models and ${models.length * FINISHES.length} `
    + `${VERIFY_TEMPORARY ? "temporary replacements" : "variants"}.`,
  );
  console.log("Every variant is a readable WebP and matches its original dimensions.");
}

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exit(1);
});
