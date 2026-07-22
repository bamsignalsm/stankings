/**
 * Shared put-path integrity for IdentityStore adapters.
 */

import type {
  IdentityStoreWriteResult,
  PersistentIdentityBundle,
} from "./types";

export function cloneBundle(bundle: PersistentIdentityBundle): PersistentIdentityBundle {
  return {
    subject: {
      ...bundle.subject,
      externalRefs: [...bundle.subject.externalRefs],
      metadata: bundle.subject.metadata ? { ...bundle.subject.metadata } : undefined,
    },
    memberships: [...bundle.memberships],
    roleClaims: [...bundle.roleClaims],
    platformParticipation: [...bundle.platformParticipation],
  };
}

export function checkVersionConflict(
  existing: PersistentIdentityBundle | null | undefined,
  incoming: PersistentIdentityBundle,
): IdentityStoreWriteResult | null {
  if (existing && existing.subject.version > incoming.subject.version) {
    return {
      ok: false,
      errors: [
        `version conflict: store has v${existing.subject.version}, write has v${incoming.subject.version}`,
      ],
    };
  }
  return null;
}

export function externalKey(system: string, externalId: string): string {
  return `${system}::${externalId}`;
}
