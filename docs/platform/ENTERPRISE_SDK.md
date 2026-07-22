# Enterprise SDK

**Package:** `@stankings/platform-sdk` **1.5.0**  
**Certified tag:** `enterprise-platform-v1.3-explainability`  
**Certification:** [SPRINT_PLATFORM_CERTIFICATION.md](../architecture/enterprise-platform/SPRINT_PLATFORM_CERTIFICATION.md)

| Surface | Guide |
|---------|-------|
| Identity | [IDENTITY_CONSUMER_GUIDE.md](./IDENTITY_CONSUMER_GUIDE.md) |
| Discovery | [DISCOVERY_RUNTIME.md](./DISCOVERY_RUNTIME.md) |
| Consent | [CONSENT_CONSUMER_GUIDE.md](./CONSENT_CONSUMER_GUIDE.md) |
| Passport | [PASSPORT_CONSUMER_GUIDE.md](./PASSPORT_CONSUMER_GUIDE.md) |
| Trust | [TRUST_CONSUMER_GUIDE.md](./TRUST_CONSUMER_GUIDE.md) |
| Explainability | [EXPLAINABILITY_CONSUMER_GUIDE.md](./EXPLAINABILITY_CONSUMER_GUIDE.md) |

```ts
const platform = createPlatformSdk({ platformId: "bamsignal", identityStore, … });
platform.identity
platform.discovery
platform.consent
platform.passport
platform.trust           // what
platform.explainability  // why
platform.registries()
platform.configuration()
platform.health()
```

Always gate capability usage with Discovery negotiation + product feature flags. Prefer the SDK over importing internal platform modules.
