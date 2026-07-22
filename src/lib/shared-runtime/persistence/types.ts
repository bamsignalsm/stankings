/**
 * Identity persistence — storage-provider agnostic contracts.
 * No Supabase client coupling. Adapters implement IdentityStore.
 */

import type {
  IdentityExternalRef,
  IdentityLifecycleState,
  IdentityMembership,
  IdentityRoleClaim,
  IdentitySubject,
  IdentitySubjectKind,
} from "@/lib/shared-runtime/identity/types";

/** Durable record for a canonical subject — mirrors IdentitySubject + persistence stamps. */
export interface PersistentIdentitySubject {
  subjectId: string;
  kind: IdentitySubjectKind;
  state: IdentityLifecycleState;
  authority: "stankings-shared-identity";
  version: number;
  createdAt: string;
  updatedAt: string;
  displayLabel?: string;
  metadata?: Record<string, string>;
  /** Origin platform that first proposed the subject (not the authority) */
  originPlatformId?: string;
  /** Persisted external mappings */
  externalRefs: IdentityExternalRef[];
}

export interface PersistentIdentityBundle {
  subject: PersistentIdentitySubject;
  memberships: IdentityMembership[];
  roleClaims: IdentityRoleClaim[];
  /** Ordered participation across federated platforms */
  platformParticipation: PlatformParticipationRecord[];
}

export interface PlatformParticipationRecord {
  platformId: string;
  joinedAt: string;
  status: "active" | "inactive" | "blocked";
  lastSeenVersion?: number;
}

export interface IdentityStoreWriteResult {
  ok: boolean;
  errors: string[];
  bundle?: PersistentIdentityBundle;
}

/**
 * Storage-agnostic identity store.
 * Implementations: memory (dev), postgres/supabase (future), etc.
 */
export interface IdentityStore {
  readonly providerId: string;
  getSubject(subjectId: string): Promise<PersistentIdentityBundle | null>;
  findByExternalRef(
    system: string,
    externalId: string,
  ): Promise<PersistentIdentityBundle | null>;
  putSubject(bundle: PersistentIdentityBundle): Promise<IdentityStoreWriteResult>;
  listSubjects(limit?: number): Promise<PersistentIdentityBundle[]>;
}

export function toPersistentSubject(
  subject: IdentitySubject,
  originPlatformId?: string,
): PersistentIdentitySubject {
  return {
    subjectId: subject.subjectId,
    kind: subject.kind,
    state: subject.state,
    authority: "stankings-shared-identity",
    version: subject.version,
    createdAt: subject.createdAt,
    updatedAt: subject.updatedAt,
    displayLabel: subject.displayLabel,
    metadata: subject.metadata,
    originPlatformId,
    externalRefs: [...(subject.externalRefs ?? [])],
  };
}

export function toIdentitySubject(persistent: PersistentIdentitySubject): IdentitySubject {
  return {
    subjectId: persistent.subjectId,
    kind: persistent.kind,
    state: persistent.state,
    authority: persistent.authority,
    version: persistent.version,
    createdAt: persistent.createdAt,
    updatedAt: persistent.updatedAt,
    displayLabel: persistent.displayLabel,
    metadata: persistent.metadata,
    externalRefs: [...persistent.externalRefs],
  };
}
