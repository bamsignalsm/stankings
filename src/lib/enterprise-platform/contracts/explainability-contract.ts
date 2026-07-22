import type { EnterpriseContractMeta } from "./types";

export const EXPLAINABILITY_PUBLIC_CONTRACT: EnterpriseContractMeta = {
  contractId: "explainability.record",
  name: "Enterprise Explainability Record Contract",
  capabilityId: "explainability",
  version: "1.0.0",
  status: "active",
  owner: "Stankings Legacy Ltd",
  docsPath: "docs/platform/EXPLAINABILITY_RUNTIME.md",
  compatibleMajors: [1],
  publicModulePath: "@stankings/platform-sdk/explainability",
};
