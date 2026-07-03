-- CANON-009 Learn Continuously, Improve Deliberately + LLR Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-009', 'canon', 'Learn Continuously, Improve Deliberately',
  'Learning is continuous discipline — success, failure, and near misses become institutional knowledge.',
  'Volume 0', 'first-principles', 'Institutional Learning',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['learning', 'lessons', 'improvement', 'retrospective'],
  ARRAY['iki', 'lessons-learned']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-LLR-001', 'framework', 'Lessons Learned Repository',
  'Every significant initiative concludes with a structured Lessons Learned Review.',
  'Volume 0', 'first-principles', 'Learning Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['LLR', 'learning', 'lessons', 'retrospective'],
  ARRAY['iki', 'lessons-learned']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LLR-IKI-001', 'procedure', 'Volume 0 Canon Chain & IKI Platform Foundation',
  'Lessons from implementing CANON-002 through CANON-008 and IKI institutional infrastructure.',
  'Volume 0', 'first-principles', 'Strategic Initiatives',
  'approved', '1.0', 'Library Council', 'Library Council', 'Library Council', '2026-06-27', 'employee',
  ARRAY['LLR', 'IKI', 'canon', 'learning'],
  ARRAY['iki', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-009', 'CANON-001', 'depends_on', 'Philosophical foundation'),
  ('CANON-009', 'CANON-008', 'depends_on', 'Excellence enables deliberate improvement'),
  ('CANON-008', 'CANON-009', 'supports', 'Culture to learning'),
  ('FRAMEWORK-LLR-001', 'CANON-009', 'depends_on', 'Derived from Canon 009'),
  ('CANON-009', 'FRAMEWORK-LLR-001', 'supports', 'Operationalized through LLR'),
  ('LLR-IKI-001', 'CANON-009', 'references', 'Learning canon applied'),
  ('LLR-IKI-001', 'FRAMEWORK-LLR-001', 'depends_on', 'LLR framework structure')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
