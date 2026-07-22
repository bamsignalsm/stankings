# Passport Consumer Guide

**Contract:** `passport.record@1.0.0`  
**SDK:** `createPlatformSdk(...).passport` or `@stankings/platform-sdk/passport`

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

## Upgrade notes (1.0.0)

First Eight-Gate complete Passport release. Require Identity `sid_*`. **Do not apply** Passport SQL until architectural review.

## Non-goals for consumers

Do not implement Trust or Explainability locally. Do not fork Passport per product.
