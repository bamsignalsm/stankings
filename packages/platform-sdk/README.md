# @stankings/platform-sdk

Enterprise Platform consumer façade (v1.1.0).

## Clients

| Client | Status |
|--------|--------|
| `identity` | Executable — Eight-Gate complete |
| `discovery` | Executable — Eight-Gate complete |
| `consent` | Foundation / dogfood — not 8/8 |
| `passport` / `trust` | Interface-only extension points |

```ts
import { createPlatformSdk } from "@stankings/platform-sdk";

const sdk = createPlatformSdk({
  platformId: "bamsignal",
  identityStore, // required
  consentStore,  // optional — defaults to memory
});
```

See `docs/platform/ENTERPRISE_SDK.md` and `docs/platform/PLATFORM_ARCHITECTURE.md`.
