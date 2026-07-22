/**
 * Extension points — placeholders for capabilities not yet executable.
 */

export interface ExplainabilityClientPlaceholder {
  readonly readiness: "interface_only";
}

export const EXPLAINABILITY_CLIENT_EXTENSION: ExplainabilityClientPlaceholder = {
  readiness: "interface_only",
};
