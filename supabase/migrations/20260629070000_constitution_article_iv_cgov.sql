-- Constitution Article IV + Constitutional Governance Portal (ED 32)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-IV', 'article', 'Article IV — Constitutional Governance',
  'Who governs, how power is exercised, and how power is limited — separation of govern and manage.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article iv', 'governance', 'board', 'ceo', 'reserved powers', 'delegation'],
  ARRAY['iki', 'constitutional-governance', 'library-engine', 'idr-registry']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-CGOV-001', 'framework', 'Constitutional Governance Portal',
  'Governance body profiles, constitutional hierarchy, and Reserved Powers Register per Article IV.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['cgov', 'governance portal', 'reserved powers', 'article iv', 'board'],
  ARRAY['iki', 'constitutional-governance', 'library-engine', 'idr-registry']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-IV', 'references', 'Article IV adopted'),
  ('CONSTITUTION-ARTICLE-IV', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-IV', 'CONSTITUTION-ARTICLE-III', 'depends_on', 'Follows stewardship'),
  ('CONSTITUTION-ARTICLE-IV', 'CANON-004', 'implements', 'Governance duties'),
  ('CONSTITUTION-ARTICLE-IV', 'CANON-007', 'implements', 'Accountability and records'),
  ('CONSTITUTION-ARTICLE-IV', 'CANON-015', 'implements', 'Board duties and reviews'),
  ('CONSTITUTION-ARTICLE-IV', 'CANON-016', 'implements', 'Governance frameworks'),
  ('CONSTITUTION-ARTICLE-IV', 'CANON-020', 'implements', 'Executive judgment'),
  ('CONSTITUTION-ARTICLE-IV', 'FRAMEWORK-CGOV-001', 'supports', 'Governance portal'),
  ('FRAMEWORK-CGOV-001', 'CONSTITUTION-ARTICLE-IV', 'depends_on', 'Derived from Article IV'),
  ('FRAMEWORK-CGOV-001', 'FRAMEWORK-IDR-001', 'references', 'Decision registry'),
  ('FRAMEWORK-CGOV-001', 'FRAMEWORK-LSF-001', 'references', 'Leadership stewardship'),
  ('FRAMEWORK-CGOV-001', 'constitutional-governance', 'supports', 'Body profiles'),
  ('FRAMEWORK-CGOV-001', 'idr-registry', 'references', 'Governance decisions'),
  ('CANON-004', 'CONSTITUTION-ARTICLE-IV', 'supports', 'Stewardship to governance'),
  ('CANON-007', 'CONSTITUTION-ARTICLE-IV', 'supports', 'Truth to accountability'),
  ('CANON-015', 'CONSTITUTION-ARTICLE-IV', 'supports', 'Strength to Board duties'),
  ('CANON-016', 'CONSTITUTION-ARTICLE-IV', 'supports', 'Frameworks to delegation'),
  ('CANON-020', 'CONSTITUTION-ARTICLE-IV', 'supports', 'Judgment to executives')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
