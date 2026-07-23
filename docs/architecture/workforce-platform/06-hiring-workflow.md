# 6. Hiring Workflow

## Status machine

```
submitted → reviewing → shortlisted → interview_scheduled
  → interview_completed → offer_extended → accepted → hired → archived
rejected (terminal from most pre-hire states)
```

Job post statuses remain: `draft | published | closed`.

## Per-stage artifacts

| Artifact | Storage |
|----------|---------|
| Notes / internal comments | `workforce_application_notes` |
| Attachments metadata | `workforce_application_attachments` |
| Interview score | on application or interview row |
| Hiring decision | on application |
| Activity history | `workforce_application_events` |

## Surfaces

- Energy: Applications inbox + detail with stage actions
- Applicant: `/career/applications` tracking (auth email match)
