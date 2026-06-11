"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  variant?: "default" | "hero";
}

export function SearchBar({
  value,
  onChange,
  variant = "default",
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className={cn(
          "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
          variant === "hero" ? "text-[var(--navy)]" : "text-muted-foreground"
        )}
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder="Search title, summary, or topics..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "rounded-md pl-10",
          variant === "hero"
            ? "border-0 bg-white text-[var(--navy)] shadow-[4px_4px_0_var(--mandarin)] focus-visible:ring-[var(--teal)]"
            : "ring-[var(--teal)]/30 focus-visible:ring-[var(--teal)]"
        )}
        aria-label="Search resources"
      />
    </div>
  );
}
