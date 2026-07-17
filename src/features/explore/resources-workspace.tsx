"use client";

import { BookOpenCheck, Filter, Search, Sparkles } from "lucide-react";
import { useDeferredValue, useState } from "react";

import { Button } from "@/components/ui/button";

import type { ResourceFilters } from "./explore-data";
import { ResourceCard } from "./resource-card";
import { useLearningResources } from "./use-explore";

const selectClass =
  "h-11 min-w-0 rounded-xl border border-border bg-background/80 px-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export function ResourcesWorkspace() {
  const [filters, setFilters] = useState<ResourceFilters>({
    search: "",
    type: "",
    difficulty: "",
    technology: "",
    page: 1,
  });
  const deferredSearch = useDeferredValue(filters.search);
  const result = useLearningResources({ ...filters, search: deferredSearch });

  function updateFilter<Key extends keyof ResourceFilters>(
    key: Key,
    value: ResourceFilters[Key],
  ) {
    setFilters((current) => ({ ...current, [key]: value, page: 1 }));
  }

  const facets = result.data?.facets;
  const activeCount = [
    filters.type,
    filters.difficulty,
    filters.technology,
  ].filter(Boolean).length;

  return (
    <div className="section-shell py-8 sm:py-12">
      <header className="relative isolate overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 px-6 py-11 text-white sm:px-10">
        <div className="absolute inset-0 -z-20 bg-[url('/images/skillforge/features-ethereal-waves.png')] bg-cover bg-center opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-blue-950/90 to-cyan-950/70" />
        <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200"><Sparkles className="size-4" /> Carefully selected learning material</span>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-5xl">Resources that support the work, not distract from it.</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-200">Explore official documentation, tutorials, courses, challenges, articles, and practice platforms organized by difficulty and technology.</p>
      </header>

      <section className="glass-panel mt-6 rounded-[1.75rem] bg-white/80 p-4 sm:p-5 dark:bg-slate-900/70" aria-label="Resource filters">
        <label className="relative block"><span className="sr-only">Search resources</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input className="h-11 w-full rounded-xl border border-border bg-background/80 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" onChange={(event) => updateFilter("search", event.target.value)} placeholder="Search title, source, or technology…" value={filters.search} /></label>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <select aria-label="Resource type" className={selectClass} onChange={(event) => updateFilter("type", event.target.value)} value={filters.type}><option value="">All resource types</option>{facets?.types.map((item) => <option key={item}>{item}</option>)}</select>
          <select aria-label="Resource difficulty" className={selectClass} onChange={(event) => updateFilter("difficulty", event.target.value)} value={filters.difficulty}><option value="">All difficulties</option>{facets?.difficulties.map((item) => <option key={item}>{item}</option>)}</select>
          <select aria-label="Resource technology" className={selectClass} onChange={(event) => updateFilter("technology", event.target.value)} value={filters.technology}><option value="">All technologies</option>{facets?.technologies.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-4"><p className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><Filter className="size-4" /> {activeCount} active filters</p>{activeCount || filters.search ? <Button onClick={() => setFilters({ search: "", type: "", difficulty: "", technology: "", page: 1 })} size="sm" variant="ghost">Clear filters</Button> : null}</div>
      </section>

      <p className="mt-7 text-sm font-semibold text-muted-foreground">{result.data?.pagination.totalItems ?? 0} resources available</p>
      {result.isPending ? <div className="mt-5 grid animate-pulse gap-5 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <div className="h-[26rem] rounded-2xl bg-muted" key={index} />)}</div> : null}
      {result.isError ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">{result.error.message}</div> : null}
      {result.data?.items.length ? <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{result.data.items.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</div> : null}
      {result.data && !result.data.items.length ? <div className="mt-6 rounded-[2rem] border border-dashed border-border p-12 text-center"><BookOpenCheck className="mx-auto size-9 text-muted-foreground" /><h2 className="mt-4 text-xl font-bold">No matching resources</h2><p className="mt-2 text-sm text-muted-foreground">Try a broader keyword or remove a filter.</p></div> : null}
      {result.data && result.data.pagination.totalPages > 1 ? <nav aria-label="Resource pagination" className="mt-8 flex items-center justify-center gap-3"><Button disabled={!result.data.pagination.hasPreviousPage} onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))} variant="outline">Previous</Button><span className="text-sm font-bold">Page {result.data.pagination.page} of {result.data.pagination.totalPages}</span><Button disabled={!result.data.pagination.hasNextPage} onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))} variant="outline">Next</Button></nav> : null}
    </div>
  );
}
