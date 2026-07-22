/**
 * Contract catalogue + negotiation + validation.
 */

import {
  checkContractCompatibility,
  parseSemVer,
} from "@/lib/enterprise-platform/quality/versioning";
import {
  validationFail,
  validationOk,
  type EnterpriseValidationResult,
} from "@/lib/enterprise-platform/quality/validation";
import type {
  ContractNegotiationRequest,
  ContractNegotiationResult,
  EnterpriseContractMeta,
} from "./types";
import { IDENTITY_PUBLIC_CONTRACT } from "./identity-contract";
import {
  CONSENT_PUBLIC_CONTRACT,
  DISCOVERY_PUBLIC_CONTRACT,
  GOVERNANCE_PUBLIC_CONTRACT,
} from "./discovery-contract";
import { PASSPORT_PUBLIC_CONTRACT } from "./passport-contract";

const CONTRACTS: EnterpriseContractMeta[] = [
  IDENTITY_PUBLIC_CONTRACT,
  DISCOVERY_PUBLIC_CONTRACT,
  CONSENT_PUBLIC_CONTRACT,
  PASSPORT_PUBLIC_CONTRACT,
  GOVERNANCE_PUBLIC_CONTRACT,
];

export function listEnterpriseContracts(): EnterpriseContractMeta[] {
  return [...CONTRACTS];
}

export function getEnterpriseContract(
  contractId: string,
): EnterpriseContractMeta | undefined {
  return CONTRACTS.find((c) => c.contractId === contractId);
}

export function registerEnterpriseContract(
  contract: EnterpriseContractMeta,
  catalogue: EnterpriseContractMeta[] = CONTRACTS,
): { ok: true; catalogue: EnterpriseContractMeta[] } | { ok: false; errors: string[] } {
  const check = validateEnterpriseContract(contract);
  if (!check.valid) return { ok: false, errors: check.errors };
  if (catalogue.some((c) => c.contractId === contract.contractId && c.version === contract.version)) {
    return { ok: false, errors: [`duplicate contract ${contract.contractId}@${contract.version}`] };
  }
  // Mutate default catalogue when using default
  if (catalogue === CONTRACTS) {
    const idx = CONTRACTS.findIndex((c) => c.contractId === contract.contractId);
    if (idx >= 0) CONTRACTS[idx] = contract;
    else CONTRACTS.push(contract);
    return { ok: true, catalogue: [...CONTRACTS] };
  }
  return { ok: true, catalogue: [...catalogue, contract] };
}

export function validateEnterpriseContract(
  contract: EnterpriseContractMeta,
): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!/^[a-z][a-z0-9._-]{2,128}$/.test(contract.contractId ?? "")) {
    errors.push("contractId must be dotted/kebab machine id");
  }
  if (!contract.name?.trim()) errors.push("name is required");
  if (!contract.capabilityId?.trim()) errors.push("capabilityId is required");
  if (!parseSemVer(contract.version)) errors.push("version must be semver");
  if (!contract.docsPath?.trim()) errors.push("docsPath is required");
  if (!contract.publicModulePath?.trim()) errors.push("publicModulePath is required");
  if (contract.status === "deprecated" && !contract.deprecatedInVersion) {
    errors.push("deprecated contracts require deprecatedInVersion");
  }
  return errors.length ? validationFail(errors) : validationOk();
}

export function negotiateContract(
  request: ContractNegotiationRequest,
  catalogue: EnterpriseContractMeta[] = listEnterpriseContracts(),
): ContractNegotiationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!request.consumerPlatformId?.trim()) errors.push("consumerPlatformId required");
  const contract = catalogue.find((c) => c.contractId === request.requestedContractId);
  if (!contract) {
    return {
      ok: false,
      errors: [...errors, `unknown contract: ${request.requestedContractId}`],
      warnings,
    };
  }
  if (contract.status === "retired") {
    return { ok: false, errors: [`contract retired: ${contract.contractId}`], warnings };
  }
  if (contract.status === "deprecated") {
    warnings.push(
      `contract deprecated since ${contract.deprecatedInVersion}; replacement=${contract.replacementContractId ?? "n/a"}`,
    );
  }
  const compat = checkContractCompatibility(request.declaredVersion, contract.version);
  if (!compat.compatible) {
    return {
      ok: false,
      contract,
      errors: [...errors, compat.reason ?? "incompatible contract version"],
      warnings,
    };
  }
  const declared = parseSemVer(request.declaredVersion);
  if (declared && !contract.compatibleMajors.includes(declared.major)) {
    return {
      ok: false,
      contract,
      errors: [...errors, `major ${declared.major} not in compatibleMajors`],
      warnings,
    };
  }
  return {
    ok: true,
    contract,
    errors: [],
    warnings,
    negotiatedVersion: contract.version,
  };
}
