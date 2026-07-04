/**
 * Public site compatibility exports.
 * Prefer @/lib/shared for new code.
 */

import { LEADERSHIP_PROFILES } from "@/lib/leadership/profiles";
import { INSTITUTIONAL_CONTACT as SHARED_CONTACTS } from "@/lib/shared/config/contacts";

export { COMPANIES, LIVE_PLATFORMS, SITE } from "@/lib/data";

export const INSTITUTIONAL_CONTACT = SHARED_CONTACTS;

export type PublicPageStatus = "live" | "draft" | "planned";

export interface PublicPageAudit {
  slug: string;
  label: string;
  href: string;
  status: PublicPageStatus;
  phase: string;
}

/** Public route registry for sitemap and audits */
export const PUBLIC_PAGE_AUDIT: PublicPageAudit[] = [
  { slug: "home", label: "Home", href: "/", status: "live", phase: "Public Website" },
  { slug: "about", label: "About", href: "/about", status: "live", phase: "Public Website" },
  { slug: "companies", label: "Companies", href: "/companies", status: "live", phase: "Public Website" },
  { slug: "leadership", label: "Leadership", href: "/leadership", status: "live", phase: "Public Website" },
  { slug: "constitution", label: "Constitution", href: "/constitution", status: "live", phase: "Public Website" },
  { slug: "library", label: "Library", href: "/library", status: "live", phase: "Public Website" },
  { slug: "support", label: "Support", href: "/support", status: "live", phase: "Support Center" },
  { slug: "contact", label: "Contact", href: "/contact", status: "live", phase: "Public Website" },
  { slug: "careers", label: "Careers", href: "/careers", status: "live", phase: "Public Website" },
  { slug: "media", label: "Media", href: "/media", status: "live", phase: "Public Website" },
  { slug: "trust", label: "Trust Center", href: "/trust", status: "live", phase: "Trust Center" },
  { slug: "security", label: "Security", href: "/security", status: "live", phase: "Security Center" },
  { slug: "compliance", label: "Compliance", href: "/compliance", status: "live", phase: "Compliance Center" },
  { slug: "privacy", label: "Privacy", href: "/legal/privacy", status: "live", phase: "Legal Center" },
  { slug: "terms", label: "Terms", href: "/legal/terms", status: "live", phase: "Legal Center" },
  { slug: "cookies", label: "Cookie Policy", href: "/legal/cookies", status: "live", phase: "Legal Center" },
  { slug: "accessibility", label: "Accessibility", href: "/legal/accessibility", status: "live", phase: "Legal Center" },
  { slug: "status", label: "System Status", href: "/status", status: "live", phase: "System Status" },
  { slug: "developer", label: "Developer", href: "/developer", status: "live", phase: "Public Website" },
  { slug: "design-system", label: "Design System", href: "/design-system", status: "live", phase: "Public Website" },
  { slug: "brand", label: "Brand", href: "/brand", status: "live", phase: "Public Website" },
  { slug: "downloads", label: "Downloads", href: "/downloads", status: "live", phase: "Public Website" },
  { slug: "search", label: "Search", href: "/search", status: "live", phase: "Public Website" },
  { slug: "press", label: "Press Kit", href: "/press", status: "live", phase: "Public Website" },
  { slug: "legal", label: "Legal Center", href: "/legal", status: "live", phase: "Legal Center" },
  { slug: "partners", label: "Partners", href: "/partners", status: "live", phase: "Public Website" },
  { slug: "investors", label: "Investors", href: "/investors", status: "live", phase: "Public Website" },
  { slug: "foundation", label: "Foundation", href: "/foundation", status: "live", phase: "Public Website" },
  { slug: "institute", label: "Institute", href: "/institute", status: "live", phase: "Public Website" },
];

export function getPublicLeadership() {
  return LEADERSHIP_PROFILES.filter((p) => p.status === "active" || p.slug === "stanley-ukeje");
}
