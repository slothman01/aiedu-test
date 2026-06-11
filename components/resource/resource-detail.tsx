"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { MetadataChips } from "@/components/resource/metadata-chips";
import { ResourceCard } from "@/components/resource/resource-card";
import { Button } from "@/components/ui/button";
import { useResources } from "@/hooks/use-resources";
import { getRelatedResources } from "@/lib/resources";

interface ResourceDetailProps {
  slug: string;
}

export function ResourceDetail({ slug }: ResourceDetailProps) {
  const { published, overrides } = useResources();
  const resource = published.find((r) => r.slug === slug);

  if (!resource) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center">
        <p className="text-lg font-medium">Resource not found</p>
        <Button asChild variant="aiedu" className="mt-4">
          <Link href="/">Back to catalog</Link>
        </Button>
      </div>
    );
  }

  const related = getRelatedResources(resource, overrides ?? undefined);

  return (
    <article className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to catalog
      </Link>

      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
        <h1 className="text-[var(--navy)]">{resource.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{resource.summary}</p>
        <MetadataChips resource={resource} />

        <div className="mt-8 space-y-4 text-muted-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-1">
          <ReactMarkdown>{resource.description}</ReactMarkdown>
        </div>

        {resource.materials.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-[var(--green)]">Materials included</h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-muted-foreground">
              {resource.materials.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <Button
          variant="aiedu"
          className="mt-8"
          onClick={() =>
            toast.info("Demo — would link to resource", {
              description: "In production this opens the lesson file or external URL.",
            })
          }
        >
          <Download className="mr-2 h-4 w-4" />
          Download / Launch
        </Button>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-[var(--navy)]">Related resources</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
