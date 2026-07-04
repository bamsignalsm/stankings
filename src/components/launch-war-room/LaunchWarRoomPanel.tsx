import Link from "next/link";
import {
  ECOSYSTEM_WAR_ROOM,
  LAUNCH_COMMAND_CENTER,
  MASTER_LAUNCH_MISSION,
  blockerClassColor,
  formatDailyReportText,
  getMasterLaunchDailyReport,
  opsStatusColor,
  opsStatusLabel,
  postureColor,
  postureLabel,
  severityColor,
  taskStatusColor,
  type MasterLaunchTask,
  type OpsChecklistItem,
} from "@/lib/launch-war-room";
import { FounderWarRoomOps } from "@/components/launch-war-room/FounderWarRoomOps";

function LaunchCommandCenter() {
  const c = LAUNCH_COMMAND_CENTER;
  const activeStage = c.stages.find((s) => s.id === c.currentStage)!;

  return (
    <section className="mb-8 rounded-lg border-2 border-gold/60 bg-ink p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-gold">
            Master Launch Program v{c.version} · Launch Command Center
          </p>
          <h2 className="font-serif text-2xl font-semibold text-cream">Single source of truth</h2>
          <p className="mt-1 max-w-2xl text-xs text-cream-muted">{c.mission}</p>
        </div>
        <div className="text-right">
          <p className="font-serif text-4xl font-semibold text-gold">{c.launchPercent}%</p>
          <p className="text-xs text-cream-muted">Stage {c.currentStage} launch progress</p>
          <p className="mt-1 text-xs text-cream-muted">
            Est. {c.estimatedLaunchDate}
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded border border-gold/40 bg-gold/5 p-3">
          <p className="text-xs text-cream-muted">Current stage</p>
          <p className="font-serif text-xl text-cream">Stage {c.currentStage}</p>
        </div>
        <div className="rounded border border-gold/40 bg-gold/5 p-3">
          <p className="text-xs text-cream-muted">Current product</p>
          <p className="font-serif text-xl text-cream">{c.currentProductName}</p>
        </div>
        <div className="rounded border border-gold/40 bg-gold/5 p-3">
          <p className="text-xs text-cream-muted">Program progress</p>
          <p className="font-serif text-xl text-cream">{c.programProgressPercent}%</p>
        </div>
        <div className="rounded border border-gold/40 bg-gold/5 p-3">
          <p className="text-xs text-cream-muted">Objective</p>
          <p className="text-sm text-cream">{activeStage.objective}</p>
        </div>
      </div>

      <p className="mb-2 text-xs font-medium text-gold">Product postures</p>
      <div className="mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {c.productPostures.map((p) => (
          <div
            key={p.id}
            className={`rounded border px-3 py-2 ${postureColor(p.posture)}`}
          >
            <p className="text-xs font-medium">{p.name}</p>
            <p className="text-[10px] uppercase tracking-wider opacity-90">
              {postureLabel(p.posture)}
              {p.stage ? ` · Stage ${p.stage}` : ""}
            </p>
            <p className="mt-1 font-serif text-lg">{p.launchPercent}%</p>
          </div>
        ))}
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium text-gold">Blockers</p>
          <ul className="space-y-1 text-xs">
            {c.blockers.map((b) => (
              <li key={b} className="rounded border border-red-400/15 bg-red-400/5 px-2 py-1 text-red-200/90">
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-gold">Founder actions</p>
          <ul className="max-h-40 space-y-1 overflow-y-auto text-xs">
            {c.founderActions.map((a) => (
              <li key={a} className="rounded border border-amber-400/15 bg-amber-400/5 px-2 py-1 text-cream-muted">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-xs font-medium text-gold">Critical risks</p>
        <div className="flex flex-wrap gap-2">
          {c.criticalRisks.map((r) => (
            <span
              key={r}
              className="rounded border border-orange-400/30 bg-orange-500/10 px-2 py-1 text-xs text-orange-200"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6 grid gap-4 border-t border-gold-subtle/30 pt-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium text-forest">Completed today</p>
          <ul className="space-y-1 text-xs text-cream-muted">
            {c.completedToday.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-gold">Tomorrow&apos;s plan</p>
          <ul className="space-y-1 text-xs text-cream-muted">
            {c.tomorrowsPlan.map((item) => (
              <li key={item}>→ {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <StageTaskTable stage={activeStage} highlight />

      <details className="mt-4">
        <summary className="cursor-pointer text-xs text-cream-muted">
          Queued stages (2–4) — no active work until prior stage exits
        </summary>
        <div className="mt-4 space-y-4">
          {c.stages
            .filter((s) => s.id !== c.currentStage)
            .map((stage) => (
              <StageTaskTable key={stage.id} stage={stage} />
            ))}
        </div>
      </details>

      <div className="mt-6 border-t border-gold-subtle/30 pt-4">
        <p className="mb-2 text-xs font-medium text-gold">Version 2 gate — no expansion until complete</p>
        <ul className="flex flex-wrap gap-3 text-xs">
          {c.v2Gate.map((g) => (
            <li key={g.label} className={g.done ? "text-forest" : "text-cream-muted"}>
              {g.done ? "✓" : "○"} {g.label}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-[10px] text-cream-muted/70">
        Success metric: products launched · operating · growing — not commits, PRs, or LOC.
      </p>
    </section>
  );
}

function StageTaskTable({
  stage,
  highlight = false,
}: {
  stage: {
    id: number;
    productName: string;
    objective: string;
    exitCriteria: string;
    estimatedLaunchDate: string;
    tasks: MasterLaunchTask[];
  };
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${highlight ? "border-gold/50 bg-ink-muted" : "border-gold-subtle/25 bg-ink-light"}`}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs text-gold">
            Stage {stage.id} · {stage.productName}
          </p>
          <p className="text-sm text-cream">{stage.objective}</p>
        </div>
        <p className="text-xs text-cream-muted">Exit: {stage.exitCriteria}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gold-subtle/30 text-cream-muted">
              <th className="pb-2 pr-3 font-medium">Task</th>
              <th className="pb-2 pr-3 font-medium">Status</th>
              <th className="pb-2 pr-3 font-medium">Owner</th>
              <th className="pb-2 font-medium">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {stage.tasks.map((task) => (
              <tr key={task.id} className="border-b border-gold-subtle/10">
                <td className="py-2 pr-3 text-cream">{task.label}</td>
                <td className={`py-2 pr-3 capitalize ${taskStatusColor(task.status)}`}>
                  {task.status.replace("_", " ")}
                </td>
                <td className="py-2 pr-3 text-cream-muted">{task.owner}</td>
                <td className="py-2 text-cream-muted">{task.evidence ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OpsChecklistTable({
  title,
  subtitle,
  items,
  accent = "gold",
}: {
  title: string;
  subtitle?: string;
  items: OpsChecklistItem[];
  accent?: "gold" | "forest" | "amber";
}) {
  const border =
    accent === "forest"
      ? "border-forest/40"
      : accent === "amber"
        ? "border-amber-400/30"
        : "border-gold-subtle/40";

  return (
    <section className={`mb-8 rounded-lg border ${border} bg-ink-muted p-5`}>
      <div className="mb-4">
        <h2 className="font-serif text-lg font-semibold text-cream">{title}</h2>
        {subtitle ? <p className="mt-1 text-xs text-cream-muted">{subtitle}</p> : null}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gold-subtle/30 text-cream-muted">
              <th className="pb-2 pr-3 font-medium">Item</th>
              <th className="pb-2 pr-3 font-medium">Status</th>
              <th className="pb-2 pr-3 font-medium">Class</th>
              <th className="pb-2 pr-3 font-medium">Owner</th>
              <th className="pb-2 pr-3 font-medium">ETA</th>
              <th className="pb-2 font-medium">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gold-subtle/10">
                <td className="py-2 pr-3 text-cream">{item.label}</td>
                <td className={`py-2 pr-3 ${opsStatusColor(item.status)}`}>
                  {opsStatusLabel(item.status)}
                </td>
                <td className={`py-2 pr-3 capitalize ${blockerClassColor(item.classification)}`}>
                  {item.classification}
                </td>
                <td className="py-2 pr-3 text-cream-muted">{item.owner}</td>
                <td className="py-2 pr-3 text-cream-muted">{item.eta ?? "—"}</td>
                <td className="py-2 text-cream-muted">{item.evidence ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PortfolioHealthPanel() {
  const w = ECOSYSTEM_WAR_ROOM;

  return (
    <section className="mb-8 rounded-lg border border-gold-subtle/40 bg-ink-muted p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-xs text-cream-muted">Background — Portfolio Health</p>
          <h2 className="font-serif text-xl font-semibold text-cream">Risk & dependencies</h2>
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {w.portfolioHealth.map((p) => (
          <div key={p.id} className="rounded border border-gold-subtle/25 p-3">
            <p className="text-xs text-cream-muted">{p.name}</p>
            <p className="font-serif text-2xl text-cream">{p.readinessPercent}%</p>
            <p className="text-xs text-gold">{p.operationalMode}</p>
          </div>
        ))}
      </div>

      <p className="mb-2 text-xs font-medium text-gold">Risk heatmap</p>
      <div className="flex flex-wrap gap-2">
        {w.riskHeatmap.map((r) => (
          <span
            key={r.id}
            className={`rounded border px-2 py-1 text-xs ${severityColor(r.severity)}`}
          >
            {r.label}
          </span>
        ))}
      </div>
    </section>
  );
}

export function LaunchWarRoomPanel() {
  const warRoom = ECOSYSTEM_WAR_ROOM;
  const report = getMasterLaunchDailyReport();
  const rules = LAUNCH_COMMAND_CENTER.globalRules;

  return (
    <div>
      <div className="mb-8 rounded-lg border border-gold/40 bg-gold-subtle/10 p-4 text-sm">
        <p className="font-medium text-gold">Master Launch Program v1.0</p>
        <p className="mt-1 text-cream-muted">{MASTER_LAUNCH_MISSION}</p>
        <ul className="mt-3 space-y-1 text-xs text-cream-muted">
          {rules.map((r) => (
            <li key={r}>◆ {r}</li>
          ))}
        </ul>
      </div>

      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">Launch Command Center</h1>
      <p className="mb-8 text-cream-muted">
        Updated {LAUNCH_COMMAND_CENTER.updatedAt.slice(0, 10)} · Evidence over estimates · Read-only.
      </p>

      <LaunchCommandCenter />
      <FounderWarRoomOps />

      {LAUNCH_COMMAND_CENTER.stage1Certification.status !== "closed" ? (
        <section className="mb-8 rounded-lg border border-amber-400/40 bg-amber-400/5 p-5">
          <p className="font-mono text-xs text-gold">Stage 1 — Final Deployment Certification</p>
          <h2 className="mb-3 font-serif text-xl font-semibold text-cream">
            {LAUNCH_COMMAND_CENTER.stage1Certification.status === "ready_for_deploy"
              ? "Ready for Founder deploy approval"
              : "Certification in progress"}
          </h2>
          <div className="mb-4 grid gap-3 sm:grid-cols-3 text-xs">
            <div>
              <p className="text-cream-muted">Pre-deploy</p>
              <p className="font-serif text-2xl text-cream">
                {LAUNCH_COMMAND_CENTER.stage1Certification.preDeploymentPercent}%
              </p>
            </div>
            <div>
              <p className="text-cream-muted">Content</p>
              <p className="font-serif text-2xl text-cream">
                {LAUNCH_COMMAND_CENTER.stage1Certification.contentPercent}%
              </p>
            </div>
            <div>
              <p className="text-cream-muted">Email DNS</p>
              <p className="font-serif text-2xl text-cream">
                {LAUNCH_COMMAND_CENTER.stage1Certification.emailDnsPercent}%
              </p>
            </div>
          </div>
          <p className="mb-2 text-xs text-cream-muted">
            Reports: {LAUNCH_COMMAND_CENTER.stage1Certification.reportsPath}
          </p>
          <ul className="space-y-1 text-xs text-red-200/90">
            {LAUNCH_COMMAND_CENTER.stage1Certification.blockers.map((b) => (
              <li key={b}>⛔ {b}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <PortfolioHealthPanel />

      <details className="mb-8 rounded-lg border border-gold-subtle/20 bg-ink-muted p-4">
        <summary className="cursor-pointer text-sm font-medium text-cream-muted">
          Background — product detail checklists (Sprint 009)
        </summary>
        <div className="mt-4">
          <OpsChecklistTable
            title="BamSignal — Stage 2 detail"
            subtitle="Queued · OBSERVATION until HQ → MAINTENANCE"
            items={warRoom.bamsignalReleaseOps}
            accent="amber"
          />
          <OpsChecklistTable
            title="BayRight — Stage 4 detail"
            subtitle="RECOVERY · Provider certification prep only"
            items={warRoom.bayrightCertification}
            accent="forest"
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <OpsChecklistTable
              title="Yike — Stage 3 detail"
              subtitle="FROZEN until Stage 2 observation completes"
              items={warRoom.yikeFrozen}
            />
            <OpsChecklistTable
              title="Stankings HQ — Stage 1 legacy ops"
              items={warRoom.stankingsHqOps}
            />
          </div>
        </div>
      </details>

      <section className="mb-8 rounded-lg border border-gold-subtle/30 bg-ink p-4">
        <h2 className="mb-2 font-serif text-lg text-cream">Public institutional pages</h2>
        <p className="mb-3 text-xs text-cream-muted">
          Sprint 010 — verify on production after Stage 1 deploy:
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          {["/trust", "/legal", "/support", "/status", "/about", "/sitemap.xml", "/robots.txt"].map(
            (path) => (
              <Link key={path} href={path} className="rounded border border-gold-subtle/30 px-2 py-1 text-gold">
                {path}
              </Link>
            ),
          )}
        </div>
      </section>

      <section className="mb-8 rounded-lg border border-gold-subtle/30 bg-ink p-4">
        <h2 className="mb-2 font-serif text-lg text-cream">Health probes</h2>
        <p className="text-xs text-cream-muted">
          <Link href="/api/health?ready=1" className="text-gold">
            /api/health?ready=1
          </Link>
          {" · "}
          <span className="font-mono">GET /api/launch-war-room/probe</span>
        </p>
      </section>

      <details className="mb-8 rounded-lg border border-gold-subtle/20 bg-ink-muted p-4">
        <summary className="cursor-pointer text-sm font-medium text-cream-muted">
          Daily ops report (text)
        </summary>
        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-mono text-xs text-cream-muted">
          {formatDailyReportText(report)}
        </pre>
      </details>
    </div>
  );
}
