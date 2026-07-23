/**
 * Passport recovery — identity continuity without duplicate Passports.
 *
 * Policy:
 * - Never create a second Passport for the same email.
 * - Never auto-bind a new Auth account to an existing Passport.
 * - Detect collision → open recovery case → admin verifies → optional rebind.
 * - Future self-service can reuse the same case model.
 */

import { createAdminClient } from "@/lib/supabase/admin";

export type PassportRecoveryStatus =
  | "pending_admin_review"
  | "approved"
  | "rejected"
  | "cancelled";

export interface PassportRecoveryCase {
  id: string;
  existing_passport_id: string;
  existing_subject_id: string | null;
  existing_user_id: string;
  requesting_user_id: string;
  email: string;
  status: PassportRecoveryStatus;
  reason: string | null;
  created_at: string;
}

export interface EnsurePassportResult {
  ok: boolean;
  link?: {
    user_id: string;
    subject_id: string;
    passport_id: string;
    email: string;
    full_name: string | null;
    must_change_password: boolean;
    mfa_required: boolean;
  };
  created?: boolean;
  error?: string;
  recoveryRequired?: boolean;
  recoveryCaseId?: string;
}

/**
 * Open or reuse a pending recovery case. Never binds Auth → Passport.
 */
export async function openPassportRecoveryCase(input: {
  email: string;
  requestingUserId: string;
  existingPassportId: string;
  existingSubjectId: string | null;
  existingUserId: string;
  reason?: string;
  source?: string;
}): Promise<{ ok: boolean; caseId?: string; error?: string }> {
  const admin = createAdminClient();
  const email = input.email.trim().toLowerCase();

  const { data: existing } = await admin
    .from("passport_recovery_cases")
    .select("id")
    .eq("requesting_user_id", input.requestingUserId)
    .eq("existing_passport_id", input.existingPassportId)
    .eq("status", "pending_admin_review")
    .maybeSingle();

  if (existing?.id) {
    return { ok: true, caseId: existing.id };
  }

  const { data: inserted, error } = await admin
    .from("passport_recovery_cases")
    .insert({
      existing_passport_id: input.existingPassportId,
      existing_subject_id: input.existingSubjectId,
      existing_user_id: input.existingUserId,
      requesting_user_id: input.requestingUserId,
      email,
      status: "pending_admin_review",
      reason:
        input.reason ??
        "Authentication account conflict — Passport exists for this email under a different Auth user",
      source: input.source ?? "ensure_passport",
    })
    .select("id")
    .single();

  if (error || !inserted) {
    return { ok: false, error: error?.message ?? "Recovery case insert failed" };
  }

  await admin.from("workforce_audit_logs").insert({
    actor_id: input.requestingUserId,
    action: "passport.recovery.opened",
    entity_type: "passport_recovery_case",
    entity_id: inserted.id,
    payload: {
      email,
      existingPassportId: input.existingPassportId,
      existingUserId: input.existingUserId,
      requestingUserId: input.requestingUserId,
      autoBind: false,
      duplicatePassportPrevented: true,
      source: input.source ?? "ensure_passport",
    },
  });

  return { ok: true, caseId: inserted.id };
}

/**
 * Admin-only: rebind Passport person link to the requesting Auth user.
 * Does not issue a new Passport. Does not delete the Passport.
 */
export async function approvePassportRecovery(input: {
  caseId: string;
  actorMemberId: string;
  notes?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const admin = createAdminClient();

  const { data: recoveryCase, error } = await admin
    .from("passport_recovery_cases")
    .select("*")
    .eq("id", input.caseId)
    .single();

  if (error || !recoveryCase) {
    return { ok: false, error: error?.message ?? "Recovery case not found" };
  }
  if (recoveryCase.status !== "pending_admin_review") {
    return { ok: false, error: "Case is not pending review" };
  }

  const previousUserId = recoveryCase.existing_user_id as string;
  const nextUserId = recoveryCase.requesting_user_id as string;
  const passportId = recoveryCase.existing_passport_id as string;
  const subjectId = recoveryCase.existing_subject_id as string | null;
  const email = String(recoveryCase.email).toLowerCase();

  const { data: oldLink } = await admin
    .from("passport_person_links")
    .select("*")
    .eq("user_id", previousUserId)
    .maybeSingle();

  if (!oldLink || oldLink.passport_id !== passportId) {
    return {
      ok: false,
      error: "Existing Passport link not found for recovery case",
    };
  }

  // Move link: delete old PK row, insert for requesting user (same Passport)
  const { error: delErr } = await admin
    .from("passport_person_links")
    .delete()
    .eq("user_id", previousUserId);
  if (delErr) return { ok: false, error: delErr.message };

  const { error: insErr } = await admin.from("passport_person_links").insert({
    user_id: nextUserId,
    subject_id: oldLink.subject_id,
    passport_id: oldLink.passport_id,
    email,
    full_name: oldLink.full_name,
    must_change_password: oldLink.must_change_password,
    mfa_required: true, // force MFA re-check after recovery
  });
  if (insErr) {
    // Best-effort restore
    await admin.from("passport_person_links").insert(oldLink);
    return { ok: false, error: insErr.message };
  }

  await admin.from("shared_identity_external_refs").upsert(
    {
      ref_key: `stankings-hq-auth:${nextUserId}`,
      system: "stankings-hq-auth",
      external_id: nextUserId,
      subject_id: oldLink.subject_id,
      linked: true,
    },
    { onConflict: "ref_key" }
  );

  // Point workforce profiles at new Auth user when they matched old binding
  await admin
    .from("workforce_employees")
    .update({ user_id: nextUserId })
    .eq("user_id", previousUserId)
    .eq("passport_id", passportId);

  await admin
    .from("passport_recovery_cases")
    .update({
      status: "approved",
      resolved_at: new Date().toISOString(),
      resolved_by: input.actorMemberId,
      resolution_notes: input.notes ?? "Admin verified identity and rebound Auth",
    })
    .eq("id", input.caseId);

  await admin.from("workforce_audit_logs").insert({
    actor_id: input.actorMemberId,
    action: "passport.recovery.approved",
    entity_type: "passport_recovery_case",
    entity_id: input.caseId,
    payload: {
      passportId,
      subjectId,
      previousUserId,
      nextUserId,
      email,
      previousState: { user_id: previousUserId },
      newState: { user_id: nextUserId },
      passportPreserved: true,
      duplicatePassportPrevented: true,
    },
  });

  return { ok: true };
}

export async function rejectPassportRecovery(input: {
  caseId: string;
  actorMemberId: string;
  notes?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const admin = createAdminClient();

  const { data: recoveryCase, error } = await admin
    .from("passport_recovery_cases")
    .select("id, status")
    .eq("id", input.caseId)
    .single();

  if (error || !recoveryCase) {
    return { ok: false, error: error?.message ?? "Recovery case not found" };
  }
  if (recoveryCase.status !== "pending_admin_review") {
    return { ok: false, error: "Case is not pending review" };
  }

  await admin
    .from("passport_recovery_cases")
    .update({
      status: "rejected",
      resolved_at: new Date().toISOString(),
      resolved_by: input.actorMemberId,
      resolution_notes: input.notes ?? "Admin rejected recovery request",
    })
    .eq("id", input.caseId);

  await admin.from("workforce_audit_logs").insert({
    actor_id: input.actorMemberId,
    action: "passport.recovery.rejected",
    entity_type: "passport_recovery_case",
    entity_id: input.caseId,
    payload: {
      notes: input.notes ?? null,
      passportPreserved: true,
      autoBind: false,
    },
  });

  return { ok: true };
}
