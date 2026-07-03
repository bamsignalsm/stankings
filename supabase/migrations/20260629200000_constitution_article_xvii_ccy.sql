-- Constitution Article XVII + Constitutional Ceremony Portal (ED 45) — Part V

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'CONSTITUTION-ARTICLE-XVII', 'article', 'Article XVII — Constitutional Ratification, Oath & Commitment',
  'Part V Constitutional Continuity — ratification, affirmation, education, accessibility, and legacy.',
  'Volume I', 'constitution', 'Constitutional Law',
  'approved', '1.0', 'Stanley Ukeje', 'Library Council', 'Library Council', '2031-06-27', 'employee',
  ARRAY['article xvii', 'ratification', 'oath', 'affirmation', 'commitment', 'part v'],
  ARRAY['iki', 'constitutional-ceremony', 'constitution-centre', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FRAMEWORK-CCY-001', 'framework', 'Constitutional Ceremony Portal',
  'Constitutional office holder records and Register of Office Holders per Article XVII.',
  'Volume I', 'constitution', 'Constitutional Frameworks',
  'approved', '1.0', 'Library Council', 'Stanley Ukeje', 'Library Council', '2031-06-27', 'employee',
  ARRAY['ccy', 'ceremony portal', 'coroh', 'office holders', 'article xvii'],
  ARRAY['iki', 'constitutional-ceremony', 'constitution-centre', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('constitution', 'CONSTITUTION-ARTICLE-XVII', 'references', 'Article XVII adopted — ratification and commitment'),
  ('CONSTITUTION-ARTICLE-XVII', 'constitution', 'depends_on', 'Part of Volume I'),
  ('CONSTITUTION-ARTICLE-XVI', 'CONSTITUTION-ARTICLE-XVII', 'references', 'Custodians accept constitutional commitment'),
  ('CONSTITUTION-ARTICLE-XVII', 'CONSTITUTION-ARTICLE-XVI', 'depends_on', 'Custodian programme foundation'),
  ('CONSTITUTION-ARTICLE-XVII', 'CONSTITUTION-ARTICLE-XV', 'depends_on', 'Amendment and preservation'),
  ('CONSTITUTION-ARTICLE-XVII', 'CONSTITUTION-ARTICLE-V', 'depends_on', 'Leadership standards'),
  ('CONSTITUTION-ARTICLE-XVII', 'CANON-004', 'implements', 'Stewardship commitment'),
  ('CONSTITUTION-ARTICLE-XVII', 'CANON-006', 'implements', 'Generational covenant'),
  ('CONSTITUTION-ARTICLE-XVII', 'CANON-007', 'implements', 'Truth in affirmation'),
  ('CONSTITUTION-ARTICLE-XVII', 'CANON-020', 'implements', 'Sound judgment in office'),
  ('CONSTITUTION-ARTICLE-XVII', 'CANON-025', 'implements', 'Worthy of trust across generations'),
  ('CONSTITUTION-ARTICLE-XVII', 'FRAMEWORK-CCY-001', 'supports', 'Ceremony portal'),
  ('CONSTITUTION-ARTICLE-XVII', 'FRAMEWORK-CCR-001', 'supports', 'Constitution register'),
  ('FRAMEWORK-CCY-001', 'CONSTITUTION-ARTICLE-XVII', 'depends_on', 'Derived from Article XVII'),
  ('FRAMEWORK-CCY-001', 'FRAMEWORK-CCR-001', 'references', 'Ratification records'),
  ('FRAMEWORK-CCY-001', 'FRAMEWORK-IEC-001', 'references', 'Integrity declarations'),
  ('FRAMEWORK-CCY-001', 'constitutional-ceremony-portal', 'supports', 'Portal system'),
  ('constitutional-ceremony-portal', 'CONSTITUTION-ARTICLE-XVII', 'depends_on', 'Constitutional authority'),
  ('CANON-004', 'CONSTITUTION-ARTICLE-XVII', 'supports', 'Stewardship to commitment'),
  ('CANON-025', 'CONSTITUTION-ARTICLE-XVII', 'supports', 'Endurance to ratification')
ON CONFLICT (source_identifier, target_identifier, relationship_type) DO NOTHING;
