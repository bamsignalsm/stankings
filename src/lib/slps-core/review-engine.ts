/**
 * SLPS-CORE Module 4 — Review Engine
 * Publication lifecycle — like Git for institutional publishing.
 */

import {
  SLPS_PUBLICATION_STATUSES,
  type SLPSPublicationStatus,
} from "@/lib/editorial/slps";

export interface ReviewTransition {
  from: SLPSPublicationStatus;
  to: SLPSPublicationStatus;
  gate: string;
  requiredApprover: string;
}

export interface ReviewState {
  status: SLPSPublicationStatus;
  stepIndex: number;
  totalSteps: number;
  canAdvance: boolean;
  nextStatus: SLPSPublicationStatus | null;
  history: ReviewHistoryEntry[];
}

export interface ReviewHistoryEntry {
  status: SLPSPublicationStatus;
  transitionedAt: string;
  actor: string;
  note?: string;
}

const REVIEW_GATES: Record<SLPSPublicationStatus, { gate: string; approver: string }> = {
  Concept: { gate: "Purpose defined", approver: "Editor-in-Chief" },
  Architecture: { gate: "Structure locked", approver: "Editor-in-Chief" },
  Draft: { gate: "Content drafted", approver: "Author / Owner" },
  "Editorial Review": { gate: "Editorial quality", approver: "Editor-in-Chief" },
  "Convention Review": { gate: "Convention alignment", approver: "Library Council" },
  "Founder Approval": { gate: "Founder sign-off", approver: "Founder" },
  Published: { gate: "Live publication", approver: "Publisher" },
  Archived: { gate: "Retired from active use", approver: "Library Council" },
};

const VALID_TRANSITIONS: ReviewTransition[] = SLPS_PUBLICATION_STATUSES.slice(0, -1).map(
  (status, index) => ({
    from: status,
    to: SLPS_PUBLICATION_STATUSES[index + 1],
    gate: REVIEW_GATES[SLPS_PUBLICATION_STATUSES[index + 1]].gate,
    requiredApprover: REVIEW_GATES[SLPS_PUBLICATION_STATUSES[index + 1]].approver,
  }),
);

export function getReviewTransitions(): readonly ReviewTransition[] {
  return VALID_TRANSITIONS;
}

export function canTransition(
  from: SLPSPublicationStatus,
  to: SLPSPublicationStatus,
): boolean {
  return VALID_TRANSITIONS.some((t) => t.from === from && t.to === to);
}

export function getNextReviewStatus(
  current: SLPSPublicationStatus,
): SLPSPublicationStatus | null {
  const index = SLPS_PUBLICATION_STATUSES.indexOf(current);
  if (index < 0 || index >= SLPS_PUBLICATION_STATUSES.length - 1) return null;
  return SLPS_PUBLICATION_STATUSES[index + 1];
}

export function advanceReview(
  current: SLPSPublicationStatus,
  actor: string,
  note?: string,
): ReviewState {
  const history: ReviewHistoryEntry[] = [
    {
      status: current,
      transitionedAt: new Date().toISOString(),
      actor,
      note,
    },
  ];

  const next = getNextReviewStatus(current);
  const stepIndex = SLPS_PUBLICATION_STATUSES.indexOf(current);

  return {
    status: next ?? current,
    stepIndex: next ? stepIndex + 1 : stepIndex,
    totalSteps: SLPS_PUBLICATION_STATUSES.length,
    canAdvance: next !== null && next !== "Archived",
    nextStatus: next ? getNextReviewStatus(next) : null,
    history,
  };
}

export function createReviewState(
  status: SLPSPublicationStatus,
  history: ReviewHistoryEntry[] = [],
): ReviewState {
  const stepIndex = SLPS_PUBLICATION_STATUSES.indexOf(status);
  const next = getNextReviewStatus(status);

  return {
    status,
    stepIndex,
    totalSteps: SLPS_PUBLICATION_STATUSES.length,
    canAdvance: next !== null,
    nextStatus: next,
    history,
  };
}

export { SLPS_PUBLICATION_STATUSES };
