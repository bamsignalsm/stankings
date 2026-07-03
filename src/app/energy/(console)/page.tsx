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
      .eq("status", "new"),
  ]);

  const cards = [
    {
      label: "Pending members",
      value: pendingMembers ?? 0,
      href: "/energy/members",
    },
    {
      label: "Published roles",
      value: publishedJobs ?? 0,
      href: "/energy/careers",
    },
    {
      label: "New applications",
      value: newApplications ?? 0,
      href: "/energy/applications",
    },
    {
      label: "Knowledge Objects",
      value: libraryStats.total,
      href: "/energy/library",
    },
  ];

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
        Overview
      </h1>
      <p className="mb-8 text-cream-muted">
        Central operations for Stankings Group membership and recruitment.
        All career posts are published from here — not by individual companies.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
          >
            <p className="text-3xl font-semibold text-gold">{card.value}</p>
            <p className="mt-1 text-sm text-cream-muted">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
