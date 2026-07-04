import type { MetadataRoute } from "next";
import { COMPANIES } from "@/lib/data";
import { PUBLIC_PAGE_AUDIT, getPublicLeadership } from "@/lib/institutional/public-site";
import { TRUST_SECTIONS } from "@/lib/authority/trust";
import { SECURITY_SECTIONS } from "@/lib/authority/security";
import { LEGAL_SECTIONS } from "@/lib/authority/legal";
import { SUPPORT_QUEUES } from "@/lib/authority/support";
import { COMPLIANCE_SECTIONS } from "@/lib/authority/compliance";

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

  const trustPages = TRUST_SECTIONS.filter((s) => s.href.startsWith("/trust/")).map((s) => ({
    url: `${base}${s.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const securityPages = SECURITY_SECTIONS.map((s) => ({
    url: `${base}${s.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legalPages = LEGAL_SECTIONS.filter((s) => s.href.startsWith("/legal/")).map((s) => ({
    url: `${base}${s.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const supportPages = SUPPORT_QUEUES.map((p) => ({
    url: `${base}/support/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const compliancePages = COMPLIANCE_SECTIONS.map((s) => ({
    url: `${base}${s.href}`,
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

  const aliases = [
    "/privacy",
    "/terms",
    "/cookies",
    "/security",
    "/brand",
    "/design-system",
    "/downloads",
    "/search",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
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
    ...aliases,
    ...companyPages,
    ...trustPages,
    ...securityPages,
    ...legalPages,
    ...supportPages,
    ...compliancePages,
    {
      url: `${base}/compliance`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/security`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...leadershipPages,
  ];
}
