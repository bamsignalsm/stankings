import type { ConsentDefinition, ConsentHistoryEntry, ConsentRecord, CreateConsentInput } from "./types";
import { validateConsentDefinition, validateConsentRecord, validateConsentTransition } from "./validation";
import { canTransitionConsentState } from "./lifecycle";

function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function createConsentRecord(input: CreateConsentInput): ConsentRecord {
  const defCheck = validateConsentDefinition(input.definition);
  if (!defCheck.valid) {
    throw new Error(`Invalid consent definition: ${defCheck.errors.join("; ")}`);
  }
  const now = input.now ?? new Date().toISOString();
  const grant = input.grant !== false;
  const record: ConsentRecord = {
    consentId: input.consentId ?? newId("cns"),
    subjectId: input.subjectId,
    definitionId: input.definition.definitionId,
    purposeKey: input.definition.purposeKey,
    state: grant ? "granted" : "proposed",
    version: 1,
    definitionVersion: input.definition.version,
    grantedAt: grant ? now : undefined,
    expiresAt: input.expiresAt,
    createdAt: now,
    updatedAt: now,
    platformId: input.platformId,
    metadata: input.metadata,
  };
  const check = validateConsentRecord(record);
  if (!check.valid) throw new Error(`Invalid consent record: ${check.errors.join("; ")}`);
  return record;
}

export function revokeConsent(
  record: ConsentRecord,
  now = new Date().toISOString(),
  reason?: string,
): { record: ConsentRecord; history: ConsentHistoryEntry } {
  const transition = validateConsentTransition(record.state, "revoked");
  if (!transition.valid) throw new Error(transition.errors.join("; "));
  if (!canTransitionConsentState(record.state, "revoked")) {
    throw new Error(`cannot revoke from ${record.state}`);
  }
  const next: ConsentRecord = {
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
      consentId: record.consentId,
      fromState: record.state,
      toState: "revoked",
      at: now,
      reason,
    },
  };
}

export function expireConsent(
  record: ConsentRecord,
  now = new Date().toISOString(),
): ConsentRecord {
  const transition = validateConsentTransition(record.state, "expired");
  if (!transition.valid) throw new Error(transition.errors.join("; "));
  return {
    ...record,
    state: "expired",
    version: record.version + 1,
    updatedAt: now,
  };
}

export function defaultConsentDefinitions(): ConsentDefinition[] {
  return [
    {
      definitionId: "consent.identity.federation.share",
      purpose: "Share identity subject mappings across registered platforms",
      purposeKey: "identity.federation.share",
      version: "1.0.0",
      description: "Enterprise federation consent — not marketing preferences",
    },
    {
      definitionId: "consent.passport.cross_platform",
      purpose: "Allow Passport credential presentation across ecosystem platforms",
      purposeKey: "passport.cross_platform",
      version: "1.0.0",
      description: "Reserved for Passport runtime — definition only until Passport ships",
    },
  ];
}
