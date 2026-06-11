"use client";

import { useCallback, useEffect, useState } from "react";
import { getCollection, saveCollection } from "@/lib/collection";

export function useCollection() {
  const [collection, setCollection] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(() => {
    setCollection(getCollection());
    setHydrated(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(
    (slug: string) => {
      setCollection((current) => {
        const next = current.includes(slug)
          ? current.filter((s) => s !== slug)
          : [...current, slug];
        saveCollection(next);
        return next;
      });
    },
    []
  );

  return { collection, ready: hydrated, toggle, refresh };
}
