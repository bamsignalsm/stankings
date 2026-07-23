# Data Model Validation

**Migration:** `20260722270000_careers_ats_application_profile.sql` (applied to linked project)

## Posts

| Column | Purpose |
|--------|---------|
| `location` default | Stankings HQ, Abia State, Nigeria / Hybrid |
| `work_location_type` | on_site \| hybrid \| remote_nigeria \| remote_global |
| `role_questions` | JSONB configurable per vacancy |

## Applications

| Column | Purpose |
|--------|---------|
| `preferred_name` | Display / recruiter |
| `profile` | Full ATS structured JSON (`AtsApplicationProfile`) |
| `shortlisted` | Recruiter flag |
| `talent_pool` | Consent + recruiter tag |
| `passport_match` | Bound to Passport |
| `duplicate_flag` | Prior applications detected |
| `recruiter_scorecard` | JSON scores + recommendation |
| `hiring_recommendation` | Flat recommendation field |
| `evaluation_form` | Future form payloads |
| `status` includes `draft` | Future server-side drafts |

## Notes

`career_application_notes` — internal / hiring_panel visibility.

## Storage

Bucket `career-applications` created (private). Form currently accepts document URLs; binary upload wiring can attach to the same `documents[]` shape without schema change.

## AI readiness

Structured arrays (education, employment, skills, languages, references, roleAnswers) avoid free-text-only capture for ranking / matching later.
