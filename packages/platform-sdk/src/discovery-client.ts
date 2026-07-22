/**
 * Discovery client — consumer façade.
 */

import {
  buildDiscoverySnapshot,
  queryDiscovery,
  negotiateCapabilities,
  assessDiscoveryEightGates,
  type DiscoveryQuery,
  type DiscoverySnapshot,
  type CapabilityNegotiationRequest,
  type CapabilityNegotiationResult,
} from "@/lib/enterprise-platform/discovery";
import type { CapabilityGateReport } from "@/lib/enterprise-platform/quality/eight-gates";
import { negotiateContract } from "@/lib/enterprise-platform/contracts";
import { DISCOVERY_PUBLIC_CONTRACT } from "@/lib/enterprise-platform/contracts/discovery-contract";

export interface DiscoveryClientOptions {
  platformId: string;
  declaredContractVersion?: string;
}

export class DiscoveryClient {
  readonly platformId: string;
  readonly negotiatedContractVersion: string;

  constructor(options: DiscoveryClientOptions) {
    const negotiation = negotiateContract({
      consumerPlatformId: options.platformId,
      requestedContractId: DISCOVERY_PUBLIC_CONTRACT.contractId,
      declaredVersion: options.declaredContractVersion ?? DISCOVERY_PUBLIC_CONTRACT.version,
    });
    if (!negotiation.ok || !negotiation.negotiatedVersion) {
      throw new Error(`DiscoveryClient negotiation failed: ${negotiation.errors.join("; ")}`);
    }
    this.platformId = options.platformId;
    this.negotiatedContractVersion = negotiation.negotiatedVersion;
  }

  snapshot(): DiscoverySnapshot {
    return buildDiscoverySnapshot();
  }

  query(query?: DiscoveryQuery): DiscoverySnapshot {
    return queryDiscovery(query);
  }

  negotiate(request: Omit<CapabilityNegotiationRequest, "platformId"> & { platformId?: string }): CapabilityNegotiationResult {
    return negotiateCapabilities({
      ...request,
      platformId: request.platformId ?? this.platformId,
    });
  }

  assessGates(): CapabilityGateReport {
    return assessDiscoveryEightGates();
  }
}

export function createDiscoveryClient(options: DiscoveryClientOptions): DiscoveryClient {
  return new DiscoveryClient(options);
}
