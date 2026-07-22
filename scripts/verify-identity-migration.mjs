#!/usr/bin/env node
/**
 * Static integrity checks for Shared Identity migration files.
 * Does not apply migrations. Does not connect to the database.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const forward = resolve(
  root,
  "supabase/migrations/20260722120000_shared_identity_persistence.sql",
);
const rollback = resolve(
  root,
  "supabase/migrations/rollback/20260722120000_shared_identity_persistence_rollback.sql",
);

const errors = [];

if (!existsSync(forward)) errors.push(`missing forward migration: ${forward}`);
if (!existsSync(rollback)) errors.push(`missing rollback: ${rollback}`);

if (existsSync(forward)) {
  const sql = readFileSync(forward, "utf8");
  for (const needle of [
    "shared_identity_subjects",
    "shared_identity_external_refs",
    "dfaqkrikdvohvvcuxoek",
    "subject_id",
    "ref_key",
  ]) {
    if (!sql.includes(needle)) errors.push(`forward migration missing marker: ${needle}`);
  }
  if (/nswiwxmavuqpuzlsascs|hlpojfurfldvcxfxhveg|rnltzcfndsodelfdbaoh/.test(sql)) {
    errors.push("forward migration references a non-Stankings project ref");
  }
}

if (existsSync(rollback)) {
  const sql = readFileSync(rollback, "utf8");
  if (!sql.includes("DROP TABLE IF EXISTS shared_identity_external_refs")) {
    errors.push("rollback must drop external_refs first (FK order)");
  }
  if (!sql.includes("DROP TABLE IF EXISTS shared_identity_subjects")) {
    errors.push("rollback must drop subjects");
  }
}

if (errors.length) {
  console.error("verify:identity-migration FAILED");
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}

console.log("verify:identity-migration OK");
console.log("Forward + rollback present; Stankings-only markers validated.");
console.log("Apply only after architectural approval and linked-project verify.");
