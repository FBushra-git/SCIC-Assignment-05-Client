"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Flame,
  Layers3,
  Route,
  Sparkles,
  Target,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ResourceCard } from "./resource-card";
import { usePublicRoadmap } from "./use-explore";

export function PublicRoadmapDetails({ slug }: { slug: string }) {
  const roadmap = usePublicRoadmap(slug);

  if (roadmap.isPending) {
    return <div className="section-shell h-[75svh] animate-pulse py-10"><div className="h-full rounded-[2rem] bg-muted" /></div>;
  }
  if (roadmap.isError || !roadmap.data) {
    return <div className="section-shell py-16 text-center"><Route className="mx-auto size-10 text-muted-foreground" /><h1 className="mt-4 text-2xl font-bold">Roadmap unavailable</h1><p className="mt-2 text-muted-foreground">{roadmap.error?.message ?? "This public roadmap was not found."}</p><Link className="mt-5 inline-flex items-center gap-2 font-bold text-blue-700 dark:text-cyan-300" href="/roadmaps"><ArrowLeft className="size-4" /> Explore roadmaps</Link></div>;
  }
  const data = roadmap.data;

  return (
    <div className="section-shell py-8 sm:py-12">
      <Link className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-cyan-300" href="/roadmaps"><ArrowLeft className="size-4" /> Back to explore</Link>
      <header className="mt-5 overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 text-white shadow-2xl shadow-blue-950/20">
        <div className="grid lg:grid-cols-[1.12fr_.88fr]">
          <div className="relative isolate p-7 sm:p-10">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950" />
            <div className="flex flex-wrap gap-2"><span className="rounded-full border border-cyan-300/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">{data.category}</span><span className="rounded-full border border-cyan-300/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">{data.difficulty}</span></div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-cyan-200">Created by {data.author}</p>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">{data.careerTitle}</h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-200">{data.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{data.technologies.map((technology) => <span className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-bold" key={technology}>{technology}</span>)}</div>
            <div className="mt-7 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3"><Clock3 className="size-4 text-cyan-200" /><strong className="mt-2 block text-lg">{data.durationWeeks}</strong><span className="text-[11px] text-slate-300">Weeks</span></div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-3"><Layers3 className="size-4 text-cyan-200" /><strong className="mt-2 block text-lg">{data.topicCount}</strong><span className="text-[11px] text-slate-300">Topics</span></div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-3"><Flame className="size-4 text-amber-300" /><strong className="mt-2 block text-lg">{data.popularity}%</strong><span className="text-[11px] text-slate-300">Popularity</span></div>
            </div>
          </div>
          <div className="relative min-h-72 lg:min-h-full"><Image alt="" className="object-cover" fill priority sizes="(min-width: 1024px) 40vw, 100vw" src={data.coverImage} /><div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 to-transparent lg:from-slate-950" /></div>
        </div>
      </header>

      <section className="glass-panel mt-6 rounded-[1.75rem] bg-white/80 p-6 sm:p-8 dark:bg-slate-900/70">
        <div className="flex items-start gap-3"><span className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-700 dark:text-cyan-300"><Target className="size-5" /></span><div><h2 className="text-xl font-bold">Learning outcomes</h2><p className="mt-1 text-sm text-muted-foreground">Evidence you should be able to demonstrate after completing this path.</p></div></div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">{data.learningOutcomes.map((outcome) => <div className="flex gap-3 rounded-2xl border border-border/70 bg-background/60 p-4 text-sm leading-6" key={outcome}><CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-500" />{outcome}</div>)}</div>
      </section>

      <section className="mt-9">
        <div><p className="text-sm font-bold uppercase tracking-[.16em] text-blue-700 dark:text-cyan-300">Roadmap timeline</p><h2 className="mt-2 text-2xl font-bold sm:text-3xl">Progressive learning phases</h2><p className="mt-2 max-w-2xl leading-7 text-muted-foreground">Every phase combines objectives with carefully selected learning resources.</p></div>
        <ol className="relative mt-7 grid gap-6 before:absolute before:bottom-8 before:left-6 before:top-8 before:w-px before:bg-gradient-to-b before:from-blue-500 before:to-cyan-400">
          {data.steps.map((step) => (
            <li className="relative pl-16" key={step.order}>
              <span className="absolute left-0 top-5 z-10 grid size-12 place-items-center rounded-full border-4 border-background bg-gradient-to-br from-blue-600 to-cyan-400 font-bold text-white">{step.order}</span>
              <article className="glass-panel rounded-[1.75rem] bg-white/80 p-5 sm:p-7 dark:bg-slate-900/70">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h3 className="text-xl font-bold">{step.title}</h3><p className="mt-2 max-w-3xl leading-7 text-muted-foreground">{step.summary}</p></div><span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-muted px-3 py-2 text-xs font-bold"><Clock3 className="size-4 text-blue-600 dark:text-cyan-300" /> {step.estimatedHours} hours</span></div>
                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{step.objectives.map((objective) => <p className="flex gap-2 text-sm leading-6 text-muted-foreground" key={objective}><CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-500" />{objective}</p>)}</div>
                <div className="mt-6 border-t border-border/70 pt-6"><h4 className="font-bold">Resources for this phase</h4><div className="mt-4 grid gap-4 xl:grid-cols-2">{step.resources.map((resource) => <ResourceCard compact key={resource.id} resource={resource} />)}</div></div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-7 text-white shadow-xl shadow-blue-500/20 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-100"><Sparkles className="size-4" /> Make this path yours</span><h2 className="mt-2 text-2xl font-bold sm:text-3xl">Generate a roadmap around your skills and weekly schedule.</h2><p className="mt-2 max-w-2xl text-blue-100">The public path gives you direction. SkillForge AI turns it into milestones personalized to your profile.</p></div><Link className={cn(buttonVariants({ size: "lg" }), "h-12 shrink-0 rounded-xl bg-white px-6 text-blue-700 hover:bg-blue-50")} href="/roadmaps/new">Personalize roadmap <ArrowRight /></Link></div>
      </section>

      {data.related.length ? <section className="mt-10"><h2 className="text-2xl font-bold">Related roadmaps</h2><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{data.related.map((item) => <Link className="glass-panel group rounded-2xl bg-white/75 p-5 transition hover:-translate-y-0.5 hover:border-blue-400 dark:bg-slate-900/65" href={`/roadmaps/${item.slug}`} key={item.slug}><span className="text-xs font-bold text-blue-700 dark:text-cyan-300">{item.difficulty} · {item.durationWeeks} weeks</span><h3 className="mt-2 text-lg font-bold">{item.careerTitle}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-cyan-300">View path <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span></Link>)}</div></section> : null}
    </div>
  );
}
