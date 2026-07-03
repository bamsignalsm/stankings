/**
 * Stankings Group Platform Registry
 * Architectural inventory per CANON-012 — Executive Decision No. 14
 */

export type PlatformStatus = "active" | "planned" | "deprecated" | "proposed";

export interface InstitutionalPlatform {
  id: string;
  name: string;
  slug: string;
  owner: string;
  ownerSlug?: string;
  consumers: string[];
  apis: string[];
  canonReferences: string[];
  status: PlatformStatus;
  summary: string;
  capabilities: string[];
}

export const PLATFORM_REGISTRY: InstitutionalPlatform[] = [
  {
    id: "platform-identity",
    name: "Identity Platform",
    slug: "identity",
    owner: "Group Platform",
    consumers: [
      "Yike",
      "BamSignal",
      "BayRight",
      "Stankings.com",
      "Hannahkings Education",
      "Stankings Foundation",
      "All Companies",
    ],
    apis: ["Identity API", "Stankings Passport API", "Authentication API", "Authorization API"],
    canonReferences: ["CANON-012", "CANON-002", "CANON-010"],
    status: "active",
    summary:
      "One login, one identity, one passport — shared across the entire ecosystem.",
    capabilities: [
      "Single sign-on",
      "Stankings Passport",
      "Member and admin authentication",
      "Role-based authorization",
      "Consent framework",
    ],
  },
  {
    id: "platform-trust",
    name: "Trust Platform",
    slug: "trust",
    owner: "Group Platform",
    consumers: ["All Companies"],
    apis: ["Trust API", "Verification API", "Reputation API", "Fraud Intelligence API"],
    canonReferences: ["CANON-002", "CANON-012"],
    status: "active",
    summary:
      "One reputation engine, trust score, verification engine, and fraud intelligence system.",
    capabilities: [
      "Trust scoring",
      "Identity and asset verification",
      "Fraud detection signals",
      "Audit trail",
    ],
  },
  {
    id: "platform-knowledge",
    name: "Knowledge Platform",
    slug: "knowledge",
    owner: "Stankings Library / IKI",
    consumers: [
      "All Companies",
      "IKI",
      "Institutional AI",
      "Board",
      "Custodian Programme",
      "Every Employee",
    ],
    apis: ["Knowledge API", "Library Retrieval API", "Lexicon API", "Canon API"],
    canonReferences: ["CANON-009", "CANON-012", "CANON-007", "LS-001"],
    status: "active",
    summary:
      "The Library — one institutional brain for every company, AI, and custodian.",
    capabilities: [
      "Knowledge Objects (LS-001)",
      "Canon and framework retrieval",
      "Institutional graph",
      "Decision and lessons registries",
    ],
  },
  {
    id: "platform-payments",
    name: "Payments Platform",
    slug: "payments",
    owner: "BayRight",
    ownerSlug: "bayright",
    consumers: ["Yike", "Stanhan", "Stankings Auto Hub", "Marketplace vendors"],
    apis: ["Payment API", "Escrow API", "Settlement API", "Wallet API"],
    canonReferences: ["CANON-005", "CANON-012", "CANON-002"],
    status: "planned",
    summary:
      "BayRight as the financial platform — escrow, payments, and settlement for the ecosystem.",
    capabilities: [
      "Escrow for high-trust transactions",
      "Payment orchestration",
      "Settlement and reconciliation",
      "Financial audit services",
    ],
  },
  {
    id: "platform-logistics",
    name: "Logistics Platform",
    slug: "logistics",
    owner: "Stankings Logistics",
    ownerSlug: "stankings-logistics",
    consumers: ["Yike", "Stanhan", "Stankings Auto Hub", "Enterprise clients"],
    apis: ["Dispatch API", "Fleet API", "Tracking API", "Moving Services API"],
    canonReferences: ["CANON-005", "CANON-012"],
    status: "planned",
    summary:
      "Fleet, dispatch, tracking, moving services, and corporate logistics as shared infrastructure.",
    capabilities: [
      "Fleet management",
      "Dispatch orchestration",
      "Real-time tracking",
      "Corporate logistics contracts",
    ],
  },
  {
    id: "platform-notifications",
    name: "Notification Platform",
    slug: "notifications",
    owner: "Group Platform",
    consumers: ["All Companies"],
    apis: ["Notification API", "SMS API", "Email API", "Push API"],
    canonReferences: ["CANON-012", "CANON-010"],
    status: "planned",
    summary: "Unified notifications — email, SMS, push, and in-app across institutions.",
    capabilities: [
      "Transactional messaging",
      "Consent-aware delivery",
      "Template management",
      "Delivery audit",
    ],
  },
  {
    id: "platform-ai",
    name: "AI Platform",
    slug: "ai",
    owner: "Group Platform",
    consumers: ["All Companies"],
    apis: ["AI API", "Retrieval API", "Institutional Librarian API"],
    canonReferences: ["CANON-009", "CANON-012", "CANON-010", "CANON-007"],
    status: "planned",
    summary:
      "One AI platform — different personalities and permissions, same institutional knowledge.",
    capabilities: [
      "Retrieval-augmented generation from IKI",
      "Institution-specific AI personalities",
      "Permission-scoped knowledge access",
      "Human-in-the-loop governance",
    ],
  },
  {
    id: "platform-analytics",
    name: "Analytics Platform",
    slug: "analytics",
    owner: "Group Platform",
    consumers: ["All Companies", "Leadership", "Board"],
    apis: ["Analytics API", "Intelligence API", "Reporting API"],
    canonReferences: ["CANON-012", "CANON-008"],
    status: "planned",
    summary: "Shared analytics and intelligence — ecosystem-wide insight without siloed dashboards.",
    capabilities: [
      "Cross-institution metrics",
      "Operational intelligence",
      "Executive reporting",
      "Privacy-preserving aggregation",
    ],
  },
  {
    id: "platform-documents",
    name: "Document Services Platform",
    slug: "documents",
    owner: "Group Platform",
    consumers: ["All Companies", "Legal", "HR", "Operations"],
    apis: ["Document API", "E-Signature API", "Archive API"],
    canonReferences: ["CANON-012", "CANON-007", "LS-001"],
    status: "proposed",
    summary: "Shared document generation, storage, and e-signature — not per-company document silos.",
    capabilities: [
      "Template-driven documents",
      "Secure archival",
      "E-signature workflows",
      "Version control",
    ],
  },
];

export function getPlatform(slug: string): InstitutionalPlatform | undefined {
  return PLATFORM_REGISTRY.find((p) => p.slug === slug);
}

export function getPlatformsByStatus(status: PlatformStatus): InstitutionalPlatform[] {
  return PLATFORM_REGISTRY.filter((p) => p.status === status);
}

export function searchPlatforms(query: string): InstitutionalPlatform[] {
  const q = query.toLowerCase().trim();
  if (!q) return PLATFORM_REGISTRY;
  return PLATFORM_REGISTRY.filter((p) => {
    const haystack = [
      p.name,
      p.owner,
      p.summary,
      ...p.consumers,
      ...p.apis,
      ...p.canonReferences,
      ...p.capabilities,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
