import type { Metadata } from "next";

import { ProjectsWorkspace } from "@/features/project/projects-workspace";

export const metadata: Metadata = {
  title: "Project Library",
  description:
    "Browse practical portfolio projects with clear technology stacks, outcomes, and generated visual previews.",
};

export default function ProjectsPage() {
  return (
    <main className="dashboard-surface min-h-[calc(100svh-4rem)]">
      <ProjectsWorkspace />
    </main>
  );
}
