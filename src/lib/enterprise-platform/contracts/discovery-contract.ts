import type { EnterpriseContractMeta } from "./types";

export const DISCOVERY_PUBLIC_CONTRACT: EnterpriseContractMeta = {
  contractId: "discovery.runtime",
  name: "Enterprise Discovery Runtime Contract",
  capabilityId: "capability_discovery",
  version: "1.0.0",
  status: "active",
  owner: "Stankings Legacy Ltd",
  docsPath: "docs/platform/DISCOVERY_RUNTIME.md",
  compatibleMajors: [1],
  publicModulePath: "@stankings/platform-sdk/discovery",
};

export const CONSENT_PUBLIC_CONTRACT: EnterpriseContractMeta = {
  contractId: "consent.record",
  name: "Enterprise Consent Record Contract",
  capabilityId: "consent",
  version: "1.0.0",
  status: "active",
  owner: "Stankings Legacy Ltd",
  docsPath: "docs/platform/CONSENT_RUNTIME.md",
  compatibleMajors: [1],
  publicModulePath: "@stankings/platform-sdk/consent",
};

export const GOVERNANCE_PUBLIC_CONTRACT: EnterpriseContractMeta = {
  contractId: "governance.policy",
  name: "Enterprise Governance Policy Contract",
  capabilityId: "platform_status",
  version: "1.0.0",
  status: "active",
  owner: "Stankings Legacy Ltd",
  docsPath: "docs/platform/GOVERNANCE_FOUNDATION.md",
  compatibleMajors: [1],
  publicModulePath: "@stankings/platform-sdk",
};
