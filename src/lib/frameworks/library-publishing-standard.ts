/**
 * Stankings Library Publishing Standard — FRAMEWORK-SLPS-001 (SLPS-001)
 * Editorial Decision No. 50 — supersedes FRAMEWORK-LPS-001
 */

import {
  SLPS_APPLIES_TO,
  SLPS_CHAPTER_METADATA_FIELDS,
  SLPS_DIAGRAM_METADATA_FIELDS,
  SLPS_HUB_SECTIONS,
  SLPS_IDENTIFIER,
  SLPS_PUBLICATION_METADATA_FIELDS,
  SLPS_PUBLICATION_STATUSES,
  SLPS_PUBLICATION_STRUCTURE,
  SLPS_PURPOSE,
  SLPS_VERSION,
  SLPS_VISUAL_IDENTITY,
} from "@/lib/editorial/slps";
import { EDITOR_DECISION_50 } from "@/lib/editorial/decisions";

export const SLPS_FRAMEWORK = {
  identifier: "FRAMEWORK-SLPS-001",
  shortId: SLPS_IDENTIFIER,
  title: "Stankings Library Publishing Standard",
  version: SLPS_VERSION,
  status: "published" as const,
  derivedFrom: [
    "FRAMEWORK-EDW-001",
    "FRAMEWORK-SLP-001",
    "FRAMEWORK-LPS-001",
    "CONSTITUTION-ARTICLE-XIII",
    "LIB-2026-06-27-007",
  ],
  supersedes: "FRAMEWORK-LPS-001",
} as const;

/** @deprecated Alias — use SLPS_FRAMEWORK */
export const LPS_FRAMEWORK = {
  identifier: "FRAMEWORK-LPS-001",
  title: "Library Publishing Standard",
  version: SLPS_VERSION,
  status: "published" as const,
  derivedFrom: SLPS_FRAMEWORK.derivedFrom,
  aliases: "FRAMEWORK-SLPS-001",
} as const;

export const SLPS_BODY = `${SLPS_PURPOSE}

## Editorial Decision No. 50

${EDITOR_DECISION_50}

## Applies To

${SLPS_APPLIES_TO.map((v) => `- ${v}`).join("\n")}

## Standard Publication Structure

${SLPS_PUBLICATION_STRUCTURE.map((s) => `${s.step}. ${s.title}`).join("\n")}

## Publication Statuses

${SLPS_PUBLICATION_STATUSES.join(" → ")}

## Publication Metadata Fields

${SLPS_PUBLICATION_METADATA_FIELDS.join(", ")}

## Chapter Metadata Fields

${SLPS_CHAPTER_METADATA_FIELDS.join(", ")}

## Diagram Metadata Fields

${SLPS_DIAGRAM_METADATA_FIELDS.join(", ")}

## Visual Identity

${SLPS_VISUAL_IDENTITY.map((v) => `- ${v}`).join("\n")}`;

export {
  SLPS_APPLIES_TO,
  SLPS_HUB_SECTIONS,
  SLPS_PUBLICATION_STRUCTURE,
  SLPS_PUBLICATION_STATUSES,
  SLPS_PUBLICATION_METADATA_FIELDS,
  SLPS_CHAPTER_METADATA_FIELDS,
  SLPS_DIAGRAM_METADATA_FIELDS,
  SLPS_VISUAL_IDENTITY,
};
