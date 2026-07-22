/**
 * Shared Identity — validation contracts (executable).
 */

import type {
  CreateIdentitySubjectInput,
  IdentityExternalRef,
  IdentityMembership,
  IdentityRoleClaim,
  IdentitySubject,
  IdentitySubjectKind,
} from "./types";
import { SHARED_IDENTITY_AUTHORITY } from "./ownership";

const SUBJECT_KINDS: IdentitySubjectKind[] = [
  "person",
  "organization",
  "system",
  "service_account",
];

export interface IdentityValidationResult {
  valid: boolean;
  errors: string[];
}

function ok(): IdentityValidationResult {
  return { valid: true, errors: [] };
}

function fail(...errors: string[]): IdentityValidationResult {
  return { valid: false, errors };
}

export function validateSubjectId(subjectId: string): IdentityValidationResult {
  if (!subjectId?.trim()) return fail("subjectId is required");
  if (!/^sid_[a-zA-Z0-9-]{8,128}$/.test(subjectId)) {
    return fail('subjectId must match /^sid_[a-zA-Z0-9-]{8,128}$/');
  }
  return ok();
}

export function validateExternalRef(ref: IdentityExternalRef): IdentityValidationResult {
  const errors: string[] = [];
  if (!ref.system?.trim()) errors.push("externalRef.system is required");
  if (!ref.externalId?.trim()) errors.push("externalRef.externalId is required");
  return errors.length ? fail(...errors) : ok();
}

export function validateCreateIdentityInput(
  input: CreateIdentitySubjectInput,
): IdentityValidationResult {
  const errors: string[] = [];
  if (!SUBJECT_KINDS.includes(input.kind)) {
    errors.push(`kind must be one of: ${SUBJECT_KINDS.join(", ")}`);
  }
  if (input.subjectId) {
    const idCheck = validateSubjectId(input.subjectId);
    if (!idCheck.valid) errors.push(...idCheck.errors);
  }
  for (const ref of input.externalRefs ?? []) {
    const r = validateExternalRef(ref);
    if (!r.valid) errors.push(...r.errors);
  }
  return errors.length ? fail(...errors) : ok();
}

export function validateIdentitySubject(subject: IdentitySubject): IdentityValidationResult {
  const errors: string[] = [];
  const idCheck = validateSubjectId(subject.subjectId);
  if (!idCheck.valid) errors.push(...idCheck.errors);
  if (!SUBJECT_KINDS.includes(subject.kind)) errors.push("invalid kind");
  if (subject.authority !== SHARED_IDENTITY_AUTHORITY) {
    errors.push("authority must be stankings-shared-identity");
  }
  if (!Number.isInteger(subject.version) || subject.version < 1) {
    errors.push("version must be an integer >= 1");
  }
  if (!subject.createdAt || !subject.updatedAt) {
    errors.push("createdAt and updatedAt are required");
  }
  for (const ref of subject.externalRefs ?? []) {
    const r = validateExternalRef(ref);
    if (!r.valid) errors.push(...r.errors);
  }
  return errors.length ? fail(...errors) : ok();
}

export function validateMembership(m: IdentityMembership): IdentityValidationResult {
  const errors: string[] = [];
  if (!m.membershipId?.trim()) errors.push("membershipId is required");
  const sid = validateSubjectId(m.subjectId);
  if (!sid.valid) errors.push(...sid.errors);
  if (!m.organizationId?.trim()) errors.push("organizationId is required");
  if (!m.role?.trim()) errors.push("role is required");
  return errors.length ? fail(...errors) : ok();
}

export function validateRoleClaim(c: IdentityRoleClaim): IdentityValidationResult {
  const errors: string[] = [];
  if (!c.claimId?.trim()) errors.push("claimId is required");
  const sid = validateSubjectId(c.subjectId);
  if (!sid.valid) errors.push(...sid.errors);
  if (!c.claim?.trim()) errors.push("claim is required");
  if (!c.scope?.trim()) errors.push("scope is required");
  return errors.length ? fail(...errors) : ok();
}
