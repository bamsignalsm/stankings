import { getAllStaticKnowledgeObjects } from "@/lib/library-engine/seed";
import { getAllStaticLexiconTerms } from "@/lib/lexicon-engine/seed";
import { INSTITUTIONAL_GRAPH_EDGES } from "@/lib/iki/graph";

export interface IKIHealthStats {
  knowledgeObjects: number;
  approved: number;
  draft: number;
  pendingReview: number;
  canons: number;
  standards: number;
  frameworks: number;
  lexiconTerms: number;
  crossReferences: number;
  brokenLinks: number;
  outdatedObjects: number;
  reviewDue: number;
  aiCoverage: number;
  printReady: number;
  graphNodes: number;
  graphEdges: number;
}

export async function getIKIHealthStats(): Promise<IKIHealthStats> {
  const objects = getAllStaticKnowledgeObjects();
  const terms = getAllStaticLexiconTerms();

  const approved = objects.filter((o) => o.status === "approved").length;
  const draft = objects.filter((o) => o.status === "draft").length;
  const pendingReview = objects.filter((o) => o.status === "in_review").length;
  const canons = objects.filter((o) => o.objectType === "canon").length;
  const standards = objects.filter((o) => o.objectType === "standard").length;
  const frameworks = objects.filter((o) => o.objectType === "framework").length;

  const crossRefs = objects.reduce(
    (sum, o) => sum + o.references.length + o.referencedBy.length + o.dependencies.length,
    0
  );

  const withAiSummary = objects.filter((o) => o.summary?.length > 20).length;
  const aiCoverage = objects.length
    ? Math.round((withAiSummary / objects.length) * 100)
    : 100;

  const printReady = objects.filter(
    (o) => o.status === "approved" && o.bodyMarkdown
  ).length;
  const printReadyPct = objects.length
    ? Math.round((printReady / objects.length) * 100)
    : 100;

  const now = new Date();
  const reviewDue = objects.filter((o) => {
    if (!o.reviewDate) return false;
    return new Date(o.reviewDate) <= now;
  }).length;

  return {
    knowledgeObjects: objects.length,
    approved,
    draft,
    pendingReview,
    canons,
    standards,
    frameworks,
    lexiconTerms: terms.length,
    crossReferences: crossRefs + INSTITUTIONAL_GRAPH_EDGES.length,
    brokenLinks: 0,
    outdatedObjects: 0,
    reviewDue,
    aiCoverage,
    printReady: printReadyPct,
    graphNodes: 15,
    graphEdges: INSTITUTIONAL_GRAPH_EDGES.length,
  };
}
