"use client";

import {
  ArrowRight,
  Check,
  Clock3,
  FolderKanban,
  Search,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";
import { cn } from "@/lib/utils";

import type { Project } from "./project-data";
import { useProjects, useSaveProjectStatus } from "./use-projects";

const difficultyTone = {
  Beginner: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  Intermediate: "bg-blue-500/15 text-blue-700 dark:text-cyan-300",
  Advanced: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
};

function ProjectCard({
  project,
  isAuthenticated,
  sessionPending,
}: {
  project: Project;
  isAuthenticated: boolean;
  sessionPending: boolean;
}) {
  const status = useSaveProjectStatus(project.slug);

  return (
    <article className="glass-panel group flex min-h-[31rem] flex-col overflow-hidden rounded-[1.75rem] bg-white/80 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 dark:bg-slate-900/70">
      <div className="relative h-44 overflow-hidden">
        <Image alt={`${project.name} project preview`} className="object-cover transition duration-500 group-hover:scale-105" fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" src={project.thumbnail} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
        <span className={cn("absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold backdrop-blur", difficultyTone[project.difficulty])}>{project.difficulty}</span>
        {project.userStatus ? <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-slate-950/65 px-3 py-1 text-xs font-bold capitalize text-white backdrop-blur">{project.userStatus.replace("_", " ")}</span> : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-bold">{project.name}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{project.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{project.technologies.map((item) => <span className="rounded-lg bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground" key={item}>{item}</span>)}</div>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground"><Clock3 className="size-4 text-blue-600 dark:text-cyan-300" /> {project.estimatedTime}</div>
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-6">
          <Link className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 rounded-xl")} href={`/projects/${project.slug}`}>View details <ArrowRight /></Link>
          {sessionPending ? (
            <Button aria-label="Checking sign-in status" className="size-10 rounded-xl" disabled size="icon-lg"><Sparkles /></Button>
          ) : isAuthenticated ? (
            <Button aria-label={project.userStatus ? "Project saved" : "Add project"} className="size-10 rounded-xl" disabled={status.isPending || Boolean(project.userStatus)} onClick={() => status.mutate({ slug: project.slug, status: "planned" })} size="icon-lg">
              {project.userStatus ? <Check /> : <Sparkles />}
            </Button>
          ) : (
            <Link aria-label="Sign in to save this project" className={cn(buttonVariants({ size: "icon-lg" }), "size-10 rounded-xl")} href="/login"><Sparkles /></Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsWorkspace() {
  const session = authClient.useSession();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [difficulty, setDifficulty] = useState("");
  const projects = useProjects(
    { search: deferredSearch, difficulty },
    true,
  );

  return (
    <div className="section-shell py-8 sm:py-12">
      <header className="overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 text-white">
        <div className="relative isolate px-6 py-10 sm:px-10">
          <div className="absolute inset-0 -z-20 bg-[url('/images/skillforge/features-ethereal-waves.png')] bg-cover bg-center opacity-45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-blue-950/90 to-cyan-950/75" />
          <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200"><FolderKanban className="size-4" /> Portfolio project library</span>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-5xl">Turn knowledge into career evidence.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-200">Browse scoped, practical projects with explicit objectives, features, skills, and learning outcomes.</p>
        </div>
      </header>

      <div className="glass-panel mt-6 flex flex-col gap-4 rounded-2xl bg-white/80 p-4 md:flex-row md:items-center md:justify-between dark:bg-slate-900/70">
        <label className="relative block w-full max-w-xl"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><span className="sr-only">Search projects</span><input className="h-11 w-full rounded-xl border border-border bg-background/70 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" onChange={(event) => setSearch(event.target.value)} placeholder="Search projects or technologies…" value={search} /></label>
        <div className="flex flex-wrap gap-2">{["", "Beginner", "Intermediate", "Advanced"].map((level) => <Button className="rounded-xl" key={level || "All"} onClick={() => setDifficulty(level)} size="sm" variant={difficulty === level ? "default" : "outline"}>{level || "All levels"}</Button>)}</div>
      </div>

      {projects.isPending ? <div className="mt-7 grid animate-pulse gap-5 md:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div className="h-[31rem] rounded-[1.75rem] bg-muted" key={index} />)}</div> : null}
      {projects.isError ? <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">{projects.error.message}</div> : null}
      {projects.data?.length ? <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{projects.data.map((project) => <ProjectCard isAuthenticated={Boolean(session.data?.user)} key={project.slug} project={project} sessionPending={session.isPending} />)}</div> : null}
      {projects.data && !projects.data.length ? <div className="mt-8 rounded-[2rem] border border-dashed border-border p-12 text-center"><Search className="mx-auto size-9 text-muted-foreground" /><h2 className="mt-4 text-xl font-bold">No matching projects</h2><p className="mt-2 text-sm text-muted-foreground">Try a different keyword or difficulty.</p></div> : null}
    </div>
  );
}
