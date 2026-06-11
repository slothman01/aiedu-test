"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ResourceCard } from "@/components/resource/resource-card";
import { Button } from "@/components/ui/button";
import { useCollection } from "@/hooks/use-collection";
import { useResources } from "@/hooks/use-resources";

export default function CollectionPage() {
  const { collection, toggle } = useCollection();
  const { published } = useResources();

  const saved = published.filter((r) => collection.includes(r.slug));

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Heart className="h-7 w-7 text-[var(--pink)]" aria-hidden="true" />
          <h1 className="text-[var(--navy)]">My Collection</h1>
        </div>
        <p className="max-w-2xl text-muted-foreground">
          Resources you&apos;ve saved for later. In production this would sync to
          an educator account — likely Google for Education SSO, aligned with{" "}
          <a
            href="https://www.aiedu.org/educator-empowerment"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--green)] hover:underline"
          >
            aiEDU&apos;s educator programs
          </a>
          .
        </p>
      </section>

      {saved.length === 0 ? (
        <div className="rounded-md border border-dashed border-[var(--gray)] bg-[var(--lightgray)]/40 p-12 text-center">
          <p className="text-lg font-bold text-[var(--navy)]">
            Your collection is empty
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap the heart icon on any resource card to save it here.
          </p>
          <Button asChild variant="aiedu-pink" className="mt-4">
            <Link href="/">
              Browse catalog <span className="cta-arrow ml-1">→</span>
            </Link>
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
