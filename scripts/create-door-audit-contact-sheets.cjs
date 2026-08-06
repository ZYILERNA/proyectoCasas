#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const sharpModulePath = process.env.DOOR_VARIANT_SHARP;

if (!sharpModulePath) {
  throw new Error(
    'Set DOOR_VARIANT_SHARP to the bundled Sharp module directory before running this script.',
  );
}

const sharp = require(sharpModulePath);

function parseArguments(argv) {
  const options = {
    inputRoot: path.resolve('tmp/door-variant-repair-audit'),
    outputRoot: path.resolve('tmp/door-variant-repair-contact-sheets'),
    columns: 5,
    cellWidth: 360,
    cellHeight: 460,
    finish: 'roble',
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const value = argv[index + 1];

    if (argument === '--input-root' && value) {
      options.inputRoot = path.resolve(value);
      index += 1;
    } else if (argument === '--output-root' && value) {
      options.outputRoot = path.resolve(value);
      index += 1;
    } else if (argument === '--columns' && value) {
      options.columns = Number.parseInt(value, 10);
      index += 1;
    } else if (argument === '--cell-width' && value) {
      options.cellWidth = Number.parseInt(value, 10);
      index += 1;
    } else if (argument === '--cell-height' && value) {
      options.cellHeight = Number.parseInt(value, 10);
      index += 1;
    } else if (argument === '--finish' && value) {
      options.finish = value.toLowerCase();
      index += 1;
    } else {
      throw new Error(`Unknown or incomplete argument: ${argument}`);
    }
  }

  for (const [name, number] of Object.entries({
    columns: options.columns,
    cellWidth: options.cellWidth,
    cellHeight: options.cellHeight,
  })) {
    if (!Number.isInteger(number) || number <= 0) {
      throw new Error(`${name} must be a positive integer.`);
    }
  }

  return options;
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function splitLabel(slug, preferredLength = 31) {
  if (slug.length <= preferredLength) {
    return [slug];
  }

  const parts = slug.split('-');
  const lines = [];
  let current = '';

  for (const part of parts) {
    const candidate = current ? `${current}-${part}` : part;
    if (candidate.length <= preferredLength || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = part;
    }
  }

  if (current) {
    lines.push(current);
  }

  if (lines.length <= 2) {
    return lines;
  }

  return [lines[0], lines.slice(1).join('-')];
}

function findFinishPreview(modelDirectory, slug, finish) {
  const preferredNames = [
    `door-${slug}-${finish}.webp`,
    `door-${slug}-${finish}-ai.webp`,
  ];

  for (const name of preferredNames) {
    const candidate = path.join(modelDirectory, name);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  const fallback = fs
    .readdirSync(modelDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile()
      && entry.name.toLowerCase().endsWith(`-${finish}-ai.webp`))
    .map((entry) => path.join(modelDirectory, entry.name));

  return fallback.length === 1 ? fallback[0] : null;
}

function collectCategories(inputRoot, finish) {
  if (!fs.existsSync(inputRoot)) {
    throw new Error(`Audit input directory does not exist: ${inputRoot}`);
  }

  return fs
    .readdirSync(inputRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name, 'es'))
    .map((categoryEntry) => {
      const categoryPath = path.join(inputRoot, categoryEntry.name);
      const models = fs
        .readdirSync(categoryPath, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .sort((left, right) => left.name.localeCompare(right.name, 'es'))
        .map((modelEntry) => ({
          slug: modelEntry.name,
          source: findFinishPreview(
            path.join(categoryPath, modelEntry.name),
            modelEntry.name,
            finish,
          ),
        }));

      const missing = models.filter((model) => !model.source);
      if (missing.length > 0) {
        throw new Error(
          `Missing ${finish} preview for ${categoryEntry.name}: ${missing
            .map((model) => model.slug)
            .join(', ')}`,
        );
      }

      return {
        name: categoryEntry.name,
        models,
      };
    })
    .filter((category) => category.models.length > 0);
}

function createLayoutSvg({
  category,
  finishLabel,
  models,
  columns,
  cellWidth,
  cellHeight,
  headerHeight,
  padding,
  imageWidth,
  imageHeight,
  sheetWidth,
  sheetHeight,
}) {
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${sheetWidth}" height="${sheetHeight}">`,
    '<rect width="100%" height="100%" fill="#d9dad7"/>',
    `<rect width="100%" height="${headerHeight}" fill="#24272b"/>`,
    `<text x="${sheetWidth / 2}" y="37" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="28" font-weight="700">${escapeXml(category)} · ${escapeXml(finishLabel)}</text>`,
    `<text x="${sheetWidth / 2}" y="61" text-anchor="middle" fill="#c9cdd2" font-family="Arial, sans-serif" font-size="15">${models.length} modelos · imagen completa sin recorte</text>`,
  ];

  models.forEach((model, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const cellX = column * cellWidth;
    const cellY = headerHeight + row * cellHeight;
    const imageX = cellX + padding;
    const imageY = cellY + padding;
    const labelLines = splitLabel(model.slug);
    const longestLine = Math.max(...labelLines.map((line) => line.length));
    const fontSize = Math.max(
      11,
      Math.min(17, Math.floor((imageWidth - 8) / Math.max(1, longestLine * 0.57))),
    );
    const lineHeight = fontSize + 4;
    const labelStartY = imageY + imageHeight + 25 - ((labelLines.length - 1) * lineHeight) / 2;

    parts.push(
      `<rect x="${cellX + 3}" y="${cellY + 3}" width="${cellWidth - 6}" height="${cellHeight - 6}" rx="5" fill="#f5f4f0" stroke="#aeb1ad" stroke-width="1"/>`,
      `<rect x="${imageX}" y="${imageY}" width="${imageWidth}" height="${imageHeight}" fill="#e4e4e1" stroke="#8e928e" stroke-width="1"/>`,
    );

    labelLines.forEach((line, lineIndex) => {
      parts.push(
        `<text x="${cellX + cellWidth / 2}" y="${labelStartY + lineIndex * lineHeight}" text-anchor="middle" fill="#202326" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="600">${escapeXml(line)}</text>`,
      );
    });
  });

  parts.push('</svg>');
  return Buffer.from(parts.join(''));
}

async function renderCategory(category, options) {
  const { columns, cellWidth, cellHeight } = options;
  const headerHeight = 76;
  const padding = 12;
  const labelHeight = 62;
  const imageWidth = cellWidth - padding * 2;
  const imageHeight = cellHeight - padding * 2 - labelHeight;
  const rows = Math.ceil(category.models.length / columns);
  const sheetWidth = columns * cellWidth;
  const sheetHeight = headerHeight + rows * cellHeight;

  const composites = [
    {
      input: createLayoutSvg({
        category: category.name,
        finishLabel: options.finish
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' '),
        models: category.models,
        columns,
        cellWidth,
        cellHeight,
        headerHeight,
        padding,
        imageWidth,
        imageHeight,
        sheetWidth,
        sheetHeight,
      }),
      left: 0,
      top: 0,
    },
  ];

  for (const [index, model] of category.models.entries()) {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const thumbnail = await sharp(model.source)
      .rotate()
      .flatten({ background: '#e4e4e1' })
      .resize({
        width: imageWidth,
        height: imageHeight,
        fit: 'contain',
        background: '#e4e4e1',
        kernel: sharp.kernel.lanczos3,
      })
      .png()
      .toBuffer();

    composites.push({
      input: thumbnail,
      left: column * cellWidth + padding,
      top: headerHeight + row * cellHeight + padding,
    });
  }

  const outputPath = path.join(
    options.outputRoot,
    `${category.name}-${options.finish}-contact-sheet.jpg`,
  );

  await sharp({
    create: {
      width: sheetWidth,
      height: sheetHeight,
      channels: 3,
      background: '#d9dad7',
    },
  })
    .composite(composites)
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(outputPath);

  return outputPath;
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const categories = collectCategories(options.inputRoot, options.finish);

  fs.mkdirSync(options.outputRoot, { recursive: true });

  let modelCount = 0;
  for (const category of categories) {
    const outputPath = await renderCategory(category, options);
    modelCount += category.models.length;
    process.stdout.write(
      `${category.name}: ${category.models.length} modelos -> ${outputPath}\n`,
    );
  }

  process.stdout.write(
    `Generated ${categories.length} contact sheets for ${modelCount} models.\n`,
  );
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
