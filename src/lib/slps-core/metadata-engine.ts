/**
 * SLPS-CORE Module 2 — Metadata Engine
 * System-managed publication metadata. Required fields enforced.
 */

import {
  SLPS_PUBLICATION_METADATA_FIELDS,
  type SLPSPublicationStatus,
} from "@/lib/editorial/slps";

export interface ManagedPublicationMetadata {
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
  managedBy: "SLPS-CORE";
  slpsVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface MetadataEngineInput {
  title: string;
  volume: string;
  book?: string;
  part?: string;
  publicationId?: string;
  initialStatus?: SLPSPublicationStatus;
  classification?: string;
  relatedVolumes?: string[];
}

export interface MetadataValidationResult {
  valid: boolean;
  missingFields: string[];
  warnings: string[];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function computePublicationId(input: MetadataEngineInput): string {
  const date = new Date().toISOString().slice(0, 10);
  if (input.publicationId) return input.publicationId;
  return `PUB-${slugify(input.volume)}${input.book ? `-${slugify(input.book)}` : ""}-${date}`;
}

function computeNextReview(reviewCycle: string, fromDate: string): string {
  const base = new Date(fromDate);
  if (reviewCycle === "Annual") {
    base.setFullYear(base.getFullYear() + 1);
  } else if (reviewCycle === "Biennial") {
    base.setFullYear(base.getFullYear() + 2);
  } else {
    base.setFullYear(base.getFullYear() + 5);
  }
  return base.toISOString().slice(0, 10);
}

/** Creates system-managed metadata — never hand-edited in production. */
export function createManagedPublicationMetadata(
  input: MetadataEngineInput,
): ManagedPublicationMetadata {
  const now = new Date().toISOString().slice(0, 10);
  const publicationId = computePublicationId(input);
  const reviewCycle = "Annual";

  return {
    publicationId,
    volume: input.volume,
    book: input.book,
    part: input.part,
    edition: "1",
    version: "0.1",
    status: input.initialStatus ?? "Concept",
    classification: input.classification ?? "Internal — Employee",
    owner: "Library Council",
    founder: "Stanley Ukeje",
    editorInChief: "Editor-in-Chief",
    authority: "Stankings Library Editorial Standards",
    authoritativeSource: "SLPS-001",
    publisher: "Stankings Library",
    reviewStatus: "Not started",
    conventionStatus: "Not applicable",
    publicationDate: null,
    lastReviewed: null,
    nextReview: computeNextReview(reviewCycle, now),
    reviewCycle,
    relatedVolumes: input.relatedVolumes ?? [],
    relatedCanons: [],
    relatedConstitutionArticles: [],
    knowledgeObjects: [],
    license: "Stankings Library — Internal Use",
    digitalSignature: null,
    managedBy: "SLPS-CORE",
    slpsVersion: "SLPS-001",
    createdAt: now,
    updatedAt: now,
  };
}

export function bumpPublicationVersion(
  metadata: ManagedPublicationMetadata,
  bump: "patch" | "minor" | "major" = "patch",
): ManagedPublicationMetadata {
  const [major, minor, patch] = metadata.version.split(".").map(Number);
  let nextVersion: string;
  if (bump === "major") nextVersion = `${major + 1}.0.0`;
  else if (bump === "minor") nextVersion = `${major}.${minor + 1}.0`;
  else nextVersion = `${major}.${minor}.${(patch ?? 0) + 1}`;

  const now = new Date().toISOString().slice(0, 10);
  return {
    ...metadata,
    version: nextVersion,
    updatedAt: now,
    lastReviewed: now,
    nextReview: computeNextReview(metadata.reviewCycle, now),
  };
}

export function validatePublicationMetadata(
  metadata: Partial<ManagedPublicationMetadata>,
): MetadataValidationResult {
  const required: (keyof ManagedPublicationMetadata)[] = [
    "publicationId",
    "volume",
    "edition",
    "version",
    "status",
    "owner",
    "founder",
    "editorInChief",
    "authority",
    "authoritativeSource",
    "publisher",
    "reviewCycle",
    "license",
    "managedBy",
    "slpsVersion",
  ];

  const missingFields = required.filter((field) => {
    const value = metadata[field];
    return value === undefined || value === null || value === "";
  });

  const warnings: string[] = [];
  if (!metadata.digitalSignature && metadata.status === "Published") {
    warnings.push("Published publications should carry a digital signature.");
  }
  if (!metadata.nextReview) {
    warnings.push("Review cycle date not set.");
  }

  return {
    valid: missingFields.length === 0,
    missingFields: missingFields.map(
      (f) => SLPS_PUBLICATION_METADATA_FIELDS.find((label) => label.toLowerCase().includes(f)) ?? f,
    ),
    warnings,
  };
}

export { SLPS_PUBLICATION_METADATA_FIELDS };
