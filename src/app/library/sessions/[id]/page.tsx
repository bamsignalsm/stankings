import type { Metadata } from "next";
import { LibrarySessionDetail } from "@/components/library-sessions/LibrarySessionDetail";
import { MemberBanner } from "@/components/MemberBanner";
import { getLibrarySession } from "@/lib/library-sessions/records";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const session = getLibrarySession(id);
  return {
    title: session ? `${session.sessionId} — ${session.title}` : "Session Record",
    robots: { index: false, follow: false },
  };
}

export default async function LibrarySessionPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="pt-20">
      <MemberBanner />
      <LibrarySessionDetail sessionId={id} />
    </div>
  );
}
