/**
 * Stankings Library Portal — FRAMEWORK-SLP-001
 * Derived from Constitution Article XIII
 * Executive Decision No. 41 — Knowledge Governance Framework
 */

import {
  KNOWLEDGE_CONTRIBUTION_TYPES,
  KNOWLEDGE_REVIEW_CRITERIA,
  LIBRARY_PRESERVATION_ITEMS,
} from "@/lib/constitution/articles/article-xiii";

export const SLP_FRAMEWORK = {
  identifier: "FRAMEWORK-SLP-001",
  title: "Stankings Library Portal",
  version: "1.0",
  status: "approved" as const,
  derivedFrom: [
    "CONSTITUTION-ARTICLE-XIII",
    "CONSTITUTION-ARTICLE-XII",
    "CONSTITUTION-ARTICLE-VII",
    "CANON-006",
    "CANON-009",
    "CANON-019",
    "CANON-020",
    "CANON-021",
    "CANON-022",
    "CANON-023",
    "FRAMEWORK-IKG-001",
    "LS-001",
    "LS-002",
    "library-engine",
  ],
} as const;

export const KGF_IDENTIFIER = "KGF-001";

export const SLP_PURPOSE = `Knowledge compounds. Institutional memory must not depend on individuals.

The Stankings Library Portal is the constitutional home of institutional knowledge — every Knowledge Object profiled, connected, searchable, versioned, and preserved for future custodians.`;

export const KNOWLEDGE_OBJECT_PROFILE_DOMAINS = [
  "Knowledge ID",
  "Title",
  "Category",
  "Institution",
  "Author(s)",
  "Contributors",
  "Constitution Articles",
  "Canon References",
  "Related Decisions",
  "Related Projects",
  "Version History",
  "Review Status",
  "Access Classification",
  "Learning Modules",
  "Case Studies",
  "AI Embeddings",
  "Cross References",
] as const;

export const KGF_STANDARDS = [
  "Knowledge creation",
  "Documentation",
  "Version control",
  "Review",
  "Classification",
  "Publication",
  "Archiving",
  "Searchability",
  "Preservation",
  "Responsible access",
] as const;

export const SLP_BODY = `${SLP_PURPOSE}

## Library Preservation (Art. XIII § 13.02)

${LIBRARY_PRESERVATION_ITEMS.map((i) => `- ${i}`).join("\n")}

## Knowledge Contribution (Art. XIII § 13.05)

${KNOWLEDGE_CONTRIBUTION_TYPES.map((c) => `- ${c}`).join("\n")}

## Knowledge Object Profile Domains

${KNOWLEDGE_OBJECT_PROFILE_DOMAINS.map((d) => `- ${d}`).join("\n")}

## Constitutional Review of Knowledge (Art. XIII § 13.07)

${KNOWLEDGE_REVIEW_CRITERIA.map((c) => `- ${c}`).join("\n")}

## Knowledge Governance Framework (ED 41)

${KGF_STANDARDS.map((s) => `- ${s}`).join("\n")}

Each operating institution shall designate appropriate responsibility for maintaining the quality and continuity of its institutional knowledge.`;
