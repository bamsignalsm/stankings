/** Public constitution overview — factual structure only; full text is member-gated. */

export const CONSTITUTION_CHAPTERS = [
  { id: "preamble", title: "Preamble", summary: "Purpose of the Constitution and institutional binding force." },
  { id: "article-i", title: "Article I — Institutional Identity", summary: "Identity statements and continuity of institutions." },
  { id: "article-ii", title: "Article II — Constitutional Alignment", summary: "Board proposals and constitutional compliance." },
  { id: "article-iii", title: "Article III — Stewardship", summary: "Annual stewardship declarations and duties." },
  { id: "article-iv", title: "Article IV — Governance", summary: "Reserved powers and governance structure." },
  { id: "article-v", title: "Article V — Leadership", summary: "Leadership as constitutional stewardship." },
  { id: "article-vi", title: "Article VI — Decisions", summary: "Institutional decision register and records." },
  { id: "article-vii", title: "Article VII — Assets", summary: "Constitutional asset register." },
  { id: "article-viii", title: "Article VIII — Ownership & Stewardship", summary: "Governance architecture register." },
  { id: "article-ix", title: "Article IX — Ecosystem", summary: "Institutional ecosystem relationships." },
  { id: "article-x", title: "Article X — Institutions & Innovation", summary: "Lifecycle of institutions and innovation review." },
  { id: "article-xi", title: "Article XI — Integrity", summary: "Integrity declarations and ethics." },
  { id: "article-xii", title: "Article XII — Trust & Information", summary: "Information governance and trust infrastructure." },
  { id: "article-xiii", title: "Article XIII — Knowledge", summary: "Knowledge governance and the Library." },
  { id: "article-xiv", title: "Article XIV — Stewardship Reporting", summary: "Annual constitutional stewardship report." },
  { id: "article-xv", title: "Article XV — Amendment", summary: "Constitution register and amendment discipline." },
  { id: "article-xvi", title: "Article XVI — Continuity", summary: "Leadership continuity and custodian programmes." },
  { id: "article-xvii", title: "Article XVII — Office Holders", summary: "Register of constitutional office holders." },
] as const;

export const CONSTITUTION_INTRO = [
  {
    heading: "Highest internal governing document",
    body: "Volume I — The Group Constitution — is the highest internal governing document of Stankings Legacy Ltd. It implements the Canons of Volume 0 and prevails over derived governance unless applicable law requires otherwise.",
  },
  {
    heading: "What the public may read here",
    body: "This page presents the structure and purpose of the Constitution for transparency. The authoritative text, schedules, and interpretive records are preserved in The Stankings Library for verified members, protecting integrity while disclosing how we govern.",
  },
  {
    heading: "How to use this document",
    body: "Leaders and partners should treat the Constitution as binding institutional law. Product companies remain operationally independent; they reference Group standards without sharing runtime, databases, authentication, or payments with Stankings HQ.",
  },
] as const;
