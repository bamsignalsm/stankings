import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getLibraryEngineStats } from "@/lib/library-engine/queries";

export default async function EnergyDashboard() {
  const supabase = await createClient();
  const libraryStats = await getLibraryEngineStats();

  const [
    { count: pendingMembers },
    { count: publishedJobs },
    { count: newApplications },
    { count: employees },
    { count: activeEmployees },
  ] = await Promise.all([
    supabase
      .from("stankings_members")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("stankings_career_posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("stankings_career_applications")
      .select("*", { count: "exact", head: true })
      .in("status", ["submitted", "new", "reviewing"]),
    supabase.from("workforce_employees").select("*", { count: "exact", head: true }),
    supabase
      .from("workforce_employees")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
  ]);

  const cards = [
    {
      label: "Pending members",
      value: pendingMembers ?? 0,
      href: "/energy/members",
    },
    {
      label: "Employees",
      value: employees ?? 0,
      href: "/energy/employees",
      hint: `${activeEmployees ?? 0} active`,
    },
    {
      label: "Published roles",
      value: publishedJobs ?? 0,
      href: "/energy/careers",
    },
    {
      label: "Open applications",
      value: newApplications ?? 0,
      href: "/energy/applications",
    },
    {
      label: "Knowledge Objects",
      value: libraryStats.total,
      href: "/energy/library",
    },
    {
      label: "SKL Monitor",
      value: "→",
      href: "/energy/skl-monitor",
    },
  ];

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
        Overview
      </h1>
      <p className="mb-8 text-cream-muted">
        Founder operations for membership, recruitment, and workforce oversight.
        Workers use /skl — never Energy. Career posts are published centrally.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
          >
            <p className="text-3xl font-semibold text-gold">{card.value}</p>
            <p className="mt-1 text-sm text-cream-muted">{card.label}</p>
            {"hint" in card && card.hint ? (
              <p className="mt-1 text-xs text-cream-muted">{card.hint}</p>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
