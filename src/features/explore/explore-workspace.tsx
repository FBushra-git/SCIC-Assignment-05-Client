"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Clock3,
  Filter,
  Flame,
  Layers3,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { ExploreFilters, PublicRoadmapSummary } from "./explore-data";
import { usePublicRoadmaps } from "./use-explore";

const selectClass =
  "h-11 min-w-0 rounded-xl border border-border bg-background/80 px-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

const difficultyTone = {
  Beginner: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  Intermediate: "bg-blue-500/15 text-blue-700 dark:text-cyan-300",
  Advanced: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
};

function RoadmapCard({ roadmap }: { roadmap: PublicRoadmapSummary }) {
  return (
    <article className="glass-panel group flex min-h-[31rem] flex-col overflow-hidden rounded-[1.75rem] bg-white/80 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 dark:bg-slate-900/70">
      <div className="relative h-48 overflow-hidden">
        <Image alt="" className="object-cover transition duration-500 group-hover:scale-105" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" src={roadmap.coverImage} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
        <span className={cn("absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold backdrop-blur", difficultyTone[roadmap.difficulty])}>{roadmap.difficulty}</span>
        <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-xs font-bold text-white backdrop-blur">{roadmap.category}</span>
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur"><Flame className="size-3.5" /> {roadmap.popularity}%</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-300">By {roadmap.author}</p>
        <h2 className="mt-2 text-xl font-bold">{roadmap.careerTitle}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{roadmap.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{roadmap.technologies.slice(0, 5).map((technology) => <span className="rounded-lg bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground" key={technology}>{technology}</span>)}</div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs font-bold">
          <span className="flex items-center gap-2 rounded-xl border border-border/70 p-3"><Clock3 className="size-4 text-blue-600 dark:text-cyan-300" /> {roadmap.durationWeeks} weeks</span>
          <span className="flex items-center gap-2 rounded-xl border border-border/70 p-3"><Layers3 className="size-4 text-blue-600 dark:text-cyan-300" /> {roadmap.topicCount} topics</span>
        </div>
        <Link className={cn(buttonVariants({ size: "lg" }), "mt-auto h-11 rounded-xl")} href={`/roadmaps/${roadmap.slug}`}>View details <ArrowRight /></Link>
      </div>
    </article>
  );
}

export function ExploreWorkspace({ initialCareer = "" }: { initialCareer?: string }) {
  const [filters, setFilters] = useState<ExploreFilters>({
    search: "",
    career: initialCareer,
    category: "",
    difficulty: "",
    duration: "",
    technology: "",
    popularity: "",
    sort: "newest",
    page: 1,
  });
  const deferredSearch = useDeferredValue(filters.search);
  const result = usePublicRoadmaps({ ...filters, search: deferredSearch });

  function updateFilter<Key extends keyof ExploreFilters>(
    key: Key,
    value: ExploreFilters[Key],
  ) {
    setFilters((current) => ({ ...current, [key]: value, page: 1 }));
  }

  const activeFilterCount = [
    filters.career,
    filters.category,
    filters.difficulty,
    filters.duration,
    filters.technology,
    filters.popularity,
  ].filter(Boolean).length;
  const facets = result.data?.facets;

  return (
    <div className="section-shell py-8 sm:py-12">
      <header className="relative isolate overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10">
        <div className="absolute inset-0 -z-20 bg-[url('/images/skillforge/hero-ethereal-ai.png')] bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-blue-950/90 to-cyan-950/70" />
        <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200"><Sparkles className="size-4" /> Public AI learning paths</span>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div><h1 className="max-w-3xl text-3xl font-extrabold sm:text-5xl">Explore a path before forging your own.</h1><p className="mt-4 max-w-2xl leading-7 text-slate-200">Browse practical SkillForge AI roadmaps with progressive phases, selected resources, project outcomes, and realistic durations.</p></div>
          <Link className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 rounded-xl border-white/20 bg-white/10 px-5 text-white hover:bg-white/20")} href="/resources"><BookOpenCheck /> Browse resources</Link>
        </div>
      </header>

      <section className="glass-panel mt-6 rounded-[1.75rem] bg-white/80 p-4 sm:p-5 dark:bg-slate-900/70" aria-label="Roadmap filters">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative min-w-0 flex-1"><span className="sr-only">Search roadmaps</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input className="h-11 w-full rounded-xl border border-border bg-background/80 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" onChange={(event) => updateFilter("search", event.target.value)} placeholder="Search by career, technology, or keyword…" value={filters.search} /></label>
          <select aria-label="Sort roadmaps" className={selectClass} onChange={(event) => updateFilter("sort", event.target.value as ExploreFilters["sort"])} value={filters.sort}>
            <option value="newest">Newest</option><option value="popular">Most popular</option><option value="shortest">Shortest duration</option><option value="longest">Longest duration</option><option value="alphabetical">Alphabetical</option>
          </select>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <select aria-label="Career category" className={selectClass} onChange={(event) => updateFilter("category", event.target.value)} value={filters.category}><option value="">All categories</option>{facets?.categories.map((item) => <option key={item}>{item}</option>)}</select>
          <select aria-label="Difficulty" className={selectClass} onChange={(event) => updateFilter("difficulty", event.target.value)} value={filters.difficulty}><option value="">All difficulties</option>{facets?.difficulties.map((item) => <option key={item}>{item}</option>)}</select>
          <select aria-label="Estimated duration" className={selectClass} onChange={(event) => updateFilter("duration", event.target.value)} value={filters.duration}><option value="">Any duration</option><option value="under-16">Under 16 weeks</option><option value="16-20">16–20 weeks</option><option value="over-20">Over 20 weeks</option></select>
          <select aria-label="Technology" className={selectClass} onChange={(event) => updateFilter("technology", event.target.value)} value={filters.technology}><option value="">All technologies</option>{facets?.technologies.map((item) => <option key={item}>{item}</option>)}</select>
          <select aria-label="Popularity" className={selectClass} onChange={(event) => updateFilter("popularity", event.target.value)} value={filters.popularity}><option value="">Any popularity</option><option value="trending">Trending · 90%+</option><option value="popular">Popular · 80%+</option><option value="hidden-gems">Hidden gems</option></select>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
          <p className="flex items-center gap-2 text-xs font-bold text-muted-foreground"><Filter className="size-4" /> {activeFilterCount} active filters · combine two or more to narrow precisely</p>
          {activeFilterCount || filters.search ? <Button className="rounded-xl" onClick={() => setFilters({ search: "", career: "", category: "", difficulty: "", duration: "", technology: "", popularity: "", sort: "newest", page: 1 })} size="sm" variant="ghost">Clear filters</Button> : null}
        </div>
      </section>

      <div className="mt-7 flex items-center justify-between gap-3"><p className="text-sm font-semibold text-muted-foreground">{result.data?.pagination.totalItems ?? 0} roadmaps found</p><SlidersHorizontal className="size-4 text-muted-foreground" /></div>
      {result.isPending ? <div className="mt-5 grid animate-pulse gap-5 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div className="h-[31rem] rounded-[1.75rem] bg-muted" key={index} />)}</div> : null}
      {result.isError ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">{result.error.message}</div> : null}
      {result.data?.items.length ? <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{result.data.items.map((roadmap) => <RoadmapCard key={roadmap.slug} roadmap={roadmap} />)}</div> : null}
      {result.data && !result.data.items.length ? <div className="mt-6 rounded-[2rem] border border-dashed border-border p-12 text-center"><Search className="mx-auto size-9 text-muted-foreground" /><h2 className="mt-4 text-xl font-bold">No roadmap matches those filters</h2><p className="mt-2 text-sm text-muted-foreground">Remove one filter or try a broader keyword.</p></div> : null}

      {result.data && result.data.pagination.totalPages > 1 ? <nav aria-label="Roadmap pagination" className="mt-8 flex items-center justify-center gap-3"><Button disabled={!result.data.pagination.hasPreviousPage} onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))} variant="outline">Previous</Button><span className="text-sm font-bold">Page {result.data.pagination.page} of {result.data.pagination.totalPages}</span><Button disabled={!result.data.pagination.hasNextPage} onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))} variant="outline">Next</Button></nav> : null}
    </div>
  );
}
