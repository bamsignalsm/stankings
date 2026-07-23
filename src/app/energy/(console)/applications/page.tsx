import { createClient } from "@/lib/supabase/server";
import { setApplicationStatus, advanceApplicationStatus } from "../actions";
import type { CareerApplication } from "@/lib/types";
import { HIRING_PIPELINE_STATUSES } from "@/lib/workforce/types";

const ACTION_STATUSES = HIRING_PIPELINE_STATUSES.filter(
  (s) => s !== "submitted" && s !== "new"
);

export default async function AdminApplicationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("stankings_career_applications")
    .select(
      "*, stankings_career_posts(title, slug, company_id, role_key, workspace_key, department_slug)"
    )
    .order("created_at", { ascending: false });

  const applications = (data ?? []) as CareerApplication[];

  const { data: events } = await supabase
    .from("workforce_application_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
        Applications
      </h1>
      <p className="mb-8 text-cream-muted">
        Full hiring lifecycle — review through hire provisions Office automatically.
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
              {app.stankings_career_posts?.company_id
                ? ` · ${app.stankings_career_posts.company_id}`
                : ""}
              {app.stankings_career_posts?.workspace_key
                ? ` · workspace ${app.stankings_career_posts.workspace_key}`
                : ""}
            </p>
            {app.cover_letter && (
              <p className="mb-4 text-sm leading-relaxed text-cream-muted">
                {app.cover_letter}
              </p>
            )}
            <form action={advanceApplicationStatus} className="mb-3 flex flex-wrap gap-2">
              <input type="hidden" name="application_id" value={app.id} />
              <input
                name="interview_score"
                placeholder="Score"
                className="w-20 rounded-sm border border-gold-subtle bg-ink px-2 py-1 text-xs text-cream"
              />
              <input
                name="note"
                placeholder="Note / decision"
                className="min-w-[160px] flex-1 rounded-sm border border-gold-subtle bg-ink px-2 py-1 text-xs text-cream"
              />
              <select
                name="status"
                defaultValue={app.status}
                className="rounded-sm border border-gold-subtle bg-ink px-2 py-1 text-xs text-cream"
              >
                {ACTION_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-sm border border-gold px-3 py-1 text-xs text-gold"
              >
                Update stage
              </button>
            </form>
            <div className="flex flex-wrap gap-2">
              {(["reviewing", "shortlisted", "interview_scheduled", "offer_extended", "hired", "rejected"] as const).map(
                (status) => (
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
                )
              )}
            </div>
            <ul className="mt-3 space-y-1 text-xs text-cream-muted">
              {(events ?? [])
                .filter((e) => e.application_id === app.id)
                .slice(0, 5)
                .map((e) => (
                  <li key={e.id}>
                    {e.from_status ?? "—"} → {e.to_status}
                    {e.note ? ` · ${e.note}` : ""}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
