export type {
  RegistryEntryStatus,
  CapabilityRegistryEntry,
  ServiceRegistryEntry,
  RuntimeRegistryEntry,
  VersionRegistryEntry,
  EnterpriseRegistryCatalogue,
} from "./types";

export {
  buildCapabilityRegistry,
  buildServiceRegistry,
  buildRuntimeRegistry,
  buildVersionRegistry,
  buildEnterpriseRegistryCatalogue,
} from "./catalogue";

export {
  validateCapabilityRegistry,
  validateServiceRegistry,
  validateVersionRegistry,
  validateCompanyRegistryConsistency,
  validatePlatformRegistryConsistency,
  validateCrossRegistryConsistency,
  listCompanyIds,
  getCompanyById,
} from "./validation";

export {
  buildUnifiedEnterpriseRegistries,
  queryRegistryByKind,
  validateUnifiedRegistries,
  type UnifiedEnterpriseRegistries,
  type SdkModuleRegistryEntry,
  type ConsumerRegistrationEntry,
  type PolicyRegistryEntry,
} from "./unified";

export const ENTERPRISE_REGISTRY_RUNTIME = {
  id: "enterprise-registry-runtime",
  version: "1.1.0",
  docsPath: "docs/architecture/enterprise-platform/REGISTRY_RUNTIME.md",
} as const;
