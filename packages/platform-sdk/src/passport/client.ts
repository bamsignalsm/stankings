/**
 * Passport client — Enterprise SDK surface for Passport Runtime.
 */

import type { PassportStore } from "@/lib/enterprise-platform/passport/store";
import { PassportRegistry } from "@/lib/enterprise-platform/passport/registry";
import {
  assessPassportEightGates,
  defaultEvidenceAssertionTypes,
  type AttachEvidenceInput,
  type IssuePassportInput,
} from "@/lib/enterprise-platform/passport";
import type { MemoryEventCollector } from "@/lib/enterprise-platform/events";
import { negotiateContract } from "@/lib/enterprise-platform/contracts";
import { PASSPORT_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/passport-contract";

export interface PassportClientOptions {
  platformId: string;
  store: PassportStore;
  declaredContractVersion?: string;
  events?: MemoryEventCollector;
}

export class PassportClient {
  private readonly registry: PassportRegistry;
  readonly platformId: string;
  readonly negotiatedContractVersion: string;

  constructor(private readonly options: PassportClientOptions) {
    const negotiation = negotiateContract({
      consumerPlatformId: options.platformId,
      requestedContractId: PASSPORT_PUBLIC_CONTRACT.contractId,
      declaredVersion: options.declaredContractVersion ?? PASSPORT_PUBLIC_CONTRACT.version,
    });
    if (!negotiation.ok || !negotiation.negotiatedVersion) {
      throw new Error(`PassportClient negotiation failed: ${negotiation.errors.join("; ")}`);
    }
    this.platformId = options.platformId;
    this.negotiatedContractVersion = negotiation.negotiatedVersion;
    this.registry = new PassportRegistry(options.store);
  }

  evidenceCatalogue() {
    return defaultEvidenceAssertionTypes();
  }

  issue(input: Omit<IssuePassportInput, "platformId"> & { platformId?: string }) {
    return this.registry.issue(
      { ...input, platformId: input.platformId ?? this.platformId },
      this.options.events,
    );
  }

  get(passportId: string) {
    return this.registry.get(passportId);
  }

  listBySubject(subjectId: string) {
    return this.registry.listBySubject(subjectId);
  }

  listHistory(passportId: string) {
    return this.registry.listHistory(passportId);
  }

  suspend(passportId: string, reason?: string) {
    return this.registry.suspend(passportId, reason, this.options.events);
  }

  revoke(passportId: string, reason?: string) {
    return this.registry.revoke(passportId, reason, this.options.events);
  }

  expire(passportId: string) {
    return this.registry.expire(passportId, this.options.events);
  }

  prepareRenewal(passportId: string) {
    return this.registry.prepareRenewal(passportId, this.options.events);
  }

  attachEvidence(input: AttachEvidenceInput) {
    return this.registry.attachEvidence(input, this.options.events);
  }

  assessGates() {
    return assessPassportEightGates();
  }
}

export function createPassportClient(options: PassportClientOptions): PassportClient {
  return new PassportClient(options);
}
