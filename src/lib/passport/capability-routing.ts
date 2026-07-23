/**
 * Canonical post-auth capability routing.
 * Identity never chooses a destination — capabilities do.
 *
 * Priority:
 * 1. Founder / super_admin → Energy
 * 2. Executive (ceo) → /skl/executive (placeholder)
 * 3. Company Head → /skl/company (placeholder)
 * 4. Employee / Manager → /skl
 * 5. Pending Passport recovery → /passport/recovery
 * 6. Applicant (active applications, not employed) → /passport/applicant
 * 7. Approved public member → /library
 * 8. Pending membership → /auth/pending-approval
 * 9. Default → /passport/applicant
 */

import { ENERGY_HOME_PATH, resolveEnergyNext } from "@/lib/auth-paths";

/** Supabase client surface (browser, server, or middleware SSR client). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CapabilityQueryClient = { from: (table: string) => any };

export type CapabilityRoute =
  | "energy"
  | "executive"
  | "company_head"
  | "skl"
  | "recovery"
  | "applicant"
  | "library"
  | "pending_approval";

export const CAPABILITY_ROUTE_PATHS: Record<CapabilityRoute, string> = {
  energy: ENERGY_HOME_PATH,
  executive: "/skl/executive",
  company_head: "/skl/company",
  skl: "/skl",
  recovery: "/passport/recovery",
  applicant: "/passport/applicant",
  library: "/library",
  pending_approval: "/auth/pending-approval",
};

/**
 * Honour deep-links only within the capability home zone.
 * Never downgrade an applicant to /library via ?next=.
 */
export function applyCapabilityNext(
  canonicalPath: string,
  next: string | null | undefined
): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return canonicalPath;
  }

  if (
    canonicalPath === ENERGY_HOME_PATH ||
    canonicalPath.startsWith(`${ENERGY_HOME_PATH}/`)
  ) {
    return resolveEnergyNext(next);
  }

  if (canonicalPath === "/skl" || canonicalPath.startsWith("/skl/")) {
    if (next === "/skl" || next.startsWith("/skl/")) return next;
    return canonicalPath;
  }

  if (canonicalPath.startsWith("/passport/")) {
    if (next.startsWith("/passport/")) return next;
    return canonicalPath;
  }

  if (canonicalPath === "/library") {
    if (next === "/library" || next.startsWith("/library/")) return next;
    if (
      next.startsWith("/career") ||
      next.startsWith("/companies") ||
      next.startsWith("/about")
    ) {
      return next;
    }
    return canonicalPath;
  }

  return canonicalPath;
}

export async function resolveCapabilityRoute(
  supabase: CapabilityQueryClient,
  userId: string,
  options?: { email?: string | null }
): Promise<{ route: CapabilityRoute; path: string }> {
  const email = options?.email?.trim().toLowerCase() || null;

  const { data: member } = await supabase
    .from("stankings_members")
    .select("status, role")
    .eq("id", userId)
    .maybeSingle();

  if (member?.role === "super_admin" && member?.status === "approved") {
    return { route: "energy", path: CAPABILITY_ROUTE_PATHS.energy };
  }

  const { data: employee } = await supabase
    .from("workforce_employees")
    .select(
      "id, status, skl_access, locked_pending_investigation, hierarchy_level"
    )
    .eq("user_id", userId)
    .in("status", ["active", "invited"])
    .eq("skl_access", true)
    .limit(1)
    .maybeSingle();

  if (employee && !employee.locked_pending_investigation) {
    const level = String(employee.hierarchy_level ?? "staff");
    if (level === "ceo") {
      return { route: "executive", path: CAPABILITY_ROUTE_PATHS.executive };
    }
    if (level === "company_head") {
      return {
        route: "company_head",
        path: CAPABILITY_ROUTE_PATHS.company_head,
      };
    }
    return { route: "skl", path: CAPABILITY_ROUTE_PATHS.skl };
  }

  const { data: recovery } = await supabase
    .from("passport_recovery_cases")
    .select("id")
    .eq("requesting_user_id", userId)
    .eq("status", "pending_admin_review")
    .limit(1)
    .maybeSingle();

  if (recovery?.id) {
    return { route: "recovery", path: CAPABILITY_ROUTE_PATHS.recovery };
  }

  const { data: link } = await supabase
    .from("passport_person_links")
    .select("passport_id, email")
    .eq("user_id", userId)
    .maybeSingle();

  const linkPassport = link?.passport_id ? String(link.passport_id) : null;
  const linkEmail = link?.email ? String(link.email) : email;

  const orParts = [
    `applicant_id.eq.${userId}`,
    linkPassport ? `passport_id.eq.${linkPassport}` : null,
    linkEmail ? `email.eq.${linkEmail}` : null,
  ].filter(Boolean) as string[];

  if (orParts.length > 0) {
    const { count } = await supabase
      .from("stankings_career_applications")
      .select("*", { count: "exact", head: true })
      .or(orParts.join(","));

    if ((count ?? 0) > 0) {
      return { route: "applicant", path: CAPABILITY_ROUTE_PATHS.applicant };
    }
  }

  if (member?.status === "approved") {
    return { route: "library", path: CAPABILITY_ROUTE_PATHS.library };
  }

  if (member && member.status !== "approved") {
    return {
      route: "pending_approval",
      path: CAPABILITY_ROUTE_PATHS.pending_approval,
    };
  }

  return { route: "applicant", path: CAPABILITY_ROUTE_PATHS.applicant };
}

export async function resolvePostAuthDestination(
  supabase: CapabilityQueryClient,
  userId: string,
  options?: { email?: string | null; next?: string | null }
): Promise<string> {
  const { path } = await resolveCapabilityRoute(supabase, userId, {
    email: options?.email,
  });
  return applyCapabilityNext(path, options?.next);
}
