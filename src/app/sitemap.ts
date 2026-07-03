import type { MetadataRoute } from "next";
import { COMPANIES } from "@/lib/data";
import {
  LEGAL_DOCUMENTS,
  PUBLIC_PAGE_AUDIT,
  TRUST_CENTER_SECTIONS,
  SUPPORT_PRODUCTS,
} from "@/lib/institutional/public-site";
import { getPublicLeadership } from "@/lib/institutional/public-site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://stankings.com";
  const now = new Date();

  const staticPages = PUBLIC_PAGE_AUDIT.filter((p) => p.slug !== "home").map((p) => ({
    url: `${base}${p.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.href === "/about" || p.href === "/trust" ? 0.9 : 0.7,
  }));

  const companyPages = COMPANIES.map((c) => ({
    url: `${base}/companies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const trustPages = TRUST_CENTER_SECTIONS.map((s) => ({
    url: `${base}${s.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legalPages = LEGAL_DOCUMENTS.filter((d) => !d.externalUrl).map((d) => ({
    url: `${base}/legal/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const supportPages = SUPPORT_PRODUCTS.map((p) => ({
    url: `${base}/support/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const leadershipPages = getPublicLeadership().map((p) => ({
    url: `${base}/leadership/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/members`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...staticPages,
    ...companyPages,
    ...trustPages,
    ...legalPages,
    ...supportPages,
    ...leadershipPages,
  ];
}
