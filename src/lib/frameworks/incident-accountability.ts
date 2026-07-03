/**
 * Institutional Incident & Accountability Framework (IIAF)
 * Derived from CANON-015 — Executive Decision No. 17
 */

export const IIAF_FRAMEWORK = {
  identifier: "FRAMEWORK-IIAF-001",
  title: "Institutional Incident & Accountability Framework",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-002",
    "CANON-007",
    "CANON-009",
    "CANON-010",
    "CANON-014",
    "CANON-015",
    "FRAMEWORK-LLR-001",
    "FRAMEWORK-IDR-001",
    "LEX-ACCOUNTABILITY",
    "LS-001",
  ],
} as const;

export const IIAF_PURPOSE = `Every material operational, technical, governance or customer-impacting incident shall be addressed with accountability, learning, and systematic improvement.

The Institutional Incident & Accountability Framework operationalizes CANON-015 — Accountability Builds Resilience.

The objective is not merely recovery. The objective is institutional improvement.`;

export const IIAF_ACCOUNTABILITY_TEST =
  "Have we understood what happened? Have we accepted appropriate responsibility? Have we corrected the underlying causes? Have we preserved the lessons for future generations?";

export const IIAF_INCIDENT_RECORD_FIELDS = [
  { id: "incident-id", label: "Incident ID", description: "Unique identifier — e.g. INC-YIKE-001." },
  { id: "summary", label: "Summary", description: "Plain-language description of what occurred." },
  { id: "datetime", label: "Date & Time", description: "When the incident began and key milestones." },
  { id: "systems", label: "Systems Affected", description: "Platforms, services, and institutions impacted." },
  { id: "customers", label: "Customers Affected", description: "Scope and nature of customer impact." },
  { id: "severity", label: "Severity", description: "Critical, high, medium, or low — with justification." },
  { id: "timeline", label: "Timeline", description: "Chronological events from detection to resolution." },
  { id: "root-cause", label: "Root Cause", description: "Underlying causes — not symptoms." },
  { id: "immediate-response", label: "Immediate Response", description: "Actions taken to contain and mitigate." },
  { id: "corrective-actions", label: "Corrective Actions", description: "Fixes for this incident." },
  { id: "preventive-actions", label: "Preventive Actions", description: "Changes to prevent recurrence." },
  { id: "lessons-learned", label: "Lessons Learned", description: "Institutional knowledge captured — feeds LLR." },
  { id: "related-canons", label: "Related Canons", description: "Which Canons guided the response." },
  { id: "related-kos", label: "Related Knowledge Objects", description: "IDRs, LLRs, decisions, and standards." },
  { id: "review-status", label: "Review Status", description: "Open, under review, closed, or executive sign-off." },
  { id: "executive-signoff", label: "Executive Sign-off", description: "Leadership confirmation that work is complete." },
] as const;

export const IIAF_CLOSURE_REQUIREMENTS = [
  "Incident Review completed",
  "Root Cause Analysis documented",
  "Lessons Learned captured in LLR",
  "Preventive Action Plan assigned and monitored",
  "Library / Knowledge Objects updated",
  "Institutional Decision Record updated where applicable",
] as const;

export const IIAF_FAILURE_CATEGORIES = [
  {
    id: "honest-mistake",
    label: "Honest mistake",
    description: "Good-faith error under reasonable conditions — focus on systems improvement.",
  },
  {
    id: "negligence",
    label: "Negligence",
    description: "Failure to exercise reasonable care — corrective and developmental response.",
  },
  {
    id: "misconduct",
    label: "Misconduct",
    description: "Deliberate or reckless violation — proportionate disciplinary response.",
  },
  {
    id: "systemic-weakness",
    label: "Systemic weakness",
    description: "Structural gap in controls, process, or design — institutional fix required.",
  },
] as const;
