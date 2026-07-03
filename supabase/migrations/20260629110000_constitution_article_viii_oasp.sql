-- Constitution Article VIII + Ownership & Stewardship Portal (ED 36)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-VIII', 'article', 'Article VIII — Ownership, Custody & Constitutional Responsibility',
  'Constitutional philosophy of ownership — separation from governance, generational stewardship, relationship to applicable law.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article viii', 'ownership', 'custody', 'trust deed', 'governance architecture'],
  ARRAY['iki', 'ownership-stewardship', 'library-engine', 'custodian-programme']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-OASP-001', 'framework', 'Ownership & Stewardship Portal',
  'Governance Architecture Register — constitutional vs legal governance layers per Article VIII.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['oasp', 'ownership portal', 'governance architecture', 'article viii', 'gar'],
  ARRAY['iki', 'ownership-stewardship', 'library-engine', 'custodian-programme']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-VIII', 'references', 'Article VIII adopted'),
  ('CONSTITUTION-ARTICLE-VIII', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-VIII', 'CONSTITUTION-ARTICLE-VII', 'depends_on', 'Follows asset stewardship'),
  ('CONSTITUTION-ARTICLE-VIII', 'CONSTITUTION-ARTICLE-IV', 'depends_on', 'Governance separation'),
  ('CONSTITUTION-ARTICLE-VIII', 'CANON-004', 'implements', 'Ownership as stewardship'),
  ('CONSTITUTION-ARTICLE-VIII', 'CANON-006', 'implements', 'Generational duty'),
  ('CONSTITUTION-ARTICLE-VIII', 'CANON-007', 'implements', 'Truth and law relationship'),
  ('CONSTITUTION-ARTICLE-VIII', 'CANON-016', 'implements', 'Governance frameworks'),
  ('CONSTITUTION-ARTICLE-VIII', 'CANON-025', 'implements', 'Worthy endurance'),
  ('CONSTITUTION-ARTICLE-VIII', 'FRAMEWORK-OASP-001', 'supports', 'Ownership portal'),
  ('FRAMEWORK-OASP-001', 'CONSTITUTION-ARTICLE-VIII', 'depends_on', 'Derived from Article VIII'),
  ('FRAMEWORK-OASP-001', 'FRAMEWORK-CGOV-001', 'references', 'Governance bodies'),
  ('FRAMEWORK-OASP-001', 'FRAMEWORK-IAR-001', 'references', 'Asset register'),
  ('FRAMEWORK-OASP-001', 'FRAMEWORK-GRF-001', 'references', 'Generational review'),
  ('FRAMEWORK-OASP-001', 'ownership-stewardship', 'supports', 'Portal system'),
  ('FRAMEWORK-OASP-001', 'custodian-programme', 'references', 'Successor formation'),
  ('CANON-004', 'CONSTITUTION-ARTICLE-VIII', 'supports', 'Stewardship to ownership'),
  ('CANON-006', 'CONSTITUTION-ARTICLE-VIII', 'supports', 'Generations to custody'),
  ('CANON-016', 'CONSTITUTION-ARTICLE-VIII', 'supports', 'Frameworks to separation')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
