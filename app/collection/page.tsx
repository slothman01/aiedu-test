"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ResourceCard } from "@/components/resource/resource-card";
import { Button } from "@/components/ui/button";
import { useCollection } from "@/hooks/use-collection";
import { useResources } from "@/hooks/use-resources";

export default function CollectionPage() {
  const { collection, ready, toggle } = useCollection();
  const { published } = useResources();

  const saved = published.filter((r) => collection.includes(r.slug));

  if (!ready) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Loading collection...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" aria-hidden="true" />
          <h1 className="text-3xl font-bold tracking-tight">My Collection</h1>
        </div>
        <p className="max-w-2xl text-muted-foreground">
          Resources you&apos;ve saved for later. In production this would sync to
          an educator account — likely Google for Education SSO.
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <p className="text-lg font-medium">Your collection is empty</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap the heart icon on any resource card to save it here.
          </p>
          <Button asChild className="mt-4 rounded-xl">
            <Link href="/">Browse catalog</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              saved
              onToggleSave={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
