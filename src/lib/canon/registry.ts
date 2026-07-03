import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { CANON_001_EXTENDED } from "@/lib/canon/canon-001";
import { CANON_002_EXTENDED } from "@/lib/canon/canon-002";
import { CANON_003_EXTENDED } from "@/lib/canon/canon-003";
import { CANON_004_EXTENDED } from "@/lib/canon/canon-004";
import { CANON_005_EXTENDED } from "@/lib/canon/canon-005";
import { CANON_006_EXTENDED } from "@/lib/canon/canon-006";
import { CANON_007_EXTENDED } from "@/lib/canon/canon-007";
import { CANON_008_EXTENDED } from "@/lib/canon/canon-008";
import { CANON_009_EXTENDED } from "@/lib/canon/canon-009";
import { CANON_010_EXTENDED } from "@/lib/canon/canon-010";
import { CANON_011_EXTENDED } from "@/lib/canon/canon-011";
import { CANON_012_EXTENDED } from "@/lib/canon/canon-012";
import { CANON_013_EXTENDED } from "@/lib/canon/canon-013";
import { CANON_014_EXTENDED } from "@/lib/canon/canon-014";
import { CANON_015_EXTENDED } from "@/lib/canon/canon-015";
import { CANON_016_EXTENDED } from "@/lib/canon/canon-016";
import { CANON_017_EXTENDED } from "@/lib/canon/canon-017";
import { CANON_018_EXTENDED } from "@/lib/canon/canon-018";
import { CANON_019_EXTENDED } from "@/lib/canon/canon-019";
import { CANON_020_EXTENDED } from "@/lib/canon/canon-020";
import { CANON_021_EXTENDED } from "@/lib/canon/canon-021";
import { CANON_022_EXTENDED } from "@/lib/canon/canon-022";
import { CANON_023_EXTENDED } from "@/lib/canon/canon-023";
import { CANON_024_EXTENDED } from "@/lib/canon/canon-024";
import { CANON_025_EXTENDED } from "@/lib/canon/canon-025";

const CANON_REGISTRY: Record<string, CanonExtendedMetadata> = {
  "CANON-001": CANON_001_EXTENDED,
  "CANON-002": CANON_002_EXTENDED,
  "CANON-003": CANON_003_EXTENDED,
  "CANON-004": CANON_004_EXTENDED,
  "CANON-005": CANON_005_EXTENDED,
  "CANON-006": CANON_006_EXTENDED,
  "CANON-007": CANON_007_EXTENDED,
  "CANON-008": CANON_008_EXTENDED,
  "CANON-009": CANON_009_EXTENDED,
  "CANON-010": CANON_010_EXTENDED,
  "CANON-011": CANON_011_EXTENDED,
  "CANON-012": CANON_012_EXTENDED,
  "CANON-013": CANON_013_EXTENDED,
  "CANON-014": CANON_014_EXTENDED,
  "CANON-015": CANON_015_EXTENDED,
  "CANON-016": CANON_016_EXTENDED,
  "CANON-017": CANON_017_EXTENDED,
  "CANON-018": CANON_018_EXTENDED,
  "CANON-019": CANON_019_EXTENDED,
  "CANON-020": CANON_020_EXTENDED,
  "CANON-021": CANON_021_EXTENDED,
  "CANON-022": CANON_022_EXTENDED,
  "CANON-023": CANON_023_EXTENDED,
  "CANON-024": CANON_024_EXTENDED,
  "CANON-025": CANON_025_EXTENDED,
};

export function getCanonExtendedMetadata(
  identifier: string
): CanonExtendedMetadata | null {
  return CANON_REGISTRY[identifier] ?? null;
}

export async function getCanonSections(identifier: string): Promise<CanonSection[] | null> {
  const meta = getCanonExtendedMetadata(identifier);
  return meta?.sections ?? null;
}

export function getAllCanonDependencyChains(): {
  identifier: string;
  title: string;
  upstream: CanonExtendedMetadata["dependencyUpstream"];
  downstream: CanonExtendedMetadata["dependencyDownstream"];
}[] {
  return Object.values(CANON_REGISTRY).map((c) => ({
    identifier: c.identifier,
    title: c.sections[0]?.title ?? c.identifier,
    upstream: c.dependencyUpstream,
    downstream: c.dependencyDownstream,
  }));
}

export {
  CANON_001_EXTENDED,
  CANON_002_EXTENDED,
  CANON_003_EXTENDED,
  CANON_004_EXTENDED,
  CANON_005_EXTENDED,
  CANON_006_EXTENDED,
  CANON_007_EXTENDED,
  CANON_008_EXTENDED,
  CANON_009_EXTENDED,
  CANON_010_EXTENDED,
  CANON_011_EXTENDED,
  CANON_012_EXTENDED,
  CANON_013_EXTENDED,
  CANON_014_EXTENDED,
  CANON_015_EXTENDED,
  CANON_016_EXTENDED,
  CANON_017_EXTENDED,
  CANON_018_EXTENDED,
  CANON_019_EXTENDED,
  CANON_020_EXTENDED,
  CANON_021_EXTENDED,
  CANON_022_EXTENDED,
  CANON_023_EXTENDED,
  CANON_024_EXTENDED,
  CANON_025_EXTENDED,
};
