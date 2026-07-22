/**
 * Identity client — consumer façade over SubjectRegistry / IdentityStore.
 */

import type { IdentityStore, PersistentIdentityBundle } from "@/lib/shared-runtime/persistence/types";
import { SubjectRegistry } from "@/lib/shared-runtime/identity/subject-registry";
import {
  mapHqMemberToSubject,
  type HqSubjectMappingInput,
  type HqSubjectMappingResult,
} from "@/lib/shared-runtime/mapping/hq-subject";
import { validateMappingIntegrity } from "@/lib/shared-runtime/validation/runtime";
import { assessIdentityEightGates } from "@/lib/shared-runtime/identity/gates";
import type { CapabilityGateReport } from "@/lib/enterprise-platform/quality/eight-gates";
import type { MemoryEventCollector } from "@/lib/enterprise-platform/events";
import { negotiateContract } from "@/lib/enterprise-platform/contracts";
import { IDENTITY_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/identity-contract";

export interface IdentityClientOptions {
  store: IdentityStore;
  /** Consumer platform id for contract negotiation */
  platformId: string;
  /** Declared identity contract version (major must match) */
  declaredContractVersion?: string;
  events?: MemoryEventCollector;
}

export class IdentityClient {
  private readonly registry: SubjectRegistry;
  readonly platformId: string;
  readonly negotiatedContractVersion: string;

  constructor(private readonly options: IdentityClientOptions) {
    const negotiation = negotiateContract({
      consumerPlatformId: options.platformId,
      requestedContractId: IDENTITY_PUBLIC_CONTRACT.contractId,
      declaredVersion: options.declaredContractVersion ?? IDENTITY_PUBLIC_CONTRACT.version,
    });
    if (!negotiation.ok || !negotiation.negotiatedVersion) {
      throw new Error(
        `IdentityClient contract negotiation failed: ${negotiation.errors.join("; ")}`,
      );
    }
    this.platformId = options.platformId;
    this.negotiatedContractVersion = negotiation.negotiatedVersion;
    this.registry = new SubjectRegistry(options.store);
  }

  getSubject(subjectId: string): Promise<PersistentIdentityBundle | null> {
    return this.registry.get(subjectId);
  }

  findByExternalRef(system: string, externalId: string) {
    return this.registry.findByExternalRef(system, externalId);
  }

  listSubjects(limit?: number) {
    return this.registry.list(limit);
  }

  putSubject(bundle: PersistentIdentityBundle) {
    return this.registry.put(bundle, {
      events: this.options.events,
      correlationId: `sdk:${this.platformId}`,
    });
  }

  mapHqMember(input: HqSubjectMappingInput): Promise<HqSubjectMappingResult> {
    return mapHqMemberToSubject(this.options.store, input);
  }

  validateBundle(bundle: PersistentIdentityBundle) {
    return validateMappingIntegrity(bundle);
  }

  assessGates(): CapabilityGateReport {
    return assessIdentityEightGates();
  }
}

export function createIdentityClient(options: IdentityClientOptions): IdentityClient {
  return new IdentityClient(options);
}
