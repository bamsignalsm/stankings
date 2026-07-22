# SDK Upgrade Guide

**Current certified:** `@stankings/platform-sdk` **1.5.0** (`enterprise-platform-v1.0-certified`)

## From 1.4 → 1.5

1. Add optional `explainabilityStore` to `createPlatformSdk`.
2. Prefer `platform.explainability.explainTrust(assessment)` after Trust assess.
3. Declare `explainability: "1.0.0"` in Discovery negotiation when consuming explanations.
4. Gate with `runtime.explainability` + capability toggle.

No breaking changes.

## From 1.3 → 1.4

1. Add `trustStore`; use `platform.trust.assess`.
2. Declare `trust: "1.0.0"` when required.
3. Gate with `runtime.trust`.

## From 1.2 → 1.3

1. Add `passportStore`; use `platform.passport`.
2. Declare `passport: "1.0.0"` when required.
3. Gate with `runtime.passport`.

## Pinning

Until the package is published to a registry (TD-001), pin consumers to git tag:

```text
enterprise-platform-v1.0-certified
```

Do not import `src/lib/enterprise-platform/*` from consumer apps.
