import type { ConstitutionalLearningModule } from "@/lib/constitutional-convention/types";

export const CONSTITUTIONAL_LEARNING: ConstitutionalLearningModule[] = [
  {
    articleId: "article-ix",
    lessons: ["Institutions vs subsidiaries", "Shared platform economics", "Ecosystem admission criteria"],
    quizPrompts: [
      "When should a new venture become a separate institution?",
      "Name three shared platforms and their constitutional purpose.",
    ],
    caseStudy: "Yike and BayRight sharing YIKE Passport without merging corporate structures.",
    boardScenario: "A director proposes acquiring a partner company as a subsidiary. What does Article IX require?",
    engineeringScenario: "Design a new service that uses Passport, Trust Graph, and Escrow — which Articles apply?",
    ceoScenario: "CEO wants to duplicate identity infrastructure. Board response per § 9.04?",
    custodianScenario: "Age 14 track: draw the ecosystem diagram from memory and explain one shared platform.",
    status: "forming",
  },
  {
    articleId: "article-xii",
    lessons: ["Purpose limitation", "Consent architecture", "AI data governance"],
    quizPrompts: ["What is the Trust Network?", "When may data cross institutional boundaries?"],
    caseStudy: "Passport consent flow for BamSignal accessing Yike transaction history.",
    boardScenario: "Institution requests user data beyond stated purpose — constitutional response?",
    engineeringScenario: "Implement audit logging for cross-institution data access.",
    ceoScenario: "Marketing team wants aggregated user data — privacy review per Art. XII?",
    custodianScenario: "Explain digital trust to a future custodian using Yike as example.",
    status: "forming",
  },
  {
    articleId: "article-xvi",
    lessons: ["Heirs vs custodians", "Mentorship standards", "Succession readiness"],
    quizPrompts: ["What may NOT be the sole basis for leadership appointment?", "Name five curriculum tracks."],
    caseStudy: "Founding cohort curriculum design — Volume 0 before Volume I.",
    boardScenario: "Family member seeks executive role without programme completion.",
    engineeringScenario: "Build Custodian Profile tracking constitution module completion.",
    ceoScenario: "Measure leadership partly by successors developed.",
    custodianScenario: "Write your readiness review as if graduating Cohort I.",
    status: "forming",
  },
  {
    articleId: "article-xvii",
    lessons: ["Constitutional affirmation", "Office holder registration", "Generational covenant"],
    quizPrompts: ["Recite the constitutional affirmation.", "What must precede assuming constitutional office?"],
    caseStudy: "Founder's Charge as historical record, not legal authority.",
    boardScenario: "New director declines affirmation — may they serve?",
    engineeringScenario: "Implement COROH register with immutable appointment records.",
    ceoScenario: "First day in office — ceremony, training, declarations checklist.",
    custodianScenario: "Explain why affirmation allows personal belief forms.",
    status: "forming",
  },
];

export function getLearningForArticle(articleId: string): ConstitutionalLearningModule | undefined {
  return CONSTITUTIONAL_LEARNING.find((m) => m.articleId === articleId);
}
