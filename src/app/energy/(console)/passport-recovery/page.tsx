import { createClient } from "@/lib/supabase/server";
import {
  approveRecoveryCaseAction,
  rejectRecoveryCaseAction,
} from "./actions";

export default async function EnergyPassportRecoveryPage() {
  const supabase = await createClient();
  const { data: cases } = await supabase
    .from("passport_recovery_cases")
    .select("*")
    .order("created_at", { ascending: false });

  const pending = (cases ?? []).filter((c) => c.status === "pending_admin_review");
  const closed = (cases ?? []).filter((c) => c.status !== "pending_admin_review");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-cream">Passport Recovery</h1>
        <p className="mt-2 max-w-2xl text-cream-muted">
          Identity continuity queue. Approving rebinds Auth to the existing
          lifetime Passport — never issues a second Passport.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-serif text-xl text-cream">
          Pending ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="text-cream-muted">No open recovery cases.</p>
        ) : (
          pending.map((c) => (
            <div
              key={c.id}
              className="space-y-3 rounded-sm border border-gold-subtle p-4"
            >
              <p className="text-cream">{c.email}</p>
              <p className="text-xs text-cream-muted">
                Passport {c.existing_passport_id} · existing Auth{" "}
                {String(c.existing_user_id).slice(0, 8)}… → requesting{" "}
                {String(c.requesting_user_id).slice(0, 8)}…
              </p>
              <p className="text-sm text-cream-muted">{c.reason}</p>
              <div className="flex flex-wrap gap-3">
                <form action={approveRecoveryCaseAction} className="flex gap-2">
                  <input type="hidden" name="case_id" value={c.id} />
                  <input
                    name="notes"
                    placeholder="Verification notes"
                    className="rounded-sm border border-gold-subtle bg-ink-muted px-2 py-1 text-xs text-cream"
                  />
                  <button type="submit" className="text-sm text-gold">
                    Approve rebind
                  </button>
                </form>
                <form action={rejectRecoveryCaseAction} className="flex gap-2">
                  <input type="hidden" name="case_id" value={c.id} />
                  <input
                    name="notes"
                    placeholder="Reject reason"
                    className="rounded-sm border border-gold-subtle bg-ink-muted px-2 py-1 text-xs text-cream"
                  />
                  <button type="submit" className="text-sm text-danger">
                    Reject
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-xl text-cream">Closed</h2>
        {closed.slice(0, 20).map((c) => (
          <div key={c.id} className="rounded-sm border border-gold-subtle px-4 py-3">
            <p className="text-cream">
              {c.email} · {c.status}
            </p>
            <p className="text-xs text-cream-muted">{c.resolution_notes}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
