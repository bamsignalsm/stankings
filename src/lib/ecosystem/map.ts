/**
 * Stankings Ecosystem Map — explorable institutional architecture per CANON-005
 */

import { COMPANIES, CORE_PLATFORM, type Company } from "@/lib/data";

export const ECOSYSTEM_MAP_IDENTIFIER = "ecosystem-map";

export const SHARED_PLATFORM_SERVICES = CORE_PLATFORM;

export interface EcosystemInstitution {
  slug: string;
  name: string;
  excellence: string;
  mission: string;
  coreCapabilities: string[];
  sharedCapabilitiesContributed: string[];
  strengthens: string[];
  dependsOn: string[];
  boundaries: string[];
  canonReferences: string[];
  platformServices: string[];
  customerJourneys: string[];
  color: string;
  icon: string;
  isLive?: boolean;
  website?: string;
}

const ECOSYSTEM_ENRICHMENT: Record<
  string,
  Omit<
    EcosystemInstitution,
    keyof Company | "slug" | "name" | "excellence" | "mission" | "color" | "icon" | "isLive" | "website"
  >
> = {
  yike: {
    coreCapabilities: [
      "Trusted marketplace orchestration",
      "Property, vehicle, and equipment listings",
      "Trust engine and verification coordination",
      "Vendor storefronts and operations",
      "Marketplace intelligence",
    ],
    sharedCapabilitiesContributed: ["Marketplace trust", "Vendor network", "Transaction orchestration"],
    strengthens: ["stanhan", "stankings-auto-hub", "bayright", "stankings-logistics", "hannahkings-gadgets"],
    dependsOn: ["bayright", "bamsignal"],
    boundaries: [
      "Does not operate as a dealership",
      "Does not develop or construct property",
      "Does not provide logistics or haulage",
      "Does not issue financial products",
    ],
    canonReferences: ["CANON-005", "CANON-003", "CANON-002", "CANON-001"],
    platformServices: [
      "Identity & Stankings Passport",
      "Trust & Verification",
      "Payments Infrastructure",
      "Notifications",
      "Analytics & Intelligence",
      "AI Services",
    ],
    customerJourneys: [
      "Property Purchase",
      "Vehicle Purchase",
      "Equipment Rental",
      "Enterprise Marketplace",
    ],
  },
  stanhan: {
    coreCapabilities: [
      "Property development",
      "Construction and project management",
      "Property verification and due diligence",
      "Commercial leasing and residential sales",
      "Property management",
    ],
    sharedCapabilitiesContributed: ["Property verification", "Development expertise", "Due diligence standards"],
    strengthens: ["yike", "bayright", "stankings-logistics"],
    dependsOn: ["yike", "bayright", "stankings-logistics"],
    boundaries: [
      "Does not operate a general marketplace",
      "Does not provide automotive services",
      "Does not issue independent financial products",
    ],
    canonReferences: ["CANON-005", "CANON-003", "CANON-002"],
    platformServices: [
      "Trust & Verification",
      "Payments Infrastructure",
      "Organization Management",
      "Notifications",
    ],
    customerJourneys: [
      "Property Development",
      "Property Verification",
      "Commercial Leasing",
      "Residential Purchase",
    ],
  },
  "stankings-auto-hub": {
    coreCapabilities: [
      "Vehicle sales and certified pre-owned",
      "100+ point vehicle inspection",
      "Vehicle verification and history",
      "Fleet and corporate leasing",
      "Import advisory and maintenance",
    ],
    sharedCapabilitiesContributed: ["Automotive verification", "Inspection standards", "Fleet expertise"],
    strengthens: ["yike", "bayright", "stankings-logistics"],
    dependsOn: ["yike", "bayright"],
    boundaries: [
      "Does not operate a general marketplace",
      "Does not develop property",
      "Does not provide general financial products",
    ],
    canonReferences: ["CANON-005", "CANON-003", "CANON-002"],
    platformServices: [
      "Identity & Stankings Passport",
      "Trust & Verification",
      "Payments Infrastructure",
      "Notifications",
    ],
    customerJourneys: ["Vehicle Purchase", "Fleet Leasing", "Vehicle Inspection", "Import Advisory"],
  },
  bayright: {
    coreCapabilities: [
      "Escrow services",
      "Institutional payments",
      "Utility bill payments",
      "Subscription billing",
      "Financial verification",
    ],
    sharedCapabilitiesContributed: [
      "Financial infrastructure",
      "Escrow trust",
      "Settlement rails",
      "Identity-linked financial services",
    ],
    strengthens: [
      "yike",
      "stanhan",
      "stankings-auto-hub",
      "stankings-logistics",
      "hannahkings-gadgets",
      "bamsignal",
    ],
    dependsOn: ["bamsignal"],
    boundaries: [
      "Does not operate marketplaces",
      "Does not sell physical goods",
      "Does not compete with operating institutions' core missions",
    ],
    canonReferences: ["CANON-005", "CANON-002", "CANON-001"],
    platformServices: [
      "Identity & Stankings Passport",
      "Trust & Verification",
      "Security & Audit",
      "Developer APIs",
    ],
    customerJourneys: [
      "Escrow Settlement",
      "Bill Payment",
      "Institutional Payments",
      "Subscription Management",
    ],
  },
  "stankings-logistics": {
    coreCapabilities: [
      "Corporate fleet leasing",
      "Haulage and container logistics",
      "Import and port handling",
      "Construction material distribution",
      "Cross-company supply chain",
    ],
    sharedCapabilitiesContributed: ["Movement infrastructure", "Fleet coordination", "Supply chain reliability"],
    strengthens: [
      "stankings-auto-hub",
      "stanhan",
      "hannahkings-gadgets",
      "stankings-foundation",
      "hannahkings-education",
      "yike",
    ],
    dependsOn: ["bayright", "stankings-auto-hub"],
    boundaries: [
      "Does not sell vehicles or property",
      "Does not operate marketplaces",
      "Does not provide financial products",
    ],
    canonReferences: ["CANON-005", "CANON-001"],
    platformServices: ["Payments Infrastructure", "Notifications", "Analytics & Intelligence"],
    customerJourneys: [
      "Vehicle Haulage",
      "Construction Delivery",
      "Corporate Fleet",
      "Gadget Distribution",
    ],
  },
  "hannahkings-gadgets": {
    coreCapabilities: [
      "Consumer electronics and mobile devices",
      "Inspection kits and field equipment",
      "School and office technology",
      "Asset tracking and inventory",
      "Repairs and warranty services",
    ],
    sharedCapabilitiesContributed: [
      "Technology procurement",
      "Device standardization",
      "Asset lifecycle management",
    ],
    strengthens: [
      "yike",
      "stanhan",
      "stankings-auto-hub",
      "stankings-logistics",
      "hannahkings-education",
      "stankings-institute",
    ],
    dependsOn: ["stankings-logistics", "bayright"],
    boundaries: [
      "Does not operate marketplaces",
      "Does not provide logistics independently",
      "Focuses on technology supply chain, not general retail competition",
    ],
    canonReferences: ["CANON-005", "CANON-003"],
    platformServices: ["Payments Infrastructure", "Organization Management", "Analytics & Intelligence"],
    customerJourneys: [
      "Internal Procurement",
      "Device Lifecycle",
      "Field Equipment Supply",
      "School Technology",
    ],
  },
  bamsignal: {
    coreCapabilities: [
      "Verified matchmaking",
      "Identity and reputation",
      "Community building",
      "Cross-platform reputation",
      "Trust network integration",
    ],
    sharedCapabilitiesContributed: ["Relationship trust", "Identity verification", "Reputation portability"],
    strengthens: ["yike", "bayright"],
    dependsOn: [],
    boundaries: [
      "Does not operate commercial marketplaces",
      "Does not provide financial settlement",
      "Does not compete with operating institutions' core missions",
    ],
    canonReferences: ["CANON-005", "CANON-002"],
    platformServices: ["Identity & Stankings Passport", "Trust & Verification", "Consent Management"],
    customerJourneys: ["Verified Relationships", "Reputation Transfer", "Community Trust"],
  },
  "stankings-institute": {
    coreCapabilities: [
      "Custodian Programme",
      "Leadership curriculum",
      "Institutional research",
      "Governance training",
      "Succession planning",
    ],
    sharedCapabilitiesContributed: ["Leadership development", "Institutional knowledge", "Custodian pipeline"],
    strengthens: [
      "yike",
      "stanhan",
      "stankings-auto-hub",
      "bayright",
      "stankings-logistics",
      "hannahkings-gadgets",
      "hannahkings-education",
      "stankings-foundation",
    ],
    dependsOn: [],
    boundaries: ["Does not operate commercial businesses", "Develops stewards, not competing operators"],
    canonReferences: ["CANON-004", "CANON-005", "CANON-001"],
    platformServices: ["AI Services", "Developer APIs"],
    customerJourneys: ["Custodian Development", "Leadership Training", "Governance Education"],
  },
  "hannahkings-education": {
    coreCapabilities: [
      "Creche through primary education",
      "Technical secondary college",
      "Future university planning",
      "Professional training",
      "Curriculum development",
    ],
    sharedCapabilitiesContributed: ["Educational excellence", "Future leader pipeline", "Community development"],
    strengthens: ["stankings-foundation", "stankings-institute"],
    dependsOn: ["hannahkings-gadgets", "stankings-logistics", "stankings-foundation"],
    boundaries: [
      "Does not operate commercial marketplaces",
      "Does not provide financial products",
      "Education pillar — not commerce competition",
    ],
    canonReferences: ["CANON-005", "CANON-001", "CANON-003"],
    platformServices: ["Organization Management", "Notifications"],
    customerJourneys: ["Cradle to Career Education", "Technical Training", "Scholarship Pathways"],
  },
  "stankings-foundation": {
    coreCapabilities: [
      "Community development",
      "Charitable initiatives",
      "Social impact programmes",
      "Youth empowerment",
      "Scholarship programmes",
    ],
    sharedCapabilitiesContributed: ["Social impact", "Community trust", "Purpose reinforcement"],
    strengthens: ["hannahkings-education", "stankings-institute"],
    dependsOn: ["stankings-logistics", "bayright"],
    boundaries: [
      "Does not operate for profit",
      "Does not compete with commerce institutions",
      "Impact, not marketing",
    ],
    canonReferences: ["CANON-005", "CANON-001", "CANON-003"],
    platformServices: ["Payments Infrastructure", "Notifications"],
    customerJourneys: ["Community Programmes", "Scholarships", "Youth Empowerment"],
  },
};

function buildInstitution(company: Company): EcosystemInstitution {
  const enrichment = ECOSYSTEM_ENRICHMENT[company.slug];
  if (!enrichment) {
    return {
      slug: company.slug,
      name: company.name,
      excellence: company.excellence,
      mission: company.mission,
      coreCapabilities: company.services,
      sharedCapabilitiesContributed: [],
      strengthens: [],
      dependsOn: [],
      boundaries: [],
      canonReferences: ["CANON-005"],
      platformServices: [],
      customerJourneys: [],
      color: company.color,
      icon: company.icon,
      isLive: company.isLive,
      website: company.website,
    };
  }
  return {
    slug: company.slug,
    name: company.name,
    excellence: company.excellence,
    mission: company.mission,
    color: company.color,
    icon: company.icon,
    isLive: company.isLive,
    website: company.website,
    ...enrichment,
  };
}

export const ECOSYSTEM_INSTITUTIONS: EcosystemInstitution[] = COMPANIES.map(buildInstitution);

export function getEcosystemInstitution(slug: string): EcosystemInstitution | undefined {
  return ECOSYSTEM_INSTITUTIONS.find((i) => i.slug === slug);
}

export function getInstitutionName(slug: string): string {
  return getEcosystemInstitution(slug)?.name ?? slug;
}

export function getStrengthenedInstitutions(slug: string): EcosystemInstitution[] {
  const inst = getEcosystemInstitution(slug);
  if (!inst) return [];
  return inst.strengthens
    .map((s) => getEcosystemInstitution(s))
    .filter((i): i is EcosystemInstitution => i !== undefined);
}

export function getDependencyInstitutions(slug: string): EcosystemInstitution[] {
  const inst = getEcosystemInstitution(slug);
  if (!inst) return [];
  return inst.dependsOn
    .map((s) => getEcosystemInstitution(s))
    .filter((i): i is EcosystemInstitution => i !== undefined);
}
