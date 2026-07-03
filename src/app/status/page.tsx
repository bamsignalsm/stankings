import type { Metadata } from "next";
import {
  InstitutionalPageShell,
  StatusBadge,
} from "@/components/institutional/InstitutionalPageShell";
import { STATUS_SNAPSHOT } from "@/lib/institutional/public-site";

export const metadata: Metadata = {
  title: "System Status",
  description: "Operational status for Stankings HQ, BamSignal, Yike, and BayRight.",
};

export default function SystemStatusPage() {
  const { products, incidents, history, updatedAt } = STATUS_SNAPSHOT;
  const updated = new Date(updatedAt).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <InstitutionalPageShell
      eyebrow="System Status"
      title="Platform status"
      description="Informational snapshot only. No operational controls. Product systems remain independent."
    >
      <p className="mb-10 text-xs uppercase tracking-widest text-cream-muted">
        Last updated {updated}
      </p>

      <div className="space-y-10">
        {products.map((product) => (
          <section
            key={product.slug}
            className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-cream">
                  {product.name}
                </h2>
                <a
                  href={product.url}
                  className="text-sm text-gold hover:text-gold-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {product.url.replace("https://", "")}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={product.overall} />
                <span className="text-xs text-cream-muted">90d {product.uptime90d}</span>
              </div>
            </div>
            <ul className="space-y-3">
              {product.components.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-wrap items-start justify-between gap-2 border-t border-gold-subtle pt-3 first:border-0 first:pt-0"
                >
                  <div>
                    <p className="font-medium text-cream">{c.name}</p>
                    <p className="text-sm text-cream-muted">{c.message}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {incidents.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-4 font-serif text-2xl text-cream">Active incidents</h2>
          <div className="space-y-4">
            {incidents.map((inc) => (
              <article
                key={inc.id}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="text-xs text-cream-muted">{inc.id}</span>
                  <StatusBadge status={inc.status} />
                  <span className="text-xs text-gold">{inc.product}</span>
                </div>
                <h3 className="font-serif text-xl text-cream">{inc.title}</h3>
                <p className="mt-2 text-sm text-cream-muted">{inc.summary}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="mb-4 font-serif text-2xl text-cream">Historical uptime</h2>
        <div className="overflow-x-auto rounded-lg border border-gold-subtle">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-gold-subtle bg-ink-light">
                <th className="px-4 py-3 text-xs uppercase tracking-widest text-gold">Month</th>
                <th className="px-4 py-3 text-xs uppercase tracking-widest text-gold">HQ</th>
                <th className="px-4 py-3 text-xs uppercase tracking-widest text-gold">BamSignal</th>
                <th className="px-4 py-3 text-xs uppercase tracking-widest text-gold">Yike</th>
                <th className="px-4 py-3 text-xs uppercase tracking-widest text-gold">BayRight</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row) => (
                <tr key={row.month} className="border-b border-gold-subtle last:border-0">
                  <td className="px-4 py-3 text-cream">{row.month}</td>
                  <td className="px-4 py-3 text-cream-muted">{row.stankings}</td>
                  <td className="px-4 py-3 text-cream-muted">{row.bamsignal}</td>
                  <td className="px-4 py-3 text-cream-muted">{row.yike}</td>
                  <td className="px-4 py-3 text-cream-muted">{row.bayright}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </InstitutionalPageShell>
  );
}
