/**
 * ExplainabilityRegistry — create explanations from generators; no re-evaluation.
 */

import type { ExplainabilityStore } from "./store";
import type { ConsentRecord } from "@/lib/enterprise-platform/consent/types";
import type { PassportRecord } from "@/lib/enterprise-platform/passport/types";
import type { TrustAssessment } from "@/lib/enterprise-platform/trust/types";
import type { CreateExplanationInput, ExplanationRecord } from "./types";
import {
  buildExplainabilityAudit,
  createExplanationRecord,
  historyCreated,
} from "./domain";
import {
  generateConsentExplanation,
  generatePassportExplanation,
  generateTrustExplanation,
} from "./generation";
import {
  createEnterpriseEvent,
  ENTERPRISE_EVENT_TYPES,
  type MemoryEventCollector,
} from "@/lib/enterprise-platform/events";

export class ExplainabilityRegistry {
  constructor(private readonly store: ExplainabilityStore) {}

  get(explanationId: string) {
    return this.store.get(explanationId);
  }

  listBySubject(subjectId: string) {
    return this.store.listBySubject(subjectId);
  }

  listByDecision(decisionRef: string) {
    return this.store.listByDecision(decisionRef);
  }

  listHistory(explanationId: string) {
    return this.store.listHistory(explanationId);
  }

  async record(
    input: CreateExplanationInput,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; record?: ExplanationRecord }> {
    let record = createExplanationRecord(input);
    const audit = buildExplainabilityAudit(record, "create");
    record = { ...record, auditRef: audit.auditId };
    const write = await this.store.put(record);
    if (!write.ok || !write.record) return write;
    await this.store.appendHistory(historyCreated(record));
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.EXPLAINABILITY_RECORDED,
        domain: "governance",
        sourceRuntime: "enterprise-explainability",
        capabilityId: "explainability",
        subjectId: record.subjectId,
        platformId: record.platformId,
        payload: {
          explanationId: record.explanationId,
          capabilityId: record.decision.capabilityId,
          decisionType: record.decision.decisionType,
          decisionRef: record.decision.decisionRef,
          version: record.version,
          auditRef: audit.auditId,
        },
      }),
    );
    return write;
  }

  explainTrust(
    assessment: TrustAssessment,
    platformId?: string,
    events?: MemoryEventCollector,
  ) {
    return this.record(generateTrustExplanation(assessment, platformId), events);
  }

  explainPassport(
    passport: PassportRecord,
    platformId?: string,
    events?: MemoryEventCollector,
  ) {
    return this.record(generatePassportExplanation(passport, platformId), events);
  }

  explainConsent(
    consent: ConsentRecord,
    platformId?: string,
    events?: MemoryEventCollector,
  ) {
    return this.record(generateConsentExplanation(consent, platformId), events);
  }
}
