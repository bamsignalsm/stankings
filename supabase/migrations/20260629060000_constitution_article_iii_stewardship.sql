-- Constitution Article III + Stewardship Portal (ED 31)

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-III', 'article', 'Article III — Stewardship, Continuity & Generational Responsibility',
  'Constitutionalizes stewardship — continuity, succession, institutional memory, and duty to future generations.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article iii', 'stewardship', 'succession', 'generational', 'continuity'],
  ARRAY['iki', 'stewardship-portal', 'custodian-programme', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-STEWARDSHIP-PORTAL-001', 'framework', 'Stewardship Portal',
  'Observable stewardship profiles and Annual Stewardship Declarations per Article III.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['stewardship portal', 'declaration', 'article iii', 'succession'],
  ARRAY['iki', 'stewardship-portal', 'custodian-programme', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-III', 'references', 'Article III adopted'),
  ('CONSTITUTION-ARTICLE-III', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-III', 'CONSTITUTION-ARTICLE-II', 'depends_on', 'Follows purpose'),
  ('CONSTITUTION-ARTICLE-III', 'CANON-004', 'implements', 'Stewardship leadership'),
  ('CONSTITUTION-ARTICLE-III', 'CANON-006', 'implements', 'Generational duty'),
  ('CONSTITUTION-ARTICLE-III', 'CANON-009', 'implements', 'Institutional learning'),
  ('CONSTITUTION-ARTICLE-III', 'CANON-019', 'implements', 'Stewardship reviews'),
  ('CONSTITUTION-ARTICLE-III', 'CANON-021', 'implements', 'Institutional memory'),
  ('CONSTITUTION-ARTICLE-III', 'CANON-025', 'implements', 'Worthy endurance'),
  ('CONSTITUTION-ARTICLE-III', 'FRAMEWORK-STEWARDSHIP-PORTAL-001', 'supports', 'Stewardship portal'),
  ('FRAMEWORK-STEWARDSHIP-PORTAL-001', 'CONSTITUTION-ARTICLE-III', 'depends_on', 'Derived from Article III'),
  ('FRAMEWORK-STEWARDSHIP-PORTAL-001', 'FRAMEWORK-LSF-001', 'references', 'Leadership stewardship'),
  ('FRAMEWORK-STEWARDSHIP-PORTAL-001', 'FRAMEWORK-ASR-001', 'references', 'Annual review'),
  ('FRAMEWORK-STEWARDSHIP-PORTAL-001', 'stewardship-portal', 'supports', 'Profile registry'),
  ('FRAMEWORK-STEWARDSHIP-PORTAL-001', 'custodian-programme', 'references', 'Custodian formation'),
  ('CANON-004', 'CONSTITUTION-ARTICLE-III', 'supports', 'Philosophy to law'),
  ('CANON-006', 'CONSTITUTION-ARTICLE-III', 'supports', 'Generations to stewardship')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
