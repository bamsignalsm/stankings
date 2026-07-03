/**
 * Institutional Knowledge Graph (IKG) — exemplar connected knowledge
 * Per CANON-021 / FRAMEWORK-IKG-001
 */

import type { KnowledgeGraphEntry } from "@/lib/frameworks/institutional-knowledge-graph";

export type { KnowledgeGraphEntry };

export const KNOWLEDGE_GRAPH_REGISTRY: KnowledgeGraphEntry[] = [
  {
    identifier: "LLR-YIKE-001",
    title: "Yike Verification Bypass — Lessons Learned",
    objectType: "lesson",
    summary:
      "Speed without controls erodes trust — verification queue overload led to fraud bypass.",
    href: "/library/lessons/LLR-YIKE-001",
    connections: {
      canons: [
        { identifier: "CANON-021", title: "Knowledge Is an Institutional Asset", href: "/library/canon/CANON-021" },
        { identifier: "CANON-015", title: "Accountability Builds Resilience", href: "/library/canon/CANON-015" },
        { identifier: "CANON-009", title: "Learn Continuously, Improve Deliberately", href: "/library/canon/CANON-009" },
        { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002" },
      ],
      companies: [{ identifier: "yike", title: "Yike", href: "/library/ecosystem/yike" }],
      frameworks: [
        { identifier: "FRAMEWORK-LLR-001", title: "Lessons Learned Repository", href: "/library/frameworks/lessons-learned" },
        { identifier: "FRAMEWORK-IIAF-001", title: "Incident & Accountability Framework", href: "/library/frameworks/incident-accountability" },
      ],
      decisions: [{ identifier: "IDR-GATES-001", title: "Four-Gate Workflow", href: "/library/decisions/IDR-GATES-001" }],
      lessons: [{ identifier: "LLR-YIKE-001", title: "Verification Bypass Lesson", href: "/library/lessons/LLR-YIKE-001" }],
      roles: [
        { identifier: "role-trust-team", title: "Trust Team Lead", href: "/library/knowledge-graph" },
        { identifier: "role-yike-md", title: "Yike Managing Director", href: "/library/knowledge-graph" },
      ],
      technologies: [
        { identifier: "trust-platform", title: "Trust Platform", href: "/library/platforms" },
        { identifier: "verification-api", title: "Verification API", href: "/library/platforms" },
      ],
      apis: [{ identifier: "verification-api", title: "Verification API v2", href: "/library/platforms" }],
      books: [],
      founderLetters: [],
    },
  },
  {
    identifier: "IDR-IKI-001",
    title: "IKI — Institutional Knowledge Infrastructure Naming",
    objectType: "decision",
    summary: "Library is a module within IKI — internal platform naming decision preserved for generations.",
    href: "/library/decisions/IDR-IKI-001",
    connections: {
      canons: [
        { identifier: "CANON-021", title: "Knowledge Is an Institutional Asset", href: "/library/canon/CANON-021" },
        { identifier: "CANON-007", title: "Truth Before Convenience", href: "/library/canon/CANON-007" },
        { identifier: "CANON-006", title: "Think in Generations", href: "/library/canon/CANON-006" },
      ],
      companies: [{ identifier: "group", title: "Stankings Group", href: "/library/ecosystem" }],
      frameworks: [
        { identifier: "FRAMEWORK-IDR-001", title: "Institutional Decision Record", href: "/library/frameworks/institutional-decision-record" },
        { identifier: "FRAMEWORK-IKG-001", title: "Institutional Knowledge Graph", href: "/library/knowledge-graph" },
      ],
      decisions: [
        { identifier: "IDR-IKI-001", title: "IKI Naming Decision", href: "/library/decisions/IDR-IKI-001" },
        { identifier: "JR-AI-001", title: "AI Human Judgment Policy", href: "/library/decision-intelligence" },
      ],
      lessons: [],
      roles: [
        { identifier: "role-founder", title: "Founder", href: "/library/knowledge-graph" },
        { identifier: "role-library-council", title: "Library Council", href: "/library/knowledge-graph" },
      ],
      technologies: [
        { identifier: "iki", title: "Institutional Knowledge Infrastructure", href: "/energy/library" },
        { identifier: "library-engine", title: "Library Engine", href: "/library" },
      ],
      apis: [],
      books: [],
      founderLetters: [
        { identifier: "founder-letters", title: "Founder Letters — Volume II", href: "/library/volumes/founder-letters" },
      ],
    },
  },
  {
    identifier: "CANON-021",
    title: "Knowledge Is an Institutional Asset",
    objectType: "canon",
    summary: "Knowledge preserved as constitutional asset — the Library exists because knowledge is an asset.",
    href: "/library/canon/CANON-021",
    connections: {
      canons: [
        { identifier: "CANON-009", title: "Learn Continuously", href: "/library/canon/CANON-009" },
        { identifier: "CANON-019", title: "Leave It Better Than You Found It", href: "/library/canon/CANON-019" },
        { identifier: "CANON-020", title: "Exercise Sound Judgment", href: "/library/canon/CANON-020" },
      ],
      companies: [{ identifier: "ecosystem", title: "Full Ecosystem", href: "/library/ecosystem" }],
      frameworks: [
        { identifier: "FRAMEWORK-IKG-001", title: "Institutional Knowledge Graph", href: "/library/knowledge-graph" },
        { identifier: "FRAMEWORK-LLR-001", title: "Lessons Learned", href: "/library/frameworks/lessons-learned" },
        { identifier: "FRAMEWORK-IDR-001", title: "Decision Records", href: "/library/frameworks/institutional-decision-record" },
      ],
      decisions: [],
      lessons: [],
      roles: [{ identifier: "role-custodian", title: "Future Custodian", href: "/library/volumes/custodian-programme" }],
      technologies: [{ identifier: "iki", title: "IKI", href: "/energy/library" }],
      apis: [],
      books: [{ identifier: "volume-iii", title: "Volume III — Books", href: "/library/volumes/books" }],
      founderLetters: [{ identifier: "founder-letters", title: "Founder Letters", href: "/library/volumes/founder-letters" }],
    },
  },
  {
    identifier: "LS-001",
    title: "The Knowledge Object Standard",
    objectType: "standard",
    summary: "Every piece of institutional knowledge exists as a structured, versioned Knowledge Object.",
    href: "/library/standards/ls-001",
    connections: {
      canons: [{ identifier: "CANON-021", title: "Knowledge Is an Institutional Asset", href: "/library/canon/CANON-021" }],
      companies: [{ identifier: "group", title: "Stankings Group", href: "/library/ecosystem" }],
      frameworks: [{ identifier: "FRAMEWORK-IKG-001", title: "Institutional Knowledge Graph", href: "/library/knowledge-graph" }],
      decisions: [{ identifier: "IDR-IKI-001", title: "IKI Naming", href: "/library/decisions/IDR-IKI-001" }],
      lessons: [],
      roles: [{ identifier: "role-library-council", title: "Library Council", href: "/library/knowledge-graph" }],
      technologies: [{ identifier: "library-engine", title: "Library Engine", href: "/library" }],
      apis: [],
      books: [],
      founderLetters: [],
    },
  },
  {
    identifier: "INC-BAYRIGHT-001",
    title: "BayRight Settlement Delay Incident",
    objectType: "incident",
    summary: "Settlement batch failure — knowledge preserved through incident, lesson, and improvement records.",
    href: "/library/incidents",
    connections: {
      canons: [
        { identifier: "CANON-021", title: "Knowledge Is an Institutional Asset", href: "/library/canon/CANON-021" },
        { identifier: "CANON-015", title: "Accountability Builds Resilience", href: "/library/canon/CANON-015" },
        { identifier: "CANON-014", title: "Our Word Is a Commitment", href: "/library/canon/CANON-014" },
      ],
      companies: [
        { identifier: "bayright", title: "BayRight", href: "/library/ecosystem/bayright" },
        { identifier: "yike", title: "Yike", href: "/library/ecosystem/yike" },
      ],
      frameworks: [
        { identifier: "FRAMEWORK-IIAF-001", title: "Incident Accountability", href: "/library/frameworks/incident-accountability" },
        { identifier: "FRAMEWORK-IIR-001", title: "Improvement Register", href: "/library/improvements" },
      ],
      decisions: [],
      lessons: [{ identifier: "LLR-BAYRIGHT-001", title: "Settlement Delay Lesson", href: "/library/lessons/LLR-BAYRIGHT-001" }],
      roles: [{ identifier: "role-bayright-eng", title: "BayRight Engineering Lead", href: "/library/knowledge-graph" }],
      technologies: [
        { identifier: "settlement", title: "Settlement Pipeline", href: "/library/platforms" },
        { identifier: "escrow", title: "Escrow Service", href: "/library/platforms" },
      ],
      apis: [{ identifier: "escrow-api", title: "Escrow API", href: "/library/platforms" }],
      books: [],
      founderLetters: [],
    },
  },
];

export function getKnowledgeGraphEntry(identifier: string): KnowledgeGraphEntry | undefined {
  return KNOWLEDGE_GRAPH_REGISTRY.find(
    (e) => e.identifier === identifier || e.href.endsWith(`/${identifier}`)
  );
}

export function searchKnowledgeGraph(query: string): KnowledgeGraphEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return KNOWLEDGE_GRAPH_REGISTRY;
  return KNOWLEDGE_GRAPH_REGISTRY.filter((e) => {
    const connectionText = Object.values(e.connections)
      .flat()
      .map((l) => `${l.identifier} ${l.title}`)
      .join(" ");
    const haystack = [e.identifier, e.title, e.summary, e.objectType, connectionText]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getKnowledgeGraphStats() {
  const totalConnections = KNOWLEDGE_GRAPH_REGISTRY.reduce((sum, e) => {
    return (
      sum +
      Object.values(e.connections).reduce((s, arr) => s + arr.length, 0)
    );
  }, 0);
  return {
    objects: KNOWLEDGE_GRAPH_REGISTRY.length,
    connections: totalConnections,
    dimensions: 10,
  };
}
