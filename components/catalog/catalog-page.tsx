"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { SearchBar } from "@/components/catalog/search-bar";
import { ResourceCard } from "@/components/resource/resource-card";
import { useCollection } from "@/hooks/use-collection";
import { useResources } from "@/hooks/use-resources";
import { AIEDU } from "@/lib/brand";
import {
  filterResources,
  filtersFromSearchParams,
  searchParamsFromFilters,
} from "@/lib/filters";
import type { CatalogFilters } from "@/lib/types";

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

  const filtered = useMemo(
    () => filterResources(published, filters),
    [published, filters]
  );

  return (
    <div className="space-y-8">
      <section className="aiedu-gradient-soft overflow-hidden rounded-2xl border border-border px-6 py-10 sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Educators · Curricular Resources
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[var(--aiedu-navy)] sm:text-4xl">
          Find AI-literacy classroom materials
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {AIEDU.tagline} Search, filter, and explore structured curriculum
          inspired by {AIEDU.name}&apos;s public catalog — lessons, courses,
          projects, and quick guides for every grade band.
        </p>
      </section>

      <SearchBar
        value={filters.q ?? ""}
        onChange={(q) => updateFilters({ ...filters, q: q || undefined })}
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <FilterSidebar filters={filters} onChange={updateFilters} />

        <div className="min-w-0 flex-1">
          <p className="mb-4 text-sm text-muted-foreground">
            {filtered.length} resource{filtered.length === 1 ? "" : "s"} found
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <p className="text-lg font-semibold text-[var(--aiedu-navy)]">
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
