import { createClient } from "@/lib/supabase/server";
import { approveMember, rejectMember } from "../actions";
import type { StankingsMember } from "@/lib/types";

export default async function AdminMembersPage() {
  const supabase = await createClient();
  const { data: members } = await supabase
    .from("stankings_members")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (members ?? []) as StankingsMember[];

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-cream">
        Member Approvals
      </h1>
      <p className="mb-8 text-cream-muted">
        Every signup requires super admin approval before accessing
        institutional documents.
      </p>

      <div className="overflow-x-auto rounded-lg border border-gold-subtle">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-gold-subtle bg-ink-muted text-cream-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((member) => (
              <tr
                key={member.id}
                className="border-b border-gold-subtle/50 last:border-0"
              >
                <td className="px-4 py-3 text-cream">
                  {member.full_name || "—"}
                </td>
                <td className="px-4 py-3 text-cream-muted">{member.email}</td>
                <td className="px-4 py-3 text-cream-muted">{member.role}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={member.status} />
                </td>
                <td className="px-4 py-3">
                  {member.role !== "super_admin" && (
                    <div className="flex gap-2">
                      {member.status !== "approved" && (
                        <form action={approveMember}>
                          <input type="hidden" name="member_id" value={member.id} />
                          <button
                            type="submit"
                            className="rounded-sm border border-emerald-400/30 px-2 py-1 text-xs text-emerald-400 hover:bg-emerald-400/10"
                          >
                            Approve
                          </button>
                        </form>
                      )}
                      {member.status !== "rejected" && (
                        <form action={rejectMember}>
                          <input type="hidden" name="member_id" value={member.id} />
                          <button
                            type="submit"
                            className="rounded-sm border border-red-400/30 px-2 py-1 text-xs text-red-400 hover:bg-red-400/10"
                          >
                            Reject
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    approved: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    rejected: "text-red-400 border-red-400/30 bg-red-400/10",
  };

  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-xs uppercase ${colors[status] ?? ""}`}
    >
      {status}
    </span>
  );
}
