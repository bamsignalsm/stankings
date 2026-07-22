export type * from "./types";
export {
  EXPLAINABILITY_RUNTIME_VERSION,
  EXPLAINABILITY_SCHEMA_VERSION,
} from "./types";
export { validateExplanationRecord } from "./validation";
export {
  generateTrustExplanation,
  generatePassportExplanation,
  generateConsentExplanation,
} from "./generation";
export {
  createExplanationRecord,
  buildExplainabilityAudit,
  historyCreated,
} from "./domain";
export {
  MemoryExplainabilityStore,
  FileExplainabilityStore,
  createMemoryExplainabilityStore,
  createFileExplainabilityStore,
  type ExplainabilityStore,
} from "./store";
export {
  SupabaseExplainabilityStore,
  createSupabaseExplainabilityStore,
  type ExplainabilitySupabaseClient,
} from "./supabase-store";
export { ExplainabilityRegistry } from "./registry";
export { assessExplainabilityEightGates } from "./gates";

export const EXPLAINABILITY_RUNTIME = {
  id: "enterprise-explainability-runtime",
  version: "1.0.0",
  docsPath: "docs/platform/EXPLAINABILITY_RUNTIME.md",
  eightGateComplete: true,
} as const;
