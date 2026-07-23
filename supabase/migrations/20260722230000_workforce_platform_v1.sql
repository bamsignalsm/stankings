-- Enterprise Workforce Platform v1.0
-- Stankings only: dfaqkrikdvohvvcuxoek

-- Expand career posts
ALTER TABLE stankings_career_posts
  ADD COLUMN IF NOT EXISTS company_id TEXT,
  ADD COLUMN IF NOT EXISTS department_slug TEXT,
  ADD COLUMN IF NOT EXISTS role_key TEXT,
  ADD COLUMN IF NOT EXISTS workspace_key TEXT,
  ADD COLUMN IF NOT EXISTS responsibilities TEXT,
  ADD COLUMN IF NOT EXISTS required_skills TEXT,
  ADD COLUMN IF NOT EXISTS reporting_manager_title TEXT,
  ADD COLUMN IF NOT EXISTS salary_range TEXT,
  ADD COLUMN IF NOT EXISTS catalogue_key TEXT UNIQUE;

-- Expand application statuses (drop old check, add new)
ALTER TABLE stankings_career_applications DROP CONSTRAINT IF EXISTS stankings_career_applications_status_check;
ALTER TABLE stankings_career_applications
  ADD CONSTRAINT stankings_career_applications_status_check
  CHECK (status IN (
    'submitted', 'new', 'reviewing', 'shortlisted',
    'interview_scheduled', 'interview_completed',
    'offer_extended', 'accepted', 'hired', 'rejected', 'archived'
  ));

ALTER TABLE stankings_career_applications
  ADD COLUMN IF NOT EXISTS interview_score NUMERIC,
  ADD COLUMN IF NOT EXISTS hiring_decision TEXT,
  ADD COLUMN IF NOT EXISTS internal_notes TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Departments
CREATE TABLE IF NOT EXISTS workforce_departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (company_id, slug)
);

-- Roles
CREATE TABLE IF NOT EXISTS workforce_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  department_slug TEXT NOT NULL,
  role_key TEXT NOT NULL,
  title TEXT NOT NULL,
  workspace_key TEXT NOT NULL,
  hierarchy_level TEXT NOT NULL DEFAULT 'staff'
    CHECK (hierarchy_level IN ('ceo', 'company_head', 'department_manager', 'staff')),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (company_id, role_key)
);

-- Employees
CREATE TABLE IF NOT EXISTS workforce_employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  identity_subject_id TEXT,
  email TEXT NOT NULL,
  full_name TEXT,
  company_id TEXT NOT NULL,
  department_slug TEXT NOT NULL,
  role_key TEXT NOT NULL,
  workspace_key TEXT NOT NULL,
  hierarchy_level TEXT NOT NULL DEFAULT 'staff'
    CHECK (hierarchy_level IN ('ceo', 'company_head', 'department_manager', 'staff')),
  manager_employee_id UUID REFERENCES workforce_employees(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'invited'
    CHECK (status IN ('invited', 'active', 'suspended', 'terminated')),
  source TEXT NOT NULL DEFAULT 'invite'
    CHECK (source IN ('hire', 'invite')),
  application_id UUID REFERENCES stankings_career_applications(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, company_id)
);

CREATE INDEX IF NOT EXISTS idx_workforce_employees_user ON workforce_employees(user_id);
CREATE INDEX IF NOT EXISTS idx_workforce_employees_company ON workforce_employees(company_id);
CREATE INDEX IF NOT EXISTS idx_workforce_employees_status ON workforce_employees(status);

-- Permission catalogue
CREATE TABLE IF NOT EXISTS workforce_permission_defs (
  key TEXT PRIMARY KEY,
  feature TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_role_templates (
  role_key TEXT NOT NULL,
  workspace_key TEXT NOT NULL,
  permission_key TEXT NOT NULL REFERENCES workforce_permission_defs(key) ON DELETE CASCADE,
  PRIMARY KEY (role_key, permission_key)
);

CREATE TABLE IF NOT EXISTS workforce_grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES workforce_employees(id) ON DELETE CASCADE,
  permission_key TEXT NOT NULL REFERENCES workforce_permission_defs(key) ON DELETE CASCADE,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  granted_by UUID REFERENCES stankings_members(id) ON DELETE SET NULL,
  UNIQUE (employee_id, permission_key)
);

-- Application pipeline artifacts
CREATE TABLE IF NOT EXISTS workforce_application_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES stankings_career_applications(id) ON DELETE CASCADE,
  author_id UUID REFERENCES stankings_members(id) ON DELETE SET NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_application_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES stankings_career_applications(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES stankings_members(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_application_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES stankings_career_applications(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES stankings_members(id) ON DELETE SET NULL,
  from_status TEXT,
  to_status TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Welcome + notifications + audit
CREATE TABLE IF NOT EXISTS workforce_welcome_checklist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES workforce_employees(id) ON DELETE CASCADE,
  item_key TEXT NOT NULL,
  label TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  UNIQUE (employee_id, item_key)
);

CREATE TABLE IF NOT EXISTS workforce_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES workforce_employees(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES stankings_members(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Workspace content modules
CREATE TABLE IF NOT EXISTS workforce_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  employee_id UUID REFERENCES workforce_employees(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'done', 'cancelled')),
  due_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_editorial_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL DEFAULT 'stankings-times',
  author_employee_id UUID REFERENCES workforce_employees(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  category TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'pending_review', 'published', 'archived')),
  featured BOOLEAN NOT NULL DEFAULT false,
  seo_checklist JSONB DEFAULT '{}',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (company_id, slug)
);

CREATE TABLE IF NOT EXISTS workforce_media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  uploaded_by UUID REFERENCES workforce_employees(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'image',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  author_employee_id UUID REFERENCES workforce_employees(id) ON DELETE SET NULL,
  platform TEXT NOT NULL DEFAULT 'general',
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'scheduled', 'published')),
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_press_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  author_employee_id UUID REFERENCES workforce_employees(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'review', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_media_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  name TEXT NOT NULL,
  outlet TEXT,
  email TEXT,
  phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  assignee_employee_id UUID REFERENCES workforce_employees(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  customer_ref TEXT,
  queue TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'assigned', 'pending', 'escalated', 'resolved', 'closed')),
  priority TEXT NOT NULL DEFAULT 'normal'
    CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_moderation_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  assignee_employee_id UUID REFERENCES workforce_employees(id) ON DELETE SET NULL,
  report_type TEXT NOT NULL DEFAULT 'general',
  subject_ref TEXT,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'reviewing', 'actioned', 'dismissed', 'appealed')),
  action_taken TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_ops_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL,
  assignee_employee_id UUID REFERENCES workforce_employees(id) ON DELETE SET NULL,
  module TEXT NOT NULL DEFAULT 'operations',
  title TEXT NOT NULL,
  body TEXT,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'approved', 'rejected', 'done')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workforce_eng_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id TEXT NOT NULL DEFAULT 'hq',
  assignee_employee_id UUID REFERENCES workforce_employees(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  body TEXT,
  status TEXT NOT NULL DEFAULT 'backlog'
    CHECK (status IN ('backlog', 'sprint', 'in_progress', 'review', 'done')),
  severity TEXT NOT NULL DEFAULT 'medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Helpers
CREATE OR REPLACE FUNCTION workforce_is_active_employee()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM workforce_employees
    WHERE user_id = auth.uid() AND status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION workforce_employee_company_ids()
RETURNS SETOF TEXT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT company_id FROM workforce_employees
  WHERE user_id = auth.uid() AND status IN ('active', 'invited');
$$;

DROP TRIGGER IF EXISTS trg_workforce_employees_updated ON workforce_employees;
CREATE TRIGGER trg_workforce_employees_updated
  BEFORE UPDATE ON workforce_employees
  FOR EACH ROW EXECUTE FUNCTION stankings_set_updated_at();

-- RLS
ALTER TABLE workforce_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_permission_defs ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_role_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_application_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_application_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_application_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_welcome_checklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_editorial_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_press_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_media_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_moderation_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_ops_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce_eng_issues ENABLE ROW LEVEL SECURITY;

-- Super admin full access policies + employee scoped
CREATE POLICY workforce_departments_sa ON workforce_departments FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_departments_read ON workforce_departments FOR SELECT USING (workforce_is_active_employee());

CREATE POLICY workforce_roles_sa ON workforce_roles FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_roles_read ON workforce_roles FOR SELECT USING (workforce_is_active_employee());

CREATE POLICY workforce_employees_sa ON workforce_employees FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_employees_self ON workforce_employees FOR SELECT USING (user_id = auth.uid());
CREATE POLICY workforce_employees_company ON workforce_employees FOR SELECT USING (
  company_id IN (SELECT workforce_employee_company_ids())
);

CREATE POLICY workforce_perm_defs_read ON workforce_permission_defs FOR SELECT USING (true);
CREATE POLICY workforce_perm_defs_sa ON workforce_permission_defs FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());

CREATE POLICY workforce_role_templates_read ON workforce_role_templates FOR SELECT USING (true);
CREATE POLICY workforce_role_templates_sa ON workforce_role_templates FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());

CREATE POLICY workforce_grants_sa ON workforce_grants FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_grants_self ON workforce_grants FOR SELECT USING (
  employee_id IN (SELECT id FROM workforce_employees WHERE user_id = auth.uid())
);

CREATE POLICY workforce_app_notes_sa ON workforce_application_notes FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_app_att_sa ON workforce_application_attachments FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_app_evt_sa ON workforce_application_events FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());

CREATE POLICY workforce_welcome_sa ON workforce_welcome_checklist FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_welcome_self ON workforce_welcome_checklist FOR ALL USING (
  employee_id IN (SELECT id FROM workforce_employees WHERE user_id = auth.uid())
) WITH CHECK (
  employee_id IN (SELECT id FROM workforce_employees WHERE user_id = auth.uid())
);

CREATE POLICY workforce_notif_sa ON workforce_notifications FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_notif_self ON workforce_notifications FOR ALL USING (
  employee_id IN (SELECT id FROM workforce_employees WHERE user_id = auth.uid())
) WITH CHECK (
  employee_id IN (SELECT id FROM workforce_employees WHERE user_id = auth.uid())
);

CREATE POLICY workforce_audit_sa ON workforce_audit_logs FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());

CREATE POLICY workforce_tasks_sa ON workforce_tasks FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_tasks_co ON workforce_tasks FOR ALL USING (
  company_id IN (SELECT workforce_employee_company_ids())
) WITH CHECK (company_id IN (SELECT workforce_employee_company_ids()));

CREATE POLICY workforce_editorial_sa ON workforce_editorial_articles FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_editorial_co ON workforce_editorial_articles FOR ALL USING (
  company_id IN (SELECT workforce_employee_company_ids())
) WITH CHECK (company_id IN (SELECT workforce_employee_company_ids()));

CREATE POLICY workforce_media_sa ON workforce_media_assets FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_media_co ON workforce_media_assets FOR ALL USING (
  company_id IN (SELECT workforce_employee_company_ids())
) WITH CHECK (company_id IN (SELECT workforce_employee_company_ids()));

CREATE POLICY workforce_social_sa ON workforce_social_posts FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_social_co ON workforce_social_posts FOR ALL USING (
  company_id IN (SELECT workforce_employee_company_ids())
) WITH CHECK (company_id IN (SELECT workforce_employee_company_ids()));

CREATE POLICY workforce_press_sa ON workforce_press_releases FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_press_co ON workforce_press_releases FOR ALL USING (
  company_id IN (SELECT workforce_employee_company_ids())
) WITH CHECK (company_id IN (SELECT workforce_employee_company_ids()));

CREATE POLICY workforce_contacts_sa ON workforce_media_contacts FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_contacts_co ON workforce_media_contacts FOR ALL USING (
  company_id IN (SELECT workforce_employee_company_ids())
) WITH CHECK (company_id IN (SELECT workforce_employee_company_ids()));

CREATE POLICY workforce_tickets_sa ON workforce_support_tickets FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_tickets_co ON workforce_support_tickets FOR ALL USING (
  company_id IN (SELECT workforce_employee_company_ids())
) WITH CHECK (company_id IN (SELECT workforce_employee_company_ids()));

CREATE POLICY workforce_mod_sa ON workforce_moderation_reports FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_mod_co ON workforce_moderation_reports FOR ALL USING (
  company_id IN (SELECT workforce_employee_company_ids())
) WITH CHECK (company_id IN (SELECT workforce_employee_company_ids()));

CREATE POLICY workforce_ops_sa ON workforce_ops_items FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_ops_co ON workforce_ops_items FOR ALL USING (
  company_id IN (SELECT workforce_employee_company_ids())
) WITH CHECK (company_id IN (SELECT workforce_employee_company_ids()));

CREATE POLICY workforce_eng_sa ON workforce_eng_issues FOR ALL USING (stankings_is_super_admin()) WITH CHECK (stankings_is_super_admin());
CREATE POLICY workforce_eng_co ON workforce_eng_issues FOR ALL USING (
  company_id IN (SELECT workforce_employee_company_ids())
) WITH CHECK (company_id IN (SELECT workforce_employee_company_ids()));

-- Seed permission defs
INSERT INTO workforce_permission_defs (key, feature, action, description) VALUES
  ('office.access', 'office', 'access', 'Enter /office'),
  ('tasks.read', 'tasks', 'read', 'View tasks'),
  ('tasks.write', 'tasks', 'write', 'Manage tasks'),
  ('editorial.read', 'editorial', 'read', 'View articles'),
  ('editorial.write', 'editorial', 'write', 'Create/edit articles'),
  ('editorial.publish', 'editorial', 'publish', 'Publish articles'),
  ('pr.read', 'pr', 'read', 'View PR assets'),
  ('pr.write', 'pr', 'write', 'Manage PR'),
  ('support.read', 'support', 'read', 'View tickets'),
  ('support.write', 'support', 'write', 'Handle tickets'),
  ('support.escalate', 'support', 'escalate', 'Escalate tickets'),
  ('moderation.read', 'moderation', 'read', 'View reports'),
  ('moderation.write', 'moderation', 'write', 'Action reports'),
  ('ops.read', 'ops', 'read', 'View ops items'),
  ('ops.write', 'ops', 'write', 'Manage ops'),
  ('eng.read', 'eng', 'read', 'View eng issues'),
  ('eng.write', 'eng', 'write', 'Manage eng issues'),
  ('team.read', 'team', 'read', 'View team'),
  ('company.analytics', 'company', 'analytics', 'View company analytics'),
  ('supervise.department', 'supervise', 'department', 'Supervise department'),
  ('supervise.company', 'supervise', 'company', 'Supervise company')
ON CONFLICT (key) DO NOTHING;
