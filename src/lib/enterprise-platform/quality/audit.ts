/**
 * Audit conventions — append-only audit record shape (no transport).
 */

export interface EnterpriseAuditRecord {
  auditId: string;
  capability: string;
  action: string;
  entityType: string;
  entityId: string;
  actorSubjectId?: string;
  /** System / service that performed the action */
  actorSystem?: string;
  beforeVersion?: number;
  afterVersion?: number;
  occurredAt: string;
  correlationId?: string;
  metadata?: Record<string, string>;
}

export function createAuditRecord(
  input: Omit<EnterpriseAuditRecord, "auditId" | "occurredAt"> & {
    auditId?: string;
    occurredAt?: string;
  },
): EnterpriseAuditRecord {
  return {
    auditId: input.auditId ?? `aud_${cryptoRandom()}`,
    capability: input.capability,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    actorSubjectId: input.actorSubjectId,
    actorSystem: input.actorSystem,
    beforeVersion: input.beforeVersion,
    afterVersion: input.afterVersion,
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    correlationId: input.correlationId,
    metadata: input.metadata,
  };
}

function cryptoRandom(): string {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export const AUDIT_CONVENTION = {
  id: "enterprise-audit-convention",
  version: "1.0.0",
  rules: [
    "Material state changes emit an audit record.",
    "Include entity ids and version deltas when applicable.",
    "Audit records are append-only contracts; storage adapter is separate.",
  ],
} as const;
