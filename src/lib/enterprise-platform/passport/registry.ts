/**
 * PassportRegistry — issuance, lifecycle, evidence attach, events.
 */

import type { PassportStore } from "./store";
import type { AttachEvidenceInput, IssuePassportInput, PassportRecord } from "./types";
import {
  activatePassport,
  attachEvidence,
  expirePassport,
  issuePassport,
  preparePassportRenewal,
  revokePassport,
  suspendPassport,
} from "./domain";
import { buildEvidenceAttachmentAudit, buildPassportEvidence } from "./evidence";
import {
  createEnterpriseEvent,
  ENTERPRISE_EVENT_TYPES,
  type MemoryEventCollector,
} from "@/lib/enterprise-platform/events";

export class PassportRegistry {
  constructor(private readonly store: PassportStore) {}

  get(passportId: string) {
    return this.store.get(passportId);
  }

  listBySubject(subjectId: string) {
    return this.store.listBySubject(subjectId);
  }

  listHistory(passportId: string) {
    return this.store.listHistory(passportId);
  }

  listEvidence(passportId: string) {
    return this.store.listEvidence(passportId);
  }

  async issue(
    input: IssuePassportInput,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; record?: PassportRecord }> {
    let record = issuePassport(input);
    if (!input.draft) {
      const activated = activatePassport(record, input.now ?? record.updatedAt);
      record = activated.record;
      await this.store.appendHistory(activated.history);
    }
    const evidence = buildPassportEvidence(record, "issue");
    record = { ...record, auditRef: evidence.auditId };
    const write = await this.store.put(record);
    if (!write.ok || !write.record) return write;
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED,
        domain: "passport",
        sourceRuntime: "enterprise-passport",
        capabilityId: "passport",
        subjectId: record.subjectId,
        platformId: record.platformId,
        payload: {
          passportId: record.passportId,
          state: record.state,
          verificationStatus: record.verificationStatus,
          version: record.version,
          auditRef: evidence.auditId,
          renewsPassportId: record.renewsPassportId ?? null,
        },
      }),
    );
    return write;
  }

  async suspend(
    passportId: string,
    reason?: string,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; record?: PassportRecord }> {
    const existing = await this.store.get(passportId);
    if (!existing) return { ok: false, errors: [`passport not found: ${passportId}`] };
    const suspended = suspendPassport(existing, undefined, reason);
    let record = suspended.record;
    const audit = buildPassportEvidence(record, "suspend");
    record = { ...record, auditRef: audit.auditId };
    const write = await this.store.put(record);
    if (!write.ok) return write;
    await this.store.appendHistory(suspended.history);
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_SUSPENDED,
        domain: "passport",
        sourceRuntime: "enterprise-passport",
        capabilityId: "passport",
        subjectId: record.subjectId,
        payload: {
          passportId: record.passportId,
          version: record.version,
          reason: reason ?? null,
          auditRef: audit.auditId,
        },
      }),
    );
    return write;
  }

  async revoke(
    passportId: string,
    reason?: string,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; record?: PassportRecord }> {
    const existing = await this.store.get(passportId);
    if (!existing) return { ok: false, errors: [`passport not found: ${passportId}`] };
    const revoked = revokePassport(existing, undefined, reason);
    let record = revoked.record;
    const audit = buildPassportEvidence(record, "revoke");
    record = { ...record, auditRef: audit.auditId };
    const write = await this.store.put(record);
    if (!write.ok) return write;
    await this.store.appendHistory(revoked.history);
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_REVOKED,
        domain: "passport",
        sourceRuntime: "enterprise-passport",
        capabilityId: "passport",
        subjectId: record.subjectId,
        payload: {
          passportId: record.passportId,
          version: record.version,
          reason: reason ?? null,
          auditRef: audit.auditId,
        },
      }),
    );
    return write;
  }

  async expire(
    passportId: string,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; record?: PassportRecord }> {
    const existing = await this.store.get(passportId);
    if (!existing) return { ok: false, errors: [`passport not found: ${passportId}`] };
    const expired = expirePassport(existing);
    let record = expired.record;
    const audit = buildPassportEvidence(record, "expire");
    record = { ...record, auditRef: audit.auditId };
    const write = await this.store.put(record);
    if (!write.ok) return write;
    await this.store.appendHistory(expired.history);
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_EXPIRED,
        domain: "passport",
        sourceRuntime: "enterprise-passport",
        capabilityId: "passport",
        subjectId: record.subjectId,
        payload: {
          passportId: record.passportId,
          version: record.version,
          auditRef: audit.auditId,
        },
      }),
    );
    return write;
  }

  async prepareRenewal(
    passportId: string,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; record?: PassportRecord }> {
    const existing = await this.store.get(passportId);
    if (!existing) return { ok: false, errors: [`passport not found: ${passportId}`] };
    let draft = preparePassportRenewal(existing);
    const audit = buildPassportEvidence(draft, "renew_prepare");
    draft = { ...draft, auditRef: audit.auditId };
    const write = await this.store.put(draft);
    if (!write.ok || !write.record) return write;
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_RENEWAL_PREPARED,
        domain: "passport",
        sourceRuntime: "enterprise-passport",
        capabilityId: "passport",
        subjectId: draft.subjectId,
        payload: {
          passportId: draft.passportId,
          renewsPassportId: existing.passportId,
          version: draft.version,
          auditRef: audit.auditId,
        },
      }),
    );
    return write;
  }

  async attachEvidence(
    input: AttachEvidenceInput,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; record?: PassportRecord }> {
    const existing = await this.store.get(input.passportId);
    if (!existing) return { ok: false, errors: [`passport not found: ${input.passportId}`] };
    let record = attachEvidence(existing, input);
    const attached = record.evidenceRefs[record.evidenceRefs.length - 1];
    const audit = buildEvidenceAttachmentAudit(record, attached);
    attached.auditRef = audit.auditId;
    record = {
      ...record,
      evidenceRefs: [...record.evidenceRefs.slice(0, -1), attached],
      auditRef: audit.auditId,
    };
    const write = await this.store.put(record);
    if (!write.ok) return write;
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.PASSPORT_EVIDENCE_ATTACHED,
        domain: "passport",
        sourceRuntime: "enterprise-passport",
        capabilityId: "passport",
        subjectId: record.subjectId,
        payload: {
          passportId: record.passportId,
          evidenceId: attached.evidenceId,
          provider: attached.provider,
          assertionType: attached.assertionType,
          version: record.version,
          auditRef: audit.auditId,
        },
      }),
    );
    return write;
  }
}
