# Trust Consumer Guide

**Contract:** `trust.assessment@1.0.0`  
**SDK:** `createPlatformSdk(...).trust`  
**Feature gate:** `runtime.trust` (enabled on platform; product flags still required)  
**Milestone:** `enterprise-platform-v1.2-trust`

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

## BamSignal / Yike / BayRight — feature-gated consumption

```ts
const config = sdk.configuration();
const trustEnabled =
  config.featureFlags["runtime.trust"] === true &&
  config.capabilityToggles.trust === true;

async function assessOrNull(subjectId: string, passportId: string) {
  if (!trustEnabled) return null;
  const negotiation = sdk.discovery.negotiate({
    requiredCapabilities: ["identity", "passport", "trust"],
    declaredContractVersions: {
      identity: "1.0.0",
      passport: "1.0.0",
      trust: "1.0.0",
    },
  });
  if (!negotiation.ok) return null;
  const result = await sdk.trust.assess({ subjectId, passportId, evidence: […] });
  return result.ok ? result.assessment : null;
}
```

| Consumer | Suggested use | Graceful degradation |
|----------|---------------|----------------------|
| BamSignal | Assess after relationship verification evidence | Fall back to Passport read-only — no local scores |
| Yike | Assess after marketplace verification refs | Show “trust unknown” until gate + negotiation succeed |
| BayRight | Assess after financial evidence refs | Do not block core payments on Trust unavailability |

## Non-goals

Do not implement Explainability locally (use Explainability Runtime when shipped). Do not fork Trust per product. Register versioned policies instead of hardcoding product scoring.
