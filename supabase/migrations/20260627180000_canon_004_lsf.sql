-- CANON-004 Leadership Is Stewardship + LSF Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-004', 'canon', 'Leadership Is Stewardship',
  'Leadership is stewardship — authority is entrusted for the institution, never for personal privilege.',
  'Volume 0', 'first-principles', 'Foundational Principles',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['leadership', 'stewardship', 'succession', 'custodian'],
  ARRAY['custodian-programme', 'iki']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-LSF-001', 'framework', 'Leadership Stewardship Framework',
  'Every leadership role requires a stewardship plan — mission, successor development, knowledge transfer.',
  'Volume 0', 'first-principles', 'Leadership Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['LSF', 'leadership', 'stewardship', 'appointment'],
  ARRAY['iki', 'custodian-programme']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-004', 'CANON-001', 'depends_on', 'Philosophical foundation'),
  ('CANON-004', 'CANON-002', 'depends_on', 'Leaders protect trust'),
  ('CANON-004', 'CANON-003', 'depends_on', 'Purposeful leadership'),
  ('CANON-003', 'CANON-004', 'supports', 'Purpose enables stewardship'),
  ('FRAMEWORK-LSF-001', 'CANON-004', 'depends_on', 'Derived from Canon 004')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
