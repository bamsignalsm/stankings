-- Passport recovery cases — identity continuity without duplicate Passports
-- Stankings only: dfaqkrikdvohvvcuxoek
-- Never auto-bind Auth accounts. Admin verification required.

CREATE TABLE IF NOT EXISTS passport_recovery_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  existing_passport_id TEXT NOT NULL,
  existing_subject_id TEXT,
  existing_user_id UUID NOT NULL,
  requesting_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_admin_review'
    CHECK (status IN (
      'pending_admin_review', 'approved', 'rejected', 'cancelled'
    )),
  reason TEXT,
  source TEXT NOT NULL DEFAULT 'ensure_passport',
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES stankings_members(id) ON DELETE SET NULL,
  resolution_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS passport_recovery_cases_requesting_idx
  ON passport_recovery_cases (requesting_user_id);
CREATE INDEX IF NOT EXISTS passport_recovery_cases_email_idx
  ON passport_recovery_cases (email);
CREATE INDEX IF NOT EXISTS passport_recovery_cases_status_idx
  ON passport_recovery_cases (status);
CREATE INDEX IF NOT EXISTS passport_recovery_cases_passport_idx
  ON passport_recovery_cases (existing_passport_id);

ALTER TABLE passport_recovery_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY passport_recovery_sa ON passport_recovery_cases
  FOR ALL USING (stankings_is_super_admin())
  WITH CHECK (stankings_is_super_admin());

CREATE POLICY passport_recovery_self_read ON passport_recovery_cases
  FOR SELECT USING (requesting_user_id = auth.uid());
