#!/usr/bin/env node
/**
 * Static integrity checks for Shared Explainability migration files.
 * Does not apply migrations.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const forward = resolve(
  root,
  "supabase/migrations/20260722200000_shared_explainability_persistence.sql",
);
const rollback = resolve(
  root,
  "supabase/migrations/rollback/20260722200000_shared_explainability_persistence_rollback.sql",
);

const errors = [];

if (!existsSync(forward)) errors.push(`missing forward migration: ${forward}`);
if (!existsSync(rollback)) errors.push(`missing rollback: ${rollback}`);

if (existsSync(forward)) {
  const sql = readFileSync(forward, "utf8");
  for (const needle of [
    "shared_explainability_records",
    "shared_explainability_history",
    "dfaqkrikdvohvvcuxoek",
    "explanation_id",
    "decision_ref",
    "human_summary",
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
  if (!sql.includes("DROP TABLE IF EXISTS shared_explainability_history")) {
    errors.push("rollback must drop history first");
  }
  if (!sql.includes("DROP TABLE IF EXISTS shared_explainability_records")) {
    errors.push("rollback must drop records");
  }
}

if (errors.length) {
  console.error("verify:explainability-migration FAILED");
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}

console.log("verify:explainability-migration OK");
console.log("Forward + rollback present; Stankings-only markers validated. Do not apply until review.");
