import { STORAGE_KEYS } from "./constants";

export function getCollection(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.collection);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function saveCollection(slugs: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.collection, JSON.stringify(slugs));
}

export function toggleCollectionItem(slug: string): string[] {
  const current = getCollection();
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  saveCollection(next);
  return next;
}

export function isInCollection(slug: string): boolean {
  return getCollection().includes(slug);
}
