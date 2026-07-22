# Consent Consumer Guide

**Contract:** `consent.record@1.0.0`  
**SDK:** `createPlatformSdk(...).consent`

```ts
const sdk = createPlatformSdk({
  platformId: "yike",
  identityStore,
  consentStore, // file or supabase adapter
  declaredConsentContractVersion: "1.0.0",
});

await sdk.consent.grant({
  subjectId: "sid_…",
  definition: sdk.consent.definitions()[0],
});
```

## Upgrade notes (1.0.0)

First Eight-Gate complete Consent release. Require Identity `sid_*`. Apply Consent SQL before production Supabase adapter use.

## Negotiation

Discovery grants `consent` when readiness is `production` and contract majors match.
