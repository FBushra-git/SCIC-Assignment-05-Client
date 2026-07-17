"use client";

import { BarChart3, BrainCircuit, Clock3, Flame, FolderCheck, PieChart as PieChartIcon, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import type { DashboardData } from "./dashboard-data";

const learningConfig = {
  completedLessons: { label: "Completed lessons", color: "var(--chart-1)" },
} satisfies ChartConfig;

const studyConfig = {
  hours: { label: "Study hours", color: "var(--chart-2)" },
} satisfies ChartConfig;

const monthlyConfig = {
  completedLessons: { label: "Lessons", color: "var(--chart-1)" },
  studyHours: { label: "Study hours", color: "var(--chart-3)" },
} satisfies ChartConfig;

const projectConfig = {
  value: { label: "Projects", color: "var(--chart-4)" },
} satisfies ChartConfig;

const skillColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];

function ChartCard({
  children,
  description,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  description: string;
  icon: typeof TrendingUp;
  title: string;
}) {
  return (
    <article className="glass-panel rounded-[1.75rem] bg-white/75 p-5 shadow-xl shadow-slate-900/5 sm:p-6 dark:bg-slate-900/65">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-300">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </article>
  );
}

export function DashboardCharts({ analytics }: { analytics: DashboardData["analytics"] }) {
  const skillTotal = analytics.skillsDistribution.reduce((total, item) => total + item.value, 0);
  const projectTotal = analytics.projectCompletion.reduce((total, item) => total + item.value, 0);

  return (
    <section className="mt-8" aria-labelledby="analytics-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-cyan-300">
            Learning analytics
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl" id="analytics-title">
            Turn your activity into direction
          </h2>
          <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
            Live charts reveal learning consistency, skill balance, project momentum, and streaks.
          </p>
        </div>
        <div className="inline-flex items-center gap-3 self-start rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-orange-800 dark:text-orange-200 sm:self-auto">
          <Flame aria-hidden="true" className="size-5" />
          <div>
            <span className="block text-lg font-extrabold tabular-nums">{analytics.learningStreak} days</span>
            <span className="text-xs font-semibold">Current learning streak</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <ChartCard
            description="Completed milestones and recorded study hours across the last six months."
            icon={BarChart3}
            title="Monthly progress"
          >
            <ChartContainer className="h-72 w-full" config={monthlyConfig}>
              <AreaChart accessibilityLayer data={analytics.monthlyProgress} margin={{ left: 0, right: 8 }}>
                <defs>
                  <linearGradient id="monthlyLessonFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-completedLessons)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-completedLessons)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis axisLine={false} dataKey="month" tickLine={false} tickMargin={10} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={28} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
                <Area dataKey="completedLessons" fill="url(#monthlyLessonFill)" stroke="var(--color-completedLessons)" strokeWidth={2.5} type="monotone" />
                <Area dataKey="studyHours" fill="transparent" stroke="var(--color-studyHours)" strokeDasharray="5 4" strokeWidth={2} type="monotone" />
              </AreaChart>
            </ChartContainer>
          </ChartCard>
        </div>
        <ChartCard
          description="Lessons completed during each of the last six weeks."
          icon={TrendingUp}
          title="Learning progress"
        >
          <ChartContainer className="h-72 w-full" config={learningConfig}>
            <AreaChart accessibilityLayer data={analytics.learningProgress} margin={{ left: 0, right: 8 }}>
              <defs>
                <linearGradient id="dashboardLearningFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-completedLessons)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-completedLessons)" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis axisLine={false} dataKey="week" tickLine={false} tickMargin={10} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={26} />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
              <Area
                dataKey="completedLessons"
                fill="url(#dashboardLearningFill)"
                stroke="var(--color-completedLessons)"
                strokeWidth={2.5}
                type="monotone"
              />
            </AreaChart>
          </ChartContainer>
        </ChartCard>

        <ChartCard
          description="Hours recorded across the current seven-day window."
          icon={Clock3}
          title="Weekly study time"
        >
          <ChartContainer className="h-72 w-full" config={studyConfig}>
            <BarChart accessibilityLayer data={analytics.weeklyStudyTime} margin={{ left: 0, right: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis axisLine={false} dataKey="day" tickLine={false} tickMargin={10} />
              <YAxis axisLine={false} tickLine={false} width={28} unit="h" />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Bar dataKey="hours" fill="var(--color-hours)" radius={[8, 8, 2, 2]} />
            </BarChart>
          </ChartContainer>
        </ChartCard>

        <ChartCard
          description="How your mapped skills are distributed across learning states."
          icon={PieChartIcon}
          title="Skills distribution"
        >
          {skillTotal ? (
            <div className="grid items-center gap-4 sm:grid-cols-[1fr_170px]">
              <ChartContainer className="h-64 w-full" config={{}}>
                <PieChart accessibilityLayer>
                  <Pie
                    data={analytics.skillsDistribution}
                    dataKey="value"
                    innerRadius={58}
                    nameKey="name"
                    outerRadius={92}
                    paddingAngle={4}
                    strokeWidth={0}
                  >
                    {analytics.skillsDistribution.map((item, index) => (
                      <Cell fill={skillColors[index]} key={item.name} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                </PieChart>
              </ChartContainer>
              <div className="grid gap-3">
                {analytics.skillsDistribution.map((item, index) => (
                  <div className="flex items-center justify-between gap-4 text-sm" key={item.name}>
                    <span className="inline-flex items-center gap-2 font-semibold text-muted-foreground">
                      <span className="size-2.5 rounded-full" style={{ background: skillColors[index] }} />
                      {item.name}
                    </span>
                    <span className="font-bold tabular-nums">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid h-64 place-items-center rounded-2xl border border-dashed border-border text-center">
              <div>
                <BrainCircuit aria-hidden="true" className="mx-auto size-8 text-muted-foreground" />
                <p className="mt-3 font-bold">No skills mapped yet</p>
                <p className="mt-1 text-sm text-muted-foreground">Add skills in your profile to populate this chart.</p>
              </div>
            </div>
          )}
        </ChartCard>

        <ChartCard
          description="Planned, active, and completed portfolio projects."
          icon={FolderCheck}
          title="Project completion"
        >
          <div className="relative">
            <ChartContainer className="h-64 w-full" config={projectConfig}>
              <BarChart accessibilityLayer data={analytics.projectCompletion} margin={{ left: 0, right: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis axisLine={false} dataKey="name" tickLine={false} tickMargin={10} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={26} />
                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                <Bar dataKey="value" fill="var(--color-value)" radius={[8, 8, 2, 2]} />
              </BarChart>
            </ChartContainer>
            {!projectTotal ? (
              <div className="pointer-events-none absolute inset-0 grid place-items-center bg-card/55 text-center backdrop-blur-[1px]">
                <div>
                  <BarChart3 aria-hidden="true" className="mx-auto size-8 text-muted-foreground" />
                  <p className="mt-3 font-bold">No projects yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">Project progress will appear here.</p>
                </div>
              </div>
            ) : null}
          </div>
        </ChartCard>
      </div>
    </section>
  );
}
