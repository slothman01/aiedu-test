"use client";

import { useCallback, useEffect, useState } from "react";
import { getCollection, saveCollection } from "@/lib/collection";

export function useCollection() {
  const [collection, setCollection] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setCollection(getCollection());
    setReady(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(
    (slug: string) => {
      const next = collection.includes(slug)
        ? collection.filter((s) => s !== slug)
        : [...collection, slug];
      saveCollection(next);
      setCollection(next);
    },
    [collection]
  );

  return { collection, ready, toggle, refresh };
}
