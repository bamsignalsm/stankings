/**
 * Explainability Runtime pointer — implementation in enterprise-platform/explainability.
 */

export interface ExplainabilityRuntime {
  readonly id: string;
  readonly version: string;
  readonly docsPath: string;
  readonly eightGateComplete: true;
  describe(): string;
}

export const EXPLAINABILITY_RUNTIME: ExplainabilityRuntime = {
  id: "enterprise-explainability-runtime",
  version: "1.0.0",
  docsPath: "docs/platform/EXPLAINABILITY_RUNTIME.md",
  eightGateComplete: true,
  describe: () =>
    "Explainability Runtime Eight-Gate complete — use @stankings/platform-sdk/explainability.",
};
