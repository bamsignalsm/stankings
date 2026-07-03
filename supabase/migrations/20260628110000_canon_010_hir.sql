-- CANON-010 People Are Ends, Never Merely Means + HIR Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-010', 'canon', 'People Are Ends, Never Merely Means',
  'People are ends, never merely means — dignity, fairness, and respect in every relationship.',
  'Volume 0', 'first-principles', 'Human Dignity',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['dignity', 'people', 'fairness', 'respect'],
  ARRAY['iki', 'human-impact-review']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-HIR-001', 'framework', 'Human Impact Review',
  'Customer-facing changes evaluated for dignity, fairness, and human impact before implementation.',
  'Volume 0', 'first-principles', 'People Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['HIR', 'dignity', 'people', 'human impact'],
  ARRAY['iki', 'human-impact-review']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-010', 'CANON-001', 'depends_on', 'Institutions exist to serve people'),
  ('CANON-010', 'CANON-009', 'depends_on', 'Learning includes human impact'),
  ('CANON-009', 'CANON-010', 'supports', 'Internal discipline to external ethic'),
  ('FRAMEWORK-HIR-001', 'CANON-010', 'depends_on', 'Derived from Canon 010'),
  ('CANON-010', 'FRAMEWORK-HIR-001', 'supports', 'Operationalized through HIR')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
