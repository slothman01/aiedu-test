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
    <Card className="relative flex h-full flex-col rounded-xl border-border/70 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{TYPE_LABELS[resource.type]}</Badge>
              <Badge variant="outline">{GRADE_LABELS[resource.gradeBand]}</Badge>
            </div>
            <CardTitle className="text-lg leading-snug">
              <Link
                href={`/resource/${resource.slug}`}
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  saved ? "fill-primary text-primary" : "text-muted-foreground"
                )}
              />
            </Button>
          )}
        </div>
        <CardDescription className="line-clamp-2 text-sm">
          {resource.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-0">
        <div className="flex flex-wrap gap-1.5">
          {resource.topics.slice(0, 2).map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs">
              {topic}
            </Badge>
          ))}
          {resource.topics.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{resource.topics.length - 2}
            </Badge>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{resource.duration}</p>
      </CardContent>
    </Card>
  );
}
