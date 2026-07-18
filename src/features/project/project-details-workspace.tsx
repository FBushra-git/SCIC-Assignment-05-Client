"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Code2,
  ListChecks,
  Rocket,
  Target,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";
import { cn } from "@/lib/utils";

import type { ProjectStatus } from "./project-data";
import { useProject, useSaveProjectStatus } from "./use-projects";

const statusOptions: Array<{ value: ProjectStatus; label: string }> = [
  { value: "planned", label: "Save for later" },
  { value: "in_progress", label: "Start project" },
  { value: "completed", label: "Mark completed" },
];

function DetailSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-panel rounded-[1.75rem] bg-white/80 p-6 dark:bg-slate-900/70">
      <h2 className="flex items-center gap-3 text-lg font-bold"><span className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-700 dark:text-cyan-300"><Icon className="size-5" /></span>{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function ProjectDetailsWorkspace({ slug }: { slug: string }) {
  const session = authClient.useSession();
  const project = useProject(slug, true);
  const saveStatus = useSaveProjectStatus(slug);

  if (project.isPending) {
    return <div className="section-shell h-[75svh] animate-pulse py-10"><div className="h-full rounded-[2rem] bg-muted" /></div>;
  }
  if (project.isError || !project.data) {
    return <div className="section-shell py-16 text-center"><h1 className="text-2xl font-bold">Project unavailable</h1><p className="mt-2 text-muted-foreground">{project.error?.message ?? "This project was not found."}</p></div>;
  }
  const data = project.data;

  return (
    <div className="section-shell py-8 sm:py-12">
      <Link className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-cyan-300" href="/projects"><ArrowLeft className="size-4" /> Back to library</Link>
      <header className="mt-5 overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 text-white">
        <div className="grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative isolate p-7 sm:p-10">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950" />
            <span className="rounded-full border border-cyan-300/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">{data.difficulty}</span>
            <h1 className="mt-5 text-3xl font-extrabold sm:text-5xl">{data.name}</h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-200">{data.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">{data.technologies.map((item) => <span className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-bold" key={item}>{item}</span>)}</div>
            <p className="mt-5 flex items-center gap-2 text-sm text-cyan-100"><Clock3 className="size-4" /> Estimated completion: {data.estimatedTime}</p>
          </div>
          <div className="relative min-h-64 lg:min-h-full"><Image alt={`${data.name} project preview`} className="object-cover" fill priority sizes="(min-width: 1024px) 40vw, 100vw" src={data.thumbnail} /><div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 to-transparent lg:from-slate-950" /></div>
        </div>
      </header>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="grid gap-6 md:grid-cols-2">
          <DetailSection icon={Target} title="Learning objectives"><ul className="grid gap-3">{data.objectives.map((item) => <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={item}><CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-500" />{item}</li>)}</ul></DetailSection>
          <DetailSection icon={ListChecks} title="Feature scope"><ul className="grid gap-3">{data.features.map((item) => <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={item}><CheckCircle2 className="mt-1 size-4 shrink-0 text-blue-500" />{item}</li>)}</ul></DetailSection>
          <DetailSection icon={Trophy} title="Learning outcomes"><ul className="grid gap-3">{data.learningOutcomes.map((item) => <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={item}><CheckCircle2 className="mt-1 size-4 shrink-0 text-cyan-500" />{item}</li>)}</ul></DetailSection>
          <DetailSection icon={Code2} title="Skills you’ll strengthen"><div className="flex flex-wrap gap-2">{data.skillsLearned.map((item) => <span className="rounded-xl bg-muted px-3 py-2 text-xs font-bold" key={item}>{item}</span>)}</div></DetailSection>
        </div>

        <aside className="glass-panel sticky top-24 rounded-[1.75rem] bg-white/80 p-5 dark:bg-slate-900/70">
          <h2 className="flex items-center gap-2 font-bold"><Rocket className="size-5 text-blue-600 dark:text-cyan-300" /> Project progress</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Update this project as it moves through your portfolio workflow.</p>
          {session.isPending ? (
            <div className="mt-5 h-32 animate-pulse rounded-xl bg-muted" />
          ) : session.data?.user ? (
            <>
              <div className="mt-5 grid gap-2">{statusOptions.map((option) => <Button className={cn("h-11 justify-start rounded-xl", data.userStatus === option.value && "ring-2 ring-blue-500/25")} disabled={saveStatus.isPending} key={option.value} onClick={() => saveStatus.mutate({ slug, status: option.value })} variant={data.userStatus === option.value ? "default" : "outline"}>{data.userStatus === option.value ? <CheckCircle2 /> : <ArrowRight />}{option.label}</Button>)}</div>
              {saveStatus.isError ? <p className="mt-3 text-xs text-destructive">{saveStatus.error.message}</p> : null}
            </>
          ) : (
            <Link className={cn(buttonVariants({ size: "lg" }), "mt-5 w-full rounded-xl")} href="/login">Sign in to save progress <ArrowRight /></Link>
          )}
        </aside>
      </div>

      {data.related.length ? <section className="mt-10"><h2 className="text-2xl font-bold">Related projects</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{data.related.map((item) => <Link className="glass-panel group flex items-center gap-4 rounded-2xl bg-white/75 p-4 transition hover:-translate-y-0.5 hover:border-blue-400 dark:bg-slate-900/65" href={`/projects/${item.slug}`} key={item.slug}><div className="relative size-20 shrink-0 overflow-hidden rounded-xl"><Image alt={`${item.name} project preview`} className="object-cover" fill sizes="80px" src={item.thumbnail} /></div><div><span className="text-xs font-bold text-blue-700 dark:text-cyan-300">{item.difficulty}</span><h3 className="mt-1 font-bold">{item.name}</h3><p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{item.shortDescription}</p></div><ArrowRight className="ml-auto size-4 shrink-0 transition group-hover:translate-x-1" /></Link>)}</div></section> : null}
    </div>
  );
}
