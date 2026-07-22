export type * from "./types";
export {
  PASSPORT_RUNTIME_VERSION,
  PASSPORT_SCHEMA_VERSION,
} from "./types";
export { canTransitionPassportState } from "./lifecycle";
export {
  validatePassportEvidence,
  validatePassportRecord,
  validatePassportTransition,
  deriveVerificationStatus,
} from "./validation";
export {
  issuePassport,
  activatePassport,
  suspendPassport,
  revokePassport,
  expirePassport,
  preparePassportRenewal,
  attachEvidence,
} from "./domain";
export {
  MemoryPassportStore,
  FilePassportStore,
  createMemoryPassportStore,
  createFilePassportStore,
  type PassportStore,
} from "./store";
export {
  SupabasePassportStore,
  createSupabasePassportStore,
  type PassportSupabaseClient,
} from "./supabase-store";
export { PassportRegistry } from "./registry";
export { assessPassportEightGates } from "./gates";
export {
  buildPassportEvidence,
  buildEvidenceAttachmentAudit,
  defaultEvidenceAssertionTypes,
} from "./evidence";

export const PASSPORT_RUNTIME = {
  id: "enterprise-passport-runtime",
  version: "1.0.0",
  docsPath: "docs/platform/PASSPORT_RUNTIME.md",
  eightGateComplete: true,
} as const;
