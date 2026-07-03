import { FOUNDER_INSIGHT_001 } from "@/lib/founder-insights/sustainable-stewardship";
import type { FounderInsight } from "@/lib/founder-insights/types";

export const FOUNDER_INSIGHTS: FounderInsight[] = [FOUNDER_INSIGHT_001];

export function getFounderInsight(slug: string): FounderInsight | undefined {
  return FOUNDER_INSIGHTS.find((i) => i.slug === slug || i.identifier === slug);
}

export function getFounderInsightByIdentifier(identifier: string): FounderInsight | undefined {
  return FOUNDER_INSIGHTS.find((i) => i.identifier === identifier);
}
