import Link from "next/link";
import { KnowledgeChainGraph } from "@/components/stankings-library/KnowledgeChainGraph";
import { ARTICLE_XIII } from "@/lib/constitution/articles/article-xiii";
import {
  KNOWLEDGE_CONTRIBUTION_TYPES,
  KNOWLEDGE_REVIEW_CRITERIA,
  LIBRARY_PRESERVATION_ITEMS,
} from "@/lib/constitution/articles/article-xiii";
import {
  KGF_STANDARDS,
  KNOWLEDGE_OBJECT_PROFILE_DOMAINS,
  SLP_FRAMEWORK,
  SLP_PURPOSE,
} from "@/lib/frameworks/stankings-library-portal";
import {
  FEATURED_KNOWLEDGE_PROFILES,
  getKnowledgeChain,
  getLibraryPortalStats,
} from "@/lib/stankings-library";
import { EXECUTIVE_DECISION_41 } from "@/lib/iki";
import { CONSTITUTION_PARTS } from "@/lib/constitution/volume-i";

const partIV = CONSTITUTION_PARTS.find((p) => p.id === "part-iv")!;

export function StankingsLibraryPortalHub() {
  const stats = getLibraryPortalStats();
  const chain = getKnowledgeChain();

  return (
    <>
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {partIV.part} · {partIV.title} · {ARTICLE_XIII.article} · {SLP_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            The Stankings Library Portal
          </h1>
          <p className="mx-auto max-w-2xl text-cream-muted">{SLP_PURPOSE}</p>
          <blockquote className="mx-auto mt-8 max-w-xl rounded-lg border border-gold/25 bg-ink-muted px-6 py-4 font-serif text-lg italic text-cream">
            Every generation begins where the previous generation ended — not starting over.
          </blockquote>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <blockquote className="mb-12 rounded-lg border border-gold/30 bg-gold-subtle p-6 text-sm text-cream">
          {EXECUTIVE_DECISION_41}
        </blockquote>

        <section className="mb-12 grid gap-4 sm:grid-cols-6">
          {[
            { label: "Knowledge Objects", value: stats.knowledgeObjects },
            { label: "Canons", value: stats.canons },
            { label: "Frameworks", value: stats.frameworks },
            { label: "Articles", value: stats.articles },
            { label: "Featured Profiles", value: stats.featuredProfiles },
            { label: "AI Embedded", value: stats.withEmbeddings },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-gold-subtle bg-ink-muted p-4 text-center"
            >
              <p className="font-serif text-2xl text-gold">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-cream-muted">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Institutional Knowledge Chain
          </h2>
          <KnowledgeChainGraph nodes={chain.nodes} edges={chain.edges} />
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-cream">
            Knowledge Object Profiles
          </h2>
          <div className="space-y-6">
            {FEATURED_KNOWLEDGE_PROFILES.map((profile) => (
              <article
                key={profile.knowledgeId}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-gold">{profile.knowledgeId}</p>
                    <h3 className="font-serif text-xl font-semibold text-cream">
                      <Link href={profile.href} className="hover:text-gold-light">
                        {profile.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-cream-muted">
                      {profile.category} · {profile.institution}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="uppercase tracking-wider text-gold">{profile.reviewStatus}</p>
                    <p className="text-cream-muted">{profile.accessClassification}</p>
                  </div>
                </div>
                <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-gold">Authors</p>
                    <p className="text-cream-muted">{profile.authors.join(", ")}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-gold">Canon References</p>
                    <p className="text-cream-muted">{profile.canonReferences.join(", ")}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-gold">Version</p>
                    <p className="text-cream-muted">
                      v{profile.versionHistory[0]?.version} · {profile.versionHistory[0]?.date}
                    </p>
                  </div>
                  {profile.constitutionArticles.length > 0 && (
                    <div className="sm:col-span-2 lg:col-span-3">
                      <p className="mb-1 text-xs uppercase tracking-wider text-gold">Constitution</p>
                      <p className="text-cream-muted">{profile.constitutionArticles.join(" · ")}</p>
                    </div>
                  )}
                  {profile.crossReferences.length > 0 && (
                    <div className="sm:col-span-2 lg:col-span-3">
                      <p className="mb-2 text-xs uppercase tracking-wider text-gold">Cross References</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.crossReferences.map((ref) => (
                          <Link
                            key={ref.identifier}
                            href={ref.href ?? "#"}
                            className="rounded border border-gold-subtle px-2 py-1 text-xs text-cream-muted hover:text-gold"
                          >
                            {ref.identifier}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Library Preservation (§ 13.02)", items: LIBRARY_PRESERVATION_ITEMS },
            { title: "Knowledge Contribution (§ 13.05)", items: KNOWLEDGE_CONTRIBUTION_TYPES },
            { title: "Knowledge Review (§ 13.07)", items: KNOWLEDGE_REVIEW_CRITERIA },
            { title: "Object Profile Domains", items: KNOWLEDGE_OBJECT_PROFILE_DOMAINS },
            { title: "KGF Standards (ED 41)", items: KGF_STANDARDS },
          ].map((block) => (
            <div key={block.title} className="rounded-lg border border-gold-subtle bg-ink-muted p-4">
              <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-gold">{block.title}</h3>
              <ul className="space-y-1 text-xs text-cream-muted">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <div className="flex flex-wrap gap-4 border-t border-gold-subtle pt-8 text-sm">
          <Link href="/library/constitution/article-xiii" className="text-gold hover:text-gold-light">
            Article XIII →
          </Link>
          <Link href="/library/constitutional-health" className="text-gold hover:text-gold-light">
            Constitutional Health Dashboard →
          </Link>
          <Link href="/library/constitution-centre" className="text-gold hover:text-gold-light">
            Constitution Centre →
          </Link>
          <Link href="/library/sessions" className="text-gold hover:text-gold-light">
            Library Session Records →
          </Link>
          <Link href="/library/knowledge-graph" className="text-gold hover:text-gold-light">
            Institutional Knowledge Graph →
          </Link>
          <Link href="/library" className="text-gold hover:text-gold-light">
            The Library →
          </Link>
          <Link href="/library/constitutional-trust" className="text-gold hover:text-gold-light">
            Constitutional Trust Centre →
          </Link>
          <Link
            href="/library/frameworks/stankings-library-portal"
            className="text-gold hover:text-gold-light"
          >
            {SLP_FRAMEWORK.identifier} →
          </Link>
        </div>
      </div>
    </>
  );
}
