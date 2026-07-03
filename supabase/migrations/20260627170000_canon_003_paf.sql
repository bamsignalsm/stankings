-- CANON-003 and Purpose Assessment Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-003', 'canon', 'Purpose Precedes Profit',
  'Purpose precedes profit — every institution must solve meaningful problems.',
  'Volume 0', 'first-principles', 'Foundational Principles',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['purpose', 'profit', 'purpose test', 'ecosystem'],
  ARRAY['yike', 'bamsignal', 'bayright', 'iki']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-PAF-001', 'framework', 'Purpose Assessment Framework',
  'Decision gate requiring purpose evaluation before any new company, product, or initiative.',
  'Volume 0', 'first-principles', 'Decision Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['purpose assessment', 'PAF', 'canon 003'],
  ARRAY['iki', 'governance']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-003', 'CANON-001', 'depends_on', 'Philosophical foundation'),
  ('CANON-003', 'CANON-002', 'depends_on', 'Trust sustains purpose-driven institutions'),
  ('FRAMEWORK-PAF-001', 'CANON-003', 'depends_on', 'Derived from Canon 003'),
  ('FRAMEWORK-PAF-001', 'CANON-002', 'references', 'Gate 2 follows PAF')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
