import { createClient } from "@/lib/supabase/server";
import { getCurrentEmployee, getEmployeeGrants } from "@/lib/workforce/employees";
import { getWorkspace } from "@/lib/workforce/workspaces";
import { completeWelcomeItem } from "@/app/skl/actions";
import Link from "next/link";

export default async function SKLHomePage() {
  const employee = await getCurrentEmployee();
  if (!employee) return null;

  const supabase = await createClient();
  const workspace = getWorkspace(employee.workspace_key);
  const grants = await getEmployeeGrants(employee.id);

  const { data: checklist } = await supabase
    .from("workforce_welcome_checklist")
    .select("*")
    .eq("employee_id", employee.id)
    .order("item_key");

  const { data: notifications } = await supabase
    .from("workforce_notifications")
    .select("*")
    .eq("employee_id", employee.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const { count: openTasks } = await supabase
    .from("workforce_tasks")
    .select("*", { count: "exact", head: true })
    .eq("company_id", employee.company_id)
    .neq("status", "done");

  return (
    <div className="space-y-10">
      <section>
        <p className="mb-2 text-xs uppercase tracking-widest text-gold">
          Role dashboard
        </p>
        <h1 className="font-serif text-3xl text-cream">{workspace.label}</h1>
        <p className="mt-2 max-w-2xl text-cream-muted">{workspace.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {workspace.features
            .filter((f) => !f.permission || grants.has(f.permission))
            .slice(0, 6)
            .map((f) => (
              <Link
                key={f.slug}
                href={`/skl/workspace/${f.slug}`}
                className="rounded-sm border border-gold-subtle px-3 py-1.5 text-sm text-gold hover:border-gold/50"
              >
                {f.label}
              </Link>
            ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-sm border border-gold-subtle bg-ink-muted p-4">
          <p className="text-xs text-cream-muted">Open tasks</p>
          <p className="font-serif text-2xl text-cream">{openTasks ?? 0}</p>
        </div>
        <div className="rounded-sm border border-gold-subtle bg-ink-muted p-4">
          <p className="text-xs text-cream-muted">Status</p>
          <p className="font-serif text-2xl capitalize text-cream">{employee.status}</p>
        </div>
        <div className="rounded-sm border border-gold-subtle bg-ink-muted p-4">
          <p className="text-xs text-cream-muted">Company</p>
          <p className="font-serif text-2xl text-cream">{employee.company_id}</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl text-cream">Welcome checklist</h2>
        <ul className="space-y-2">
          {(checklist ?? []).map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-sm border border-gold-subtle px-4 py-3"
            >
              <span className={item.completed ? "text-cream-muted line-through" : "text-cream"}>
                {item.label}
              </span>
              {!item.completed ? (
                <form action={completeWelcomeItem}>
                  <input type="hidden" name="item_id" value={item.id} />
                  <button type="submit" className="text-sm text-gold hover:text-gold-light">
                    Complete
                  </button>
                </form>
              ) : (
                <span className="text-xs text-forest">Done</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl text-cream">Notifications</h2>
        <ul className="space-y-2">
          {(notifications ?? []).length === 0 ? (
            <li className="text-sm text-cream-muted">No notifications yet.</li>
          ) : (
            (notifications ?? []).map((n) => (
              <li key={n.id} className="rounded-sm border border-gold-subtle px-4 py-3">
                <p className="text-cream">{n.title}</p>
                {n.body ? <p className="text-sm text-cream-muted">{n.body}</p> : null}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
