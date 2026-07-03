/**
 * Innovation Portal — FRAMEWORK-INP-001
 * Schedule H — Innovation & Venture Development Framework
 */

import { INSTITUTIONAL_INCUBATION_SUPPORT } from "@/lib/constitution/articles/article-x";
import {
  INNOVATION_PIPELINE_STAGES,
  INNOVATION_TRACKS,
  INNOVATION_PORTAL_IDENTIFIER,
} from "@/lib/innovation-portal";

export const INP_FRAMEWORK = {
  identifier: INNOVATION_PORTAL_IDENTIFIER,
  title: "Innovation Portal",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-X",
    "CONSTITUTION-ARTICLE-II",
    "CONSTITUTION-ARTICLE-V",
    "CONSTITUTION-SCHEDULE-H",
    "CANON-003",
    "CANON-005",
    "CANON-013",
    "CANON-018",
    "CANON-022",
    "FRAMEWORK-ILR-001",
    "FRAMEWORK-PAF-001",
    "FRAMEWORK-PAR-001",
    "FRAMEWORK-IGF-001",
  ],
} as const;

export const VENTURE_STUDIO_MISSION =
  "To discover, evaluate, develop and launch ideas that strengthen the Stankings ecosystem and create lasting value for society.";

export const INP_PURPOSE = `The Stankings Venture Studio is the constitutional innovation engine — fair consideration for every qualifying proposal, not entitlement to funding.

Every proposal receives disciplined evaluation. Exceptional ideas may earn institutional support. Knowledge survives every outcome.`;

export const INNOVATION_PASSPORT_FIELDS = [
  "Idea ID",
  "Origin",
  "Problem Addressed",
  "Constitution Articles",
  "Canon References",
  "Review History",
  "Mentor",
  "Funding Decisions",
  "Prototype Results",
  "Knowledge Objects Created",
  "Commercial Outcome",
  "Lessons Learned",
] as const;

export const INP_BODY = `${INP_PURPOSE}

## Venture Studio Mission

${VENTURE_STUDIO_MISSION}

## Innovation Tracks

${INNOVATION_TRACKS.map((t) => `### ${t.label}\n${t.description}`).join("\n\n")}

## Innovation Pipeline

${INNOVATION_PIPELINE_STAGES.map((s) => `- **${s.label}** — ${s.description}`).join("\n")}

## Innovation Passport Fields

${INNOVATION_PASSPORT_FIELDS.map((f) => `- ${f}`).join("\n")}

## Incubation Support (Art. X § 10.06)

${INSTITUTIONAL_INCUBATION_SUPPORT.map((s) => `- ${s}`).join("\n")}

Participation creates no automatic entitlement to funding, employment or leadership. Every proposal is evaluated on merit and constitutional alignment.`;
