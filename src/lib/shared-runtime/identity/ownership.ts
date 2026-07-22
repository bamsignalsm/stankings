/**
 * Shared Identity — ownership rules (executable constants + guards).
 */

import type { IdentityAuthority, IdentitySubject } from "./types";

export const SHARED_IDENTITY_AUTHORITY: IdentityAuthority = "stankings-shared-identity";

export const IDENTITY_OWNERSHIP_RULES = [
  "Canonical subjectId values are owned exclusively by Shared Identity.",
  "Product databases may store foreign keys to subjectId; they must not mint competing globals.",
  "HQ member records map to subjects via externalRefs — they are not the federation authority.",
  "Downstream platforms (BamSignal, Yike, BayRight, …) are consumers, not identity authorities.",
  "Merging subjects requires Shared Identity authority; products may only request merges.",
  "Revoked subjectIds are never reused.",
] as const;

export function assertSharedIdentityAuthority(subject: IdentitySubject): void {
  if (subject.authority !== SHARED_IDENTITY_AUTHORITY) {
    throw new Error(
      `Identity subject ${subject.subjectId} has invalid authority "${subject.authority}"`,
    );
  }
}

export function isProductLocalProfileForbiddenNote(): string {
  return "Product-local profiles are allowed; product-local global identity namespaces are forbidden.";
}
