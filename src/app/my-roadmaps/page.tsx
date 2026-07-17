import type { Metadata } from "next";

import { RoadmapsWorkspace } from "@/features/roadmap/roadmaps-workspace";

export const metadata: Metadata = { title: "My roadmaps" };

export default function MyRoadmapsPage() {
  return <main className="dashboard-surface min-h-[calc(100svh-4rem)]"><RoadmapsWorkspace /></main>;
}
