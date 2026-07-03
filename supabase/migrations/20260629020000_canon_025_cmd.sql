-- CANON-025 Be Worthy of Endurance + CMD Framework — Volume 0 Complete

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CANON-025', 'canon', 'Be Worthy of Endurance',
  'Endurance is earned — stewardship of civilization, not mere survival through time.',
  'Volume 0', 'first-principles', 'Volume 0 Capstone',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['endurance', 'worthy', 'stewardship', 'CMD', 'volume 0', 'capstone'],
  ARRAY['iki', 'library-engine', 'canon-maturity', 'canon-dashboard', 'custodian-programme']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-CMD-001', 'framework', 'Canon Maturity Dashboard',
  'Volume 0 as a living operating system — canon maturity and required reading.',
  'Volume 0', 'first-principles', 'Volume 0 Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['CMD', 'canon maturity', 'volume 0'],
  ARRAY['iki', 'canon-maturity', 'canon-dashboard', 'custodian-programme']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('CANON-025', 'CANON-001', 'depends_on', 'Why institutions exist'),
  ('CANON-025', 'CANON-004', 'depends_on', 'Stewardship leadership'),
  ('CANON-025', 'CANON-006', 'depends_on', 'Generational endurance'),
  ('CANON-025', 'CANON-019', 'depends_on', 'Leave it better'),
  ('CANON-025', 'CANON-022', 'depends_on', 'Civilization value'),
  ('CANON-025', 'CANON-023', 'depends_on', 'Humble learning'),
  ('CANON-025', 'CANON-024', 'depends_on', 'Raise standards'),
  ('CANON-001', 'CANON-025', 'supports', 'Existence to endurance'),
  ('CANON-004', 'CANON-025', 'supports', 'Stewardship to worthiness'),
  ('CANON-006', 'CANON-025', 'supports', 'Generations to endurance'),
  ('CANON-019', 'CANON-025', 'supports', 'Improvement to worthiness'),
  ('CANON-022', 'CANON-025', 'supports', 'Legacy to endurance'),
  ('CANON-024', 'CANON-025', 'supports', 'Standards to endurance'),
  ('FRAMEWORK-CMD-001', 'CANON-025', 'depends_on', 'Derived from Canon 025'),
  ('CANON-025', 'FRAMEWORK-CMD-001', 'supports', 'Operationalized through CMD'),
  ('FRAMEWORK-CMD-001', 'FRAMEWORK-IKG-001', 'references', 'Connected knowledge'),
  ('CANON-025', 'canon-maturity', 'supports', 'Maturity registry'),
  ('CANON-025', 'canon-dashboard', 'supports', 'Implementation tracking'),
  ('CANON-025', 'constitution', 'supports', 'Volume I translation'),
  ('custodian-programme', 'CANON-025', 'supports', 'Required reading'),
  ('CANON-025', 'LEX-ENDURANCE', 'references', 'Lexicon: Endurance')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
