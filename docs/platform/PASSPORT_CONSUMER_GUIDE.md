# Passport Consumer Guide

**Contract:** `passport.record@1.0.0`  
**SDK:** `createPlatformSdk(...).passport` or `@stankings/platform-sdk/passport`  
**Feature gate:** `runtime.passport` (enabled on platform; product flags still required)

```ts
const sdk = createPlatformSdk({
  platformId: "yike",
  identityStore,
  consentStore,
  passportStore, // memory | file | supabase adapter
  declaredPassportContractVersion: "1.0.0",
});

const issued = await sdk.passport.issue({
  subjectId: "sid_…",
  evidence: [
    {
      provider: "identity",
      assertionType: "identity.subject.active",
      assertionRef: "sid_…",
      status: "verified",
    },
  ],
});

await sdk.passport.attachEvidence({
  passportId: issued.record!.passportId,
  provider: "yike",
  assertionType: "yike.marketplace.verification",
  assertionRef: "yike:listing:opaque-ref",
  status: "verified",
});
```

## Evidence rules

- Store **references and verified assertions**, never product business payloads.
- Providers: `identity` | `consent` | `bayright` | `yike` | `bamsignal` | `enterprise` | `other`
- Catalogue helpers: `sdk.passport.evidenceCatalogue()`

## Negotiation

Discovery grants `passport` when readiness is `production` and contract majors match.

## BamSignal / Yike / BayRight — feature-gated reads

Consumer repos should **read** Passport through the SDK behind a product feature flag. Keep graceful degradation until Trust Runtime is available.

```ts
const config = sdk.configuration();
const passportEnabled =
  config.featureFlags["runtime.passport"] === true &&
  config.capabilityToggles.passport === true;

async function readPassportOrNull(subjectId: string) {
  if (!passportEnabled) return null;
  const negotiation = sdk.discovery.negotiate({
    requiredCapabilities: ["identity", "passport"],
    declaredContractVersions: { identity: "1.0.0", passport: "1.0.0" },
  });
  if (!negotiation.ok) return null;
  const list = await sdk.passport.listBySubject(subjectId);
  return list.find((p) => p.state === "active") ?? list[0] ?? null;
}
```

| Consumer | Suggested first use | Until Trust ships |
|----------|---------------------|-------------------|
| BamSignal | Read active passport + attach relationship verification refs | Do not invent local trust scores |
| Yike | Read passport + attach marketplace verification refs | Degrade to “passport unknown” UX |
| BayRight | Read passport + attach financial evidence refs | Degrade without blocking payments core |

## Upgrade notes (1.0.0)

First Eight-Gate complete Passport release. Require Identity `sid_*`. Passport SQL applied on Stankings project `dfaqkrikdvohvvcuxoek` (tag `enterprise-platform-v1.1-passport`).

## Non-goals for consumers

Do not implement Trust or Explainability locally. Do not fork Passport per product.
