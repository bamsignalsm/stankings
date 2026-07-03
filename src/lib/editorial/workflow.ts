/**
 * Editorial Workflow Standard — permanent publishing process
 * Session LIB-2026-06-27-003 · FRAMEWORK-EDW-001
 */

import {
  ALIGNMENT_QUESTIONS,
  DOCUMENT_WORKFLOW_STEPS,
  DRAFTING_PRINCIPLE,
  EDITORIAL_MOTTO,
  FEELS_OFF_RULE,
  INSTITUTIONAL_MISSION,
  SESSION_ARTIFACTS,
  THREE_READS_RULE,
  WORKFLOW_PHASES,
} from "@/lib/editorial/methodology";
import {
  IMPLEMENTATION_READINESS_CHECKS,
  IMPLEMENTATION_READINESS_INTRO,
} from "@/lib/editorial/implementation-readiness";

export const EDITORIAL_WORKFLOW_VERSION = "1.0";

export const EDITORIAL_WORKFLOW_PHILOSOPHY = `The Stankings Library is not a document dump.

It is an institution that preserves reasoning, not only conclusions.

Every publication — constitutional, governance, engineering, or operational — follows the same disciplined path from vision to preservation.

Quality before speed. Architecture before content. Approval before implementation.`;

export const EDITORIAL_WORKFLOW_STEPS = [
  { step: 1, id: "vision", title: "Vision", description: "The Founder states the problem, concern, or institutional need." },
  { step: 2, id: "challenge", title: "Challenge", description: "Survive multiple perspectives before any design begins." },
  { step: 3, id: "architecture", title: "Architecture", description: "Structure agreed — scope, boundaries, and relationships defined." },
  { step: 4, id: "approval", title: "Approval", description: "Founder and Editor-in-Chief approve. Nothing proceeds without approval." },
  { step: 5, id: "builder_notes", title: "Builder's Notes", description: "Implementation-ready instructions for Cursor — no ambiguity." },
  { step: 6, id: "implementation", title: "Implementation", description: "Cursor builds only what was approved." },
  { step: 7, id: "audit", title: "Audit", description: "Review what was built. Do not blindly accept." },
  { step: 8, id: "preservation", title: "Library Preservation", description: "Session record, progress report, and knowledge objects." },
] as const;

export const EDITORIAL_ROLES = [
  {
    role: "Founder",
    responsibilities: ["Vision", "Final approval", "Institutional direction"],
  },
  {
    role: "Editor-in-Chief",
    responsibilities: [
      "Architecture",
      "Governance",
      "Documentation",
      "Quality assurance",
      "Long-term consistency",
    ],
  },
  {
    role: "Cursor (Institutional Builder)",
    responsibilities: [
      "Engineering",
      "Implementation",
      "UI/UX",
      "Database",
      "Publishing",
      "Cross-linking",
    ],
  },
] as const;

export const DOCUMENT_APPROVAL_LIFECYCLE = [
  "Planning",
  "Drafting",
  "Editorial Review",
  "Convention Review",
  "Approved",
  "Published",
  "Archived (if superseded)",
] as const;

export const QUALITY_ASSURANCE_STANDARDS = [
  "Aligns with the Canons",
  "Aligns with the Constitution",
  "Strengthens trust",
  "Proud in 50 years",
  INSTITUTIONAL_MISSION,
  DRAFTING_PRINCIPLE,
  FEELS_OFF_RULE,
  ...THREE_READS_RULE.map((r) => `${r.read}: ${r.question}`),
] as const;

export const LIBRARY_PRESERVATION_PROCESS = [
  "Record session in Library Session Records (LIB-YYYY-MM-DD-NNN)",
  "Update progress report",
  "Register as Knowledge Object under LS-001 where applicable",
  "Cross-link to Constitution, Canons, and related frameworks",
  "Version for future refinement — never lose the reasoning",
] as const;

export const SESSION_TEMPLATE_SECTIONS = SESSION_ARTIFACTS;

export const EDITORIAL_WORKFLOW_BODY = `${EDITORIAL_WORKFLOW_PHILOSOPHY}

## Workflow

${EDITORIAL_WORKFLOW_STEPS.map((s) => `${s.step}. **${s.title}** — ${s.description}`).join("\n")}

## Editorial Motto

"${EDITORIAL_MOTTO}"

## Four Alignment Questions

${ALIGNMENT_QUESTIONS.map((q, i) => `${i + 1}. ${q}`).join("\n")}

## Document Workflow (per publication)

${DOCUMENT_WORKFLOW_STEPS.map((s) => `${s.step}. **${s.title}** — ${s.question}`).join("\n")}

## Implementation Readiness

${IMPLEMENTATION_READINESS_INTRO}

${IMPLEMENTATION_READINESS_CHECKS.map((c) => `- **${c.label}** — ${c.question}`).join("\n")}

## Document Approval Lifecycle

${DOCUMENT_APPROVAL_LIFECYCLE.join(" → ")}

## Library Preservation

${LIBRARY_PRESERVATION_PROCESS.map((p) => `- ${p}`).join("\n")}`;
