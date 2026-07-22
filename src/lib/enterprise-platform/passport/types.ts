/**
 * Enterprise Passport Runtime — portable trust container (not a user profile).
 *
 * Aggregates verified evidence references bound to Shared Identity.
 * Does not encode product verification logic.
 */

export const PASSPORT_RUNTIME_VERSION = "1.0.0";
export const PASSPORT_SCHEMA_VERSION = 1;

/** Lifecycle of the passport record itself. */
export type PassportLifecycleState =
  | "draft"
  | "issued"
  | "active"
  | "suspended"
  | "revoked"
  | "expired";

/** Aggregate verification posture derived from attached evidence. */
export type PassportVerificationStatus =
  | "unverified"
  | "pending"
  | "verified"
  | "contested";

/**
 * Evidence provider families — references only; no product business logic.
 */
export type PassportEvidenceProvider =
  | "identity"
  | "consent"
  | "bayright"
  | "yike"
  | "bamsignal"
  | "enterprise"
  | "other";

export type PassportEvidenceStatus =
  | "asserted"
  | "verified"
  | "rejected"
  | "withdrawn"
  | "expired";

export interface PassportEvidenceRef {
  evidenceId: string;
  passportId: string;
  provider: PassportEvidenceProvider;
  /** Machine assertion type, e.g. identity.subject.active */
  assertionType: string;
  /** Opaque external reference — never embeds product payloads */
  assertionRef: string;
  status: PassportEvidenceStatus;
  verifiedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, string>;
  auditRef?: string;
}

export interface PassportIssuanceMetadata {
  issuedByRuntime: string;
  issuedByPlatformId?: string;
  issuanceReason?: string;
  /** ISO duration or policy key, e.g. "P365D" or "policy.passport.default" */
  expirationPolicy?: string;
}

export interface PassportRecord {
  passportId: string;
  /** Shared Identity binding — required sid_* */
  subjectId: string;
  state: PassportLifecycleState;
  verificationStatus: PassportVerificationStatus;
  version: number;
  schemaVersion: number;
  evidenceRefs: PassportEvidenceRef[];
  issuance?: PassportIssuanceMetadata;
  issuedAt?: string;
  activatedAt?: string;
  suspendedAt?: string;
  revokedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  platformId?: string;
  metadata?: Record<string, string>;
  auditRef?: string;
  /** Prior passport id this renews / supersedes */
  renewsPassportId?: string;
}

export interface PassportHistoryEntry {
  passportId: string;
  fromState: PassportLifecycleState;
  toState: PassportLifecycleState;
  at: string;
  reason?: string;
  actorSystem?: string;
}

export interface IssuePassportInput {
  subjectId: string;
  platformId?: string;
  expiresAt?: string;
  expirationPolicy?: string;
  issuanceReason?: string;
  evidence?: Omit<
    PassportEvidenceRef,
    "evidenceId" | "passportId" | "createdAt" | "updatedAt"
  >[];
  metadata?: Record<string, string>;
  now?: string;
  passportId?: string;
  /** Start as draft instead of issued/active */
  draft?: boolean;
  renewsPassportId?: string;
}

export interface AttachEvidenceInput {
  passportId: string;
  provider: PassportEvidenceProvider;
  assertionType: string;
  assertionRef: string;
  status?: PassportEvidenceStatus;
  verifiedAt?: string;
  expiresAt?: string;
  metadata?: Record<string, string>;
  evidenceId?: string;
  now?: string;
}
