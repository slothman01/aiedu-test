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
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src={AIEDU.logoUrl}
            alt={AIEDU.name}
            width={120}
            height={40}
            className="h-8 w-auto sm:h-9"
            priority
          />
          <div className="hidden min-w-0 border-l border-border pl-3 sm:block">
            <p className="truncate text-sm font-semibold text-[var(--aiedu-navy)]">
              {STUDIO.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {STUDIO.subtitle}
            </p>
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
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--aiedu-navy)] transition-colors hover:bg-secondary hover:text-primary"
            >
              {label}
            </Link>
          ))}
          <a
            href={AIEDU.website}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-block"
          >
            aiedu.org
          </a>
        </nav>
      </div>
    </header>
  );
}
