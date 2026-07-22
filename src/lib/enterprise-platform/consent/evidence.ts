/**
 * Consent evidence helpers — audit-linked proof of grant/revoke.
 */

import { createAuditRecord, type EnterpriseAuditRecord } from "@/lib/enterprise-platform/quality/audit";
import type { ConsentRecord } from "./types";

export function buildConsentEvidence(
  record: ConsentRecord,
  action: "grant" | "revoke" | "expire",
): EnterpriseAuditRecord {
  return createAuditRecord({
    capability: "consent",
    action: `consent.${action}`,
    entityType: "consent_record",
    entityId: record.consentId,
    actorSystem: "enterprise-consent",
    afterVersion: record.version,
    metadata: {
      subjectId: record.subjectId,
      purposeKey: record.purposeKey,
      state: record.state,
      definitionId: record.definitionId,
      definitionVersion: record.definitionVersion,
    },
  });
}
