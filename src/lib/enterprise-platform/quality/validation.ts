/**
 * Shared validation result convention — every runtime validator uses this shape.
 */

export interface EnterpriseValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validationOk(warnings: string[] = []): EnterpriseValidationResult {
  return { valid: true, errors: [], warnings };
}

export function validationFail(
  errors: string[],
  warnings: string[] = [],
): EnterpriseValidationResult {
  return { valid: errors.length === 0, errors, warnings };
}

export function mergeValidationResults(
  ...results: EnterpriseValidationResult[]
): EnterpriseValidationResult {
  const errors = results.flatMap((r) => r.errors);
  const warnings = results.flatMap((r) => r.warnings);
  return { valid: errors.length === 0, errors, warnings };
}
