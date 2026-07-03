# @stankings/core

Product-agnostic release governance types and helpers for Stankings Group.

## Modules

| Module | Export |
|--------|--------|
| `release` | Lifecycle states, `buildReleaseRecord` |
| `certification` | Gate types, `allGatesPassed` |
| `versioning` | `ProductVersion`, `formatVersionLabel` |
| `artifacts` | Archive manifest types |
| `approval` | `FounderApproval`, `isReleaseApproved` |

## Usage (Stankings HQ)

```typescript
import { RELEASE_STATES } from "@stankings/core/release";
import { allGatesPassed } from "@stankings/core/certification";
```

## Product repos

BamSignal mirrors governance in `shared/releaseGovernance.mjs` (JavaScript) for workflow scripts. TypeScript products import `@stankings/core` via path alias or future npm workspace.

## Rule

Shared **process** only — never shared production secrets or databases.
