/**
 * Global search index — documentation, companies, policies, resources, pages.
 * Static, HQ-origin content only.
 */

import { COMPANIES } from "@/lib/data";
import { TRUST_SECTIONS } from "@/lib/authority/trust";
import { SECURITY_SECTIONS } from "@/lib/authority/security";
import { LEGAL_SECTIONS } from "@/lib/authority/legal";
import { COMPLIANCE_SECTIONS } from "@/lib/authority/compliance";
import { SUPPORT_QUEUES } from "@/lib/authority/support";
import { PUBLIC_LIBRARY_CATEGORIES } from "@/lib/corporate/public-library";

export type SearchCategory =
  | "page"
  | "company"
  | "policy"
  | "documentation"
  | "resource";

export interface SearchDocument {
  id: string;
  title: string;
  summary: string;
  href: string;
  category: SearchCategory;
  keywords: string[];
}

function doc(
  id: string,
  title: string,
  summary: string,
  href: string,
  category: SearchCategory,
  keywords: string[] = [],
): SearchDocument {
  return { id, title, summary, href, category, keywords };
}

export const SEARCH_INDEX: SearchDocument[] = [
  doc("home", "Home", "Stankings Group institutional homepage.", "/", "page", ["hq", "group"]),
  doc("about", "About", "Mission, vision, and institutional pillars.", "/about", "page"),
  doc("companies", "Companies", "Centers of Excellence across the ecosystem.", "/companies", "page"),
  doc("leadership", "Leadership", "Stewardship and governance leadership.", "/leadership", "page"),
  doc("constitution", "Constitution", "Volume I — Group Constitution overview.", "/constitution", "documentation"),
  doc("library", "Library", "Corporate document repository.", "/library", "documentation"),
  doc("careers", "Careers", "Hiring and open positions.", "/careers", "page"),
  doc("contact", "Contact", "Institutional contact channels.", "/contact", "page"),
  doc("press", "Press", "Press kit and media contacts.", "/press", "resource"),
  doc("media", "Media", "Brand gallery and assets.", "/media", "resource"),
  doc("brand", "Brand Center", "Logos, colors, fonts, and usage rules.", "/brand", "resource"),
  doc("downloads", "Download Center", "Press kit, profiles, and brand downloads.", "/downloads", "resource"),
  doc("developer", "Developer Center", "APIs, auth, webhooks, and product developer links.", "/developer", "documentation"),
  doc("partners", "Partners", "Partnership engagement.", "/partners", "page"),
  doc("investors", "Investors", "Capital and stewardship orientation.", "/investors", "page"),
  doc("foundation", "Foundation", "Community and social impact.", "/foundation", "page"),
  doc("institute", "Institute", "Leadership and custodian development.", "/institute", "page"),
  doc("status", "System Status", "Corporate status dashboard.", "/status", "page"),
  doc("search", "Search", "Global search across HQ resources.", "/search", "page"),
  doc("trust", "Trust Center", "Central trust authority.", "/trust", "policy"),
  doc("security", "Security Center", "Security portal and disclosure.", "/security", "policy"),
  doc("legal", "Legal Center", "Terms, privacy, and legal policies.", "/legal", "policy"),
  doc("compliance", "Compliance Center", "Shared compliance orientation.", "/compliance", "policy"),
  doc("support", "Support Center", "Product support queues.", "/support", "page"),
  ...COMPANIES.map((c) =>
    doc(`company-${c.slug}`, c.name, c.description, `/companies/${c.slug}`, "company", [
      c.excellence,
      c.tagline,
    ]),
  ),
  ...TRUST_SECTIONS.map((s) =>
    doc(`trust-${s.slug}`, s.title, s.summary, s.href, "policy", ["trust"]),
  ),
  ...SECURITY_SECTIONS.map((s) =>
    doc(`security-${s.slug}`, s.title, s.summary, s.href, "policy", ["security"]),
  ),
  ...LEGAL_SECTIONS.map((s) =>
    doc(`legal-${s.slug}`, s.title, s.summary, s.href, "policy", ["legal"]),
  ),
  ...COMPLIANCE_SECTIONS.map((s) =>
    doc(`compliance-${s.slug}`, s.title, s.summary, s.href, "policy", ["compliance"]),
  ),
  ...SUPPORT_QUEUES.map((q) =>
    doc(`support-${q.slug}`, `${q.name} Support`, q.description, `/support/${q.slug}`, "page", [
      "support",
    ]),
  ),
  ...PUBLIC_LIBRARY_CATEGORIES.map((c) =>
    doc(`lib-${c.slug}`, c.title, c.summary, c.href, "documentation", ["library"]),
  ),
];

export function searchDocuments(query: string): SearchDocument[] {
  const q = query.trim().toLowerCase();
  if (!q) return SEARCH_INDEX.slice(0, 24);
  return SEARCH_INDEX.filter((doc) => {
    const hay = [doc.title, doc.summary, doc.category, ...doc.keywords]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  }).slice(0, 50);
}
