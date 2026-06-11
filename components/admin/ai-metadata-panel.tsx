"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  GRADE_BANDS,
  GRADE_LABELS,
  RESOURCE_TYPES,
  TOPICS,
  TYPE_LABELS,
} from "@/lib/constants";
import type { GeneratedMetadata, GradeBand, ResourceType, Topic } from "@/lib/types";

interface AiMetadataPanelProps {
  onApply: (metadata: GeneratedMetadata) => void;
}

export function AiMetadataPanel({ onApply }: AiMetadataPanelProps) {
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<GeneratedMetadata | null>(null);
  const [edited, setEdited] = useState<GeneratedMetadata | null>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText }),
      });
      const data = (await res.json()) as GeneratedMetadata;
      setSuggestion(data);
      setEdited(data);
    } finally {
      setLoading(false);
    }
  };

  const updateEdited = <K extends keyof GeneratedMetadata>(
    key: K,
    value: GeneratedMetadata[K]
  ) => {
    if (!edited) return;
    setEdited({ ...edited, [key]: value });
  };

  const toggleTopic = (topic: Topic) => {
    if (!edited) return;
    const topics = edited.topics.includes(topic)
      ? edited.topics.filter((t) => t !== topic)
      : [...edited.topics, topic];
    updateEdited("topics", topics);
  };

  return (
    <Card className="rounded-xl border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>Generate metadata with AI</CardTitle>
        </div>
        <CardDescription>
          Paste raw lesson text below. Review and edit suggestions before applying
          — human-in-the-loop by design.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="raw-text">Raw lesson text</Label>
          <Textarea
            id="raw-text"
            rows={6}
            placeholder="Paste lesson content, unit overview, or teacher notes..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
        </div>

        <Button
          type="button"
          onClick={generate}
          disabled={loading || !rawText.trim()}
          className="rounded-xl"
        >
          {loading ? "Generating..." : "Generate metadata"}
        </Button>

        {suggestion && edited && (
          <div className="space-y-4 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Suggested metadata</p>
              <Badge variant="secondary">
                {suggestion.mode === "mock" ? "(mock mode)" : suggestion.mode}
              </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="ai-title">Title</Label>
                <Input
                  id="ai-title"
                  value={edited.title}
                  onChange={(e) => updateEdited("title", e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="ai-summary">Summary</Label>
                <Textarea
                  id="ai-summary"
                  rows={2}
                  value={edited.summary}
                  onChange={(e) => updateEdited("summary", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={edited.type}
                  onValueChange={(v) => updateEdited("type", v as ResourceType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RESOURCE_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {TYPE_LABELS[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Grade band</Label>
                <Select
                  value={edited.gradeBand}
                  onValueChange={(v) => updateEdited("gradeBand", v as GradeBand)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADE_BANDS.map((g) => (
                      <SelectItem key={g} value={g}>
                        {GRADE_LABELS[g]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ai-duration">Duration</Label>
                <Input
                  id="ai-duration"
                  value={edited.duration}
                  onChange={(e) => updateEdited("duration", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Topics</Label>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((topic) => (
                  <Button
                    key={topic}
                    type="button"
                    size="sm"
                    variant={edited.topics.includes(topic) ? "default" : "outline"}
                    onClick={() => toggleTopic(topic)}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              className="rounded-xl"
              onClick={() => onApply(edited)}
            >
              Apply to form
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
