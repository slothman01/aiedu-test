import Link from "next/link";
import { STUDIO } from "@/lib/brand";

const VIDEO_SRC = "/video/curriculum-studio-walkthrough.mp4";
const CAPTIONS_SRC = "/video/curriculum-studio-walkthrough.vtt";
const VIDEO_TITLE = `${STUDIO.name} application walkthrough`;

export function ApplicationVideo() {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-[var(--lightgray)] bg-black">
        <div className="relative aspect-video w-full">
          <video
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full"
            aria-label={VIDEO_TITLE}
            title={VIDEO_TITLE}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            <track
              kind="captions"
              src={CAPTIONS_SRC}
              srcLang="en"
              label="English"
              default
            />
            Your browser does not support embedded video. Download the
            walkthrough video instead.
          </video>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        <Link
          href={VIDEO_SRC}
          download
          className="font-semibold text-[var(--green)] hover:underline"
        >
          Download video
        </Link>
        {" · "}
        Catalog search, collection, admin workflow, and AI metadata assist
      </p>
    </div>
  );
}
