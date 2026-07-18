"use client";

import { ArrowLeft, ArrowRight, CalendarDays, Code2, Layers3, Target, UserRound } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ItemCard, ItemCover } from "./item-card";
import { usePublicItem } from "./use-items";

export function ItemDetailsWorkspace({ itemId }: { itemId: string }) {
  const item = usePublicItem(itemId);

  if (item.isPending) return <div className="section-shell h-[75svh] animate-pulse py-10"><div className="h-full rounded-2xl bg-muted" /></div>;
  if (item.isError || !item.data) return <div className="section-shell py-20 text-center"><h1 className="text-3xl font-bold">Item unavailable</h1><p className="mt-3 text-muted-foreground">{item.error?.message ?? "This public item could not be found."}</p><Link className={cn(buttonVariants(), "mt-6 rounded-xl")} href="/items">Browse items</Link></div>;

  const data = item.data;
  return (
    <div className="section-shell py-8 sm:py-12">
      <Link className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-700 dark:text-cyan-300" href="/items"><ArrowLeft className="size-4" /> Back to project items</Link>
      <header className="mt-3 overflow-hidden rounded-2xl bg-slate-950 text-white">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative isolate p-7 sm:p-10">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950" />
            <div className="flex flex-wrap gap-2"><span className="rounded-full border border-cyan-300/25 bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">{data.priority}</span><span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold"><UserRound className="size-3.5" /> {data.authorName}</span></div>
            <h1 className="mt-5 text-3xl font-extrabold sm:text-5xl">{data.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">{data.shortDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">{data.technologies.map((technology) => <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold" key={technology}>{technology}</span>)}</div>
          </div>
          <ItemCover className="min-h-72 lg:min-h-full" imageUrl={data.imageUrl} title={data.title} />
        </div>
      </header>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="glass-panel rounded-2xl bg-white/80 p-6 sm:p-8 dark:bg-slate-900/70">
          <h2 className="flex items-center gap-3 text-xl font-bold"><span className="grid size-11 place-items-center rounded-xl bg-blue-500/10 text-blue-700 dark:text-cyan-300"><Target className="size-5" /></span>Project overview</h2>
          <div className="mt-5 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{data.description}</div>
        </section>
        <aside className="glass-panel rounded-2xl bg-white/80 p-5 dark:bg-slate-900/70 lg:sticky lg:top-24">
          <h2 className="font-bold">Project brief</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div className="rounded-xl border border-border/70 p-3"><dt className="flex items-center gap-2 font-bold"><Layers3 className="size-4 text-blue-600 dark:text-cyan-300" /> Difficulty</dt><dd className="mt-1 text-muted-foreground">{data.priority}</dd></div>
            <div className="rounded-xl border border-border/70 p-3"><dt className="flex items-center gap-2 font-bold"><CalendarDays className="size-4 text-blue-600 dark:text-cyan-300" /> Target date</dt><dd className="mt-1 text-muted-foreground">{data.targetDate ? new Date(data.targetDate).toLocaleDateString(undefined, { dateStyle: "long" }) : "Flexible schedule"}</dd></div>
            <div className="rounded-xl border border-border/70 p-3"><dt className="flex items-center gap-2 font-bold"><Code2 className="size-4 text-blue-600 dark:text-cyan-300" /> Technology count</dt><dd className="mt-1 text-muted-foreground">{data.technologies.length} included skills</dd></div>
          </dl>
          <Link className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full rounded-xl")} href="/items">Explore more <ArrowRight /></Link>
        </aside>
      </div>

      {data.related.length ? <section className="mt-12"><p className="text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-300">Keep exploring</p><h2 className="mt-2 text-3xl font-bold">Related project items</h2><div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{data.related.map((related) => <ItemCard item={related} key={related.id} />)}</div></section> : null}
    </div>
  );
}
