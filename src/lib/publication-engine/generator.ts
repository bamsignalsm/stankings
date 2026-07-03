/**
 * Publication Engine — scaffold generator per SLPS-001
 * Module 1 of SLPS-CORE — delegates metadata to Metadata Engine
 */

import {
  SLPS_CHAPTER_METADATA_FIELDS,
  SLPS_DIAGRAM_METADATA_FIELDS,
  SLPS_PUBLICATION_METADATA_FIELDS,
  SLPS_PUBLICATION_STATUSES,
  SLPS_PUBLICATION_STRUCTURE,
  type SLPSPublicationStatus,
} from "@/lib/editorial/slps";
import { createManagedPublicationMetadata } from "@/lib/slps-core/metadata-engine";
import { createReviewState } from "@/lib/slps-core/review-engine";

export type PublicationScaffoldSectionStatus = "scaffolded" | "drafted" | "approved";

export interface PublicationScaffoldSection {
  id: string;
  step: number;
  title: string;
  status: PublicationScaffoldSectionStatus;
  draftStatus: "not_started";
}

export interface PublicationScaffoldMetadata {
  publicationId: string;
  volume: string;
  book?: string;
  part?: string;
  edition: string;
  version: string;
  status: SLPSPublicationStatus;
  classification: string;
  owner: string;
  founder: string;
  editorInChief: string;
  authority: string;
  authoritativeSource: string;
  publisher: string;
  reviewStatus: string;
  conventionStatus: string;
  publicationDate: string | null;
  lastReviewed: string | null;
  nextReview: string | null;
  reviewCycle: string;
  relatedVolumes: string[];
  relatedCanons: string[];
  relatedConstitutionArticles: string[];
  knowledgeObjects: string[];
  license: string;
  digitalSignature: string | null;
}

export interface PublicationScaffold {
  scaffoldId: string;
  title: string;
  slpsVersion: string;
  generatedAt: string;
  metadata: PublicationScaffoldMetadata;
  sections: PublicationScaffoldSection[];
  chapterMetadataFields: readonly string[];
  diagramMetadataFields: readonly string[];
  publicationMetadataFields: readonly string[];
  architectureMapPlaceholder: boolean;
  charterPlaceholder: boolean;
  statusTracking: SLPSPublicationStatus;
  reviewState: ReturnType<typeof createReviewState>;
  slpsCoreVersion: string;
}

export interface PublicationGeneratorInput {
  title: string;
  volume: string;
  book?: string;
  part?: string;
  publicationId?: string;
  initialStatus?: SLPSPublicationStatus;
  classification?: string;
  relatedVolumes?: string[];
}

export function generatePublicationScaffold(input: PublicationGeneratorInput): PublicationScaffold {
  const now = new Date().toISOString().slice(0, 10);
  const status: SLPSPublicationStatus = input.initialStatus ?? "Concept";

  const managed = createManagedPublicationMetadata({
    title: input.title,
    volume: input.volume,
    book: input.book,
    part: input.part,
    publicationId: input.publicationId,
    initialStatus: status,
    classification: input.classification,
    relatedVolumes: input.relatedVolumes,
  });

  const sections: PublicationScaffoldSection[] = SLPS_PUBLICATION_STRUCTURE.map((s) => ({
    id: s.id,
    step: s.step,
    title: s.title,
    status: "scaffolded",
    draftStatus: "not_started",
  }));

  return {
    scaffoldId: `scaffold-${managed.publicationId}`,
    title: input.title,
    slpsVersion: managed.slpsVersion,
    slpsCoreVersion: "SLPS-CORE",
    generatedAt: now,
    metadata: {
      publicationId: managed.publicationId,
      volume: managed.volume,
      book: managed.book,
      part: managed.part,
      edition: managed.edition,
      version: managed.version,
      status: managed.status,
      classification: managed.classification,
      owner: managed.owner,
      founder: managed.founder,
      editorInChief: managed.editorInChief,
      authority: managed.authority,
      authoritativeSource: managed.authoritativeSource,
      publisher: managed.publisher,
      reviewStatus: managed.reviewStatus,
      conventionStatus: managed.conventionStatus,
      publicationDate: managed.publicationDate,
      lastReviewed: managed.lastReviewed,
      nextReview: managed.nextReview,
      reviewCycle: managed.reviewCycle,
      relatedVolumes: managed.relatedVolumes,
      relatedCanons: managed.relatedCanons,
      relatedConstitutionArticles: managed.relatedConstitutionArticles,
      knowledgeObjects: managed.knowledgeObjects,
      license: managed.license,
      digitalSignature: managed.digitalSignature,
    },
    sections,
    chapterMetadataFields: SLPS_CHAPTER_METADATA_FIELDS,
    diagramMetadataFields: SLPS_DIAGRAM_METADATA_FIELDS,
    publicationMetadataFields: SLPS_PUBLICATION_METADATA_FIELDS,
    architectureMapPlaceholder: true,
    charterPlaceholder: true,
    statusTracking: status,
    reviewState: createReviewState(status),
  };
}

export const PUBLICATION_GENERATOR_PRESETS = [
  {
    id: "volume-ii-book",
    label: "Volume II — Book",
    defaults: {
      volume: "Volume II — Governance Code",
      classification: "Governance Law",
      relatedVolumes: ["Volume I — Constitution", "Volume 0 — The Canons"],
    },
  },
  {
    id: "engineering-standard",
    label: "Engineering Standard",
    defaults: {
      volume: "Engineering Standards",
      classification: "Engineering Standards",
      relatedVolumes: ["Volume I — Constitution"],
    },
  },
  {
    id: "research-paper",
    label: "Research / White Paper",
    defaults: {
      volume: "Library Research",
      classification: "Research",
      relatedVolumes: [],
    },
  },
] as const;

export { SLPS_PUBLICATION_STATUSES };
