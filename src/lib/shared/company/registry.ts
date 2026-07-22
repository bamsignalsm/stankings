/**
 * Company registry — single source of truth for every Stankings company.
 * Future subsidiaries require updating this registry only; UI, search, and
 * ecosystem maps consume it (or enrichment layers keyed by registry ids).
 */

import { CONTACTS } from "@/lib/shared/config/contacts";

export type CompanyLaunchStatus =
  | "operating"
  | "in_development"
  | "institutional"
  | "frozen";

/** Portfolio taxonomy for dashboards, filters, reports, and investor materials. */
export type BusinessSector =
  | "technology"
  | "marketplace"
  | "financial"
  | "property"
  | "automotive"
  | "logistics"
  | "media"
  | "hospitality"
  | "manufacturing"
  | "education"
  | "foundation"
  | "institutional"
  /** Classification for Legacy Live reports — not assigned to a COMPANY_REGISTRY subsidiary. */
  | "community_live_experiences";

export const BUSINESS_SECTOR_LABELS: Record<BusinessSector, string> = {
  technology: "Technology",
  marketplace: "Marketplace",
  financial: "Financial",
  property: "Property",
  automotive: "Automotive",
  logistics: "Logistics",
  media: "Media",
  hospitality: "Hospitality",
  manufacturing: "Manufacturing",
  education: "Education",
  foundation: "Foundation",
  institutional: "Institutional",
  community_live_experiences: "Community & Live Experiences",
};

export interface CompanyBrandColors {
  primary: string;
  accent?: string;
}

export interface CompanyRecord {
  id: string;
  /** Trading / brand name shown in UI */
  name: string;
  /** Registered legal entity name */
  legalName: string;
  businessSector: BusinessSector;
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
  /** Optional etymology / naming meaning (e.g. SHODIS) */
  nameMeaning?: string;
  flagshipProducts?: string[];
  strategicRole?: string;
}

export const COMPANY_REGISTRY: CompanyRecord[] = [
  {
    id: "hq",
    name: "Stankings HQ",
    legalName: "Stankings Legacy Ltd",
    businessSector: "institutional",
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
    strategicRole: "Parent company and constitutional headquarters of the ecosystem.",
  },
  {
    id: "bamsignal",
    name: "BamSignal",
    legalName: "BamSignal Ltd",
    businessSector: "technology",
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
    strategicRole:
      "Identity, community, relationship platform, and trust ecosystem for the Group. Hosts Singles Synergy and The Shared Path under Stankings Legacy Live — does not own those programmes and is not an events company.",
  },
  {
    id: "yike",
    name: "Yike",
    legalName: "Yike Ltd",
    businessSector: "marketplace",
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
    strategicRole: "Marketplace infrastructure — property listings and vehicle marketplace.",
  },
  {
    id: "bayright",
    name: "BayRight",
    legalName: "BayRight Ltd",
    businessSector: "financial",
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
    strategicRole: "Payments, billing, escrow, and financial services for the ecosystem.",
  },
  {
    id: "stanhan",
    name: "Stanhan",
    legalName: "Stanhan Real Estate Ltd",
    businessSector: "property",
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
      "Property development and verification arm of Stankings Legacy Ltd.",
    tagline: "Property development & verification",
    excellence: "Property Excellence",
    mission: "To become Africa's most trusted property development and verification company.",
    services: ["Property development", "Property verification & due diligence"],
    areaOfOperation: "Nigeria — property development and verification",
    relationshipToHq: "Property operating company within Stankings Legacy Ltd.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Property verification standards", "Development pipeline governance"],
    icon: "⌂",
    strategicRole:
      "Property acquisition, development, and housing — distinct from hospitality operations.",
  },
  {
    id: "stankings-auto-hub",
    name: "Stankings Auto Hub",
    legalName: "Stankings Auto Hub Ltd",
    businessSector: "automotive",
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
    relationshipToHq: "Automotive operating company within Stankings Legacy Ltd.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Inspection standards", "Fleet programmes"],
    icon: "⚙",
  },
  {
    id: "hannahkings-gadgets",
    name: "Hannahkings Gadgets",
    legalName: "Hannahkings Gadgets Ltd",
    businessSector: "technology",
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
    legalName: "The Stankings Institute",
    businessSector: "education",
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
    description: "Leadership and custodian development for Stankings Legacy Ltd.",
    tagline: "Leadership & knowledge development",
    excellence: "Leadership & Knowledge Excellence",
    mission: "To develop ethical leaders and preserve institutional knowledge across generations.",
    services: ["Custodian Programme", "Leadership curriculum"],
    areaOfOperation: "Institutional — leadership and custodian development",
    relationshipToHq: "Constitutional education institution of Stankings Legacy Ltd.",
    supportPath: "/support/institute",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Custodian Programme curriculum", "Leadership stewardship standards"],
    icon: "✦",
    strategicRole:
      "Leadership and knowledge institution. Hosts Leadership Summits and Business Forums under Stankings Legacy Live — does not own those programmes.",
  },
  {
    id: "hannahkings-education",
    name: "Hannahkings Education",
    legalName: "Hannahkings Education Ltd",
    businessSector: "education",
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
    relationshipToHq: "Education pillar of Stankings Legacy Ltd.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Academy and college programmes", "Professional training pathways"],
    icon: "✎",
  },
  {
    id: "stankings-foundation",
    name: "Stankings Foundation",
    legalName: "Stankings Foundation",
    businessSector: "foundation",
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
    description: "Community and social impact institution of Stankings Legacy Ltd.",
    tagline: "Community & social impact",
    excellence: "Community & Social Impact Excellence",
    mission: "To create measurable, lasting social impact in the communities we serve.",
    services: ["Community development", "Youth empowerment"],
    areaOfOperation: "Community and social impact programmes",
    relationshipToHq: "Philanthropic institution of Stankings Legacy Ltd.",
    supportPath: "/support/foundation",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Community development programmes", "Scholarship initiatives"],
    icon: "❋",
  },
  {
    id: "stankings-logistics",
    name: "Stankings Logistics",
    legalName: "Stankings Logistics Ltd",
    businessSector: "logistics",
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
    relationshipToHq: "Logistics operating company within Stankings Legacy Ltd.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: ["Fleet and haulage reliability", "Port and import handling"],
    icon: "→",
  },
  {
    id: "stankings-times",
    name: "Stankings Times",
    legalName: "Stankings Times Ltd",
    businessSector: "media",
    domain: "stankings.com",
    url: "https://stankings.com/companies/stankings-times",
    supportEmail: CONTACTS.hello,
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "in_development",
    brandColors: { primary: "#B45309" },
    launchStatus: "In development",
    storeUrls: {},
    description:
      "Official media and communications arm of Stankings Legacy Ltd — digital publishing, business news, and corporate storytelling.",
    tagline: "Media, publishing & corporate authority",
    excellence: "Media & Publishing Excellence",
    mission:
      "To build corporate authority, strengthen public trust, and promote every ecosystem company through owned media.",
    services: [
      "Digital publishing",
      "Daily business news",
      "Executive interviews",
      "Podcasts",
      "Industry reports",
      "Investigative journalism",
      "Corporate storytelling",
      "Thought leadership",
    ],
    areaOfOperation: "Africa — business media and corporate communications",
    relationshipToHq:
      "Media and communications subsidiary of Stankings Legacy Ltd. Supports every subsidiary through strategic communication.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Executive Briefing programme",
      "Founder Interviews series",
      "Stankings Times Awards",
      "Leadership Series",
    ],
    icon: "☰",
    flagshipProducts: [
      "Stankings Times Awards",
      "Executive Briefing",
      "Founder Interviews",
      "Leadership Series",
    ],
    strategicRole:
      "Official media and communications arm — build corporate authority, strengthen public trust, promote every ecosystem company, and create long-term relationships with business leaders across Africa. Hosts Stankings Times Awards and provides media for all Stankings Legacy Live programmes.",
  },
  {
    id: "stankings-hotel-and-suites",
    name: "Stankings Hotel & Suites",
    legalName: "Stankings Hotel & Suites Ltd",
    businessSector: "hospitality",
    domain: "stankings.com",
    url: "https://stankings.com/companies/stankings-hotel-and-suites",
    supportEmail: CONTACTS.hello,
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "in_development",
    brandColors: { primary: "#A16207" },
    launchStatus: "In development",
    storeUrls: {},
    description:
      "Premium hospitality, executive suites, conference facilities, and event venues — not a real estate development company.",
    tagline: "Hospitality, accommodation & event venues",
    excellence: "Hospitality Excellence",
    mission:
      "To provide the physical hospitality infrastructure for the Stankings ecosystem and its guests.",
    services: [
      "Hotel ownership & operations",
      "Premium hospitality",
      "Executive suites",
      "Conference facilities",
      "Event venues",
      "Corporate accommodation",
      "VIP guest hosting",
      "Serviced suites",
    ],
    areaOfOperation: "Nigeria — premium hospitality and corporate venues",
    relationshipToHq:
      "Hospitality operating company within Stankings Legacy Ltd. Property acquisition and development remain with Stanhan Real Estate Ltd.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Landmark hospitality asset acquisition",
      "Executive conference centres",
      "Premium serviced apartments",
      "Luxury hospitality experiences",
    ],
    icon: "◈",
    strategicRole:
      "Physical hospitality infrastructure for Stankings Legacy Live — primary venue for Singles Synergy, The Shared Path, Times Awards, summits, and forums (external venues until operational). Hospitality operations only — not real estate development.",
  },
  {
    id: "shodis-industries",
    name: "Shodis Industries",
    legalName: "Shodis Industries Ltd",
    businessSector: "manufacturing",
    domain: "stankings.com",
    url: "https://stankings.com/companies/shodis-industries",
    supportEmail: CONTACTS.hello,
    legalEmail: CONTACTS.legal,
    trustEmail: CONTACTS.trust,
    securityEmail: CONTACTS.security,
    status: "in_development",
    brandColors: { primary: "#57534E" },
    launchStatus: "In development",
    storeUrls: {},
    description:
      "Manufacturing, industrial production, and regional trade — factory-direct construction materials for the ecosystem and export markets.",
    tagline: "Manufacturing, industrial production & regional trade",
    excellence: "Manufacturing & Industrial Excellence",
    mission:
      "To provide factory-direct construction materials for Stanhan developments, hospitality projects, and regional export markets.",
    services: [
      "Manufacturing",
      "Factory production",
      "Industrial processing",
      "Regional distribution",
      "Construction materials",
      "Export trade",
    ],
    areaOfOperation: "Nigeria and regional markets — industrial production and trade",
    relationshipToHq:
      "Manufacturing subsidiary of Stankings Legacy Ltd. Supplies Stanhan Real Estate, Stankings Hotel & Suites, and future infrastructure projects.",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Ceramic and floor tile production",
      "Sanitary and toilet ware lines",
      "Roofing sheets and building finishes",
      "Regional export readiness",
    ],
    icon: "▣",
    nameMeaning:
      "SHODIS — S (Stanley), H (Hannah), O (Olanma), D (Dike), I (Ikenna), S (Stanley).",
    flagshipProducts: [
      "Ceramic tiles",
      "Floor tiles",
      "Wall tiles",
      "Sanitary ware",
      "Toilet ware",
      "Roofing sheets",
      "Building finishes",
      "Construction materials",
    ],
    strategicRole:
      "Factory-direct materials and industrial supply for Stanhan Real Estate, Stankings Hotel & Suites, future commercial developments, and regional export.",
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

export function getCompaniesBySector(sector: BusinessSector): CompanyRecord[] {
  return COMPANY_REGISTRY.filter((c) => c.businessSector === sector);
}

export function getSubsidiaryCompanies(): CompanyRecord[] {
  return COMPANY_REGISTRY.filter((c) => c.id !== "hq");
}

/** Compatibility shape for legacy Company type consumers */
export function toLegacyCompany(c: CompanyRecord) {
  return {
    slug: c.id === "hq" ? "stankings-hq" : c.id,
    name: c.name,
    legalName: c.legalName,
    businessSector: c.businessSector,
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
