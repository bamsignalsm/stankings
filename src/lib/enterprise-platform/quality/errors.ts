/**
 * Enterprise Error taxonomy — stable machine codes for all shared runtimes.
 */

export type EnterpriseErrorCapability =
  | "identity"
  | "passport"
  | "trust"
  | "consent"
  | "explainability"
  | "registry"
  | "platform"
  | "events"
  | "quality"
  | "governance"
  | "unknown";

export interface EnterpriseError {
  /** Stable machine code, e.g. IDENTITY_VERSION_CONFLICT */
  code: string;
  message: string;
  capability: EnterpriseErrorCapability;
  retryable: boolean;
  details?: Record<string, string | number | boolean | null>;
  /** Optional correlation for logs/events */
  correlationId?: string;
}

export function createEnterpriseError(
  partial: Omit<EnterpriseError, "retryable"> & { retryable?: boolean },
): EnterpriseError {
  return {
    ...partial,
    retryable: partial.retryable ?? false,
  };
}

export function isEnterpriseError(value: unknown): value is EnterpriseError {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.code === "string" &&
    typeof v.message === "string" &&
    typeof v.capability === "string" &&
    typeof v.retryable === "boolean"
  );
}

/** Canonical error code catalogue (extend per capability; never reuse meanings). */
export const ENTERPRISE_ERROR_CODES = {
  IDENTITY_INVALID_SUBJECT: "IDENTITY_INVALID_SUBJECT",
  IDENTITY_VERSION_CONFLICT: "IDENTITY_VERSION_CONFLICT",
  IDENTITY_EXTERNAL_REF_CONFLICT: "IDENTITY_EXTERNAL_REF_CONFLICT",
  IDENTITY_NOT_FOUND: "IDENTITY_NOT_FOUND",
  IDENTITY_ILLEGAL_TRANSITION: "IDENTITY_ILLEGAL_TRANSITION",
  REGISTRY_DUPLICATE_ENTRY: "REGISTRY_DUPLICATE_ENTRY",
  REGISTRY_VALIDATION_FAILED: "REGISTRY_VALIDATION_FAILED",
  REGISTRY_DEPENDENCY_MISSING: "REGISTRY_DEPENDENCY_MISSING",
  PLATFORM_NOT_REGISTERED: "PLATFORM_NOT_REGISTERED",
  PLATFORM_INCOMPATIBLE: "PLATFORM_INCOMPATIBLE",
  CONTRACT_VERSION_MISMATCH: "CONTRACT_VERSION_MISMATCH",
  EVENT_SCHEMA_INVALID: "EVENT_SCHEMA_INVALID",
  GATE_NOT_SATISFIED: "GATE_NOT_SATISFIED",
  DEPRECATED_SURFACE: "DEPRECATED_SURFACE",
} as const;

export type EnterpriseErrorCode =
  (typeof ENTERPRISE_ERROR_CODES)[keyof typeof ENTERPRISE_ERROR_CODES];
