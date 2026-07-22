/**
 * HQ Subject Mapping — map HQ members / records to canonical subjects.
 * No authentication. Mapping and validation only.
 */

import type { IdentityMembership, IdentityRoleClaim, IdentitySubject } from "../identity/types";
import { createIdentitySubject, activateIdentitySubject } from "../identity/domain";
import { validateIdentitySubject, validateMembership, validateRoleClaim } from "../identity/validation";
import type { IdentityStore, PersistentIdentityBundle } from "../persistence/types";
import { createIdentityBundle } from "../persistence/bundle";

export const HQ_EXTERNAL_SYSTEM = "stankings-hq" as const;

export interface HqSubjectMappingInput {
  /** HQ-local member or user id */
  hqMemberId: string;
  displayLabel?: string;
  /** Optional company registry ids for membership */
  organizationIds?: string[];
  roles?: Array<{ claim: string; scope: string; organizationId?: string }>;
  /** Platforms this subject participates in */
  platformIds?: string[];
  activate?: boolean;
  now?: string;
}

export interface HqSubjectMappingResult {
  ok: boolean;
  errors: string[];
  bundle?: PersistentIdentityBundle;
  globalSubjectId?: string;
  originPlatform: typeof HQ_EXTERNAL_SYSTEM;
  identityVersion?: number;
}

export function buildHqSubjectMapping(
  input: HqSubjectMappingInput,
): { ok: true; subject: IdentitySubject; memberships: IdentityMembership[]; roleClaims: IdentityRoleClaim[] } | {
  ok: false;
  errors: string[];
} {
  const errors: string[] = [];
  if (!input.hqMemberId?.trim()) errors.push("hqMemberId is required");
  if (errors.length) return { ok: false, errors };

  const now = input.now ?? new Date().toISOString();
  let subject = createIdentitySubject({
    kind: "person",
    displayLabel: input.displayLabel,
    now,
    externalRefs: [
      {
        system: HQ_EXTERNAL_SYSTEM,
        externalId: input.hqMemberId.trim(),
        linked: true,
      },
    ],
    metadata: {
      originPlatform: HQ_EXTERNAL_SYSTEM,
    },
  });

  if (input.activate !== false) {
    subject = activateIdentitySubject(subject, now);
  }

  const subjectCheck = validateIdentitySubject(subject);
  if (!subjectCheck.valid) return { ok: false, errors: subjectCheck.errors };

  const memberships: IdentityMembership[] = [];
  for (const orgId of input.organizationIds ?? []) {
    const m: IdentityMembership = {
      membershipId: `mem_${subject.subjectId}_${orgId}`,
      subjectId: subject.subjectId,
      organizationId: orgId,
      role: "member",
      state: "active",
      validFrom: now,
    };
    const mc = validateMembership(m);
    if (!mc.valid) errors.push(...mc.errors);
    else memberships.push(m);
  }

  const roleClaims: IdentityRoleClaim[] = [];
  for (const [i, role] of (input.roles ?? []).entries()) {
    const c: IdentityRoleClaim = {
      claimId: `claim_${subject.subjectId}_${i}`,
      subjectId: subject.subjectId,
      claim: role.claim,
      scope: role.scope,
      issuedBy: "stankings-shared-identity",
      issuedAt: now,
    };
    const rc = validateRoleClaim(c);
    if (!rc.valid) errors.push(...rc.errors);
    else roleClaims.push(c);
  }

  if (errors.length) return { ok: false, errors };
  return { ok: true, subject, memberships, roleClaims };
}

export async function mapHqMemberToSubject(
  store: IdentityStore,
  input: HqSubjectMappingInput,
): Promise<HqSubjectMappingResult> {
  const existing = await store.findByExternalRef(HQ_EXTERNAL_SYSTEM, input.hqMemberId.trim());
  if (existing) {
    return {
      ok: true,
      errors: [],
      bundle: existing,
      globalSubjectId: existing.subject.subjectId,
      originPlatform: HQ_EXTERNAL_SYSTEM,
      identityVersion: existing.subject.version,
    };
  }

  const built = buildHqSubjectMapping(input);
  if (!built.ok) {
    return { ok: false, errors: built.errors, originPlatform: HQ_EXTERNAL_SYSTEM };
  }

  const now = input.now ?? new Date().toISOString();
  const participation = (input.platformIds ?? ["stankings-hq"]).map((platformId) => ({
    platformId,
    joinedAt: now,
    status: "active" as const,
    lastSeenVersion: built.subject.version,
  }));

  const bundle = createIdentityBundle(built.subject, {
    originPlatformId: HQ_EXTERNAL_SYSTEM,
    memberships: built.memberships,
    roleClaims: built.roleClaims,
    platformParticipation: participation,
  });

  const write = await store.putSubject(bundle);
  if (!write.ok || !write.bundle) {
    return {
      ok: false,
      errors: write.errors,
      originPlatform: HQ_EXTERNAL_SYSTEM,
    };
  }

  return {
    ok: true,
    errors: [],
    bundle: write.bundle,
    globalSubjectId: write.bundle.subject.subjectId,
    originPlatform: HQ_EXTERNAL_SYSTEM,
    identityVersion: write.bundle.subject.version,
  };
}

export function validateHqMappingConsistency(bundle: PersistentIdentityBundle): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const hqRef = bundle.subject.externalRefs.find((r) => r.system === HQ_EXTERNAL_SYSTEM);
  if (!hqRef) errors.push("HQ mapping requires externalRef system=stankings-hq");
  if (bundle.subject.originPlatformId && bundle.subject.originPlatformId !== HQ_EXTERNAL_SYSTEM) {
    // Allowed if remapped later, but HQ mapping helper expects HQ origin for HQ-created subjects
  }
  for (const m of bundle.memberships) {
    if (m.subjectId !== bundle.subject.subjectId) {
      errors.push(`membership ${m.membershipId} subject mismatch`);
    }
  }
  for (const c of bundle.roleClaims) {
    if (c.subjectId !== bundle.subject.subjectId) {
      errors.push(`role claim ${c.claimId} subject mismatch`);
    }
  }
  for (const p of bundle.platformParticipation) {
    if (!p.platformId?.trim()) errors.push("platformParticipation.platformId required");
  }
  return { valid: errors.length === 0, errors };
}
