import { createClient } from "@/lib/supabase/server";
import type { StankingsMember } from "@/lib/types";

export async function getCurrentMember(): Promise<StankingsMember | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("stankings_members")
    .select("*")
    .eq("id", user.id)
    .single();

  return data as StankingsMember | null;
}

export function isApprovedMember(member: StankingsMember | null): boolean {
  return member?.status === "approved";
}

export function isSuperAdmin(member: StankingsMember | null): boolean {
  return (
    member?.role === "super_admin" && member?.status === "approved"
  );
}
