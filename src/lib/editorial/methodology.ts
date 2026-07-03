/**
 * Stankings Library — Editorial methodology
 * Adopted 2026-06-27 · Editor's Decision No. 47
 */

export const EDITORIAL_MOTTO =
  "Slow enough to think. Fast enough to build." as const;

export const DRAFTING_PRINCIPLE =
  "Nothing leaves the drafting table until both the founder and the editor are satisfied." as const;

export const INSTITUTIONAL_MISSION =
  "Should this exist in Stankings Group?" as const;

export const WORKFLOW_PHASES = [
  { phase: 1, id: "think", title: "Think", description: "Vision, concern, or problem stated clearly." },
  { phase: 2, id: "challenge", title: "Challenge", description: "Survive founder, CEO, CTO, engineer, lawyer, customer, future custodian, Nigerian reality, and 100-year institution perspectives." },
  { phase: 3, id: "design", title: "Design", description: "Architecture agreed — not just the solution." },
  { phase: 4, id: "approve", title: "Approve", description: "Founder and editor approve. No implementation before approval." },
  { phase: 5, id: "build", title: "Build", description: "Cursor implements approved Builder's Notes only." },
  { phase: 6, id: "audit", title: "Audit", description: "Review what was built — do not blindly accept." },
  { phase: 7, id: "preserve", title: "Preserve", description: "Session record, progress report, and Library knowledge objects." },
] as const;

export const CHALLENGE_PERSPECTIVES = [
  "Founder",
  "CEO",
  "CTO",
  "Engineer",
  "Lawyer (governance perspective, not legal advice)",
  "Customer",
  "Future custodian",
  "Nigerian business reality",
  "100-year institution",
] as const;

export const ALIGNMENT_QUESTIONS = [
  "Does it align with the Canons?",
  "Does it align with the Constitution?",
  "Does it strengthen trust?",
  "Will we still be proud of this in 50 years?",
] as const;

export const DOCUMENT_WORKFLOW_STEPS = [
  { step: 1, id: "objective", title: "Objective", question: "What problem is this document solving?" },
  { step: 2, id: "scope", title: "Scope", question: "What belongs — and what explicitly does not?" },
  { step: 3, id: "architecture", title: "Architecture", question: "Structure agreed before writing?" },
  { step: 4, id: "draft", title: "Draft", question: "First version written carefully, not quickly." },
  { step: 5, id: "challenge", title: "Challenge", question: "Clear, timeless, practical, non-duplicative, non-contradictory?" },
  { step: 6, id: "approve", title: "Approve", question: "Three Reads passed — then to Cursor." },
] as const;

export const THREE_READS_RULE = [
  { read: "Founder", question: "Does this achieve your vision?" },
  { read: "Engineer", question: "Can this actually be implemented?" },
  { read: "Future Custodian (Year 2126)", question: "If Stanley is no longer here, will this still make complete sense?" },
] as const;

export const SESSION_ARTIFACTS = [
  "Editor's Notes — discussion and decisions",
  "Builder's Notes — actionable implementation for Cursor",
  "Library Session Record — institutional memory",
  "Progress Report — where we stand",
] as const;

export const FEELS_OFF_RULE =
  'Whenever either party says "This feels off…" — stop, investigate why. Do not push through.';
