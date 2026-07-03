/**
 * Legacy Dashboard + Annual Stewardship Report
 * Derived from CANON-022 — Executive Decision No. 24
 */

export const LEGACY_FRAMEWORK = {
  identifier: "FRAMEWORK-LEGACY-001",
  title: "Legacy Dashboard",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-001",
    "CANON-003",
    "CANON-006",
    "CANON-019",
    "CANON-021",
    "CANON-022",
    "FRAMEWORK-ASR-001",
    "FRAMEWORK-IIR-001",
    "LEX-LEGACY",
    "LS-001",
  ],
} as const;

export const LEGACY_PURPOSE = `Every operating institution shall report annually on institutional performance and societal contribution — demonstrating how it advances its mission while creating lasting value for the communities it serves.

The Legacy Dashboard operationalizes CANON-022 — Create Value That Outlasts Us.

Reports are for accountability, learning and responsible stewardship — not self-congratulation.`;

export const LEGACY_TEST =
  "What lasting value will remain because this exists? Will future generations benefit? Does this strengthen society as well as the institution? If we disappeared in one hundred years, what positive contribution would still remain?";

export const INSTITUTIONAL_PERFORMANCE_METRICS = [
  { id: "financial-sustainability", label: "Financial Sustainability", description: "Revenue health, reserves, and long-term viability." },
  { id: "customer-trust", label: "Customer Trust", description: "Trust scores, NPS, complaint resolution, verification rates." },
  { id: "operational-excellence", label: "Operational Excellence", description: "SLA adherence, incident rates, excellence standards met." },
  { id: "innovation", label: "Innovation", description: "Purposeful experiments completed, improvements shipped." },
  { id: "growth", label: "Growth", description: "Sustainable growth aligned with institutional strength." },
] as const;

export const SOCIETAL_CONTRIBUTION_METRICS = [
  { id: "jobs-created", label: "Jobs Created", description: "Direct and indirect employment enabled." },
  { id: "people-trained", label: "People Trained", description: "Skills development, internships, professional formation." },
  { id: "scholarships", label: "Scholarships Supported", description: "Educational access created." },
  { id: "small-businesses", label: "Small Businesses Enabled", description: "SMEs served, onboarded, or supported." },
  { id: "families-served", label: "Families Served", description: "Households positively impacted." },
  { id: "verified-transactions", label: "Verified Transactions", description: "Trust-enabling transactions completed." },
  { id: "fraud-prevented", label: "Fraud Prevented", description: "Estimated harm avoided through verification and controls." },
  { id: "knowledge-published", label: "Knowledge Objects Published", description: "Lessons, standards, and records added to Library." },
  { id: "community-projects", label: "Community Projects Completed", description: "Foundation and institutional community initiatives." },
  { id: "foundation-impact", label: "Foundation Impact", description: "Vulnerable communities supported sustainably." },
] as const;

export interface MetricValue {
  metricId: string;
  label: string;
  value: string;
  trend?: "up" | "stable" | "down";
  notes?: string;
}

export interface AnnualStewardshipReport {
  id: string;
  institution: string;
  institutionSlug: string;
  reportingYear: number;
  status: "draft" | "published" | "under_review";
  publishedAt?: string;
  institutionalPerformance: MetricValue[];
  societalContribution: MetricValue[];
  legacyHighlights: string[];
  stewardshipReflection: string;
  knowledgeObjectRef?: string;
}
