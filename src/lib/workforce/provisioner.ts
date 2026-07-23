/**
 * Workforce Provisioner — Hire and Invite extend the SAME Stankings Passport.
 * Never create a second identity. Workforce is a capability profile only.
 */

import { createAdminClient } from "@/lib/supabase/admin";
import { ensurePassportForUser } from "@/lib/passport/person";
import { WELCOME_CHECKLIST_DEFAULTS } from "./types";
import type { HierarchyLevel } from "./types";
import { WORKSPACE_PERMISSION_TEMPLATES } from "./rbac";

export interface ProvisionInput {
  source: "hire" | "invite";
  email: string;
  fullName: string;
  companyId: string;
  departmentSlug: string;
  roleKey: string;
  workspaceKey: string;
  hierarchyLevel?: HierarchyLevel;
  permissionKeys?: string[];
  applicationId?: string;
  managerEmployeeId?: string;
  actorMemberId?: string;
  existingUserId?: string;
  temporaryPassword?: string;
  requirePasswordChange?: boolean;
  mfaRequired?: boolean;
}

export interface ProvisionResult {
  ok: boolean;
  employeeId?: string;
  userId?: string;
  identitySubjectId?: string;
  passportId?: string;
  temporaryPassword?: string;
  error?: string;
}

async function resolveOrCreateAuthUser(input: ProvisionInput): Promise<{
  userId?: string;
  temporaryPassword?: string;
  error?: string;
}> {
  const admin = createAdminClient();
  const email = input.email.trim().toLowerCase();

  if (input.existingUserId) {
    return { userId: input.existingUserId };
  }

  const { data: listed } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const existing = listed?.users?.find((u) => u.email?.toLowerCase() === email);
  if (existing) return { userId: existing.id };

  const temp =
    input.temporaryPassword ??
    `Stankings!${Math.random().toString(36).slice(2, 10)}`;

  if (input.source === "invite") {
    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { full_name: input.fullName, workforce: true },
    });
    if (data?.user) return { userId: data.user.id, temporaryPassword: temp };
    // fall through to createUser
    void error;
  }

  const created = await admin.auth.admin.createUser({
    email,
    password: temp,
    email_confirm: true,
    user_metadata: {
      full_name: input.fullName,
      workforce: true,
      must_change_password: true,
    },
  });
  if (created.error || !created.data.user) {
    return { error: created.error?.message ?? "Auth create failed" };
  }
  return { userId: created.data.user.id, temporaryPassword: temp };
}

export async function provisionWorkforceEmployee(
  input: ProvisionInput
): Promise<ProvisionResult> {
  const admin = createAdminClient();
  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();

  if (!email || !fullName || !input.companyId || !input.roleKey) {
    return { ok: false, error: "Missing required provisioning fields" };
  }

  const auth = await resolveOrCreateAuthUser(input);
  if (!auth.userId) return { ok: false, error: auth.error ?? "Auth user missing" };

  const passport = await ensurePassportForUser({
    userId: auth.userId,
    email,
    fullName,
  });
  if (!passport.ok || !passport.link) {
    return { ok: false, error: passport.error ?? "Passport ensure failed" };
  }

  const hierarchyLevel = input.hierarchyLevel ?? "staff";
  const status = input.source === "invite" ? "invited" : "active";

  const mustChange =
    input.requirePasswordChange ?? Boolean(auth.temporaryPassword);
  const { isMfaMandatoryForHierarchy } = await import("@/lib/passport/mfa");
  const mfaRequired =
    input.mfaRequired ?? isMfaMandatoryForHierarchy(hierarchyLevel, input.roleKey);

  if (mustChange || mfaRequired) {
    await admin
      .from("passport_person_links")
      .update({
        must_change_password: mustChange,
        mfa_required: mfaRequired,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", auth.userId);
  }

  await admin.from("stankings_members").upsert(
    {
      id: auth.userId,
      email,
      full_name: fullName,
      role: "member",
      status: "approved",
    },
    { onConflict: "id" }
  );

  const { data: existingEmp } = await admin
    .from("workforce_employees")
    .select("id")
    .eq("user_id", auth.userId)
    .eq("company_id", input.companyId)
    .maybeSingle();

  let employeeId = existingEmp?.id as string | undefined;

  const empPayload = {
    full_name: fullName,
    email,
    department_slug: input.departmentSlug,
    team_slug: "core",
    role_key: input.roleKey,
    workspace_key: input.workspaceKey,
    hierarchy_level: hierarchyLevel,
    manager_employee_id: input.managerEmployeeId ?? null,
    status: status === "invited" ? "invited" : "active",
    identity_subject_id: passport.link.subject_id,
    subject_id: passport.link.subject_id,
    passport_id: passport.link.passport_id,
    application_id: input.applicationId ?? null,
    source: input.source,
    skl_access: true,
    must_change_password: mustChange,
    locked_pending_investigation: false,
  };

  if (employeeId) {
    await admin.from("workforce_employees").update(empPayload).eq("id", employeeId);
  } else {
    const { data: inserted, error: empErr } = await admin
      .from("workforce_employees")
      .insert({
        user_id: auth.userId,
        ...empPayload,
      })
      .select("id")
      .single();
    if (empErr || !inserted) {
      return { ok: false, error: empErr?.message ?? "Employee insert failed" };
    }
    employeeId = inserted.id;
  }

  if (input.applicationId) {
    await admin
      .from("stankings_career_applications")
      .update({
        passport_id: passport.link.passport_id,
        status: "hired",
        hiring_decision: "hired",
      })
      .eq("id", input.applicationId);
  }

  const perms =
    input.permissionKeys ??
    WORKSPACE_PERMISSION_TEMPLATES[input.workspaceKey] ??
    ["office.access", "tasks.read"];

  await admin.from("workforce_grants").delete().eq("employee_id", employeeId);
  await admin.from("workforce_grants").insert(
    perms.map((permission_key) => ({
      employee_id: employeeId,
      permission_key,
      granted_by: input.actorMemberId ?? null,
    }))
  );

  await admin.from("workforce_welcome_checklist").delete().eq("employee_id", employeeId);
  await admin.from("workforce_welcome_checklist").insert(
    WELCOME_CHECKLIST_DEFAULTS.map((item) => ({
      employee_id: employeeId,
      item_key: item.item_key,
      label: item.label,
      completed: false,
    }))
  );

  await admin.from("workforce_notifications").insert({
    employee_id: employeeId,
    title: "Welcome to SKL Workforce",
    body: `Your ${input.roleKey} workspace is ready on your Stankings Passport. Open /skl to begin.`,
  });

  await admin.from("workforce_audit_logs").insert({
    actor_id: input.actorMemberId ?? null,
    action: input.source === "hire" ? "workforce.hire" : "workforce.invite",
    entity_type: "workforce_employee",
    entity_id: employeeId,
    payload: {
      email,
      companyId: input.companyId,
      roleKey: input.roleKey,
      workspaceKey: input.workspaceKey,
      passportId: passport.link.passport_id,
      subjectId: passport.link.subject_id,
      identityPreserved: true,
    },
  });

  return {
    ok: true,
    employeeId,
    userId: auth.userId,
    identitySubjectId: passport.link.subject_id,
    passportId: passport.link.passport_id,
    temporaryPassword: auth.temporaryPassword,
  };
}
