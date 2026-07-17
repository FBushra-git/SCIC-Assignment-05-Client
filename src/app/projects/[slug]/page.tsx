import type { Metadata } from "next";

import { ProjectDetailsWorkspace } from "@/features/project/project-details-workspace";

export const metadata: Metadata = { title: "Project details" };

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <main className="dashboard-surface min-h-[calc(100svh-4rem)]"><ProjectDetailsWorkspace slug={slug} /></main>;
}
