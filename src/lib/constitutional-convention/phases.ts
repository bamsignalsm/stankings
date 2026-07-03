import type { ConventionPhase } from "@/lib/constitutional-convention/types";

export const CONVENTION_PHASES: ConventionPhase[] = [
  {
    phase: 1,
    id: "audit",
    title: "Constitutional Audit",
    objective: "Verify coherence — no contradictions, duplication, or broken references across Articles I–XVII.",
    status: "active",
    href: "/library/constitutional-convention#audit",
  },
  {
    phase: 2,
    id: "cross-linking",
    title: "Constitutional Cross Linking",
    objective: "Every Article displays related Canons, Articles, Schedules, frameworks, companies, and knowledge objects.",
    status: "active",
    href: "/library/constitutional-convention#cross-linking",
  },
  {
    phase: 3,
    id: "commentary",
    title: "Constitutional Commentary",
    objective: "Separate interpretive volume — why each Article exists, history, examples, and engineering implications.",
    status: "forming",
    href: "/library/constitutional-convention#commentary",
  },
  {
    phase: 4,
    id: "diagrams",
    title: "Constitutional Diagrams",
    objective: "Architecture visuals for complex Articles — ecosystem, governance, trust, lifecycle.",
    status: "forming",
    href: "/library/constitutional-convention#diagrams",
  },
  {
    phase: 5,
    id: "index",
    title: "Constitutional Index",
    objective: "Searchable index of every major constitutional term and concept.",
    status: "active",
    href: "/library/constitutional-convention#index",
  },
  {
    phase: 6,
    id: "definitions",
    title: "Constitutional Definitions",
    objective: "Expand Schedule E — precise definitions preventing ambiguity across centuries.",
    status: "forming",
    href: "/library/constitutional-convention#definitions",
  },
  {
    phase: 7,
    id: "versioning",
    title: "Constitutional Versioning",
    objective: "Immutable amendment log — who changed what, why, and related Board records.",
    status: "active",
    href: "/library/constitution-centre#amendments",
  },
  {
    phase: 8,
    id: "search",
    title: "Constitutional Search Engine",
    objective: "Queryable Constitution — AI-grounded answers across Articles, Canons, and commentary.",
    status: "forming",
    href: "/library/constitutional-convention#search",
  },
  {
    phase: 9,
    id: "learning",
    title: "Constitutional Learning",
    objective: "Lessons, quizzes, and scenarios feeding The Custodian Programme.",
    status: "forming",
    href: "/library/constitutional-convention#learning",
  },
  {
    phase: 10,
    id: "hardcover",
    title: "Hardcover Edition",
    objective: "Institution publishing — leather, archive copies, vault distribution. Not a code deliverable.",
    status: "planned",
    href: "/library/constitutional-convention#hardcover",
  },
];

export const VOLUME_I_CONVENTION_MANDATE = `Not to rewrite. To verify.

Volume I v1.0 is frozen — Preamble and Articles I–XVII. Text locked; presentation, indexing, and cross-linking may strengthen. Schedules A–H operate as constitutional attachments. Before Volume II, Volumes 0 and I shall be verified and presented as documents deserving a library shelf for five hundred years.`;
