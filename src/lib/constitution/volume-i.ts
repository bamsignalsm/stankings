/**
 * Volume I — The Stankings Group Constitution
 * Version 1.0 — Supreme internal governing law
 * Executive Decision No. 28
 */

export const CONSTITUTION_VERSION = "1.0" as const;

export const CONSTITUTION_EFFECTIVE_DATE = "2026-06-27";

export const CONSTITUTION_MOTTO =
  "May every generation prove worthy of the trust it receives.";

export { ARTICLE_I, ARTICLE_I_BODY_MARKDOWN, ARTICLE_I_ID } from "@/lib/constitution/articles/article-i";
export {
  ARTICLE_II,
  ARTICLE_II_BODY_MARKDOWN,
  ARTICLE_II_ID,
  CONSTITUTIONAL_OBJECTIVES,
  EXPANSION_CRITERIA,
} from "@/lib/constitution/articles/article-ii";
export {
  ARTICLE_III,
  ARTICLE_III_BODY_MARKDOWN,
  ARTICLE_III_ID,
  INSTITUTIONAL_ASSETS,
  STEWARDSHIP_REVIEW_CRITERIA,
} from "@/lib/constitution/articles/article-iii";
export {
  ARTICLE_IV,
  ARTICLE_IV_BODY_MARKDOWN,
  ARTICLE_IV_ID,
  BOARD_CONSTITUTIONAL_DUTIES,
} from "@/lib/constitution/articles/article-iv";
export {
  ARTICLE_V,
  ARTICLE_V_BODY_MARKDOWN,
  ARTICLE_V_ID,
  CONSTITUTIONAL_LEADERSHIP_STANDARDS,
  LEADERSHIP_EVALUATION_CRITERIA,
} from "@/lib/constitution/articles/article-v";
export {
  ARTICLE_VI,
  ARTICLE_VI_BODY_MARKDOWN,
  ARTICLE_VI_ID,
  CONSTITUTIONAL_DECISION_HIERARCHY,
  DECISION_EVIDENCE_TYPES,
  DECISION_RECORD_FIELDS,
  LONG_TERM_DECISION_EFFECTS,
} from "@/lib/constitution/articles/article-vi";
export {
  ARTICLE_VII,
  ARTICLE_VII_BODY_MARKDOWN,
  ARTICLE_VII_ID,
  ANNUAL_ASSET_STEWARDSHIP_REVIEW_CRITERIA,
  INSTITUTIONAL_ASSET_CATEGORIES,
} from "@/lib/constitution/articles/article-vii";
export {
  ARTICLE_VIII,
  ARTICLE_VIII_BODY_MARKDOWN,
  ARTICLE_VIII_ID,
  CONSTITUTIONAL_OWNER_DUTIES,
  GENERATIONAL_STEWARDSHIP_PRINCIPLES,
} from "@/lib/constitution/articles/article-viii";
export {
  ARTICLE_IX,
  ARTICLE_IX_BODY_MARKDOWN,
  ARTICLE_IX_ID,
  ECOSYSTEM_COLLABORATION_EXAMPLES,
  ECOSYSTEM_STEWARDSHIP_REVIEW_CRITERIA,
  INSTITUTION_ADMISSION_CRITERIA,
  SHARED_INSTITUTIONAL_PRINCIPLES,
  SHARED_PLATFORM_CATEGORIES,
} from "@/lib/constitution/articles/article-ix";
export {
  ARTICLE_X,
  ARTICLE_X_BODY_MARKDOWN,
  ARTICLE_X_ID,
  CONSTITUTIONAL_INNOVATION_REVIEW_CRITERIA,
  INSTITUTIONAL_CHARTER_FIELDS,
  INSTITUTIONAL_DEVELOPMENT_PATHWAY,
  INSTITUTIONAL_INCUBATION_SUPPORT,
  INSTITUTIONAL_INNOVATION_SOURCES,
  PERIODIC_CONSTITUTIONAL_REVIEW_CRITERIA,
  RESPONSIBLE_CONCLUSION_FACTORS,
} from "@/lib/constitution/articles/article-x";
export {
  ARTICLE_XI,
  ARTICLE_XI_BODY_MARKDOWN,
  ARTICLE_XI_ID,
  ETHICAL_DECISION_FACTORS,
  RELATED_PARTY_REVIEW_CRITERIA,
} from "@/lib/constitution/articles/article-xi";
export {
  ARTICLE_XII,
  ARTICLE_XII_BODY_MARKDOWN,
  ARTICLE_XII_ID,
  DATA_GOVERNANCE_DOMAINS,
  TRUST_NETWORK_COMPONENTS,
  TRUST_NETWORK_PRINCIPLES,
} from "@/lib/constitution/articles/article-xii";
export {
  ARTICLE_XIII,
  ARTICLE_XIII_BODY_MARKDOWN,
  ARTICLE_XIII_ID,
  KNOWLEDGE_CONTRIBUTION_TYPES,
  KNOWLEDGE_REVIEW_CRITERIA,
  LIBRARY_PRESERVATION_ITEMS,
} from "@/lib/constitution/articles/article-xiii";
export {
  ARTICLE_XIV,
  ARTICLE_XIV_BODY_MARKDOWN,
  ARTICLE_XIV_ID,
  CONSTITUTIONAL_MATURITY_DOMAINS,
  INSTITUTIONAL_HEALTH_DIMENSIONS,
  REVIEW_RECOMMENDATION_CATEGORIES,
} from "@/lib/constitution/articles/article-xiv";
export {
  ARTICLE_XV,
  ARTICLE_XV_BODY_MARKDOWN,
  ARTICLE_XV_ID,
  AMENDMENT_PRESERVATION_FIELDS,
  AMENDMENT_PROPOSAL_REQUIREMENTS,
  AMENDMENT_REVIEW_PROCESS,
  INTERPRETATION_PRINCIPLES,
  PRESERVED_CONSTITUTIONAL_DOCUMENTS,
} from "@/lib/constitution/articles/article-xv";
export {
  ARTICLE_XVI,
  ARTICLE_XVI_BODY_MARKDOWN,
  ARTICLE_XVI_ID,
  LEADERSHIP_STUDY_DOMAINS,
  MENTORSHIP_OUTCOMES,
} from "@/lib/constitution/articles/article-xvi";
export {
  ARTICLE_XVII,
  ARTICLE_XVII_BODY_MARKDOWN,
  ARTICLE_XVII_ID,
  CONSTITUTION_EDITION_TYPES,
  CONSTITUTIONAL_COMMITMENTS,
  CONSTITUTIONAL_EDUCATION_TOPICS,
  CONSTITUTIONAL_OATH_AFFIRMATION,
} from "@/lib/constitution/articles/article-xvii";

/** Constitutional layers for teaching and navigation */
export const CONSTITUTION_VOLUME_LAYERS = [
  {
    layer: "Part I — Foundations",
    articles: "Articles I–III",
    scope: "Identity, Purpose and Stewardship",
  },
  {
    layer: "Part II — Governance",
    articles: "Articles IV–VIII",
    scope: "Governance, Leadership, Decisions, Assets and Ownership",
  },
  {
    layer: "Part III — Ecosystem",
    articles: "Articles IX–X",
    scope: "Institutional ecosystem and lifecycle",
  },
  {
    layer: "Part IV — Integrity",
    articles: "Articles XI–XIV",
    scope: "Ethics, trust, knowledge, and institutional health",
  },
  {
    layer: "Part V — Continuity",
    articles: "Articles XV–XVII",
    scope: "Amendment, preservation, custodian development, and ratification",
  },
] as const;

export const CONSTITUTION_PREAMBLE = `We, the custodians of Stankings Group, acknowledge that institutions are held in trust rather than owned in permanence.

We recognize that every generation inherits responsibilities created by those who came before and accepts the obligation to strengthen the institution for those who will follow.

Stankings Group exists to build trusted institutions that serve society through responsible enterprise, disciplined innovation and enduring stewardship.

Our purpose is not merely to create wealth, but to create lasting value.

Our ambition is not merely to grow larger, but to grow stronger.

Our measure of success shall include the trust we earn, the opportunities we create, the knowledge we preserve and the contribution we make to society.

This Constitution establishes the enduring principles through which the institutions of Stankings Group shall be governed.

It shall be interpreted consistently with the Stankings Canons.

It shall protect the integrity of the institution while allowing future generations the wisdom and flexibility required to serve changing societies faithfully.

Every custodian who accepts responsibility within this institution accepts the duty to preserve its principles, strengthen its capabilities and pass it forward with honour.

May every generation prove worthy of the trust it receives.`;

/** @deprecated Draft One preamble — preserved in constitutional history */
export const CONSTITUTION_PREAMBLE_DRAFT_ONE = `We, the founders of Stankings Group, establish this Constitution to preserve an institution that shall endure beyond our lifetime.

This Constitution exists to provide a permanent foundation upon which businesses, technologies, institutions, charitable initiatives, educational establishments, and future generations may continue to build.`;

export type ConstitutionArticleStatus = "published" | "forthcoming" | "draft" | "planned";

export interface ConstitutionTocEntry {
  id: string;
  article: string;
  title: string;
  status: ConstitutionArticleStatus;
  href?: string;
  canonRefs?: string[];
  partId?: string;
}

export interface ConstitutionPart {
  id: string;
  part: string;
  title: string;
  articleIds: readonly string[];
}

export const CONSTITUTION_PARTS: ConstitutionPart[] = [
  {
    id: "part-i",
    part: "Part I",
    title: "Constitutional Foundations",
    articleIds: ["article-i", "article-ii", "article-iii"],
  },
  {
    id: "part-ii",
    part: "Part II",
    title: "Constitutional Governance",
    articleIds: ["article-iv", "article-v", "article-vi", "article-vii", "article-viii"],
  },
  {
    id: "part-iii",
    part: "Part III",
    title: "The Institutional Ecosystem",
    articleIds: ["article-ix", "article-x"],
  },
  {
    id: "part-iv",
    part: "Part IV",
    title: "Constitutional Integrity",
    articleIds: ["article-xi", "article-xii", "article-xiii", "article-xiv"],
  },
  {
    id: "part-v",
    part: "Part V",
    title: "Constitutional Continuity",
    articleIds: ["article-xv", "article-xvi", "article-xvii"],
  },
];

export function getConstitutionPartForArticle(articleId: string): ConstitutionPart | undefined {
  return CONSTITUTION_PARTS.find((p) => p.articleIds.includes(articleId));
}

export const CONSTITUTION_TABLE_OF_CONTENTS: ConstitutionTocEntry[] = [
  {
    id: "preamble",
    article: "Preamble",
    title: "Institutional Binding Statement",
    status: "published",
    href: "#preamble",
    canonRefs: ["CANON-001", "CANON-004", "CANON-006", "CANON-025"],
  },
  {
    id: "article-i",
    partId: "part-i",
    article: "Article I",
    title: "The Identity of the Institution",
    status: "published",
    href: "/library/constitution/article-i",
    canonRefs: ["CANON-001", "CANON-003", "CANON-005", "CANON-006", "CANON-007", "CANON-023", "CANON-024", "CANON-025"],
  },
  {
    id: "article-ii",
    partId: "part-i",
    article: "Article II",
    title: "Purpose, Mission & Constitutional Objectives",
    status: "published",
    href: "/library/constitution/article-ii",
    canonRefs: ["CANON-001", "CANON-003", "CANON-006", "CANON-011", "CANON-017", "CANON-018", "CANON-022", "CANON-025"],
  },
  {
    id: "article-iii",
    partId: "part-i",
    article: "Article III",
    title: "Stewardship, Continuity & Generational Responsibility",
    status: "published",
    href: "/library/constitution/article-iii",
    canonRefs: ["CANON-004", "CANON-006", "CANON-009", "CANON-019", "CANON-021", "CANON-022", "CANON-025"],
  },
  {
    id: "article-iv",
    partId: "part-ii",
    article: "Article IV",
    title: "Constitutional Governance",
    status: "published",
    href: "/library/constitution/article-iv",
    canonRefs: ["CANON-004", "CANON-007", "CANON-011", "CANON-015", "CANON-016", "CANON-020", "CANON-023"],
  },
  {
    id: "article-v",
    partId: "part-ii",
    article: "Article V",
    title: "Constitutional Standards for Leadership",
    status: "published",
    href: "/library/constitution/article-v",
    canonRefs: ["CANON-004", "CANON-007", "CANON-010", "CANON-019", "CANON-020", "CANON-023", "CANON-025"],
  },
  {
    id: "article-vi",
    partId: "part-ii",
    article: "Article VI",
    title: "Constitutional Decision-Making",
    status: "published",
    href: "/library/constitution/article-vi",
    canonRefs: ["CANON-002", "CANON-003", "CANON-005", "CANON-006", "CANON-007", "CANON-009", "CANON-010", "CANON-017", "CANON-020"],
  },
  {
    id: "article-vii",
    partId: "part-ii",
    article: "Article VII",
    title: "Institutional Assets & Their Stewardship",
    status: "published",
    href: "/library/constitution/article-vii",
    canonRefs: ["CANON-002", "CANON-006", "CANON-007", "CANON-014", "CANON-019", "CANON-021", "CANON-025"],
  },
  {
    id: "article-viii",
    partId: "part-ii",
    article: "Article VIII",
    title: "Ownership, Custody & Constitutional Responsibility",
    status: "published",
    href: "/library/constitution/article-viii",
    canonRefs: ["CANON-004", "CANON-006", "CANON-007", "CANON-016", "CANON-025"],
  },
  {
    id: "article-ix",
    partId: "part-iii",
    article: "Article IX",
    title: "The Institutional Ecosystem",
    status: "published",
    href: "/library/constitution/article-ix",
    canonRefs: ["CANON-001", "CANON-002", "CANON-003", "CANON-005", "CANON-006", "CANON-011", "CANON-012", "CANON-016"],
  },
  {
    id: "article-x",
    partId: "part-iii",
    article: "Article X",
    title: "The Lifecycle of Institutions",
    status: "published",
    href: "/library/constitution/article-x",
    canonRefs: ["CANON-003", "CANON-005", "CANON-006", "CANON-009", "CANON-013", "CANON-018", "CANON-021", "CANON-022"],
  },
  {
    id: "article-xi",
    partId: "part-iv",
    article: "Article XI",
    title: "Conflicts of Interest, Integrity & Constitutional Ethics",
    status: "published",
    href: "/library/constitution/article-xi",
    canonRefs: ["CANON-002", "CANON-004", "CANON-007", "CANON-010", "CANON-020", "CANON-025"],
  },
  {
    id: "article-xii",
    partId: "part-iv",
    article: "Article XII",
    title: "Information, Privacy & Digital Trust",
    status: "published",
    href: "/library/constitution/article-xii",
    canonRefs: ["CANON-002", "CANON-007", "CANON-010", "CANON-012", "CANON-013", "CANON-021"],
  },
  {
    id: "article-xiii",
    partId: "part-iv",
    article: "Article XIII",
    title: "Knowledge, Learning & Institutional Memory",
    status: "published",
    href: "/library/constitution/article-xiii",
    canonRefs: ["CANON-006", "CANON-009", "CANON-019", "CANON-020", "CANON-021", "CANON-022", "CANON-023"],
  },
  {
    id: "article-xiv",
    partId: "part-iv",
    article: "Article XIV",
    title: "Constitutional Review, Institutional Health & Continual Improvement",
    status: "published",
    href: "/library/constitution/article-xiv",
    canonRefs: ["CANON-006", "CANON-007", "CANON-009", "CANON-015", "CANON-019", "CANON-020", "CANON-022", "CANON-023", "CANON-025"],
  },
  {
    id: "article-xv",
    partId: "part-v",
    article: "Article XV",
    title: "Constitutional Amendment, Preservation & Continuity",
    status: "published",
    href: "/library/constitution/article-xv",
    canonRefs: ["CANON-006", "CANON-007", "CANON-016", "CANON-020", "CANON-021", "CANON-023", "CANON-025"],
  },
  {
    id: "article-xvi",
    partId: "part-v",
    article: "Article XVI",
    title: "The Custodian Programme & Leadership Development",
    status: "published",
    href: "/library/constitution/article-xvi",
    canonRefs: ["CANON-004", "CANON-006", "CANON-009", "CANON-019", "CANON-020", "CANON-023", "CANON-025"],
  },
  {
    id: "article-xvii",
    partId: "part-v",
    article: "Article XVII",
    title: "Constitutional Ratification, Oath & Commitment",
    status: "published",
    href: "/library/constitution/article-xvii",
    canonRefs: ["CANON-004", "CANON-006", "CANON-007", "CANON-020", "CANON-023", "CANON-025"],
  },
  {
    id: "article-xviii",
    article: "Article XVIII",
    title: "Constitutional Schedules",
    status: "forthcoming",
    canonRefs: ["CANON-016"],
  },
];

export const CONSTITUTION_DEFINITIONS = [
  {
    term: "Custodian",
    definition:
      "An individual entrusted with protecting, improving and passing the institution to future generations — not an owner in permanence.",
    lexiconRef: "/library/lexicon/custodian",
  },
  {
    term: "Stewardship",
    definition:
      "The responsible care, preservation and improvement of something entrusted to one's leadership.",
    lexiconRef: "/library/lexicon/stewardship",
  },
  {
    term: "Institution",
    definition:
      "An enduring organization designed to serve a defined purpose across generations.",
    lexiconRef: "/library/lexicon/institution",
  },
  {
    term: "Canon",
    definition:
      "An authoritative philosophical principle of Volume 0 — interpreted by, not superseded by, this Constitution.",
    lexiconRef: "/library/first-principles",
  },
  {
    term: "Endurance",
    definition:
      "The continuing consequence of responsible stewardship — earned by every generation, not inherited automatically.",
    lexiconRef: "/library/lexicon/endurance",
  },
] as const;

export const CONSTITUTION_HISTORY = [
  {
    date: "2026-06",
    event: "Draft One",
    note: "Early constitutional chapters drafted during Library formation — archived as pre-v1.0 working text.",
  },
  {
    date: "2026-06-27",
    event: "Volume 0 Complete",
    note: "Twenty-five Canons approved as Version 1.0 — philosophical foundation sealed.",
  },
  {
    date: "2026-06-27",
    event: "Volume I Version 1.0",
    note: "Constitution Preamble adopted. Executive Decision No. 28.",
  },
  {
    date: "2026-06-27",
    event: "Article I Adopted",
    note: "The Identity of the Institution — eight sections. Executive Decision No. 29.",
  },
  {
    date: "2026-06-27",
    event: "Article II Adopted",
    note: "Purpose, Mission & Constitutional Objectives — constitutionalized mission and CAE framework. Executive Decision No. 30.",
  },
  {
    date: "2026-06-27",
    event: "Article III Adopted",
    note: "Stewardship, Continuity & Generational Responsibility — stewardship constitutionalized. Stewardship Portal and ED 31.",
  },
  {
    date: "2026-06-27",
    event: "Article IV Adopted",
    note: "Constitutional Governance — separation of govern and manage, Reserved Powers Register. Executive Decision No. 32.",
  },
  {
    date: "2026-06-27",
    event: "Article V Adopted",
    note: "Constitutional Standards for Leadership — integrity, competence, accountability. Leadership Governance Portal and ED 33.",
  },
  {
    date: "2026-06-27",
    event: "Article VI Adopted",
    note: "Constitutional Decision-Making — hierarchy, evidence, Institutional Decision Register. CDW and ED 34.",
  },
  {
    date: "2026-06-27",
    event: "Article VII Adopted",
    note: "Institutional Assets & Their Stewardship — trust and knowledge as constitutional assets. IAR and ED 35.",
  },
  {
    date: "2026-06-27",
    event: "Article VIII Adopted",
    note: "Ownership, Custody & Constitutional Responsibility — constitutional firewall. OASP and Governance Architecture Register. ED 36.",
  },
  {
    date: "2026-06-27",
    event: "Article IX Adopted",
    note: "The Institutional Ecosystem — institutions not subsidiaries. Ecosystem Architecture Portal and Institutional Ecosystem Register. ED 37.",
  },
  {
    date: "2026-06-27",
    event: "Article X Adopted",
    note: "The Lifecycle of Institutions — constitutional engine for birth, maturity, and honourable retirement. ILR, Innovation Portal, Venture Studio, Schedules. ED 38. Articles II & V amended — innovation as stewardship.",
  },
  {
    date: "2026-06-27",
    event: "Article XI Adopted",
    note: "Part IV begins — Conflicts of Interest, Integrity & Constitutional Ethics. Integrity & Ethics Centre and Annual Integrity Declarations. ED 39.",
  },
  {
    date: "2026-06-27",
    event: "Article XII Adopted",
    note: "Information, Privacy & Digital Trust — constitutionalizes the Stankings Trust Network, YIKE Passport, and shared identity. Constitutional Trust Centre and CIGF. ED 40.",
  },
  {
    date: "2026-06-27",
    event: "Article XIII Adopted",
    note: "Knowledge, Learning & Institutional Memory — The Stankings Library constitutionalized. Library Portal and Knowledge Governance Framework. ED 41.",
  },
  {
    date: "2026-06-27",
    event: "Article XIV Adopted",
    note: "Constitutional Review, Institutional Health & Continual Improvement — self-diagnosis beyond financials. Health Dashboard and Annual Constitutional Stewardship Report. ED 42.",
  },
  {
    date: "2026-06-27",
    event: "Article XV Adopted",
    note: "Part V begins — Constitutional Amendment, Preservation & Continuity. Constitution Centre and Constitution Register. ED 43. Constitution becomes self-governing.",
  },
  {
    date: "2026-06-27",
    event: "Article XVI Adopted",
    note: "The Custodian Programme & Leadership Development — heirs to custodians. Custodian Programme Portal and Leadership Continuity Framework. ED 44.",
  },
  {
    date: "2026-06-27",
    event: "Article XVII Adopted",
    note: "Constitutional Ratification, Oath & Commitment — leadership as covenant. Constitutional Ceremony Portal and Register of Office Holders. ED 45. Founder's Charge recorded.",
  },
  {
    date: "2026-06-27",
    event: "Constitutional Convention Opened",
    note: "Volume I editorially complete — Preamble and Articles I–XVII. Convention Phase 1–9 active: audit, cross-linking, commentary, diagrams, index, definitions, search, and learning. Schedules A–H operational. Volume II deferred until verification complete.",
  },
  {
    date: "2026-06-27",
    event: "Volume I Frozen",
    note: "Articles I–XVII text frozen for Constitutional Convention review. Presentation, indexing, and cross-linking strengthen; no rewrite without Article XV amendment discipline.",
  },
  {
    date: "2026-06-27",
    event: "Volume II Begun",
    note: "The Governance Code — Foundational Draft v0.1. Book I Governance Bodies adopted. Executive Decision No. 46. One Book at a time.",
  },
] as const;

export const CONSTITUTION_AMENDMENT_HISTORY = [
  {
    version: "1.0",
    date: "2026-06-27",
    summary: "Initial adoption — Preamble, Articles I–XVII across five Parts. Volume I frozen for Convention review. AMD-2026-001 (Art. II innovation), AMD-2026-002 (Art. V innovation). Article XVIII forthcoming.",
    approver: "Library Council",
  },
] as const;

export const CONSTITUTION_CANON_IMPLEMENTATION_MAP = [
  { canon: "CANON-001", role: "Institutions exist to serve — Art. I identity; Art. II constitutional purpose" },
  { canon: "CANON-002", role: "Trust as institutional capital — Art. VI; Art. VII asset; Art. XI integrity; Art. XII digital trust" },
  { canon: "CANON-014", role: "Commitment discipline — Art. VII trust asset stewardship" },
  { canon: "CANON-021", role: "Preserve knowledge — Art. III memory; Art. VII knowledge assets; Art. XII data governance; Art. XIII Library; Art. XV constitutional history" },
  { canon: "CANON-003", role: "Purpose precedes profit — Art. I & II enterprise test" },
  { canon: "CANON-004", role: "Leadership is stewardship — Art. III; Art. V; Art. VIII ownership; Art. XI loyalty; Art. XVI custodian programme" },
  { canon: "CANON-005", role: "Ecosystem greater than any institution — Art. I § 1.02; Art. IX institutional ecosystem" },
  { canon: "CANON-006", role: "Generational thinking — Art. III; Art. VI; Art. VII preservation; Art. VIII stewardship; Art. XIII institutional memory; Art. XVI leadership continuity" },
  { canon: "CANON-007", role: "Truth before convenience — Art. I § 1.05; Art. VI evidence; Art. XI disclosure; Art. XII purpose limitation; Art. XV amendment integrity" },
  { canon: "CANON-009", role: "Learn from failure — Art. III memory; Art. VI continuous learning; Art. X knowledge preservation; Art. XIII lessons learned; Art. XIV review learning" },
  { canon: "CANON-013", role: "Responsible innovation — Art. X incubation; Art. XII AI governance; Innovation Portal; Schedule H" },
  { canon: "CANON-010", role: "Human dignity — Art. V standards; Art. VI human impact; Art. XI ethics; Art. XII privacy" },
  { canon: "CANON-011", role: "Simplicity — Art. II expansion discipline" },
  { canon: "CANON-012", role: "Shared platforms — Art. IX § 9.04; Art. XII Trust Network; Platform Registry discipline" },
  { canon: "CANON-015", role: "Institutional strength — Art. IV Board duties; Art. V evaluation; Art. XIV health review" },
  { canon: "CANON-016", role: "Governance frameworks — Art. IV; Art. V evaluation; Art. VIII separation; Art. IX ecosystem stewardship; Art. XV schedules" },
  { canon: "CANON-017", role: "Reduce uncertainty — Art. II mission; Art. VI evidence discipline" },
  { canon: "CANON-018", role: "Principles before opportunity — Art. II § 2.08; Art. X responsible conclusion" },
  { canon: "CANON-019", role: "Leave it better — Art. III stewardship; Art. VII annual asset review; Art. XIII knowledge contribution; Art. XIV continual improvement; Art. XVI successor development" },
  { canon: "CANON-020", role: "Sound judgment — Art. IV accountability; Art. V integrity; Art. VI; Art. XI ethics; Art. XIII decision preservation; Art. XVI mentorship" },
  { canon: "CANON-022", role: "Create lasting value — Art. II § 2.04 objectives; Art. X institutional lifecycle; Art. XIII knowledge compounds; Art. XIV stewardship report" },
  { canon: "CANON-023", role: "Humble learning — Art. I § 1.04 character; Art. XIII learning as constitutional duty; Art. XIV self-examination; Art. XVI custodian education" },
  { canon: "CANON-024", role: "Raise the standard — Art. I § 1.04 excellence" },
  { canon: "CANON-025", role: "Be worthy of endurance — Art. VIII generational stewardship; Art. XIV constitutional health; Art. XV continuity; Art. XVI custodian programme; Art. XVII ratification & commitment" },
] as const;

export const LIBRARY_VOLUME_HIERARCHY = [
  { volume: "Volume 0", title: "The Canons", nature: "Philosophy" },
  { volume: "Volume I", title: "Constitution", nature: "Supreme Law" },
  { volume: "Volume II", title: "Governance Code", nature: "Governance" },
  { volume: "Volume III", title: "Operating System", nature: "Operations" },
  { volume: "Volume IV", title: "Custodian Programme", nature: "Formation" },
  { volume: "Volume V", title: "Trust Blueprint", nature: "Trust Architecture" },
  { volume: "Volume VI", title: "AI Constitution", nature: "AI Governance" },
  { volume: "Volume VII", title: "Engineering Standards", nature: "Engineering" },
  { volume: "Volume VIII", title: "House of Stankings", nature: "Family" },
] as const;
