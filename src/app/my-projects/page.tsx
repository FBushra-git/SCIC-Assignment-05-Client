import type { Metadata } from "next";

import { ProjectsWorkspace } from "@/features/project/projects-workspace";

export const metadata: Metadata = {
  title: "Project library",
  description: "Browse practical SkillForge AI portfolio projects.",
};

export default function MyProjectsPage() {
  return <main className="dashboard-surface min-h-[calc(100svh-4rem)]"><ProjectsWorkspace /></main>;
}
