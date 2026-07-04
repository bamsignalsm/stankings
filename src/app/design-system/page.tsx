import type { Metadata } from "next";
import Link from "next/link";
import { DesignSystemDemo } from "@/components/design-system/DesignSystemDemo";
import { SectionHero, LegalNotice } from "@/components/ui";
import { COMPONENT_CATALOGUE, TOKEN_GROUPS, designTokens } from "@/lib/design-system";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Design System",
  description:
    "Official Stankings design system — tokens and reusable components for HQ, BamSignal, Yike, and BayRight.",
  path: "/design-system",
});

export default function DesignSystemPage() {
  return (
    <div className="pt-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Stankings Design System",
          url: "https://stankings.com/design-system",
        }}
      />
      <SectionHero
        eyebrow="Design System"
        title="Official Stankings design system"
        description="Reusable tokens and components for every Stankings company. Enterprise motion, Legacy Gold palette, and accessibility defaults."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Design System" },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl space-y-14 px-6">
          <LegalNotice>
            Import tokens from <code className="text-gold">@/lib/design-system</code> and
            components from <code className="text-gold">@/components/ui</code>. Do not fork
            colors or button styles per product.
          </LegalNotice>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Developer guidance</h2>
            <pre className="overflow-x-auto rounded-lg border border-gold-subtle bg-ink-muted p-4 text-xs text-cream-muted">
{`import { designTokens, colors } from "@/lib/design-system";
import { Button, Input, Alert, Tabs } from "@/components/ui";

// Tokens (TypeScript)
colors.legacyGold // #D4A64A
designTokens.spacing[4] // 1rem

// CSS variables
// var(--color-legacy-gold)
// var(--ds-duration-normal)
// var(--ds-elevation-md)`}
            </pre>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Token groups</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TOKEN_GROUPS.map((group) => (
                <div
                  key={group.id}
                  className="rounded-lg border border-gold-subtle bg-ink-muted p-4"
                >
                  <h3 className="font-serif text-lg text-cream">{group.name}</h3>
                  <p className="mt-1 text-sm text-cream-muted">{group.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-4">
              {Object.entries(designTokens.colors)
                .slice(0, 8)
                .map(([name, hex]) => (
                  <div key={name} className="overflow-hidden rounded-sm border border-gold-subtle">
                    <div className="h-10" style={{ backgroundColor: hex }} />
                    <p className="bg-ink-muted px-2 py-1 font-mono text-[10px] text-cream-muted">
                      {name}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Component catalogue</h2>
            <div className="overflow-x-auto rounded-lg border border-gold-subtle">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gold-subtle bg-ink-light">
                    <th className="px-4 py-3 text-xs tracking-widest text-gold uppercase">
                      Component
                    </th>
                    <th className="px-4 py-3 text-xs tracking-widest text-gold uppercase">
                      Category
                    </th>
                    <th className="px-4 py-3 text-xs tracking-widest text-gold uppercase">
                      Import
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPONENT_CATALOGUE.map((c) => (
                    <tr key={c.id} className="border-b border-gold-subtle last:border-0">
                      <td className="px-4 py-3 text-cream">{c.name}</td>
                      <td className="px-4 py-3 capitalize text-cream-muted">{c.category}</td>
                      <td className="px-4 py-3 font-mono text-xs text-cream-muted">
                        {c.importPath}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-cream">Live examples</h2>
            <DesignSystemDemo />
          </div>

          <p className="text-sm text-cream-muted">
            Related:{" "}
            <Link href="/brand" className="text-gold">
              Brand Center
            </Link>
            {" · "}
            <Link href="/developer" className="text-gold">
              Developer Center
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
