-- Constitution Article I + Institutional Identity Statement Framework (ED 29)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-I', 'article', 'Article I — The Identity of the Institution',
  'Defines constitutional identity, ecosystem nature, purpose, character, authority, continuity, symbols and interpretation.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article i', 'identity', 'ecosystem', 'constitution'],
  ARRAY['iki', 'library-engine', 'institutional-identity', 'ecosystem-map']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-IIS-001', 'framework', 'Institutional Identity Statement Framework',
  'Every ecosystem institution maintains an Identity Statement consistent with Article I.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['IIS', 'institutional identity', 'article i', 'admission'],
  ARRAY['iki', 'institutional-identity', 'ecosystem-map', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-I', 'references', 'Article I adopted'),
  ('CONSTITUTION-ARTICLE-I', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-I', 'CONSTITUTION-PREAMBLE', 'depends_on', 'Follows Preamble'),
  ('CONSTITUTION-ARTICLE-I', 'CANON-001', 'implements', 'Institutional purpose'),
  ('CONSTITUTION-ARTICLE-I', 'CANON-003', 'implements', 'Purpose before profit'),
  ('CONSTITUTION-ARTICLE-I', 'CANON-005', 'implements', 'Institutional ecosystem'),
  ('CONSTITUTION-ARTICLE-I', 'CANON-006', 'implements', 'Generational continuity'),
  ('CONSTITUTION-ARTICLE-I', 'CANON-007', 'implements', 'Constitutional authority'),
  ('CONSTITUTION-ARTICLE-I', 'CANON-023', 'references', 'Learning character'),
  ('CONSTITUTION-ARTICLE-I', 'CANON-024', 'references', 'Excellence character'),
  ('CONSTITUTION-ARTICLE-I', 'FRAMEWORK-IIS-001', 'supports', 'Identity statements'),
  ('FRAMEWORK-IIS-001', 'CONSTITUTION-ARTICLE-I', 'depends_on', 'Derived from Article I'),
  ('FRAMEWORK-IIS-001', 'CANON-005', 'depends_on', 'Ecosystem alignment'),
  ('FRAMEWORK-IIS-001', 'ecosystem-map', 'supports', 'Institution registry'),
  ('FRAMEWORK-IIS-001', 'institutional-identity', 'supports', 'Identity pages'),
  ('CANON-005', 'CONSTITUTION-ARTICLE-I', 'supports', 'Philosophy to law'),
  ('ecosystem-map', 'FRAMEWORK-IIS-001', 'references', 'Admission gate')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
