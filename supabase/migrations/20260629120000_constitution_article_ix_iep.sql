-- Constitution Article IX + Institutional Ecosystem Portal (ED 37)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-IX', 'article', 'Article IX — The Institutional Ecosystem',
  'Constitutional ecosystem of enduring institutions — shared platforms, collaboration, admission, independence, and ecosystem stewardship.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article ix', 'institutional ecosystem', 'shared platforms', 'ecosystem register'],
  ARRAY['iki', 'ecosystem-architecture', 'ecosystem-map', 'library-engine', 'platform-registry']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-IEP-001', 'framework', 'Institutional Ecosystem Portal',
  'Institutional Ecosystem Register and architecture portal per Article IX.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['iep', 'ecosystem portal', 'institutional ecosystem register', 'article ix'],
  ARRAY['iki', 'ecosystem-architecture', 'ecosystem-map', 'library-engine', 'platform-registry']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-IX', 'references', 'Article IX adopted'),
  ('CONSTITUTION-ARTICLE-IX', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-IX', 'CONSTITUTION-ARTICLE-VIII', 'depends_on', 'Follows ownership and custody'),
  ('CONSTITUTION-ARTICLE-IX', 'CONSTITUTION-ARTICLE-I', 'depends_on', 'Institutional identity'),
  ('CONSTITUTION-ARTICLE-IX', 'CONSTITUTION-ARTICLE-II', 'depends_on', 'Constitutional purpose'),
  ('CONSTITUTION-ARTICLE-VIII', 'CONSTITUTION-ARTICLE-IX', 'references', 'Ecosystem follows ownership'),
  ('CONSTITUTION-ARTICLE-IX', 'CANON-001', 'implements', 'Institutions serve'),
  ('CONSTITUTION-ARTICLE-IX', 'CANON-002', 'implements', 'Trust infrastructure'),
  ('CONSTITUTION-ARTICLE-IX', 'CANON-003', 'implements', 'Purpose alignment'),
  ('CONSTITUTION-ARTICLE-IX', 'CANON-005', 'implements', 'Ecosystem coherence'),
  ('CONSTITUTION-ARTICLE-IX', 'CANON-006', 'implements', 'Long-term ecosystem'),
  ('CONSTITUTION-ARTICLE-IX', 'CANON-011', 'implements', 'Complementary institutions'),
  ('CONSTITUTION-ARTICLE-IX', 'CANON-012', 'implements', 'Shared platforms'),
  ('CONSTITUTION-ARTICLE-IX', 'CANON-016', 'implements', 'Ecosystem stewardship'),
  ('CONSTITUTION-ARTICLE-IX', 'FRAMEWORK-IEP-001', 'supports', 'Ecosystem portal'),
  ('FRAMEWORK-IEP-001', 'CONSTITUTION-ARTICLE-IX', 'depends_on', 'Derived from Article IX'),
  ('FRAMEWORK-IEP-001', 'FRAMEWORK-IIS-001', 'references', 'Institutional identity'),
  ('FRAMEWORK-IEP-001', 'FRAMEWORK-EIA-001', 'references', 'Ecosystem impact'),
  ('FRAMEWORK-IEP-001', 'FRAMEWORK-CAE-001', 'references', 'Constitutional alignment'),
  ('FRAMEWORK-IEP-001', 'ecosystem-architecture', 'supports', 'Portal system'),
  ('FRAMEWORK-IEP-001', 'ecosystem-map', 'references', 'Operating map'),
  ('FRAMEWORK-IEP-001', 'platform-registry', 'references', 'Shared platforms'),
  ('ecosystem-architecture', 'CONSTITUTION-ARTICLE-IX', 'depends_on', 'Constitutional authority'),
  ('ecosystem-map', 'ecosystem-architecture', 'references', 'Constitutional profiles'),
  ('CANON-005', 'CONSTITUTION-ARTICLE-IX', 'supports', 'Ecosystem to constitution'),
  ('CANON-005', 'ecosystem-architecture', 'supports', 'Architecture portal'),
  ('CANON-012', 'CONSTITUTION-ARTICLE-IX', 'supports', 'Platforms to ecosystem'),
  ('CANON-016', 'CONSTITUTION-ARTICLE-IX', 'supports', 'Stewardship to ecosystem')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
