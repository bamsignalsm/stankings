# Platform Configuration

Feature flags, capability toggles, environment profiles, consumer overrides, version compatibility negotiation.

```ts
const config = sdk.configuration();
config.capabilityToggles.consent; // true
```

Passport/Trust/Explainability toggles default **false** until Eight-Gate complete.
