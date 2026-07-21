#!/usr/bin/env node
/**
 * Build public/images/logo.png — editable master with STANKINGS wordmark only.
 * Preserves the existing gold S emblem from the prior logo; drops "GROUP" subline.
 *
 * Run: node scripts/generate-logo-master.mjs
 */
import { copyFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const logoPng = path.join(imagesDir, "logo.png");
const legacyBackup = path.join(imagesDir, "logo-group-legacy.png");

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
  const sourceMeta = await sharp(logoPng).metadata();
  if (!sourceMeta.width || !sourceMeta.height) {
    throw new Error("Could not read logo.png");
  }

  try {
    await stat(legacyBackup);
  } catch {
    await copyFile(logoPng, legacyBackup);
    console.log(`Backed up prior logo to ${path.basename(legacyBackup)}`);
  }

  const mark = await sharp(logoPng)
    .extract({ left: 0, top: 0, width: MARK_SIZE, height: MARK_SIZE })
    .png()
    .toBuffer();

  const wordmarkProbe = Buffer.from(WORDMARK_SVG(900));
  const wordmarkMeta = await sharp(wordmarkProbe).png().toBuffer().then((b) => sharp(b).metadata());
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

  await sharp(logo).toFile(logoPng);

  const outMeta = await sharp(logoPng).metadata();
  console.log(
    `logo.png: ${outMeta.width}×${outMeta.height} (STANKINGS wordmark, emblem preserved)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
