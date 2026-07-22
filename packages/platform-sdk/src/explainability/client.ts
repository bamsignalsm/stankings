/**
 * Explainability client — Enterprise SDK surface.
 */

import type { ExplainabilityStore } from "@/lib/enterprise-platform/explainability/store";
import { ExplainabilityRegistry } from "@/lib/enterprise-platform/explainability/registry";
import {
  assessExplainabilityEightGates,
  type CreateExplanationInput,
} from "@/lib/enterprise-platform/explainability";
import type { ConsentRecord } from "@/lib/enterprise-platform/consent/types";
import type { PassportRecord } from "@/lib/enterprise-platform/passport/types";
import type { TrustAssessment } from "@/lib/enterprise-platform/trust/types";
import type { MemoryEventCollector } from "@/lib/enterprise-platform/events";
import { negotiateContract } from "@/lib/enterprise-platform/contracts";
import { EXPLAINABILITY_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/explainability-contract";

export interface ExplainabilityClientOptions {
  platformId: string;
  store: ExplainabilityStore;
  declaredContractVersion?: string;
  events?: MemoryEventCollector;
}

export class ExplainabilityClient {
  private readonly registry: ExplainabilityRegistry;
  readonly platformId: string;
  readonly negotiatedContractVersion: string;

  constructor(private readonly options: ExplainabilityClientOptions) {
    const negotiation = negotiateContract({
      consumerPlatformId: options.platformId,
      requestedContractId: EXPLAINABILITY_PUBLIC_CONTRACT.contractId,
      declaredVersion:
        options.declaredContractVersion ?? EXPLAINABILITY_PUBLIC_CONTRACT.version,
    });
    if (!negotiation.ok || !negotiation.negotiatedVersion) {
      throw new Error(
        `ExplainabilityClient negotiation failed: ${negotiation.errors.join("; ")}`,
      );
    }
    this.platformId = options.platformId;
    this.negotiatedContractVersion = negotiation.negotiatedVersion;
    this.registry = new ExplainabilityRegistry(options.store);
  }

  record(input: Omit<CreateExplanationInput, "platformId"> & { platformId?: string }) {
    return this.registry.record(
      { ...input, platformId: input.platformId ?? this.platformId },
      this.options.events,
    );
  }

  explainTrust(assessment: TrustAssessment) {
    return this.registry.explainTrust(assessment, this.platformId, this.options.events);
  }

  explainPassport(passport: PassportRecord) {
    return this.registry.explainPassport(passport, this.platformId, this.options.events);
  }

  explainConsent(consent: ConsentRecord) {
    return this.registry.explainConsent(consent, this.platformId, this.options.events);
  }

  get(explanationId: string) {
    return this.registry.get(explanationId);
  }

  listBySubject(subjectId: string) {
    return this.registry.listBySubject(subjectId);
  }

  listByDecision(decisionRef: string) {
    return this.registry.listByDecision(decisionRef);
  }

  listHistory(explanationId: string) {
    return this.registry.listHistory(explanationId);
  }

  assessGates() {
    return assessExplainabilityEightGates();
  }
}

export function createExplainabilityClient(
  options: ExplainabilityClientOptions,
): ExplainabilityClient {
  return new ExplainabilityClient(options);
}
