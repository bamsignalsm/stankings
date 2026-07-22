/**
 * Explainability Runtime — interface surface only.
 */

export interface ExplainabilityRuntime {
  readonly readiness: "interface_only";
  describe(): string;
}

export const EXPLAINABILITY_RUNTIME: ExplainabilityRuntime = {
  readiness: "interface_only",
  describe: () =>
    "Explainability Runtime interface reserved. Decision explanation APIs follow Identity + Trust.",
};
