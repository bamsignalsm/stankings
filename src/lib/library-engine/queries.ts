import { createClient } from "@/lib/supabase/server";
import type { KnowledgeObject, KnowledgeReference } from "@/lib/standards/ls-001";
import {
  getAllStaticKnowledgeObjects,
  getStaticKnowledgeObject,
} from "@/lib/library-engine/seed";

interface KnowledgeObjectRow {
  id: string;
  identifier: string;
  object_type: string;
  title: string;
  summary: string;
  volume_label: string | null;
  volume_slug: string | null;
  category: string | null;
  status: string;
  version: string;
  author: string | null;
  approver: string | null;
  owner: string;
  review_date: string | null;
  visibility: string;
  body_markdown: string | null;
  section_anchor: string | null;
  search_keywords: string[];
  related_companies: string[];
  related_systems: string[];
  supersedes_identifier: string | null;
  superseded_by_identifier: string | null;
  created_at: string;
  updated_at: string;
}

function rowToKnowledgeObject(
  row: KnowledgeObjectRow,
  refs: KnowledgeReference[] = [],
  referencedBy: KnowledgeReference[] = [],
  tags: string[] = []
): KnowledgeObject {
  return {
    id: row.id,
    identifier: row.identifier,
    objectType: row.object_type as KnowledgeObject["objectType"],
    title: row.title,
    summary: row.summary,
    volume: row.volume_label,
    volumeSlug: row.volume_slug,
    category: row.category,
    status: row.status as KnowledgeObject["status"],
    version: row.version,
    author: row.author,
    approver: row.approver,
    owner: row.owner,
    createdAt: row.created_at.slice(0, 10),
    updatedAt: row.updated_at.slice(0, 10),
    reviewDate: row.review_date,
    visibility: row.visibility as KnowledgeObject["visibility"],
    tags,
    dependencies: refs
      .filter((r) => r.note === "depends_on")
      .map((r) => r.identifier),
    references: refs,
    referencedBy,
    supersedes: row.supersedes_identifier,
    supersededBy: row.superseded_by_identifier,
    relatedCompanies: row.related_companies ?? [],
    relatedSystems: row.related_systems ?? [],
    searchKeywords: row.search_keywords ?? [],
    sectionAnchor: row.section_anchor,
    bodyMarkdown: row.body_markdown,
  };
}

async function loadRelationships(
  supabase: Awaited<ReturnType<typeof createClient>>,
  identifier: string
) {
  const [{ data: outgoing }, { data: incoming }] = await Promise.all([
    supabase
      .from("stankings_knowledge_relationships")
      .select("target_identifier, relationship_type, note")
      .eq("source_identifier", identifier),
    supabase
      .from("stankings_knowledge_relationships")
      .select("source_identifier, relationship_type, note")
      .eq("target_identifier", identifier),
  ]);

  const refs: KnowledgeReference[] = (outgoing ?? []).map((r) => ({
    identifier: r.target_identifier,
    title: r.target_identifier,
    note: r.note ?? r.relationship_type,
  }));

  const referencedBy: KnowledgeReference[] = (incoming ?? []).map((r) => ({
    identifier: r.source_identifier,
    title: r.source_identifier,
    note: r.note ?? r.relationship_type,
  }));

  return { refs, referencedBy };
}

export async function getKnowledgeObjectByIdentifier(
  identifier: string
): Promise<KnowledgeObject | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stankings_knowledge_objects")
    .select("*")
    .eq("identifier", identifier)
    .maybeSingle();

  if (error || !data) {
    return getStaticKnowledgeObject(identifier);
  }

  const row = data as KnowledgeObjectRow;
  const { refs, referencedBy } = await loadRelationships(supabase, identifier);
  const staticKo = getStaticKnowledgeObject(identifier);

  const ko = rowToKnowledgeObject(row, refs, referencedBy, row.search_keywords ?? []);
  if (staticKo?.importance != null) ko.importance = staticKo.importance;
  if (staticKo?.historicalNotes) ko.historicalNotes = staticKo.historicalNotes;

  return ko;
}

export async function listKnowledgeObjects(): Promise<KnowledgeObject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stankings_knowledge_objects")
    .select("*")
    .order("identifier", { ascending: true });

  if (error || !data?.length) {
    return getAllStaticKnowledgeObjects();
  }

  return Promise.all(
    (data as KnowledgeObjectRow[]).map(async (row) => {
      const { refs, referencedBy } = await loadRelationships(
        supabase,
        row.identifier
      );
      return rowToKnowledgeObject(row, refs, referencedBy, row.search_keywords ?? []);
    })
  );
}

export async function searchKnowledgeObjects(
  query: string
): Promise<KnowledgeObject[]> {
  const q = query.trim().toLowerCase();
  if (!q) return listKnowledgeObjects();

  const all = await listKnowledgeObjects();
  return all.filter(
    (ko) =>
      ko.identifier.toLowerCase().includes(q) ||
      ko.title.toLowerCase().includes(q) ||
      ko.summary.toLowerCase().includes(q) ||
      ko.searchKeywords.some((k) => k.toLowerCase().includes(q)) ||
      ko.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export async function getLibraryEngineStats() {
  const objects = await listKnowledgeObjects();
  const approved = objects.filter((o) => o.status === "approved").length;
  const draft = objects.filter((o) => o.status === "draft").length;
  const inReview = objects.filter((o) => o.status === "in_review").length;
  const canons = objects.filter((o) => o.objectType === "canon").length;
  const standards = objects.filter((o) => o.objectType === "standard").length;

  return {
    total: objects.length,
    approved,
    draft,
    inReview,
    canons,
    standards,
    source: objects[0]?.id.startsWith("seed-") ? "static" : "database",
  };
}

export function getKnowledgeObjectHref(ko: KnowledgeObject): string {
  if (ko.objectType === "canon") {
    return `/library/canon/${encodeURIComponent(ko.identifier)}`;
  }
  if (ko.identifier === "LS-001") {
    return "/library/standards/ls-001";
  }
  if (ko.identifier === "LS-002") {
    return "/library/standards/ls-002";
  }
  if (ko.identifier === "FRAMEWORK-TIA-001") {
    return "/library/frameworks/trust-impact-assessment";
  }
  if (ko.identifier === "FRAMEWORK-PAF-001") {
    return "/library/frameworks/purpose-assessment";
  }
  if (ko.identifier === "FRAMEWORK-LSF-001") {
    return "/library/frameworks/leadership-stewardship";
  }
  if (ko.identifier === "FRAMEWORK-EIA-001") {
    return "/library/frameworks/ecosystem-impact-assessment";
  }
  if (ko.identifier === "FRAMEWORK-GRF-001") {
    return "/library/frameworks/generational-review";
  }
  if (ko.identifier === "FRAMEWORK-IDR-001") {
    return "/library/frameworks/institutional-decision-record";
  }
  if (ko.identifier === "FRAMEWORK-EXF-001") {
    return "/library/frameworks/excellence";
  }
  if (ko.objectType === "decision_record") {
    return `/library/decisions/${encodeURIComponent(ko.identifier)}`;
  }
  if (ko.volumeSlug === "first-principles" && ko.sectionAnchor) {
    return `/library/first-principles#${ko.sectionAnchor}`;
  }
  if (ko.volumeSlug === "constitution") {
    return "/library/constitution";
  }
  if (ko.volumeSlug) {
    return `/library/volumes/${ko.volumeSlug}`;
  }
  return `/energy/library/objects/${encodeURIComponent(ko.identifier)}`;
}
