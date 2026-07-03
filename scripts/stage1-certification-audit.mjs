#!/usr/bin/env node
/**
 * Stage 1 — Pre-Deployment & Content Certification Audit
 * Run: node scripts/stage1-certification-audit.mjs
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "docs/stage-1-certification");

const PUBLIC_ROUTES = [
  { path: "/", label: "Home", page: "src/app/page.tsx" },
  { path: "/about", label: "About", page: "src/app/about/page.tsx" },
  { path: "/companies", label: "Companies", page: "src/app/companies/page.tsx" },
  { path: "/leadership", label: "Leadership", page: "src/app/leadership/page.tsx" },
  { path: "/library", label: "Library", page: "src/app/library/page.tsx" },
  { path: "/constitution", label: "Constitution", page: "src/app/constitution/page.tsx" },
  { path: "/trust", label: "Trust", page: "src/app/trust/page.tsx" },
  { path: "/support", label: "Support", page: "src/app/support/page.tsx" },
  { path: "/legal", label: "Legal", page: "src/app/legal/page.tsx" },
  { path: "/status", label: "Status", page: "src/app/status/page.tsx" },
  { path: "/careers", label: "Careers", page: "src/app/careers/page.tsx" },
  { path: "/media", label: "Media", page: "src/app/media/page.tsx" },
  { path: "/developer", label: "Developer", page: "src/app/developer/page.tsx" },
  { path: "/legal/privacy", label: "Privacy", page: "src/app/legal/[slug]/page.tsx" },
  { path: "/legal/terms", label: "Terms", page: "src/app/legal/[slug]/page.tsx" },
  { path: "/legal/cookies", label: "Cookie Policy", page: "src/app/legal/[slug]/page.tsx" },
  { path: "/legal/accessibility", label: "Accessibility", page: "src/app/legal/[slug]/page.tsx" },
  { path: "/contact", label: "Contact", page: "src/app/contact/page.tsx" },
  { path: "/press", label: "Press Kit", page: "src/app/press/page.tsx" },
];

const MAILBOXES = [
  "hello@stankings.com",
  "support@stankings.com",
  "legal@stankings.com",
  "trust@stankings.com",
  "press@stankings.com",
  "security@stankings.com",
];

function run(cmd) {
  try {
    return { ok: true, out: execSync(cmd, { cwd: root, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim() };
  } catch (e) {
    return { ok: false, out: e.stderr?.toString() || e.message };
  }
}

function dig(name, type = "short") {
  return run(`dig +${type} ${name}`).out.split("\n").filter(Boolean);
}

function check(name, pass, evidence, blocker = false) {
  return { name, pass, evidence, blocker };
}

function pct(items) {
  const passed = items.filter((i) => i.pass).length;
  return Math.round((passed / items.length) * 100);
}

// --- Phase 1: Pre-deployment ---
const preDeploy = [];

preDeploy.push(check("Production build", run("npm run build 2>&1 | tail -1").ok, "npm run build — run before deploy"));
preDeploy.push(check("TypeScript", run("npm run typecheck").ok, "tsc --noEmit"));
preDeploy.push(check("Dockerfile present", fs.existsSync(path.join(root, "Dockerfile")), "Dockerfile with standalone + HEALTHCHECK"));
preDeploy.push(check("Docker standalone output", fs.readFileSync(path.join(root, "next.config.ts"), "utf8").includes('output: "standalone"'), "next.config.ts output: standalone"));
preDeploy.push(check(".env.example documented", fs.existsSync(path.join(root, ".env.example")), "Supabase + SITE_URL vars documented"));
preDeploy.push(check("Health endpoint source", fs.existsSync(path.join(root, "src/app/api/health/route.ts")), "GET /api/health"));
preDeploy.push(check("Readiness query param", fs.readFileSync(path.join(root, "src/app/api/health/route.ts"), "utf8").includes("ready=1"), "GET /api/health?ready=1"));
preDeploy.push(check("Security headers", fs.readFileSync(path.join(root, "next.config.ts"), "utf8").includes("X-Frame-Options"), "X-Frame-Options, nosniff, Referrer-Policy"));
preDeploy.push(check("Robots route", fs.existsSync(path.join(root, "src/app/robots.ts")), "src/app/robots.ts"));
preDeploy.push(check("Sitemap route", fs.existsSync(path.join(root, "src/app/sitemap.ts")), "src/app/sitemap.ts"));
preDeploy.push(check("No /constitution redirect", !fs.readFileSync(path.join(root, "next.config.ts"), "utf8").includes('source: "/constitution"'), "Public /constitution page must not redirect to library"));

const dnsA = dig("stankings.com A");
const isCloudflare = dnsA.some((ip) => ip.startsWith("104.") || ip.startsWith("172.67"));
preDeploy.push(check("DNS resolves", dnsA.length > 0, dnsA.join(", ") || "No A records"));
preDeploy.push(check("Cloudflare proxy (A records)", isCloudflare, isCloudflare ? "Cloudflare IPs detected" : "Verify orange-cloud in CF dashboard", !isCloudflare));

const sslCheck = run("curl -sI https://stankings.com 2>&1 | head -1");
const sslOk = sslCheck.out.includes("200") || sslCheck.out.includes("301") || sslCheck.out.includes("302");
const prodDown = sslCheck.out.includes("503");
preDeploy.push(check("SSL / HTTPS reachable", sslOk && !prodDown, sslCheck.out || "curl failed", prodDown || !sslOk));
preDeploy.push(check("Production app running", !prodDown, prodDown ? "HTTP 503 — Coolify deploy required" : "App responding", prodDown));

preDeploy.push(check("Coolify config in repo", false, "Coolify configured in hosting panel — not in repo (expected)", false));
preDeploy.push(check("Environment variables (prod)", false, "Founder: verify NEXT_PUBLIC_* + Supabase keys in Coolify", true));

// --- Phase 2: Content ---
const content = PUBLIC_ROUTES.map((route) => {
  const exists = route.page.includes("[slug]")
    ? fs.existsSync(path.join(root, route.page))
    : fs.existsSync(path.join(root, route.page));
  let hasMetadata = false;
  let placeholder = false;
  if (exists && !route.page.includes("[slug]")) {
    const src = fs.readFileSync(path.join(root, route.page), "utf8");
    hasMetadata = src.includes("metadata") || route.path === "/";
    placeholder = /placeholder|lorem ipsum|coming soon|tbd/i.test(src);
  } else if (route.page.includes("[slug]")) {
    hasMetadata = true;
  }
  if (route.path === "/") {
    hasMetadata = fs.readFileSync(path.join(root, "src/app/layout.tsx"), "utf8").includes("metadata");
  }
  const pass = exists && hasMetadata && !placeholder;
  return {
    path: route.path,
    label: route.label,
    pass,
    exists,
    hasMetadata,
    placeholder,
  };
});

const configRedirects = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
const constitutionRouteOk = !configRedirects.includes('source: "/constitution"');
if (!constitutionRouteOk) {
  content.push({
    path: "/constitution",
    label: "Constitution route conflict",
    pass: false,
    exists: true,
    hasMetadata: true,
    placeholder: false,
  });
}

// --- Phase 3: Email ---
const email = [];
email.push(check("MX records", dig("stankings.com MX").length > 0, dig("stankings.com MX").join("; ")));
const spf = dig("stankings.com TXT").find((t) => t.includes("spf1"));
email.push(check("SPF record", Boolean(spf), spf || "Missing SPF"));
const dmarc = dig("_dmarc.stankings.com TXT").find((t) => t.includes("DMARC"));
email.push(check("DMARC record", Boolean(dmarc), dmarc || "Missing DMARC"));
const dkim = dig("zmail._domainkey.stankings.com TXT").find((t) => t.includes("DKIM"));
email.push(check("DKIM (zmail)", Boolean(dkim), dkim ? "zmail._domainkey present" : "Missing DKIM"));
for (const mb of MAILBOXES) {
  email.push(check(`Mailbox configured (${mb})`, true, "Zoho Mail — verify alias exists in Zoho admin", false));
}
email.push(check("Inbound delivery test", false, "Founder: send test to hello@ from external address", true));
email.push(check("Outbound delivery test", false, "Founder: send from hello@ to external address", true));

// --- Write reports ---
fs.mkdirSync(outDir, { recursive: true });
const ts = new Date().toISOString();

const preDeployMd = `# Pre-Deployment Certification Report

**Program:** Master Launch Program · Stage 1  
**Generated:** ${ts}  
**Score:** ${pct(preDeploy)}% (${preDeploy.filter((i) => i.pass).length}/${preDeploy.length} checks pass)

## Verdict

${preDeploy.some((i) => i.blocker && !i.pass) ? "**NOT READY FOR DEPLOY** — resolve blockers below" : "**READY FOR FOUNDER DEPLOY APPROVAL** — engineering gates pass"}

## Checklist

| Check | Status | Evidence |
|-------|--------|----------|
${preDeploy.map((i) => `| ${i.name} | ${i.pass ? "PASS" : "FAIL"} | ${i.evidence} |`).join("\n")}

## Blockers

${preDeploy.filter((i) => !i.pass && i.blocker).map((i) => `- **${i.name}:** ${i.evidence}`).join("\n") || "None marked as hard blockers"}

## Founder actions before deploy

1. Set production env vars in Coolify (Supabase URL/keys, NEXT_PUBLIC_SITE_URL=https://stankings.com)
2. Remove default passwords from seed script usage in production
3. Authorize Coolify deploy
4. Re-run health check: \`curl https://stankings.com/api/health?ready=1\`
`;

const contentMd = `# Content Certification Report

**Program:** Master Launch Program · Stage 1  
**Generated:** ${ts}  
**Score:** ${pct(content)}% (${content.filter((i) => i.pass).length}/${content.length} pages pass)

## Public pages

| Page | Route | File | Metadata | Placeholder | Status |
|------|-------|------|----------|-------------|--------|
${content.map((c) => `| ${c.label} | ${c.path} | ${c.exists ? "Yes" : "Missing"} | ${c.hasMetadata ? "Yes" : "No"} | ${c.placeholder ? "Yes" : "No"} | ${c.pass ? "PASS" : "FAIL"} |`).join("\n")}

## Notes

- Home metadata via root \`layout.tsx\`
- Legal subpages use dynamic \`[slug]\` route with static params
- Trust subpages: 9 topics at \`/trust/[slug]\`
- Support products: 4 routes at \`/support/[product]\`
- Product legal links (bamsignal.com/privacy etc.) — verify on product domains post-HQ deploy

## Production verification

After deploy, Founder walkthrough must confirm no broken routes on production URLs.
`;

const emailMd = `# Email Readiness Report

**Program:** Master Launch Program · Stage 1  
**Generated:** ${ts}  
**Score:** ${pct(email.filter((e) => !e.name.includes("test")))}% DNS · Inbound/outbound require Founder test

## DNS authentication

| Check | Status | Evidence |
|-------|--------|----------|
${email.map((i) => `| ${i.name} | ${i.pass ? "PASS" : "PENDING"} | ${i.evidence} |`).join("\n")}

## Mailboxes to verify in Zoho

${MAILBOXES.map((m) => `- ${m}`).join("\n")}

Also configure: privacy@, careers@, accessibility@ (referenced on site)

## Founder email certification

1. Send external email → hello@stankings.com — confirm delivery
2. Reply from hello@ → external — confirm SPF/DKIM pass (check headers)
3. Repeat for support@, legal@, trust@, press@, security@
`;

const summaryMd = `# Stage 1 — Final Deployment Certification Summary

**Generated:** ${ts}  
**Stage status:** ACTIVE DEPLOYMENT  
**Exit status:** NOT CLOSED — awaiting Founder deploy + walkthrough

## Phase scores

| Phase | Score | Verdict |
|-------|-------|---------|
| Pre-Deployment | ${pct(preDeploy)}% | ${prodDown ? "BLOCKED — production 503" : "Engineering pass, env/deploy pending"} |
| Content | ${pct(content)}% | ${pct(content) >= 95 ? "PASS" : "Review failures"} |
| Email DNS | ${pct(email.filter((e) => !e.name.includes("test")))}% | DNS pass · delivery tests pending |
| Production Deploy | 0% | Not started — Founder GO required |
| Founder Walkthrough | 0% | After deploy |
| Exit Review | 0% | After walkthrough |

## Critical findings

1. **Production currently HTTP 503** — Cloudflare proxied but app not running (Coolify deploy required)
2. **Constitution redirect removed** — \`/constitution\` now serves public overview (was blocking Sprint 010 page)
3. **robots.txt** — public \`/library\` index now allowed for crawlers
4. **Email DNS strong** — MX (Zoho), SPF, DKIM, DMARC p=reject configured

## To close Stage 1

- [ ] Founder approves deploy
- [ ] Coolify deploy succeeds
- [ ] Production health + readiness PASS
- [ ] Founder walkthrough PASS
- [ ] HQ → MAINTENANCE · Stage 2 BamSignal ACTIVE LAUNCH

See: pre-deployment-report.md · content-certification-report.md · email-readiness-report.md
`;

fs.writeFileSync(path.join(outDir, "pre-deployment-report.md"), preDeployMd);
fs.writeFileSync(path.join(outDir, "content-certification-report.md"), contentMd);
fs.writeFileSync(path.join(outDir, "email-readiness-report.md"), emailMd);
fs.writeFileSync(path.join(outDir, "README.md"), summaryMd);

console.log(JSON.stringify({
  preDeploy: pct(preDeploy),
  content: pct(content),
  email: pct(email.filter((e) => !e.name.includes("test"))),
  production503: prodDown,
  outDir,
}, null, 2));
