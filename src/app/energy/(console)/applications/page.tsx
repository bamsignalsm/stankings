import { createClient } from "@/lib/supabase/server";
import { setApplicationStatus } from "../actions";
import { advanceApplicationStatus } from "@/app/skl/actions";
import { updateRecruiterApplicationReview } from "../actions";
import type { CareerApplication } from "@/lib/types";
import { HIRING_PIPELINE_STATUSES } from "@/lib/workforce/types";
import type { AtsApplicationProfile } from "@/lib/careers/ats-schema";

const ACTION_STATUSES = HIRING_PIPELINE_STATUSES.filter(
  (s) => s !== "submitted" && s !== "new"
);

export default async function AdminApplicationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("stankings_career_applications")
    .select(
      "*, stankings_career_posts(title, slug, company_id, role_key, workspace_key, department_slug, location, work_location_type)"
    )
    .neq("status", "draft")
    .order("created_at", { ascending: false });

  const apps = (data ?? []) as CareerApplication[];

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
        Applications
      </h1>
      <p className="mb-8 text-cream-muted">
        Structured ATS profiles · Passport match · Shortlist · Talent Pool
      </p>

      <div className="space-y-6">
        {apps.length === 0 ? (
          <p className="text-cream-muted">No applications yet.</p>
        ) : (
          apps.map((app) => {
            const profile = (app.profile ?? {}) as Partial<AtsApplicationProfile>;
            const score = (app.recruiter_scorecard ?? {}) as Record<
              string,
              unknown
            >;
            return (
              <div
                key={app.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-cream">
                      {app.full_name}
                      {app.preferred_name ? (
                        <span className="text-cream-muted">
                          {" "}
                          ({app.preferred_name})
                        </span>
                      ) : null}
                    </p>
                    <p className="text-sm text-cream-muted">
                      {app.email}
                      {app.phone ? ` · ${app.phone}` : ""}
                    </p>
                    <p className="mt-1 text-sm text-gold">
                      {app.stankings_career_posts?.title ?? "Role"} ·{" "}
                      {String(app.status).replace(/_/g, " ")}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {app.passport_match ? (
                        <span className="rounded-sm border border-gold/40 px-2 py-0.5 text-gold">
                          Passport match
                        </span>
                      ) : null}
                      {app.duplicate_flag ? (
                        <span className="rounded-sm border border-amber-400/40 px-2 py-0.5 text-amber-300">
                          Possible duplicate
                        </span>
                      ) : null}
                      {app.shortlisted ? (
                        <span className="rounded-sm border border-emerald-400/40 px-2 py-0.5 text-emerald-300">
                          Shortlisted
                        </span>
                      ) : null}
                      {app.talent_pool ? (
                        <span className="rounded-sm border border-gold-subtle px-2 py-0.5 text-cream-muted">
                          Talent Pool
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <p className="text-xs text-cream-muted">
                    {new Date(app.created_at).toLocaleString()}
                  </p>
                </div>

                {profile.personal ? (
                  <div className="mt-4 grid gap-2 text-sm text-cream-muted sm:grid-cols-2">
                    <p>
                      Location: {profile.personal.currentCity}
                      {profile.personal.currentState
                        ? `, ${profile.personal.currentState}`
                        : ""}
                    </p>
                    <p>Nationality: {profile.personal.nationality}</p>
                    <p>
                      Education entries: {profile.education?.length ?? 0} · Jobs:{" "}
                      {profile.employmentHistory?.length ?? 0} · Skills:{" "}
                      {profile.skills?.length ?? 0}
                    </p>
                    <p>
                      Expected salary:{" "}
                      {profile.availability?.expectedSalary || "—"}
                    </p>
                  </div>
                ) : null}

                {app.cover_letter && (
                  <p className="mt-3 line-clamp-3 text-sm text-cream-muted">
                    {app.cover_letter}
                  </p>
                )}

                <form
                  action={advanceApplicationStatus}
                  className="mb-3 mt-4 flex flex-wrap gap-2"
                >
                  <input type="hidden" name="application_id" value={app.id} />
                  <select
                    name="status"
                    defaultValue={app.status}
                    className="rounded-sm border border-gold-subtle bg-ink px-2 py-1 text-sm text-cream"
                  >
                    {ACTION_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                  <input
                    name="note"
                    placeholder="Pipeline note"
                    className="rounded-sm border border-gold-subtle bg-ink px-2 py-1 text-sm text-cream"
                  />
                  <button type="submit" className="text-sm text-gold">
                    Advance stage
                  </button>
                </form>

                <form
                  action={updateRecruiterApplicationReview}
                  className="mt-4 space-y-3 rounded-sm border border-gold-subtle p-4"
                >
                  <p className="text-xs uppercase tracking-widest text-gold">
                    Recruiter scorecard
                  </p>
                  <input type="hidden" name="application_id" value={app.id} />
                  <div className="grid gap-2 sm:grid-cols-4">
                    <ScoreInput
                      name="score_overall"
                      label="Overall"
                      defaultValue={String(score.overall ?? "")}
                    />
                    <ScoreInput
                      name="score_culture"
                      label="Culture"
                      defaultValue={String(score.cultureFit ?? "")}
                    />
                    <ScoreInput
                      name="score_technical"
                      label="Technical"
                      defaultValue={String(score.technical ?? "")}
                    />
                    <ScoreInput
                      name="score_communication"
                      label="Comms"
                      defaultValue={String(score.communication ?? "")}
                    />
                  </div>
                  <select
                    name="hiring_recommendation"
                    defaultValue={
                      String(score.recommendation ?? app.hiring_recommendation ?? "")
                    }
                    className="w-full rounded-sm border border-gold-subtle bg-ink px-2 py-1 text-sm text-cream"
                  >
                    <option value="">Recommendation</option>
                    <option value="strong_hire">Strong hire</option>
                    <option value="hire">Hire</option>
                    <option value="hold">Hold</option>
                    <option value="no_hire">No hire</option>
                  </select>
                  <textarea
                    name="score_summary"
                    rows={2}
                    defaultValue={String(score.summary ?? "")}
                    placeholder="Evaluation summary"
                    className="w-full rounded-sm border border-gold-subtle bg-ink px-2 py-1 text-sm text-cream"
                  />
                  <textarea
                    name="recruiter_note"
                    rows={2}
                    placeholder="Internal recruiter note"
                    className="w-full rounded-sm border border-gold-subtle bg-ink px-2 py-1 text-sm text-cream"
                  />
                  <div className="flex flex-wrap gap-4 text-sm text-cream-muted">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="shortlisted"
                        defaultChecked={Boolean(app.shortlisted)}
                      />
                      Shortlist
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="talent_pool"
                        defaultChecked={Boolean(app.talent_pool)}
                      />
                      Talent Pool
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="rounded-sm border border-gold bg-gold px-3 py-1.5 text-sm font-semibold text-ink"
                  >
                    Save recruiter review
                  </button>
                </form>

                <div className="mt-3 flex flex-wrap gap-3">
                  {(["reviewing", "shortlisted", "rejected", "hired"] as const).map(
                    (status) => (
                      <form key={status} action={setApplicationStatus}>
                        <input type="hidden" name="application_id" value={app.id} />
                        <input type="hidden" name="status" value={status} />
                        <button
                          type="submit"
                          className="text-sm capitalize text-cream-muted hover:text-gold"
                        >
                          {status}
                        </button>
                      </form>
                    )
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function ScoreInput({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="text-xs text-cream-muted">
      {label}
      <input
        name={name}
        type="number"
        min={1}
        max={5}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-sm border border-gold-subtle bg-ink px-2 py-1 text-sm text-cream"
      />
    </label>
  );
}
