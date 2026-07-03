import { createClient } from "@supabase/supabase-js";

export interface SeedUserConfig {
  email: string;
  password: string;
  fullName: string;
  role: "super_admin" | "member";
}

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase admin credentials");
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function upsertAuthUser(config: SeedUserConfig): Promise<string> {
  const admin = createAdminClient();
  const email = config.email.toLowerCase();

  const { data: listed } = await admin.auth.admin.listUsers();
  const existing = listed.users.find((u) => u.email?.toLowerCase() === email);

  let userId: string;

  if (existing) {
    const { data, error } = await admin.auth.admin.updateUserById(existing.id, {
      password: config.password,
      email_confirm: true,
      user_metadata: { full_name: config.fullName },
    });
    if (error) throw error;
    userId = data.user.id;
  } else {
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password: config.password,
      email_confirm: true,
      user_metadata: { full_name: config.fullName },
    });
    if (error) throw error;
    userId = data.user.id;
  }

  const { error: memberError } = await admin.from("stankings_members").upsert({
    id: userId,
    email,
    full_name: config.fullName,
    role: config.role,
    status: "approved",
  });

  if (memberError) throw memberError;

  return userId;
}

export async function bootstrapSuperAdmin(
  userId: string,
  email: string,
  fullName?: string
) {
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL?.toLowerCase();
  if (!superAdminEmail || email.toLowerCase() !== superAdminEmail) return;

  const admin = createAdminClient();
  await admin.from("stankings_members").upsert({
    id: userId,
    email,
    full_name: fullName ?? "",
    role: "super_admin",
    status: "approved",
  });
}
