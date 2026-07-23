-- Organization Registry + company recruitment status
-- Stankings only: dfaqkrikdvohvvcuxoek

CREATE TABLE IF NOT EXISTS organization_companies (
  company_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  recruitment_status TEXT NOT NULL DEFAULT 'hiring_soon'
    CHECK (recruitment_status IN (
      'recruiting', 'hiring_soon', 'internal_only', 'not_recruiting'
    )),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS organization_departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL REFERENCES organization_companies(company_id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (company_id, slug)
);

CREATE TABLE IF NOT EXISTS organization_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  department_slug TEXT NOT NULL,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (company_id, department_slug, slug)
);

CREATE TABLE IF NOT EXISTS organization_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  department_slug TEXT NOT NULL,
  team_slug TEXT NOT NULL DEFAULT 'core',
  role_key TEXT NOT NULL,
  title TEXT NOT NULL,
  workspace_key TEXT NOT NULL,
  hierarchy_level TEXT NOT NULL DEFAULT 'staff'
    CHECK (hierarchy_level IN ('ceo', 'company_head', 'department_manager', 'staff')),
  phase INTEGER NOT NULL DEFAULT 2 CHECK (phase IN (1, 2)),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (company_id, role_key)
);

ALTER TABLE workforce_employees
  ADD COLUMN IF NOT EXISTS team_slug TEXT DEFAULT 'core',
  ADD COLUMN IF NOT EXISTS employment_type TEXT DEFAULT 'full-time';

ALTER TABLE passport_person_links
  ADD COLUMN IF NOT EXISTS mfa_enrolled_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS mfa_method TEXT;

ALTER TABLE organization_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY org_companies_sa ON organization_companies
  FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY org_companies_read ON organization_companies
  FOR SELECT USING (true);

CREATE POLICY org_departments_sa ON organization_departments
  FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY org_departments_read ON organization_departments
  FOR SELECT USING (true);

CREATE POLICY org_teams_sa ON organization_teams
  FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY org_teams_read ON organization_teams
  FOR SELECT USING (true);

CREATE POLICY org_roles_sa ON organization_roles
  FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY org_roles_read ON organization_roles
  FOR SELECT USING (true);
