/**
 * Industry Leadership Dashboard (ILD)
 * Derived from CANON-024 — Executive Decision No. 26
 */

export const ILD_FRAMEWORK = {
  identifier: "FRAMEWORK-ILD-001",
  title: "Industry Leadership Dashboard",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-003",
    "CANON-008",
    "CANON-017",
    "CANON-022",
    "CANON-023",
    "CANON-024",
    "FRAMEWORK-LEGACY-001",
    "FRAMEWORK-EXF-001",
    "LEX-STANDARD",
    "LEX-EXCELLENCE",
    "LS-001",
  ],
} as const;

export const ILD_PURPOSE = `Every operating institution shall identify the professional standards it seeks to elevate within its industry and report measurable progress annually.

The Industry Leadership Dashboard operationalizes CANON-024 — Raise the Standard.

Progress toward industry elevation is included in Annual Stewardship Reports per Executive Decision No. 26. Institutional success is evaluated by positive industry influence, not market performance alone.`;

export const STANDARD_TEST =
  "Will this raise the standard of the industry? Will customers be better served because this exists? Will competitors be encouraged to improve? Will society benefit if this approach becomes widely adopted?";

export interface IndustryStandardProgress {
  standardId: string;
  label: string;
  status: "not_started" | "in_progress" | "established" | "industry_reference";
  progressNote: string;
  trend?: "up" | "stable" | "down";
}

export interface IndustryLeadershipProfile {
  id: string;
  institution: string;
  institutionSlug: string;
  industry: string;
  reportingYear: number;
  standardSetterGoal: string;
  standardsToRaise: IndustryStandardProgress[];
  industryInfluenceHighlights: string[];
  stewardshipReflection: string;
  stewardshipReportRef?: string;
}
