/**
 * Extension points — contract-first placeholders for future clients.
 */

export interface PassportClientPlaceholder {
  readonly readiness: "interface_only";
}

export interface TrustClientPlaceholder {
  readonly readiness: "interface_only";
}

export const PASSPORT_CLIENT_EXTENSION: PassportClientPlaceholder = {
  readiness: "interface_only",
};

export const TRUST_CLIENT_EXTENSION: TrustClientPlaceholder = {
  readiness: "interface_only",
};
