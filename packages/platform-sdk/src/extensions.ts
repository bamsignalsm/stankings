/**
 * Extension points — contract-first placeholders for future clients.
 * Passport is executable via ./passport; Trust remains interface-only.
 */

export interface TrustClientPlaceholder {
  readonly readiness: "interface_only";
}

export const TRUST_CLIENT_EXTENSION: TrustClientPlaceholder = {
  readiness: "interface_only",
};
