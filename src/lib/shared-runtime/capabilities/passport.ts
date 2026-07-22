/**
 * Passport Runtime — interface surface only (Identity is gold standard).
 */

export interface PassportCredentialRef {
  credentialId: string;
  subjectId: string;
  status: "planned";
}

export interface PassportRuntime {
  readonly readiness: "interface_only";
  describe(): string;
}

export const PASSPORT_RUNTIME: PassportRuntime = {
  readiness: "interface_only",
  describe: () =>
    "Passport Runtime reserved. Follow Identity Eight-Gate pattern when implementation begins.",
};
