import Link from "next/link";
import {
  CANON_DASHBOARD_ROWS,
  getCanonDashboardStats,
  type CanonImplementationStatus,
} from "@/lib/canon/dashboard";

function statusLabel(status: CanonImplementationStatus) {
  const map = {
    active: "Active",
    in_progress: "In Progress",
    planned: "Planned",
  };
  return map[status];
}

function statusStyle(status: CanonImplementationStatus) {
  const map = {
    active: "text-forest border-forest/30 bg-forest/10",
    in_progress: "text-gold border-gold/30 bg-gold/10",
    planned: "text-cream-muted border-gold-subtle bg-ink",
  };
  return map[status];
}

function statusIcon(status: CanonImplementationStatus) {
  const map = {
    active: "✓",
    in_progress: "◐",
    planned: "○",
  };
  return map[status];
}

export function CanonDashboardHub() {
  const stats = getCanonDashboardStats();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Volume 0 · Philosophy → Implementation
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Canon Dashboard
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            The living bridge between institutional philosophy and operational
            reality — every Canon, its framework, and its platform feature.
          </p>
          <p className="mt-4 font-mono text-xs text-cream-muted">
            {stats.active} active · {stats.inProgress} in progress · {stats.total} canons
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="overflow-x-auto rounded-lg border border-gold-subtle">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-gold-subtle bg-ink-muted text-xs uppercase tracking-widest text-cream-muted">
                <th className="px-4 py-3 font-medium">Canon</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Framework</th>
                <th className="px-4 py-3 font-medium">Platform Feature</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {CANON_DASHBOARD_ROWS.map((row) => (
                <tr key={row.canonId} className="border-b border-gold-subtle/50">
                  <td className="px-4 py-4">
                    <Link
                      href={row.canonHref}
                      className="font-mono text-gold hover:text-gold-light"
                    >
                      {row.canonId.replace("CANON-", "")}
                    </Link>
                  </td>
                  <td className="max-w-[10rem] px-4 py-4 font-medium text-cream">
                    <Link href={row.canonHref} className="hover:text-gold">
                      {row.canonTitle}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-cream-muted">
                    {row.frameworkHref ? (
                      <Link href={row.frameworkHref} className="hover:text-gold">
                        {row.framework}
                      </Link>
                    ) : (
                      row.framework ?? "—"
                    )}
                  </td>
                  <td className="px-4 py-4 text-cream-muted">
                    {row.platformHref ? (
                      <Link href={row.platformHref} className="hover:text-gold">
                        {row.platformFeature}
                      </Link>
                    ) : (
                      row.platformFeature
                    )}
                  </td>
                  <td className="px-4 py-4 text-xs text-cream-muted">{row.category}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider ${statusStyle(row.status)}`}
                    >
                      {statusIcon(row.status)} {statusLabel(row.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {CANON_DASHBOARD_ROWS.filter((r) => r.status === "in_progress").map((row) => (
            <div
              key={row.canonId}
              className="rounded-lg border border-gold/30 bg-gold-subtle p-5"
            >
              <p className="mb-1 font-mono text-xs text-gold">{row.canonId}</p>
              <h3 className="mb-2 font-serif text-lg font-semibold text-cream">
                {row.canonTitle}
              </h3>
              <p className="mb-3 text-sm text-cream-muted">{row.platformFeature}</p>
              <Link
                href={row.platformHref ?? row.frameworkHref ?? row.canonHref}
                className="text-sm text-gold hover:text-gold-light"
              >
                Continue implementation →
              </Link>
            </div>
          ))}
        </section>

        <p className="mt-12 text-center text-sm italic text-cream-muted">
          Canon before code. Every engineering decision traces upward.{" "}
          <Link href="/library/canon-maturity" className="text-gold hover:text-gold-light not-italic">
            Volume 0 Maturity →
          </Link>
        </p>
      </div>
    </>
  );
}
