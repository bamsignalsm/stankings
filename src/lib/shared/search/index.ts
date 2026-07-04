/**
 * Reusable search index — companies, policies, documentation, downloads, resources, trust, legal.
 */

import { COMPANY_REGISTRY } from "@/lib/shared/company/registry";
import { TRUST_REGISTRY } from "@/lib/shared/trust/registry";
import { LEGAL_REGISTRY } from "@/lib/shared/legal/registry";
import { SUPPORT_REGISTRY } from "@/lib/shared/support/registry";
import { DOWNLOAD_REGISTRY } from "@/lib/shared/downloads/registry";
import { STATUS_REGISTRY } from "@/lib/shared/status/registry";

export type SharedSearchCategory =
  | "page"
  | "company"
  | "policy"
  | "documentation"
  | "resource"
  | "download"
  | "trust"
  | "legal";

export interface SharedSearchDocument {
  id: string;
  title: string;
  summary: string;
  href: string;
  category: SharedSearchCategory;
  keywords: string[];
}

function doc(
  id: string,
  title: string,
  summary: string,
  href: string,
  category: SharedSearchCategory,
  keywords: string[] = [],
): SharedSearchDocument {
  return { id, title, summary, href, category, keywords };
}

const STATIC_PAGES: SharedSearchDocument[] = [
  doc("home", "Home", "Stankings Group institutional homepage.", "/", "page"),
  doc("about", "About", "Mission, vision, and institutional pillars.", "/about", "page"),
  doc("companies", "Companies", "Centers of Excellence.", "/companies", "page"),
  doc("leadership", "Leadership", "Stewardship and governance.", "/leadership", "page"),
  doc("constitution", "Constitution", "Volume I overview.", "/constitution", "documentation"),
  doc("library", "Library", "Corporate document repository.", "/library", "documentation"),
  doc("careers", "Careers", "Hiring and open positions.", "/careers", "page"),
  doc("contact", "Contact", "Institutional contact channels.", "/contact", "page"),
  doc("press", "Press", "Press kit and media contacts.", "/press", "resource"),
  doc("media", "Media", "Brand gallery.", "/media", "resource"),
  doc("brand", "Brand Center", "Logos, colors, fonts.", "/brand", "resource"),
  doc("downloads", "Download Center", "Press kit and brand downloads.", "/downloads", "download"),
  doc("developer", "Developer Center", "APIs and product developer links.", "/developer", "documentation"),
  doc("partners", "Partners", "Partnership engagement.", "/partners", "page"),
  doc("investors", "Investors", "Capital and stewardship.", "/investors", "page"),
  doc("foundation", "Foundation", "Community impact.", "/foundation", "page"),
  doc("institute", "Institute", "Leadership development.", "/institute", "page"),
  doc("status", "System Status", "Corporate status dashboard.", "/status", "page"),
  doc("search", "Search", "Global search.", "/search", "page"),
  doc("trust", "Trust Center", "Central trust authority.", "/trust", "trust"),
  doc("security", "Security Center", "Security portal.", "/security", "policy"),
  doc("legal", "Legal Center", "Legal policies.", "/legal", "legal"),
  doc("compliance", "Compliance Center", "Compliance orientation.", "/compliance", "policy"),
  doc("support", "Support Center", "Product support queues.", "/support", "page"),
];

export function buildSearchIndex(): SharedSearchDocument[] {
  return [
    ...STATIC_PAGES,
    ...COMPANY_REGISTRY.filter((c) => c.id !== "hq").map((c) =>
      doc(`company-${c.id}`, c.name, c.description, `/companies/${c.id}`, "company", [
        c.excellence,
        c.tagline,
        c.domain,
      ]),
    ),
    ...TRUST_REGISTRY.map((t) =>
      doc(`trust-${t.id}`, t.title, t.summary, t.href, "trust", ["trust"]),
    ),
    ...LEGAL_REGISTRY.map((l) =>
      doc(`legal-${l.id}`, l.title, l.summary, l.href, "legal", ["legal", l.category]),
    ),
    ...SUPPORT_REGISTRY.map((q) =>
      doc(`support-${q.id}`, `${q.name} Support`, q.description, `/support/${q.id}`, "page", [
        "support",
      ]),
    ),
    ...DOWNLOAD_REGISTRY.map((d) =>
      doc(`download-${d.id}`, d.title, d.summary, d.href, "download", [d.kind]),
    ),
    ...STATUS_REGISTRY.map((s) =>
      doc(`status-${s.id}`, s.name, s.description, s.href ?? "/status", "page", ["status"]),
    ),
  ];
}

export const SEARCH_INDEX = buildSearchIndex();

export function searchShared(query: string, limit = 50): SharedSearchDocument[] {
  const q = query.trim().toLowerCase();
  const index = SEARCH_INDEX;
  if (!q) return index.slice(0, 24);
  return index
    .filter((doc) => {
      const hay = [doc.title, doc.summary, doc.category, ...doc.keywords]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    })
    .slice(0, limit);
}
