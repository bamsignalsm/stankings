# @stankings/platform-sdk

**Version:** 1.5.0  
**Certified tag:** `enterprise-platform-v1.0-certified`  
**Status:** Private workspace package — publish pipeline pending (TD-001)

Canonical integration surface for BamSignal, Yike, BayRight, and future Stankings products.

## Surfaces

| Export | Capability |
|--------|------------|
| `.` / `createPlatformSdk` | Full façade |
| `./identity` | Shared Identity |
| `./discovery` | Capability discovery & negotiation |
| `./consent` | Consent records |
| `./passport` | Passport trust container |
| `./trust` | Trust assessments |
| `./explainability` | Decision explanations |
| `./errors` | Enterprise error taxonomy |

## Quick start

```ts
import { createPlatformSdk } from "@stankings/platform-sdk";

const platform = createPlatformSdk({
  platformId: "bamsignal",
  identityStore,
  consentStore,
  passportStore,
  trustStore,
  explainabilityStore,
});

const negotiation = platform.discovery.negotiate({
  requiredCapabilities: ["identity", "passport", "trust", "explainability"],
  declaredContractVersions: {
    identity: "1.0.0",
    passport: "1.0.0",
    trust: "1.0.0",
    explainability: "1.0.0",
  },
});
```

Always combine Discovery negotiation with product feature flags. See consumer guides under `docs/platform/`.

## Versioning

- **SDK** semver: minor for additive surfaces; major for breaking public APIs.
- **Contracts** negotiate independently (`identity.subject@1.x`, etc.).
- Certified baseline: SDK **1.5.0** / tag `enterprise-platform-v1.0-certified`.

## Deprecation

See [SDK_DEPRECATION_POLICY.md](../../docs/platform/SDK_DEPRECATION_POLICY.md).
