-- Editorial Workflow + Volume II architecture phase (ED 48, LIB-2026-06-27-003)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-EDW-001', 'framework', 'Editorial Workflow Standard',
  'Permanent editorial process from vision through implementation, audit, and preservation.',
  NULL, NULL, 'Editorial Standards',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['editorial workflow', 'implementation readiness', 'ed 48'],
  ARRAY['iki', 'editorial-standards', 'library-engine', 'library-sessions']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-06-27-003', 'meeting_record', 'Editorial Workflow Ratified',
  'Permanent editorial workflow adopted. ED 48. Volume II reset to architecture phase.',
  NULL, NULL, 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-06-27-003', 'editorial workflow', 'ed 48'],
  ARRAY['iki', 'library-sessions', 'editorial-standards']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('FRAMEWORK-SLP-001', 'FRAMEWORK-EDW-001', 'supports', 'Editorial workflow extends knowledge governance'),
  ('FRAMEWORK-EDW-001', 'FRAMEWORK-SLP-001', 'depends_on', 'Subordinate to Library Portal'),
  ('FRAMEWORK-LIB-SESS-001', 'FRAMEWORK-EDW-001', 'supports', 'Session methodology'),
  ('FRAMEWORK-EDW-001', 'LIB-2026-06-27-003', 'references', 'Ratification session'),
  ('LIB-2026-06-27-003', 'FRAMEWORK-EDW-001', 'implements', 'Workflow ratified'),
  ('VOLUME-II-GOVERNANCE-CODE', 'FRAMEWORK-EDW-001', 'references', 'Architecture-first publishing'),
  ('constitution', 'FRAMEWORK-EDW-001', 'references', 'Editorial standard for Volume I')
ON CONFLICT DO NOTHING;
