/**
 * Runtime validation utilities — interfaces + executable checks.
 * No product logic. No authentication.
 */

import { SHARED_PLATFORM_CONTRACT } from "@/lib/shared-platform/contract";
import type { IdentitySubject } from "../identity/types";
import { validateIdentitySubject, validateMembership, validateRoleClaim } from "../identity/validation";
import { canTransitionIdentityState } from "../identity/lifecycle";
import type { IdentityLifecycleState } from "../identity/types";
import {
  FEDERATION_RULES,
  IDENTITY_PROVIDER,
  assessFederationCompatibility,
  compareContractVersions,
  resolveFederationConflict,
  type ConsumerPlatformDescriptor,
  type FederationSyncRequest,
} from "../federation/model";
import { validateHqMappingConsistency } from "../mapping/hq-subject";
import type { PersistentIdentityBundle } from "../persistence/types";
import { getPlatformRegistrationIntegrity } from "../platform-registration/registry";
import { toIdentitySubject } from "../persistence/types";

export interface RuntimeValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

function result(errors: string[], warnings: string[] = []): RuntimeValidationResult {
  return { valid: errors.length === 0, errors, warnings };
}

/** Identity lifecycle integrity for a subject (state + version + authority). */
export function validateIdentityLifecycleIntegrity(
  subject: IdentitySubject,
  previousState?: IdentityLifecycleState,
): RuntimeValidationResult {
  const errors: string[] = [];
  const base = validateIdentitySubject(subject);
  if (!base.valid) errors.push(...base.errors);
  if (previousState !== undefined && previousState !== subject.state) {
    if (!canTransitionIdentityState(previousState, subject.state)) {
      errors.push(`illegal lifecycle transition: ${previousState} → ${subject.state}`);
    }
  }
  return result(errors);
}

/** Mapping integrity for a persisted HQ (or general) identity bundle. */
export function validateMappingIntegrity(
  bundle: PersistentIdentityBundle,
): RuntimeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const subjectCheck = validateIdentitySubject(toIdentitySubject(bundle.subject));
  if (!subjectCheck.valid) errors.push(...subjectCheck.errors);

  if (bundle.subject.version < 1 || !Number.isInteger(bundle.subject.version)) {
    errors.push("persistent subject version must be integer >= 1");
  }

  const systems = new Set<string>();
  for (const ref of bundle.subject.externalRefs) {
    const key = `${ref.system}::${ref.externalId}`;
    if (systems.has(key)) errors.push(`duplicate external ref: ${key}`);
    systems.add(key);
  }

  for (const m of bundle.memberships) {
    const mc = validateMembership(m);
    if (!mc.valid) errors.push(...mc.errors);
    if (m.subjectId !== bundle.subject.subjectId) {
      errors.push(`membership subject mismatch: ${m.membershipId}`);
    }
  }
  for (const c of bundle.roleClaims) {
    const rc = validateRoleClaim(c);
    if (!rc.valid) errors.push(...rc.errors);
    if (c.subjectId !== bundle.subject.subjectId) {
      errors.push(`role claim subject mismatch: ${c.claimId}`);
    }
  }

  const hasHq = bundle.subject.externalRefs.some((r) => r.system === "stankings-hq");
  if (hasHq) {
    const hq = validateHqMappingConsistency(bundle);
    if (!hq.valid) errors.push(...hq.errors);
  }

  return result(errors, warnings);
}

/** Platform registration integrity for a catalogue. */
export function validatePlatformRegistrationIntegrity(
  catalogue: readonly ConsumerPlatformDescriptor[],
): RuntimeValidationResult {
  const check = getPlatformRegistrationIntegrity(catalogue);
  return result(check.errors);
}

/** Federation rule compliance for a sync request against authority version. */
export function validateFederationRuleCompliance(
  request: FederationSyncRequest,
  authorityVersion: number,
  registeredPlatformIds: readonly string[],
): RuntimeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!request.platformId?.trim()) errors.push("federation sync requires platformId");
  if (!request.subjectId?.trim()) errors.push("federation sync requires subjectId");
  if (!registeredPlatformIds.includes(request.platformId)) {
    errors.push(`platform not registered for federation: ${request.platformId}`);
  }

  const action = resolveFederationConflict(authorityVersion, request.knownVersion);
  if (action === "conflict") {
    errors.push(
      `federation conflict: consumer knownVersion ${request.knownVersion} vs authority ${authorityVersion}`,
    );
  }

  // Document that auth/OAuth remain out of scope
  warnings.push(`federation rules (${FEDERATION_RULES.length}): identity sync only — no auth/OAuth`);

  return result(errors, warnings);
}

/** Contract version compatibility between platform and shared contract. */
export function validateContractVersionCompatibility(
  platform: Pick<ConsumerPlatformDescriptor, "sharedContractVersion" | "runtimeVersion" | "supportedCapabilities">,
): RuntimeValidationResult {
  const errors: string[] = [];
  if (compareContractVersions(platform.sharedContractVersion, SHARED_PLATFORM_CONTRACT.version) !== 0) {
    errors.push(
      `contract mismatch: platform ${platform.sharedContractVersion} vs ${SHARED_PLATFORM_CONTRACT.version}`,
    );
  }
  const compat = assessFederationCompatibility(platform);
  if (!compat.federationCompatible) {
    errors.push(...(compat.reasons ?? ["federation incompatible"]));
  }
  return result(errors);
}

/** Composite runtime validation surface (interfaces only for consumers). */
export interface SharedRuntimeValidator {
  validateIdentityLifecycleIntegrity: typeof validateIdentityLifecycleIntegrity;
  validateMappingIntegrity: typeof validateMappingIntegrity;
  validatePlatformRegistrationIntegrity: typeof validatePlatformRegistrationIntegrity;
  validateFederationRuleCompliance: typeof validateFederationRuleCompliance;
  validateContractVersionCompatibility: typeof validateContractVersionCompatibility;
}

export const sharedRuntimeValidator: SharedRuntimeValidator = {
  validateIdentityLifecycleIntegrity,
  validateMappingIntegrity,
  validatePlatformRegistrationIntegrity,
  validateFederationRuleCompliance,
  validateContractVersionCompatibility,
};

export const RUNTIME_VALIDATION_META = {
  id: "shared-runtime-validation",
  version: "0.2.0",
  identityProviderVersion: IDENTITY_PROVIDER.runtimeVersion,
  sharedContractVersion: SHARED_PLATFORM_CONTRACT.version,
} as const;
