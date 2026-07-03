-- Volume II Governance Code — Book I (ED 46)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'VOLUME-II-GOVERNANCE-CODE', 'framework', 'Volume II — The Stankings Group Governance Code',
  'Operational governance implementing the Constitution — Books I–XII. Foundational Draft v0.1.',
  'Volume II', 'governance-code', 'Governance Law',
  'approved', '0.1', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['volume ii', 'governance code', 'book i', 'governance bodies', 'ed 46'],
  ARRAY['iki', 'governance-code', 'constitutional-governance', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-GC-001', 'framework', 'Governance Code Portal',
  'Volume II portal — twelve Books implementing the Constitution in daily practice.',
  'Volume II', 'governance-code', 'Governance Frameworks',
  'approved', '0.1', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['gc', 'governance portal', 'volume ii', 'book i'],
  ARRAY['iki', 'governance-code', 'leadership-governance', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'BOOK-I-GOVERNANCE-BODIES', 'standard', 'Book I — Governance Bodies',
  'Ten governance bodies with standard charter template — Board, Council, ELT, and committees.',
  'Volume II', 'governance-code', 'Governance Law',
  'approved', '0.1', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['book i', 'governance bodies', 'board', 'library council', 'committees'],
  ARRAY['iki', 'governance-code', 'constitutional-governance']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'VOLUME-II-GOVERNANCE-CODE', 'references', 'Volume II implements Volume I'),
  ('VOLUME-II-GOVERNANCE-CODE', 'constitution', 'depends_on', 'Subordinate to Constitution'),
  ('VOLUME-II-GOVERNANCE-CODE', 'CONSTITUTION-ARTICLE-IV', 'implements', 'Governance bodies'),
  ('VOLUME-II-GOVERNANCE-CODE', 'CONSTITUTION-ARTICLE-V', 'implements', 'Leadership standards'),
  ('VOLUME-II-GOVERNANCE-CODE', 'FRAMEWORK-GC-001', 'supports', 'Governance portal'),
  ('FRAMEWORK-GC-001', 'VOLUME-II-GOVERNANCE-CODE', 'depends_on', 'Derived from Volume II'),
  ('FRAMEWORK-GC-001', 'FRAMEWORK-CGOV-001', 'references', 'Constitutional governance'),
  ('FRAMEWORK-GC-001', 'FRAMEWORK-LGOV-001', 'references', 'Leadership governance'),
  ('BOOK-I-GOVERNANCE-BODIES', 'VOLUME-II-GOVERNANCE-CODE', 'depends_on', 'Book I of Volume II'),
  ('BOOK-I-GOVERNANCE-BODIES', 'CONSTITUTION-ARTICLE-IV', 'implements', 'Governance bodies'),
  ('governance-code-portal', 'VOLUME-II-GOVERNANCE-CODE', 'depends_on', 'Portal authority')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
