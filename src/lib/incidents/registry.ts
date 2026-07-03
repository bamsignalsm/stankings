/**
 * Stankings Group Incident Center
 * Incident Knowledge Objects per CANON-015 / FRAMEWORK-IIAF-001
 */

export type IncidentSeverity = "critical" | "high" | "medium" | "low";

export type IncidentReviewStatus =
  | "open"
  | "under_review"
  | "closed"
  | "executive_signed_off";

export interface IncidentTimelineEntry {
  timestamp: string;
  event: string;
}

export interface InstitutionalIncident {
  id: string;
  slug: string;
  summary: string;
  occurredAt: string;
  resolvedAt?: string;
  institution: string;
  institutionSlug?: string;
  systemsAffected: string[];
  customersAffected: string;
  severity: IncidentSeverity;
  timeline: IncidentTimelineEntry[];
  rootCause: string;
  immediateResponse: string;
  correctiveActions: string[];
  preventiveActions: string[];
  lessonsLearned: string[];
  relatedCanons: string[];
  relatedKnowledgeObjects: { identifier: string; title: string; href: string }[];
  lessonsLearnedRecordId?: string;
  reviewStatus: IncidentReviewStatus;
  executiveSignOff?: string;
  failureCategory: "honest_mistake" | "negligence" | "misconduct" | "systemic_weakness";
}

export const INCIDENT_REGISTRY: InstitutionalIncident[] = [
  {
    id: "INC-YIKE-001",
    slug: "yike-verification-bypass-2025",
    summary:
      "Fraudulent property listing bypassed verification controls — customer confidence impacted before listing removed.",
    occurredAt: "2025-11-14T09:30:00+01:00",
    resolvedAt: "2025-11-16T18:00:00+01:00",
    institution: "Yike",
    institutionSlug: "yike",
    systemsAffected: ["Yike Listings", "Trust Platform", "Verification API"],
    customersAffected: "One buyer; three adjacent listings reviewed as precaution",
    severity: "high",
    timeline: [
      { timestamp: "2025-11-14T09:30", event: "Customer reports suspicious property listing" },
      { timestamp: "2025-11-14T11:00", event: "Trust team confirms forged documents bypassed manual queue" },
      { timestamp: "2025-11-14T14:00", event: "Listing suspended; customer contacted with explanation" },
      { timestamp: "2025-11-15T10:00", event: "Blameless review convened — root cause identified" },
      { timestamp: "2025-11-16T18:00", event: "Preventive controls deployed; incident closed" },
    ],
    rootCause:
      "Verification queue overload caused expedited review path without secondary document checksum validation.",
    immediateResponse:
      "Listing removed within 2 hours; customer outreach; adjacent listings re-verified.",
    correctiveActions: [
      "Secondary document validation on expedited path",
      "Customer fair-resolution protocol activated",
    ],
    preventiveActions: [
      "Queue depth alerts before expedited mode enabled",
      "Mandatory dual-review for high-value property listings",
      "Trust Platform fraud signal integration",
    ],
    lessonsLearned: [
      "Speed without controls erodes trust faster than delays",
      "Customer communication during incident is part of accountability",
      "Near-miss patterns in queue metrics should trigger review before bypass",
    ],
    relatedCanons: ["CANON-015", "CANON-002", "CANON-014", "CANON-009"],
    relatedKnowledgeObjects: [
      { identifier: "LLR-YIKE-001", title: "Verification Bypass Incident", href: "/library/lessons/LLR-YIKE-001" },
      { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002" },
    ],
    lessonsLearnedRecordId: "LLR-YIKE-001",
    reviewStatus: "executive_signed_off",
    executiveSignOff: "Yike Managing Director — 2025-11-20",
    failureCategory: "systemic_weakness",
  },
  {
    id: "INC-BAYRIGHT-001",
    slug: "bayright-settlement-delay-2026",
    summary:
      "Payment settlement delayed 36 hours for Yike escrow transaction due to reconciliation batch failure.",
    occurredAt: "2026-04-02T08:00:00+01:00",
    resolvedAt: "2026-04-04T20:00:00+01:00",
    institution: "BayRight",
    institutionSlug: "bayright",
    systemsAffected: ["BayRight Settlement", "Yike Escrow", "Notification Platform"],
    customersAffected: "12 marketplace transactions; 4 property escrow clients notified",
    severity: "medium",
    timeline: [
      { timestamp: "2026-04-02T08:00", event: "Settlement batch fails silently — monitoring gap" },
      { timestamp: "2026-04-02T16:30", event: "Yike support escalates customer payment inquiries" },
      { timestamp: "2026-04-03T09:00", event: "BayRight acknowledges delay publicly to partners" },
      { timestamp: "2026-04-04T14:00", event: "Manual reconciliation completes backlog" },
      { timestamp: "2026-04-04T20:00", event: "All affected settlements released; post-incident review opened" },
    ],
    rootCause:
      "Reconciliation service dependency upgrade introduced incompatible API version without integration test coverage.",
    immediateResponse:
      "Acknowledged to Yike and affected customers within 18 hours; manual settlement path activated.",
    correctiveActions: [
      "Rollback incompatible dependency",
      "Manual settlement for affected transactions",
      "Customer communication per CANON-014 commitment standards",
    ],
    preventiveActions: [
      "Integration test gate for settlement pipeline",
      "Settlement SLA monitoring with customer-facing status page",
      "Escrow API hardening per Platform Assessment roadmap",
    ],
    lessonsLearned: [
      "Silence damages trust more than delay — CANON-014 requires honest communication",
      "Financial platform changes require generational review of downstream commitments",
    ],
    relatedCanons: ["CANON-015", "CANON-014", "CANON-002", "CANON-012"],
    relatedKnowledgeObjects: [
      { identifier: "LLR-BAYRIGHT-001", title: "Settlement Delay Incident", href: "/library/lessons/LLR-BAYRIGHT-001" },
      { identifier: "CR-003", title: "BayRight Escrow API Commitment", href: "/library/commitments" },
    ],
    lessonsLearnedRecordId: "LLR-BAYRIGHT-001",
    reviewStatus: "closed",
    failureCategory: "honest_mistake",
  },
  {
    id: "INC-ENG-001",
    slug: "production-outage-auth-2026",
    summary:
      "Member authentication unavailable for 47 minutes due to middleware configuration error during deployment.",
    occurredAt: "2026-05-18T22:15:00+01:00",
    resolvedAt: "2026-05-18T23:02:00+01:00",
    institution: "Group Platform",
    systemsAffected: ["stankings.com", "Identity Platform", "Member Auth"],
    customersAffected: "All member login attempts failed; no data breach",
    severity: "critical",
    timeline: [
      { timestamp: "2026-05-18T22:15", event: "Deployment completes — auth middleware regression" },
      { timestamp: "2026-05-18T22:22", event: "Monitoring alerts — error rate spike" },
      { timestamp: "2026-05-18T22:35", event: "Rollback initiated" },
      { timestamp: "2026-05-18T23:02", event: "Service restored; blameless retrospective scheduled" },
      { timestamp: "2026-05-19T14:00", event: "Post-incident review; LLR-ENG-001 updated" },
    ],
    rootCause:
      "Middleware matcher excluded new auth callback path introduced in same deployment.",
    immediateResponse: "Rollback within 20 minutes of detection; status communication to internal stakeholders.",
    correctiveActions: [
      "Middleware matcher updated to include callback paths",
      "Auth smoke test added to deploy pipeline",
    ],
    preventiveActions: [
      "Mandatory auth E2E check in CI before production deploy",
      "Canary deployment for identity-critical changes",
    ],
    lessonsLearned: [
      "Identity changes require highest-severity review — no blame, full system focus",
      "47-minute outage acceptable only with fast detection and rollback discipline",
    ],
    relatedCanons: ["CANON-015", "CANON-011", "CANON-009", "CANON-008"],
    relatedKnowledgeObjects: [
      { identifier: "LLR-ENG-001", title: "Staging Deployment Configuration", href: "/library/lessons/LLR-ENG-001" },
      { identifier: "FRAMEWORK-SR-001", title: "Simplicity Review", href: "/library/frameworks/simplicity-review" },
    ],
    lessonsLearnedRecordId: "LLR-ENG-001",
    reviewStatus: "executive_signed_off",
    executiveSignOff: "Chief Technology Officer — 2026-05-22",
    failureCategory: "honest_mistake",
  },
];

export function getIncident(slug: string): InstitutionalIncident | undefined {
  return INCIDENT_REGISTRY.find((i) => i.slug === slug || i.id === slug);
}

export function searchIncidents(query: string): InstitutionalIncident[] {
  const q = query.toLowerCase().trim();
  if (!q) return INCIDENT_REGISTRY;
  return INCIDENT_REGISTRY.filter((i) => {
    const haystack = [
      i.id,
      i.summary,
      i.institution,
      i.rootCause,
      ...i.systemsAffected,
      ...i.lessonsLearned,
      ...i.relatedCanons,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export const INCIDENT_SEVERITY_LABELS: Record<IncidentSeverity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const INCIDENT_REVIEW_STATUS_LABELS: Record<IncidentReviewStatus, string> = {
  open: "Open",
  under_review: "Under Review",
  closed: "Closed",
  executive_signed_off: "Executive Sign-off",
};
