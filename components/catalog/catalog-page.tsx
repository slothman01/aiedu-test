"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { SearchBar } from "@/components/catalog/search-bar";
import { ResourceCard } from "@/components/resource/resource-card";
import { Button } from "@/components/ui/button";
import { useCollection } from "@/hooks/use-collection";
import { useResources } from "@/hooks/use-resources";
import { AIEDU } from "@/lib/brand";
import { GRADE_BANDS, GRADE_LABELS } from "@/lib/constants";
import {
  filterResources,
  filtersFromSearchParams,
  searchParamsFromFilters,
  toggleFilterValue,
} from "@/lib/filters";
import type { CatalogFilters, GradeBand } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CatalogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { published } = useResources();
  const { collection, toggle } = useCollection();

  const [filters, setFilters] = useState<CatalogFilters>(() =>
    filtersFromSearchParams(searchParams)
  );

  useEffect(() => {
    setFilters(filtersFromSearchParams(searchParams));
  }, [searchParams]);

  const updateFilters = useCallback(
    (next: CatalogFilters) => {
      setFilters(next);
      const params = searchParamsFromFilters(next);
      const query = params.toString();
      router.replace(query ? `/?${query}` : "/", { scroll: false });
    },
    [router]
  );

  const toggleGrade = (grade: GradeBand) => {
    updateFilters({
      ...filters,
      grade: toggleFilterValue(filters.grade, grade),
    });
  };

  const filtered = useMemo(
    () => filterResources(published, filters),
    [published, filters]
  );

  return (
    <div className="space-y-8">
      <section className="section-navy overflow-hidden rounded-2xl px-6 py-10 sm:px-10">
        <p className="eyebrow-green !text-[var(--teal)]">Educators · Curricular Resources</p>
        <h1 className="mt-3 max-w-3xl text-white sm:text-[42px]">
          Find{" "}
          <span className="highlight-teal text-white">AI-literacy</span> classroom
          materials
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85">
          {AIEDU.tagline} Search, filter, and explore structured curriculum
          inspired by {AIEDU.name}&apos;s public catalog.
        </p>

        <div className="mt-8 space-y-4">
          <div className="max-w-xl">
            <SearchBar
              value={filters.q ?? ""}
              onChange={(q) =>
                updateFilters({ ...filters, q: q || undefined })
              }
              variant="hero"
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-white/70">
              Quick filter by grade
            </p>
            <div className="flex flex-wrap gap-2">
              {GRADE_BANDS.map((grade) => {
                const active = filters.grade?.includes(grade) ?? false;
                return (
                  <Button
                    key={grade}
                    type="button"
                    size="sm"
                    variant={active ? "aiedu-dark" : "outline"}
                    className={cn(
                      !active &&
                        "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:shadow-none"
                    )}
                    onClick={() => toggleGrade(grade)}
                  >
                    {GRADE_LABELS[grade]}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-6 lg:flex-row">
        <FilterSidebar filters={filters} onChange={updateFilters} />

        <div className="min-w-0 flex-1">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            {filtered.length} resource{filtered.length === 1 ? "" : "s"} found
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--gray)] bg-[var(--lightgray)]/40 p-12 text-center">
              <p className="text-lg font-bold text-[var(--navy)]">
                No resources match your filters
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try clearing filters or broadening your search terms.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  saved={collection.includes(resource.slug)}
                  onToggleSave={toggle}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
