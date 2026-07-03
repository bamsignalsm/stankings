/**
 * Innovation Portal — Article X / Schedule H / Venture Studio
 */

import type { InnovationPassport, InnovationPipelineStage } from "@/lib/institution-lifecycle/types";

export const INNOVATION_PORTAL_IDENTIFIER = "FRAMEWORK-INP-001";

export const INNOVATION_PIPELINE_STAGES: {
  id: InnovationPipelineStage;
  label: string;
  description: string;
}[] = [
  { id: "submit_idea", label: "Submit Idea", description: "Structured proposal with problem statement and origin." },
  { id: "research_validation", label: "Research & Validation", description: "Evidence gathering, customer research, problem validation." },
  { id: "mentor_assignment", label: "Mentor Assignment", description: "Custodian or executive mentor assigned for guidance." },
  {
    id: "constitutional_innovation_review",
    label: "Constitutional Innovation Review",
    description: "PAF, TIA, EIA, GRF, PAR and Art. X § 10.03 criteria.",
  },
  { id: "board_review", label: "Board / Venture Committee", description: "Strategic approval — no entitlement to funding." },
  { id: "prototype_funding", label: "Prototype Funding", description: "Controlled investment subject to available resources." },
  { id: "pilot", label: "Pilot", description: "Limited operational pilot with measured outcomes." },
  { id: "institution_launch", label: "Institution Launch", description: "New constitutional institution admitted to the Register." },
];

export const INNOVATION_TRACKS = [
  {
    id: "family",
    label: "Track A — Family Innovation",
    description: "Reserved for members of the Stankings Family. Fair consideration — not automatic funding.",
  },
  {
    id: "employee",
    label: "Track B — Employee Innovation",
    description: "Every employee may submit ideas. Retain builders inside the Group.",
  },
  {
    id: "public",
    label: "Track C — Public Innovation (Future)",
    description: "Students, researchers, universities, and African innovators — future programme.",
  },
] as const;

const PIPELINE_LABELS: Record<InnovationPipelineStage, string> = {
  submit_idea: "Idea Submitted",
  research_validation: "Research & Validation",
  mentor_assignment: "Mentor Assigned",
  constitutional_innovation_review: "Constitutional Innovation Review",
  board_review: "Board Review",
  prototype_funding: "Prototype Funding",
  pilot: "Pilot",
  institution_launch: "Institution Launch",
  concluded: "Concluded",
};

export const INNOVATION_PASSPORTS: InnovationPassport[] = [
  {
    ideaId: "BAMBET-001",
    title: "BamBet — Sports Wagering Platform",
    origin: "executive",
    originLabel: "Executive Leadership",
    track: "internal",
    problemAddressed:
      "Sports betting market opportunity in Nigeria — evaluated against constitutional principles.",
    currentStage: "concluded",
    stageLabel: PIPELINE_LABELS.concluded,
    constitutionArticles: [
      "Art. X § 10.03 — Constitutional Innovation Review",
      "Art. X § 10.09 — Responsible Conclusion",
      "Art. II § 2.08 — Purpose Before Expansion",
    ],
    canonReferences: ["CANON-018", "CANON-003", "CANON-002"],
    reviewHistory: [
      { date: "2025-03", stage: "submit_idea", outcome: "Concept documented" },
      { date: "2025-04", stage: "research_validation", outcome: "Market research completed" },
      {
        date: "2025-05",
        stage: "constitutional_innovation_review",
        outcome: "PAR declined — principles conflict (CANON-018)",
        reviewer: "Library Council",
      },
      {
        date: "2025-06",
        stage: "concluded",
        outcome: "Responsibly concluded before launch. Knowledge preserved.",
      },
    ],
    fundingDecisions: ["No funding authorised — concluded at review stage"],
    knowledgeObjects: [
      { title: "CANON-018", href: "/library/canon/CANON-018" },
      { title: "Lifecycle Record — BamBet", href: "/library/institution-lifecycle/bambet" },
    ],
    lessonsLearned: [
      "Principles before opportunity — wagering declined to protect trust identity.",
      "Constitutional review before launch prevents institutional misalignment.",
    ],
    status: "archived",
  },
  {
    ideaId: "VS-001",
    title: "The Stankings Venture Studio",
    origin: "board",
    originLabel: "Board of Directors / Founder",
    track: "internal",
    problemAddressed:
      "Future generations and employees need a constitutional pathway from idea to institution — fair consideration, not entitlement.",
    currentStage: "constitutional_innovation_review",
    stageLabel: PIPELINE_LABELS.constitutional_innovation_review,
    constitutionArticles: [
      "Art. X § 10.02 — Sources of Institutional Innovation",
      "Art. X § 10.06 — Institutional Incubation",
      "Art. II § 2.05 — Innovation as Stewardship",
    ],
    canonReferences: ["CANON-003", "CANON-005", "CANON-013", "CANON-022"],
    reviewHistory: [
      { date: "2026-06", stage: "submit_idea", outcome: "Constitutional innovation system proposed" },
      {
        date: "2026-06",
        stage: "constitutional_innovation_review",
        outcome: "Article X adopted — Venture Studio formation authorised",
        reviewer: "Library Council",
      },
    ],
    mentor: "Stanley Ukeje",
    fundingDecisions: ["Formation budget — subject to Board approval"],
    knowledgeObjects: [
      { title: "Article X", href: "/library/constitution/article-x" },
      { title: "Schedule H", href: "/library/constitution/schedules#schedule-h" },
    ],
    linkedInstitutionSlug: "stankings-venture-studio",
    lessonsLearned: [],
    status: "approved",
  },
  {
    ideaId: "YIKE-LLM-001",
    title: "Yike AI Listing Assistant",
    origin: "employee",
    originLabel: "Yike Engineering",
    track: "employee",
    problemAddressed:
      "Reduce listing friction for vendors while maintaining verification standards.",
    currentStage: "research_validation",
    stageLabel: PIPELINE_LABELS.research_validation,
    constitutionArticles: ["Art. X § 10.03 — Constitutional Innovation Review"],
    canonReferences: ["CANON-013", "CANON-011", "CANON-002"],
    reviewHistory: [
      { date: "2026-05", stage: "submit_idea", outcome: "Employee innovation submission received" },
      { date: "2026-06", stage: "research_validation", outcome: "Customer interviews in progress" },
    ],
    mentor: "Pending assignment",
    fundingDecisions: [],
    knowledgeObjects: [],
    lessonsLearned: [],
    status: "active",
  },
];

export function getInnovationPassport(id: string): InnovationPassport | undefined {
  const normalized = id.toLowerCase();
  if (normalized === "bambet") {
    return INNOVATION_PASSPORTS.find((p) => p.ideaId === "BAMBET-001");
  }
  return INNOVATION_PASSPORTS.find(
    (p) =>
      p.ideaId.toLowerCase() === normalized ||
      p.linkedInstitutionSlug === normalized ||
      p.ideaId.toLowerCase().replace(/-/g, "") === normalized.replace(/-/g, ""),
  );
}

export function getInnovationPortalStats() {
  return {
    total: INNOVATION_PASSPORTS.length,
    active: INNOVATION_PASSPORTS.filter((p) => p.status === "active").length,
    approved: INNOVATION_PASSPORTS.filter((p) => p.status === "approved").length,
    archived: INNOVATION_PASSPORTS.filter((p) => p.status === "archived").length,
  };
}
