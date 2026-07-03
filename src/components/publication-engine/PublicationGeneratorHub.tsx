"use client";

import { useState } from "react";
import Link from "next/link";
import {
  generatePublicationScaffold,
  PUBLICATION_GENERATOR_PRESETS,
  type PublicationScaffold,
} from "@/lib/publication-engine";
import { SLPS_PUBLICATION_STATUSES } from "@/lib/editorial/slps";

export function PublicationGeneratorHub() {
  const [title, setTitle] = useState("New Publication");
  const [volume, setVolume] = useState("Volume II — Governance Code");
  const [book, setBook] = useState("");
  const [scaffold, setScaffold] = useState<PublicationScaffold | null>(null);

  function handleGenerate() {
    setScaffold(
      generatePublicationScaffold({
        title,
        volume,
        book: book || undefined,
        initialStatus: "Concept",
      }),
    );
  }

  function applyPreset(presetId: string) {
    const preset = PUBLICATION_GENERATOR_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setVolume(preset.defaults.volume);
    setTitle(preset.label);
    setBook("");
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
        <p className="mb-2 text-xs uppercase tracking-wider text-gold">SLPS-001 · Publication Engine</p>
        <h1 className="mb-4 font-serif text-3xl font-semibold text-cream">Publication Generator</h1>
        <p className="text-sm text-cream-muted">
          Scaffold a new publication from SLPS-001 — structure, metadata, and status tracking. No
          content is generated automatically.
        </p>
      </header>

      <section className="mb-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
        <h2 className="mb-4 font-serif text-lg text-cream">Generate Scaffold</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {PUBLICATION_GENERATOR_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p.id)}
              className="rounded border border-gold-subtle px-3 py-1 text-xs text-cream-muted hover:border-gold hover:text-gold"
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-wider text-gold">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-gold-subtle bg-ink px-3 py-2 text-cream"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-wider text-gold">Volume</span>
            <input
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full rounded border border-gold-subtle bg-ink px-3 py-2 text-cream"
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block text-xs uppercase tracking-wider text-gold">Book (optional)</span>
            <input
              value={book}
              onChange={(e) => setBook(e.target.value)}
              placeholder="e.g. Book I — Governance Bodies"
              className="w-full rounded border border-gold-subtle bg-ink px-3 py-2 text-cream"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          className="mt-6 rounded border border-gold bg-gold-subtle px-6 py-2 text-sm font-medium text-cream hover:bg-gold/20"
        >
          Generate SLPS Scaffold
        </button>
      </section>

      {scaffold && (
        <section className="space-y-8">
          <div className="rounded-lg border border-forest/30 bg-forest/10 p-6">
            <p className="font-mono text-xs text-gold">{scaffold.metadata.publicationId}</p>
            <h2 className="font-serif text-2xl text-cream">{scaffold.title}</h2>
            <p className="mt-2 text-sm text-cream-muted">
              {scaffold.slpsVersion} · Generated {scaffold.generatedAt} · Status:{" "}
              {scaffold.statusTracking}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg text-cream">Publication Metadata (visible)</h3>
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(scaffold.metadata).map(([key, value]) => (
                <div key={key} className="rounded border border-gold-subtle p-3">
                  <dt className="text-[10px] uppercase tracking-wider text-gold">{key}</dt>
                  <dd className="mt-1 text-sm text-cream-muted">
                    {Array.isArray(value) ? value.join(", ") || "—" : String(value ?? "—")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg text-cream">Publication Structure (15 sections)</h3>
            <ol className="space-y-2">
              {scaffold.sections.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between rounded border border-gold-subtle bg-ink-muted px-4 py-3 text-sm"
                >
                  <span>
                    <span className="mr-3 font-mono text-gold">{s.step}.</span>
                    <span className="text-cream">{s.title}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-cream-muted">
                    {s.status} · {s.draftStatus.replace("_", " ")}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded border border-dashed border-gold-subtle p-4">
              <p className="mb-2 text-xs uppercase tracking-wider text-gold">Charter placeholder</p>
              <p className="text-sm text-cream-muted">
                {scaffold.charterPlaceholder ? "Ready — Foundational Charter shell" : "N/A"}
              </p>
            </div>
            <div className="rounded border border-dashed border-gold-subtle p-4">
              <p className="mb-2 text-xs uppercase tracking-wider text-gold">Architecture Map placeholder</p>
              <p className="text-sm text-cream-muted">
                {scaffold.architectureMapPlaceholder ? "Ready — visual map shell" : "N/A"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-serif text-lg text-cream">Status Lifecycle</h3>
            <p className="font-mono text-xs text-cream-muted">
              {SLPS_PUBLICATION_STATUSES.join(" → ")}
            </p>
          </div>

          <pre className="overflow-x-auto rounded-lg border border-gold-subtle bg-ink p-4 font-mono text-xs text-cream-muted">
            {JSON.stringify(scaffold, null, 2)}
          </pre>
        </section>
      )}

      <div className="mt-12 flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
        <Link
          href="/library/editorial-standards/publishing-standard"
          className="text-gold hover:text-gold-light"
        >
          ← SLPS-001
        </Link>
      </div>
    </div>
  );
}
