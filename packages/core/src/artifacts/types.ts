export interface ArchivedArtifact {
  type: string;
  name: string;
  path?: string;
  sha256: string;
}

export interface ReleaseArchiveManifest {
  releaseId: string;
  archivedAt: string;
  artifacts: ArchivedArtifact[];
}
