import { Badge } from "@/components/ui/badge";
import { STATUS_LABELS } from "@/lib/constants";
import type { ResourceStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<ResourceStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  "in-review": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
  published: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
};

export function StatusBadge({ status }: { status: ResourceStatus }) {
  return (
    <Badge variant="outline" className={cn("border-0", statusStyles[status])}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
