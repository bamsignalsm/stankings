# Explainability Consumer Guide

**Contract:** `explainability.record@1.0.0`  
**SDK:** `createPlatformSdk(...).explainability`  
**Feature gate:** `runtime.explainability`

```ts
const trust = await sdk.trust.assess({ … });
const explanation = await sdk.explainability.explainTrust(trust.assessment!);
// explanation.record.humanSummary — why
// explanation.record.machineExplanation — structured factors
```

## Feature-gated use (BamSignal / Yike / BayRight)

```ts
const enabled = sdk.configuration().featureFlags["runtime.explainability"] === true;
if (!enabled) {
  // Degrade: show assessment outcome without rationale until gate + negotiation succeed
}
```

Trust answers *what*; Explainability answers *why*. Do not invent local rationale strings in consumer apps.
