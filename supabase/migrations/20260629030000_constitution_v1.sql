-- Volume I — Constitution Version 1.0 (Preamble + ED 28)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'constitution', 'volume', 'The Stankings Group Constitution',
  'Volume I Version 1.0 — supreme internal governing law.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['constitution', 'volume i', 'preamble', 'supreme law', 'ED 28'],
  ARRAY['iki', 'library-engine', 'canon-dashboard', 'custodian-programme']
) ON CONFLICT (identifier) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  status = EXCLUDED.status,
  version = EXCLUDED.version,
  search_keywords = EXCLUDED.search_keywords;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-PREAMBLE', 'article', 'Constitutional Preamble',
  'Institutionally binding statement — custodianship and interpretation consistent with the Canons.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['preamble', 'constitution', 'custodian', 'motto', 'trust'],
  ARRAY['iki', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-PREAMBLE', 'references', 'Adopted preamble'),
  ('CONSTITUTION-PREAMBLE', 'constitution', 'depends_on', 'Part of Volume I'),
  ('constitution', 'CANON-001', 'implements', 'Institutional purpose'),
  ('constitution', 'CANON-002', 'implements', 'Trust as capital'),
  ('constitution', 'CANON-003', 'implements', 'Purpose before profit'),
  ('constitution', 'CANON-004', 'implements', 'Stewardship leadership'),
  ('constitution', 'CANON-005', 'implements', 'Ecosystem structure'),
  ('constitution', 'CANON-006', 'implements', 'Generational endurance'),
  ('constitution', 'CANON-007', 'implements', 'Truth obligation'),
  ('constitution', 'CANON-025', 'implements', 'Worthy endurance'),
  ('CONSTITUTION-PREAMBLE', 'CANON-001', 'references', 'Serve society'),
  ('CONSTITUTION-PREAMBLE', 'CANON-004', 'references', 'Custodian duty'),
  ('CONSTITUTION-PREAMBLE', 'CANON-006', 'references', 'Future generations'),
  ('CONSTITUTION-PREAMBLE', 'CANON-025', 'references', 'Prove worthy of trust'),
  ('CANON-025', 'constitution', 'supports', 'Volume I translation'),
  ('CANON-001', 'constitution', 'supports', 'Philosophy to law')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
