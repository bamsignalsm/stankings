/**
 * Institutional Identity enrichment per FRAMEWORK-IIS-001 / ED 29
 */

import {
  ECOSYSTEM_INSTITUTIONS,
  getEcosystemInstitution,
  getInstitutionName,
  getStrengthenedInstitutions,
} from "@/lib/ecosystem/map";
import type { InstitutionalIdentityStatement } from "@/lib/institutional-identity/types";

const CONSTITUTION_ARTICLE_I_REFS = [
  "Art. I § 1.01 — Constitutional Identity",
  "Art. I § 1.02 — Nature of the Institution",
  "Art. I § 1.03 — Institutional Purpose",
];

const CONSTITUTION_ARTICLE_II_REFS = [
  "Art. II § 2.02 — Constitutional Mission",
  "Art. II § 2.07 — Institutional Alignment",
];

const CONSTITUTION_ARTICLE_III_REFS = [
  "Art. III § 3.01 — Principle of Stewardship",
  "Art. III § 3.06 — Institutional Memory",
];

type IdentityEnrichment = Pick<
  InstitutionalIdentityStatement,
  | "founded"
  | "purpose"
  | "strategicRole"
  | "longTermVision"
  | "stewardshipResponsibilities"
  | "primaryCustomers"
  | "status"
> & {
  institutionPurposeStatement?: string;
};

const IDENTITY_ENRICHMENT: Record<string, IdentityEnrichment> = {
  yike: {
    founded: "2024",
    purpose:
      "To provide neutral marketplace infrastructure that increases confidence in high-value commerce across Nigeria.",
    institutionPurposeStatement:
      "Yike exists to build trusted marketplace infrastructure aligned with Article II — reducing uncertainty in property, vehicle and equipment commerce while strengthening the wider Stankings ecosystem through neutral orchestration, distinct from any vendor role.",
    strategicRole:
      "Central marketplace orchestrator — connects buyers, vendors, and trust services without competing as a vendor.",
    longTermVision:
      "Nigeria's enduring trusted marketplace infrastructure for properties, vehicles, and equipment.",
    primaryCustomers: [
      "Property buyers and sellers",
      "Vehicle buyers and dealers",
      "Equipment vendors and enterprises",
      "Institutional marketplace partners",
    ],
    stewardshipResponsibilities: [
      "Preserve marketplace neutrality",
      "Strengthen trust infrastructure across the ecosystem",
      "Prevent vendor-platform conflicts of interest",
      "Maintain verification standards worthy of generational trust",
    ],
    status: "approved",
  },
  bamsignal: {
    founded: "2024",
    purpose:
      "To strengthen human connection through verified identity and reputation that travels across the Group.",
    strategicRole:
      "Relationship and community trust layer — identity and reputation that strengthens every sibling institution.",
    longTermVision:
      "The trusted social infrastructure through which authentic relationships are formed and verified.",
    primaryCustomers: [
      "Individuals seeking verified relationships",
      "Community members",
      "Cross-platform users of Stankings services",
    ],
    stewardshipResponsibilities: [
      "Protect user dignity and privacy",
      "Maintain reputation integrity across platforms",
      "Resist commodification of human connection",
      "Strengthen ecosystem-wide trust signals",
    ],
    status: "approved",
  },
  bayright: {
    founded: "2024",
    purpose:
      "To provide financial infrastructure that makes high-value transactions safe, auditable and institutionally trustworthy.",
    strategicRole:
      "Financial backbone of the ecosystem — escrow, payments, and institutional financial verification.",
    longTermVision:
      "The financial infrastructure Nigerians trust for life's largest transactions.",
    primaryCustomers: [
      "Marketplace buyers and sellers",
      "Property and vehicle purchasers",
      "Institutional payers and vendors",
      "Enterprise billing customers",
    ],
    stewardshipResponsibilities: [
      "Safeguard funds held in trust",
      "Maintain payment integrity across the ecosystem",
      "Resist shortcuts that compromise financial truth",
      "Support sibling institutions with reliable infrastructure",
    ],
    status: "approved",
  },
  stanhan: {
    founded: "In formation",
    purpose:
      "To develop, verify and steward property assets that strengthen buyer confidence and urban development.",
    strategicRole:
      "Property excellence institution — development, verification and management distinct from marketplace operations.",
    longTermVision:
      "Africa's most trusted property development and verification company.",
    primaryCustomers: [
      "Property buyers and investors",
      "Commercial tenants",
      "Residential purchasers",
      "Development partners",
    ],
    stewardshipResponsibilities: [
      "Maintain rigorous property verification standards",
      "Develop assets that strengthen communities",
      "Avoid marketplace duplication",
      "Pass forward development capability to future custodians",
    ],
    status: "approved",
  },
  "stankings-auto-hub": {
    founded: "Heritage: Stankings Autos",
    purpose:
      "To deliver automotive excellence through inspection, verification and trusted vehicle commerce.",
    strategicRole:
      "Automotive operating institution — flagship vendor excellence that sets standards for the vehicle marketplace.",
    longTermVision:
      "Africa's most trusted automotive company.",
    primaryCustomers: [
      "Vehicle purchasers",
      "Fleet and corporate clients",
      "Import and maintenance customers",
      "Marketplace vehicle buyers",
    ],
    stewardshipResponsibilities: [
      "Maintain inspection standards without compromise",
      "Represent automotive trust on Yike and beyond",
      "Preserve institutional brand earned over years of service",
      "Strengthen automotive capability across the ecosystem",
    ],
    status: "approved",
  },
  "hannahkings-gadgets": {
    founded: "In formation",
    purpose:
      "To procure and steward technology assets that enable operational excellence across the Group.",
    strategicRole:
      "Technology procurement institution — internal excellence that becomes external capability.",
    longTermVision:
      "Trusted technology procurement for the Group and the public.",
    primaryCustomers: [
      "Group operating companies",
      "Schools and institutions",
      "Field inspection teams",
      "Public technology buyers",
    ],
    stewardshipResponsibilities: [
      "Maintain asset quality and warranty discipline",
      "Support operational institutions with reliable equipment",
      "Track and steward institutional technology assets",
      "Avoid uncontrolled procurement fragmentation",
    ],
    status: "approved",
  },
  "stankings-institute": {
    founded: "2026",
    purpose:
      "To develop custodians and preserve institutional knowledge across generations.",
    strategicRole:
      "Leadership and knowledge institution — prepares successors before succession becomes urgent.",
    longTermVision:
      "The permanent school of stewardship for Stankings Group and its ecosystem.",
    primaryCustomers: [
      "Future custodians",
      "Directors and senior leaders",
      "Institutional architects",
      "Custodian Programme participants",
    ],
    stewardshipResponsibilities: [
      "Preserve and transmit institutional knowledge",
      "Form leaders worthy of constitutional trust",
      "Maintain the Library as living curriculum",
      "Prepare generations not yet born",
    ],
    status: "approved",
  },
  "hannahkings-education": {
    founded: "In formation",
    purpose:
      "To educate generations from cradle to career in service of society and institutional endurance.",
    strategicRole:
      "Educational pillar — shapes citizens and future leaders who may steward the institution.",
    longTermVision:
      "World-class education from creche through university.",
    primaryCustomers: [
      "Students and families",
      "Professional trainees",
      "Future Group leaders",
      "Communities served by Hannahkings schools",
    ],
    stewardshipResponsibilities: [
      "Educate with excellence and integrity",
      "Develop character alongside competence",
      "Strengthen society through knowledge",
      "Prepare students for responsible citizenship",
    ],
    status: "approved",
  },
  "stankings-foundation": {
    founded: "In formation",
    purpose:
      "To create measurable, lasting social impact in the communities from which the Group draws strength.",
    strategicRole:
      "Social impact institution — purpose beyond profit, strengthening society without commercial conflict.",
    longTermVision:
      "Enduring community impact directed by stewardship, not marketing.",
    primaryCustomers: [
      "Underserved communities",
      "Youth empowerment beneficiaries",
      "Scholarship recipients",
      "Social impact partners",
    ],
    stewardshipResponsibilities: [
      "Direct resources toward measurable impact",
      "Remain distinct from commercial institutions",
      "Strengthen education and community institutions",
      "Demonstrate service as constitutional purpose",
    ],
    status: "approved",
  },
  "stankings-logistics": {
    founded: "In formation",
    purpose:
      "To move goods across the ecosystem with reliability, safety and institutional accountability.",
    strategicRole:
      "Logistics excellence institution — trusted movement connecting commerce, property and automotive operations.",
    longTermVision:
      "Trusted logistics and haulage across Nigeria and beyond.",
    primaryCustomers: [
      "Group operating companies",
      "Corporate fleet clients",
      "Construction and import partners",
      "Marketplace fulfilment partners",
    ],
    stewardshipResponsibilities: [
      "Deliver movement services without compromising safety",
      "Support sibling institutions' operational reliability",
      "Maintain fleet and haulage standards",
      "Strengthen supply chain trust",
    ],
    status: "approved",
  },
};

function defaultPurposeStatement(
  name: string,
  purpose: string,
  strategicRole: string,
): string {
  return `${name} maintains this Institutional Purpose Statement pursuant to Article II § 2.06. ${purpose} Strategic role within the ecosystem: ${strategicRole} The institution affirms alignment with the Constitution and Stankings Canons, contributes to the wider ecosystem, and maintains distinct responsibilities reviewed periodically by the Board.`;
}

function buildStatement(slug: string): InstitutionalIdentityStatement | undefined {
  const ecosystem = getEcosystemInstitution(slug);
  const enrichment = IDENTITY_ENRICHMENT[slug];
  if (!ecosystem || !enrichment) return undefined;

  const strengthened = getStrengthenedInstitutions(slug).map((i) => i.name);

  return {
    slug,
    institutionName: ecosystem.name,
    founded: enrichment.founded,
    purpose: enrichment.purpose,
    mission: ecosystem.mission,
    coreCapabilities: ecosystem.coreCapabilities,
    sharedPlatformsUsed: ecosystem.platformServices,
    institutionsStrengthened: strengthened,
    primaryCustomers: enrichment.primaryCustomers,
    constitutionArticles: CONSTITUTION_ARTICLE_I_REFS,
    constitutionArticlesII: CONSTITUTION_ARTICLE_II_REFS,
    constitutionArticlesIII: CONSTITUTION_ARTICLE_III_REFS,
    institutionPurposeStatement:
      enrichment.institutionPurposeStatement ??
      defaultPurposeStatement(ecosystem.name, enrichment.purpose, enrichment.strategicRole),
    canonReferences: ecosystem.canonReferences,
    strategicRole: enrichment.strategicRole,
    longTermVision: enrichment.longTermVision,
    stewardshipResponsibilities: enrichment.stewardshipResponsibilities,
    status: enrichment.status,
    excellence: ecosystem.excellence,
    color: ecosystem.color,
    icon: ecosystem.icon,
    isLive: ecosystem.isLive,
    website: ecosystem.website,
  };
}

export const INSTITUTIONAL_IDENTITY_STATEMENTS: InstitutionalIdentityStatement[] =
  ECOSYSTEM_INSTITUTIONS.map((inst) => buildStatement(inst.slug)).filter(
    (s): s is InstitutionalIdentityStatement => s !== undefined,
  );

export function getInstitutionalIdentity(slug: string): InstitutionalIdentityStatement | undefined {
  return INSTITUTIONAL_IDENTITY_STATEMENTS.find((s) => s.slug === slug);
}

export function getInstitutionNameFromIdentity(slug: string): string {
  return getInstitutionalIdentity(slug)?.institutionName ?? getInstitutionName(slug);
}

export const INSTITUTIONAL_IDENTITY_IDENTIFIER = "institutional-identity";
