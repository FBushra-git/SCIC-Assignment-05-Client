import { Sparkles } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandProps = {
  compact?: boolean;
  className?: string;
};

export function Brand({ compact = false, className }: BrandProps) {
  return (
    <Link
      aria-label="SkillForge AI home"
      className={cn(
        "group inline-flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      href="/"
    >
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 text-white shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/35%),transparent_38%)]" />
        <Sparkles aria-hidden="true" className="relative size-5" strokeWidth={2.25} />
      </span>

      {!compact ? (
        <span className="leading-none">
          <span className="block font-heading text-[1.05rem] font-bold tracking-tight text-foreground sm:text-lg">
            SkillForge <span className="text-cyan-500">AI</span>
          </span>
          <span className="mt-1 hidden text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:block">
            Career intelligence
          </span>
        </span>
      ) : null}
    </Link>
  );
}