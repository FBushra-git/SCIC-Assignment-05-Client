import type { Metadata } from "next";

import { ExploreWorkspace } from "@/features/explore/explore-workspace";

export const metadata: Metadata = {
  title: "Explore roadmaps",
  description: "Browse public AI-generated career learning roadmaps.",
};

export default async function ExploreRoadmapsPage({
  searchParams,
}: {
  searchParams: Promise<{ career?: string }>;
}) {
  const { career } = await searchParams;
  return <div className="dashboard-surface min-h-[calc(100svh-4rem)]"><ExploreWorkspace initialCareer={career ?? ""} /></div>;
}
