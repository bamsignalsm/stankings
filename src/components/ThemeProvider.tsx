"use client";

import { useEffect, type ReactNode } from "react";

/** Keeps Stankings on the institutional dark theme only. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    window.localStorage.setItem("stankings-theme", "dark");
  }, []);

  return children;
}
