"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAllResources,
  getPublishedResources,
  readOverrides,
} from "@/lib/resources";
import type { ResourceOverrides } from "@/lib/types";
import type { Resource } from "@/lib/types";

export function useResources() {
  const [overrides, setOverrides] = useState<ResourceOverrides | null>(null);
  const [resources, setResources] = useState<Resource[]>(() => getAllResources());
  const [published, setPublished] = useState<Resource[]>(() =>
    getPublishedResources()
  );

  const refresh = useCallback(() => {
    const o = readOverrides();
    setOverrides(o);
    setResources(getAllResources(o));
    setPublished(getPublishedResources(o));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { overrides, resources, published, ready: true, refresh };
}
