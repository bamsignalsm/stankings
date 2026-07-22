#!/usr/bin/env node
/**
 * Static platform certification probe — migrations + gate inventory markers.
 * Does not apply migrations or mutate remote state.
 */

import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const errors = [];

const migrations = [
  "20260722120000_shared_identity_persistence.sql",
  "20260722140000_shared_consent_persistence.sql",
  "20260722160000_shared_passport_persistence.sql",
  "20260722180000_shared_trust_persistence.sql",
  "20260722200000_shared_explainability_persistence.sql",
];

for (const name of migrations) {
  const forward = resolve(root, "supabase/migrations", name);
  const rollback = resolve(
    root,
    "supabase/migrations/rollback",
    name.replace(".sql", "_rollback.sql"),
  );
  if (!existsSync(forward)) errors.push(`missing migration: ${name}`);
  if (!existsSync(rollback)) errors.push(`missing rollback: ${name}`);
}

const verifyScripts = [
  "verify:identity-migration",
  "verify:consent-migration",
  "verify:passport-migration",
  "verify:trust-migration",
  "verify:explainability-migration",
];

for (const script of verifyScripts) {
  const result = spawnSync("npm", ["run", script], {
    cwd: root,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    errors.push(`${script} failed: ${result.stderr || result.stdout}`);
  }
}

if (errors.length) {
  console.error("verify:platform-certification FAILED");
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}

console.log("verify:platform-certification OK");
console.log("All core migrations + rollback + verify scripts present and green.");
console.log("Run assessPlatformCertification() / npm test for executable certification.");
