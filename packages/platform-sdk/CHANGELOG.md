# Changelog — @stankings/platform-sdk

All notable changes to the Enterprise SDK are documented here.

## [1.5.0] — 2026-07-22 — `enterprise-platform-v1.3-explainability` / `enterprise-platform-v1.0-certified`

### Added
- `ExplainabilityClient` / `@stankings/platform-sdk/explainability`
- `createPlatformSdk().explainability` — explain Trust, Passport, Consent decisions
- Contract `explainability.record@1.0.0`

### Notes
- Completes the certified v1.0 core surface.
- No breaking changes from 1.4.0.

## [1.4.0] — 2026-07-22 — `enterprise-platform-v1.2-trust`

### Added
- `TrustClient` / `@stankings/platform-sdk/trust`
- Policy-driven trust assessments bound to Identity + Passport
- Contract `trust.assessment@1.0.0`

## [1.3.0] — 2026-07-22 — `enterprise-platform-v1.1-passport`

### Added
- `PassportClient` / `@stankings/platform-sdk/passport`
- Evidence references and lifecycle operations
- Contract `passport.record@1.0.0`

## [1.2.0] — 2026-07-22 — `enterprise-foundation-v1.0`

### Added
- Identity, Discovery, Consent clients
- Registries, configuration, health helpers
- Foundation finalization milestone
