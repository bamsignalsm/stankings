import { createClient } from "@/lib/supabase/server";
import type { WorkforceEmployee } from "./types";

export async function getEmployeeByUserId(
  userId: string
): Promise<WorkforceEmployee | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("workforce_employees")
    .select("*")
    .eq("user_id", userId)
    .in("status", ["active", "invited"])
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return (data as WorkforceEmployee | null) ?? null;
}

export async function getCurrentEmployee(): Promise<WorkforceEmployee | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return getEmployeeByUserId(user.id);
}

export async function isActiveEmployee(userId: string): Promise<boolean> {
  const emp = await getEmployeeByUserId(userId);
  return emp?.status === "active" || emp?.status === "invited";
}

export async function listEmployees(companyId?: string): Promise<WorkforceEmployee[]> {
  const supabase = await createClient();
  let q = supabase.from("workforce_employees").select("*").order("created_at", {
    ascending: false,
  });
  if (companyId) q = q.eq("company_id", companyId);
  const { data } = await q;
  return (data as WorkforceEmployee[]) ?? [];
}

export async function getEmployeeGrants(employeeId: string): Promise<Set<string>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("workforce_grants")
    .select("permission_key")
    .eq("employee_id", employeeId);
  return new Set((data ?? []).map((r) => r.permission_key as string));
}
