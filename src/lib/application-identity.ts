import { getDeploymentMetadata } from "./deploy-metadata";

/** Static product identity — runtime fields merged via getApplicationIdentity(). */
export const APPLICATION_IDENTITY = {
  applicationName: "Stankings",
  applicationId: "stankings",
  legalEntity: "Stankings Legacy Ltd",
  repository: "bamsignalsm/stankings",
  defaultDomain: "https://stankings.com",
  healthEndpoint: "/api/health",
  supportContact: "support@stankings.com",
} as const;

export type ApplicationIdentity = typeof APPLICATION_IDENTITY & {
  version: string;
  environment: string;
  platform: string;
  provider: string;
  commit: string | null;
  buildTime: string | null;
  nodeEnv: string;
};

export function getApplicationIdentity(): ApplicationIdentity {
  const deploy = getDeploymentMetadata(APPLICATION_IDENTITY.applicationId);
  return {
    ...APPLICATION_IDENTITY,
    version: deploy.version,
    environment: deploy.environment,
    platform: deploy.platform,
    provider: deploy.provider,
    commit: deploy.commit,
    buildTime: deploy.buildTime,
    nodeEnv: deploy.nodeEnv,
  };
}
