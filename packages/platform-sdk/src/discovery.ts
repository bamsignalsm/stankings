/**
 * Runtime / capability discovery for consumers.
 */

import { buildEnterpriseRegistryCatalogue } from "@/lib/enterprise-platform/registry/catalogue";
import {
  listEnterpriseContracts,
  negotiateContract,
  type ContractNegotiationRequest,
  type ContractNegotiationResult,
} from "@/lib/enterprise-platform/contracts";
import type { CapabilityRegistryEntry } from "@/lib/enterprise-platform/registry/types";

export interface DiscoverySnapshot {
  capabilities: CapabilityRegistryEntry[];
  contracts: ReturnType<typeof listEnterpriseContracts>;
  generatedAt: string;
}

export function discoverPlatform(): DiscoverySnapshot {
  const catalogue = buildEnterpriseRegistryCatalogue();
  return {
    capabilities: catalogue.capabilities,
    contracts: listEnterpriseContracts(),
    generatedAt: new Date().toISOString(),
  };
}

export function discoverCapability(
  capabilityId: string,
): CapabilityRegistryEntry | undefined {
  return buildEnterpriseRegistryCatalogue().capabilities.find(
    (c) => c.capabilityId === capabilityId,
  );
}

export function negotiateEnterpriseContract(
  request: ContractNegotiationRequest,
): ContractNegotiationResult {
  return negotiateContract(request);
}
