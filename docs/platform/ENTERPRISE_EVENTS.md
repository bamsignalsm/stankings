# Enterprise Events (expanded)

**Envelope version:** 1  
**Catalogue version:** 1.1.0  
**Transport:** none

## Catalogue API

- `listEventDefinitions()` / `getEventDefinition()`
- `validateEventDefinition()`
- `negotiateEventCompatibility(eventType, envelopeVersion)`

## Reserved future types

Passport issued/revoked, Trust changed, Explainability decision recorded — defined now so runtimes do not invent forks.

## Lineage metadata

Optional `lineage.mayCause` / `lineage.typicallyCausedBy` on definitions. Replay metadata is definition-level only (no broker replay).

See also: event envelope in `src/lib/enterprise-platform/events/`.
