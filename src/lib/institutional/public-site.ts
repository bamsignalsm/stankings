/**
 * Stankings.com public institutional site — Sprint 010
 * Shared identity only. No product runtime, auth, or payments.
 */

import { COMPANIES, LIVE_PLATFORMS, SITE } from "@/lib/data";
import { LEADERSHIP_PROFILES } from "@/lib/leadership/profiles";

export const INSTITUTIONAL_CONTACT = {
  general: "hello@stankings.com",
  support: "support@stankings.com",
  trust: "trust@stankings.com",
  security: "security@stankings.com",
  legal: "legal@stankings.com",
  privacy: "privacy@stankings.com",
  press: "press@stankings.com",
  careers: "careers@stankings.com",
  disclosure: "security@stankings.com",
  lawEnforcement: "legal@stankings.com",
  dataRequests: "privacy@stankings.com",
  accessibility: "accessibility@stankings.com",
} as const;

export type PublicPageStatus = "live" | "draft" | "planned";

export interface PublicPageAudit {
  slug: string;
  label: string;
  href: string;
  status: PublicPageStatus;
  phase: string;
}

/** Phase 1 — required public sections audit registry */
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
  { slug: "security", label: "Security", href: "/trust/security-practices", status: "live", phase: "Trust Center" },
  { slug: "privacy", label: "Privacy", href: "/legal/privacy", status: "live", phase: "Legal Center" },
  { slug: "terms", label: "Terms", href: "/legal/terms", status: "live", phase: "Legal Center" },
  { slug: "cookies", label: "Cookie Policy", href: "/legal/cookies", status: "live", phase: "Legal Center" },
  { slug: "accessibility", label: "Accessibility", href: "/legal/accessibility", status: "live", phase: "Legal Center" },
  { slug: "status", label: "System Status", href: "/status", status: "live", phase: "System Status" },
  { slug: "developer", label: "Developer", href: "/developer", status: "live", phase: "Public Website" },
  { slug: "press", label: "Press Kit", href: "/press", status: "live", phase: "Public Website" },
  { slug: "legal", label: "Legal Center", href: "/legal", status: "live", phase: "Legal Center" },
];

export interface InstitutionalSection {
  slug: string;
  title: string;
  summary: string;
  href: string;
}

export const TRUST_CENTER_SECTIONS: InstitutionalSection[] = [
  {
    slug: "privacy-principles",
    title: "Privacy Principles",
    summary: "How Stankings Group treats personal data across institutional and product boundaries.",
    href: "/trust/privacy-principles",
  },
  {
    slug: "security-practices",
    title: "Security Practices",
    summary: "Baseline security expectations for institutional platforms and referenced products.",
    href: "/trust/security-practices",
  },
  {
    slug: "responsible-disclosure",
    title: "Responsible Disclosure",
    summary: "Report security vulnerabilities safely and receive a good-faith response.",
    href: "/trust/responsible-disclosure",
  },
  {
    slug: "data-requests",
    title: "Data Requests",
    summary: "Access, correction, portability, and deletion requests for institutional data.",
    href: "/trust/data-requests",
  },
  {
    slug: "law-enforcement",
    title: "Law Enforcement Requests",
    summary: "How we evaluate and respond to lawful requests while protecting user rights.",
    href: "/trust/law-enforcement",
  },
  {
    slug: "account-recovery",
    title: "Account Recovery",
    summary: "Recovery paths for institutional member accounts and product account routing.",
    href: "/trust/account-recovery",
  },
  {
    slug: "transparency-reports",
    title: "Transparency Reports",
    summary: "Periodic summaries of requests, incidents, and trust actions.",
    href: "/trust/transparency-reports",
  },
  {
    slug: "platform-safety",
    title: "Platform Safety",
    summary: "Safety principles for platforms referenced by the Stankings ecosystem.",
    href: "/trust/platform-safety",
  },
  {
    slug: "user-safety",
    title: "User Safety",
    summary: "Guidance for users interacting with Stankings Group properties and live platforms.",
    href: "/trust/user-safety",
  },
];

export interface SupportProduct {
  slug: string;
  name: string;
  domain: string;
  url: string;
  supportEmail: string;
  description: string;
  topics: string[];
}

export const SUPPORT_PRODUCTS: SupportProduct[] = [
  {
    slug: "bamsignal",
    name: "BamSignal",
    domain: "bamsignal.com",
    url: "https://bamsignal.com",
    supportEmail: "support@bamsignal.com",
    description: "Relationships, identity, and community support.",
    topics: ["Account access", "Verification", "Safety reports", "Billing via BayRight"],
  },
  {
    slug: "yike",
    name: "Yike",
    domain: "yike.ng",
    url: "https://yike.ng",
    supportEmail: "support@yike.ng",
    description: "Marketplace listings, vendors, and trust operations.",
    topics: ["Listings", "Vendor accounts", "Verification", "Disputes"],
  },
  {
    slug: "bayright",
    name: "BayRight",
    domain: "bayright.com",
    url: "https://bayright.com",
    supportEmail: "support@bayright.com",
    description: "Payments, escrow, bills, and wallet support.",
    topics: ["Transactions", "Escrow", "Bill payments", "KYC & compliance"],
  },
  {
    slug: "general",
    name: "General Enquiries",
    domain: "stankings.com",
    url: "https://stankings.com",
    supportEmail: INSTITUTIONAL_CONTACT.general,
    description: "Institutional questions, partnerships, and media routing.",
    topics: ["Partnerships", "Institutional membership", "Governance", "Press"],
  },
];

export interface LegalDocument {
  slug: string;
  title: string;
  summary: string;
  product?: "stankings" | "bamsignal" | "yike" | "bayright";
  externalUrl?: string;
}

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  { slug: "privacy", title: "Privacy Policy", summary: "Stankings Group institutional privacy policy.", product: "stankings" },
  { slug: "terms", title: "Terms of Use", summary: "Terms governing use of stankings.com.", product: "stankings" },
  { slug: "community-guidelines", title: "Community Guidelines", summary: "Expected conduct across Stankings-affiliated communities.", product: "stankings" },
  { slug: "acceptable-use", title: "Acceptable Use", summary: "Prohibited uses of institutional properties and services.", product: "stankings" },
  { slug: "cookies", title: "Cookie Policy", summary: "Cookies and similar technologies on stankings.com.", product: "stankings" },
  { slug: "data-retention", title: "Data Retention", summary: "Retention schedules for institutional records.", product: "stankings" },
  { slug: "refunds", title: "Refund Policy", summary: "Institutional refund posture — product billing is handled by each platform.", product: "stankings" },
  { slug: "accessibility", title: "Accessibility Statement", summary: "Commitment to accessible institutional communications.", product: "stankings" },
  { slug: "bamsignal-privacy", title: "BamSignal Privacy Policy", summary: "Product privacy policy hosted on bamsignal.com.", product: "bamsignal", externalUrl: "https://bamsignal.com/privacy" },
  { slug: "bamsignal-terms", title: "BamSignal Terms", summary: "Product terms hosted on bamsignal.com.", product: "bamsignal", externalUrl: "https://bamsignal.com/terms" },
  { slug: "yike-privacy", title: "Yike Privacy Policy", summary: "Product privacy policy hosted on yike.ng.", product: "yike", externalUrl: "https://yike.ng/privacy" },
  { slug: "yike-terms", title: "Yike Terms", summary: "Product terms hosted on yike.ng.", product: "yike", externalUrl: "https://yike.ng/terms" },
  { slug: "bayright-privacy", title: "BayRight Privacy Policy", summary: "Product privacy policy hosted on bayright.com.", product: "bayright", externalUrl: "https://bayright.com/privacy" },
  { slug: "bayright-terms", title: "BayRight Terms", summary: "Product terms hosted on bayright.com.", product: "bayright", externalUrl: "https://bayright.com/terms" },
];

export type ServiceStatus = "operational" | "maintenance" | "incident" | "resolved";

export interface StatusComponent {
  id: string;
  name: string;
  status: ServiceStatus;
  message: string;
}

export interface StatusIncident {
  id: string;
  product: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  startedAt: string;
  resolvedAt?: string;
  summary: string;
}

export interface ProductStatus {
  slug: string;
  name: string;
  url: string;
  overall: ServiceStatus;
  uptime90d: string;
  components: StatusComponent[];
}

/** Public status snapshot — informational only, no operational controls */
export const STATUS_SNAPSHOT = {
  updatedAt: "2026-07-03T18:00:00Z",
  products: [
    {
      slug: "stankings",
      name: "Stankings HQ",
      url: "https://stankings.com",
      overall: "operational" as ServiceStatus,
      uptime90d: "99.9%",
      components: [
        { id: "web", name: "Public Website", status: "operational", message: "All public pages serving normally." },
        { id: "auth", name: "Member Authentication", status: "operational", message: "Supabase auth available." },
        { id: "library", name: "Library Portal", status: "operational", message: "Member library accessible." },
      ],
    },
    {
      slug: "bamsignal",
      name: "BamSignal",
      url: "https://bamsignal.com",
      overall: "maintenance" as ServiceStatus,
      uptime90d: "99.5%",
      components: [
        { id: "app", name: "Web Application", status: "operational", message: "Core app available." },
        { id: "android", name: "Android App", status: "maintenance", message: "Play Store resubmission in progress." },
        { id: "push", name: "Push Notifications", status: "operational", message: "FCM configured." },
      ],
    },
    {
      slug: "yike",
      name: "Yike",
      url: "https://yike.ng",
      overall: "operational" as ServiceStatus,
      uptime90d: "99.7%",
      components: [
        { id: "marketplace", name: "Marketplace", status: "operational", message: "Listings and search available." },
        { id: "vendor", name: "Vendor Portal", status: "operational", message: "Vendor operations normal." },
      ],
    },
    {
      slug: "bayright",
      name: "BayRight",
      url: "https://bayright.com",
      overall: "incident" as ServiceStatus,
      uptime90d: "99.2%",
      components: [
        { id: "wallet", name: "Wallet", status: "operational", message: "Wallet services available." },
        { id: "bills", name: "Bill Payments", status: "incident", message: "Peyflex provider certification in progress — some bill categories degraded." },
        { id: "escrow", name: "Escrow", status: "operational", message: "Escrow flows operational." },
      ],
    },
  ] satisfies ProductStatus[],
  incidents: [
    {
      id: "BR-2026-001",
      product: "BayRight",
      title: "Bill payments degraded — provider certification",
      status: "identified",
      startedAt: "2026-06-28T08:00:00Z",
      summary: "Bill payment category reporting degraded while Peyflex live UAT completes. Wallet and escrow unaffected.",
    },
    {
      id: "BS-2026-001",
      product: "BamSignal",
      title: "Android closed testing resubmission",
      status: "monitoring",
      startedAt: "2026-06-20T12:00:00Z",
      summary: "Native experience remediation complete. Awaiting device certification and Play upload.",
    },
  ] satisfies StatusIncident[],
  history: [
    { month: "2026-06", stankings: "99.9%", bamsignal: "99.5%", yike: "99.7%", bayright: "99.2%" },
    { month: "2026-05", stankings: "99.9%", bamsignal: "99.6%", yike: "99.8%", bayright: "99.4%" },
    { month: "2026-04", stankings: "99.8%", bamsignal: "99.7%", yike: "99.7%", bayright: "99.5%" },
  ],
};

export function getTrustSection(slug: string) {
  return TRUST_CENTER_SECTIONS.find((s) => s.slug === slug);
}

export function getSupportProduct(slug: string) {
  return SUPPORT_PRODUCTS.find((p) => p.slug === slug);
}

export function getLegalDocument(slug: string) {
  return LEGAL_DOCUMENTS.find((d) => d.slug === slug);
}

export function getPublicLeadership() {
  return LEADERSHIP_PROFILES.filter((p) => p.status === "active" || p.slug === "stanley-ukeje");
}

export const INSTITUTIONAL_FOOTER_GROUPS = [
  {
    title: "Institution",
    links: [
      { href: "/about", label: "About" },
      { href: "/companies", label: "Companies" },
      { href: "/leadership", label: "Leadership" },
      { href: "/constitution", label: "Constitution" },
      { href: "/library", label: "The Library" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Trust & Legal",
    links: [
      { href: "/trust", label: "Trust Center" },
      { href: "/legal", label: "Legal Center" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/cookies", label: "Cookies" },
      { href: "/legal/accessibility", label: "Accessibility" },
    ],
  },
  {
    title: "Support & Status",
    links: [
      { href: "/support", label: "Support Center" },
      { href: "/contact", label: "Contact" },
      { href: "/status", label: "System Status" },
      { href: "/media", label: "Media" },
      { href: "/press", label: "Press Kit" },
      { href: "/developer", label: "Developer" },
    ],
  },
] as const;

export { COMPANIES, LIVE_PLATFORMS, SITE };
