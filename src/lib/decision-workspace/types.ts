export type DecisionWorkspaceStatus =
  | "draft"
  | "under_review"
  | "approved"
  | "declined"
  | "implemented";

export type WorkflowSectionStatus = "complete" | "in_progress" | "pending" | "not_applicable";

export interface DecisionWorkspaceLink {
  title: string;
  href?: string;
  identifier?: string;
}

export interface HierarchyCheck {
  criterion: string;
  status: WorkflowSectionStatus;
  summary?: string;
}

export interface WorkflowSectionState {
  sectionId: string;
  status: WorkflowSectionStatus;
  summary?: string;
  href?: string;
}

export interface ConstitutionalDecisionWorkspace {
  slug: string;
  title: string;
  status: DecisionWorkspaceStatus;
  proposalSummary: string;
  responsibleAuthority: string;
  decisionIdentifier?: string;
  hierarchyChecks: HierarchyCheck[];
  workflowSections: WorkflowSectionState[];
  constitutionArticles: string[];
  canonReferences: string[];
  similarDecisions: DecisionWorkspaceLink[];
  knowledgeObjects: DecisionWorkspaceLink[];
  postImplementationReview?: { status: string; summary: string; href?: string };
  lessonsLearned: string[];
  createdAt: string;
  updatedAt: string;
}
