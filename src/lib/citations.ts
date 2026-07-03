/**
 * Citation System — legally traceable references to Knowledge Objects
 * @see Executive requirement: [CANON-002 § Trust Test]
 */

export interface CanonCitation {
  identifier: string;
  section?: string;
  paragraph?: number;
}

/** Short form: [CANON-002 § Trust Test] */
export function formatCanonCitation(cite: CanonCitation): string {
  const base = `[${cite.identifier}`;
  if (cite.section) {
    const sectionLabel = cite.section.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return `${base} § ${sectionLabel}]`;
  }
  return `${base}]`;
}

/** Long form for documents */
export function formatCanonCitationLong(cite: CanonCitation): string {
  const lines = [`See: ${cite.identifier}`];
  if (cite.section) {
    lines.push(cite.section.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
  }
  if (cite.paragraph) {
    lines.push(`Paragraph ${cite.paragraph}`);
  }
  return lines.join("\n");
}

export const CANON_002_CITATIONS = {
  trustTest: { identifier: "CANON-002", section: "the-trust-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-002", section: "leadership-implications", paragraph: 3 } satisfies CanonCitation,
  engineering: { identifier: "CANON-002", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_003_CITATIONS = {
  purposeTest: { identifier: "CANON-003", section: "the-purpose-test" } satisfies CanonCitation,
  institutional: { identifier: "CANON-003", section: "institutional-implications" } satisfies CanonCitation,
} as const;

export const CANON_004_CITATIONS = {
  stewardshipTest: { identifier: "CANON-004", section: "the-stewardship-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-004", section: "leadership-implications", paragraph: 3 } satisfies CanonCitation,
} as const;

export const CANON_005_CITATIONS = {
  ecosystemTest: { identifier: "CANON-005", section: "the-ecosystem-test" } satisfies CanonCitation,
  engineering: { identifier: "CANON-005", section: "engineering-implications" } satisfies CanonCitation,
  institutional: { identifier: "CANON-005", section: "institutional-implications" } satisfies CanonCitation,
} as const;

export const CANON_006_CITATIONS = {
  generationalTest: { identifier: "CANON-006", section: "the-generational-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-006", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-006", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_007_CITATIONS = {
  truthTest: { identifier: "CANON-007", section: "the-truth-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-007", section: "leadership-implications", paragraph: 3 } satisfies CanonCitation,
  engineering: { identifier: "CANON-007", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_008_CITATIONS = {
  excellenceTest: { identifier: "CANON-008", section: "the-excellence-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-008", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-008", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_009_CITATIONS = {
  learningTest: { identifier: "CANON-009", section: "the-learning-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-009", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-009", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_010_CITATIONS = {
  peopleTest: { identifier: "CANON-010", section: "the-people-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-010", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-010", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_011_CITATIONS = {
  simplicityTest: { identifier: "CANON-011", section: "the-simplicity-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-011", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-011", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_012_CITATIONS = {
  platformTest: { identifier: "CANON-012", section: "the-platform-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-012", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-012", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_013_CITATIONS = {
  innovationTest: { identifier: "CANON-013", section: "the-innovation-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-013", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-013", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_014_CITATIONS = {
  commitmentTest: { identifier: "CANON-014", section: "the-commitment-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-014", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-014", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_015_CITATIONS = {
  accountabilityTest: { identifier: "CANON-015", section: "the-accountability-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-015", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-015", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_016_CITATIONS = {
  strengthTest: { identifier: "CANON-016", section: "the-strength-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-016", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-016", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_017_CITATIONS = {
  uncertaintyTest: { identifier: "CANON-017", section: "the-uncertainty-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-017", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-017", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_018_CITATIONS = {
  principleTest: { identifier: "CANON-018", section: "the-principle-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-018", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-018", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_019_CITATIONS = {
  improvementTest: { identifier: "CANON-019", section: "the-improvement-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-019", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-019", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_020_CITATIONS = {
  judgmentTest: { identifier: "CANON-020", section: "the-judgment-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-020", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-020", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_021_CITATIONS = {
  knowledgeTest: { identifier: "CANON-021", section: "the-knowledge-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-021", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-021", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_022_CITATIONS = {
  legacyTest: { identifier: "CANON-022", section: "the-legacy-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-022", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-022", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_023_CITATIONS = {
  humilityTest: { identifier: "CANON-023", section: "the-humility-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-023", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-023", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_024_CITATIONS = {
  standardTest: { identifier: "CANON-024", section: "the-standard-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-024", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-024", section: "engineering-implications" } satisfies CanonCitation,
} as const;

export const CANON_025_CITATIONS = {
  enduranceTest: { identifier: "CANON-025", section: "the-endurance-test" } satisfies CanonCitation,
  leadership: { identifier: "CANON-025", section: "leadership-implications" } satisfies CanonCitation,
  engineering: { identifier: "CANON-025", section: "engineering-implications" } satisfies CanonCitation,
} as const;
