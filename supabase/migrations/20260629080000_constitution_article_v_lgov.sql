-- Constitution Article V + Leadership Governance Portal (ED 33)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-V', 'article', 'Article V — Constitutional Standards for Leadership',
  'Constitutional standards for integrity, competence, accountability, and leadership evaluation.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article v', 'leadership', 'integrity', 'competence', 'fiduciary', 'succession'],
  ARRAY['iki', 'leadership-governance', 'library-engine', 'custodian-programme']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-LGOV-001', 'framework', 'Leadership Governance Portal',
  'Leadership profiles, competency matrix, and Annual Constitutional Leadership Review per Article V.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['lgov', 'leadership portal', 'competency matrix', 'article v', 'review'],
  ARRAY['iki', 'leadership-governance', 'library-engine', 'custodian-programme']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-V', 'references', 'Article V adopted'),
  ('CONSTITUTION-ARTICLE-V', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-V', 'CONSTITUTION-ARTICLE-IV', 'depends_on', 'Follows governance'),
  ('CONSTITUTION-ARTICLE-V', 'CANON-004', 'implements', 'Leadership stewardship'),
  ('CONSTITUTION-ARTICLE-V', 'CANON-007', 'implements', 'Integrity and truth'),
  ('CONSTITUTION-ARTICLE-V', 'CANON-010', 'implements', 'Human dignity'),
  ('CONSTITUTION-ARTICLE-V', 'CANON-019', 'implements', 'Stewardship reviews'),
  ('CONSTITUTION-ARTICLE-V', 'CANON-020', 'implements', 'Sound judgment'),
  ('CONSTITUTION-ARTICLE-V', 'CANON-023', 'implements', 'Institutional learning'),
  ('CONSTITUTION-ARTICLE-V', 'FRAMEWORK-LGOV-001', 'supports', 'Leadership portal'),
  ('FRAMEWORK-LGOV-001', 'CONSTITUTION-ARTICLE-V', 'depends_on', 'Derived from Article V'),
  ('FRAMEWORK-LGOV-001', 'FRAMEWORK-LSF-001', 'references', 'Appointment gate'),
  ('FRAMEWORK-LGOV-001', 'FRAMEWORK-STEWARDSHIP-PORTAL-001', 'references', 'Stewardship declarations'),
  ('FRAMEWORK-LGOV-001', 'FRAMEWORK-ASR-001', 'references', 'Annual review'),
  ('FRAMEWORK-LGOV-001', 'leadership-governance', 'supports', 'Leadership profiles'),
  ('FRAMEWORK-LGOV-001', 'custodian-programme', 'references', 'Successor pipeline'),
  ('CANON-004', 'CONSTITUTION-ARTICLE-V', 'supports', 'Stewardship to standards'),
  ('CANON-007', 'CONSTITUTION-ARTICLE-V', 'supports', 'Truth to integrity'),
  ('CANON-010', 'CONSTITUTION-ARTICLE-V', 'supports', 'Dignity to leadership'),
  ('CANON-019', 'CONSTITUTION-ARTICLE-V', 'supports', 'Reviews to accountability'),
  ('CANON-023', 'CONSTITUTION-ARTICLE-V', 'supports', 'Learning to competence')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
