import { Badge } from "@/components/ui/badge";
import {
  AUDIENCE_LABELS,
  GRADE_LABELS,
  TYPE_LABELS,
} from "@/lib/constants";
import type { Resource } from "@/lib/types";

interface MetadataChipsProps {
  resource: Resource;
  compact?: boolean;
}

export function MetadataChips({ resource, compact = false }: MetadataChipsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "" : "mt-4"}`}>
      <Badge variant="secondary">{TYPE_LABELS[resource.type]}</Badge>
      <Badge variant="outline">{GRADE_LABELS[resource.gradeBand]}</Badge>
      <Badge variant="outline">{AUDIENCE_LABELS[resource.audience]}</Badge>
      <Badge variant="outline">{resource.duration}</Badge>
      {resource.topics.map((topic) => (
        <Badge key={topic} className="bg-primary/10 text-primary hover:bg-primary/10">
          {topic}
        </Badge>
      ))}
    </div>
  );
}
