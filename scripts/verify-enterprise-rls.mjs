#!/usr/bin/env node
/**
 * Static integrity checks for Shared Enterprise RLS migration.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const forward = resolve(
  root,
  "supabase/migrations/20260722220000_shared_enterprise_rls.sql",
);
const rollback = resolve(
  root,
  "supabase/migrations/rollback/20260722220000_shared_enterprise_rls_rollback.sql",
);

const errors = [];
const tables = [
  "shared_identity_subjects",
  "shared_identity_external_refs",
  "shared_consent_records",
  "shared_consent_history",
  "shared_passport_records",
  "shared_passport_evidence",
  "shared_passport_history",
  "shared_trust_policies",
  "shared_trust_assessments",
  "shared_trust_evidence",
  "shared_trust_history",
  "shared_explainability_records",
  "shared_explainability_history",
];

if (!existsSync(forward)) errors.push(`missing forward: ${forward}`);
if (!existsSync(rollback)) errors.push(`missing rollback: ${rollback}`);

if (existsSync(forward)) {
  const sql = readFileSync(forward, "utf8");
  if (!sql.includes("dfaqkrikdvohvvcuxoek")) {
    errors.push("forward missing Stankings project marker");
  }
  if (/nswiwxmavuqpuzlsascs|hlpojfurfldvcxfxhveg|rnltzcfndsodelfdbaoh/.test(sql)) {
    errors.push("forward references non-Stankings project ref");
  }
  for (const t of tables) {
    if (!sql.includes(t)) errors.push(`forward missing table: ${t}`);
    if (!sql.includes(`ALTER TABLE ${t} ENABLE ROW LEVEL SECURITY`)) {
      errors.push(`forward missing ENABLE RLS for ${t}`);
    }
  }
  if (!sql.includes("REVOKE ALL ON TABLE")) {
    errors.push("forward must revoke anon/authenticated privileges");
  }
  if (!sql.includes("GRANT ALL ON TABLE") || !sql.includes("service_role")) {
    errors.push("forward must grant service_role");
  }
}

if (existsSync(rollback)) {
  const sql = readFileSync(rollback, "utf8");
  if (!sql.includes("DISABLE ROW LEVEL SECURITY")) {
    errors.push("rollback must disable RLS");
  }
}

if (errors.length) {
  console.error("verify:enterprise-rls FAILED");
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}

console.log("verify:enterprise-rls OK");
console.log(`RLS hardening covers ${tables.length} shared_* tables; Stankings-only markers validated.`);
