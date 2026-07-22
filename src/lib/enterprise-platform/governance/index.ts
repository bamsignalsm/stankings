export type * from "./types";
export { GOVERNANCE_RUNTIME_VERSION } from "./types";
export {
  validatePolicyDefinition,
  defaultEnterprisePolicies,
  defaultFeatureGates,
  evaluatePolicies,
  isFeatureEnabled,
} from "./evaluate";

export const GOVERNANCE_FOUNDATION = {
  id: "enterprise-governance-foundation",
  version: "1.0.0",
  docsPath: "docs/platform/GOVERNANCE_FOUNDATION.md",
} as const;
