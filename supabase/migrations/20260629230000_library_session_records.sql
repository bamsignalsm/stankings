-- Library Session Records — Editor's Decision No. 47 (FRAMEWORK-LIB-SESS-001)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-LIB-SESS-001', 'framework', 'Library Session Records Portal',
  'Institutional memory — session records, progress reports, and editorial methodology per Editor''s Decision No. 47.',
  NULL, NULL, 'Library Frameworks',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['session records', 'institutional memory', 'editor decision 47', 'progress report'],
  ARRAY['iki', 'library-sessions', 'library-engine', 'stankings-library']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-001', 'meeting_record', 'Transition from Constitutional Drafting to Governance Code',
  'Volume I frozen; Volume II begun with Books structure; Book I Governance Bodies completed as Foundational Draft v0.1.',
  NULL, NULL, 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-001', 'governance code', 'books not articles', 'volume i freeze'],
  ARRAY['iki', 'library-sessions', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-002', 'meeting_record', 'Adoption of Three-Section Session Methodology',
  'Permanent drafting methodology adopted — Editor''s Decision No. 47, four alignment questions, Three Reads Rule, and editorial motto.',
  NULL, NULL, 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-002', 'editor decision 47', 'three reads', 'think challenge design'],
  ARRAY['iki', 'library-sessions', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('FRAMEWORK-SLP-001', 'FRAMEWORK-LIB-SESS-001', 'supports', 'Session records extend knowledge governance'),
  ('FRAMEWORK-LIB-SESS-001', 'FRAMEWORK-SLP-001', 'depends_on', 'Subordinate to Library Portal framework'),
  ('FRAMEWORK-LIB-SESS-001', 'LIB-2026-06-27-001', 'references', 'Session record'),
  ('FRAMEWORK-LIB-SESS-001', 'LIB-2026-06-27-002', 'references', 'Session record'),
  ('LIB-2026-06-27-001', 'VOLUME-II-GOVERNANCE-CODE', 'references', 'Governance Code transition'),
  ('LIB-2026-06-27-001', 'constitutional-convention', 'references', 'Volume I freeze'),
  ('LIB-2026-06-27-002', 'FRAMEWORK-LIB-SESS-001', 'implements', 'Methodology adoption')
ON CONFLICT DO NOTHING;
