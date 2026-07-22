# Trust Consumer Guide

**Contract:** `trust.assessment@1.0.0`  
**SDK:** `createPlatformSdk(...).trust`  
**Feature gate:** `runtime.trust`

```ts
const sdk = createPlatformSdk({
  platformId: "yike",
  identityStore,
  passportStore,
  trustStore,
  declaredTrustContractVersion: "1.0.0",
});

const result = await sdk.trust.assess({
  subjectId: "sid_…",
  passportId: "ppt_…",
  evidence: [
    {
      provider: "identity",
      assertionType: "identity.subject.active",
      assertionRef: "sid_…",
      status: "verified",
    },
    {
      provider: "passport",
      assertionType: "passport.active",
      assertionRef: "ppt_…",
      status: "verified",
    },
  ],
});
```

## Graceful degradation (until Trust DB applied / product flag on)

```ts
const enabled = sdk.configuration().featureFlags["runtime.trust"] === true;
if (!enabled) {
  // Fall back to Passport read-only UX — do not invent local scores
}
```

| Consumer | Suggested use |
|----------|---------------|
| BamSignal | Assess after relationship verification evidence attached |
| Yike | Assess after marketplace verification refs |
| BayRight | Assess after financial evidence refs |

## Non-goals

Do not implement Explainability locally. Do not fork Trust per product. Do not hardcode product scoring into Trust policies — register versioned policies instead.
