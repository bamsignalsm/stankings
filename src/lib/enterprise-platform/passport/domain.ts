import type {
  AttachEvidenceInput,
  IssuePassportInput,
  PassportEvidenceRef,
  PassportHistoryEntry,
  PassportRecord,
} from "./types";
import { PASSPORT_SCHEMA_VERSION } from "./types";
import {
  deriveVerificationStatus,
  validatePassportRecord,
  validatePassportTransition,
} from "./validation";
import { canTransitionPassportState } from "./lifecycle";

function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function toEvidence(
  passportId: string,
  input: NonNullable<IssuePassportInput["evidence"]>[number],
  now: string,
  evidenceId?: string,
): PassportEvidenceRef {
  return {
    evidenceId: evidenceId ?? newId("pev"),
    passportId,
    provider: input.provider,
    assertionType: input.assertionType,
    assertionRef: input.assertionRef,
    status: input.status ?? "asserted",
    verifiedAt: input.verifiedAt,
    expiresAt: input.expiresAt,
    createdAt: now,
    updatedAt: now,
    metadata: input.metadata,
  };
}

export function issuePassport(input: IssuePassportInput): PassportRecord {
  const now = input.now ?? new Date().toISOString();
  const passportId = input.passportId ?? newId("ppt");
  const draft = input.draft === true;
  const evidence = (input.evidence ?? []).map((e) => toEvidence(passportId, e, now));

  const record: PassportRecord = {
    passportId,
    subjectId: input.subjectId,
    state: draft ? "draft" : "issued",
    verificationStatus: deriveVerificationStatus(evidence),
    version: 1,
    schemaVersion: PASSPORT_SCHEMA_VERSION,
    evidenceRefs: evidence,
    issuance: {
      issuedByRuntime: "enterprise-passport",
      issuedByPlatformId: input.platformId,
      issuanceReason: input.issuanceReason,
      expirationPolicy: input.expirationPolicy ?? "policy.passport.default",
    },
    issuedAt: draft ? undefined : now,
    expiresAt: input.expiresAt,
    createdAt: now,
    updatedAt: now,
    platformId: input.platformId,
    metadata: input.metadata,
    renewsPassportId: input.renewsPassportId,
  };

  const check = validatePassportRecord(record);
  if (!check.valid) throw new Error(`Invalid passport: ${check.errors.join("; ")}`);
  return record;
}

export function activatePassport(
  record: PassportRecord,
  now = new Date().toISOString(),
): { record: PassportRecord; history: PassportHistoryEntry } {
  const to = "active" as const;
  const transition = validatePassportTransition(record.state, to);
  if (!transition.valid) throw new Error(transition.errors.join("; "));
  if (!canTransitionPassportState(record.state, to)) {
    throw new Error(`cannot activate from ${record.state}`);
  }
  const next: PassportRecord = {
    ...record,
    state: to,
    version: record.version + 1,
    activatedAt: now,
    updatedAt: now,
  };
  return {
    record: next,
    history: {
      passportId: record.passportId,
      fromState: record.state,
      toState: to,
      at: now,
      actorSystem: "enterprise-passport",
    },
  };
}

export function suspendPassport(
  record: PassportRecord,
  now = new Date().toISOString(),
  reason?: string,
): { record: PassportRecord; history: PassportHistoryEntry } {
  const transition = validatePassportTransition(record.state, "suspended");
  if (!transition.valid) throw new Error(transition.errors.join("; "));
  const next: PassportRecord = {
    ...record,
    state: "suspended",
    version: record.version + 1,
    suspendedAt: now,
    updatedAt: now,
    metadata: {
      ...record.metadata,
      ...(reason ? { suspendReason: reason } : {}),
    },
  };
  return {
    record: next,
    history: {
      passportId: record.passportId,
      fromState: record.state,
      toState: "suspended",
      at: now,
      reason,
      actorSystem: "enterprise-passport",
    },
  };
}

export function revokePassport(
  record: PassportRecord,
  now = new Date().toISOString(),
  reason?: string,
): { record: PassportRecord; history: PassportHistoryEntry } {
  const transition = validatePassportTransition(record.state, "revoked");
  if (!transition.valid) throw new Error(transition.errors.join("; "));
  const next: PassportRecord = {
    ...record,
    state: "revoked",
    version: record.version + 1,
    revokedAt: now,
    updatedAt: now,
    metadata: {
      ...record.metadata,
      ...(reason ? { revokeReason: reason } : {}),
    },
  };
  return {
    record: next,
    history: {
      passportId: record.passportId,
      fromState: record.state,
      toState: "revoked",
      at: now,
      reason,
      actorSystem: "enterprise-passport",
    },
  };
}

export function expirePassport(
  record: PassportRecord,
  now = new Date().toISOString(),
): { record: PassportRecord; history: PassportHistoryEntry } {
  const transition = validatePassportTransition(record.state, "expired");
  if (!transition.valid) throw new Error(transition.errors.join("; "));
  const next: PassportRecord = {
    ...record,
    state: "expired",
    version: record.version + 1,
    updatedAt: now,
  };
  return {
    record: next,
    history: {
      passportId: record.passportId,
      fromState: record.state,
      toState: "expired",
      at: now,
      actorSystem: "enterprise-passport",
    },
  };
}

/**
 * Prepare renewal — issues a draft successor bound to the prior passport.
 * Does not auto-revoke the prior record (caller / policy decides).
 */
export function preparePassportRenewal(
  record: PassportRecord,
  now = new Date().toISOString(),
): PassportRecord {
  if (record.state === "revoked") {
    throw new Error("cannot renew a revoked passport");
  }
  return issuePassport({
    subjectId: record.subjectId,
    platformId: record.platformId,
    expirationPolicy: record.issuance?.expirationPolicy,
    issuanceReason: `renewal_of:${record.passportId}`,
    evidence: record.evidenceRefs
      .filter((e) => e.status === "verified" || e.status === "asserted")
      .map((e) => ({
        provider: e.provider,
        assertionType: e.assertionType,
        assertionRef: e.assertionRef,
        status: e.status === "verified" ? "verified" : "asserted",
        verifiedAt: e.verifiedAt,
        expiresAt: e.expiresAt,
        metadata: e.metadata,
      })),
    metadata: {
      ...record.metadata,
      renewedFrom: record.passportId,
    },
    now,
    draft: true,
    renewsPassportId: record.passportId,
  });
}

export function attachEvidence(
  record: PassportRecord,
  input: AttachEvidenceInput,
): PassportRecord {
  if (record.passportId !== input.passportId) {
    throw new Error("passportId mismatch on attachEvidence");
  }
  if (record.state === "revoked" || record.state === "expired") {
    throw new Error(`cannot attach evidence to ${record.state} passport`);
  }
  const now = input.now ?? new Date().toISOString();
  const evidence = toEvidence(
    record.passportId,
    {
      provider: input.provider,
      assertionType: input.assertionType,
      assertionRef: input.assertionRef,
      status: input.status ?? "asserted",
      verifiedAt: input.verifiedAt,
      expiresAt: input.expiresAt,
      metadata: input.metadata,
    },
    now,
    input.evidenceId,
  );
  const evidenceRefs = [...record.evidenceRefs, evidence];
  const next: PassportRecord = {
    ...record,
    evidenceRefs,
    verificationStatus: deriveVerificationStatus(evidenceRefs),
    version: record.version + 1,
    updatedAt: now,
  };
  const check = validatePassportRecord(next);
  if (!check.valid) throw new Error(`Invalid passport after evidence: ${check.errors.join("; ")}`);
  return next;
}
