/**
 * Shared Identity Runtime — first executable shared platform domain.
 */

export type {
  IdentitySubject,
  IdentitySubjectKind,
  IdentityLifecycleState,
  IdentityAuthority,
  IdentityExternalRef,
  IdentityMembership,
  IdentityRoleClaim,
  CreateIdentitySubjectInput,
} from "./types";

export {
  SHARED_IDENTITY_AUTHORITY,
  IDENTITY_OWNERSHIP_RULES,
  assertSharedIdentityAuthority,
  isProductLocalProfileForbiddenNote,
} from "./ownership";

export { canTransitionIdentityState, transitionIdentityState } from "./lifecycle";

export {
  validateSubjectId,
  validateExternalRef,
  validateCreateIdentityInput,
  validateIdentitySubject,
  validateMembership,
  validateRoleClaim,
  type IdentityValidationResult,
} from "./validation";

export {
  createIdentitySubject,
  activateIdentitySubject,
  setIdentityState,
  resolveIdentitySubject,
} from "./domain";

export {
  SubjectRegistry,
  IDENTITY_RUNTIME_VERSION,
  IDENTITY_SCHEMA_VERSION,
  subjectNotFoundError,
  type SubjectRegistryWriteOptions,
  type SubjectRegistryWriteResult,
} from "./subject-registry";

export { assessIdentityEightGates } from "./gates";
