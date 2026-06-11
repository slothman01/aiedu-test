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
  const [resources, setResources] = useState<Resource[]>([]);
  const [published, setPublished] = useState<Resource[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    const o = readOverrides();
    setOverrides(o);
    setResources(getAllResources(o));
    setPublished(getPublishedResources(o));
    setReady(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { overrides, resources, published, ready, refresh };
}
