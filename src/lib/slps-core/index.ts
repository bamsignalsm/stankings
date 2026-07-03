export {
  SLPS_CORE_ARCHITECTURE,
  SLPS_CORE_FRAMEWORK_ID,
  SLPS_CORE_IDENTIFIER,
  SLPS_CORE_IMPLEMENTATION_RULES,
  SLPS_CORE_MODULES,
  SLPS_CORE_PURPOSE,
  SLPS_CORE_VERSION,
  getSLPSCoreModule,
  type SLPSCoreModule,
  type SLPSCoreModuleStatus,
} from "@/lib/slps-core/registry";

export {
  bumpPublicationVersion,
  createManagedPublicationMetadata,
  validatePublicationMetadata,
  SLPS_PUBLICATION_METADATA_FIELDS,
  type ManagedPublicationMetadata,
  type MetadataEngineInput,
  type MetadataValidationResult,
} from "@/lib/slps-core/metadata-engine";

export {
  getArticleCrossReferences,
  resolveCrossReference,
  resolveCrossReferencesInText,
  type CrossReferenceKind,
  type ResolvedCrossReference,
} from "@/lib/slps-core/cross-reference-engine";

export {
  advanceReview,
  canTransition,
  createReviewState,
  getNextReviewStatus,
  getReviewTransitions,
  SLPS_PUBLICATION_STATUSES,
  type ReviewHistoryEntry,
  type ReviewState,
  type ReviewTransition,
} from "@/lib/slps-core/review-engine";

export {
  getAvailablePublishingFormats,
  PUBLISHING_OUTPUTS,
  requestPublicationExport,
  type PublishRequest,
  type PublishResult,
  type PublishingOutput,
  type PublishingOutputFormat,
} from "@/lib/slps-core/publishing-engine";

export {
  searchInstitutionalLibrary,
  type InstitutionalSearchFilters,
  type InstitutionalSearchResponse,
  type InstitutionalSearchResult,
  type InstitutionalSearchResultKind,
} from "@/lib/slps-core/search-engine";

export {
  INSTITUTIONAL_AI_EXAMPLE_QUERIES,
  INSTITUTIONAL_AI_INTEGRATION_POINTS,
  INSTITUTIONAL_AI_STUB,
  type InstitutionalAICitation,
  type InstitutionalAIQuery,
  type InstitutionalAIResult,
  type InstitutionalAIScope,
  type InstitutionalAIService,
} from "@/lib/slps-core/ai-layer";
