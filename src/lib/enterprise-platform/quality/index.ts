export * from "./errors";
export * from "./validation";
export * from "./versioning";
export * from "./deprecation";
export * from "./compatibility";
export * from "./logging";
export * from "./audit";
export * from "./eight-gates";

export const QUALITY_FOUNDATION = {
  id: "enterprise-quality-foundation",
  version: "1.0.0",
  milestone: "M0",
  docsPath: "docs/architecture/enterprise-platform/QUALITY_FOUNDATION.md",
} as const;
