# Identity Consumer Guide

**Capability:** Shared Identity  
**Runtime version:** 1.0.0  
**Contract:** `identity.subject@1.0.0`  
**Eight-Gate status:** **Complete** (`assessIdentityEightGates().complete === true`)  
**SDK:** `@stankings/platform-sdk`

---

## Recommended import

```ts
import { createPlatformSdk } from "@stankings/platform-sdk";
```

Provide an `IdentityStore` (file or supabase adapter). Do not fork Identity modules into product repos.

---

## Operations

| SDK method | Purpose |
|------------|---------|
| `identity.getSubject` | Load canonical subject bundle |
| `identity.findByExternalRef` | Resolve external mapping |
| `identity.putSubject` | Persist with validation + events |
| `identity.listSubjects` | Catalogue slice |
| `identity.mapHqMember` | Idempotent HQ mapping |
| `identity.validateBundle` | Mapping integrity |
| `identity.assessGates` | Eight-Gate report |
| `discover()` | Capability + contract snapshot |

---

## Upgrade notes (1.0.0)

- First production-consumable Identity release under Eight-Gate model.  
- Declare `declaredIdentityContractVersion: "1.0.0"`.  
- Accept identity runtime `1.0.0` (federation compatibility list includes prior prototypes for HQ seed platforms still on `pending`).  
- Apply persistence migration before using `SupabaseIdentityStore` in production.  

---

## Deprecation

No deprecated Identity public surfaces in 1.0.0.

---

## Non-goals

OAuth, sessions, Passport credentials, Trust scores, product profiles.

---

## Programme note

Other capabilities (Passport, Trust, Consent, Explainability) remain **not** consumable until they clear Eight Gates. Identity completion does **not** unlock those APIs.
