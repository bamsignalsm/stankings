/**
 * ConsentRegistry — attach evidence audit refs on grant/revoke.
 */

import type { ConsentStore } from "./store";
import type { ConsentRecord, CreateConsentInput } from "./types";
import { createConsentRecord, revokeConsent, expireConsent } from "./domain";
import { buildConsentEvidence } from "./evidence";
import {
  createEnterpriseEvent,
  ENTERPRISE_EVENT_TYPES,
  type MemoryEventCollector,
} from "@/lib/enterprise-platform/events";

export class ConsentRegistry {
  constructor(private readonly store: ConsentStore) {}

  get(consentId: string) {
    return this.store.get(consentId);
  }

  listBySubject(subjectId: string) {
    return this.store.listBySubject(subjectId);
  }

  listHistory(consentId: string) {
    return this.store.listHistory(consentId);
  }

  async grant(
    input: CreateConsentInput,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; record?: ConsentRecord }> {
    let record = createConsentRecord({ ...input, grant: true });
    const evidence = buildConsentEvidence(record, "grant");
    record = { ...record, auditRef: evidence.auditId };
    const write = await this.store.put(record);
    if (!write.ok || !write.record) return write;
    const event = createEnterpriseEvent({
      eventType: ENTERPRISE_EVENT_TYPES.CONSENT_GRANTED,
      domain: "consent",
      sourceRuntime: "enterprise-consent",
      capabilityId: "consent",
      subjectId: record.subjectId,
      platformId: record.platformId,
      payload: {
        consentId: record.consentId,
        purposeKey: record.purposeKey,
        version: record.version,
        definitionVersion: record.definitionVersion,
        auditRef: evidence.auditId,
      },
    });
    events?.publish(event);
    return write;
  }

  async revoke(
    consentId: string,
    reason?: string,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; record?: ConsentRecord }> {
    const existing = await this.store.get(consentId);
    if (!existing) return { ok: false, errors: [`consent not found: ${consentId}`] };
    const revoked = revokeConsent(existing, undefined, reason);
    let record = revoked.record;
    const { history } = revoked;
    const evidence = buildConsentEvidence(record, "revoke");
    record = { ...record, auditRef: evidence.auditId };
    const write = await this.store.put(record);
    if (!write.ok) return write;
    await this.store.appendHistory(history);
    const event = createEnterpriseEvent({
      eventType: ENTERPRISE_EVENT_TYPES.CONSENT_REVOKED,
      domain: "consent",
      sourceRuntime: "enterprise-consent",
      capabilityId: "consent",
      subjectId: record.subjectId,
      payload: {
        consentId: record.consentId,
        purposeKey: record.purposeKey,
        version: record.version,
        reason: reason ?? null,
        auditRef: evidence.auditId,
      },
    });
    events?.publish(event);
    return write;
  }

  async expire(
    consentId: string,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; record?: ConsentRecord }> {
    const existing = await this.store.get(consentId);
    if (!existing) return { ok: false, errors: [`consent not found: ${consentId}`] };
    let record = expireConsent(existing);
    const evidence = buildConsentEvidence(record, "expire");
    record = { ...record, auditRef: evidence.auditId };
    const write = await this.store.put(record);
    if (!write.ok) return write;
    await this.store.appendHistory({
      consentId,
      fromState: existing.state,
      toState: "expired",
      at: record.updatedAt,
    });
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.CONSENT_EXPIRED,
        domain: "consent",
        sourceRuntime: "enterprise-consent",
        capabilityId: "consent",
        subjectId: record.subjectId,
        payload: {
          consentId: record.consentId,
          version: record.version,
          auditRef: evidence.auditId,
        },
      }),
    );
    return write;
  }
}
