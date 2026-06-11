import type {
  GeneratedMetadata,
  GradeBand,
  ResourceType,
  Topic,
} from "./types";
import { TOPICS } from "./constants";

const TOPIC_KEYWORDS: Record<Topic, string[]> = {
  "AI ethics": ["ethics", "ethical", "fairness", "bias", "responsible"],
  LLMs: ["llm", "language model", "chatgpt", "gpt", "prompt", "generative ai"],
  "media literacy & deepfakes": [
    "deepfake",
    "synthetic media",
    "misinformation",
    "media literacy",
    "real approach",
  ],
  "data & privacy": [
    "privacy",
    "ferpa",
    "data",
    "personal information",
    "copppa",
  ],
  "AI careers": ["career", "job", "workforce", "profession"],
  "critical thinking": [
    "critical thinking",
    "analyze",
    "evaluate",
    "reasoning",
    "question",
  ],
};

function detectTopics(text: string): Topic[] {
  const lower = text.toLowerCase();
  const found = TOPICS.filter((topic) =>
    TOPIC_KEYWORDS[topic].some((kw) => lower.includes(kw))
  );
  return found.length > 0 ? found : ["critical thinking"];
}

function detectGradeBand(text: string): GradeBand {
  const lower = text.toLowerCase();
  if (
    lower.includes("elementary") ||
    lower.includes("k-5") ||
    lower.includes("grade 3") ||
    lower.includes("grade 4")
  ) {
    return "elementary";
  }
  if (
    lower.includes("middle school") ||
    lower.includes("grades 6-8") ||
    lower.includes("grade 7")
  ) {
    return "middle";
  }
  if (
    lower.includes("high school") ||
    lower.includes("ap ") ||
    lower.includes("grades 9") ||
    lower.includes("grade 11")
  ) {
    return "high";
  }
  return "all";
}

function detectType(text: string): ResourceType {
  const lower = text.toLowerCase();
  if (lower.includes("10 week") || lower.includes("semester") || lower.includes("unit 1")) {
    return "course";
  }
  if (lower.includes("project") || lower.includes("capstone")) {
    return "project";
  }
  if (lower.includes("framework") || lower.includes("rubric")) {
    return "framework";
  }
  if (
    lower.includes("warm-up") ||
    lower.includes("bell ringer") ||
    lower.includes("starter")
  ) {
    return "activity";
  }
  if (
    lower.includes("quick guide") ||
    lower.includes("one-page") ||
    lower.includes("checklist")
  ) {
    return "quick-guide";
  }
  return "lesson";
}

function detectDuration(text: string): string {
  const lower = text.toLowerCase();
  const weekMatch = lower.match(/(\d+)\s*week/);
  if (weekMatch) return `${weekMatch[1]} weeks`;
  const lessonMatch = lower.match(/(\d+)\s*lesson/);
  if (lessonMatch) return `${lessonMatch[1]} lessons`;
  const minMatch = lower.match(/(\d+)\s*min/);
  if (minMatch) return `${minMatch[1]} min`;
  if (lower.includes("hour")) return "1 hour";
  return "45 min";
}

function extractTitle(text: string): string {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const first = lines[0] ?? "Untitled Resource";
  return first.replace(/^#+\s*/, "").slice(0, 80);
}

function extractSummary(text: string): string {
  const cleaned = text.replace(/^#+\s*.+\n/m, "").trim();
  const sentenceMatch = cleaned.match(/[^.!?]+[.!?]/);
  const sentence = sentenceMatch?.[0]?.trim() ?? cleaned.slice(0, 160);
  return sentence.slice(0, 200);
}

export function generateMockMetadata(rawText: string): GeneratedMetadata {
  const text = rawText.trim();
  if (!text) {
    return {
      title: "Untitled Resource",
      summary: "Add a summary after reviewing generated metadata.",
      type: "lesson",
      gradeBand: "all",
      topics: ["critical thinking"],
      duration: "45 min",
      mode: "mock",
    };
  }

  return {
    title: extractTitle(text),
    summary: extractSummary(text),
    type: detectType(text),
    gradeBand: detectGradeBand(text),
    topics: detectTopics(text),
    duration: detectDuration(text),
    mode: "mock",
  };
}
