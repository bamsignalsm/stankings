#!/usr/bin/env node
/**
 * Static integrity checks for Shared Trust migration files.
 * Does not apply migrations.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const forward = resolve(
  root,
  "supabase/migrations/20260722180000_shared_trust_persistence.sql",
);
const rollback = resolve(
  root,
  "supabase/migrations/rollback/20260722180000_shared_trust_persistence_rollback.sql",
);

const errors = [];

if (!existsSync(forward)) errors.push(`missing forward migration: ${forward}`);
if (!existsSync(rollback)) errors.push(`missing rollback: ${rollback}`);

if (existsSync(forward)) {
  const sql = readFileSync(forward, "utf8");
  for (const needle of [
    "shared_trust_assessments",
    "shared_trust_evidence",
    "shared_trust_history",
    "shared_trust_policies",
    "dfaqkrikdvohvvcuxoek",
    "assessment_id",
    "passport_id",
  ]) {
    if (!sql.includes(needle)) errors.push(`forward migration missing marker: ${needle}`);
  }
  if (/nswiwxmavuqpuzlsascs|hlpojfurfldvcxfxhveg|rnltzcfndsodelfdbaoh/.test(sql)) {
    errors.push("forward migration references a non-Stankings project ref");
  }
  if (!sql.includes("Do NOT apply until architectural review")) {
    errors.push("forward migration must retain apply-after-review guard comment");
  }
}

if (existsSync(rollback)) {
  const sql = readFileSync(rollback, "utf8");
  for (const needle of [
    "DROP TABLE IF EXISTS shared_trust_history",
    "DROP TABLE IF EXISTS shared_trust_evidence",
    "DROP TABLE IF EXISTS shared_trust_assessments",
    "DROP TABLE IF EXISTS shared_trust_policies",
  ]) {
    if (!sql.includes(needle)) errors.push(`rollback missing: ${needle}`);
  }
}

if (errors.length) {
  console.error("verify:trust-migration FAILED");
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}

console.log("verify:trust-migration OK");
console.log("Forward + rollback present; Stankings-only markers validated. Do not apply until review.");
