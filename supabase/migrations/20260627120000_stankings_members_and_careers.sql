-- Stankings Group members and careers

CREATE TABLE IF NOT EXISTS stankings_members (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'member'
    CHECK (role IN ('member', 'admin', 'super_admin')),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stankings_career_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  company_area TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  location TEXT NOT NULL DEFAULT 'Lagos, Nigeria',
  employment_type TEXT NOT NULL DEFAULT 'full-time',
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'closed')),
  created_by UUID REFERENCES stankings_members(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stankings_career_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES stankings_career_posts(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES stankings_members(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cover_letter TEXT,
  linkedin_url TEXT,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'reviewing', 'shortlisted', 'rejected', 'hired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION stankings_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION stankings_is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM stankings_members
    WHERE id = auth.uid() AND role = 'super_admin' AND status = 'approved'
  );
$$;

CREATE OR REPLACE FUNCTION stankings_is_approved_member()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM stankings_members
    WHERE id = auth.uid() AND status = 'approved'
  );
$$;

DROP TRIGGER IF EXISTS trg_members_updated ON stankings_members;
CREATE TRIGGER trg_members_updated
  BEFORE UPDATE ON stankings_members
  FOR EACH ROW EXECUTE FUNCTION stankings_set_updated_at();

DROP TRIGGER IF EXISTS trg_career_posts_updated ON stankings_career_posts;
CREATE TRIGGER trg_career_posts_updated
  BEFORE UPDATE ON stankings_career_posts
  FOR EACH ROW EXECUTE FUNCTION stankings_set_updated_at();

ALTER TABLE stankings_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE stankings_career_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stankings_career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "members_read_own" ON stankings_members
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "members_insert_own" ON stankings_members
  FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "super_admin_all_members" ON stankings_members
  FOR ALL TO authenticated
  USING (stankings_is_super_admin());

CREATE POLICY "public_read_published_careers" ON stankings_career_posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "super_admin_careers" ON stankings_career_posts
  FOR ALL TO authenticated
  USING (stankings_is_super_admin());

CREATE POLICY "anyone_insert_applications" ON stankings_career_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "super_admin_applications" ON stankings_career_applications
  FOR ALL TO authenticated
  USING (stankings_is_super_admin());
