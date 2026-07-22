/**
 * Shared Identity — lifecycle transitions.
 */

import type { IdentityLifecycleState, IdentitySubject } from "./types";
import { assertSharedIdentityAuthority } from "./ownership";

const ALLOWED: Record<IdentityLifecycleState, IdentityLifecycleState[]> = {
  proposed: ["active", "archived", "revoked"],
  active: ["suspended", "merged", "archived", "revoked"],
  suspended: ["active", "archived", "revoked"],
  merged: ["archived"],
  archived: [],
  revoked: [],
};

export function canTransitionIdentityState(
  from: IdentityLifecycleState,
  to: IdentityLifecycleState,
): boolean {
  if (from === to) return true;
  return ALLOWED[from].includes(to);
}

export function transitionIdentityState(
  subject: IdentitySubject,
  to: IdentityLifecycleState,
  now = new Date().toISOString(),
): IdentitySubject {
  assertSharedIdentityAuthority(subject);
  if (!canTransitionIdentityState(subject.state, to)) {
    throw new Error(
      `Invalid identity lifecycle transition: ${subject.state} → ${to} (subject ${subject.subjectId})`,
    );
  }
  return {
    ...subject,
    state: to,
    updatedAt: now,
    version: subject.version + 1,
  };
}
