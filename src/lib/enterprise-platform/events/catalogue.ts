/**
 * Event catalogue / registry — definitions without transport.
 */

import type { EnterpriseEventDomain } from "./model";
import { ENTERPRISE_EVENT_TYPES } from "./model";
import {
  validationFail,
  validationOk,
  type EnterpriseValidationResult,
} from "@/lib/enterprise-platform/quality/validation";

export interface EventDefinition {
  eventType: string;
  domain: EnterpriseEventDomain;
  version: number;
  description: string;
  payloadSchemaNotes: string;
  /** Compatible envelope versions */
  compatibleEnvelopeVersions: number[];
  lineage?: {
    mayCause?: string[];
    typicallyCausedBy?: string[];
  };
  docsPath?: string;
}

export const EVENT_CATALOGUE: EventDefinition[] = [
  {
    eventType: ENTERPRISE_EVENT_TYPES.IDENTITY_CREATED,
    domain: "identity",
    version: 1,
    description: "Canonical identity subject created",
    payloadSchemaNotes: "{ subjectId, version, state, schemaVersion }",
    compatibleEnvelopeVersions: [1],
    lineage: { mayCause: [ENTERPRISE_EVENT_TYPES.MEMBERSHIP_GRANTED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.IDENTITY_UPDATED,
    domain: "identity",
    version: 1,
    description: "Canonical identity subject updated",
    payloadSchemaNotes: "{ subjectId, version, state, previousVersion }",
    compatibleEnvelopeVersions: [1],
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.CONSENT_GRANTED,
    domain: "consent",
    version: 1,
    description: "Consent record granted",
    payloadSchemaNotes: "{ consentId, purposeKey, version, definitionVersion }",
    compatibleEnvelopeVersions: [1],
    lineage: { typicallyCausedBy: [ENTERPRISE_EVENT_TYPES.IDENTITY_CREATED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.CONSENT_REVOKED,
    domain: "consent",
    version: 1,
    description: "Consent record revoked",
    payloadSchemaNotes: "{ consentId, purposeKey, version, reason, auditRef }",
    compatibleEnvelopeVersions: [1],
    lineage: { typicallyCausedBy: [ENTERPRISE_EVENT_TYPES.CONSENT_GRANTED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.CONSENT_EXPIRED,
    domain: "consent",
    version: 1,
    description: "Consent record expired",
    payloadSchemaNotes: "{ consentId, version, auditRef }",
    compatibleEnvelopeVersions: [1],
    lineage: { typicallyCausedBy: [ENTERPRISE_EVENT_TYPES.CONSENT_GRANTED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.NOTIFICATION_QUEUED,
    domain: "audit",
    version: 1,
    description: "Notification queued for delivery (provider-agnostic)",
    payloadSchemaNotes: "{ notificationId, channel, status }",
    compatibleEnvelopeVersions: [1],
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED,
    domain: "passport",
    version: 1,
    description: "Passport issued (and typically activated)",
    payloadSchemaNotes:
      "{ passportId, state, verificationStatus, version, auditRef, renewsPassportId }",
    compatibleEnvelopeVersions: [1],
    lineage: { typicallyCausedBy: [ENTERPRISE_EVENT_TYPES.IDENTITY_CREATED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_SUSPENDED,
    domain: "passport",
    version: 1,
    description: "Passport suspended",
    payloadSchemaNotes: "{ passportId, version, reason, auditRef }",
    compatibleEnvelopeVersions: [1],
    lineage: { typicallyCausedBy: [ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_REVOKED,
    domain: "passport",
    version: 1,
    description: "Passport revoked",
    payloadSchemaNotes: "{ passportId, version, reason, auditRef }",
    compatibleEnvelopeVersions: [1],
    lineage: { typicallyCausedBy: [ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_EXPIRED,
    domain: "passport",
    version: 1,
    description: "Passport expired",
    payloadSchemaNotes: "{ passportId, version, auditRef }",
    compatibleEnvelopeVersions: [1],
    lineage: { typicallyCausedBy: [ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_RENEWAL_PREPARED,
    domain: "passport",
    version: 1,
    description: "Draft successor passport prepared for renewal",
    payloadSchemaNotes: "{ passportId, renewsPassportId, version, auditRef }",
    compatibleEnvelopeVersions: [1],
    lineage: { typicallyCausedBy: [ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_EVIDENCE_ATTACHED,
    domain: "passport",
    version: 1,
    description: "Evidence reference attached to passport",
    payloadSchemaNotes:
      "{ passportId, evidenceId, provider, assertionType, version, auditRef }",
    compatibleEnvelopeVersions: [1],
    lineage: { typicallyCausedBy: [ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.TRUST_CHANGED,
    domain: "trust",
    version: 1,
    description: "Trust assessment outcome changed (compat alias)",
    payloadSchemaNotes: "{ assessmentId, outcome, score }",
    compatibleEnvelopeVersions: [1],
    lineage: { typicallyCausedBy: [ENTERPRISE_EVENT_TYPES.TRUST_ASSESSED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.TRUST_ASSESSED,
    domain: "trust",
    version: 1,
    description: "Trust assessment completed via policy evaluation",
    payloadSchemaNotes:
      "{ assessmentId, passportId, outcome, confidenceBand, confidenceScore, policyId, policyVersion, version, auditRef }",
    compatibleEnvelopeVersions: [1],
    lineage: { typicallyCausedBy: [ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED] },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.TRUST_EVIDENCE_INGESTED,
    domain: "trust",
    version: 1,
    description: "Evidence reference ingested into a trust assessment",
    payloadSchemaNotes: "{ assessmentId, provider, assertionType, version, auditRef }",
    compatibleEnvelopeVersions: [1],
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.TRUST_POLICY_UPDATED,
    domain: "trust",
    version: 1,
    description: "Trust policy registered or updated",
    payloadSchemaNotes: "{ policyId, policyVersion }",
    compatibleEnvelopeVersions: [1],
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.TRUST_INVALIDATED,
    domain: "trust",
    version: 1,
    description: "Trust assessment invalidated",
    payloadSchemaNotes: "{ assessmentId, reason, version, auditRef }",
    compatibleEnvelopeVersions: [1],
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.EXPLAINABILITY_RECORDED,
    domain: "governance",
    version: 1,
    description: "Explainability record created for an enterprise decision",
    payloadSchemaNotes:
      "{ explanationId, capabilityId, decisionType, decisionRef, version, auditRef }",
    compatibleEnvelopeVersions: [1],
    lineage: {
      typicallyCausedBy: [
        ENTERPRISE_EVENT_TYPES.TRUST_ASSESSED,
        ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED,
        ENTERPRISE_EVENT_TYPES.CONSENT_GRANTED,
      ],
    },
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.GOVERNANCE_POLICY_EVALUATED,
    domain: "governance",
    version: 1,
    description: "Policy evaluation completed",
    payloadSchemaNotes: "{ allowed, effect, matchedPolicies, deniedBy }",
    compatibleEnvelopeVersions: [1],
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.CAPABILITY_REGISTERED,
    domain: "capability",
    version: 1,
    description: "Capability registered in catalogue",
    payloadSchemaNotes: "{ capabilityId, version }",
    compatibleEnvelopeVersions: [1],
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.PLATFORM_REGISTERED,
    domain: "platform",
    version: 1,
    description: "Platform registered for federation",
    payloadSchemaNotes: "{ platformId }",
    compatibleEnvelopeVersions: [1],
  },
  {
    eventType: ENTERPRISE_EVENT_TYPES.AUDIT_CREATED,
    domain: "audit",
    version: 1,
    description: "Audit record created",
    payloadSchemaNotes: "{ auditId, action, entityId }",
    compatibleEnvelopeVersions: [1],
  },
];

// Clean EVENT_CATALOGUE entries above

export function listEventDefinitions(): EventDefinition[] {
  return EVENT_CATALOGUE.map((e) => ({
    ...e,
    lineage: e.lineage ? { ...e.lineage } : undefined,
  }));
}

export function getEventDefinition(eventType: string): EventDefinition | undefined {
  return EVENT_CATALOGUE.find((e) => e.eventType === eventType);
}

export function validateEventDefinition(def: EventDefinition): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!def.eventType?.trim()) errors.push("eventType required");
  if (!def.domain) errors.push("domain required");
  if (!Number.isInteger(def.version) || def.version < 1) errors.push("version >= 1");
  if (!def.compatibleEnvelopeVersions?.length) {
    errors.push("compatibleEnvelopeVersions required");
  }
  return errors.length ? validationFail(errors) : validationOk();
}

export function negotiateEventCompatibility(
  eventType: string,
  envelopeVersion: number,
): { ok: boolean; reason?: string } {
  const def = getEventDefinition(eventType);
  if (!def) return { ok: false, reason: `unknown event type ${eventType}` };
  if (!def.compatibleEnvelopeVersions.includes(envelopeVersion)) {
    return {
      ok: false,
      reason: `envelope ${envelopeVersion} not compatible with ${eventType}`,
    };
  }
  return { ok: true };
}
