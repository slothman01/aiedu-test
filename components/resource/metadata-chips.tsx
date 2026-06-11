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
      <Badge className="rounded-sm bg-[var(--navy)]/10 font-semibold text-[var(--navy)] hover:bg-[var(--navy)]/10">
        {TYPE_LABELS[resource.type]}
      </Badge>
      <Badge variant="outline" className="rounded-sm border-[var(--gray)]">
        {GRADE_LABELS[resource.gradeBand]}
      </Badge>
      <Badge variant="outline" className="rounded-sm border-[var(--gray)]">
        {AUDIENCE_LABELS[resource.audience]}
      </Badge>
      <Badge variant="outline" className="rounded-sm border-[var(--gray)]">
        {resource.duration}
      </Badge>
      {resource.topics.map((topic) => (
        <Badge
          key={topic}
          variant="outline"
          className="rounded-sm border-[var(--teal)]/50 font-medium text-[var(--green)]"
        >
          {topic}
        </Badge>
      ))}
    </div>
  );
}
