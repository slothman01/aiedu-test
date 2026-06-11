"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResourceTypeThumbnail } from "@/components/resource/resource-type-thumbnail";
import { GRADE_LABELS, TYPE_LABELS } from "@/lib/constants";
import type { Resource } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  resource: Resource;
  saved?: boolean;
  onToggleSave?: (slug: string) => void;
}

export function ResourceCard({
  resource,
  saved = false,
  onToggleSave,
}: ResourceCardProps) {
  return (
    <Card className="card-aiedu-hover relative flex h-full flex-col overflow-hidden rounded-md border border-[var(--lightgray)] bg-white p-0 shadow-sm ring-0">
      <ResourceTypeThumbnail type={resource.type} />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-sm bg-[var(--navy)]/10 font-semibold text-[var(--navy)] hover:bg-[var(--navy)]/10">
                {TYPE_LABELS[resource.type]}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-sm border-[var(--gray)] text-[var(--navy)]"
              >
                {GRADE_LABELS[resource.gradeBand]}
              </Badge>
            </div>
            <h3 className="font-heading text-lg font-bold leading-snug text-[var(--navy)]">
              <Link
                href={`/resource/${resource.slug}`}
                className="hover:text-[var(--green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
              >
                {resource.title}
              </Link>
            </h3>
          </div>
          {onToggleSave && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="-mr-1 shrink-0"
              aria-label={saved ? "Remove from collection" : "Save to collection"}
              onClick={() => onToggleSave(resource.slug)}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  saved
                    ? "fill-[var(--pink)] text-[var(--pink)]"
                    : "text-[var(--gray)]"
                )}
              />
            </Button>
          )}
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {resource.summary}
        </p>

        <div className="mt-auto space-y-3 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {resource.topics.slice(0, 2).map((topic) => (
              <Badge
                key={topic}
                variant="outline"
                className="rounded-sm border-[var(--teal)]/50 text-xs font-medium text-[var(--green)]"
              >
                {topic}
              </Badge>
            ))}
            {resource.topics.length > 2 && (
              <Badge
                variant="outline"
                className="rounded-sm border-[var(--gray)] text-xs"
              >
                +{resource.topics.length - 2}
              </Badge>
            )}
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            {resource.duration}
          </p>
        </div>
      </div>
    </Card>
  );
}
