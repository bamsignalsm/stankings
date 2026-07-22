/**
 * Versioning + compatibility conventions for enterprise capabilities.
 */

export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  raw: string;
}

export function parseSemVer(version: string): SemVer | null {
  const m = /^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(version.trim());
  if (!m) return null;
  return {
    major: Number(m[1]),
    minor: Number(m[2]),
    patch: Number(m[3]),
    raw: version.trim(),
  };
}

/** Compare a.b.c — returns -1 / 0 / 1. Non-semver sorts after valid semver as equal-to-self only. */
export function compareSemVer(a: string, b: string): number {
  const pa = parseSemVer(a);
  const pb = parseSemVer(b);
  if (!pa || !pb) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }
  if (pa.major !== pb.major) return pa.major < pb.major ? -1 : 1;
  if (pa.minor !== pb.minor) return pa.minor < pb.minor ? -1 : 1;
  if (pa.patch !== pb.patch) return pa.patch < pb.patch ? -1 : 1;
  return 0;
}

export function isCompatibleMajor(consumer: string, provider: string): boolean {
  const c = parseSemVer(consumer);
  const p = parseSemVer(provider);
  if (!c || !p) return consumer === provider;
  return c.major === p.major && compareSemVer(consumer, provider) <= 0
    ? true
    : c.major === p.major;
}

/**
 * Consumer declares required contract version; provider advertises current.
 * Same major required; consumer must not require higher minor/patch than provider supports
 * only when exact match policy is off — default: majors must match.
 */
export function checkContractCompatibility(
  consumerDeclared: string,
  providerCurrent: string,
): { compatible: boolean; reason?: string } {
  const c = parseSemVer(consumerDeclared);
  const p = parseSemVer(providerCurrent);
  if (!c || !p) {
    if (consumerDeclared === providerCurrent) return { compatible: true };
    return {
      compatible: false,
      reason: `non-semver mismatch: ${consumerDeclared} vs ${providerCurrent}`,
    };
  }
  if (c.major !== p.major) {
    return {
      compatible: false,
      reason: `major mismatch: consumer ${consumerDeclared} vs provider ${providerCurrent}`,
    };
  }
  return { compatible: true };
}

export interface VersionedArtifact {
  id: string;
  version: string;
  schemaVersion?: number;
}
