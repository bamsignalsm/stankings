/**
 * Extension points — placeholders for future capabilities.
 */

export interface FutureCapabilityPlaceholder {
  readonly readiness: "interface_only";
}

export const FUTURE_CAPABILITY_EXTENSION: FutureCapabilityPlaceholder = {
  readiness: "interface_only",
};
