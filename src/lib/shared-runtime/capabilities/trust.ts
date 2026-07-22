/**
 * Trust Runtime pointer — implementation lives in enterprise-platform/trust.
 */

export interface TrustRuntime {
  readonly id: string;
  readonly version: string;
  readonly docsPath: string;
  readonly eightGateComplete: true;
  describe(): string;
}

export const TRUST_RUNTIME: TrustRuntime = {
  id: "enterprise-trust-runtime",
  version: "1.0.0",
  docsPath: "docs/platform/TRUST_RUNTIME.md",
  eightGateComplete: true,
  describe: () =>
    "Trust Runtime Eight-Gate complete — use @stankings/platform-sdk/trust or enterprise-platform/trust.",
};
