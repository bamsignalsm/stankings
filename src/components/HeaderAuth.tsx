"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { USER_LOGIN_PATH, USER_REGISTER_PATH } from "@/lib/auth-paths";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function HeaderAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (user?.email_confirmed_at) {
    return (
      <div className="hidden items-center gap-4 md:flex">
        <Link
          href="/library"
          className="text-sm text-cream-muted transition hover:text-gold"
        >
          Library
        </Link>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="rounded-sm border border-gold-subtle px-3 py-1.5 text-sm text-cream-muted transition hover:border-gold/40 hover:text-gold"
          >
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-3 md:flex">
      <Link
        href={USER_LOGIN_PATH}
        className="text-sm text-cream-muted transition hover:text-gold"
      >
        Sign in
      </Link>
      <Link
        href={USER_REGISTER_PATH}
        className="rounded-sm border border-gold/40 bg-gold-subtle px-3 py-1.5 text-sm font-medium text-gold transition hover:border-gold/40 hover:text-gold"
      >
        Member access
      </Link>
    </div>
  );
}
