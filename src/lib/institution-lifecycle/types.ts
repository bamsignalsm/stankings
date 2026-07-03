export type LifecycleStage =
  | "idea"
  | "research"
  | "problem_validation"
  | "concept_development"
  | "constitutional_review"
  | "strategic_approval"
  | "prototype_pilot"
  | "formation"
  | "launch"
  | "growth"
  | "maturity"
  | "renewal"
  | "transformation"
  | "responsible_conclusion";

export type InnovationOrigin =
  | "board"
  | "executive"
  | "institution"
  | "employee"
  | "family"
  | "research"
  | "partner"
  | "university"
  | "innovation_programme";

export interface LifecycleMilestone {
  date: string;
  stage: LifecycleStage;
  event: string;
  note?: string;
}

export interface StewardshipReviewRef {
  year: number;
  status: "completed" | "scheduled" | "pending";
  href?: string;
}

export interface ClosureArchive {
  conclusionDate: string;
  reason: string;
  decisionRecord?: string;
  knowledgePreserved: string[];
  lessonsLearned: string[];
}

export interface InstitutionLifecycleRecord {
  institutionId: string;
  slug: string;
  name: string;
  excellence: string;
  constitutionalPurpose: string;
  dateProposed?: string;
  dateApproved?: string;
  launchDate?: string;
  currentStage: LifecycleStage;
  stageLabel: string;
  charterStatus: "approved" | "draft" | "archived";
  charterHref?: string;
  constitutionArticles: string[];
  canonReferences: string[];
  sharedPlatforms: string[];
  apisPublished: string[];
  apisConsumed: string[];
  stewardshipReviews: StewardshipReviewRef[];
  knowledgeObjects: { title: string; href?: string }[];
  lessonsLearned: string[];
  renewalHistory: string[];
  transformationHistory: string[];
  milestones: LifecycleMilestone[];
  closureArchive?: ClosureArchive;
  color: string;
  icon: string;
  isLive?: boolean;
}

export type InnovationPipelineStage =
  | "submit_idea"
  | "research_validation"
  | "mentor_assignment"
  | "constitutional_innovation_review"
  | "board_review"
  | "prototype_funding"
  | "pilot"
  | "institution_launch"
  | "concluded";

export interface InnovationReviewEvent {
  date: string;
  stage: InnovationPipelineStage;
  outcome: string;
  reviewer?: string;
}

export interface InnovationPassport {
  ideaId: string;
  title: string;
  origin: InnovationOrigin;
  originLabel: string;
  track: "family" | "employee" | "public" | "internal";
  problemAddressed: string;
  currentStage: InnovationPipelineStage;
  stageLabel: string;
  constitutionArticles: string[];
  canonReferences: string[];
  reviewHistory: InnovationReviewEvent[];
  mentor?: string;
  fundingDecisions: string[];
  prototypeResults?: string;
  knowledgeObjects: { title: string; href?: string }[];
  commercialOutcome?: string;
  lessonsLearned: string[];
  linkedInstitutionSlug?: string;
  status: "active" | "approved" | "declined" | "launched" | "archived";
}
