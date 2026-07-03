-- Constitution Article XIV + Constitutional Health Dashboard (ED 42) — Part IV

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-XIV', 'article', 'Article XIV — Constitutional Review, Institutional Health & Continual Improvement',
  'Part IV Constitutional Integrity — health reviews, maturity framework, recommendations, and continual improvement.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article xiv', 'constitutional health', 'institutional health', 'continual improvement', 'part iv'],
  ARRAY['iki', 'constitutional-health', 'canon-maturity', 'legacy', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-CHD-001', 'framework', 'Constitutional Health Dashboard',
  'Institutional health dimensions, constitutional maturity, and Annual Constitutional Stewardship Report per Article XIV.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['chd', 'health dashboard', 'cmf', 'stewardship report', 'article xiv'],
  ARRAY['iki', 'constitutional-health', 'canon-maturity', 'legacy', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-XIV', 'references', 'Article XIV adopted — Core Constitution complete'),
  ('CONSTITUTION-ARTICLE-XIV', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-XIII', 'CONSTITUTION-ARTICLE-XIV', 'references', 'Knowledge precedes health review'),
  ('CONSTITUTION-ARTICLE-XIV', 'CONSTITUTION-ARTICLE-XIII', 'depends_on', 'Library enables review learning'),
  ('CONSTITUTION-ARTICLE-XIV', 'CONSTITUTION-ARTICLE-XI', 'depends_on', 'Integrity foundation'),
  ('CONSTITUTION-ARTICLE-XIV', 'CANON-006', 'implements', 'Generational health'),
  ('CONSTITUTION-ARTICLE-XIV', 'CANON-009', 'implements', 'Continuous improvement'),
  ('CONSTITUTION-ARTICLE-XIV', 'CANON-015', 'implements', 'Institutional strength'),
  ('CONSTITUTION-ARTICLE-XIV', 'CANON-019', 'implements', 'Leave it better'),
  ('CONSTITUTION-ARTICLE-XIV', 'CANON-020', 'implements', 'Sound judgment in review'),
  ('CONSTITUTION-ARTICLE-XIV', 'CANON-022', 'implements', 'Lasting value accountability'),
  ('CONSTITUTION-ARTICLE-XIV', 'CANON-023', 'implements', 'Humble self-examination'),
  ('CONSTITUTION-ARTICLE-XIV', 'CANON-025', 'implements', 'Worthy endurance'),
  ('CONSTITUTION-ARTICLE-XIV', 'FRAMEWORK-CHD-001', 'supports', 'Health dashboard'),
  ('CONSTITUTION-ARTICLE-XIV', 'FRAMEWORK-CMD-001', 'supports', 'Canon maturity'),
  ('FRAMEWORK-CHD-001', 'CONSTITUTION-ARTICLE-XIV', 'depends_on', 'Derived from Article XIV'),
  ('FRAMEWORK-CHD-001', 'FRAMEWORK-CMD-001', 'references', 'Canon maturity integration'),
  ('FRAMEWORK-CHD-001', 'FRAMEWORK-ASR-001', 'references', 'Annual stewardship review'),
  ('FRAMEWORK-CHD-001', 'FRAMEWORK-LEGACY-001', 'references', 'Stewardship reporting'),
  ('FRAMEWORK-CHD-001', 'FRAMEWORK-SLP-001', 'references', 'Library knowledge'),
  ('FRAMEWORK-CHD-001', 'constitutional-health', 'supports', 'Portal system'),
  ('constitutional-health', 'CONSTITUTION-ARTICLE-XIV', 'depends_on', 'Constitutional authority'),
  ('FRAMEWORK-CMD-001', 'CONSTITUTION-ARTICLE-XIV', 'depends_on', 'Health review authority'),
  ('CANON-006', 'CONSTITUTION-ARTICLE-XIV', 'supports', 'Generations to health'),
  ('CANON-009', 'CONSTITUTION-ARTICLE-XIV', 'supports', 'Learning to improvement'),
  ('CANON-015', 'CONSTITUTION-ARTICLE-XIV', 'supports', 'Strength to review'),
  ('CANON-019', 'CONSTITUTION-ARTICLE-XIV', 'supports', 'Stewardship to report'),
  ('CANON-022', 'CONSTITUTION-ARTICLE-XIV', 'supports', 'Value to accountability'),
  ('CANON-025', 'CONSTITUTION-ARTICLE-XIV', 'supports', 'Endurance to health')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
