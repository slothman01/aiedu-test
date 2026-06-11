import Link from "next/link";
import { STUDIO } from "@/lib/brand";

export function DemoBanner() {
  return (
    <div className="border-b border-[var(--aiedu-purple)]/20 bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-center text-xs sm:text-sm sm:px-6 lg:px-8">
        <span className="font-semibold text-primary">{STUDIO.name}</span>
        <span className="text-muted-foreground">
          — prototype demo for aiEDU application · demo data &amp; localStorage
          persistence
        </span>
        <Link href="/process" className="font-medium text-primary hover:underline">
          Learn more
        </Link>
      </div>
    </div>
  );
}
