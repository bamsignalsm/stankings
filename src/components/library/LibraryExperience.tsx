"use client";

import { useEffect, useState } from "react";
import { LibrarySacredGate } from "@/components/library/LibrarySacredGate";
import { LibraryHub } from "@/components/LibraryHub";

const STORAGE_KEY = "stankings-library-entered";

export function LibraryExperience() {
  const [entered, setEntered] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setEntered(sessionStorage.getItem(STORAGE_KEY) === "1");
    setHydrated(true);
  }, []);

  function handleEnter() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setEntered(true);
  }

  if (!hydrated) {
    return <div className="min-h-screen bg-ink" />;
  }

  return (
    <>
      {!entered && <LibrarySacredGate onEnter={handleEnter} />}
      <div
        className={`transition-opacity duration-700 ${entered ? "opacity-100" : "opacity-0"}`}
      >
        {entered && <LibraryHub />}
      </div>
    </>
  );
}
