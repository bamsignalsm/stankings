import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { CareerPost } from "@/lib/types";
import { EmptyState } from "@/components/institutional/InstitutionalPageShell";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { buildPageMetadata } from "@/lib/seo";
import {
  getOrgCompanies,
  RECRUITMENT_STATUS_LABELS,
  type RecruitmentStatus,
} from "@/lib/organization/registry";
import { formatCareerLocation, STANKINGS_HQ_LOCATION } from "@/lib/careers/location";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers",
  description:
    "Careers at Stankings Legacy Ltd — culture, benefits, hiring philosophy, and open positions.",
  path: "/career",
});

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ company?: string }>;
}) {
  const { company } = await searchParams;
  const orgCompanies = getOrgCompanies();

  let posts: CareerPost[] = [];
  const companyStatuses: Record<string, RecruitmentStatus> = {};
  try {
    const supabase = await createClient();
    const { data: orgRows } = await supabase
      .from("organization_companies")
      .select("company_id, recruitment_status");
    for (const row of orgRows ?? []) {
      companyStatuses[row.company_id] = row.recruitment_status as RecruitmentStatus;
    }

    let q = supabase
      .from("stankings_career_posts")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (company) q = q.eq("company_id", company);
    const { data } = await q;
    const recruitingIds = new Set(
      orgCompanies
        .filter((c) => (companyStatuses[c.id] ?? c.recruitmentStatus) === "recruiting")
        .map((c) => c.id)
    );
    posts = ((data ?? []) as CareerPost[]).filter((p) => {
      return !p.company_id || recruitingIds.has(p.company_id);
    });
  } catch {
    posts = [];
  }

  return (
    <div className="pt-20">
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-xs tracking-[0.35em] text-gold uppercase">
            Stankings Legacy Ltd Careers
          </p>
          <h1 className="mb-6 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Build institutions that empower generations
          </h1>
          <p className="text-lg text-cream-muted">
            Apply with your Stankings Passport. One lifetime identity — employment
            is a capability, never a second account. Headquarters:{" "}
            {STANKINGS_HQ_LOCATION.display}.
          </p>
        </div>
      </section>

      <section className="border-b border-gold-subtle py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-4 font-serif text-xl text-cream">Companies</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {orgCompanies.map((c) => {
              const status =
                companyStatuses[c.id] ?? c.recruitmentStatus;
              return (
                <Link
                  key={c.id}
                  href={`/career?company=${c.id}`}
                  className={`rounded-sm border px-4 py-3 ${
                    company === c.id
                      ? "border-gold"
                      : "border-gold-subtle hover:border-gold/40"
                  }`}
                >
                  <p className="text-cream">{c.name}</p>
                  <p className="text-xs text-gold">
                    {RECRUITMENT_STATUS_LABELS[status]}
                  </p>
                </Link>
              );
            })}
          </div>
          {company ? (
            <p className="mt-4 text-sm">
              <Link href="/career" className="text-gold">
                Clear company filter
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-2xl text-cream">Open positions</h2>
            <p className="text-sm text-cream-muted">{posts.length} roles</p>
          </div>

          {posts.length === 0 ? (
            <EmptyState
              title="No open positions for this filter"
              body={`Companies may be Hiring Soon or Not Recruiting. Check back, or write ${CONTACTS.careers}.`}
            />
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/career/${post.slug}`}
                  className="block rounded-lg border border-gold-subtle bg-ink-muted p-6 transition hover:border-gold/40"
                >
                  <p className="text-xs tracking-widest text-gold uppercase">
                    {post.company_area}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-cream">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-cream-muted">
                    {formatCareerLocation(
                      post.location,
                      (post as CareerPost & { work_location_type?: string })
                        .work_location_type
                    )}{" "}
                    · {post.employment_type}
                    {post.department_slug ? ` · ${post.department_slug}` : ""}
                    {post.workspace_key ? ` · ${post.workspace_key}` : ""}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12 rounded-lg border border-gold-subtle bg-ink-muted p-6">
            <h2 className="mb-2 font-serif text-xl text-cream">Application process</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-cream-muted">
              <li>Create or sign in with your Stankings Passport.</li>
              <li>Apply and track progress on your Applicant Dashboard.</li>
              <li>On hire, workforce access attaches to the same Passport.</li>
              <li>Employees work in /skl — never Energy.</li>
            </ol>
            <p className="mt-4 text-sm">
              <Link href="/passport/applicant" className="text-gold hover:text-gold-light">
                Applicant Dashboard →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
