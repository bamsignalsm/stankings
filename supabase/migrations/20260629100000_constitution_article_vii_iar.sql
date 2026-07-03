-- Constitution Article VII + Institutional Asset Registry (ED 35)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-VII', 'article', 'Article VII — Institutional Assets & Their Stewardship',
  'Constitutional protection of trust, knowledge, digital assets, and institutional capital.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article vii', 'assets', 'trust', 'knowledge', 'iar', 'stewardship', 'digital'],
  ARRAY['iki', 'institutional-asset-registry', 'library-engine', 'commitment-registry', 'knowledge-graph']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-IAR-001', 'framework', 'Institutional Asset Registry',
  'Constitutional Asset Register with stewardship profiles per Article VII.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['iar', 'asset registry', 'constitutional assets', 'article vii', 'trust'],
  ARRAY['iki', 'institutional-asset-registry', 'library-engine', 'commitment-registry', 'platform-registry']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-VII', 'references', 'Article VII adopted'),
  ('CONSTITUTION-ARTICLE-VII', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-VII', 'CONSTITUTION-ARTICLE-VI', 'depends_on', 'Follows decision-making'),
  ('CONSTITUTION-ARTICLE-VII', 'CONSTITUTION-ARTICLE-III', 'depends_on', 'Extends stewardship assets'),
  ('CONSTITUTION-ARTICLE-VII', 'CANON-002', 'implements', 'Trust as asset'),
  ('CONSTITUTION-ARTICLE-VII', 'CANON-006', 'implements', 'Generational preservation'),
  ('CONSTITUTION-ARTICLE-VII', 'CANON-007', 'implements', 'Documentation duty'),
  ('CONSTITUTION-ARTICLE-VII', 'CANON-014', 'implements', 'Commitment assets'),
  ('CONSTITUTION-ARTICLE-VII', 'CANON-019', 'implements', 'Annual review'),
  ('CONSTITUTION-ARTICLE-VII', 'CANON-021', 'implements', 'Knowledge assets'),
  ('CONSTITUTION-ARTICLE-VII', 'CANON-025', 'implements', 'Endurance through stewardship'),
  ('CONSTITUTION-ARTICLE-VII', 'FRAMEWORK-IAR-001', 'supports', 'Asset registry'),
  ('FRAMEWORK-IAR-001', 'CONSTITUTION-ARTICLE-VII', 'depends_on', 'Derived from Article VII'),
  ('FRAMEWORK-IAR-001', 'CONSTITUTION-ARTICLE-III', 'references', 'Stewardship foundation'),
  ('FRAMEWORK-IAR-001', 'FRAMEWORK-TIA-001', 'references', 'Trust assessment'),
  ('FRAMEWORK-IAR-001', 'FRAMEWORK-ASR-001', 'references', 'Annual review'),
  ('FRAMEWORK-IAR-001', 'FRAMEWORK-IKG-001', 'references', 'Knowledge graph'),
  ('FRAMEWORK-IAR-001', 'institutional-asset-registry', 'supports', 'Registry portal'),
  ('FRAMEWORK-IAR-001', 'commitment-registry', 'references', 'Trust commitments'),
  ('FRAMEWORK-IAR-001', 'platform-registry', 'references', 'Technology assets'),
  ('CANON-002', 'CONSTITUTION-ARTICLE-VII', 'supports', 'Trust to constitutional asset'),
  ('CANON-014', 'CONSTITUTION-ARTICLE-VII', 'supports', 'Commitments to registry'),
  ('CANON-021', 'CONSTITUTION-ARTICLE-VII', 'supports', 'Knowledge to asset register')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
