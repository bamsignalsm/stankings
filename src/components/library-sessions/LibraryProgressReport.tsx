import Link from "next/link";
import {
  formatProgressReportText,
  getLibraryProgressReport,
} from "@/lib/library-sessions/progress";

export function LibraryProgressReport({ showPre = false }: { showPre?: boolean }) {
  const report = getLibraryProgressReport();
  const text = formatProgressReportText(report);

  return (
    <section className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <h2 className="mb-4 font-serif text-xl font-semibold text-cream">Progress Report</h2>
      {showPre ? (
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-cream-muted">
          {text}
        </pre>
      ) : (
        <div className="space-y-6 text-sm">
          <div>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-gold">
              Foundation
            </h3>
            <ul className="space-y-1">
              {report.volumesCompleted.map((v) => (
                <li key={v.href} className="text-cream">
                  ✓{" "}
                  <Link href={v.href} className="text-gold hover:text-gold-light">
                    {v.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-gold">
              Volume In Progress
            </h3>
            <p className="text-cream">
              ▶{" "}
              <Link
                href={report.volumeInProgress.href}
                className="text-gold hover:text-gold-light"
              >
                {report.volumeInProgress.label}
              </Link>
            </p>
            <p className="text-cream-muted">{report.volumeInProgress.detail}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Books (Vol II)",
                value: `${report.booksCompleted.completed} / ${report.booksCompleted.total}`,
              },
              {
                label: "Constitution",
                value: `${report.constitution.completed} / ${report.constitution.total}`,
                sub: report.constitution.status,
              },
              { label: "Canons", value: `${report.canons.approved}`, sub: report.canons.status },
              { label: "Convention", value: report.convention.status },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded border border-gold-subtle bg-ink p-3 text-center"
              >
                <p className="font-serif text-lg text-gold">{s.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-cream-muted">{s.label}</p>
                {s.sub && <p className="mt-1 text-[10px] text-cream-muted">{s.sub}</p>}
              </div>
            ))}
          </div>

          <p className="border-t border-gold-subtle pt-4 text-center font-serif italic text-gold">
            &ldquo;{report.editorialMotto}&rdquo;
          </p>
        </div>
      )}
    </section>
  );
}
