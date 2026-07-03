/**
 * Stankings Group Commitment Registry (CR)
 * Institutional promise tracking per CANON-014 — Executive Decision No. 16
 */

export type CommitmentCategory =
  | "customer_guarantee"
  | "sla"
  | "product_launch"
  | "roadmap"
  | "foundation_pledge"
  | "sustainability"
  | "board_resolution"
  | "public_statement";

export type CommitmentStatus =
  | "delivered"
  | "completed"
  | "in_progress"
  | "on_schedule"
  | "at_risk"
  | "delayed"
  | "withdrawn"
  | "under_review";

export interface CommitmentAuditEntry {
  date: string;
  event: string;
  actor?: string;
}

export interface InstitutionalCommitment {
  id: string;
  statement: string;
  slug: string;
  category: CommitmentCategory;
  owner: string;
  ownerSlug?: string;
  institution: string;
  dateMade: string;
  expectedDelivery: string;
  status: CommitmentStatus;
  evidenceOfFulfilment: string;
  canonReferences: string[];
  auditHistory: CommitmentAuditEntry[];
  publicFacing: boolean;
  summary: string;
}

export const COMMITMENT_REGISTRY: InstitutionalCommitment[] = [
  {
    id: "CR-001",
    statement:
      "Yike marketplace escrow for high-trust property and vehicle transactions — buyers and sellers protected through BayRight settlement.",
    slug: "yike-escrow-launch",
    category: "product_launch",
    owner: "Yike Product Leadership",
    ownerSlug: "yike",
    institution: "Yike",
    dateMade: "2025-09-01",
    expectedDelivery: "2026-03-31",
    status: "delivered",
    evidenceOfFulfilment:
      "Escrow live on production; transaction audit logs; customer disclosure documents published.",
    canonReferences: ["CANON-014", "CANON-002", "CANON-012"],
    auditHistory: [
      { date: "2025-09-01", event: "Commitment recorded — public roadmap announcement" },
      { date: "2026-01-15", event: "Pilot completed — metrics within SLA thresholds" },
      { date: "2026-03-28", event: "Production launch — status updated to delivered" },
    ],
    publicFacing: true,
    summary: "Yike Escrow Launch — delivered with verification and BayRight integration.",
  },
  {
    id: "CR-002",
    statement:
      "Stankings Passport v2 — unified identity, enhanced verification tiers, and consent framework across ecosystem institutions.",
    slug: "passport-v2",
    category: "product_launch",
    owner: "Group Platform Engineering",
    institution: "Group Platform",
    dateMade: "2026-01-10",
    expectedDelivery: "2026-09-30",
    status: "in_progress",
    evidenceOfFulfilment:
      "Identity API v2 in staging; verification tier spec approved; partial rollout to Yike beta users.",
    canonReferences: ["CANON-014", "CANON-012", "CANON-002"],
    auditHistory: [
      { date: "2026-01-10", event: "Commitment recorded — engineering roadmap IDR-2026-004" },
      { date: "2026-04-01", event: "Staging deployment — in progress" },
      { date: "2026-06-15", event: "Beta cohort onboarding — on track per quarterly review" },
    ],
    publicFacing: true,
    summary: "Passport v2 — in progress; beta rollout underway.",
  },
  {
    id: "CR-003",
    statement:
      "BayRight Escrow API — programmatic escrow, settlement, and reconciliation for Yike, Stanhan, and Auto Hub.",
    slug: "bayright-escrow-api",
    category: "product_launch",
    owner: "BayRight Platform Team",
    ownerSlug: "bayright",
    institution: "BayRight",
    dateMade: "2026-02-01",
    expectedDelivery: "2026-12-31",
    status: "on_schedule",
    evidenceOfFulfilment:
      "API specification v0.9 published; Platform Assessment complete; pilot integration with Yike scheduled Q3.",
    canonReferences: ["CANON-014", "CANON-012", "CANON-005"],
    auditHistory: [
      { date: "2026-02-01", event: "Commitment recorded — payments platform roadmap" },
      { date: "2026-03-15", event: "Platform Assessment approved — new platform verdict" },
      { date: "2026-06-01", event: "Quarterly review — on schedule" },
    ],
    publicFacing: true,
    summary: "BayRight Escrow API — on schedule; specification and PA complete.",
  },
  {
    id: "CR-004",
    statement:
      "Stankings Foundation Scholarship Programme — ten annual scholarships for custodian-track students in engineering and institutional stewardship.",
    slug: "foundation-scholarship-programme",
    category: "foundation_pledge",
    owner: "Stankings Foundation",
    institution: "Stankings Foundation",
    dateMade: "2025-06-01",
    expectedDelivery: "2026-05-31",
    status: "completed",
    evidenceOfFulfilment:
      "Ten scholarships awarded; beneficiary records; public announcement and annual report published.",
    canonReferences: ["CANON-014", "CANON-001", "CANON-004"],
    auditHistory: [
      { date: "2025-06-01", event: "Board resolution recorded — public pledge" },
      { date: "2026-01-20", event: "Selection process completed" },
      { date: "2026-05-15", event: "Awards disbursed — status completed" },
    ],
    publicFacing: true,
    summary: "Foundation Scholarship Programme — completed; ten awards disbursed.",
  },
  {
    id: "CR-005",
    statement:
      "Yike marketplace uptime SLA — 99.5% monthly availability for core listing, search, and transaction flows.",
    slug: "yike-uptime-sla",
    category: "sla",
    owner: "Yike Engineering",
    ownerSlug: "yike",
    institution: "Yike",
    dateMade: "2025-11-01",
    expectedDelivery: "Ongoing",
    status: "delivered",
    evidenceOfFulfilment:
      "Monthly uptime reports; incident post-mortems published internally; Q1–Q2 2026 measured at 99.7%.",
    canonReferences: ["CANON-014", "CANON-008", "CANON-002"],
    auditHistory: [
      { date: "2025-11-01", event: "SLA published — customer terms updated" },
      { date: "2026-04-01", event: "Q1 report — SLA met" },
      { date: "2026-07-01", event: "Q2 report — SLA met" },
    ],
    publicFacing: true,
    summary: "Yike uptime SLA — ongoing commitment; consistently met.",
  },
  {
    id: "CR-006",
    statement:
      "BamSignal public messaging — safer, more trusted environment for meaningful connections; no guaranteed relationship outcomes.",
    slug: "bamsignal-trust-messaging",
    category: "public_statement",
    owner: "BamSignal Marketing",
    ownerSlug: "bamsignal",
    institution: "BamSignal",
    dateMade: "2026-03-01",
    expectedDelivery: "Ongoing",
    status: "delivered",
    evidenceOfFulfilment:
      "Approved messaging guidelines; website copy audit; marketing materials aligned to CANON-014.",
    canonReferences: ["CANON-014", "CANON-002", "CANON-010"],
    auditHistory: [
      { date: "2026-03-01", event: "Messaging commitment recorded — editorial review" },
      { date: "2026-04-15", event: "Website and app store copy updated" },
    ],
    publicFacing: true,
    summary: "BamSignal credible messaging — evidence-based, no outcome guarantees.",
  },
  {
    id: "CR-007",
    statement:
      "IKI Library Volume 0 — twelve foundational Canons published and accessible to verified members by end of 2026.",
    slug: "iki-volume-zero-canons",
    category: "roadmap",
    owner: "Library Council",
    institution: "Stankings Library / IKI",
    dateMade: "2026-01-01",
    expectedDelivery: "2026-12-31",
    status: "in_progress",
    evidenceOfFulfilment:
      "Fourteen Canons live in static seed; member routes operational; migration path documented.",
    canonReferences: ["CANON-014", "CANON-007", "CANON-009"],
    auditHistory: [
      { date: "2026-01-01", event: "Roadmap commitment — internal IDR" },
      { date: "2026-06-27", event: "CANON-014 registered — milestone review" },
    ],
    publicFacing: false,
    summary: "Volume 0 Canon publication — in progress; exceeds initial twelve-target scope.",
  },
];

export function getCommitment(slug: string): InstitutionalCommitment | undefined {
  return COMMITMENT_REGISTRY.find((c) => c.slug === slug);
}

export function getCommitmentsByStatus(status: CommitmentStatus): InstitutionalCommitment[] {
  return COMMITMENT_REGISTRY.filter((c) => c.status === status);
}

export function getCommitmentsByInstitution(institution: string): InstitutionalCommitment[] {
  const q = institution.toLowerCase();
  return COMMITMENT_REGISTRY.filter(
    (c) => c.institution.toLowerCase().includes(q) || c.ownerSlug === q
  );
}

export function searchCommitments(query: string): InstitutionalCommitment[] {
  const q = query.toLowerCase().trim();
  if (!q) return COMMITMENT_REGISTRY;
  return COMMITMENT_REGISTRY.filter((c) => {
    const haystack = [
      c.id,
      c.statement,
      c.summary,
      c.owner,
      c.institution,
      c.evidenceOfFulfilment,
      ...c.canonReferences,
      ...c.auditHistory.map((a) => a.event),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export const COMMITMENT_CATEGORY_LABELS: Record<CommitmentCategory, string> = {
  customer_guarantee: "Customer Guarantee",
  sla: "Service Level Agreement",
  product_launch: "Product Launch",
  roadmap: "Public Roadmap",
  foundation_pledge: "Foundation Pledge",
  sustainability: "Sustainability",
  board_resolution: "Board Resolution",
  public_statement: "Public Statement",
};

export const COMMITMENT_STATUS_LABELS: Record<CommitmentStatus, string> = {
  delivered: "Delivered",
  completed: "Completed",
  in_progress: "In Progress",
  on_schedule: "On Schedule",
  at_risk: "At Risk",
  delayed: "Delayed",
  withdrawn: "Withdrawn",
  under_review: "Under Review",
};
