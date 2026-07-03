import type { ConstitutionalDiagram } from "@/lib/constitutional-convention/types";

export const CONSTITUTIONAL_DIAGRAMS: ConstitutionalDiagram[] = [
  {
    articleId: "article-ix",
    title: "The Institutional Ecosystem",
    ascii: `                  STANKINGS GROUP
                         │
──────────────────────────────────
   Marketplace          Finance
   Relationships        Property
   Automotive           Education
   Institute            Foundation
   Logistics            Technology Procurement
   Venture Studio       (forming institutions)
──────────────────────────────────
              SHARED PLATFORMS
   Shared Identity · Shared AI · YIKE Passport
   Trust Graph · Escrow · Knowledge Library
──────────────────────────────────
        Each institution: separate charter,
        shared nervous system, constitutional firewall`,
  },
  {
    articleId: "article-iv",
    title: "Separation of Govern and Manage",
    ascii: `    BOARD (Govern)              EXECUTIVE (Manage)
    ─────────────────             ───────────────────
    Constitutional direction      Day-to-day operations
    Reserved powers               Institutional execution
    Stewardship oversight         Commercial delivery
              │                           │
              └───────────┬───────────────┘
                    ACCOUNTABILITY
              Neither may absorb the other`,
  },
  {
    articleId: "article-xii",
    title: "Stankings Trust Network",
    ascii: `   USER / CITIZEN
        │
   YIKE PASSPORT ──────► CONSENT & PURPOSE
        │
   ┌────┴────┬──────────┬──────────┐
   │         │          │          │
 VERIFY   TRUST GRAPH  PRIVACY   INSTITUTIONAL AI
   │         │          │          │
   └────┬────┴──────────┴──────────┘
        │
   BAYRIGHT ESCROW · YIKE · BAMSIGNAL · ...
        │
   CONSTITUTIONAL TRUST CENTRE (Art. XII)`,
  },
  {
    articleId: "article-x",
    title: "Institution Lifecycle",
    ascii: `  INCUBATION ──► FORMATION ──► MATURITY
       │              │              │
   Venture Studio   Charter      Ecosystem member
       │              │              │
       └──────────────┴──────────────┘
                      │
            RESPONSIBLE CONCLUSION
         (honourable retirement, merge,
          or knowledge preservation)`,
  },
  {
    articleId: "article-xvi",
    title: "Custodian Development Path",
    ascii: `  FOUNDATION ──► LEADERSHIP ──► TECHNOLOGY
       │                │               │
       └──── ENTERPRISE ─┴── SOCIETY ────┘
                      │
              READINESS REVIEW
                      │
                 GRADUATION
         Every generation prepares the next`,
  },
];

export function getDiagramForArticle(articleId: string): ConstitutionalDiagram | undefined {
  return CONSTITUTIONAL_DIAGRAMS.find((d) => d.articleId === articleId);
}
