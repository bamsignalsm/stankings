"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSuperAdmin, getCurrentMember } from "@/lib/members";

async function requireSuperAdmin() {
  const member = await getCurrentMember();
  if (!isSuperAdmin(member)) throw new Error("Unauthorized");
  return member!;
}

export type EmergencyAction =
  | "suspend_workforce"
  | "disable_skl"
  | "force_logout"
  | "revoke_sessions"
  | "strip_grants"
  | "lock_investigation"
  | "suspend_employment"
  | "terminate_employment"
  | "reinstate_employment"
  | "restore_workforce";

export async function executeEmergencyWorkforceAction(formData: FormData) {
  const adminMember = await requireSuperAdmin();
  const admin = createAdminClient();
  const employeeId = String(formData.get("employee_id") ?? "");
  const action = String(formData.get("action") ?? "") as EmergencyAction;
  const reason = String(formData.get("reason") ?? "").trim();

  if (!employeeId || !action || reason.length < 8) {
    throw new Error("Employee, action, and reason (min 8 chars) are required");
  }

  const { data: emp, error } = await admin
    .from("workforce_employees")
    .select("*")
    .eq("id", employeeId)
    .single();
  if (error || !emp) throw new Error(error?.message ?? "Employee not found");

  const previous = {
    status: emp.status,
    skl_access: emp.skl_access,
    locked_pending_investigation: emp.locked_pending_investigation,
  };

  const next: Record<string, unknown> = {};

  switch (action) {
    case "suspend_workforce":
    case "suspend_employment":
      next.status = "suspended";
      next.skl_access = false;
      break;
    case "disable_skl":
      next.skl_access = false;
      break;
    case "lock_investigation":
      next.locked_pending_investigation = true;
      next.skl_access = false;
      break;
    case "terminate_employment":
      next.status = "terminated";
      next.skl_access = false;
      break;
    case "strip_grants":
      await admin.from("workforce_grants").delete().eq("employee_id", employeeId);
      break;
    case "force_logout":
    case "revoke_sessions":
      try {
        await admin.auth.admin.signOut(emp.user_id, "global");
      } catch {
        // Best-effort session revoke — Passport remains intact
      }
      break;
    case "reinstate_employment":
    case "restore_workforce":
      next.status = "active";
      next.skl_access = true;
      next.locked_pending_investigation = false;
      break;
    default:
      throw new Error("Unknown emergency action");
  }

  if (Object.keys(next).length > 0) {
    const { error: upErr } = await admin
      .from("workforce_employees")
      .update(next)
      .eq("id", employeeId);
    if (upErr) throw new Error(upErr.message);
  }

  // Passport intentionally untouched
  await admin.from("workforce_emergency_actions").insert({
    employee_id: employeeId,
    passport_id: emp.passport_id ?? emp.identity_subject_id ?? "unknown",
    subject_id: emp.subject_id ?? emp.identity_subject_id,
    actor_id: adminMember.id,
    action,
    reason,
    previous_state: previous,
    new_state: { ...previous, ...next },
    source: "energy",
  });

  await admin.from("workforce_audit_logs").insert({
    actor_id: adminMember.id,
    action: `workforce.emergency.${action}`,
    entity_type: "workforce_employee",
    entity_id: employeeId,
    payload: {
      reason,
      passportId: emp.passport_id,
      passportPreserved: true,
    },
  });

  revalidatePath("/energy/employees");
  revalidatePath("/energy/skl-monitor");
}

export async function respondToOffer(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const applicationId = String(formData.get("application_id") ?? "");
  const decision = String(formData.get("decision") ?? "");
  if (!applicationId || !["offer_accepted", "offer_rejected"].includes(decision)) {
    throw new Error("Invalid offer response");
  }

  const { data: app } = await supabase
    .from("stankings_career_applications")
    .select("id, email, applicant_id, status")
    .eq("id", applicationId)
    .maybeSingle();

  if (!app) throw new Error("Application not found");
  if (app.applicant_id !== user.id && app.email !== user.email) {
    throw new Error("Not your application");
  }
  if (app.status !== "offer_extended") {
    throw new Error("No open offer on this application");
  }

  const { error } = await supabase
    .from("stankings_career_applications")
    .update({
      status: decision,
      hiring_decision: decision,
    })
    .eq("id", applicationId);
  if (error) throw new Error(error.message);

  revalidatePath("/passport/applicant");
  revalidatePath("/career/applications");
  revalidatePath("/energy/applications");
}
