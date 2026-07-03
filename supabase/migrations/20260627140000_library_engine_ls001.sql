-- LS-001 Library Engine — Knowledge Object data model
-- Phase A foundation

-- Volumes (structural containers)
CREATE TABLE IF NOT EXISTS stankings_library_volumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  number INTEGER NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  question TEXT,
  opening_quote TEXT,
  purpose TEXT,
  status TEXT NOT NULL DEFAULT 'planned'
    CHECK (status IN ('published', 'in-progress', 'planned', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Knowledge Objects (LS-001)
CREATE TABLE IF NOT EXISTS stankings_knowledge_objects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL UNIQUE,
  object_type TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  volume_id UUID REFERENCES stankings_library_volumes(id) ON DELETE SET NULL,
  volume_label TEXT,
  volume_slug TEXT,
  category TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'in_review', 'approved', 'archived', 'superseded')),
  version TEXT NOT NULL DEFAULT '1.0',
  author TEXT,
  approver TEXT,
  owner TEXT NOT NULL DEFAULT 'Library Council',
  review_date DATE,
  visibility TEXT NOT NULL DEFAULT 'employee'
    CHECK (visibility IN (
      'public', 'partner', 'employee', 'executive', 'board',
      'trustees', 'custodians', 'confidential', 'restricted'
    )),
  body_markdown TEXT,
  section_anchor TEXT,
  search_keywords TEXT[] NOT NULL DEFAULT '{}',
  related_companies TEXT[] NOT NULL DEFAULT '{}',
  related_systems TEXT[] NOT NULL DEFAULT '{}',
  supersedes_identifier TEXT,
  superseded_by_identifier TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ko_identifier ON stankings_knowledge_objects(identifier);
CREATE INDEX IF NOT EXISTS idx_ko_status ON stankings_knowledge_objects(status);
CREATE INDEX IF NOT EXISTS idx_ko_type ON stankings_knowledge_objects(object_type);
CREATE INDEX IF NOT EXISTS idx_ko_visibility ON stankings_knowledge_objects(visibility);
CREATE INDEX IF NOT EXISTS idx_ko_search ON stankings_knowledge_objects
  USING gin(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(body_markdown, '')));

-- Version history (never overwrite)
CREATE TABLE IF NOT EXISTS stankings_knowledge_object_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_object_id UUID NOT NULL REFERENCES stankings_knowledge_objects(id) ON DELETE CASCADE,
  version_number TEXT NOT NULL,
  author TEXT NOT NULL,
  summary_of_changes TEXT NOT NULL DEFAULT '',
  approval_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  reason_for_change TEXT NOT NULL DEFAULT '',
  body_markdown TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (knowledge_object_id, version_number)
);

-- Cross-references and dependencies
CREATE TABLE IF NOT EXISTS stankings_knowledge_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_identifier TEXT NOT NULL,
  target_identifier TEXT NOT NULL,
  relationship_type TEXT NOT NULL
    CHECK (relationship_type IN ('references', 'depends_on', 'supersedes', 'related')),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (source_identifier, target_identifier, relationship_type)
);

CREATE INDEX IF NOT EXISTS idx_kr_source ON stankings_knowledge_relationships(source_identifier);
CREATE INDEX IF NOT EXISTS idx_kr_target ON stankings_knowledge_relationships(target_identifier);

-- Tags
CREATE TABLE IF NOT EXISTS stankings_knowledge_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stankings_knowledge_object_tags (
  knowledge_object_id UUID NOT NULL REFERENCES stankings_knowledge_objects(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES stankings_knowledge_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (knowledge_object_id, tag_id)
);

-- Approval workflow
CREATE TABLE IF NOT EXISTS stankings_knowledge_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_object_id UUID NOT NULL REFERENCES stankings_knowledge_objects(id) ON DELETE CASCADE,
  version_id UUID REFERENCES stankings_knowledge_object_versions(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewer_id UUID REFERENCES stankings_members(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  decided_at TIMESTAMPTZ
);

-- updated_at trigger
CREATE OR REPLACE FUNCTION stankings_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_ko_updated ON stankings_knowledge_objects;
CREATE TRIGGER trg_ko_updated
  BEFORE UPDATE ON stankings_knowledge_objects
  FOR EACH ROW EXECUTE FUNCTION stankings_set_updated_at();

DROP TRIGGER IF EXISTS trg_vol_updated ON stankings_library_volumes;
CREATE TRIGGER trg_vol_updated
  BEFORE UPDATE ON stankings_library_volumes
  FOR EACH ROW EXECUTE FUNCTION stankings_set_updated_at();

-- RLS
ALTER TABLE stankings_library_volumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE stankings_knowledge_objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE stankings_knowledge_object_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stankings_knowledge_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE stankings_knowledge_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE stankings_knowledge_object_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE stankings_knowledge_approvals ENABLE ROW LEVEL SECURITY;

-- Approved members read approved knowledge objects
CREATE POLICY "members_read_approved_ko" ON stankings_knowledge_objects
  FOR SELECT TO authenticated
  USING (
    status = 'approved'
    AND EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.status = 'approved'
    )
  );

CREATE POLICY "super_admin_all_ko" ON stankings_knowledge_objects
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.role = 'super_admin' AND m.status = 'approved'
    )
  );

CREATE POLICY "members_read_volumes" ON stankings_library_volumes
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.status = 'approved'
    )
  );

CREATE POLICY "super_admin_volumes" ON stankings_library_volumes
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.role = 'super_admin' AND m.status = 'approved'
    )
  );

CREATE POLICY "members_read_ko_versions" ON stankings_knowledge_object_versions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.status = 'approved'
    )
  );

CREATE POLICY "super_admin_ko_versions" ON stankings_knowledge_object_versions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.role = 'super_admin' AND m.status = 'approved'
    )
  );

CREATE POLICY "members_read_relationships" ON stankings_knowledge_relationships
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.status = 'approved'
    )
  );

CREATE POLICY "super_admin_relationships" ON stankings_knowledge_relationships
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.role = 'super_admin' AND m.status = 'approved'
    )
  );

CREATE POLICY "members_read_tags" ON stankings_knowledge_tags
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.status = 'approved'
    )
  );

CREATE POLICY "super_admin_tags" ON stankings_knowledge_tags
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.role = 'super_admin' AND m.status = 'approved'
    )
  );

CREATE POLICY "members_read_object_tags" ON stankings_knowledge_object_tags
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.status = 'approved'
    )
  );

CREATE POLICY "super_admin_object_tags" ON stankings_knowledge_object_tags
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.role = 'super_admin' AND m.status = 'approved'
    )
  );

CREATE POLICY "members_read_approvals" ON stankings_knowledge_approvals
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.status = 'approved'
    )
  );

CREATE POLICY "super_admin_approvals" ON stankings_knowledge_approvals
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.role = 'super_admin' AND m.status = 'approved'
    )
  );
