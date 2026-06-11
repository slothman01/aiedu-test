"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card className="card-aiedu-hover relative flex h-full flex-col rounded-md border-[var(--lightgray)] bg-white shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
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
            <CardTitle className="text-lg font-bold leading-snug text-[var(--navy)]">
              <Link
                href={`/resource/${resource.slug}`}
                className="hover:text-[var(--green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
              >
                {resource.title}
              </Link>
            </CardTitle>
          </div>
          {onToggleSave && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
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
        <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
          {resource.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-0">
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
        <p className="mt-3 text-xs font-medium text-muted-foreground">
          {resource.duration}
        </p>
      </CardContent>
    </Card>
  );
}
