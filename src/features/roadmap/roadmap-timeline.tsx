"use client";

import {
  AlertCircle,
  BookOpen,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  MessageSquareQuote,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";
import { cn } from "@/lib/utils";

import type { RoadmapResource } from "./roadmap-data";
import { useRoadmap, useUpdateRoadmapStep } from "./use-roadmaps";

const resourceTime: Record<RoadmapResource["type"], string> = {
  "Official Documentation": "30–60 min",
  Video: "45–90 min",
  Course: "3–6 hours",
  Article: "15–25 min",
  Practice: "1–2 hours",
  "GitHub Repository": "45–90 min",
};

function getResourceSource(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Learning resource";
  }
}

export function RoadmapTimeline({ roadmapId }: { roadmapId: string }) {
  const router = useRouter();
  const session = authClient.useSession();
  const roadmap = useRoadmap(roadmapId, Boolean(session.data?.user));
  const updateStep = useUpdateRoadmapStep(roadmapId);
  const [expanded, setExpanded] = useState<string | null | undefined>(undefined);
  const [minutesByStep, setMinutesByStep] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!session.isPending && !session.data?.user) router.replace("/login");
  }, [router, session.data?.user, session.isPending]);

  if (session.isPending || roadmap.isPending || !session.data?.user) {
    return <div className="section-shell h-[75svh] animate-pulse py-10"><div className="h-full rounded-[2rem] bg-muted" /></div>;
  }
  if (roadmap.isError || !roadmap.data) {
    return <div className="section-shell py-16"><div className="glass-panel rounded-[2rem] p-8 text-center"><AlertCircle className="mx-auto size-9 text-destructive" /><h1 className="mt-4 text-xl font-bold">Roadmap unavailable</h1><p className="mt-2 text-muted-foreground">{roadmap.error?.message ?? "This roadmap could not be found."}</p></div></div>;
  }

  const data = roadmap.data;
  const expandedStepId =
    expanded === undefined
      ? data.steps.find((step) => !step.completed)?.id ?? data.steps[0]?.id ?? null
      : expanded;

  return (
    <div className="section-shell py-8 sm:py-12">
      <header className="overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 text-white shadow-2xl shadow-blue-950/20">
        <div className="relative isolate p-6 sm:p-9">
          <div className="absolute inset-0 -z-20 bg-[url('/images/skillforge/dashboard-ethereal-banner.png')] bg-cover bg-center opacity-55" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-blue-950/90 to-cyan-950/70" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="rounded-full border border-cyan-300/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">{data.careerGoal} · {data.experienceLevel}</span>
              <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">{data.title}</h1>
              <p className="mt-3 max-w-2xl leading-7 text-slate-200">{data.summary}</p>
            </div>
            <div className="min-w-52 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center justify-between text-sm"><span>Overall progress</span><strong>{data.progress}%</strong></div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" style={{ width: `${data.progress}%` }} /></div>
              <p className="mt-3 text-xs text-slate-300">{data.completedTopics} of {data.totalTopics} milestones complete</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-6 grid gap-4 md:grid-cols-3" aria-label="Roadmap phases">
        {data.phases.map((phase) => <article className="glass-panel rounded-2xl bg-white/75 p-5 dark:bg-slate-900/65" key={phase.title}><span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-300">Weeks {phase.startWeek}–{phase.endWeek}</span><h2 className="mt-2 font-bold">{phase.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{phase.description}</p></article>)}
      </section>

      <section className="mt-8">
        <div className="mb-5 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-700 dark:text-cyan-300"><Target className="size-5" /></span><div><h2 className="text-xl font-bold">Weekly timeline</h2><p className="text-sm text-muted-foreground">Expand a milestone to view its full learning brief.</p></div></div>
        <ol className="relative grid gap-4 before:absolute before:bottom-8 before:left-5 before:top-8 before:w-px before:bg-gradient-to-b before:from-blue-500 before:to-cyan-400 sm:before:left-7">
          {data.steps.map((step) => {
            const isOpen = expandedStepId === step.id;
            return (
              <li className="relative pl-12 sm:pl-16" key={step.id}>
                <span className={cn("absolute left-0 top-5 z-10 grid size-10 place-items-center rounded-full border-4 border-background text-xs font-extrabold sm:size-14", step.completed ? "bg-emerald-500 text-white" : "bg-gradient-to-br from-blue-600 to-cyan-400 text-white")}>{step.completed ? <Check className="size-5" /> : step.weekNumber}</span>
                <article className={cn("glass-panel overflow-hidden rounded-[1.5rem] bg-white/80 transition dark:bg-slate-900/70", step.completed && "border-emerald-400/40")}>
                  <button aria-expanded={isOpen} className="flex w-full items-center gap-4 p-5 text-left sm:p-6" onClick={() => setExpanded(isOpen ? null : step.id)} type="button">
                    <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-300">Week {step.weekNumber}</span>{step.completed ? <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">Completed</span> : null}</div><h3 className="mt-2 text-lg font-bold">{step.topicName}</h3><p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="size-3.5" /> {step.estimatedHours} estimated hours</p></div>
                    <ChevronDown className={cn("size-5 shrink-0 transition", isOpen && "rotate-180")} />
                  </button>
                  {isOpen ? (
                    <div className="border-t border-border/70 p-5 sm:p-6">
                      <div className="grid gap-6 lg:grid-cols-2">
                        <div><h4 className="flex items-center gap-2 text-sm font-bold"><BookOpen className="size-4 text-blue-600 dark:text-cyan-300" /> Learning objectives</h4><ul className="mt-3 grid gap-2">{step.objectives.map((item) => <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={item}><CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-500" />{item}</li>)}</ul></div>
                        <div><h4 className="flex items-center gap-2 text-sm font-bold"><Target className="size-4 text-blue-600 dark:text-cyan-300" /> Practice</h4><ul className="mt-3 grid gap-2">{step.practiceSuggestions.map((item) => <li className="text-sm leading-6 text-muted-foreground" key={item}>• {item}</li>)}</ul></div>
                        <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900 dark:bg-blue-950/20"><h4 className="flex items-center gap-2 text-sm font-bold"><BriefcaseBusiness className="size-4 text-blue-600 dark:text-cyan-300" /> {step.suggestedProject.title}</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{step.suggestedProject.description}</p><ul className="mt-2 text-xs leading-5 text-muted-foreground">{step.suggestedProject.deliverables.map((item) => <li key={item}>— {item}</li>)}</ul></div>
                        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/60 p-4 dark:border-cyan-900 dark:bg-cyan-950/20"><h4 className="flex items-center gap-2 text-sm font-bold"><MessageSquareQuote className="size-4 text-cyan-600" /> Interview checkpoint</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{step.interviewCheckpoint}</p></div>
                      </div>
                      <div className="mt-6">
                        <h4 className="text-sm font-bold">Recommended resources</h4>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {step.resources.map((resource) => (
                            <a
                              className="group overflow-hidden rounded-2xl border border-border bg-background/70 transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg"
                              href={resource.url}
                              key={resource.url}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <span className="relative block h-20 overflow-hidden bg-slate-950">
                                <span className="absolute inset-0 bg-[url('/images/skillforge/features-ethereal-waves-light.png')] bg-cover bg-center opacity-70 transition duration-500 group-hover:scale-105 dark:bg-[url('/images/skillforge/features-ethereal-waves.png')]" />
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-950/80 to-cyan-950/30" />
                                <span className="absolute bottom-2 left-3 rounded-lg border border-white/15 bg-slate-950/55 px-2 py-1 text-[10px] font-bold text-cyan-100 backdrop-blur">{resource.type}</span>
                              </span>
                              <span className="block p-3.5">
                                <span className="flex items-start justify-between gap-3">
                                  <strong className="line-clamp-2 text-sm leading-5">{resource.title}</strong>
                                  <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-blue-600 dark:text-cyan-300" />
                                </span>
                                <span className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold text-muted-foreground">
                                  <span>{getResourceSource(resource.url)}</span>
                                  <span aria-hidden="true">·</span>
                                  <span>{data.experienceLevel}</span>
                                  <span aria-hidden="true">·</span>
                                  <span>{resourceTime[resource.type]}</span>
                                </span>
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row sm:items-end">
                        {!step.completed ? <label className="grid gap-1.5 text-xs font-bold">Minutes studied (optional)<input className="h-10 w-40 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-blue-500" min={0} onChange={(event) => setMinutesByStep((value) => ({ ...value, [step.id]: event.target.value }))} placeholder="e.g. 90" type="number" value={minutesByStep[step.id] ?? ""} /></label> : null}
                        <Button className="h-10 rounded-xl px-4" disabled={updateStep.isPending} onClick={() => updateStep.mutate({ roadmapId, stepId: step.id, completed: !step.completed, ...(minutesByStep[step.id] ? { studyMinutes: Number(minutesByStep[step.id]) } : {}) })} variant={step.completed ? "outline" : "default"}>{step.completed ? "Mark unfinished" : <><CheckCircle2 /> Mark week complete</>}</Button>
                      </div>
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
