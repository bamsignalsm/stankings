import Link from "next/link";

/** Phase I placeholder — Executive / CEO capability home */
export default function ExecutiveDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-3xl text-cream">Executive Dashboard</h1>
      <p className="text-cream-muted">
        Placeholder for Group executive oversight. Detailed executive views follow
        in Phase I.1. Your SKL workspace tools remain available.
      </p>
      <Link href="/skl" className="text-gold">
        Open SKL home →
      </Link>
    </div>
  );
}
