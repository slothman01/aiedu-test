"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AiMetadataPanel } from "@/components/admin/ai-metadata-panel";
import { Button } from "@/components/ui/button";
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
  AUDIENCES,
  AUDIENCE_LABELS,
  GRADE_BANDS,
  GRADE_LABELS,
  RESOURCE_TYPES,
  TOPICS,
  TYPE_LABELS,
} from "@/lib/constants";
import {
  deleteResource,
  generateId,
  saveResource,
  slugify,
} from "@/lib/resources";
import type {
  Audience,
  GeneratedMetadata,
  GradeBand,
  Resource,
  ResourceStatus,
  ResourceType,
  Topic,
} from "@/lib/types";

interface ResourceFormProps {
  initial?: Resource;
  onSaved?: () => void;
}

const emptyResource = (): Resource => ({
  id: generateId(),
  slug: "",
  title: "",
  summary: "",
  description: "",
  type: "lesson",
  gradeBand: "all",
  topics: [],
  audience: "educator",
  duration: "45 min",
  materials: [],
  status: "draft",
  updatedAt: new Date().toISOString(),
  viewCount: 0,
  downloadCount: 0,
});

export function ResourceForm({ initial, onSaved }: ResourceFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<Resource>(initial ?? emptyResource());
  const [materialsText, setMaterialsText] = useState(
    initial?.materials.join("\n") ?? ""
  );

  const update = <K extends keyof Resource>(key: K, value: Resource[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTopic = (topic: Topic) => {
    update(
      "topics",
      form.topics.includes(topic)
        ? form.topics.filter((t) => t !== topic)
        : [...form.topics, topic]
    );
  };

  const applyMetadata = (metadata: GeneratedMetadata) => {
    setForm((prev) => ({
      ...prev,
      title: metadata.title,
      summary: metadata.summary,
      type: metadata.type,
      gradeBand: metadata.gradeBand,
      topics: metadata.topics,
      duration: metadata.duration,
      slug: prev.slug || slugify(metadata.title),
    }));
    toast.success("AI suggestions applied — review before saving");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || slugify(form.title);
    const materials = materialsText
      .split("\n")
      .map((m) => m.trim())
      .filter(Boolean);

    saveResource({
      ...form,
      slug,
      materials,
      updatedAt: new Date().toISOString(),
    });

    toast.success("Resource saved");
    onSaved?.();
    router.push("/admin");
  };

  const handleDelete = () => {
    if (!initial) return;
    if (!confirm("Delete this resource?")) return;
    deleteResource(initial.id);
    toast.success("Resource deleted");
    router.push("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-lg border border-dashed border-border bg-muted/40 p-3 text-sm text-muted-foreground">
        Demo persistence — production would use Postgres.
      </div>

      <AiMetadataPanel onApply={applyMetadata} />

      <div className="grid gap-6 rounded-xl border border-border/70 bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              required
              rows={2}
              value={form.summary}
              onChange={(e) => update("summary", e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="description">Description (markdown)</Label>
            <Textarea
              id="description"
              rows={8}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={form.type}
              onValueChange={(v) => update("type", v as ResourceType)}
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
              value={form.gradeBand}
              onValueChange={(v) => update("gradeBand", v as GradeBand)}
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
            <Label>Audience</Label>
            <Select
              value={form.audience}
              onValueChange={(v) => update("audience", v as Audience)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AUDIENCES.map((a) => (
                  <SelectItem key={a} value={a}>
                    {AUDIENCE_LABELS[a]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={form.duration}
              onChange={(e) => update("duration", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => update("status", v as ResourceStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              placeholder="auto-generated from title if empty"
              onChange={(e) => update("slug", e.target.value)}
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
                variant={form.topics.includes(topic) ? "default" : "outline"}
                onClick={() => toggleTopic(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="materials">Materials (one per line)</Label>
          <Textarea
            id="materials"
            rows={4}
            value={materialsText}
            onChange={(e) => setMaterialsText(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="aiedu">
          Save resource
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
          Cancel
        </Button>
        {initial && (
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
