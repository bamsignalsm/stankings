-- Constitution Article II + Constitutional Alignment Engine (ED 30)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-II', 'article', 'Article II — Purpose, Mission & Constitutional Objectives',
  'Constitutionalizes purpose, mission, vision, objectives, and expansion discipline.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article ii', 'purpose', 'mission', 'objectives', 'CAE'],
  ARRAY['iki', 'constitutional-alignment', 'library-engine', 'decision-intelligence']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-CAE-001', 'framework', 'Constitutional Alignment Engine',
  'Constitutional compliance for every Board proposal before approval.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['CAE', 'constitutional alignment', 'compliance', 'article ii'],
  ARRAY['iki', 'constitutional-alignment', 'decision-intelligence', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-II', 'references', 'Article II adopted'),
  ('CONSTITUTION-ARTICLE-II', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-II', 'CONSTITUTION-ARTICLE-I', 'depends_on', 'Follows identity'),
  ('CONSTITUTION-ARTICLE-II', 'CANON-001', 'implements', 'Constitutional purpose'),
  ('CONSTITUTION-ARTICLE-II', 'CANON-003', 'implements', 'Purpose before profit'),
  ('CONSTITUTION-ARTICLE-II', 'CANON-006', 'implements', 'Generational objectives'),
  ('CONSTITUTION-ARTICLE-II', 'CANON-011', 'implements', 'Expansion discipline'),
  ('CONSTITUTION-ARTICLE-II', 'CANON-017', 'implements', 'Reduce uncertainty mission'),
  ('CONSTITUTION-ARTICLE-II', 'CANON-018', 'implements', 'Purpose before expansion'),
  ('CONSTITUTION-ARTICLE-II', 'CANON-022', 'implements', 'Lasting value objectives'),
  ('CONSTITUTION-ARTICLE-II', 'FRAMEWORK-CAE-001', 'supports', 'Alignment engine'),
  ('FRAMEWORK-CAE-001', 'CONSTITUTION-ARTICLE-II', 'depends_on', 'Derived from Article II'),
  ('FRAMEWORK-CAE-001', 'CONSTITUTION-ARTICLE-I', 'depends_on', 'Identity gate'),
  ('FRAMEWORK-CAE-001', 'FRAMEWORK-PAF-001', 'references', 'Purpose gate'),
  ('FRAMEWORK-CAE-001', 'FRAMEWORK-TIA-001', 'references', 'Trust gate'),
  ('FRAMEWORK-CAE-001', 'FRAMEWORK-EIA-001', 'references', 'Ecosystem gate'),
  ('FRAMEWORK-CAE-001', 'constitutional-alignment', 'supports', 'Proposal registry'),
  ('CANON-003', 'CONSTITUTION-ARTICLE-II', 'supports', 'Philosophy to law'),
  ('CANON-018', 'CONSTITUTION-ARTICLE-II', 'supports', 'Opportunity test')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
