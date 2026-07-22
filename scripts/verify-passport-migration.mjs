#!/usr/bin/env node
/**
 * Static integrity checks for Shared Passport migration files.
 * Does not apply migrations.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const forward = resolve(
  root,
  "supabase/migrations/20260722160000_shared_passport_persistence.sql",
);
const rollback = resolve(
  root,
  "supabase/migrations/rollback/20260722160000_shared_passport_persistence_rollback.sql",
);

const errors = [];

if (!existsSync(forward)) errors.push(`missing forward migration: ${forward}`);
if (!existsSync(rollback)) errors.push(`missing rollback: ${rollback}`);

if (existsSync(forward)) {
  const sql = readFileSync(forward, "utf8");
  for (const needle of [
    "shared_passport_records",
    "shared_passport_evidence",
    "shared_passport_history",
    "dfaqkrikdvohvvcuxoek",
    "passport_id",
    "subject_id",
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
  if (!sql.includes("DROP TABLE IF EXISTS shared_passport_history")) {
    errors.push("rollback must drop history first (FK order)");
  }
  if (!sql.includes("DROP TABLE IF EXISTS shared_passport_evidence")) {
    errors.push("rollback must drop evidence before records");
  }
  if (!sql.includes("DROP TABLE IF EXISTS shared_passport_records")) {
    errors.push("rollback must drop records");
  }
}

if (errors.length) {
  console.error("verify:passport-migration FAILED");
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}

console.log("verify:passport-migration OK");
console.log("Forward + rollback present; Stankings-only markers validated. Do not apply until review.");
