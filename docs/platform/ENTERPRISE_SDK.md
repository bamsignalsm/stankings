# Enterprise SDK

**Package:** `@stankings/platform-sdk` **1.5.0**  
**Certified tag:** `enterprise-platform-v1.0-certified`  
**Certification:** [SPRINT_PLATFORM_CERTIFICATION.md](../architecture/enterprise-platform/SPRINT_PLATFORM_CERTIFICATION.md)  
**Release notes:** [RELEASE_NOTES_v1.0.md](./RELEASE_NOTES_v1.0.md)  
**Upgrade:** [SDK_UPGRADE_GUIDE.md](./SDK_UPGRADE_GUIDE.md) · [Deprecation](./SDK_DEPRECATION_POLICY.md)  
**Security / Ops:** [SECURITY_HANDBOOK.md](./SECURITY_HANDBOOK.md) · [OPERATIONS_HANDBOOK.md](./OPERATIONS_HANDBOOK.md)  
**Architecture:** [PLATFORM_ARCHITECTURE_GUIDE.md](./PLATFORM_ARCHITECTURE_GUIDE.md)

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
