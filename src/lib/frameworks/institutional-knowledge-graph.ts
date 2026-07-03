/**
 * Institutional Knowledge Graph (IKG)
 * Derived from CANON-021 — Executive Decision No. 23
 */

export const IKG_FRAMEWORK = {
  identifier: "FRAMEWORK-IKG-001",
  title: "Institutional Knowledge Graph",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CANON-006",
    "CANON-009",
    "CANON-019",
    "CANON-020",
    "CANON-021",
    "CONSTITUTION-ARTICLE-XIII",
    "CONSTITUTION-ARTICLE-XIV",
    "FRAMEWORK-IDR-001",
    "FRAMEWORK-LLR-001",
    "FRAMEWORK-IDI-001",
    "LS-001",
    "LS-002",
    "LEX-KNOWLEDGE",
  ],
} as const;

export const IKG_PURPOSE = `The Institutional Knowledge Graph connects every Knowledge Object across the Stankings Library — not merely search, but a living brain showing how institutional wisdom relates.

The IKG operationalizes CANON-021 — Knowledge Is an Institutional Asset.

Every significant artifact shall be discoverable in context: related Canons, companies, frameworks, decisions, lessons, roles, technologies, and governance records.`;

export const IKG_KNOWLEDGE_TEST =
  "What have we learned? Has that learning been preserved? Can future teams discover it easily? Will future custodians begin from this knowledge rather than repeating the same work?";

export const IKG_CONNECTION_DIMENSIONS = [
  { id: "canons", label: "Related Canons", description: "Volume 0 Canons this knowledge supports or implements." },
  { id: "companies", label: "Related Companies", description: "Operating institutions where knowledge applies." },
  { id: "frameworks", label: "Related Frameworks", description: "Decision engines and assessments linked to this knowledge." },
  { id: "decisions", label: "Related Decisions", description: "IDR, Judgment Records, and governance decisions." },
  { id: "lessons", label: "Related Lessons Learned", description: "Experience preserved as institutional wisdom." },
  { id: "roles", label: "Related People (roles)", description: "Role-based stewardship — not personality-driven." },
  { id: "technologies", label: "Related Technologies", description: "Platforms, systems, and infrastructure." },
  { id: "apis", label: "Related APIs", description: "Interfaces and integration points documented." },
  { id: "books", label: "Related Books", description: "Volume III and reference library connections." },
  { id: "founder-letters", label: "Related Founder Letters", description: "Generational intent and stewardship voice." },
] as const;

export type IkgLink = {
  identifier: string;
  title: string;
  href: string;
};

export interface KnowledgeGraphEntry {
  identifier: string;
  title: string;
  objectType: string;
  summary: string;
  href: string;
  connections: {
    canons: IkgLink[];
    companies: IkgLink[];
    frameworks: IkgLink[];
    decisions: IkgLink[];
    lessons: IkgLink[];
    roles: IkgLink[];
    technologies: IkgLink[];
    apis: IkgLink[];
    books: IkgLink[];
    founderLetters: IkgLink[];
  };
}
