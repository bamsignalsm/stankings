import type { ConsentLifecycleState } from "./types";

const ALLOWED: Record<ConsentLifecycleState, ConsentLifecycleState[]> = {
  proposed: ["granted", "revoked", "expired"],
  granted: ["revoked", "expired", "superseded"],
  revoked: [],
  expired: [],
  superseded: [],
};

export function canTransitionConsentState(
  from: ConsentLifecycleState,
  to: ConsentLifecycleState,
): boolean {
  if (from === to) return true;
  return ALLOWED[from].includes(to);
}
