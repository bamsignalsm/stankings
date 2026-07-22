/**
 * Shared Identity — domain operations (in-memory / pure).
 * No authentication. No OAuth. No Passport credentials.
 */

import { randomUUID } from "node:crypto";
import type { CreateIdentitySubjectInput, IdentitySubject } from "./types";
import { SHARED_IDENTITY_AUTHORITY } from "./ownership";
import { validateCreateIdentityInput, validateIdentitySubject } from "./validation";
import { transitionIdentityState } from "./lifecycle";
import type { IdentityLifecycleState } from "./types";

function generateSubjectId(): string {
  return `sid_${randomUUID().replace(/-/g, "").slice(0, 24)}`;
}

export function createIdentitySubject(input: CreateIdentitySubjectInput): IdentitySubject {
  const check = validateCreateIdentityInput(input);
  if (!check.valid) {
    throw new Error(`Invalid identity create input: ${check.errors.join("; ")}`);
  }
  const now = input.now ?? new Date().toISOString();
  const subject: IdentitySubject = {
    subjectId: input.subjectId ?? generateSubjectId(),
    kind: input.kind,
    state: "proposed",
    authority: SHARED_IDENTITY_AUTHORITY,
    version: 1,
    createdAt: now,
    updatedAt: now,
    displayLabel: input.displayLabel,
    externalRefs: input.externalRefs,
    metadata: input.metadata,
  };
  const subjectCheck = validateIdentitySubject(subject);
  if (!subjectCheck.valid) {
    throw new Error(`Invalid identity subject: ${subjectCheck.errors.join("; ")}`);
  }
  return subject;
}

export function activateIdentitySubject(subject: IdentitySubject, now?: string): IdentitySubject {
  return transitionIdentityState(subject, "active", now);
}

export function setIdentityState(
  subject: IdentitySubject,
  state: IdentityLifecycleState,
  now?: string,
): IdentitySubject {
  return transitionIdentityState(subject, state, now);
}

/** Resolve by exact subjectId from a provided catalogue (runtime interface shape). */
export function resolveIdentitySubject(
  catalogue: readonly IdentitySubject[],
  subjectId: string,
): IdentitySubject | undefined {
  return catalogue.find((s) => s.subjectId === subjectId);
}
