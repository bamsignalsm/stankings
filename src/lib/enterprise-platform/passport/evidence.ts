/**
 * Passport evidence helpers — audit-linked proof of issuance / lifecycle.
 */

import { createAuditRecord, type EnterpriseAuditRecord } from "@/lib/enterprise-platform/quality/audit";
import type { PassportEvidenceRef, PassportRecord } from "./types";

export function buildPassportEvidence(
  record: PassportRecord,
  action:
    | "issue"
    | "activate"
    | "suspend"
    | "revoke"
    | "expire"
    | "renew_prepare"
    | "attach_evidence",
): EnterpriseAuditRecord {
  return createAuditRecord({
    capability: "passport",
    action: `passport.${action}`,
    entityType: "passport_record",
    entityId: record.passportId,
    actorSystem: "enterprise-passport",
    afterVersion: record.version,
    metadata: {
      subjectId: record.subjectId,
      state: record.state,
      verificationStatus: record.verificationStatus,
      evidenceCount: String(record.evidenceRefs.length),
    },
  });
}

export function buildEvidenceAttachmentAudit(
  record: PassportRecord,
  evidence: PassportEvidenceRef,
): EnterpriseAuditRecord {
  return createAuditRecord({
    capability: "passport",
    action: "passport.evidence.attach",
    entityType: "passport_evidence",
    entityId: evidence.evidenceId,
    actorSystem: "enterprise-passport",
    afterVersion: record.version,
    metadata: {
      passportId: record.passportId,
      subjectId: record.subjectId,
      provider: evidence.provider,
      assertionType: evidence.assertionType,
      assertionRef: evidence.assertionRef,
      status: evidence.status,
    },
  });
}

/** Default evidence templates — references only for consumer onboarding. */
export function defaultEvidenceAssertionTypes(): Array<{
  provider: PassportEvidenceRef["provider"];
  assertionType: string;
  description: string;
}> {
  return [
    {
      provider: "identity",
      assertionType: "identity.subject.active",
      description: "Subject exists and is active in Shared Identity",
    },
    {
      provider: "consent",
      assertionType: "consent.passport.cross_platform",
      description: "Cross-platform Passport presentation consent granted",
    },
    {
      provider: "bayright",
      assertionType: "bayright.financial.evidence",
      description: "Financial evidence reference from BayRight (opaque ref)",
    },
    {
      provider: "yike",
      assertionType: "yike.marketplace.verification",
      description: "Marketplace verification reference from Yike (opaque ref)",
    },
    {
      provider: "bamsignal",
      assertionType: "bamsignal.matchmaking.verification",
      description: "Matchmaking verification reference from BamSignal (opaque ref)",
    },
  ];
}
