import seedData from "@/data/seed.json";
import { STORAGE_KEYS } from "./constants";
import type { Resource, ResourceOverrides } from "./types";

const EMPTY_OVERRIDES: ResourceOverrides = {
  created: [],
  updated: {},
  deleted: [],
};

export function getSeedResources(): Resource[] {
  return seedData as Resource[];
}

export function getDefaultOverrides(): ResourceOverrides {
  return { ...EMPTY_OVERRIDES, updated: {}, deleted: [] };
}

export function readOverrides(): ResourceOverrides {
  if (typeof window === "undefined") {
    return getDefaultOverrides();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.overrides);
    if (!raw) return getDefaultOverrides();
    return { ...getDefaultOverrides(), ...JSON.parse(raw) };
  } catch {
    return getDefaultOverrides();
  }
}

export function writeOverrides(overrides: ResourceOverrides): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.overrides, JSON.stringify(overrides));
}

export function mergeResources(
  seed: Resource[],
  overrides: ResourceOverrides
): Resource[] {
  const deleted = new Set(overrides.deleted);
  const merged = seed
    .filter((r) => !deleted.has(r.id))
    .map((r) => ({ ...r, ...overrides.updated[r.id] }));

  return [...merged, ...overrides.created];
}

export function getAllResources(overrides?: ResourceOverrides): Resource[] {
  const o = overrides ?? getDefaultOverrides();
  return mergeResources(getSeedResources(), o);
}

export function getPublishedResources(overrides?: ResourceOverrides): Resource[] {
  return getAllResources(overrides).filter((r) => r.status === "published");
}

export function getResourceBySlug(
  slug: string,
  overrides?: ResourceOverrides
): Resource | undefined {
  return getAllResources(overrides).find((r) => r.slug === slug);
}

export function getResourceById(
  id: string,
  overrides?: ResourceOverrides
): Resource | undefined {
  return getAllResources(overrides).find((r) => r.id === id);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateId(): string {
  return `res-${Date.now().toString(36)}`;
}

export function saveResource(resource: Resource): ResourceOverrides {
  const overrides = readOverrides();
  const existing = getResourceById(resource.id, overrides);
  const isSeed = getSeedResources().some((r) => r.id === resource.id);
  const isCreated = overrides.created.some((r) => r.id === resource.id);

  if (existing && (isSeed || isCreated)) {
    if (isCreated) {
      overrides.created = overrides.created.map((r) =>
        r.id === resource.id ? resource : r
      );
    } else {
      overrides.updated[resource.id] = resource;
    }
  } else {
    overrides.created.push(resource);
  }

  writeOverrides(overrides);
  return overrides;
}

export function updateResourceStatus(
  id: string,
  status: Resource["status"]
): ResourceOverrides {
  const overrides = readOverrides();
  const resource = getResourceById(id, overrides);
  if (!resource) return overrides;

  const isCreated = overrides.created.some((r) => r.id === id);
  if (isCreated) {
    overrides.created = overrides.created.map((r) =>
      r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r
    );
  } else {
    overrides.updated[id] = {
      ...overrides.updated[id],
      status,
      updatedAt: new Date().toISOString(),
    };
  }

  writeOverrides(overrides);
  return overrides;
}

export function deleteResource(id: string): ResourceOverrides {
  const overrides = readOverrides();
  const isCreated = overrides.created.some((r) => r.id === id);

  if (isCreated) {
    overrides.created = overrides.created.filter((r) => r.id !== id);
  } else {
    if (!overrides.deleted.includes(id)) {
      overrides.deleted.push(id);
    }
    delete overrides.updated[id];
  }

  writeOverrides(overrides);
  return overrides;
}

export function getRelatedResources(
  resource: Resource,
  overrides?: ResourceOverrides,
  limit = 3
): Resource[] {
  return getPublishedResources(overrides)
    .filter(
      (r) =>
        r.id !== resource.id &&
        r.topics.some((t) => resource.topics.includes(t))
    )
    .slice(0, limit);
}

export function hasCompleteMetadata(resource: Resource): boolean {
  return Boolean(
    resource.title?.trim() &&
      resource.summary?.trim() &&
      resource.topics.length > 0 &&
      resource.duration?.trim()
  );
}
