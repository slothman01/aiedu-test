import Link from "next/link";
import { STUDIO } from "@/lib/brand";

const LOOM_EMBED_ID = "b80eab28497d4684a1feed7c7f24e616";

export function ApplicationVideo() {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-[var(--lightgray)] bg-black">
        <div className="relative aspect-video w-full">
          <iframe
            src={`https://www.loom.com/embed/${LOOM_EMBED_ID}`}
            title={`${STUDIO.name} application walkthrough`}
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        <Link
          href={`https://www.loom.com/share/${LOOM_EMBED_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--green)] hover:underline"
        >
          Open on Loom
        </Link>
        {" · "}
        Catalog search, collection, admin workflow, and AI metadata assist
      </p>
    </div>
  );
}
