"use server";

import { revalidatePath } from "next/cache";
import { getCurrentMember, isSuperAdmin } from "@/lib/members";
import {
  approvePassportRecovery,
  rejectPassportRecovery,
} from "@/lib/passport/recovery";

async function requireSuperAdmin() {
  const member = await getCurrentMember();
  if (!isSuperAdmin(member)) throw new Error("Unauthorized");
  return member!;
}

export async function approveRecoveryCaseAction(formData: FormData) {
  const admin = await requireSuperAdmin();
  const caseId = String(formData.get("case_id") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();
  const result = await approvePassportRecovery({
    caseId,
    actorMemberId: admin.id,
    notes: notes || undefined,
  });
  if (!result.ok) throw new Error(result.error ?? "Approve failed");
  revalidatePath("/energy/passport-recovery");
  revalidatePath("/passport/recovery");
}

export async function rejectRecoveryCaseAction(formData: FormData) {
  const admin = await requireSuperAdmin();
  const caseId = String(formData.get("case_id") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();
  const result = await rejectPassportRecovery({
    caseId,
    actorMemberId: admin.id,
    notes: notes || undefined,
  });
  if (!result.ok) throw new Error(result.error ?? "Reject failed");
  revalidatePath("/energy/passport-recovery");
  revalidatePath("/passport/recovery");
}
