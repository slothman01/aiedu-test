"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { STUDIO } from "@/lib/brand";

const DISMISS_KEY = "curriculum-studio-banner-dismissed";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "true");
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "true");
    setDismissed(true);
  };

  if (dismissed) {
    return null;
  }

  return (
    <div className="border-b border-[var(--lightgray)] bg-[var(--lightgray)]">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-center text-xs sm:text-sm sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span className="font-bold text-[var(--navy)]">{STUDIO.name}</span>
          <span className="text-muted-foreground">
            — prototype demo for aiEDU application · demo data &amp; localStorage
            persistence
          </span>
          <Link
            href="/process"
            className="font-semibold text-[var(--green)] hover:underline"
          >
            Learn more <span className="cta-arrow inline-block">→</span>
          </Link>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="ml-2 shrink-0 rounded-md p-1 text-[var(--navy)]/60 transition-colors hover:bg-white/60 hover:text-[var(--navy)]"
          aria-label="Dismiss demo banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
