import type { ArticleCrossLinks, CrossLinkRef } from "@/lib/constitutional-convention/types";
import { getAuthoritativeCanonRefs } from "@/lib/constitution/article-registry";

function canon(id: string): CrossLinkRef {
  return { id, label: id, href: `/library/canon/${id}` };
}

function article(id: string, label: string): CrossLinkRef {
  return { id, label, href: `/library/constitution/${id}` };
}

function framework(id: string, label: string, slug: string): CrossLinkRef {
  return { id, label, href: `/library/frameworks/${slug}` };
}

function schedule(letter: string, title: string): CrossLinkRef {
  return {
    id: `schedule-${letter.toLowerCase()}`,
    label: `Schedule ${letter} — ${title}`,
    href: `/library/constitution/schedules#schedule-${letter.toLowerCase()}`,
  };
}

function ko(id: string, label: string, href: string): CrossLinkRef {
  return { id, label, href };
}

function company(id: string, label: string): CrossLinkRef {
  return { id, label, href: `/library/ecosystem/${id}` };
}

/** Curated cross-links per Article — Phase 2 of the Constitutional Convention */
export const ARTICLE_CROSS_LINKS: Record<string, ArticleCrossLinks> = {
  "article-i": {
    articleId: "article-i",
    canons: [canon("CANON-001"), canon("CANON-003"), canon("CANON-005"), canon("CANON-006"), canon("CANON-007"), canon("CANON-023"), canon("CANON-024"), canon("CANON-025")],
    articles: [article("article-ii", "Article II"), article("article-ix", "Article IX")],
    schedules: [schedule("A", "Current Institutions"), schedule("E", "Constitutional Definitions")],
    governanceCodes: [ko("VOLUME-II-GOVERNANCE-CODE", "Volume II — Governance Code", "/library/governance-code")],
    policies: [],
    engineeringStandards: [ko("LS-001", "LS-001 — Library Standard", "/library/standards/ls-001")],
    companies: [company("yike", "Yike"), company("bayright", "BayRight")],
    knowledgeObjects: [
      framework("FRAMEWORK-IIS-001", "Institutional Identity Statement", "institutional-identity-statement"),
      ko("CONSTITUTION-ARTICLE-I", "Article I Knowledge Object", "/library/constitution/article-i"),
    ],
  },
  "article-ii": {
    articleId: "article-ii",
    canons: [canon("CANON-001"), canon("CANON-003"), canon("CANON-006"), canon("CANON-011"), canon("CANON-017"), canon("CANON-018"), canon("CANON-022")],
    articles: [article("article-i", "Article I"), article("article-x", "Article X")],
    schedules: [schedule("E", "Constitutional Definitions")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [],
    knowledgeObjects: [
      framework("FRAMEWORK-CAE-001", "Constitutional Alignment Engine", "constitutional-alignment-engine"),
      ko("AMD-2026-001", "Amendment — Innovation as Stewardship", "/library/constitution-centre#amendments"),
    ],
  },
  "article-iii": {
    articleId: "article-iii",
    canons: [canon("CANON-004"), canon("CANON-006"), canon("CANON-009"), canon("CANON-019"), canon("CANON-021"), canon("CANON-025")],
    articles: [article("article-ii", "Article II"), article("article-vii", "Article VII"), article("article-xvi", "Article XVI")],
    schedules: [schedule("G", "Constitutional Review Calendar")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [],
    knowledgeObjects: [
      framework("FRAMEWORK-LSF-001", "Leadership Stewardship Framework", "leadership-stewardship-framework"),
      framework("FRAMEWORK-STEWARDSHIP-PORTAL-001", "Stewardship Portal", "stewardship-portal"),
    ],
  },
  "article-iv": {
    articleId: "article-iv",
    canons: [canon("CANON-004"), canon("CANON-007"), canon("CANON-015"), canon("CANON-016"), canon("CANON-020")],
    articles: [article("article-v", "Article V"), article("article-vi", "Article VI"), article("article-viii", "Article VIII")],
    schedules: [schedule("F", "Required Institutional Registers")],
    governanceCodes: [ko("VOLUME-II-GOVERNANCE-CODE", "Volume II — Governance Code", "/library/governance-code")],
    policies: [],
    engineeringStandards: [],
    companies: [],
    knowledgeObjects: [
      framework("FRAMEWORK-CGOV-001", "Constitutional Governance Portal", "constitutional-governance-portal"),
      ko("ED-32", "Reserved Powers Register", "/library/governance"),
    ],
  },
  "article-v": {
    articleId: "article-v",
    canons: [canon("CANON-004"), canon("CANON-010"), canon("CANON-015"), canon("CANON-020"), canon("CANON-013")],
    articles: [article("article-iv", "Article IV"), article("article-xi", "Article XI"), article("article-xvi", "Article XVI")],
    schedules: [schedule("G", "Constitutional Review Calendar")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [],
    knowledgeObjects: [
      framework("FRAMEWORK-LGOV-001", "Leadership Governance Portal", "leadership-governance-portal"),
      ko("AMD-2026-002", "Amendment — Duty to Encourage Innovation", "/library/constitution-centre#amendments"),
    ],
  },
  "article-vi": {
    articleId: "article-vi",
    canons: [canon("CANON-002"), canon("CANON-007"), canon("CANON-009"), canon("CANON-017"), canon("CANON-020")],
    articles: [article("article-iv", "Article IV"), article("article-vii", "Article VII"), article("article-xiii", "Article XIII")],
    schedules: [schedule("F", "Required Institutional Registers")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [],
    knowledgeObjects: [
      framework("FRAMEWORK-CDW-001", "Constitutional Decision Workspace", "constitutional-decision-workspace"),
      ko("IDR-001", "Institutional Decision Register", "/library/decision-workspace"),
    ],
  },
  "article-vii": {
    articleId: "article-vii",
    canons: [canon("CANON-002"), canon("CANON-006"), canon("CANON-014"), canon("CANON-021"), canon("CANON-022")],
    articles: [article("article-iii", "Article III"), article("article-vi", "Article VI"), article("article-xii", "Article XII")],
    schedules: [schedule("F", "Required Institutional Registers")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [],
    knowledgeObjects: [framework("FRAMEWORK-IAR-001", "Institutional Asset Registry", "institutional-asset-registry")],
  },
  "article-viii": {
    articleId: "article-viii",
    canons: [canon("CANON-004"), canon("CANON-006"), canon("CANON-016"), canon("CANON-025")],
    articles: [article("article-iv", "Article IV"), article("article-ix", "Article IX")],
    schedules: [schedule("F", "Required Institutional Registers")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [],
    knowledgeObjects: [
      framework("FRAMEWORK-OASP-001", "Ownership & Stewardship Portal", "ownership-stewardship-portal"),
      ko("OAR-001", "Governance Architecture Register", "/library/ownership-stewardship"),
    ],
  },
  "article-ix": {
    articleId: "article-ix",
    canons: [canon("CANON-005"), canon("CANON-012"), canon("CANON-016"), canon("CANON-022")],
    articles: [article("article-i", "Article I"), article("article-x", "Article X"), article("article-xii", "Article XII")],
    schedules: [schedule("A", "Current Institutions"), schedule("B", "Shared Platforms"), schedule("C", "Strategic Institutions")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [
      company("yike", "Yike"),
      company("bamsignal", "BamSignal"),
      company("bayright", "BayRight"),
      company("stanhan", "Stanhan Real Estate"),
      company("stankings-auto-hub", "Stankings Auto Hub"),
      company("stankings-times", "Stankings Times"),
      company("stankings-hotel-and-suites", "Stankings Hotel & Suites"),
      company("shodis-industries", "Shodis Industries"),
    ],
    knowledgeObjects: [
      framework("FRAMEWORK-IEP-001", "Institutional Ecosystem Portal", "institutional-ecosystem-portal"),
      ko("IER-001", "Institutional Ecosystem Register", "/library/ecosystem-architecture"),
    ],
  },
  "article-x": {
    articleId: "article-x",
    canons: [canon("CANON-006"), canon("CANON-013"), canon("CANON-018"), canon("CANON-019"), canon("CANON-022")],
    articles: [article("article-ii", "Article II"), article("article-ix", "Article IX"), article("article-v", "Article V")],
    schedules: [schedule("H", "Innovation & Venture Lifecycle")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [company("venture-studio", "Stankings Venture Studio")],
    knowledgeObjects: [
      framework("FRAMEWORK-INP-001", "Innovation Portal", "innovation-portal"),
      framework("FRAMEWORK-ILR-001", "Institution Lifecycle Registry", "institution-lifecycle-registry"),
    ],
  },
  "article-xi": {
    articleId: "article-xi",
    canons: [canon("CANON-002"), canon("CANON-007"), canon("CANON-010"), canon("CANON-020")],
    articles: [article("article-v", "Article V"), article("article-xii", "Article XII")],
    schedules: [schedule("F", "Required Institutional Registers")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [],
    knowledgeObjects: [framework("FRAMEWORK-IEC-001", "Integrity & Ethics Centre", "integrity-ethics-centre")],
  },
  "article-xii": {
    articleId: "article-xii",
    canons: [canon("CANON-002"), canon("CANON-007"), canon("CANON-010"), canon("CANON-012"), canon("CANON-013")],
    articles: [article("article-vii", "Article VII"), article("article-ix", "Article IX"), article("article-xiii", "Article XIII")],
    schedules: [schedule("B", "Shared Platforms"), schedule("F", "Required Institutional Registers")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [ko("LS-001", "LS-001 — Library Standard", "/library/standards/ls-001")],
    companies: [company("yike", "Yike"), company("bayright", "BayRight")],
    knowledgeObjects: [
      framework("FRAMEWORK-CTC-001", "Constitutional Trust Centre", "constitutional-trust-centre"),
      ko("passport", "YIKE Passport", "/library/platforms/passport"),
      ko("verification", "Trust & Verification", "/library/platforms/verification"),
    ],
  },
  "article-xiii": {
    articleId: "article-xiii",
    canons: [canon("CANON-009"), canon("CANON-021"), canon("CANON-022"), canon("CANON-023")],
    articles: [article("article-vi", "Article VI"), article("article-xiv", "Article XIV"), article("article-xvi", "Article XVI")],
    schedules: [schedule("F", "Required Institutional Registers")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [ko("LS-001", "LS-001 — Library Standard", "/library/standards/ls-001"), ko("LS-002", "LS-002 — Lexicon", "/library/standards/ls-002")],
    companies: [],
    knowledgeObjects: [
      framework("FRAMEWORK-SLP-001", "Stankings Library Portal", "stankings-library-portal"),
      framework("FRAMEWORK-IKG-001", "Institutional Knowledge Graph", "institutional-knowledge-graph"),
    ],
  },
  "article-xiv": {
    articleId: "article-xiv",
    canons: [canon("CANON-006"), canon("CANON-007"), canon("CANON-009"), canon("CANON-015"), canon("CANON-019"), canon("CANON-020"), canon("CANON-022"), canon("CANON-023"), canon("CANON-025")],
    articles: [article("article-xiii", "Article XIII"), article("article-xv", "Article XV")],
    schedules: [schedule("F", "Required Institutional Registers"), schedule("G", "Constitutional Review Calendar")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [],
    knowledgeObjects: [framework("FRAMEWORK-CHD-001", "Constitutional Health Dashboard", "constitutional-health-dashboard")],
  },
  "article-xv": {
    articleId: "article-xv",
    canons: [canon("CANON-006"), canon("CANON-007"), canon("CANON-016"), canon("CANON-020"), canon("CANON-021"), canon("CANON-023"), canon("CANON-025")],
    articles: [article("article-xiv", "Article XIV"), article("article-xvi", "Article XVI"), article("article-xvii", "Article XVII")],
    schedules: [schedule("A", "Current Institutions"), schedule("F", "Required Institutional Registers")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [],
    knowledgeObjects: [framework("FRAMEWORK-CCR-001", "Constitution Centre", "constitution-centre")],
  },
  "article-xvi": {
    articleId: "article-xvi",
    canons: [canon("CANON-004"), canon("CANON-006"), canon("CANON-009"), canon("CANON-019"), canon("CANON-020"), canon("CANON-023"), canon("CANON-025")],
    articles: [article("article-iii", "Article III"), article("article-v", "Article V"), article("article-xvii", "Article XVII")],
    schedules: [schedule("F", "Required Institutional Registers")],
    governanceCodes: [],
    policies: [],
    companies: [],
    engineeringStandards: [],
    knowledgeObjects: [
      framework("FRAMEWORK-CPP-001", "Custodian Programme Portal", "custodian-programme-portal"),
      ko("custodian-programme", "Volume IV — Custodian Programme", "/library/custodian-programme"),
    ],
  },
  "article-xvii": {
    articleId: "article-xvii",
    canons: [canon("CANON-004"), canon("CANON-006"), canon("CANON-007"), canon("CANON-020"), canon("CANON-023"), canon("CANON-025")],
    articles: [article("article-xv", "Article XV"), article("article-xvi", "Article XVI")],
    schedules: [schedule("E", "Constitutional Definitions"), schedule("F", "Required Institutional Registers")],
    governanceCodes: [],
    policies: [],
    engineeringStandards: [],
    companies: [],
    knowledgeObjects: [
      framework("FRAMEWORK-CCY-001", "Constitutional Ceremony Portal", "constitutional-ceremony-portal"),
      ko("founders-charge", "The Founder's Charge", "/library/constitution/founders-charge"),
    ],
  },
};

export function getArticleCrossLinks(articleId: string): ArticleCrossLinks | undefined {
  const links = ARTICLE_CROSS_LINKS[articleId];
  if (!links) return undefined;

  const canons: CrossLinkRef[] = getAuthoritativeCanonRefs(articleId).map((id) => ({
    id,
    label: id,
    href: `/library/canon/${id}`,
  }));

  return { ...links, canons };
}
