/**
 * Company registry — single source for every Stankings company.
 */

import { CONTACTS } from "@/lib/shared/config/contacts";

export type CompanyLaunchStatus =
  | "operating"
  | "in_development"
  | "institutional"
  | "frozen";

export interface CompanyBrandColors {
  primary: string;
  accent?: string;
}

export interface CompanyRecord {
  id: string;
  name: string;
  domain: string;
  url: string;
  supportEmail: string;
  legalEmail: string;
  trustEmail: string;
  securityEmail: string;
  status: CompanyLaunchStatus;
  logo?: string;
  brandColors: CompanyBrandColors;
  launchStatus: string;
  storeUrls: { android?: string; ios?: string; web?: string };
  description: string;
  tagline: string;
  excellence: string;
  mission: string;
  services: string[];
  areaOfOperation: string;
  relationshipToHq: string;
  supportPath: string;
  legalPath: string;
  privacyPath: string;
  roadmap: string[];
  isLive?: boolean;
  icon: string;
}

export const COMPANY_REGISTRY: CompanyRecord[] = [
  {
    id: "hq",
    name: "Stankings HQ",
    domain: "stankings.com",
    url: "https://stankings.com",
    supportEmail: CONTACTS.support,
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "institutional",
    logo: "/images/logo.webp",
    brandColors: { primary: "#D4A64A", accent: "#070707" },
    launchStatus: "Stage 1 — Active Deployment",
    storeUrls: { web: "https://stankings.com" },
    description:
      "Institutional headquarters — trust, legal, support, compliance, and governance for the ecosystem.",
    tagline: "Institutional headquarters",
    excellence: "Institutional Excellence",
    mission: "Provide shared institutional identity and trust infrastructure.",
    services: ["Trust Center", "Legal Center", "Support Center", "Security Center", "Library"],
    areaOfOperation: "Global institutional — Lagos HQ",
    relationshipToHq: "This is Stankings HQ.",
    supportPath: "/support/hq",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Production deploy", "Stage 1 exit", "Maintenance mode"],
    icon: "◆",
  },
  {
    id: "bamsignal",
    name: "BamSignal",
    domain: "bamsignal.com",
    url: "https://bamsignal.com",
    supportEmail: "support@bamsignal.com",
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "operating",
    brandColors: { primary: "#EC4899" },
    launchStatus: "Stage 2 — Queued (Observation)",
    storeUrls: { web: "https://bamsignal.com" },
    description:
      "Trusted relationships, verified identity, and community. Independent product runtime.",
    tagline: "Trusted relationships & community",
    excellence: "Relationship & Community Excellence",
    mission:
      "To provide trusted relationships and social discovery for a generation that values authenticity.",
    services: [
      "Verified matchmaking",
      "Identity & reputation",
      "Community building",
      "Trust network integration",
    ],
    areaOfOperation: "Nigeria and digital markets — relationships and community",
    relationshipToHq:
      "Independent operating company. Consumes HQ trust, legal, and support standards.",
    supportPath: "/support/bamsignal",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Mobile distribution and closed testing",
      "Identity and reputation infrastructure",
    ],
    isLive: true,
    icon: "♥",
  },
  {
    id: "yike",
    name: "Yike",
    domain: "yike.ng",
    url: "https://yike.ng",
    supportEmail: "support@yike.ng",
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "operating",
    brandColors: { primary: "#0EA5E9" },
    launchStatus: "Stage 3 — Queued (Frozen)",
    storeUrls: { web: "https://yike.ng" },
    description:
      "Nigeria's trusted marketplace for properties, vehicles, and equipment.",
    tagline: "Nigeria's trusted marketplace infrastructure",
    excellence: "Marketplace Excellence",
    mission: "To become Nigeria's trusted marketplace infrastructure for high-value assets.",
    services: [
      "Property marketplace",
      "Vehicle marketplace",
      "Equipment & machinery listings",
      "Trust engine & verification",
    ],
    areaOfOperation: "Nigeria — digital marketplace for high-value assets",
    relationshipToHq:
      "Independent operating company. Consumes HQ trust, legal, and support standards.",
    supportPath: "/support/yike",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Marketplace trust capabilities", "Vendor operations tooling"],
    isLive: true,
    icon: "◆",
  },
  {
    id: "bayright",
    name: "BayRight",
    domain: "bayright.com",
    url: "https://bayright.com",
    supportEmail: "support@bayright.com",
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "operating",
    brandColors: { primary: "#10B981" },
    launchStatus: "Stage 4 — Queued (Recovery)",
    storeUrls: { web: "https://bayright.com" },
    description:
      "Financial infrastructure — escrow, bills, and institutional payments.",
    tagline: "Financial infrastructure you can trust",
    excellence: "Financial Excellence",
    mission:
      "To provide trusted financial infrastructure for individuals, businesses, and institutions.",
    services: ["Escrow services", "Utility bill payments", "Institutional payments"],
    areaOfOperation: "Nigeria — payments, escrow, and bill infrastructure",
    relationshipToHq:
      "Independent financial company. Consumes HQ trust, legal, and support standards.",
    supportPath: "/support/bayright",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Provider certification", "Wallet and escrow reliability"],
    isLive: true,
    icon: "₦",
  },
  {
    id: "stanhan",
    name: "Stanhan",
    domain: "stankings.com",
    url: "https://stankings.com/companies/stanhan",
    supportEmail: CONTACTS.hello,
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "in_development",
    brandColors: { primary: "#8B5CF6" },
    launchStatus: "In development",
    storeUrls: {},
    description:
      "Property development and verification arm of Stankings Group.",
    tagline: "Property development & verification",
    excellence: "Property Excellence",
    mission: "To become Africa's most trusted property development and verification company.",
    services: ["Property development", "Property verification & due diligence"],
    areaOfOperation: "Nigeria — property development and verification",
    relationshipToHq: "Property operating company within Stankings Group.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Property verification standards", "Development pipeline governance"],
    icon: "⌂",
  },
  {
    id: "stankings-auto-hub",
    name: "Stankings Auto Hub",
    domain: "stankings.com",
    url: "https://stankings.com/companies/stankings-auto-hub",
    supportEmail: CONTACTS.hello,
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "in_development",
    brandColors: { primary: "#F59E0B" },
    launchStatus: "In development",
    storeUrls: {},
    description: "Automotive sales, inspection, and fleet services.",
    tagline: "Africa's most trusted automotive company",
    excellence: "Automotive Excellence",
    mission: "To become Africa's most trusted automotive company.",
    services: ["Vehicle sales & certified pre-owned", "Vehicle inspection"],
    areaOfOperation: "Nigeria — automotive sales, inspection, and fleet",
    relationshipToHq: "Automotive operating company within Stankings Group.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Inspection standards", "Fleet programmes"],
    icon: "⚙",
  },
  {
    id: "hannahkings-gadgets",
    name: "Hannahkings Gadgets",
    domain: "stankings.com",
    url: "https://stankings.com/companies/hannahkings-gadgets",
    supportEmail: CONTACTS.hello,
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "in_development",
    brandColors: { primary: "#06B6D4" },
    launchStatus: "In development",
    storeUrls: {},
    description: "Technology procurement and devices for the Group and public.",
    tagline: "Technology procurement & devices",
    excellence: "Technology Procurement & Device Excellence",
    mission: "To provide trusted technology procurement for the Group and the public.",
    services: ["Consumer electronics", "Inspection kits & field equipment"],
    areaOfOperation: "Nigeria — technology procurement and devices",
    relationshipToHq: "Procurement company serving Group institutions.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Internal procurement excellence", "Asset tracking"],
    icon: "▣",
  },
  {
    id: "stankings-institute",
    name: "The Stankings Institute",
    domain: "stankings.com",
    url: "https://stankings.com/institute",
    supportEmail: CONTACTS.hello,
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "institutional",
    brandColors: { primary: "#6366F1" },
    launchStatus: "Institutional programme active",
    storeUrls: { web: "https://stankings.com/institute" },
    description: "Leadership and custodian development for Stankings Group.",
    tagline: "Leadership & knowledge development",
    excellence: "Leadership & Knowledge Excellence",
    mission: "To develop ethical leaders and preserve institutional knowledge across generations.",
    services: ["Custodian Programme", "Leadership curriculum"],
    areaOfOperation: "Institutional — leadership and custodian development",
    relationshipToHq: "Constitutional education institution of Stankings Group.",
    supportPath: "/support/institute",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Custodian Programme curriculum", "Leadership stewardship standards"],
    icon: "✦",
  },
  {
    id: "hannahkings-education",
    name: "Hannahkings Education",
    domain: "stankings.com",
    url: "https://stankings.com/companies/hannahkings-education",
    supportEmail: CONTACTS.hello,
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "in_development",
    brandColors: { primary: "#14B8A6" },
    launchStatus: "In development",
    storeUrls: {},
    description: "Educational institutions from early years through tertiary ambition.",
    tagline: "Educational excellence from cradle to career",
    excellence: "Educational Excellence",
    mission: "To provide world-class education that shapes future leaders and citizens.",
    services: ["Hannahkings Academy", "Hannahkings College"],
    areaOfOperation: "Nigeria — education",
    relationshipToHq: "Education pillar of Stankings Group.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Academy and college programmes", "Professional training pathways"],
    icon: "✎",
  },
  {
    id: "stankings-foundation",
    name: "Stankings Foundation",
    domain: "stankings.com",
    url: "https://stankings.com/foundation",
    supportEmail: CONTACTS.foundation,
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "institutional",
    brandColors: { primary: "#F43F5E" },
    launchStatus: "Foundation mandate active",
    storeUrls: { web: "https://stankings.com/foundation" },
    description: "Community and social impact institution of Stankings Group.",
    tagline: "Community & social impact",
    excellence: "Community & Social Impact Excellence",
    mission: "To create measurable, lasting social impact in the communities we serve.",
    services: ["Community development", "Youth empowerment"],
    areaOfOperation: "Community and social impact programmes",
    relationshipToHq: "Philanthropic institution of Stankings Group.",
    supportPath: "/support/foundation",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Community development programmes", "Scholarship initiatives"],
    icon: "❋",
  },
  {
    id: "stankings-logistics",
    name: "Stankings Logistics",
    domain: "stankings.com",
    url: "https://stankings.com/companies/stankings-logistics",
    supportEmail: CONTACTS.hello,
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "in_development",
    brandColors: { primary: "#78716C" },
    launchStatus: "In development",
    storeUrls: {},
    description: "Trusted movement of goods across the ecosystem.",
    tagline: "Trusted movement of goods",
    excellence: "Logistics Excellence",
    mission: "To provide trusted logistics and haulage services across Nigeria and beyond.",
    services: ["Corporate fleet leasing", "Haulage services"],
    areaOfOperation: "Nigeria — haulage, fleet, and supply movement",
    relationshipToHq: "Logistics operating company within Stankings Group.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Fleet and haulage reliability", "Port and import handling"],
    icon: "→",
  },
];

export function getCompany(id: string): CompanyRecord | undefined {
  return COMPANY_REGISTRY.find((c) => c.id === id);
}

export function getCompanyByDomain(domain: string): CompanyRecord | undefined {
  return COMPANY_REGISTRY.find((c) => c.domain === domain);
}

export function getLiveCompanies(): CompanyRecord[] {
  return COMPANY_REGISTRY.filter((c) => c.isLive);
}

export function getOperatingCompanies(): CompanyRecord[] {
  return COMPANY_REGISTRY.filter((c) => c.status === "operating" || c.isLive);
}

/** Compatibility shape for legacy Company type consumers */
export function toLegacyCompany(c: CompanyRecord) {
  return {
    slug: c.id === "hq" ? "stankings-hq" : c.id,
    name: c.name,
    tagline: c.tagline,
    excellence: c.excellence,
    description: c.description,
    mission: c.mission,
    services: c.services,
    website: c.domain !== "stankings.com" || c.isLive ? c.domain : undefined,
    isLive: c.isLive,
    color: c.brandColors.primary,
    icon: c.icon,
  };
}

export function getLegacyCompanies() {
  return COMPANY_REGISTRY.filter((c) => c.id !== "hq").map(toLegacyCompany);
}
