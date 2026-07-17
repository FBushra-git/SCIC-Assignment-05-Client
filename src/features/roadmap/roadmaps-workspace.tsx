"use client";

import { ArrowRight, CalendarDays, Clock3, Plus, Route, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";
import { cn } from "@/lib/utils";

import { useRoadmaps } from "./use-roadmaps";

export function RoadmapsWorkspace() {
  const router = useRouter();
  const session = authClient.useSession();
  const roadmaps = useRoadmaps(Boolean(session.data?.user));

  useEffect(() => {
    if (!session.isPending && !session.data?.user) router.replace("/login");
  }, [router, session.data?.user, session.isPending]);

  if (session.isPending || roadmaps.isPending || !session.data?.user) {
    return <div className="section-shell h-[70svh] animate-pulse py-10"><div className="h-full rounded-[2rem] bg-muted" /></div>;
  }

  return (
    <div className="section-shell py-8 sm:py-12">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-cyan-300"><Route className="size-4" /> Learning plans</span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">My roadmaps</h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">Continue your active plan or review the learning paths you generated previously.</p>
        </div>
        <Link className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-xl px-5")} href="/roadmaps/new"><Plus /> Generate roadmap</Link>
      </header>

      {roadmaps.isError ? <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">{roadmaps.error.message}</div> : null}
      {roadmaps.data?.length ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {roadmaps.data.map((roadmap) => (
            <article className="glass-panel flex min-h-80 flex-col rounded-[1.75rem] bg-white/80 p-6 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 dark:bg-slate-900/70" key={roadmap.id}>
              <div className="flex items-center justify-between gap-3">
                <span className={cn("rounded-full px-3 py-1 text-xs font-bold capitalize", roadmap.status === "active" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : roadmap.status === "completed" ? "bg-blue-500/10 text-blue-700 dark:text-cyan-300" : "bg-muted text-muted-foreground")}>{roadmap.status}</span>
                <span className="text-xs font-bold text-muted-foreground">{roadmap.progress}% complete</span>
              </div>
              <h2 className="mt-5 text-xl font-bold leading-7">{roadmap.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{roadmap.summary}</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" style={{ width: `${roadmap.progress}%` }} /></div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-border/70 p-3"><CalendarDays className="size-4 text-blue-600 dark:text-cyan-300" /><span className="mt-2 block font-bold">{roadmap.totalWeeks} weeks</span></div>
                <div className="rounded-xl border border-border/70 p-3"><Clock3 className="size-4 text-blue-600 dark:text-cyan-300" /><span className="mt-2 block font-bold">{roadmap.weeklyStudyHours} hrs/week</span></div>
              </div>
              <Link className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-blue-700 hover:text-blue-500 dark:text-cyan-300" href={`/my-roadmaps/${roadmap.id}`}>{roadmap.status === "active" ? "Continue learning" : "View roadmap"} <ArrowRight className="size-4" /></Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="glass-panel mt-8 rounded-[2rem] bg-white/75 p-10 text-center dark:bg-slate-900/65">
          <Sparkles className="mx-auto size-10 text-blue-600 dark:text-cyan-300" />
          <h2 className="mt-4 text-xl font-bold">Your first roadmap is waiting</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">Tell SkillForge where you want to go and Gemini will create the progressive plan.</p>
          <Link className={cn(buttonVariants({ size: "lg" }), "mt-5 h-11 rounded-xl px-5")} href="/roadmaps/new">Generate roadmap</Link>
        </div>
      )}
    </div>
  );
}
