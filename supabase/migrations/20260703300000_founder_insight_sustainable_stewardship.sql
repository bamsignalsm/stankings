-- FOUNDER-INSIGHT-001 — LIB-2026-07-03-013

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'FOUNDER-INSIGHT-001', 'founder_insight', 'Sustainable Stewardship',
  'Two complementary engines — cash flow and institutional assets. Sustainable stewardship, not constant sacrifice.',
  NULL, NULL, 'Founder Insight',
  'approved', '1.0', 'Stanley Ukeje', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['founder insight', 'sustainable stewardship', 'stewardship'],
  ARRAY['custodian-programme', 'stewardship', 'library-engine']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_objects (
  identifier, object_type, title, summary, volume_label, volume_slug, category,
  status, version, author, approver, owner, review_date, visibility, search_keywords, related_systems
) VALUES (
  'LIB-2026-07-03-013', 'meeting_record', 'Founder Sustainability Insight',
  'FOUNDER-INSIGHT-001 recorded — complementary cash flow and institutional engines.',
  NULL, NULL, 'Library Session Records',
  'approved', '1.0', 'Editor-in-Chief', 'Stanley Ukeje', 'Library Council', NULL, 'employee',
  ARRAY['lib-2026-07-03-013', 'founder sustainability'],
  ARRAY['library-sessions', 'custodian-programme']
) ON CONFLICT (identifier) DO NOTHING;

INSERT INTO stankings_knowledge_relationships (source_identifier, target_identifier, relationship_type, note)
VALUES
  ('LIB-2026-07-03-013', 'FOUNDER-INSIGHT-001', 'implements', 'Sustainable Stewardship insight'),
  ('FOUNDER-INSIGHT-001', 'CANON-004', 'references', 'Leadership Is Stewardship'),
  ('FOUNDER-INSIGHT-001', 'CANON-006', 'references', 'Think in Generations, Act in the Present'),
  ('FOUNDER-INSIGHT-001', 'FRAMEWORK-CPP-001', 'supports', 'Custodian case study CS-FND-001')
ON CONFLICT DO NOTHING;
