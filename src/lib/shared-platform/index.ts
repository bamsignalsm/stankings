/**
 * Shared Platform — contracts and readiness only (no runtime services).
 */

export {
  SHARED_PLATFORM_CONTRACT,
  SHARED_CAPABILITY_CONTRACTS,
  getSharedCapability,
  getCapabilitiesByReadiness,
  type SharedCapabilityId,
  type SharedCapabilityContract,
  type ContractMaturity,
  type RuntimeReadiness,
} from "@/lib/shared-platform/contract";
