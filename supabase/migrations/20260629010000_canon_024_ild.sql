-- CANON-024 Raise the Standard + ILD Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-024', 'canon', 'Raise the Standard',
  'Improve every industry we enter — compete through excellence, not domination.',
  'Volume 0', 'first-principles', 'Civilization Canons',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['standard', 'industry', 'ILD', 'excellence', 'civilization'],
  ARRAY['iki', 'library-engine', 'industry-leadership', 'legacy-dashboard', 'canon-dashboard']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-ILD-001', 'framework', 'Industry Leadership Dashboard',
  'Industry standards to raise and annual progress per institution.',
  'Volume 0', 'first-principles', 'Civilization Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['ILD', 'industry leadership', 'standard'],
  ARRAY['iki', 'industry-leadership', 'legacy-dashboard', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-024', 'CANON-003', 'depends_on', 'Purpose precedes profit'),
  ('CANON-024', 'CANON-008', 'depends_on', 'Excellence raises standards'),
  ('CANON-024', 'CANON-017', 'depends_on', 'Uncertainty reduction through trust'),
  ('CANON-024', 'CANON-022', 'depends_on', 'Civilization contribution'),
  ('CANON-024', 'CANON-023', 'depends_on', 'Humility enables improvement'),
  ('CANON-008', 'CANON-024', 'supports', 'Excellence to industry elevation'),
  ('CANON-017', 'CANON-024', 'supports', 'Trust standards to industry'),
  ('CANON-022', 'CANON-024', 'supports', 'Legacy to industry influence'),
  ('CANON-023', 'CANON-024', 'supports', 'Learning to standard raising'),
  ('FRAMEWORK-ILD-001', 'CANON-024', 'depends_on', 'Derived from Canon 024'),
  ('CANON-024', 'FRAMEWORK-ILD-001', 'supports', 'Operationalized through ILD'),
  ('FRAMEWORK-ILD-001', 'FRAMEWORK-LEGACY-001', 'references', 'Stewardship report integration'),
  ('FRAMEWORK-ILD-001', 'FRAMEWORK-EXF-001', 'references', 'Excellence standards'),
  ('CANON-024', 'industry-leadership', 'supports', 'Industry leadership registry'),
  ('CANON-024', 'legacy-dashboard', 'references', 'Annual progress in stewardship reports'),
  ('CANON-024', 'canon-dashboard', 'supports', 'Canon implementation tracking'),
  ('excellence-standards', 'CANON-024', 'supports', 'Excellence to industry standards'),
  ('CANON-024', 'LEX-STANDARD', 'references', 'Lexicon: Standard')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
