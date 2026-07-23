# Recruitment Form Enhancement Report

**Status:** Implemented (pending review)  
**Preserves:** Passport-first apply (`ensurePassportForUser`)

## Form

Multi-step enterprise ATS form (`src/components/ApplyForm.tsx`):

1. Personal  
2. Identity  
3. Education (+ certifications)  
4. Employment history  
5. Skills / languages / references  
6. Availability & profiles  
7. Role-specific questions + cover letter  
8. Documents (URL refs; storage bucket prepared)  
9. Review & compliance  

## Capabilities

- LocalStorage autosave per vacancy (`stankings.ats.draft.{postId}`)
- Repeatable education, certifications, employment, languages
- Skill tag suggestions + years + self-rating
- Minimum two professional references enforced on submit
- Compliance gates (accuracy, background checks, privacy, recruitment; optional talent pool)
- Dynamic role questions from `resolveRoleQuestions(workspaceKey)` or post `role_questions`

## Submit path

`submitCareerApplication` stores:

- Legacy columns (`full_name`, `email`, `phone`, `cover_letter`, `linkedin_url`)
- `preferred_name`
- Structured `profile` JSONB (`AtsApplicationProfile` schemaVersion 1)
- `passport_id` / `passport_match`
- `duplicate_flag` when prior applications exist
- `talent_pool` from consent
