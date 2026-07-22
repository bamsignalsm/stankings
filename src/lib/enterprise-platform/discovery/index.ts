export type * from "./types";
export {
  DISCOVERY_RUNTIME_VERSION,
  DISCOVERY_SCHEMA_VERSION,
} from "./types";
export {
  buildDiscoverySnapshot,
  queryDiscovery,
  negotiateCapabilities,
  assessDiscoveryHealth,
} from "./query";
export { validateDiscoverySnapshot } from "./validation";
export { assessDiscoveryEightGates } from "./gates";

export const DISCOVERY_RUNTIME = {
  id: "enterprise-discovery-runtime",
  version: "1.0.0",
  docsPath: "docs/platform/DISCOVERY_RUNTIME.md",
} as const;
