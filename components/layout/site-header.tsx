import Link from "next/link";
import Image from "next/image";
import { SiteNav } from "@/components/layout/site-nav";
import { AIEDU, STUDIO } from "@/lib/brand";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--lightgray)] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src={AIEDU.logoUrl}
            alt={AIEDU.name}
            width={120}
            height={40}
            className="h-8 w-auto shrink-0 sm:h-9"
            priority
          />
          <div className="hidden min-w-0 border-l border-[var(--lightgray)] pl-3 md:block">
            <p className="text-sm font-bold text-[var(--navy)]">{STUDIO.name}</p>
            <p className="text-xs text-muted-foreground">{STUDIO.subtitle}</p>
          </div>
        </Link>

        <SiteNav />
      </div>
    </header>
  );
}
