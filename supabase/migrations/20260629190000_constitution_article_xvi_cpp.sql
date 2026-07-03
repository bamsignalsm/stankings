-- Constitution Article XVI + Custodian Programme Portal (ED 44) — Part V

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-XVI', 'article', 'Article XVI — The Custodian Programme & Leadership Development',
  'Part V Constitutional Continuity — custodian programme, leadership development, mentorship, and Institute relationship.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article xvi', 'custodian programme', 'leadership development', 'succession', 'mentorship', 'part v'],
  ARRAY['iki', 'custodian-programme', 'stewardship-portal', 'leadership-governance', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-CPP-001', 'framework', 'Custodian Programme Portal',
  'Custodian records, curriculum framework, and Leadership Continuity Framework per Article XVI.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['cpp', 'custodian portal', 'lcf', 'leadership continuity', 'article xvi'],
  ARRAY['iki', 'custodian-programme', 'stewardship-portal', 'leadership-governance', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-XVI', 'references', 'Article XVI adopted — custodian programme'),
  ('CONSTITUTION-ARTICLE-XVI', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-XV', 'CONSTITUTION-ARTICLE-XVI', 'references', 'Continuity includes leadership'),
  ('CONSTITUTION-ARTICLE-XVI', 'CONSTITUTION-ARTICLE-XV', 'depends_on', 'Amendment discipline'),
  ('CONSTITUTION-ARTICLE-XVI', 'CONSTITUTION-ARTICLE-V', 'depends_on', 'Leadership standards'),
  ('CONSTITUTION-ARTICLE-XVI', 'CONSTITUTION-ARTICLE-III', 'depends_on', 'Stewardship foundation'),
  ('CONSTITUTION-ARTICLE-XVI', 'CANON-004', 'implements', 'Stewardship leadership'),
  ('CONSTITUTION-ARTICLE-XVI', 'CANON-006', 'implements', 'Generational continuity'),
  ('CONSTITUTION-ARTICLE-XVI', 'CANON-009', 'implements', 'Continuous learning'),
  ('CONSTITUTION-ARTICLE-XVI', 'CANON-019', 'implements', 'Successor development'),
  ('CONSTITUTION-ARTICLE-XVI', 'CANON-020', 'implements', 'Sound judgment in mentorship'),
  ('CONSTITUTION-ARTICLE-XVI', 'CANON-023', 'implements', 'Humble learning'),
  ('CONSTITUTION-ARTICLE-XVI', 'CANON-025', 'implements', 'Worthy custodians'),
  ('CONSTITUTION-ARTICLE-XVI', 'FRAMEWORK-CPP-001', 'supports', 'Custodian portal'),
  ('CONSTITUTION-ARTICLE-XVI', 'FRAMEWORK-LGOV-001', 'supports', 'Leadership governance'),
  ('CONSTITUTION-ARTICLE-XVI', 'custodian-programme', 'supports', 'Programme volume'),
  ('FRAMEWORK-CPP-001', 'CONSTITUTION-ARTICLE-XVI', 'depends_on', 'Derived from Article XVI'),
  ('FRAMEWORK-CPP-001', 'FRAMEWORK-LGOV-001', 'references', 'Leadership standards'),
  ('FRAMEWORK-CPP-001', 'FRAMEWORK-LSF-001', 'references', 'Stewardship framework'),
  ('FRAMEWORK-CPP-001', 'custodian-programme-portal', 'supports', 'Portal system'),
  ('custodian-programme-portal', 'CONSTITUTION-ARTICLE-XVI', 'depends_on', 'Constitutional authority'),
  ('custodian-programme', 'CONSTITUTION-ARTICLE-XVI', 'depends_on', 'Constitutional programme'),
  ('CANON-004', 'CONSTITUTION-ARTICLE-XVI', 'supports', 'Stewardship to custodians'),
  ('CANON-006', 'CONSTITUTION-ARTICLE-XVI', 'supports', 'Generations to programme'),
  ('CANON-019', 'CONSTITUTION-ARTICLE-XVI', 'supports', 'Development to successors'),
  ('CANON-025', 'CONSTITUTION-ARTICLE-XVI', 'supports', 'Endurance to custodians')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
