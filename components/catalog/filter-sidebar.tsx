"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AUDIENCES,
  AUDIENCE_LABELS,
  DURATIONS,
  GRADE_BANDS,
  GRADE_LABELS,
  RESOURCE_TYPES,
  TOPICS,
  TYPE_LABELS,
} from "@/lib/constants";
import type { CatalogFilters } from "@/lib/types";
import { toggleFilterValue } from "@/lib/filters";

interface FilterSidebarProps {
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
}

function FilterGroup({
  title,
  options,
  labels,
  selected,
  onToggle,
}: {
  title: string;
  options: readonly string[];
  labels?: Record<string, string>;
  selected?: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => {
          const id = `${title}-${option}`;
          return (
            <div key={option} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={selected?.includes(option) ?? false}
                onCheckedChange={() => onToggle(option)}
              />
              <Label htmlFor={id} className="text-sm font-normal">
                {labels?.[option] ?? option}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterContent({ filters, onChange }: FilterSidebarProps) {
  const update = (key: keyof CatalogFilters, value: string) => {
    if (key === "q") return;
    onChange({
      ...filters,
      [key]: toggleFilterValue(filters[key] as string[] | undefined, value),
    });
  };

  const clearAll = () => {
    onChange({ q: filters.q });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearAll}>
          Clear all
        </Button>
      </div>
      <FilterGroup
        title="Type"
        options={RESOURCE_TYPES}
        labels={TYPE_LABELS}
        selected={filters.type}
        onToggle={(v) => update("type", v)}
      />
      <Separator />
      <FilterGroup
        title="Grade band"
        options={GRADE_BANDS}
        labels={GRADE_LABELS}
        selected={filters.grade}
        onToggle={(v) => update("grade", v)}
      />
      <Separator />
      <FilterGroup
        title="Topic"
        options={TOPICS}
        selected={filters.topic}
        onToggle={(v) => update("topic", v)}
      />
      <Separator />
      <FilterGroup
        title="Audience"
        options={AUDIENCES}
        labels={AUDIENCE_LABELS}
        selected={filters.audience}
        onToggle={(v) => update("audience", v)}
      />
      <Separator />
      <FilterGroup
        title="Duration"
        options={DURATIONS}
        selected={filters.duration}
        onToggle={(v) => update("duration", v)}
      />
    </div>
  );
}

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 rounded-xl border border-border/70 bg-card p-5 shadow-sm">
          <FilterContent filters={filters} onChange={onChange} />
        </div>
      </aside>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger
            className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-sm overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter resources</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent filters={filters} onChange={onChange} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
