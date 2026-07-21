/** Public corporate document repository categories — member depth remains gated. */

export const PUBLIC_LIBRARY_CATEGORIES = [
  {
    slug: "policies",
    title: "Policies",
    summary: "Institutional policies published for public reference.",
    href: "/legal",
  },
  {
    slug: "governance",
    title: "Governance",
    summary: "How Stankings Legacy Ltd is structured and led.",
    href: "/constitution",
  },
  {
    slug: "annual-reports",
    title: "Annual Reports",
    summary: "Stewardship reporting is published through constitutional channels as reports mature.",
    href: "/investors",
  },
  {
    slug: "press",
    title: "Press",
    summary: "Media resources and institutional boilerplate.",
    href: "/press",
  },
  {
    slug: "guides",
    title: "Guides",
    summary: "How to engage support, trust, and legal resources.",
    href: "/support",
  },
  {
    slug: "brand-assets",
    title: "Brand Assets",
    summary: "Logos and approved brand materials for accredited use.",
    href: "/media",
  },
  {
    slug: "engineering",
    title: "Engineering",
    summary: "Developer references and platform independence principles.",
    href: "/developer",
  },
  {
    slug: "security",
    title: "Security",
    summary: "Security practices and responsible disclosure.",
    href: "/security",
  },
  {
    slug: "developer-resources",
    title: "Developer Resources",
    summary: "Ecosystem developer orientation — products host their own APIs.",
    href: "/developer",
  },
] as const;
