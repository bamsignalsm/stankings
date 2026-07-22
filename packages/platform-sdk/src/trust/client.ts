/**
 * Trust client — Enterprise SDK surface for Trust Runtime.
 */

import type { TrustStore } from "@/lib/enterprise-platform/trust/store";
import { TrustRegistry } from "@/lib/enterprise-platform/trust/registry";
import {
  assessTrustEightGates,
  defaultTrustEvidenceSources,
  defaultTrustPolicies,
  type IngestTrustEvidenceInput,
  type RequestTrustAssessmentInput,
  type TrustPolicyDefinition,
} from "@/lib/enterprise-platform/trust";
import type { MemoryEventCollector } from "@/lib/enterprise-platform/events";
import { negotiateContract } from "@/lib/enterprise-platform/contracts";
import { TRUST_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/trust-contract";

export interface TrustClientOptions {
  platformId: string;
  store: TrustStore;
  declaredContractVersion?: string;
  events?: MemoryEventCollector;
}

export class TrustClient {
  private readonly registry: TrustRegistry;
  readonly platformId: string;
  readonly negotiatedContractVersion: string;

  constructor(private readonly options: TrustClientOptions) {
    const negotiation = negotiateContract({
      consumerPlatformId: options.platformId,
      requestedContractId: TRUST_PUBLIC_CONTRACT.contractId,
      declaredVersion: options.declaredContractVersion ?? TRUST_PUBLIC_CONTRACT.version,
    });
    if (!negotiation.ok || !negotiation.negotiatedVersion) {
      throw new Error(`TrustClient negotiation failed: ${negotiation.errors.join("; ")}`);
    }
    this.platformId = options.platformId;
    this.negotiatedContractVersion = negotiation.negotiatedVersion;
    this.registry = new TrustRegistry(options.store);
  }

  evidenceCatalogue() {
    return defaultTrustEvidenceSources();
  }

  policies() {
    return this.registry.listPolicies();
  }

  registerPolicy(policy: TrustPolicyDefinition) {
    return this.registry.registerPolicy(policy, this.options.events);
  }

  assess(input: Omit<RequestTrustAssessmentInput, "platformId"> & { platformId?: string }) {
    return this.registry.assess(
      { ...input, platformId: input.platformId ?? this.platformId },
      this.options.events,
    );
  }

  get(assessmentId: string) {
    return this.registry.get(assessmentId);
  }

  listBySubject(subjectId: string) {
    return this.registry.listBySubject(subjectId);
  }

  listByPassport(passportId: string) {
    return this.registry.listByPassport(passportId);
  }

  listHistory(assessmentId: string) {
    return this.registry.listHistory(assessmentId);
  }

  ingestEvidence(input: IngestTrustEvidenceInput) {
    return this.registry.ingestEvidence(input, this.options.events);
  }

  reassess(assessmentId: string, extraEvidence?: RequestTrustAssessmentInput["evidence"]) {
    return this.registry.reassess(assessmentId, extraEvidence, this.options.events);
  }

  invalidate(assessmentId: string, reason?: string) {
    return this.registry.invalidate(assessmentId, reason, this.options.events);
  }

  assessGates() {
    return assessTrustEightGates();
  }

  defaultPolicies() {
    return defaultTrustPolicies();
  }
}

export function createTrustClient(options: TrustClientOptions): TrustClient {
  return new TrustClient(options);
}
