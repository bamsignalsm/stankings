/**
 * Enterprise Contract Framework (M2B) — canonical public contract model.
 * Every runtime exposes contracts through this framework.
 */

export type ContractLifecycleStatus =
  | "draft"
  | "active"
  | "deprecated"
  | "retired";

export interface EnterpriseContractMeta {
  /** Stable id, e.g. identity.subject.v1 */
  contractId: string;
  name: string;
  capabilityId: string;
  /** Semver of this contract surface */
  version: string;
  status: ContractLifecycleStatus;
  owner: "Stankings Legacy Ltd";
  docsPath: string;
  /** Semver majors this contract is compatible with (usually same major) */
  compatibleMajors: number[];
  deprecatedInVersion?: string;
  removeInMajor?: string;
  replacementContractId?: string;
  /** Public TypeScript module path consumers should import */
  publicModulePath: string;
}

export interface ContractNegotiationRequest {
  consumerPlatformId: string;
  requestedContractId: string;
  /** Consumer-declared contract version */
  declaredVersion: string;
}

export interface ContractNegotiationResult {
  ok: boolean;
  contract?: EnterpriseContractMeta;
  errors: string[];
  warnings: string[];
  negotiatedVersion?: string;
}

export const CONTRACT_DOCUMENTATION_TEMPLATE = {
  sections: [
    "Purpose",
    "Public types / operations",
    "Non-goals",
    "Versioning & compatibility",
    "Deprecation notes",
    "Consumer integration",
    "Validation rules",
    "Related events",
  ],
} as const;

export const CONTRACT_FRAMEWORK = {
  id: "enterprise-contract-framework",
  version: "1.0.0",
  milestone: "M2B",
  docsPath: "docs/platform/ENTERPRISE_CONTRACT_FRAMEWORK.md",
} as const;
