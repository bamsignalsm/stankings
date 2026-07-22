/**
 * Registry validation — duplicates, dependencies, version rules.
 */

import { COMPANY_REGISTRY } from "@/lib/shared/company/registry";
import { buildSeedPlatformCatalogue } from "@/lib/shared-runtime/platform-registration";
import {
  validationFail,
  validationOk,
  type EnterpriseValidationResult,
} from "@/lib/enterprise-platform/quality/validation";
import { parseSemVer } from "@/lib/enterprise-platform/quality/versioning";
import type { EnterpriseRegistryCatalogue } from "./types";
import { buildEnterpriseRegistryCatalogue } from "./catalogue";

export function validateCapabilityRegistry(
  catalogue: EnterpriseRegistryCatalogue = buildEnterpriseRegistryCatalogue(),
): EnterpriseValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();
  const ids = new Set(catalogue.capabilities.map((c) => c.capabilityId));

  for (const c of catalogue.capabilities) {
    if (seen.has(c.capabilityId)) errors.push(`duplicate capabilityId: ${c.capabilityId}`);
    seen.add(c.capabilityId);
    if (!c.name?.trim()) errors.push(`${c.capabilityId}: name required`);
    if (!c.contractVersion?.trim()) errors.push(`${c.capabilityId}: contractVersion required`);
    for (const dep of c.dependsOn) {
      if (!ids.has(dep)) {
        errors.push(`${c.capabilityId}: missing dependency capability ${dep}`);
      }
    }
  }
  return errors.length ? validationFail(errors, warnings) : validationOk(warnings);
}

export function validateServiceRegistry(
  catalogue: EnterpriseRegistryCatalogue = buildEnterpriseRegistryCatalogue(),
): EnterpriseValidationResult {
  const errors: string[] = [];
  const capIds = new Set(catalogue.capabilities.map((c) => c.capabilityId));
  const seen = new Set<string>();
  for (const s of catalogue.services) {
    if (seen.has(s.serviceId)) errors.push(`duplicate serviceId: ${s.serviceId}`);
    seen.add(s.serviceId);
    if (!capIds.has(s.capabilityId)) {
      errors.push(`${s.serviceId}: unknown capabilityId ${s.capabilityId}`);
    }
    if (!s.modulePath?.trim()) errors.push(`${s.serviceId}: modulePath required`);
  }
  return errors.length ? validationFail(errors) : validationOk();
}

export function validateVersionRegistry(
  catalogue: EnterpriseRegistryCatalogue = buildEnterpriseRegistryCatalogue(),
): EnterpriseValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();
  for (const v of catalogue.versions) {
    const key = `${v.artifactId}@${v.version}`;
    if (seen.has(key)) errors.push(`duplicate version entry: ${key}`);
    seen.add(key);
    if (!v.artifactId?.trim()) errors.push("artifactId required");
    if (!parseSemVer(v.version) && !/^\d+\.\d+\.\d+/.test(v.version)) {
      warnings.push(`${key}: version is not strict semver`);
    }
  }
  return errors.length ? validationFail(errors, warnings) : validationOk(warnings);
}

export function validateCompanyRegistryConsistency(): EnterpriseValidationResult {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const c of COMPANY_REGISTRY) {
    if (seen.has(c.id)) errors.push(`duplicate company id: ${c.id}`);
    seen.add(c.id);
    if (!c.name?.trim()) errors.push(`${c.id}: name required`);
  }
  return errors.length ? validationFail(errors) : validationOk();
}

export function validatePlatformRegistryConsistency(): EnterpriseValidationResult {
  const errors: string[] = [];
  try {
    const catalogue = buildSeedPlatformCatalogue();
    const seen = new Set<string>();
    for (const p of catalogue) {
      if (seen.has(p.platformId)) errors.push(`duplicate platformId: ${p.platformId}`);
      seen.add(p.platformId);
    }
  } catch (e) {
    errors.push(e instanceof Error ? e.message : String(e));
  }
  return errors.length ? validationFail(errors) : validationOk();
}

/** Cross-registry consistency: services reference capabilities; runtimes list known caps. */
export function validateCrossRegistryConsistency(
  catalogue: EnterpriseRegistryCatalogue = buildEnterpriseRegistryCatalogue(),
): EnterpriseValidationResult {
  const parts = [
    validateCapabilityRegistry(catalogue),
    validateServiceRegistry(catalogue),
    validateVersionRegistry(catalogue),
    validateCompanyRegistryConsistency(),
    validatePlatformRegistryConsistency(),
  ];
  const errors = parts.flatMap((p) => p.errors);
  const warnings = parts.flatMap((p) => p.warnings);

  const capIds = new Set(catalogue.capabilities.map((c) => c.capabilityId));
  for (const r of catalogue.runtimes) {
    for (const cap of r.capabilities) {
      if (!capIds.has(cap)) {
        errors.push(`runtime ${r.runtimeId}: unknown capability ${cap}`);
      }
    }
  }

  return errors.length ? validationFail(errors, warnings) : validationOk(warnings);
}

/** Read-oriented company registry service surface (no writes from consumers). */
export function listCompanyIds(): string[] {
  return COMPANY_REGISTRY.map((c) => c.id);
}

export function getCompanyById(id: string) {
  return COMPANY_REGISTRY.find((c) => c.id === id);
}
