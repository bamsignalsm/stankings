import type { EnterpriseContractMeta } from "./types";

export const TRUST_PUBLIC_CONTRACT: EnterpriseContractMeta = {
  contractId: "trust.assessment",
  name: "Enterprise Trust Assessment Contract",
  capabilityId: "trust",
  version: "1.0.0",
  status: "active",
  owner: "Stankings Legacy Ltd",
  docsPath: "docs/platform/TRUST_RUNTIME.md",
  compatibleMajors: [1],
  publicModulePath: "@stankings/platform-sdk/trust",
};
