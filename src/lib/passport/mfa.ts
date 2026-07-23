/**
 * MFA architecture hooks — provider-agnostic TOTP readiness.
 * Full enrollment UI is Phase I.1; flags and policy live here.
 */

export type MfaMethod = "totp" | "recovery" | "passkey_future";

/** Roles / capabilities that require MFA before Energy or elevated SKL access */
export const MFA_MANDATORY_CAPABILITIES = [
  "energy.super_admin",
  "org.company_head",
  "org.hr",
  "org.finance",
  "org.legal",
  "org.security",
  "org.enterprise_ops",
] as const;

export function isMfaMandatoryForHierarchy(
  hierarchyLevel: string,
  roleKey?: string
): boolean {
  if (hierarchyLevel === "ceo" || hierarchyLevel === "company_head") return true;
  if (roleKey?.includes("hr") || roleKey?.includes("people") || roleKey?.includes("recruitment")) {
    return true;
  }
  if (roleKey?.includes("legal") || roleKey?.includes("finance") || roleKey?.includes("security")) {
    return true;
  }
  return false;
}

export const MFA_ARCHITECTURE = {
  preferred: "totp" as const,
  compatibleWith: ["Google Authenticator", "Authy", "1Password"],
  recoveryCodes: true,
  deviceReplacement: true,
  futurePasskeys: true,
  docsPath: "docs/architecture/passport-workforce/09-mfa-architecture.md",
} as const;
