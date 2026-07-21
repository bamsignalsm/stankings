#!/usr/bin/env node
/**
 * Derive production WebP brand assets from public/images/logo.png (source of truth).
 * Run: node scripts/optimize-brand-assets.mjs
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const logoPng = path.join(imagesDir, "logo.png");

const OBSIDIAN = { r: 10, g: 10, b: 11, alpha: 1 };

async function writeWebp(buffer, outPath, quality = 88) {
  await sharp(buffer).webp({ quality, effort: 6, alphaQuality: 100 }).toFile(outPath);
  const { size } = await stat(outPath);
  return size;
}

async function main() {
  const source = sharp(logoPng);
  const meta = await source.metadata();
  if (!meta.width || !meta.height) {
    throw new Error("Could not read logo.png dimensions");
  }

  const { width, height } = meta;
  const markSize = height;

  console.log(`Source logo.png: ${width}×${height}`);

  // Primary horizontal wordmark — preserve transparency, production width cap 1122.
  const logoWebp = path.join(imagesDir, "logo.webp");
  const logoSize = await writeWebp(await source.clone().png().toBuffer(), logoWebp, 90);
  console.log(`logo.webp: ${(logoSize / 1024).toFixed(1)} KB`);

  // Square mark — crop left emblem (full height square).
  const mark = sharp(logoPng).extract({
    left: 0,
    top: 0,
    width: markSize,
    height: markSize,
  });

  const iconWebp = path.join(imagesDir, "icon.webp");
  const iconSize = await writeWebp(await mark.clone().resize(512, 512).png().toBuffer(), iconWebp, 92);
  console.log(`icon.webp: ${(iconSize / 1024).toFixed(1)} KB`);

  const faviconSizes = [
    { name: "icon-32.webp", size: 32 },
    { name: "icon-180.webp", size: 180 },
    { name: "icon-512.webp", size: 512 },
  ];

  for (const { name, size } of faviconSizes) {
    const out = path.join(imagesDir, name);
    const bytes = await writeWebp(
      await mark.clone().resize(size, size, { fit: "contain", background: OBSIDIAN }).png().toBuffer(),
      out,
      size <= 32 ? 95 : 90,
    );
    console.log(`${name}: ${(bytes / 1024).toFixed(1)} KB`);
  }

  // Open Graph — 1200×630 (standard) with centered wordmark on obsidian.
  const ogWidth = 1200;
  const ogHeight = 630;
  const ogPadding = 80;
  const logoForOg = await sharp(logoPng)
    .resize(ogWidth - ogPadding * 2, ogHeight - ogPadding * 2, {
      fit: "inside",
      withoutEnlargement: false,
    })
    .toBuffer();

  const ogLogoMeta = await sharp(logoForOg).metadata();
  const ogLogoLeft = Math.round((ogWidth - (ogLogoMeta.width ?? 0)) / 2);
  const ogLogoTop = Math.round((ogHeight - (ogLogoMeta.height ?? 0)) / 2);

  const ogComposite = await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 4,
      background: OBSIDIAN,
    },
  })
    .composite([{ input: logoForOg, left: ogLogoLeft, top: ogLogoTop }])
    .png()
    .toBuffer();

  const ogJpg = path.join(imagesDir, "og-image.jpg");
  const ogWebp = path.join(imagesDir, "og-image.webp");

  await sharp(ogComposite).jpeg({ quality: 88, mozjpeg: true }).toFile(ogJpg);
  await writeWebp(ogComposite, ogWebp, 88);

  const ogJpgSize = (await stat(ogJpg)).size;
  const ogWebpSize = (await stat(ogWebp)).size;
  console.log(`og-image.jpg: ${(ogJpgSize / 1024).toFixed(1)} KB`);
  console.log(`og-image.webp: ${(ogWebpSize / 1024).toFixed(1)} KB`);

  console.log("Brand assets optimized.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
