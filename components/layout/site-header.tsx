import Link from "next/link";
import { BookOpen, Heart, LayoutDashboard, Workflow } from "lucide-react";

const navItems = [
  { href: "/", label: "Catalog", icon: BookOpen },
  { href: "/collection", label: "My Collection", icon: Heart },
  { href: "/process", label: "Process", icon: Workflow },
  { href: "/admin", label: "Admin", icon: LayoutDashboard },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-foreground">
              Curriculum Studio
            </p>
            <p className="text-xs text-muted-foreground">AI literacy resources</p>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
