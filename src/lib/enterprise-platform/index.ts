/**
 * Enterprise Platform — foundation modules.
 */

export * from "./quality";
export * from "./events";
export * from "./registry";
export * from "./contracts";
export * from "./discovery";
export * from "./consent";
export * from "./passport";
export * from "./trust";
export * from "./explainability";
export * from "./governance";
export * from "./notifications";
export * from "./config";
export * from "./observability";

export const ENTERPRISE_PLATFORM = {
  id: "enterprise-platform",
  version: "1.6.0",
  docsPath: "docs/architecture/SHARED_ENTERPRISE_PLATFORM_PROGRAM.md",
} as const;
