import {
  BookOpen,
  GraduationCap,
  LayoutGrid,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ResourceType } from "@/lib/types";
import { cn } from "@/lib/utils";

const THUMBNAIL_CONFIG: Record<
  ResourceType,
  { icon: LucideIcon; bg: string; accent: string }
> = {
  lesson: {
    icon: BookOpen,
    bg: "bg-[var(--teal)]/15",
    accent: "text-[var(--green)]",
  },
  course: {
    icon: GraduationCap,
    bg: "bg-[var(--navy)]/10",
    accent: "text-[var(--navy)]",
  },
  project: {
    icon: Sparkles,
    bg: "bg-[var(--mandarin)]/10",
    accent: "text-[var(--mandarin)]",
  },
  "quick-guide": {
    icon: Zap,
    bg: "bg-[var(--pink)]/10",
    accent: "text-[var(--pink)]",
  },
  activity: {
    icon: Users,
    bg: "bg-[var(--green)]/10",
    accent: "text-[var(--green)]",
  },
  framework: {
    icon: LayoutGrid,
    bg: "bg-[var(--teal)]/20",
    accent: "text-[var(--navy)]",
  },
};

interface ResourceTypeThumbnailProps {
  type: ResourceType;
  className?: string;
}

export function ResourceTypeThumbnail({
  type,
  className,
}: ResourceTypeThumbnailProps) {
  const { icon: Icon, bg, accent } = THUMBNAIL_CONFIG[type];

  return (
    <div
      className={cn(
        "flex h-28 items-center justify-center rounded-t-md border-b border-[var(--lightgray)]",
        bg,
        className
      )}
      aria-hidden="true"
    >
      <Icon className={cn("h-12 w-12 opacity-80", accent)} strokeWidth={1.5} />
    </div>
  );
}
