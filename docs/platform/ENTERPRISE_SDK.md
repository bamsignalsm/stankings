# Enterprise SDK

**Package:** `@stankings/platform-sdk` **1.4.0** (Trust — pending review commit)  
**Stable tagged release:** `enterprise-platform-v1.1-passport` → SDK **1.3.0**

| Surface | Guide |
|---------|-------|
| Identity | [IDENTITY_CONSUMER_GUIDE.md](./IDENTITY_CONSUMER_GUIDE.md) |
| Discovery | [DISCOVERY_RUNTIME.md](./DISCOVERY_RUNTIME.md) |
| Consent | [CONSENT_CONSUMER_GUIDE.md](./CONSENT_CONSUMER_GUIDE.md) |
| Passport | [PASSPORT_CONSUMER_GUIDE.md](./PASSPORT_CONSUMER_GUIDE.md) |
| Trust | [TRUST_CONSUMER_GUIDE.md](./TRUST_CONSUMER_GUIDE.md) |
| Architecture | [PLATFORM_ARCHITECTURE.md](./PLATFORM_ARCHITECTURE.md) |

```ts
const platform = createPlatformSdk({ platformId: "bamsignal", identityStore, … });
platform.identity
platform.discovery
platform.consent
platform.passport
platform.trust
// platform.explainability — interface_only
```

Gate new capability reads with Discovery negotiation + feature flags (`runtime.passport`, `runtime.trust`).
