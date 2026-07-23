import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ensurePassportForUser } from "@/lib/passport/person";
import { respondToOffer } from "@/app/skl/emergency-actions";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Applicant Dashboard",
  description: "Track Stankings career applications on your Passport.",
  path: "/passport/applicant",
});

export default async function ApplicantDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 pt-28">
        <h1 className="font-serif text-3xl text-cream">Applicant Dashboard</h1>
        <p className="mt-4 text-cream-muted">
          <Link href="/auth/login?next=/passport/applicant" className="text-gold">
            Sign in with your Stankings Passport
          </Link>{" "}
          to track applications.
        </p>
        <p className="mt-2 text-sm text-cream-muted">
          No Passport yet?{" "}
          <Link href="/auth/register?next=/passport/applicant" className="text-gold">
            Create one
          </Link>
          .
        </p>
      </div>
    );
  }

  const ensured = await ensurePassportForUser({
    userId: user.id,
    email: user.email,
    fullName: (user.user_metadata?.full_name as string) ?? null,
  });

  const passportId = ensured.link?.passport_id;

  const { data: apps } = await supabase
    .from("stankings_career_applications")
    .select("*, stankings_career_posts(title, slug, company_id, workspace_key)")
    .or(
      [
        passportId ? `passport_id.eq.${passportId}` : null,
        `email.eq.${user.email}`,
        `applicant_id.eq.${user.id}`,
      ]
        .filter(Boolean)
        .join(",")
    )
    .order("created_at", { ascending: false });

  const { data: employee } = await supabase
    .from("workforce_employees")
    .select("id, status, skl_access")
    .eq("user_id", user.id)
    .in("status", ["active", "invited"])
    .maybeSingle();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 pt-28">
      <p className="text-xs uppercase tracking-widest text-gold">Stankings Passport</p>
      <h1 className="mt-2 font-serif text-3xl text-cream">Applicant Dashboard</h1>
      <p className="mt-2 text-cream-muted">
        Your lifetime Passport tracks every application. Hiring extends this same
        Passport — never a second account.
      </p>
      {passportId ? (
        <p className="mt-2 font-mono text-xs text-cream-muted">Passport: {passportId}</p>
      ) : null}

      {employee?.skl_access ? (
        <p className="mt-4 rounded-sm border border-gold-subtle bg-ink-muted px-4 py-3 text-sm text-cream">
          Workforce access is active.{" "}
          <Link href="/skl" className="text-gold">
            Open SKL portal →
          </Link>
        </p>
      ) : null}

      <h2 className="mb-4 mt-10 font-serif text-xl text-cream">Applications</h2>
      <ul className="space-y-4">
        {(apps ?? []).length === 0 ? (
          <li className="text-cream-muted">
            No applications yet.{" "}
            <Link href="/career" className="text-gold">
              Browse careers
            </Link>
          </li>
        ) : (
          (apps ?? []).map((app) => (
            <li key={app.id} className="rounded-lg border border-gold-subtle bg-ink-muted p-5">
              <p className="font-medium text-cream">
                {app.stankings_career_posts?.title ?? "Role"}
              </p>
              <p className="text-sm capitalize text-gold">
                {String(app.status).replace(/_/g, " ")}
              </p>
              <p className="mt-1 text-xs text-cream-muted">
                Submitted {new Date(app.created_at).toLocaleDateString()}
              </p>
              {app.status === "offer_extended" ? (
                <div className="mt-4 flex gap-3">
                  <form action={respondToOffer}>
                    <input type="hidden" name="application_id" value={app.id} />
                    <input type="hidden" name="decision" value="offer_accepted" />
                    <button
                      type="submit"
                      className="rounded-sm border border-gold bg-gold px-3 py-1.5 text-sm font-semibold text-ink"
                    >
                      Accept offer
                    </button>
                  </form>
                  <form action={respondToOffer}>
                    <input type="hidden" name="application_id" value={app.id} />
                    <input type="hidden" name="decision" value="offer_rejected" />
                    <button type="submit" className="text-sm text-cream-muted hover:text-gold">
                      Decline
                    </button>
                  </form>
                </div>
              ) : null}
            </li>
          ))
        )}
      </ul>

      <p className="mt-8 text-sm">
        <Link href="/career" className="text-gold">
          ← Back to careers
        </Link>
      </p>
    </div>
  );
}
