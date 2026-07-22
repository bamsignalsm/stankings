export type * from "./types";
export {
  CONSENT_RUNTIME_VERSION,
  CONSENT_SCHEMA_VERSION,
} from "./types";
export { canTransitionConsentState } from "./lifecycle";
export {
  validateConsentDefinition,
  validateConsentRecord,
  validateConsentTransition,
} from "./validation";
export {
  createConsentRecord,
  revokeConsent,
  expireConsent,
  defaultConsentDefinitions,
} from "./domain";
export {
  MemoryConsentStore,
  FileConsentStore,
  createMemoryConsentStore,
  createFileConsentStore,
  type ConsentStore,
} from "./store";
export {
  SupabaseConsentStore,
  createSupabaseConsentStore,
  type ConsentSupabaseClient,
} from "./supabase-store";
export { ConsentRegistry } from "./registry";
export { assessConsentEightGates } from "./gates";
export { buildConsentEvidence } from "./evidence";

export const CONSENT_RUNTIME = {
  id: "enterprise-consent-runtime",
  version: "1.0.0",
  docsPath: "docs/platform/CONSENT_RUNTIME.md",
  eightGateComplete: true,
} as const;
