export type CertificationStatus = "pass" | "fail" | "pending" | "skipped";

export interface CertificationGateResult {
  status: CertificationStatus;
  runId?: string | null;
  score?: number | null;
  detail?: string | null;
}

export interface ProductCertificationSnapshot {
  liveE2e: CertificationGateResult;
  smoke: CertificationGateResult;
  security: CertificationGateResult;
  performance: CertificationGateResult;
}

export function gatePassed(gate: CertificationGateResult): boolean {
  return gate.status === "pass";
}

export function allGatesPassed(snapshot: ProductCertificationSnapshot): boolean {
  return (
    gatePassed(snapshot.liveE2e) &&
    gatePassed(snapshot.smoke) &&
    gatePassed(snapshot.security) &&
    gatePassed(snapshot.performance)
  );
}
