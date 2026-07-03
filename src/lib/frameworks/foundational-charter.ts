/**
 * Foundational Charter Standard — FRAMEWORK-FC-001
 * Editorial Decision No. 53 — Session LIB-2026-06-27-010
 */

import { EDITOR_DECISION_53 } from "@/lib/editorial/decisions";
import {
  CHAPTER_APPROVAL_TESTS,
  FOUNDATIONAL_CHARTER_PRINCIPLE,
  FOUNDATIONAL_CHARTER_STANDARD_ID,
  FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS,
  SLPS_WRITING_RULES,
} from "@/lib/editorial/foundational-charter";

export const FC_FRAMEWORK = {
  identifier: FOUNDATIONAL_CHARTER_STANDARD_ID,
  shortId: "FC-001",
  title: "Foundational Charter Standard",
  version: "1.0",
  status: "published" as const,
  derivedFrom: ["FRAMEWORK-SLPS-001", "FRAMEWORK-SLPS-CORE-001", "LIB-2026-06-27-010"],
} as const;

export const FC_BODY = `${FOUNDATIONAL_CHARTER_PRINCIPLE}

## Editorial Decision No. 53

${EDITOR_DECISION_53}

## Ten Sections (Locked)

${FOUNDATIONAL_CHARTER_TEMPLATE_SECTIONS.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Writing Rules

${SLPS_WRITING_RULES.map((r) => `${r.number}. ${r.title} — ${r.rule}`).join("\n")}

## Chapter Approval Tests

${CHAPTER_APPROVAL_TESTS.map((t) => `- **${t.title}**: ${t.question}`).join("\n")}`;
