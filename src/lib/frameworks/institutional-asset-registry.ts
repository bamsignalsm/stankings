/**
 * Institutional Asset Registry — FRAMEWORK-IAR-001
 * Derived from Constitution Article VII
 * Executive Decision No. 35 — Constitutional Asset Register
 */

import {
  ANNUAL_ASSET_STEWARDSHIP_REVIEW_CRITERIA,
  INSTITUTIONAL_ASSET_CATEGORIES,
} from "@/lib/constitution/articles/article-vii";

export const IAR_FRAMEWORK = {
  identifier: "FRAMEWORK-IAR-001",
  title: "Institutional Asset Registry",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-VII",
    "CONSTITUTION-ARTICLE-III",
    "CANON-002",
    "CANON-006",
    "CANON-007",
    "CANON-014",
    "CANON-019",
    "CANON-021",
    "CANON-025",
    "FRAMEWORK-TIA-001",
    "FRAMEWORK-ASR-001",
    "FRAMEWORK-IKG-001",
    "LS-001",
    "LS-002",
  ],
} as const;

export const IAR_PURPOSE = `What has been entrusted to us — not merely what we own.

Every significant institutional asset maintains a constitutional record: steward, criticality, security, recovery readiness, and links to the Library. Trust and knowledge receive governance attention comparable to financial stewardship.`;

export const ASSET_PROFILE_FIELDS = [
  "Asset ID",
  "Asset Category",
  "Description",
  "Owning Institution",
  "Steward",
  "Constitutional Article",
  "Related Canons",
  "Criticality Rating",
  "Security Classification",
  "Backup Status",
  "Recovery Objective",
  "Dependencies",
  "Annual Review Date",
  "Risk Assessment",
  "Knowledge Objects Linked",
] as const;

export const IAR_DASHBOARD_VIEWS = [
  { id: "critical", label: "Critical Assets" },
  { id: "trust", label: "Trust Assets" },
  { id: "knowledge", label: "Knowledge Assets" },
  { id: "technology", label: "Technology Assets" },
  { id: "brand", label: "Brand Assets" },
  { id: "ai", label: "AI Assets" },
  { id: "recovery", label: "Recovery Readiness" },
  { id: "cyber", label: "Cyber Resilience" },
] as const;

export const ASSET_REGISTER_CLASSIFICATIONS = [
  "Strategic importance.",
  "Operational criticality.",
  "Trust sensitivity.",
  "Knowledge value.",
  "Security requirements.",
  "Recovery priority.",
  "Stewardship responsibility.",
] as const;

export const IAR_BODY = `${IAR_PURPOSE}

## Asset Profile Fields

${ASSET_PROFILE_FIELDS.map((f) => `- ${f}`).join("\n")}

## Institutional Asset Categories (Art. VII § 7.02)

${INSTITUTIONAL_ASSET_CATEGORIES.map((c) => `- ${c}`).join("\n")}

## Register Classifications (ED 35)

${ASSET_REGISTER_CLASSIFICATIONS.map((c) => `- ${c}`).join("\n")}

## Registry Dashboards

${IAR_DASHBOARD_VIEWS.map((v) => `- ${v.label}`).join("\n")}

## Annual Asset Stewardship Review (Art. VII § 7.08)

${ANNUAL_ASSET_STEWARDSHIP_REVIEW_CRITERIA.map((c) => `- ${c}`).join("\n")}

The Register shall be reviewed annually and whenever material institutional changes occur.`;
