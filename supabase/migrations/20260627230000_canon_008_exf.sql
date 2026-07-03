-- CANON-008 Excellence Is a Discipline, Not an Event + EXF Framework

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-008', 'canon', 'Excellence Is a Discipline, Not an Event',
  'Excellence is daily discipline — consistent quality designed into systems, not inspected only after failure.',
  'Volume 0', 'first-principles', 'Institutional Culture',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['excellence', 'culture', 'discipline', 'standards'],
  ARRAY['iki', 'excellence-standards', 'engineering-standards']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-EXF-001', 'framework', 'Excellence Framework',
  'Every department defines Standards of Excellence — KPIs, checklists, improvement plans, audit discipline.',
  'Volume 0', 'first-principles', 'Culture Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['EXF', 'excellence', 'culture', 'standards'],
  ARRAY['iki', 'excellence-standards']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-008', 'CANON-001', 'depends_on', 'Philosophical foundation'),
  ('CANON-008', 'CANON-007', 'depends_on', 'Truth enables excellence'),
  ('CANON-007', 'CANON-008', 'supports', 'Philosophy to culture'),
  ('FRAMEWORK-EXF-001', 'CANON-008', 'depends_on', 'Derived from Canon 008')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
