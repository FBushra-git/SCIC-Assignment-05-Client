import { ArrowRight, CalendarDays, Layers3, UserRound } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Item } from "./item-data";

const priorityTone = {
  Beginner: "bg-emerald-500/15 text-emerald-100",
  Intermediate: "bg-blue-500/20 text-cyan-100",
  Advanced: "bg-violet-500/20 text-violet-100",
};

export function ItemCover({
  imageUrl,
  title,
  className,
}: {
  imageUrl: string | null;
  title: string;
  className?: string;
}) {
  return (
    <div
      aria-label={`${title} cover image`}
      className={cn(
        "bg-[url('/images/projects/developer-portfolio-photo.webp')] bg-cover bg-center",
        className,
      )}
      role="img"
      style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
    />
  );
}

export function ItemCard({ item }: { item: Item }) {
  return (
    <article className="glass-panel group flex min-h-[31rem] flex-col overflow-hidden rounded-2xl bg-white/80 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 dark:bg-slate-900/70">
      <div className="relative h-48 overflow-hidden bg-slate-950">
        <ItemCover className="absolute inset-0 transition duration-500 group-hover:scale-105" imageUrl={item.imageUrl} title={item.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
        <span className={cn("absolute left-4 top-4 rounded-full border border-white/15 px-3 py-1 text-xs font-bold backdrop-blur", priorityTone[item.priority])}>{item.priority}</span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-xs font-bold text-white"><UserRound className="size-3.5" /> {item.authorName}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-bold">{item.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{item.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{item.technologies.slice(0, 5).map((technology) => <span className="rounded-lg bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground" key={technology}>{technology}</span>)}</div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-2 rounded-xl border border-border/70 p-3"><Layers3 className="size-4 text-blue-600 dark:text-cyan-300" /> {item.technologies.length} skills</span>
          <span className="flex items-center gap-2 rounded-xl border border-border/70 p-3"><CalendarDays className="size-4 text-blue-600 dark:text-cyan-300" /> {item.targetDate ? new Date(item.targetDate).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "Flexible"}</span>
        </div>
        <Link className={cn(buttonVariants({ size: "lg" }), "mt-auto h-11 rounded-xl")} href={`/items/${item.id}`}>View details <ArrowRight /></Link>
      </div>
    </article>
  );
}
