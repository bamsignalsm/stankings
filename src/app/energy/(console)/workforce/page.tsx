import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function EnergyWorkforcePage() {
  const supabase = await createClient();
  const [{ count: roles }, { count: departments }, { count: posts }] =
    await Promise.all([
      supabase.from("workforce_roles").select("*", { count: "exact", head: true }),
      supabase
        .from("workforce_departments")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("stankings_career_posts")
        .select("*", { count: "exact", head: true })
        .eq("status", "published"),
    ]);

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl text-cream">Workforce</h1>
      <p className="mb-6 max-w-2xl text-cream-muted">
        Departments and roles are seeded from the launch catalogue. Manage workers,
        invites, and transfers on Employees. Permission templates live in
        workforce_role_templates; grants on workforce_grants.
      </p>
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-sm border border-gold-subtle p-4">
          <p className="text-xs text-cream-muted">Departments</p>
          <p className="font-serif text-2xl text-cream">{departments ?? 0}</p>
        </div>
        <div className="rounded-sm border border-gold-subtle p-4">
          <p className="text-xs text-cream-muted">Roles</p>
          <p className="font-serif text-2xl text-cream">{roles ?? 0}</p>
        </div>
        <div className="rounded-sm border border-gold-subtle p-4">
          <p className="text-xs text-cream-muted">Published jobs</p>
          <p className="font-serif text-2xl text-cream">{posts ?? 0}</p>
        </div>
      </div>
      <ul className="space-y-2 text-sm">
        <li>
          <Link href="/energy/employees" className="text-gold">
            Employees · Invite / Suspend / Transfer →
          </Link>
        </li>
        <li>
          <Link href="/energy/applications" className="text-gold">
            Applications · Hire pipeline →
          </Link>
        </li>
        <li>
          <Link href="/energy/skl-monitor" className="text-gold">
            SKL Monitor →
          </Link>
        </li>
        <li>
          <Link href="/career" className="text-gold">
            Public careers →
          </Link>
        </li>
      </ul>
    </div>
  );
}
