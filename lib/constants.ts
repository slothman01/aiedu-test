import type {
  Audience,
  GradeBand,
  ResourceType,
  Topic,
} from "./types";

export const RESOURCE_TYPES: ResourceType[] = [
  "lesson",
  "course",
  "project",
  "quick-guide",
  "activity",
  "framework",
];

export const GRADE_BANDS: GradeBand[] = [
  "elementary",
  "middle",
  "high",
  "all",
];

export const TOPICS: Topic[] = [
  "AI ethics",
  "LLMs",
  "media literacy & deepfakes",
  "data & privacy",
  "AI careers",
  "critical thinking",
];

export const AUDIENCES: Audience[] = ["educator", "student", "family"];

export const DURATIONS = [
  "15 min",
  "30 min",
  "45 min",
  "1 hour",
  "3 lessons",
  "5 lessons",
  "10 weeks",
];

export const STATUS_LABELS = {
  draft: "Draft",
  "in-review": "In Review",
  published: "Published",
} as const;

export const TYPE_LABELS: Record<ResourceType, string> = {
  lesson: "Lesson",
  course: "Course",
  project: "Project",
  "quick-guide": "Quick Guide",
  activity: "Activity",
  framework: "Framework",
};

export const GRADE_LABELS: Record<GradeBand, string> = {
  elementary: "Elementary",
  middle: "Middle School",
  high: "High School",
  all: "All Grades",
};

export const AUDIENCE_LABELS: Record<Audience, string> = {
  educator: "Educators",
  student: "Students",
  family: "Families",
};

export const STORAGE_KEYS = {
  overrides: "curriculum-studio-overrides",
  collection: "curriculum-studio-collection",
  adminAuth: "curriculum-studio-admin-auth",
} as const;

export const DEMO_PASSCODE = "aiedu-demo";
