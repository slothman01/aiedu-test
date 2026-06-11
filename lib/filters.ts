import type { CatalogFilters, Resource } from "./types";

function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  return value.split(",").map((v) => v.trim()).filter(Boolean);
}

export function filtersFromSearchParams(
  params: URLSearchParams
): CatalogFilters {
  return {
    q: params.get("q") ?? undefined,
    type: parseList(params.get("type")),
    grade: parseList(params.get("grade")),
    topic: parseList(params.get("topic")),
    audience: parseList(params.get("audience")),
    duration: parseList(params.get("duration")),
  };
}

export function searchParamsFromFilters(filters: CatalogFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.type?.length) params.set("type", filters.type.join(","));
  if (filters.grade?.length) params.set("grade", filters.grade.join(","));
  if (filters.topic?.length) params.set("topic", filters.topic.join(","));
  if (filters.audience?.length) params.set("audience", filters.audience.join(","));
  if (filters.duration?.length) params.set("duration", filters.duration.join(","));

  return params;
}

export function filterResources(
  resources: Resource[],
  filters: CatalogFilters
): Resource[] {
  const q = filters.q?.toLowerCase().trim();

  return resources.filter((resource) => {
    if (q) {
      const haystack = [
        resource.title,
        resource.summary,
        ...resource.topics,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (filters.type?.length && !filters.type.includes(resource.type)) {
      return false;
    }

    if (filters.grade?.length && !filters.grade.includes(resource.gradeBand)) {
      return false;
    }

    if (
      filters.topic?.length &&
      !resource.topics.some((t) => filters.topic!.includes(t))
    ) {
      return false;
    }

    if (
      filters.audience?.length &&
      !filters.audience.includes(resource.audience)
    ) {
      return false;
    }

    if (
      filters.duration?.length &&
      !filters.duration.includes(resource.duration)
    ) {
      return false;
    }

    return true;
  });
}

export function toggleFilterValue(
  current: string[] | undefined,
  value: string
): string[] {
  const list = current ?? [];
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}
