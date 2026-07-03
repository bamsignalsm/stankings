-- LS-002 Lexicon Engine — institutional vocabulary persistence

CREATE TABLE IF NOT EXISTS stankings_lexicon_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL UNIQUE,
  term TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  letter CHAR(1) NOT NULL,
  definition TEXT NOT NULL,
  paragraphs TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'approved'
    CHECK (status IN ('approved', 'draft', 'in_review', 'proposed', 'archived')),
  version TEXT NOT NULL DEFAULT '1.0',
  author TEXT NOT NULL DEFAULT 'Library Council',
  approver TEXT,
  owner TEXT NOT NULL DEFAULT 'Library Council',
  approved_at DATE NOT NULL DEFAULT CURRENT_DATE,
  review_date DATE,
  synonyms TEXT[] NOT NULL DEFAULT '{}',
  related_term_slugs TEXT[] NOT NULL DEFAULT '{}',
  search_keywords TEXT[] NOT NULL DEFAULT '{}',
  distinctions JSONB,
  knowledge_object_identifier TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lexicon_slug ON stankings_lexicon_terms(slug);
CREATE INDEX IF NOT EXISTS idx_lexicon_letter ON stankings_lexicon_terms(letter);
CREATE INDEX IF NOT EXISTS idx_lexicon_status ON stankings_lexicon_terms(status);
CREATE INDEX IF NOT EXISTS idx_lexicon_search ON stankings_lexicon_terms
  USING gin(to_tsvector('english', coalesce(term, '') || ' ' || coalesce(definition, '')));

CREATE TABLE IF NOT EXISTS stankings_lexicon_term_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lexicon_term_id UUID NOT NULL REFERENCES stankings_lexicon_terms(id) ON DELETE CASCADE,
  version_number TEXT NOT NULL,
  definition TEXT NOT NULL,
  summary_of_changes TEXT NOT NULL DEFAULT '',
  approval_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  author TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (lexicon_term_id, version_number)
);

DROP TRIGGER IF EXISTS trg_lexicon_updated ON stankings_lexicon_terms;
CREATE TRIGGER trg_lexicon_updated
  BEFORE UPDATE ON stankings_lexicon_terms
  FOR EACH ROW EXECUTE FUNCTION stankings_set_updated_at();

ALTER TABLE stankings_lexicon_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE stankings_lexicon_term_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "members_read_approved_lexicon" ON stankings_lexicon_terms
  FOR SELECT TO authenticated
  USING (
    status = 'approved'
    AND EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.status = 'approved'
    )
  );

CREATE POLICY "super_admin_lexicon" ON stankings_lexicon_terms
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.role = 'super_admin' AND m.status = 'approved'
    )
  );

CREATE POLICY "members_read_lexicon_versions" ON stankings_lexicon_term_versions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.status = 'approved'
    )
  );

CREATE POLICY "super_admin_lexicon_versions" ON stankings_lexicon_term_versions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM stankings_members m
      WHERE m.id = auth.uid() AND m.role = 'super_admin' AND m.status = 'approved'
    )
  );

-- Register LS-002 knowledge object
INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, category, status, version,
  author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LS-002', 'standard', 'The Stankings Lexicon',
  'Establishes the official institutional vocabulary of Stankings Group.',
  'Library Standards', 'approved', '1.0',
  'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['lexicon', 'vocabulary', 'LS-002', 'trust', 'stewardship'],
  ARRAY['stankings.com', 'lexicon-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES ('LS-002', 'LS-001', 'depends_on', 'Lexicon terms are Knowledge Objects under LS-001')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
