import type { EnterpriseContractMeta } from "./types";

export const PASSPORT_PUBLIC_CONTRACT: EnterpriseContractMeta = {
  contractId: "passport.record",
  name: "Enterprise Passport Record Contract",
  capabilityId: "passport",
  version: "1.0.0",
  status: "active",
  owner: "Stankings Legacy Ltd",
  docsPath: "docs/platform/PASSPORT_RUNTIME.md",
  compatibleMajors: [1],
  publicModulePath: "@stankings/platform-sdk/passport",
};
