"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  PLATFORM_REGISTRY,
  type PlatformStatus,
  searchPlatforms,
} from "@/lib/platforms/registry";

const STATUS_LABELS: Record<PlatformStatus, string> = {
  active: "Active",
  planned: "Planned",
  proposed: "Proposed",
  deprecated: "Deprecated",
};

function statusStyle(status: PlatformStatus) {
  const map = {
    active: "text-forest border-forest/30 bg-forest/10",
    planned: "text-gold border-gold/30 bg-gold/10",
    proposed: "text-cream-muted border-gold-subtle bg-ink",
    deprecated: "text-burgundy border-burgundy/30 bg-burgundy/10",
  };
  return map[status];
}

function PlatformCard({
  platform,
}: {
  platform: (typeof PLATFORM_REGISTRY)[number];
}) {
  return (
    <article className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl font-semibold text-cream">
            {platform.name}
          </h3>
          <p className="mt-1 text-sm text-cream-muted">{platform.summary}</p>
        </div>
        <span
          className={`rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${statusStyle(platform.status)}`}
        >
          {STATUS_LABELS[platform.status]}
        </span>
      </div>

      <dl className="mb-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">Owner</dt>
          <dd className="text-cream">
            {platform.ownerSlug ? (
              <Link
                href={`/library/ecosystem/${platform.ownerSlug}`}
                className="text-gold hover:text-gold-light"
              >
                {platform.owner}
              </Link>
            ) : (
              platform.owner
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-cream-muted">APIs</dt>
          <dd className="text-cream">{platform.apis.join(" · ")}</dd>
        </div>
      </dl>

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-gold">Consumers</p>
        <ul className="flex flex-wrap gap-2">
          {platform.consumers.map((c) => (
            <li
              key={c}
              className="rounded-full border border-gold-subtle bg-ink px-3 py-1 text-xs text-cream-muted"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs uppercase tracking-widest text-cream-muted">Capabilities</p>
        <ul className="space-y-1 text-sm text-cream-muted">
          {platform.capabilities.map((cap) => (
            <li key={cap}>· {cap}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        {platform.canonReferences.map((ref) => (
          <Link
            key={ref}
            href={`/library/canon/${ref}`}
            className="text-gold hover:text-gold-light"
          >
            {ref}
          </Link>
        ))}
      </div>
    </article>
  );
}

export function PlatformRegistryHub() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<PlatformStatus | "all">("all");

  const platforms = useMemo(() => {
    let results = searchPlatforms(query);
    if (status !== "all") {
      results = results.filter((p) => p.status === status);
    }
    return results;
  }, [query, status]);

  const activeCount = PLATFORM_REGISTRY.filter((p) => p.status === "active").length;
  const plannedCount = PLATFORM_REGISTRY.filter((p) => p.status === "planned").length;

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            CANON-012 · Architectural Canon
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Platform Registry
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">
            Shared institutional capabilities — who owns them, who consumes them,
            and whether to build or reuse.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1 space-y-4">
            <input
              type="search"
              placeholder="Search platforms, APIs, consumers…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gold-subtle bg-ink-muted px-4 py-3 text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {(["all", "active", "planned", "proposed"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
                    status === s
                      ? "border-gold/40 bg-gold-subtle text-gold"
                      : "border-gold-subtle text-cream-muted hover:border-gold/30"
                  }`}
                >
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>
          </div>
          <div className="text-right text-sm text-cream-muted">
            <p>
              {activeCount} active · {plannedCount} planned
            </p>
            <p className="mt-1">{PLATFORM_REGISTRY.length} platforms registered</p>
          </div>
        </div>

        <section className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">
            The Platform Test
          </p>
          <blockquote className="font-serif text-lg italic text-cream">
            &ldquo;Can another institution already provide this? Can this become a
            shared platform? Will reuse strengthen the ecosystem?&rdquo;
          </blockquote>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href="/library/canon/CANON-012"
              className="text-gold hover:text-gold-light"
            >
              CANON-012 →
            </Link>
            <Link
              href="/library/frameworks/platform-assessment"
              className="text-gold hover:text-gold-light"
            >
              Platform Assessment →
            </Link>
            <Link href="/library/ecosystem" className="text-cream-muted hover:text-gold">
              Ecosystem Map →
            </Link>
          </div>
        </section>

        <div className="hidden overflow-x-auto rounded-lg border border-gold-subtle lg:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gold-subtle bg-ink-muted text-xs uppercase tracking-widest text-cream-muted">
                <th className="px-4 py-3 font-medium">Platform</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Consumers</th>
                <th className="px-4 py-3 font-medium">APIs</th>
                <th className="px-4 py-3 font-medium">Canons</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((p) => (
                <tr key={p.id} className="border-b border-gold-subtle/50">
                  <td className="px-4 py-4 font-medium text-cream">{p.name}</td>
                  <td className="px-4 py-4 text-cream-muted">{p.owner}</td>
                  <td className="max-w-[12rem] px-4 py-4 text-cream-muted">
                    {p.consumers.slice(0, 3).join(", ")}
                    {p.consumers.length > 3 && ` +${p.consumers.length - 3}`}
                  </td>
                  <td className="px-4 py-4 text-cream-muted">{p.apis[0]}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {p.canonReferences.map((ref) => (
                        <Link
                          key={ref}
                          href={`/library/canon/${ref}`}
                          className="text-xs text-gold hover:text-gold-light"
                        >
                          {ref.replace("CANON-", "")}
                        </Link>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider ${statusStyle(p.status)}`}
                    >
                      {STATUS_LABELS[p.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-6 lg:hidden">
          {platforms.map((p) => (
            <PlatformCard key={p.id} platform={p} />
          ))}
        </div>

        {platforms.length === 0 && (
          <p className="py-12 text-center text-cream-muted">
            No platforms match your search.
          </p>
        )}
      </div>
    </>
  );
}
