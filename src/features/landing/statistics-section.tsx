"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  Clock3,
  FolderCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { SectionHeading } from "@/components/shared/section-heading";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { usePlatformStats } from "@/features/platform/use-platform";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
};

const chartConfig = {
  learners: { label: "Learners", color: "var(--chart-1)" },
  roadmaps: { label: "AI roadmaps", color: "var(--chart-2)" },
} satisfies ChartConfig;

function AnimatedNumber({ value, suffix = "" }: Pick<Stat, "value" | "suffix">) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const controls = animate(0, value, {
      duration: 1.25,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value]);

  return (
    <span className="tabular-nums" ref={ref}>
      {new Intl.NumberFormat("en-US").format(shouldReduceMotion && isInView ? value : displayValue)}
      {suffix}
    </span>
  );
}

function ProgressRing({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        aria-label={`${label}: ${value}%`}
        className="grid size-20 shrink-0 place-items-center rounded-full"
        role="img"
        style={{ background: `conic-gradient(${color} ${value}%, var(--muted) 0)` }}
      >
        <div className="grid size-14 place-items-center rounded-full bg-card font-heading text-lg font-bold tabular-nums">
          {value}%
        </div>
      </div>
      <div>
        <p className="font-heading font-bold">{label}</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Measured across active learning plans
        </p>
      </div>
    </div>
  );
}

export function StatisticsSection() {
  const platformStats = usePlatformStats();
  const data = platformStats.data;
  const stats: Stat[] = [
    { label: "Registered Learners", value: data?.registeredLearners ?? 0, icon: UsersRound },
    { label: "AI Roadmaps Generated", value: data?.aiRoadmapsGenerated ?? 0, icon: BrainCircuit },
    { label: "Projects Completed", value: data?.projectsCompleted ?? 0, icon: FolderCheck },
    { label: "Interview Questions", value: data?.interviewQuestionsGenerated ?? 0, icon: BookOpenCheck },
    { label: "Roadmap Success Rate", value: data?.successRate ?? 0, suffix: "%", icon: BadgeCheck },
    { label: "Logged Learning Hours", value: data?.learningHours ?? 0, icon: Clock3 },
  ];
  const activityData = data?.activity ?? [];
  const projectParticipation = data?.registeredLearners
    ? Math.min(100, Math.round((data.projectsCompleted / data.registeredLearners) * 100))
    : 0;
  const learningConsistency = data?.registeredLearners
    ? Math.min(100, Math.round((data.learningHours / (data.registeredLearners * 10)) * 100))
    : 0;

  return (
    <section className="py-20 sm:py-24 lg:py-32" id="statistics">
      <div className="section-shell">
        <SectionHeading
          description="A clear view of learning activity helps learners celebrate momentum and helps SkillForge improve every recommendation."
          eyebrow="Learning momentum"
          title="Progress you can see and act on"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article className="rounded-2xl border border-border bg-card p-5 shadow-sm" key={stat.label}>
                <span className="grid size-10 place-items-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <p className="mt-5 font-heading text-2xl font-bold tracking-tight">{platformStats.isPending ? <span className="inline-block h-7 w-16 animate-pulse rounded bg-muted" /> : <AnimatedNumber suffix={stat.suffix} value={stat.value} />}</p>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{stat.label}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <article className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <div>
              <p className="font-heading text-xl font-bold">Platform growth</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                New learner profiles and AI roadmaps created in each of the last six months
              </p>
            </div>

            <div aria-label="Area chart showing monthly platform growth" className="mt-6" role="img">
              <ChartContainer className="h-72 w-full" config={chartConfig}>
                <AreaChart accessibilityLayer data={activityData} margin={{ left: 4, right: 4 }}>
                  <defs>
                    <linearGradient id="fillLearners" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-learners)" stopOpacity={0.36} />
                      <stop offset="95%" stopColor="var(--color-learners)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="fillRoadmaps" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-roadmaps)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-roadmaps)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis axisLine={false} dataKey="month" tickLine={false} tickMargin={10} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
                  <Area
                    dataKey="roadmaps"
                    fill="url(#fillRoadmaps)"
                    stroke="var(--color-roadmaps)"
                    strokeWidth={2.5}
                    type="monotone"
                  />
                  <Area
                    dataKey="learners"
                    fill="url(#fillLearners)"
                    stroke="var(--color-learners)"
                    strokeWidth={2.5}
                    type="monotone"
                  />
                </AreaChart>
              </ChartContainer>
            </div>

            <table className="sr-only">
              <caption>Monthly registered learners and AI roadmaps generated</caption>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Learners</th>
                  <th>Roadmaps</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((item) => (
                  <tr key={item.month}>
                    <td>{item.month}</td>
                    <td>{item.learners}</td>
                    <td>{item.roadmaps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <p className="font-heading text-xl font-bold">Learning outcomes</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Signals that show whether learning plans are creating consistent progress.
            </p>
            <div className="mt-7 grid gap-7">
              <ProgressRing color="var(--chart-3)" label="Roadmap completion" value={data?.successRate ?? 0} />
              <ProgressRing color="var(--chart-2)" label="Learners completing projects" value={projectParticipation} />
              <ProgressRing color="var(--chart-4)" label="Ten-hour learning baseline" value={learningConsistency} />
            </div>
          </article>
        </div>
        {platformStats.isError ? <p className="mt-4 rounded-xl border border-destructive/25 bg-destructive/10 p-3 text-sm font-semibold text-destructive">Live platform activity is temporarily unavailable.</p> : null}
      </div>
    </section>
  );
}
