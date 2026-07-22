/**
 * Consent capability — executable via enterprise-platform/consent + SDK.
 */

export interface ConsentRuntime {
  readonly readiness: "production";
  describe(): string;
}

export const CONSENT_RUNTIME: ConsentRuntime = {
  readiness: "production",
  describe: () =>
    "Consent Eight-Gate complete. Use @stankings/platform-sdk ConsentClient. Apply SQL migration only after review.",
};
