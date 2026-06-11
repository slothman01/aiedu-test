"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AIEDU } from "@/lib/brand";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Catalog", match: (path: string) => path === "/" },
  {
    href: "/collection",
    label: "My Collection",
    match: (path: string) => path.startsWith("/collection"),
  },
  {
    href: "/process",
    label: "Process",
    match: (path: string) => path.startsWith("/process"),
  },
  {
    href: "/admin",
    label: "Admin",
    match: (path: string) => path.startsWith("/admin"),
  },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="flex flex-wrap items-center justify-end gap-0.5"
    >
      {navItems.map(({ href, label, match }) => {
        const active = match(pathname);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-2.5 py-2 text-xs font-semibold uppercase tracking-wide transition-colors sm:px-3 sm:text-sm",
              active
                ? "border-b-2 border-[var(--teal)] text-[var(--green)]"
                : "text-[var(--navy)] hover:bg-[var(--lightgray)]"
            )}
          >
            {label}
          </Link>
        );
      })}
      <a
        href={AIEDU.website}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-aiedu ml-1 hidden text-xs sm:inline-flex sm:text-sm"
      >
        aiedu.org <span className="cta-arrow ml-1">→</span>
      </a>
    </nav>
  );
}
