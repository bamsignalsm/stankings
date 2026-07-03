/**
 * Founder Insights — institutional learning from the Founder's operating experience
 */

export interface FounderInsightCanonRef {
  identifier: string;
  title: string;
  href: string;
}

export interface FounderInsightEngine {
  id: string;
  title: string;
  description: string;
  activities: string[];
}

export interface FounderInsight {
  identifier: string;
  slug: string;
  title: string;
  classification: "Founder Insight";
  status: "approved" | "draft";
  version: string;
  sessionId: string;
  href: string;
  summary: string;
  institutionalInsight: string;
  foundationalPrinciple: string;
  engines: FounderInsightEngine[];
  operatingRule: string;
  relatedConcepts: string[];
  canonRefs: FounderInsightCanonRef[];
  custodianProgrammeUse: string;
  bodyParagraphs: string[];
}
