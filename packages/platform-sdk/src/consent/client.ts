/**
 * Consent client — dogfood / foundation (not full production until Consent G3 complete).
 */

import type { ConsentStore } from "@/lib/enterprise-platform/consent/store";
import { ConsentRegistry } from "@/lib/enterprise-platform/consent/registry";
import {
  defaultConsentDefinitions,
  assessConsentEightGates,
  type CreateConsentInput,
  type ConsentDefinition,
} from "@/lib/enterprise-platform/consent";
import type { MemoryEventCollector } from "@/lib/enterprise-platform/events";
import { negotiateContract } from "@/lib/enterprise-platform/contracts";
import { CONSENT_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/discovery-contract";

export interface ConsentClientOptions {
  platformId: string;
  store: ConsentStore;
  declaredContractVersion?: string;
  events?: MemoryEventCollector;
}

export class ConsentClient {
  private readonly registry: ConsentRegistry;
  readonly platformId: string;
  readonly negotiatedContractVersion: string;

  constructor(private readonly options: ConsentClientOptions) {
    const negotiation = negotiateContract({
      consumerPlatformId: options.platformId,
      requestedContractId: CONSENT_PUBLIC_CONTRACT.contractId,
      declaredVersion: options.declaredContractVersion ?? CONSENT_PUBLIC_CONTRACT.version,
    });
    if (!negotiation.ok || !negotiation.negotiatedVersion) {
      throw new Error(`ConsentClient negotiation failed: ${negotiation.errors.join("; ")}`);
    }
    this.platformId = options.platformId;
    this.negotiatedContractVersion = negotiation.negotiatedVersion;
    this.registry = new ConsentRegistry(options.store);
  }

  definitions(): ConsentDefinition[] {
    return defaultConsentDefinitions();
  }

  grant(input: Omit<CreateConsentInput, "platformId"> & { platformId?: string }) {
    return this.registry.grant(
      { ...input, platformId: input.platformId ?? this.platformId },
      this.options.events,
    );
  }

  revoke(consentId: string, reason?: string) {
    return this.registry.revoke(consentId, reason, this.options.events);
  }

  listBySubject(subjectId: string) {
    return this.registry.listBySubject(subjectId);
  }

  assessGates() {
    return assessConsentEightGates();
  }
}

export function createConsentClient(options: ConsentClientOptions): ConsentClient {
  return new ConsentClient(options);
}
