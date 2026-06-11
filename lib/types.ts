export type ResourceType =
  | "lesson"
  | "course"
  | "project"
  | "quick-guide"
  | "activity"
  | "framework";

export type GradeBand = "elementary" | "middle" | "high" | "all";

export type Audience = "educator" | "student" | "family";

export type ResourceStatus = "draft" | "in-review" | "published";

export type Topic =
  | "AI ethics"
  | "LLMs"
  | "media literacy & deepfakes"
  | "data & privacy"
  | "AI careers"
  | "critical thinking";

export interface Resource {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  type: ResourceType;
  gradeBand: GradeBand;
  topics: Topic[];
  audience: Audience;
  duration: string;
  materials: string[];
  status: ResourceStatus;
  updatedAt: string;
  viewCount: number;
  downloadCount: number;
}

export interface ResourceOverrides {
  created: Resource[];
  updated: Record<string, Partial<Resource>>;
  deleted: string[];
}

export interface GeneratedMetadata {
  title: string;
  summary: string;
  type: ResourceType;
  gradeBand: GradeBand;
  topics: Topic[];
  duration: string;
  mode: "mock" | "openai" | "anthropic";
}

export interface CatalogFilters {
  q?: string;
  type?: string[];
  grade?: string[];
  topic?: string[];
  audience?: string[];
  duration?: string[];
}
