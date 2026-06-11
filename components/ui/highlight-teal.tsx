import { cn } from "@/lib/utils";

interface HighlightTealProps {
  children: React.ReactNode;
  className?: string;
}

export function HighlightTeal({ children, className }: HighlightTealProps) {
  return (
    <span className={cn("highlight-teal relative inline-block", className)}>
      {children}
      <svg
        className="pointer-events-none absolute -bottom-0.5 left-0 h-[0.35em] w-full min-h-[6px]"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M2,9 C35,3 65,11 98,5 S155,2 198,8"
          fill="none"
          stroke="var(--teal)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
