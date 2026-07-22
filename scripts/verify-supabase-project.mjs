#!/usr/bin/env node
/**
 * Verify this repository is linked to the Stankings Supabase project only.
 * Reads docs/engineering/PROJECT_IDENTITY.md expected ref and compares to
 * supabase/.temp/project-ref (and config.toml project_id when present).
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const IDENTITY_PATH = resolve(ROOT, "docs/engineering/PROJECT_IDENTITY.md");
const TEMP_REF_PATH = resolve(ROOT, "supabase/.temp/project-ref");
const CONFIG_PATH = resolve(ROOT, "supabase/config.toml");

const requireLinked = process.argv.includes("--require-linked");

function fail(message) {
  console.error(`verify:supabase-project FAILED\n${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`verify:supabase-project OK\n${message}`);
}

function expectedRefFromIdentity() {
  if (!existsSync(IDENTITY_PATH)) {
    fail(`Missing ${IDENTITY_PATH}`);
  }
  const text = readFileSync(IDENTITY_PATH, "utf8");
  const match = text.match(/\|\s*Supabase project ref\s*\|\s*`([a-z0-9]+)`\s*\|/i);
  if (!match) {
    fail("Could not parse Supabase project ref from PROJECT_IDENTITY.md");
  }
  return match[1];
}

function linkedRef() {
  if (!existsSync(TEMP_REF_PATH)) {
    return null;
  }
  return readFileSync(TEMP_REF_PATH, "utf8").trim();
}

function configProjectId() {
  if (!existsSync(CONFIG_PATH)) {
    return null;
  }
  const text = readFileSync(CONFIG_PATH, "utf8");
  const match = text.match(/^\s*project_id\s*=\s*"([^"]+)"/m);
  return match ? match[1] : null;
}

const expected = expectedRefFromIdentity();
const linked = linkedRef();
const configId = configProjectId();

const lines = [`Expected ref (PROJECT_IDENTITY): ${expected}`];

if (linked) {
  lines.push(`Linked ref (.temp/project-ref): ${linked}`);
  if (linked !== expected) {
    fail(
      `${lines.join("\n")}\n\nLinked project does not match Stankings.\nRun: supabase link --project-ref ${expected}`,
    );
  }
} else if (requireLinked) {
  fail(
    `${lines.join("\n")}\n\nNo supabase/.temp/project-ref found.\nRun: supabase link --project-ref ${expected}`,
  );
} else {
  lines.push("Linked ref: (not found — link recommended before migrations)");
}

if (configId) {
  lines.push(`config.toml project_id: ${configId}`);
  if (configId !== expected) {
    fail(`${lines.join("\n")}\n\nconfig.toml project_id mismatch.`);
  }
} else {
  lines.push("config.toml: (not present — optional until local supabase init)");
}

ok(lines.join("\n"));
