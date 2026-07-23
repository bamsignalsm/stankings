import { createClient } from "@/lib/supabase/server";
import { getCurrentEmployee } from "@/lib/workforce/employees";
import { getWorkspace } from "@/lib/workforce/workspaces";
import {
  actionModerationReport,
  createEditorialArticle,
  createEngIssue,
  createModerationReport,
  createOpsItem,
  createPressRelease,
  createSupportTicket,
  publishEditorialArticle,
  updateSupportTicketStatus,
} from "@/app/skl/actions";

export default async function SKLWorkspaceFeaturePage({
  params,
}: {
  params: Promise<{ feature: string }>;
}) {
  const { feature } = await params;
  const employee = await getCurrentEmployee();
  if (!employee) return null;

  const workspace = getWorkspace(employee.workspace_key);
  const featureMeta = workspace.features.find((f) => f.slug === feature);
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("workforce_editorial_articles")
    .select("*")
    .eq("company_id", employee.company_id)
    .order("created_at", { ascending: false })
    .limit(20);

  const { data: tickets } = await supabase
    .from("workforce_support_tickets")
    .select("*")
    .eq("company_id", employee.company_id)
    .order("created_at", { ascending: false })
    .limit(20);

  const { data: reports } = await supabase
    .from("workforce_moderation_reports")
    .select("*")
    .eq("company_id", employee.company_id)
    .order("created_at", { ascending: false })
    .limit(20);

  const { data: ops } = await supabase
    .from("workforce_ops_items")
    .select("*")
    .eq("company_id", employee.company_id)
    .order("created_at", { ascending: false })
    .limit(20);

  const { data: issues } = await supabase
    .from("workforce_eng_issues")
    .select("*")
    .eq("company_id", employee.company_id)
    .order("created_at", { ascending: false })
    .limit(20);

  const { data: press } = await supabase
    .from("workforce_press_releases")
    .select("*")
    .eq("company_id", employee.company_id)
    .order("created_at", { ascending: false })
    .limit(20);

  const isEditorial =
    employee.workspace_key === "editorial" ||
    ["drafts", "pending", "published", "media", "seo", "social", "categories", "calendar", "analytics", "assets", "briefs"].includes(
      feature
    );
  const isSupport =
    employee.workspace_key === "customer_support" ||
    ["assigned", "open", "resolved", "escalations", "lookup", "knowledge", "performance"].includes(feature);
  const isMod =
    employee.workspace_key === "moderation" ||
    employee.workspace_key === "verification" ||
    ["reports", "photos", "listings", "profiles", "appeals", "safety", "actions", "queue", "reviews", "audit"].includes(
      feature
    );
  const isPr =
    employee.workspace_key === "public_relations" ||
    ["releases", "requests", "campaigns", "contacts", "announcements", "events", "communications"].includes(feature);
  const isEng =
    employee.workspace_key === "engineering" ||
    ["sprint", "issues", "docs", "deployments", "incidents", "architecture"].includes(feature);
  const isOps =
    !isEditorial &&
    !isSupport &&
    !isMod &&
    !isPr &&
    !isEng;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-gold">{workspace.label}</p>
        <h1 className="font-serif text-3xl text-cream">
          {featureMeta?.label ?? feature}
        </h1>
      </div>

      {isEditorial ? (
        <section className="space-y-6">
          <form action={createEditorialArticle} className="space-y-3 rounded-sm border border-gold-subtle p-4">
            <h2 className="font-serif text-lg text-cream">New draft</h2>
            <input name="title" placeholder="Headline" required className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <input name="category" placeholder="Category" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <textarea name="body" placeholder="Article body" rows={5} className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <button type="submit" className="rounded-sm border border-gold bg-gold px-4 py-2 text-sm font-semibold text-ink">
              Save draft
            </button>
          </form>
          <ul className="space-y-3">
            {(articles ?? [])
              .filter((a) => {
                if (feature === "drafts") return a.status === "draft";
                if (feature === "pending") return a.status === "pending_review";
                if (feature === "published") return a.status === "published";
                return true;
              })
              .map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-4 rounded-sm border border-gold-subtle px-4 py-3">
                  <div>
                    <p className="text-cream">{a.title}</p>
                    <p className="text-xs text-cream-muted">
                      {a.status}
                      {a.category ? ` · ${a.category}` : ""}
                    </p>
                  </div>
                  {a.status !== "published" ? (
                    <form action={publishEditorialArticle}>
                      <input type="hidden" name="article_id" value={a.id} />
                      <button type="submit" className="text-sm text-gold">
                        Publish
                      </button>
                    </form>
                  ) : null}
                </li>
              ))}
          </ul>
        </section>
      ) : null}

      {isPr ? (
        <section className="space-y-6">
          <form action={createPressRelease} className="space-y-3 rounded-sm border border-gold-subtle p-4">
            <h2 className="font-serif text-lg text-cream">Press release</h2>
            <input name="title" required placeholder="Title" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <textarea name="body" rows={4} placeholder="Body" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <button type="submit" className="rounded-sm border border-gold bg-gold px-4 py-2 text-sm font-semibold text-ink">
              Create
            </button>
          </form>
          <ul className="space-y-2">
            {(press ?? []).map((p) => (
              <li key={p.id} className="rounded-sm border border-gold-subtle px-4 py-3 text-cream">
                {p.title} <span className="text-xs text-cream-muted">· {p.status}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {isSupport ? (
        <section className="space-y-6">
          <form action={createSupportTicket} className="space-y-3 rounded-sm border border-gold-subtle p-4">
            <h2 className="font-serif text-lg text-cream">New ticket</h2>
            <input name="subject" required placeholder="Subject" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <input name="queue" placeholder="Queue (buyer/seller/wallet…)" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <textarea name="body" rows={3} placeholder="Details" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <button type="submit" className="rounded-sm border border-gold bg-gold px-4 py-2 text-sm font-semibold text-ink">
              Open ticket
            </button>
          </form>
          <ul className="space-y-3">
            {(tickets ?? [])
              .filter((t) => {
                if (feature === "open" || feature === "assigned") return t.status === "open" || t.status === "assigned";
                if (feature === "resolved") return t.status === "resolved" || t.status === "closed";
                if (feature === "escalations") return t.status === "escalated";
                return true;
              })
              .map((t) => (
                <li key={t.id} className="rounded-sm border border-gold-subtle px-4 py-3">
                  <p className="text-cream">{t.subject}</p>
                  <p className="text-xs text-cream-muted">
                    {t.status} · {t.queue} · {t.priority}
                  </p>
                  <form action={updateSupportTicketStatus} className="mt-2 flex gap-2">
                    <input type="hidden" name="ticket_id" value={t.id} />
                    <button name="status" value="resolved" type="submit" className="text-sm text-gold">
                      Resolve
                    </button>
                    <button name="status" value="escalated" type="submit" className="text-sm text-gold">
                      Escalate
                    </button>
                  </form>
                </li>
              ))}
          </ul>
        </section>
      ) : null}

      {isMod ? (
        <section className="space-y-6">
          <form action={createModerationReport} className="space-y-3 rounded-sm border border-gold-subtle p-4">
            <h2 className="font-serif text-lg text-cream">Log report</h2>
            <input name="report_type" placeholder="Type (photo/listing/profile…)" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <input name="subject_ref" placeholder="Subject ref" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <textarea name="reason" required rows={3} placeholder="Reason" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <button type="submit" className="rounded-sm border border-gold bg-gold px-4 py-2 text-sm font-semibold text-ink">
              Add to queue
            </button>
          </form>
          <ul className="space-y-3">
            {(reports ?? []).map((r) => (
              <li key={r.id} className="rounded-sm border border-gold-subtle px-4 py-3">
                <p className="text-cream">{r.reason}</p>
                <p className="text-xs text-cream-muted">
                  {r.report_type} · {r.status}
                </p>
                <form action={actionModerationReport} className="mt-2 flex flex-wrap gap-2">
                  <input type="hidden" name="report_id" value={r.id} />
                  <input name="action_taken" placeholder="Action taken" className="rounded-sm border border-gold-subtle bg-ink-muted px-2 py-1 text-sm text-cream" />
                  <button name="status" value="actioned" type="submit" className="text-sm text-gold">
                    Action
                  </button>
                  <button name="status" value="dismissed" type="submit" className="text-sm text-gold">
                    Dismiss
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {isEng ? (
        <section className="space-y-6">
          <form action={createEngIssue} className="space-y-3 rounded-sm border border-gold-subtle p-4">
            <h2 className="font-serif text-lg text-cream">New issue</h2>
            <input name="title" required placeholder="Title" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <textarea name="body" rows={3} placeholder="Details" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <button type="submit" className="rounded-sm border border-gold bg-gold px-4 py-2 text-sm font-semibold text-ink">
              Add to backlog
            </button>
          </form>
          <ul className="space-y-2">
            {(issues ?? []).map((i) => (
              <li key={i.id} className="rounded-sm border border-gold-subtle px-4 py-3 text-cream">
                {i.title} <span className="text-xs text-cream-muted">· {i.status}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {isOps ? (
        <section className="space-y-6">
          <form action={createOpsItem} className="space-y-3 rounded-sm border border-gold-subtle p-4">
            <h2 className="font-serif text-lg text-cream">Ops item</h2>
            <input name="title" required placeholder="Title" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <input name="module" placeholder="Module" defaultValue={employee.workspace_key} className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <textarea name="body" rows={3} placeholder="Details" className="w-full rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
            <button type="submit" className="rounded-sm border border-gold bg-gold px-4 py-2 text-sm font-semibold text-ink">
              Create
            </button>
          </form>
          <ul className="space-y-2">
            {(ops ?? []).map((o) => (
              <li key={o.id} className="rounded-sm border border-gold-subtle px-4 py-3 text-cream">
                {o.title} <span className="text-xs text-cream-muted">· {o.status} · {o.module}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
