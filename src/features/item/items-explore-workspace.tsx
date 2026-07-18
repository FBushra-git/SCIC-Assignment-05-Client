"use client";

import { Filter, FolderKanban, Plus, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ItemCard } from "./item-card";
import type { ItemFilters } from "./item-data";
import { usePublicItems } from "./use-items";

const selectClass =
  "h-11 min-w-0 rounded-xl border border-border bg-background/80 px-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export function ItemsExploreWorkspace() {
  const [filters, setFilters] = useState<ItemFilters>({
    search: "",
    priority: "",
    technology: "",
    sort: "newest",
    page: 1,
  });
  const deferredSearch = useDeferredValue(filters.search);
  const result = usePublicItems({ ...filters, search: deferredSearch });

  function update<Key extends keyof ItemFilters>(key: Key, value: ItemFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value, page: 1 }));
  }

  return (
    <div className="section-shell py-8 sm:py-12">
      <header className="relative isolate overflow-hidden rounded-2xl bg-slate-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10">
        <div className="absolute inset-0 -z-20 bg-[url('/images/projects/design-system-lab-photo.webp')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-blue-950/95 to-cyan-950/75" />
        <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200"><FolderKanban className="size-4" /> Community project briefs</span>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div><h1 className="max-w-3xl text-3xl font-extrabold sm:text-5xl">Explore projects built for real skill growth.</h1><p className="mt-4 max-w-2xl leading-7 text-slate-200">Search public learner-created project briefs by technology and difficulty, then open the complete specification.</p></div>
          <Link className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-xl bg-white px-5 text-blue-700 hover:bg-blue-50")} href="/items/add"><Plus /> Add your project</Link>
        </div>
      </header>

      <section className="glass-panel mt-6 rounded-2xl bg-white/80 p-4 sm:p-5 dark:bg-slate-900/70" aria-label="Project filters">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_12rem_12rem_12rem]">
          <label className="relative"><span className="sr-only">Search projects</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input className="h-11 w-full rounded-xl border border-border bg-background/80 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" onChange={(event) => update("search", event.target.value)} placeholder="Search title, description, or technology…" value={filters.search} /></label>
          <select aria-label="Difficulty" className={selectClass} onChange={(event) => update("priority", event.target.value)} value={filters.priority}><option value="">All difficulties</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
          <select aria-label="Technology" className={selectClass} onChange={(event) => update("technology", event.target.value)} value={filters.technology}><option value="">All technologies</option>{result.data?.facets.technologies.map((technology) => <option key={technology}>{technology}</option>)}</select>
          <select aria-label="Sort projects" className={selectClass} onChange={(event) => update("sort", event.target.value as ItemFilters["sort"])} value={filters.sort}><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="alphabetical">Alphabetical</option><option value="deadline">Nearest deadline</option></select>
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs font-bold text-muted-foreground"><Filter className="size-4" /> Search and both filters work together.</p>
      </section>

      <p className="mt-7 text-sm font-semibold text-muted-foreground">{result.data?.pagination.totalItems ?? 0} public projects</p>
      {result.isPending ? <div className="mt-5 grid animate-pulse gap-5 md:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <div className="h-[31rem] rounded-2xl bg-muted" key={index} />)}</div> : null}
      {result.isError ? <p className="mt-5 rounded-2xl border border-destructive/25 bg-destructive/10 p-5 text-destructive">{result.error.message}</p> : null}
      {result.data?.items.length ? <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{result.data.items.map((item) => <ItemCard item={item} key={item.id} />)}</div> : null}
      {result.data && !result.data.items.length ? <div className="mt-6 rounded-2xl border border-dashed border-border p-12 text-center"><Sparkles className="mx-auto size-10 text-blue-600 dark:text-cyan-300" /><h2 className="mt-4 text-xl font-bold">Be the first to publish a project brief</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">The library only displays projects created by real SkillForge users.</p><Link className={cn(buttonVariants({ size: "lg" }), "mt-5 h-11 rounded-xl")} href="/items/add">Add project</Link></div> : null}
      {result.data && result.data.pagination.totalPages > 1 ? <nav aria-label="Project pagination" className="mt-8 flex items-center justify-center gap-3"><Button disabled={!result.data.pagination.hasPreviousPage} onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))} variant="outline">Previous</Button><span className="text-sm font-bold">Page {result.data.pagination.page} of {result.data.pagination.totalPages}</span><Button disabled={!result.data.pagination.hasNextPage} onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))} variant="outline">Next</Button></nav> : null}
    </div>
  );
}
