import type { Metadata } from "next";

import { RoadmapGenerator } from "@/features/roadmap/roadmap-generator";

export const metadata: Metadata = {
  title: "Generate AI roadmap",
  description: "Create a personalized SkillForge AI learning roadmap.",
};

export default function NewRoadmapPage() {
  return <main className="dashboard-surface min-h-[calc(100svh-4rem)]"><RoadmapGenerator /></main>;
}
