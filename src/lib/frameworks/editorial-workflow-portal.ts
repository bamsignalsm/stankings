/**
 * Editorial Workflow Portal — FRAMEWORK-EDW-001
 * Permanent editorial standard — Session LIB-2026-06-27-003
 */

import {
  DOCUMENT_APPROVAL_LIFECYCLE,
  EDITORIAL_ROLES,
  EDITORIAL_WORKFLOW_BODY,
  EDITORIAL_WORKFLOW_PHILOSOPHY,
  EDITORIAL_WORKFLOW_STEPS,
  EDITORIAL_WORKFLOW_VERSION,
  LIBRARY_PRESERVATION_PROCESS,
  QUALITY_ASSURANCE_STANDARDS,
  SESSION_TEMPLATE_SECTIONS,
} from "@/lib/editorial/workflow";
import { IMPLEMENTATION_READINESS_CHECKS } from "@/lib/editorial/implementation-readiness";
import { EDITORIAL_MOTTO } from "@/lib/editorial/methodology";

export const EDW_FRAMEWORK = {
  identifier: "FRAMEWORK-EDW-001",
  title: "Editorial Workflow Standard",
  version: EDITORIAL_WORKFLOW_VERSION,
  status: "published" as const,
  derivedFrom: [
    "FRAMEWORK-SLP-001",
    "FRAMEWORK-LIB-SESS-001",
    "CONSTITUTION-ARTICLE-XIII",
    "CANON-021",
    "LIB-2026-06-27-003",
  ],
} as const;

export const EDW_PURPOSE = `Documents the permanent editorial process used to create every constitutional, governance, engineering, and institutional publication in the Stankings Library.`;

export const EDW_BODY = EDITORIAL_WORKFLOW_BODY;

export {
  DOCUMENT_APPROVAL_LIFECYCLE,
  EDITORIAL_ROLES,
  EDITORIAL_WORKFLOW_PHILOSOPHY,
  EDITORIAL_WORKFLOW_STEPS,
  IMPLEMENTATION_READINESS_CHECKS,
  LIBRARY_PRESERVATION_PROCESS,
  QUALITY_ASSURANCE_STANDARDS,
  SESSION_TEMPLATE_SECTIONS,
  EDITORIAL_MOTTO,
};
