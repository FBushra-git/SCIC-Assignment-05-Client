import type { Metadata } from "next";

import { RoadmapTimeline } from "@/features/roadmap/roadmap-timeline";

export const metadata: Metadata = { title: "Learning roadmap" };

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ roadmapId: string }>;
}) {
  const { roadmapId } = await params;
  return <main className="dashboard-surface min-h-[calc(100svh-4rem)]"><RoadmapTimeline roadmapId={roadmapId} /></main>;
}
