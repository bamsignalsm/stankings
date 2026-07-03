/**
 * IKI — Institutional Knowledge Infrastructure
 * Executive Decision No. 4: internal platform name; "Library" is one module within IKI.
 */

export const IKI = {
  name: "IKI",
  fullName: "Institutional Knowledge Infrastructure",
  tagline: "The decision engine beneath every institution.",
} as const;

export const IKI_MODULES = [
  { id: "library", label: "Library", description: "Volumes, canons, and institutional memory" },
  { id: "knowledge-objects", label: "Knowledge Objects", description: "LS-001 structured authoritative units" },
  { id: "lexicon", label: "Lexicon", description: "LS-002 controlled vocabulary" },
  { id: "decision-engines", label: "Decision Engines", description: "PAF, TIA, EIA, GRF, HIR, IDR, IDI, IKG, LEGACY, KCP, ILD, CMD, EXF, LLR, SR, PLAT, IGF, IIAF, ISA, URF, PAR, IIR, ASR, LSF, and assessments" },
  { id: "graph", label: "Institutional Graph", description: "Connected knowledge — search as intelligence" },
  { id: "ai", label: "AI", description: "Retrieval, summaries, and institutional librarian" },
  { id: "publishing", label: "Publishing", description: "Print, PDF, hardcover exports" },
  { id: "governance", label: "Governance", description: "Approvals, versioning, council workflow" },
] as const;

export const EXECUTIVE_DECISION_4 = `Internally, the platform is IKI — Institutional Knowledge Infrastructure. The Stankings Library is one module within IKI, not the whole system.`;

export const EXECUTIVE_DECISION_5 = `Every major proposal shall answer four mandatory gates before cost or implementation:

1. Purpose Assessment (PAF) — Why should this exist? (CANON-003)
2. Trust Impact Assessment (TIA) — Will this strengthen or weaken institutional trust? (CANON-002)
3. Ecosystem Impact Assessment (EIA) — Does this strengthen the ecosystem without duplication? (CANON-005)
4. Generational Review (GRF) — Will this strengthen the institution for those who come after us? (CANON-006)

Only after all four gates pass should teams proceed to financial analysis, engineering effort, timelines, and implementation.`;

export const EXECUTIVE_DECISION_6 = `Every major leadership appointment within the Stankings ecosystem shall answer four questions before confirmation:

1. Does this person demonstrate competence?
2. Does this person strengthen institutional trust?
3. Does this person develop other people?
4. Will the institution likely be stronger after their period of stewardship?

If those questions cannot be answered positively, the appointment deserves further scrutiny.`;

export const EXECUTIVE_DECISION_7 = `Every proposal for a new company, new division, or major product shall include an Ecosystem Impact Assessment alongside the Purpose Assessment and Trust Impact Assessment.

The assessment shall answer:

1. Which existing institutions does this strengthen?
2. Does it duplicate an existing capability?
3. Should it be a new institution or a new division of an existing one?
4. What shared platform services will it use?
5. What long-term capability does it add to the ecosystem?

Only after passing PAF, TIA, and EIA should a proposal proceed to financial modelling and implementation.`;

export const EXECUTIVE_DECISION_8 = `Every proposal that materially affects ownership, governance, technology architecture, institutional reputation, or strategic direction must include a Generational Review before final approval.

This is not intended to slow decisions.

It is intended to ensure that today's convenience does not become tomorrow's burden.`;

export const DECISION_GATES = [
  { id: "paf", label: "Purpose Assessment", canon: "CANON-003", framework: "FRAMEWORK-PAF-001" },
  { id: "tia", label: "Trust Impact Assessment", canon: "CANON-002", framework: "FRAMEWORK-TIA-001" },
  { id: "eia", label: "Ecosystem Impact Assessment", canon: "CANON-005", framework: "FRAMEWORK-EIA-001" },
  { id: "grf", label: "Generational Review", canon: "CANON-006", framework: "FRAMEWORK-GRF-001" },
  { id: "hir", label: "Human Impact Review", canon: "CANON-010", framework: "FRAMEWORK-HIR-001" },
] as const;

export const EXECUTIVE_DECISION_9 = `Every major architectural, governance, engineering or strategic decision shall produce an Institutional Decision Record.

Years later, future custodians should be able to understand:

• What was decided.
• Why it was decided.
• Which Canons guided it.
• What assumptions were made.
• Whether the decision achieved its intended outcome.

That is how institutions learn across generations instead of repeating the same mistakes.`;

export const EXECUTIVE_DECISION_10 = `Every recurring operational process within Stankings Group should have a documented Standard of Excellence.

If a process cannot describe what "excellent" looks like, it cannot consistently produce excellent outcomes.

The Standard of Excellence should become part of onboarding, training, quality assurance and continuous improvement across the ecosystem.`;

export const EXECUTIVE_DECISION_11 = `Every significant project within Stankings Group shall conclude with a Lessons Learned Review before it is formally closed.

The review is not intended to assign blame.

Its purpose is to transform experience into institutional knowledge.

Only when lessons have been captured, approved and stored within the Stankings Library shall a project be considered complete.`;

export const EXECUTIVE_DECISION_12 = `From today onward, significant customer-facing products, policies and operational changes should include a Human Impact Review alongside:

• Purpose Assessment (PAF)
• Trust Impact Assessment (TIA)
• Ecosystem Impact Assessment (EIA)
• Generational Review Framework (GRF)

This ensures Stankings Group never becomes an institution that is efficient but indifferent.`;

export const EXECUTIVE_DECISION_13 = `Every engineering pull request, architecture proposal and major product feature should include a Simplicity Review before approval.

Complexity should never be accepted merely because it is clever.

Every additional layer, dependency, workflow or policy must justify the value it introduces.

The default position of Stankings Group shall be:

Simple where possible. Sophisticated only where necessary.`;

export const EXECUTIVE_DECISION_14 = `Beginning today, every new technical capability proposed within Stankings Group shall undergo a Platform Assessment before implementation.

The assessment shall answer:

1. Does an equivalent capability already exist?
2. Can this become a shared platform?
3. Which institutions will benefit?
4. Who owns and governs this platform?
5. What APIs or services should it expose?
6. How will future institutions adopt it?

Only after completing this assessment should implementation proceed.`;

export const EXECUTIVE_DECISION_15 = `Every significant innovation within Stankings Group shall begin as a controlled experiment before becoming institutional infrastructure.

The objective of experimentation is learning.

The objective of scaling is proven value.

Institution-wide adoption shall follow demonstrated benefit rather than enthusiasm alone.`;

export const EXECUTIVE_DECISION_16 = `Every externally communicated commitment that materially affects customers, partners, regulators or the public shall be recorded in the Commitment Registry.

The Registry exists to ensure that institutional credibility is managed with the same discipline as financial assets, technology platforms and governance records.`;

export const EXECUTIVE_DECISION_17 = `Every material operational, technical, governance or customer-impacting incident shall conclude with:

• Incident Review
• Root Cause Analysis
• Lessons Learned
• Preventive Action Plan
• Library Update
• Institutional Decision Record update where applicable

The objective is not merely recovery.

The objective is institutional improvement.`;

export const EXECUTIVE_DECISION_18 = `Every acquisition, strategic partnership, new company, major capital investment and platform initiative shall complete an Institutional Strength Assessment before approval.

Financial performance remains important.

However, financial performance alone shall never justify a decision that weakens the institution's long-term strength.`;

export const EXECUTIVE_DECISION_19 = `Every new company, product, service, platform or strategic initiative proposed within Stankings Group shall include an Uncertainty Reduction Assessment before approval.

The objective of the assessment is to demonstrate how the proposal meaningfully increases confidence for customers, employees, partners, institutions or society.

If a proposal cannot clearly identify the uncertainty it reduces, its purpose should be reconsidered.`;

export const EXECUTIVE_DECISION_20 = `Every acquisition, strategic partnership, investment, new company, or major institutional initiative shall complete a Principles Alignment Review before final approval.

The objective is not to prevent innovation or growth.

The objective is to ensure that growth never requires abandoning the principles that give the institution its identity.`;

export const EXECUTIVE_DECISION_21 = `Every department and operating institution shall conduct an Annual Stewardship Review.

The review shall answer four questions:

1. What did we preserve?
2. What did we improve?
3. What did we learn?
4. What stronger foundation have we left for those who follow?

These reviews shall become permanent Knowledge Objects within the Stankings Library.`;

export const EXECUTIVE_DECISION_22 = `Every decision that materially affects governance, technology, finance, customers or institutional reputation shall include a Judgment Record explaining:

• The evidence considered.
• The alternatives evaluated.
• The Canons applied.
• The reasoning behind the decision.
• The circumstances that influenced it.

The objective is not to justify decisions after the fact.

It is to preserve institutional wisdom for those who will face similar challenges in the future.`;

export const EXECUTIVE_DECISION_23 = `Every significant artifact created by Stankings Group—including software architecture, governance documents, research, training materials, engineering decisions, incident reviews and strategic plans—shall be evaluated for inclusion within the Stankings Library.

Knowledge that contributes enduring value shall be preserved as an institutional asset rather than remaining dependent upon individuals or temporary storage.`;

export const EXECUTIVE_DECISION_24 = `Beginning with the first full year of operations, every institution within Stankings Group shall publish an Annual Stewardship Report.

The report shall include both institutional performance and societal contribution, demonstrating how the institution has advanced its mission while creating lasting value for the communities it serves.

The purpose of the report is accountability, learning and responsible stewardship—not self-congratulation.`;

export const EXECUTIVE_DECISION_25 = `Every institutional standard shall remain open to responsible improvement.

No policy, workflow, technical standard or operational practice shall be considered beyond review.

The enduring principles of the Canons remain stable.

The methods used to express those principles shall evolve through evidence, learning and responsible stewardship.`;

export const EXECUTIVE_DECISION_26 = `Every operating institution shall identify the professional standards it seeks to elevate within its industry.

Annual Stewardship Reports shall include measurable progress toward these objectives.

Institutional success shall therefore be evaluated not only by internal performance, but also by the positive influence the institution has had upon the wider industry.`;

export const EXECUTIVE_DECISION_27 = `Volume 0 shall become required reading for Directors, Trustees, Executive Leadership, Senior Managers, Principal Engineers, Institutional Architects, and Members of the Custodian Programme.

Other employees may receive role-appropriate summaries and training based on responsibilities.

The objective is not memorization.

It is the development of a shared institutional way of thinking.`;

export const EXECUTIVE_DECISION_28 = `The Stankings Group Constitution shall be regarded as the highest governing document of the Group's internal governance framework.

All governance codes, operating standards, policies and institutional procedures shall derive their authority from the Constitution and remain consistent with its Articles and the Stankings Canons.

Where conflicts arise, the Constitution shall prevail unless law requires otherwise.`;

export const EXECUTIVE_DECISION_29 = `Every institution admitted into the Stankings Group ecosystem shall adopt an Institutional Identity Statement consistent with Article I of the Constitution.

No institution shall join the Group unless its purpose, governance and strategic role can be clearly articulated and shown to align with the Constitution and the Stankings Canons.

This requirement applies equally to newly established institutions, acquisitions and strategic partnerships where constitutional alignment is expected.`;

export const EXECUTIVE_DECISION_30 = `Every significant proposal presented to the Board of Stankings Group shall include a Constitutional Compliance Statement.

The statement shall identify:

• The Articles of the Constitution supporting the proposal.
• The relevant Stankings Canons.
• The institutional objectives advanced.
• Any constitutional risks or areas requiring further review.

No proposal should reach final approval without demonstrating constitutional alignment.`;

export const EXECUTIVE_DECISION_31 = `Every executive, Board member and designated institutional steward shall complete an Annual Stewardship Declaration.

The declaration shall affirm that the individual has:

• Exercised authority responsibly.
• Protected institutional assets.
• Contributed to succession planning.
• Preserved institutional knowledge.
• Acted consistently with the Constitution and the Stankings Canons.
• Identified areas requiring improvement.

These declarations shall become part of the permanent governance record of Stankings Group.`;

export const EXECUTIVE_DECISION_32 = `The Board shall maintain a Reserved Powers Register.

This register shall identify decisions that cannot be delegated without explicit Board approval.

Examples may include:

• Constitutional amendments.
• Admission of new institutions into the Group.
• Major acquisitions or disposals.
• Significant capital allocation.
• Appointment or removal of the Group CEO.
• Approval of long-term institutional strategy.
• Adoption of new Canons.
• Approval of Annual Stewardship Reports.
• Changes to institutional identity or purpose.

The Register should be reviewed periodically to ensure it remains appropriate to the Group's size and complexity.`;

export const EXECUTIVE_DECISION_33 = `Every executive and constitutional office holder shall complete an Annual Constitutional Leadership Review.

The review should evaluate:

• Fidelity to the Constitution.
• Fidelity to the Stankings Canons.
• Stewardship of institutional assets.
• Leadership development.
• Decision quality.
• Ethical conduct.
• Knowledge contribution.
• Institutional improvement.
• Long-term value created.

The review becomes part of the permanent governance record and informs development planning, succession readiness and institutional learning.`;

export const EXECUTIVE_DECISION_34 = `The Group shall maintain a permanent Institutional Decision Register.

Every material decision shall be assigned a unique identifier and preserved together with its supporting evidence, constitutional references, rationale and subsequent review.

The Register shall serve as a historical record of institutional reasoning, enabling future custodians to understand not only what decisions were made, but why they were made.`;

export const EXECUTIVE_DECISION_35 = `The Group shall maintain a Constitutional Asset Register identifying all significant institutional assets.

The Register shall classify assets according to:

• Strategic importance.
• Operational criticality.
• Trust sensitivity.
• Knowledge value.
• Security requirements.
• Recovery priority.
• Stewardship responsibility.

The Register shall be reviewed annually and whenever material institutional changes occur.`;

export const EXECUTIVE_DECISION_36 = `The Board shall maintain a Governance Architecture Register documenting the relationship between:

• The Constitution.
• The Stankings Canons.
• Applicable law.
• Legal ownership structures.
• Governance bodies.
• Operating institutions.
• Major governance instruments.

The Register shall ensure that future custodians understand how the constitutional philosophy is expressed through lawful governance structures without confusing one with the other.`;

export const EXECUTIVE_DECISION_37 = `The Board shall maintain an Institutional Ecosystem Register.

The Register shall identify:

• Every institution within the Group.
• Its constitutional purpose.
• Its governance status.
• Its strategic role.
• Shared platforms utilized.
• Shared capabilities provided.
• Ecosystem dependencies.
• Constitutional relationships with other institutions.

The Register shall be reviewed annually to ensure the ecosystem remains coherent, complementary and aligned with the Constitution.`;

export const EXECUTIVE_DECISION_38 = `The Group shall maintain a Register of Constitutional Institutions.

No institution shall be launched, materially transformed, merged or concluded without an updated Institutional Charter and a corresponding entry in the Register.

The Register shall preserve the constitutional history of every institution, including significant milestones, governance changes and stewardship reviews.`;

export const EXECUTIVE_DECISION_39 = `Every director, executive, constitutional office holder and designated institutional steward shall submit an Annual Integrity Declaration.

The declaration shall confirm:

• Known conflicts of interest.
• Outside appointments where disclosure is appropriate.
• Related-party interests requiring review.
• Compliance with constitutional ethical standards.
• Awareness of any material constitutional concerns requiring attention.

These declarations shall be retained as permanent governance records.`;

export const EXECUTIVE_DECISION_40 = `The Group shall maintain a Constitutional Information Governance Framework.

The Framework shall define standards for:

• Identity governance.
• Information security.
• Privacy.
• Consent management.
• Artificial intelligence.
• Shared trust infrastructure.
• Cybersecurity.
• Data quality.
• Digital resilience.
• Cross-institutional information governance.

The Framework shall be reviewed periodically to ensure continued constitutional alignment, legal compliance and responsible stewardship.`;

export const EXECUTIVE_DECISION_41 = `The Group shall maintain a Knowledge Governance Framework.

The Framework shall define standards for:

• Knowledge creation.
• Documentation.
• Version control.
• Review.
• Classification.
• Publication.
• Archiving.
• Searchability.
• Preservation.
• Responsible access.

Each operating institution shall designate appropriate responsibility for maintaining the quality and continuity of its institutional knowledge.`;

export const EXECUTIVE_DECISION_42 = `The Board shall publish an Annual Constitutional Stewardship Report.

The Report shall summarize:

• Constitutional Health.
• Progress toward institutional objectives.
• Significant governance developments.
• Stewardship of institutional assets.
• Leadership development.
• Innovation outcomes.
• Knowledge growth.
• Trust indicators.
• Strategic risks.
• Long-term priorities.

The purpose of the Report is to strengthen accountability, institutional learning and long-term stewardship.`;

export const EXECUTIVE_DECISION_43 = `The Board shall maintain a Constitution Register.

The Register shall include:

• Current Constitution.
• Amendment History.
• Constitutional Reviews.
• Constitutional Commentaries.
• Official Interpretations.
• Constitutional Schedules.
• Ratification Records.
• Cross References to the Stankings Canons.

The Register shall serve as the authoritative constitutional record of Stankings Group.`;

export const EXECUTIVE_DECISION_44 = `The Board shall maintain a Leadership Continuity Framework.

The Framework shall define:

• Leadership competencies.
• Development pathways.
• Mentorship standards.
• Evaluation principles.
• Succession readiness.
• Educational requirements.
• Custodian Programme governance.
• Periodic review of leadership development outcomes.

The objective is to ensure that leadership continuity remains intentional, measurable and faithful to the Constitution.`;

export const EXECUTIVE_DECISION_45 = `The Group shall maintain a Constitutional Register of Office Holders.

The Register shall record:

• Constitutional appointments.
• Oaths or affirmations.
• Constitution training.
• Stewardship declarations.
• Integrity declarations.
• Leadership reviews.
• Constitutional service history.

The Register shall preserve the constitutional history of leadership across generations.`;

export const EXECUTIVE_DECISION_46 = `Volume II shall be maintained as the authoritative Governance Code of Stankings Group.

The Governance Code shall implement the Constitution through practical governance procedures, committee charters, leadership responsibilities, operational standards and institutional controls.

The Governance Code shall remain subordinate to the Constitution and shall be reviewed periodically to ensure continued constitutional alignment.`;

export const EXECUTIVE_DECISION_48 = `Nothing enters the Stankings Library without an architecture.

This applies equally to Books, Policies, Engineering Standards, Company Manuals, Product Specifications, AI Systems, Governance Documents, and Public Publications.

The Library shall contain only documents that have been intentionally designed, reviewed, and preserved.`;

/** Editorial governance — pause at ~25–30 canons for quality over quantity */
export const CANON_REVIEW_SUMMIT_NOTE = `When Volume 0 reaches approximately 25–30 Canons, the Library Council shall convene a Canon Review Summit — not to add more Canons, but to ask: Are any redundant? Do any conflict? Are any missing? Can two be merged? Are they presented in the best order? The objective is 24–36 Canons that comprehensively define the institution without exceeding human memory and application.`;
