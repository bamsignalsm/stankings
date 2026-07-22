export type * from "./types";
export {
  TRUST_RUNTIME_VERSION,
  TRUST_SCHEMA_VERSION,
} from "./types";
export { canTransitionTrustState } from "./lifecycle";
export {
  validateTrustEvidence,
  validateTrustPolicy,
  validateTrustPolicyRule,
  validateTrustAssessment,
  validateTrustTransition,
} from "./validation";
export {
  createTrustEvidenceRef,
  defaultTrustEvidenceSources,
} from "./evidence";
export {
  defaultTrustPolicies,
  evaluateTrustPolicy,
  getTrustPolicy,
} from "./policy";
export {
  createDraftAssessment,
  runAssessment,
  attachTrustEvidence,
  invalidateAssessment,
  markSuperseded,
  resolvePolicyForRequest,
  buildTrustAudit,
} from "./domain";
export {
  MemoryTrustStore,
  FileTrustStore,
  createMemoryTrustStore,
  createFileTrustStore,
  type TrustStore,
} from "./store";
export {
  SupabaseTrustStore,
  createSupabaseTrustStore,
  type TrustSupabaseClient,
} from "./supabase-store";
export { TrustRegistry } from "./registry";
export { assessTrustEightGates } from "./gates";

export const TRUST_RUNTIME = {
  id: "enterprise-trust-runtime",
  version: "1.0.0",
  docsPath: "docs/platform/TRUST_RUNTIME.md",
  eightGateComplete: true,
} as const;
