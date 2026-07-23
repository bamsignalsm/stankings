import Link from "next/link";

/** Phase I placeholder — Company Head capability home */
export default function CompanyHeadDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-3xl text-cream">Company Dashboard</h1>
      <p className="text-cream-muted">
        Placeholder for Company Head oversight. Full company analytics land in a
        later phase. Your SKL workspace tools remain available.
      </p>
      <Link href="/skl" className="text-gold">
        Open SKL home →
      </Link>
    </div>
  );
}
