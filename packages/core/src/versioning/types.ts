export interface ProductVersion {
  label: string;
  versionName?: string;
  versionCode?: string;
  buildMarker?: string;
  commitSha?: string;
}

export function formatVersionLabel(version: ProductVersion): string {
  if (version.buildMarker) return version.buildMarker;
  if (version.versionName && version.versionCode) {
    return `${version.versionName} (${version.versionCode})`;
  }
  return version.label;
}
