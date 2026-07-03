export type SessionRecordStatus = "recorded" | "reviewed" | "archived";

export interface LibrarySessionRecord {
  sessionId: string;
  title: string;
  date: string;
  summary: string[];
  decisions: string[];
  methodology?: string[];
  editorDecisionRefs?: string[];
  status: SessionRecordStatus;
  reviewedAt?: string;
}

export interface LibraryProgressReport {
  generatedAt: string;
  volumesCompleted: { label: string; href: string }[];
  volumeInProgress: { label: string; href: string; detail: string };
  currentBook: { label: string; href?: string; status: string };
  booksCompleted: { completed: number; total: number };
  constitution: { completed: number; total: number; status: string };
  canons: { approved: number; status: string };
  knowledgeObjects: { label: string; status: string };
  convention: { status: string; href: string };
  editorialMotto: string;
}
