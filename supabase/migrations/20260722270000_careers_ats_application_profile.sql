-- Enterprise ATS application profile + recruiter fields
-- Stankings only: dfaqkrikdvohvvcuxoek
-- Passport-first architecture unchanged.

ALTER TABLE stankings_career_posts
  ALTER COLUMN location SET DEFAULT 'Stankings HQ, Abia State, Nigeria / Hybrid';

ALTER TABLE stankings_career_posts
  ADD COLUMN IF NOT EXISTS work_location_type TEXT NOT NULL DEFAULT 'hybrid'
    CHECK (work_location_type IN (
      'on_site', 'hybrid', 'remote_nigeria', 'remote_global'
    )),
  ADD COLUMN IF NOT EXISTS role_questions JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE stankings_career_posts
SET location = replace(location, 'Lagos, Nigeria', 'Stankings HQ, Abia State, Nigeria')
WHERE location ILIKE '%Lagos%';

ALTER TABLE stankings_career_applications
  DROP CONSTRAINT IF EXISTS stankings_career_applications_status_check;

ALTER TABLE stankings_career_applications
  ADD CONSTRAINT stankings_career_applications_status_check
  CHECK (status IN (
    'draft', 'submitted', 'new', 'reviewing', 'shortlisted',
    'interview_scheduled', 'interview_completed',
    'offer_extended', 'offer_accepted', 'offer_rejected',
    'accepted', 'hired', 'rejected', 'archived'
  ));

ALTER TABLE stankings_career_applications
  ADD COLUMN IF NOT EXISTS preferred_name TEXT,
  ADD COLUMN IF NOT EXISTS profile JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS shortlisted BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS talent_pool BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS passport_match BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS duplicate_flag BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS recruiter_scorecard JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS hiring_recommendation TEXT,
  ADD COLUMN IF NOT EXISTS evaluation_form JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE INDEX IF NOT EXISTS stankings_career_applications_email_idx
  ON stankings_career_applications (lower(email));
CREATE INDEX IF NOT EXISTS stankings_career_applications_shortlisted_idx
  ON stankings_career_applications (shortlisted)
  WHERE shortlisted = true;
CREATE INDEX IF NOT EXISTS stankings_career_applications_talent_pool_idx
  ON stankings_career_applications (talent_pool)
  WHERE talent_pool = true;

CREATE TABLE IF NOT EXISTS career_application_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES stankings_career_applications(id) ON DELETE CASCADE,
  author_id UUID REFERENCES stankings_members(id) ON DELETE SET NULL,
  body TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'internal'
    CHECK (visibility IN ('internal', 'hiring_panel')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS career_application_notes_app_idx
  ON career_application_notes (application_id);

ALTER TABLE career_application_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY career_notes_sa ON career_application_notes
  FOR ALL USING (stankings_is_super_admin())
  WITH CHECK (stankings_is_super_admin());

-- Storage bucket for application documents (public read off; service/authenticated write)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'career-applications',
  'career-applications',
  false,
  10485760,
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
)
ON CONFLICT (id) DO NOTHING;
