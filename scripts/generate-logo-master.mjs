#!/usr/bin/env node
/**
 * LEGACY / experimental master builder.
 *
 * Prefer dropping approved artwork into:
 *   public/images/source/logo-master.png
 *
 * Do NOT use this script to “fix” legal-name text inside official artwork.
 * Wait for revised design files, then archive as logo-master-vN.png and run:
 *   npm run optimize:brand
 *
 * This script writes to public/images/source/logo-master.png only.
 * Run: node scripts/generate-logo-master.mjs
 */
import { access, copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const sourceDir = path.join(imagesDir, "source");
const logoMaster = path.join(sourceDir, "logo-master.png");
const legacyBackup = path.join(sourceDir, "logo-group-legacy.png");

const MARK_SIZE = 288;
const PADDING_X = 28;
const SEPARATOR_GAP = 24;
const WORDMARK_HEIGHT = MARK_SIZE;

const WORDMARK_SVG = (width) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${WORDMARK_HEIGHT}" viewBox="0 0 ${width} ${WORDMARK_HEIGHT}">
  <defs>
    <linearGradient id="goldLine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8C97A"/>
      <stop offset="100%" stop-color="#A67C2E"/>
    </linearGradient>
  </defs>
  <text
    x="0"
    y="188"
    fill="#F4EFE6"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="118"
    font-weight="600"
    letter-spacing="10"
  >STANKINGS</text>
</svg>`;

async function main() {
  console.warn(
    "[generate:logo] Legacy path — prefer official artwork in public/images/source/logo-master.png",
  );

  await mkdir(sourceDir, { recursive: true });

  let sourcePath = logoMaster;
  try {
    await access(logoMaster);
  } catch {
    const oldPublic = path.join(imagesDir, "logo.png");
    try {
      await access(oldPublic);
      sourcePath = oldPublic;
    } catch {
      throw new Error("No logo-master.png (or legacy public/images/logo.png) to rebuild from");
    }
  }

  const sourceMeta = await sharp(sourcePath).metadata();
  if (!sourceMeta.width || !sourceMeta.height) {
    throw new Error("Could not read master logo dimensions");
  }

  try {
    await stat(legacyBackup);
  } catch {
    await copyFile(sourcePath, legacyBackup);
    console.log(`Backed up prior logo to source/${path.basename(legacyBackup)}`);
  }

  const mark = await sharp(sourcePath)
    .extract({ left: 0, top: 0, width: MARK_SIZE, height: MARK_SIZE })
    .png()
    .toBuffer();

  const wordmarkProbe = Buffer.from(WORDMARK_SVG(900));
  const wordmarkRendered = await sharp(wordmarkProbe).png().toBuffer();
  const trimmed = await sharp(wordmarkRendered).trim({ threshold: 10 }).png().toBuffer();
  const trimmedMeta = await sharp(trimmed).metadata();
  const wordmarkWidth = trimmedMeta.width ?? 760;
  const wordmarkHeight = trimmedMeta.height ?? 200;

  const separatorWidth = 2;
  const separatorHeight = Math.round(MARK_SIZE * 0.72);
  const separatorTop = Math.round((MARK_SIZE - separatorHeight) / 2);

  const separatorSvg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${separatorWidth}" height="${separatorHeight}">
  <defs>
    <linearGradient id="goldLine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8C97A"/>
      <stop offset="100%" stop-color="#A67C2E"/>
    </linearGradient>
  </defs>
  <rect width="${separatorWidth}" height="${separatorHeight}" fill="url(#goldLine)"/>
</svg>`);

  const separator = await sharp(separatorSvg).png().toBuffer();

  const wordmarkY = Math.round((MARK_SIZE - wordmarkHeight) / 2);
  const separatorX = MARK_SIZE + PADDING_X;
  const wordmarkX = separatorX + separatorWidth + SEPARATOR_GAP;
  const canvasWidth = wordmarkX + wordmarkWidth + PADDING_X;
  const canvasHeight = MARK_SIZE;

  const logo = await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: mark, left: 0, top: 0 },
      { input: separator, left: separatorX, top: separatorTop },
      { input: trimmed, left: wordmarkX, top: wordmarkY },
    ])
    .png()
    .toBuffer();

  await sharp(logo).toFile(logoMaster);

  const outMeta = await sharp(logoMaster).metadata();
  console.log(
    `source/logo-master.png: ${outMeta.width}×${outMeta.height} (experimental STANKINGS wordmark)`,
  );
  console.log("Next: npm run optimize:brand");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
