/**
 * Extended company profiles for public corporate pages.
 * Factual only — no fabricated metrics or awards.
 */

import { COMPANIES, type Company } from "@/lib/data";

export type CompanyStatus = "operating" | "in_development" | "institutional";

export interface CompanyProfile extends Company {
  areaOfOperation: string;
  relationshipToHq: string;
  statusLabel: CompanyStatus;
  statusDescription: string;
  supportPath: string;
  legalPath: string;
  privacyPath: string;
  roadmap: string[];
}

const PROFILE_EXTRA: Record<
  string,
  Omit<CompanyProfile, keyof Company>
> = {
  yike: {
    areaOfOperation: "Nigeria — digital marketplace for high-value assets",
    relationshipToHq:
      "Independent operating company within Stankings Group. Shares institutional identity and governance standards; maintains its own application runtime, database, and authentication.",
    statusLabel: "operating",
    statusDescription: "Public platform at yike.ng",
    supportPath: "/support/yike",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Continue marketplace trust and verification capabilities",
      "Expand vendor operations tooling",
      "Deepen integration with Group trust standards",
    ],
  },
  bamsignal: {
    areaOfOperation: "Nigeria and digital markets — relationships and community",
    relationshipToHq:
      "Independent operating company within Stankings Group. Product operations and store releases are managed by BamSignal; Stankings HQ provides institutional trust and legal references only.",
    statusLabel: "operating",
    statusDescription: "Public platform at bamsignal.com",
    supportPath: "/support/bamsignal",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Mobile distribution and closed testing programmes",
      "Identity and reputation infrastructure",
      "Cross-ecosystem trust signals where consented",
    ],
  },
  bayright: {
    areaOfOperation: "Nigeria — payments, escrow, and bill infrastructure",
    relationshipToHq:
      "Independent financial infrastructure company within Stankings Group. Provider certifications and payment operations are BayRight’s responsibility; HQ does not process payments.",
    statusLabel: "operating",
    statusDescription: "Public platform at bayright.com",
    supportPath: "/support/bayright",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Provider certification and operational readiness",
      "Wallet and escrow reliability",
      "Institutional payment corridors",
    ],
  },
  stanhan: {
    areaOfOperation: "Nigeria — property development and verification",
    relationshipToHq:
      "Property operating company within Stankings Group. Complements Yike’s marketplace role with development and due-diligence services.",
    statusLabel: "in_development",
    statusDescription: "Operating capability in formation",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Property verification standards",
      "Development pipeline governance",
      "Alignment with marketplace trust requirements",
    ],
  },
  "stankings-auto-hub": {
    areaOfOperation: "Nigeria — automotive sales, inspection, and fleet",
    relationshipToHq:
      "Automotive operating company within Stankings Group. Participates in the ecosystem as an enterprise vendor where marketplace channels apply.",
    statusLabel: "in_development",
    statusDescription: "Operating capability in formation",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Inspection and verification standards",
      "Fleet and corporate programmes",
      "Marketplace participation where appropriate",
    ],
  },
  "hannahkings-gadgets": {
    areaOfOperation: "Nigeria — technology procurement and devices",
    relationshipToHq:
      "Procurement company serving Group institutions and public customers. Ensures device quality and asset discipline across the ecosystem.",
    statusLabel: "in_development",
    statusDescription: "Operating capability in formation",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Internal procurement excellence",
      "Warranty and asset tracking",
      "Public retail channels as capacity allows",
    ],
  },
  "stankings-institute": {
    areaOfOperation: "Institutional — leadership and custodian development",
    relationshipToHq:
      "Constitutional education and leadership institution of Stankings Group. Delivers the Custodian Programme and preserves institutional knowledge.",
    statusLabel: "institutional",
    statusDescription: "Institutional programme active",
    supportPath: "/institute",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Custodian Programme curriculum",
      "Leadership stewardship standards",
      "Knowledge preservation with The Library",
    ],
  },
  "hannahkings-education": {
    areaOfOperation: "Nigeria — education from early years through tertiary ambition",
    relationshipToHq:
      "Education pillar of Stankings Group. Operates under Group governance with a long-term mandate to develop capable citizens and leaders.",
    statusLabel: "in_development",
    statusDescription: "Educational institutions in formation",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Academy and college programmes",
      "Professional training pathways",
      "University ambition under governance discipline",
    ],
  },
  "stankings-foundation": {
    areaOfOperation: "Community and social impact programmes",
    relationshipToHq:
      "Philanthropic institution of Stankings Group. Impact is part of institutional purpose, not marketing.",
    statusLabel: "institutional",
    statusDescription: "Foundation mandate active",
    supportPath: "/foundation",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Community development programmes",
      "Youth and scholarship initiatives",
      "Measurable impact reporting in stewardship reviews",
    ],
  },
  "stankings-logistics": {
    areaOfOperation: "Nigeria — haulage, fleet, and supply movement",
    relationshipToHq:
      "Logistics operating company supporting Group companies and enterprise customers.",
    statusLabel: "in_development",
    statusDescription: "Operating capability in formation",
    supportPath: "/support/general",
    legalPath: "/legal",
    privacyPath: "/privacy",
    roadmap: [
      "Fleet and haulage reliability",
      "Port and import handling",
      "Cross-company supply coordination",
    ],
  },
};

export function getCompanyProfile(slug: string): CompanyProfile | undefined {
  const base = COMPANIES.find((c) => c.slug === slug);
  const extra = PROFILE_EXTRA[slug];
  if (!base || !extra) return undefined;
  return { ...base, ...extra };
}

export function getAllCompanyProfiles(): CompanyProfile[] {
  return COMPANIES.map((c) => getCompanyProfile(c.slug)!).filter(Boolean);
}
