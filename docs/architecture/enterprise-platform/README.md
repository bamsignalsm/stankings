# Enterprise Platform — Program Documents

Index for the Shared Enterprise Platform Completion Program.

| Document | Purpose |
|----------|---------|
| [Program root](../SHARED_ENTERPRISE_PLATFORM_PROGRAM.md) | Binding completion definition + estimate |
| [**Platform Certification (v1.0)**](./SPRINT_PLATFORM_CERTIFICATION.md) | Cross-runtime GO / NO-GO certification |
| [Post-Certification Hardening](./SPRINT_POST_CERTIFICATION_HARDENING.md) | RLS, SDK release, ops, adoption |
| [Shared Table Security](./SHARED_TABLE_SECURITY_REPORT.md) | RLS on all shared_* tables |
| [SDK Release Readiness](./SDK_RELEASE_READINESS.md) | Package / changelog / publish path |
| [Ecosystem Adoption](./ECOSYSTEM_ADOPTION_REPORT.md) | BamSignal / Yike / BayRight readiness |
| [Production Checklist](./PRODUCTION_CHECKLIST.md) | Deployment gates |
| [Technical Debt Register](./TECHNICAL_DEBT_REGISTER.md) | Residual work |
| [Capability Inventory](./CAPABILITY_INVENTORY.md) | Full catalogue by class |
| [Consumer Readiness](./CONSUMER_READINESS.md) | SDK boundaries, versions, feature gates |
| [Gap Analysis](./GAP_ANALYSIS.md) | Historical gaps |
| [Quality Foundation](./QUALITY_FOUNDATION.md) | Eight gates + quality standards |
| [Registry Runtime](./REGISTRY_RUNTIME.md) | Executable catalogues |
| [Sprint Explainability](./SPRINT_EXPLAINABILITY.md) | Explainability Eight-Gate |
| [Sprint Trust](./SPRINT_TRUST.md) | Trust Eight-Gate |
| [Sprint Passport](./SPRINT_PASSPORT.md) | Passport Eight-Gate |
| [Sprint Foundation Finalization](./SPRINT_FOUNDATION_FINALIZATION.md) | Identity/Consent foundation |

## Core runtime chain (certified)

```text
Identity → Consent → Passport → Trust → Explainability
                 Discovery · Registries · SDK · Config · Observability
```

**SDK:** `@stankings/platform-sdk` **1.5.0**  
**Tag:** `enterprise-platform-v1.3-explainability`
