"use client";

import {
  AlertCircle,
  BrainCircuit,
  CalendarDays,
  Clock3,
  Route,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";
import {
  careerGoals,
  experienceLevels,
  type CareerGoal,
  type ExperienceLevel,
} from "@/features/profile/profile-data";
import { useProfile } from "@/features/profile/use-profile";

import { useGenerateRoadmap } from "./use-roadmaps";

const fieldClass =
  "h-12 w-full rounded-xl border border-border bg-background/80 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export function RoadmapGenerator() {
  const router = useRouter();
  const session = authClient.useSession();
  const profile = useProfile(Boolean(session.data?.user));
  const generation = useGenerateRoadmap();
  const [careerGoal, setCareerGoal] = useState<CareerGoal | "">("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | "">("");
  const [skills, setSkills] = useState<string | null>(null);
  const [weeklyHours, setWeeklyHours] = useState<number | null>(null);
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => {
    if (!session.isPending && !session.data?.user) router.replace("/login");
  }, [router, session.data?.user, session.isPending]);

  const selectedCareerGoal = careerGoal || profile.data?.careerGoal || "";
  const selectedExperience =
    experienceLevel || profile.data?.experienceLevel || "";
  const selectedSkills =
    skills ??
    profile.data?.skills.map((skill) => skill.name).join(", ") ??
    "";
  const selectedWeeklyHours =
    weeklyHours ?? profile.data?.weeklyStudyHours ?? 10;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedCareerGoal || !selectedExperience) return;

    const roadmap = await generation.mutateAsync({
      careerGoal: selectedCareerGoal,
      experienceLevel: selectedExperience,
      existingSkills: selectedSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      weeklyStudyHours: selectedWeeklyHours,
      targetCompletionDate: targetDate || null,
    });
    router.push(`/my-roadmaps/${roadmap.id}`);
  }

  if (session.isPending || !session.data?.user) {
    return <div className="section-shell h-[70svh] animate-pulse py-10"><div className="h-full rounded-[2rem] bg-muted" /></div>;
  }

  return (
    <div className="section-shell py-8 sm:py-12">
      <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 text-white shadow-2xl shadow-blue-950/20">
        <div className="relative isolate px-6 py-10 sm:px-10 lg:px-14">
          <div className="absolute inset-0 -z-20 bg-[url('/images/skillforge/hero-ethereal-ai.png')] bg-cover bg-center opacity-55" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-blue-950/90 to-cyan-950/65" />
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100 backdrop-blur">
            <WandSparkles className="size-4" /> Gemini-powered planning
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Forge a roadmap built around your reality.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-200">
            Your skills, goal, weekly availability, and deadline become a practical sequence of milestones, portfolio work, and interview checkpoints.
          </p>
        </div>
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form className="glass-panel rounded-[2rem] bg-white/80 p-6 sm:p-8 dark:bg-slate-900/70" onSubmit={handleSubmit}>
          <div className="flex items-start gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white">
              <Route className="size-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold">Learning parameters</h2>
              <p className="mt-1 text-sm text-muted-foreground">We prefilled what was available in your profile.</p>
            </div>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              Career goal
              <select className={fieldClass} onChange={(event) => setCareerGoal(event.target.value as CareerGoal)} required value={selectedCareerGoal}>
                <option value="">Choose a career path</option>
                {careerGoals.map((goal) => <option key={goal}>{goal}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Experience level
              <select className={fieldClass} onChange={(event) => setExperienceLevel(event.target.value as ExperienceLevel)} required value={selectedExperience}>
                <option value="">Choose your level</option>
                {experienceLevels.map((level) => <option key={level}>{level}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold sm:col-span-2">
              Existing skills
              <input className={fieldClass} onChange={(event) => setSkills(event.target.value)} placeholder="HTML, CSS, JavaScript, React" value={selectedSkills} />
              <span className="text-xs font-normal text-muted-foreground">Separate skills with commas.</span>
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Weekly study hours
              <input className={fieldClass} max={80} min={1} onChange={(event) => setWeeklyHours(Number(event.target.value))} required type="number" value={selectedWeeklyHours} />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Optional completion deadline
              <input className={fieldClass} min={new Date().toISOString().slice(0, 10)} onChange={(event) => setTargetDate(event.target.value)} type="date" value={targetDate} />
            </label>
          </div>

          {generation.isError ? (
            <div className="mt-5 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              {generation.error.message}
            </div>
          ) : null}

          <Button className="mt-7 h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 sm:w-auto sm:px-7" disabled={generation.isPending || !selectedCareerGoal || !selectedExperience} type="submit">
            {generation.isPending ? <><BrainCircuit className="animate-pulse" /> Designing your roadmap…</> : <><Sparkles /> Generate AI roadmap</>}
          </Button>
          {generation.isPending ? <p className="mt-3 text-xs text-muted-foreground">Gemini is balancing prerequisites, workload, resources, projects, and interview practice. This can take up to a minute.</p> : null}
        </form>

        <aside className="glass-panel rounded-[2rem] bg-white/75 p-6 dark:bg-slate-900/65">
          <h2 className="font-bold">What you’ll receive</h2>
          <div className="mt-5 grid gap-4">
            {[
              [CalendarDays, "Weekly milestones", "A progressive week-by-week timeline."],
              [Clock3, "Realistic workload", "Each week respects your available hours."],
              [Sparkles, "Career evidence", "Projects and interview checkpoints throughout."],
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof CalendarDays;
              return <div className="flex gap-3" key={String(title)}><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-700 dark:text-cyan-300"><ItemIcon className="size-4" /></span><div><h3 className="text-sm font-bold">{String(title)}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{String(text)}</p></div></div>;
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
