import type { TrustAssessmentState } from "./types";

const ALLOWED: Record<TrustAssessmentState, TrustAssessmentState[]> = {
  draft: ["assessing", "invalidated"],
  assessing: ["assessed", "invalidated"],
  assessed: ["superseded", "invalidated"],
  superseded: [],
  invalidated: [],
};

export function canTransitionTrustState(
  from: TrustAssessmentState,
  to: TrustAssessmentState,
): boolean {
  if (from === to) return true;
  return ALLOWED[from].includes(to);
}
