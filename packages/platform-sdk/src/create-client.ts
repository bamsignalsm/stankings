/**
 * SDK factory v1.5 — Identity, Discovery, Consent, Passport, Trust, Explainability.
 */

import type { IdentityStore } from "@/lib/shared-runtime/persistence/types";
import type { ConsentStore } from "@/lib/enterprise-platform/consent/store";
import type { PassportStore } from "@/lib/enterprise-platform/passport/store";
import type { TrustStore } from "@/lib/enterprise-platform/trust/store";
import type { ExplainabilityStore } from "@/lib/enterprise-platform/explainability/store";
import type { MemoryEventCollector } from "@/lib/enterprise-platform/events";
import { createMemoryConsentStore } from "@/lib/enterprise-platform/consent";
import { createMemoryPassportStore } from "@/lib/enterprise-platform/passport";
import { createMemoryTrustStore } from "@/lib/enterprise-platform/trust";
import { createMemoryExplainabilityStore } from "@/lib/enterprise-platform/explainability";
import {
  buildUnifiedEnterpriseRegistries,
  type UnifiedEnterpriseRegistries,
} from "@/lib/enterprise-platform/registry/unified";
import {
  buildRuntimeConfiguration,
  type ConsumerOverrides,
  type RuntimeConfiguration,
} from "@/lib/enterprise-platform/config";
import { buildPlatformHealthReport, type PlatformHealthReport } from "@/lib/enterprise-platform/observability";
import { createIdentityClient, type IdentityClient } from "./identity/client";
import { createDiscoveryClient, type DiscoveryClient } from "./discovery-client";
import { createConsentClient, type ConsentClient } from "./consent/client";
import { createPassportClient, type PassportClient } from "./passport/client";
import { createTrustClient, type TrustClient } from "./trust/client";
import {
  createExplainabilityClient,
  type ExplainabilityClient,
} from "./explainability/client";
import { PLATFORM_SDK } from "./meta";
import { buildLogLine } from "@/lib/enterprise-platform/quality/logging";

export interface CreatePlatformSdkOptions {
  platformId: string;
  identityStore: IdentityStore;
  consentStore?: ConsentStore;
  passportStore?: PassportStore;
  trustStore?: TrustStore;
  explainabilityStore?: ExplainabilityStore;
  declaredIdentityContractVersion?: string;
  declaredDiscoveryContractVersion?: string;
  declaredConsentContractVersion?: string;
  declaredPassportContractVersion?: string;
  declaredTrustContractVersion?: string;
  declaredExplainabilityContractVersion?: string;
  configOverrides?: Omit<ConsumerOverrides, "platformId">;
  events?: MemoryEventCollector;
}

export interface PlatformSdk {
  readonly version: string;
  readonly platformId: string;
  identity: IdentityClient;
  discovery: DiscoveryClient;
  consent: ConsentClient;
  passport: PassportClient;
  trust: TrustClient;
  explainability: ExplainabilityClient;
  registries: () => UnifiedEnterpriseRegistries;
  configuration: () => RuntimeConfiguration;
  health: () => PlatformHealthReport;
  log: (message: string, meta?: Record<string, string>) => string;
}

export function createPlatformSdk(options: CreatePlatformSdkOptions): PlatformSdk {
  const identity = createIdentityClient({
    store: options.identityStore,
    platformId: options.platformId,
    declaredContractVersion: options.declaredIdentityContractVersion,
    events: options.events,
  });
  const discovery = createDiscoveryClient({
    platformId: options.platformId,
    declaredContractVersion: options.declaredDiscoveryContractVersion,
  });
  const consent = createConsentClient({
    platformId: options.platformId,
    store: options.consentStore ?? createMemoryConsentStore(),
    declaredContractVersion: options.declaredConsentContractVersion,
    events: options.events,
  });
  const passport = createPassportClient({
    platformId: options.platformId,
    store: options.passportStore ?? createMemoryPassportStore(),
    declaredContractVersion: options.declaredPassportContractVersion,
    events: options.events,
  });
  const trust = createTrustClient({
    platformId: options.platformId,
    store: options.trustStore ?? createMemoryTrustStore(),
    declaredContractVersion: options.declaredTrustContractVersion,
    events: options.events,
  });
  const explainability = createExplainabilityClient({
    platformId: options.platformId,
    store: options.explainabilityStore ?? createMemoryExplainabilityStore(),
    declaredContractVersion: options.declaredExplainabilityContractVersion,
    events: options.events,
  });

  return {
    version: PLATFORM_SDK.version,
    platformId: options.platformId,
    identity,
    discovery,
    consent,
    passport,
    trust,
    explainability,
    registries: () => buildUnifiedEnterpriseRegistries(),
    configuration: () =>
      buildRuntimeConfiguration({
        platformId: options.platformId,
        ...options.configOverrides,
      }),
    health: () => buildPlatformHealthReport(),
    log: (message, meta) =>
      buildLogLine({
        level: "info",
        message,
        capability: "platform_sdk",
        platformId: options.platformId,
        meta,
      }),
  };
}
