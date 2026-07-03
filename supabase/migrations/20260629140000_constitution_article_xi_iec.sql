-- Constitution Article XI + Integrity & Ethics Centre (ED 39) — Part IV

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-XI', 'article', 'Article XI — Conflicts of Interest, Integrity & Constitutional Ethics',
  'Part IV Constitutional Integrity — loyalty, conflicts, related parties, gifts, reporting, and ethical decision-making.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article xi', 'integrity', 'ethics', 'conflicts of interest', 'related party', 'part iv'],
  ARRAY['iki', 'integrity-ethics', 'library-engine', 'governance']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-IEC-001', 'framework', 'Integrity & Ethics Centre',
  'Integrity registers and annual declarations per Article XI.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['iec', 'integrity centre', 'ethics portal', 'article xi'],
  ARRAY['iki', 'integrity-ethics', 'library-engine', 'governance']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-XI', 'references', 'Article XI adopted — Part IV'),
  ('CONSTITUTION-ARTICLE-XI', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-XI', 'CONSTITUTION-ARTICLE-X', 'depends_on', 'Follows lifecycle'),
  ('CONSTITUTION-ARTICLE-XI', 'CONSTITUTION-ARTICLE-V', 'depends_on', 'Leadership integrity'),
  ('CONSTITUTION-ARTICLE-XI', 'CONSTITUTION-ARTICLE-IV', 'depends_on', 'Governance framework'),
  ('CONSTITUTION-ARTICLE-X', 'CONSTITUTION-ARTICLE-XI', 'references', 'Integrity follows engine'),
  ('CONSTITUTION-ARTICLE-XI', 'CANON-002', 'implements', 'Trust preservation'),
  ('CONSTITUTION-ARTICLE-XI', 'CANON-004', 'implements', 'Duty of loyalty'),
  ('CONSTITUTION-ARTICLE-XI', 'CANON-007', 'implements', 'Truth and disclosure'),
  ('CONSTITUTION-ARTICLE-XI', 'CANON-010', 'implements', 'Human dignity in ethics'),
  ('CONSTITUTION-ARTICLE-XI', 'CANON-020', 'implements', 'Sound judgment'),
  ('CONSTITUTION-ARTICLE-XI', 'CANON-025', 'implements', 'Worthy endurance'),
  ('CONSTITUTION-ARTICLE-XI', 'FRAMEWORK-IEC-001', 'supports', 'Integrity centre'),
  ('FRAMEWORK-IEC-001', 'CONSTITUTION-ARTICLE-XI', 'depends_on', 'Derived from Article XI'),
  ('FRAMEWORK-IEC-001', 'FRAMEWORK-LGOV-001', 'references', 'Leadership governance'),
  ('FRAMEWORK-IEC-001', 'FRAMEWORK-CGOV-001', 'references', 'Board governance'),
  ('FRAMEWORK-IEC-001', 'integrity-ethics', 'supports', 'Portal system'),
  ('integrity-ethics', 'CONSTITUTION-ARTICLE-XI', 'depends_on', 'Constitutional authority'),
  ('CANON-002', 'CONSTITUTION-ARTICLE-XI', 'supports', 'Trust to integrity'),
  ('CANON-004', 'CONSTITUTION-ARTICLE-XI', 'supports', 'Stewardship to loyalty'),
  ('CANON-007', 'CONSTITUTION-ARTICLE-XI', 'supports', 'Truth to disclosure'),
  ('CANON-010', 'CONSTITUTION-ARTICLE-XI', 'supports', 'Dignity to ethics'),
  ('CANON-020', 'CONSTITUTION-ARTICLE-XI', 'supports', 'Judgment to ethics')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
