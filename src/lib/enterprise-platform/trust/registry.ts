/**
 * TrustRegistry — assessment, evidence ingest, reassess, policy registration, events.
 */

import type { TrustStore } from "./store";
import type {
  IngestTrustEvidenceInput,
  RequestTrustAssessmentInput,
  TrustAssessment,
  TrustPolicyDefinition,
} from "./types";
import {
  attachTrustEvidence,
  buildTrustAudit,
  createDraftAssessment,
  invalidateAssessment,
  markSuperseded,
  resolvePolicyForRequest,
  runAssessment,
} from "./domain";
import { defaultTrustPolicies } from "./policy";
import {
  createEnterpriseEvent,
  ENTERPRISE_EVENT_TYPES,
  type MemoryEventCollector,
} from "@/lib/enterprise-platform/events";

export class TrustRegistry {
  constructor(private readonly store: TrustStore) {}

  get(assessmentId: string) {
    return this.store.get(assessmentId);
  }

  listBySubject(subjectId: string) {
    return this.store.listBySubject(subjectId);
  }

  listByPassport(passportId: string) {
    return this.store.listByPassport(passportId);
  }

  listHistory(assessmentId: string) {
    return this.store.listHistory(assessmentId);
  }

  listEvidence(assessmentId: string) {
    return this.store.listEvidence(assessmentId);
  }

  async ensureDefaultPolicies(): Promise<void> {
    for (const policy of defaultTrustPolicies()) {
      const existing = await this.store.getPolicy(policy.policyId, policy.version);
      if (!existing) await this.store.putPolicy(policy);
    }
  }

  async registerPolicy(
    policy: TrustPolicyDefinition,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[] }> {
    const write = await this.store.putPolicy(policy);
    if (!write.ok) return write;
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.TRUST_POLICY_UPDATED,
        domain: "trust",
        sourceRuntime: "enterprise-trust",
        capabilityId: "trust",
        payload: {
          policyId: policy.policyId,
          policyVersion: policy.version,
        },
      }),
    );
    return write;
  }

  async listPolicies() {
    await this.ensureDefaultPolicies();
    const stored = await this.store.listPolicies();
    if (stored.length) return stored;
    return defaultTrustPolicies();
  }

  async assess(
    input: RequestTrustAssessmentInput,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; assessment?: TrustAssessment }> {
    await this.ensureDefaultPolicies();
    const catalogue = await this.listPolicies();
    const policy = resolvePolicyForRequest(input, catalogue);
    const draft = createDraftAssessment(input, policy);
    const ran = runAssessment(draft, policy, input.now ?? draft.updatedAt);
    let assessment = ran.assessment;
    const audit = buildTrustAudit(assessment, "assess");
    assessment = { ...assessment, auditRef: audit.auditId };
    const write = await this.store.put(assessment);
    if (!write.ok || !write.assessment) return write;
    for (const h of ran.history) await this.store.appendHistory(h);
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.TRUST_ASSESSED,
        domain: "trust",
        sourceRuntime: "enterprise-trust",
        capabilityId: "trust",
        subjectId: assessment.subjectId,
        platformId: assessment.platformId,
        payload: {
          assessmentId: assessment.assessmentId,
          passportId: assessment.passportId,
          outcome: assessment.outcome ?? null,
          confidenceBand: assessment.confidence?.band ?? null,
          confidenceScore: assessment.confidence?.score ?? null,
          policyId: assessment.policy.policyId,
          policyVersion: assessment.policy.policyVersion,
          version: assessment.version,
          auditRef: audit.auditId,
        },
      }),
    );
    // Also emit legacy alias for catalogue compatibility
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.TRUST_CHANGED,
        domain: "trust",
        sourceRuntime: "enterprise-trust",
        capabilityId: "trust",
        subjectId: assessment.subjectId,
        payload: {
          assessmentId: assessment.assessmentId,
          outcome: assessment.outcome ?? null,
          score: assessment.confidence?.score ?? null,
        },
      }),
    );
    return write;
  }

  async ingestEvidence(
    input: IngestTrustEvidenceInput,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; assessment?: TrustAssessment }> {
    const existing = await this.store.get(input.assessmentId);
    if (!existing) return { ok: false, errors: [`assessment not found: ${input.assessmentId}`] };
    let assessment = attachTrustEvidence(existing, input);
    const audit = buildTrustAudit(assessment, "ingest_evidence");
    assessment = { ...assessment, auditRef: audit.auditId };
    const write = await this.store.put(assessment);
    if (!write.ok) return write;
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.TRUST_EVIDENCE_INGESTED,
        domain: "trust",
        sourceRuntime: "enterprise-trust",
        capabilityId: "trust",
        subjectId: assessment.subjectId,
        payload: {
          assessmentId: assessment.assessmentId,
          provider: input.provider,
          assertionType: input.assertionType,
          version: assessment.version,
          auditRef: audit.auditId,
        },
      }),
    );
    return write;
  }

  async reassess(
    assessmentId: string,
    extraEvidence?: RequestTrustAssessmentInput["evidence"],
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; assessment?: TrustAssessment }> {
    const existing = await this.store.get(assessmentId);
    if (!existing) return { ok: false, errors: [`assessment not found: ${assessmentId}`] };
    if (existing.state !== "assessed") {
      return { ok: false, errors: [`reassess requires assessed state, got ${existing.state}`] };
    }
    const superseded = markSuperseded(existing);
    let prior = superseded.assessment;
    const priorAudit = buildTrustAudit(prior, "reassess");
    prior = { ...prior, auditRef: priorAudit.auditId };
    const priorWrite = await this.store.put(prior);
    if (!priorWrite.ok) return priorWrite;
    await this.store.appendHistory(superseded.history);

    return this.assess(
      {
        subjectId: existing.subjectId,
        passportId: existing.passportId,
        platformId: existing.platformId,
        policyId: existing.policy.policyId,
        policyVersion: existing.policy.policyVersion,
        evidence: [
          ...existing.evidenceRefs.map((e) => ({
            provider: e.provider,
            assertionType: e.assertionType,
            assertionRef: e.assertionRef,
            status: e.status,
            dimension: e.dimension,
            passportEvidenceId: e.passportEvidenceId,
            verifiedAt: e.verifiedAt,
            expiresAt: e.expiresAt,
            metadata: e.metadata,
          })),
          ...(extraEvidence ?? []),
        ],
        metadata: existing.metadata,
        supersedesAssessmentId: existing.assessmentId,
      },
      events,
    );
  }

  async invalidate(
    assessmentId: string,
    reason?: string,
    events?: MemoryEventCollector,
  ): Promise<{ ok: boolean; errors: string[]; assessment?: TrustAssessment }> {
    const existing = await this.store.get(assessmentId);
    if (!existing) return { ok: false, errors: [`assessment not found: ${assessmentId}`] };
    const invalidated = invalidateAssessment(existing, undefined, reason);
    let assessment = invalidated.assessment;
    const audit = buildTrustAudit(assessment, "invalidate");
    assessment = { ...assessment, auditRef: audit.auditId };
    const write = await this.store.put(assessment);
    if (!write.ok) return write;
    await this.store.appendHistory(invalidated.history);
    events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.TRUST_INVALIDATED,
        domain: "trust",
        sourceRuntime: "enterprise-trust",
        capabilityId: "trust",
        subjectId: assessment.subjectId,
        payload: {
          assessmentId: assessment.assessmentId,
          reason: reason ?? null,
          version: assessment.version,
          auditRef: audit.auditId,
        },
      }),
    );
    return write;
  }
}
