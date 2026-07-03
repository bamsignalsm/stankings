/**
 * SLPS-CORE — FRAMEWORK-SLPS-CORE-001
 * Editorial Decision No. 51 — Session LIB-2026-06-27-008
 */

import { EDITOR_DECISION_51 } from "@/lib/editorial/decisions";
import {
  SLPS_CORE_ARCHITECTURE,
  SLPS_CORE_FRAMEWORK_ID,
  SLPS_CORE_IDENTIFIER,
  SLPS_CORE_IMPLEMENTATION_RULES,
  SLPS_CORE_MODULES,
  SLPS_CORE_PURPOSE,
  SLPS_CORE_VERSION,
} from "@/lib/slps-core/registry";
import { INSTITUTIONAL_AI_INTEGRATION_POINTS } from "@/lib/slps-core/ai-layer";

export const SLPS_CORE_FRAMEWORK = {
  identifier: SLPS_CORE_FRAMEWORK_ID,
  shortId: SLPS_CORE_IDENTIFIER,
  title: "Stankings Library Publishing System",
  version: SLPS_CORE_VERSION,
  status: "published" as const,
  derivedFrom: [
    "FRAMEWORK-SLPS-001",
    "FRAMEWORK-EDW-001",
    "PUB-ENGINE-001",
    "CONSTITUTION-ARTICLE-XIII",
    "LIB-2026-06-27-008",
  ],
  enforces: "FRAMEWORK-SLPS-001",
} as const;

export const SLPS_CORE_BODY = `${SLPS_CORE_PURPOSE}

## Editorial Decision No. 51

${EDITOR_DECISION_51}

## Architecture

${SLPS_CORE_ARCHITECTURE.map((line) => `- ${line}`).join("\n")}

## Seven Modules

${SLPS_CORE_MODULES.map((m) => `${m.number}. ${m.title} — ${m.description}`).join("\n\n")}

## Implementation Rules

${SLPS_CORE_IMPLEMENTATION_RULES.map((r) => `- ${r}`).join("\n")}

## Institutional AI Integration Points

${INSTITUTIONAL_AI_INTEGRATION_POINTS.map((p) => `- **${p.id}**: ${p.description}`).join("\n")}`;

export { SLPS_CORE_MODULES, SLPS_CORE_PURPOSE, SLPS_CORE_ARCHITECTURE };
