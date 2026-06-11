import { Play } from "lucide-react";

export function VideoEmbedPlaceholder() {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-dashed border-[var(--teal)]/40 bg-[var(--navy)]/5">
      <div className="flex aspect-video flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--teal)]/20 ring-4 ring-[var(--teal)]/10">
          <Play
            className="ml-1 h-7 w-7 text-[var(--green)]"
            fill="currentColor"
            aria-hidden="true"
          />
        </div>
        <div className="max-w-md space-y-2">
          <p className="text-base font-bold text-[var(--navy)]">
            Application walkthrough video
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Record a 3–5 minute Loom covering catalog search, collection save,
            admin workflow, and AI metadata assist. After recording, paste your
            embed URL here.
          </p>
        </div>
      </div>
    </div>
  );
}
