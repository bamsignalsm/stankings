/**
 * Persistence helpers — create bundles from domain subjects.
 */

import type { IdentityMembership, IdentityRoleClaim, IdentitySubject } from "../identity/types";
import type {
  PersistentIdentityBundle,
  PlatformParticipationRecord,
} from "./types";
import { toPersistentSubject } from "./types";

export function createIdentityBundle(
  subject: IdentitySubject,
  options?: {
    originPlatformId?: string;
    memberships?: IdentityMembership[];
    roleClaims?: IdentityRoleClaim[];
    platformParticipation?: PlatformParticipationRecord[];
  },
): PersistentIdentityBundle {
  return {
    subject: toPersistentSubject(subject, options?.originPlatformId),
    memberships: [...(options?.memberships ?? [])],
    roleClaims: [...(options?.roleClaims ?? [])],
    platformParticipation: [...(options?.platformParticipation ?? [])],
  };
}
