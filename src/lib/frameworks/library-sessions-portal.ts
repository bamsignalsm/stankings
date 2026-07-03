/**
 * Library Session Records Portal — FRAMEWORK-LIB-SESS-001
 * Institutional memory — Editor's Decision No. 47
 */

import {
  ALIGNMENT_QUESTIONS,
  DOCUMENT_WORKFLOW_STEPS,
  EDITORIAL_MOTTO,
  SESSION_ARTIFACTS,
  THREE_READS_RULE,
  WORKFLOW_PHASES,
} from "@/lib/editorial/methodology";
import { EDITOR_DECISION_47 } from "@/lib/editorial/decisions";
import { LIBRARY_SESSIONS } from "@/lib/library-sessions/records";

export const LIB_SESS_FRAMEWORK = {
  identifier: "FRAMEWORK-LIB-SESS-001",
  title: "Library Session Records Portal",
  version: "1.0",
  status: "published" as const,
  derivedFrom: [
    "FRAMEWORK-SLP-001",
    "CONSTITUTION-ARTICLE-XIII",
    "CANON-021",
    "CANON-020",
    "library-sessions",
  ],
} as const;

export const LIB_SESS_PURPOSE = `The Stankings Library stores documents — and the reasoning behind them.

Every working session produces institutional memory: what was decided, why it was decided, and where the institution stands. Future custodians should never have to guess why Volume II uses Books instead of Articles.`;

export const LIB_SESS_BODY = `${LIB_SESS_PURPOSE}

## Editor's Decision No. 47

${EDITOR_DECISION_47}

## Seven-Phase Workflow

${WORKFLOW_PHASES.map((p) => `${p.phase}. **${p.title}** — ${p.description}`).join("\n")}

## Document Workflow

${DOCUMENT_WORKFLOW_STEPS.map((s) => `${s.step}. **${s.title}** — ${s.question}`).join("\n")}

## Four Alignment Questions

${ALIGNMENT_QUESTIONS.map((q, i) => `${i + 1}. ${q}`).join("\n")}

## Three Reads Rule

${THREE_READS_RULE.map((r) => `**${r.read}:** ${r.question}`).join("\n\n")}

## Session Artifacts

${SESSION_ARTIFACTS.map((a) => `- ${a}`).join("\n")}

## Editorial Motto

"${EDITORIAL_MOTTO}"

## Recorded Sessions

${LIBRARY_SESSIONS.length} session(s) on file.`;
