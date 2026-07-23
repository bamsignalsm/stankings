import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CONTACTS } from "@/lib/shared/config/contacts";

export default async function PassportRecoveryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/passport/recovery");
  }

  const { data: cases } = await supabase
    .from("passport_recovery_cases")
    .select("id, email, status, existing_passport_id, reason, created_at, resolution_notes")
    .eq("requesting_user_id", user.id)
    .order("created_at", { ascending: false });

  const pending = (cases ?? []).filter((c) => c.status === "pending_admin_review");
  const resolved = (cases ?? []).filter((c) => c.status !== "pending_admin_review");

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
        Stankings Passport Recovery
      </p>
      <h1 className="font-serif text-3xl text-cream">Identity verification required</h1>
      <p className="mt-4 text-cream-muted">
        A Stankings Passport already exists for this email under a different sign-in
        account. The platform will <strong className="text-cream">never</strong> create a
        second Passport, and will <strong className="text-cream">never</strong>{" "}
        automatically attach your new login to the existing Passport.
      </p>

      <div className="mt-8 space-y-4 rounded-sm border border-gold-subtle p-6">
        <h2 className="font-serif text-xl text-cream">What happens next</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-cream-muted">
          <li>Your recovery request is flagged for administrative identity verification.</li>
          <li>Stankings HQ confirms you are the Passport holder.</li>
          <li>On approval, your new login is rebound to the same lifetime Passport.</li>
          <li>Applications, employment history, and identity continuity are preserved.</li>
        </ol>
      </div>

      {pending.length > 0 ? (
        <div className="mt-8 space-y-3">
          <h2 className="font-serif text-lg text-cream">Open recovery cases</h2>
          {pending.map((c) => (
            <div key={c.id} className="rounded-sm border border-gold-subtle px-4 py-3">
              <p className="text-cream">{c.email}</p>
              <p className="text-xs text-gold">Pending admin review · Case {c.id.slice(0, 8)}</p>
              <p className="mt-1 text-xs text-cream-muted">{c.reason}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-cream-muted">
          No open recovery case on this login. If you expected one, contact{" "}
          {CONTACTS.careers}.
        </p>
      )}

      {resolved.length > 0 ? (
        <div className="mt-8 space-y-3">
          <h2 className="font-serif text-lg text-cream">Resolved</h2>
          {resolved.map((c) => (
            <div key={c.id} className="rounded-sm border border-gold-subtle px-4 py-3">
              <p className="text-cream">{c.status}</p>
              <p className="text-xs text-cream-muted">{c.resolution_notes}</p>
            </div>
          ))}
        </div>
      ) : null}

      <p className="mt-10 text-sm">
        <Link href="/auth/continue" className="text-gold">
          Re-check my routing →
        </Link>
      </p>
    </div>
  );
}
