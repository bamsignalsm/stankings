import Link from "next/link";
import {
  FOUNDER_WAR_ROOM,
  opsHealthColor,
  opsHealthLabel,
  type OpsSignal,
  type RenewalItem,
} from "@/lib/launch-war-room/founder-operations";
import { MetricCard } from "@/components/ui";

function SignalGrid({ title, signals }: { title: string; signals: OpsSignal[] }) {
  return (
    <section className="mb-6">
      <h3 className="mb-3 text-xs font-medium text-gold">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {signals.map((s) => (
          <div
            key={s.id}
            className={`rounded border px-3 py-3 ${opsHealthColor(s.health)}`}
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <p className="text-xs font-medium">{s.label}</p>
              <span className="text-[10px] uppercase tracking-wider opacity-90">
                {opsHealthLabel(s.health)}
              </span>
            </div>
            <p className="text-xs opacity-90">{s.detail}</p>
            {s.href && !s.href.endsWith(".md") ? (
              <Link href={s.href} className="mt-2 inline-block text-[10px] underline opacity-80">
                Open
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function RenewalTable({ items }: { items: RenewalItem[] }) {
  return (
    <div className="overflow-x-auto rounded border border-gold-subtle/30">
      <table className="w-full min-w-[520px] text-left text-xs">
        <thead>
          <tr className="border-b border-gold-subtle/30 text-cream-muted">
            <th className="px-3 py-2 font-medium">Item</th>
            <th className="px-3 py-2 font-medium">Category</th>
            <th className="px-3 py-2 font-medium">Status</th>
            <th className="px-3 py-2 font-medium">Note</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gold-subtle/10">
              <td className="px-3 py-2 text-cream">{item.label}</td>
              <td className="px-3 py-2 capitalize text-cream-muted">{item.category}</td>
              <td className="px-3 py-2 capitalize text-cream-muted">
                {item.status.replace("_", " ")}
              </td>
              <td className="px-3 py-2 text-cream-muted">{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FounderWarRoomOps() {
  const w = FOUNDER_WAR_ROOM;

  return (
    <section className="mb-8 rounded-lg border border-gold/50 bg-ink p-5">
      <p className="font-mono text-xs text-gold">Founder War Room · Operational HQ</p>
      <h2 className="mb-2 font-serif text-xl font-semibold text-cream">
        Infrastructure & operations
      </h2>
      <p className="mb-4 text-xs text-cream-muted">{w.launchProgressNote}</p>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Launch progress" value="Stage 1" hint="Active deployment" />
        <MetricCard label="Operational alerts" value={String(w.operationalAlerts.length)} />
        <MetricCard label="Daily tasks" value={String(w.dailyTasks.length)} />
        <MetricCard label="Outstanding risks" value={String(w.outstandingRisks.length)} />
      </div>

      {w.operationalAlerts.length > 0 ? (
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-medium text-gold">Operational alerts</h3>
          <ul className="space-y-1 text-xs">
            {w.operationalAlerts.map((a) => (
              <li
                key={a}
                className="rounded border border-red-400/20 bg-red-500/10 px-2 py-1 text-red-200"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <SignalGrid title="System health" signals={w.systemHealth} />
      <SignalGrid title="Deployment · repository · cloud" signals={w.deployment} />
      <SignalGrid
        title="Environment · SSL · domain · DNS · email"
        signals={w.environment}
      />
      <SignalGrid title="Certificates" signals={w.infrastructure} />

      <section className="mb-6">
        <h3 className="mb-3 text-xs font-medium text-gold">Renewal calendar</h3>
        <RenewalTable items={w.renewals} />
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xs font-medium text-gold">Daily founder tasks</h3>
          <ul className="space-y-1 text-xs text-cream-muted">
            {w.dailyTasks.map((t) => (
              <li key={t}>→ {t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-medium text-gold">Outstanding risks</h3>
          <ul className="space-y-1 text-xs text-cream-muted">
            {w.outstandingRisks.map((r) => (
              <li key={r} className="rounded border border-amber-400/15 bg-amber-400/5 px-2 py-1">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-cream-muted/70">
        Updated {w.updatedAt.slice(0, 10)} · Evidence only — no fabricated metrics.
      </p>
    </section>
  );
}
