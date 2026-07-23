/**
 * Lifetime Stankings Passport binding — Auth ↔ Subject ↔ Passport.
 * One person = one Passport forever. Never create a second Passport for role changes.
 */

import { createAdminClient } from "@/lib/supabase/admin";
import {
  activateIdentitySubject,
  createIdentitySubject,
} from "@/lib/shared-runtime/identity";
import {
  PassportRegistry,
  createSupabasePassportStore,
} from "@/lib/enterprise-platform/passport";
import { openPassportRecoveryCase } from "./recovery";
import type { EnsurePassportResult } from "./recovery";

export type { EnsurePassportResult };

export interface PassportPersonLink {
  user_id: string;
  subject_id: string;
  passport_id: string;
  email: string;
  full_name: string | null;
  must_change_password: boolean;
  mfa_required: boolean;
}

export async function getPassportLinkByUserId(
  userId: string
): Promise<PassportPersonLink | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("passport_person_links")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  return (data as PassportPersonLink | null) ?? null;
}

export async function getPassportLinkByEmail(
  email: string
): Promise<PassportPersonLink | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("passport_person_links")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();
  return (data as PassportPersonLink | null) ?? null;
}

/**
 * Ensure the user has exactly one lifetime Passport.
 * Idempotent — never issues a second Passport for the same Auth user.
 * Email collision with a different Auth user → recovery case (never auto-bind).
 */
export async function ensurePassportForUser(input: {
  userId: string;
  email: string;
  fullName?: string | null;
}): Promise<EnsurePassportResult> {
  const admin = createAdminClient();
  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName?.trim() || null;

  const existing = await getPassportLinkByUserId(input.userId);
  if (existing) {
    if (fullName && existing.full_name !== fullName) {
      await admin
        .from("passport_person_links")
        .update({ full_name: fullName, updated_at: new Date().toISOString() })
        .eq("user_id", input.userId);
    }
    return { ok: true, link: existing, created: false };
  }

  const byEmail = await getPassportLinkByEmail(email);
  if (byEmail && byEmail.user_id !== input.userId) {
    const recovery = await openPassportRecoveryCase({
      email,
      requestingUserId: input.userId,
      existingPassportId: byEmail.passport_id,
      existingSubjectId: byEmail.subject_id,
      existingUserId: byEmail.user_id,
      reason:
        "Duplicate identity attempt: email already bound to an existing Stankings Passport",
      source: "ensure_passport",
    });

    return {
      ok: false,
      recoveryRequired: true,
      recoveryCaseId: recovery.caseId,
      error:
        recovery.error ??
        "A Stankings Passport already exists for this email. Recovery required — no second Passport was created.",
    };
  }

  let subject = createIdentitySubject({
    kind: "person",
    displayLabel: fullName ?? email,
    externalRefs: [
      { system: "stankings-hq-auth", externalId: input.userId, linked: true },
    ],
    metadata: { email, source: "hq.passport.ensure" },
  });
  subject = activateIdentitySubject(subject);

  const now = new Date().toISOString();
  const { error: subErr } = await admin.from("shared_identity_subjects").upsert({
    subject_id: subject.subjectId,
    kind: subject.kind,
    state: subject.state,
    authority: subject.authority,
    version: subject.version,
    schema_version: 1,
    created_at: subject.createdAt,
    updated_at: now,
    display_label: subject.displayLabel ?? null,
    metadata: subject.metadata ?? {},
    external_refs: subject.externalRefs ?? [],
    memberships: [],
    role_claims: [],
    platform_participation: [],
  });
  if (subErr) {
    return { ok: false, error: subErr.message };
  }

  await admin.from("shared_identity_external_refs").upsert(
    {
      ref_key: `stankings-hq-auth:${input.userId}`,
      system: "stankings-hq-auth",
      external_id: input.userId,
      subject_id: subject.subjectId,
      linked: true,
    },
    { onConflict: "ref_key" }
  );

  const registry = new PassportRegistry(
    createSupabasePassportStore(
      admin as unknown as Parameters<typeof createSupabasePassportStore>[0]
    )
  );
  const issued = await registry.issue({
    subjectId: subject.subjectId,
    platformId: "stankings-hq",
    issuanceReason: "lifetime_stankings_passport",
    evidence: [
      {
        provider: "identity",
        assertionType: "identity.subject.active",
        assertionRef: subject.subjectId,
        status: "verified",
      },
    ],
  });

  if (!issued.ok || !issued.record) {
    return {
      ok: false,
      error: issued.errors?.join("; ") ?? "Passport issue failed",
    };
  }

  const link: PassportPersonLink = {
    user_id: input.userId,
    subject_id: subject.subjectId,
    passport_id: issued.record.passportId,
    email,
    full_name: fullName,
    must_change_password: false,
    mfa_required: false,
  };

  const { error: linkErr } = await admin.from("passport_person_links").insert(link);
  if (linkErr) {
    const again = await getPassportLinkByUserId(input.userId);
    if (again) return { ok: true, link: again, created: false };
    return { ok: false, error: linkErr.message };
  }

  await admin.from("workforce_audit_logs").insert({
    actor_id: input.userId,
    action: "passport.created",
    entity_type: "passport_person_link",
    entity_id: issued.record.passportId,
    payload: {
      userId: input.userId,
      subjectId: subject.subjectId,
      passportId: issued.record.passportId,
      email,
    },
  });

  return { ok: true, link, created: true };
}
