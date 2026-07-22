/**
 * Passport Runtime pointer — implementation lives in enterprise-platform/passport.
 * Avoid importing enterprise-platform here (circular risk via shared-runtime barrel).
 */

export interface PassportCredentialRef {
  passportId: string;
  subjectId: string;
  status: "active" | "suspended" | "revoked" | "expired" | "draft" | "issued";
}

export interface PassportRuntime {
  readonly id: string;
  readonly version: string;
  readonly docsPath: string;
  readonly eightGateComplete: true;
  describe(): string;
}

export const PASSPORT_RUNTIME: PassportRuntime = {
  id: "enterprise-passport-runtime",
  version: "1.0.0",
  docsPath: "docs/platform/PASSPORT_RUNTIME.md",
  eightGateComplete: true,
  describe: () =>
    "Passport Runtime Eight-Gate complete — use @stankings/platform-sdk/passport or enterprise-platform/passport.",
};
