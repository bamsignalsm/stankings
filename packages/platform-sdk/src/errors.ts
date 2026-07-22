/**
 * SDK error surface — re-exports enterprise error taxonomy for consumers.
 */

export {
  createEnterpriseError,
  isEnterpriseError,
  ENTERPRISE_ERROR_CODES,
  type EnterpriseError,
  type EnterpriseErrorCapability,
  type EnterpriseErrorCode,
} from "@/lib/enterprise-platform/quality/errors";
