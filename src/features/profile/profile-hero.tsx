import { BrainCircuit, CalendarDays, Clock3, Pencil, Settings, Sparkles, Target, Wrench } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserProfile } from "./profile-data";
import { CompletionRing, ProfileAvatar } from "./profile-ui";

export function ProfileHero({ profile }: { profile: UserProfile }) {
  const joinedLabel = profile.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(profile.createdAt))
    : "New member";
  const stats = [
    {
      icon: Target,
      label: "Career direction",
      value: profile.careerGoal || "Choose your goal",
    },
    {
      icon: Clock3,
      label: "Weekly commitment",
      value: `${profile.weeklyStudyHours} hours`,
    },
    {
      icon: Wrench,
      label: "Skills mapped",
      value: `${profile.skills.length} skill${profile.skills.length === 1 ? "" : "s"}`,
    },
  ];

  return (
    <section className="profile-banner relative overflow-hidden rounded-[2rem] border border-white/20 p-6 text-white shadow-2xl shadow-blue-950/15 sm:p-8 lg:p-10">
      <div className="absolute -right-12 -top-20 size-64 rounded-full bg-cyan-300/15 blur-3xl" />
      <div className="absolute -bottom-28 left-1/3 size-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <ProfileAvatar
            className="size-28 sm:size-32"
            name={profile.fullName}
            photo={profile.profilePhoto ?? ""}
          />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-100 backdrop-blur-xl">
              <Sparkles aria-hidden="true" className="size-3.5" />
              Personalization center
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{profile.fullName}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-cyan-100">
              <span>{profile.currentRole || profile.careerGoal || "Career-focused learner"}</span>
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <CalendarDays aria-hidden="true" className="size-4" />
                Joined {joinedLabel}
              </span>
            </div>
            <p className="mt-3 max-w-2xl leading-7 text-slate-200">
              {profile.bio || "Keep your goals, strengths, and study preferences current so every AI roadmap starts from the real you."}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-4 rounded-3xl border border-white/15 bg-slate-950/30 p-4 backdrop-blur-xl">
            <CompletionRing percentage={profile.profileCompletion} />
            <div className="max-w-48">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-100">
                <BrainCircuit aria-hidden="true" className="size-4" />
                AI profile readiness
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                Complete more details to sharpen roadmap and project recommendations.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <a
              className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-xl bg-white text-slate-900 hover:bg-cyan-50")}
              href="#identity"
            >
              <Pencil aria-hidden="true" />
              Edit profile
            </a>
            <a
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-11 rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white dark:bg-white/10")}
              href="#security"
            >
              <Settings aria-hidden="true" />
              Settings
            </a>
          </div>
        </div>
      </div>

      <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
            key={label}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-cyan-100">
              <Icon aria-hidden="true" className="size-4" />
              {label}
            </div>
            <p className="mt-2 truncate text-sm font-bold text-white sm:text-base">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
