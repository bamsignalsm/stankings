/**
 * Identity public contract — registered in Enterprise Contract Framework.
 */

import type { EnterpriseContractMeta } from "./types";

export const IDENTITY_PUBLIC_CONTRACT: EnterpriseContractMeta = {
  contractId: "identity.subject",
  name: "Shared Identity Subject Contract",
  capabilityId: "identity",
  version: "1.0.0",
  status: "active",
  owner: "Stankings Legacy Ltd",
  docsPath: "docs/platform/IDENTITY_CONSUMER_GUIDE.md",
  compatibleMajors: [1],
  publicModulePath: "@stankings/platform-sdk/identity",
};

/** Public operations documented for consumers (SDK maps 1:1). */
export const IDENTITY_CONTRACT_OPERATIONS = [
  "getSubject",
  "findByExternalRef",
  "putSubject",
  "listSubjects",
  "mapHqMember",
  "validateBundle",
  "assessGates",
] as const;
