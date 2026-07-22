/**
 * Shared Identity — core types.
 * Platform-neutral. No product-specific assumptions.
 */

export type IdentitySubjectKind =
  | "person"
  | "organization"
  | "system"
  | "service_account";

export type IdentityLifecycleState =
  | "proposed"
  | "active"
  | "suspended"
  | "merged"
  | "archived"
  | "revoked";

export type IdentityAuthority = "stankings-shared-identity";

/** Canonical subject — owned by Shared Identity, referenced by all products. */
export interface IdentitySubject {
  /** Stable global id — never reuse after revoke */
  subjectId: string;
  kind: IdentitySubjectKind;
  state: IdentityLifecycleState;
  /** Owning authority — always Shared Identity for canonical subjects */
  authority: IdentityAuthority;
  /** Schema / claim version for federation sync */
  version: number;
  createdAt: string;
  updatedAt: string;
  /** Optional display label — not a product profile */
  displayLabel?: string;
  /** External keys (HQ member id, etc.) — mapped, not authoritative */
  externalRefs?: IdentityExternalRef[];
  metadata?: Record<string, string>;
}

export interface IdentityExternalRef {
  system: string;
  externalId: string;
  /** true if this system may propose updates; never overrides authority */
  linked: boolean;
}

export interface IdentityMembership {
  membershipId: string;
  subjectId: string;
  /** Company / institution id from COMPANY_REGISTRY when applicable */
  organizationId: string;
  role: string;
  state: "active" | "pending" | "ended";
  validFrom: string;
  validTo?: string;
}

export interface IdentityRoleClaim {
  claimId: string;
  subjectId: string;
  claim: string;
  scope: string;
  issuedBy: IdentityAuthority | string;
  issuedAt: string;
  expiresAt?: string;
}

export interface CreateIdentitySubjectInput {
  kind: IdentitySubjectKind;
  displayLabel?: string;
  externalRefs?: IdentityExternalRef[];
  metadata?: Record<string, string>;
  /** Injected for tests; runtime generates ISO timestamps when omitted */
  now?: string;
  subjectId?: string;
}
