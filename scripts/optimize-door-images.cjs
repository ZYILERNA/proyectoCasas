#!/usr/bin/env node
// Run sample first; apply requires a backup directory OUTSIDE the project.
// Existing .webp siblings are intentionally never reused or overwritten.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const [mode, backupArgument] = process.argv.slice(2);
if (!['sample', 'apply', 'verify'].includes(mode) || !backupArgument) {
  console.error('Usage: node scripts/optimize-door-images.cjs sample|apply|verify <external-backup-directory>');
  process.exit(1);
}
const backup = path.resolve(backupArgument);
const inside = (parent, child) => {
  const relative = path.relative(parent, child);
  return relative !== '' && !relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative);
};
if (backup === root || inside(root, backup) || inside(backup, root)) {
  throw new Error('Backup must be outside the project and must not contain the project.');
}
const catalog = path.join(root, 'public', 'images', 'PUERTAS');
const resolveAsset = (relative) => {
  const absolute = path.resolve(root, relative);
  if (!inside(catalog, absolute)) throw new Error(`Asset outside catalog: ${relative}`);
  return absolute;
};
const backupAsset = (group, relative) => {
  resolveAsset(relative);
  const absolute = path.resolve(backup, group, relative);
  if (!inside(path.join(backup, group), absolute)) throw new Error('Invalid backup path');
  return absolute;
};
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 30e6 });
const digest = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const targetName = (source) => source.replace(/\.png$/i, '.optimized.webp');
sharp.concurrency(1);

async function measure(original, encoded) {
  const a = await sharp(original).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const b = await sharp(encoded).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (a.info.width !== b.info.width || a.info.height !== b.info.height || a.data.length !== b.data.length) {
    throw new Error('Dimensions changed');
  }
  let squared = 0;
  let absolute = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    if (a.data[i + 3] !== b.data[i + 3]) throw new Error('Transparency changed');
    for (let channel = 0; channel < 3; channel++) {
      const delta = a.data[i + channel] - b.data[i + channel];
      squared += delta * delta;
      absolute += Math.abs(delta);
    }
  }
  const count = a.info.width * a.info.height * 3;
  return {
    width: a.info.width,
    height: a.info.height,
    psnr: squared === 0 ? null : 10 * Math.log10(255 * 255 / (squared / count)),
    meanAbsoluteError: absolute / count,
    identicalPixels: squared === 0,
  };
}

async function encode(source, cachedFile) {
  const input = fs.readFileSync(resolveAsset(source));
  const metadata = await sharp(input).metadata();
  // Never discard color profiles or animation without an explicit decision.
  if (metadata.icc || metadata.depth !== 'uchar' || (metadata.pages || 1) !== 1 || (metadata.orientation || 1) !== 1) {
    throw new Error(`Unsupported metadata; preserve original: ${source}`);
  }
  let lossless = Boolean(metadata.hasAlpha);
  const cached = cachedFile && fs.existsSync(cachedFile);
  let bytes = cached
    ? fs.readFileSync(cachedFile)
    : await sharp(input).webp({ quality: 95, alphaQuality: 100, effort: 4, smartSubsample: true, lossless }).toBuffer();
  if ((await sharp(bytes).metadata()).format !== 'webp') throw new Error(`Not a WebP: ${source}`);
  let metrics = await measure(input, bytes);
  if (cached) lossless = metrics.identicalPixels;
  if (!lossless && ((metrics.psnr !== null && metrics.psnr < 40) || metrics.meanAbsoluteError > 1.6)) {
    if (cached) throw new Error(`Cached sample failed quality checks: ${source}`);
    lossless = true;
    bytes = await sharp(input).webp({ lossless: true, effort: 4 }).toBuffer();
    metrics = await measure(input, bytes);
  }
  if (lossless && !metrics.identicalPixels) throw new Error(`Lossless comparison failed: ${source}`);
  if (bytes.length >= input.length) throw new Error(`No space saving: ${source}`);
  return {
    bytes,
    entry: {
      source,
      target: targetName(source),
      sourceBytes: input.length,
      targetBytes: bytes.length,
      sourceSha256: digest(input),
      targetSha256: digest(bytes),
      lossless,
      ...metrics,
    },
  };
}

function saveJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

async function main() {
  const manifestPath = path.join(backup, 'manifest.json');
  if (mode === 'verify') {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    let verified = 0;
    for (const entry of manifest.entries) {
      const original = fs.readFileSync(backupAsset('originals', entry.source));
      const optimized = fs.readFileSync(resolveAsset(entry.target));
      if (digest(original) !== entry.sourceSha256 || digest(optimized) !== entry.targetSha256) throw new Error(`Hash mismatch: ${entry.source}`);
      if (fs.existsSync(resolveAsset(entry.source))) throw new Error(`Original still published: ${entry.source}`);
      const metadata = await sharp(optimized).metadata();
      if (metadata.format !== 'webp' || metadata.width !== entry.width || metadata.height !== entry.height) throw new Error(`Invalid output: ${entry.target}`);
      // Decode every output again to detect truncated/corrupt data, not just headers.
      await sharp(optimized).raw().toBuffer();
      if (++verified % 250 === 0) console.log(`Verified ${verified}/${manifest.entries.length}`);
    }
    console.log(JSON.stringify({ verified, ...manifest.totals, backup }, null, 2));
    return;
  }

  let sources = git('ls-files', '-z', '--', 'public/images/PUERTAS').split('\0').filter(p => /\.png$/i.test(p));
  if (!sources.length) throw new Error('No tracked catalog PNGs found');
  const changed = git('diff', 'HEAD', '--name-only', '-z', '--', 'public/images/PUERTAS').split('\0');
  if (sources.some(p => changed.includes(p))) throw new Error('A source PNG has uncommitted changes; refusing to replace it.');

  // Keep transparent originals: WebP may rewrite hidden RGB under fully clear pixels.
  // The compatibility rewrite runs after the filesystem, so these PNGs still work.
  const retained = [];
  for (const source of sources) {
    if ((await sharp(resolveAsset(source)).metadata()).hasAlpha) retained.push(source);
  }
  sources = sources.filter(source => !retained.includes(source));
  if (retained.length) console.log(`Retaining ${retained.length} transparent PNG originals`);

  if (mode === 'sample') {
    // Sample the current batch, not filenames that may already have been migrated.
    const selected = [...new Set([
      sources[0], sources[Math.floor(sources.length / 2)], sources[sources.length - 1],
    ])];
    const entries = [];
    for (let i = 0; i < selected.length; i++) {
      const { entry, bytes } = await encode(selected[i]);
      const directory = path.join(backup, 'samples');
      fs.mkdirSync(directory, { recursive: true });
      fs.writeFileSync(path.join(directory, `${i + 1}.webp`), bytes);
      const crop = { left: 0, top: Math.floor(entry.height * 0.35), width: Math.min(650, entry.width), height: 650 };
      const before = await sharp(resolveAsset(entry.source)).extract(crop).png().toBuffer();
      const after = await sharp(bytes).extract(crop).png().toBuffer();
      await sharp({ create: { width: crop.width * 2, height: crop.height, channels: 3, background: '#fff' } })
        .composite([{ input: before, left: 0, top: 0 }, { input: after, left: crop.width, top: 0 }])
        .png().toFile(path.join(directory, `${i + 1}-before-left-after-right.png`));
      entries.push(entry);
      console.log(JSON.stringify(entry));
    }
    saveJson(path.join(backup, 'samples', 'report.json'), entries);
    return;
  }

  if (fs.existsSync(manifestPath)) throw new Error('This backup already has a manifest; verify it or choose a new backup directory.');
  for (const source of sources) {
    if (fs.existsSync(resolveAsset(targetName(source))) || fs.existsSync(backupAsset('originals', source))) throw new Error(`Would overwrite an existing asset: ${source}`);
  }
  const entries = new Array(sources.length);
  let next = 0;
  let finished = 0;
  let failed = false;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (!failed && next < sources.length) {
      const index = next++;
      try {
        const staged = backupAsset('staged', targetName(sources[index]));
        const { entry, bytes } = await encode(sources[index], staged);
        fs.mkdirSync(path.dirname(staged), { recursive: true });
        if (!fs.existsSync(staged)) fs.writeFileSync(staged, bytes, { flag: 'wx' });
        entries[index] = entry;
        if (++finished % 100 === 0 || finished === sources.length) console.log(`Encoded and quality-checked ${finished}/${sources.length}`);
      } catch (error) {
        failed = true;
        throw error;
      }
    }
  }));
  const totals = entries.reduce((acc, e) => {
    acc.sourceBytes += e.sourceBytes;
    acc.targetBytes += e.targetBytes;
    acc.losslessCount += Number(e.lossless);
    return acc;
  }, { sourceBytes: 0, targetBytes: 0, losslessCount: 0 });
  totals.savedBytes = totals.sourceBytes - totals.targetBytes;
  totals.reductionPercent = 100 * totals.savedBytes / totals.sourceBytes;
  const manifest = { version: 1, createdAt: new Date().toISOString(), mode: 'staged', retained, settings: { quality: 95, minimumPsnr: 40, maximumMeanAbsoluteError: 1.6, unchangedDimensions: true }, totals, entries };
  saveJson(manifestPath, manifest);

  // No source is moved until ALL outputs pass validation and the recovery manifest is saved.
  for (const entry of entries) {
    const source = resolveAsset(entry.source);
    if (digest(fs.readFileSync(source)) !== entry.sourceSha256) throw new Error(`Source changed during processing: ${entry.source}`);
    if (fs.existsSync(resolveAsset(entry.target))) throw new Error(`Target appeared during processing: ${entry.target}`);
  }
  for (const entry of entries) {
    const source = resolveAsset(entry.source);
    const original = backupAsset('originals', entry.source);
    const staged = backupAsset('staged', entry.target);
    fs.mkdirSync(path.dirname(original), { recursive: true });
    // Copy first so failures (including cross-volume backups) leave the source usable.
    // The source is removed only after BOTH recovery and published copies are verified.
    fs.copyFileSync(source, original, fs.constants.COPYFILE_EXCL);
    if (digest(fs.readFileSync(original)) !== entry.sourceSha256) throw new Error(`Backup mismatch: ${entry.source}`);
    const target = resolveAsset(entry.target);
    fs.copyFileSync(staged, target, fs.constants.COPYFILE_EXCL);
    if (digest(fs.readFileSync(target)) !== entry.targetSha256) throw new Error(`Published copy mismatch: ${entry.target}`);
    fs.unlinkSync(source);
  }
  manifest.mode = 'applied';
  saveJson(manifestPath, manifest);
  console.log(JSON.stringify({ optimized: entries.length, ...totals, backup }, null, 2));
}

main().catch(error => { console.error(error.stack); process.exitCode = 1; });
