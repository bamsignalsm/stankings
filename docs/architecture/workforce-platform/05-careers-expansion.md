# 5. Careers Expansion

## Changes to career posts

Extend `stankings_career_posts`:

- `company_id` (registry id)
- `department_slug`
- `role_key` / `workspace_key`
- `responsibilities` (text)
- `required_skills` (text[] or text)
- `reporting_manager_title`
- `salary_range` (nullable)
- Keep legacy `company_area` for backward compatibility (derived label)

## Public UX

- `/career` lists published posts; optional company filter
- `/career/[slug]` shows structured sections
- Apply form unchanged entry point; stores application against post

## Energy UX

- Create/edit posts with company + department + workspace binding
- Seed script / migration populates launch catalogue idempotently
