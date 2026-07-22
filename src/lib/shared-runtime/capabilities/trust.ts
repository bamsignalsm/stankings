/**
 * Trust Runtime — interface surface only.
 * No Trust Graph implementation in this sprint.
 */

export interface TrustRuntime {
  readonly readiness: "interface_only";
  describe(): string;
}

export const TRUST_RUNTIME: TrustRuntime = {
  readiness: "interface_only",
  describe: () =>
    "Trust Runtime interface reserved. Trust Graph and reputation APIs are out of scope for Shared Identity Runtime Foundation.",
};
