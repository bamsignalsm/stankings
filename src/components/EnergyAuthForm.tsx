"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { resolveEnergyNext } from "@/lib/auth-paths";

export function EnergyAuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = resolveEnergyNext(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setLoading(false);
      setError(signInError.message);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      setError("Authentication failed.");
      return;
    }

    const { data: member } = await supabase
      .from("stankings_members")
      .select("status, role")
      .eq("id", user.id)
      .single();

    if (member?.role !== "super_admin" || member?.status !== "approved") {
      await supabase.auth.signOut();
      setLoading(false);
      setError("This entrance is reserved for authorised administrators.");
      return;
    }

    setLoading(false);
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="admin-email"
          className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-cream-muted"
        >
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream outline-none transition focus:border-gold/50"
        />
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-cream-muted"
        >
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          autoComplete="current-password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream outline-none transition focus:border-gold/50"
        />
      </div>

      {error && (
        <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm border border-gold bg-gold py-3 text-sm font-semibold text-ink transition hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? "Please wait..." : "Continue"}
      </button>
    </form>
  );
}
