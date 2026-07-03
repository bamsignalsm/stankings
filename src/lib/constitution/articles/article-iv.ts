/**
 * Volume I — Article IV
 * Constitutional Governance
 * Adopted Version 1.0
 */

import { articleBodyMarkdown, type ConstitutionalArticle } from "@/lib/constitution/articles/types";

export const ARTICLE_IV_ID = "article-iv" as const;

export const ARTICLE_IV = {
  id: ARTICLE_IV_ID,
  article: "Article IV",
  title: "Constitutional Governance",
  canonRefs: [
    "CANON-004",
    "CANON-007",
    "CANON-011",
    "CANON-015",
    "CANON-016",
    "CANON-020",
    "CANON-023",
  ],
  sections: [
    {
      id: "section-4-01",
      number: "Section 4.01",
      title: "Principle of Constitutional Governance",
      paragraphs: [
        "Stankings Group shall be governed according to this Constitution.",
        "Authority shall be exercised only within powers properly delegated by this Constitution, applicable law and duly adopted governance instruments.",
        "No individual, regardless of position or influence, shall stand above the Constitution.",
      ],
    },
    {
      id: "section-4-02",
      number: "Section 4.02",
      title: "Governance Structure",
      paragraphs: [
        "The governance of Stankings Group shall ordinarily consist of:",
        "Each governance body shall exercise only those responsibilities lawfully delegated to it.",
      ],
      listItems: [
        "The Constitutional Owner(s), in accordance with the lawful ownership structure.",
        "The Board of Directors.",
        "The Group Chief Executive Officer.",
        "Executive Leadership.",
        "Institutional Leadership of subsidiary institutions.",
        "Governance Committees.",
        "Such additional governance bodies as may be established consistently with this Constitution.",
      ],
    },
    {
      id: "section-4-03",
      number: "Section 4.03",
      title: "Separation of Governance and Management",
      paragraphs: [
        "The Board shall govern.",
        "Executive leadership shall manage.",
        "Operational teams shall execute.",
        "Oversight and execution shall remain distinct responsibilities.",
        "The Board shall avoid unnecessary involvement in day-to-day management.",
        "Management shall remain accountable to the Board for operational performance.",
      ],
    },
    {
      id: "section-4-04",
      number: "Section 4.04",
      title: "Constitutional Duties of the Board",
      paragraphs: [
        "The Board shall safeguard:",
        "The Board shall act as guardian of the institution rather than manager of daily operations.",
      ],
      listItems: [
        "The Constitution.",
        "The Stankings Canons.",
        "Institutional purpose.",
        "Institutional trust.",
        "Long-term strategy.",
        "Stewardship of institutional assets.",
        "Leadership succession.",
        "Risk governance.",
        "Financial sustainability.",
        "Institutional resilience.",
      ],
      listStyle: "grid",
    },
    {
      id: "section-4-05",
      number: "Section 4.05",
      title: "Constitutional Duties of Executive Leadership",
      paragraphs: [
        "Executive leadership shall faithfully implement the strategic direction established through constitutional governance.",
        "Executives shall:",
      ],
      listItems: [
        "Manage responsibly.",
        "Report honestly.",
        "Develop people.",
        "Protect institutional assets.",
        "Preserve institutional knowledge.",
        "Maintain operational excellence.",
        "Remain accountable to the Board.",
      ],
    },
    {
      id: "section-4-06",
      number: "Section 4.06",
      title: "Delegation of Authority",
      paragraphs: [
        "Authority may be delegated.",
        "Responsibility shall remain accountable.",
        "Delegation shall be documented clearly.",
        "The scope, limits and duration of delegated authority shall be defined appropriately.",
        "Delegated authority shall never authorize actions inconsistent with this Constitution.",
      ],
    },
    {
      id: "section-4-07",
      number: "Section 4.07",
      title: "Constitutional Accountability",
      paragraphs: [
        "Every governance body shall remain accountable for decisions taken within its authority.",
        "Significant decisions shall be documented.",
        "Appropriate records shall be preserved.",
        "Institutional learning shall follow major decisions.",
        "Transparency and accountability strengthen constitutional governance.",
      ],
    },
    {
      id: "section-4-08",
      number: "Section 4.08",
      title: "Governance Reviews",
      paragraphs: [
        "The governance framework shall undergo periodic constitutional review.",
        "The purpose of such reviews shall be to strengthen institutional effectiveness while preserving constitutional principles.",
        "Governance reforms shall remain consistent with the Constitution unless formally amended.",
      ],
    },
    {
      id: "section-4-09",
      number: "Section 4.09",
      title: "Constitutional Interpretation",
      paragraphs: [
        "Where uncertainty exists concerning governance responsibilities, interpretation shall favour:",
      ],
      listItems: [
        "Responsible stewardship.",
        "Clear accountability.",
        "Institutional continuity.",
        "Protection of constitutional principles.",
        "Long-term institutional health.",
      ],
    },
  ],
} as const satisfies ConstitutionalArticle;

export const ARTICLE_IV_BODY_MARKDOWN = articleBodyMarkdown(ARTICLE_IV);

export const BOARD_CONSTITUTIONAL_DUTIES = ARTICLE_IV.sections.find(
  (s) => s.id === "section-4-04",
)!.listItems!;
