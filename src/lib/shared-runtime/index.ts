/**
 * Shared Runtime Foundation — executable shared platform package.
 *
 * Identity: domain + persistence + Subject Registry + HQ mapping + validation.
 * Federation + platform registration are executable contracts.
 * Enterprise quality / events / registry live under enterprise-platform.
 * Passport / Trust / Consent / Explainability expose interfaces only.
 */

export * from "./identity";
export * from "./federation";
export * from "./platform-registration";
export * from "./persistence";
export * from "./mapping";
export * from "./validation";
export * from "./capabilities";

export const SHARED_RUNTIME_FOUNDATION = {
  id: "shared-runtime-foundation",
  version: "1.0.0",
  owner: "Stankings Legacy Ltd" as const,
  firstRuntime: "identity" as const,
  docsPath: "docs/platform/runtime/SHARED_IDENTITY_RUNTIME.md",
  persistenceDocsPath: "docs/platform/IDENTITY_PERSISTENCE.md",
  consumerGuidePath: "docs/platform/IDENTITY_CONSUMER_GUIDE.md",
  sdkPath: "@stankings/platform-sdk",
} as const;
