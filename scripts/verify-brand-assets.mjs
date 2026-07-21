#!/usr/bin/env node
/**
 * Brand asset + reference validation for CI.
 *
 * Checks:
 * - Required generated files exist under public/images/
 * - Active master exists under public/images/source/
 * - site.webmanifest icon paths resolve
 * - BRAND.logo.src (and related paths) are present in brand module source
 * - Production code does not import /images/logo.png (use logo.webp via BRAND)
 *
 * Exit non-zero on failure.
 *
 * Run: npm run verify:brand
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");
const sourceDir = path.join(imagesDir, "source");
const manifestPath = path.join(root, "public", "site.webmanifest");
const brandModulePath = path.join(root, "src", "lib", "branding", "brands", "stankings.ts");

const REQUIRED_GENERATED = [
  "logo.webp",
  "icon.webp",
  "icon-32.webp",
  "icon-180.webp",
  "icon-512.webp",
  "og-image.jpg",
  "og-image.webp",
];

const REQUIRED_SOURCE = ["logo-master.png"];

const REQUIRED_BRAND_PATHS = [
  "/images/logo.webp",
  "/images/icon.webp",
  "/images/icon-32.webp",
  "/images/icon-180.webp",
  "/images/icon-512.webp",
  "/images/og-image.jpg",
  "/images/og-image.webp",
  "/images/source/logo-master.png",
];

const PNG_IMPORT_ALLOWLIST = new Set([
  path.join("scripts", "optimize-brand-assets.mjs"),
  path.join("scripts", "generate-logo-master.mjs"),
  path.join("scripts", "verify-brand-assets.mjs"),
  path.join("docs", "branding", "BRAND_ASSETS.md"),
  path.join("public", "images", "GENERATED.md"),
  path.join("public", "images", "source", "README.md"),
]);

const SCAN_ROOTS = ["src", "scripts", "public", "docs"];
const SCAN_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".css",
  ".html",
]);

const errors = [];

function fail(message) {
  errors.push(message);
}

function ok(message) {
  console.log(`✓ ${message}`);
}

function publicPathToDisk(publicPath) {
  return path.join(root, "public", publicPath.replace(/^\//, ""));
}

function walkFiles(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === "dist") continue;
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkFiles(full, out);
      continue;
    }
    if (SCAN_EXTENSIONS.has(path.extname(entry))) out.push(full);
  }
  return out;
}

function rel(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

// --- filesystem: generated ---
for (const name of REQUIRED_GENERATED) {
  const full = path.join(imagesDir, name);
  if (!existsSync(full)) fail(`Missing generated asset: public/images/${name}`);
  else ok(`generated ${name}`);
}

// --- filesystem: source ---
for (const name of REQUIRED_SOURCE) {
  const full = path.join(sourceDir, name);
  if (!existsSync(full)) fail(`Missing master artwork: public/images/source/${name}`);
  else ok(`source ${name}`);
}

if (existsSync(path.join(imagesDir, "logo.png"))) {
  fail(
    "Found public/images/logo.png — master artwork must live in public/images/source/logo-master.png (not beside generated WebP).",
  );
} else {
  ok("no public/images/logo.png beside generated assets");
}

// --- BRAND module paths ---
if (!existsSync(brandModulePath)) {
  fail(`Missing brand module: ${rel(brandModulePath)}`);
} else {
  const brandSource = readFileSync(brandModulePath, "utf8");
  if (!brandSource.includes('src: "/images/logo.webp"') && !brandSource.includes("src: '/images/logo.webp'")) {
    fail("BRAND.logo.src must reference /images/logo.webp");
  } else {
    ok("BRAND.logo.src → /images/logo.webp");
  }
  for (const p of REQUIRED_BRAND_PATHS) {
    if (!brandSource.includes(p)) fail(`Brand module missing path reference: ${p}`);
  }
  if (errors.every((e) => !e.includes("Brand module missing"))) {
    ok("brand module references all required asset paths");
  }
}

// --- manifest ---
if (!existsSync(manifestPath)) {
  fail("Missing public/site.webmanifest");
} else {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (err) {
    fail(`Invalid site.webmanifest JSON: ${err.message}`);
    manifest = null;
  }
  if (manifest) {
    const icons = Array.isArray(manifest.icons) ? manifest.icons : [];
    if (icons.length === 0) fail("site.webmanifest has no icons[]");
    for (const icon of icons) {
      const src = icon?.src;
      if (!src) {
        fail("site.webmanifest icon missing src");
        continue;
      }
      const disk = publicPathToDisk(src);
      if (!existsSync(disk)) fail(`Manifest icon missing on disk: ${src}`);
      else ok(`manifest icon ${src}`);
    }
  }
}

// --- PNG import lint (production must use optimized assets) ---
const pngPatterns = [
  /["'`]\/images\/logo\.png["'`]/,
  /from\s+["'][^"']*logo\.png["']/,
  /import\s+[^;]*logo\.png/,
  /src\s*=\s*["'][^"']*logo\.png["']/,
];

const offenders = [];
for (const scanRoot of SCAN_ROOTS) {
  for (const file of walkFiles(path.join(root, scanRoot))) {
    const relative = rel(file);
    if (PNG_IMPORT_ALLOWLIST.has(relative.split("/").join(path.sep)) || PNG_IMPORT_ALLOWLIST.has(relative)) {
      continue;
    }
    // Allowlist by posix relative path
    if (
      relative === "scripts/optimize-brand-assets.mjs" ||
      relative === "scripts/generate-logo-master.mjs" ||
      relative === "scripts/verify-brand-assets.mjs" ||
      relative.startsWith("docs/branding/") ||
      relative === "public/images/GENERATED.md" ||
      relative === "public/images/source/README.md"
    ) {
      continue;
    }

    const text = readFileSync(file, "utf8");
    for (const pattern of pngPatterns) {
      if (pattern.test(text)) {
        offenders.push(relative);
        break;
      }
    }
  }
}

if (offenders.length > 0) {
  fail(
    `Production code must not reference logo.png (use BRAND.logo.src / logo.webp). Offenders:\n  - ${offenders.join("\n  - ")}`,
  );
} else {
  ok("no forbidden logo.png imports outside optimization pipeline");
}

// --- summary ---
if (errors.length > 0) {
  console.error("\nBrand asset verification FAILED:\n");
  for (const err of errors) console.error(`✗ ${err}`);
  process.exit(1);
}

console.log("\nBrand asset verification PASS.");
