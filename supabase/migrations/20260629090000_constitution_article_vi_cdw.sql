-- Constitution Article VI + Constitutional Decision Workspace (ED 34)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-VI', 'article', 'Article VI — Constitutional Decision-Making',
  'How decisions are made — constitutional hierarchy, evidence, documentation, and institutional reasoning.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article vi', 'decision making', 'hierarchy', 'evidence', 'idr', 'register'],
  ARRAY['iki', 'decision-workspace', 'idr-registry', 'library-engine', 'decision-intelligence']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-CDW-001', 'framework', 'Constitutional Decision Workspace',
  'Decision workspace workflow and Institutional Decision Register per Article VI.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['cdw', 'decision workspace', 'register', 'article vi', 'workflow'],
  ARRAY['iki', 'decision-workspace', 'idr-registry', 'decision-intelligence', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-VI', 'references', 'Article VI adopted'),
  ('CONSTITUTION-ARTICLE-VI', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-VI', 'CONSTITUTION-ARTICLE-V', 'depends_on', 'Follows leadership standards'),
  ('CONSTITUTION-ARTICLE-VI', 'CANON-002', 'implements', 'Trust in decision hierarchy'),
  ('CONSTITUTION-ARTICLE-VI', 'CANON-003', 'implements', 'Purpose before profit'),
  ('CONSTITUTION-ARTICLE-VI', 'CANON-005', 'implements', 'Ecosystem impact'),
  ('CONSTITUTION-ARTICLE-VI', 'CANON-006', 'implements', 'Generational effects'),
  ('CONSTITUTION-ARTICLE-VI', 'CANON-007', 'implements', 'Evidence and truth'),
  ('CONSTITUTION-ARTICLE-VI', 'CANON-009', 'implements', 'Continuous learning'),
  ('CONSTITUTION-ARTICLE-VI', 'CANON-010', 'implements', 'Human impact'),
  ('CONSTITUTION-ARTICLE-VI', 'CANON-017', 'implements', 'Uncertainty reduction'),
  ('CONSTITUTION-ARTICLE-VI', 'CANON-020', 'implements', 'Sound judgment'),
  ('CONSTITUTION-ARTICLE-VI', 'FRAMEWORK-CDW-001', 'supports', 'Decision workspace'),
  ('FRAMEWORK-CDW-001', 'CONSTITUTION-ARTICLE-VI', 'depends_on', 'Derived from Article VI'),
  ('FRAMEWORK-CDW-001', 'FRAMEWORK-IDR-001', 'references', 'Decision register'),
  ('FRAMEWORK-CDW-001', 'FRAMEWORK-CAE-001', 'references', 'Constitutional compliance'),
  ('FRAMEWORK-CDW-001', 'FRAMEWORK-PAF-001', 'references', 'Purpose assessment'),
  ('FRAMEWORK-CDW-001', 'FRAMEWORK-TIA-001', 'references', 'Trust impact'),
  ('FRAMEWORK-CDW-001', 'FRAMEWORK-EIA-001', 'references', 'Ecosystem impact'),
  ('FRAMEWORK-CDW-001', 'FRAMEWORK-GRF-001', 'references', 'Generational review'),
  ('FRAMEWORK-CDW-001', 'FRAMEWORK-LLR-001', 'references', 'Lessons learned'),
  ('FRAMEWORK-CDW-001', 'decision-workspace', 'supports', 'Workspace portal'),
  ('FRAMEWORK-CDW-001', 'idr-registry', 'references', 'IDR registry'),
  ('FRAMEWORK-CDW-001', 'decision-intelligence', 'references', 'Judgment records'),
  ('CANON-002', 'CONSTITUTION-ARTICLE-VI', 'supports', 'Trust to decisions'),
  ('CANON-007', 'CONSTITUTION-ARTICLE-VI', 'supports', 'Truth to evidence'),
  ('CANON-009', 'CONSTITUTION-ARTICLE-VI', 'supports', 'Learning to review'),
  ('FRAMEWORK-IDR-001', 'CONSTITUTION-ARTICLE-VI', 'supports', 'IDR operationalizes Article VI')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
