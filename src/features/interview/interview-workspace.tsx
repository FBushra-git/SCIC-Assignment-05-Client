"use client";

import {
  AlertCircle,
  Bookmark,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileQuestion,
  History,
  Lightbulb,
  Sparkles,
  Target,
  Trophy,
  WandSparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";
import {
  careerGoals,
  experienceLevels,
} from "@/features/profile/profile-data";
import { useProfile } from "@/features/profile/use-profile";
import { cn } from "@/lib/utils";

import type { InterviewDifficulty } from "./interview-data";
import { InterviewQuestionCard } from "./interview-question-card";
import {
  useGenerateInterviewSession,
  useInterviewDashboard,
  useInterviewSession,
} from "./use-interview";

const interviewCareers = [
  ...careerGoals,
  "Cyber Security Analyst",
  "DevOps Engineer",
  "Cloud Engineer",
  "QA Automation Engineer",
] as const;

const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Python",
  "SQL",
  "Data Structures",
  "System Design",
  "Cyber Security",
  "Docker",
];

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export function InterviewWorkspace() {
  const router = useRouter();
  const session = authClient.useSession();
  const profile = useProfile(Boolean(session.data?.user));
  const dashboard = useInterviewDashboard(Boolean(session.data?.user));
  const [selectedSessionId, setSelectedSessionId] = useState<
    string | null | undefined
  >(undefined);
  const activeSessionId =
    selectedSessionId === undefined
      ? dashboard.data?.latestSession?.id ?? null
      : selectedSessionId;
  const selectedSession = useInterviewSession(
    activeSessionId,
    Boolean(session.data?.user),
  );
  const generation = useGenerateInterviewSession();
  const [careerGoal, setCareerGoal] = useState("");
  const [technology, setTechnology] = useState("");
  const [difficulty, setDifficulty] = useState<InterviewDifficulty | "">("");

  useEffect(() => {
    if (!session.isPending && !session.data?.user) router.replace("/login");
  }, [router, session.data?.user, session.isPending]);

  const selectedCareer = careerGoal || profile.data?.careerGoal || "";
  const selectedTechnology =
    technology || profile.data?.preferredProgrammingLanguage || "";
  const selectedDifficulty =
    difficulty ||
    (profile.data?.experienceLevel as InterviewDifficulty | "") ||
    "Beginner";
  const currentSession =
    selectedSession.data ??
    (activeSessionId === dashboard.data?.latestSession?.id
      ? dashboard.data.latestSession
      : null);

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedCareer || !selectedTechnology) return;
    const generated = await generation.mutateAsync({
      careerGoal: selectedCareer,
      technology: selectedTechnology,
      difficulty: selectedDifficulty,
    });
    setSelectedSessionId(generated.id);
  }

  if (session.isPending || !session.data?.user || dashboard.isPending) {
    return <div className="section-shell h-[78svh] animate-pulse py-10"><div className="h-full rounded-[2rem] bg-muted" /></div>;
  }
  if (dashboard.isError || !dashboard.data) {
    return <div className="section-shell py-16"><div className="glass-panel rounded-[2rem] p-8 text-center"><AlertCircle className="mx-auto size-9 text-destructive" /><h1 className="mt-4 text-2xl font-bold">Interview workspace unavailable</h1><p className="mt-2 text-muted-foreground">{dashboard.error?.message ?? "Please try again."}</p></div></div>;
  }

  const stats = dashboard.data.stats;

  return (
    <div className="section-shell py-8 sm:py-12">
      <header className="relative isolate overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 px-6 py-10 text-white shadow-2xl shadow-blue-950/20 sm:px-10">
        <div className="absolute inset-0 -z-20 bg-[url('/images/skillforge/chat-subtle-neural-grid.png')] bg-cover bg-center opacity-55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-blue-950/90 to-cyan-950/75" />
        <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200"><BrainCircuit className="size-4" /> AI-guided interview preparation</span>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-5xl">Practice what your target role will ask from you.</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-200">Generate contextual technical, conceptual, coding, and HR questions shaped by your profile and completed roadmap topics.</p>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Interview progress">
        {[
          [FileQuestion, "Recommended questions", dashboard.data.recommendedQuestions.length, "Ready in your latest session"],
          [CheckCircle2, "Completed practice", stats.completedPractice, `${stats.completionRate}% overall completion`],
          [Bookmark, "Bookmarked", stats.bookmarkedQuestions, "Saved for focused revision"],
          [Trophy, "Practice sessions", stats.totalSessions, `${stats.totalQuestions} total questions`],
        ].map(([Icon, label, value, description]) => {
          const MetricIcon = Icon as typeof FileQuestion;
          return <article className="glass-panel rounded-2xl bg-white/80 p-5 dark:bg-slate-900/70" key={String(label)}><span className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-700 dark:text-cyan-300"><MetricIcon className="size-5" /></span><strong className="mt-4 block text-2xl font-extrabold">{String(value)}</strong><h2 className="mt-1 text-sm font-bold">{String(label)}</h2><p className="mt-1 text-xs text-muted-foreground">{String(description)}</p></article>;
        })}
      </section>

      <section className="glass-panel mt-6 rounded-[1.75rem] bg-white/80 p-5 sm:p-7 dark:bg-slate-900/70">
        <div className="flex items-start gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white"><WandSparkles className="size-5" /></span><div><h2 className="text-xl font-bold">Generate a practice session</h2><p className="mt-1 text-sm text-muted-foreground">Profile values are used as defaults, but you can practice another role or technology.</p></div></div>
        <form className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_14rem_auto] md:items-end" onSubmit={handleGenerate}>
          <label className="grid gap-2 text-sm font-bold">Career goal<select className={fieldClass} onChange={(event) => setCareerGoal(event.target.value)} required value={selectedCareer}><option value="">Choose a career</option>{interviewCareers.map((career) => <option key={career}>{career}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-bold">Technology<input className={fieldClass} list="interview-technologies" onChange={(event) => setTechnology(event.target.value)} placeholder="React, Node.js, Python…" required value={selectedTechnology} /><datalist id="interview-technologies">{technologies.map((item) => <option key={item} value={item} />)}</datalist></label>
          <label className="grid gap-2 text-sm font-bold">Difficulty<select className={fieldClass} onChange={(event) => setDifficulty(event.target.value as InterviewDifficulty)} value={selectedDifficulty}>{experienceLevels.map((level) => <option key={level}>{level}</option>)}</select></label>
          <Button className="h-11 rounded-xl px-5" disabled={generation.isPending || !selectedCareer || !selectedTechnology} type="submit">{generation.isPending ? <><Sparkles className="animate-pulse" /> Generating…</> : <><Sparkles /> Generate questions</>}</Button>
        </form>
        {generation.isPending ? <p className="mt-3 text-xs text-muted-foreground">Gemini is balancing question types, explanations, coding tasks, weak areas, and revision tips.</p> : null}
        {generation.isError ? <p className="mt-3 text-sm font-semibold text-destructive">{generation.error.message}</p> : null}
      </section>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <section className="glass-panel rounded-[1.75rem] bg-white/80 p-5 sm:p-7 dark:bg-slate-900/70">
          {currentSession ? (
            <>
              <div className="flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-start sm:justify-between"><div><span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-300">{currentSession.careerGoal} · {currentSession.technology}</span><h2 className="mt-2 text-2xl font-bold">{currentSession.title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{currentSession.overview}</p></div><span className="shrink-0 rounded-xl bg-muted px-3 py-2 text-xs font-bold">{currentSession.questions.filter((question) => question.completed).length}/{currentSession.questions.length} completed</span></div>
              <div className="mt-5 grid gap-3">{currentSession.questions.map((question) => <InterviewQuestionCard key={question.id} question={question} sessionId={currentSession.id} />)}</div>
            </>
          ) : (
            <div className="grid min-h-96 place-content-center text-center"><span className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white"><FileQuestion className="size-8" /></span><h2 className="mt-5 text-xl font-bold">Generate your first interview session</h2><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">Questions, explanations, coding practice, weak areas, and revision guidance will appear here.</p></div>
          )}
        </section>

        <aside className="grid gap-5">
          <section className="glass-panel rounded-[1.5rem] bg-white/80 p-5 dark:bg-slate-900/70">
            <h2 className="flex items-center gap-2 font-bold"><FileQuestion className="size-5 text-blue-600 dark:text-cyan-300" /> Recommended questions</h2>
            {dashboard.data.recommendedQuestions.length ? (
              <div className="mt-4 grid gap-2">
                {dashboard.data.recommendedQuestions.slice(0, 4).map((question) => (
                  <button
                    className="group rounded-xl border border-border/70 p-3 text-left transition hover:border-blue-400 hover:bg-blue-500/5"
                    key={question.id}
                    onClick={() => setSelectedSessionId(question.sessionId)}
                    type="button"
                  >
                    <span className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wide text-blue-700 dark:text-cyan-300">
                      {question.type} · {question.technology}
                      <ChevronRight className="size-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-2 line-clamp-2 block text-sm font-semibold leading-5">{question.question}</span>
                  </button>
                ))}
              </div>
            ) : <p className="mt-3 text-sm leading-6 text-muted-foreground">Generate a session to receive questions based on your target role.</p>}
          </section>
          <section className="glass-panel rounded-[1.5rem] bg-white/80 p-5 dark:bg-slate-900/70"><h2 className="flex items-center gap-2 font-bold"><Target className="size-5 text-blue-600 dark:text-cyan-300" /> Weak areas</h2>{dashboard.data.weakAreas.length ? <ul className="mt-4 grid gap-2">{dashboard.data.weakAreas.map((area) => <li className="rounded-xl bg-red-500/8 px-3 py-2 text-sm font-semibold text-red-700 dark:text-red-300" key={area}>{area}</li>)}</ul> : <p className="mt-3 text-sm leading-6 text-muted-foreground">Generate a session to identify likely areas for revision.</p>}</section>
          <section className="glass-panel rounded-[1.5rem] bg-white/80 p-5 dark:bg-slate-900/70"><h2 className="flex items-center gap-2 font-bold"><Lightbulb className="size-5 text-amber-500" /> AI suggestions</h2><ul className="mt-4 grid gap-3">{dashboard.data.aiSuggestions.slice(0, 5).map((suggestion) => <li className="text-sm leading-6 text-muted-foreground" key={suggestion}>• {suggestion}</li>)}</ul></section>
          <section className="glass-panel rounded-[1.5rem] bg-white/80 p-5 dark:bg-slate-900/70"><h2 className="flex items-center gap-2 font-bold"><History className="size-5 text-blue-600 dark:text-cyan-300" /> Previous sessions</h2>{dashboard.data.sessions.length ? <div className="mt-4 grid gap-2">{dashboard.data.sessions.map((item) => <button className={cn("rounded-xl border p-3 text-left transition hover:border-blue-400", activeSessionId === item.id ? "border-blue-400 bg-blue-50 dark:bg-blue-950/20" : "border-border/70")} key={item.id} onClick={() => setSelectedSessionId(item.id)} type="button"><span className="line-clamp-1 text-sm font-bold">{item.technology} · {item.difficulty}</span><span className="mt-1 flex items-center justify-between gap-2 text-[11px] text-muted-foreground"><span>{item.completedCount}/{item.questionCount} completed</span><ChevronRight className="size-3.5" /></span><span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" style={{ width: `${item.progress}%` }} /></span></button>)}</div> : <p className="mt-3 text-sm text-muted-foreground">No previous sessions yet.</p>}</section>
        </aside>
      </div>
    </div>
  );
}
