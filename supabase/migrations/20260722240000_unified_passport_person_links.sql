-- Unified Stankings Passport — person binding + workforce capability linkage
-- Project: dfaqkrikdvohvvcuxoek only

-- Lifetime link: Auth user ↔ Identity Subject ↔ Passport (one person)
CREATE TABLE IF NOT EXISTS passport_person_links (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL UNIQUE,
  passport_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  must_change_password BOOLEAN NOT NULL DEFAULT false,
  mfa_required BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS passport_person_links_email_idx ON passport_person_links (email);
CREATE INDEX IF NOT EXISTS passport_person_links_passport_idx ON passport_person_links (passport_id);

-- Workforce is a capability on Passport — never a second identity
ALTER TABLE workforce_employees
  ADD COLUMN IF NOT EXISTS passport_id TEXT,
  ADD COLUMN IF NOT EXISTS subject_id TEXT,
  ADD COLUMN IF NOT EXISTS skl_access BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS locked_pending_investigation BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS workforce_employees_passport_idx ON workforce_employees (passport_id);

-- Applications bound to Passport
ALTER TABLE stankings_career_applications
  ADD COLUMN IF NOT EXISTS passport_id TEXT;

ALTER TABLE stankings_career_applications DROP CONSTRAINT IF EXISTS stankings_career_applications_status_check;
ALTER TABLE stankings_career_applications
  ADD CONSTRAINT stankings_career_applications_status_check
  CHECK (status IN (
    'submitted', 'new', 'reviewing', 'shortlisted',
    'interview_scheduled', 'interview_completed',
    'offer_extended', 'offer_accepted', 'offer_rejected',
    'accepted', 'hired', 'rejected', 'archived'
  ));

-- Emergency workforce control audit (Passport never destroyed)
CREATE TABLE IF NOT EXISTS workforce_emergency_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES workforce_employees(id) ON DELETE CASCADE,
  passport_id TEXT NOT NULL,
  subject_id TEXT,
  actor_id UUID REFERENCES stankings_members(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  reason TEXT NOT NULL,
  previous_state JSONB,
  new_state JSONB,
  source TEXT NOT NULL DEFAULT 'energy',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS workforce_emergency_actions_employee_idx
  ON workforce_emergency_actions (employee_id);
CREATE INDEX IF NOT EXISTS workforce_emergency_actions_passport_idx
  ON workforce_emergency_actions (passport_id);

ALTER TABLE passport_person_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_emergency_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY passport_person_links_sa ON passport_person_links
  FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY passport_person_links_self ON passport_person_links
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY workforce_emergency_sa ON workforce_emergency_actions
  FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
