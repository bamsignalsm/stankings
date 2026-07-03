/**
 * Seeds super admin and temp member accounts from environment variables.
 * Safe to re-run — updates passwords and member rows when env values change.
 *
 * Usage: npm run seed:auth
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * Optional: SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD, SEED_MEMBER_EMAIL, SEED_MEMBER_PASSWORD
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvFile(filename) {
  const path = resolve(root, filename);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY."
  );
  process.exit(1);
}

const users = [
  {
    label: "Super admin",
    email: process.env.SUPER_ADMIN_EMAIL ?? "office@stankings.com",
    password: process.env.SUPER_ADMIN_PASSWORD ?? "LIVElife@369",
    fullName: "Stankings Office",
    role: "super_admin",
  },
  {
    label: "Temp member",
    email: process.env.SEED_MEMBER_EMAIL ?? "user@stankings.com",
    password: process.env.SEED_MEMBER_PASSWORD ?? "USERacc@32",
    fullName: "Stankings Member",
    role: "member",
  },
];

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserByEmail(email) {
  const normalized = email.toLowerCase();
  let page = 1;
  const perPage = 200;

  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const match = data.users.find((u) => u.email?.toLowerCase() === normalized);
    if (match) return match;
    if (data.users.length < perPage) return null;
    page += 1;
  }
}

async function upsertUser({ email, password, fullName, role }) {
  const normalized = email.toLowerCase();
  const existing = await findUserByEmail(normalized);
  let userId;

  if (existing) {
    const { data, error } = await admin.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (error) throw error;
    userId = data.user.id;
  } else {
    const { data, error } = await admin.auth.admin.createUser({
      email: normalized,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (error) throw error;
    userId = data.user.id;
  }

  const { error: memberError } = await admin.from("stankings_members").upsert({
    id: userId,
    email: normalized,
    full_name: fullName,
    role,
    status: "approved",
  });

  if (memberError) throw memberError;
  return userId;
}

async function main() {
  console.log("Seeding auth users…\n");

  for (const user of users) {
    if (!user.password) {
      console.warn(`Skipping ${user.label}: password not set in env.`);
      continue;
    }

    const id = await upsertUser(user);
    console.log(`✓ ${user.label}: ${user.email} (${id})`);
  }

  console.log(
    "\nDone. Change SUPER_ADMIN_* and SEED_MEMBER_* in .env.local before go-live, then re-run."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
