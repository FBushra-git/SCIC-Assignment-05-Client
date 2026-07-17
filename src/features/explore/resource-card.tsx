import { ArrowUpRight, Clock3, ExternalLink } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import type { LearningResource } from "./explore-data";

const difficultyTone = {
  Beginner: "text-emerald-700 dark:text-emerald-300",
  Intermediate: "text-blue-700 dark:text-cyan-300",
  Advanced: "text-violet-700 dark:text-violet-300",
};

export function ResourceCard({
  compact = false,
  resource,
}: {
  compact?: boolean;
  resource: LearningResource;
}) {
  return (
    <article className={cn("group flex overflow-hidden rounded-2xl border border-border/70 bg-background/80 transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10", compact ? "min-h-52 flex-col sm:flex-row" : "min-h-[26rem] flex-col")}>
      <div className={cn("relative shrink-0 overflow-hidden", compact ? "h-40 sm:h-auto sm:w-40" : "h-40")}>
        <Image alt="" className="object-cover transition duration-500 group-hover:scale-105" fill sizes={compact ? "160px" : "(min-width: 1024px) 25vw, 100vw"} src={resource.thumbnail} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-slate-950/65 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">{resource.type}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3"><span className={cn("text-xs font-bold", difficultyTone[resource.difficulty])}>{resource.difficulty}</span><span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground"><Clock3 className="size-3.5" /> {resource.estimatedTime}</span></div>
        <h3 className="mt-2 font-bold leading-6">{resource.title}</h3>
        <p className="mt-1 text-xs font-semibold text-muted-foreground">{resource.source}</p>
        <p className={cn("mt-3 text-sm leading-6 text-muted-foreground", compact ? "line-clamp-2" : "line-clamp-3")}>{resource.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{resource.technologies.slice(0, 4).map((technology) => <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground" key={technology}>{technology}</span>)}</div>
        <a className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-blue-700 hover:text-blue-500 dark:text-cyan-300" href={resource.url} rel="noreferrer" target="_blank">Open resource <ExternalLink className="size-3.5" /><ArrowUpRight className="sr-only" /></a>
      </div>
    </article>
  );
}
