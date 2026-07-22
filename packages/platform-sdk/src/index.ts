/**
 * @stankings/platform-sdk — Enterprise Platform consumer façade.
 */

export {
  createPlatformSdk,
  type PlatformSdk,
  type CreatePlatformSdkOptions,
} from "./create-client";

export {
  discoverPlatform,
  discoverCapability,
  negotiateEnterpriseContract,
  type DiscoverySnapshot,
} from "./discovery";

export {
  createDiscoveryClient,
  DiscoveryClient,
  type DiscoveryClientOptions,
} from "./discovery-client";

export {
  createIdentityClient,
  IdentityClient,
  type IdentityClientOptions,
} from "./identity";

export {
  createConsentClient,
  ConsentClient,
  type ConsentClientOptions,
} from "./consent";

export {
  createPassportClient,
  PassportClient,
  type PassportClientOptions,
} from "./passport";

export { TRUST_CLIENT_EXTENSION } from "./extensions";

export {
  createEnterpriseError,
  isEnterpriseError,
  ENTERPRISE_ERROR_CODES,
  type EnterpriseError,
} from "./errors";

export { PLATFORM_SDK } from "./meta";
