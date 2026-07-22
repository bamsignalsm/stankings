import type { PassportLifecycleState } from "./types";

const ALLOWED: Record<PassportLifecycleState, PassportLifecycleState[]> = {
  draft: ["issued", "revoked"],
  issued: ["active", "suspended", "revoked", "expired"],
  active: ["suspended", "revoked", "expired"],
  suspended: ["active", "revoked", "expired"],
  revoked: [],
  expired: [],
};

export function canTransitionPassportState(
  from: PassportLifecycleState,
  to: PassportLifecycleState,
): boolean {
  if (from === to) return true;
  return ALLOWED[from].includes(to);
}
