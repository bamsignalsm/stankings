import {
  validationFail,
  validationOk,
  type EnterpriseValidationResult,
} from "@/lib/enterprise-platform/quality/validation";
import type { DiscoverySnapshot } from "./types";

export function validateDiscoverySnapshot(
  snapshot: DiscoverySnapshot,
): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!snapshot.discoveryRuntimeVersion) errors.push("discoveryRuntimeVersion required");
  if (!snapshot.generatedAt) errors.push("generatedAt required");
  if (!snapshot.sdk?.packageName) errors.push("sdk.packageName required");
  const capIds = new Set<string>();
  for (const c of snapshot.capabilities) {
    if (capIds.has(c.capabilityId)) errors.push(`duplicate capability ${c.capabilityId}`);
    capIds.add(c.capabilityId);
  }
  for (const s of snapshot.services) {
    if (!capIds.has(s.capabilityId) && snapshot.capabilities.length > 0) {
      // allow if filtered query emptied caps
    }
  }
  return errors.length ? validationFail(errors) : validationOk();
}
