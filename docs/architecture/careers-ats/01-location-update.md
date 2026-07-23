# Careers Location Update Report

**Status:** Implemented (pending Founder review / commit)  
**Supabase:** `dfaqkrikdvohvvcuxoek`

## Change

Headquarters career location is now:

> **Stankings HQ**  
> Abia State, Nigeria

## Surfaces updated

| Surface | Change |
|---------|--------|
| `src/lib/careers/location.ts` | Canonical HQ + work location types |
| Career landing `/career` | HQ line + `formatCareerLocation` |
| Job detail `/career/[slug]` | Location + work type display |
| Org / workforce seed defaults | Abia hybrid default |
| Job catalogue default `LOC` | Abia |
| Admin career post form | Default location + work type select |
| Create career post action | Default Abia |
| Migration | Rewrote existing `Lagos` post locations |
| Org schema JSON-LD | `addressLocality: Abia State` |
| Contact / Press HQ copy | Abia State |
| Company registry HQ area | Abia State HQ |

## Work location types

- `on_site` → On-site (Abia State)
- `hybrid` → Hybrid (Abia State)
- `remote_nigeria` → Remote (Nigeria)
- `remote_global` → Remote (Global)

Stored on `stankings_career_posts.work_location_type`.
