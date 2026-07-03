export interface KnowledgeObjectProfile {
  knowledgeId: string;
  title: string;
  category: string;
  institution: string;
  authors: string[];
  contributors: string[];
  constitutionArticles: string[];
  canonReferences: string[];
  relatedDecisions: { id: string; title: string; href?: string }[];
  relatedProjects: { id: string; title: string; href?: string }[];
  versionHistory: { version: string; date: string; summary: string }[];
  reviewStatus: "current" | "due" | "overdue";
  accessClassification: "public" | "employee" | "confidential" | "restricted";
  learningModules: { id: string; title: string; href?: string }[];
  caseStudies: { id: string; title: string; href?: string }[];
  aiEmbeddings: boolean;
  crossReferences: { identifier: string; title: string; href?: string }[];
  href: string;
}

export interface KnowledgeChainNode {
  id: string;
  label: string;
  type: "canon" | "concept" | "platform" | "article" | "standard" | "decision" | "training";
  href?: string;
}

export interface KnowledgeChainEdge {
  from: string;
  to: string;
}
