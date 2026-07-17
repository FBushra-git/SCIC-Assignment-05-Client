"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  CheckCircle2,
  CircleDot,
  Clock3,
  Code2,
  FileQuestion,
  FolderKanban,
  GraduationCap,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  Plus,
  Rocket,
  Route,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { useRefreshRecommendations } from "@/features/recommendation/use-recommendations";
import { cn } from "@/lib/utils";

import type {
  DashboardActivity,
  DashboardData,
  DashboardSuggestion,
} from "./dashboard-data";

function WidgetCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "glass-panel rounded-[1.75rem] bg-white/75 p-5 shadow-xl shadow-slate-900/5 sm:p-6 dark:bg-slate-900/65",
        className,
      )}
    >
      {children}
    </article>
  );
}

function WidgetHeading({
  description,
  icon: Icon,
  title,
}: {
  description: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-300">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div>
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function MetricRing({
  color,
  label,
  percentage,
  value,
}: {
  color: string;
  label: string;
  percentage: number;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/60 p-4 text-center dark:bg-slate-950/25">
      <div
        aria-label={`${label}: ${value}`}
        className="mx-auto grid size-20 place-items-center rounded-full p-2"
        role="img"
        style={{ background: `conic-gradient(${color} ${percentage}%, var(--muted) 0)` }}
      >
        <div className="grid size-full place-items-center rounded-full bg-card text-sm font-extrabold tabular-nums">
          {value}
        </div>
      </div>
      <p className="mt-3 text-xs font-bold leading-5 text-muted-foreground">{label}</p>
    </div>
  );
}

export function CurrentRoadmapWidget({ data }: { data: DashboardData }) {
  const roadmap = data.currentRoadmap;

  return (
    <WidgetCard>
      <WidgetHeading
        description="The active learning plan guiding your next milestone."
        icon={Route}
        title="Current roadmap"
      />

      {roadmap ? (
        <div className="mt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-700 dark:text-cyan-300">
                Week {roadmap.currentWeek} of {roadmap.totalWeeks}
              </span>
              <h3 className="mt-4 text-xl font-bold">{roadmap.title}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpenCheck aria-hidden="true" className="size-4 text-blue-600 dark:text-cyan-300" />
                Next: {roadmap.nextLesson}
              </p>
            </div>
            <div className="rounded-2xl bg-muted/60 px-4 py-3 text-center">
              <span className="block text-2xl font-extrabold tabular-nums">{roadmap.progress}%</span>
              <span className="text-xs font-semibold text-muted-foreground">complete</span>
            </div>
          </div>

          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400"
              style={{ width: `${roadmap.progress}%` }}
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border/70 p-3">
              <p className="text-xs font-semibold text-muted-foreground">Remaining topics</p>
              <p className="mt-1 font-bold">{roadmap.remainingTopics}</p>
            </div>
            <div className="rounded-xl border border-border/70 p-3">
              <p className="text-xs font-semibold text-muted-foreground">Estimated completion</p>
              <p className="mt-1 font-bold">
                {roadmap.estimatedCompletion
                  ? new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "UTC",
                    }).format(new Date(roadmap.estimatedCompletion))
                  : "Not scheduled"}
              </p>
            </div>
          </div>
          <Link className={cn(buttonVariants({ size: "lg" }), "mt-5 h-11 rounded-xl px-5")} href="/my-roadmaps">
            Continue learning
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-blue-300 bg-blue-50/50 p-7 text-center dark:border-cyan-800 dark:bg-cyan-950/15">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/20">
            <Route aria-hidden="true" className="size-6" />
          </span>
          <h3 className="mt-4 font-bold">No active roadmap yet</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Generate a plan based on your skills, career goal, and weekly availability.
          </p>
          <Link className={cn(buttonVariants({ size: "lg" }), "mt-5 h-11 rounded-xl px-5")} href="/roadmaps/new">
            <Sparkles aria-hidden="true" />
            Generate roadmap
          </Link>
        </div>
      )}
    </WidgetCard>
  );
}

export function ProgressTrackerWidget({ data }: { data: DashboardData }) {
  const totalSkills = data.progress.completedSkills + data.progress.remainingSkills;
  const completedPercentage = totalSkills
    ? Math.round((data.progress.completedSkills / totalSkills) * 100)
    : 0;
  const remainingPercentage = totalSkills ? 100 - completedPercentage : 0;

  return (
    <WidgetCard>
      <WidgetHeading
        description="A live summary of learning and skill momentum."
        icon={Target}
        title="Progress tracker"
      />
      <div className="mt-6 grid grid-cols-2 gap-3">
        <MetricRing color="var(--chart-1)" label="Overall completion" percentage={data.progress.overallCompletion} value={`${data.progress.overallCompletion}%`} />
        <MetricRing color="var(--chart-2)" label="Weekly progress" percentage={data.progress.weeklyProgress} value={`${data.progress.weeklyProgress}%`} />
        <MetricRing color="var(--chart-3)" label="Completed skills" percentage={completedPercentage} value={`${data.progress.completedSkills}`} />
        <MetricRing color="var(--chart-4)" label="Remaining skills" percentage={remainingPercentage} value={`${data.progress.remainingSkills}`} />
      </div>
    </WidgetCard>
  );
}

const suggestionIcons: Record<DashboardSuggestion["type"], LucideIcon> = {
  learning: GraduationCap,
  project: Rocket,
  interview: FileQuestion,
  resource: BookOpenCheck,
};

export function SuggestionsWidget({ suggestions }: { suggestions: DashboardSuggestion[] }) {
  const refresh = useRefreshRecommendations();

  return (
    <WidgetCard className="lg:col-span-2">
      <WidgetHeading
        description="Next steps shaped by your profile, goals, and current skill state."
        icon={BrainCircuit}
        title="AI suggestions"
      />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/50 px-3 py-2">
        <p className="text-xs text-muted-foreground">
          Refresh after changing your profile, roadmap progress, or projects.
        </p>
        <Button
          className="rounded-lg"
          disabled={refresh.isPending}
          onClick={() => refresh.mutate()}
          size="sm"
          variant="outline"
        >
          <Sparkles className={refresh.isPending ? "animate-pulse" : ""} />
          {refresh.isPending ? "Analyzing…" : "Refresh with AI"}
        </Button>
      </div>
      {refresh.isError ? (
        <p className="mt-3 text-xs font-semibold text-destructive">
          {refresh.error.message}
        </p>
      ) : null}
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {suggestions.map((suggestion) => {
          const Icon = suggestionIcons[suggestion.type];
          return (
            <div className="group flex flex-col rounded-2xl border border-border/70 bg-background/60 p-4 transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 dark:bg-slate-950/25" key={suggestion.id}>
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-4 font-bold leading-6">{suggestion.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{suggestion.description}</p>
              <Link className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-500 dark:text-cyan-300" href={suggestion.href}>
                {suggestion.actionLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </WidgetCard>
  );
}

const activityIcons: Record<string, LucideIcon> = {
  lesson_completed: CheckCircle2,
  project_added: FolderKanban,
  project_completed: Trophy,
  roadmap_generated: Route,
  ai_conversation: MessageSquareText,
  interview_session_generated: FileQuestion,
  interview_question_completed: Trophy,
  profile_updated: CircleDot,
};

function relativeActivityTime(value: string) {
  const difference = new Date(value).getTime() - Date.now();
  const minutes = Math.round(difference / 60_000);
  if (Math.abs(minutes) < 60) return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(hours, "hour");
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(Math.round(hours / 24), "day");
}

export function RecentActivityWidget({ activities }: { activities: DashboardActivity[] }) {
  return (
    <WidgetCard>
      <WidgetHeading
        description="Your latest lessons, projects, roadmaps, and mentor moments."
        icon={ListChecks}
        title="Recent activity"
      />
      {activities.length ? (
        <ol className="mt-6 grid gap-1">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type] ?? CircleDot;
            return (
              <li className="relative flex gap-3 pb-5 last:pb-0" key={activity.id}>
                <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-700 dark:text-cyan-300">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="text-sm font-bold">{activity.title}</p>
                    <time className="text-[11px] font-semibold text-muted-foreground" dateTime={activity.createdAt}>
                      {relativeActivityTime(activity.createdAt)}
                    </time>
                  </div>
                  {activity.description ? <p className="mt-1 text-xs leading-5 text-muted-foreground">{activity.description}</p> : null}
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-7 text-center">
          <Clock3 aria-hidden="true" className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 font-bold">No activity yet</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">Complete your profile or begin a roadmap to start your timeline.</p>
        </div>
      )}
    </WidgetCard>
  );
}

const quickActions: Array<{
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}> = [
  { title: "Generate roadmap", description: "Create a personalized plan", href: "/roadmaps/new", icon: Plus },
  { title: "Continue learning", description: "Resume your active roadmap", href: "/my-roadmaps", icon: BookOpenCheck },
  { title: "Open AI mentor", description: "Ask a contextual question", href: "/mentor", icon: Bot },
  { title: "Browse projects", description: "Find portfolio ideas", href: "/my-projects", icon: Code2 },
  { title: "Practice interviews", description: "Strengthen your answers", href: "/interview", icon: Trophy },
];

export function QuickActionsWidget() {
  return (
    <WidgetCard>
      <WidgetHeading
        description="Jump directly into the work that moves your career forward."
        icon={Lightbulb}
        title="Quick actions"
      />
      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {quickActions.map(({ description, href, icon: Icon, title }) => (
          <Link className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 p-3.5 outline-none transition hover:border-blue-400 hover:bg-blue-50/70 focus-visible:ring-4 focus-visible:ring-blue-500/15 dark:bg-slate-950/25 dark:hover:bg-cyan-950/20" href={href} key={title}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground transition group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-cyan-400 dark:group-hover:text-slate-950">
              <Icon aria-hidden="true" className="size-4.5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold">{title}</span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">{description}</span>
            </span>
          </Link>
        ))}
      </div>
    </WidgetCard>
  );
}
