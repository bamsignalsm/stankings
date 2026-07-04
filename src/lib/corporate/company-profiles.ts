/**
 * Company profiles — consumes shared company registry.
 */

import {
  COMPANY_REGISTRY,
  getCompany,
  type CompanyLaunchStatus,
  type CompanyRecord,
} from "@/lib/shared/company/registry";

export type CompanyStatus = CompanyLaunchStatus;

export interface CompanyProfile {
  slug: string;
  name: string;
  tagline: string;
  excellence: string;
  description: string;
  mission: string;
  services: string[];
  website?: string;
  isLive?: boolean;
  color: string;
  icon: string;
  areaOfOperation: string;
  relationshipToHq: string;
  statusLabel: CompanyStatus;
  statusDescription: string;
  supportPath: string;
  legalPath: string;
  privacyPath: string;
  roadmap: string[];
}

function toProfile(c: CompanyRecord): CompanyProfile {
  return {
    slug: c.id,
    name: c.name,
    tagline: c.tagline,
    excellence: c.excellence,
    description: c.description,
    mission: c.mission,
    services: c.services,
    website: c.isLive || c.domain !== "stankings.com" ? c.domain : undefined,
    isLive: c.isLive,
    color: c.brandColors.primary,
    icon: c.icon,
    areaOfOperation: c.areaOfOperation,
    relationshipToHq: c.relationshipToHq,
    statusLabel: c.status,
    statusDescription: c.launchStatus,
    supportPath: c.supportPath,
    legalPath: c.legalPath,
    privacyPath: c.privacyPath,
    roadmap: c.roadmap,
  };
}

export function getCompanyProfile(slug: string): CompanyProfile | undefined {
  const id = slug === "stankings-hq" ? "hq" : slug;
  const c = getCompany(id);
  return c ? toProfile(c) : undefined;
}

export function getAllCompanyProfiles(): CompanyProfile[] {
  return COMPANY_REGISTRY.filter((c) => c.id !== "hq").map(toProfile);
}
