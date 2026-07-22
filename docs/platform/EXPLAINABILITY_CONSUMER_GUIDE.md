# Explainability Consumer Guide

**Contract:** `explainability.record@1.0.0`  
**SDK:** `createPlatformSdk(...).explainability`  
**Feature gate:** `runtime.explainability` (enabled on platform; product flags still required)  
**Milestone:** `enterprise-platform-v1.3-explainability`

```ts
const trust = await sdk.trust.assess({ … });
const explanation = await sdk.explainability.explainTrust(trust.assessment!);
// explanation.record.humanSummary — why
// explanation.record.machineExplanation — structured factors
```

## BamSignal / Yike / BayRight — feature-gated consumption

```ts
const config = sdk.configuration();
const explainEnabled =
  config.featureFlags["runtime.explainability"] === true &&
  config.capabilityToggles.explainability === true;

async function explainTrustOrNull(assessment: TrustAssessment) {
  if (!explainEnabled) return null;
  const negotiation = sdk.discovery.negotiate({
    requiredCapabilities: ["trust", "explainability"],
    declaredContractVersions: { trust: "1.0.0", explainability: "1.0.0" },
  });
  if (!negotiation.ok) return null;
  const result = await sdk.explainability.explainTrust(assessment);
  return result.ok ? result.record : null;
}
```

| Consumer | Suggested use | Graceful degradation |
|----------|---------------|----------------------|
| BamSignal | Explain Trust after relationship evidence | Show Trust outcome without rationale |
| Yike | Explain Trust / Passport after marketplace verification | Omit “why” panel until gate + negotiation succeed |
| BayRight | Explain Trust after financial evidence refs | Never block payments on Explainability unavailability |

## Separation of concerns

| Runtime | Answers |
|---------|---------|
| Trust | **What** is the assessment? |
| Explainability | **Why** was it reached? |

Do not invent local rationale strings. Do not re-run Trust policy evaluation in consumer apps.
