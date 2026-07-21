import { createClient } from "@/lib/supabase/server";
import { setApplicationStatus } from "../actions";
import type { CareerApplication } from "@/lib/types";

const STATUSES = [
  "reviewing",
  "shortlisted",
  "rejected",
  "hired",
] as const;

export default async function AdminApplicationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("stankings_career_applications")
    .select("*, stankings_career_posts(title, slug)")
    .order("created_at", { ascending: false });

  const applications = (data ?? []) as CareerApplication[];

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
        Applications
      </h1>
      <p className="mb-8 text-cream-muted">
        Review applications submitted for Stankings Legacy Ltd career posts.
      </p>

      <div className="space-y-4">
        {applications.length === 0 && (
          <p className="text-cream-muted">No applications yet.</p>
        )}
        {applications.map((app) => (
          <div
            key={app.id}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-5"
          >
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-cream">{app.full_name}</p>
                <p className="text-sm text-cream-muted">{app.email}</p>
                {app.phone && (
                  <p className="text-sm text-cream-muted">{app.phone}</p>
                )}
              </div>
              <span className="text-xs uppercase text-gold">{app.status}</span>
            </div>
            <p className="mb-2 text-sm text-cream-muted">
              Role: {app.stankings_career_posts?.title ?? "Unknown"}
            </p>
            {app.cover_letter && (
              <p className="mb-4 text-sm leading-relaxed text-cream-muted">
                {app.cover_letter}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((status) => (
                <form key={status} action={setApplicationStatus}>
                  <input type="hidden" name="application_id" value={app.id} />
                  <input type="hidden" name="status" value={status} />
                  <button
                    type="submit"
                    className="rounded-sm border border-gold-subtle px-2 py-1 text-xs text-cream-muted hover:border-gold/40 hover:text-gold"
                  >
                    {status}
                  </button>
                </form>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
