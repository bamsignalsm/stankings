-- Constitution Article XII + Constitutional Trust Centre (ED 40) — Part IV

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-XII', 'article', 'Article XII — Information, Privacy & Digital Trust',
  'Part IV Constitutional Integrity — digital trust, privacy, identity, Stankings Trust Network, AI governance, and data stewardship.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article xii', 'privacy', 'digital trust', 'yike passport', 'trust graph', 'ai governance', 'part iv'],
  ARRAY['iki', 'constitutional-trust', 'library-engine', 'governance', 'platform-registry']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-CTC-001', 'framework', 'Constitutional Trust Centre',
  'Identity governance, YIKE Passport, Trust Graph, consent, AI governance, and CIGF per Article XII.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['ctc', 'trust centre', 'cigf', 'yike passport', 'trust graph', 'article xii'],
  ARRAY['iki', 'constitutional-trust', 'library-engine', 'governance', 'platform-registry']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-XII', 'references', 'Article XII adopted — Part IV digital trust'),
  ('CONSTITUTION-ARTICLE-XII', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-XI', 'CONSTITUTION-ARTICLE-XII', 'references', 'Integrity precedes digital trust'),
  ('CONSTITUTION-ARTICLE-XII', 'CONSTITUTION-ARTICLE-XI', 'depends_on', 'Ethical foundation'),
  ('CONSTITUTION-ARTICLE-XII', 'CONSTITUTION-ARTICLE-IX', 'depends_on', 'Ecosystem trust infrastructure'),
  ('CONSTITUTION-ARTICLE-XII', 'CONSTITUTION-ARTICLE-VII', 'depends_on', 'Information as constitutional asset'),
  ('CONSTITUTION-ARTICLE-XII', 'CANON-002', 'implements', 'Trust as institutional capital'),
  ('CONSTITUTION-ARTICLE-XII', 'CANON-007', 'implements', 'Purpose limitation and truth'),
  ('CONSTITUTION-ARTICLE-XII', 'CANON-010', 'implements', 'Human dignity and privacy'),
  ('CONSTITUTION-ARTICLE-XII', 'CANON-012', 'implements', 'Shared trust platforms'),
  ('CONSTITUTION-ARTICLE-XII', 'CANON-013', 'implements', 'Responsible AI'),
  ('CONSTITUTION-ARTICLE-XII', 'CANON-021', 'implements', 'Data governance and knowledge'),
  ('CONSTITUTION-ARTICLE-XII', 'FRAMEWORK-CTC-001', 'supports', 'Trust centre'),
  ('FRAMEWORK-CTC-001', 'CONSTITUTION-ARTICLE-XII', 'depends_on', 'Derived from Article XII'),
  ('FRAMEWORK-CTC-001', 'FRAMEWORK-PLAT-001', 'references', 'Platform assessment'),
  ('FRAMEWORK-CTC-001', 'FRAMEWORK-TIA-001', 'references', 'Trust impact'),
  ('FRAMEWORK-CTC-001', 'FRAMEWORK-HIR-001', 'references', 'Human impact'),
  ('FRAMEWORK-CTC-001', 'FRAMEWORK-IGF-001', 'references', 'Innovation governance'),
  ('FRAMEWORK-CTC-001', 'FRAMEWORK-IEC-001', 'references', 'Integrity foundation'),
  ('FRAMEWORK-CTC-001', 'constitutional-trust', 'supports', 'Portal system'),
  ('constitutional-trust', 'CONSTITUTION-ARTICLE-XII', 'depends_on', 'Constitutional authority'),
  ('CANON-002', 'CONSTITUTION-ARTICLE-XII', 'supports', 'Trust to digital trust'),
  ('CANON-007', 'CONSTITUTION-ARTICLE-XII', 'supports', 'Truth to purpose limitation'),
  ('CANON-010', 'CONSTITUTION-ARTICLE-XII', 'supports', 'Dignity to privacy'),
  ('CANON-012', 'CONSTITUTION-ARTICLE-XII', 'supports', 'Platforms to trust network'),
  ('CANON-013', 'CONSTITUTION-ARTICLE-XII', 'supports', 'Innovation to AI governance'),
  ('CANON-021', 'CONSTITUTION-ARTICLE-XII', 'supports', 'Knowledge to data governance')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
