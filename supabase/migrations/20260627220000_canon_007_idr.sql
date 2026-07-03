-- CANON-007 Truth Before Convenience + IDR Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-007', 'canon', 'Truth Before Convenience',
  'Truth before convenience — evidence over assumption, reality over wishful thinking.',
  'Volume 0', 'first-principles', 'Foundational Principles',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['truth', 'convenience', 'evidence', 'honesty', 'decisions'],
  ARRAY['iki', 'decision-records']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-IDR-001', 'framework', 'Institutional Decision Record',
  'Every major decision produces an IDR — institutional memory of why, not only what.',
  'Volume 0', 'first-principles', 'Decision Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['IDR', 'decisions', 'truth', 'governance'],
  ARRAY['iki', 'decision-records', 'governance']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-007', 'CANON-001', 'depends_on', 'Philosophical foundation'),
  ('CANON-007', 'CANON-002', 'depends_on', 'Truth strengthens trust'),
  ('CANON-007', 'CANON-006', 'depends_on', 'Truth across generations'),
  ('CANON-006', 'CANON-007', 'supports', 'Generational decisions require truth'),
  ('FRAMEWORK-IDR-001', 'CANON-007', 'depends_on', 'Derived from Canon 007')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
