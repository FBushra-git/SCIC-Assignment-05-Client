import { BrainCircuit, Clock3, Quote, Sparkles, Target } from "lucide-react";

import type { DashboardData } from "./dashboard-data";

export function DashboardBanner({ data }: { data: DashboardData }) {
  const targetProgress = data.banner.weeklyTargetHours
    ? Math.min(100, Math.round((data.banner.studiedHours / data.banner.weeklyTargetHours) * 100))
    : 0;

  return (
    <section className="dashboard-banner relative overflow-hidden rounded-[2rem] border border-white/20 p-6 text-white shadow-2xl shadow-blue-950/15 sm:p-8 lg:p-10">
      <div className="absolute -right-20 -top-24 size-80 rounded-full bg-cyan-300/15 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 size-80 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-100 backdrop-blur-xl">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Your learning workspace
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Welcome back, {data.user.firstName}!
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            Ready to continue your learning journey? Your next focused step is waiting.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-slate-950/25 px-3.5 py-2 text-sm font-semibold backdrop-blur-xl">
              <Target aria-hidden="true" className="size-4 text-cyan-200" />
              {data.user.careerGoal || "Choose your career goal"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-slate-950/25 px-3.5 py-2 text-sm font-semibold backdrop-blur-xl">
              <BrainCircuit aria-hidden="true" className="size-4 text-cyan-200" />
              Personalized guidance active
            </span>
          </div>
        </div>

        <aside className="rounded-3xl border border-white/15 bg-slate-950/35 p-5 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-cyan-100">
              <Quote aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-100">
                This week&apos;s motivation
              </p>
              <blockquote className="mt-2 text-sm font-semibold leading-6 text-white">
                “{data.banner.quote}”
              </blockquote>
            </div>
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between gap-3 text-xs font-bold">
              <span className="inline-flex items-center gap-1.5 text-slate-200">
                <Clock3 aria-hidden="true" className="size-3.5" />
                Weekly study goal
              </span>
              <span className="text-cyan-100">
                {data.banner.studiedHours}/{data.banner.weeklyTargetHours}h
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-[width] duration-500"
                style={{ width: `${targetProgress}%` }}
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
