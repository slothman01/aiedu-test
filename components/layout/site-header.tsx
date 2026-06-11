import Link from "next/link";
import Image from "next/image";
import { AIEDU, STUDIO } from "@/lib/brand";

const navItems = [
  { href: "/", label: "Catalog" },
  { href: "/collection", label: "My Collection" },
  { href: "/process", label: "Process" },
  { href: "/admin", label: "Admin" },
];

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

        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center justify-end gap-0.5"
        >
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-2.5 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--navy)] transition-colors hover:bg-[var(--lightgray)] sm:px-3 sm:text-sm"
            >
              {label}
            </Link>
          ))}
          <a
            href={AIEDU.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aiedu ml-1 hidden text-xs sm:inline-flex sm:text-sm"
          >
            aiedu.org →
          </a>
        </nav>
      </div>
    </header>
  );
}
