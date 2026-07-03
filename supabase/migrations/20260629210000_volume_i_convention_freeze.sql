-- Volume I frozen for Constitutional Convention review

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONVENTION-VOL-I-001', 'framework', 'Constitutional Convention — Volume I Review',
  'Volume I v1.0 frozen for Convention verification — audit, cross-linking, commentary, index, and search.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['convention', 'volume i freeze', 'constitutional audit', 'cross linking'],
  ARRAY['iki', 'constitutional-convention', 'constitution-centre', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONVENTION-VOL-I-001', 'references', 'Volume I frozen for Convention'),
  ('CONVENTION-VOL-I-001', 'constitution', 'depends_on', 'Reviews Volume I'),
  ('CONVENTION-VOL-I-001', 'CONSTITUTION-ARTICLE-XVII', 'references', 'Ratification complete — review begins'),
  ('CONVENTION-VOL-I-001', 'CONSTITUTION-ARTICLE-XV', 'depends_on', 'Amendment discipline during freeze')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
